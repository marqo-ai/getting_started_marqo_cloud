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
  totalFavouriteWeight: number;
}

export interface SearchRequest {
  query: string;
  moreOf: string;
  lessOf: string;
  favourites: string[];
  searchSettings: SearchSettings;
}
