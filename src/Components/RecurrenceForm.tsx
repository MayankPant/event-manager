import React, { useState } from 'react';
import {
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  SelectChangeEvent,
  Button,
  useTheme
} from '@mui/material';

// Frequency types
type FrequencyType = 'daily' | 'weekly' | 'monthly' | 'yearly';

// Days of the week
type WeekDay = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

// Interface for form data
interface RecurrenceFormData {
  frequency: FrequencyType;
  interval: number;
  selectedDays: WeekDay[];
  endDate: string;
}

// Props interface
interface RecurrenceFormProps {
  onSubmit?: (data: RecurrenceFormData) => void;
  initialData?: Partial<RecurrenceFormData>;
}

const WEEK_DAYS: WeekDay[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const RecurrenceForm: React.FC<RecurrenceFormProps> = ({ 
  onSubmit, 
  initialData 
}) => {
  const [formData, setFormData] = useState<RecurrenceFormData>({
    frequency: 'weekly',
    interval: 1,
    selectedDays: [],
    endDate: '',
    ...initialData,
  });

  const theme = useTheme();

  const styles = {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary
  }

  const handleFrequencyChange = (event: SelectChangeEvent<FrequencyType>) => {
    const newFrequency = event.target.value as FrequencyType;
    setFormData({
      ...formData,
      frequency: newFrequency,
      // Reset selectedDays if frequency is not weekly
      selectedDays: newFrequency !== 'weekly' ? [] : formData.selectedDays,
    });
  };

  const handleIntervalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value) || 1;
    setFormData({
      ...formData,
      interval: Math.max(1, value),
    });
  };

  const handleDayToggle = (day: WeekDay) => {
    setFormData((prev) => {
      const selectedDays = prev.selectedDays.includes(day)
        ? prev.selectedDays.filter((d) => d !== day)
        : [...prev.selectedDays, day];
      return { ...prev, selectedDays };
    });
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      endDate: event.target.value,
    });
  };

  const handleSubmit = () => {
    onSubmit?.(formData);
  };

  // Helper function to generate preview text
  const getPreviewText = (): string => {
    let text = `Repeats every ${formData.interval} `;
    text += formData.interval === 1
      ? formData.frequency.slice(0, -2)
      : formData.frequency;

    if (formData.frequency === 'weekly' && formData.selectedDays.length > 0) {
      text += ` on ${formData.selectedDays.join(', ')}`;
    }

    if (formData.endDate) {
      text += ` until ${formData.endDate}`;
    }

    return text;
  };

  return (
    <Card sx={{ ...styles, maxWidth: 500, margin: 'auto' }}>
      <CardContent sx={styles}>
        <Typography variant="h6" gutterBottom>
          Recurrence Settings
        </Typography>

        <form noValidate autoComplete="off">
          {/* Frequency Dropdown */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Frequency</InputLabel>
            <Select
              value={formData.frequency}
              label="Frequency"
              onChange={handleFrequencyChange}
            >
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="yearly">Yearly</MenuItem>
            </Select>
          </FormControl>

          {/* Interval Input */}
          <TextField
            fullWidth
            type="number"
            label="Interval"
            value={formData.interval}
            onChange={handleIntervalChange}
            InputProps={{ inputProps: { min: 1 } }}
            helperText={`Repeat every ${formData.interval} ${
              formData.interval === 1
                ? formData.frequency.slice(0, -2)
                : formData.frequency
            }`}
            margin="normal"
          />

          {/* Day Picker - Only show for weekly frequency */}
          {formData.frequency === 'weekly' && (
            <FormGroup>
              <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                Select Days
              </Typography>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(2, 1fr)', 
                gap: 8 
              }}>
                {WEEK_DAYS.map((day) => (
                  <FormControlLabel
                    key={day}
                    control={
                      <Checkbox
                        checked={formData.selectedDays.includes(day)}
                        onChange={() => handleDayToggle(day)}
                      />
                    }
                    label={day}
                  />
                ))}
              </div>
            </FormGroup>
          )}

          {/* End Date Picker */}
          <TextField
            fullWidth
            type="date"
            label="End Date"
            value={formData.endDate}
            onChange={handleEndDateChange}
            InputLabelProps={{ shrink: true }}
            margin="normal"
          />

          {/* Preview Section */}
          <Card 
            variant="outlined" 
            sx={{ 
              mt: 2, 
              p: 2, 
              ...styles
            }}
          >
            <Typography variant="subtitle2" gutterBottom>
              Preview
            </Typography>
            <Typography variant="body2">
              {getPreviewText()}
            </Typography>
          </Card>

          {/* Submit Button */}
          {onSubmit && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ mt: 2, width: '100%' }}
            >
              Apply Recurrence
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default RecurrenceForm;