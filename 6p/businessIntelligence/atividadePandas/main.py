import pandas as pd
import numpy as np

# URLs dos arquivos CSV no GitHub
country_url = "https://raw.githubusercontent.com/datasciencedojo/datasets/master/WorldDBTables/CountryTable.csv"
city_url = "https://raw.githubusercontent.com/datasciencedojo/datasets/master/WorldDBTables/CityTable.csv"
language_url = "https://raw.githubusercontent.com/datasciencedojo/datasets/master/WorldDBTables/LanguageTable.csv"

# Carregar os dados
try:
    country_df = pd.read_csv(country_url)
    city_df = pd.read_csv(city_url)
    language_df = pd.read_csv(language_url)
    
    print("Dados carregados com sucesso!")
    print(f"Países: {len(country_df)} registros")
    print(f"Cidades: {len(city_df)} registros")
    print(f"Línguas: {len(language_df)} registros")
    print("-" * 60)
    
except Exception as e:
    print(f"Erro ao carregar dados: {e}")
    exit()

# Converter colunas para os tipos corretos
try:
    # Converter population para numérico (removendo possíveis vírgulas)
    country_df['population'] = pd.to_numeric(country_df['population'], errors='coerce')
    city_df['population'] = pd.to_numeric(city_df['population'], errors='coerce')
    
    # Converter life_expectancy para numérico (tratando valores nulos e strings)
    country_df['life_expectancy'] = pd.to_numeric(country_df['life_expectancy'], errors='coerce')
    
    # Converter outras colunas numéricas se necessário
    country_df['surface_area'] = pd.to_numeric(country_df['surface_area'], errors='coerce')
    country_df['gnp'] = pd.to_numeric(country_df['gnp'], errors='coerce')
    country_df['gnp_old'] = pd.to_numeric(country_df['gnp_old'], errors='coerce')
    
    print("Conversão de tipos realizada com sucesso!")
    
except Exception as e:
    print(f"Erro na conversão de tipos: {e}")
    exit()

# 1. Qual a população de cada continente?
print("1. POPULAÇÃO POR CONTINENTE:")
populacao_continente = country_df.groupby('continent')['population'].sum().sort_values(ascending=False)
for continente, populacao in populacao_continente.items():
    print(f"   {continente}: {populacao:,.0f} habitantes")
print()

# 2. Quais são os 10 países mais populosos?
print("2. 10 PAÍSES MAIS POPULOSOS:")
top_10_paises = country_df.nlargest(10, 'population')[['name', 'population']]
for i, (_, row) in enumerate(top_10_paises.iterrows(), 1):
    print(f"   {i:2d}. {row['name']}: {row['population']:,.0f} habitantes")
print()

# 3. Quais são os 10 países com maior expectativa de vida?
print("3. 10 PAÍSES COM MAIOR EXPECTATIVA DE VIDA:")
# Remover linhas com valores NaN em life_expectancy
country_df_vida = country_df.dropna(subset=['life_expectancy'])
top_10_vida = country_df_vida.nlargest(10, 'life_expectancy')[['name', 'life_expectancy']]
for i, (_, row) in enumerate(top_10_vida.iterrows(), 1):
    print(f"   {i:2d}. {row['name']}: {row['life_expectancy']:.1f} anos")
print()

# 4. Qual a média de expectativa de vida?
media_vida = country_df_vida['life_expectancy'].mean()
print(f"4. MÉDIA DE EXPECTATIVA DE VIDA: {media_vida:.1f} anos")
print()

# 5. Qual a média de habitantes por país?
print("5. MÉDIA DE HABITANTES POR PAÍS:")
media_habitantes = country_df['population'].mean()
print(f"   Média: {media_habitantes:,.0f} habitantes por país")
print()

# 6. Quais são as 10 cidades mais populosas?
print("6. 10 CIDADES MAIS POPULOSAS:")
top_10_cidades = city_df.nlargest(10, 'population')[['name', 'country_code', 'population']]
for i, (_, row) in enumerate(top_10_cidades.iterrows(), 1):
    print(f"   {i:2d}. {row['name']} ({row['country_code']}): {row['population']:,.0f} habitantes")
print()

# Informações adicionais sobre os dados
print("=" * 60)
print("INFORMAÇÕES ADICIONAIS SOBRE OS DADOS:")
print("=" * 60)

print("\nESTATÍSTICAS DOS PAÍSES:")
print(f"Total de países: {len(country_df)}")
print(f"Continentes: {country_df['continent'].nunique()}")
print(f"População mundial total: {country_df['population'].sum():,.0f} habitantes")
print(f"Países sem dados de expectativa de vida: {country_df['life_expectancy'].isna().sum()}")

print("\nESTATÍSTICAS DAS CIDADES:")
print(f"Total de cidades: {len(city_df)}")
print(f"Cidade mais populosa: {city_df.loc[city_df['population'].idxmax(), 'name']}")
print(f"População da maior cidade: {city_df['population'].max():,.0f} habitantes")

print("\nESTATÍSTICAS DAS LÍNGUAS:")
print(f"Total de registros de línguas: {len(language_df)}")
print(f"Línguas únicas: {language_df['language'].nunique()}")
print(f"Países com registros de línguas: {language_df['country_code'].nunique()}")

# Mostrar informações sobre os tipos de dados
print("\n" + "=" * 60)
print("TIPOS DE DADOS APÓS CONVERSÃO:")
print("=" * 60)
print("\nPAÍSES:")
print(country_df.dtypes)
print("\nCIDADES:")
print(city_df.dtypes)

# Mostrar primeiras linhas de cada dataset para verificação
print("\n" + "=" * 60)
print("PRIMEIRAS LINHAS DE CADA DATASET:")
print("=" * 60)

print("\nPAÍSES (primeiras 3 linhas):")
print(country_df.head(3).to_string(index=False))

print("\nCIDADES (primeiras 3 linhas):")
print(city_df.head(3).to_string(index=False))

print("\nLÍNGUAS (primeiras 3 linhas):")
print(language_df.head(3).to_string(index=False))