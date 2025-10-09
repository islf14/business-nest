export type UserPayload = Omit<UserDB, 'name'>;

export type UserDB = {
  id: number;
  name: string;
  email: string;
};
