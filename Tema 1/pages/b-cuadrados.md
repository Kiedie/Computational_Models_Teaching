---
layout: section
---

# b) $\{\, a^{n^2} \mid n \ge 0 \,\}$

Cuadrados perfectos escritos con una sola letra

---

# ¿Qué palabras hay en el lenguaje?

Las palabras de $a$'s cuya longitud es un **cuadrado perfecto**: $0, 1, 4, 9, 16, 25, \dots$

<div class="flex justify-center items-end gap-14 mt-8">
  <div class="cuadro"><span class="opacity-60">ε</span><div class="cuadro-n">n = 0</div></div>
  <div class="cuadro"><Cadena s="a" /><div class="cuadro-n">n = 1</div></div>
  <div class="cuadro"><Cadena s="a a" /><Cadena s="a a" /><div class="cuadro-n">n = 2</div></div>
  <div class="cuadro"><Cadena s="a a a" /><Cadena s="a a a" /><Cadena s="a a a" /><div class="cuadro-n">n = 3</div></div>
  <div class="cuadro"><Cadena s="a a a a" /><Cadena s="a a a a" /><Cadena s="a a a a" /><Cadena s="a a a a" /><div class="cuadro-n">n = 4</div></div>
</div>

<div v-click class="mt-8">

$a^{n^2}$ son **$n$ bloques de $n$ aes**. Esa es la clave de la gramática.

</div>


---

# La idea

$$
n^2 \;=\; \underbrace{n + n + \cdots + n}_{n \text{ veces}}
$$

Ponemos $n$ símbolos $X$ (cuántas **vueltas** quedan) y $n$ símbolos $Y$ (lo que se cuenta en **cada vuelta**). Un cursor recorre las $Y$ una vez por cada $X$ y deja **una $a$ por cada $Y$**.

<div class="flex flex-col gap-4 mt-6 ml-4 fases-anchas">

<div class="fase">
  <span class="fase-n">1</span>
  <span class="fase-t">Elegir <i>n</i> (aquí 3)</span>
  <Cadena s="I X X X H Y Y Y E" />
</div>

<div v-click class="fase">
  <span class="fase-n">2</span>
  <span class="fase-t">Gastar una X y dar una vuelta</span>
  <Cadena s="I X X H a Y a Y a Y Q E" />
</div>

<div v-click class="fase">
  <span class="fase-n">3</span>
  <span class="fase-t">Volver y repetir por cada X</span>
  <Cadena s="I H R a a a Y a a a Y a a a Y E" />
</div>

<div v-click class="fase">
  <span class="fase-n">4</span>
  <span class="fase-t">Limpiar</span>
  <Cadena s="a a a a a a a a a" />
</div>

</div>

---

# Símbolos auxiliares

<div class="tabla-compacta">

| símbolo | significado |
|:-:|---|
| <Cadena s="I" /> <Cadena s="E" /> | **bordes**: inicio y fin de la palabra |
| <Cadena s="T" /> | **generador** de pares $X/Y$; al terminar se convierte en $H$ |
| <Cadena s="X" /> | "queda una **vuelta** por dar" (hay $n$) |
| <Cadena s="H" /> | **separador** entre las $X$ y la zona de trabajo |
| <Cadena s="Y" /> | "en cada vuelta, escribe una $a$ aquí" (hay $n$) |
| <Cadena s="Q" /> | cursor que va hacia la **derecha** escribiendo $a$'s |
| <Cadena s="R" /> | cursor que **vuelve** hacia la izquierda hasta $H$ |
| <Cadena s="F" /> | **limpieza** final: borra $Y$ y $E$ |

</div>

---

# Paso 1 · Elegir $n$

$$
S \;\to\; ITE \;\mid\; \varepsilon \qquad\qquad T \;\to\; XTY \;\mid\; XHY
$$

<v-clicks>

- Cada vez que aplicamos $T \to XTY$ añadimos **una $X$ y una $Y$ a la vez**: siempre hay tantas $X$ como $Y$.
- $T \to XHY$ pone el último par y **convierte $T$ en el separador $H$**.
- Obtenemos $I\,X^n H\, Y^n E$ con $n \ge 1$. El caso $n = 0$ lo da $S \to \varepsilon$.

</v-clicks>

<div v-click class="ejemplo">
  <span class="opacity-70">Para <i>n</i> = 3:</span>
  <Cadena s="S" /> ⇒ <Cadena s="I T E" /> ⇒ <Cadena s="I X T Y E" :hl="[1, 2, 3]" />
