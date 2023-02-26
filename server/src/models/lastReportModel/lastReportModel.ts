import mongoose from "mongoose";
import ILastReportModel from "./interfaceLastReportModel";

const LastReportSchema = new mongoose.Schema({
  image: String,
  title: String,
  subTitle: String,
  description: String,
  cardGameName: String,
  comments: [
    {
      userName: String,
      date: String,
      likes: Number,
      comment: String,
    },
  ],
  likes: Number,
});

const LastReport = mongoose.model<ILastReportModel>("last-reports", LastReportSchema);
export default LastReport;
