export interface FieldOption {
    _id: string;
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
    value?: any;
    field_options: FieldOption[];
    is_filterable: boolean;
}

export interface CowRecord {
    _id: string
    name: string
    cow_control_number: string
    gender: string
    image: string
    status: string
    date_of_birth: string
    category: Category
    dam: string
    sire: string
    createdAt: string
    __v: number
  }
  
  export interface Category {
    _id: string
    name: string
    description: string
  }

  export interface MilkRecord {
    _id: string
    liters_per_day: number
    date: string
    cow: Cow
    createdAt: string
    __v: number
  }
  
  export interface Cow {
    _id: string
    name: string
    cow_control_number: string
  }

  export interface Staff {
    _id: string
    first_name: string
    last_name: string
    phone_number: number
    email: string
    role: string
    createdAt: string
    __v: number
  }