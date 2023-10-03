import React, { useEffect} from 'react'
import './Pagination.css'
import { useDispatch, useSelector } from 'react-redux'
import Cards from '../Cards/Cards'
import { paginate } from '../../redux/Actions'


export default function Pagination() {
  const dispatch = useDispatch()
    const { currentPage, recipes, filtred } = useSelector(state => state)
    const recipesPerPage = 9
    const totalPages = Math.ceil(recipes.length / recipesPerPage)
    const buttonPages = Array.from({length: totalPages}, (_,i) => i + 1)
    const recipesCards = recipes.slice((currentPage - 1) * recipesPerPage, currentPage * recipesPerPage)
    console.log(recipesCards)

    const changePage = (pag) => {
      if(pag === "prevPage") {
        dispatch(paginate(currentPage - 1))
      } else if(pag === "nextPage") {
        dispatch(paginate(currentPage + 1))
      } else {
        dispatch(paginate(pag))
      }
    }

    useEffect(() => {
      if(filtred === false) {
        dispatch(paginate(1))
      }
    },[dispatch, filtred])

  return (
    <>
    <Cards recipesCards={recipesCards}/>
    <div className='Pagination'>
        {currentPage > 1 ? <h2 className='buttonPage' onClick={() => changePage("prevPage")}>Prev</h2> : null}
        {buttonPages.map(pag => <h3 className={`pageNumbers ${pag === currentPage ? "currentPage" : ""}`} key={pag} onClick={() => changePage(pag)}>{pag}</h3>)}
        {currentPage !== totalPages ? <h2 className='buttonPage' onClick={() => changePage("nextPage")}>Next</h2> : null}
    </div>
    </>
  )
}
