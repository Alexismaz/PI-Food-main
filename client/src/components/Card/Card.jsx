import React from 'react'
import "./Card.css"
import {Link} from "react-router-dom"

export default function Card({recipe}) {
  return (
    <Link className='linkCard' to={`/detail/${recipe.id}`}>
    <div className='Card'>
        <img className='imgCard' src={recipe.image} alt='imagenRecipes'/>
        <div className='cardDescription'>
          <h3 className='h3Card'>{recipe.title}</h3>
          <h2 className='h2Card'>{recipe.diets.join(", ")}</h2>
        </div>
    </div>
    </Link>
  )
}
