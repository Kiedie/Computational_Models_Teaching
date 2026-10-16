---
layout: section
---

# (i) Expresión regular → AFND-ε → AFD

Construcción recursiva del autómata y paso a determinista con clausuras

---

# La idea: construir el autómata "por piezas"

La construcción es **recursiva**: hay un autómata para cada expresión básica y una regla para cada operación.

<div class="grid grid-cols-2 gap-8 mt-6">
<div>

Descomponemos la expresión:

$$
(a+\varepsilon)\,b^* \;=\; \underbrace{(a+\varepsilon)}_{\text{unión}}\;\cdot\;\underbrace{b^*}_{\text{clausura}}
$$

</div>
<div>

<v-clicks>

1. Autómatas **base**: $a$, $\;\varepsilon$, $\;b$
2. **Unión**: $a+\varepsilon$
3. **Clausura** (estrella): $b^*$
4. **Concatenación**: $(a+\varepsilon)\,b^*$

</v-clicks>

</div>
</div>

<div v-click class="callout mt-8">

Para que todo funcione, sus estados tienen que ser **disjuntos**. Por eso numeramos los estados sin repetir: $q_1,q_2$ para $a$; $q_3$ para $\varepsilon$; $q_4,q_5$ para $b$; y $q_0$, $q_6$ para los estados nuevos de la unión y la clausura.

</div>

---

# Paso 1 · Autómatas base


<div v-click class="mt-8">


<div class="grid grid-cols-3 gap-4 mt-2">
<div class="diagrama"><Automata nombre="base-a" /><div class="diagrama-t">para a</div></div>
<div class="diagrama"><Automata nombre="base-eps" /><div class="diagrama-t">para ε</div></div>
<div class="diagrama"><Automata nombre="base-b" /><div class="diagrama-t">para b</div></div>
</div>

</div>

<div v-click class="nota mt-4">

El de $\varepsilon$ es un único estado inicial **y final**: acepta $\varepsilon$ sin leer nada.

</div>

---

# Paso 2 · Unión: $a + \varepsilon$

<div class="grid grid-cols-2 gap-8">
<div>

<div class="diagrama"><Automata nombre="esq-union" :escala="0.9" /><div class="diagrama-t">Esquema general: r₁ + r₂</div></div>

<div class="caja-def mt-3 text-sm">

- Nuevo estado inicial $q_0$
- $\delta(q_0,\varepsilon) = \{q_{01},\, q_{02}\}$
- $F = F_1 \cup F_2$

</div>

</div>
<div v-click>

<div class="diagrama"><Automata nombre="union-a-eps" /><div class="diagrama-t">Autómata para a + ε</div></div>

<div class="mt-4 text-sm">

- $q_0$ lo metes nuevo
- Finales: $q_2$ (de $a$) y $q_3$ (de $\varepsilon$).
- Acepta exactamente $\{a,\ \varepsilon\}$.

</div>

</div>
</div>

---

# Paso 3 · Clausura: $b^*$

<div class="grid grid-cols-2 gap-8">
<div>

<div class="diagrama"><Automata nombre="esq-estrella" :escala="0.9" /><div class="diagrama-t">Esquema general: r₁*</div></div>

<div class="caja-def mt-3 text-sm">

- Nuevo estado $q_0$, inicial **y final** (acepta $\varepsilon$)
- $\delta(q_0,\varepsilon) = \{q_{01}\}$
- De cada final de $M_1$, transición $\varepsilon$ a $q_0$ (para repetir)
- $F = F_1 \cup \{q_0\}$

</div>

</div>
<div v-click>

<div class="diagrama mt-6"><Automata nombre="estrella-b" /><div class="diagrama-t">Autómata para b*</div></div>

<div class="mt-6 text-sm">

- El estado nuevo es $q_6$: inicial y final.
- $q_5 \xrightarrow{\varepsilon} q_6$ permite leer otra $b$.
- Finales: $q_5$ y $q_6$.

</div>

</div>
</div>

---

# Paso 4 · Concatenación: $(a+\varepsilon)\,b^*$

<div class="diagrama"><Automata nombre="esq-concat" :escala="0.85" /><div class="diagrama-t">Esquema general: r₁ r₂ — de cada final de M₁, ε al inicial de M₂; los finales de M₁ dejan de serlo</div></div>

<div v-click class="mt-4">

Unimos los finales de $a+\varepsilon$ ($q_2$ y $q_3$) con el inicial de $b^*$ ($q_6$). Inicial: $q_0$. Finales: los de $b^*$, $F=\{q_5,q_6\}$.

<div class="diagrama mt-1"><Automata nombre="afnd-i" :escala="0.72" /></div>

