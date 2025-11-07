import { User } from "./user.interface";
import { Request } from "express";

export interface UserSession {
  id: number;
  email: string;
  profile: {
    name?: string;
  };
}

export interface LoggedInResponse {
  user: User,
  token: string;
  permissions: string[]
}

export interface HttpSessionRequest extends Request {
  user: UserSession;
  permissions: string[]
}
