import React, { useState, useEffect } from 'react';
import { bibleBooks, bibleBooksMalayalam } from '../data/bibleBooksData';

const BibleBookOrder = ({ onBack, teamMode, teams, setTeams, currentTeam, setCurrentTeam }) => {
  const [gamePhase, setGamePhase] = useState('language');
  const [language, setLanguage] = useState('english');
  const [testament, setTestament] = useState('oldTestament');
  const [books, setBooks] = useState([]);
  const [shuffledBooks, setShuffledBooks] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [round, setRound] = useState(1);
  const [totalRounds, setTotalRounds] = useState(5);
  const [timer, setTimer] = useState(60);
  const [showCorrect, setShowCorrect] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);

  const getBookSet = () => {
    const bookData = language === 'malayalam' ? bibleBooksMalayalam : bibleBooks;
    return bookData[testament];
  };

  const selectLanguage = (lang) => {
    setLanguage(lang);
    setGamePhase('testament');
  };

  const selectTestament = (test) => {
    setTestament(test);
    startNewRound();
    setGamePhase('playing');
  };

  const startNewRound = () => {
    const bookSet = getBookSet();
    // Select 6 random consecutive books
    const startIndex = Math.floor(Math.random() * (bookSet.length - 6));
    const correctBooks = bookSet.slice(startIndex, startIndex + 6);
    
    setBooks(correctBooks);
    setShuffledBooks([...correctBooks].sort(() => Math.random() - 0.5));
    setTimer(60);
    setShowCorrect(false);
  };

  const checkOrder = () => {
    const isCorrect = shuffledBooks.every((book, index) => book === books[index]);
    
    if (isCorrect) {
      const points = 20 + Math.max(0, timer * 1); // Bonus for faster completion
      setPointsEarned(points);
      setShowCorrect(true);
      
      // Wait 2 seconds before moving to next round
      setTimeout(() => {
        if (teamMode) {
          setTeams(prev => ({
            ...prev,
            [currentTeam]: prev[currentTeam] + points
          }));
          setCurrentTeam(currentTeam === 'teamA' ? 'teamB' : 'teamA');
        } else {
          setScore(score + points);
        }

        if (round < totalRounds) {
          setRound(round + 1);
          startNewRound();
        } else {
          setGameOver(true);
        }
      }, 2000);
    } else {
      alert("Not quite right! Try again.");
    }
  };

  const moveBook = (fromIndex, toIndex) => {
    const newBooks = [...shuffledBooks];
    const [movedBook] = newBooks.splice(fromIndex, 1);
    newBooks.splice(toIndex, 0, movedBook);
    setShuffledBooks(newBooks);
  };

  // Timer effect
  useEffect(() => {
    if (gamePhase === 'playing' && timer > 0 && !gameOver && !showCorrect) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else if (timer === 0 && !gameOver && !showCorrect) {
      // Time's up - move to next round or end game
      if (round < totalRounds) {
        setRound(round + 1);
        startNewRound();
      } else {
        setGameOver(true);
      }
    }
  }, [timer, gamePhase, gameOver, showCorrect]);

  // Language Selection
  if (gamePhase === 'language') {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">📚</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Bible Book Order</h1>
          <p className="text-xl text-gray-600">Arrange Bible books in correct order</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <button onClick={() => selectLanguage('english')} className="bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-2xl shadow-lg transition-all duration-300">
            <div className="text-3xl mb-2">🇺🇸</div>
            <h2 className="text-xl font-bold mb-2">English</h2>
          </button>
          <button onClick={() => selectLanguage('malayalam')} className="bg-green-500 hover:bg-green-600 text-white p-6 rounded-2xl shadow-lg transition-all duration-300">
            <div className="text-3xl mb-2">🇮🇳</div>
            <h2 className="text-xl font-bold mb-2">Malayalam</h2>
          </button>
        </div>

        <button onClick={onBack} className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold">
          Back to Menu
        </button>
      </div>
    );
  }

  // Testament Selection
  if (gamePhase === 'testament') {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">📖</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Select Testament</h1>
          <p className="text-gray-600">Choose which testament to practice</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <button onClick={() => selectTestament('oldTestament')} className="bg-orange-500 hover:bg-orange-600 text-white p-6 rounded-2xl shadow-lg transition-all duration-300">
            <div className="text-3xl mb-2">🕍</div>
            <h2 className="text-xl font-bold mb-2">Old Testament</h2>
            <p className="text-orange-100">39 Books</p>
          </button>
          <button onClick={() => selectTestament('newTestament')} className="bg-purple-500 hover:bg-purple-600 text-white p-6 rounded-2xl shadow-lg transition-all duration-300">
            <div className="text-3xl mb-2">⛪</div>
            <h2 className="text-xl font-bold mb-2">New Testament</h2>
            <p className="text-purple-100">27 Books</p>
          </button>
        </div>

        <button onClick={() => setGamePhase('language')} className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold">
          Back to Language
        </button>
      </div>
    );
  }

  // Game Over
  if (gameOver) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
        <div className="text-center">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Game Complete!</h2>
          <p className="text-2xl text-gray-700 mb-6">
            Final Score: <span className="font-bold text-blue-600">{teamMode ? teams[currentTeam] : score}</span>
          </p>
          <div className="space-y-4">
            <button onClick={() => { setGameOver(false); setRound(1); setScore(0); setGamePhase('language'); }} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold">
              Play Again
            </button>
            <button onClick={onBack} className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold">
              Back to Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Playing Phase
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => setGamePhase('testament')} className="text-gray-500 hover:text-gray-700 font-semibold">
          ← Back
        </button>
        <div className="text-right">
          <div className="text-2xl font-bold text-red-500">{timer}s</div>
          <div className="text-sm text-gray-500">Round {round} of {totalRounds}</div>
          {teamMode && (
            <div className={`text-sm font-semibold ${currentTeam === 'teamA' ? 'text-blue-600' : 'text-red-600'}`}>
              {currentTeam === 'teamA' ? "Team A's Turn" : "Team B's Turn"}
            </div>
          )}
        </div>
      </div>

      {/* Correct Answer Feedback */}
      {showCorrect && (
        <div className="mb-6 bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
          <div className="text-4xl mb-2">🎉</div>
          <h3 className="text-2xl font-bold text-green-800 mb-2">Perfect Order!</h3>
          <p className="text-green-700 text-lg">
            +{pointsEarned} points! Moving to next round...
          </p>
          {teamMode && (
            <p className="text-green-600">
              Points added to {currentTeam === 'teamA' ? 'Team A' : 'Team B'}
            </p>
          )}
        </div>
      )}

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Arrange in Correct Order</h2>
        <p className="text-gray-600 mb-6">
          {testament === 'oldTestament' ? 'Old Testament' : 'New Testament'} - {language === 'english' ? 'English' : 'Malayalam'}
        </p>

        {/* Show correct order when answer is correct */}
        {showCorrect ? (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-green-700 mb-4">Correct Order:</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {books.map((book, index) => (
                <div
                  key={index}
                  className="bg-green-100 border-2 border-green-400 rounded-lg p-4 text-center"
                >
                  <span className="font-semibold text-green-800">{book}</span>
                  <div className="text-xs text-green-600 mt-1">Position {index + 1}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {shuffledBooks.map((book, index) => (
              <div
                key={index}
                draggable
                onDragStart={(e) => e.dataTransfer.setData('text/plain', index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
                  moveBook(fromIndex, index);
                }}
                className="bg-blue-100 border-2 border-blue-300 rounded-lg p-4 text-center cursor-move hover:bg-blue-200 transition-colors"
              >
                <span className="font-semibold text-blue-800">{book}</span>
                <div className="text-xs text-blue-600 mt-1">Position {index + 1}</div>
              </div>
            ))}
          </div>
        )}

        {!showCorrect && (
          <button
            onClick={checkOrder}
            className="bg-green-500 hover:bg-green-600 text-white py-3 px-8 rounded-lg font-semibold text-lg transition-colors"
          >
            Check Order
          </button>
        )}

        {!showCorrect && (
          <p className="text-sm text-gray-500 mt-4">
            Drag and drop to rearrange the books
          </p>
        )}
      </div>

      {/* Score Display */}
      {!showCorrect && (
        <div className="text-center text-sm text-gray-500">
          {teamMode ? (
            <>
              Team A: <span className="font-bold text-blue-600">{teams.teamA}</span> | 
              Team B: <span className="font-bold text-red-600">{teams.teamB}</span>
            </>
          ) : (
            <>Current Score: <span className="font-bold text-blue-600">{score}</span></>
          )}
        </div>
      )}
    </div>
  );
};

export default BibleBookOrder;