/* eslint-disable no-undef   */

const LG = console.log; // eslint-disable-line no-console
const initialMarker = '//div[@id="react-app"]';
const cukeSubTitle = '//h4[@data-cuke="subTitle"]';

// const cukeFrmSubmit = '//form[@data-cuke="login"]';

// const urlLogout = 'http://localhost:3000/logout';
// const cukeLogin = '//x-cuke[@id="login"]';

// const cukeHrefLogin = '//a[@data-cuke="user-control-login"]';
// const classBrand = '//a[@class="navbar-brand"]';

// const cukeInpEmail = '//input[@data-cuke="email"]';
// const cukeInpPwd = '//input[@data-cuke="password"]';

// const cukeAccountPage = '//x-cuke[@id="account-page"]';
// const cukeAcctEmail = '//x-cuke[@id="acct-email"]';

// const cukeBtnSubmit = '//button[@data-cuke="save-item"]';
// const cukeInpContent = '//textarea[@data-cuke="content"]';

// const cukeDivSubmit = '//div[@data-cuke="save-item"]/input';
// const cukeDivContent = '//div[@data-cuke="content"]/*/textarea';
// const cukeErrorMessage = '//div[@data-cuke="errorMessage"]/*/div';

// const cukeTitle = '//x-cuke[@id="title"]';
// const cukeContent = '//x-cuke[@id="content"]';
// const cukeBadContent = '//div[@data-cuke="bad-content"]';

// const cukeHrefEdit = '//a[@data-cuke="edit-item"]';
// const cukeHrefDelete = '//a[@data-cuke="delete-item"]';

// const cukeWarning = '//x-cuke[@id="warning"]';

// const cukeItemsList = '//ul[@data-cuke="items-list"]';


// let myEmail = '';
// let content = '';
// let href = null;
// let link = '';

