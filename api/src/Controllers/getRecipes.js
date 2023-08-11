require( 'dotenv').config()
const {Recipe, Diets} = require("../db")
const {Op} = require('sequelize')
const {API_KEY} = process.env;
const axios = require('axios')

const getRecipes = async (req, res) => {
    try {
        const { data } = await axios.get(`https://api.spoonacular.com/recipes/random?number=100&apiKey=${API_KEY}&addRecipeInformation=true`)
        const allRecipes = data.recipes.map(recipe => {
            //validacion para agregar seguridad y evitar posibles fallos, aun que en este caso se que en la api simepre tiene todos los campos necesarios
            const {image, title, diets, id, summary, healthScore, analyzedInstructions, spoonacularSourceUrl} = recipe
            const steps = analyzedInstructions[0]?.steps.map(step => ({paso: step.number, instruccion: step.step}))
            if(image && title && summary && id) {
                return {image, title, diets, id, summary, healthScore, steps, spoonacularSourceUrl, origin: "API"}
            }
            return null
        }).filter(recip => recip !== null)
        res.status(200).json(allRecipes)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const getRecipeById = async (req, res) => {
    try {
        const {idRecipe} = req.params
        if(idRecipe) {
            const existRecipeDb = await Recipe.findAll({
                where: {
                    id: idRecipe},
                include: Diets})
            if(existRecipeDb.length > 0) {
                const withOrigin = {...existRecipeDb[0].dataValues, diets: existRecipeDb[0].diets.map(diet => diet.Nombre), origin: "DB"}
                res.status(200).json(withOrigin)
            } else {
                const recipeApi = await axios.get(`https://api.spoonacular.com/recipes/${idRecipe}/information?apiKey=${API_KEY}&addRecipeInformation=true`)
                let {id, title, image, summary, healthScore, analyzedInstructions, diets, spoonacularSourceUrl} = recipeApi.data
                const steps = analyzedInstructions[0]?.steps.map(step => ({paso: step.number, instruccion: step.step}))
                const recipe = {
                    id,
                    title,
                    image,
                    summary,
                    healthScore,
                    steps,
                    diets,
                    spoonacularSourceUrl
                }
                // Codigo que guardaba las recetas de traidas de la api en la DB para ahorrar peticiones (Descartado)
                // const CreatedRecipe = await Recipe.create(recipe)
                // await CreatedRecipe.addDiets(recipesDB.map(diet => diet.id))
                // const dietsDb = await CreatedRecipe.getDiets()
                // const recipeDiets = {...CreatedRecipe.dataValues, Dietas: dietsDb}
                
                res.status(200).json(recipe)
            }
        }
    } catch (error) {
        res.status(404).json({message: error.message})
    }   
}

const getRecipesByName = async(req, res) => {
    try {
        const { name } = req.query
        if(name) {
            const nameExistDB = await Recipe.findAll({
                where: {
                    title: {
                        [Op.iLike]: `%${name}%`
                    }
                },
                include: Diets
            })
            let existDB = []
            if(nameExistDB.length > 0) {
                existDB = nameExistDB.map(exist => exist.dataValues)
            }
                let nameLowerCase = name.toLowerCase()
                const {data} = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${nameLowerCase}&addRecipeInformation=true`)
                const recipes = data.results
                const combineDBandAPI = [...existDB, ...recipes]
                res.status(200).json(combineDBandAPI)
        } else {
            res.status(400).end("No se puede buscar un Name vacio.")
        }
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

module.exports = {getRecipeById, getRecipesByName, getRecipes}