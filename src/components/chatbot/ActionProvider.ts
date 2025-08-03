import { Sede } from '../../models/Sede';
import { sedesService } from '../../services/sedesService';

class ActionProvider {
  createChatBotMessage: any;
  setState: any;
  createClientMessage: any;

  constructor(createChatBotMessage: any, setStateFunc: any, createClientMessage: any) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  handleTurno = async (horario: string) => {
    const message = this.createChatBotMessage(
      `Has seleccionado el turno para ${horario}. ¿Deseas confirmar la reserva?`,
      {
        widget: 'confirmacion',
      }
    );

    this.setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };

  handleSedeSelection = async (sedeId: number) => {
    const message = this.createChatBotMessage(
      'Mostrando turnos disponibles para la sede seleccionada:',
      {
        widget: 'turnos',
      }
    );

    this.setState((prev: any) => ({
      ...prev,
      selectedSede: sedeId,
      messages: [...prev.messages, message],
    }));
  };

  handleSolicitarTurno = async () => {
    const message = this.createChatBotMessage(
      'Por favor, selecciona una sede:',
      {
        widget: 'sedesSelector',
      }
    );

    this.setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };

  handleSedeSelected = async (sedeId: number) => {
    const message = this.createChatBotMessage(
      'Has seleccionado la sede. Ahora elige un profesional:',
      {
        widget: 'profesionalesSelector',
        payload: { sedeId },
      }
    );

    this.setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };
}

export default ActionProvider;