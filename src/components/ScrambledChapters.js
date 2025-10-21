import React, { useState, useEffect } from 'react';

const ScrambledChapters = ({ onBack, teamMode, teams, setTeams, currentTeam, setCurrentTeam }) => {
  const bibleBooks = [
    "COLOSSIANS", "OBADIAH", "ELKANAH", "JONATHAN", "PROVERBS", 
    "ONESIMUS", "EPHESIANS", "PRISCILLA", "HEBREWS", "NEHEMIAH"
  ];

  const bibleBooks2 = [
    "GALATIANS", "LEVITICUS", "ESTHER", "EZEKIEL", "TIMOTHY", 
    "GIDEON", "CHRONICLES", "ABRAHAM", "DEBORAH", "ELIJAH"
  ];

  const scrambleWord = (word) => {
    const letters = word.split('');
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    return letters.join('');
  };

  const [currentBookIndex, setCurrentBookIndex] = useState(0);
  const [currentBookIndex2, setCurrentBookIndex2] = useState(0);
  const [scrambledWord, setScrambledWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [gamePhase, setGamePhase] = useState('teamA'); // 'teamA', 'teamB', 'finished'
  const [teamAScore, setTeamAScore] = useState(0);
  const [teamBScore, setTeamBScore] = useState(0);

  // Initialize scrambled word based on current team
  useEffect(() => {
    const currentBookList = gamePhase === 'teamA' ? bibleBooks : bibleBooks2;
    const currentIndex = gamePhase === 'teamA' ? currentBookIndex : currentBookIndex2;
    setScrambledWord(scrambleWord(currentBookList[currentIndex]));
  }, [currentBookIndex, currentBookIndex2, gamePhase]);

  // Timer logic
  useEffect(() => {
    if (timeLeft > 0 && !gameOver && gamePhase !== 'finished') {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gamePhase !== 'finished') {
      // Time's up for current team, switch to next team or finish
      if (gamePhase === 'teamA') {
        setGamePhase('teamB');
        setTimeLeft(60);
        setUserInput('');
      } else if (gamePhase === 'teamB') {
        setGamePhase('finished');
        setGameOver(true);
      }
    }
  }, [timeLeft, gameOver, gamePhase]);

  const checkAnswer = () => {
    const currentBookList = gamePhase === 'teamA' ? bibleBooks : bibleBooks2;
    const currentIndex = gamePhase === 'teamA' ? currentBookIndex : currentBookIndex2;
    
    if (userInput.toUpperCase() === currentBookList[currentIndex]) {
      // Correct answer - add points to current team
      if (gamePhase === 'teamA') {
        const newScore = teamAScore + 1;
        setTeamAScore(newScore);
        setTeams(prev => ({ ...prev, teamA: prev.teamA + 10 })); // 10 points per correct word
        setCurrentBookIndex((currentIndex + 1) % currentBookList.length);
      } else {
        const newScore = teamBScore + 1;
        setTeamBScore(newScore);
        setTeams(prev => ({ ...prev, teamB: prev.teamB + 10 })); // 10 points per correct word
        setCurrentBookIndex2((currentIndex + 1) % currentBookList.length);
      }
      setUserInput('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkAnswer();
  };

  const resetGame = () => {
    setCurrentBookIndex(0);
    setCurrentBookIndex2(0);
    setTeamAScore(0);
    setTeamBScore(0);
    setTimeLeft(60);
    setGameOver(false);
    setUserInput('');
    setGamePhase('teamA');
  };

  if (gameOver) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
        <div className="text-center">
          <div className="text-6xl mb-4">⏰</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Game Complete!</h2>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-bold text-blue-800">Team A</h3>
              <p className="text-2xl font-bold text-blue-600">{teamAScore} words</p>
              <p className="text-sm text-blue-600">{teamAScore * 10} points</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="font-bold text-red-800">Team B</h3>
              <p className="text-2xl font-bold text-red-600">{teamBScore} words</p>
              <p className="text-sm text-red-600">{teamBScore * 10} points</p>
            </div>
          </div>
          <div className="space-y-4">
            <button
              onClick={resetGame}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
            >
              Play Again
            </button>
            <button
              onClick={onBack}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
            >
              Back to Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onBack}
          className="text-gray-500 hover:text-gray-700 font-semibold"
        >
          ← Back
        </button>
        <div className="text-right">
          <div className="text-2xl font-bold text-red-500">{timeLeft}s</div>
          <div className={`text-sm font-semibold ${gamePhase === 'teamA' ? 'text-blue-600' : 'text-red-600'}`}>
            {gamePhase === 'teamA' ? "Team A's Turn" : "Team B's Turn"}
          </div>
        </div>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Unscramble the Text!
        </h2>
        
        {/* Team Scores */}
        <div className="flex justify-center gap-8 mb-6">
          <div className={`px-4 py-2 rounded-lg ${gamePhase === 'teamA' ? 'bg-blue-500 text-white' : 'bg-blue-100'}`}>
            <div className="font-bold">Team A</div>
            <div>{teamAScore} words</div>
          </div>
          <div className={`px-4 py-2 rounded-lg ${gamePhase === 'teamB' ? 'bg-red-500 text-white' : 'bg-red-100'}`}>
            <div className="font-bold">Team B</div>
            <div>{teamBScore} words</div>
          </div>
        </div>

        <div className="text-4xl font-mono font-bold text-blue-600 tracking-wider mb-6">
          {scrambledWord}
        </div>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type the word..."
            className="w-full p-4 border-2 border-gray-200 rounded-lg text-center text-xl font-semibold focus:border-blue-500 focus:outline-none"
            autoFocus
          />
          <button
            type="submit"
            className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
          >
            Check Answer
          </button>
        </form>
      </div>

      <div className="text-center text-sm text-gray-500">
        {gamePhase === 'teamA' ? "Team A: 60 seconds to unscramble!" : "Team B: 60 seconds to unscramble!"}
      </div>
    </div>
  );
};

export default ScrambledChapters;