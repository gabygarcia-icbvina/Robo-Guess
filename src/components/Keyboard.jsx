const ROWS = [
  ['Q','W','E','R','T','Y','U','I','O','P'],
  ['A','S','D','F','G','H','J','K','L','Ñ'],
  ['Z','X','C','V','B','N','M'],
]

export default function Keyboard({ guessedLetters, word, onGuess, disabled }) {
  return (
    <div className="flex flex-col items-center gap-2">
      {ROWS.map((row, ri) => (
        <div key={ri} className="flex gap-1.5 flex-wrap justify-center">
          {row.map(letter => {
            const isGuessed = guessedLetters.includes(letter)
            const isCorrect = isGuessed && word.includes(letter)
            const isWrong = isGuessed && !word.includes(letter)

            return (
              <button
                key={letter}
                onClick={() => onGuess(letter)}
                disabled={isGuessed || disabled}
                className={`
                  key-btn font-mono text-sm font-bold
                  w-9 h-9 rounded-sm border
                  transition-all duration-200
                  ${isCorrect
                    ? 'bg-cyber-green/10 border-cyber-green text-cyber-green shadow-[0_0_8px_rgba(0,255,136,0.3)] cursor-default'
                    : isWrong
                    ? 'bg-cyber-danger/10 border-cyber-danger/40 text-cyber-danger/40 cursor-default line-through'
                    : disabled
                    ? 'bg-transparent border-cyber-border/30 text-cyber-dim/30 cursor-not-allowed'
                    : 'bg-cyber-panel border-cyber-border text-cyber-accent hover:border-cyber-accent hover:bg-cyber-accent/10 hover:shadow-[0_0_12px_rgba(0,212,255,0.2)] cursor-pointer'
                  }
                `}
              >
                {letter}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}
