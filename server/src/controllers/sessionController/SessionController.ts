import { Request, Response } from "express";
import { IUserModel } from "../../models/userModel/interfaceIUserModel";
import User from "../../models/userModel/userModel";
import bCrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "./src/.env" });

export default {
  async create(req: Request, res: Response) {
    try {
      const { userEmail, userPassword }: IUserModel = req.body;

      if (!userEmail || !userPassword) {
        return res.status(400).send({ message: "Fill the fields correctly" });
      }
      const userAlreadyExists = await User.findOne<Promise<IUserModel>>({ userEmail });
      if (!userAlreadyExists) {
        return res.status(400).send({ message: "User not found" });
      }

      const validPassword = await bCrypt.compare(userPassword, userAlreadyExists?.userPassword);

      if (!validPassword) {
        return res.status(400).send({ message: "Wrong email or password" });
      }
      const token = jwt.sign(
        {
          email: userAlreadyExists,
        },
        process.env.JWT_KEY!,
        {
          expiresIn: "1h",
        }
      );
      return userAlreadyExists && res.send({ userEmail: userAlreadyExists?.userEmail, token: token });
    } catch (error) {
      return res.status(500).send({ message: "Internal server error" });
    }
  },
};
