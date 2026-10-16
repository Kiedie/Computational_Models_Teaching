// Datos de todos los autómatas que se dibujan en las diapositivas.
// Coordenadas en unidades del viewBox (ancho × alto).

export interface Estado {
  id: string
  x: number
  y: number
  label?: string // por defecto, el id
  inicial?: boolean
  final?: boolean
  r?: number
}

export interface Arista {
  de: string
  a: string
  s: string // símbolo(s): 'a', 'ε', 'a, b'...
  curva?: number // desplazamiento perpendicular del punto medio (0 = recta)
  bucle?: 'arriba' | 'abajo' | 'izq' | 'der' // sólo si de === a
  lado?: 1 | -1 // fuerza el lado de la etiqueta en aristas rectas
}

export interface Caja {
  x: number
  y: number
  w: number
  h: number
  label?: string
}

export interface Texto {
  x: number
  y: number
  t: string
}

export interface Automata {
  ancho: number
  alto: number
  estados: Estado[]
  aristas: Arista[]
  cajas?: Caja[]
  textos?: Texto[]
}

export const AUTOMATAS: Record<string, Automata> = {
  // ───────── Casos base (genéricos, como en teoría) ─────────
  'gen-vacio': {
    ancho: 110, alto: 80,
    estados: [{ id: 'q0', x: 70, y: 40, inicial: true }],
    aristas: [],
  },
  'gen-eps': {
    ancho: 110, alto: 80,
    estados: [{ id: 'q0', x: 70, y: 40, inicial: true, final: true }],
    aristas: [],
  },
  'gen-a': {
    ancho: 200, alto: 80,
    estados: [
      { id: 'q0', x: 70, y: 40, inicial: true },
      { id: 'q1', x: 170, y: 40, final: true },
    ],
    aristas: [{ de: 'q0', a: 'q1', s: 'a' }],
  },

  // ───────── Casos base de nuestro ejercicio ─────────
  'base-a': {
    ancho: 200, alto: 80,
    estados: [
      { id: 'q1', x: 70, y: 40, inicial: true },
      { id: 'q2', x: 170, y: 40, final: true },
    ],
    aristas: [{ de: 'q1', a: 'q2', s: 'a' }],
  },
  'base-eps': {
    ancho: 110, alto: 80,
    estados: [{ id: 'q3', x: 70, y: 40, inicial: true, final: true }],
    aristas: [],
  },
  'base-b': {
    ancho: 200, alto: 80,
    estados: [
      { id: 'q4', x: 70, y: 40, inicial: true },
      { id: 'q5', x: 170, y: 40, final: true },
    ],
    aristas: [{ de: 'q4', a: 'q5', s: 'b' }],
  },

  // ───────── Esquemas de las operaciones ─────────
  'esq-union': {
    ancho: 370, alto: 230,
    estados: [
      { id: 'q0', x: 50, y: 115, inicial: true },
      { id: 'q01', x: 165, y: 60 },
      { id: 'qi1', x: 305, y: 60, final: true },
      { id: 'q02', x: 165, y: 170 },
      { id: 'qj2', x: 305, y: 170, final: true },
    ],
    aristas: [
      { de: 'q0', a: 'q01', s: 'ε' },
      { de: 'q0', a: 'q02', s: 'ε' },
    ],
    cajas: [
      { x: 125, y: 12, w: 230, h: 96, label: 'M1' },
      { x: 125, y: 122, w: 230, h: 96, label: 'M2' },
    ],
    textos: [{ x: 235, y: 60, t: '⋯' }, { x: 235, y: 170, t: '⋯' }],
  },
  'esq-estrella': {
    ancho: 370, alto: 200,
    estados: [
      { id: 'q0', x: 50, y: 80, inicial: true, final: true },
      { id: 'q01', x: 165, y: 80 },
      { id: 'qi1', x: 305, y: 80, final: true },
    ],
    aristas: [
      { de: 'q0', a: 'q01', s: 'ε' },
      { de: 'qi1', a: 'q0', s: 'ε', curva: -80 },
    ],
    cajas: [{ x: 125, y: 25, w: 230, h: 100, label: 'M1' }],
    textos: [{ x: 235, y: 80, t: '⋯' }],
  },
  'esq-concat': {
    ancho: 560, alto: 130,
    estados: [
      { id: 'q01', x: 80, y: 70, inicial: true },
      { id: 'qi1', x: 220, y: 70 },
      { id: 'q02', x: 345, y: 70 },
      { id: 'qj2', x: 485, y: 70, final: true },
    ],
    aristas: [{ de: 'qi1', a: 'q02', s: 'ε' }],
    cajas: [
      { x: 20, y: 15, w: 240, h: 100, label: 'M1' },
      { x: 305, y: 15, w: 240, h: 100, label: 'M2' },
    ],
    textos: [{ x: 150, y: 70, t: '⋯' }, { x: 415, y: 70, t: '⋯' }],
  },

  // ───────── (i) Construcción paso a paso ─────────
  'union-a-eps': {
    ancho: 330, alto: 210,
    estados: [
      { id: 'q0', x: 50, y: 105, inicial: true },
      { id: 'q1', x: 160, y: 45 },
      { id: 'q2', x: 280, y: 45, final: true },
      { id: 'q3', x: 160, y: 165, final: true },
    ],
    aristas: [
      { de: 'q0', a: 'q1', s: 'ε' },
      { de: 'q0', a: 'q3', s: 'ε' },
      { de: 'q1', a: 'q2', s: 'a' },
    ],
  },
  'estrella-b': {
    ancho: 330, alto: 140,
    estados: [
      { id: 'q6', x: 60, y: 50, inicial: true, final: true },
      { id: 'q4', x: 170, y: 50 },
      { id: 'q5', x: 280, y: 50, final: true },
    ],
    aristas: [
      { de: 'q6', a: 'q4', s: 'ε' },
      { de: 'q4', a: 'q5', s: 'b' },
      { de: 'q5', a: 'q6', s: 'ε', curva: -45 },
    ],
  },
  'afnd-i': {
    ancho: 650, alto: 245,
    estados: [
      { id: 'q0', x: 55, y: 120, inicial: true },
      { id: 'q1', x: 160, y: 50 },
      { id: 'q2', x: 280, y: 50 },
      { id: 'q3', x: 220, y: 195 },
      { id: 'q6', x: 390, y: 120, final: true },
      { id: 'q4', x: 500, y: 120 },
      { id: 'q5', x: 610, y: 120, final: true },
    ],
    aristas: [
      { de: 'q0', a: 'q1', s: 'ε' },
      { de: 'q0', a: 'q3', s: 'ε' },
      { de: 'q1', a: 'q2', s: 'a' },
      { de: 'q2', a: 'q6', s: 'ε' },
      { de: 'q3', a: 'q6', s: 'ε' },
      { de: 'q6', a: 'q4', s: 'ε' },
      { de: 'q4', a: 'q5', s: 'b' },
      { de: 'q5', a: 'q6', s: 'ε', curva: -48 },
    ],
  },
  'afd-i': {
    ancho: 470, alto: 300,
    estados: [
      { id: 'P0', x: 60, y: 130, inicial: true, final: true },
      { id: 'P1', x: 220, y: 50, final: true },
      { id: 'P2', x: 220, y: 210, final: true },
      { id: 'V', label: '∅', x: 380, y: 130 },
    ],
    aristas: [
      { de: 'P0', a: 'P1', s: 'a' },
      { de: 'P0', a: 'P2', s: 'b' },
      { de: 'P1', a: 'P2', s: 'b' },
      { de: 'P2', a: 'P2', s: 'b', bucle: 'abajo' },
      { de: 'P1', a: 'V', s: 'a' },
      { de: 'P2', a: 'V', s: 'a' },
      { de: 'V', a: 'V', s: 'a, b', bucle: 'der' },
    ],
  },

  // ───────── (ii) Gramática → AFND-ε → AFD ─────────
  'afnd-ii': {
    ancho: 520, alto: 260,
    estados: [
      { id: 'S', label: '[S]', x: 60, y: 130, inicial: true, r: 26 },
      { id: 'aB', label: '[aB]', x: 190, y: 50, r: 26 },
      { id: 'B', label: '[B]', x: 320, y: 130, r: 26 },
      { id: 'bB', label: '[bB]', x: 460, y: 50, r: 26 },
      { id: 'e', label: '[ε]', x: 460, y: 210, final: true, r: 26 },
    ],
    aristas: [
      { de: 'S', a: 'aB', s: 'ε' },
      { de: 'S', a: 'B', s: 'ε' },
      { de: 'aB', a: 'B', s: 'a' },
      { de: 'B', a: 'bB', s: 'ε', curva: 16 },
      { de: 'bB', a: 'B', s: 'b', curva: 16 },
      { de: 'B', a: 'e', s: 'ε' },
    ],
  },
  'afd-ii': {
    ancho: 470, alto: 170,
    estados: [
      { id: 'P0', x: 60, y: 110, inicial: true, final: true },
      { id: 'P1', x: 230, y: 110, final: true },
      { id: 'V', label: '∅', x: 400, y: 110 },
    ],
    aristas: [
      { de: 'P0', a: 'P1', s: 'a, b' },
      { de: 'P1', a: 'P1', s: 'b', bucle: 'arriba' },
      { de: 'P1', a: 'V', s: 'a' },
      { de: 'V', a: 'V', s: 'a, b', bucle: 'arriba' },
    ],
  },
}
