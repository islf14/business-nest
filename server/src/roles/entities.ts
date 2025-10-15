export class User {
  id: number;
  role: string;
}

export class Company {
  id: number;
  isPublished: boolean;
  userId: number;
}
