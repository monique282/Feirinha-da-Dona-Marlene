import httpStatus from "http-status";
import { conflictError } from "../errors/conflict-error";
import { notFoundError } from "../errors/notfound-error";
import fruitsRepository, { Fruit } from "../repositories/fruits-repository";

export type FruitInput = Omit<Fruit, "id">;

// frutas totais
function getFruits() {
  return fruitsRepository.getFruits();
}

// fruto por id
function getSpecificFruit(id: number) {
  const fruit = fruitsRepository.getSpecificFruit(id);
  if (!fruit) {
    throw notFoundError();
  }

  return fruit;
}

// post criando a fruta
function createFruit(fruit: FruitInput): void {

  if(!fruit.name || !fruit.price ){
    throw httpStatus.UNPROCESSABLE_ENTITY
  };
  
  const fruitAlreadyRegistered = fruitsRepository.getSpecificFruitByName(fruit.name);
  if (fruitAlreadyRegistered) {
    throw conflictError()
  }else{

  }

  fruitsRepository.insertFruit(fruit);
  return

}

const fruitsService = {
  getFruits,
  getSpecificFruit,
  createFruit
}

export default fruitsService;