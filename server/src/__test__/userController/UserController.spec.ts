import User from "../../models/userModel/userModel";
import dotenv from "dotenv";
import mongoose from "mongoose";
import request from "supertest";
import app from "../../index";
import { UserMock } from "./UserMock";
import { UserWrongMock } from "./UserWrongMock";
import { describe, expect } from "@jest/globals";

dotenv.config({ path: "../../src/.env" });
jest.setTimeout(60000);

beforeEach(async () => {
  await mongoose
    .connect("mongodb+srv://raulheri25:986469841@cluster0.bpqn1km.mongodb.net/JEST-TEST?retryWrites=true&w=majority")
    .then(() => console.log("Connected to TEST MongoDB"))
    .catch((error) => console.error("Could not connect to TEST MongoDB", error));
});

afterAll(async () => {
  await User.deleteMany();
  await mongoose.connection.close();
});

describe("User Controller", () => {
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
    const res = await request(app).post("/register").send(UserMock);
    await User.findOne({ userEmail: UserMock.userEmail });

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ message: "User already exists" });
  });
});
