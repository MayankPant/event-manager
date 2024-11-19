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
      count?: number; // Number of occurrences (e.g., 10 occurrences)
      until?: string; // End date for recurrence
    };
  }
  

  interface PrivateRouteProps {
    children: import('react').JSX.Element;
}
  









