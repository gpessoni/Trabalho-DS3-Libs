# Sistema de Empréstimos de Livros com Nodejs, Prisma e PostgreSQL

Este é um sistema de gerenciamento de livros, autores, usuários e empréstimos, desenvolvido com **Node.js**, **TypeScript** e **Prisma**. O sistema permite a criação, leitura, atualização e exclusão de livros, autores, usuários e empréstimos, utilizando **PostgreSQL** como banco de dados.

O sistema foi projetado com uma abordagem eficiente de gerenciamento de dados, utilizando o **Prisma ORM** para interagir com o banco de dados de maneira estruturada e simples.

## Tecnologias Utilizadas

*   **Node.js**: Plataforma de backend para execução do código JavaScript.
*   **TypeScript**: Superconjunto do JavaScript que adiciona tipagem estática.
*   **Prisma**: ORM utilizado para interagir com o banco de dados PostgreSQL.
*   **PostgreSQL**: Banco de dados relacional para armazenar informações sobre livros, autores, usuários e empréstimos.
*   **Joi**: Biblioteca de validação de dados usada nas rotas da API.
*   **Nodemon**: Ferramenta de desenvolvimento para recarregamento automático do servidor durante mudanças no código.

## Estrutura do Projeto

A estrutura do projeto está organizada da seguinte maneira:

```js
src/
├── controllers/      # Controladores que gerenciam a lógica das requisições
├── middlewares/      # Middlewares para validações e autenticações
├── routes/           # Rotas para acessar os dados da API
├── services/         # Lógica de negócios e regras específicas
├── utils/            # Funções utilitárias
├── validations/      # Validações com Joi
├── prisma/           # Arquivos de configuração do Prisma e migrations
├── server.ts         # Arquivo principal para iniciar o servidor
└── .env              # Variáveis de ambiente, como URL do banco de dados
``` 


Instalação
----------

1.  git clone
    
2.  npm install

3. Criar um banco de dados local com o docker: docker run -e DATABASE_URL="postgresql://postgres:postgres@localhost:5432/book" -p 3000:3000 

4. Criar um .env com a string de conexão: DATABASE_URL="postgresql://postgres:postgres@localhost:5432/books"

5. Criar a migration do banco de dados com o comando npx prisma migrate dev
    
6.  npm run dev


Rotas
-----

Abaixo estão as rotas disponíveis para interagir com a API:

### **Autores**

*   **GET /authors**: Retorna a lista de todos os autores.
    
*   **GET /authors/:id**: Retorna um autor específico pelo ID.
    
  ```js
{ "name": "J.R.R. Tolkien", "bio": "Escritor britânico", "nationality": "British", "birthDate": "1892-01-03"}
 ```
*   **PUT /authors/:id**: Atualiza as informações de um autor específico.
    
*   **DELETE /authors/:id**: Exclui um autor específico.
    

### **Livros**

*   **GET /books**: Retorna a lista de todos os livros.
    
*   **GET /books/:id**: Retorna um livro específico pelo ID.
    
*   jsonCopiarEditar{ "title": "O Senhor dos Anéis", "authorId": 1, "isbn": "978-0-261-10221-7", "publishDate": "1954-07-29", "availableCopies": 5}
    
*   **PUT /books/:id**: Atualiza as informações de um livro específico.
    
*   **DELETE /books/:id**: Exclui um livro específico.

*   **GET /books/not-lended**: Retorna os livros disponíveis para empréstimo

*   **GET /books/lended**: Retorna os livros que estão emprestados
    

### **Empréstimos**
    
*   **POST /loans/**: Cria um empréstimo de livro
    
*   **PUT /loans/return**: Realiza a devolução de um livro

*   **GET /current**: Ver os empréstimos que estão ativos

*   **GET /book/:bookId**: Ver histórico de emprésitmos por livro

*   **GET /user/:userId**: Ver histórico de emprésitmos por usuário    

Como Funciona
-------------

*   **Modelo de Dados**: Todos os dados (livros, autores e empréstimos) são armazenados em arquivos JSON na pasta src/data.
    
*   **POO (Programação Orientada a Objetos)**: O sistema utiliza classes e instâncias para representar os modelos de dados. Cada entidade (Livro, Autor, Empréstimo, etc.) é representada por uma classe, e o acesso aos dados é feito por meio de repositórios que implementam as operações CRUD.
    
*   **Relacionamento entre Autor e Livro**: Ao criar um livro, é necessário fornecer o authorId, que deve corresponder ao ID de um autor já existente.
    
*   **Empréstimos**: O sistema permite que os livros sejam emprestados para os usuários. Quando um empréstimo é feito, o número de cópias disponíveis do livro é decrementado, e quando o livro é devolvido, a cópia é restaurada.
    

Documentação
-------------

Você pode estar acessando a documentação através desse link:

[Documentação da API](https://documenter.getpostman.com/view/41703113/2sAYdeMC7T)

Contribuição
------------

Se você quiser contribuir para o projeto, siga os seguintes passos:

1.  Faça um fork do repositório.
    
2.  Crie uma branch para suas mudanças (git checkout -b feature/nova-funcionalidade).
    
3.  Faça as alterações e commit com uma mensagem clara (git commit -am 'Adiciona nova funcionalidade').
    
4.  Envie sua branch para o repositório (git push origin feature/nova-funcionalidade).
    
5.  Abra um Pull Request explicando suas alterações.
    

Licença
-------

Este projeto está licenciado sob a MIT License.
