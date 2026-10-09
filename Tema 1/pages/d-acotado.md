---
layout: section
---

# d) $\{\, a^n b^m \mid n \le m^2 \,\}$

El ejercicio b) con un poco de libertad

---

# ¿Qué palabras hay en el lenguaje?

Primero las $a$, luego las $b$, y como mucho $m^2$ aes si hay $m$ bes.

<div class="grid grid-cols-2 gap-10 mt-6">
<div>

### Pertenecen ✅

| palabra | $n$ | $m$ | $m^2$ |
|:-:|:-:|:-:|:-:|
| $\varepsilon$ | 0 | 0 | 0 |
| $b$ | 0 | 1 | 1 |
| $ab$ | 1 | 1 | 1 |
| $aaabb$ | 3 | 2 | 4 |
| $a^9 b^3$ | 9 | 3 | 9 |

</div>
<div>

### No pertenecen ❌

| palabra | motivo |
|:-:|---|
| $a$ | $1 > 0^2$ |
| $aab$ | $2 > 1^2$ |
| $aaaaabb$ | $5 > 2^2$ |
| $ba$ | orden incorrecto |

</div>
</div>

---

# ¿Por qué no es libre de contexto?

Bombeo con $z = a^{N^2} b^N$, $\;z = uvwxy$, $\;|vwx| \le N$, $\;|vx| \ge 1$:

<v-clicks>

- **$vx$ sólo tiene $a$'s**: con $i = 2$ hay más de $N^2$ aes y sólo $N$ bes. ❌
- **$vx$ sólo tiene $b$'s**: con $i = 0$ quedan $N^2$ aes y menos de $N$ bes. ❌
- **$v$ o $x$ mezclan letras**: con $i = 2$ aparece una $b$ antes que una $a$. ❌
- **$v = a^s$, $x = b^t$** con $s, t \ge 1$: con $i = 0$ queda $a^{N^2 - s} b^{N - t}$, y
  $(N - t)^2 \le N^2 - (2N - 1) < N^2 - s\;$ porque $s \le N - 1$. ❌

</v-clicks>

<div v-click class="callout mt-6">

En todos los casos sale una palabra fuera del lenguaje, así que **no es libre de contexto**.

</div>

---

# La idea: un cuadrado que no hace falta llenar

En el b) cada vuelta escribía **una $a$ por cada $Y$**: en total $m \cdot m$ aes. Ahora:

<div class="flex flex-col gap-4 mt-6 ml-4 fases-anchas">

<div class="fase">
  <span class="fase-n">1</span>
  <span class="fase-t">Elegir <i>m</i> (como en b)</span>
  <Cadena s="I X X X H B B B E" />
</div>

<div v-click class="fase">
  <span class="fase-n">2</span>
  <span class="fase-t">Vueltas: cada cruce <b>puede</b> escribir</span>
  <Cadena s="I H R a a B a B a a a B E" />
</div>

<div v-click class="fase">
  <span class="fase-n">3</span>
  <span class="fase-t">Ordenar: las <i>a</i> a la izquierda</span>
  <Cadena s="a a a a a a B B B E" />
</div>

<div v-click class="fase">
  <span class="fase-n">4</span>
  <span class="fase-t">Cada <i>B</i> se convierte en <i>b</i></span>
  <Cadena s="a a a a a a b b b" />
</div>

</div>

<div v-click class="callout mt-6">
Las <i>Y</i> del b) pasan a llamarse <i>B</i> ("futura <i>b</i>"): cuentan durante las vueltas y al final <b>son</b> las <i>m</i> bes de la palabra.
</div>

---

# Símbolos auxiliares

<div class="tabla-compacta">

