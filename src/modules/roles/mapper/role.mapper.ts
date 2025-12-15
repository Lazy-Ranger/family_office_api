import { roles } from '../../../models';

export interface IRoleDto {
	id?: number;
	name: string;
	status: number;
	createdBy?: string | number;
	updatedBy?: string | number;
	approvedBy?: string | number;
	createdAt?: Date;
	updatedAt?: Date;
}

export class RoleMapper {
	static toRoleDto(r: roles | Record<string, any>): IRoleDto {
		const name = r.role ?? '';
		const status = r.status ?? 0;
		const createdBy = r.created_by;
		const updatedBy = r.updated_by;
		const approvedBy = r.approved_by;
		const createdAt = r.created_at ?? r.createdAt;
		const updatedAt = r.updated_at ?? r.updatedAt;
		const id = r.id ?? undefined;

		return {
			id,
			name,
			status: Number(status),
			createdBy,
			updatedBy,
			approvedBy,
			createdAt: createdAt ? new Date(createdAt) : undefined,
			updatedAt: updatedAt ? new Date(updatedAt) : undefined,
		};
	}

	static toRoleDtos(arr: Array<roles | Record<string, any>>): IRoleDto[] {
		return arr.map((r) => RoleMapper.toRoleDto(r));
	}
}

export default RoleMapper;

