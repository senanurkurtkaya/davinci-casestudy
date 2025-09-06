import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import request from "supertest"; 


describe("Users (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    await app.init();
  });

  it("should fail if email is invalid", () => {
    return request(app.getHttpServer())
      .post("/users")
      .send({ name: "Ali", username: "ali123", email: "not-email" })
      .expect(400);
  });

  it("should create a user if data is valid", () => {
    return request(app.getHttpServer())
      .post("/users")
      .send({ name: "Ali", username: "ali123", email: "ali@example.com" })
      .expect(201);
  });

  afterAll(async () => {
    await app.close();
  });
});
