import React, { useState } from 'react';
import { EventClickArg, DateSelectArg } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './CalendarView.css';

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end?: string; // Optional for all-day events
  allDay?: boolean;
  color?: string; // Optional custom color
}

interface CalendarViewProps {
  userRole: 'manager' | 'employee';
}

const CalendarView: React.FC<CalendarViewProps> = ({ userRole }) => {
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Team Meeting',
      start: '2024-11-19T10:00:00',
      end: '2024-11-19T11:00:00',
      color: '#4CAF50',
    },
    {
      id: '2',
      title: 'Project Deadline',
      start: '2024-11-20',
      allDay: true,
      color: '#FF5722',
    },
  ]);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const title = prompt('Enter event title:');
    if (title) {
      const newEvent: CalendarEvent = {
        id: String(events.length + 1),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr || undefined,
        allDay: selectInfo.allDay,
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (window.confirm(`Delete event '${clickInfo.event.title}'?`)) {
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== clickInfo.event.id));
    }
  };

  return (
    <div>
      <h2>{userRole === 'manager' ? 'Team' : 'My'} Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        initialView="dayGridMonth"
        editable={userRole === 'manager'}
        selectable={userRole === 'manager'}
        events={events}
        select={handleDateSelect}
        eventClick={handleEventClick}
        eventColor="#2196F3"
        nowIndicator
      />
    </div>
  );
};

export default CalendarView;
