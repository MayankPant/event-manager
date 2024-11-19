import React from 'react';
import CalendarView from '../Components/CalenderView';
import EventForm from '../Components/EventForm';
import TagManager from '../Components/TagManager';

const EmployeeDashboard: React.FC = () => {
  return (
    <div>
      <h1>Employee Dashboard</h1>
      
      {/* Tag Management */}
      <TagManager />

      {/* Event Creation */}
      <EventForm userRole="employee" />

      {/* Calendar View */}
      <CalendarView userRole="employee" />
    </div>
  );
};

export default EmployeeDashboard;
