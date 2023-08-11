import {ALL_RECIPES, ADD_RECIPE, SEARCH_BY_ID, SEARCH_BY_NAME, FILTER, ORDER, PAGINATE, FILTRADO, HANDLE_SEARCH, RESET_FILTERS} from "./Action-types.js"
const initialState = {
    allRecipes: [],
    recipes: [],
    found: [],
    filtred: false,
    currentPage: 1

}
export default function rootReducer(state = initialState, {type, payload}) {
    switch (type) {
        case ALL_RECIPES:
            return {...state,
                allRecipes: [...payload],
                recipes: [...payload]
            }
        case ADD_RECIPE:
            return {...state,
                allRecipes: [payload, ...state.allRecipes],
                recipes: [payload, ...state.recipes]
                }
        case SEARCH_BY_ID:
            return {...state,
                found: payload
                }
        case SEARCH_BY_NAME: 
            return {...state,
                recipes: [...payload],
                }
        case FILTER:
            return {...state,
                recipes: payload.filter ? payload.origin === 'ALL' ? [...state.allRecipes].filter(newRecipes => newRecipes.diets.includes(payload.filter)) : [...state.allRecipes].filter(recipe => recipe.origin === payload.origin).filter(newRecipes => newRecipes.diets.includes(payload.filter))
                : payload.origin === 'ALL' ? state.allRecipes : [...state.allRecipes].filter(recipe => recipe.origin === payload.origin)
                
            }
        case ORDER: 
                return {...state,
                    recipes: [...state.recipes].sort((a, b) => {
                        const aName = a.title[0].toLowerCase()
                        const bName = b.title[0].toLowerCase()
                        if(payload.order === "A") {
                            if(aName < bName) return -1
                            if(aName > bName) return 1
                            else return 0
                        } else if(payload.order === "D") {
                            if(aName < bName) return 1
                            if(aName > bName) return -1
                            else return 0
                        } else if(payload.health === "MN") {
                            return a.healthScore - b.healthScore
                        } else {
                            return b.healthScore - a.healthScore
                        }
                        })
                }
        case RESET_FILTERS:
            return {...state,
                recipes: [...state.allRecipes],
                currentPage: 1
            }
        case PAGINATE: 
            return {...state,
                currentPage: payload
            }
        case FILTRADO:
            return {...state,
                filtred: payload}
        case HANDLE_SEARCH:
            return {...state,
                recipes: [...payload],
                currentPage: 1}
        default:
            return state;
    }
}
