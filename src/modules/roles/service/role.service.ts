import { permissions, roles, role_has_permissions, users } from '../../../models'
import { col, where, Op, Order, Sequelize, WhereOptions, fn, } from 'sequelize';
import CacheService from '../../../shared/services/cache/cache.service';
import { BadRequestException } from "../../../utils/http";
import { valueToBoolean } from '../../../utils/common';
import { ERRORS_LITERAL } from '../../../config'
import { IRole, IGetBody } from '../interfaces'


export interface IRoleService {
    createRole: (roleBody: IRole, userId: number) => Promise<void>;
    getPermissions: (id: number) => Promise<string[]>;
    listRoles: (body: IGetBody) => Promise<{ data: roles[], count: number }>;
}


class RoleService {
    private nodeCache = new CacheService().getInstance();
    private roles: typeof roles;
    private roleHasPermissions: typeof role_has_permissions;
    private permissions: typeof permissions;

    constructor() {
        this.roles = roles;
        this.roleHasPermissions = role_has_permissions;
        this.permissions = permissions;
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
        const filter = JSON.parse(filters);
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

        if (valueToBoolean(filter.role)) {
            const searchTxt = filter.role.toLowerCase();
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
            });
            rolePermissions =
                permissionList?.length > 0
                    ? permissionList.map((r) => r.permission.toString())
                    : [];
            this.nodeCache.set(rolePermissionsKey, rolePermissions);
        }
        return valueToBoolean(rolePermissions) ? (rolePermissions as string[]) : [];
    }

}

export default new RoleService();