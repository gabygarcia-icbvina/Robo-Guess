export default function WordDisplay({ word, guessedLetters }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap justify-center gap-2">
        {word.split('').map((letter, i) => {
          const isRevealed = guessedLetters.includes(letter)
          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <span
                className={`
                  font-orbitron font-bold text-2xl w-9 text-center
                  transition-all duration-300
                  ${isRevealed ? 'text-cyber-accent text-glow-cyan letter-reveal' : 'text-transparent'}
                `}
              >
                {isRevealed ? letter : '?'}
              </span>
              <div className={`h-px w-9 transition-colors duration-300 ${
                isRevealed ? 'bg-cyber-accent shadow-[0_0_8px_rgba(0,212,255,0.6)]' : 'bg-cyber-dim'
              }`} />
            </div>
          )
        })}
      </div>
      <p className="text-cyber-dim text-xs tracking-widest">
        {word.split('').filter(l => !guessedLetters.includes(l)).length} LETRAS RESTANTES
      </p>
    </div>
  )
}
