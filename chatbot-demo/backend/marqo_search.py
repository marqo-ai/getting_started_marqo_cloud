import marqo
import os
import json
from typing import List, Dict, Any

MARQO_INDEX = os.getenv("MARQO_INDEX")
MARQO_API_URL = os.getenv("MARQO_API_URL")
MARQO_API_KEY = os.getenv("MARQO_API_KEY")

CLIENT = marqo.Client(url=MARQO_API_URL, api_key=MARQO_API_KEY)

def search(query: str, limit: int = 5) -> List[str]:
    
    results = CLIENT.index(MARQO_INDEX).search(query, limit=limit)
    hits = results["hits"]

    for i in range(len(hits)):
        del hits[i]["_highlights"]
        del hits[i]["_id"]
    
    return json.dumps(hits)