| símbolo | significado |
|:-:|---|
| <Cadena s="I" /> <Cadena s="E" /> | **bordes**: inicio y fin de la palabra |
| <Cadena s="T" /> | **generador** de pares $X/B$; al terminar se convierte en $H$ |
| <Cadena s="X" /> | "queda una **vuelta** por dar" (hay $m$) |
| <Cadena s="H" /> | **separador** entre las $X$ y la zona de trabajo |
| <Cadena s="B" /> | **futura $b$**: en cada vuelta, aquí se **puede** escribir una $a$ (hay $m$) |
| <Cadena s="Q" /> | cursor que va hacia la **derecha** escribiendo (o no) $a$'s |
| <Cadena s="R" /> | cursor que **vuelve** hacia la izquierda hasta $H$ |

</div>

<div v-click class="callout mt-4">
Todo es igual que en el b) salvo la letra <i>B</i> en lugar de <i>Y</i>. La limpieza con <i>F</i> desaparece: ahora las <i>B</i> no se borran.
</div>

---

# Paso 1 · Elegir $m$

$$
S \;\to\; ITE \;\mid\; \varepsilon \qquad\qquad T \;\to\; XTB \;\mid\; XHB
$$

<v-clicks>

- Exactamente como en el b): $T$ pone pares $X/B$ y desaparece al convertirse en $H$.
- Obtenemos $I\,X^m H\, B^m E$ con $m \ge 1$.
- $S \to \varepsilon$ da el caso $m = 0$: la única palabra con $n \le 0$ es $\varepsilon$.

</v-clicks>

<div v-click class="ejemplo">
  <span class="opacity-70">Para <i>m</i> = 2:</span>
  <Cadena s="S" /> ⇒ <Cadena s="I T E" /> ⇒ <Cadena s="I X T B E" :hl="[1, 2, 3]" /> ⇒ <Cadena s="I X X H B B E" :hl="[2, 3, 4]" />
</div>

---

# Paso 2 · Las vueltas, con libertad

<div class="grid grid-cols-2 gap-6 mt-4">

<div class="regla-grupo">
<div class="regla-tit">vuelta →</div>

$XH \to HQ$<br>
$QB \to aBQ$<br>
<span class="marca-nueva">$QB \to BQ$</span> <span class="text-sm text-emerald-700 font-bold">¡nueva!</span><br>
$Qa \to aQ$
</div>

<div class="regla-grupo">
<div class="regla-tit">volver ←</div>

$QE \to RE$<br>
$BR \to RB$<br>
$aR \to Ra$<br>
$XHR \to HQ$
</div>

</div>

<div class="mt-4">
<v-clicks>

- Son las reglas del b) cambiando $Y$ por $B$.
- **Una sola regla nueva**: al cruzar una $B$, $Q$ puede escribir una $a$ ($QB \to aBQ$) **o no** ($QB \to BQ$).

</v-clicks>
</div>

<div v-click class="ejemplo mt-4">
  <Cadena s="I H Q a B a B E" /> ⇒ <Cadena s="I H a Q B a B E" :hl="[2, 3]" />
</div>
<div v-after class="ejemplo mt-2">
  ⇒ <Cadena s="I H a B Q a B E" :hl="[3, 4]" />
  <span class="opacity-70 text-sm ml-2">esta vez no escribe</span>
</div>
<div v-after class="ejemplo mt-2">
  ⇒ <Cadena s="I H a B a Q B E" :hl="[4, 5]" /> ⇒ <Cadena s="I H a B a a B Q E" :hl="[5, 6, 7]" />
  <span class="opacity-70 text-sm ml-2">y ésta sí</span>
</div>

---

# ¿Qué valores de $n$ salen?

Cada **cruce** de $Q$ con una $B$ es una casilla de un cuadrado $m \times m$: $Q$ decide si la **rellena** con una $a$.

<div class="flex justify-center items-center gap-16 mt-6">

<div class="cuadricula">
  <span></span><span class="cu-t">B₁</span><span class="cu-t">B₂</span><span class="cu-t">B₃</span>
  <span class="cu-t">vuelta 1</span><Cadena s="a" /><Cadena s="a" /><span class="cu-vacia"></span>
  <span class="cu-t">vuelta 2</span><span class="cu-vacia"></span><Cadena s="a" /><span class="cu-vacia"></span>
  <span class="cu-t">vuelta 3</span><Cadena s="a" /><span class="cu-vacia"></span><Cadena s="a" />
