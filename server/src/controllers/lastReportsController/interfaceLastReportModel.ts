export default interface ILastReportModel {
  image: string;
  title: string;
  subTitle: string;
  description: string;
  cardGameName: string;
  id: number;
  comments: [
    {
      userName: string;
      userId: number;
      date: number;
      likes: number;
    }
  ];
  likes: number;
}
