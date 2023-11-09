from models import SearchSettings, AdvancedSettings

QUERY_PREFIX = "e-commerce listing for"

DEFAULT_SEARCH_SETTINGS = SearchSettings(
    query_weight=1.0,
    pos_query_weight=0.75,
    neg_query_weight=-1.1,
    custom_instruction_weight=0.3,
    total_favourite_weight=0.5,
)

DEFAULT_ADVANCED_SETTINGS = AdvancedSettings(
    auto_prefix=True,
    implicit_more_expansion=True,
    custom_prefix="",
    limit=100,
)

STYLE_MAPPING = {
    "formal": "A sophisticated and elegant <QUERY> suitable for formal occasions",
    "streetwear": "A trendy and urban <QUERY> inspired by street fashion trends",
    "casual": "A comfortable and relaxed <QUERY> for everyday wear",
    "sporty": "An athletic and functional <QUERY> for sports and active lifestyles",
    "bohemian": "An eclectic and free-spirited <QUERY> with a boho-chic vibe",
    "business": "A professional and polished <QUERY> for a business setting",
    "vintage": "A retro-inspired <QUERY> with a nostalgic feel",
    "beachwear": "A breezy and summery <QUERY> perfect for beach outings",
    "evening": "An elegant <QUERY> suitable for evening events and parties",
    "minimalist": "A simple and clean <QUERY> with a minimalist design",
    "workout": "A durable and supportive <QUERY> for gym or home workouts",
    "outdoor": "A rugged and durable <QUERY> for outdoor activities",
    "lounge": "A cozy and soft <QUERY> for lounging at home",
    "party": "A festive and eye-catching <QUERY> for parties and celebrations",
    "preppy": "A classic and smart <QUERY> with a preppy style",
    "glam": "A glamorous and shiny <QUERY> for a standout look",
    "festival": "A bold and colorful <QUERY> perfect for music festivals",
    "holiday": "A festive <QUERY> ideal for holiday celebrations",
    "winter": "A warm and insulated <QUERY> for cold winter days",
    "summer": "A light and airy <QUERY> for hot summer days",
}
