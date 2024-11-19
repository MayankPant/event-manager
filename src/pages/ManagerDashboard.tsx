import React, { useState } from 'react';
import TagManager from '../Components/TagManager';
import EventForm from '../Components/EventForm';

const ManagerDashboard: React.FC = () => {
  const [tags, setTags] = useState<string[]>(['Meeting', 'Deadline', 'Personal', 'Training']);

  const handleAddTag = (tag: string) => {
    setTags((prevTags) => [...prevTags, tag]);
  };

  const handleDeleteTag = (tag: string) => {
    // Check if the tag is in use (optional logic)
    const inUse = false; // Replace with actual logic
    if (inUse) {
      alert(`Cannot delete tag "${tag}" because it is in use.`);
    } else {
      setTags((prevTags) => prevTags.filter((t) => t !== tag));
    }
  };

  const handleCreateEvent = (event: any) => {
    console.log('Event created by manager:', event);
  };

  return (
    <div>
      <h1>Manager Dashboard</h1>
      {/* Tag Management */}
      <TagManager tags={tags} onAddTag={handleAddTag} onDeleteTag={handleDeleteTag} />

      {/* Event Creation Form */}
      <EventForm availableTags={tags} onCreateEvent={handleCreateEvent} />
    </div>
  );
};

export default ManagerDashboard;
