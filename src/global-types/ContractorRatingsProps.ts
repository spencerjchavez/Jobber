import ContractorRating from "./ContractorRating";

export default interface ContractorRatingsProps {
    contractorId: number;
    ratings: ContractorRating[];
    avgStars: number;
};