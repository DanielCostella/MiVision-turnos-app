import React from 'react';
import { DIAS_SEMANA } from '../../constants';

const HorariosForm: React.FC = () => {
  return (
    <div>
      <h3>Horarios del Profesional</h3>
      {DIAS_SEMANA.map(dia => (
        <div key={dia}>
          <label>{dia}</label>
          <input type="time" name="horaInicio" />
          <input type="time" name="horaFin" />
          <input type="number" name="duracionTurno" placeholder="Duración (min)" />
        </div>
      ))}
    </div>
  );
};

export default HorariosForm;