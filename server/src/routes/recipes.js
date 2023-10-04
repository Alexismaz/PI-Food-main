const express = require("express")
require( 'dotenv').config()
const router = express.Router()
const {getRecipeById, getRecipesByName, getRecipes} = require("../Controllers/getRecipes")
const postRecipe = require("../Controllers/postRecipe")

router.get("/all", getRecipes)
router.get("/:idRecipe", getRecipeById)
router.get("/", getRecipesByName)
router.post("/", postRecipe)

module.exports = router