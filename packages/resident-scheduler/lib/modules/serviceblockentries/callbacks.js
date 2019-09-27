import { addCallback, Utils } from 'meteor/vulcan:core';

function addServiceBlockEntryFilterParameter (parameters, terms) {


    if (terms.serviceBlockType) {
      parameters.selector.serviceBlockType = terms.serviceBlockType
    }
    if (terms.serviceBlockSlot) {
      parameters.selector.serviceBlockSlot = terms.serviceBlockSlot
    }
  
    return parameters;
  }
  addCallback('serviceblockentry.parameters', addServiceBlockEntryFilterParameter);