export enum JokeQLKey {
  id = 'id',
  joke = 'joke',
  permalink = 'permalink',
}

export interface JokeQL {
  id: string;
  joke: string;
  permalink?: string;
}
