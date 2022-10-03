import React from 'react';
import { Provider } from 'jotai';
import { IntlProvider } from 'react-intl';
import { createGlobalStyle } from 'styled-components/macro';

import App from './app';

import messages_en from '../translations/en';
import messages_fa from '../translations/fa';

import type { IProps } from 'types/general';

const messages: Record<string, Record<string, string>> = {
  en: messages_en,
  fa: messages_fa,
};

const defaultColors = {
  primary: '#ea4c89',
  secondry: '#2e0767',
  shade_1: '#1c1c1c',
  shade_2: '#949494',
  shade_3: '#c2c2c2',
  shade_4: '#f6f6f6',
  shade_5: '#fafafa',
  light_1: '#ffffff',
  success_1: '#20A76E',
  fail_1: '#D10328',
  border_radius_16: '16px',
  border_radius_8: '8px',
};

const GlobalStyling = createGlobalStyle`
  :root {
    --color-primary: ${defaultColors.primary};
    --color-secondry: ${defaultColors.secondry};
    --shade-1: ${defaultColors.shade_1};
    --shade-2: ${defaultColors.shade_2};
    --shade-3: ${defaultColors.shade_3};
    --shade-4: ${defaultColors.shade_4};
    --shade-5: ${defaultColors.shade_5};
    --light-1: ${defaultColors.light_1};
    --success-1: ${defaultColors.success_1};
    --fail-1: ${defaultColors.fail_1};
    --radius-16: ${defaultColors.border_radius_16};
    --radius-8: ${defaultColors.border_radius_8};

    --font-family: 'IRANSansWeb'
  }
`;

const MapirStyleEditor = ({ map, locale = 'fa', styleURL, title }: IProps) => {
  return (
    <IntlProvider locale={locale} key={locale} messages={messages[locale]}>
      <GlobalStyling />
      <Provider>
        <App map={map} locale={locale} styleURL={styleURL} title={title} />
      </Provider>
    </IntlProvider>
  );
};

export default MapirStyleEditor;
