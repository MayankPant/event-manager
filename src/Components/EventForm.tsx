import React, { useState, useEffect } from 'react';

interface EventFormProps {
  availableTags: string[];
  selectedEvent?: CalendarEvent | null;
  onCreateOrUpdateEvent: (event: CalendarEvent) => void;
}

const EventForm: React.FC<EventFormProps> = ({ availableTags, selectedEvent, onCreateOrUpdateEvent }) => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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
      <div>
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
      <button onClick={handleSubmit}>{selectedEvent ? 'Update Event' : 'Create Event'}</button>
    </div>
  );
};

export default EventForm;
