import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDb = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('User Already Exists!');
  }
  const result = await User.create(userData);

  // return result;
  // const user = new User(userData);
  // if (await user.isUserExists(userData.userId)) {
  //   throw new Error('User Already Exists!');
  // }
  // const result = await user.save();
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  const result = await User.findOne({ userId });
  return result;
};

export const UserServices = {
  createUserIntoDb,
  getAllUsersFromDB,
  getSingleUserFromDB,
};
