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
    listPermissions = async (req: Request, res: Response) => {
        try {
            const roleId = Number(req.params.id);
            const data = await this.roleService.getPermissions(roleId);
            httpOK(res, data);
        } catch (err) {
            httpException(res, err, `[Roles Controller:] cannot list role permissions`);
        }   
    }
    listAllPermissions = async (req: Request, res: Response) => {
        try {
            const data = await this.roleService.getAllPermissions();
            httpOK(res, data);
        } catch (err) {
            httpException(res, err, `[Roles Controller:] cannot list permissions`);
        }
    }
    
    edit = async (req: Request, res: Response) => {
        try {
            const userSession = (req as HttpSessionRequest).user;
            const roleId = Number(req.params.id);
            const body = req.body as IRole
            const data = await this.roleService.editRole(roleId, body, userSession.id);
            httpOK(res, data);
        } catch (err) {
            httpException(res, err, `[Roles Controller:] cannot edit role`);
        }
    }
    listRolePermissions = async (req: Request, res: Response) => {
        try {
            const roleId = Number(req.params.id);
            const data = await this.roleService.listRolePermissions!(roleId);
            console.log('Role Permissions Data:', data);
            httpOK(res, data);
        } catch (err) {
            httpException(res, err, `[Roles Controller:] cannot list role permissions`);
        }
    }
    delete = async (req: Request, res: Response) => {
        try {
            const roleId = Number(req.params.id);
            const data = req.body;
            console.log('Delete Role - Request Body Data:', data);
            await this.roleService.deleteRole(roleId, data);
            httpOK(res, { success: true });
        } catch (err) {
            httpException(res, err, `[Roles Controller:] cannot delete role`);
        }
    }
}

export default new RolesController();