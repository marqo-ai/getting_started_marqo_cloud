import marqo
import os
from models import SearchSettings, SearchResult, AdvancedSettings
from config import (
    STYLE_MAPPING,
    DEFAULT_SEARCH_SETTINGS,
    DEFAULT_ADVANCED_SETTINGS,
    QUERY_PREFIX,
)
from typing import List, Dict
from dotenv import load_dotenv

load_dotenv()

MQ = marqo.Client(url=os.getenv("MARQO_API_URL"), api_key=os.getenv("MARQO_API_KEY"))
INDEX_NAME = os.getenv("MARQO_INDEX")


def compose_query(
    query: str,
    more_of: str,
    less_of: str,
    custom_instructions: str,
    favourites: List[str],
    search_settings: SearchSettings = None,
    style_modifier: str = None,
    prefix: str = None,
    advanced_settings: AdvancedSettings = None,
) -> Dict[str, float]:
    if not search_settings:
        search_settings = DEFAULT_SEARCH_SETTINGS

    composed_query = {}

    if more_of:
        if advanced_settings and advanced_settings.implicit_more_expansion:
            more_term = query + ", " + more_of
        else:
            more_term = more_of
        composed_query[more_term] = search_settings.pos_query_weight

    if less_of:
        composed_query[less_of] = search_settings.neg_query_weight

    if custom_instructions:
        composed_query[custom_instructions] = search_settings.custom_instruction_weight
    total_fav_weight = search_settings.total_favourite_weight

    for favourite in favourites:
        composed_query[favourite] = total_fav_weight / len(favourites)

    if query:
        main_term = query

        if not style_modifier and prefix:
            main_term = prefix + " " + query
        elif style_modifier:
            main_term = style_modifier.replace("<QUERY>", query)
        composed_query[main_term] = search_settings.query_weight

    if not composed_query:
        return {"": 1}

    return composed_query


def get_prefix(auto_prefix: bool, custom_prefix: str) -> str:
    if custom_prefix:
        return custom_prefix
    if auto_prefix:
        return QUERY_PREFIX
    return ""


def search(
    query: str,
    more_of: str,
    less_of: str,
    custom_instructions: str,
    favourites: List[str],
    search_settings: SearchSettings = None,
    style: str = None,
    advanced_settings: AdvancedSettings = None,
) -> List[SearchResult]:
    if not advanced_settings:
        advanced_settings = DEFAULT_ADVANCED_SETTINGS

    style_modifier = STYLE_MAPPING.get(style)

    prefix = get_prefix(advanced_settings.auto_prefix, advanced_settings.custom_prefix)

    composed_query = compose_query(
        query=query,
        more_of=more_of,
        less_of=less_of,
        custom_instructions=custom_instructions,
        favourites=favourites,
        search_settings=search_settings,
        style_modifier=style_modifier,
        prefix=prefix,
        advanced_settings=advanced_settings,
    )

    result = MQ.index(INDEX_NAME).search(composed_query, limit=advanced_settings.limit)

    return [
        SearchResult(
            id=r["_id"],
            name=r["multimodal"]["name"],
            price=float(r["price"]),
            image_url=r["multimodal"]["image_url"],
        )
        for r in result["hits"]
    ]
