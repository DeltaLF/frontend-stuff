type ValidationRule<DataModelType> = {
  [Property in keyof DataModelType]?: (v: DataModelType[Property]) => boolean;
};
/*
   onChange={formSetter.account}
   (event):void
   setDataModel[key] = event.target.value;
   setDataModel({...dataModel, [key]: event.target.value})
  */
// type FormSetter: React.ChangeEvent
type FormSetter<DataModelType> = {
  [Property in keyof DataModelType]?: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
};

type ValidationResult<DataModelType> = {
  [Property in keyof DataModelType]?: { error?: string };
};

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export type { ValidationRule, FormSetter, ValidationResult, Entries };
