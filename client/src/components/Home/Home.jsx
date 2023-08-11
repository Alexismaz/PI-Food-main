import React from 'react'
import "./Home.css"
import Pagination from '../Pagination/Pagination'
import FilterBar from "../FilterBar/FilterBar"

export default function Home() {
  return (
    <div className='Home'>
      <FilterBar/>
      <Pagination/>
    </div>
  )
}