</div>

<div class="text-xl">

$m = 3$, $\;n = 5$

$\Rightarrow\; a^5 b^3$

</div>

</div>

<div class="mt-6">
<v-clicks>

- Hay $m \cdot m$ cruces y **como mucho una $a$ por cruce**: $\;n \le m^2$.
- Rellenando las casillas que queramos sale **cualquier** $n$ entre $0$ y $m^2$.
- El b) es el caso en que se rellenan **todas**.

</v-clicks>
</div>

---

# Paso 3 · Terminar y ordenar

$$
IHR \to \varepsilon \qquad\qquad Ba \to aB \qquad\qquad BE \to bE \qquad Bb \to bb \qquad\qquad bE \to b
$$

<v-clicks>

- $IHR \to \varepsilon$: igual que en el b), sólo si **no quedan $X$**. Ya no hace falta $F$, porque las $B$ se quedan.
- $Ba \to aB$: las $a$ pasan a la **izquierda** de las $B$.
- Una $B$ sólo se convierte en $b$ si a su derecha hay $E$ o una $b$: las $b$ **nacen por la derecha**.
- $bE \to b$ borra el borde final.

</v-clicks>

<div v-click class="ejemplo">
  <Cadena s="I H R a B a a B E" /> ⇒ <Cadena s="a B a a B E" /> ⇒ <Cadena s="a a B a B E" :hl="[1, 2]" />
</div>
<div v-after class="ejemplo mt-2">
  ⇒ <Cadena s="a a a B B E" :hl="[2, 3]" /> ⇒ <Cadena s="a a a B b E" :hl="[4]" /> ⇒ <Cadena s="a a a b b E" :hl="[3]" />
</div>
<div v-after class="ejemplo mt-2">
  ⇒ <Cadena s="a a a b b" />
  <span class="opacity-70 text-sm ml-2">3 ≤ 2² ✅</span>
</div>

---

# La gramática

<div class="grid grid-cols-5 gap-3 mt-6 reglas reglas-c">

<div class="regla-grupo">
<div class="regla-tit">① elegir m</div>

$S \to ITE$<br>
$S \to \varepsilon$<br>
$T \to XTB$<br>
$T \to XHB$
</div>

<div class="regla-grupo regla-nueva">
<div class="regla-tit">② vuelta →</div>

$XH \to HQ$<br>
$QB \to aBQ$<br>
$QB \to BQ$<br>
$Qa \to aQ$
</div>

<div class="regla-grupo">
<div class="regla-tit">③ volver ←</div>

$QE \to RE$<br>
$BR \to RB$<br>
$aR \to Ra$<br>
$XHR \to HQ$
</div>

<div class="regla-grupo">
<div class="regla-tit">④ terminar</div>

$IHR \to \varepsilon$
</div>

<div class="regla-grupo regla-nueva">
<div class="regla-tit">⑤ ordenar</div>

$Ba \to aB$<br>
$BE \to bE$<br>
$Bb \to bb$<br>
$bE \to b$
</div>

</div>

<div class="mt-5 opacity-80">

$G = (V, \{a, b\}, P, S)$ con $V = \{S, T, I, E, X, H, B, Q, R\}$. En verde, lo que cambia respecto al b).

</div>

<div v-click class="callout mt-4">

**Tipo 0**: $IHR \to \varepsilon$ y $bE \to b$ acortan la palabra (no cumplen $|\alpha| \le |\beta|$).

</div>

---
clicks: 21
---

# Derivación completa: $aaabb$ ($n = 3$, $m = 2$)

