import merge from 'lodash/merge';

/*

Simplified versions of Vulcan APIs and helpers

*/

/*

Components

*/
export const Components = {}; // will be populated on startup (see vulcan:routing)

export const ComponentsMockProps = {};

export const getMockProps = (componentName, overrideProps) => {
  return merge({}, ComponentsMockProps[componentName], overrideProps);
};

export function registerComponent(name, rawComponent, ...hocs) {
  // support single-argument syntax
  if (typeof arguments[0] === 'object') {
    // note: cannot use `const` because name, components, hocs are already defined
    // as arguments so destructuring cannot work
    // eslint-disable-next-line no-redeclare
    var { name, component, hocs = [] } = arguments[0];
    rawComponent = component;
  }
  // store the component in the table
  Components[name] = rawComponent
}

export const replaceComponent = registerComponent;

export const coreComponents = [
  'Alert',
  'Button',
  'Dropdown',
  'Modal',
  'ModalTrigger',
  'Table',
  'FormComponentCheckbox',
  'FormComponentCheckboxGroup',
  'FormComponentDate',
  'FormComponentDate2',
  'FormComponentDateTime',
  'FormComponentDefault',
  'FormComponentText',
  'FormComponentEmail',
  'FormComponentNumber',
  'FormComponentRadioGroup',
  'FormComponentSelect',
  'FormComponentSelectMultiple',
  'FormComponentStaticText',
  'FormComponentTextarea',
  'FormComponentTime',
  'FormComponentUrl',
  'FormControl',
  'FormElement',
  'FormItem',
];

/*

i18n

*/

export const Strings = {};

export const addStrings = (language, strings) => {
  if (typeof Strings[language] === 'undefined') {
    Strings[language] = {};
  }
  Strings[language] = {
    ...Strings[language],
    ...strings
  };
};