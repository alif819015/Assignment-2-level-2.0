// import { Schema, model, connect } from 'mongoose';

export type Orders = {
  productName: string;
  price: number;
  quantity: number;
};

export type User = {
  id: string;
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
  hobbies: 'Sports' | 'Cording';
  address: {
    street: string;
    city: string;
    country: string;
  };
  orders: Orders[];
};
