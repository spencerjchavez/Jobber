import simpleContactFormProps from "src/features/forms/SimpleContactForm"
import ContractorProps from "src/global-types/ContractorProps"

interface JobCategoryDto {
    Id: string,
    Name: string,
}

interface ServiceAreaDto {
    Latitude: number,
    Longitude: number,
    Radius: number,
}

interface ImageDto {
    ImageThumbnail: string,
    Image: string,
}

interface ContractorDto {
    Id: number,
    Guid: string,
    FirstName: string,
    LastName: string,
    BioShort?: string,
    BioLong?: string,
    JobCategories?: JobCategoryDto[],
    Services?: string[],
    ServiceArea?: ServiceAreaDto,
    ProfilePicture?: ImageDto,
    Portfolio?: ImageDto[],
}

const ContractorDtoToContractorProps: (dto: ContractorDto) => ContractorProps = (dto) => {
    return {
        name: dto.FirstName + ' ' + dto.LastName,
        specialty: dto.BioShort ?? '',
        jobCategories: [],
        serviceArea: {
            location: {
                latitude: dto.ServiceArea!.Latitude,
                longitude: dto.ServiceArea!.Longitude,
            },
            radius: dto.ServiceArea!.Radius,
        },
        contractorId: dto.Guid,
        profilePicture: dto.ProfilePicture ? {
            image: dto.ProfilePicture.Image,
            imageThumbnail: dto.ProfilePicture.ImageThumbnail,
        } : undefined,
        portfolioImages: dto.Portfolio?.map((image) => {
            return {
                image: image.Image,
                imageThumbnail: image.ImageThumbnail,
            }
        }) ?? [],
        services: [],
        about: "",
        contactForm: simpleContactFormProps
    }
}

export const ParseContractorProps: (json: any) => ContractorProps[] = (json: any) => {
    const contractorDtos: ContractorDto[] = json;
    return contractorDtos.reduce<ContractorProps[]>((contractorProps, dto) => {
        try {
            contractorProps.push(ContractorDtoToContractorProps(dto));
        } catch (err) {
            console.log(err);
        }
        return contractorProps;
    }, [])
}