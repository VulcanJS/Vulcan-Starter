import React from 'react';
import { useCurrentUser } from 'meteor/vulcan:core';
import StepWrapper from './StepWrapper.jsx';

export const title = 'User Accounts';

const text = `
The vast majority of apps all need some kind of user accounts management in order to be functional. 

Vulcan makes this drop-dead easy. Find \`MoviesUsers.jsx\` in the same directory as \`MoviesList.jsx\` and uncomment the \`Components.AccountsLoginForm\` line.

Next, go ahead and use the form to sign up in order to get your very own user account. 
`;

const after = [
  `
Why hello there **##currentUserName##**! Nice to finally meet you!

Note that if this was the first user account you created inside this project (including other examples), Vulcan will have automatically assigned it admin privileges, and you should see an \`(admin)\` mention next to your username on the right.

If your account is *not* an admin account and you'd like to make it one, run the following code in your Mongo shell (\`meteor mongo\`) and then reload this page:
`,
  `
~~~js
db.users.update({ _id: "##currentUserId##" }, { $set: { isAdmin: true } })
~~~
`,
];

const Step = () => {
  const items = {};
  items.currentUser = useCurrentUser().currentUser;
  return (
    <StepWrapper
      title={Step.title}
      text={text}
      after={after}
      currentUser={items.currentUser}
      check={() => !!items.currentUser}
    />
  );
};

export const checks = [{ file: '/lib/components/movies/MoviesUsers.jsx', string: 'Components.AccountsLoginForm' }];

export default Step;
