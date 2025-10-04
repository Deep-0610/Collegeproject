import React, { useState, useEffect } from 'react';
import axios from 'axios';

function JobApplicationStatsForm() {
  const [stats, setStats] = useState([]);
  const [sortedStats, setSortedStats] = useState([]);
  const [sortBy, setSortBy] = useState('jobId');
  const [jobId, setJobId] = useState('');
  const [applicationsFilled, setApplicationsFilled] = useState('');
  const [applicationsAccepted, setApplicationsAccepted] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    const sorted = [...stats].sort((a, b) => {
      if (sortBy === 'jobId') {
        return a.jobId - b.jobId;
      } else if (sortBy === 'applicationsFilled') {
        return a.applicationsFilled - b.applicationsFilled;
      } else if (sortBy === 'applicationsAccepted') {
        return a.applicationsAccepted - b.applicationsAccepted;
      }
      return 0;
    });
    setSortedStats(sorted);
  }, [stats, sortBy]);

  const fetchStats = async () => {
    try {
      console.log('Fetching job application stats...');
      const response = await axios.get('http://localhost:8080/api/job-application-stats');
      console.log('Data fetched:', response.data);
      setStats(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setError('Error fetching stats. Please check console for details.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const stat = { jobId: parseInt(jobId), applicationsFilled: parseInt(applicationsFilled), applicationsAccepted: parseInt(applicationsAccepted) };
    try {
      await axios.post('http://localhost:8080/api/job-application-stats', stat);
      await fetchStats(); // Refresh the list after adding
      setMessage('Stats added successfully!');
      setError(null);
      // Reset form
      setJobId('');
      setApplicationsFilled('');
      setApplicationsAccepted('');
    } catch (error) {
      console.error('Failed to add stats:', error);
      setMessage('Failed to add stats.');
      setError('Failed to add stats. Please check console for details.');
    }
  };

  const deleteStat = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/job-application-stats/${id}`);
      await fetchStats(); // Refresh the list after deleting
      setError(null);
    } catch (error) {
      console.error('Error deleting stat:', error);
      setError('Error deleting stat. Please check console for details.');
    }
  };

  return (
    <div>
      <h2>Add Job Application Stats</h2>
      <form onSubmit={handleSubmit} aria-label="Add job application stats form">
        <label htmlFor="jobId">Job ID</label>
        <input
          id="jobId"
          type="number"
          placeholder="Enter job ID"
          value={jobId}
          onChange={(e) => setJobId(e.target.value)}
          required
          aria-required="true"
        />
        <small>Enter the ID of the job</small>

        <label htmlFor="applicationsFilled">Applications Filled</label>
        <input
          id="applicationsFilled"
          type="number"
          placeholder="Enter number of applications filled"
          value={applicationsFilled}
          onChange={(e) => setApplicationsFilled(e.target.value)}
          required
          aria-required="true"
          min="0"
        />
        <small>Enter the number of applications filled for this job</small>

        <label htmlFor="applicationsAccepted">Applications Accepted</label>
        <input
          id="applicationsAccepted"
          type="number"
          placeholder="Enter number of applications accepted"
          value={applicationsAccepted}
          onChange={(e) => setApplicationsAccepted(e.target.value)}
          required
          aria-required="true"
          min="0"
        />
        <small>Enter the number of applications accepted for this job</small>

        <button type="submit" aria-label="Add stats">Add Stats</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}

      <h3>Existing Stats</h3>
      <label htmlFor="sortBy">Sort by:</label>
      <select id="sortBy" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="jobId">Job ID</option>
        <option value="applicationsFilled">Applications Filled</option>
        <option value="applicationsAccepted">Applications Accepted</option>
      </select>
      <ul>
        {sortedStats.map(stat => (
          <li key={stat.id}>
            Job ID: {stat.jobId}, Filled: {stat.applicationsFilled}, Accepted: {stat.applicationsAccepted}
            <button onClick={() => deleteStat(stat.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JobApplicationStatsForm;
