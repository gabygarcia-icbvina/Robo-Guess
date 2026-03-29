import { useEffect, useState } from 'react'

const DAMAGE_STATES = [
  // 0 errors - perfect robot
  { headColor: '#00d4ff', eyeColor: '#00ff88', mouthType: 'happy', antennaOn: true, sparks: false, crack: false },
  // 1 error
  { headColor: '#00b8d9', eyeColor: '#00e07a', mouthType: 'neutral', antennaOn: true, sparks: false, crack: false },
  // 2 errors
  { headColor: '#0099b3', eyeColor: '#ffcc00', mouthType: 'neutral', antennaOn: true, sparks: true, crack: false },
  // 3 errors
  { headColor: '#cc6600', eyeColor: '#ff8800', mouthType: 'worried', antennaOn: false, sparks: true, crack: false },
  // 4 errors
  { headColor: '#aa3300', eyeColor: '#ff4400', mouthType: 'worried', antennaOn: false, sparks: true, crack: true },
  // 5 errors
  { headColor: '#880000', eyeColor: '#ff2200', mouthType: 'sad', antennaOn: false, sparks: true, crack: true },
  // 6 errors - dead
  { headColor: '#330000', eyeColor: '#440000', mouthType: 'dead', antennaOn: false, sparks: false, crack: true },
]

