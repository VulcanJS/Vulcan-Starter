Vulcan example package for complex forms

## TODO

### Schemas
- [ ] Address reusable schema
- [ ] Example of usage of an adress in the customers schema
- [ ] Meetings schema : should allow to select a user in the database using a select, and to set an address if necessary
- [ ] Show complex permissions settings

### Controls
- [ ] Create a control input for Object. We should base it on the existing `FormComponent` which is alreay able to build a form given a `simple-schema`.
- [ ] Create a control input for Arrays of objects
- [ ] Create a control based on react-select for Database items

### Cleanup
- [ ] Add i18n in the forms
- [ ] Nice pages, with SmartForms and example of complex Datatables

### Proposed change to the Vulcan core API
- [ ] Use the Object control input as default for JSON or Object types in the SmartForm
- [ ] Use the Array control as default for Arrays