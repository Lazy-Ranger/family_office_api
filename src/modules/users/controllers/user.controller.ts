import { Request, Response } from "express";
import { httpException, httpOK } from "../../../utils/http";
import { IRegisterUser } from "../interface";
import { UsersAccountServiceInstance, IUsersAccountServiceExtended } from "../services";

class UserController {
    private readonly userService: IUsersAccountServiceExtended;

    constructor() {
        this.userService = UsersAccountServiceInstance;
    }

    registerUser = async (req: Request, res: Response) => {
        const createAccountReq: IRegisterUser = req.body;

        try {
            const loggedInUser = await this.userService.createUser(
                createAccountReq
            );

            httpOK(res, loggedInUser);
        } catch (err) {
            httpException(res, err, `[AuthController:] cannot create user account`);
        }
    };

    getUsers = async (req: Request, res: Response) => {
        try {
            const usersList = await this.userService.getUsers();
            console.log('Users List:', usersList);
            httpOK(res, usersList);
        } catch (err) {
            httpException(res, err, `[UserController:] cannot fetch users`);
        }
    }

    updateUser = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const updateData = req.body;
            const updated = await this.userService.updateUser(id, updateData);
            httpOK(res, updated);
        } catch (err) {
            httpException(res, err, `[UserController:] cannot update user`);
        }
    }

    deleteUser = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const data = req.body;
            await this.userService.deleteUser(id, data);
            httpOK(res, { success: true });
        } catch (err) {
            httpException(res, err, `[UserController:] cannot delete user`);
        }
    }
}

export default new UserController();
