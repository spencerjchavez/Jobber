import ContractorRating from "./ContractorRating";

export default interface ContractorRatingsProps {
    contractorId: string;
    ratings: ContractorRating[];
    avgStars: number;
};

export const EmptyContractorRatings = {
    contractorId: '-1',
    ratings: [],
    avgStars: 0,
};