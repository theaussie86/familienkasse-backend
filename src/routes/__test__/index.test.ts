import {
  describe,
  it,
  expect,
  beforeEach,
  beforeAll,
  afterEach,
  afterAll,
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
});

// afterAll(async () => {
//   await connectDB();
//   await mongoose.connection.db.dropDatabase();
//   await mongoose.connection.close();
// });

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
  const transaction = {
    amount: 700,
    description: "test donation",
    created: new Date(),
    account: "Spenden",
  };

  describe("POST /transaction", () => {
    it("should return 200 OK", async () => {
      const response = await request(app)
        .post("/transaction/")
        .send({ ...transaction })
        .set("Authorization", `Bearer ${idToken}`);
      expect(response.status).toBe(200);
      expect(response.body.description).toBe(transaction.description);
    });

    it("should return error if payload is missing", async () => {
      const response = await request(app)
        .post("/transaction/")
        .send({})
        .set("Authorization", `Bearer ${idToken}`);
      expect(response.status).toBe(500);
      expect(response.body.error).toBe(
        "Transaction validation failed: account: Path `account` is required., description: Path `description` is required., created: Path `created` is required., amount: Path `amount` is required."
      );
    });

    it("should return error if account is wrong", async () => {
      const response = await request(app)
        .post("/transaction/")
        .send({ ...transaction, account: "wrong" })
        .set("Authorization", `Bearer ${idToken}`);
      expect(response.status).toBe(500);
      expect(response.body.error).toBe(
        "Transaction validation failed: account: `wrong` is not a valid enum value for path `account`."
      );
    });
  });

  let firstTransaction: Record<string, any>;
  describe("GET /transaction", () => {
    it("should return all transactions", async () => {
      const response = await request(app)
        .get("/transaction/all")
        .set("Authorization", `Bearer ${idToken}`);
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThanOrEqual(1);
      firstTransaction = response.body[0];
    });
    it("should find and return a transaction by its ID", async () => {
      const response = await request(app)
        .get("/transaction/" + firstTransaction._id)
        .set("Authorization", `Bearer ${idToken}`);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(firstTransaction);
    });
  });

  describe("PATCH /transaction", () => {
    it("should update the transaction", async () => {
      const response = await request(app)
        .patch("/transaction/" + firstTransaction._id)
        .send({ amount: 800 })
        .set("Authorization", `Bearer ${idToken}`);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({ ...firstTransaction, amount: 800 });
    });
  });
  describe("DELETE /transaction", () => {
    it("should delete the specified document", async () => {
      const response = await request(app)
        .delete("/transaction/" + firstTransaction._id)
        .set("Authorization", `Bearer ${idToken}`);
      expect(response.status).toBe(204);
    });
  });
});

function generateTestToken() {
  return admin.auth().createCustomToken("testuser");
}
