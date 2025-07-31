import React from 'react';
import { DIAS_SEMANA } from '../../constants';

interface Profesional {
  id: number;
  nombre: string;
}

interface HorariosFormProps {
  profesional: Profesional;
  onSave: (horarios: any) => void;
}

export const HorariosForm: React.FC<HorariosFormProps> = ({ profesional, onSave }) => {
  return (
    <div className="mt-4">
      <h3>Horarios de {profesional.nombre}</h3>
      {DIAS_SEMANA.map(dia => (
        <div key={dia} className="mb-4">
          <label className="block">{dia}</label>
          <input type="time" name="horaInicio" className="mr-2" />
          <input type="time" name="horaFin" />
        </div>
      ))}
    </div>
  );
};