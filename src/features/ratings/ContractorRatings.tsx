import ContractorRatingsProps from "src/global-types/ContractorRatingsProps";

interface Props extends ContractorRatingsProps {
    type: string;
}

const ContractorRatings: React.FC<Props> = (props) => {
    switch(props.type) {
        case 'condensed':

    }
    return <></>

}

export default ContractorRatings;