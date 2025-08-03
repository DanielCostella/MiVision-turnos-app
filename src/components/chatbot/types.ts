import { ReactElement } from 'react';

export interface Config {
  botName: string;
  initialMessages: any[];
  widgets: Array<{
    widgetName: string;
    widgetFunc: (props: any) => ReactElement;
    props: Record<string, any>;
    mapStateToProps: string[];
  }>;
  state: {
    turnos: any[];
  };
  customStyles: {
    botMessageBox: {
      backgroundColor: string;
    };
    chatButton: {
      backgroundColor: string;
    };
  };
}

export interface ChatbotState {
  sedes: Array<any>;
  profesionales: Array<any>;
}

export interface WidgetProps {
  setState: (state: ChatbotState) => void;
  actionProvider: any;
}