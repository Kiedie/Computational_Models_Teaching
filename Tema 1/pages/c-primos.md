---
layout: section
---

# c) $\{\, a^{p} \mid p \text{ primo} \,\}$

Probar todos los divisores, uno detrás de otro

---

# ¿Qué palabras hay en el lenguaje?

Las palabras de $a$'s cuya longitud es un **número primo**: $2, 3, 5, 7, 11, 13, \dots$

<div class="flex flex-col gap-3 mt-6 ml-4">
  <div class="vista-fila"><span class="vista-t">p = 2</span><Cadena s="a a" /></div>
  <div class="vista-fila"><span class="vista-t">p = 3</span><Cadena s="a a a" /></div>
  <div class="vista-fila"><span class="vista-t">p = 5</span><Cadena s="a a a a a" /></div>
  <div class="vista-fila"><span class="vista-t">p = 7</span><Cadena s="a a a a a a a" /></div>
  <div class="vista-fila"><span class="vista-t">p = 11</span><Cadena s="a a a a a a a a a a a" /></div>
</div>

<div v-click class="callout mt-6">

**¿Por qué no es libre de contexto?** Bombeo con $z = a^p$, $p \ge N$ primo, e $i = p + 1$:
$\;|uv^{p+1}wx^{p+1}y| = p + p\,|vx| = p\,(1 + |vx|)$, que **no es primo** porque $|vx| \ge 1$.

</div>

---

# La idea: medir con una regla

$p$ es primo $\iff$ $p \ge 2$ y **ningún** $d$ con $2 \le d < p$ divide a $p$.

<v-click>

Probamos $d = 2, 3, 4, \dots$ Las **primeras $d$ casillas** hacen de regla y con ella medimos el resto, **tachando las $a$ de $d$ en $d$**:

</v-click>

<div v-click class="flex flex-col gap-4 mt-6 ml-4">
  <div class="medida">
    <span class="vista-t"><i>p</i> = 7, <i>d</i> = 3</span>
    <Cadena s="M M M" /><span class="sep">│</span><Cadena s="a a a" /><Cadena s="a" />
    <span>sobra 1 → 3 <b>no</b> divide a 7 ✅</span>
  </div>
  <div class="medida">
    <span class="vista-t"><i>p</i> = 9, <i>d</i> = 3</span>
    <Cadena s="M M M" /><span class="sep">│</span><Cadena s="a a a" /><Cadena s="a a a" />
    <span>exacto → 3 divide a 9 ❌</span>
  </div>
</div>

<div class="mt-6">
<v-clicks>

- Si **sobra algo**, $d$ no divide a $p$: alargamos la regla una casilla y probamos $d + 1$.
- Si la medida es **exacta**, $p$ no es primo: la derivación tiene que **quedarse bloqueada**.
- Si la regla llega a ocupar **toda la palabra** ($d = p$), ningún divisor ha funcionado: **$p$ es primo**.

</v-clicks>
</div>

---

# Símbolos auxiliares

<div class="tabla-compacta">

