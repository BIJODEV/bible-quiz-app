import React, { useState } from 'react';
import BibleQuiz from './components/BibleQuiz';
import ScrambledChapters from './components/ScrambledChapters';
import WhoAmIGame from './components/WhoAmIGame';

function App() {
  const [currentGame, setCurrentGame] = useState('menu');
  const [teamMode, setTeamMode] = useState(false);
  const [teams, setTeams] = useState({ teamA: 0, teamB: 0 });
  const [currentTeam, setCurrentTeam] = useState('teamA');

  const startTeamGame = () => {
    setTeamMode(true);
    setTeams({ teamA: 0, teamB: 0 });
    setCurrentTeam('teamA');
    setCurrentGame('menu');
  };

  const startIndividualGame = () => {
    setTeamMode(false);
    setCurrentGame('menu');
  };

  const resetScores = () => {
    setTeams({ teamA: 0, teamB: 0 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📖 PYPA Bible Challenge
          </h1>
          <p className="text-gray-600">Fun games for spiritual growth</p>
          
          {/* Team Scores Display */}
          {teamMode && (
            <div className="mt-4 bg-white rounded-xl shadow-lg p-4 max-w-md mx-auto">
              <h3 className="font-bold text-gray-800 mb-2">Team Scores</h3>
              <div className="flex justify-between">
                <div className={`px-4 py-2 rounded-lg ${currentTeam === 'teamA' ? 'bg-blue-500 text-white' : 'bg-blue-100'}`}>
                  <div className="font-bold">Team A</div>
                  <div className="text-xl">{teams.teamA} pts</div>
                </div>
                <div className="px-4 py-2 text-gray-500 font-bold">VS</div>
                <div className={`px-4 py-2 rounded-lg ${currentTeam === 'teamB' ? 'bg-red-500 text-white' : 'bg-red-100'}`}>
                  <div className="font-bold">Team B</div>
                  <div className="text-xl">{teams.teamB} pts</div>
                </div>
              </div>
              <button
                onClick={resetScores}
                className="mt-2 text-sm text-gray-500 hover:text-gray-700"
              >
                Reset Scores
              </button>
            </div>
          )}
        </header>

        {currentGame === 'menu' && (
          <div>
            {/* Game Mode Selection */}
            {!teamMode && (
              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
                <button
                  onClick={startTeamGame}
                  className="bg-purple-500 hover:bg-purple-600 text-white p-6 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <div className="text-3xl mb-2">👥</div>
                  <h2 className="text-xl font-bold mb-2">Team Play</h2>
                  <p className="text-purple-100">Team A vs Team B!</p>
                </button>

                {/* <button
                  onClick={startIndividualGame}
                  className="bg-green-500 hover:bg-green-600 text-white p-6 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <div className="text-3xl mb-2">👤</div>
                  <h2 className="text-xl font-bold mb-2">Individual Play</h2>
                  <p className="text-green-100">Play for personal high scores</p>
                </button> */}
              </div>
            )}

            {/* Game Selection */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <button
                onClick={() => setCurrentGame('quiz')}
                className="bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-3xl mb-2">❓</div>
                <h2 className="text-xl font-bold mb-2">Bible Quiz</h2>
                <p className="text-blue-100 text-sm">Test your Bible knowledge</p>
              </button>

              <button
                onClick={() => setCurrentGame('scrambled')}
                className="bg-green-500 hover:bg-green-600 text-white p-6 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-3xl mb-2">🔤</div>
                <h2 className="text-xl font-bold mb-2">Scrambled Books/Characters</h2>
                <p className="text-green-100 text-sm">Unscramble Bible Books and Characters</p>
              </button>

              <button
                onClick={() => setCurrentGame('whoami')}
                className="bg-orange-500 hover:bg-orange-600 text-white p-6 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-3xl mb-2">🎭</div>
                <h2 className="text-xl font-bold mb-2">Who Am I?</h2>
                <p className="text-orange-100 text-sm">Guess Bible characters</p>
              </button>
            </div>
          </div>
        )}

        {currentGame === 'quiz' && (
          <BibleQuiz 
            onBack={() => setCurrentGame('menu')} 
            teamMode={teamMode}
            teams={teams}
            setTeams={setTeams}
            currentTeam={currentTeam}
            setCurrentTeam={setCurrentTeam}
          />
        )}

        {currentGame === 'scrambled' && (
          <ScrambledChapters 
            onBack={() => setCurrentGame('menu')} 
            teamMode={teamMode}
            teams={teams}
            setTeams={setTeams}
            currentTeam={currentTeam}
            setCurrentTeam={setCurrentTeam}
          />
        )}

        {currentGame === 'whoami' && (
          <WhoAmIGame 
            onBack={() => setCurrentGame('menu')} 
            teamMode={teamMode}
            teams={teams}
            setTeams={setTeams}
            currentTeam={currentTeam}
            setCurrentTeam={setCurrentTeam}
          />
        )}
      </div>
    </div>
  );
}

export default App;