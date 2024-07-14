import JobPostingsContainer from './features/job-postings/JobPostingsContainer';
import './App.scss'
import { Link, Route, Routes } from 'react-router-dom';
import JobPost from './features/job-postings/JobPost';
import ContractorSearch from './features/contractors/ContractorSearch'
import ErrorPage from './features/ErrorPage';
import Contractor from './features/contractors/Contractor';
import GetInTouch from './features/contractors/GetInTouch';

function App() {

  return (<div className="app">
    {/* header */}
      <div className="row header sticky dark align-items-center">
        <div className="col-12 text-center">
          <Link className="fill" to={`/`} />
          <h2 className="m-0 alt-font">Work Smarter</h2>
        </div>
    </div>
    <Routes>
      {/*job postings routes */}
      <Route path='/' element={<ContractorSearch />} />
      <Route path='/contractor/:contractorId' element={<Contractor />}/>
      <Route path='/contractor/:contractorId/get-in-touch' element={<GetInTouch />}/>
      <Route path='/job-postings' element={<JobPostingsContainer />} />
      <Route path='/job-post/:jobPostId' element={<JobPost />} />
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  </div>)
}

export default App
