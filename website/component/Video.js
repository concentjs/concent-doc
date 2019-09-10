import React from 'react';
import moment from 'moment';
import { PageContext } from 'antdsite';

export default () => {
  const themeConfig = context.currentLocaleWebConfig.themeConfig;

  return (
    <PageContext.Consumer>
      {context => {
        return (
          <div className="modifiedTime modifiedTimeLeft">
            {themeConfig.base}
          </div>
        );
      }}
    </PageContext.Consumer>
  );
};