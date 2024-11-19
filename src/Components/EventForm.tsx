import React, { useState } from 'react';

interface EventFormProps {
  availableTags: string[]; // List of all tags
  onCreateEvent: (event: any) => void; // Callback to create an event
}

const EventForm: React.FC<EventFormProps> = ({ availableTags, onCreateEvent }) => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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

    onCreateEvent({
      id: Date.now().toString(),
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
      <h3>Create Event</h3>
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
      <button onClick={handleSubmit}>Create Event</button>
    </div>
  );
};

export default EventForm;
