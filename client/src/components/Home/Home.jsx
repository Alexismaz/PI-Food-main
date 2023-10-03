import React from 'react'
import "./Home.css"
import Pagination from '../Pagination/Pagination'
import FilterBar from "../FilterBar/FilterBar"
import fondo from "../../assets/images/fondoHome.jpg"

export default function Home() {
  return (
    <div className='Home'>
      <img className='fondoHome' src={fondo} alt="fondoHome" />
      <FilterBar/>
      <Pagination/>
    </div>
  )
}
