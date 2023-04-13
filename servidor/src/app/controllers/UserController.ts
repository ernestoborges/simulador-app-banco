import { Request, Response} from "express"
import {getManager} from "typeorm";
import {User} from "../models/User"
import {Account} from "../models/Account"

class UserController{
    async store(req: Request, res: Response){
        const userRepository = getManager().getRepository(User)
        const accountRepository = getManager().getRepository(Account);

        const { username, password } = req.body;

        // procura se já existe usuario com esse username
        
        const userExists = await userRepository.findOne({where:{username}});

        // checa se a busca de usuario achou algo
        // caso ache, retorna status 409 de conflito
        if(userExists){
            return res.status(409).send({ error: 'Nome de usuário já cadastrado' });
        }
        // se nao for encontrado usuario com username recebido no request, continua a execução do codico abaixo
        
        //testa se usuario tem no minimo 8 caracteres dos listados
        if(username.length < 3){
            return res.sendStatus(409);
        }

        //testa se senha tem pelo menos 1 digito, 1 letra maiuscula e no minimo 8 caracteres
        const pwdRegex = new RegExp('(?=.*[0-9])(?=.*[A-Z])(?=.{8,})')
        if(!pwdRegex.test(password)){
            return res.sendStatus(409);
        }

        // criar nova conta "Account" com balance de R$ 100.00
        const newAccount = accountRepository.create({
            balance: 100.00
        })
    

        // criar usuario com os dados enviados no request e ligada à "Account" criada
        const newUser = userRepository.create({username, password, account: newAccount})
       
        // salva as alterações de conta e usuario
        // await accountRepository.save(newAccount);
        await userRepository.save(newUser);


        const response = {
            username: newUser.username,
            balance: newUser.account.balance
        }
        // retorna os dados do usuario criado
        return res.json(newUser);
    }
}

export default new UserController()