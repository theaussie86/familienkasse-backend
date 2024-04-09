import {
  describe,
  it,
  expect,
  beforeEach,
  beforeAll,
  afterEach,
} from "@jest/globals";
import mongoose from "mongoose";
import app from "../../app";
import request from "supertest";
import * as dotenv from "dotenv";
import { connectDB } from "../../config/db";
import admin from "../../util/firebase";

dotenv.config();
let idToken: string;
beforeAll(async () => {
  const token = await generateTestToken();
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${process.env.FIREBASE_API_KEY}`,
    {
      method: "POST",
      body: JSON.stringify({
        token,
        returnSecureToken: true,
      }),
    }
  ).then((res) => res.json());
  idToken = res.idToken;
});

beforeEach(async () => {
  await connectDB();
});

afterEach(async () => {
  await mongoose.connection.close();
  await mongoose.disconnect();
});

describe("GET /", () => {
  it("should return 200 OK", async () => {
    const response = await request(app)
      .get("/")
      .set("Authorization", `Bearer ${idToken}`);
    expect(response.status).toBe(200);
    expect(response.text).toBe("Familienkasse API is running");
  });
});

describe("Transactions", () => {
  describe("GET /transaction", () => {
    it("should return 200 OK", async () => {
      const response = await request(app)
        .get("/transaction/all")
        .set("Authorization", `Bearer ${idToken}`);
      expect(response.status).toBe(200);
    });
    it("should return 200 OK", async () => {
      const response = await request(app)
        .get("/transaction/1234")
        .set("Authorization", `Bearer ${idToken}`);
      expect(response.status).toBe(200);
    });
  });
  describe("POST /transaction", () => {
    it("should return 200 OK", async () => {
      const response = await request(app)
        .post("/transaction/1234")
        .set("Authorization", `Bearer ${idToken}`);
      expect(response.status).toBe(200);
    });
  });
  describe("PATCH /transaction", () => {
    it("should return 200 OK", async () => {
      const response = await request(app)
        .patch("/transaction/1234")
        .set("Authorization", `Bearer ${idToken}`);
      expect(response.status).toBe(200);
    });
  });
  describe("DELETE /transaction", () => {
    it("should return 200 OK", async () => {
      const response = await request(app)
        .delete("/transaction/1234")
        .set("Authorization", `Bearer ${idToken}`);
      expect(response.status).toBe(200);
    });
  });
});

function generateTestToken() {
  return admin.auth().createCustomToken("testuser");
}
