export class User {
  id: number;
  isAdmin: boolean;
}

export class Company {
  id: number;
  isPublished: boolean;
  userId: number;
}
