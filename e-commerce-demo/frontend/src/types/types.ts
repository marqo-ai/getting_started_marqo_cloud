export interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
}

export interface searchResult {
  id: string;
  name: string;
  price: number;
  image_url: string;
}

export interface SearchSettings {
  queryWeight: number;
  posQueryWeight: number;
  negQueryWeight: number;
  customInstructionsWeight: number;
  totalFavouriteWeight: number;
}

export interface SearchRequest {
  query: string;
  moreOf: string | null;
  lessOf: string | null;
  customInstructions: string | null;
  favourites: string[];
  searchSettings: SearchSettings;
}

export interface CustomInstructions {
  instructions: string | null;
}