export default function Robot({ errors, isWin, isLose }) {
  const [blinking, setBlinking] = useState(false)
  const [shaking, setShaking] = useState(false)
  const [prevErrors, setPrevErrors] = useState(errors)

  const state = DAMAGE_STATES[Math.min(errors, 6)]

  useEffect(() => {
    if (errors > prevErrors) {
      setShaking(true)
      setTimeout(() => setShaking(false), 500)
    }
    setPrevErrors(errors)
  }, [errors])

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isLose) {
        setBlinking(true)
        setTimeout(() => setBlinking(false), 200)
      }
    }, 3000 + Math.random() * 2000)
    return () => clearInterval(interval)
  }, [isLose])

  const eyeScaleY = blinking ? 0.1 : 1

  return (
    <div className={`flex flex-col items-center gap-3 ${shaking ? 'shake' : ''} ${isWin ? 'win-pulse' : ''}`}>
      <svg
        width="180"
        height="200"
        viewBox="0 0 180 200"
        className={!isLose && !isWin ? 'robot-float' : ''}
      >
        {/* Antenna */}
        {state.antennaOn && (
          <>
            <line x1="90" y1="10" x2="90" y2="35" stroke={state.headColor} strokeWidth="3" strokeLinecap="round" />
            <circle cx="90" cy="8" r="5" fill={state.eyeColor} opacity="0.9">
              <animate attributeName="opacity" values="0.9;0.3;0.9" dur="1.5s" repeatCount="indefinite" />
            </circle>
          </>
        )}
        {!state.antennaOn && (
          <line x1="86" y1="14" x2="90" y2="35" stroke="#330000" strokeWidth="3" strokeLinecap="round" transform="rotate(-25 90 35)" />
        )}

        {/* Head */}
        <rect x="30" y="35" width="120" height="95" rx="16" fill={state.headColor} opacity="0.15" />
        <rect x="30" y="35" width="120" height="95" rx="16" fill="none" stroke={state.headColor} strokeWidth="2.5" />

        {/* Crack on head */}
        {state.crack && (
          <path d="M95 38 L88 60 L94 65 L85 90" stroke="#ff4060" strokeWidth="1.5" fill="none" opacity="0.8" />
        )}

        {/* Eyes */}
        <g transform={`translate(57, 68) scale(1, ${eyeScaleY})`} style={{ transformOrigin: '0 10px' }}>
          <rect x="0" y="0" width="22" height="20" rx="4" fill={state.eyeColor} opacity="0.2" />
          <rect x="0" y="0" width="22" height="20" rx="4" fill="none" stroke={state.eyeColor} strokeWidth="1.5" />
          <circle cx="11" cy="10" r="5" fill={state.eyeColor} />
          {errors < 5 && <circle cx="13" cy="8" r="2" fill="white" opacity="0.6" />}
        </g>
        <g transform={`translate(101, 68) scale(1, ${eyeScaleY})`} style={{ transformOrigin: '0 10px' }}>
          <rect x="0" y="0" width="22" height="20" rx="4" fill={state.eyeColor} opacity="0.2" />
          <rect x="0" y="0" width="22" height="20" rx="4" fill="none" stroke={state.eyeColor} strokeWidth="1.5" />
          <circle cx="11" cy="10" r="5" fill={state.eyeColor} />
          {errors < 5 && <circle cx="13" cy="8" r="2" fill="white" opacity="0.6" />}
        </g>

        {/* X eyes when dead */}
        {state.mouthType === 'dead' && (
          <>
            <line x1="57" y1="68" x2="79" y2="88" stroke="#ff4060" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="79" y1="68" x2="57" y2="88" stroke="#ff4060" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="101" y1="68" x2="123" y2="88" stroke="#ff4060" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="123" y1="68" x2="101" y2="88" stroke="#ff4060" strokeWidth="2.5" strokeLinecap="round" />
          </>
        )}

        {/* Mouth */}
        {state.mouthType === 'happy' && (
          <path d="M62 105 Q90 122 118 105" stroke={state.eyeColor} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        )}
        {state.mouthType === 'neutral' && (
          <line x1="65" y1="112" x2="115" y2="112" stroke={state.eyeColor} strokeWidth="2.5" strokeLinecap="round" />
        )}
        {state.mouthType === 'worried' && (
          <path d="M65 118 Q90 108 115 118" stroke="#ff8800" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        )}
        {state.mouthType === 'sad' && (
          <path d="M62 120 Q90 106 118 120" stroke="#ff4060" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        )}
        {state.mouthType === 'dead' && (
          <path d="M62 120 Q90 106 118 120" stroke="#440000" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        )}

        {/* Neck */}
        <rect x="78" y="130" width="24" height="14" rx="4" fill={state.headColor} opacity="0.3" />
        <rect x="78" y="130" width="24" height="14" rx="4" fill="none" stroke={state.headColor} strokeWidth="1.5" />

        {/* Body */}
        <rect x="25" y="144" width="130" height="80" rx="14" fill={state.headColor} opacity="0.1" />
        <rect x="25" y="144" width="130" height="80" rx="14" fill="none" stroke={state.headColor} strokeWidth="2" />

        {/* Chest panel */}
        <rect x="50" y="158" width="80" height="50" rx="8" fill={state.headColor} opacity="0.08" />
        <rect x="50" y="158" width="80" height="50" rx="8" fill="none" stroke={state.headColor} strokeWidth="1" opacity="0.5" />

        {/* Chest lights */}
        <circle cx="68" cy="174" r="6" fill={errors < 2 ? '#00ff88' : errors < 4 ? '#ffcc00' : '#ff4060'} opacity="0.8">
          {errors < 6 && <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />}
        </circle>
        <circle cx="90" cy="174" r="6" fill={errors < 3 ? '#00d4ff' : errors < 5 ? '#ff8800' : '#440000'} opacity="0.8">
          {errors < 6 && <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2.5s" repeatCount="indefinite" />}
        </circle>
        <circle cx="112" cy="174" r="6" fill={errors < 4 ? '#00d4ff' : '#440000'} opacity="0.8">
          {errors < 6 && <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1.8s" repeatCount="indefinite" />}
        </circle>

        {/* Progress bar on chest */}
        <rect x="58" y="192" width="64" height="8" rx="4" fill="#0d1525" />
        <rect
          x="58" y="192"
          width={Math.max(0, 64 - (errors / 6) * 64)}
          height="8"
          rx="4"
          fill={errors < 3 ? '#00ff88' : errors < 5 ? '#ffcc00' : '#ff4060'}
        />

        {/* Sparks on damage */}
        {state.sparks && (
          <>
            <circle cx="145" cy="50" r="2" fill="#ffcc00" opacity="0.9">
              <animate attributeName="cx" values="145;148;143;146;145" dur="0.3s" repeatCount="indefinite" />
              <animate attributeName="cy" values="50;47;52;48;50" dur="0.3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.9;0.2;0.8;0.1;0.9" dur="0.4s" repeatCount="indefinite" />
            </circle>
            <circle cx="35" cy="80" r="2" fill="#ff8800" opacity="0.8">
              <animate attributeName="cx" values="35;32;37;34;35" dur="0.25s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0.1;0.7;0.2;0.8" dur="0.35s" repeatCount="indefinite" />
            </circle>
          </>
        )}

        {/* Win stars */}
        {isWin && (
          <>
            {[[-20, 20], [200, 30], [-15, 120], [195, 100], [90, -10]].map(([x, y], i) => (
              <text key={i} x={x} y={y} fontSize="16" opacity="0.9" style={{ animation: `winPulse 0.6s ease-in-out ${i * 0.1}s infinite` }}>★</text>
            ))}
          </>
        )}
      </svg>

      {/* Status label */}
      <div className={`text-xs tracking-widest uppercase px-3 py-1 border rounded-sm ${
        isWin
          ? 'text-cyber-green border-cyber-green border-glow-green'
          : isLose
          ? 'text-cyber-danger border-cyber-danger border-glow-red'
          : errors === 0
          ? 'text-cyber-accent border-cyber-border'
          : errors < 3
          ? 'text-yellow-400 border-yellow-800'
          : 'text-cyber-danger border-cyber-danger'
      }`}>
        {isWin ? '★ VICTORIA ★' : isLose ? '✕ SISTEMA DESTRUIDO' : errors === 0 ? '● OPERATIVO' : errors < 3 ? '⚠ DAÑADO' : errors < 5 ? '⚠ CRÍTICO' : '✕ FALLO INMINENTE'}
      </div>
    </div>
  )
}
