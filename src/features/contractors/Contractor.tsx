import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "src/store/store";
import ErrorPage from "../ErrorPage";
import MainContainer from "../../components/MainContainer";
import ContractorRatings from "../ratings/ContractorRatings";
import Gallery from "src/components/Gallery";

const Contractor: React.FC = () => {
    const params = useParams();
    const { contractorId } = params;
    const contractorIdNumber = +(contractorId ?? '-1');

    const contractorProps = useSelector((state: RootState) => state.contractors.contractorProps);
    const props = contractorProps[contractorIdNumber];
    if (props == null) {
        return <ErrorPage />
    } else {
        const contractorRatings = useSelector((state: RootState) => state.contractors.contractorRatings[contractorIdNumber]);
        return <MainContainer
        sidebarLeft={<>
            <div className="row">
                <div className="col-12 text-center">
                    <img className="img-fluid rounded-circle p-3" src={props.profilePicture} />
                    <h4>{props.name}</h4>        
                    { contractorRatings && <ContractorRatings type='condensed-vertical' {...contractorRatings}/> }
                    <a className="btn btn-standard color-primary uppercase w-100">Get in Touch</a>

                </div>
            </div>
        </>}
        mainContent={<>
            <div className="row">
                <div className="col-12">
                    <h4>About Us</h4>
                    <p>{props.about}</p>
                    <h4>Our Portfolio</h4>
                    <Gallery images={props.portfolioImages}/>
                    <h4>Services Offered</h4>
                    <h4>Areas We Serve</h4>
                    <h4>Client Reviews</h4>
                </div>
            </div>
        </>}
        />
    }
}
export default Contractor;