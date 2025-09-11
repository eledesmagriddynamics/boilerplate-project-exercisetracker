import { Request } from "express";
import { User } from "./userInterface";

export interface RequestWithUser extends Request {
  user?: User;
}