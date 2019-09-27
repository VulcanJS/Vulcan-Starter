import { addCallback, Utils } from 'meteor/vulcan:core';

function addResidentFilterParameter (parameters, terms) {


    if (terms.resident) {
      parameters.selector.resident = terms.resident
    }
  
    return parameters;
  }
  addCallback('schedules.parameters', addResidentFilterParameter);