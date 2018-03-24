import { addCallback } from 'meteor/vulcan:core';
import { createError } from 'apollo-errors';

import ContactUsForm from '../../modules/contact-us/collection';

/*
 *  Require the guest to wait more than X seconds between operations
 */

// Rate-limit database operations from guests
async function rateLimitAutomaticRespondEmails(userInput) {
  // Find the latest db entry, sort by creation date
  const latestDBEntry = await ContactUsForm.findOne(
    {},
    { sort: [['createdAt', 'desc']] },
  );

  // If no entries exist, continue db operation.
  if(await latestDBEntry === undefined) {
    return userInput;
  }

  try {
    // When was the last db entry in ms?
    const latestEntryDateMS = Date.parse(latestDBEntry.createdAt);
    // What time is it?
    const now = new Date();
    // How many ms from 1970's to now?
    const nowMS = Date.parse(now);

    /*
     * If the last db operation was less than 30 seconds ago;
     * Return without finishing the operation and
     * display a client-side message about why the guest have to wait.
     */

    if (nowMS - latestEntryDateMS < 30000) {
      const RateLimitError = createError('contactUs.rate_limit_error', {
        message: 'We are getting a lot of love, please try again soon.',
      });
      throw new RateLimitError({
        data: { break: true, value: nowMS - latestEntryDateMS },
      });

    }

    /* Let's debug!
     * console.info(`The latest DB entry: ${latestDBEntry.createdAt}`);
     * console.info(`Right now: ${now}`);
     * console.info(`Attempt made at: ${userInput.createdAt}`);
     * console.info(
     *   `Time from last attempt to now: ${nowMS - latestEntryDateMS}ms`,
     * );
     */

  } catch (error) {
    console.error(`----\nRate-limiting error: \n\n${error.stack}`);
    throw error;
  }
  // No error occurred, continue db operation.
  return userInput;
}
addCallback('contactusform.new.sync', rateLimitAutomaticRespondEmails);
