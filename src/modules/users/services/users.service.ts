import {users} from '../../../models';
import { Op } from 'sequelize';
import {
  ConflictException,
  NotFoundException,
  BadRequestException,
} from "../../../utils/http";
import { hash } from "bcrypt";
import { BCRYPT_CONFIG } from "../../../config";
import {IRegisterUser} from '../interface'
import CacheService from '../../../shared/services/cache/cache.service';
import { valueToBoolean } from '../../../utils/common';
import loggerService from '../../../shared/services/logger.service';

export interface IUsersAccountService {
  createUser: (req: IRegisterUser) => Promise<users>;
}

export interface IUsersAccountServiceExtended extends IUsersAccountService {
  createUser: (req: IRegisterUser) => Promise<users>;
  getUsers: () => Promise<users[]>;
  updateUser: (id: number, updateData: Partial<users>) => Promise<users>;
  deleteUser: (id: number, hardDelete?: boolean) => Promise<void>;
}

class UsersAccountService {
  private nodeCache = new CacheService().getInstance();
  private users: typeof users;
  constructor() {
    this.users = users;
  }

  async createUser(userRegistrationData: IRegisterUser): Promise<users> {
    // check if user exits
    const isUserExits = await this.users.findOne({
      where: { email: userRegistrationData.email },
    });
    console.log("userRegistrationData:", userRegistrationData);
    if (isUserExits) {
      throw new ConflictException("User already exists");
    }
    const hashedPassword = await hash(userRegistrationData.password, BCRYPT_CONFIG.ROUNDS);
    userRegistrationData.password = hashedPassword; 
    const createUser = await this.users.create({...userRegistrationData, password: hashedPassword});
    const log = await loggerService.log({
            // userId: userId,
            action: "USER_CREATED",
            method: "POST",
            endpoint: "/users/create",
            reqBody: userRegistrationData,
            resBody: createUser,
            // ip_address: body.ip_address,
            statusCode: 201
        });
    return createUser;
  }
  async clearUserCache(id: number): Promise<void> {
    this.nodeCache.set(`user-role-${id}`, false);
    let roleId = this.nodeCache.get(`user-role-${id}`);
    if (!valueToBoolean(roleId)) {
      const user = await users.findByPk(id);
      roleId = user?.role_id;
      this.nodeCache.set(`user-role-${id}`, roleId);
    }
    await this.users.update(
      {
        login_token: null,
      },
      {
        where: { id },
      } 
    );

    // clear cache
    this.nodeCache.set(`role-permissions-${roleId}`, false);
    this.nodeCache.flushAll();
  }

  getUsers = async (): Promise<users[]> => {

    const usersList = await this.users.findAll({
      attributes: { exclude: ['password', 'login_token'] },
      order: [['id', 'ASC']],
      limit: 10,
    });
    return usersList;
  }
  updateUser = async (id: number, updateData: Partial<users>): Promise<users> => {
    if (!id || Number.isNaN(Number(id))) {
      throw new BadRequestException('Invalid id');
    }

    const existing = await this.users.findByPk(id);
    if (!existing) throw new NotFoundException('User not found');

    if (updateData.email && updateData.email !== existing.email) {
      const taken = await this.users.findOne({ where: { email: updateData.email } });
      if (taken) throw new ConflictException('Email already in use');
    }

    const toUpdate: Partial<any> = { ...updateData };
    if (toUpdate.password) {
      const hashed = await hash(String(toUpdate.password), BCRYPT_CONFIG.ROUNDS);
      toUpdate.password = hashed;
    }

    await this.users.update(toUpdate, { where: { id } });
    try { this.nodeCache.flushAll(); } catch (e) { }

    const updated = await this.users.findByPk(id, { attributes: { exclude: ['password', 'login_token'] } });
    if (!updated) throw new NotFoundException('User not found after update');
    return updated;
  }
  deleteUser = async (id: number, data: any): Promise<void> => {
    if (!id || Number.isNaN(Number(id))) {
      throw new BadRequestException('Invalid id');
    }

    try {
      const existing = await this.users.findByPk(id);
    if (!existing) throw new NotFoundException('User not found');
      console.log("data", data);
    if (data.enable) {
      const enable_user = await this.users.update({ is_active: true }, { where: { id } });
      console.log('enable user', enable_user)
    } else {
      const disable_user = await this.users.update({ is_active: false }, { where: { id } });
      console.log('disable user', disable_user);
    }
    } catch (error) {
      console.error('User not found', error);
    }
  }
  
  // getUsersWithOptions = async (opts?: {
  //   page?: number;
  //   size?: number;
  //   search?: string;
  //   orderBy?: string;
  //   order?: 'ASC' | 'DESC';
  //   useCache?: boolean;
  // }): Promise<{ rows: users[]; count: number }> => {
  //   const page = Math.max(1, Number(opts?.page ?? 1));
  //   const size = Math.min(1000, Math.max(1, Number(opts?.size ?? 50)));
  //   const offset = (page - 1) * size;
  //   const orderBy = opts?.orderBy || 'id';
  //   const order = opts?.order || 'ASC';
  //   const useCache = opts?.useCache ?? true;

  //   const cacheKey = `users:page=${page}:size=${size}:search=${opts?.search ?? ''}:orderBy=${orderBy}:order=${order}`;
  //   if (useCache) {
  //     const cached = this.nodeCache.get(cacheKey) as { rows: users[]; count: number } | undefined;
  //     if (cached) return cached;
  //   }

  //   const where: any = {};
  //   if (opts?.search) {
  //     const q = opts.search.trim();
  //     where[Op.or] = [
  //       { email: { [Op.iLike]: `%${q}%` } },
  //       { first_name: { [Op.iLike]: `%${q}%` } },
  //       { last_name: { [Op.iLike]: `%${q}%` } },
  //     ];
  //   }

  //   const result = await this.users.findAndCountAll({
  //     where,
  //     attributes: { exclude: ['password', 'login_token'] },
  //     order: [[orderBy, order]],
  //     limit: size,
  //     offset,
  //   });

  //   const payload = { rows: result.rows, count: result.count };
  //   if (useCache) this.nodeCache.set(cacheKey, payload, 60); // cache for 60s
  //   return payload;
  // };
}

export const UsersAccountServiceInstance = new UsersAccountService();
