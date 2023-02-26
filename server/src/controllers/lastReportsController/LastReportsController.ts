import { Request, Response } from "express";
import ILastReportModel from "../../models/lastReportModel/interfaceLastReportModel";
import LastReport from "../../models/lastReportModel/lastReportModel";

export default {
  async create(req: Request, res: Response) {
    try {
      const { image, title, subTitle, description, cardGameName, date, comments, likes }: ILastReportModel = req.body;

      const newLastReport = new LastReport({
        image,
        title,
        subTitle,
        description,
        cardGameName,
        date,
        comments,
        likes,
      });

      newLastReport.save((error: any) => {
        if (error) {
          return res.status(400).send({ message: "Something wrent wrong on save report" });
        } else {
          return res.status(200).send({ message: "Success on save report!", title });
        }
      });
    } catch (error) {
      res.status(400).send({ message: "Erro in LastReports", error });
    }
  },
};
