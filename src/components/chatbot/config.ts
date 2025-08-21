import React from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';
import SedesSelector from './widgets/SedesSelector';
import ProfesionalesSelector from './widgets/ProfesionalesSelector';
import HorariosSelector from './widgets/HorariosSelector';
import FechaSelector from './widgets/FechaSelector';
import EmailInput from './widgets/EmailInput';
import ConfirmacionTurno from './widgets/ConfirmacionTurno';

const botName = 'MI VISIÓN Bot';

// La interfaz BotState se usa en el tipo State del chatbot
export interface BotState {
  sedes: any[];
  profesionales: any[];
  selectedSede: any | null;
  selectedProfesional: any | null;
  selectedFecha: string | null;
  selectedHorario: string | null;
}

const config: any = {
  initialMessages: [
    createChatBotMessage('¡Hola! Bienvenido al sistema de turnos de MI VISIÓN.', {
      delay: 500,
    }),
    createChatBotMessage('¿En qué sede te gustaría atenderte?', {
      delay: 1000,
      widget: 'sedeSelector',
    })
  ],
  botName,
  state: {
    sedes: [],
    profesionales: [],
    selectedSede: null,
    selectedProfesional: null,
    selectedFecha: null,
    selectedHorario: null,
  },
  widgets: [
    {
      widgetName: 'sedeSelector',
      widgetFunc: (props: any) => React.createElement(SedesSelector, props),
      mapStateToProps: ['selectedSede'],
    },
    {
      widgetName: 'profesionalesSelector',
      widgetFunc: (props: any) => React.createElement(ProfesionalesSelector, props),
      mapStateToProps: ['selectedSede', 'profesionales'],
    },
    {
      widgetName: 'fechaSelector',
      widgetFunc: (props: any) => React.createElement(FechaSelector, {...props}),
      mapStateToProps: ['selectedProfesional'],
    },
    {
      widgetName: 'horariosSelector',
      widgetFunc: (props: any) => React.createElement(HorariosSelector, props),
      mapStateToProps: ['selectedProfesional', 'selectedFecha'],
    },
    {
      widgetName: 'emailInput',
      widgetFunc: (props: any) => React.createElement(EmailInput, props),
      mapStateToProps: ['selectedHorario'],
    },
    {
      widgetName: 'confirmacionTurno',
      widgetFunc: (props: any) => React.createElement(ConfirmacionTurno, props),
      mapStateToProps: ['selectedSede', 'selectedProfesional', 'selectedFecha', 'selectedHorario', 'userEmail'],
    },
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: '#376B7E',
    },
    chatButton: {
      backgroundColor: '#376B7E',
    },
  },
};

export default config;
