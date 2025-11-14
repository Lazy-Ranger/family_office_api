export interface IEntity {
  id?: number;
  entityName: string;

  address1?: string;
  address2?: string;
  city?: string;
  pincode?: string;
  state?: string;

  panNumber?: string;
  occupation?: string;
  status?: string;

  groupId?: number;       // FK to family.id
  groupName?: string;

  advisorId?: number;
  advisorName?: string;

  createdAt?: Date;
  updatedAt?: Date;
}


