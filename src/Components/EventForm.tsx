import React, { useState } from 'react';

interface EventFormProps {
  userRole: 'manager' | 'employee';
  selectedEmployee?: string | null;
}

const EventForm: React.FC<EventFormProps> = ({ userRole, selectedEmployee }) => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);

  const handleSubmit = () => {
    console.log({
      eventName,
      eventDate,
      isRecurring,
      assignedTo: userRole === 'manager' ? selectedEmployee : null,
    });
  };

  return (
    <div>
      <h2>Create Event</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <input
          type="datetime-local"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />
        {userRole === 'manager' && (
          <div>
            <label>
              Assign to Employee:
              <span>{selectedEmployee || 'None'}</span>
            </label>
          </div>
        )}
        <label>
          <input
            type="checkbox"
            checked={isRecurring}
            onChange={() => setIsRecurring(!isRecurring)}
          />
          Recurring Event
        </label>
        <button type="submit">Save Event</button>
      </form>
    </div>
  );
};

export default EventForm;