module.exports = function () {


  this.Given(/^that I have opened the main page : "([^"]*)"$/, function (urlMain) {
    browser.setViewportSize({ width: 1024, height: 480 });
    browser.timeouts('implicit', 60000);
    browser.timeouts('page load', 60000);

    browser.url(urlMain);
    browser.waitForEnabled(initialMarker, 30000);
  });

  this.Given(/^I purge previous test data$/, function () {
    server.call('system.removeTestData', { testUserName: `You`});
  });

  this.Given(/^that the displayed site name matches the system settings site name\.$/, function () {
    let siteName = server.call('system.getSiteName');
    expect(browser.title().value).toEqual(siteName);
  });

  this.Then(/^the subtitle begins "([^"]*)"\.\.\. package$/, function (expectedSubTitle) {
    let subTitle = browser.getHTML(cukeSubTitle, false).substring(0,16);
    expect(subTitle).toEqual(expectedSubTitle);
    // return 'pending';
  });

  // // Scenario: Log in as administrator
  // // ------------------------------------------------------------------------


  // this.Then(/^I see the login menu item\.$/, function () {
  //   browser.waitForVisible(cukeHrefLogin, 30000);
  // });

  // this.Then(/^I see the navigation header\.$/, function () {
  //   browser.waitForVisible(classBrand, 30000);
  // });

  // this.Given(/^I have opened the login page : "([^"]*)"$/, function (urlLogin) {

  //   browser.setViewportSize({ width: 1024, height: 480 });
  //   browser.url(urlLogout);
  //   browser.waitForExist(cukeLogin, 30000);
  //   browser.url(urlLogin);

  //   server.call('_users.removeByEmail', 'jj@jmail.com');

  //   browser.waitForVisible(cukeHrefLogin, 30000);

  // });

  // this.When(/^I provide my email "([^"]*)" and password "([^"]*)"$/, function (_email, _pwd) {
  //   myEmail = _email;
  //   browser.setValue(cukeInpEmail, myEmail);
  //   browser.setValue(cukeInpPwd, _pwd);
  // });

  // this.When(/^I submit the form$/, function () {
  //   browser.submitForm(cukeFrmSubmit);
  //   browser.waitForExist(cukeAccountPage, 30000);
  // });

  // this.Then(/^I see my user drop\-down menu\.$/, function () {
  //   let idAcct = browser.getText(cukeAcctEmail);
  //   expect(idAcct).toEqual(myEmail);
  // });

  // this.When(/^I save the item,$/, function () {
  //   browser.click(cukeBtnSubmit);
  // });

  // this.When(/^I submit the item,$/, function () {
  //   browser.click(cukeDivSubmit);
  // });

  // this.When(/^I save the item with new content "([^"]*)",$/, function (_content) {
  //   content = _content;
  //   browser.setValue(cukeInpContent, content);
  //   browser.click(cukeBtnSubmit);
  // });

  // this.When(/^I submit the item with new content "([^"]*)",$/, function (_content) {
  //   content = _content;
  //   browser.setValue(cukeDivContent, content);
  //   browser.click(cukeDivSubmit);
  // });

  // this.Then(/^I see the record with the new content\.$/, function () {
  //   browser.waitForEnabled( cukeTitle, 30000 );
  //   expect(browser.getText(cukeContent)).toEqual(content);
  // });

  // this.Then(/^I see the message, "([^"]*)"\.$/, function (_msg) {
  //   browser.waitUntil(function () {
  //     return browser.getText(cukeBadContent).length > 0;
  //   }, 30000, 'expected text to be there after 5s');

  //   const msg = browser.getText(cukeBadContent);
  //   expect( msg ).toEqual(_msg);
  // });

  // this.Then(/^I see the error message, "([^"]*)"\.$/, function (_msg) {
  //   browser.waitUntil(function () {
  //     return browser.getText(cukeErrorMessage).length > 0;
  //   }, 30000, 'expected text to be there after 5s');

  //   const msg = browser.getText(cukeErrorMessage);
  //   expect( msg ).toEqual(_msg);

  // });

  // let ssDate = null;
  // this.Given(/^I have elected to edit the "([^"]*)" item,$/, function (_item) {

  //   // console.log("waiting for cukeItemsList : %s ", cukeItemsList);
  //   browser.waitUntil(function () { return browser.isExisting(cukeItemsList);
  //   }, 3000, ' never saw list! ', 500);

  //   link = '//a[@data-cuke="' + _item + '"]';
  //   // console.log("waiting for link : %s ", link);
  //   browser.waitForExist( link );
  //   browser.click(link);
  //   browser.waitForEnabled( cukeHrefEdit );
  //   browser.click(cukeHrefEdit);
  // });



  // this.When(/^I elect to delete the item,$/, function () {
  //   href = cukeHrefDelete;

  //   browser.waitForExist( href, 30000 );

  // });

  // this.Then(/^I see it is disabled\.$/, function () {
  //   expect(browser.isEnabled( href )).toBe(true);
  // });

  // this.When(/^I attempt to edit the item,$/, function () {
  //   href = cukeHrefEdit;
  //   browser.waitForExist( href, 30000 );
  // });

  // this.Then(/^I see the warning "([^"]*)"$/, function (_warning) {
  //   expect(_warning).toEqual(browser.getText(cukeWarning));
  // });

  // this.Given(/^I have elected to "([^"]*)" the "([^"]*)" item\.$/, function (_cmd, _item) {

  //   // console.log("waiting for cukeItemsList : %s ", cukeItemsList);
  //   browser.waitUntil(function () { return browser.isExisting(cukeItemsList);
  //   }, 3000, ' never saw list! ', 500);

  //   link = '//a[@data-cuke="' + _item + '"]';
  //   // console.log("waiting for link : %s ", link);
  //   browser.waitForEnabled( link );
  //   browser.click(link);
  //   // console.log("Clicked : %s ", link);
  //   let cukeHrefCmd = '//a[@data-cuke="' + _cmd + '-item"]';
  //   // console.log("waiting for cukeHrefCmd : %s ", cukeHrefCmd);
  //   browser.refresh();
  //   browser.waitForEnabled( cukeHrefCmd );
  //   browser.click( cukeHrefCmd );

  // });

  // this.Then(/^I no longer see that record\.$/, function () {

  //   // console.log("waiting for cukeItemsList : %s ", cukeItemsList);
  //   browser.waitUntil(function () { return browser.isExisting(cukeItemsList);
  //   }, 3000, ' never saw list! ', 500);

  //   browser.timeouts('implicit', 1000);
  //   // browser.saveScreenshot('/tmp/logs/meteor/' + cnt++ + itm + '.png');
  //   // console.log("Getting ", link);
  //   let listItem = browser.elements(link);
  //   browser.waitUntil(function () {
  //   // console.log(link + ' still there?');
  //     // browser.saveScreenshot('/tmp/logs/meteor/' + cnt++ + itm + '.png');
  //     listItem = browser.elements(link);
  //     // console.log("Got list item ", listItem);
  //     // console.log("Got list item.value ", listItem.value);
  //     // console.log("Got list item.value.length ", listItem.value.length);
  //     return ( listItem.value.length < 1 );
  //   }, 30000, ' what the?', 2000);
  //   expect(listItem.value.length).toEqual(0);
  // });

// =======================================================================

};
