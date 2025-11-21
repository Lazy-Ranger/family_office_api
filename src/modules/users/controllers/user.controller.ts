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

    getUsers = async (req: Request, res: Response) => {
        try {
            const usersList = await this.userService.getUsers();
            httpOK(res, usersList);
        } catch (err) {
            httpException(res, err, `[UserController:] cannot fetch users`);
        }
    }

    updateUser = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const updateData = req.body as Partial<any>;
            const updated = await this.userService.updateUser(id, updateData);
            httpOK(res, updated);
        } catch (err) {
            httpException(res, err, `[UserController:] cannot update user`);
        }
    }

    deleteUser = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            // allow hard delete via query param ?hard=true or body { hard: true }
            const hard = (req.query.hard === 'true') || (req.body && req.body.hard === true);
            await this.userService.deleteUser(id, Boolean(hard));
            httpOK(res, { success: true });
        } catch (err) {
            httpException(res, err, `[UserController:] cannot delete user`);
        }
    }
}

export default new UserController();
