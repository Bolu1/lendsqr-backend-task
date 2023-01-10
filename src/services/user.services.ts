const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import randomString from "../utils/randomString";
const multer = require("multer");
import { generateString } from "../helpers/constants";
const fs = require("fs");
const knex = require("../config/connect");
import { SignUp, SignIn, SignInResponse, UserInformation } from "../interfaces/user.interface";
import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  InternalError,
} from "../core/ApiError";
import Jwt from "../core/Jwt";

class UserService {
  public static async addUser(body: SignUp) {
    const slug: string = generateString(4, true, false);
    // hash password
    const hashedPassword = await bcrypt.hash(body.password, 12);
    // generate account number
    const accountNumber = parseInt(randomString(10, 0));
    // check if phone is taken
    const userPhone = await this.getUserByPhone(body.phone);
    console.log(userPhone);
    if (userPhone) {
      throw new ConflictError("Phone number is already in use");
    }
    // check if email is taken
    const userEmail = await this.getUserByEmail(body.email);
    if (userEmail) {
      throw new ConflictError("Email is already in use");
    }

    return knex("users")
      .insert({
        slug: slug,
        email: body.email,
        account_number: accountNumber,
        firstname: body.firstName,
        lastname: body.lastName,
        phone: body.phone,
        password: hashedPassword,
      })
      .catch((err) => {
        console.error(err);
        throw new InternalError("Something went wrong, please try again");
      });
  }

  public static async signin(body: SignIn) {
    const user = await this.getUserByEmail(body.email);
    if (!user) {
      throw new BadRequestError("Invalid login details");
    }

    const valid = await bcrypt.compare(body.password, user.password);
    if (!valid) {
      throw new BadRequestError("Invalid login details");
    }

    const authToken = await Jwt.issue({
      id: user.slug,
      accountNumber: user.account_number,
    });

    const payload:SignInResponse = {
      id: user.slug,
      firstName: user.firstname,
      lastName: user.lastname,
      accountNumber: user.account_number,
      balance: user.balance,
      token: authToken
    };
    return payload;
  }

  public static async getUserByPhone(phone: string) {
    return knex("users")
      .select({
        id: "id",
        slug: "slug",
        account_number: "account_number",
        password: "password",
        balance: "balance",
        firstname: "firstname",
        lastname: "lastname",
        phone: "phone",
        email: "email",
      })
      .where({ phone: phone })
      .then((user: [UserInformation]) => {
        return user[0];
      });
  }

  public static async getUserByEmail(email: string) {
    return knex("users")
      .select({
        id: "id",
        slug: "slug",
        account_number: "account_number",
        password: "password",
        firstname: "firstname",
        lastname: "lastname",
        phone: "phone",
        balance: "balance",
        email: "email",
      })
      .where({ email: email })
      .then((user: [UserInformation]) => {
        return user[0];
      });
  }

  public static async getAccountBalance(user) {
    return knex("users")
    .select({
      balance: "balance"
    })
    .where({ slug: user.id })
    .then((user: [UserInformation]) => {
      return user[0];
    }); 
  }

  public static async getAccountBalanceByAccountNumber(accountNumber) {
    return knex("users")
    .select({
      balance: "balance"
    })
    .where({ account_number: accountNumber })
    .then((user) => {
      return user[0];
    }); 
  }


  public static async getUserByAccountNumber(accountNumber: number) {
    return knex("users")
      .select({
        id: "id",
        slug: "slug",
        account_number: "account_number",
        password: "password",
        balance: "balance",
        firstname: "firstname",
        lastname: "lastname",
        phone: "phone",
        email: "email",
      })
      .where({ account_number: accountNumber })
      .then((user: [UserInformation]) => {
        return user[0];
      });
  }
}

export default UserService;
