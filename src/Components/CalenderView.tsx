import React from 'react';

interface CalendarViewProps {
  userRole: 'manager' | 'employee';
}

const CalendarView: React.FC<CalendarViewProps> = ({ userRole }) => {
  return (
    <div>
      <h2>{userRole === 'manager' ? 'Team' : 'My'} Calendar</h2>
      <div>/* Calendar implementation here */</div>
    </div>
  );
};

export default CalendarView;
