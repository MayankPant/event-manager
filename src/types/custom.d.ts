declare module '*.svg' {
    const content: any;
    export default content;
}



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
    tags?: string[]; // Array of tag names
  }
  

  interface PrivateRouteProps {
    children: import('react').JSX.Element;
}
interface RecurrenceFormData {
  name: string;
  startDate: Date;
  endDate: Date;
  recurrenceRule: string,
  created_by: number;
  description?: string;
  location?: string;
  id: number;
}









