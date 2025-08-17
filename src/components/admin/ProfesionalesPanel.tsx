import React, { useEffect, useState } from 'react';
import { profesionalesService } from '../../services/profesionalesService';
import { Profesional } from '../../types/profesional';

const ProfesionalesPanel: React.FC = () => {
  const [profesionales, setProfesionales] = useState<Profesional[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfesionales = async () => {
      try {
        const response = await profesionalesService.getProfesionales();
        if (response.success) {
          setProfesionales(response.data);
        }
      } catch (error) {
        console.error('Error al cargar profesionales:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfesionales();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Profesionales</h2>
      {loading ? (
        <p>Cargando profesionales...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {profesionales.map(profesional => (
            <div key={profesional.id} className="border p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold">
                {profesional.nombre} {profesional.apellido}
              </h3>
              <p>Especialidad: {profesional.especialidad}</p>
              <p>Matrícula: {profesional.matricula}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfesionalesPanel;