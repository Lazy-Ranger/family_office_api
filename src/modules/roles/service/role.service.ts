import { permissions, roles, role_has_permissions, users } from '../../../models'
import { col, where, Op, Order, Sequelize, WhereOptions, fn, } from 'sequelize';
import CacheService from '../../../shared/services/cache/cache.service';
import { BadRequestException } from "../../../utils/http";
import { valueToBoolean } from '../../../utils/common';
import { ERRORS_LITERAL } from '../../../config'
import { IRole, IGetBody, IPermission } from '../interfaces'


export interface IRoleService {
    createRole: (roleBody: IRole, userId: number) => Promise<void>;
    getPermissions: (id: number) => Promise<string[]>;
    listRoles: (body: IGetBody) => Promise<{ data: roles[], count: number }>;
    getAllPermissions: () => Promise<IPermission[]>;
    listRolePermissions?: (roleId: number) => Promise<{ permissions: IPermission[]; role: string }>;
    editRole: (id: number, roleBody: IRole, userId: number) => Promise<void>;
    deleteRole: (id: number, data?: { enable?: boolean; disable?: boolean }) => Promise<void>;
}


class RoleService {
    private nodeCache = new CacheService().getInstance();
    private roles: typeof roles;
    private roleHasPermissions: typeof role_has_permissions;
    private permissions: typeof permissions;
    private users: typeof users;

    constructor() {
        this.roles = roles;
        this.roleHasPermissions = role_has_permissions;
        this.permissions = permissions;
        this.users = users;
    }

    createRole = async (roleBody: IRole, userId: number) => {
        const { name, permissions } = roleBody;
        const roleName = name.trim();
        const role = await this.roles.findOne({ where: { role: roleName } });
        if (role) {
            throw new BadRequestException(ERRORS_LITERAL.ROLE_ALREADY_EXISTS);
        }
        const newRole = await this.roles.create({
            role: roleName,
            created_by: userId,
            updated_by: userId,
        });
        const existingPermissions = await this.permissions.findAll({
            where: {
                status: 1,
                id: permissions,
            },
            raw: true,
        });
        await this.roleHasPermissions.bulkCreate(
            existingPermissions.map((p) => ({
                role_id: newRole.id,
                permission_id: p.id,
            }))
        );
    }

    listRoles = async (body: IGetBody): Promise<{ data: roles[], count: number }> => {
        const {
            filters,
            page,
            sortField,
            sortOrder,
            sizePerPage: limit,
        } = body;
        const offset = (page - 1) * limit;
        let filter: Record<string, unknown> = {};
        if (filters) {
            try {
                filter = typeof filters === 'string' ? JSON.parse(filters) : filters;
            } catch (e) {
                filter = {};
                console.log('Error parsing filters string:', e);
            }
        }
        const whereList: WhereOptions = [];
        let order: Order = [[sortField, sortOrder.toUpperCase()]];
        if (sortField === 'role') {
            order = [
                [
                    Sequelize.fn('lower', Sequelize.col(sortField)),
                    sortOrder.toUpperCase(),
                ],
            ];
        }

        const roleFilterValue = filter['role'];
        if (valueToBoolean(roleFilterValue)) {
            const searchTxt = String(roleFilterValue).toLowerCase();
            whereList.push(
                where(fn('lower', col('roles.role')), Op.like, `%${searchTxt}%`)
            );
        }

        const { rows, count } = await this.roles.findAndCountAll({
            where: whereList,
            order,
            offset,
            limit,
            raw: true
        });
        console.log('List Roles - Retrieved Rows:', rows);
        return {
            data: rows,
            count,
        }
    }

    getPermissions = async (id: number): Promise<string[]> => {
        const userRoleKey = `user-role-${id}`;
        let roleId = this.nodeCache.get(userRoleKey);
        if (!valueToBoolean(roleId)) {
            const user = await users.findByPk(id);
            roleId = user?.role_id;
            this.nodeCache.set(userRoleKey, roleId);
        }
        const rolePermissionsKey = `role-permissions-${roleId}`;
        let rolePermissions = this.nodeCache.get(rolePermissionsKey);
        if (!valueToBoolean(rolePermissions)) {
            const permissionList = await role_has_permissions.findAll({
                where: [{ role_id: roleId }, where(col('permission.status'), 1)],
                attributes: [[col('permission.permission'), 'permission']],
                include: [
                    {
                        model: permissions,
                        attributes: [],
                    },
                ],
                raw: true,
            }) as unknown as Array<{ permission: string }>;
            rolePermissions =
                permissionList?.length > 0
                    ? permissionList.map((r) => r.permission.toString())
                    : [];
            this.nodeCache.set(rolePermissionsKey, rolePermissions);
        }
        return valueToBoolean(rolePermissions) ? (rolePermissions as string[]) : [];
    }
    getAllPermissions = async (): Promise<IPermission[]> => {
        const permissionList = await this.permissions.findAll({
            where: { status: 1 },
            order: [['permission', 'ASC']],
            raw: true,
        }) as unknown as IPermission[];
        return permissionList;
    }
    listRolePermissions = async (roleId: number): Promise<{ permissions: IPermission[]; role: string }> => {
        const selected = await this.roleHasPermissions.findAll({ where: { role_id: roleId }, raw: true }) as Array<{ permission_id?: number }>;
        const permIds = (selected || []).map((s) => s.permission_id).filter(Boolean) as number[];
        if (!permIds || permIds.length === 0) return { permissions: [], role: '' };
        const perms = await this.permissions.findAll({ where: { id: permIds, status: 1 }, raw: true }) as unknown as IPermission[];
        const role = await this.roles.findOne({ where: { id: roleId }, raw: true }) as { role?: string } | null;
        const roleName = role && role.role ? role.role : '';
        console.log('Role Permissions Data:', perms, roleName);
        return {
            permissions: perms,
            role: roleName,
        }
    }

    editRole = async (id: number, roleBody: IRole, userId: number) => {
        const { name, permissions } = roleBody;
        const role = await this.roles.findOne({ where: { role: name } });
        console.log('Edit Role - Found Role:', role);
        if (!role) {
            throw new BadRequestException(ERRORS_LITERAL.ROLE_NOT_FOUND);
        }
        const updated = await this.roles.update(
            {
                role: name,
                updated_by: userId,
                permissions: permissions,
            },
            { where: { id } }
        );
        console.log('Edit Role - Update Result:', updated);
        const existingPermissions = await this.permissions.findAll({
            where: {
                status: 1,
                id: permissions,
            },
            raw: true,
        }) as unknown as IPermission[];
        await this.roleHasPermissions.destroy({ where: { role_id: id } });
        await this.roleHasPermissions.bulkCreate(
            existingPermissions.map((p) => ({
                role_id: id,
                permission_id: p.id,
            }))
        );
    }

    deleteRole = async (id: number, data?: { enable?: boolean; disable?: boolean }) => {
        if (!id) {
            throw new BadRequestException('id is required');
        }
        console.log('Delete Role - Role ID:', id, "data:", data);
        if (data?.enable) {
            const updateRole1 = await this.roles.update({ status: 1 }, { where: { id } });
            console.log('Delete Role - Enable Role Result:', updateRole1, Boolean(updateRole1));
        } else {
            const updateRole = await this.roles.update({ status: 0 }, { where: { id } });
            console.log('Delete Role - disable Delete Result:', updateRole, Boolean(updateRole));
        }

    }
}

export default new RoleService();