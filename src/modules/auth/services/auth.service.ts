// import { LoginUserDTO, RegisterUserDTO } from "../dtos";
import {
  UsersAccountServiceInstance,
  IUsersAccountService,
} from '../../users/services';
import { LoggedInResponse, User, UserSession } from "../../../interfaces";
import { JwtService } from "../../../shared/services";
import { users } from '../../../models'
import bcrypt from 'bcrypt';
import { NotFoundException, UnauthorizedException } from "../../../utils/http";

export interface IAuthService {
  createAccount: (req: Record<string, string>) => Promise<LoggedInResponse>;
  login: (req: Record<string, string>) => Promise<LoggedInResponse>;
}

class AuthService implements IAuthService {
  private readonly usersAccountService: IUsersAccountService;
  private users: typeof users;
  constructor() {
    this.users = users;
    this.usersAccountService = UsersAccountServiceInstance;
  }

  private toJWTPayload(user: users): UserSession {
    return {
      _id: user.id as number,
      email: user.email as string,
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

  async createAccount(userRegistrationData: Record<string, string>) {
    const createdUser = await this.usersAccountService.createUser(
      userRegistrationData
    );

    // create session
    return await this.createSession(createdUser);
  }

  async login(loginReq: Record<string, string>) {
    // check exists + password match
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

    // create session
    return await this.createSession(existingUser);
  }

  private async createSession(
    user: users
  ): Promise<LoggedInResponse> {
    // token payload prepare
    const jwtPayload = this.toJWTPayload(user);

    // create token
    const token = JwtService.sign(jwtPayload);

    // response
    return {
      user: this.toUserData(user),
      token,
    };
  }

   comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}

export default new AuthService();
