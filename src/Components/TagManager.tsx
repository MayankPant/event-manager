import React, { useState } from 'react';

const TagManager: React.FC = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div>
      <h2>Manage Tags</h2>
      <input
        type="text"
        placeholder="New Tag"
        value={newTag}
        onChange={(e) => setNewTag(e.target.value)}
      />
      <button onClick={addTag}>Add Tag</button>
      <ul>
        {tags.map((tag) => (
          <li key={tag}>
            {tag} <button onClick={() => removeTag(tag)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagManager;
