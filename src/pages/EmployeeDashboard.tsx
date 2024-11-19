import React, { useState } from "react";
import CalendarView from "../Components/CalenderView";
import EventForm from "../Components/EventForm";
import TagManager from "../Components/TagManager";
import data from "../events";

const EmployeeDashboard: React.FC = () => {
  const [tags, setTags] = useState<string[]>([
    "Meeting",
    "Deadline",
    "Personal",
  ]);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );

  const [events, setEvents] = useState<CalendarEvent[]>(data);


  const handleEditEvent = (eventId: string) => {
    const event = data.find((e) => e.id === eventId);
    if (event) {
      setSelectedEvent(event);
    }
  };

  const handleCreateOrUpdateEvent = (updatedEvent: CalendarEvent) => {
    if (selectedEvent) {
      // Update existing event
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === updatedEvent.id ? updatedEvent : event
        )
      );
    } else {
      // Create new event
      setEvents((prevEvents) => [...prevEvents, updatedEvent]);
    }
    setSelectedEvent(null); // Exit editing mode
  };

  const handleAddTag = (tag: string) => {
    setTags((prevTags) => [...prevTags, tag]);
  };

  const handleDeleteTag = (tag: string) => {
    setTags((prevTags) => prevTags.filter((t) => t !== tag));
  };
  return (
    <div>
      <h1>Employee Dashboard</h1>
      <TagManager
        tags={tags}
        onAddTag={handleAddTag}
        onDeleteTag={handleDeleteTag}
      />

      {/* Event Creation */}
      <EventForm
        availableTags={tags}
        selectedEvent={selectedEvent}
        onCreateOrUpdateEvent={handleCreateOrUpdateEvent}
      />

      {/* Calendar View */}
      <CalendarView userRole="employee" />
    </div>
  );
};

export default EmployeeDashboard;
