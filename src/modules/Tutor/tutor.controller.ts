import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { TutorService } from "./tutor.service";

const getAllTutors = async (req: Request, res: Response) => {
  try {
    const result = await TutorService.getAllTutors(req.query);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Tutors retrieved successfully",
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

const getTutorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await TutorService.getTutorById(id as any);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Tutor retrieved successfully",
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

const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const result = await TutorService.updateTutorProfile(userId, req.body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Profile updated successfully",
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

const updateAvailability = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { availabilityInfo } = req.body;
    const result = await TutorService.updateTutorAvailability(
      userId,
      availabilityInfo,
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Availability updated successfully",
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

export const TutorController = {
  getAllTutors,
  getTutorById,
  updateProfile,
  updateAvailability,
};
