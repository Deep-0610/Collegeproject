import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import JobForm from './components/JobForm';
import JobList from './components/JobList';
import SalaryChart from './components/SalaryChart';
import JobApplicationStatsForm from './components/JobApplicationStatsForm';
import './App.css';

function App() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/jobs');
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const addJob = async (job) => {
    try {
      await axios.post('http://localhost:8080/api/jobs', job);
      await fetchJobs(); // Refresh the list after adding
    } catch (error) {
      console.error('Error adding job:', error);
      throw error; // rethrow to allow JobForm to catch and show message
    }
  };

  const deleteJob = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/jobs/${id}`);
      await fetchJobs(); // Refresh the list after deleting
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const editJob = async (job) => {
    try {
      await axios.put(`http://localhost:8080/api/jobs/${job.id}`, job);
      await fetchJobs(); // Refresh the list after editing
    } catch (error) {
      console.error('Error editing job:', error);
    }
  };

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1>Admin Panel - Job Opportunities & Growth Tracker (SDG 8)</h1>
        <nav>
          <Link to="/">Jobs</Link> | <Link to="/stats">Application Stats</Link>
        </nav>
      </header>
      <main className="admin-main">
        <Routes>
          <Route path="/" element={
            <>
              <section className="admin-section form-section">
                <JobForm onAddJob={addJob} />
              </section>
              <section className="admin-section list-section">
                <JobList jobs={jobs} onDeleteJob={deleteJob} onEditJob={editJob} />
              </section>
              <section className="admin-section chart-section">
                <SalaryChart jobs={jobs} />
              </section>
            </>
          } />
          <Route path="/stats" element={<JobApplicationStatsForm />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
