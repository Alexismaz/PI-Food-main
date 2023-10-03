import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { orderRecipes, filterRecipes, filtradoTrue, resetFilters} from '../../redux/Actions'
import './FilterBar.css'

export default function FilterBar() {
    const [orderState, setOrderState] = useState({})
    const [originFilter, setOriginFilter] = useState("ALL")
    const [filter, setFilter] = useState()
    const { filtred } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        if(filtred === false) {
            const filterState = {
                origin: originFilter,
                filter: filter}
            dispatch(filterRecipes(filterState))
            return () => {
                dispatch(filtradoTrue(true))
            }
        }
        // eslint-disable-next-line
    },[dispatch, originFilter, filter]) 

    useEffect(() => {
        if(filtred === false) {
            dispatch(orderRecipes(orderState))
        }
        // eslint-disable-next-line
    }, [dispatch, orderState])

    const filterHandleChange = (event) => {
        dispatch(filtradoTrue(false))
        const {value} = event.target
        if(value === "ALL") setOriginFilter(value)
        else if(value === "DB") setOriginFilter(value)
        else if(value === "API") setOriginFilter(value)
        else {
            setFilter(value)
        }
    }

    const orderHandleChange = (event) => {
        console.log(orderState)
        dispatch(filtradoTrue(false))
        const {value} = event.target
        if(value === "A" || value === "D") setOrderState({order: value})
        if(value === "MN" || value === "MX") setOrderState({health: value})
    }

    const handleresetFilters = () => {
        dispatch(resetFilters())
    }

  return (
    <div className='divFilters'>
        <button className='resetButton' onClick={handleresetFilters}>Reset filters</button>
        <select className='originFilter' onChange={filterHandleChange}>
            <option disabled>Filter by origin</option>
            <option value='ALL'>All</option>
            <option value="DB">Database</option>
            <option value="API">Food Api</option>
        </select>
        <select className='dietFilter' onChange={filterHandleChange}>
            <option disabled>Filter diet by</option>
            <option value="dairy free">Dairy free</option>
            <option value="gluten free">Gluten free</option>
            <option value="lacto ovo vegetarian">Lacto ovo vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="pescatarian">Pescataria</option>
            <option value="primal">Primal</option>
            <option value="ketogenic">Ketogenic</option>
            <option value="paleolithic">Paleolithic</option>
            <option value="whole 30">Whole 30</option>
            <option value="fodmap friendly">Fodmap friendly</option>
        </select>
        <select className='order' onChange={orderHandleChange}>
            <option disabled>Order by</option>
            <option value="A">Alphabetically (A-Z)</option>
            <option value="D">Alphabetically (Z-A)</option>
            <option value="MN">Health Score ↓</option>
            <option value="MX">Health Score ↑</option>
        </select>
    </div>
  )
}
