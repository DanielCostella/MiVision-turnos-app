
import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleTurnos = () => {
    const botMessage = createChatBotMessage(
      'Estos son los horarios disponibles:',
      {
        widget: 'turnos',
      }
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleTurnos,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;

