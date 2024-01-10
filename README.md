# Projeto API Rest Node.js com TypeScript.
Este projeto é uma API Rest em NodeJS e Typescript desenvolvida para fins de aprendizado no curso de **[API Rest em NodeJS e Typescript](https://youtu.be/SVepTuBK4V0)** do canal **[Lucas Souza Dev](https://www.youtube.com/c/LucasSouzaDev)** no YouTube.


## Funcionalidades

- **Entidades:**
  - Cidade
  - Pessoa (com relacionamento com Cidade)
  - Usuário

- **Operações:**
  - CRUD para Pessoa e Cidade
  - Utilização de JWT para controle de acesso às rotas
  - Endpoints para signIn e signUp de Usuário

## Configuração e Uso

### Pré-requisitos

- Node.js e npm devem estar instalados localmente.
- Clone este repositório em sua máquina.

# Como rodar 

Você vai precisar do nodens instalado no seu computador para rodar o projeto.

Clone o repositório:
```
$ git clone 
```

Entre na pasta
```
$ cd youtube-curso-react-materialui-typescript
```

Instale as dependências
```
$ yarn install
```

Configure as variáveis ambiente, crie o arquivo `.env` na pasta raiz do projeto coloque o conteúdo a seguir dentro
```
PORT=3333
NODE_ENV=dev

IS_LOCALHOST=true

ENABLED_CORS=[Lista de endereços separados por ";"]
JWT_SECRET=[Uma string qualquer]
```

Rode o projeto
```
$ yarn start
```

