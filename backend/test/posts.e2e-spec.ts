import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import request from "supertest"; 

describe("Posts (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    await app.init();
  });

  it("should fail if title is too short", () => {
    return request(app.getHttpServer())
      .post("/posts")
      .send({
        userId: 1,
        title: "hi",         
        body: "this is body"
      })
      .expect(400);
  });

  it("should fail if userId is missing", () => {
    return request(app.getHttpServer())
      .post("/posts")
      .send({
        title: "Valid title",
        body: "Valid body"
      })
      .expect(400);
  });

  it("should create a post if data is valid", () => {
    return request(app.getHttpServer())
      .post("/posts")
      .send({
        userId: 1,
        title: "My first post",
        body: "This is the body of the first post"
      })
      .expect(201)
      .expect(res => {
        expect(res.body).toHaveProperty("id");
        expect(res.body.userId).toBe(1);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
