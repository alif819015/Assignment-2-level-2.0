import { TUser } from './user.interface';
import { User, Order, Product } from './user.model';

const createUserIntoDb = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('User Already Exists!');
  }
  const result = await User.create(userData);

  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  const result = await User.findOne({ userId });
  // const result = await User.aggregate([{ $match: { userId: userId } }]);
  return result;
};

const updateUserFromDB = async (
  userId: number,
  updatedUserData: Partial<TUser>,
): Promise<TUser | null> => {
  try {
    const user = await User.findOne({ userId });

    if (!user) {
      throw new Error('User not found');
    }

    if (updatedUserData.fullName) {
      user.fullName = { ...user.fullName, ...updatedUserData.fullName };
    }

    const updatedUser = await user.save();

    return updatedUser;
  } catch (error) {
    console.error('Updating user not found:', error);
    throw error;
  }
};

const deleteUserFromDB = async (userId: number) => {
  const result = await User.updateOne({ userId }, { isDeleted: true });
  return result;
};

const addToProductInOrder = async (
  userId: number,
  newProduct: Product,
): Promise<TUser | null> => {
  try {
    const user = await User.findOne({ userId });

    if (!user) {
      throw new Error('User not found');
    }

    if (!user.orders) {
      user.orders = [];
    }

    const newOrder: Order = {
      products: [newProduct],
      orderDate: new Date(),
    };

    user.orders.push(newOrder);

    // Save the updated user
    const updatedUser = await user.save();

    return updatedUser;
  } catch (error) {
    console.error('Error adding product to order:', error);
    throw error;
  }
};

export const UserServices = {
  createUserIntoDb,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  updateUserFromDB,
  addToProductInOrder,
};
