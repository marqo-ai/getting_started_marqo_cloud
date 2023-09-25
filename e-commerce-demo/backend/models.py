from pydantic import BaseModel


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
            query_weight, pos_query_weight, neg_query_weight, custom_instruction_weight, total_favourite_weight
        )


class SearchResult(BaseModel):
    id: str
    name: str
    price: float
    image_url: str

    def __dict__(self):
        return {"id": self.id, "title": self.name, "price": self.price, "image_url": self.image_url}


STYLE_MAPPING = {
    "photorealistic": "A high-resolution, lifelike stock photo of a <QUERY>",
    "stylized": "An image of a <QUERY> rendered in a unique, stylized manner",
    "lowpoly": "A 3D low polygon angular render of a <QUERY>",
    "artistic": "An image resembling a masterpiece, portraying a <QUERY>",
    "cartoon": "An image in the style of Saturday morning cartoons featuring a <QUERY>",
    "abstract": "An image inspired by modern art, abstractly representing a <QUERY>",
    "pixelart": "An 8-bit or 16-bit pixel art representation of a <QUERY>",
    "vector": "A clean, scalable vector graphic of a <QUERY>",
    "minimalistic": "A photo emphasizing simplicity and minimalism, showing a <QUERY>",
    "grayscale": "A black and white, monochromatic image of a <QUERY>",
    "vintage": "An image of a <QUERY> with a retro or vintage aesthetic",
    "cyberpunk": "An image of a <QUERY> set in a neon-lit, futuristic cyberpunk world",
    "steampunk": "An image blending Victorian and industrial elements, depicting a <QUERY>",
    "realism": "A hyper-realistic, detailed image of a <QUERY>",
    "impressionist": "An image mimicking the impressionist art movement, showing a <QUERY>",
    "surreal": "A surreal, dream-like image of a <QUERY>",
    "sketch": "A hand-drawn sketch or pencil drawing of a <QUERY>",
    "popart": "An image in the style of pop art, featuring a <QUERY>",
    "watercolor": "A watercolor painting-like image of a <QUERY>",
    "oilpaint": "An oil painting-like image, rich in texture, of a <QUERY>",
    "glitch": "A glitch-art styled, distorted image of a <QUERY>",
    "neon": "An image of a <QUERY> with vibrant, neon colors",
    "noir": "A film-noir inspired, high-contrast image of a <QUERY>",
    "fantasy": "A fantastical, otherworldly image of a <QUERY>",
    "comic": "An image resembling a comic book panel, featuring a <QUERY>",
    "isometric": "An isometrically projected image of a <QUERY>",
    "outline": "An outline line art depiction of a <QUERY>",
}
