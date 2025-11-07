import { Request, Response } from "express";
import { httpException, httpOK } from "../../../utils/http";
import { HttpSessionRequest } from '../../../interfaces'
import {IRole} from '../interfaces'
import RoleServiceInstance, { IRoleService } from '../service/role.service'


class RolesController {
    private readonly roleService: IRoleService;
    constructor() {
        this.roleService = RoleServiceInstance;
    }

    create = async (req: Request, res: Response) => {
        try {
            const userSession = (req as HttpSessionRequest).user;
            const body = req.body as IRole
            const data = await this.roleService.createRole(body, userSession.id);
            httpOK(res, data);
        } catch (err) {
            httpException(res, err, `[Roles Controller:] cannot create role`);
        }
    }

}

export default new RolesController();