<Derivacion size="md" split="1fr 1.1fr" :steps="[
  { s: 'S' },
  { s: 'I T E', r: 'S → ITE' },
  { s: 'I X T B E', r: 'T → XTB' },
  { s: 'I X X H B B E', r: 'T → XHB', note: 'm = 2: dos X y dos B.' },
  { s: 'I X H Q B B E', r: 'XH → HQ', note: 'Gastamos una X: 1ª vuelta.' },
  { s: 'I X H a B Q B E', r: 'QB → aBQ', note: 'Q decide escribir.' },
  { s: 'I X H a B a B Q E', r: 'QB → aBQ', note: 'Y otra vez.' },
  { s: 'I X H a B a B R E', r: 'QE → RE' },
  { s: 'I X H R a B a B E', r: 'BR → RB, aR → Ra', many: true, note: 'R vuelve hasta H.' },
  { s: 'I H Q a B a B E', r: 'XHR → HQ', note: 'Gastamos la otra X: 2ª vuelta.' },
  { s: 'I H a Q B a B E', r: 'Qa → aQ' },
  { s: 'I H a B Q a B E', r: 'QB → BQ', note: 'Ahora decide <b>no</b> escribir.' },
  { s: 'I H a B a Q B E', r: 'Qa → aQ' },
  { s: 'I H a B a a B Q E', r: 'QB → aBQ', note: 'Sí escribe: ya van 3 aes.' },
  { s: 'I H a B a a B R E', r: 'QE → RE' },
  { s: 'I H R a B a a B E', r: 'BR → RB, aR → Ra', many: true },
  { s: 'a B a a B E', r: 'IHR → ε', note: 'No quedan X: se acabaron las vueltas.' },
  { s: 'a a B a B E', r: 'Ba → aB', note: 'Las a pasan a la izquierda de las B.' },
  { s: 'a a a B B E', r: 'Ba → aB' },
  { s: 'a a a B b E', r: 'BE → bE', note: 'La B de la derecha se convierte en b…' },
  { s: 'a a a b b E', r: 'Bb → bb', note: '…y después la siguiente.' },
  { s: 'a a a b b', r: 'bE → b', note: 'aaabb: 3 ≤ 2² ✅' },
]" />

---

# ¿Por qué sólo genera palabras del lenguaje?

<v-clicks>

- **Las $b$**: $T$ fija $m$ al principio; cada $B$ acaba siendo una $b$ y no se crean ni se borran $B$. Hay **exactamente $m$ bes**.
- **Las $a$**: cada vuelta gasta una $X$ y $Q$ cruza cada $B$ una vez. Son $m \cdot m$ cruces con **como mucho una $a$** cada uno: $n \le m^2$.
- **El orden**: a la derecha de una $b$ sólo puede haber bes o $E$, y las $a$ nunca van hacia la derecha. Queda $a \dots a\, b \dots b$.
- **$Ba \to aB$ antes de tiempo** no estropea nada: cambia dónde están las $a$, pero no cuántas hay ni cuántas veces cruza $Q$ cada $B$.
- **Una $B \to b$ antes de tiempo** bloquea: el siguiente $Q$ choca con la $b$ y no hay regla para $Qb$. Lo mismo si $E$ desaparece antes de que $Q$ llegue a ella.

</v-clicks>

<div v-click class="callout mt-5">

Por tanto, $\;L(G) = \{a^n b^m \mid n \le m^2\}$.

</div>

---
layout: center
class: text-center
---

# Resumen: cuatro ideas

<div class="grid grid-cols-4 gap-4 mt-8 text-left">

<div class="patron">

### a) **copiar**

Marcadores que viajan y un cursor que pasa **una vez**.

</div>

<div class="patron">

### b) **multiplicar**

Un contador de vueltas: el cursor va y vuelve **$n$ veces**.

</div>

<div class="patron">

### c) **dividir**

Una regla que crece y se mide **para cada $d$**.

</div>

<div class="patron">

### d) **acotar**

El b) dejando que cada cruce escriba **o no**, y **ordenando** al final.

</div>

</div>

<div class="callout mt-10 text-left">
En todas: <b>generar</b> → <b>calcular moviendo cursores</b> → <b>limpiar</b>, y cualquier camino equivocado se queda <b>bloqueado</b>.
</div>
