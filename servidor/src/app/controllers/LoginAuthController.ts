import { Request, Response} from "express"
import {getManager} from "typeorm";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class LoginAuthController{
    async authenticate(req: Request, res: Response){
        const userRepository = getManager().getRepository(User);

        const { username, password } = req.body;

        // procura se existe usuario com esse username
        const user = await userRepository.findOne({where:{username}, relations:["account", "account.debitedTransactions", "account.creditedTransactions"]});

        // checa se a busca de usuario achou algo
        // caso não ache, retorna status 401 de não autorizado
        if(!user){
            return res.status(401).send({ error: 'Usuário ou Senha Incorretos' });
            return res.sendStatus(401);
        }
        // se for encontrado usuario com username recebido no request, continua a execução do codico abaixo
    
        // compara a senha enviada por request com a que o usuario tem salva na tabela usuario
        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword){
            // se as senhas nao forem iguais retorna status 401 de nao autorizado
            return res.status(401).send({ error: 'Usuário ou Senha Incorretos' });
        }

        // caso a senha testada acima esteja correta, é dado um token jwt para o usuario com um segredo e validade/duração de 1 dia
        const token = jwt.sign({id: user.id}, "segredoapenasparateste", {expiresIn: "1d"});

        // retorna os dados do usuario logado e o token
        const response = {
            user: {
                id: user.id,
                username: user.username,
                balance: user.account.balance    
            },
            token
        }
        return res.json(response);
    }
}
export default new LoginAuthController()