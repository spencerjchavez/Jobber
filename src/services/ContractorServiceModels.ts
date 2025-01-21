import simpleContactFormProps from "src/features/forms/SimpleContactForm"
import ContractorProps from "src/global-types/ContractorProps"

interface JobCategoryDto {
    id: string,
    name: string,
}

interface ServiceAreaDto {
    latitude: number,
    longitude: number,
    radius: number,
}

interface ImageDto {
    imageThumbnail: string,
    image: string,
}

interface ContractorDto {
    id: number,
    guid: string,
    firstName: string,
    lastName: string,
    bioShort?: string,
    bioLong?: string,
    jobCategories?: JobCategoryDto[],
    services?: string[],
    serviceArea?: ServiceAreaDto,
    profilePicture?: ImageDto,
    portfolio?: ImageDto[],
}

const ContractorDtoToContractorProps: (dto: ContractorDto) => ContractorProps = (dto) => {
    return {
        name: dto.firstName + ' ' + dto.lastName,
        specialty: dto.bioShort ?? '',
        jobCategories: [],
        serviceArea: {
            location: {
                latitude: dto.serviceArea!.latitude,
                longitude: dto.serviceArea!.longitude,
            },
            radius: dto.serviceArea!.radius,
        },
        contractorId: dto.guid,
        profilePicture: dto.profilePicture ? {
            image: dto.profilePicture.image,
            imageThumbnail: dto.profilePicture.imageThumbnail,
        } : undefined,
        portfolioImages: dto.portfolio?.map((image) => {
            return {
                image: image.image,
                imageThumbnail: image.imageThumbnail,
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