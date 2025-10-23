import React, { useState } from 'react';
import BibleQuiz from './components/BibleQuiz';
import ScrambledChapters from './components/ScrambledChapters';
import WhoAmIGame from './components/WhoAmIGame';
import BibleBookOrder from './components/BibleBookOrder';
import BibleTimeline from './components/BibleTimeline';
import EmojiParables from './components/EmojiParables';
import Footer from './components/Footer';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-6 sm:mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              📖 Youth Bible Challenge
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">Fun games for spiritual growth</p>
          </div>
          
          {/* Team Scores Display */}
          {teamMode && (
            <div className="mt-4 bg-white rounded-xl shadow-lg p-3 sm:p-4 max-w-md mx-auto">
              <h3 className="font-bold text-gray-800 mb-2 text-sm sm:text-base">Team Scores</h3>
              <div className="flex justify-between items-center">
                <div className={`px-3 sm:px-4 py-2 rounded-lg ${currentTeam === 'teamA' ? 'bg-blue-500 text-white' : 'bg-blue-100'} text-center min-w-20`}>
                  <div className="font-bold text-xs sm:text-sm">Team A</div>
                  <div className="text-lg sm:text-xl font-bold">{teams.teamA} pts</div>
                </div>
                <div className="px-2 sm:px-4 text-gray-500 font-bold text-sm sm:text-base">VS</div>
                <div className={`px-3 sm:px-4 py-2 rounded-lg ${currentTeam === 'teamB' ? 'bg-red-500 text-white' : 'bg-red-100'} text-center min-w-20`}>
                  <div className="font-bold text-xs sm:text-sm">Team B</div>
                  <div className="text-lg sm:text-xl font-bold">{teams.teamB} pts</div>
                </div>
              </div>
              <button
                onClick={resetScores}
                className="mt-2 text-xs sm:text-sm text-gray-500 hover:text-gray-700 w-full text-center"
              >
                Reset Scores
              </button>
            </div>
          )}
        </header>

        {currentGame === 'menu' && (
          <div className="space-y-6 sm:space-y-8">
            {/* Game Mode Selection */}
            {!teamMode && (
              <div className="flex justify-center max-w-2xl mx-auto">
                <button
                  onClick={startTeamGame}
                  className="bg-purple-500 hover:bg-purple-600 text-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 w-full max-w-xs"
                >
                  <div className="text-2xl sm:text-3xl mb-2">👥</div>
                  <h2 className="text-lg sm:text-xl font-bold mb-2">Team Play</h2>
                  <p className="text-purple-100 text-xs sm:text-sm">Team A vs Team B!</p>
                </button>
              </div>
            )}

            {/* Game Selection */}
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto">
              <button
                onClick={() => setCurrentGame('quiz')}
                className="bg-blue-500 hover:bg-blue-600 text-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center text-center min-h-32"
              >
                <div className="text-2xl sm:text-3xl mb-2">❓</div>
                <h2 className="text-base sm:text-lg font-bold mb-1 sm:mb-2">Bible Quiz</h2>
                <p className="text-blue-100 text-xs sm:text-sm leading-tight">Test your Bible knowledge</p>
              </button>

              <button
                onClick={() => setCurrentGame('scrambled')}
                className="bg-green-500 hover:bg-green-600 text-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center text-center min-h-32"
              >
                <div className="text-2xl sm:text-3xl mb-2">🔤</div>
                <h2 className="text-base sm:text-lg font-bold mb-1 sm:mb-2">Scrambled Books</h2>
                <p className="text-green-100 text-xs sm:text-sm leading-tight">Unscramble Bible Books</p>
              </button>

              <button
                onClick={() => setCurrentGame('whoami')}
                className="bg-orange-500 hover:bg-orange-600 text-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center text-center min-h-32"
              >
                <div className="text-2xl sm:text-3xl mb-2">🎭</div>
                <h2 className="text-base sm:text-lg font-bold mb-1 sm:mb-2">Who Am I?</h2>
                <p className="text-orange-100 text-xs sm:text-sm leading-tight">Guess Bible characters</p>
              </button>

              <button 
                onClick={() => setCurrentGame('bookorder')}
                className="bg-purple-500 hover:bg-purple-600 text-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center text-center min-h-32"
              >
                <div className="text-2xl sm:text-3xl mb-2">📚</div>
                <h2 className="text-base sm:text-lg font-bold mb-1 sm:mb-2">Book Order</h2>
                <p className="text-purple-100 text-xs sm:text-sm leading-tight">Drag Books in Order</p>
              </button>

              <button 
                onClick={() => setCurrentGame('timeline')}
                className="bg-indigo-500 hover:bg-indigo-600 text-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center text-center min-h-32"
              >
                <div className="text-2xl sm:text-3xl mb-2">⏳</div>
                <h2 className="text-base sm:text-lg font-bold mb-1 sm:mb-2">Timeline</h2>
                <p className="text-indigo-100 text-xs sm:text-sm leading-tight">Order chronologically</p>
              </button>

              <button 
                onClick={() => setCurrentGame('emojis')}
                className="bg-pink-500 hover:bg-pink-600 text-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center text-center min-h-32"
              >
                <div className="text-2xl sm:text-3xl mb-2">😇</div>
                <h2 className="text-base sm:text-lg font-bold mb-1 sm:mb-2">Emoji Parables</h2>
                <p className="text-pink-100 text-xs sm:text-sm leading-tight">Guess from emojis</p>
              </button>
            </div>
            
            <Footer />
          </div>
        )}

        {/* Game Components */}
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

        {currentGame === 'bookorder' && (
          <BibleBookOrder 
            onBack={() => setCurrentGame('menu')} 
            teamMode={teamMode}
            teams={teams}
            setTeams={setTeams}
            currentTeam={currentTeam}
            setCurrentTeam={setCurrentTeam}
          />
        )}

        {currentGame === 'timeline' && (
          <BibleTimeline 
            onBack={() => setCurrentGame('menu')} 
            teamMode={teamMode}
            teams={teams}
            setTeams={setTeams}
            currentTeam={currentTeam}
            setCurrentTeam={setCurrentTeam}
          />
        )}

        {currentGame === 'emojis' && (
          <EmojiParables 
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