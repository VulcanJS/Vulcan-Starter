import { addDecorator, configure } from '@storybook/react';

/*

Standard Config

*/
// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

/*

Components

*/

// load UI components
import 'UIComponentsLoader';
// load core components
import 'CoreComponentsLoader';
// load mock props
import 'MockProps';

/*

i18n

See https://github.com/truffls/storybook-addon-intl

*/

import { setIntlConfig, withIntl } from 'storybook-addon-intl';

// Load the locale data for all your defined locales
import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import deLocaleData from 'react-intl/locale-data/de';

addLocaleData(enLocaleData);
addLocaleData(deLocaleData);

import 'EnUS';
import 'EsES';
import 'FrFR';
import { Strings } from './vulcan.js';

const getMessages = (locale) => Strings[locale];

// Set intl configuration
setIntlConfig({
    locales: ['en', 'de'],
    defaultLocale: 'en',
    getMessages
});

// Register decorator
addDecorator(withIntl);


// Run storybook
configure(loadStories, module);