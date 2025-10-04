import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function SalaryChart({ jobs }) {
  const data = jobs.map((job) => ({
    name: job.title,
    salary: job.salary,
  }));

  return (
    <div>
      <h2>Salary Distribution</h2>
      <p>This bar chart shows the salary distribution for the listed jobs.</p>
      <BarChart width={600} height={300} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" label={{ value: 'Job Title', position: 'insideBottomRight', offset: -5 }} />
        <YAxis label={{ value: 'Salary (USD)', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="salary" fill="#8884d8" />
      </BarChart>
    </div>
  );
}

export default SalaryChart;
