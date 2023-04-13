import { Request, Response} from "express"
import {getManager} from "typeorm";
import {Account} from "../models/Account"
import { User } from "../models/User";
import {Transaction} from "../models/Transaction"

class TransactionController{
    async execute(req: Request, res: Response){
        const userRepository = getManager().getRepository(User);
        const transactionRepository = getManager().getRepository(Transaction);

        // procura pelos usuarios Credor e Devedor e retornas os dados da conta
        const crediteeUser = await userRepository.findOne({where:{username: req.body.creditee}, relations:["account"]});
        const debteeUser = await userRepository.findOne({where:{username: req.body.debtee}, relations:["account"]});

        // checa se a busca de usuario achou os usuarios
        // caso não ache, retorna status 409 de conflito
        if(!crediteeUser || !debteeUser){
            return res.status(404).send({ error: 'Usuario para transação não encontrado' });
            return res.sendStatus(404);
        }

        // verifica se o usuario para checkout é o mesmo do checkin
        // caso seja, retorna status 409
        if(req.body.creditee === req.body.debtee){
            return res.status(404).send({ error: 'Não é possível realizar transação para si mesmo' });
            return res.sendStatus(404);
        }
        // verifica se o valor da transferencia é maior que 0
        if(req.body.transactionValue <= 0){
            return res.status(400).send({ error: 'Valor para transação inserido é invalido' });
            return res.sendStatus(400);
        }

        // verifica se o usuario para ser debitado possui dinheiro suficiente para transferir
        if(Number(debteeUser.account.balance) < Number(req.body.transactionValue)){
            return res.status(400).send({ error: 'Você não possui saldo suficiente' });
            return res.sendStatus(400);
        }

        // realiza o debito e o credito nas devidas contas
        debteeUser.account.balance = Number(debteeUser.account.balance) - Number(req.body.transactionValue);
        crediteeUser.account.balance = Number(crediteeUser.account.balance) + Number(req.body.transactionValue);


        // cria a nova transação
        const newTransaction = transactionRepository.create({
            debitedAccount: debteeUser.account,
            creditedAccount: crediteeUser.account,
            value: req.body.transactionValue
        })

        // salva os todos os dados afetado.
        transactionRepository.save(newTransaction)
        userRepository.save(debteeUser)
        userRepository.save(crediteeUser)

        //prepara a resposta
        const response = {
            debtedAccount: debteeUser.username,
            creditedAccount: crediteeUser.username,
            value: newTransaction.value,
            date: newTransaction.createdAt
        } 
        // retorna os dados da transação criada
        return res.json(response);
    }
}

export default new TransactionController()