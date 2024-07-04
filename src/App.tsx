import JobPostingsContainer from './features/job-postings/JobPostingsContainer';
import './App.scss'
import { Route, Routes } from 'react-router-dom';
import JobPost from './features/job-postings/JobPost';

function App() {

  return (<div className="container-fluid app">
    {/* header */}
    <div className="row">
      <div className="col-12 text-center py-2 dark bg-color-primary">
        <h2 className="m-0">JOBBER</h2>
      </div>
    </div>
    {/* Insert route countainer here */}
    <Routes>
      {/*job postings routes */}
      <Route path='/' element={<JobPostingsContainer />} />
      <Route path='/jobPost/:jobPostId' element={<JobPost />} />
    </Routes>
  </div>)
}

export default App
