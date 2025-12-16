import {users} from '../../../models';
import {  Order } from 'sequelize';
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
import { FindOptions } from 'sequelize';


export interface IUsersAccountService {
  createUser: (req: IRegisterUser) => Promise<users>;
}

export interface IUsersAccountServiceExtended extends IUsersAccountService {
  createUser: (req: IRegisterUser) => Promise<users>;
  getUsers: (options?: { page?: number; limit?: number; filters?: FindOptions['where']; sortField?: string; sortOrder?: 'ASC' | 'DESC' }) => Promise<{ data: users[]; total: number; page: number; limit: number; }>;
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

async getUsers(options?: {
  page?: number;
  limit?: number;
  filters?: FindOptions['where'];
  sortField?: string;
  sortOrder?: 'ASC' | 'DESC';
}) {
  try {
    const page = options?.page ?? 1;
    const limit = options?.limit ?? 10;
    const offset = (page - 1) * limit;

    const where = options?.filters ?? {};

    const order: Order = options?.sortField
      ? [[options.sortField, options.sortOrder ?? 'ASC']]
      : [['created_at', 'DESC']];

    const result = await this.users.findAndCountAll({
      where,
      offset,
      order,
      limit,
      include: [{ all: true, nested: true }],
    });

    return {
      data: result.rows,
      total: result.count,
      page,
      limit
    };
  } catch (error) {
    throw error;
  }
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
}

export const UsersAccountServiceInstance = new UsersAccountService();
