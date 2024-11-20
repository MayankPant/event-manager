import React, { useState } from "react";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import {FormLabel} from "@mui/material";
import '../styles/TagManager.css'
import { useTheme } from "@mui/material";
interface TagManagerProps {
  tags: string[]; // Existing tags
  onAddTag: (tag: string) => void;
  onDeleteTag: (tag: string) => void;
}

const TagManager: React.FC<TagManagerProps> = ({
  tags,
  onAddTag,
  onDeleteTag,
}) => {
  const [newTag, setNewTag] = useState("");
  const [tagLoader, setTagLoader] = useState<boolean>(false);
  const theme = useTheme();

  const handleAddTag = () => {
    setTagLoader(true);
    if (newTag.trim() && !tags.includes(newTag)) {
      onAddTag(newTag.trim());
      setNewTag("");
    } else {
      alert("Tag already exists or is empty!");
    }
    setTagLoader(false);
  };

  return (
    <div>
      <div className="task-management">
        <FormLabel>Tag Management</FormLabel>
        <TextField
          required
          id="newTag"
          label="Enter a new tag."
          variant="outlined"
          sx={{ width: "55ch", color: theme.palette.text.primary}}
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
        />
        <LoadingButton
          loading={tagLoader}
          loadingPosition="center"
          children={"Add Tag"}
          variant="contained"
          sx={{ margin: "5px" }}
          onClick={handleAddTag}
        />

        <Stack direction="row" spacing={1}>
          {tags.map((tag) => (
            <Chip
              onClick={() => onDeleteTag(tag)}
              label={tag}
              color="primary"
              variant="outlined"
              key={tag}
            />
          ))}
        </Stack>
      </div>
    </div>
  );
};

export default TagManager;
