
Primeiro descompacte o projeto.rar em um diretorio

Depois disso, instale as dependências do Front-end e do Back-end:

Front-end: 
  acesse a pasta "client" e execute o seguinte comando:
    $ npm install

Back-end: 
  acesse a pasta "servidor" e execute o seguinte comando:
    $ npm install

  configure o arquivo "ormconfig.json" conforme suas informações do banco de dados
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

em seguida,

## Executando as aplicações

Primeiro acesse a pasta do back-end e execute o seguinte comando:
```sh
  $ npm run dev
```

Agora é só executar o front-end:
```sh
  $ npm start
```