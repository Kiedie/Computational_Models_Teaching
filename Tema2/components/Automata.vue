<script setup lang="ts">
// Dibuja un autómata de AUTOMATAS (../automatas.ts) como SVG.
//   nombre      clave del autómata
//   hl          estados resaltados (p. ej. los de una clausura)
//   foco        estado del que se parte (borde más grueso)
//   hlEps       resalta también las transiciones ε entre estados resaltados
//   hlAristas   aristas resaltadas, como 'q1>q2'
//   escala      factor de tamaño
import { computed } from 'vue'
import { AUTOMATAS, type Arista, type Estado } from '../automatas'

const props = withDefaults(defineProps<{
  nombre: string
  hl?: string[]
  foco?: string
  hlEps?: boolean
  hlAristas?: string[]
  escala?: number
}>(), { hl: () => [], hlEps: false, hlAristas: () => [], escala: 1 })

const R = 22
const uid = `aut-${Math.random().toString(36).slice(2, 9)}`
const aut = computed(() => AUTOMATAS[props.nombre])
const porId = computed(() => Object.fromEntries(aut.value.estados.map(e => [e.id, e])))

const radio = (e: Estado) => e.r ?? R

// "q01" → q con subíndice 01; "P2" → P con subíndice 2; "M1" → M con subíndice 1
function partes(label: string) {
  const m = /^([qPM])([0-9a-z]+)$/.exec(label)
  if (m) return { base: m[1], sub: m[2], corchetes: false }
  const c = /^[(.*)]$/.exec(label)
  if (c) return { base: c[1], sub: '', corchetes: true }
  return { base: label, sub: '', corchetes: false }
}

function resaltada(a: Arista) {
  if (props.hlAristas.includes(`${a.de}>${a.a}`)) return true
  return props.hlEps && a.s === 'ε' && props.hl.includes(a.de) && props.hl.includes(a.a)
}

function geometria(a: Arista) {
  const p = porId.value[a.de]
  const q = porId.value[a.a]
  const rp = radio(p)
  const rq = radio(q)
  const anchoEtq = a.s.length * 4

  if (a.de === a.a) {
    const ang = { arriba: -90, abajo: 90, der: 0, izq: 180 }[a.bucle ?? 'arriba'] * Math.PI / 180
    const d = (t: number) => ({ x: Math.cos(t), y: Math.sin(t) })
    const abre = 38 * Math.PI / 180
    const D = rp + 44
    const s0 = d(ang - abre), s1 = d(ang + abre)
    const P0 = { x: p.x + s0.x * rp, y: p.y + s0.y * rp }
    const P3 = { x: p.x + s1.x * rp, y: p.y + s1.y * rp }
    const C1 = { x: p.x + s0.x * D, y: p.y + s0.y * D }
    const C2 = { x: p.x + s1.x * D, y: p.y + s1.y * D }
    const cima = (0.25 * rp + 0.75 * D) * Math.cos(abre)
    const dir = d(ang)
    const off = cima + 11 + Math.abs(dir.x) * anchoEtq
    return {
      d: `M ${P0.x} ${P0.y} C ${C1.x} ${C1.y} ${C2.x} ${C2.y} ${P3.x} ${P3.y}`,
      lx: p.x + dir.x * off,
      ly: p.y + dir.y * off,
    }
  }

  const dx = q.x - p.x, dy = q.y - p.y
  const L = Math.hypot(dx, dy)
  const nx = -dy / L, ny = dx / L
  const b = a.curva ?? 0
  const mx = (p.x + q.x) / 2, my = (p.y + q.y) / 2
  const cx = mx + nx * b * 2, cy = my + ny * b * 2
  const hacia = (o: { x: number, y: number }, r: number) => {
    const ux = cx - o.x, uy = cy - o.y, l = Math.hypot(ux, uy)
    return { x: o.x + ux / l * r, y: o.y + uy / l * r }
  }
  const s = hacia(p, rp)
  const e = hacia(q, rq)
  let lado: number
  if (b !== 0) lado = Math.sign(b)
  else lado = a.lado ?? ((ny > 0.001 || (Math.abs(ny) <= 0.001 && nx < 0)) ? -1 : 1)
  const off = 12 + Math.abs(nx) * anchoEtq
  return {
    d: b === 0 ? `M ${s.x} ${s.y} L ${e.x} ${e.y}` : `M ${s.x} ${s.y} Q ${cx} ${cy} ${e.x} ${e.y}`,
    lx: mx + nx * (b + lado * off),
    ly: my + ny * (b + lado * off),
  }
}

const aristas = computed(() => aut.value.aristas.map(a => ({
  a,
  g: geometria(a),
  hl: resaltada(a),
  eps: a.s === 'ε',
})))

function marcador(x: { hl: boolean, eps: boolean }) {
  return `url(#${uid}-${x.hl ? 'hl' : x.eps ? 'eps' : 'n'})`
}
</script>

