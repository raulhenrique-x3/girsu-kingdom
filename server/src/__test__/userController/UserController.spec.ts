import { Request, Response } from "express";
import User from "../../models/userModel/userModel";
import dotenv from "dotenv";
import mongoose from "mongoose";
import request from "supertest";
import app from "../../index";
import { UserMock } from "./UserMock";
import { UserWrongMock } from "./UserWrongMock";

dotenv.config({ path: "../../src/.env" });
jest.setTimeout(60000);

beforeEach(async () => {
  await mongoose
    .connect(process.env.DB_TEST!)
    .then(() => console.log("Connected to Test MongoDB"))
    .catch((err) => console.error(err));
});

describe("User Controller", () => {
  it("should be able to register in the app with correct email and password", async () => {
    await request(app).post("/register").send(UserMock);

    const userAlreadyExists = await User.findOne({ userEmail: "user@email.com" });
    expect(userAlreadyExists?.userEmail).toBeTruthy();
  });
  it("should get an error if try to register in the app without name, email or password", async () => {
    const res = await request(app).post("/register").send(UserWrongMock);

    await User.findOne({ userEmail: "user@email.com" });
    expect(res.statusCode).toBe(400);
  });
});
