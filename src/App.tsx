import JobPostingsContainer from './features/job-postings/JobPostingsContainer';
import './App.scss'
import { Route, Routes } from 'react-router-dom';
import JobPost from './features/job-postings/JobPost';
import ContractorSearch from './features/contractors/ContractorSearch'
import ErrorPage from './features/ErrorPage';

function App() {

  return (<div className="app">
    {/* header */}
      <div className="row header sticky dark align-items-center">
        <div className="col-12 text-center">
          <h2 className="m-0 alt-font">Work Smarter</h2>
        </div>
    </div>
    <Routes>
      {/*job postings routes */}
      <Route path='/' element={<ContractorSearch />} />
      <Route path='/job-postings' element={<JobPostingsContainer />} />
      <Route path='/job-post/:jobPostId' element={<JobPost />} />
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  </div>)
}

export default App
