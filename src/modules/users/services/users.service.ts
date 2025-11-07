import {users} from '../../../models';
import {
  // NotFoundException,
  // UnauthorizedException,
  ConflictException,
} from "../../../utils/http";
import { hash } from "bcrypt";
import { BCRYPT_CONFIG } from "../../../config";
import {IRegisterUser} from '../interface'

export interface IUsersAccountService {
  createUser: (req: IRegisterUser) => Promise<users>;
}

class UsersAccountService {
  private users: typeof users;
  constructor() {
    this.users = users;
  }

  async createUser(userRegistrationData: IRegisterUser): Promise<users> {
    // check if user exits
    const isUserExits = await this.users.findOne({
      where: { email: userRegistrationData.email },
    });

    if (isUserExits) {
      throw new ConflictException("User already exists");
    }
    const hashedPassword = await hash(userRegistrationData.password, BCRYPT_CONFIG.ROUNDS);
    userRegistrationData.password = hashedPassword; 
    const createUser = await this.users.create({...userRegistrationData, password: hashedPassword});

    return createUser;
  }
}

export const UsersAccountServiceInstance = new UsersAccountService();
