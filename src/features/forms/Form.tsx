import FormProps from "src/global-types/FormProps";
import { useState } from "react";
import FormField from "./form-fields/FormField";
import { Form as BootstrapForm, Button } from 'react-bootstrap';

const Form: React.FC<FormProps> = (formProps) => {

    const [invalidFields, setInvalidFields] = useState(new Set<string>());
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newInvalidFields = new Set<string>();
        if(!event.currentTarget.checkValidity()) {
            Array.from(event.currentTarget.elements).forEach( element => {
                const input = element as HTMLInputElement;
                if(!input.validity.valid) {
                    newInvalidFields.add(input.name);
                }
            })
        }
        setInvalidFields(newInvalidFields);
        const formData = new FormData(event.currentTarget);
        // send formData to service layer
    }

    return <BootstrapForm noValidate className="form" onSubmit={handleSubmit} >
        <div className="row gx-4 gy-0">
            {
                formProps.fields.map((fieldProps, i) => {
                    return <div className={(fieldProps.colClassName ?? "col-12") + ' mb-2 '} key={i}>
                        <FormField {...fieldProps} valid={!invalidFields.has(fieldProps.name)}/>
                    </div>
                })
            }
            <div className="col-12">
                <Button type="submit" className="btn btn-standard btn-color-primary">{formProps.submitButtonText}</Button>
                <p><s>*</s>Required Field</p>
                { invalidFields.size > 0 && <p className="color-warn">Please correct the errors above</p>}
            </div>
        </div>
    </BootstrapForm>
}

export default Form;