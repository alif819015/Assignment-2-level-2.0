import { Request, Response } from 'express';
import { UserServices } from './user.service';

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
      message: err.message || 'Something went Wrong',
      error: err,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'Users are Retrieved Successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'User not found!',
      error: err,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userIdConvert = parseInt(userId);
    const result = await UserServices.getSingleUserFromDB(userIdConvert);
    res.status(200).json({
      success: true,
      message: 'User are Retrieved Successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'User not found!',
      error: err,
    });
  }
};

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
      message: err.message || 'User not found!',
      error: err,
    });
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
};
