from pydantic import BaseModel


class SearchSettings:
    def __init__(
        self,
        query_weight: float,
        pos_query_weight: float,
        neg_query_weight: float,
        total_favourite_weight: float,
    ):
        self.query_weight = query_weight
        self.pos_query_weight = pos_query_weight
        self.neg_query_weight = neg_query_weight
        self.total_favourite_weight = total_favourite_weight

    @classmethod
    def from_dict(cls, data: dict):
        query_weight = data.get("queryWeight")
        pos_query_weight = data.get("posQueryWeight")
        neg_query_weight = data.get("negQueryWeight")
        total_favourite_weight = data.get("totalFavouriteWeight")
        return SearchSettings(
            query_weight, pos_query_weight, neg_query_weight, total_favourite_weight
        )


class SearchResult(BaseModel):
    id: str
    name: str
    price: float
    image_url: str

    def __dict__(self):
        return {"title": self.title, "price": self.price, "image_url": self.image_url}
