import FormFieldType from 'src/global-types/FormFieldType';
import { telPattern } from './form-fields/InputPatterns';
import FormProps from 'src/global-types/FormProps';

const simpleContactFormProps: FormProps = {
        userId: 1,
        fields: [
            {
                formFieldType: FormFieldType.SingleLineInput,
                data: {
                    label: 'First Name:',
                    type: "text",
                },
                required: true,
                name: "firstName",
                errorElement: <p>Fix this you fool</p>,
                colClassName: 'col-6',
            },
            {
                formFieldType: FormFieldType.SingleLineInput,
                data: {
                    label: 'Last Name:',
                    type: "text",
                },
                required: true,
                name: "lastName",
                errorElement: <p>Fix this you fool</p>,
                colClassName: 'col-6'
            },
            {
                formFieldType: FormFieldType.SingleLineInput,
                data: {
                    label: 'Email:',
                    type: "email",
                },
                required: true,
                name: "email",
                errorElement: <p>Fix this you fool</p>,
                colClassName: 'col-6'
            },
            {
                formFieldType: FormFieldType.SingleLineInput,
                data: {
                    label: 'Phone:',
                    type: "tel",
                    pattern: telPattern,
                },
                name: "phone",
                errorElement: <p>Fix this you fool</p>,
                colClassName: 'col-6'
            },
            {
                formFieldType: FormFieldType.MultiLineInput,
                data: {
                    label: 'Describe Your Project:',
                    type: "text",
                    size: "medium",
                },
                required: true,
                name: "projectDescription",
                errorElement: <p>Fix this you fool</p>,
            }
        ],
        submitButtonText: "Get A Quote"
}

export default simpleContactFormProps;
