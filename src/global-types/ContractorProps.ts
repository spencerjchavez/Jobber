import FormProps from "./FormProps";
import Image from "./Image";
import ServiceAreaProps from "./ServiceAreaProps";

export default interface ContractorProps {
    name: string;
    specialty: string;
    jobCategories: string[];
    serviceArea: ServiceAreaProps;
    contractorId: string;
    profilePicture?: Image;
    portfolioImages: Image[];
    services: string[];
    about: string;
    contactForm: FormProps;
}