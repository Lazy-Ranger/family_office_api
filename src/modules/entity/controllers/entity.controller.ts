import { Request, Response } from 'express';
import { httpException, httpOK } from '../../../utils/http';
import EntityService, { IEntityService } from '../services/entity.service';

class EntityController {
    private service: IEntityService

    constructor() {
        this.service = new EntityService();
    }

    getEntity = async (req: Request, res: Response) => {
        try {
            const groupId = parseInt(req.query.group_id as string, 10);
            const data = await this.service.getEntity(groupId);
            httpOK(res, data);
        } catch (err) {
            httpException(res, err, `[EntityController:] cannot list the data`);
        }
    };

}

export default new EntityController();

