import { User } from './user.interface';
import { UserModel } from './user.model';

const createUserIntoDb = async (users: User) => {
  const result = await UserModel.create(users);
  return result;
};

export const UserServices = {
  createUserIntoDb,
};
