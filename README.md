<h1>Simulado de App de Banco</h1>

<p>
Esse projeto é uma aplicação que simula as funções basicas de um app de banco como criação de usuário, transação entre usuários e listagem de transações por usuários. O design escolhido é inpirado no aplicativo do banco NG.CASH.
</p>

<h2>Funcionalidades</h2>

<ul>
  <li>
    <h3>Criar novo usuario</h3>
    <p>O front-end faz valização do tamanho minimo de nome de usuário e das restrições de caracteres para a senha.</p>
    <p>O back-end retorna erro caso já exista usuário cadastrado.</p>
    <img style="width: 400px; height: 400px" src="https://user-images.githubusercontent.com/50407385/231907145-cd4ceade-d2c9-4667-ad6f-afb543c23528.gif" alt="Cadastro de Usuário"/>
  </li>
  <li>
    <h3>Login</h3>
    <p>O front-end faz valização se os campos foram preenchidos.</p>
    <p>O back-end retorna erro caso usuário não exista e se usuário e senha não forem compatíveis.</p>
    <img style="width: 400px; height: 400px" src="https://user-images.githubusercontent.com/50407385/231909823-369c28d2-f8fd-4f96-84ce-0511be7da00d.gif" alt="Cadastro de Usuário"/>
  </li>
  <li>
    <h3>Realizar Transação</h3>
    <p>O back-end controla se o usuário possui saldo suficiente para realizar a transação, se o valor da transação é maior que zero e se o usuario não está tentando realizar uma transação para si mesmo.</p>
    <img style="width: 400px; height: 400px" src="https://user-images.githubusercontent.com/50407385/231909834-b7382bea-d7f9-4277-bee6-a58e8a5606e3.gif" alt="Cadastro de Usuário"/>
  </li>
  <li>
    <h3>Realizar Transação</h3>
    <p>É apresentado um histórico de transações daquele usuário informando a quantia, se foi valor recebido ou enviado, data da transação e com qual usuário a transação foi realizada.</p>
    <img style="width: 400px; height: 400px" src="https://user-images.githubusercontent.com/50407385/231909837-5d80f419-72f3-4d6f-9d52-bf927becc34b.gif" alt="Cadastro de Usuário"/>
  </li>
</ul>


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
