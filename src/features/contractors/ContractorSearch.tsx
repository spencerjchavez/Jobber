import { useDispatch, useSelector } from "react-redux";
import MainContainer from "../../components/MainContainer";
import { AppDispatch, RootState } from "src/store/store";
import { toggleCategoryOnFilter } from "../../store/contractorsSlice";
import ContractorListItem from "./ContractorListItem";

const ContractorSearch: React.FC = () => {

    const { contractorProps, jobCategoryFilter } = useSelector((state: RootState) => state.contractors);
    const dispatch: AppDispatch = useDispatch();

    return <MainContainer 
    sidebarLeft={<>
        <h3 className="text-center">Search Categories</h3>
        {Array.from(jobCategoryFilter.keys()).sort().map((jobCategory) => {
            return <a className="btn btn-outline color-primary btn-capsule w-100" onClick={() => dispatch(toggleCategoryOnFilter(jobCategory))}>{jobCategory}</a>
        })}
    </>}
    mainContent={<div className="row w-100">
        <div className="col-12">
            {Array.from(contractorProps.values()).map((contractorProps) => {
                return <ContractorListItem key={contractorProps.contractorId} {...contractorProps} />
            })}
        </div>
    </div>} />
}

export default ContractorSearch;
