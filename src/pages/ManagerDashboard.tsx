import React, { useState } from 'react';
import TagManager from '../Components/TagManager';
import EventForm from '../Components/EventForm';
import data from '../events';

const ManagerDashboard: React.FC = () => {
  const [tags, setTags] = useState<string[]>(['Meeting', 'Deadline', 'Personal', 'Training']);

  const handleAddTag = (tag: string) => {
    setTags((prevTags) => [...prevTags, tag]);
  };

  const [events, setEvents] = useState<CalendarEvent[]>(data);

  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );


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

  const handleEditEvent = (eventId: string) => {
    const event = events.find((e) => e.id === eventId);
    if (event) {
      setSelectedEvent(event);
    }
  };
  
  const handleCreateOrUpdateEvent = (updatedEvent: CalendarEvent) => {
    if (selectedEvent) {
      // Update existing event
      setEvents((prevEvents) =>
        prevEvents.map((event) => (event.id === updatedEvent.id ? updatedEvent : event))
      );
    } else {
      // Create new event
      setEvents((prevEvents) => [...prevEvents, updatedEvent]);
    }
    setSelectedEvent(null); // Exit editing mode
  };

  return (
    <div>
      <h1>Manager Dashboard</h1>
      {/* Tag Management */}
      <TagManager tags={tags} onAddTag={handleAddTag} onDeleteTag={handleDeleteTag} />

      {/* Event Creation Form */}
      <EventForm availableTags={tags} onCreateOrUpdateEvent={handleCreateOrUpdateEvent}/>
    </div>
  );
};

export default ManagerDashboard;
