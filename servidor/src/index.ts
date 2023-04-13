import "reflect-metadata"
import express from "express"
import cors from "cors"

import "./database/connect"
import routes from "./routes"

const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
    optionSucessStatus: 200
}
app.use(cors(corsOptions));
app.use(express.urlencoded({extended:true}));

app.use(express.json());
app.use(routes);

app.listen(3333, ()=> console.log("Servidor rodando em http://localhost:3333"));