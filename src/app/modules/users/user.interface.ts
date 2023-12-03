import { Model } from 'mongoose';

export type TOrders = {
  products: any;
  productName: string;
  price: number;
  quantity: number;
};

export type TUser = {
  password: string;
  userId: number;
  username: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  gender: 'male' | 'female';
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  orders?: TOrders[];
  isDeleted: boolean;
};

export interface UserModel extends Model<TUser> {
  isUserExists(userId: number): Promise<TUser | null>;
}
