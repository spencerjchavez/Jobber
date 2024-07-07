import { Link, useParams } from "react-router-dom";
import MainContainer from "../../components/MainContainer";
import ErrorPage from "../ErrorPage";
import { useSelector } from "react-redux";
import { RootState } from "src/store/store";

const JobPost: React.FC = () => {
    const params = useParams();
    const { jobPostId } = params;
    const jobPostIdNumber = +(jobPostId ?? '-1');

    const jobPostProps = useSelector((state: RootState) => state.jobPosts.jobPostProps);
    const props = jobPostProps.get(jobPostIdNumber);
    if (props == null) {
        return <ErrorPage />
    } else {
        return <>
            <MainContainer sidebarLeft={
                <div className="row">
                    <div className="col-12 text-center">
                        {/*poster info, make a bid, ask for info */}
                        <img className="img-fluid rounded-circle mb-3" src={props.profilePictureURL} />
                        <h4>Posted By: <a href="">{props.authorName}</a></h4>        
                        <div className="py-2"></div>      
                        <a className="btn btn-standard color-primary uppercase w-100">Make A Bid</a>
                        <a className="btn btn-outline color-primary uppercase w-100">Ask The Client</a>
                    </div>
                </div>
            } 
            mainContent={
                <div className="row">
                    <div className="col-12">
                        <Link to="/" className="btn btn-icon-arrow-left btn-simple">Back to Posts</Link>
                        <div className="row">
                            <div className="col-12 col-lg-6">
                                <h3>{props.title}</h3>
                            </div>
                            <div className="col-12 col-lg-6 text-end">
                                <p>Posted: {(props.postDate.getMonth() + 1) + '/' + props.postDate.getDate()}</p>
                            </div>
                        </div>
                        <p>{props.description}</p>
                        { 
                            props.images.length > 0 && <div className="col-12">
                                {/* Project Images: */ }
                                {props.images.map((imageURL) => {
                                    return <img className="img-fluid mb-2" src={imageURL} />
                                })}
                            </div>
                        }       
                    </div>
                </div>
            } /></>
    }
}

export default JobPost;