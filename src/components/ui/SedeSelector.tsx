import React from 'react';

interface SedeSelectorProps {
  onChange: (sedeId: number | null) => void;
}

export const SedeSelector: React.FC<SedeSelectorProps> = ({ onChange }) => {
  return (
    <select onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}>
      <option value="">Seleccione una sede</option>
    </select>
  );
};