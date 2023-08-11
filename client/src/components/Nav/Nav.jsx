import React from 'react'
import { Link } from 'react-router-dom'
import Search from '../Search/Search'
import "./Nav.css"
import iconNav from '../../assets/images/iconPI.png'


export default function Nav() {
  return (
  <>
    <div className='divHeader'></div>
      <div className='Nav'>
        <div className='divNavIcon'>
          <img className='iconNav' src={iconNav} alt="iconNav" />
          <h2 className='h2Nav'>PI Foods</h2>
        </div>
        <Link to="/home">
        <button className='buttonNav'>Home</button>
        </Link>
        <Link to="/form">
        <button className='buttonNav'>Create recipe</button>
        </Link>
        <Search/>
      </div>
  </>
  )
}

