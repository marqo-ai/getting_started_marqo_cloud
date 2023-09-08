import marqo
import os
from models import SearchSettings, SearchResult
from typing import List, Dict
from dotenv import load_dotenv

load_dotenv()

MQ = marqo.Client(url=os.getenv("MARQO_API_URL"), api_key=os.getenv("MARQO_API_KEY"))

DEFAULT_SEARCH_SETTINGS = SearchSettings(
    query_weight=1.0,
    pos_query_weight=0.75,
    neg_query_weight=-1.1,
    total_favourite_weight=0.5,
)


def compose_query(
    query: str,
    more_of: str,
    less_of: str,
    favourites: List[str],
    search_settings: SearchSettings = None,
) -> Dict[str, float]:
    if not search_settings:
        search_settings = DEFAULT_SEARCH_SETTINGS

    composed_query = {
        query: search_settings.query_weight,
    }
    if more_of:
        # composed_query[more_of] = 0.75
        more_term = query + ", " + more_of
        composed_query[more_term] = search_settings.pos_query_weight
    if less_of:
        composed_query[less_of] = search_settings.neg_query_weight

    total_fav_weight = search_settings.total_favourite_weight
    for favourite in favourites:
        composed_query[favourite] = total_fav_weight / len(favourites)

    return composed_query


def search(
    query: str,
    more_of: str,
    less_of: str,
    favourites: List[str],
    limit: int = 50,
    search_settings: SearchSettings = None,
) -> List[SearchResult]:
    index = os.getenv("MARQO_INDEX")

    composed_query = compose_query(query, more_of, less_of, favourites, search_settings)

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
