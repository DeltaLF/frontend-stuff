export const JOKE_SERVER_URL = 'https://icanhazdadjoke.com/';

export interface Joke {
  id: string;
  joke: string;
  status: number;
}

export interface JokeSearch {
  page?: number;
  limit?: number;
  term?: string;
}

type JokeSearchResponseResult = {
  id: string;
  joke: string;
};
export interface JokeSearchResponse {
  current_page: number;
  limit: number;
  next_page: number;
  previous_page: number;
  results: JokeSearchResponseResult[];
  search_term: string;
  status: number;
  total_jokes: number;
  total_pages: number;
}
