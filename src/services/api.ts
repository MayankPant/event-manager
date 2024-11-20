import axios from "axios";

export const eventEditOrCreate = async (eventName: string, eventStartDate: Date, eventEndDate: Date, recurrenceRule: string) => {
    const url =
    process.env.REACT_APP_AUTH_BASE_ADDRESS !== undefined
      ? process.env.REACT_APP_AUTH_BASE_ADDRESS.concat("/api/events/")
      : "";
    
      const payload = {
        name: eventName,
        start_time: eventStartDate,
        end_time: eventEndDate,
        recurrence_rule: recurrenceRule
      }

      var response = await axios.post(url, payload);

      if(response.status === 201){
        return true;
      }
      else{
        return false;
      }

}