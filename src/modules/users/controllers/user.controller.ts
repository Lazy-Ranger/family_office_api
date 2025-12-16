import { Request, Response } from "express";
import { httpException, httpOK } from "../../../utils/http";
import { IRegisterUser } from "../interface";
import { UsersAccountServiceInstance, IUsersAccountServiceExtended } from "../services";
import LoggerService from "../../../shared/services/logger.service";
import { HttpSessionRequest } from "src/interfaces";

class UserController {
    private readonly userService: IUsersAccountServiceExtended;

    constructor() {
        this.userService = UsersAccountServiceInstance;
    }

    registerUser = async (req: Request, res: Response) => {
        const createAccountReq: IRegisterUser = req.body;
        const sessionReq = req as HttpSessionRequest;
        const userSession = sessionReq.user;
        const userId = userSession?.id;

        try {
            const loggedInUser = await this.userService.createUser(
                createAccountReq
            );

            httpOK(res, loggedInUser);
            const log = await LoggerService.log({
                userId: userId,
                action: "USER_CREATED",
                method: "POST",
                endpoint: "/users/create",
                reqBody: req.body,
                resBody: loggedInUser,
                // ip_address: body.ip_address,
                statusCode: 201
            });
        } catch (err) {
            httpException(res, err, `[AuthController:] cannot create user account`);
        }
    };

    getUsers = async (req: Request, res: Response) => {
        	const { page, limit, sortField, sortOrder, ...filters } = req.query;
			const pageNum = Array.isArray(page) ? Number(page[0]) : page ? Number(page as unknown as string) : undefined;
			const limitNum = Array.isArray(limit) ? Number(limit[0]) : limit ? Number(limit as unknown as string) : undefined;
			const sortFieldStr = Array.isArray(sortField) ? String(sortField[0]) : sortField ? String(sortField) : undefined;
			const sortOrderStrRaw = Array.isArray(sortOrder) ? String(sortOrder[0]) : sortOrder ? String(sortOrder) : undefined;
			const sortOrderNormalized = sortOrderStrRaw && sortOrderStrRaw.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
        try {
            const usersList = await this.userService.getUsers({
					page: pageNum,
					limit: limitNum,
					sortField: sortFieldStr,
					sortOrder: sortOrderNormalized as 'ASC' | 'DESC',
					filters,
					});
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
