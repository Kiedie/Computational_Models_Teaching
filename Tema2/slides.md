---
theme: default
title: De expresión regular a AFD
info: |
  Modelos de Computación · Relación de problemas 2 · Ejercicio 10.
  (a+ε)b* → AFND-ε → AFD, por dos caminos.
colorSchema: light
transition: slide-left
mdc: true
drawings:
  persist: false
layout: cover
class: text-center
---

# De expresión regular a AFD

Modelos de Computación · Relación 2 · Ejercicio 10

<div class="opacity-70 mt-4">

$(a+\varepsilon)\,b^*$ resuelto por dos caminos

</div>

---

# El enunciado

<div class="callout">

**10.** Dada la expresión regular $(a+\varepsilon)\,b^*$ encontrar un AFND asociado y, a partir de éste, calcular un AFD que acepte el lenguaje.

</div>

<div class="mt-8 flex flex-col gap-4">

<div class="camino-ruta">
  <span class="ruta-letra">(i)</span>
  <span class="ruta-paso destacado">expresión regular</span><span class="ruta-flecha">→</span>
  <span class="ruta-paso">AFND-ε</span><span class="ruta-flecha">→</span>
  <span class="ruta-paso">AFD</span>
</div>

<div v-click class="camino-ruta">
  <span class="ruta-letra">(ii)</span>
  <span class="ruta-paso destacado">expresión regular</span><span class="ruta-flecha">→</span>
  <span class="ruta-paso">gramática lineal por la derecha</span><span class="ruta-flecha">→</span>
  <span class="ruta-paso">AFND-ε</span><span class="ruta-flecha">→</span>
  <span class="ruta-paso">AFD</span>
</div>

</div>

<div v-click class="mt-8">

En los dos casos, el último paso es el mismo: **AFND-ε → AFD usando clausuras**.

</div>

---

# ¿Qué lenguaje es?

$(a+\varepsilon)\,b^*$: **una $a$ opcional** seguida de **cualquier número de $b$**.

<div class="grid grid-cols-2 gap-10 mt-6">
<div>

### ✅ Pertenecen

| palabra | cómo se forma |
|---|---|
| $\varepsilon$ | sin $a$, cero $b$ |
| $a$ | $a$, cero $b$ |
| $bbb$ | sin $a$, tres $b$ |
| $abb$ | $a$, dos $b$ |

</div>
<div v-click>

### ❌ No pertenecen

| palabra | motivo |
|---|---|
| $aa$ | como mucho una $a$ |
| $ba$ | la $a$ tiene que ir al principio |
| $aba$ | ídem |

</div>
</div>

<div v-click class="mt-6 nota">

Lo usaremos al final para comprobar que el AFD obtenido es correcto.

</div>

---
src: ./pages/i-thompson.md
---

---
src: ./pages/ii-gramatica.md
---

---
layout: center
class: text-center
---

# Fin

<div class="opacity-70">

Los dos caminos llevan a AFD que aceptan $(a+\varepsilon)\,b^*$.

</div>