</div>

---

# El AFND-ε obtenido

<div class="grid grid-cols-[1.4fr_1fr] gap-6 items-center">
<div>

<Automata nombre="afnd-i" :escala="0.78" />

<div class="mt-4 text-sm">

$M = (Q, \{a,b\}, \delta, q_0, F)$ con $Q=\{q_0,\dots,q_6\}$ y $F=\{q_5,q_6\}$.

</div>

</div>
<div>

<table class="tabla">
<thead><tr><th>δ</th><th class="c">a</th><th class="c">b</th><th class="c">ε</th></tr></thead>
<tbody>
<tr><td>→ <Est s="q0" /></td><td class="c gris">∅</td><td class="c gris">∅</td><td class="c"><Conj s="q1 q3" /></td></tr>
<tr><td><Est s="q1" /></td><td class="c"><Conj s="q2" /></td><td class="c gris">∅</td><td class="c gris">∅</td></tr>
<tr><td><Est s="q2" /></td><td class="c gris">∅</td><td class="c gris">∅</td><td class="c"><Conj s="q6" /></td></tr>
<tr><td><Est s="q3" /></td><td class="c gris">∅</td><td class="c gris">∅</td><td class="c"><Conj s="q6" /></td></tr>
<tr><td><Est s="q4" /></td><td class="c gris">∅</td><td class="c"><Conj s="q5" /></td><td class="c gris">∅</td></tr>
<tr class="fin"><td>* <Est s="q5" /></td><td class="c gris">∅</td><td class="c gris">∅</td><td class="c"><Conj s="q6" /></td></tr>
<tr class="fin"><td>* <Est s="q6" /></td><td class="c gris">∅</td><td class="c gris">∅</td><td class="c"><Conj s="q4" /></td></tr>
</tbody>
</table>

<div class="nota mt-2">→ inicial · * final</div>

</div>
</div>

---

# Clausura

Dado un AFND con transiciones nulas $M = (Q, A, \delta, q_0, F)$:

<div class="caja-def mt-4">
<div class="caja-tit">Clausura de un estado</div>

$$
\mathrm{Cl}(q) = \{\, p \;:\; \exists\, p_1,\dots,p_n,\ \ p_1 = q,\ \ p_n = p,\ \ p_i \in \delta(p_{i-1},\varepsilon)\ \ (i=2,\dots,n) \,\}
$$

Todos los estados a los que se llega desde $q$ **usando sólo transiciones nulas** (incluido el propio $q$, con $n=1$).

</div>

<div v-click class="caja-def mt-4">
<div class="caja-tit">Clausura de un conjunto de estados</div>

$$
\mathrm{Cl}(P) = \bigcup_{q \in P} \mathrm{Cl}(q)
$$

La clausura de un conjunto es **la unión de las clausuras de sus estados**: un estado es alcanzable con ε desde $P$ si y sólo si lo es desde alguno de los estados de $P$.

</div>

<div v-click class="nota mt-3">

En particular $\mathrm{Cl}(\emptyset) = \emptyset$ y $P \subseteq \mathrm{Cl}(P)$.

</div>

---

# Del AFND-ε al AFD

Los estados del AFD son **conjuntos de estados** del AFND-ε: todos los sitios donde podría estar el no determinista.

<div class="caja-def mt-4">
<div class="caja-tit">Construcción</div>

Dado $M = (Q, A, \delta, q_0, F)$, el AFD $M' = (Q', A, \delta', q_0', F')$ es:

$$
Q' = \mathcal{P}(Q) \qquad
q_0' = \mathrm{Cl}(q_0) \qquad
\delta'(P,a) = \mathrm{Cl}\Big(\bigcup_{q\in P} \delta(q,a)\Big) \qquad
F' = \{\,P : P\cap F \neq \emptyset\,\}
$$

</div>

<div v-click class="mt-5 text-[0.95rem]">

**En la práctica** sólo construimos los conjuntos alcanzables:

<div class="grid grid-cols-2 gap-x-8 mt-3">
<div class="paso"><span class="paso-n">1</span><div>

Empezamos con $q_0' = \mathrm{Cl}(q_0)$.

</div></div>
<div class="paso"><span class="paso-n">2</span><div>

Para cada estado nuevo $P$ y cada símbolo $a$: miramos a dónde van **con $a$** los estados de $P$, juntamos todo y le hacemos la **clausura**.

</div></div>
<div class="paso"><span class="paso-n">3</span><div>

Si sale un conjunto que no teníamos, es un estado nuevo. Repetimos hasta que no aparezcan más.

</div></div>
<div class="paso"><span class="paso-n">4</span><div>

