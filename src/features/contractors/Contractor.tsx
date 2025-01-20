import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "src/store/store";
import ErrorPage from "../ErrorPage";
import MainContainer from "../../components/MainContainer";
import ContractorRatings from "../ratings/ContractorRatings";
import Gallery from "src/components/Gallery";
import Form from "../forms/Form";
import ContractorProps from "src/global-types/ContractorProps";

const Contractor: React.FC<ContractorProps> = (props) => {
/*    const params = useParams();
    const { contractorId } = params;
    const contractorIdNumber = +(contractorId ?? '-1'); 

    const contractorProps = useSelector((state: RootState) => state.contractors.contractorProps);
    const props = contractorProps[contractorIdNumber]; */
    if (props == null) {
        return <ErrorPage />
    } else {
        const contractorRatings = useSelector((state: RootState) => state.contractors.contractorRatings[props.contractorId] ?? []);
        return <div className="section">
            <MainContainer
                sidebarLeft={<>
                    <div className="row align-items-center">
                        <div className="col-12 col-lg-12 text-center">
                            <img className="img-fluid rounded-circle p-3" src={props.profilePicture} />
                        </div>
                        <div className="col-12 col-lg-12 text-center">
                            <h4>{props.name}</h4>        
                            { contractorRatings && <ContractorRatings type='condensed-vertical' {...contractorRatings}/> }
                            <a href="#contact" className="btn btn-standard color-primary uppercase w-100">Get in Touch</a>
                            <a className="btn btn-outline color-primary uppercase w-100">Leave a Review</a>
                        </div>
                    </div>
                </>}
                mainContent={<>
                    <div className="row">
                        <div className="col-12">
                            <h4>About Us</h4>
                            <p>{props.about}</p>
                            <h4 className="mt-5" id="portfolio">Our Portfolio</h4>
                            <Gallery images={props.portfolioImages}/>
                            <h4 className="mt-5">Services Offered</h4>
                            {props.services.map((service, i) => {
                                return <div className="btn btn-outline color-gray btn-capsule" key={i}>{service}</div>
                            })}
                            <h4 className="mt-5">Areas We Serve</h4>
                            <b className="mb-0">How should we display this info??</b>
                            <ul>
                            <li>Could be a map with a circle highlighting the area they serve</li>
                            <li>Could be a list of locations lirovided by the contractor</li>
                            <li>Could just show the city the contractor is based out of?</li>
                            </ul>
                            <h4 id="reviews" className="mt-5">Reviews</h4>
                            { contractorRatings && <ContractorRatings type='large' {...contractorRatings}/> }
                            <h4 id="contact">Get A Quote</h4>
                            <Form {...props.contactForm} />
                        </div>
                    </div>
                </>}
            />
        </div>
    }
}
export default Contractor;