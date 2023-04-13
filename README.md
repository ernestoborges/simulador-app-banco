<h1>Simulado de App de Banco</h1>

<p>
Esse projeto é uma aplicação que simula as funções basicas de um app de banco como criação de usuário, transação entre usuários e listagem de transações por usuários. O design escolhido é inpirado no aplicativo do banco NG.CASH.
</p>


<h2>Instalação</h2>

<p>
Para testar esse projeto é preciso primeiro criar um banco de dados com PostgreSQL e seguir os próximos passos.
</p>

Front-end: 
  acesse a pasta "client" e instale as dependências:
```sh
    $ npm install
```
Back-end: 
  acesse a pasta "servidor" e instale as dependências:
```sh
    $ npm install
```
  ainda na pasta "servidor" configure o arquivo "ormconfig.json" conforme suas informações do banco de dados
```sh
    {
      "type": "postgres",
      "host": "localhost",      <---  host
      "port": 5432,             <---  porta
      "username": "postgres",   <---  usuario
      "password": "admin",      <---  senha
      "database": "ngcashdb",   <---  nome do banco
      "synchronize": true,
      "entities": [
          "src/app/models/*.ts"
      ],
      "migrations": [
          "src/database/migrations/*.ts"
      ],
      "cli": {
          "migrationsDir":  "src/database/migrations"
      }
    }

```

em seguida,

## Executando as aplicações

Primeiro acesse a pasta do back-end "servidor" e execute o seguinte comando:
```sh
  $ npm run dev
```

Agora é só executar o front-end na pasta "client":
```sh
  $ npm start
```
