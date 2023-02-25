import { Request, Response } from "express";
import User from "../../models/userModel/userModel";
import ILastReportModel from "./interfaceLastReportModel";

export default {
  async create(req: Request, res: Response) {
    try {
      const { image, title, subTitle, description, cardGameName, id, comments, likes }: ILastReportModel = req.body;
    } catch (error) {
      res.status(400).send({ message: "Erro in LastReports", error });
    }
  },
};
