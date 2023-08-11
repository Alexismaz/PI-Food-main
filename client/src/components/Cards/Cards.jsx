import React from 'react'
import Card from '../Card/Card'
import './Cards.css'

export default function Cards({recipesCards}) {
  return (
    <div className='Cards'>
      {recipesCards.map((recipe, index) => <Card key={index} recipe={recipe}/>)}
    </div>
  )
}
