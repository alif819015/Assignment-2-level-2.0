import { TUser } from './user.interface';
import { User } from './user.model';

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

const addToProductInOrder = async (userId: number, newProduct: any) => {
  try {
    const user = await User.findOne({ userId });

    if (!user) {
      throw new Error('User not found');
    }

    if (!user.orders) {
      user.orders = [];
    }

    const productToAdd = {
      productName: newProduct.productName,
      price: newProduct.price,
      quantity: newProduct.quantity,
    };

    const newOrder: Orders = {
      products: [
        ...user.orders.flatMap((order) => order.products),
        productToAdd,
      ],
    };

    user.orders.push(newOrder);

    await user.save();

    return newOrder;
  } catch (error) {
    console.error('User not found:', error);
    throw error;
  }
};

const getAllOrders = async (userId: number): Promise<Order[] | null> => {
  try {
    const user = await User.findOne({ userId });

    if (!user) {
      throw new Error('User not found');
    }

    const orders =
      user.orders?.map((order) => ({
        productName: order.productName,
        price: order.price,
        quantity: order.quantity,
      })) || [];

    return orders;
  } catch (error) {
    console.error('User not found:', error);
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
  getAllOrders,
};
