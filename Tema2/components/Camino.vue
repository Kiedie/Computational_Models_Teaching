<script setup lang="ts">
// Camino de transiciones nulas: s="q0 q3 q6" → q₀ →ε q₃ →ε q₆
import { computed } from 'vue'

const props = defineProps<{ s: string }>()
const pasos = computed(() => props.s.trim().split(/\s+/))
</script>

<template>
  <span class="camino"><template v-for="(e, k) in pasos" :key="k"><span
    v-if="k" class="flecha"
  >→<sup>ε</sup></span><Est :s="e" /></template></span>
</template>

<style scoped>
.camino {
  white-space: nowrap;
}
.flecha {
  margin: 0 0.25em;
  color: #64748b;
}
.flecha sup {
  font-family: KaTeX_Math, serif;
  font-style: italic;
  font-size: 0.7em;
}
</style>
