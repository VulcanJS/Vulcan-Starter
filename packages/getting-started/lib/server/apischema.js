import { getSetting } from 'meteor/vulcan:core';
import fetch from 'node-fetch';

const getUrl = (imdbId) =>
  `http://www.omdbapi.com/?apikey=${getSetting('omdb.apiKey')}&i=${imdbId}`;

// uncomment on #Step11
// export const apiSchema = {
//   score: {
//     typeName: 'Float',
//     resolver: async ({ imdbId }) => {
//       const response = await fetch(getUrl(imdbId), { method: 'GET' });
//       const json = await response.json();
//       return json.imdbRating;
//     },
//   },
// };
