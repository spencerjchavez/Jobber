import './ContractorSearch.scss';
import { useDispatch, useSelector } from "react-redux";
import MainContainer from "src/components/MainContainer";
import { RootState } from "src/store/store";
import { toggleCategoryOnFilter } from "src/store/contractorsSlice";
import ContractorListItem from "./ContractorListItem";
import { getDistance } from "geolib";

const ContractorSearch: React.FC = () => {
    const { contractorProps, jobCategoryFilter } = useSelector((state: RootState) => state.contractors);
    const { location } = useSelector((state: RootState) => state.place);

    const dispatch = useDispatch();

    return <div className="section">
        <MainContainer 
        sidebarLeft={<div>
            <h3 className="text-center">Contractor Type</h3>
            {Array.from(Object.entries(jobCategoryFilter)).sort().map((filterEntry) => {
                const jobCategory = filterEntry[0];
                const isActive = filterEntry[1];
                return <a key={jobCategory} className={`btn ${isActive ? 'btn-standard' : 'btn-outline'} color-primary btn-capsule w-100`} onClick={() => dispatch(toggleCategoryOnFilter(jobCategory))}>{jobCategory}</a>
            })}
        </div>}
        mainContent={<div className="row">
            {Array.from(Object.values(contractorProps)).map((contractorProps) => {
                let show = false;
                if(location) { 
                    const distanceMiles = getDistance(contractorProps.serviceArea.location, location) / 1609.34;
                    if (distanceMiles < contractorProps.serviceArea.radius) {
                        const isJobCategoryFilterEmpty = () => {
                            return !Object.values(jobCategoryFilter).reduce((prev, jobCategory) => jobCategory || prev, false);
                        };
                        if(isJobCategoryFilterEmpty()) {
                            show = true;
                        } else {
                            contractorProps.jobCategories.forEach((jobCategory) => {
                                if(jobCategoryFilter[jobCategory]) {
                                    show = true;
                                }
                            })
                        }
                    }
                }
                return show && <div className="col-12">
                    <ContractorListItem key={contractorProps.contractorId} {...contractorProps} />
                </div>;
            })}
        </div>} />
    </div>
}

export default ContractorSearch;
