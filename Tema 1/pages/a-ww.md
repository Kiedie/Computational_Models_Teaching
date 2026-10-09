---
layout: section
---

# a) $\{\, ww \mid w \in \{0,1\}^* \,\}$

Una cadena repetida dos veces

---

# ¿Qué palabras hay en el lenguaje?

Palabras de la forma $w\,w$: la primera mitad es **idéntica** a la segunda.

<div class="grid grid-cols-2 gap-10 mt-8">
<div>

### ✅ Pertenecen

| palabra | $w$ |
|---|---|
| $\varepsilon$ | $\varepsilon$ |
| $00$ | $0$ |
| $0101$ | $01$ |
| $110\,110$ | $110$ |

</div>
<div v-click>

### ❌ No pertenecen

| palabra | motivo |
|---|---|
| $010$ | longitud impar |
| $0011$ | $00 \ne 11$ |
| $01\,10$ | es $ww^{-1}$ |

</div>
</div>

---

# La idea

Escribimos $w$ y por cada símbolo dejamos una **nota** de lo que hay que copiar. Las notas viajan al final y allí se transforman.

<div class="flex flex-col gap-5 mt-8 ml-4">

<div class="fase">
  <span class="fase-n">1</span>
  <span class="fase-t">Generar <i>w</i> dejando marcadores</span>
  <Cadena s="0 A 1 B 0 A C" />
</div>

<div v-click class="fase">
  <span class="fase-n">2</span>
  <span class="fase-t">Los marcadores van a la derecha</span>
  <Cadena s="0 1 0 A B A C" />
</div>

<div v-click class="fase">
  <span class="fase-n">3</span>
  <span class="fase-t">El cursor <b>C</b> los recorre hacia la izquierda</span>
  <Cadena s="0 1 0 C A' B' A'" />
</div>

<div v-click class="fase">
  <span class="fase-n">4</span>
  <span class="fase-t"><b>D</b> convierte los marcadores en la copia</span>
  <Cadena s="0 1 0 0 1 0" />
</div>

</div>

<div v-click class="mt-6 opacity-80 text-sm">

Ejemplo con $w = 010$. Los terminales de $w$ nunca se mueven: sólo se mueven las variables.

</div>

---

# Símbolos auxiliares

| símbolo | significado |
|:-:|---|
| <Cadena s="S" /> | símbolo inicial: va generando $w$ |
| <Cadena s="A" /> | "tengo pendiente copiar un **0**" |
| <Cadena s="B" /> | "tengo pendiente copiar un **1**" |
| <Cadena s="C" /> | marca el final de $w$ y luego recorre los marcadores hacia la izquierda |
| <Cadena s="A' B'" /> | marcador ya **visitado** por $C$: listo para escribirse |
| <Cadena s="D" /> | convierte $A'\!\to 0$ y $B'\!\to 1$ de izquierda a derecha |

---

# Paso 1 · Generar $w$ y guardar una copia

$$
S \;\to\; 0AS \;\mid\; 1BS \;\mid\; C \;\mid\; \varepsilon
$$

<v-clicks>

- Cada vez que escribimos un terminal, dejamos **su marcador justo detrás**.
- Cuando decidimos que $w$ ha terminado, ponemos $C$ (marca de fin).
- $S \to \varepsilon$ sólo sirve para la palabra vacía ($w = \varepsilon$).

</v-clicks>

<div v-click class="ejemplo">
  <span class="opacity-70">Para <i>w</i> = 01:</span>
  <Cadena s="S" /> ⇒ <Cadena s="0 A S" /> ⇒ <Cadena s="0 A 1 B S" /> ⇒ <Cadena s="0 A 1 B C" />
</div>

<div v-click class="callout mt-6">
Ya tenemos <b>la primera copia</b> (los terminales) y <b>la segunda codificada</b> (los marcadores, en el mismo orden). Pero están mezcladas.
</div>

---

# Paso 2 · Los marcadores van hacia la derecha

$$
A0 \to 0A \qquad A1 \to 1A \qquad\qquad B0 \to 0B \qquad B1 \to 1B
$$

<v-clicks>

- Un marcador puede **saltar un terminal** hacia la derecha.
- **No hay** reglas $AB \to BA$ ni $BA \to AB$: los marcadores **nunca se adelantan entre sí**.
  → conservan el orden de $w$.
- Los terminales no cambian de orden: siguen formando $w$.

</v-clicks>

<div v-click class="ejemplo">
  <Cadena s="0 A 1 B C" /> ⇒ <Cadena s="0 1 A B C" :hl="[1, 2]" />
  <span class="opacity-70 text-sm ml-2">(regla <code>A1 → 1A</code>)</span>
