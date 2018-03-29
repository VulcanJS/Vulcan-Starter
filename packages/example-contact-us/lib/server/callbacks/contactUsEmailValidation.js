import { addCallback } from 'meteor/vulcan:core';
import { createError } from 'apollo-errors';
import {
  EmailValidation,
  EmailExp,
} from 'regular-expression-validation/lib/EmailRegExp';

// Validate the email according to RFC and Mozilla
// the RegExp used is based on common practices
// It is expanded to include æøå characters
async function validateGuestInput(userInput) {
   try {

    if (!EmailValidation(EmailExp, userInput.sendToEmail)) {
      const ValidationError = createError('contactUs.validation_error', {
        message: 'You need to use a proper email address',
      });
      throw new ValidationError({
        data: { break: true, value: EmailValidation },
      });

    }

  } catch (error) {
    console.error(`----\nValidation error:`);
    throw error;
  }
  // No error occurred, continue db operation.
  return userInput;
}
addCallback('contactusform.new.before', validateGuestInput);
