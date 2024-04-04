import { describe, it, expect } from "@jest/globals";
import app from "../../app";
import request from "supertest";

describe("GET /", () => {
  it("should return 200 OK", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Familienkasse API is running");
  });
});
