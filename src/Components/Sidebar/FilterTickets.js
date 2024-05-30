import React, { useState } from 'react';

const FilterTickets = ({ onFilter }) => {
  const [assignedTo, setAssignedTo] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [priority, setPriority] = useState('');

  const handleFilter = () => {
    const filterCriteria = {
      assignedTo,
      startDate,
      endDate,
      priority,
    };
    onFilter(filterCriteria);
  };

  return (
    <div className="filter-sidebar">
      <h2>Filter Tickets</h2>
      <label>
        Assigned To:
        <input
          type="text"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        />
      </label>
      <label>
        Start Date:
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </label>
      <label>
        End Date:
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </label>
      <label>
        Priority:
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="">Select Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </label>
      <button onClick={handleFilter}>Filter</button>
    </div>
  );
};

export default FilterTickets;
