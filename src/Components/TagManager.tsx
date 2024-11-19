import React, { useState } from 'react';

interface TagManagerProps {
  tags: string[]; // Existing tags
  onAddTag: (tag: string) => void;
  onDeleteTag: (tag: string) => void;
}

const TagManager: React.FC<TagManagerProps> = ({ tags, onAddTag, onDeleteTag }) => {
  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag)) {
      onAddTag(newTag.trim());
      setNewTag('');
    } else {
      alert('Tag already exists or is empty!');
    }
  };

  return (
    <div>
      <h3>Tag Management</h3>
      <div>
        <input
          type="text"
          placeholder="Enter a new tag"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
        />
        <button onClick={handleAddTag}>Add Tag</button>
      </div>
      <ul>
        {tags.map((tag) => (
          <li key={tag}>
            {tag} <button onClick={() => onDeleteTag(tag)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagManager;
