const {Recipe, Diets} = require("../db")

const postRecipe = async (req, res) => {
    try {
        const {title, image, summary, healthScore, steps, diets} = req.body
        if(title, summary) {
            const recipe = {
                title,
                image,
                summary,
                healthScore,
                steps,
            }
            const CreatedRecipe = await Recipe.create(recipe)
            //diets tiene que ser un array de dietas toLowerCase
            const createdDiet = await Diets.findAll({
                where: {
                    Nombre: diets
                }
            })
            await CreatedRecipe.addDiets(createdDiet.map(diet => diet.id))
            const dietsDB = (await CreatedRecipe.getDiets()).map(element => element.Nombre)
            const origin = {...CreatedRecipe.dataValues, diets: dietsDB, origin: "DB"}
            res.status(201).json(origin)
        }
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
module.exports = postRecipe