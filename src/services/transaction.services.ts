const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import randomString from "../utils/randomString";
const multer = require("multer"); 
import activityLogger from "../helpers/logger";
import { generateString } from "../helpers/constants";
const fs = require("fs");
const knex = require("../config/connect");
// import {SignUp, SignIn} from "../interfaces/t.interface"
import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
} from "../core/ApiError";
import Jwt from "../core/Jwt";


class TransactionService {
  public static async updateUserAccountBalance(amount: number, user) {

  return knex('users')
  .where({ slug: user.id })
  .update({
    balance: amount
  })

  }

  public static async updateUserAccountBalanceByAccountBalance(amount: number, accountNumber) {

  return knex('users')
  .where({ account_number: accountNumber })
  .update({
    balance: amount
  })

  }


  public static async recordTransaction(amount: number, creditor: number, debtor: number, type){
    const slug: string = generateString(4, true, false);

    return knex("transactions")
      .insert({
        slug: slug,
        creditor: creditor,
        debtor: debtor,
        reference: slug,
        amount: amount,
        type: type,
        status: 1
      })
  }

  public static async getTransactionHistory(user) {
    return knex("transactions")
    .select({
      type: "type",
      reference: "reference",
      slug: "slug",
      creditor: "creditor",
      debtor: "debtor",
    })
    .where({ creditor: user.accountNumber })
    .orWhere({ debtor: user.accountNumber })
    .then((user) => {
      return user;
    }); 
  }

}

export default TransactionService;
