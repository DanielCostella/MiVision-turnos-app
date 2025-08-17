import React from 'react';

interface HorariosSelectorProps {
  actionProvider: {
    handleHorarioSelect: (horario: string) => void;
  };
  state: {
    selectedProfesional?: { id: number };
    selectedFecha?: string;
  };
}

const HorariosSelector: React.FC<HorariosSelectorProps> = ({ actionProvider }) => {
  const horarios = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  return (
    <div className="grid grid-cols-2 gap-2">
      {horarios.map((horario) => (
        <button
          key={horario}
          onClick={() => actionProvider.handleHorarioSelect(horario)}
          className="p-2 text-center bg-white hover:bg-gray-50 rounded-lg border"
        >
          {horario}
        </button>
      ))}
    </div>
  );
};

export default HorariosSelector;