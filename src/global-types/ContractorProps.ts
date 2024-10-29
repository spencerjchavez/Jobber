import FormProps from "./FormProps";
import ServiceAreaProps from "./ServiceAreaProps";

export default interface ContractorProps {
    name: string;
    specialty: string;
    jobCategories: string[];
    serviceArea: ServiceAreaProps;
    contractorId: number;
    profilePicture: string;
    portfolioImages: string[];
    services: string[];
    about: string;
    contactForm: FormProps;
}