Son finales los conjuntos que contienen algún final de $M$.

</div></div>
</div>

</div>

---

# Clausura de cada estado

<div class="diagrama">
<Automata
  nombre="afnd-i" :escala="0.66" hl-eps
  :hl="[[], ['q0','q1','q3','q4','q6'], ['q1'], ['q2','q4','q6'], ['q3','q4','q6'], ['q4'], ['q4','q5','q6'], ['q4','q6']][$clicks] ?? []"
  :foco="['', 'q0', 'q1', 'q2', 'q3', 'q4', 'q5', 'q6'][$clicks]"
/>
</div>

<table class="tabla mx-auto mt-2 text-sm">
<thead><tr><th>q</th><th>Cl(q)</th><th>por qué (caminos con ε)</th></tr></thead>
<tbody>
<tr v-click><td><Est s="q0" /></td><td><Conj s="q0 q1 q3 q4 q6" /></td><td><Camino s="q0 q1" />;&ensp;<Camino s="q0 q3 q6 q4" /></td></tr>
<tr v-click><td><Est s="q1" /></td><td><Conj s="q1" /></td><td class="gris">no tiene transiciones ε</td></tr>
<tr v-click><td><Est s="q2" /></td><td><Conj s="q2 q4 q6" /></td><td><Camino s="q2 q6 q4" /></td></tr>
<tr v-click><td><Est s="q3" /></td><td><Conj s="q3 q4 q6" /></td><td><Camino s="q3 q6 q4" /></td></tr>
<tr v-click><td><Est s="q4" /></td><td><Conj s="q4" /></td><td class="gris">no tiene transiciones ε</td></tr>
<tr v-click><td><Est s="q5" /></td><td><Conj s="q4 q5 q6" /></td><td><Camino s="q5 q6 q4" /></td></tr>
<tr v-click><td><Est s="q6" /></td><td><Conj s="q4 q6" /></td><td><Camino s="q6 q4" /></td></tr>
</tbody>
</table>

---

# Clausura de un conjunto: ejemplo

Con la tabla anterior, la clausura de cualquier conjunto sale **uniendo filas**:

<div class="mt-6 text-lg">

$$
\mathrm{Cl}(\{q_2,q_3\}) = \mathrm{Cl}(q_2)\cup\mathrm{Cl}(q_3) = \{q_2,q_4,q_6\}\cup\{q_3,q_4,q_6\} = \{q_2,q_3,q_4,q_6\}
$$

</div>

<div v-click class="mt-4 text-lg">

$$
\mathrm{Cl}(\{q_1,q_5\}) = \mathrm{Cl}(q_1)\cup\mathrm{Cl}(q_5) = \{q_1\}\cup\{q_4,q_5,q_6\} = \{q_1,q_4,q_5,q_6\}
$$

</div>

<div v-click class="callout mt-8">

En nuestro AFD, cada vez que leemos un símbolo llegamos a un **único** estado del AFND-ε ($q_2$ con $a$, $q_5$ con $b$), así que $\mathrm{Cl}(\{q_2\}) = \mathrm{Cl}(q_2)$ y $\mathrm{Cl}(\{q_5\}) = \mathrm{Cl}(q_5)$: basta con leer la fila de la tabla.

</div>

---

# Construcción del AFD (1/2): desde el estado inicial

<div class="diagrama">
<Automata
  nombre="afnd-i" :escala="0.66"
  :hl="$clicks >= 1 ? ['q0','q1','q3','q4','q6'] : []"
  :hl-aristas="[[], [], ['q1>q2'], ['q4>q5']][$clicks] ?? []"
/>
</div>

<div v-click class="paso mt-2"><span class="paso-n">1</span><div>

**Inicial:** $\;q_0' = \mathrm{Cl}(q_0) = \{q_0,q_1,q_3,q_4,q_6\} = P_0$. &nbsp; Es **final** (contiene $q_6$).

</div></div>

<div v-click class="paso"><span class="paso-n">2</span><div>

**$P_0$ con $a$:** de los estados de $P_0$ sólo $q_1$ lee $a$, y va a $q_2$:
$\;\delta'(P_0,a) = \mathrm{Cl}\big(\bigcup_{q\in P_0}\delta(q,a)\big) = \mathrm{Cl}(\{q_2\}) = \{q_2,q_4,q_6\} = P_1$ &nbsp;<span class="ok">nuevo</span>

</div></div>

<div v-click class="paso"><span class="paso-n">3</span><div>

**$P_0$ con $b$:** sólo $q_4$ lee $b$, y va a $q_5$:
$\;\delta'(P_0,b) = \mathrm{Cl}(\{q_5\}) = \{q_4,q_5,q_6\} = P_2$ &nbsp;<span class="ok">nuevo</span>

