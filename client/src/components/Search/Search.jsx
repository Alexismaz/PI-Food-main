import React, { useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import {handleSearch, searchByName} from '../../redux/Actions'
import './Search.css'

export default function Search() {
  const state = useSelector(state => state.allRecipes)
  const dispatch = useDispatch()
  let [name, setName] = useState("")

  const handleChange = (event) => {
    setName(event.target.value)
    if(event.target.value === '') dispatch(handleSearch([...state]))
    const found =[...state].filter(recipe => recipe.title.toLowerCase().includes(event.target.value))
    dispatch(handleSearch(found))
  }

  const handleClickSearch = () => {
    dispatch(searchByName(name))
  }
  return (
    <div className='divSearch'>
      <input className="inputSearch" name="Search" key="Search" type="text" value={name} placeholder="Name of recipe to search" onChange={handleChange}/>
      <button className="buttonSearch" onClick={handleClickSearch}>Search</button>
    </div>
  )
}
