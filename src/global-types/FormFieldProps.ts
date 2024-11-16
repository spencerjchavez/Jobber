import { ReactNode } from "react";
import FormFieldType from "./FormFieldType";

export default interface FormFieldProps {
    formFieldType : FormFieldType;
    name: string;
    data: any;
    required?: boolean;
    errorMessage?: string;
    colClassName?: string;
}