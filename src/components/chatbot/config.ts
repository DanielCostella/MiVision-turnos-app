import React from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import SedesSelector from './widgets/SedesSelector';
import ProfesionalesSelector from './widgets/ProfesionalesSelector';
import HorariosSelector from './widgets/HorariosSelector';
import ConfirmacionTurno from './widgets/ConfirmacionTurno';

interface WidgetProps {
  actionProvider: typeof ActionProvider;
  state: {
    selectedSede: number | null;
    selectedProfesional: number | null;
    selectedHorario: string | null;
  };
  setState: (state: any) => void;
}

// Modificamos Widget para que coincida con IWidget
interface Widget {
  widgetName: string;
  widgetFunc: (props: WidgetProps) => React.ReactElement;  // Cambiamos ReactNode por ReactElement
  mapStateToProps: string[];
  props: any[];
}

interface Config {
  botName: string;
  initialMessages: any[];
  state: {
    selectedSede: number | null;
    selectedProfesional: number | null;
    selectedHorario: string | null;
  };
  widgets: Widget[];
  customStyles?: {
    botMessageBox?: {
      backgroundColor: string;
    };
    chatButton?: {
      backgroundColor: string;
    };
  };
}

const config: Config = {
  botName: 'MI VISIÓN Bot',
  initialMessages: [
    createChatBotMessage(
      "¡Hola! Soy el asistente virtual de MI VISIÓN. ¿En qué puedo ayudarte?",
      { delay: 500 }
    ),
  ],
  state: {
    selectedSede: null,
    selectedProfesional: null,
    selectedHorario: null,
  },
  widgets: [
    {
      widgetName: "sedesSelector",
      widgetFunc: (props: WidgetProps) => React.createElement(SedesSelector, props),
      mapStateToProps: ["selectedSede"],
      props: []
    },
    {
      widgetName: "profesionalesSelector", 
      widgetFunc: (props: WidgetProps) => React.createElement(ProfesionalesSelector, props),
      mapStateToProps: ["selectedSede", "selectedProfesional"],
      props: []
    },
    {
      widgetName: "horariosSelector",
      widgetFunc: (props: WidgetProps) => React.createElement(HorariosSelector, props),
      mapStateToProps: ["selectedProfesional", "selectedHorario"],
      props: []
    },
    {
      widgetName: "confirmacionTurno",
      widgetFunc: (props: WidgetProps) => React.createElement(ConfirmacionTurno, props),
      mapStateToProps: ["selectedSede", "selectedProfesional", "selectedHorario"],
      props: []
    },
  ] as Widget[],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#376B7E",
    },
  },
};

export default config;