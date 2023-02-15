import User from "../../models/userModel/userModel";
import bCrypt from "bcrypt";
import { Request, Response } from "express";
import { IUserModel } from "../../models/userModel/interfaceIUserModel";

const hashPassword = async (userPassword: string) => {
  try {
    const salt = await bCrypt.genSalt(10);
    const encryptedPassword = await bCrypt.hash(userPassword, salt);
    return encryptedPassword;
  } catch (err) {
    return console.error(err);
  }
};

export default {
  async create(req: Request, res: Response) {
    try {
      const { userName, userEmail, userPassword }: IUserModel = req.body;

      if (!userName || !userEmail || !userPassword) {
        return res.status(400).send({ message: "Please, fill the fields" });
      }

      const userAlreadyExists = await User.findOne<Promise<IUserModel>>({ userEmail });
      if (userAlreadyExists) {
        return res.status(400).send({ message: "User already exists" });
      }

      const hashedPassword = await hashPassword(userPassword);
      const newUser = new User({
        userName,
        userEmail,
        userPassword: hashedPassword,
      });
      newUser.save((error: any) => {
        if (error) {
          return res.status(400).send({ message: "Fill in the fields correctly" });
        } else {
          return res.status(200).send({ message: "User successfully registered!" });
        }
      });
    } catch (error) {
      throw res.status(500).send({ message: "Internal server error" });
    }
  },
};
