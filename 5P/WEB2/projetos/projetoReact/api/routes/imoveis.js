import express from "express";
import { addImovel, deleteImovel, getImoveis, updateImovel } from "../controllers/imovel.js";


const router = express.Router()

router.get("/", getImoveis)

router.post("/", addImovel)

router.put("/:id", updateImovel)

router.delete("/:id", deleteImovel)

export default router