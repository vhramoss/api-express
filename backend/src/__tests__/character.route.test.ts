import request from "supertest";
import app from "../app";
import { generateTestToken } from "../test-utils/generateTestToken";

const VALID_EMAIL = "user1@email.com";
const VALID_TOKEN = generateTestToken(VALID_EMAIL);

describe("Characters routes - success cases", () => {

  it("should return 200 when searching characters with valid token", async () => {
    const response = await request(app)
      .get("/characters/search")
      .set("Authorization", `Bearer ${VALID_TOKEN}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.characters)).toBe(true);
  });

  it("should return 200 when fetching random characters with valid token", async () => {
    const response = await request(app)
      .get("/characters/random")
      .set("Authorization", `Bearer ${VALID_TOKEN}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.characters)).toBe(true);
  });

});

describe("Characters routes - auth errors", () => {

  it("should return 401 when user email is invalid", async () => {
    const response = await request(app)
      .get("/characters/search")
      .set(
        "Authorization",
        `Bearer ${generateTestToken("invalid@email.com")}`
      );

    expect(response.status).toBe(401);
  });

  it("should return 401 when token is missing", async () => {
    const response = await request(app)
      .get("/characters/search");

    expect(response.status).toBe(401);
  });

});

describe("Characters routes - edge cases", () => {

  it("should return 404 when no characters are found", async () => {
    const response = await request(app)
      .get("/characters/search?name=THISCHARACTERDOESNOTEXIST")
      .set("Authorization", `Bearer ${VALID_TOKEN}`);

    expect(response.status).toBe(404);
  });

  it("should return 404 when filter is invalid", async () => {
    const response = await request(app)
      .get("/characters/search?status=banana")
      .set("Authorization", `Bearer ${VALID_TOKEN}`);

    expect(response.status).toBe(404);
  });

  it("should return 404 when filters combination is invalid", async () => {
    const response = await request(app)
      .get("/characters/search?status=alive&species=banana")
      .set("Authorization", `Bearer ${VALID_TOKEN}`);

    expect(response.status).toBe(404);
  });

});