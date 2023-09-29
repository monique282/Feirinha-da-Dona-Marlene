import { Request, Response } from "express";
import httpStatus from "http-status";

import fruitsService, { FruitInput } from "../services/fruits-service";
import { isValid } from "../utils/id-validator";


// pega todas as frutas
export function getFruits(req: Request, res: Response) {
  const fruits = fruitsService.getFruits();
  res.send([{
    id: 1,
    name: "morango",
    price: 5.36
  },
  {
    id: 2,
    name: "abacaxi",
    price: 2.36
  },
  {
    id: 3,
    name: "goiaba",
    price: 6.36
  }]);
}

// pega uma fruta com base no id
export function getSpecificFruit(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  if (!isValid(id)) return res.sendStatus(httpStatus.BAD_REQUEST);
  if (isNaN(id)) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const fruit = fruitsService.getSpecificFruit(id);
    res.send([fruit]);
  } catch (error) {
    console.log(error);
    res.sendStatus(httpStatus.NOT_FOUND);
  }
}


// colocando um fruta no banco
export function createFruit(req: Request, res: Response) {
  const fruit = req.body as FruitInput;
  try {
    fruitsService.createFruit(fruit);
    res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    console.log(error);
    res.sendStatus(httpStatus.CONFLICT);
  }
}