import React from 'react';

interface ProfesionalesListProps {
  sede: number | null;
  onAdd: () => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export const ProfesionalesList: React.FC<ProfesionalesListProps> = (props) => {
  return (
    <div>
      <h3>Lista de Profesionales</h3>
    </div>
  );
};