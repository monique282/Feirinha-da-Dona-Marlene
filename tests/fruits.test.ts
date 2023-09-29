

import supertest from "supertest";
import app from "../src/index";
import { Fruit } from "../src/repositories/fruits-repository";
import { FruitInput } from "services/fruits-service";


const api = supertest(app);

describe("API test", () => {
  it("should return 200 when ask /health", async () => {
    const result = await api.get("/health");
    expect(result.status).toBe(200);
  })

})

describe("POST /fruits tests", () => {

  it("criando uma fruta", async () => {
    const fruta: FruitInput = {
      name: "abacaxi",
      price: 5.36
    };

    const { status } = await api.post("/fruits").send(fruta);
    expect(status).toBe(201);
  });

  it("deve retornar 409 se a fruta ja foi cadastrada", async () => {
    const fruta: FruitInput = {
      name: "morango",
      price: 5.36
    };

    const { status } = await api.post("/fruits").send(fruta);
    console.log(status)
    expect(status).toBe(409);
  });


  it("deve retornar 422 se a bady estiver no formato incorreto", async () => {
    const fruta = {
    name: "morango"
    };

    const { status } = await api.post("/fruits").send(fruta);
    console.log(status)
    expect(status).toBe(422);
  });

});

describe("GET /fruits por id", () => {

  it("deve retornar 404 se por acaso o id não existe", async () => {
    const { status } = await api.get("/fruits/10");
    console.log(status)
    expect(status).toBe(404);
  });

  it("deve retornar 400 se por acaso o id não existe", async () => {
    const { status } = await api.get("/fruits/s");
    console.log(status)
    expect(status).toBe(400);
  });

  it("deve retornar a fruto por id", async () => {
    const fruitData: Fruit = {
      id: 1,
      name: "morango",
      price: 5.36
    }

    const { status, body } = await api.get(`/fruits/1`);
    expect(status).toBe(200);
    expect(body).toHaveLength(1);
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          price: expect.any(Number)
        })
      ])
    );
  });

 

  it("deve retornar todas as frutas", async () => {
    // const fruitData: Fruit = [{
    //   id: 1,
    //   name: "morango",
    //   price: 5.36
    // },
    // {
    //   id: 2,
    //   name: "abacaxi",
    //   price: 2.36
    // },
    // {
    //   id: 3,
    //   name: "goiaba",
    //   price: 6.36
    // }]

    const { status, body } = await api.get("/fruits");
    expect(status).toBe(200);
    expect(body).toHaveLength(3);
    expect(body).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        price: expect.any(Number)
      }
      )
    ]))
  });

})