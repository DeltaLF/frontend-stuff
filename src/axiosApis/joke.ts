import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { JOKE_SERVER_URL } from '../redux/apis/joke/jokeApi';
import { Joke, JokeSearch, JokeSearchResponse } from '../redux/apis/joke/types';

const config: AxiosRequestConfig = {
  baseURL: JOKE_SERVER_URL,
  headers: {
    Accept: 'application/json',
  },
};

class JokeAxiosApi {
  private static instance: JokeAxiosApi;
  private static axios: AxiosInstance = axios.create(config);

  public static getInstance(): JokeAxiosApi {
    if (!JokeAxiosApi.instance) {
      JokeAxiosApi.instance = new JokeAxiosApi();
    }
    return JokeAxiosApi.instance;
  }
  getRandomJoke() {
    return JokeAxiosApi.axios.get<Joke>('');
  }

  getSearchJoke(queryStrings: JokeSearch) {
    return JokeAxiosApi.axios.get<JokeSearchResponse>('search', {
      params: queryStrings,
    });
  }
}

export default JokeAxiosApi;
