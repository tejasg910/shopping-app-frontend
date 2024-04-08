import { User } from "./types";

export type messageResponse = {
  success: boolean;
  message: string;
};

export type userResponse = {
  success: boolean;
  message: string;
  data: User;
};
