import { addCallback, Utils } from 'meteor/vulcan:core';

function addDepartmentFilterParameter (parameters, terms) {


    if (terms.department) {
      parameters.selector.department = terms.department
    }
  
    return parameters;
  }
  addCallback('departments.parameters', addDepartmentFilterParameter);