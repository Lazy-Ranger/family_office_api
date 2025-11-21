import { Request, Response } from 'express';
import { httpException, httpOK } from '../../../utils/http';
import MasterServiceInstance, { IMasterService } from '../services/master.service';

class MasterController {
	private service: IMasterService;

	constructor() {
		this.service = MasterServiceInstance;
	}

	master = async (req: Request, res: Response) => {
		try {
            const user = (req as any).user;
            const userId = user?.id;
			const data = await this.service.master(userId);
			httpOK(res, data);
		} catch (err) {
			httpException(res, err, `[MasterController:] cannot list the data`);
		}
	};

}

export default new MasterController();

