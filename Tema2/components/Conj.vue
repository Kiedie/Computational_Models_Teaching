<script setup lang="ts">
// Conjunto de estados: s="q0 q1 q3" → {q₀, q₁, q₃}; s="" → ∅.
// "nuevo" marca en color los estados que se acaban de añadir.
import { computed } from 'vue'

const props = withDefaults(defineProps<{ s: string, nuevo?: string }>(), { nuevo: '' })
const elems = computed(() => props.s.trim() ? props.s.trim().split(/\s+/) : [])
const nuevos = computed(() => props.nuevo.trim().split(/\s+/))
</script>

<template>
  <span class="conj">
    <template v-if="elems.length">{<template v-for="(e, k) in elems" :key="e"><Est
      :s="e" :class="{ nuevo: nuevos.includes(e) }"
    /><span v-if="k < elems.length - 1">,&thinsp;</span></template>}</template>
    <template v-else>∅</template>
  </span>
</template>

<style scoped>
.conj {
  font-family: KaTeX_Main, 'Times New Roman', serif;
  white-space: nowrap;
}
.nuevo {
  color: #b45309;
  font-weight: 700;
}
</style>
