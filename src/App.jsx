import { useState, useEffect, useCallback } from 'react'
import Robot from './components/Robot'
import WordDisplay from './components/WordDisplay'
import Keyboard from './components/Keyboard'
import GameStatus from './components/GameStatus'
import { getRandomWord, MAX_ERRORS, ROBOT_MESSAGES } from './data/words'

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export default function App() {
  const [wordData, setWordData] = useState(() => getRandomWord())
  const [guessedLetters, setGuessedLetters] = useState([])
  const [message, setMessage] = useState(getRandom(ROBOT_MESSAGES.start))
  const [score, setScore] = useState({ wins: 0, losses: 0 })
  const [showResult, setShowResult] = useState(false)

  const { word, category } = wordData
  const errors = guessedLetters.filter(l => !word.includes(l)).length
  const isWin = word.split('').every(l => guessedLetters.includes(l))
  const isLose = errors >= MAX_ERRORS

  useEffect(() => {
    if (isWin) {
      setMessage(getRandom(ROBOT_MESSAGES.win))
      setScore(s => ({ ...s, wins: s.wins + 1 }))
      setShowResult(true)
    } else if (isLose) {
      setMessage(getRandom(ROBOT_MESSAGES.lose) + word)
      setScore(s => ({ ...s, losses: s.losses + 1 }))
      setShowResult(true)
    }
  }, [isWin, isLose])

  const handleGuess = useCallback((letter) => {
    if (guessedLetters.includes(letter) || isWin || isLose) return
    setGuessedLetters(prev => [...prev, letter])
    if (word.includes(letter)) {
      setMessage(getRandom(ROBOT_MESSAGES.correct))
    } else {
      setMessage(getRandom(ROBOT_MESSAGES.wrong))
    }
  }, [guessedLetters, word, isWin, isLose])

  // Keyboard support
  useEffect(() => {
    const handler = (e) => {
      const letter = e.key.toUpperCase()
      if (/^[A-ZÁÉÍÓÚÑÜ]$/.test(letter)) handleGuess(letter)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleGuess])

  const resetGame = () => {
    setWordData(getRandomWord())
    setGuessedLetters([])
    setMessage(getRandom(ROBOT_MESSAGES.start))
    setShowResult(false)
  }

  return (
    <div className="relative z-10 min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-cyber-border relative">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-px bg-cyber-accent shadow-[0_0_12px_rgba(0,212,255,0.6)]" />
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-orbitron font-black text-xl tracking-widest text-white text-glow-cyan">
              ROBO<span className="text-cyber-accent">-</span>GUESS
            </h1>
            <p className="text-cyber-dim text-xs tracking-[0.3em] uppercase mt-0.5">Sistema de Ahorcado v2.0</p>
          </div>
          {/* Score */}
          <div className="flex gap-4 text-xs tracking-widest">
            <div className="flex flex-col items-center">
              <span className="text-cyber-green text-lg font-orbitron font-bold text-glow-green">{score.wins}</span>
              <span className="text-cyber-dim">VICTORIAS</span>
            </div>
            <div className="w-px bg-cyber-border" />
            <div className="flex flex-col items-center">
              <span className="text-cyber-danger text-lg font-orbitron font-bold text-glow-red">{score.losses}</span>
              <span className="text-cyber-dim">DERROTAS</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main game */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 flex flex-col gap-6">
        {/* Top row: Robot + Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Robot panel */}
          <div className={`
            border rounded-sm p-6 flex items-center justify-center bg-cyber-panel/30
            ${isWin ? 'border-cyber-green border-glow-green' : isLose ? 'border-cyber-danger border-glow-red' : 'border-cyber-border border-glow-cyan'}
          `}>
            <div className="absolute top-2 left-3 text-xs text-cyber-dim tracking-widest">UNIDAD 7X</div>
            <Robot errors={errors} isWin={isWin} isLose={isLose} />
          </div>

          {/* Status panel */}
          <div className="border border-cyber-border bg-cyber-panel/30 rounded-sm p-5 flex flex-col justify-between gap-4">
            <div className="text-xs text-cyber-dim tracking-[0.3em] uppercase border-b border-cyber-border pb-2">
              Panel de Control
            </div>
            <GameStatus errors={errors} category={category} message={message} />
          </div>
        </div>

        {/* Word display */}
        <div className="border border-cyber-border bg-cyber-panel/20 rounded-sm p-6">
          <div className="text-xs text-cyber-dim tracking-[0.3em] uppercase mb-4">Descifra la Palabra</div>
          <WordDisplay word={word} guessedLetters={guessedLetters} />
        </div>

        {/* Keyboard */}
        <div className="border border-cyber-border bg-cyber-panel/20 rounded-sm p-5">
          <div className="text-xs text-cyber-dim tracking-[0.3em] uppercase mb-4">Terminal de Entrada</div>
          <Keyboard
            guessedLetters={guessedLetters}
            word={word}
            onGuess={handleGuess}
            disabled={isWin || isLose}
          />
        </div>
      </main>

      {/* Result overlay */}
      {showResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-cyber-bg/80 backdrop-blur-sm">
          <div className={`
            border-2 rounded-sm p-8 text-center max-w-sm w-full mx-4 bg-cyber-panel
            ${isWin ? 'border-cyber-green shadow-cyber-green' : 'border-cyber-danger shadow-cyber-danger'}
          `}>
            <div className={`font-orbitron font-black text-3xl mb-2 ${isWin ? 'text-cyber-green text-glow-green' : 'text-cyber-danger text-glow-red'}`}>
              {isWin ? '¡VICTORIA!' : 'SISTEMA DESTRUIDO'}
            </div>
            <p className="text-cyber-dim text-xs tracking-widest mb-2">
              {isWin ? 'Descifraste la palabra correctamente' : `La palabra era:`}
            </p>
            {isLose && (
              <p className="font-orbitron font-bold text-xl text-white mb-4">{word}</p>
            )}
            <p className="text-xs text-cyber-dim mb-6">
              Errores: <span className={isWin ? 'text-cyber-green' : 'text-cyber-danger'}>{errors}/{MAX_ERRORS}</span>
            </p>
            <button
              onClick={resetGame}
              className="w-full py-3 border-2 border-cyber-accent text-cyber-accent font-orbitron font-bold text-sm tracking-widest rounded-sm hover:bg-cyber-accent/10 hover:shadow-cyber transition-all duration-200 active:scale-95"
            >
              ▶ NUEVA PARTIDA
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-cyber-border py-3 text-center text-cyber-dim text-xs tracking-widest">
        ROBO-GUESS © 2025 — PRESIONA TECLAS DEL TECLADO PARA JUGAR
      </footer>
    </div>
  )
}
