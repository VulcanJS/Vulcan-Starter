import { addCallback } from 'meteor/vulcan:core';
import VulcanEmail from 'meteor/vulcan:email';

// TODO: Create a mailto link in the admin mail with a pre-made response based on the inputs
// Something like using their name in the subject or the start of the email would be awesome!

async function createAutomaticRespondEmail(userInput) {
  // Destruct the needed fields from userInput
  const { sendToEmail, userName, emailContent } = userInput;

  // Send email to the email the quest provided
  await VulcanEmail.send(
    sendToEmail,
    "Hi! Thanks for your message ",
    `
    <h3>You wrote:</h3>
    <p>${emailContent}</p>
    <br>
    <p>The humans are notified - they'll get it touch soon.</p>
    `,
  );

  // Define a mail that receives notification on guest submissions
  const toAdmin = 'Vulcan Admin <awesomeVulcanAdmin@vulcan-starter.com>';

  // Send email to the admin
  await VulcanEmail.send(
    toAdmin,
    `Contact-us Form Submission: ${userName} sent a message `,
    `
    <h3>${userName} wrote:</h3>
    <p>${emailContent}</p>
    <br>
    <p>Write them back at the given email: ${sendToEmail}</p>
    <br>
    <p>If you're getting spammed - call or message your admin</p>
    <p>Best regards, Website Admin</p>
    `,
  );
}
addCallback('contactusform.new.async', createAutomaticRespondEmail);
