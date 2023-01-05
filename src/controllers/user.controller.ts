import express, { Request, Response } from "express";
import asyncHandler from "../middleware/async";
import UserService from "../services/user.services";
const { validateParameters } = require("../utils/validateParameters");
import {SignUp, SignIn} from "../interfaces/user.interface"
import {
  BadRequestDataResponse,
  CreatedResponse,
  SuccessResponse,
} from "../core/ApiResponse";
import { BadRequestError } from "../core/ApiError";
exports.addUser = asyncHandler(
  async (req: Request, res: Response) => {
    // validator
    const { isValid, messages } = validateParameters(
      [
        "firstName",
        "lastName",
        "email",
        "phone",
        "password"
      ],
      req.body
    );

    if (!isValid) {
      throw new BadRequestError();
    }

    await UserService.addUser(req.body);

    return new CreatedResponse("Success", []).send(res);
  }

);

exports.signin = asyncHandler(
  async (req: Request, res: Response) => {

    const response = await UserService.signin(req.body);
    return new SuccessResponse("Success", response).send(res);
  }
)

exports.getAccountBalance = asyncHandler(
  async (req: Request, res: Response) => {

    const response = await UserService.getAccountBalance(res.locals.user);
    return new SuccessResponse("Success", response).send(res);
  }
)