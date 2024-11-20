import React, { useState, useEffect } from 'react';
import RecurrenceForm from './RecurrenceForm';
import { TextField } from '@mui/material';
import '../styles/EventForm.css'
import { LoadingButton } from '@mui/lab';
interface EventFormProps {
  availableTags: string[];
  selectedEvent?: CalendarEvent | null;
  onCreateOrUpdateEvent: (event: CalendarEvent) => void;
}

const EventForm: React.FC<EventFormProps> = ({ availableTags, selectedEvent, onCreateOrUpdateEvent }) => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [createEventButtonLoader, setCreateEventButtonLoader] = useState<boolean>(false);
  useEffect(() => {
    if (selectedEvent) {
      setEventName(selectedEvent.title);
      setEventDate(selectedEvent.start);
      setSelectedTags(selectedEvent.tags || []);
    }
  }, [selectedEvent]);

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = () => {
    setCreateEventButtonLoader(true);
    if (!eventName || !eventDate) {
      alert('Event name and date are required!');
      return;
    }

    onCreateOrUpdateEvent({
      id: selectedEvent?.id || Date.now().toString(),
      title: eventName,
      start: eventDate,
      tags: selectedTags,
    });

    setEventName('');
    setEventDate('');
    setSelectedTags([]);
  };

  return (
    <div>
      <h3>{selectedEvent ? 'Edit Event' : 'Create Event'}</h3>
      <div className='create-event'>
      <TextField
          required
          id="event-name"
          label="Event Name"
          variant="outlined"
          sx={{ width: "55ch" }}
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <TextField
            fullWidth
            type="date"
            label="Start Date"
            sx={{ width: "55ch" }}
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            margin="normal"
          />
      </div>
      <div>
        <h4>Select Tags</h4>
        {availableTags.map((tag) => (
          <label key={tag} style={{ marginRight: '10px' }}>
            <input
              type="checkbox"
              checked={selectedTags.includes(tag)}
              onChange={() => handleTagToggle(tag)}
            />
            {tag}
          </label>
        ))}
      </div>
      <RecurrenceForm />

      <LoadingButton
          loading={createEventButtonLoader}
          loadingPosition="center"
          children={"Create Event"}
          variant="contained"
          sx={{ margin: '5px' }}
          onClick={handleSubmit}
        />
    </div>
  );
};

export default EventForm;
