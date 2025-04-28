# prismaAPI

API simples usando **Express** + **Prisma ORM** para gerenciar usuários e posts.

> Repositório: [github.com/GustavoTrevezani/prismaAPI](https://github.com/GustavoTrevezani/prismaAPI)

---

## 🚀 Como rodar o projeto

1. **Clone o repositório:**

git clone https://github.com/GustavoTrevezani/prismaAPI.git

cd prismaAPI

### Configure o Prisma:

*   Ajuste o arquivo `.env` com a URL do seu banco de dados.

### Rode as migrations e gere o client:

`npx prisma migrate dev npx prisma generate`

### Rode o servidor em modo de desenvolvimento:

`npm run dev`

---

## 📋 Rotas disponíveis

### 🧑 Usuários (User)

*   **Criar usuário**  
    `POST /api/users`
    
    `{  "name": "Nome do usuário",  "email": "email@exemplo.com" }` 
    
*   **Listar todos usuários**  
    `GET /api/users`
*   **Atualizar usuário**  
    `PUT /api/users/:id`  
     
    
    `{  "name": "Novo nome",  "email": "novo@email.com" }` 
    
*   **Deletar usuário**  
    `DELETE /api/users/:id`

---

### 📝 Posts

*   **Criar post**  
    `POST /api/posts`


    
    `{  "title": "Título do Post",  "content": "Conteúdo do post",  "authorId": 1 }`

*   **Listar todos posts**  
    `GET /api/posts`
*   **Listar post por ID**  
    `GET /api/posts/:id`
*   **Atualizar post**  
    `PUT /api/posts/:id`  
    
    `{  "title": "Novo título",  "content": "Novo conteúdo",  "authorId": 1 }` 
    
*   **Deletar post**  
    `DELETE /api/posts/:id`
