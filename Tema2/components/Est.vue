<script setup lang="ts">
// Nombre de un estado con subíndice: "q0" → q₀, "P1" → P₁.
// Los estados de la gramática, "[aB]", llevan los corchetes rectos.
import { computed } from 'vue'

const props = defineProps<{ s: string }>()
const p = computed(() => {
  const m = /^([qP])([0-9]+)$/.exec(props.s)
  if (m) return { base: m[1], sub: m[2], corchetes: false }
  const c = /^\[(.*)\]$/.exec(props.s)
  if (c) return { base: c[1], sub: '', corchetes: true }
  return { base: props.s, sub: '', corchetes: false }
})
</script>

<template>
  <span class="est"><span v-if="p.corchetes" class="recto">[</span>{{ p.base }}<sub v-if="p.sub">{{ p.sub }}</sub><span v-if="p.corchetes" class="recto">]</span></span>
</template>

<style scoped>
.est {
  font-family: KaTeX_Math, KaTeX_Main, 'Times New Roman', serif;
  font-style: italic;
  white-space: nowrap;
}
sub, .recto {
  font-family: KaTeX_Main, 'Times New Roman', serif;
  font-style: normal;
}
sub { font-size: 0.7em; }
</style>
