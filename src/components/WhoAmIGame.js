import React, { useState, useEffect } from 'react';

const WhoAmIGame = ({ onBack, teamMode, teams, setTeams, currentTeam, setCurrentTeam }) => {
  const bibleCharacters = [
    {
      name: "ELIJAH",
      clues: [
        "My name means 'My God is Yahweh",
        "I never died a natural death",
        "I was fed by ravens during a drought",
        "I called down fire from heaven on Mount Carmel",
        "I confronted King Ahab and Queen Jezebel",
      ],
      funFacts: [
        "Elisha succeeded me as prophet",
        "I was taken up to heaven in a whirlwind"
      ]
    },
    {
      name: "ESTHER",
      clues: [
        "I was an orphan raised by my cousin",
        "I became queen of Persia",
        "I risked my life to save my people",
        "I said 'If I perish, I perish'",
        "My Hebrew name was Hadassah"
      ],
      funFacts: [
        "The book named after me never mentions God directly",
        "I was known for my great beauty and courage",
        "My story is celebrated during Purim"
      ]
    },
    {
      name: "ELISHA",
      clues: [
        "I purified a poisoned stew",
        "I performed more miracles than any other Old Testament prophet",
        "I healed a Syrian commander of leprosy",
        "I caused an iron axe head to float",
        "I had bears attack youths who mocked me"
      ],
      funFacts: [
        "My servant Gehazi became leprous for his greed",
        "I received a double portion of my mentor's spirit",
        "I once blinded an entire army and then led them to safety"
      ]
    },
    {
      name: "MARY MAGDALENE",
      clues: [
        "I am mentioned more than most apostles in the Gospels",
        "I was one of the first to witness the empty tomb",
        "I mistook Jesus for a gardener after His resurrection",
        "My name comes from the town of Magdala",
        "Jesus told me to go and tell the others He had risen"
      ],
      funFacts: [
        "I stood by the cross when most had fled",
        "My name comes from the town of Magdala"
      ]
    },
    {
      name: "CALEB",
      clues: [
        "I was one of twelve spies sent to explore Canaan",
        "I, along with Joshua, brought back a positive report",
        "I said 'We can certainly take the land!' when others were afraid",
        "I was given Hebron as my inheritance at age 85",
        "I followed the Lord wholeheartedly"
      ],
      funFacts: [
        "My name means 'faithful' or 'whole-hearted'",
        "I was from the tribe of Judah",
        "I lived through the entire 40 years in the wilderness"
      ]
    },
    {
      name: "STEPHEN",
      clues: [
        "I was chosen as one of the seven deacons",
        "My name means 'crown' in Greek",
        "I became the first Christian martyr",
        "I gave a long speech summarizing Israel's history before my death",
        "I saw the heavens open and Jesus standing at God's right hand",
      ],
      funFacts: [
        "My name means 'crown' in Greek",
        "Saul (later Paul) witnessed my stoning",
        "My story is told in Acts chapter 7"
      ]
    },
    {
      name: "NEHEMIAH",
      clues: [
        "I was a cupbearer to a Persian king",
        "I was grieved when I heard Jerusalem's walls were broken",
        "I led the rebuilding of Jerusalem's wall despite opposition",
        "I faced ridicule from Sanballat and Tobiah",
        "I enforced reforms and helped renew the covenant"
      ],
      funFacts: [
        "I worked alongside Ezra the scribe",
        "The wall was rebuilt in just 52 days",
        "I prayed nine recorded prayers in my book"
      ]
    },
    {
      name: "BARNABAS",
      clues: [
        "My real name was Joseph, but I was given a nickname meaning 'Son of Encouragement'",
        "I sold a field and gave the money to the apostles",
        "I introduced Saul to the apostles after his conversion",
        "I traveled with Paul on his first missionary journey",
        "I later mentored John Mark after parting ways with Paul"
      ],
      funFacts: [
        "I was from the tribe of Levi and born in Cyprus",
        "My name appears 33 times in the New Testament",
        "Tradition says I was stoned to death in Cyprus"
      ]
    },
    {
      name: "JOSIAH",
      clues: [
        "I became king of Judah at just eight years old",
        "I ordered the repair of the temple in Jerusalem",
        "A lost Book of the Law was found during my reign",
        "I tore my robes when I heard the words of the Law",
        "I led one of Judah's greatest religious reforms"
      ],
      funFacts: [
        "The prophetess Huldah confirmed God's message to me",
        "I died in battle against Pharaoh Neco of Egypt",
        "My reign marked a temporary revival before Judah's fall"
      ]
    },
    {
      name: "GIDEON",
      clues: [
        "I threshed wheat in secret when an angel appeared to me",
        "I asked God for signs involving a fleece and dew",
        "I defeated a massive army with just 300 men",
        "We used torches and jars to confuse the enemy",
        "I refused to become king after the victory"
      ],
      funFacts: [
        "My other name was Jerubbaal, meaning 'Let Baal contend with him'",
        "My story is found in Judges 6-8",
        "My descendants later caused trouble for Israel through idolatry"
      ]
    },
    {
      name: "PHILEMON",
      clues: [
        "I was a wealthy Christian who hosted a church in my house",
        "One of my slaves ran away and met Paul in prison",
        "Paul wrote me a personal letter asking me to forgive him",
        "I was urged to accept my runaway slave as a brother in Christ",
        "My story is found in one of the shortest New Testament books"
      ],
      funFacts: [
        "My runaway slave was Onesimus, whose name means 'useful'",
        "Paul's letter to me is only 25 verses long",
        "My example teaches reconciliation and forgiveness"
      ]
    }
  ];

  const [currentCharacter, setCurrentCharacter] = useState(null);
  const [currentClueIndex, setCurrentClueIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [guess, setGuess] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [usedCharacters, setUsedCharacters] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [timer, setTimer] = useState(20); // 20-second timer for each clue

  // Start the game immediately
  useEffect(() => {
    pickNewCharacter();
  }, []);

  // Timer effect
  useEffect(() => {
    if (currentCharacter && timer > 0 && !showAnswer && !gameOver) {
      const countdown = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearTimeout(countdown);
    } else if (timer === 0 && currentCharacter && !showAnswer && !gameOver) {
      // Auto-show next clue when timer reaches 0
      if (currentClueIndex < currentCharacter.clues.length - 1) {
        nextClue();
      } else {
        // No more clues, reveal answer
        revealAnswer();
      }
    }
  }, [timer, currentCharacter, showAnswer, gameOver]);

  const pickNewCharacter = () => {
    const availableCharacters = bibleCharacters.filter(char => 
      !usedCharacters.includes(char.name)
    );
    
    if (availableCharacters.length === 0) {
      setGameOver(true);
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableCharacters.length);
    const newCharacter = availableCharacters[randomIndex];
    setCurrentCharacter(newCharacter);
    setCurrentClueIndex(0);
    setGuess('');
    setShowAnswer(false);
    setTimer(20); // Reset timer for new character
    setUsedCharacters(prev => [...prev, newCharacter.name]);
  };

  const nextClue = () => {
    if (currentClueIndex < currentCharacter.clues.length - 1) {
      setCurrentClueIndex(currentClueIndex + 1);
      setTimer(20); // Reset timer for new clue
      setGuess(''); // Clear the guess input
    }
  };

  const handleGuess = (e) => {
    e.preventDefault();
    if (guess.trim().toUpperCase() === currentCharacter.name) {
      // Fewer clues used = more points (50, 40, 30, 20, 10)
      const points = (currentCharacter.clues.length - currentClueIndex) * 10;
      
      if (teamMode) {
        setTeams(prev => ({
          ...prev,
          [currentTeam]: prev[currentTeam] + points
        }));
        // Switch teams for next character
        setCurrentTeam(currentTeam === 'teamA' ? 'teamB' : 'teamA');
      } else {
        setScore(score + points);
      }
      pickNewCharacter();
    } else {
      alert("Not quite! Try again or wait for the next clue.");
      setGuess('');
    }
  };

  const revealAnswer = () => {
    setShowAnswer(true);
    setTimeout(() => {
      pickNewCharacter();
    }, 3000);
  };

  const resetGame = () => {
    setCurrentCharacter(null);
    setCurrentClueIndex(0);
    setScore(0);
    setGuess('');
    setShowAnswer(false);
    setUsedCharacters([]);
    setGameOver(false);
    setTimer(20);
    pickNewCharacter();
  };

  if (gameOver) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
        <div className="text-center">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Game Complete!</h2>
          
          {teamMode ? (
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className={`p-4 rounded-lg ${teams.teamA > teams.teamB ? 'bg-yellow-100 border-2 border-yellow-400' : 'bg-gray-100'}`}>
                  <h3 className="font-bold text-lg">Team A</h3>
                  <p className="text-2xl font-bold">{teams.teamA} points</p>
                </div>
                <div className={`p-4 rounded-lg ${teams.teamB > teams.teamA ? 'bg-yellow-100 border-2 border-yellow-400' : 'bg-gray-100'}`}>
                  <h3 className="font-bold text-lg">Team B</h3>
                  <p className="text-2xl font-bold">{teams.teamB} points</p>
                </div>
              </div>
              {teams.teamA === teams.teamB ? (
                <p className="text-xl text-gray-600">It's a tie! 🎉</p>
              ) : (
                <p className="text-xl text-gray-600">
                  {teams.teamA > teams.teamB ? 'Team A' : 'Team B'} wins! 🎉
                </p>
              )}
            </div>
          ) : (
            <div className="mb-6">
              <p className="text-2xl text-gray-700">
                Your final score: <span className="font-bold text-blue-600">{score}</span> points!
              </p>
            </div>
          )}

          <div className="space-y-4">
            <button
              onClick={resetGame}
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

  if (!currentCharacter) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Loading...</h2>
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
          {/* Timer Display */}
          <div className={`text-2xl font-bold mb-1 ${
            timer > 10 ? 'text-green-500' : 
            timer > 5 ? 'text-yellow-500' : 'text-red-500'
          }`}>
            {timer}s
          </div>
          
          {teamMode ? (
            <div className="text-center">
              <div className="flex gap-2 text-sm">
                <div className={`px-2 py-1 rounded ${currentTeam === 'teamA' ? 'bg-blue-500 text-white' : 'bg-blue-100'}`}>
                  A: {teams.teamA}
                </div>
                <div className={`px-2 py-1 rounded ${currentTeam === 'teamB' ? 'bg-red-500 text-white' : 'bg-red-100'}`}>
                  B: {teams.teamB}
                </div>
              </div>
              <div className={`text-xs font-semibold mt-1 ${currentTeam === 'teamA' ? 'text-blue-600' : 'text-red-600'}`}>
                {currentTeam === 'teamA' ? "Team A's turn" : "Team B's turn"}
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-500">Score: {score}</div>
          )}
        </div>
      </div>

      {/* Team Indicator Banner */}
      {teamMode && (
        <div className={`mb-4 p-3 rounded-lg text-center font-bold ${
          currentTeam === 'teamA' 
            ? 'bg-blue-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          {currentTeam === 'teamA' ? "🎯 TEAM A - YOUR TURN" : "🎯 TEAM B - YOUR TURN"}
        </div>
      )}

      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🤔</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Who Am I?</h2>
        
        {/* Progress indicator */}
        <div className="flex justify-center items-center mb-4">
          <div className="text-gray-600 mr-3">
            Clue {currentClueIndex + 1} of {currentCharacter.clues.length}
          </div>
          <div className="flex space-x-1">
            {currentCharacter.clues.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index <= currentClueIndex ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Timer Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className={`h-2 rounded-full transition-all duration-1000 ${
              timer > 10 ? 'bg-green-500' : 
              timer > 5 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${(timer / 20) * 100}%` }}
          />
        </div>

        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-6">
          <p className="text-xl font-semibold text-gray-800">
            "{currentCharacter.clues[currentClueIndex]}"
          </p>
        </div>

        {currentClueIndex < currentCharacter.clues.length - 1 && (
          <div className="mb-4">
            <button
              onClick={nextClue}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold transition-colors"
            >
              Need Another Clue? (Next guess: {(currentCharacter.clues.length - currentClueIndex - 1) * 10} points)
            </button>
            <p className="text-sm text-gray-500 mt-2">
              Next clue in: {timer} seconds
            </p>
          </div>
        )}

        <form onSubmit={handleGuess} className="max-w-md mx-auto">
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Type your guess here..."
            className="w-full p-4 border-2 border-gray-200 rounded-lg text-center text-xl font-semibold focus:border-blue-500 focus:outline-none mb-4"
            autoFocus
          />
          <div className="space-y-2">
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
            >
              Submit Guess
            </button>
            <button
              type="button"
              onClick={revealAnswer}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-lg font-semibold transition-colors"
            >
              Give Up & Reveal Answer
            </button>
          </div>
        </form>
      </div>

      {showAnswer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md text-center">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">It was...</h3>
            <p className="text-4xl font-bold text-blue-600 mb-4">{currentCharacter.name}</p>
            <p className="text-gray-600 mb-2">Fun fact:</p>
            <p className="text-gray-700 italic">
              {currentCharacter.funFacts[Math.floor(Math.random() * currentCharacter.funFacts.length)]}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhoAmIGame;