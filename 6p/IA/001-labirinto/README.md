Mapa 1:
* BFS: 8 passos, 14 nós expandidos, 14 visitados
* A*: 8 passos, 14 nós expandidos, 14 visitados
* Resultado: Ambos encontraram o mesmo caminho com mesma eficiência

Mapa 2:
* BFS: 9 passos, 18 nós expandidos, 19 visitados
* A*: 9 passos, 18 nós expandidos, 18 visitados
* Resultado: A* foi ligeiramente mais eficiente (1 nó a menos visitado)

Mapa 3:
* BFS: 20 passos, 37 nós expandidos, 38 visitados
* A*: 20 passos, 34 nós expandidos, 34 visitados
* Resultado: A* foi significativamente mais eficiente (3-4 nós a menos)

Mapas grandes criados para comparação
Mapa 4:

* BFS: 29 passos, 103 nós expandidos, 106 visitados, profundidade máxima 30, tempo ≈ 0.000196s
* A*: 29 passos, 68 nós expandidos, 68 visitados, profundidade máxima 29, tempo ≈ 0.000170s
* Resultado: Ambos encontraram o mesmo caminho ótimo (29 passos). Porém, o A* foi mais eficiente, expandindo 35 nós a menos e visitando 38 nós a menos, além de ter sido um pouco mais rápido.

Mapa 5:

* BFS: 97 passos, 144 nós expandidos, 144 visitados, profundidade máxima 97, tempo ≈ 0.000323s
* A*: 97 passos, 144 nós expandidos, 144 visitados, profundidade máxima 97, tempo ≈ 0.000323s
* Resultado: Neste mapa mais linear, ambos tiveram desempenho idêntico: mesmo número de passos, nós expandidos/visitados e profundidade máxima. Isso ocorre porque o caminho ótimo já é bastante direto, e a heurística não traz ganho real.

Sobre a Heurística do A*:
A heurística utilizada no algoritmo A* é a **Distância de Manhattan**, definida como:
def heuristica(a, b):
    return abs(a[0] - b[0]) + abs(a[1] - b[1])

Características desta heurística:
1-Admissível: Nunca superestima o custo real até o objetivo
2-Consistente: Satisfaz a desigualdade triangular h(n) ≤ c(n, n') + h(n')
3-Ótima para grids sem obstáculos: Em ambientes sem paredes, encontra o caminho ótimo

Vantagens observadas:
* Menos nós expandidos: O A* guia a busca na direção do objetivo

* Mais eficiente em mapas complexos: A diferença aumenta com a complexidade do mapa

* Menor tempo de execução: Embora pequeno, o A* foi consistentemente mais rápido

Por que o A* foi melhor:
A heurística permite que o algoritmo "focalize" a busca em direção ao objetivo, evitando explorar caminhos que se afastam da meta. Isso é particularmente útil em mapas maiores e mais complexos como o mapa 3, onde a diferença de desempenho foi mais significativa.

Ambos os algoritmos encontraram caminhos ótimos (mesmo número de passos), mas o A* demonstrou ser mais eficiente em termos de nós explorados, especialmente em ambientes mais complexos.

Conclusões gerais

Mapas simples (1 e 2): A diferença é mínima entre BFS e A*, mas já é possível observar pequenas vantagens do A*.

Mapa intermediário (3): A* já mostra um ganho mais evidente, explorando bem menos nós.

Mapa grande com ramificações (4): O A* se destaca, reduzindo consideravelmente o número de nós expandidos/visitados e mantendo o mesmo caminho ótimo.

Mapa grande e linear (5): O desempenho dos dois algoritmos é praticamente idêntico, já que o caminho é quase reto e a heurística não influencia.