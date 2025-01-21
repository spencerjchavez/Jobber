import './ContractorSearch.scss';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/store/store";
import ContractorListItem from "./ContractorListItem";
import { getDistance } from "geolib";
import Loading from '../loading/Loading';
import { useEffect } from 'react';
import Contractor from './Contractor';
import ContractorSearchMap from './ContractorSearchMap';
import { setCenter } from 'src/store/contractorSearchMapSlice';

const ContractorSearch: React.FC = () => {
    const { contractorProps, jobCategoryFilter } = useSelector((state: RootState) => state.contractors);
    const { clientCoordinate } = useSelector((state: RootState) => state.place);
    const { selectedContractorId } = useSelector((state: RootState) => state.contractorSearchMap);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (clientCoordinate != null) {
            dispatch(setCenter(clientCoordinate));
        }
    }, [clientCoordinate]);

    return <div className="section">
        <div className="row g-0 w-100">
            <div className="col-12 col-lg-8 h-100vh sticky p-0">
                { /* contractor map */ }
                <div className="d-flex flex-column h-100">
                    <div className="p-0 d-flex flex-row g-2">
                        { /* map filters, preferences, and/or search bar */ }
                    </div>
                    <div className="h-100">
                        { clientCoordinate ?
                            <ContractorSearchMap />
                            : <Loading />
                        }
                    </div>
                </div>
            </div>
            <div className="col-12 col-lg-4">
                {
                    selectedContractorId
                    ?  <Contractor {...contractorProps[selectedContractorId]}/>
                    : <>
                        { /* Contractor List Items */ }
                        {Array.from(Object.values(contractorProps)).map((contractorProps) => {
                            let show = false;
                            if(clientCoordinate) { 
                                const distanceMiles = getDistance(contractorProps.serviceArea.location, clientCoordinate) / 1609.34;
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
                            return show && <ContractorListItem key={contractorProps.contractorId} {...contractorProps} />
                        })}
                    </>
                }                
            </div>
        </div>
    </div>
}

export default ContractorSearch;
