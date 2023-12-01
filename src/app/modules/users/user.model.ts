import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import validator from 'validator';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser, UserModel>({
  id: {
    type: String,
    required: [true, 'ID is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'ID is required'],
    unique: true,
    maxlength: [20, 'Password can not be more then 20 character'],
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

// pre save middleware hook
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  // hashing password
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// post save middleware hook
userSchema.post('save', function () {
  console.log(this, 'post hook');
});

userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

// userSchema.methods.isUserExists = async function (userId: number) {
//   const existingUser = await User.findOne({ userId });
//   return existingUser;
// };

export const User = model<TUser, UserModel>('User', userSchema);
