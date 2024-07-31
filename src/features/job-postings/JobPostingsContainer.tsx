import JobPostListItem from './JobPostListItem';
import MainContainer from '../../components/MainContainer';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';



const JobPostingsContainer: React.FC = () => {
    const jobPostPropsState = useSelector((store: RootState) => store.jobPosts.jobPostProps);
    const jobPostProps = Array.from(Object.values(jobPostPropsState));
    return <div className="row">
        <div className="col-12">
            { <MainContainer 
                sidebarLeft={<div>
                    <h3>Job Categories</h3>
                </div>}
                mainContent={
                    jobPostProps.map((props) => {
                        return <JobPostListItem key={props.jobPostId} {...props}/>
                    })
                } />
            }
        </div>
    </div>
}

export default JobPostingsContainer;