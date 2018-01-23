import { Routes, Components, Collections } from 'meteor/vulcan:core';

const containsChild = (component, childName) => {
  return !!component && component().props.children && component().props.children.type.name === childName;
}

const checks = {

  step1: () => {
    return !!Routes.step2;
  },

  step2: () => {
    return Components.Step3 && Routes.step3
  },

  step3: () => {
    return !!Components.Step4 && Routes.step4
  },

  step4: () => {
    return containsChild(Components.Step5, 'ModalTrigger');
  },

  step5: () => {
    return containsChild(Components.Step5, 'Schema');
  },

  step6: () => {
    return Collections.find(c => c.options.collectionName === 'Movies');
  },

  step7: (props) => {
    return props.data;
  },

  step8: (props) => {
    return !!(props.data && props.data.MoviesCount);
  },

  step9: (props) => {
    return props.data && props.data.__type && !!props.data.__type.fields.find(r => r.name === 'MoviesList');
  },

  step10: (props) => {
    return !!props.results;
  },

  step11: (props) => {
    return props.results && props.results[0] && !props.results[0].description;
  },

  step12: (props) => {
    return props.results && props.results[0] && props.results[0].user;
  },

  step13: (props) => {
    return props.currentUser;
  },

  step14: (props) => {
    return props.data && props.data.__type && !!props.data.__type.fields.find(r => r.name === 'MoviesNew');
  },

  step15: (props) => {
    return false;
  },

  step16: () => {
    return containsChild(Components.Step16, 'GraphQL');
  },

  step17: () => {
    return false;
  },

}

export default checks;