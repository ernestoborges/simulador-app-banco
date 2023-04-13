import {Request, Response, NextFunction} from "express"
import jwt from "jsonwebtoken"

interface TokenPayload {
    id: string;
    iat: number;
    exp: number;
}
export default function authMiddleware(req: Request, res: Response, next: NextFunction){

    const { authorization } = req.headers;

    // testa se veio algum header de autorização
    if(!authorization){
        // caso nao venha, para a requisição 
        return res.sendStatus(401);
    }

    // trata a string recebida
    const token = authorization.replace("Bearer", "").trim();

    try{
        const data = jwt.verify(token, "segredoapenasparateste");
        const { id } = data as TokenPayload;
        req.userId = id;

        return next();
    } catch {
        return res.sendStatus(401);
    }
}