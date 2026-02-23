import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { BookingsService } from "./bookings.service";

const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await BookingsService.createBooking(req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Booking created successfully",
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

const getUserBookings = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const role = req.user?.role;
    const result = await BookingsService.getUserBookings(userId, role);

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

const getBookingById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await BookingsService.getBookingById(id as string);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Booking retrieved successfully",
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

const updateBookingStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await BookingsService.updateBookingStatus(
      id as string,
      status,
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Booking updated successfully",
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

export const BookingsController = {
  createBooking,
  getUserBookings,
  getBookingById,
  updateBookingStatus,
};
