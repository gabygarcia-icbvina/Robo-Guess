export const WORDS = [
  // Tecnología
  { word: 'ALGORITMO', category: 'Tecnología' },
  { word: 'COMPILADOR', category: 'Tecnología' },
  { word: 'VARIABLE', category: 'Tecnología' },
  { word: 'FUNCION', category: 'Tecnología' },
  { word: 'BUCLE', category: 'Tecnología' },
  { word: 'SERVIDOR', category: 'Tecnología' },
  { word: 'BINARIO', category: 'Tecnología' },
  { word: 'RECURSION', category: 'Tecnología' },
  { word: 'PUNTERO', category: 'Tecnología' },
  { word: 'INTERFAZ', category: 'Tecnología' },
  { word: 'INTERNET', category: 'Tecnología' },
  { word: 'ROBOTICA', category: 'Tecnología' },
  { word: 'INTELIGENCIA', category: 'Tecnología' },
  { word: 'SOFTWARE', category: 'Tecnología' },
  { word: 'HARDWARE', category: 'Tecnología' },
  { word: 'CIBERSEGURIDAD', category: 'Tecnología' },
  { word: 'VIRTUAL', category: 'Tecnología' },
  { word: 'COMPUTADOR', category: 'Tecnología' },
  { word: 'APLICACION', category: 'Tecnología' },
  { word: 'CODIGO', category: 'Tecnología' },
  { word: 'CONSOLA', category: 'Tecnología' },
  { word: 'SISTEMA', category: 'Tecnología' },
  { word: 'ARCHIVO', category: 'Tecnología' },
  { word: 'CARPETA', category: 'Tecnología' },
  { word: 'MEMORIA', category: 'Tecnología' },
  { word: 'OBJETO', category: 'Tecnología' },
  { word: 'CLASE', category: 'Tecnología' }
]

export const MAX_ERRORS = 6

export const ROBOT_MESSAGES = {
  start: [
    'INICIANDO PROTOCOLO DE JUEGO...',
    'CARGANDO BASE DE DATOS LÉXICA...',
    'SISTEMA LISTO. ¡ADIVINA MI PALABRA!',
  ],
  correct: [
    '¡CORRECTO! DATO REGISTRADO.',
    'COINCIDENCIA DETECTADA. BIEN JUGADO.',
    'PROCESANDO... ¡ACIERTO CONFIRMADO!',
    'EXCELENTE. MIS CIRCUITOS APRUEBAN.',
  ],
  wrong: [
    'ERROR 404: LETRA NO ENCONTRADA.',
    'FALLO REGISTRADO. INTENTA DE NUEVO.',
    'DATO INCORRECTO. SISTEMA DAÑADO +1.',
    'ALERTA: COMPONENTE AVERIADO.',
    'NO ESTÁ EN MIS ARCHIVOS.',
  ],
  win: [
    '¡VICTORIA HUMANA! DATOS ACTUALIZADOS.',
    'IMPRESIONANTE. TU LÓGICA ES SUPERIOR.',
    '¡GANASTE! RECALIBRANDO DIFICULTAD...',
  ],
  lose: [
    'SISTEMA DESTRUIDO. LA PALABRA ERA: ',
    'GAME OVER. DERROTA REGISTRADA. ERA: ',
    'FIN DE PARTIDA. MI SECRETO ERA: ',
  ],
}

export function getRandomWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)]
}
