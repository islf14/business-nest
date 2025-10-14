export type UserPayload = {
  id: number;
  email: string;
  role: string;
};

export type UserDB = {
  id: number;
  name: string;
  email: string;
};

declare module 'express' {
  export interface Request {
    user?: UserPayload;
  }
}
