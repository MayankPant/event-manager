import React, { useState } from 'react';
import { EventClickArg, DateSelectArg } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import dayjs from 'dayjs';

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end?: string;
  allDay?: boolean;
  color?: string;
  recurrence?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    count?: number;
    until?: string;
  };
}

interface CalendarViewProps {
  userRole: 'manager' | 'employee';
}

const CalendarView: React.FC<CalendarViewProps> = ({ userRole }) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const generateRecurringEvents = (event: CalendarEvent): CalendarEvent[] => {
    if (!event.recurrence) return [event];

    const { frequency, count, until } = event.recurrence;
    const startDate = dayjs(event.start);
    const endDate = event.end ? dayjs(event.end) : null;

    const events: CalendarEvent[] = [];
    let currentStart = startDate;
    let currentEnd = endDate;

    let occurrences = 0;

    while (true) {
      if (count && occurrences >= count) break;
      if (until && currentStart.isAfter(dayjs(until))) break;

      events.push({
        ...event,
        id: `${event.id}-${occurrences}`,
        start: currentStart.toISOString(),
        end: currentEnd?.toISOString(),
      });

      occurrences++;
      if (frequency === 'daily') {
        currentStart = currentStart.add(1, 'day');
        if (currentEnd) currentEnd = currentEnd.add(1, 'day');
      } else if (frequency === 'weekly') {
        currentStart = currentStart.add(1, 'week');
        if (currentEnd) currentEnd = currentEnd.add(1, 'week');
      } else if (frequency === 'monthly') {
        currentStart = currentStart.add(1, 'month');
        if (currentEnd) currentEnd = currentEnd.add(1, 'month');
      }
    }

    return events;
  };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const title = prompt('Enter event title:');
    if (title) {
      const recurrenceFrequency = prompt('Enter recurrence (daily, weekly, monthly) or leave blank:');
      let recurrence: CalendarEvent['recurrence'] | undefined = undefined;

      if (recurrenceFrequency === 'daily' || recurrenceFrequency === 'weekly' || recurrenceFrequency === 'monthly') {
        const count = parseInt(prompt('Enter the number of occurrences (optional):') || '', 10);
        const until = prompt('Enter end date (YYYY-MM-DD) for recurrence (optional):');
        recurrence = {
          frequency: recurrenceFrequency,
          count: isNaN(count) ? undefined : count,
          until: until || undefined,
        };
      }

      const newEvent: CalendarEvent = {
        id: String(events.length + 1),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr || undefined,
        allDay: selectInfo.allDay,
        recurrence,
      };

      setEvents((prevEvents) => [...prevEvents, ...generateRecurringEvents(newEvent)]);
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
