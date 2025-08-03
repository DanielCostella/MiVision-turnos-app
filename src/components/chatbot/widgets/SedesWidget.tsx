import React from 'react';

interface SedesWidgetProps {
  setState: Function;
  actionProvider: any;
}

export const SedesWidget: React.FC<SedesWidgetProps> = ({ setState, actionProvider }) => {
  return (
    <div className="sedes-widget">
      <h3>Nuestras Sedes:</h3>
      {/* Aquí irá la lista de sedes */}
    </div>
  );
};