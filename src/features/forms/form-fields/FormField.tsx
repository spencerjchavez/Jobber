import FormFieldType from "src/global-types/FormFieldType";
import SingleLineInput from "./SingleLineInput";
import FormFieldValidatedProps from "./FormFieldValidatedProps";
import TextInputProps from "./TextInputProps";
import MultiLineInput from "./MultiLineInput";
import MultiLineInputProps from "./MultiLineInputProps";

const FormField: React.FC<FormFieldValidatedProps> = (props) => {
    try {
        switch(props.formFieldType) {
            case FormFieldType.SingleLineInput:
                const singleLineInputProps = props.data as TextInputProps;
                return <SingleLineInput {...singleLineInputProps} {...props} />;
            case FormFieldType.MultiLineInput:
                const multiLineInputProps = props.data as MultiLineInputProps;
                return <MultiLineInput {...multiLineInputProps} {...props} />;
            case FormFieldType.Checkboxes:
                return <></>;
            case FormFieldType.RadioButtons:
                return <></>;
        }
        return <></>;
    } catch (error) {
        return <></>;
    }
}

export default FormField;