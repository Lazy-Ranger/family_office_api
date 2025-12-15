import { users } from '../../../models';

export interface IUserDto {
  id: number;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  roleId: number;
  phoneNumber?: string | null;
  isActive: boolean;
  lastLogin?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export class UserMapper {
  static toUserDto(u: users | Record<string, any>): IUserDto {
    const id = u.id as number;
    const firstName = u.first_name || '';
    const lastName = u.last_name || '';
    const email = u.email as string;
    const roleId = u.role_id || 0;
    const phoneNumber = u.phone_number ?? null;
    const isActive = u.is_active ?? true;
    const lastLogin = u.last_login ?? null;
    const createdAt = u.created_at ?? u.createdAt;
    const updatedAt = u.updated_at ?? u.updatedAt;

    return {
      id,
      firstName,
      lastName,
      name: `${firstName}${lastName ? ' ' + lastName : ''}`.trim(),
      email,
      roleId,
      phoneNumber,
      isActive: Boolean(isActive),
      lastLogin: lastLogin ? new Date(lastLogin) : null,
      createdAt: createdAt ? new Date(createdAt) : undefined,
      updatedAt: updatedAt ? new Date(updatedAt) : undefined,
    };
  }

  static toUserDtos(usersArr: Array<users | Record<string, any>>): IUserDto[] {
    return usersArr.map((u) => UserMapper.toUserDto(u));
  }
}

export default UserMapper;
