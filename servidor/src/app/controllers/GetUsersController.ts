import { Request, Response} from "express"
import {getManager} from "typeorm";
import {User} from "../models/User"

class GetUserController{
    async index(req: Request, res: Response){
        const userRepository = getManager().getRepository(User)
        
        // procura se já existe usuario com esse username
        const users = await userRepository.find({
        });

        // retorna os dados do usuario criado
        return res.json(users);
    }
}

export default new GetUserController()