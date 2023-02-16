import User from "../../models/userModel/userModel";
import dotenv from "dotenv";
import mongoose from "mongoose";
import request from "supertest";
import app from "../../index";
import { describe, expect } from "@jest/globals";
import { SessionMock } from "./SessionMock";
import { SessionWrongMock } from "./SessionWrongMock";
import { UserMock } from "../userController/UserMock";
import { UserWrongMock } from "../userController/UserWrongMock";

dotenv.config({ path: "../../src/.env" });
jest.setTimeout(60000);

beforeEach(async () => {
  await mongoose
    .connect(process.env.DB_TEST!)
    .then(() => console.log("Connected to TEST MongoDB"))
    .catch((error) => console.error("Could not connect to TEST MongoDB", error));

  await request(app).post("/register").send(UserMock);
});

afterAll(async () => {
  await User.deleteMany();
  await mongoose.connection.close();
});

describe("User try to login in the app", () => {
  it("should be able to login with correct credentials", async () => {
    const res = await request(app).post("/login").send(SessionMock);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ userEmail: SessionMock.userEmail });
  });

  it("should to get an error if try to login in the app with wrong email and password", async () => {
    const res = await request(app).post("/login").send(SessionWrongMock);

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ message: "User not found" });
  });

  it("should to get an error if try to login in the app without email and password", async () => {
    const res = await request(app).post("/login").send({ userEmail: "", userPassword: "" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ message: "Fill the fields correctly" });
  });

  it("should to get and error if try to login with Nonexistent email", async () => {
    const res = await request(app)
      .post("/login")
      .send({ userEmail: "wrongEmail@email.com", userPassword: UserMock.userPassword });

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ message: "User not found" });
  });
});
