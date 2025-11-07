import { Request, Response } from "express";
import { httpException, httpOK } from "../../../utils/http";
import { IRegisterUser } from "../interface";
import { UsersAccountServiceInstance, IUsersAccountService } from "../services";

class UserController {
    private readonly userService: IUsersAccountService;

    constructor() {
        this.userService = UsersAccountServiceInstance;
    }

    registerUser = async (req: Request, res: Response) => {
        const createAccountReq = req.body as IRegisterUser;

        try {
            const loggedInUser = await this.userService.createUser(
                createAccountReq
            );

            httpOK(res, loggedInUser);
        } catch (err) {
            httpException(res, err, `[AuthController:] cannot create user account`);
        }
    };
}

export default new UserController();
