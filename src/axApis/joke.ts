import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { JOKE_SERVER_URL } from '../redux/apis/joke/types';
import { Joke, JokeSearch, JokeSearchResponse } from '../redux/apis/joke/types';

const config: AxiosRequestConfig = {
  baseURL: JOKE_SERVER_URL,
  headers: {
    Accept: 'application/json',
  },
};

class JokeAxApi {
  private static instance: JokeAxApi;
  private static axios: AxiosInstance = axios.create(config);

  public static getInstance(): JokeAxApi {
    if (!JokeAxApi.instance) {
      JokeAxApi.instance = new JokeAxApi();
    }
    return JokeAxApi.instance;
  }
  getRandomJoke() {
    return JokeAxApi.axios.get<Joke>('');
  }

  getSearchJoke(queryStrings: JokeSearch) {
    return JokeAxApi.axios.get<JokeSearchResponse>('search', {
      params: queryStrings,
    });
  }
}

export default JokeAxApi;
