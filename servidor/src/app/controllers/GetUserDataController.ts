import { Request, Response} from "express"
import {getManager} from "typeorm";
import { User } from "../models/User";
import jwt from "jsonwebtoken";

class GetUserDataController{
    async index(req: Request, res: Response){
        const userRepository = getManager().getRepository(User);
        const id  = req.userId;

        // procura se existe usuario com esse id
        const user = await userRepository.findOne({where:{id}, relations:["account", "account.debitedTransactions", "account.creditedTransactions"]});

        // checa se a busca de usuario achou algo
        // caso não ache, retorna status 401 de não autorizado
        if(!user){
            return res.sendStatus(401);
        }
        // se for encontrado usuario com username recebido no request, continua a execução do codico abaixo

        const response = {
            id: user.id,
            username: user.username,
            balance: user.account.balance
        }
        // retorna os dados do usuario logado e o toke
        return res.json(response);
    }
}
export default new GetUserDataController()