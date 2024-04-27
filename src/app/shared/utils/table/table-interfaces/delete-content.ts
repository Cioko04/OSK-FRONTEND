import { FormType } from 'src/app/forms/core/data-types/FormType';

export interface DeleteContent {
  id: number;
  formType?: FormType;
  sourceId?: number;
}
