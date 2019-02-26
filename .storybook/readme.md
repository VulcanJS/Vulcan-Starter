# Using Storybook with Vulcan.js

1. Follow the [2-repo install instructions](http://docs.vulcanjs.org/#Two-Repo-Install-Optional).
2. In your **Vulcan** repo, run `yarn` to install all packages*.
3. In your app repo, modify `.storybook/webpack.config.js` to point to your Vulcan directory and UI library directory (this can be a different directory altogether).
4. In your **app** repo, run `yarn storybook`

Note that Storybook requires that all Vulcan code be checked out locally and available on your disk. Storybook will not be able to use code stored within Meteor packages. 

---

*Note: step 2. is currently required because files loaded from your Vulcan repo seem to load npm packages from that repo's `node_modules` directory instead of the `node_modules` in your app repo. This is not ideal and should be fixed ultimately.