import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useParams} from 'react-router-dom'
import { searchById } from '../../redux/Actions'
import './Detail.css'

export default function Detail() {
  const {id} = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(searchById(id))
    // eslint-disable-next-line
  }, [dispatch])
  const recipe = useSelector(state => state.found)
  const PasoAPasoOrdenado = recipe.steps && recipe.steps.length > 0 ? recipe.steps.map((step) => <li key={step.paso}>{step.instruccion}</li>) : null
  const DietasOrdenadas = recipe.diets && recipe.diets.join(", ")
  return (
    <div className='divDetail'>
      <img className='imgDetail' src={recipe.image} alt="" />
      <div className='divDescriptionDetail'>
        <h2>ID: {recipe.id}</h2>
        <h1>Title: {recipe.title}</h1>
        <div className='divSummary'>
          <h3 className='h3Summary'>Summary: </h3>
          <p dangerouslySetInnerHTML={ { __html: recipe.summary } }/>
        </div>
        <h3>Health Score: {recipe.healthScore}</h3>
        <ol>{PasoAPasoOrdenado}</ol>
        <h3>Tipo de dietas: {DietasOrdenadas}</h3>
        <h3>spoonacularSourceUrl: {recipe.spoonacularSourceUrl}</h3>
      </div>
    </div>
  )
}
