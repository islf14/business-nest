export type UserPayload = {
  id: number;
  email: string;
};

export interface UserDB {
  userId: number;
  email: string;
}