<template>
  <svg
    class="automata"
    :viewBox="`0 0 ${aut.ancho} ${aut.alto}`"
    :width="aut.ancho * escala"
    :height="aut.alto * escala"
  >
    <defs>
      <marker
        v-for="[k, c] in [['n', '#0f172a'], ['eps', '#64748b'], ['hl', '#d97706']]"
        :id="`${uid}-${k}`" :key="k"
        viewBox="0 0 10 10" refX="9.5" refY="5"
        markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"
      >
        <path d="M0,0 L10,5 L0,10 z" :fill="c" />
      </marker>
    </defs>

    <!-- Cajas de los sub-autómatas (esquemas) -->
    <g v-for="(c, k) in aut.cajas ?? []" :key="`c${k}`">
      <rect :x="c.x" :y="c.y" :width="c.w" :height="c.h" rx="14" class="caja" />
      <text v-if="c.label" :x="c.x + 12" :y="c.y + 20" class="etq-caja">
        {{ partes(c.label).base }}<tspan dy="4" class="sub">{{ partes(c.label).sub }}</tspan>
      </text>
    </g>
    <text v-for="(t, k) in aut.textos ?? []" :key="`t${k}`" :x="t.x" :y="t.y" class="texto">{{ t.t }}</text>

    <!-- Transiciones -->
    <g v-for="(x, k) in aristas" :key="`a${k}`" class="tr" :class="{ eps: x.eps, hl: x.hl }">
      <path :d="x.g.d" class="arista" :marker-end="marcador(x)" />
      <text :x="x.g.lx" :y="x.g.ly" class="etq-arista">{{ x.a.s }}</text>
    </g>

    <!-- Estados -->
    <g
      v-for="e in aut.estados" :key="e.id"
      class="estado"
      :class="{ hl: hl.includes(e.id), foco: foco === e.id }"
    >
      <path
        v-if="e.inicial"
        :d="`M ${e.x - radio(e) - 30} ${e.y} L ${e.x - radio(e)} ${e.y}`"
        class="arista"
        :marker-end="`url(#${uid}-n)`"
      />
      <circle :cx="e.x" :cy="e.y" :r="radio(e)" class="circulo" />
      <circle v-if="e.final" :cx="e.x" :cy="e.y" :r="radio(e) - 4" class="circulo interior" />
      <text :x="e.x" :y="e.y" class="etq-estado">
        <tspan v-if="partes(e.label ?? e.id).corchetes" class="recto">[</tspan>{{ partes(e.label ?? e.id).base }}<tspan
          v-if="partes(e.label ?? e.id).corchetes" class="recto"
        >]</tspan><tspan
          v-if="partes(e.label ?? e.id).sub" dy="5" class="sub"
        >{{ partes(e.label ?? e.id).sub }}</tspan>
      </text>
    </g>
  </svg>
</template>

<style scoped>
.automata {
  display: block;
  overflow: visible;
  font-family: KaTeX_Math, KaTeX_Main, 'Times New Roman', serif;
}
.circulo {
  fill: #fff;
  stroke: #0f172a;
  stroke-width: 1.8;
  transition: fill 0.25s, stroke 0.25s;
}
.circulo.interior { fill: none; }
.estado.hl .circulo:not(.interior) {
  fill: #fef3c7;
  stroke: #d97706;
}
.estado.hl .interior { stroke: #d97706; }
.estado.foco .circulo:not(.interior) {
  stroke-width: 3.5;
}
.etq-estado {
  font-size: 17px;
  font-style: italic;
  text-anchor: middle;
  dominant-baseline: central;
  fill: #0f172a;
}
.recto {
  font-style: normal;
  font-family: KaTeX_Main, 'Times New Roman', serif;
}
.sub {
  font-size: 11.5px;
  font-style: normal;
  font-family: KaTeX_Main, 'Times New Roman', serif;
}
.arista {
  fill: none;
  stroke: #0f172a;
  stroke-width: 1.6;
  transition: stroke 0.25s;
}
.etq-arista {
  font-size: 17px;
  font-style: italic;
  text-anchor: middle;
  dominant-baseline: central;
  fill: #0f172a;
}
.tr.eps .arista { stroke: #64748b; }
.tr.eps .etq-arista { fill: #64748b; }
.tr.hl .arista {
  stroke: #d97706;
  stroke-width: 2.6;
}
.tr.hl .etq-arista {
  fill: #b45309;
  font-weight: 700;
}
.caja {
  fill: #f8fafc;
  stroke: #94a3b8;
  stroke-width: 1.4;
  stroke-dasharray: 6 4;
}
.etq-caja {
  font-size: 16px;
  font-style: italic;
  fill: #475569;
}
.texto {
  font-size: 20px;
  text-anchor: middle;
  dominant-baseline: central;
  fill: #64748b;
}
</style>
