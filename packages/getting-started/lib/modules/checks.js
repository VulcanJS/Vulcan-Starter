import { Routes, Components, ComponentsTable, Collections, Strings } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';

import schema from '../modules/schema.js';
import Movies from '../modules/collection.js';

import Layout from '../components/other/Layout.jsx';

import MoviesNew from '../components/movies/MoviesNew.jsx';

const containsChild = (component, childName) => {
  console.log(component)

  const type = component && component().props.children && component().props.children.type;
  console.log(type)
  console.log(childName)

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
    return true
  },

  step3: (props) => {
    return props.pathname;
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

  step7: (props) => {
    return props.data;
  },

  step8: (props) => {
    return props.moviesCount >= 8;
  },

  step9: (props) => {
    return props.queries;
  },

  step10: () => {
    return true
    return !!ComponentsTable.MoviesList.hocs.length;
  },

  step11: () => {
    return true
    const hocs = ComponentsTable.MoviesList.hocs;
    return hocs[0] && hocs[0][1] && hocs[0][1].fragmentName;
  },

  step12: () => {
    return schema.userId.relation;
  },

  step13: (props) => {
    return props.currentUser;
  },

  step14: (props) => {
    return props.mutations;
  },

  step15: () => {
    return containsChild(MoviesNew, 'withCurrentUser');
  },

  step16: () => {
    return true;
    // return containsChild(Layout, 'MoviesApp2');
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