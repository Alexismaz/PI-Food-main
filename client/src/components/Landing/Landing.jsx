import React from 'react'
import { Link } from 'react-router-dom'
import fondo from '../../assets/images/fondoLanding.jpg'
import './Landing.css'
import logoLanding from '../../assets/images/LogoApiFoods.png'

export default function Landing() {
  return (
    <div className='Landing'>
      <img className='backgroundLanding' src={fondo} alt='backgroundLanding'/>
        <h1 className='titleLanding'>Welcomen to my</h1>
        <h2 className='PILanding'>PI Foods</h2>
        <img className="chefLanding" src={logoLanding} alt="chefLanging" />
        <h2 className='nameLanding'>By Alexis Fajian</h2>
        <Link to={"/home"}>
        <button className='HomeButton'>Go in</button>
        </Link>
    </div>
  )
}
