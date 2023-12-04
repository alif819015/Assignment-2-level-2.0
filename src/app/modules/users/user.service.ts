import { TUser } from './user.interface';
import { User } from './user.model';

// Creating users in the database
const createUserIntoDb = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('User Already Exists!');
  }
  const result = await User.create(userData);

  return result;
};

// get all users from database
const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

// get a single user from database
const getSingleUserFromDB = async (userId: number) => {
  const result = await User.findOne({ userId });
  const result1 = await User.aggregate([{ $match: { userId: userId } }]);
  return { result, result1 };
};

// update user from database
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

// delete a single user from database
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

    const addToProduct: any = {
      productName: newProduct.productName,
      price: newProduct.price,
      quantity: newProduct.quantity,
    };

    user.orders.push(addToProduct);

    await user.save();

    // single user update from database
    const updatedOrders = user.orders.map((order) => ({
      productName: order.productName,
      price: order.price,
      quantity: order.quantity,
    }));

    return updatedOrders;
  } catch (error) {
    console.error('User not found:', error);
    throw error;
  }
};

// get all product orders from database
const getAllOrders = async (userId: number) => {
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

// calculate the total order price
const calculateTotalPrice = async (userId: number) => {
  try {
    const user = await User.findOne({ userId });

    if (!user) {
      throw new Error('User not found');
    }

    const totalPrice =
      user.orders?.reduce(
        (acc, order) => acc + order.price * order.quantity,
        0,
      ) || 0;

    return totalPrice;
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
  calculateTotalPrice,
};
