const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Reciperouter = require("./recipes")
const {DietsRouter} = require("./diets")

// EJEMPLO URL: https://api.spoonacular.com/recipes/716429/information?apiKey=f4e497b0d17b4129814e410a7031fbe9&includeNutrition=true.

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes', Reciperouter)
router.use('/diets', DietsRouter)


module.exports = router;
