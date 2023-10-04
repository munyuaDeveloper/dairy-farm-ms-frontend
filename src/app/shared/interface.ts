export interface FieldOption {
    id: string;
    name: string;
    category_field: string;
}

export interface CategoryFormFields {
    id: string;
    name: string;
    code: string;
    place_holder: string;
    input_type: string;
    field_type: string;
    category: string;
    required: boolean;
    field_options: FieldOption[];
    is_filterable: boolean;
}