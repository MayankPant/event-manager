import React, { useState } from "react";
import CalendarView from "../Components/CalenderView";
import EventForm from "../Components/EventForm";
import TagManager from "../Components/TagManager";
import data from "../events";
import RecurrenceForm from "../Components/RecurrenceForm";
import '../styles/EmployeeDashboard.css'
import { Divider, FormLabel } from "@mui/material";
import { useTheme } from '@mui/material'

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

  const theme = useTheme();

  const styles = {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary
  }
  const handleEditEvent = (eventId: string) => {
    const event = data.find((e) => e.id === eventId);
    if (event) {
      setSelectedEvent(event);
    }
  };

  const handleSubmit = (data: RecurrenceFormData) => {
    // Handle form submission
    console.log('Recurrence settings:', data);
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
    <div style={styles} className="employee-dashboard">
      <div className="events">

      <FormLabel sx={{fontWeight: '800', fontSize: '1.5em', color: theme.palette.text.primary}}>Employee Dashboard</FormLabel>
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

      
      </div>

      <Divider orientation="horizontal"></Divider>

      {/* Calendar View */}
      <CalendarView userRole="employee" />
    </div>
  );
};

export default EmployeeDashboard;
