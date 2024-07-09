import JobPostListItem from './JobPostListItem';
import MainContainer from '../../components/MainContainer';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';



const JobPostingsContainer: React.FC = () => {
    const jobPostPropsMap = useSelector((store: RootState) => store.jobPosts.jobPostProps);
    const jobPostProps = Array.from(jobPostPropsMap.values());
    return <div className="row">
        <div className="col-12">
            { <MainContainer 
                sidebarLeft={<>
                    <h3>Job Categories</h3>
                </>}
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