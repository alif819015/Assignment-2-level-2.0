import { Schema, model } from 'mongoose';
import { User } from './user.interface';

const userSchema = new Schema<User>({
  id: { type: String, required: true },
  username: { type: String, required: true },
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['male', 'female'], required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String], enum: ['Sports', 'Cording'] },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  orders: {
    type: [{ productName: String, price: Number, quantity: Number }],
  },
});

export const UserModel = model<User>('User', userSchema);
