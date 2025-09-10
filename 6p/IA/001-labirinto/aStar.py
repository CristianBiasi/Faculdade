import time
import heapq

# Dicionário de movimentos possíveis com suas direções (linha, coluna)
MOVES = {
    'C': (-1, 0),  # Cima - move uma linha para cima
    'B': (1, 0),   # Baixo - move uma linha para baixo
    'E': (0, -1),  # Esquerda - move uma coluna para esquerda
    'D': (0, 1),   # Direita - move uma coluna para direita
}

def ler_mapa(caminho_arquivo):
    """
    Lê o arquivo do mapa e converte em uma grade (grid)
    Retorna: grid, ponto inicial (S), ponto objetivo (G)
    """
    grid = []  # Matriz que representa o mapa
    start = goal = None  # Inicializa start e goal como None
    
    # Abre o arquivo com encoding UTF-8 para tratar caracteres especiais
    with open(caminho_arquivo, 'r', encoding='utf-8') as f:
        # Lê cada linha, removendo quebras de linha
        for r, line in enumerate(l.strip('\n') for l in f):
            grid.append(list(line))  # Converte linha em lista de caracteres
            
            # Procura pelas posições inicial (S) e objetivo (G)
            for c, ch in enumerate(line):
                if ch == 'S':
                    start = (r, c)  # Guarda coordenadas do início
                elif ch == 'G':
                    goal = (r, c)   # Guarda coordenadas do objetivo
    
    # Verifica se ambos start e goal foram encontrados
    if start is None or goal is None:
        raise ValueError("Mapa inválido: faltam S ou G.")
    
    return grid, start, goal

def vizinhos(grid, r, c):
    """
    Gera todos os vizinhos válidos de uma posição (r, c)
    Um vizinho é válido se está dentro do grid e não é parede (#)
    """
    R, C = len(grid), len(grid[0])  # Dimensões do grid
    
    # Para cada movimento possível no dicionário MOVES
    for move, (dr, dc) in MOVES.items():
        nr, nc = r + dr, c + dc  # Calcula nova posição
        
        # Verifica se a nova posição está dentro do grid e não é parede
        if 0 <= nr < R and 0 <= nc < C and grid[nr][nc] != '#':
            yield move, (nr, nc)  # Retorna o movimento e a posição

def heuristica(a, b):
    """
    Calcula a distância de Manhattan entre dois pontos a e b
    Fórmula: |x1 - x2| + |y1 - y2|
    """
    return abs(a[0] - b[0]) + abs(a[1] - b[1])

def a_star(grid, start, goal):
    """
    Implementa o algoritmo A* para encontrar caminho mais curto
    entre start e goal no grid
    """
    inicio_tempo = time.time()  # Marca início do tempo de execução

    # Fila de prioridade: (f_score, g_score, posição)
    # f_score = g_score + heurística (custo total estimado)
    fila = [(heuristica(start, goal), 0, start)]
    
    # Dicionário para armazenar pais de cada nó: {nó: (pai, movimento)}
    pai = {start: (None, None)}
    
    # Custo real do caminho do início até cada nó
    g_score = {start: 0}
    
    expandidos = 0  # Contador de nós expandidos
    max_profundidade = 0  # Profundidade máxima alcançada
    visitado = set()  # Conjunto de nós visitados

    while fila:
        # Remove o nó com menor f_score da fila de prioridade
        f, g, atual = heapq.heappop(fila)
        expandidos += 1  # Incrementa contador de expandidos
        visitado.add(atual)  # Marca nó como visitado

        # Se chegou ao objetivo, reconstrói o caminho
        if atual == goal:
            fim_tempo = time.time()
            tempo_total = fim_tempo - inicio_tempo

            # Reconstruir caminho percorrendo os pais backwards
            caminho_moves = []
            cur = atual
            while pai[cur][0] is not None:  # Enquanto não chegar no início
                caminho_moves.append(pai[cur][1])  # Adiciona movimento
                cur = pai[cur][0]  # Vai para o pai
            caminho_moves.reverse()  # Inverte para ficar início→objetivo

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
            novo_g = g + 1  # Custo do novo caminho (cada movimento custa 1)
            
            # Se encontrou caminho melhor para este nó
            if nxt not in g_score or novo_g < g_score[nxt]:
                g_score[nxt] = novo_g  # Atualiza custo real
                f_score = novo_g + heuristica(nxt, goal)  # Calcula custo total estimado
                pai[nxt] = (atual, move)  # Define pai e movimento
                max_profundidade = max(max_profundidade, novo_g)  # Atualiza profundidade máxima
                heapq.heappush(fila, (f_score, novo_g, nxt))  # Adiciona à fila

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
    Preserva as posições inicial (S) e objetivo (G)
    """
    r, c = start  # Começa na posição inicial
    
    # Para cada movimento no caminho
    for mv in moves:
        dr, dc = MOVES[mv]  # Obtém direção do movimento
        r, c = r + dr, c + dc  # Move para nova posição
        
        # Marca com asterisco se não for S ou G
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
    resultado = a_star(grid, start, goal)

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