import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Quiz from './Pages/Quiz';

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route  path="/quiz" element={<Quiz/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App