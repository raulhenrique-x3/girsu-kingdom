import User from "../../models/userModel/userModel";
import dotenv from "dotenv";
import mongoose from "mongoose";
import request from "supertest";
import app from "../../index";
import { UserMock } from "./UserMock";
import { UserWrongMock, UserWrongMockEmail, UserWrongMockPassword } from "./UserWrongMock";
import { describe, expect } from "@jest/globals";

dotenv.config({ path: "../../src/.env" });
jest.setTimeout(60000);

beforeEach(async () => {
  await mongoose
    .connect(process.env.DB_TEST!)
    .then(() => console.log("Connected to TEST MongoDB"))
    .catch((error) => console.error("Could not connect to TEST MongoDB", error));
});

afterEach(async () => {
  await User.deleteMany();
  await mongoose.connection.close();
});

describe("User try to register in the app using /register", () => {
  it("should be able to register in the app with correct email and password, receive 200 status code and a message of success", async () => {
    const res = await request(app).post("/register").send(UserMock);

    const userAlreadyExists = await User.findOne({ userEmail: UserMock.userEmail });
    expect(res.body).toEqual({ message: "User successfully registered!" });
    expect(userAlreadyExists?.userEmail).toBeTruthy();
  });

  it("password should be Encrypted", async () => {
    const userAlreadyExists = await User.findOne({ userEmail: UserMock.userEmail });
    expect(userAlreadyExists?.userPassword).not.toBe(UserMock.userPassword);
  });

  it("should get an error if try to register in the app without name, email or password", async () => {
    const res = await request(app).post("/register").send(UserWrongMock);

    await User.findOne({ userEmail: UserMock.userEmail });
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ message: "Please, fill the fields" });
  });

  it("should to receive an error if try to register with the same email", async () => {
    await request(app).post("/register").send(UserMock);

    const res = await request(app).post("/register").send(UserMock);
    await User.findOne({ userEmail: UserMock.userEmail });

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ message: "User already exists" });
  });

  it("password have less than 8 characters", async () => {
    const res = await request(app).post("/register").send(UserWrongMockPassword);
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ message: "Password must be 8 or more characters" });
  });

  it("try to register with an non valid email", async () => {
    const res = await request(app).post("/register").send(UserWrongMockEmail);
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ message: "Fill in the fields correctly" });
  });
});
