import marqo
import os
from pydantic import BaseModel
from typing import List, Dict
from dotenv import load_dotenv

load_dotenv()

MQ = marqo.Client(url=os.getenv("MARQO_API_URL"), api_key=os.getenv("MARQO_API_KEY"))


class SearchResult(BaseModel):
    id: str
    name: str
    price: float
    image_url: str

    def __dict__(self):
        return {"title": self.title, "price": self.price, "image_url": self.image_url}


def compose_query(query: str, more_of: str, less_of: str) -> Dict[str, float]:
    composed_query = {
        query: 1.0,
    }
    if more_of:
        composed_query[more_of] = 0.5
    if less_of:
        composed_query[less_of] = -0.75

    return composed_query


def search(
    query: str, more_of: str, less_of: str, limit: int = 50
) -> List[SearchResult]:
    index = os.getenv("MARQO_INDEX")

    composed_query = compose_query(query, more_of, less_of)

    result = MQ.index(index).search(composed_query, limit=limit)
    return [
        SearchResult(
            id=r["_id"],
            name=r["name"],
            price=float(r["price"]),
            image_url=r["image_url"],
        )
        for r in result["hits"]
    ]
