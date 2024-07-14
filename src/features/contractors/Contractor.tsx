import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "src/store/store";
import ErrorPage from "../ErrorPage";
import MainContainer from "../../components/MainContainer";

const Contractor: React.FC = () => {
    const params = useParams();
    const { contractorId } = params;
    const contractorIdNumber = +(contractorId ?? '-1');

    const contractorProps = useSelector((state: RootState) => state.contractors.contractorProps);
    const props = contractorProps[contractorIdNumber];
    if (props == null) {
        return <ErrorPage />
    } else {
        return <MainContainer
        sidebarLeft={<>
            <div className="row">
                <div className="col-12 text-center">
                    {/*poster info, make a bid, ask for info */}
                    <img className="img-fluid rounded-circle mb-3" src={props.profilePicture} />
                    <h4>Posted By: <a href="">{props.name}</a></h4>        
                    <div className="py-2"></div>      
                    <a className="btn btn-standard color-primary uppercase w-100">Make A Bid</a>
                    <a className="btn btn-outline color-primary uppercase w-100">Ask The Client</a>
                </div>
            </div>
        </>}
        mainContent={<>

        </>}
        />
    }
}
export default Contractor;