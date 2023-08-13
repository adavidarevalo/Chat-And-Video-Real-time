export interface User {
  _id: string;
  name: string;
  email: string;
  picture: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}
