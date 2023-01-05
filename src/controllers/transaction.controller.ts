import express, { Request, Response } from "express";
import asyncHandler from "../middleware/async";
import TansactionSerivce from "../services/transaction.services";
import UserService from "../services/user.services";
const { validateParameters } = require("../utils/validateParameters");
import { SignUp, SignIn } from "../interfaces/user.interface";
import {
  BadRequestDataResponse,
  CreatedResponse,
  SuccessResponse,
} from "../core/ApiResponse";
import { BadRequestError } from "../core/ApiError";

exports.deposit = asyncHandler(async (req: Request, res: Response) => {
  // validator

  if (!req.body.amount) {
    throw new BadRequestError("Please enter an amount");
  }

  if (req.body.amount < 50) {
    throw new BadRequestError("The minimum deposit is 50 naira");
  }

  if (req.body.amount > 10000000) {
    throw new BadRequestError("The maximum deposit is 10000000 naira");
  }

  // check user's balance
  const currentBalance = await UserService.getAccountBalance(res.locals.user);

  const newBalance = currentBalance.balance + req.body.amount

  await TansactionSerivce.updateUserAccountBalance(
    newBalance,
    res.locals.user
  );
  await TansactionSerivce.recordTransaction(
    req.body.amount,
    res.locals.user.accountNumber,
    null,
    "deposit"
  );
  return new SuccessResponse("Success", []).send(res);
});

exports.withdraw = asyncHandler(async (req: Request, res: Response) => {
  if (!req.body.amount) {
    throw new BadRequestError("Please enter an amount");
  }

  if (req.body.amount < 50) {
    throw new BadRequestError("The minimum withdrawal is 50 naira");
  }

  if (req.body.amount > 100000) {
    throw new BadRequestError("The maximum withdrawal is 100000 naira");
  }

  // check user's balance and compute new balance
  const currentBalance = await UserService.getAccountBalance(res.locals.user);
  if(currentBalance.balance > currentBalance){

    throw new BadRequestError("Insufficient funds")
  };

  const newBalance = currentBalance.balance - req.body.amount

  await TansactionSerivce.updateUserAccountBalance(newBalance, res.locals.user);
  await TansactionSerivce.recordTransaction(
    req.body.amount,
    null,
    res.locals.user.accountNumber,
    "deposit"
  );
  return new SuccessResponse("Success", []).send(res);
});

exports.transfer = asyncHandler(async (req: Request, res: Response) => {
  if (!req.body.amount) {
    throw new BadRequestError("Please enter an amount");
  }

  if (req.body.amount < 50) {
    throw new BadRequestError("The minimum transfer is 50 naira");
  }

  if (req.body.amount > 100000) {
    throw new BadRequestError("The maximum transfer is 100000 naira");
  }

  const currentBalance = await UserService.getAccountBalance(res.locals.user);
  if(currentBalance.balance < req.body.amount){
    throw new BadRequestError("Insufficent funds");

  }

  // check user's balance
  const creditorCurrentBalance = await UserService.getAccountBalanceByAccountNumber(req.body.creditor);

  // update creditor account
  await TansactionSerivce.updateUserAccountBalanceByAccountBalance(creditorCurrentBalance.balance + req.body.amount, req.body.creditor);

  // update debitor account
  await TansactionSerivce.updateUserAccountBalance(currentBalance.balance - req.body.amount, res.locals.user);
  await TansactionSerivce.recordTransaction(
    req.body.amount,
    req.body.creditor,
    res.locals.user.accountNumber,
    "deposit"
  );
  return new SuccessResponse("Success", []).send(res);
});

exports.getTransactionHistory = asyncHandler(
  async (req: Request, res: Response) => {

    const response = await TansactionSerivce.getTransactionHistory(res.locals.user);
    console.log(response)
    return new SuccessResponse("Success", response).send(res);
  }
)