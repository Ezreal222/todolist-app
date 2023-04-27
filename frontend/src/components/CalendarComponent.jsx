import React, { useState } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function CalendarComponent({ tasks }) {
  const [events, setEvents] = useState(
    tasks.map((task) => ({
      title: task.text,
      start: new Date(task.dueDate),
      end: new Date(task.dueDate),
      allDay: true,
      resource: task,
    }))
  );

  const onEventDrop = ({ event, start, end, allDay }) => {
    const updatedEvents = events.map((e) => {
      if (e === event) {
        return { ...e, start, end, allDay };
      }
      return e;
    });

    setEvents(updatedEvents);

  };

  return (
    <div style={{ height: '600px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        onEventDrop={onEventDrop}
        resizable
        style={{ height: '100%' }}
        views={['month', 'week', 'day']}
        defaultView={Views.MONTH}
        startAccessor='start'
        endAccessor='end'
        dragAndDrop
      />
    </div>
  );
}

export default CalendarComponent;
