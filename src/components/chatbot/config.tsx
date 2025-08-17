import React from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';
import { Sede, Profesional } from '../../types';
import HorariosSelector from './widgets/HorariosSelector';
import SedesSelector from './widgets/SedesSelector';
import ProfesionalesSelector from './widgets/ProfesionalesSelector';
import EmailInput from './widgets/EmailInput';
import ConfirmacionTurno from './widgets/ConfirmacionTurno';

// Definimos los tipos que necesitamos
type Config = {
  initialMessages: any[];
  widgets: Widget[];
  customStyles: {
    botMessageBox: { backgroundColor: string };
    chatButton: { backgroundColor: string };
  };
};

type Widget = {
  widgetName: string;
  widgetFunc: (props: any) => React.ReactElement;
  mapStateToProps: string[];
  props: any[];
};

interface BaseWidgetProps {
  actionProvider: any;
  setState: any;
  state: {
    selectedProfesional?: Profesional | null;
    selectedHorario?: string;
    selectedSede?: Sede | null;
    turnoData?: any;
  };
}

const config: Config = {
  initialMessages: [
    createChatBotMessage("¡Hola! ¿En qué puedo ayudarte hoy?", {
      delay: 500,
    }),
  ],
  widgets: [
    {
      widgetName: "emailInput",
      widgetFunc: (props: BaseWidgetProps) => (
        <EmailInput {...props} />
      ),
      mapStateToProps: ["userEmail"],
      props: []
    },
    {
      widgetName: "sedesSelector",
      widgetFunc: (props: BaseWidgetProps) => (
        <SedesSelector {...props} />
      ),
      mapStateToProps: ["selectedSede"],
      props: []
    },
    {
      widgetName: "profesionalesSelector",
      widgetFunc: (props) => (
        <ProfesionalesSelector 
          actionProvider={props.actionProvider}
          state={props.state}
        />
      ),
      mapStateToProps: ["selectedSede", "profesionales"],
      props: []
    },
    {
      widgetName: "horariosSelector",
      widgetFunc: (props) => (
        <HorariosSelector 
          actionProvider={props.actionProvider}
          state={props.state}
        />
      ),
      mapStateToProps: ["selectedProfesional"],
      props: []
    },
    {
      widgetName: "confirmacionTurno",
      widgetFunc: (props: BaseWidgetProps) => (
        <ConfirmacionTurno {...props} />
      ),
      mapStateToProps: ["turnoData"],
      props: []
    }
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#376B7E",
    },
  }
};

export default config;