| símbolo | significado |
|:-:|---|
| <Cadena s="I" /> <Cadena s="E" /> | **bordes**: inicio y fin de la palabra |
| <Cadena s="T" /> | **generador** de las $a$ (elige $p$) |
| <Cadena s="M" /> <Cadena s="M'" /> | casilla de la **regla**: libre / ya gastada en esta vuelta |
| <Cadena s="A" /> | una $a$ **ya tachada** (medida) |
| <Cadena s="R" /> | cursor hacia la **izquierda**: va a por una casilla libre de la regla |
| <Cadena s="Q" /> | cursor hacia la **derecha**: tacha la primera $a$ sin tachar |
| <Cadena s="V" /> | cursor hacia la **izquierda**: se acabaron las $a$, las desmarca |
| <Cadena s="N" /> | libera la regla ($M' \to M$) y, si toca, la **alarga** |
| <Cadena s="F" /> | **limpieza** final |

</div>

---

# Paso 1 · Elegir $p$ y preparar la regla

$$
S \;\to\; IMTE \qquad\qquad T \;\to\; Ta \;\mid\; N \qquad\qquad Na \;\to\; MR
$$

<v-clicks>

- $T \to Ta$ añade casillas; $T \to N$ fija $p$ (ya no hay $T$, así que **$p$ no puede cambiar**).
- La primera casilla ya es de la regla. $Na \to MR$ convierte la siguiente: **regla de $d = 2$**.
- $R$ queda justo a la derecha de la regla, listo para medir.

</v-clicks>

<div v-click class="ejemplo">
  <span class="opacity-70">Para <i>p</i> = 5:</span>
  <Cadena s="S" /> ⇒ <Cadena s="I M T E" /> ⇒* <Cadena s="I M T a a a a E" :hl="[3, 4, 5, 6]" />
</div>
<div v-after class="ejemplo mt-2">
  ⇒ <Cadena s="I M N a a a a E" :hl="[2]" /> ⇒ <Cadena s="I M M R a a a E" :hl="[2, 3]" />
  <span class="opacity-70 text-sm ml-2">probamos <i>d</i> = 2</span>
</div>

---

# Paso 2 · Medir: gastar una casilla, tachar una $a$

$$
\begin{gathered}
MR \to M'Q \qquad\quad QM' \to M'Q \qquad QA \to AQ \qquad\quad Qaa \to ARa \\
AR \to RA \qquad M'R \to RM'
\end{gathered}
$$

<v-clicks>

- $MR \to M'Q$: $R$ **gasta** la casilla libre de la regla que tiene a su izquierda y se convierte en $Q$.
- $Q$ cruza hacia la derecha lo ya gastado y lo ya tachado, y **tacha la primera $a$** ($a \to A$).
- $Qaa \to ARa$ sólo vale si **queda otra $a$ detrás**; entonces $R$ vuelve a por otra casilla.

</v-clicks>

<div v-click class="ejemplo">
  <Cadena s="I M M R a a a E" /> ⇒ <Cadena s="I M M' Q a a a E" :hl="[2, 3]" />
</div>
<div v-after class="ejemplo mt-2">
  ⇒ <Cadena s="I M M' A R a a E" :hl="[3, 4]" /> ⇒* <Cadena s="I M R M' A a a E" :hl="[2, 3, 4]" />
</div>
<div v-after class="ejemplo mt-2">
  ⇒ <Cadena s="I M' Q M' A a a E" :hl="[1, 2]" />
  <span class="opacity-70 text-sm ml-2">otra casilla gastada</span>
</div>

---

# Paso 3 · Vuelta completa: reiniciar la regla

$$
IR \to IN \qquad\qquad NM' \to MN \qquad\qquad NA \to RA
$$

<v-clicks>

- Si $R$ llega hasta $I$ es que **todas las casillas de la regla están gastadas**: hemos tachado $d$ aes más.
- $N$ recorre la regla **liberándola** ($M' \to M$).
- Al llegar a las $a$ ya tachadas, $N$ vuelve a ser $R$ y empieza otra vuelta.

</v-clicks>

<div v-click class="ejemplo">
  <Cadena s="I R M' M' A A a E" /> ⇒ <Cadena s="I N M' M' A A a E" :hl="[1]" />
</div>
<div v-after class="ejemplo mt-2">
  ⇒* <Cadena s="I M M N A A a E" :hl="[1, 2, 3]" /> ⇒ <Cadena s="I M M R A A a E" :hl="[3]" />
  <span class="opacity-70 text-sm ml-2">con <i>p</i> = 5, <i>d</i> = 2: ya van 2 aes tachadas</span>
</div>

---

# Paso 4 · Se acaban las $a$: ¿sobra algo?

$$
QaE \to AVE \qquad\quad AV \to Va \qquad M'V \to VM' \qquad\quad MV \to MN
$$

<v-clicks>

- $QaE \to AVE$: $Q$ tacha la **última** $a$. Sale $V$, que vuelve hacia la izquierda **desmarcando** ($A \to a$).
- Si $V$ encuentra una casilla **libre** ($MV \to MN$), la última vuelta quedó a medias: **sobra algo**, $d$ no divide a $p$.
  Entonces $N$ libera la regla y $Na \to MR$ la **alarga**: probamos $d + 1$.
- Si la vuelta estaba **completa**, $V$ cruza toda la regla y llega a $I$. **No hay regla para $IV$**: bloqueado.

</v-clicks>

<div v-click class="ejemplo">
  <Cadena s="I M M' A A A V E" /> ⇒* <Cadena s="I M M' V a a a E" :hl="[3, 4, 5, 6]" />
</div>
<div v-after class="ejemplo mt-2">
  ⇒ <Cadena s="I M V M' a a a E" :hl="[2, 3]" /> ⇒ <Cadena s="I M N M' a a a E" :hl="[2]" />
</div>
<div v-after class="ejemplo mt-2">
  ⇒* <Cadena s="I M M M R a a E" :hl="[2, 3, 4]" />
  <span class="opacity-70 text-sm ml-2">5 no es múltiplo de 2: probamos <i>d</i> = 3</span>
</div>

---

# Paso 5 · ¡Primo! Limpieza

$$
RE \to F \qquad\qquad MF \to Fa \qquad\qquad IF \to \varepsilon
$$

<v-clicks>

- $R$ sólo toca a $E$ cuando, al alargar la regla, **no queda ninguna $a$ fuera**: $d = p$.
- Para llegar ahí hemos probado $d = 2, 3, \dots, p - 1$ y **ninguno dividía**: $p$ es primo.
- $F$ recorre la regla convirtiendo cada casilla en una $a$ y desaparece con $I$.

</v-clicks>

<div v-click class="ejemplo">
  <Cadena s="I M M M M M R E" /> ⇒ <Cadena s="I M M M M M F" :hl="[6]" />
</div>
<div v-after class="ejemplo mt-2">
  ⇒* <Cadena s="I F a a a a a" :hl="[1, 2, 3, 4, 5, 6]" /> ⇒ <Cadena s="a a a a a" />
  <span class="opacity-70 text-sm ml-2">5 es primo ✅</span>
</div>

---

# La gramática

<div class="grid grid-cols-5 gap-3 mt-6 reglas reglas-c">

<div class="regla-grupo">
<div class="regla-tit">① elegir p</div>

$S \to IMTE$<br>
$T \to Ta$<br>
$T \to N$<br>
$Na \to MR$
</div>

<div class="regla-grupo">
<div class="regla-tit">② medir</div>

$MR \to M'Q$<br>
$QM' \to M'Q$<br>
$QA \to AQ$<br>
$Qaa \to ARa$<br>
$AR \to RA$<br>
$M'R \to RM'$
</div>

<div class="regla-grupo">
<div class="regla-tit">③ vuelta completa</div>

$IR \to IN$<br>
$NM' \to MN$<br>
$NA \to RA$
</div>

<div class="regla-grupo">
<div class="regla-tit">④ fin de las a</div>

$QaE \to AVE$<br>
$AV \to Va$<br>
$M'V \to VM'$<br>
$MV \to MN$
</div>

<div class="regla-grupo">
<div class="regla-tit">⑤ ¡primo!</div>

$RE \to F$<br>
$MF \to Fa$<br>
$IF \to \varepsilon$
</div>

</div>

<div class="mt-5 opacity-80">

$G = (V, \{a\}, P, S)$ con $V = \{S, T, I, E, M, M', A, Q, R, V, N, F\}$.

</div>

<div v-click class="callout mt-4">

**Tipo 0**: $RE \to F$ e $IF \to \varepsilon$ acortan la palabra (no cumplen $|\alpha| \le |\beta|$).

</div>

---
clicks: 17
---

# Derivación completa: $p = 3$

<Derivacion size="md" split="1fr 1.1fr" :steps="[
  { s: 'S' },
  { s: 'I M T E', r: 'S → IMTE', note: 'La primera casilla ya es de la regla.' },
  { s: 'I M T a E', r: 'T → Ta' },
  { s: 'I M T a a E', r: 'T → Ta', note: 'Tres casillas: p = 3.' },
  { s: 'I M N a a E', r: 'T → N', note: 'T desaparece: p queda fijado.' },
  { s: 'I M M R a E', r: 'Na → MR', note: 'Regla de 2 casillas: probamos d = 2.' },
  { s: 'I M M\' Q a E', r: 'MR → M\'Q', note: 'R gasta una casilla de la regla.' },
  { s: 'I M M\' A V E', r: 'QaE → AVE', note: 'Q tacha la última a: se acabaron.' },
  { s: 'I M M\' V a E', r: 'AV → Va', note: 'V vuelve desmarcando.' },
  { s: 'I M V M\' a E', r: 'M\'V → VM\'' },
  { s: 'I M N M\' a E', r: 'MV → MN', note: 'Queda una casilla libre: sobra algo, 2 no divide a 3.' },
  { s: 'I M M N a E', r: 'NM\' → MN', note: 'N libera la regla…' },
  { s: 'I M M M R E', r: 'Na → MR', note: '…y la alarga: d = 3.' },
  { s: 'I M M M F', r: 'RE → F', note: 'La regla ocupa toda la palabra: ¡3 es primo!' },
  { s: 'I M M F a', r: 'MF → Fa', note: 'F convierte la regla en aes.' },
  { s: 'I M F a a', r: 'MF → Fa' },
  { s: 'I F a a a', r: 'MF → Fa' },
  { s: 'a a a', r: 'IF → ε', note: 'aaa: 3 es primo ✅' },
]" />

---

# Vista de pájaro: $p = 7$

Cada fila es el momento en que empezamos a probar un nuevo divisor $d$:

<div class="flex flex-col gap-2 mt-5 ml-2">

<div class="vista-fila3"><span class="vista-t"><i>d</i> = 2</span><Cadena s="I M M R a a a a a E" /><span class="vista-t">5 = 2 + 2 + 1 → sobra 1</span></div>
<div v-click class="vista-fila3"><span class="vista-t"><i>d</i> = 3</span><Cadena s="I M M M R a a a a E" /><span class="vista-t">4 = 3 + 1 → sobra 1</span></div>
<div v-click class="vista-fila3"><span class="vista-t"><i>d</i> = 4</span><Cadena s="I M M M M R a a a E" /><span class="vista-t">3 → sobra 3</span></div>
<div v-click class="vista-fila3"><span class="vista-t"><i>d</i> = 5</span><Cadena s="I M M M M M R a a E" /><span class="vista-t">2 → sobra 2</span></div>
<div v-click class="vista-fila3"><span class="vista-t"><i>d</i> = 6</span><Cadena s="I M M M M M M R a E" /><span class="vista-t">1 → sobra 1</span></div>
<div v-click class="vista-fila3"><span class="vista-t"><i>d</i> = 7</span><Cadena s="I M M M M M M M R E" /><span class="vista-t">la regla lo ocupa todo → <b>primo</b></span></div>
<div v-click class="vista-fila3"><span class="vista-t">limpieza</span><Cadena s="a a a a a a a" /><span class="vista-t">✅</span></div>

</div>

<div v-click class="callout mt-5">

**Invariante**: al empezar a probar $d$ la forma es $\;I\,M^d\,R\,a^{p-d}\,E\;$ y ningún $d'$ con $2 \le d' < d$ divide a $p$.

</div>

---
clicks: 12
---

# Un camino que se bloquea: $p = 4$

<Derivacion size="md" split="1fr 1.1fr" :steps="[
  { s: 'S' },
  { s: 'I M T E', r: 'S → IMTE' },
  { s: 'I M T a a a E', r: 'T → Ta', many: true, note: 'Elegimos p = 4.' },
  { s: 'I M N a a a E', r: 'T → N' },
  { s: 'I M M R a a E', r: 'Na → MR', note: 'Probamos d = 2 sobre las 2 aes que quedan.' },
  { s: 'I M M\' Q a a E', r: 'MR → M\'Q', note: 'Primera casilla gastada.' },
  { s: 'I M M\' A R a E', r: 'Qaa → ARa', note: 'Tacha una a; queda otra detrás.' },
  { s: 'I M R M\' A a E', r: 'AR → RA, M\'R → RM\'', many: true, note: 'R vuelve a por otra casilla.' },
  { s: 'I M\' Q M\' A a E', r: 'MR → M\'Q', note: 'Segunda casilla: la regla queda gastada entera.' },
  { s: 'I M\' M\' A Q a E', r: 'QM\' → M\'Q, QA → AQ', many: true },
  { s: 'I M\' M\' A A V E', r: 'QaE → AVE', note: 'La última a cae justo con la última casilla: medida exacta.' },
  { s: 'I M\' M\' V a a E', r: 'AV → Va', many: true },
  { s: 'I V M\' M\' a a E', r: 'M\'V → VM\'', many: true, note: 'V llega a I sin encontrar casilla libre: 2 divide a 4. No hay regla para IV ❌' },
]" />

---

# ¿Por qué sólo genera primos?

<v-clicks>

- En cada momento hay **un único cursor** ($T$, $N$, $R$, $Q$, $V$ o $F$) y todas las reglas lo usan: una vez elegido $p$, la derivación es **determinista**. La única alternativa ($MR \to M'Q$ en vez de $RE \to F$) deja a $Q$ junto a $E$, sin salida.
- $Q$ sólo puede tachar si hay una $a$; $Qaa$ y $QaE$ distinguen si era **la última**.
- Medida exacta ⇒ $V$ llega a $I$ ⇒ **bloqueado** ($p$ no es primo).
- Con $p = 1$: $IMNE$ y $N$ no encuentra ninguna $a$ ⇒ **bloqueado**.
- $F$ sólo aparece con $RE \to F$, es decir, cuando $d = p$ tras haber descartado todos los divisores.

</v-clicks>

<div v-click class="callout mt-6">

Por tanto, $\;L(G) = \{a^p \mid p \text{ primo}\}$.

</div>

---
layout: center
class: text-center
---

# Comparando los tres ejercicios

<div class="grid grid-cols-3 gap-6 mt-8 text-left">

<div class="patron">

### a) $ww$ · **copiar**

Marcadores que viajan.<br>
Un cursor pasa **una vez**.

</div>

<div class="patron">

### b) $a^{n^2}$ · **multiplicar**

Contador de vueltas.<br>
El cursor va y vuelve **$n$ veces**.

</div>

<div class="patron">

### c) $a^p$ · **dividir**

Una regla que crece.<br>
Se mide **para cada $d$**.

</div>

</div>

<div class="mt-10 opacity-80">

Siguiente: $\{a^n b^m \mid n \le m^2\}$.

</div>
