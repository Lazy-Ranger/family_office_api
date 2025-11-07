import { Request, Response } from "express";
import { httpException, httpOK } from "../../../utils/http";
import { HttpSessionRequest } from '../../../interfaces'
import { IRole, IGetBody } from '../interfaces'
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

    list = async (req: Request, res: Response) => {
        try {
            const query = req.query as unknown as IGetBody
            const data = await this.roleService.listRoles(query);
            httpOK(res, data);
        } catch (err) {
            httpException(res, err, `[Roles Controller:] cannot list roles`);
        }
    }

}

export default new RolesController();