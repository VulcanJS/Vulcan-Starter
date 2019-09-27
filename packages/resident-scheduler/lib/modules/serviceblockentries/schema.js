import { defaultProps } from "recompose";

/*

This is a JS object that defines every property of a collection document...

A SimpleSchema-compatible JSON schema

*/

const schema = {
  // default properties

  _id: {
    type: String,
    optional: true,
    canRead: ["guests"]
  },
  createdAt: {
    type: Date,
    optional: true,
    canRead: ["guests"],
    onCreate: () => {
      return new Date();
    }
  },
  userId: {
    type: String,
    optional: true,
    canRead: ["guests"],
    resolveAs: {
      fieldName: "user",
      type: "User",
      addOriginalField: true
    }
  },

  // custom properties
  blockDay: {
    label: "Day",
    type: Date,
    optional: false,
    canRead: ["guests"],
    canCreate: ["members"],
    canUpdate: ["members"],
    control: "text"
  },

  assignedResidentSlot1: {
    label: "Resident",
    type: String,
    optional: false,
    canRead: ["guests"],
    canCreate: ["members"],
    canUpdate: ["members"],
    control: "text"
  },
  assignedResidentSlot2: {
    label: "Resident",
    type: String,
    optional: false,
    canRead: ["guests"],
    canCreate: ["members"],
    canUpdate: ["members"],
    control: "text"
  },
  assignedResidentSlot3: {
    label: "Resident",
    type: String,
    optional: false,
    canRead: ["guests"],
    canCreate: ["members"],
    canUpdate: ["members"],
    control: "text"
  },
  assignedResidentSlot4: {
    label: "Resident",
    type: String,
    optional: false,
    canRead: ["guests"],
    canCreate: ["members"],
    canUpdate: ["members"],
    control: "text"
  },
  assignedResidentSlot5: {
    label: "Resident",
    type: String,
    optional: false,
    canRead: ["guests"],
    canCreate: ["members"],
    canUpdate: ["members"],
    control: "text"
  },
};

export default schema;
