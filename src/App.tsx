import JobPostingsContainer from './features/job-postings/JobPostingsContainer';
import './App.scss'
import { Route, Routes } from 'react-router-dom';
import JobPost from './features/job-postings/JobPost';
import ErrorPage from './features/ErrorPage';

function App() {

  return (<div className="container-fluid app">
    {/* header */}
    <div className="row">
      <div className="col-12 text-center py-2 dark bg-color-primary">
        <h2 className="m-0">JOBBER</h2>
      </div>
    </div>
    <Routes>
      {/*job postings routes */}
      <Route path='/' element={<JobPostingsContainer />} />
      <Route path='/job-post/:jobPostId' element={<JobPost />} />
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  </div>)
}

export default App
