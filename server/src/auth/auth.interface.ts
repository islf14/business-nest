import { $Enums } from 'generated/prisma';

export type UserPayload = {
  id: number;
  email: string;
  role: string;
};

export type UserDB = {
  id: number;
  name: string;
  email: string;
  role: $Enums.Role;
};

export type UserShow = Omit<UserDB, 'id'>;

declare module 'express' {
  export interface Request {
    user?: UserPayload;
  }
}
