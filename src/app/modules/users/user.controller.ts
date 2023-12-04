import { Request, Response } from 'express';
import { UserServices } from './user.service';

// create user controller
const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    const result = await UserServices.createUserIntoDb(userData);
    const userResponse = result.toJSON();
    delete userResponse.password;

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: userResponse,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: 'User not found!',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// get all users controller
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: 'User not found!',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// get single user controller
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userIdConvert = parseInt(userId);
    const result = await UserServices.getSingleUserFromDB(userIdConvert);
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: 'User not found!',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// update single user controller
const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const updatedUserData = req.body;

    const result = await UserServices.updateUserFromDB(userId, updatedUserData);
    delete result?.password;

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'User not found!',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// delete single user controller
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userIdConvert = parseInt(userId);
    const result = await UserServices.deleteUserFromDB(userIdConvert);
    res.status(200).json({
      success: true,
      message: 'User Deleted Successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: 'User not found!',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// add product to the order controller
const addProductToOrder = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const newProduct = req.body;

    const updatedUser = await UserServices.addToProductInOrder(
      userId,
      newProduct,
    );

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: updatedUser,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// get all order controller
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);

    const orders = await UserServices.getAllOrders(userId);

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: { orders },
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// calculate total product price controller
const totalPriceOfProduct = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);

    const totalPrice = await UserServices.calculateTotalPrice(userId);

    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice,
      },
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
  addProductToOrder,
  getAllOrders,
  totalPriceOfProduct,
};
