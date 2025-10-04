import React, { useState } from 'react';

function JobForm({ onAddJob }) {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [salary, setSalary] = useState('');
  const [sector, setSector] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const job = { title, company, salary: parseFloat(salary), sector };
    try {
      await onAddJob(job);
      setMessage('Job added successfully!');
      // Reset form
      setTitle('');
      setCompany('');
      setSalary('');
      setSector('');
    } catch (error) {
      setMessage('Failed to add job.');
    }
  };

  return (
    <div>
      <h2>Add New Job</h2>
      <form onSubmit={handleSubmit} aria-label="Add new job form">
        <label htmlFor="title">Job Title</label>
        <input
          id="title"
          type="text"
          placeholder="Enter job title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          aria-required="true"
        />
        <small>Example: Software Engineer, Teacher, Nurse</small>

        <label htmlFor="company">Company</label>
        <input
          id="company"
          type="text"
          placeholder="Enter company name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
          aria-required="true"
        />
        <small>Example: Google, ABC School, City Hospital</small>

        <label htmlFor="salary">Salary</label>
        <input
          id="salary"
          type="number"
          placeholder="Enter salary in USD"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
          aria-required="true"
          min="0"
          step="any"
        />
        <small>Enter the annual salary in US dollars</small>

        <label htmlFor="sector">Sector</label>
        <input
          id="sector"
          type="text"
          placeholder="Enter sector"
          value={sector}
          onChange={(e) => setSector(e.target.value)}
          required
          aria-required="true"
        />
        <small>Example: Technology, Education, Healthcare</small>

        <button type="submit" aria-label="Add job">Add Job</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default JobForm;
