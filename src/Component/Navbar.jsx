import React from 'react'
import './Navbar.css'
import { TiSocialVimeoCircular } from "react-icons/ti";

const Navbar = () => {
  return (
    <>
    <nav className='navbar'>
        <h1 className='navbar-title'>GamifY</h1>

        <div className='social'>
        
        <a href="https://anirudhjoshiportfolio.netlify.app/" target='_blank' className='navbar-link'>
        <TiSocialVimeoCircular className='symbol' />Portfolio</a>
        </div>
    </nav>
    
    </>
  )
}

export default Navbar