---
theme: default
title: Gramáticas para lenguajes no libres de contexto
info: |
  Modelos de Computación · Relación de problemas 1 bis.
  Ejercicios extremadamente difíciles.
colorSchema: light
transition: slide-left
mdc: true
drawings:
  persist: false
layout: cover
class: text-center
---

# Gramáticas para lenguajes<br>no libres de contexto

Modelos de Computación · Relación 1 bis

<div class="opacity-70 mt-4">Ejercicios <em>extremadamente difíciles</em></div>

---

# Ejercicios

Ninguno de estos lenguajes es libre de contexto, así que necesitaremos **gramáticas de tipo 0 / 1**.

<div class="grid grid-cols-2 gap-6 mt-8">

<div class="ej-card">
<div class="ej-letter">a)</div>

$\{\, ww \mid w \in \{0,1\}^* \,\}$
</div>

<div class="ej-card">
<div class="ej-letter">b)</div>

$\{\, a^{n^2} \mid n \ge 0 \,\}$
</div>

<div class="ej-card">
<div class="ej-letter">c)</div>

$\{\, a^{p} \mid p \text{ primo} \,\}$
</div>

<div class="ej-card">
<div class="ej-letter">d)</div>

$\{\, a^n b^m \mid n \le m^2 \,\}$
</div>

</div>

---

# Antes de empezar: Pensar en qué necesitamos

<v-clicks>

- **Marcadores**: variables que "recuerdan" algo pendiente de hacer.
  <span class="opacity-70">p. ej. $A$ = "aquí falta copiar un 0"</span>
- **Desplazamientos**: una variable se mueve intercambiándose con su vecina.
  <span class="opacity-70">$A0 \to 0A$ hace que $A$ avance hacia la derecha</span>
- **Cursores**: una variable que recorre la cadena y va transformando lo que encuentra.
- **Bordes**: variables que marcan el principio o el final para saber cuándo parar.
- **Limpieza**: al final hay que hacer desaparecer todas las variables auxiliares.

</v-clicks>

<div v-click class="callout mt-6">
💡 La gramática no "elige bien" el orden de aplicación: hay que diseñarla para que <b>cualquier camino equivocado se quede bloqueado</b> (con variables que ya no se pueden eliminar).
</div>

---
src: ./pages/a-ww.md
---

---
src: ./pages/b-cuadrados.md
---

---
#<src: ./pages/c-primos.md>
---

---
src: ./pages/d-acotado.md
---
