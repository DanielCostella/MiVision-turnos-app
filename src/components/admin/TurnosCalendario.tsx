import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer, Event } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, parseISO } from 'date-fns';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { es } from 'date-fns/locale';
import { api } from '../../config/api';

interface Turno {
  id: number;
  fecha: string;
  hora: string;
  profesional_nombre: string;
  profesional_apellido: string;
  sede_nombre: string;
  paciente_nombre: string;
  paciente_apellido: string;
  estado: string;
}

interface CalendarEvent extends Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  resource?: {
    profesional: string;
    sede: string;
    paciente: string;
    estado: string;
  };
}

interface TurnosCalendarioProps {
  initialTurnos?: Turno[];
}

const locales = { 'es': es };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const convertirTurnosAEventos = (turnos: Turno[]): CalendarEvent[] => {
  return turnos.map(turno => {
    const [hours, minutes] = turno.hora.split(':');
    const start = parseISO(`${turno.fecha}T${turno.hora}`);
    const end = new Date(start.getTime() + 30 * 60000); // Suponemos turnos de 30 minutos

    return {
      id: turno.id,
      title: `${turno.paciente_nombre} ${turno.paciente_apellido}`,
      start,
      end,
      resource: {
        profesional: `${turno.profesional_nombre} ${turno.profesional_apellido}`,
        sede: turno.sede_nombre,
        paciente: `${turno.paciente_nombre} ${turno.paciente_apellido}`,
        estado: turno.estado
      }
    };
  });
};

export const TurnosCalendario: React.FC<TurnosCalendarioProps> = ({ initialTurnos = [] }) => {
  const [eventos, setEventos] = useState<CalendarEvent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cargarTurnos = async () => {
      try {
        const fecha = new Date();
        const año = fecha.getFullYear();
        const mes = fecha.getMonth() + 1;
        
        const response = await api.get(`/api/turnos/admin/turnos/mes?año=${año}&mes=${mes}`);
        const eventosCalendario = convertirTurnosAEventos(response.data);
        setEventos(eventosCalendario);
        setError(null);
      } catch (error) {
        console.error('Error al cargar turnos:', error);
        setError('Error al cargar los turnos. Por favor, intente nuevamente.');
      } finally {
        setIsLoading(false);
      }
    };

    cargarTurnos();
  }, []);

  useEffect(() => {
    if (initialTurnos.length > 0) {
      const eventosIniciales = convertirTurnosAEventos(initialTurnos);
      setEventos(eventosIniciales);
      setIsLoading(false);
    }
  }, [initialTurnos]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-[600px]">Cargando turnos...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="h-[600px] mb-4">
      <Calendar
        localizer={localizer}
        events={eventos}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        views={['month', 'week', 'day']}
        messages={{
          next: "Siguiente",
          previous: "Anterior",
          today: "Hoy",
          month: "Mes",
          week: "Semana",
          day: "Día",
          agenda: "Agenda",
          noEventsInRange: "No hay turnos en este período"
        }}
        eventPropGetter={(event: CalendarEvent) => ({
          className: `bg-${event.resource?.estado === 'confirmado' ? 'green' : 'yellow'}-500`,
        })}
        tooltipAccessor={(event: CalendarEvent) => 
          `Paciente: ${event.resource?.paciente}\n` +
          `Profesional: ${event.resource?.profesional}\n` +
          `Sede: ${event.resource?.sede}\n` +
          `Estado: ${event.resource?.estado}`
        }
      />
    </div>
  );
};