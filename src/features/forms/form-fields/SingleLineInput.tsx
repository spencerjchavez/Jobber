import { Form as BootstrapForm } from 'react-bootstrap';
import FormFieldValidatedProps from "./FormFieldValidatedProps";
import TextInputProps from './TextInputProps';

const SingleLineInput: React.FC<TextInputProps & FormFieldValidatedProps> = (props) => {

    return <BootstrapForm.Group>
        <BootstrapForm.Label className="field-label">{(props.required ? <s>*</s> : <></>)}{props.label}</BootstrapForm.Label>
        <BootstrapForm.Control 
            name={props.name}
            required={props.required}
            isInvalid={!props.valid}
            type={props.type ?? "text"}
            pattern={props.pattern}
            placeholder={props.placeholder ?? ''} />
        <BootstrapForm.Control.Feedback type="invalid">{props.errorElement}</BootstrapForm.Control.Feedback>
    </BootstrapForm.Group>
}

export default SingleLineInput;