import { Response, Request, NextFunction } from 'express';
import miscQueries from '../../services/services';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();

const userEncryption = (req: Request, res: Response, next: NextFunction) => {
    const hashedPassword = bcrypt.hashSync(
        req.body.password + process.env.SECRET_KEY,
        parseInt(process.env.SALT_ROUNDS as unknown as string)
    );
    req.body.password = hashedPassword;
    next();
}

const userValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const miscQueriesModel = new miscQueries();
        const data = await miscQueriesModel.getUserByName(req.body.first_name, req.body.last_name);
        if(data != undefined) {
            res.status(404);
            res.json({
                msg: "The user already exist"
            });
        } 
        next();
    } catch (error) {
        res.status(500);
        res.send(error);
    }
}

export {
    userEncryption,
    userValidation
};