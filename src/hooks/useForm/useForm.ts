import { useState } from 'react';
import {
  ValidationRule,
  FormSetter,
  ValidationResult,
  Entries,
} from './useForm.type';

function useForm<T extends object>(
  initDataModel: T,
  validationRule: ValidationRule<T>
): [T, FormSetter<T>, ValidationResult<T>] {
  const [dataModel, setDataModel] = useState<T>(initDataModel);
  const validationResult: ValidationResult<T> = {};
  const formSetter: FormSetter<T> = {};
  for (const [key, value] of Object.entries(dataModel) as Entries<T>) {
    formSetter[key] = (event) => {
      setDataModel({ ...dataModel, [key]: event.target.value });
    };
    if (validationRule[key]!(value)) {
      validationResult[key] = { error: `invalid input of ${key.toString()}` };
    } else {
      validationResult[key] = {};
    }
  }

  return [dataModel, formSetter, validationResult];
}

export { useForm };
