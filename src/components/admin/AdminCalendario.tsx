

import React, { useState, useEffect } from 'react';
import DisposicionMenu from './DisposicionMenu';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Turno } from '../../types/app';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { api } from '../../config/api';

interface TurnoExtendido extends Turno {
  nombre_paciente: string;
  telefono_paciente: string;
  dni_paciente: string;
  nombre_profesional: string;
  nombre_sede: string;
}

interface ProfesionalConTurnos {
  id: number;
  nombre: string;
  sede: string;
  turnos: TurnoExtendido[];
}

const AdminCalendario: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [turnosPorProfesional, setTurnosPorProfesional] = useState<ProfesionalConTurnos[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTurnosDelDia = async (fecha: Date) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.get(`/admin/turnos/fecha/${format(fecha, 'yyyy-MM-dd')}`);
      setTurnosPorProfesional(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchTurnosDelDia(selectedDate);
    }
  }, [selectedDate]);

  const handleDateChange = (value: any, event: React.MouseEvent<HTMLButtonElement>) => {
    if (value instanceof Date) {
      setSelectedDate(value);
    }
  };

  return (
    <div className="flex h-full mt-20">
      {/* Calendario */}
      <div className="w-1/3 p-4">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          locale="es"
          className="rounded-lg shadow-lg"
          maxDetail="month"
          minDetail="month"
          selectRange={false}
        />
      </div>

      {/* Panel lateral con turnos */}
      <div className="w-2/3 p-4 bg-white rounded-lg shadow-lg ml-4">
        <h2 className="text-2xl font-bold mb-4">
          Turnos del {selectedDate ? format(selectedDate, 'dd MMMM yyyy', { locale: es }) : 'día seleccionado'}
        </h2>

        {isLoading && <p className="text-gray-600">Cargando turnos...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}

        {!isLoading && !error && turnosPorProfesional.map(profesional => (
          <div key={profesional.id} className="mb-6 p-4 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">
              {profesional.nombre} - {profesional.sede}
            </h3>
            <div className="space-y-2">
              {profesional.turnos.map(turno => (
                <div key={turno.id} className="p-3 bg-gray-50 rounded-md">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{turno.hora}</span>
                    <span className={`px-2 py-1 rounded text-sm ${
                      turno.estado === 'CONFIRMADO' ? 'bg-green-100 text-green-800' :
                      turno.estado === 'CANCELADO' ? 'bg-red-100 text-red-800' :
                      turno.estado === 'NO_VINO' ? 'bg-gray-200 text-gray-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {turno.estado}
                    </span>
                    <DisposicionMenu 
                      turnoId={turno.id} 
                      estadoActual={turno.estado} 
                      onEstadoCambiado={(nuevoEstado) => {
                        setTurnosPorProfesional(prev => prev.map(p =>
                          p.id === profesional.id ? {
                            ...p,
                            turnos: p.turnos.map(t =>
                              t.id === turno.id ? { ...t, estado: nuevoEstado } : t
                            )
                          } : p
                        ));
                      }}
                    />
                  </div>
                  <div className="mt-2 text-gray-600">
                    <p>Paciente: {turno.nombre_paciente}</p>
                    <p>DNI: {turno.dni_paciente}</p>
                    <p>Teléfono: {turno.telefono_paciente}</p>
                  </div>
                </div>
              ))}
              {profesional.turnos.length === 0 && (
                <p className="text-gray-500 italic">No hay turnos para este día</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCalendario;
