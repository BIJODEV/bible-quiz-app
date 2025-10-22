import React, { useState, useEffect } from 'react';
import { bibleBooks, bibleBooks2 } from '../data/scrambledData'

const ScrambledChapters = ({ onBack, teamMode, teams, setTeams, currentTeam, setCurrentTeam }) => {

  const scrambleWord = (word) => {
  // Reverse the word first, then shuffle
  const reversed = word.split('').reverse().join('');
  const letters = reversed.split('');
  
  // Fisher-Yates shuffle on the reversed word
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
        setTeams(prev => ({ ...prev, teamA: prev.teamA + 15 })); // 15 points per correct word
        setCurrentBookIndex((currentIndex + 1) % currentBookList.length);
      } else {
        const newScore = teamBScore + 1;
        setTeamBScore(newScore);
        setTeams(prev => ({ ...prev, teamB: prev.teamB + 15 })); // 15 points per correct word
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
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 max-w-2xl mx-3 sm:mx-4 md:mx-auto my-2 sm:my-4">
      <div className="text-center">
        <div className="text-4xl sm:text-5xl md:text-6xl mb-4">⏰</div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4">Game Complete!</h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-6">
          <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
            <h3 className="font-bold text-blue-800 text-sm sm:text-base">Team A</h3>
            <p className="text-xl sm:text-2xl font-bold text-blue-600">{teamAScore} words</p>
            <p className="text-xs sm:text-sm text-blue-600">{teamAScore * 15} points</p>
          </div>
          <div className="bg-red-50 p-3 sm:p-4 rounded-lg">
            <h3 className="font-bold text-red-800 text-sm sm:text-base">Team B</h3>
            <p className="text-xl sm:text-2xl font-bold text-red-600">{teamBScore} words</p>
            <p className="text-xs sm:text-sm text-red-600">{teamBScore * 15} points</p>
          </div>
        </div>
        <div className="space-y-3 sm:space-y-4">
          <button
            onClick={resetGame}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2.5 sm:py-3 px-4 rounded-lg font-semibold text-sm sm:text-base transition-colors"
          >
            Play Again
          </button>
          <button
            onClick={onBack}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2.5 sm:py-3 px-4 rounded-lg font-semibold text-sm sm:text-base transition-colors"
          >
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  );
}

return (
  <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 max-w-2xl mx-3 sm:mx-4 md:mx-auto my-2 sm:my-4">
    <div className="flex justify-between items-start sm:items-center mb-4 sm:mb-6">
      <button
        onClick={onBack}
        className="text-gray-500 hover:text-gray-700 font-semibold text-sm sm:text-base flex items-center"
      >
        ← <span className="hidden xs:inline ml-1">Back</span>
      </button>
      <div className="text-right">
        <div className="text-xl sm:text-2xl font-bold text-red-500">{timeLeft}s</div>
        <div className={`text-xs sm:text-sm font-semibold ${gamePhase === 'teamA' ? 'text-blue-600' : 'text-red-600'}`}>
          {gamePhase === 'teamA' ? "Team A's Turn" : "Team B's Turn"}
        </div>
      </div>
    </div>

    <div className="text-center mb-6 sm:mb-8">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4">
        Unscramble the Text!
      </h2>
      
      {/* Team Scores */}
      <div className="flex justify-center gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6">
        <div className={`px-3 sm:px-4 py-2 rounded-lg ${gamePhase === 'teamA' ? 'bg-blue-500 text-white' : 'bg-blue-100'} text-sm sm:text-base`}>
          <div className="font-bold">Team A</div>
          <div>{teamAScore} words</div>
        </div>
        <div className={`px-3 sm:px-4 py-2 rounded-lg ${gamePhase === 'teamB' ? 'bg-red-500 text-white' : 'bg-red-100'} text-sm sm:text-base`}>
          <div className="font-bold">Team B</div>
          <div>{teamBScore} words</div>
        </div>
      </div>

      <div className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-blue-600 tracking-wider mb-4 sm:mb-6 px-2">
        {scrambledWord}
      </div>
      
      <form onSubmit={handleSubmit} className="max-w-md mx-auto px-2 sm:px-0">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type the word..."
          className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-lg text-center text-lg sm:text-xl font-semibold focus:border-blue-500 focus:outline-none"
          autoFocus
        />
        <button
          type="submit"
          className="w-full mt-3 sm:mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2.5 sm:py-3 px-4 rounded-lg font-semibold text-sm sm:text-base transition-colors"
        >
          Check Answer
        </button>
      </form>
    </div>

    <div className="text-center text-xs sm:text-sm text-gray-500 px-2">
      {gamePhase === 'teamA' ? "Team A: 60 seconds to unscramble!" : "Team B: 60 seconds to unscramble!"}
    </div>
  </div>
);
};

export default ScrambledChapters;