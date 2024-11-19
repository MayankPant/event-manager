declare module '*.svg' {
    const content: any;
    export default content;
}



interface CalendarEvent {
    id: string;
    title: string;
    start: string;
    end?: string; // Optional end time for all-day events
    allDay?: boolean;
    color?: string; // Optional custom color
  }
  









