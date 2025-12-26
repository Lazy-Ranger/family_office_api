import { Entity } from '../../../models';
import { IEntity } from '../interfaces';

export interface IEntityService {

  getEntity: ( groupId?: number) => Promise<IEntity[]>;
}

class EntityService implements IEntityService {
  private entityModel = Entity;
  constructor() {
    this.entityModel = Entity;
  }

  getEntity = async ( groupId?: number) => {
    const entityData = await this.entityModel.findAll({
    where: {
      group_id: groupId,
      status: 'active'
    }
  });
    return entityData as Entity[];
  }
}

export default EntityService;
