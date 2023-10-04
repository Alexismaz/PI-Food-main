const { Router } = require("express")
const DietsRouter = Router()
const diets = require("../Controllers/getDiets")

DietsRouter.get("/", diets)

module.exports = {DietsRouter}