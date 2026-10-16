<script setup lang="ts">
// Dibuja una forma sentencial como "fichas".
// Los tokens van separados por espacios: "0 A 1 B' C".
// Terminales = minúsculas o dígitos; el resto son variables (con color).
// Un apóstrofo final (A') se dibuja como marcador "visitado" (borde discontinuo).
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  s: string
  hl?: number[]
  size?: 'sm' | 'md' | 'lg'
  palette?: Record<string, string>
}>(), { hl: () => [], size: 'md' })

const DEFAULT_PALETTE: Record<string, string> = {
  S: '#16a34a',
  // a) ww
  A: '#2563eb',
  B: '#d97706',
  C: '#dc2626',
  D: '#9333ea',
  // b) a^(n²)
  T: '#059669',
  I: '#64748b',
  E: '#64748b',
  H: '#0f172a',
  X: '#2563eb',
  Y: '#d97706',
  Q: '#dc2626',
  R: '#db2777',
  F: '#9333ea',
  // c) a^p, p primo (reutiliza I, E, T, A, Q, R, F)
  M: '#0891b2',
  N: '#65a30d',
  V: '#ea580c',
}

const tokens = computed(() => props.s.trim() ? props.s.trim().split(/\s+/) : [])

function info(t: string) {
  const base = t.replace(/'+$/, '')
  const primes = t.length - base.length
  const terminal = /^[a-z0-9]$/.test(base)
  const color = terminal ? undefined : ({ ...DEFAULT_PALETTE, ...props.palette })[base] ?? '#475569'
  return { label: base + '′'.repeat(primes), primed: primes > 0, terminal, color }
}
</script>

<template>
  <span class="cadena" :class="`cadena-${size}`">
    <span v-if="!tokens.length" class="tok tok-eps">ε</span>
    <span
      v-for="(t, k) in tokens"
      :key="k"
      class="tok"
      :class="{
        'tok-term': info(t).terminal,
        'tok-nt': !info(t).terminal,
        'tok-primed': info(t).primed,
        'tok-hl': hl.includes(k),
      }"
      :style="info(t).color ? { '--c': info(t).color } : {}"
    >{{ info(t).label }}</span>
  </span>
</template>

<style scoped>
.cadena {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.22em;
  vertical-align: middle;
}
.cadena-sm { font-size: 0.85rem; }
.cadena-md { font-size: 1.25rem; }
.cadena-lg { font-size: 2rem; }

.tok {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.55em;
  height: 1.55em;
  padding: 0 0.2em;
  border-radius: 0.28em;
  border: 2px solid transparent;
  font-family: 'Fira Code', ui-monospace, monospace;
  font-weight: 700;
  line-height: 1;
}
.tok-term {
  background: #f8fafc;
  color: #0f172a;
  border-color: #94a3b8;
}
.tok-nt {
  background: var(--c);
  border-color: var(--c);
  color: #fff;
}
.tok-primed {
  background: color-mix(in srgb, var(--c) 12%, white);
  color: var(--c);
  border-style: dashed;
}
.tok-eps {
  color: #64748b;
  font-style: italic;
}
.tok-hl {
  box-shadow: 0 0 0 3px #facc15;
  animation: pop 0.35s ease-out;
}
@keyframes pop {
  0% { transform: scale(0.6); opacity: 0.2; }
  70% { transform: scale(1.12); }
  100% { transform: scale(1); opacity: 1; }
}
</style>
