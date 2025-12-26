import { Request, Response } from 'express';
import { httpException, httpOK } from '../../../utils/http';
import { IFormService } from '../services';
import FormService from '../services/form.service';

class FormController {
    private service: IFormService;

    constructor() {
        this.service = new FormService();
    }

  formmaster  = async (req: Request, res: Response) => {
		try {
            const subcategoryId = parseInt(req.query.subcategory_id as string, 10);
            const data = await this.service.form(subcategoryId);
            httpOK(res, data);
        } catch (err) {
			httpException(res, err, `[FormController:] cannot list the data`);
		}
};
}

export default new FormController();

