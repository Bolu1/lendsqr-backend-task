const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import randomString from "../utils/randomString";
const multer = require("multer"); 
import activityLogger from "../helpers/logger";
import { generateString } from "../helpers/constants";
const fs = require("fs");
const knex = require("../config/connect");
import {TransactionHistory} from "../interfaces/transaction.interface"
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
      })    .then((id) => {
        //get transaction by id
        return knex('transactions')
            .select({
              type: "type",
              reference: "reference",
              slug: "slug",
              creditor: "creditor",
              debtor: "debtor",
        })
            .where({id})
            .then((user: [TransactionHistory]) => {
            console.log(user[0]);
            return user[0]
        })
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
    .then((user: [TransactionHistory]) => {
      return user;
    }); 
  }

}

export default TransactionService;
