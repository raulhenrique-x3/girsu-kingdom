interface ISessionMock {
  userEmail: string;
  userPassword: string;
}

export const SessionWrongMock: ISessionMock = {
  userEmail: "wrongUser@email.com",
  userPassword: "wrongUserPassword123@",
};
