/*

Note: the following stylesheets are used for Bootstrap-based apps,
feel free to remove them if that's not what you're using.

*/
//import 'meteor/vulcan:ui-material/lib/stylesheets/bootstrap.min.css';

// load UI components
import 'meteor/vulcan:ui-material/lib/modules/components.js';
// TODO: load relevant components Like the theme

export default  storyFn => (<div>{storyFn()}</div>)