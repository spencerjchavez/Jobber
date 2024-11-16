import ContractorRating from "./ContractorRating";

export default interface ContractorRatingsProps {
    contractorId: number;
    ratings: ContractorRating[];
    avgStars: number;
};

export const EmptyContractorRatings = {
    contractorId: -1,
    ratings: [],
    avgStars: 0,
};