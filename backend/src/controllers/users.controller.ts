import { Request, Response, NextFunction } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import User from "../models/user.model";
import httpStatusText from "../utils/httpStatusText";
import appError from "../utils/appError";
import { validationResult } from "express-validator";
import generateJWT from "../utils/generateJWT";

export const getAllUsers = async (req: Request, res: Response) => {
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const skip = (page - 1) * limit;
  const users = await User.find({}, { __v: false, password: false })
    .limit(limit)
    .skip(skip);
  res.json({
    status: httpStatusText.SUCCESS,
    data: { users },
  });
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = appError.create(errors.array(), 404, httpStatusText.FAIL);
    return next(error);
  }
  const { firstName, lastName, email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (user) {
    const error = appError.create(
      "User already exists",
      400,
      httpStatusText.FAIL
    );
    return next(error);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  const token = await generateJWT({
    email: newUser.email,
    id: newUser._id,
    role: newUser.role,
  });
  newUser.token = token;
  await newUser.save();
  res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { user: newUser } });
};

export const login = async (req: Request, res: Response) => {
  console.log(req.body);
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send("Invalid email or password");
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).send("Invalid email or password");
  }
  const token = jwt.sign({ userId: user._id }, "secretkey");
  res.send({ token, id: user._id, firstName: user.firstName, lastName: user.lastName });
};