</div>

<div v-click class="opacity-80 mt-4">
Objetivo: dejar <Cadena s="0 1" size="sm" /> &nbsp;terminales a la izquierda y &nbsp;<Cadena s="A B" size="sm" /> &nbsp;marcadores pegados a <Cadena s="C" size="sm" />.
</div>

---

# Paso 3 · El cursor $C$ recorre los marcadores

$$
AC \to CA' \qquad\qquad BC \to CB'
$$

<v-clicks>

- $C$ avanza hacia la **izquierda** cruzando marcadores.
- Al cruzarlos los marca con $'$ ("ya visitado"): así **no pueden volver a moverse** (no hay reglas para $A'$ salvo la de escribir).
- $C$ **sólo** sabe cruzar marcadores, nunca terminales.

</v-clicks>

<div v-click class="ejemplo">
  <Cadena s="0 1 A B C" /> ⇒ <Cadena s="0 1 A C B'" :hl="[3, 4]" /> ⇒ <Cadena s="0 1 C A' B'" :hl="[2, 3]" />
</div>

---

# Paso 4 · Escribir la segunda copia

$$
0C \to 0D \qquad 1C \to 1D \qquad\quad DA' \to 0D \qquad DB' \to 1D \qquad\quad D \to \varepsilon
$$

<v-clicks>

- Cuando $C$ choca con un terminal ya ha cruzado todos los marcadores: se transforma en el escritor $D$.
- $D$ avanza hacia la **derecha** y convierte cada marcador visitado en su terminal.
- Al final $D$ desaparece.

</v-clicks>

<div v-click class="ejemplo">
  <Cadena s="0 1 C A' B'" /> ⇒ <Cadena s="0 1 D A' B'" :hl="[2]" /> ⇒ <Cadena s="0 1 0 D B'" :hl="[2, 3]" />
</div>
<div v-after class="ejemplo mt-2">
  ⇒ <Cadena s="0 1 0 1 D" :hl="[3, 4]" /> ⇒ <Cadena s="0 1 0 1" />
</div>

---

# La gramática completa

$G = (V, \{0,1\}, P, S)$ con $V = \{S, A, B, A', B', C, D\}$ y $P$:

<div class="grid grid-cols-4 gap-4 mt-6 reglas">

<div class="regla-grupo">
<div class="regla-tit">① generar</div>

$S \to 0AS$<br>
$S \to 1BS$<br>
$S \to C$<br>
$S \to \varepsilon$
</div>

<div class="regla-grupo">
<div class="regla-tit">② marcadores →</div>

$A0 \to 0A$<br>
$A1 \to 1A$<br>
$B0 \to 0B$<br>
$B1 \to 1B$
</div>

<div class="regla-grupo">
<div class="regla-tit">③ cursor ←</div>

$AC \to CA'$<br>
$BC \to CB'$
</div>

<div class="regla-grupo">
<div class="regla-tit">④ escribir →</div>

$0C \to 0D$<br>
$1C \to 1D$<br>
$DA' \to 0D$<br>
$DB' \to 1D$<br>
$D \to \varepsilon$
</div>

</div>

<div v-click class="callout mt-8">

Las reglas se pueden aplicar **en cualquier orden**. Lo que garantiza que sólo salgan palabras $ww$ es que los caminos "malos" se bloquean.

</div>

---
clicks: 10
---

# Derivación completa: $w = 01$

<Derivacion :steps="[
  { s: 'S' },
  { s: '0 A S', r: 'S → 0AS', note: 'Escribimos 0 y dejamos su marcador A.' },
  { s: '0 A 1 B S', r: 'S → 1BS', note: 'Escribimos 1 y dejamos su marcador B.' },
  { s: '0 A 1 B C', r: 'S → C', note: 'w ha terminado: C marca el final.' },
  { s: '0 1 A B C', r: 'A1 → 1A', note: 'A salta el 1. Ya están los marcadores juntos.' },
  { s: '0 1 A C B\'', r: 'BC → CB\'', note: 'C cruza B y lo marca como visitado.' },
  { s: '0 1 C A\' B\'', r: 'AC → CA\'', note: 'C cruza A. Ya no quedan marcadores sin visitar.' },
  { s: '0 1 D A\' B\'', r: '1C → 1D', note: 'C toca un terminal: se convierte en el escritor D.' },
  { s: '0 1 0 D B\'', r: 'DA\' → 0D', note: 'A′ se convierte en 0.' },
  { s: '0 1 0 1 D', r: 'DB\' → 1D', note: 'B′ se convierte en 1.' },
  { s: '0 1 0 1', r: 'D → ε', note: '¡Palabra terminal! 0101 = (01)(01) ✅' },
]" />

