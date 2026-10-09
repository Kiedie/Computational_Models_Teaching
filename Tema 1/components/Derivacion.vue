<script setup lang="ts">
// Derivación animada: cada click avanza un paso.
// Uso en una diapositiva con `clicks: <nº pasos - 1>` en el frontmatter:
//   <Derivacion :steps="[{ s: 'S' }, { s: '0 A S', r: 'S → 0AS' }, ...]" />
// Se resaltan automáticamente los símbolos que cambian respecto al paso anterior.
// `many: true` en un paso indica que agrupa varias aplicaciones de reglas (⇒*).
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'
import Cadena from './Cadena.vue'

interface Step { s: string; r?: string; note?: string; many?: boolean }

const props = withDefaults(defineProps<{
  steps: Step[]
  at?: number
  palette?: Record<string, string>
  maxHistory?: number
  size?: 'md' | 'lg'
  split?: string
}>(), { at: 0, maxHistory: 10, size: 'lg', split: '1.15fr 1fr' })

const { $clicks } = useSlideContext()

const idx = computed(() =>
  Math.min(Math.max($clicks.value - props.at, 0), props.steps.length - 1))

const toks = (s: string) => s.trim() ? s.trim().split(/\s+/) : []
const prime = (r?: string) => r?.replace(/'/g, '′')

function changed(i: number): number[] {
  if (i === 0)
    return []
  const a = toks(props.steps[i - 1].s)
  const b = toks(props.steps[i].s)
  let p = 0
  while (p < a.length && p < b.length && a[p] === b[p]) p++
  let q = 0
  while (q < a.length - p && q < b.length - p && a[a.length - 1 - q] === b[b.length - 1 - q]) q++
  const out: number[] = []
  for (let k = p; k < b.length - q; k++) out.push(k)
  return out
}

const current = computed(() => props.steps[idx.value])
// Sólo se muestran las últimas `maxHistory` formas para que quepa en la diapositiva.
const firstShown = computed(() => Math.max(0, idx.value + 1 - props.maxHistory))
const history = computed(() =>
  props.steps.slice(firstShown.value, idx.value + 1).map((st, k) => ({ ...st, i: firstShown.value + k })))
</script>

<template>
  <div class="deriv" :style="{ gridTemplateColumns: split }">
    <div class="deriv-main">
      <div class="deriv-step">paso {{ idx }} / {{ steps.length - 1 }}</div>
      <Cadena :key="idx" :s="current.s" :hl="changed(idx)" :size="size" :palette="palette" />
      <div class="deriv-rule">
        <template v-if="current.r">{{ current.many ? 'reglas' : 'regla' }} <code>{{ prime(current.r) }}</code></template>
        <template v-else>símbolo inicial</template>
      </div>
      <div v-if="current.note" :key="'n' + idx" class="deriv-note" v-html="current.note" />
    </div>
    <ol class="deriv-hist">
      <li v-if="firstShown > 0" class="more">⋮ {{ firstShown }} {{ firstShown === 1 ? 'paso anterior' : 'pasos anteriores' }}</li>
      <li v-for="h in history" :key="h.i" :class="{ last: h.i === idx }">
        <span class="arrow">{{ h.i === 0 ? '' : h.many ? '⇒*' : '⇒' }}</span>
        <Cadena :s="h.s" size="sm" :palette="palette" />
        <span class="hrule">{{ prime(h.r) }}</span>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.deriv {
  display: grid;
  gap: 2rem;
  align-items: start;
  margin-top: 0.5rem;
}
.deriv-main {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 1rem;
}
.deriv-step {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #64748b;
}
.deriv-rule {
  font-size: 1.1rem;
  color: #334155;
}
.deriv-rule code {
  font-size: 1.15rem;
  padding: 0.1em 0.45em;
  background: #fef9c3;
  border-radius: 0.3em;
}
.deriv-note {
  font-size: 0.95rem;
  color: #475569;
  border-left: 3px solid #facc15;
  padding-left: 0.75rem;
}
.deriv-hist {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.deriv-hist li {
  display: grid;
  grid-template-columns: 1.4em 1fr auto;
  align-items: center;
  gap: 0.4rem;
  margin: 0;
  padding: 0.1rem 0.35rem;
  border-radius: 0.3rem;
  opacity: 0.55;
}
.deriv-hist li.last {
  opacity: 1;
  background: #fefce8;
}
.deriv-hist li.more {
  display: block;
  font-size: 0.75rem;
  color: #94a3b8;
  padding-left: 2rem;
}
.arrow { color: #64748b; }
.hrule {
  font-family: 'Fira Code', ui-monospace, monospace;
  font-size: 0.72rem;
  color: #64748b;
}
</style>
