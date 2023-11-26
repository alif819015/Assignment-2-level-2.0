import { User } from './user.interface';
import { UserModel } from './user.model';

const createUserIntoDb = async (users: User) => {
  const result = await UserModel.create(users);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const result = await UserModel.findOne({ id });
  return result;
};

export const UserServices = {
  createUserIntoDb,
  getAllUsersFromDB,
  getSingleUserFromDB,
};