---
clicks: 15
---

# Otro ejemplo: $w = 101$

<Derivacion :steps="[
  { s: 'S' },
  { s: '1 B S', r: 'S → 1BS' },
  { s: '1 B 0 A S', r: 'S → 0AS' },
  { s: '1 B 0 A 1 B S', r: 'S → 1BS' },
  { s: '1 B 0 A 1 B C', r: 'S → C', note: 'Primera copia escrita; marcadores B A B mezclados.' },
  { s: '1 0 B A 1 B C', r: 'B0 → 0B' },
  { s: '1 0 B 1 A B C', r: 'A1 → 1A', note: 'B no puede adelantar a A: primero tiene que moverse A.' },
  { s: '1 0 1 B A B C', r: 'B1 → 1B', note: 'Marcadores juntos y en el orden de w: B A B.' },
  { s: '1 0 1 B A C B\'', r: 'BC → CB\'' },
  { s: '1 0 1 B C A\' B\'', r: 'AC → CA\'' },
  { s: '1 0 1 C B\' A\' B\'', r: 'BC → CB\'' },
  { s: '1 0 1 D B\' A\' B\'', r: '1C → 1D' },
  { s: '1 0 1 1 D A\' B\'', r: 'DB\' → 1D' },
  { s: '1 0 1 1 0 D B\'', r: 'DA\' → 0D' },
  { s: '1 0 1 1 0 1 D', r: 'DB\' → 1D' },
  { s: '1 0 1 1 0 1', r: 'D → ε', note: '101101 = (101)(101) ✅' },
]" />

---
clicks: 9
---

# ¿Y si $C$ se adelanta? Un camino que se bloquea

<Derivacion :steps="[
  { s: 'S' },
  { s: '0 A S', r: 'S → 0AS' },
  { s: '0 A 1 B S', r: 'S → 1BS' },
  { s: '0 A 1 B C', r: 'S → C' },
  { s: '0 A 1 C B\'', r: 'BC → CB\'', note: 'C cruza B… pero A todavía no ha llegado.' },
  { s: '0 A 1 D B\'', r: '1C → 1D', note: 'Mala elección: C toca el 1 y se convierte en D antes de visitar A.' },
  { s: '0 A 1 1 D', r: 'DB\' → 1D' },
  { s: '0 A 1 1', r: 'D → ε' },
  { s: '0 1 A 1', r: 'A1 → 1A' },
  { s: '0 1 1 A', r: 'A1 → 1A', note: '❌ Bloqueado: no hay ninguna regla que elimine A. Si pudiéramos borrarla saldría 011 ∉ L.' },
]" />

---

# ¿Por qué sólo genera palabras $ww$?

<v-clicks>

1. Los terminales que escribe $S$ forman $w$ y **ninguna regla los reordena**.
2. Los marcadores **nunca se adelantan entre sí** → siempre aparecen en el orden de $w$.
3. La **única** forma de eliminar un $A$ o $B$ es que $C$ lo cruce ($AC \to CA'$).
4. $C$ sólo cruza marcadores; cuando toca un terminal pasa a ser $D$ y **ya no puede volver**.
   → si quedaba algún marcador a su izquierda, se queda **bloqueado para siempre**.
5. Por tanto, en una derivación que termina, justo antes de crear $D$ la forma es $\;w\,C\,$($w$ codificada), p. ej. <Cadena s="0 1 C A' B'" size="sm" />
6. $D$ escribe los marcadores de izquierda a derecha → resultado $w\,w$. ✅

</v-clicks>

<div v-click class="callout mt-4">

Y al revés: para cualquier $w$ hay derivación (mover todos los marcadores primero, luego $C$, luego $D$). Así que $L(G) = \{ww\}$.

</div>

---
layout: center
class: text-center
---

# Resumen del patrón

<div class="flex justify-center items-center gap-3 mt-8 text-lg">
  <div class="patron">generar<br><span class="text-sm opacity-70">+ dejar notas</span></div>
  →
  <div class="patron">mover<br><span class="text-sm opacity-70">las notas</span></div>
  →
  <div class="patron">recorrer<br><span class="text-sm opacity-70">con un cursor</span></div>
  →
  <div class="patron">escribir<br><span class="text-sm opacity-70">y limpiar</span></div>
</div>

<div class="mt-10 opacity-80">

Este mismo esquema (marcadores que viajan + cursor que va y vuelve) lo usaremos en $\{a^{n^2}\}$.

</div>
