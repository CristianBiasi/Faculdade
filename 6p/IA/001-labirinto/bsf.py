import time
from collections import deque  # Fila FIFO eficiente

# Dicionário de movimentos possíveis
MOVES = {
    'C': (-1, 0),  # Cima
    'B': (1, 0),   # Baixo
    'E': (0, -1),  # Esquerda
    'D': (0, 1),   # Direita
}

def ler_mapa(caminho_arquivo):
    """
    Lê o arquivo do mapa e converte em uma grade (grid)
    Retorna: grid, ponto inicial (S), ponto objetivo (G)
    """
    grid = []
    start = goal = None
    
    with open(caminho_arquivo, 'r', encoding='utf-8') as f:
        for r, line in enumerate(l.strip('\n') for l in f):
            grid.append(list(line))
            for c, ch in enumerate(line):
                if ch == 'S':
                    start = (r, c)
                elif ch == 'G':
                    goal = (r, c)
    
    if start is None or goal is None:
        raise ValueError("Mapa inválido: faltam S ou G.")
    
    return grid, start, goal

def vizinhos(grid, r, c):
    """
    Gera todos os vizinhos válidos de uma posição (r, c)
    """
    R, C = len(grid), len(grid[0])
    for move, (dr, dc) in MOVES.items():
        nr, nc = r + dr, c + dc
        if 0 <= nr < R and 0 <= nc < C and grid[nr][nc] != '#':
            yield move, (nr, nc)

def bfs(grid, start, goal):
    """
    Implementa o algoritmo Breadth-First Search (BFS)
    para encontrar o caminho mais curto em grid não-ponderado
    """
    inicio_tempo = time.time()  # Início da medição de tempo

    # Fila FIFO para BFS - armazena posições a serem visitadas
    fila = deque([start])
    
    # Conjunto de nós já visitados (para evitar ciclos)
    visitado = {start}
    
    # Dicionário para armazenar pais e movimentos: {nó: (pai, movimento)}
    pai = {start: (None, None)}
    
    expandidos = 0  # Contador de nós expandidos
    max_profundidade = 0  # Profundidade máxima alcançada
    
    # Dicionário para armazenar profundidade de cada nó
    profundidade = {start: 0}

    while fila:
        # Remove o primeiro nó da fila (FIFO)
        atual = fila.popleft()
        expandidos += 1  # Incrementa contador de expandidos

        # Verifica se alcançou o objetivo
        if atual == goal:
            fim_tempo = time.time()
            tempo_total = fim_tempo - inicio_tempo

            # Reconstruir caminho percorrendo os pais backwards
            caminho_moves = []
            cur = atual
            while pai[cur][0] is not None:
                caminho_moves.append(pai[cur][1])
                cur = pai[cur][0]
            caminho_moves.reverse()

            return {
                "caminho": caminho_moves,
                "expandidos": expandidos,
                "visitados": len(visitado),
                "tempo": tempo_total,
                "profundidade_max": max_profundidade
            }

        # Expande os vizinhos do nó atual
        r, c = atual
        for move, nxt in vizinhos(grid, r, c):
            if nxt not in visitado:  # Se o vizinho não foi visitado
                visitado.add(nxt)  # Marca como visitado
                pai[nxt] = (atual, move)  # Registra pai e movimento
                profundidade[nxt] = profundidade[atual] + 1  # Calcula profundidade
                max_profundidade = max(max_profundidade, profundidade[nxt])  # Atualiza máximo
                fila.append(nxt)  # Adiciona à fila para visitar depois

    # Se a fila esvaziar sem encontrar objetivo
    fim_tempo = time.time()
    return {
        "caminho": None,
        "expandidos": expandidos,
        "visitados": len(visitado),
        "tempo": fim_tempo - inicio_tempo,
        "profundidade_max": max_profundidade
    }

def marcar_caminho(grid, start, moves):
    """
    Marca o caminho encontrado no grid com asteriscos (*)
    """
    r, c = start
    for mv in moves:
        dr, dc = MOVES[mv]
        r, c = r + dr, c + dc
        if grid[r][c] not in ('S', 'G'):
            grid[r][c] = '*'
    return grid

def imprimir_grid(grid):
    """Imprime o grid formatado"""
    for linha in grid:
        print(''.join(linha))

if __name__ == "__main__":
    # Entrada do usuário e execução principal
    mapa = input("nome do mapa: ")
    grid, start, goal = ler_mapa(mapa)
    resultado = bfs(grid, start, goal)

    # Exibe resultados
    if resultado["caminho"] is None:
        print("Sem solução.")
    else:
        print("Passos mínimos:", len(resultado["caminho"]))
        print("Caminho (moves):", ''.join(resultado["caminho"]))
        grid_marcado = marcar_caminho(grid, start, resultado["caminho"])
        imprimir_grid(grid_marcado)

    # Exibe estatísticas da busca
    print("\n📊 Estatísticas da Busca:")
    print("Nós expandidos:", resultado["expandidos"])
    print("Nós visitados:", resultado["visitados"])
    print("Tempo gasto: {:.6f} segundos".format(resultado["tempo"]))
    print("Profundidade máxima:", resultado["profundidade_max"])