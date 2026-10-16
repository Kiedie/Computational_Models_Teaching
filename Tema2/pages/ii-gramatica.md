---
layout: section
---

# (ii) Expresión regular → gramática lineal por la derecha → AFND-ε → AFD

---

# De la expresión regular a la gramática

Idea: una variable por cada "**lo que queda por generar**". Escribimos ecuaciones entre lenguajes.

<v-clicks>

- $S$ es todo el lenguaje: $\quad S = (a+\varepsilon)\,b^* = a\,b^* + b^*$
- Llamamos $B$ a lo que queda tras la parte opcional: $\quad B = b^*$
- Entonces $\quad S = a\,B + B \quad\Longrightarrow\quad S \to aB \mid B$
- Y como $b^* = b\,b^* + \varepsilon$: $\quad B = b\,B + \varepsilon \quad\Longrightarrow\quad B \to bB \mid \varepsilon$

</v-clicks>

<div v-click class="caja-def mt-6">
<div class="caja-tit">Gramática</div>

$$
G = (\{S,B\},\ \{a,b\},\ P,\ S), \qquad P = \{\ S \to aB,\quad S \to B,\quad B \to bB,\quad B \to \varepsilon\ \}
$$

Es **lineal por la derecha**: producciones $A \to uB$ o $A \to u$, con $u \in T^*$ (en $S \to B$, $u = \varepsilon$).

</div>

Imaginad que en vez de darnos la expresión regular nos dieran la gramatica regular (lineal por la derecha).

---


# De la gramática al AFND-ε

Dada $G = (V,T,P,S)$ lineal por la derecha, el AFND-ε $M = (Q,T,\delta,q_0,F)$ es:

<div class="caja-def mt-3 text-sm">

- $Q = \{\,[\alpha] : \alpha = S\ \text{ o }\ \exists A\in V,\ u\in T^*\ \text{ con }\ A \to u\alpha \in P\,\}$ &nbsp; (los **finales** de las partes derechas)
- $q_0 = [S], \qquad F = \{[\varepsilon]\}$
- Si $A$ es variable: $\ \delta([A],\varepsilon) = \{\,[\alpha] : A \to \alpha \in P\,\}$ &nbsp; (aplicar una producción)
- Si $a \in T$: $\ \delta([a\alpha],a) = \{[\alpha]\}$ &nbsp; (leer el primer terminal)

</div>

<div v-click class="grid grid-cols-[1.3fr_1fr] gap-8 items-center mt-4">
<div>

<table class="tabla text-sm">
<thead><tr><th>producción</th><th>sufijos α de la parte derecha</th></tr></thead>
<tbody>
<tr><td class="gris">(inicial)</td><td><Est s="[S]" /></td></tr>
<tr><td>S → aB</td><td><Est s="[aB]" />, &nbsp;<Est s="[B]" /></td></tr>
<tr><td>S → B</td><td><Est s="[B]" /></td></tr>
<tr><td>B → bB</td><td><Est s="[bB]" />, &nbsp;<Est s="[B]" /></td></tr>
<tr><td>B → ε</td><td><Est s="[ε]" /></td></tr>
</tbody>
</table>

</div>
<div>

Estados de nuestra gramática:

$$Q = \{[S],\,[aB],\,[B],\,[bB],\,[\varepsilon]\}$$

$$q_0 = [S], \qquad F = \{[\varepsilon]\}$$

</div>
</div>

---

# El AFND-ε obtenido

<div class="grid grid-cols-[1.2fr_1fr] gap-6 items-center">
<div>

<Automata nombre="afnd-ii" :escala="0.85" />

</div>
<div>

<v-clicks>

**Transiciones nulas** (aplicar producciones):

- $\delta([S],\varepsilon) = \{[aB],\,[B]\}$ &nbsp; <span class="nota">S → aB | B</span>
- $\delta([B],\varepsilon) = \{[bB],\,[\varepsilon]\}$ &nbsp; <span class="nota">B → bB | ε</span>

**Leer terminales:**

- $\delta([aB],a) = \{[B]\}$
- $\delta([bB],b) = \{[B]\}$

</v-clicks>

<div v-click class="nota mt-4">

Inicial $[S]$, final $[\varepsilon]$ (ya no queda nada por generar).

</div>

</div>
</div>

---

# Clausura de cada estado

Recordamos: $\ \mathrm{Cl}(q)$ = estados alcanzables desde $q$ sólo con $\varepsilon$, &nbsp; $\mathrm{Cl}(P) = \bigcup_{q\in P}\mathrm{Cl}(q)$.

<div class="diagrama mt-2">
<Automata
  nombre="afnd-ii" :escala="0.68" hl-eps
  :hl="[[], ['S','aB','B','bB','e'], ['aB'], ['B','bB','e'], ['bB'], ['e']][$clicks] ?? []"
  :foco="['', 'S', 'aB', 'B', 'bB', 'e'][$clicks]"
/>
</div>

