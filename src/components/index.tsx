import React from 'react';
import { Provider } from 'jotai';
import { IntlProvider } from 'react-intl';
import { createGlobalStyle } from 'styled-components/macro';

import App from './app';

import messages_en from 'translations/en';
import messages_fa from 'translations/fa';

import type { IProps } from 'types/general';

const messages: Record<string, Record<string, string>> = {
  en: messages_en,
  fa: messages_fa,
};

const defaultColors = {
  primary: '#ea4c89',
  primary_20: '#ea4c8920',
  secondry: '#2e0767',
  shade_1: '#1c1c1c',
  shade_2: '#808080',
  shade_3: '#C2C2C2',
  shade_4: '#E8E8E8',
  shade_5: '#E0E0E0',
  light_1: '#ffffff',
  light_2: '#FAFAFA',
  success_1: '#20A76E',
  fail_1: '#D10328',
  border_radius_16: '16px',
  border_radius_8: '8px',
  border_radius_4: '4px',
  font_family:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
};

const GlobalStyling = createGlobalStyle`
  :root {
    --color-primary: ${defaultColors.primary};
    --color-primary-20: ${defaultColors.primary_20};
    --color-secondry: ${defaultColors.secondry};
    --shade-1: ${defaultColors.shade_1};
    --shade-2: ${defaultColors.shade_2};
    --shade-3: ${defaultColors.shade_3};
    --shade-4: ${defaultColors.shade_4};
    --shade-5: ${defaultColors.shade_5};
    --light-1: ${defaultColors.light_1};
    --light-2: ${defaultColors.light_2};
    --success-1: ${defaultColors.success_1};
    --fail-1: ${defaultColors.fail_1};
    --radius-16: ${defaultColors.border_radius_16};
    --radius-8: ${defaultColors.border_radius_8};
    --radius-4: ${defaultColors.border_radius_4};

    --font-family: ${defaultColors.font_family};
  }
`;

const MapirStyleEditor = ({
  map,
  locale = 'fa',
  styleURL,
  sprite,
  title,
  columns,
  onSubmit,
  onCancle,
}: IProps) => {
  return (
    <IntlProvider locale={locale} key={locale} messages={messages[locale]}>
      <GlobalStyling />
      <Provider>
        <App
          map={map}
          locale={locale}
          styleURL={styleURL}
          title={title}
          sprite={sprite}
          columns={columns}
          onSubmit={onSubmit}
          onCancle={onCancle}
        />
      </Provider>
    </IntlProvider>
  );
};

export default MapirStyleEditor;
