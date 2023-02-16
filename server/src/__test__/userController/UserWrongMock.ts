interface IUserMock {
  userName: string;
  userEmail: string;
  userPassword: string;
}

export const UserWrongMock: IUserMock = {
  userName: "",
  userEmail: "",
  userPassword: "",
};

export const UserWrongMockPassword: IUserMock = {
  userName: "User Testing Jest",
  userEmail: "user@email.com",
  userPassword: "1234",
};

export const UserWrongMockEmail: IUserMock = {
  userName: "User Testing Jest",
  userEmail: "useremail.com",
  userPassword: "12345678",
};
