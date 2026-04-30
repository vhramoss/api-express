import request from 'supertest';
import app from '../app';

const VALID_EMAIL = "user1@email.com";

describe('Characters successful routes', () => {

  it('should return 200 when searching characters with valid user',
    async () => {
    const response = await request(app)
    .get("/characters/search")
    .set("x-user-email", VALID_EMAIL);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.characters)).toBe(true);
  });


  it("should return 200 when fetching random characters", 
    async () => {
    const response = await request(app)
      .get("/characters/random")
      .set("x-user-email", VALID_EMAIL);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.characters)).toBe(true);
  });
});

describe('Characters unsuccessful routes', () => {

  it("should return 401 when user email is invalid", 
    async () => {
    const response = await request(app)
      .get("/characters/search")
      .set("x-user-email", "invalid@email.com");

    expect(response.status).toBe(401);
  });


it("should return 401 when user email is missing", 
    async () => {
    const response = await request(app)
      .get("/characters/search");

    expect(response.status).toBe(401);
  });

});

describe("Characters routes - edge cases", () => {

  it("should return 404 when no characters are found", 
    async () => {
    const response = await request(app)
      .get("/characters/search?name=THISCHARACTERDOESNOTEXIST")
      .set("x-user-email", VALID_EMAIL);

    expect(response.status).toBe(404);
  });


  it("should return 404 when filter is invalid", 
    async () => {
    const response = await request(app)
      .get("/characters/search?status=banana")
      .set("x-user-email", VALID_EMAIL);

    expect(response.status).toBe(404);
  });

  
  it("should return 404 when filters combination is invalid", 
    async () => {
    const response = await request(app)
      .get("/characters/search?status=alive&species=banana")
      .set("x-user-email", VALID_EMAIL);

  expect(response.status).toBe(404);
  });

});