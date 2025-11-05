import {users} from '../../../models';
import {
  // NotFoundException,
  // UnauthorizedException,
  ConflictException,
} from "../../../utils/http";
import { hash } from "bcrypt";
import { BCRYPT_CONFIG } from "../../../config";

export interface IUsersAccountService {
  createUser: (req: Record<string, string>) => Promise<users>;
}

class UsersAccountService {
  private users: typeof users;
  constructor() {
    this.users = users;
  }

  async createUser(userRegistrationData: Record<string, string>) {
    // check if user exits
    const isUserExits = await this.users.findOne({
      where: { email: userRegistrationData.email },
    });

    if (isUserExits) {
      throw new ConflictException("User already exists");
    }
    const hashedPassword = await hash(userRegistrationData.password, BCRYPT_CONFIG.ROUNDS);
    userRegistrationData.password = hashedPassword; 
    delete userRegistrationData.password;
    const createUser = await this.users.create(userRegistrationData);

    return createUser;
  }
}

export const UsersAccountServiceInstance = new UsersAccountService();
