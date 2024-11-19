import React, { useState } from 'react';
import CalendarView from '../Components/CalenderView';
import EventForm from '../Components/EventForm';
import TagManager from '../Components/TagManager';

const ManagerDashboard: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);

  return (
    <div>
      <h1>Manager Dashboard</h1>
      
      {/* Event Management */}
      <EventForm userRole="manager" selectedEmployee={selectedEmployee} />

      {/* Calendar View */}
      <CalendarView userRole="manager" />

      {/* Employee Selection */}
      <div>
        <h2>Manage Employee Events</h2>
        <select
          value={selectedEmployee || ''}
          onChange={(e) => setSelectedEmployee(e.target.value)}
        >
          <option value="">Select Employee</option>
          <option value="employee1">Employee 1</option>
          <option value="employee2">Employee 2</option>
        </select>
      </div>
    </div>
  );
};

export default ManagerDashboard;
