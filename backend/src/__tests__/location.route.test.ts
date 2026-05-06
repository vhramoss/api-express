import request from "supertest";
import app from "../app";
import { generateTestToken } from "../test-utils/generateTestToken";

const VALID_EMAIL = "user1@email.com";
const VALID_TOKEN = generateTestToken(VALID_EMAIL);

describe("Locations routes - success cases", () => {

  it("should return 200 when searching locations with valid token", async () => {
    const response = await request(app)
      .get("/locations/search")
      .set("Authorization", `Bearer ${VALID_TOKEN}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.locations)).toBe(true);
  });

});

describe("Locations routes - auth errors", () => {

  it("should return 401 when user email is invalid", async () => {
    const response = await request(app)
      .get("/locations/search")
      .set(
        "Authorization",
        `Bearer ${generateTestToken("invalid@email.com")}`
      );

    expect(response.status).toBe(401);
  });

  it("should return 401 when token is missing", async () => {
    const response = await request(app)
      .get("/locations/search");

    expect(response.status).toBe(401);
  });

});

describe("Locations routes - edge cases", () => {

  it("should return 404 when no locations are found", async () => {
    const response = await request(app)
      .get("/locations/search?name=THISLOCATIONDOESNOTEXIST")
      .set("Authorization", `Bearer ${VALID_TOKEN}`);

    expect(response.status).toBe(404);
  });

  it("should return 404 when filter is invalid", async () => {
    const response = await request(app)
      .get("/locations/search?type=INVALID_TYPE")
      .set("Authorization", `Bearer ${VALID_TOKEN}`);

    expect(response.status).toBe(404);
  });

});
