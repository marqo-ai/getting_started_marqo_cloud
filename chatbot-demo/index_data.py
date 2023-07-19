import marqo
import os
import json
from tqdm import tqdm
from typing import List, Dict, Any

marqo.set_log_level("WARN")

MARQO_API_URL = os.getenv("MARQO_API_URL")
MARQO_API_KEY = os.getenv("MARQO_API_KEY")
MARQO_INDEX = os.getenv("MARQO_INDEX")

def index_data(documents: List[Dict[str, Any]]) -> None:
    client = marqo.Client(url=MARQO_API_URL, api_key=MARQO_API_KEY)
    chunk_size = 256
    for i in tqdm(range(0, len(documents), chunk_size)):
        batch = documents[i : i + chunk_size]
        responses = client.index(MARQO_INDEX).add_documents(
            batch,
            client_batch_size=64
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
    

