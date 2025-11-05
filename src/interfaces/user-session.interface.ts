import { User } from "./user.interface";
import { Request } from "express";

export interface UserSession {
  _id: number;
  email: string;
  profile: {
    name?: string;
  };
}

export interface LoggedInResponse {
  user: User;
  token: string;
}

export interface HttpSessionRequest extends Request {
  user: UserSession;
}
