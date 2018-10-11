import { API_URI } from "constants";

export interface IHeaderMap { [x: string]: string; }

export default class ApiClient {
  public static get<T>(uri: string, headers: IHeaderMap = {}): Promise<T> {
    return fetch(API_URI + uri, {
      headers: {
        ...ApiClient.defaultHeaders,
        ...headers,
      },
    })
      .then((res) => res.json());
  }

  public static post<T>(uri: string, body: any, headers: IHeaderMap = {}): Promise<T> {
    return fetch(API_URI + uri, {
      body: JSON.stringify(body),
      headers: {
        ...ApiClient.defaultPostHeaders,
        ...headers,
      },
    }).then((res) => res.json());
  }

  public static setAuthorization(token: string | null): void {
    if (token) {
      ApiClient.defaultPostHeaders.Authorization = `Bearer ${token}`;
    } else {
      delete ApiClient.defaultPostHeaders.Authorization;
    }
  }

  private static readonly defaultHeaders: IHeaderMap = {
    Accept: "application/json",
  };

  private static readonly defaultPostHeaders: IHeaderMap = {
    ...ApiClient.defaultHeaders,
    "Content-Type": "application/json",
  };
}
