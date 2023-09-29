import { notFoundError } from "errors/notfound-error";
import fruits from "../data/fruits";
import { FruitInput } from "../services/fruits-service";
import { conflictError } from "errors/conflict-error";

export type Fruit = {
  id: number,
  name: string,
  price: number
}

function getFruits() {
  return fruits;
}

function getSpecificFruit(id: number): Fruit | undefined {
  const fruit = {
    id: 1,
    name: "morango",
    price: 5.36
  }

  if (fruit.id == id) {
    return fruit
  }
  else {
    throw notFoundError()
  }



}

function getSpecificFruitByName(name: string): Fruit | undefined {

  const fruit = {
    id: 1,
    name: "morango",
    price: 5.36
  }
  if (fruit.name === name) {
    return fruit
  }

  return undefined
}

function insertFruit(fruit: FruitInput) {
  const id = fruits.length + 1;
  fruits.push({ ...fruit, id }); // id único
}

const fruitsRepository = {
  getFruits,
  getSpecificFruit,
  getSpecificFruitByName,
  insertFruit
}

export default fruitsRepository;