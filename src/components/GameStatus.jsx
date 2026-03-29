import { MAX_ERRORS } from '../data/words'

export default function GameStatus({ errors, category, message }) {
  const pips = Array.from({ length: MAX_ERRORS })

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Category badge */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-cyber-dim tracking-widest uppercase">Categoría:</span>
        <span className="text-xs text-cyber-accent border border-cyber-border px-2 py-0.5 rounded-sm tracking-wider">
          {category}
        </span>
      </div>

      {/* Error pips */}
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between text-xs text-cyber-dim tracking-widest">
          <span>DAÑO AL SISTEMA</span>
          <span className={errors >= MAX_ERRORS ? 'text-cyber-danger' : errors >= 4 ? 'text-yellow-500' : 'text-cyber-accent'}>
            {errors}/{MAX_ERRORS}
          </span>
        </div>
        <div className="flex gap-1.5">
          {pips.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-2 rounded-sm transition-all duration-500 ${
                i < errors
                  ? i < 2 ? 'bg-yellow-500 shadow-[0_0_6px_rgba(234,179,8,0.5)]'
                    : i < 4 ? 'bg-orange-500 shadow-[0_0_6px_rgba(249,115,22,0.5)]'
                    : 'bg-cyber-danger shadow-[0_0_6px_rgba(255,64,96,0.5)]'
                  : 'bg-cyber-border/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Robot message terminal */}
      <div className="border border-cyber-border bg-cyber-panel/50 rounded-sm p-3 min-h-[56px] flex items-start gap-2">
        <span className="text-cyber-accent text-xs mt-0.5 shrink-0">▶</span>
        <p className="text-xs text-cyber-accent/80 tracking-wide leading-relaxed font-mono">
          {message}
          <span className="inline-block w-1.5 h-3 bg-cyber-accent/80 ml-1 animate-pulse" />
        </p>
      </div>
    </div>
  )
}