</div>
<div v-after class="ejemplo mt-2">
  ⇒ <Cadena s="I X X T Y Y E" :hl="[2, 3, 4]" /> ⇒ <Cadena s="I X X X H Y Y Y E" :hl="[3, 4, 5]" />
</div>

<div v-click class="callout mt-6">
💡 Como <i>T</i> desaparece al convertirse en <i>H</i>, una vez elegido <i>n</i> <b>ya no se pueden añadir más</b> <i>X</i> ni <i>Y</i> durante las vueltas.
</div>

---

# Paso 2 · Una vuelta hacia la derecha

$$
XH \to HQ \qquad\qquad QY \to aYQ \qquad\qquad Qa \to aQ
$$

<v-clicks>

- $XH \to HQ$: **gastamos una $X$** y lanzamos el cursor $Q$.
- $QY \to aYQ$: cada vez que $Q$ cruza una $Y$, **deja una $a$**.
- $Qa \to aQ$: las $a$ de vueltas anteriores las salta sin escribir nada.

</v-clicks>

<div v-click class="ejemplo">
  <Cadena s="I X X H Y Y E" /> ⇒ <Cadena s="I X H Q Y Y E" :hl="[2, 3]" /> ⇒ <Cadena s="I X H a Y Q Y E" :hl="[3, 4, 5]" />
</div>
<div v-after class="ejemplo mt-2">
  ⇒ <Cadena s="I X H a Y a Y Q E" :hl="[5, 6, 7]" />
  <span class="opacity-70 text-sm ml-2">una <i>a</i> por cada <i>Y</i></span>
</div>

---

# Paso 3 · Volver y empezar otra vuelta

$$
QE \to RE \qquad\quad YR \to RY \qquad aR \to Ra \qquad\quad XHR \to HQ
$$

<v-clicks>

- $QE \to RE$: al llegar al final, $Q$ se convierte en $R$ y **da media vuelta**.
- $R$ cruza $Y$'s y $a$'s hacia la izquierda sin tocarlas.
- $XHR \to HQ$: cuando $R$ llega a $H$, **se gasta otra $X$** y sale un nuevo $Q$.

</v-clicks>

<div v-click class="ejemplo">
  <Cadena s="I X H a Y a Y Q E" /> ⇒ <Cadena s="I X H a Y a Y R E" :hl="[7]" />
</div>
<div v-after class="ejemplo mt-2">
  ⇒* <Cadena s="I X H R a Y a Y E" :hl="[3]" /> ⇒ <Cadena s="I H Q a Y a Y E" :hl="[1, 2]" />
</div>

---

# Paso 4 · Limpieza

$$
IHR \to F \qquad\qquad FY \to F \qquad Fa \to aF \qquad\qquad FE \to \varepsilon
$$

<v-clicks>

- $IHR \to F$ sólo es posible si $I$ y $H$ están **juntos**, es decir, si **no quedan $X$**: ya se han dado las $n$ vueltas.
- $F$ avanza hacia la derecha: **borra** las $Y$ y deja pasar las $a$.
- Al llegar al final, $FE \to \varepsilon$ elimina el último símbolo auxiliar.

</v-clicks>

<div v-click class="ejemplo">
  <Cadena s="I H R a a Y a a Y E" /> ⇒ <Cadena s="F a a Y a a Y E" :hl="[0]" /> ⇒* <Cadena s="a a a a" />
</div>

---

# La gramática

<div class="grid grid-cols-4 gap-4 mt-6 reglas">

<div class="regla-grupo">
<div class="regla-tit">① elegir n</div>

$S \to ITE$<br>
$S \to \varepsilon$<br>
$T \to XTY$<br>
$T \to XHY$
</div>

<div class="regla-grupo">
<div class="regla-tit">② vuelta →</div>

$XH \to HQ$<br>
$QY \to aYQ$<br>
$Qa \to aQ$
</div>

<div class="regla-grupo">
<div class="regla-tit">③ volver ←</div>

$QE \to RE$<br>
$YR \to RY$<br>
$aR \to Ra$<br>
$XHR \to HQ$
</div>

<div class="regla-grupo">
<div class="regla-tit">④ limpiar</div>

$IHR \to F$<br>
$FY \to F$<br>
$Fa \to aF$<br>
$FE \to \varepsilon$
</div>

</div>

<div class="mt-6 opacity-80">

$G = (V, \{a\}, P, S)$ con $V = \{S, T, I, E, X, H, Y, Q, R, F\}$.

</div>

<div v-click class="callout mt-4">