<table class="tabla mx-auto mt-2 text-sm">
<thead><tr><th>q</th><th>Cl(q)</th><th>por qué (caminos con ε)</th></tr></thead>
<tbody>
<tr v-click><td><Est s="[S]" /></td><td><Conj s="[S] [aB] [B] [bB] [ε]" /></td><td><Camino s="[S] [aB]" />;&ensp;<Camino s="[S] [B] [bB]" />;&ensp;<Camino s="[B] [ε]" /></td></tr>
<tr v-click><td><Est s="[aB]" /></td><td><Conj s="[aB]" /></td><td class="gris">no tiene transiciones ε</td></tr>
<tr v-click><td><Est s="[B]" /></td><td><Conj s="[B] [bB] [ε]" /></td><td><Camino s="[B] [bB]" />;&ensp;<Camino s="[B] [ε]" /></td></tr>
<tr v-click><td><Est s="[bB]" /></td><td><Conj s="[bB]" /></td><td class="gris">no tiene transiciones ε</td></tr>
<tr v-click><td><Est s="[ε]" /></td><td><Conj s="[ε]" /></td><td class="gris">no tiene transiciones ε</td></tr>
</tbody>
</table>

---

# Construcción del AFD

<div class="diagrama">
<Automata
  nombre="afnd-ii" :escala="0.6"
  :hl="[[], ['S','aB','B','bB','e'], ['S','aB','B','bB','e'], ['S','aB','B','bB','e'], ['B','bB','e'], []][$clicks] ?? []"
  :hl-aristas="[[], [], ['aB>B'], ['bB>B'], ['bB>B']][$clicks] ?? []"
/>
</div>

<div v-click class="paso mt-1"><span class="paso-n">1</span><div>

**Inicial:** $\;q_0' = \mathrm{Cl}([S]) = \{[S],[aB],[B],[bB],[\varepsilon]\} = P_0$. &nbsp;Es **final** (contiene $[\varepsilon]$).

</div></div>

<div v-click class="paso"><span class="paso-n">2</span><div>

**$P_0$ con $a$:** sólo $[aB]$ lee $a$ y va a $[B]$: $\;\delta'(P_0,a) = \mathrm{Cl}(\{[B]\}) = \{[B],[bB],[\varepsilon]\} = P_1$ &nbsp;<span class="ok">nuevo</span>

</div></div>

<div v-click class="paso"><span class="paso-n">3</span><div>

**$P_0$ con $b$:** sólo $[bB]$ lee $b$ y va a $[B]$: $\;\delta'(P_0,b) = \mathrm{Cl}(\{[B]\}) = P_1$ <span class="nota">(ya existe)</span>

</div></div>

<div v-click class="paso"><span class="paso-n">4</span><div>

**$P_1 = \{[B],[bB],[\varepsilon]\}$:** con $a$ ninguno $\Rightarrow \emptyset$. &nbsp;Con $b$: $[bB]\to[B] \Rightarrow \delta'(P_1,b) = \mathrm{Cl}(\{[B]\}) = P_1$

</div></div>

<div v-click class="paso"><span class="paso-n">5</span><div>

**$\emptyset$** va a sí mismo. No hay conjuntos nuevos → terminamos. Finales (contienen $[\varepsilon]$): $\;P_0,\ P_1$.

</div></div>

---

# El AFD obtenido

<div class="grid grid-cols-[1fr_1.1fr] gap-6 items-center mt-6">
<div>

<table class="tabla text-sm">
<thead><tr><th>δ′</th><th>conjunto</th><th class="c">a</th><th class="c">b</th></tr></thead>
<tbody>
<tr class="fin"><td>→ * <Est s="P0" /></td><td><Conj s="[S] [aB] [B] [bB] [ε]" /></td><td class="c"><Est s="P1" /></td><td class="c"><Est s="P1" /></td></tr>
<tr class="fin"><td>* <Est s="P1" /></td><td><Conj s="[B] [bB] [ε]" /></td><td class="c">∅</td><td class="c"><Est s="P1" /></td></tr>
<tr><td>∅</td><td><Conj s="" /></td><td class="c">∅</td><td class="c">∅</td></tr>
</tbody>
</table>

<div class="nota mt-3">→ inicial · * final</div>

</div>
<div class="diagrama">
<Automata nombre="afd-ii" :escala="0.95" />
</div>
</div>

<div v-click class="mt-6">

Comprobación rápida: $abb$: $P_0 \xrightarrow{a} P_1 \xrightarrow{b} P_1 \xrightarrow{b} P_1$ <span class="ok">✓</span> &nbsp;&nbsp; $ba$: $P_0 \xrightarrow{b} P_1 \xrightarrow{a} \emptyset$ <span class="no">✗</span>

</div>

---

# Comparación de los dos caminos

<div class="grid grid-cols-2 gap-8 mt-4">
<div class="diagrama">
<div class="font-bold">(i) Construcción recursiva</div>
<div class="h-56 flex items-center"><Automata nombre="afd-i" :escala="0.72" /></div>
<div class="diagrama-t">4 estados</div>
</div>
<div class="diagrama">
<div class="font-bold">(ii) Vía gramática</div>
<div class="h-56 flex items-center"><Automata nombre="afd-ii" :escala="0.82" /></div>
<div class="diagrama-t">3 estados</div>
</div>
</div>

<v-clicks>

- Los dos aceptan $(a+\varepsilon)\,b^*$, pero **no tienen por qué salir iguales**: dependen del AFND-ε de partida.
- En (i), $P_1$ y $P_2$ son equivalentes (finales, $a \to \emptyset$, $b \to P_2$). Si los fusionamos, sale **exactamente** el AFD de (ii).

</v-clicks>
