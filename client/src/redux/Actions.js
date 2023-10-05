import axios from "axios"
import {ALL_RECIPES, SEARCH_BY_ID, SEARCH_BY_NAME, FILTER, ORDER, ADD_RECIPE, PAGINATE, FILTRADO, HANDLE_SEARCH, RESET_FILTERS} from "./Action-types"

export const allRecipes = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get("https://pi-foods-backend-psi.vercel.app/recipes/all")
            console.log(data)
            dispatch({
                type: ALL_RECIPES,
                payload: data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const addRecipe = (recipe) => {
    console.log(recipe)
    return async (dispatch) => {
        try {
            const { data } = await axios.post("https://pi-foods-backend-psi.vercel.app/recipes", recipe)
            console.log(data)
            dispatch({
                type: ADD_RECIPE,
                payload: data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const searchById = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`https://pi-foods-backend-psi.vercel.app/recipes/${id}`)
            if(data.origin === "DB") {
                const newData = {...data, steps: JSON.parse(data.steps)}
                dispatch({
                    type: SEARCH_BY_ID,
                    payload: newData
                })
            } else {
                dispatch({
                    type: SEARCH_BY_ID,
                    payload: data
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const searchByName = (name) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`https://pi-foods-backend-psi.vercel.app/recipes/?name=${name}`)
            dispatch({
                type: SEARCH_BY_NAME,
                payload: data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const filterRecipes = (recipe) => {
    return {
        type: FILTER,
        payload: recipe
    }
}

export const orderRecipes = (order) => {
    return {
        type: ORDER,
        payload: order
    }
}

export const paginate = (pages) => {
    return {
        type: PAGINATE,
        payload: pages
    }
}

export const filtradoTrue = (fil) => {
    return {
        type: FILTRADO,
        payload: fil
    }
}
export const handleSearch = (search) => {
    return {
        type: HANDLE_SEARCH,
        payload: search
    }
}
export const resetFilters = () => {
    return {
        type: RESET_FILTERS
    }
}