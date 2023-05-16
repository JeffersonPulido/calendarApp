import { useState } from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { addHours } from "date-fns";

import { Navbar, CalendarBox, CalendarModal } from "../";
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

  //Guardar ultima vista para la recarga del navegador
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')
  //Modificar estilos y retornarlos al cargar eventos
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
  //Funcion ejecutada al escuchar evento de doble click
  const onDoubleClick = ( event ) => {
    console.log({doubleClick: event})
  }
  //Funcion ejecutada al escuchar evento de click
  const onSelect = ( event ) => {
    console.log({click: event})
  }
  //Funcion ejecutada al escuchar evento de cambio de vista
  const onViewChanged = ( event ) => {
    localStorage.setItem('lastView', event)
    setLastView(event)
  }

  return (
    <>
      <Navbar />

      <Calendar
        culture="es"
        messages={getMessagesES()}
        localizer={localizer}
        events={events}
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarBox
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChanged }
      />
      
      <CalendarModal/>

    </>
  );
};
