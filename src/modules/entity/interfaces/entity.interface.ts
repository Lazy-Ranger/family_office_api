export interface IEntity {
  id: number;
  name: string;
  type?: string;
  icon?: string;
  color?: string;
  address1?: string;
  address2?: string;
  city?: string;
  pincode?: string;
  state?: string;
  phone_no?: number;
  mobile_no?: number;
  email?: string;
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