**Tipo 0**: $FY \to F$ y $FE \to \varepsilon$ acortan la palabra (no cumplen $|\alpha| \le |\beta|$).

</div>

---
clicks: 23
---

# Derivación completa: $n = 2$

<Derivacion size="md" split="1fr 1.1fr" :steps="[
  { s: 'S' },
  { s: 'I T E', r: 'S → ITE' },
  { s: 'I X T Y E', r: 'T → XTY' },
  { s: 'I X X H Y Y E', r: 'T → XHY', note: 'Elegimos n = 2: dos X y dos Y. T desaparece.' },
  { s: 'I X H Q Y Y E', r: 'XH → HQ', note: 'Gastamos una X: empieza la 1ª vuelta.' },
  { s: 'I X H a Y Q Y E', r: 'QY → aYQ', note: 'Por cada Y que cruza, Q deja una a.' },
  { s: 'I X H a Y a Y Q E', r: 'QY → aYQ' },
  { s: 'I X H a Y a Y R E', r: 'QE → RE', note: 'Q llega al final: se convierte en R y vuelve.' },
  { s: 'I X H a Y a R Y E', r: 'YR → RY' },
  { s: 'I X H a Y R a Y E', r: 'aR → Ra' },
  { s: 'I X H a R Y a Y E', r: 'YR → RY' },
  { s: 'I X H R a Y a Y E', r: 'aR → Ra', note: 'R ha vuelto hasta H.' },
  { s: 'I H Q a Y a Y E', r: 'XHR → HQ', note: 'Gastamos la otra X: empieza la 2ª vuelta.' },
  { s: 'I H a Q Y a Y E', r: 'Qa → aQ', note: 'Q salta las a sin escribir.' },
  { s: 'I H a a Y Q a Y E', r: 'QY → aYQ' },
  { s: 'I H a a Y a Q Y E', r: 'Qa → aQ' },
  { s: 'I H a a Y a a Y Q E', r: 'QY → aYQ', note: 'Cada Y tiene ya dos a delante.' },
  { s: 'I H a a Y a a Y R E', r: 'QE → RE' },
  { s: 'I H R a a Y a a Y E', r: 'YR → RY, aR → Ra', many: true, note: 'R vuelve hasta H (6 pasos).' },
  { s: 'F a a Y a a Y E', r: 'IHR → F', note: 'I y H juntos: no quedan X. Empieza la limpieza.' },
  { s: 'a a F Y a a Y E', r: 'Fa → aF', many: true },
  { s: 'a a F a a Y E', r: 'FY → F', note: 'F borra las Y.' },
  { s: 'a a a a F E', r: 'Fa → aF, FY → F', many: true },
  { s: 'a a a a', r: 'FE → ε', note: 'aaaa = a<sup>2²</sup> ✅' },
]" />

---

# ¿Y los demás caminos "malos"?

Cualquier mala elección acaba **bloqueada** (o es imposible):

<v-clicks>

- **Añadir pares $X/Y$ a mitad**: imposible, $T$ ya se ha convertido en $H$ antes de la primera vuelta.
- **Lanzar un segundo cursor** ($XH \to HQ$ mientras otro $Q$ o $R$ está en marcha): los dos cursores acaban juntos <Cadena s="Q R" size="sm" /> y no hay regla para cruzarlos.
- **Usar $XH \to HQ$ cuando vuelve $R$** (en vez de $XHR \to HQ$): queda <Cadena s="H Q R" size="sm" />, igual de atascado.
- **Limpiar antes de tiempo**: $IHR \to F$ exige que $I$ y $H$ estén juntos, así que **no puede quedar ninguna $X$**.
- **Terminar a medias**: la única regla que borra $E$ es $FE \to \varepsilon$, y $F$ sólo existe al final.

</v-clicks>

<div v-click class="callout mt-6">

Por tanto, cada palabra terminal sale de exactamente $n$ vueltas completas sobre $n$ símbolos $Y$: $\;L(G) = \{a^{n^2} \mid n \ge 0\}$.

</div>

---
layout: center
class: text-center
---


<div class="grid grid-cols-2 gap-8 mt-8 text-left">

<div class="patron">

### a) $ww$ · **copiar**

Marcadores que viajan.<br>
El cursor pasa **una sola vez**.

</div>

<div class="patron">

### b) $a^{n^2}$ · **contar**

Un contador de vueltas ($X$).<br>
El cursor va y vuelve **$n$ veces**.

</div>

</div>

<div class="mt-10 opacity-80">

Siguiente: $\{a^p \mid p \text{ primo}\}$.

</div>
