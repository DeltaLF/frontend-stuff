import React, { ReactElement } from 'react';
import ShowArticle from '../../common/loading/ShowArticle';
import FormComponent from '../../../hooks/useForm/FormComponent';
import CustomTabs, { TabProps, CustomTab } from '../../common/tabs/CustomTabs';

const UtilsPage = () => {
  const tabArrays: ReactElement<TabProps>[] = [
    <CustomTab key="showArticle" eventKey="showArticle">
      <ShowArticle />
    </CustomTab>,
    <CustomTab key="formComponent" eventKey="formComponent">
      <FormComponent />
    </CustomTab>,
  ];
  return (
    <div>
      Utils page
      <div
        className="tabsComponet"
        style={{
          width: '80%',
          margin: 'auto',
          border: '1px solid gray',
          padding: '1rem',
        }}
      >
        <CustomTabs tabsArray={tabArrays} activeKey="formComponent" />
      </div>
    </div>
  );
};

export default UtilsPage;
