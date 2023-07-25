import marqo
import os
import json
from tqdm import tqdm
import colorama
from typing import List, Dict, Any

marqo.set_log_level("WARN")

MARQO_API_URL = os.getenv("MARQO_API_URL")
MARQO_API_KEY = os.getenv("MARQO_API_KEY")
MARQO_INDEX = os.getenv("MARQO_INDEX")

# Increase these for larger datasets, client batch size of 64 is recommended
PROGRESS_CHUNK = 4
CLIENT_BATCH_SIZE = 4

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
    print("\nThis dataset is comprised excerpts from the Marqo documentation.\n")

def index_data(documents: List[Dict[str, Any]]) -> None:
    client = marqo.Client(url=MARQO_API_URL, api_key=MARQO_API_KEY)
    chunk_size = PROGRESS_CHUNK
    for i in tqdm(range(0, len(documents), chunk_size)):
        batch = documents[i : i + chunk_size]
        responses = client.index(MARQO_INDEX).add_documents(
            batch,
            client_batch_size=CLIENT_BATCH_SIZE,
            tensor_fields=["text"],
        )
        for response in responses:
            if response["errors"]:
                print(json.dumps(response["errors"], indent=2))
        
def get_documents():
    with open(os.path.join("example_data", "example_data.json"), "r") as f:
        documents = json.load(f)
    return documents

if __name__ == "__main__":
    documents = get_documents()
    index_data(documents)
    

