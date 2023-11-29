import { Schema, model } from 'mongoose';
import { User } from './user.interface';
import validator from 'validator';

const userSchema = new Schema<User>({
  id: {
    type: String,
    required: [true, 'ID is required'],
    unique: true,
  },
  userId: {
    type: Number,
    required: [true, 'ID is required'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
  },
  fullName: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: { type: String, required: true },
  },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['male', 'female'], required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: `{VALUE} is not valid email`,
    },
  },
  isActive: { type: Boolean, required: true },
  hobbies: {
    type: String,
    enum: {
      values: ['Sports', 'Cording'],
    },
  },
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
