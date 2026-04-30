import request from 'supertest';
import app from '../app';

const VALID_EMAIL = "user1@email.com";

describe('Locations successful routes', () => {

  it('should return 200 when searching locations with valid user',
    async () => {
    const response = await request(app)
    .get("/locations/search")
    .set("x-user-email", VALID_EMAIL);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.locations)).toBe(true);
  });

});

describe('Locations unsuccessful routes', () => {

  it("should return 401 when user email is invalid", 
    async () => {
    const response = await request(app)
      .get("/locations/search")
      .set("x-user-email", "invalid@email.com");

    expect(response.status).toBe(401);
  });


it("should return 401 when user email is missing", 
    async () => {
    const response = await request(app)
      .get("/locations/search");

    expect(response.status).toBe(401);
  });

});

describe("Locations routes - edge cases", () => {

  it("should return 404 when no locations are found", 
    async () => {
    const response = await request(app)
      .get("/locations/search?name=THISLOCATIONDOESNOTEXIST")
      .set("x-user-email", VALID_EMAIL);

    expect(response.status).toBe(404);
  });


  it("should return 404 when filter is invalid", 
    async () => {
    const response = await request(app)
      .get("/locations/search?type=INVALID_TYPE")
      .set("x-user-email", VALID_EMAIL);

    expect(response.status).toBe(404);
  });

});