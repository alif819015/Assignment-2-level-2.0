import { User } from './user.interface';
import { UserModel } from './user.model';

const createUserIntoDb = async (users: User) => {
  const result = await UserModel.create(users);
  return result;
};

const getAllUserFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

export const UserServices = {
  createUserIntoDb,
  getAllUserFromDB,
};
