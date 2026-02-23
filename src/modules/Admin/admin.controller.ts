import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { AdminService } from "./admin.service";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await AdminService.getAllUsers(req.query);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Users retrieved successfully",
      data: result,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Something went wrong!!",
      data: error,
    });
  }
};

const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { isBanned } = req.body;
    const result = await AdminService.updateUserStatus(id as string, isBanned);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User status updated successfully",
      data: result,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Something went wrong!!",
      data: error,
    });
  }
};

const getAllBookings = async (req: Request, res: Response) => {
  try {
    const result = await AdminService.getAllBookings();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Bookings retrieved successfully",
      data: result,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Something went wrong!!",
      data: error,
    });
  }
};

const getAllCategories = async (req: Request, res: Response) => {
  try {
    const result = await AdminService.getAllCategories();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Categories retrieved successfully",
      data: result,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Something went wrong!!",
      data: error,
    });
  }
};

const createCategory = async (req: Request, res: Response) => {
  try {
    const result = await AdminService.createCategory(req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Category created successfully",
      data: result,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Something went wrong!!",
      data: error,
    });
  }
};

const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await AdminService.updateCategory(id as string, req.body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Category updated successfully",
      data: result,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Something went wrong!!",
      data: error,
    });
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await AdminService.deleteCategory(id as string);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Category deleted successfully",
      data: result,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Something went wrong!!",
      data: error,
    });
  }
};

export const AdminController = {
  getAllUsers,
  updateUserStatus,
  getAllBookings,
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
