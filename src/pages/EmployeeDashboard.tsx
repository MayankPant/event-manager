import React, { useState } from 'react';
import CalendarView from '../Components/CalenderView';
import EventForm from '../Components/EventForm';
import TagManager from '../Components/TagManager';

const EmployeeDashboard: React.FC = () => {
    const [tags, setTags] = useState<string[]>(['Meeting', 'Deadline', 'Personal']);

  const handleAddTag = (tag: string) => {
    setTags((prevTags) => [...prevTags, tag]);
  };

  const handleDeleteTag = (tag: string) => {
    setTags((prevTags) => prevTags.filter((t) => t !== tag));
  };
  return (
    <div>
       <h1>Employee Dashboard</h1>
       <TagManager tags={tags} onAddTag={handleAddTag} onDeleteTag={handleDeleteTag} />

      {/* Event Creation */}
      <EventForm availableTags={tags} onCreateEvent={(event) => console.log(event)} />


      {/* Calendar View */}
      <CalendarView userRole="employee" />
    </div>
  );
};

export default EmployeeDashboard;
