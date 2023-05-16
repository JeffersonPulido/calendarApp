import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { addHours } from "date-fns";

import { Navbar, CalendarBox } from "../";
import { localizer, getMessagesES } from "../../helpers/";

const events = [
  {
    title: "HBD",
    notes: "Pastel y decoracion",
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: "#fafafa",
    user: {
      _id: "123",
      name: "BLADETIGER",
    },
  },
];

export const CalendarPage = () => {

  const eventStyleGetter = (event, start, end, isSelected) => {
    
    const style = {
      backgroundColor: '#186A3B',
      borderRadius: '0px',
      color: 'white',
      opacity: '0.8'
    }

    return {
      style
    }
  }

  return (
    <>
      <Navbar />

      <Calendar
        culture="es"
        messages={getMessagesES()}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarBox
        }}
      />
    </>
  );
};
