export interface IUserResponse {
  user: IUser;
}

export interface IUser {
  email: string;
  username: string;
  bio: string;
  image: string;
  token: string;
}
