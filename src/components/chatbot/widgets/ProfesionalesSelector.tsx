import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Profesional {
  id: number;
  nombre: string;
  apellido: string;
  especialidad: string;
  matricula: string;
  sede_id: number;
  horarios_disponibles: string;
}

interface Props {
  actionProvider: {
    handleProfesionalSelected: (profesional: Profesional) => void;
    setState?: (prevState: any) => void; // Agregamos setState como opcional
  };
  state: {
    selectedSede?: { id: number; nombre: string };
    profesionales?: Profesional[];
  };
}

const ProfesionalesSelector: React.FC<Props> = ({ actionProvider, state }) => {
  const [profesionales, setProfesionales] = useState<Profesional[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    const cargarProfesionales = async () => {
      if (!state?.selectedSede?.id || profesionales.length > 0) {
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `http://localhost:3001/api/profesionales/sede/${state.selectedSede.id}`,
          { 
            signal: controller.signal,
            timeout: 5000
          }
        );
        
        if (!isMounted) return;

        if (response.data.success) {
          setProfesionales(response.data.data);
        } else {
          setError('No se pudieron cargar los profesionales');
        }
      } catch (err) {
        if (!isMounted) return;
        console.error('Error al cargar profesionales:', err);
        setError('Error al cargar los profesionales');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    cargarProfesionales();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [state?.selectedSede?.id, profesionales.length]);

  if (!state?.selectedSede) {
    return <div className="text-center p-4">Por favor, selecciona una sede primero</div>;
  }

  if (loading) {
    return (
      <div className="text-center p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
        <p className="mt-2 text-sm text-gray-600">Cargando profesionales...</p>
      </div>
    );
    console.log('⏳ Cargando profesionales (render)');
    return <div className="text-center p-4">Cargando profesionales...</div>;
  }

  if (error) {
    console.log('❌ Error (render):', error);
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  if (profesionales.length === 0) {
    console.log('⚠️ No hay profesionales disponibles (render)');
    return <div className="text-center p-4">No hay profesionales disponibles</div>;
  }

  console.log('✅ Renderizando lista de profesionales:', profesionales);

  return (
    <div className="grid gap-3">
      {profesionales.map((profesional) => (
        <button
          key={profesional.id}
          onClick={() => {
            console.log('👨‍⚕️ Profesional seleccionado:', profesional);
            actionProvider.handleProfesionalSelected(profesional);
          }}
          className="p-4 text-left bg-white hover:bg-gray-50 rounded-lg border transition-colors"
        >
          <div className="font-medium">
            {profesional.nombre} {profesional.apellido}
          </div>
          <div className="text-sm text-gray-600">
            {profesional.especialidad}
          </div>
          <div className="text-xs text-gray-500">
            Mat. {profesional.matricula}
          </div>
        </button>
      ))}
    </div>
  );
};

export default ProfesionalesSelector;