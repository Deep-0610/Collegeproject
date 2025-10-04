import React, { useState } from 'react';

function JobList({ jobs, onDeleteJob, onEditJob }) {
  const [editingJob, setEditingJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editCompany, setEditCompany] = useState('');
  const [editSalary, setEditSalary] = useState('');
  const [editSector, setEditSector] = useState('');

  const handleEdit = (job) => {
    setEditingJob(job);
    setEditTitle(job.title);
    setEditCompany(job.company);
    setEditSalary(job.salary);
    setEditSector(job.sector);
    setShowModal(true);
  };

  const handleSaveEdit = () => {
    const updatedJob = {
      ...editingJob,
      title: editTitle,
      company: editCompany,
      salary: parseFloat(editSalary),
      sector: editSector,
    };
    onEditJob(updatedJob);
    setShowModal(false);
    setEditingJob(null);
  };

  const handleCancelEdit = () => {
    setShowModal(false);
    setEditingJob(null);
  };

  return (
    <div>
      <h2>Job List</h2>
      {jobs.length === 0 ? (
        <p>No jobs available. Please add a job using the form above.</p>
      ) : (
        <ul style={{ padding: 0 }}>
          {jobs.map((job) => (
            <li
              key={job.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: '#fff',
                marginBottom: '10px',
                padding: '15px',
                borderRadius: '6px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                fontSize: '18px',
                color: '#2c3e50',
              }}
            >
              <span>
                <strong>{job.title}</strong> at {job.company} - ${job.salary.toLocaleString()} ({job.sector})
              </span>
              <div>
                <button
                  onClick={() => handleEdit(job)}
                  style={{
                    backgroundColor: '#007bff',
                    border: 'none',
                    color: 'white',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    marginRight: '10px',
                    transition: 'background-color 0.3s ease',
                  }}
                  onMouseOver={e => e.currentTarget.style.backgroundColor = '#0056b3'}
                  onMouseOut={e => e.currentTarget.style.backgroundColor = '#007bff'}
                  aria-label={`Edit job ${job.title}`}
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeleteJob(job.id)}
                  style={{
                    backgroundColor: '#e74c3c',
                    border: 'none',
                    color: 'white',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'background-color 0.3s ease',
                  }}
                  onMouseOver={e => e.currentTarget.style.backgroundColor = '#c0392b'}
                  onMouseOut={e => e.currentTarget.style.backgroundColor = '#e74c3c'}
                  aria-label={`Delete job ${job.title}`}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            width: '400px',
            maxWidth: '90%',
          }}>
            <h3>Edit Job</h3>
            <div style={{ marginBottom: '15px' }}>
              <label>Title:</label>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>Company:</label>
              <input
                type="text"
                value={editCompany}
                onChange={(e) => setEditCompany(e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>Salary:</label>
              <input
                type="number"
                value={editSalary}
                onChange={(e) => setEditSalary(e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>Sector:</label>
              <input
                type="text"
                value={editSector}
                onChange={(e) => setEditSector(e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <div style={{ textAlign: 'right' }}>
              <button onClick={handleCancelEdit} style={{ marginRight: '10px', padding: '8px 16px' }}>Cancel</button>
              <button onClick={handleSaveEdit} style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobList;
