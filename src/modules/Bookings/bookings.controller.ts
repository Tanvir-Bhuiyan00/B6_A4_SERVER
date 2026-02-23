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

export const BookingsController = {
  createBooking,
};
