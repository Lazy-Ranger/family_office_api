import {
  UsersAccountServiceInstance,
  IUsersAccountService,
} from '../../users/services';
import { LoggedInResponse, User, UserSession } from "../../../interfaces";
import { JwtService } from "../../../shared/services";
import { users } from '../../../models'
import bcrypt from 'bcrypt';
import { NotFoundException, UnauthorizedException } from "../../../utils/http";
import RoleService from '../../roles/service/role.service';
import {ILoginUser} from '../interfaces'
import loggerService from '../../../shared/services/logger.service';

export interface IAuthService {
  login: (req: ILoginUser, ip_address?: string) => Promise<LoggedInResponse>;
  register: (userData: any, ip_address?: string) => Promise<User>;
  logout: (userId: number, ip_address?: string) => Promise<void>;
}

class AuthService implements IAuthService {
  private readonly usersAccountService: IUsersAccountService;
  private roleService: typeof RoleService;
  private users: typeof users;
  constructor() {
    this.users = users;
    this.usersAccountService = UsersAccountServiceInstance;
    this.roleService = RoleService;
  }

  async register(userData: any, ip_address?: string): Promise<User> {
    // Hash the password before storing
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);
    
    // Create the user
    const user = await this.users.create(userData);
    // Remove sensitive data
    const { password, ...userWithoutPassword } = user.toJSON();
    await loggerService.log({
        userId: user.id,
        action: "USER_SIGNED_UP",
        method: "POST",
        endpoint: "/auth/register",
        reqBody: userData,
        ip: ip_address, 
        statusCode: 201
    });
    return userWithoutPassword;
  }

  private toJWTPayload(user: users): UserSession {
    return {
      id: user.id as number,
      email: user.email as string,
      roleId: user.role_id as number,
      profile: {
        name: `${user.first_name} ${user.last_name}`,
      },
    };
  }

  private toUserData(user: users): User {
    const userDoc = user.toJSON() as unknown as User;

    delete (userDoc as any).password;

    return userDoc;
  }

  async login(loginReq: ILoginUser, ip_address?: string): Promise<LoggedInResponse> {
    const existingUser = await this.users.findOne({
      where: { email: loginReq.email },
    });

    if (!existingUser) {
      throw new NotFoundException("User not found");
    }
    const isPasswordValid = await this.comparePassword(
      loginReq.password,
      existingUser.password
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
     const log = await loggerService.log({
        userId: existingUser.id,
        action: "USER_LOGIN",
        method: "POST",
        endpoint: "/auth/login",
        reqBody: loginReq,
        ip: ip_address,
        statusCode: 201
    });
    // create session
    return await this.createSession(existingUser);
  }

  async logout(userId: number, ip_address?: string): Promise<void> {
    // TODO: logout user
    const userService = UsersAccountServiceInstance;
    await userService.clearUserCache(userId);
     const log = await loggerService.log({
            userId: userId,
            action: "USER_LOGOUT",
            method: "POST",
            endpoint: `/auth/logout/${userId}`,
            reqBody: null,
            ip: ip_address,
            statusCode: 201
        });
  }
 
  private async createSession(
    user: users
  ): Promise<LoggedInResponse> {
    // token payload prepare
    const jwtPayload = this.toJWTPayload(user);

    // create token
    const token = JwtService.sign(jwtPayload);
    const permission = await RoleService.getPermissions(user.id);

    // response
    return {
      user: this.toUserData(user),
      permissions: permission,
      token,
    };
  }

   comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}

export default new AuthService();
