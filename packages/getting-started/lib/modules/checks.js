import { Routes, Components, ComponentsTable, Collections, Strings } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';

import schema from '../modules/schema.js';
import Movies from '../modules/collection.js';

const containsChild = (component, childName) => {
  const type = component && component().props.children && component().props.children.type;
  return type && [type.name, type.displayName].includes(childName);
}

const checks = {

  step0: () => {
    return true;
  },

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
    return containsChild(Components.Step4, 'ModalTrigger');
  },

  step5: () => {
    return containsChild(Components.Step5, 'Schema');
  },

  step6: () => {
    return Collections.find(c => c.options.collectionName === 'Movies');
  },

  step7: () => {
    return !!ComponentsTable.Step7.hocs.length;
  },

  step8: (props) => {
    return props.moviesCount >= 8;
  },

  step9: () => {
    return containsChild(Components.Step9, 'withQueryResolvers(Resolvers)');
  },

  step10: () => {
    return !!ComponentsTable.MoviesList.hocs.length;
  },

  step11: () => {
    const hocs = ComponentsTable.MoviesList.hocs;
    return hocs[0] && hocs[0][1] && hocs[0][1].fragmentName;
  },

  step12: () => {
    return schema.userId.resolveAs;
  },

  step13: (props) => {
    return props.currentUser;
  },

  step14: () => {
    return containsChild(Components.Step14, 'withMutationResolvers(Mutations)');
  },

  step15: () => {
    return containsChild(Components.MoviesNew, 'withCurrentUser');
  },

  step16: () => {
    return ComponentsTable.MoviesApp.rawComponent.name === 'MoviesApp2';
  },

  step17: () => {
    return Movies && Movies.options && !!Movies.options.permissions;
  },

  step18: () => {
    return Movies && Movies.options && !!Movies.options.defaultInput;
  },

  step19: () => {
    return Strings.en['datatable.new'] === 'New Movie';
  },

  step20: () => {
    return false;
  },

}

export default checks;