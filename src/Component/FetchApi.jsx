import React, { useEffect, useState } from "react";
import { QuizData } from "./QuizData";
import './FetchApi.css';

const FetchApi = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [time, setTime] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [showFinalPopup, setShowFinalPopup] = useState(false);
  const [playAgainLoading, setPlayAgainLoading] = useState(false); // ⏳ Loader for Play Again

  useEffect(() => {
    setTimeout(() => { // Simulate loading delay
      setQuestions(QuizData.questions);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      handleStartGame();
    }
  }, [questions]);

  useEffect(() => {
    let timer;
    if (gameStarted && !showFinalPopup) { 
      timer = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    } 

    return () => clearInterval(timer);
  }, [gameStarted, showFinalPopup]);  

  const handleStartGame = () => {
    setGameStarted(true);
    setCurrentQuestionIndex(0);
    setScore(0);
    setTime(60);
    setSelectedOption(null);
    setShowFinalPopup(false);
    setPlayAgainLoading(false);
  };

  const handlePlayAgain = () => {
    setPlayAgainLoading(true); 
    setTimeout(() => {
      handleStartGame();
    }, 1500);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option.is_correct) {
      setScore((prevScore) => prevScore + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedOption(null);
      } else {
        setShowFinalPopup(true);
      }
    }, 1000);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null);
    } else {
      setShowFinalPopup(true);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading game...</p>
      </div>
    );
  }

  return (
    <>
      <div className="quiz-Container">
        <div className="quiz-box">
          <div className="quiz-header">
            <div className="score-card">
              <button className="Score">Score {score}/{questions.length}</button>
              <button className="Points">Points: {score * 100} </button>
            </div>

            <div className="quiz-card">
              <div className="quiz-timer">
                ⏲ {String(Math.floor(time / 60)).padStart(2, "0")}:{String(time % 60).padStart(2, "0")}
              </div>
              <div className="quiz-label">
                Question <span>{currentQuestionIndex + 1}</span> out <span>{questions.length}</span>
              </div>

              <div className="quiz-question">
                <p>{questions[currentQuestionIndex]?.description}</p>
              </div>
            </div>
          </div>

          <div className="quiz-option">
            {questions[currentQuestionIndex]?.options.map((option) => (
              <button
                key={option.id}
                className={`option ${selectedOption ? (option.is_correct ? "correct" : "wrong") : ""}`}
                onClick={() => handleOptionClick(option)}
                disabled={selectedOption !== null}
              >
                {option.description}
              </button>
            ))}
          </div>

          <div className="quiz-footer">
            <button className="reset-button" onClick={() => window.location.reload()}>Reset</button>
            <button className="next-button" onClick={handleNextQuestion}>Skip</button>
          </div>
        </div>
      </div>

      {/* Final Score Popup */}
      {showFinalPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>🎉 Quiz Completed!</h2>
            <p>Final Score: {score}/{questions.length}</p>
            <p>Total Points: {score * 100}</p>
            <button className="play-again" onClick={handlePlayAgain} disabled={playAgainLoading}>
              {playAgainLoading ? <div className="spinner"></div> : "Play Again"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FetchApi;
