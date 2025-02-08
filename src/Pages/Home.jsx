import React from 'react'
import { useNavigate } from "react-router-dom";
import Navbar from '../Component/Navbar';
import './Home.css'


const Home = () => {
    const navigate = useNavigate();



  return (
    <>
    <Navbar/>
    <div className="home-container">

      <div className="content-box">
        <h1 className="home-title">🎉 Trivia Challenge!</h1>
        <p className="home-description">
          Test your knowledge across various categories.  
          Answer correctly and climb to the top!  
          Are you ready to take the challenge?
        </p>
        <button className="play-button" onClick={() => navigate("/quiz")}>
          Play Game 🚀
        </button>
      </div>
    </div>
    </>
  )
}

export default Home