import { AxiosInstance } from 'axios';
import axios from 'axios';
import { RESPONSE_TYPE } from './types/response.type.enum';

export class HttpClient {
  private httpClient: AxiosInstance;

  constructor(baseURL: string, acceptHeader: RESPONSE_TYPE) {
    this.httpClient = axios.create({
      baseURL,
      headers: {
        Accept: acceptHeader,
      },
      timeout: 5000,
    });
  }

  public async get<T>(requestUrl: string): Promise<T> {
    return this.httpClient.get<T>(requestUrl).then(response => response.data);
  }
}
