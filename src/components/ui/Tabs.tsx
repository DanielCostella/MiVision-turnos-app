import React from 'react';

interface TabProps {
  title: string;
  children: React.ReactNode;
}

export const Tab: React.FC<TabProps> = ({ children }) => {
  return <div>{children}</div>;
};

interface TabsProps {
  children: React.ReactElement<TabProps>[];
}

export const Tabs: React.FC<TabsProps> = ({ children }) => {
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <div>
      <div className="flex border-b">
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement<TabProps>(child)) {
            return (
              <button
                className={`px-4 py-2 ${
                  activeTab === index ? 'border-b-2 border-blue-500' : ''
                }`}
                onClick={() => setActiveTab(index)}
              >
                {child.props.title}
              </button>
            );
          }
          return null;
        })}
      </div>
      {React.Children.toArray(children)[activeTab]}
    </div>
  );
};