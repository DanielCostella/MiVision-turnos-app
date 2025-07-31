import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { es } from 'date-fns/locale';

interface Turno {
  id: number;
  fecha: string;
  hora: string;
}

interface TurnosCalendarioProps {
  turnos: Turno[];
}

const locales = { 'es': es };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export const TurnosCalendario: React.FC<TurnosCalendarioProps> = ({ turnos }) => {
  const events = turnos.map(turno => ({
    id: turno.id,
    title: `Turno ${turno.hora}`,
    start: new Date(`${turno.fecha}T${turno.hora}`),
    end: new Date(`${turno.fecha}T${turno.hora}`),
  }));

  return (
    <div className="h-[600px] mb-4">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
      />
    </div>
  );
};