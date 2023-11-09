import pandas as pd
from tqdm import tqdm
import marqo
import colorama
import os
from typing import Dict
import random
from dotenv import load_dotenv

load_dotenv()

marqo.set_log_level("WARN")

URL = os.getenv("MARQO_API_URL", None)
API_KEY = os.getenv("MARQO_API_KEY", None)
CLIENT = marqo.Client(url=URL, api_key=API_KEY)
INDEX_NAME = os.getenv("MARQO_INDEX", None)
PROGRESS_UPDATE_INTERVAL = 64
CLIENT_BATCH_SIZE = 32

MAPPINGS = {
    "multimodal": {
        "type":  "multimodal_combination",
        "weights": {
            "name": 0.1,
            "image_url": 0.9
        }
    }
}


def print_banner(message: str) -> None:
    horizontal_line = "#" * (len(message) + 4)
    empty_line = "#" + " " * (len(message) + 2) + "#"
    print(colorama.Fore.BLUE + horizontal_line + colorama.Style.RESET_ALL)
    print(colorama.Fore.BLUE + empty_line + colorama.Style.RESET_ALL)
    print(
        colorama.Fore.BLUE
        + "# "
        + colorama.Fore.GREEN
        + message
        + colorama.Fore.BLUE
        + " #"
        + colorama.Style.RESET_ALL
    )
    print(colorama.Fore.BLUE + empty_line + colorama.Style.RESET_ALL)
    print(colorama.Fore.BLUE + horizontal_line + colorama.Style.RESET_ALL)
    print(
        "\nThe application will now undergo some first time setup, data will be added to your "
        + colorama.Fore.GREEN
        + "Marqo"
        + colorama.Style.RESET_ALL
        + " index."
    )
    print(
        "\nThis dataset is comprised of AI generated E-Commerce products and images.\n"
    )


def get_data() -> Dict[str, str]:
    """
    Fetch the dataset from S3
    """
    filename = "https://marqo-overall-demo-assets.s3.us-west-2.amazonaws.com/ecommerce_meta_data_clean.csv"
    data = pd.read_csv(filename)
    print(data.columns)
    data["image_url"] = data["s3_http"]
    documents = data[["image_url", "title", "price", "aesthetic_score"]].to_dict(
        orient="records"
    )
    for i in range(len(documents)):
        documents[i]["_id"] = documents[i]["image_url"].split("/")[-1]
        multimodal_field = {
            "name": documents[i]["title"],
            "image_url": documents[i]["image_url"],
        }
        documents[i]["multimodal"] = multimodal_field
        del documents[i]["title"]
        del documents[i]["image_url"]

    random.shuffle(documents)
    print("Data fetched.\n")
    return documents


def index_data(documents: Dict[str, str]) -> None:
    """
    Index the data into Marqo
    """
    print(f"Indexing data, updating progress every {PROGRESS_UPDATE_INTERVAL} documents.")
    for i in tqdm(range(0, len(documents), PROGRESS_UPDATE_INTERVAL), desc="Indexing data"):
        chunk = documents[i : i + PROGRESS_UPDATE_INTERVAL]

        CLIENT.index(INDEX_NAME).add_documents(
            chunk, 
            client_batch_size=CLIENT_BATCH_SIZE, 
            tensor_fields=["multimodal"],
            mappings=MAPPINGS
        )

    print(
        colorama.Fore.GREEN + "\nFinished indexing data!\n" + colorama.Style.RESET_ALL
    )

def setup_application() -> None:
    """
    Driver function to do all the set up.
    """
    # Initialize colorama
    colorama.init()
    banner_message = "Application First-time Setup"
    print_banner(banner_message)

    print("Fetching data from AWS S3...")
    documents = get_data()

    index_data(documents)

    # Reset colorama on program exit
    colorama.deinit()

    print("Done.")


if __name__ == "__main__":
    setup_application()
