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
      resolver: (schedule, args, context) => {
        return context.Users.findOne(
          { _id: schedule.userId },
          {
            fields: context.Users.getViewableFields(
              context.currentUser,
              context.Users
            )
          }
        );
      },
      addOriginalField: true
    }
  },

  // custom properties

  department: {
    label: "Department",
    type: String,
    optional: true,
    canRead: ["guests"],
    canCreate: ["members"],
    canUpdate: ["members"],
    control: "select",
    query: `
      departments{
        results{
          department
        }
      }
    `,
    options: props =>
      props.data.departments &&
      props.data.departments.results.map(department => ({
        value: department.department,
        label: department.department
      }))
  },
  resident: {
    label: "Resident",
    type: String,
    optional: true,
    canRead: ["guests"],
    canCreate: ["members"],
    canUpdate: ["members"],
    control: "text"
  },

  //  resident: {
  //   label: 'Resident',
  //   type: String,
  //   optional: true,
  //   canRead: ['guests'],
  //   canCreate: ['members'],
  //   canUpdate: ['members'],
  //   control: "select",
  //   query: `
  //     users{
  //       results{
  //         _id
  //         username
  //       }
  //     }
  //   `,
  //   options: props =>
  //     props.data.users &&
  //     props.data.users.results.map(user => (user._id !== props.currentUser._id && {
  //       value: user.username,
  //       label: user.username,
  //     })),
  // },

  date: {
    label: "Call Shift",
    type: Date,
    optional: false,
    canRead: ["guests"],
    canCreate: ["members"],
    canUpdate: ["members"],
    control: "datetime"
  }
};

export default schema;
