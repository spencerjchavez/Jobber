import { Form as BootstrapForm } from 'react-bootstrap';
import FormFieldValidatedProps from "./FormFieldValidatedProps";
import MultiLineInputProps from './MultiLineInputProps';

const MultiLineInput: React.FC<MultiLineInputProps & FormFieldValidatedProps> = (props) => {

    return <BootstrapForm.Group>
        <BootstrapForm.Label className="field-label">{(props.required ? <s>*</s> : <></>)}{props.label}</BootstrapForm.Label>
        <BootstrapForm.Control 
            as="textarea"
            name={props.name}
            required={props.required}
            isInvalid={!props.valid}
            type={props.type ?? "text"}
            pattern={props.pattern}
            placeholder={props.placeholder ?? ''} 
            rows={props.size == 'large' ? 10 : props.size == 'medium' ? 6 : 3} />
        <BootstrapForm.Control.Feedback type="invalid">{props.errorElement}</BootstrapForm.Control.Feedback>
    </BootstrapForm.Group>
}

export default MultiLineInput;