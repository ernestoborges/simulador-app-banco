import { Request, Response} from "express"
import {getManager, Any} from "typeorm";
import { User } from "../models/User";
import { Transaction } from "../models/Transaction";


class GetUserTransactionsController{
    async index(req: Request, res: Response){
        const userRepository = getManager().getRepository(User);
        const transactionRepository = getManager().getRepository(Transaction);

        const userId  = req.userId;

        // procura se existe usuario com esse id
        const user = await userRepository.findOne({
            where:{
                id: userId
            }, 
            relations:["account"]
        });

        // checa se a busca de usuario achou algo
        // caso não ache, retorna status 401 de não autorizado
        if(!user){
            return res.sendStatus(401);
        }

        // procura todas as transaçoes de debito desse usuario
        const debits = await transactionRepository.find({
            relations: ["debitedAccount", "debitedAccount.user", "creditedAccount", "creditedAccount.user"],
            select: ["createdAt", "debitedAccount","value"],
            where:{
                debitedAccount: {
                    id: user?.account.id
                }
            }
        })
        // procura todas as transaçoes de credito desse usuario
        const credits = await transactionRepository.find({
            relations: ["creditedAccount", "creditedAccount.user","debitedAccount", "debitedAccount.user"],
            select: ["createdAt", "creditedAccount","value"],
            where:{
                creditedAccount: {
                    id: user?.account.id
                }
            }
        })

        // trata a resposta para ser enviada
        const debitsResponse = debits.map(transac=>({
            creditee: transac.creditedAccount.user.username,
            debtee: transac.debitedAccount.user.username,
            value: transac.value,
            createdAt: transac.createdAt,
            type: "debt"
        }))

        const creditsResponse = credits.map(transac=>({
            creditee: transac.creditedAccount.user.username,
            debtee: transac.debitedAccount.user.username,
            value: transac.value,
            createdAt: transac.createdAt,
            type: "credit"
        }))

        return res.json({debitsResponse,creditsResponse});
    }
}
export default new GetUserTransactionsController()