import { IUnsubscribeable } from "models/unsubscribable.interface";
import apiClient from "./api-client.service";

interface IUserResponse {
  user: IUser;
}

export interface IUser {
  email: string;
  username: string;
  bio: string;
  image: string;
  token: string;
}

export class Authentication {
  private static inst: Authentication;

  private readonly localStorageKey = "auth";

  private callbacks: Array<(user: IUser) => void>;

  constructor() {
    if (!Authentication.inst) {
      Authentication.inst = this;
    } else {
      throw new Error("use instance");
    }

    this.callbacks = [];

    if (this.auth) {
      apiClient.setAuthorization(this.auth.token);
    }
  }

  static get instance() {
    return Authentication.inst;
  }

  public get auth(): IUser | null {
    const storageAuth = localStorage.getItem(this.localStorageKey);
    if (storageAuth) { return JSON.parse(storageAuth); }
    return null;
  }

  public set auth(auth: IUser | null) {
    if (auth) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(auth));
    } else {
      localStorage.removeItem(this.localStorageKey);
    }
  }

  public onAuthentication(callback: () => void): IUnsubscribeable {
    this.callbacks.push(callback);
    return {
      unsubscribe: () => {
        const index = this.callbacks.indexOf(callback);
        if (index !== -1) {
          this.callbacks.splice(index, 1);
        }
      },
    };
  }

  public authenticate(email: string, password: string): Promise<IUser> {
    const body = {
      user: {
        email,
        password,
      },
    };

    return apiClient.post<IUserResponse>("/users/login", body)
      .then((res) => {
        this.auth = res.user;

        apiClient.setAuthorization(res.user.token);
        for (const callback of this.callbacks) {
          callback(res.user);
        }

        return res.user;
      });
  }
}

export default Authentication;
