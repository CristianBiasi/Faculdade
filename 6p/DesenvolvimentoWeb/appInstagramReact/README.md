# Instagram Clone - React Native + Expo

Um clone básico do Instagram desenvolvido em React Native usando Expo, criado para fins acadêmicos.

## 🚀 Como executar

1. Navegue até a pasta do projeto:
   ```bash
   cd instagram-clone
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o projeto:
   ```bash
   npx expo start
   ```

4. Escaneie o QR code com o app Expo Go no seu celular ou pressione 'w' para abrir no navegador.

## 📱 Funcionalidades

- **Tela de Login**: Interface de login com campos de email/telefone e senha
- **Feed Principal**: Tela principal com stories e posts
- **Stories**: Carrossel horizontal de stories dos usuários
- **Posts**: Feed de postagens com fotos, curtidas e legendas
- **Navegação**: Menu inferior com ícones de navegação

## 🏗️ Estrutura do Projeto

```
instagram-clone/
├── src/
│   ├── components/
│   │   ├── titulo.js      # Header com logo e ícones
│   │   ├── stories.js     # Carrossel de stories
│   │   ├── story.js       # Item individual do story
│   │   ├── foto.js        # Componente de postagem
│   │   └── menu.js        # Barra de navegação inferior
│   ├── login.js           # Tela de login
│   └── feed.js            # Tela principal do feed
├── App.js                 # Componente principal com navegação
├── package.json           # Dependências do projeto
└── app.json              # Configuração do Expo
```

## 🎨 Componentes

### Login
- Campos de email/telefone e senha
- Botão de login
- Link para cadastro
- Design fiel ao Instagram

### Feed
- Header com logo do Instagram
- Carrossel de stories
- Feed de postagens
- Menu de navegação inferior

### Stories
- Carrossel horizontal
- Fotos circulares dos usuários
- Indicador visual de stories não visualizados

### Posts
- Foto do usuário e nome
- Imagem da postagem
- Botões de ação (curtir, comentar, compartilhar)
- Contador de curtidas
- Legenda da postagem
- Tempo da postagem

## 🛠️ Tecnologias Utilizadas

- **React Native**: Framework para desenvolvimento mobile
- **Expo**: Plataforma para desenvolvimento React Native
- **React Navigation**: Navegação entre telas
- **JavaScript**: Linguagem de programação

## 📝 Notas

- Este é um projeto acadêmico e não possui funcionalidades reais de rede
- As imagens são placeholders gerados automaticamente
- Os dados são mockados para demonstração
- Focado na interface e experiência do usuário

## 🎯 Objetivos Alcançados

✅ Estrutura de pastas simples e organizada  
✅ Componentes exatamente como especificado  
✅ Design fiel ao Instagram  
✅ Apenas React Native + Expo (sem dependências extras)  
✅ Pronto para executar com `npx expo start`  
✅ Interface responsiva e moderna  
✅ Sistema de imagens organizado em assets  
✅ Estilos otimizados para tamanhos corretos

## 🖼️ Sistema de Imagens

O projeto está configurado para usar imagens locais organizadas em:

- `assets/icons/` - Logo do Instagram e ícones do menu (120x30px e 24x24px)
- `assets/avatars/` - Fotos de perfil e stories (32x32px e 60x60px)
- `assets/posts/` - Imagens dos posts (400x300px)

**Para adicionar suas próprias imagens:**
1. Substitua os arquivos nas pastas correspondentes
2. Mantenha os nomes dos arquivos
3. Use os tamanhos recomendados para melhor performance

Consulte o arquivo `COMO_ADICIONAR_IMAGENS.md` para instruções detalhadas.  
