import React, { ReactElement, useEffect, useState } from 'react';
import './customTabs.scss';

export type TabProps = {
  eventKey: string;
  children: React.ReactNode;
};

export const CustomTab: React.FC<TabProps> = ({ eventKey, children }) => {
  return <>{children}</>;
};

interface ICustomTabsProps {
  tabsArray: ReactElement<TabProps>[];
  activeKey?: string;
}

function CustomTabs({ tabsArray, activeKey }: ICustomTabsProps) {
  const [currTab, setCurrentTab] = useState<string>(
    activeKey || tabsArray[0].props.eventKey
  );

  //   useEffect(() => {
  //     console.log('CustomTabs did mount');
  //     return () => {
  //       console.log('CustomTabs will unmount');
  //     };
  //   }, []);
  function handleClick(title: string): void {
    setCurrentTab(title);
  }
  return (
    <div className="customTabs">
      <h1>tabs</h1>
      <div className="customTabs__header">
        {tabsArray.map((tab) => {
          const { eventKey } = tab.props;
          return (
            <div
              key={eventKey}
              className={`customTabs__title ${
                eventKey === currTab ? 'customTabs__title--highlight' : ''
              }`}
              onClick={() => {
                handleClick(eventKey);
              }}
            >
              {eventKey}
            </div>
          );
        })}
      </div>
      <div className="customTabs__body">
        {tabsArray.map((TabElement, ind) => {
          const { eventKey } = TabElement.props;
          if (currTab === eventKey) {
            return <div key={ind}> {TabElement} </div>;
          }
        })}
      </div>
    </div>
  );
}

export default CustomTabs;
