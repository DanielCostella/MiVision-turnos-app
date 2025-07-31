import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface Filtros {
  sede: string;
  profesional: string;
  fecha: Date;
}

interface FiltrosTurnosProps {
  onChange: (filtros: Filtros) => void;
}

export const FiltrosTurnos: React.FC<FiltrosTurnosProps> = ({ onChange }) => {
  const [filtros, setFiltros] = useState<Filtros>({
    sede: '',
    profesional: '',
    fecha: new Date()
  });

  const handleChange = (campo: keyof Filtros, valor: string | Date) => {
    const nuevosFiltros = { ...filtros, [campo]: valor };
    setFiltros(nuevosFiltros);
    onChange(nuevosFiltros);
  };

  return (
    <div className="mb-4 p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-3">Filtros</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          value={filtros.sede}
          onChange={(e) => handleChange('sede', e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Todas las sedes</option>
        </select>

        <select
          value={filtros.profesional}
          onChange={(e) => handleChange('profesional', e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Todos los profesionales</option>
        </select>

        <DatePicker
          selected={filtros.fecha}
          onChange={(date: Date) => handleChange('fecha', date)}
          className="p-2 border rounded w-full"
          dateFormat="dd/MM/yyyy"
        />
      </div>
    </div>
  );
};