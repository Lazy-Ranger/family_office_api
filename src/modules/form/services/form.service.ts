import { formconfig } from '../../../models';
import { IFormConfig } from '../interfaces';

export interface IFormService {

  form: ( subcategoryId?: number) => Promise<IFormConfig | null>;
}

class FormService implements IFormService {
  private formModel = formconfig;
  constructor() {
    this.formModel = formconfig;
  }

  form = async ( subcategoryId?: number) => {
    const FormData = await this.formModel.findOne({
      where: { assetSubcategoryId: subcategoryId, isActive: true },
      raw: true,
    });
    console.log('FormData', FormData);
    return FormData as IFormConfig | null;
  }
}

export default FormService;
