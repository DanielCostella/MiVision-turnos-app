import React, { useState } from 'react';
import { Sede, Profesional } from '../../../types/index';
import '../../../styles/confirmacionTurno.css';

interface ConfirmacionTurnoProps {
  actionProvider: {
    handleTurnoConfirmado: (turno: any) => void;
    handleError: (message: string) => void;
    handleCancelarTurno: () => void;
  };
  state: {
    selectedSede?: Sede | null;
    selectedProfesional?: Profesional | null;
    selectedHorario?: string;
    userEmail?: string;
    turnoData?: {
      usuario_id: number;
      sede_id?: number;
      profesional_id?: number;
      fecha: string;
      hora: string;
      motivo: string;
      estado: 'confirmado' | 'cancelado';
      email?: string;
    };
  };
  setState: (state: any) => void;
}

export default function ConfirmacionTurno({ actionProvider, state, setState }: ConfirmacionTurnoProps) {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirmar = async () => {
    if (isConfirming) return;
    
    setIsConfirming(true);
    try {
      const hora = state.selectedHorario || '';
      const fecha = new Date().toISOString().split('T')[0];

      const turnoData = {
        usuario_id: 1, // ID de usuario de prueba
        sede_id: state.selectedSede?.id,
        profesional_id: state.selectedProfesional?.id,
        fecha: fecha,
        hora: hora,
        motivo: 'Turno reservado vía chatbot',
        estado: 'confirmado',
        email: state.userEmail
      };

      console.log('Enviando datos del turno:', turnoData);

      const response = await fetch('http://localhost:3001/api/turnos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(turnoData),
      });

      if (response.ok) {
        const result = await response.json();
        actionProvider.handleTurnoConfirmado(result);
      } else {
        throw new Error('Error al confirmar el turno');
      }
    } catch (error) {
      actionProvider.handleError('Lo siento, hubo un error al confirmar el turno. Por favor, inténtalo de nuevo.');
    } finally {
      setIsConfirming(false);
    }
  };

  const handleCancelar = () => {
    actionProvider.handleCancelarTurno();
  };

  return (
    <div className="confirmacion-turno-container">
      <div className="turno-details">
        <h4>¿Confirmas los siguientes datos?</h4>
        <p><strong>Sede:</strong> {state.selectedSede?.nombre}</p>
        <p><strong>Profesional:</strong> {state.selectedProfesional?.nombre}</p>
        <p><strong>Horario:</strong> {state.selectedHorario}</p>
        <p><strong>Email:</strong> {state.userEmail}</p>
      </div>
      <div className="confirmacion-buttons">
        <button 
          onClick={handleConfirmar}
          disabled={isConfirming}
          className="confirm-button"
        >
          {isConfirming ? 'Confirmando...' : 'Confirmar Turno'}
        </button>
        <button 
          onClick={handleCancelar}
          disabled={isConfirming}
          className="cancel-button"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}