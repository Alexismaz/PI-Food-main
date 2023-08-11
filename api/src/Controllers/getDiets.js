const axios = require("axios")
require("dotenv").config()
const {API_KEY} = process.env
const {Diets} = require("../db")


const getDiets = async (req, res) => {
    try {
        const diets = await axios.get(`https://api.spoonacular.com/recipes/random?number=100&apiKey=${API_KEY}&addRecipeInformation=true`)
        const dietsResults = await diets.data.recipes.map((recipe) => recipe.diets).flat(1)
        const dietsFiltered = [... new Set(dietsResults)]
        const createdDiets = await Diets.bulkCreate(dietsFiltered.map((diet) => ({Nombre: diet})))
        res.status(201).json(createdDiets)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

module.exports = getDiets