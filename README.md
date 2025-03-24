## Amazon Search

# Descrição
O Amazon Search é um projeto que permite buscar produtos na Amazon, exibir detalhes como título, avaliação, número de reviews e imagem, tudo a partir de uma palavra-chave fornecida pelo usuário. Ele consiste em um backend em Node.js e frontend em HTML, CSS e JavaScript.

# Funcionalidades
Buscar produtos na Amazon com base em uma palavra-chave.

# Exibir os resultados com informações como:
-Título do produto
-Avaliação do produto (estrela)
-Número de avaliações
-Imagem do produto

Interface de usuário simples com um campo de entrada e botão de busca.

# Tecnologias Utilizadas
Frontend:
 - HTML
 - CSS
 - JavaScript (Vanilla)
Backend:
 - Node.js
 - Express.js
 - Axios
 - JSDOM

/root
├── index.html         # Página HTML que exibe o formulário de busca
├── style.css          # Estilos para a interface
├── searchProducts.js  # Lógica de busca e manipulação de resultados
├── server.js          # Servidor backend em Node.js que realiza scraping da Amazon

## Como Usar
1 - Clone o repositório:
git clone https://github.com/seu-usuario/amazon-search.git
cd amazon-search
2 - npm install
3 - npm start
4 - Abra o arquivo index.html no navegador (# utilize o Live Server).
5 - Digite uma palavra-chave (ex: "mouse") e clique em Buscar para obter os resultados da Amazon.


## Como Funciona
# Frontend:
 - O usuário insere uma palavra-chave no campo de busca e clica em Buscar.
 - A função faz uma requisição HTTP para o servidor backend.
# Backend:
 - O backend, executado com Node.js e Express, usa a biblioteca Axios para fazer uma requisição à Amazon e obter o HTML da página de pesquisa de produtos.
 - A biblioteca JSDOM é utilizada para manipular o HTML e extrair informações dos produtos, como título, imagem, avaliações e reviews.
 - Os dados extraídos são enviados de volta ao frontend em formato JSON.
# Exibição:
 - O frontend recebe os dados e exibe os produtos em uma interface amigável, mostrando imagem, título, avaliações e reviews.

## Endpoints da API
- GET /api/scrape
 - Parâmetros: keyword (palavra-chave para busca de produtos na Amazon)
Resposta:
 - 200 OK: Retorna um objeto JSON com uma lista de produtos.
 - 404 Not Found: Se nenhum produto for encontrado.
 - 500 Internal Server Error: Se ocorrer algum erro ao realizar o scraping.

# Exemplos de Requisição e Resposta
Requisição: GET http://localhost:5000/api/scrape?keyword=mouse
# Resposta (Exemplo):
{
  "keyword": "mouse",
  "products": [
    {
      "title": "Mouse Logitech MX Master 3",
      "rating": "4.8",
      "reviews": "150",
      "image": "https://example.com/image.jpg"
    },
    {
      "title": "Mouse Gamer Razer DeathAdder",
      "rating": "4.7",
      "reviews": "200",
      "image": "https://example.com/image2.jpg"
    }
  ]
}

# Possíveis Erros
500 - Erro no Servidor: Pode ocorrer se houver um erro durante o scraping na Amazon.
400 - Parâmetro inválido: Caso não seja fornecida uma palavra-chave ou se o formato for incorreto.
403 - Bloqueio de IP: Caso a Amazon bloqueie o scraping devido a múltiplas requisições em curto período.

# Melhorias Futuras
 - Implementar mais opções de filtros de busca (ex: preço, marca, etc.).
 - Melhorar a experiência do usuário com paginação nos resultados.
 - Adicionar funcionalidade para buscar em outros sites de e-commerce.
# Licença
Este projeto está licenciado sob a MIT License.
