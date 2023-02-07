export enum JokeQLKey {
  id = 'id',
  joke = 'joke',
  permalink = 'permalink',
}

export type JokeQLOptions = {
  [key in JokeQLKey]: boolean;
};

export interface JokeQL {
  id: string;
  joke: string;
  permalink?: string;
}
