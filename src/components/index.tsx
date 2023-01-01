import React from 'react';
import { Provider } from 'jotai';
import { IntlProvider } from 'react-intl';

import App from './app';

import messages_en from 'translations/en';
import messages_fa from 'translations/fa';

import type { IProps } from 'types/general';

const messages: Record<string, Record<string, string>> = {
  en: messages_en,
  fa: messages_fa,
};

const MapirStyleEditor = ({
  map,
  locale = 'fa',
  styleURL,
  sprite,
  title,
  columns,
  className,
  onSubmit,
  onCancle,
  getDistictValues,
}: IProps) => {
  return (
    <IntlProvider locale={locale} key={locale} messages={messages[locale]}>
      <Provider>
        <App
          className={className}
          map={map}
          locale={locale}
          styleURL={styleURL}
          title={title}
          sprite={sprite}
          columns={columns}
          onSubmit={onSubmit}
          onCancle={onCancle}
          getDistictValues={getDistictValues}
        />
      </Provider>
    </IntlProvider>
  );
};

export default MapirStyleEditor;
