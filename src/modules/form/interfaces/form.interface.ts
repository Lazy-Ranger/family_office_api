type BlockType = 'section' | 'collapsible' | 'tab';
type FieldType =
  | 'text'
  | 'number'
  | 'date'
  | 'select'
  | 'switch'
  | 'file'
  | 'textarea';

interface FormBlock {
  block_id: string;
  block_name: string;
  block_type: BlockType;
  block_order: number;
  condition?: FieldCondition;
  form_data: Array<FormField | FormBlock>;
}
interface FunctionTrigger {
  code: string;
}

interface FieldFunctionMap {
  pre?: FunctionTrigger;
  post?: FunctionTrigger;
  onChange?: FunctionTrigger;
}

interface FunctionData {
  [fieldKey: string]: FieldFunctionMap;
}

interface FormField {
  id: string;
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  default_value?: unknown;
  readonly?: boolean;
  derived_from?: string;
  options?: SelectOption[];
  options_source?: SelectOptionSource[];
  validation?: ValidationRule[];
  condition?: FieldCondition;
}

interface SelectOptionSource {
    type: string,
    endpoint: string,
    label_key: string,
    value_key: string,
    params: Record<string, unknown>
}
interface SelectOption {
  label: string;
  value: string;
}
interface ValidationRule {
  type: string;
  value?: unknown;
  message?: string;
}

interface FieldCondition {
  depends_on: string;
  operator: 'equals';
  value: unknown;
  action: 'show' | 'hide';
}
interface ConditionGroup {
  rules: Array<{
    depends_on: string;
    operator: 'equals';
    value: unknown;
    actions: Array<{
      field_id: string;
      show?: boolean;
      required?: boolean;
    }>;
  }>;
}
export interface IFormConfig {
  id: number;
  assetSubcategoryId: number;
  formData: FormBlock[];
  conditionData?: ConditionGroup[] | null;
  function_data?: FunctionData | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  name: string;
}
