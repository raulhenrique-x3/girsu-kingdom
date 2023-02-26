export default interface ILastReportModel {
  image: string;
  title: string;
  subTitle: string;
  description: string;
  cardGameName: string;
  date: string;
  comments: [
    {
      userName: string;
      userId: number;
      date: string;
      likes: number;
      comment: string;
    }
  ];
  likes: number;
}