</div></div>

---

# Construcción del AFD (2/2): estados nuevos

<div class="diagrama">
<Automata
  nombre="afnd-i" :escala="0.6"
  :hl="[[], ['q2','q4','q6'], ['q4','q5','q6'], [], ['q5','q6']][$clicks] ?? []"
  :hl-aristas="[[], ['q4>q5'], ['q4>q5']][$clicks] ?? []"
/>
</div>

<div v-click class="paso mt-1"><span class="paso-n">4</span><div>

**$P_1 = \{q_2,q_4,q_6\}$:** con $a$ ninguno se mueve $\Rightarrow \delta'(P_1,a) = \mathrm{Cl}(\emptyset) = \emptyset$. &nbsp;Con $b$: $q_4 \to q_5 \Rightarrow \delta'(P_1,b) = \mathrm{Cl}(\{q_5\}) = P_2$ <span class="nota">(ya existe)</span>

</div></div>

<div v-click class="paso"><span class="paso-n">5</span><div>

**$P_2 = \{q_4,q_5,q_6\}$:** con $a$: $\delta'(P_2,a) = \emptyset$. &nbsp;Con $b$: $q_4 \to q_5 \Rightarrow \delta'(P_2,b) = \mathrm{Cl}(\{q_5\}) = P_2$

</div></div>

<div v-click class="paso"><span class="paso-n">6</span><div>

**$\emptyset$:** $\delta'(\emptyset,a) = \delta'(\emptyset,b) = \emptyset$ &nbsp;(estado de error: ya no se acepta nada)

</div></div>

<div v-click class="paso"><span class="paso-n">7</span><div>

No salen conjuntos nuevos → **terminamos**. Finales: los que contienen $q_5$ o $q_6$: $\;P_0,\ P_1,\ P_2$.

</div></div>

---

# El AFD obtenido

<div class="grid grid-cols-[1fr_1.1fr] gap-6 items-center mt-4">
<div>

<table class="tabla text-sm">
<thead><tr><th>δ′</th><th>conjunto</th><th class="c">a</th><th class="c">b</th></tr></thead>
<tbody>
<tr class="fin"><td>→ * <Est s="P0" /></td><td><Conj s="q0 q1 q3 q4 q6" /></td><td class="c"><Est s="P1" /></td><td class="c"><Est s="P2" /></td></tr>
<tr class="fin"><td>* <Est s="P1" /></td><td><Conj s="q2 q4 q6" /></td><td class="c">∅</td><td class="c"><Est s="P2" /></td></tr>
<tr class="fin"><td>* <Est s="P2" /></td><td><Conj s="q4 q5 q6" /></td><td class="c">∅</td><td class="c"><Est s="P2" /></td></tr>
<tr><td>∅</td><td><Conj s="" /></td><td class="c">∅</td><td class="c">∅</td></tr>
</tbody>
</table>

<div class="nota mt-3">→ inicial · * final</div>

</div>
<div class="diagrama">
<Automata nombre="afd-i" :escala="0.95" />
</div>
</div>

---

# Comprobación

Recorremos el AFD con las palabras del principio:

<div class="flex flex-col gap-3 mt-6">

<div class="traza"><span class="pal">abb</span><Est s="P0" /><span class="sim">—a→</span><Est s="P1" /><span class="sim">—b→</span><Est s="P2" /><span class="sim">—b→</span><Est s="P2" /><span class="ok ml-3">✓ final</span></div>

<div v-click class="traza"><span class="pal">bbb</span><Est s="P0" /><span class="sim">—b→</span><Est s="P2" /><span class="sim">—b→</span><Est s="P2" /><span class="sim">—b→</span><Est s="P2" /><span class="ok ml-3">✓ final</span></div>

<div v-click class="traza"><span class="pal">ε</span><Est s="P0" /><span class="ok ml-3">✓ final (el inicial ya lo es)</span></div>

<div v-click class="traza"><span class="pal">ba</span><Est s="P0" /><span class="sim">—b→</span><Est s="P2" /><span class="sim">—a→</span>∅<span class="no ml-3">✗ no final</span></div>

<div v-click class="traza"><span class="pal">aa</span><Est s="P0" /><span class="sim">—a→</span><Est s="P1" /><span class="sim">—a→</span>∅<span class="no ml-3">✗ no final</span></div>

</div>

<div v-click class="callout mt-8">

Observa que $P_1$ y $P_2$ se comportan igual (los dos son finales, con $a$ van a $\emptyset$ y con $b$ a $P_2$): son **equivalentes**. Lo veremos otra vez al comparar con el camino (ii).

</div>
