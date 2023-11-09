class SearchResult:
    def __init__(self, id: str, name: str, price: float, image_url: str):
        self.id = id
        self.name = name
        self.price = price
        self.image_url = image_url

    def __dict__(self):
        return {
            "id": self.id,
            "name": self.name,
            "price": self.price,
            "image_url": self.image_url,
        }

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "price": self.price,
            "image_url": self.image_url,
        }


class SearchSettings:
    def __init__(
        self,
        query_weight: float,
        pos_query_weight: float,
        neg_query_weight: float,
        custom_instruction_weight: float,
        total_favourite_weight: float,
    ):
        self.query_weight = query_weight
        self.pos_query_weight = pos_query_weight
        self.neg_query_weight = neg_query_weight
        self.custom_instruction_weight = custom_instruction_weight
        self.total_favourite_weight = total_favourite_weight

    @classmethod
    def from_dict(cls, data: dict):
        query_weight = data.get("queryWeight")
        pos_query_weight = data.get("posQueryWeight")
        neg_query_weight = data.get("negQueryWeight")
        custom_instruction_weight = data.get("customInstructionsWeight")
        total_favourite_weight = data.get("totalFavouriteWeight")
        return SearchSettings(
            query_weight,
            pos_query_weight,
            neg_query_weight,
            custom_instruction_weight,
            total_favourite_weight,
        )


class AdvancedSettings:
    def __init__(
        self,
        auto_prefix: bool,
        implicit_more_expansion: bool,
        custom_prefix: str,
        limit: int,
    ):
        self.auto_prefix = auto_prefix
        self.implicit_more_expansion = implicit_more_expansion
        self.custom_prefix = custom_prefix
        self.limit = limit

    @classmethod
    def from_dict(cls, data: dict):
        auto_prefix = data.get("autoPrefix", True)
        implicit_more_expansion = data.get("implicitMoreExpansion", True)
        custom_prefix = data.get("customPrefix", "")
        limit = data.get("limit", 50)
        if limit is None:
            limit = 50
        return AdvancedSettings(
            auto_prefix,
            implicit_more_expansion,
            custom_prefix,
            limit,
        )
