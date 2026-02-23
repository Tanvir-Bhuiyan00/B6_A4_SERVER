import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { ReviewsService } from "./reviews.service";

const createReview = async (req: Request, res: Response) => {
  try {
    const result = await ReviewsService.createReview(req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Review created successfully",
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

const getTutorReviews = async (req: Request, res: Response) => {
  try {
    const { tutorId } = req.params;
    const result = await ReviewsService.getTutorReviews(tutorId as string);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Reviews retrieved successfully",
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

const updateReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await ReviewsService.updateReview(id as string, req.body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Review updated successfully",
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

export const ReviewsController = {
  createReview,
  getTutorReviews,
  updateReview,
};
