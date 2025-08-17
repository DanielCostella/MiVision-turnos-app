import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { es } from 'date-fns/locale';

interface FechaSelectorProps {
  actionProvider: {
    handleFechaSelect: (fecha: string) => void;
  };
  setState?: any;
}

const FechaSelector: React.FC<FechaSelectorProps> = ({ actionProvider }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3); // 3 meses hacia adelante

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      const fechaFormateada = date.toISOString().split('T')[0];
      actionProvider.handleFechaSelect(fechaFormateada);
    }
  };

  return (
    <div className="fecha-selector">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        minDate={minDate}
        maxDate={maxDate}
        locale={es}
        dateFormat="dd/MM/yyyy"
        placeholderText="Selecciona una fecha"
        className="p-2 border rounded w-full"
        filterDate={(date) => {
          const day = date.getDay();
          return day !== 0 && day !== 6; // 0 = domingo, 6 = sábado
        }}
      />
    </div>
  );
};

export default FechaSelector;
