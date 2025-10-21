import React, { useState } from 'react';

const BibleQuiz = ({ onBack, teamMode, teams, setTeams, currentTeam, setCurrentTeam }) => {
  const bibleQuestions = [
    {
      question: "Which prophet married a prostitute as an object lesson for Israel's unfaithfulness?",
      options: ["Ezekiel", "Hosea", "Jeremiah", "Amos"],
      correct: 1,
      explanation: "Hosea married Gomer to illustrate God's relationship with unfaithful Israel."
    },
    {
      question: "What was the name of the high priest's servant whose ear Peter cut off?",
      options: ["Malchus", "Simeon", "Justus", "Tertius"],
      correct: 0,
      explanation: "Malchus was the servant of the high priest Caiaphas (John 18:10)."
    },
    {
      question: "What were the names of the two mountains from which blessings and curses were proclaimed?",
      options: ["Sinai & Zion", "Gerizim & Ebal", "Carmel & Tabor", "Moriah & Olives"],
      correct: 1,
      explanation: "Mount Gerizim for blessings and Mount Ebal for curses (Deuteronomy 11:29)."
    },
    {
      question: "How many times did the Israelites march around Jericho on the seventh day?",
      options: ["7 times", "13 times", "1 time", "40 times"],
      correct: 0,
      explanation: "They marched around the city 7 times on the 7th day (Joshua 6:15)."
    },
    {
      question: "Which prophet was told to bake bread using human excrement as fuel?",
      options: ["Isaiah", "Jeremiah", "Ezekiel", "Daniel"],
      correct: 2,
      explanation: "God gave Ezekiel this object lesson about defiled food (Ezekiel 4:12-15)."
    },
    {
      question: "Which disciple was a Zealot?",
      options: ["Simon", "Judas", "Matthew", "James"],
      correct: 0,
      explanation: "Simon the Zealot was one of the twelve apostles (Luke 6:15)."
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Determine which team should answer the current question
  const getQuestionTeam = (questionIndex) => {
    // Question numbers are 1-based for users (index + 1)
    // Odd numbers: Team A (1, 3, 5...)
    // Even numbers: Team B (2, 4, 6...)
    return (questionIndex + 1) % 2 === 1 ? 'teamA' : 'teamB';
  };

  const handleAnswer = (optionIndex) => {
    setSelectedAnswer(optionIndex);
    setShowExplanation(true);
    
    if (optionIndex === bibleQuestions[currentQuestion].correct) {
      if (teamMode) {
        const points = 20; // Points per correct answer in team mode
        const questionTeam = getQuestionTeam(currentQuestion);
        setTeams(prev => ({
          ...prev,
          [questionTeam]: prev[questionTeam] + points
        }));
      } else {
        setScore(score + 1);
      }
    }
  };

  const nextQuestion = () => {
    setShowExplanation(false);
    setSelectedAnswer(null);
    
    if (currentQuestion < bibleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      // Update current team for the next question
      if (teamMode) {
        const nextQuestionTeam = getQuestionTeam(currentQuestion + 1);
        setCurrentTeam(nextQuestionTeam);
      }
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
    // Reset to Team A for first question if in team mode
    if (teamMode) {
      setCurrentTeam('teamA');
    }
  };

  if (showResult) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Complete!</h2>
          
          {teamMode ? (
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                  <h3 className="font-bold text-blue-800">Team A Score</h3>
                  <p className="text-2xl font-bold text-blue-600">
                    {teams.teamA} points
                  </p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border-2 border-red-200">
                  <h3 className="font-bold text-red-800">Team B Score</h3>
                  <p className="text-2xl font-bold text-red-600">
                    {teams.teamB} points
                  </p>
                </div>
              </div>
              <p className="text-lg text-gray-600">
                {teams.teamA === teams.teamB 
                  ? "It's a tie! 🎉" 
                  : teams.teamA > teams.teamB 
                    ? "Team A wins! 🏆" 
                    : "Team B wins! 🏆"
                }
              </p>
            </div>
          ) : (
            <p className="text-xl text-gray-600 mb-6">
              You scored <span className="font-bold text-blue-600">{score}</span> out of {bibleQuestions.length}
            </p>
          )}

          <div className="space-y-4">
            <button
              onClick={resetQuiz}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
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

  const currentQuestionTeam = teamMode ? getQuestionTeam(currentQuestion) : null;

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
          <div className="text-sm text-gray-500">
            Question {currentQuestion + 1} of {bibleQuestions.length}
          </div>
          {teamMode && currentQuestionTeam && (
            <div className={`text-sm font-semibold mt-1 ${
              currentQuestionTeam === 'teamA' ? 'text-blue-600' : 'text-red-600'
            }`}>
              {currentQuestionTeam === 'teamA' ? "Team A's Question" : "Team B's Question"}
            </div>
          )}
        </div>
      </div>

      {/* Team Indicator Banner */}
      {teamMode && currentQuestionTeam && (
        <div className={`mb-4 p-3 rounded-lg text-center font-bold ${
          currentQuestionTeam === 'teamA' 
            ? 'bg-blue-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          {currentQuestionTeam === 'teamA' ? "🎯 TEAM A - YOUR TURN" : "🎯 TEAM B - YOUR TURN"}
          <div className="text-sm font-normal mt-1">
            Question {currentQuestion + 1} is for {currentQuestionTeam === 'teamA' ? 'Team A' : 'Team B'}
          </div>
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {bibleQuestions[currentQuestion].question}
        </h2>
        
        <div className="space-y-3">
          {bibleQuestions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={selectedAnswer !== null}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedAnswer === null
                  ? teamMode && currentQuestionTeam === 'teamA'
                    ? 'border-blue-200 hover:border-blue-400 hover:bg-blue-50'
                    : teamMode && currentQuestionTeam === 'teamB'
                    ? 'border-red-200 hover:border-red-400 hover:bg-red-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  : selectedAnswer === index
                  ? index === bibleQuestions[currentQuestion].correct
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-red-500 bg-red-50 text-red-700'
                  : index === bibleQuestions[currentQuestion].correct
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-200 opacity-50'
              }`}
            >
              <div className="flex items-center">
                {option}
                {selectedAnswer !== null && index === bibleQuestions[currentQuestion].correct && (
                  <span className="ml-2 text-green-600">✓</span>
                )}
                {selectedAnswer === index && index !== bibleQuestions[currentQuestion].correct && (
                  <span className="ml-2 text-red-600">✗</span>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Explanation Section */}
        {showExplanation && (
          <div className={`mt-6 p-4 rounded-lg border-2 ${
            selectedAnswer === bibleQuestions[currentQuestion].correct 
              ? 'bg-green-50 border-green-200' 
              : 'bg-blue-50 border-blue-200'
          }`}>
            <h3 className="font-bold text-lg mb-2">
              {selectedAnswer === bibleQuestions[currentQuestion].correct 
                ? '✅ Correct!' 
                : '💡 Explanation'}
            </h3>
            <p className="text-gray-700">
              {bibleQuestions[currentQuestion].explanation}
            </p>
            {teamMode && selectedAnswer === bibleQuestions[currentQuestion].correct && (
              <p className="text-sm text-gray-600 mt-2">
                +20 points for {currentQuestionTeam === 'teamA' ? 'Team A' : 'Team B'}!
              </p>
            )}
            <button
              onClick={nextQuestion}
              className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
            >
              {currentQuestion < bibleQuestions.length - 1 ? 'Next Question' : 'See Results'}
            </button>
          </div>
        )}
      </div>

      {!showExplanation && teamMode && (
        <div className="text-center text-sm text-gray-500">
          Current Scores: Team A: <span className="font-bold text-blue-600">{teams.teamA}</span> | 
          Team B: <span className="font-bold text-red-600">{teams.teamB}</span>
        </div>
      )}

      {!showExplanation && !teamMode && (
        <div className="text-center text-gray-500">
          Score: {score}
        </div>
      )}
    </div>
  );
};

export default BibleQuiz;