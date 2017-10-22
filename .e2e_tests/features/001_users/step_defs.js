/* eslint-disable no-undef   */

const LG = console.log; // eslint-disable-line no-console
const linkSign_Begin = `//a[text()[contains(.,'`;
const buttSign_Begin = `//button[text()[contains(.,'`;
const elemSign_End = `')]]`;

const inpUserName = `//input[@id='username']`;
const inpNameOrEmail = `//input[@id='usernameOrEmail']`;
const inpEmail = `//input[@id='email']`;
const inpPwd = `//input[@id='password']`;

const titleMovies = `//div[@class='movies']//h4`;

module.exports = function () {

  this.Given(/^I have clicked on the "([^"]*)" link$/, function (_nameLink) {
    let linkDef = linkSign_Begin + _nameLink + elemSign_End;
    browser.click(linkDef);
  });

  this.Given(/^I have clicked on the "([^"]*)" button\.$/, function (_nameButt) {
    let buttDef = buttSign_Begin + _nameButt + elemSign_End;
    browser.click(buttDef);
  });

  this.When(/^I enter my name "([^"]*)", email "([^"]*)" and password : "([^"]*)",$/, function (name, email, pwd) {

    browser.setValue(inpUserName, name );
    browser.setValue( inpEmail, email );
    browser.setValue( inpPwd, pwd );
//    browser.click( buttSignUp );
  });

  this.Then(/^I see I am allowed to "([^"]*)"\.$/, function ( addMovie ) {
    browser.waitForVisible( titleMovies );
    let foundTitle = browser.getHTML(titleMovies, false);
    expect( foundTitle ).toEqual( addMovie );
  });

  this.Given(/^I am at the main page, "([^"]*)"$/, function ( homePage ) {
    expect( browser.getUrl() ).toEqual( homePage );
  });

  this.When(/^I logout,$/, function () {
    var buttText = `Sign out`;
    browser.click( buttSign_Begin + buttText + elemSign_End );
  });

  this.Then(/^I see the login form again.$/, function () {
    var buttText = `Sign in`;
    expect( browser.getText( buttSign_Begin + buttText + elemSign_End ) ).toEqual( buttText );
  });

  this.When(/^I enter my email "([^"]*)" and password : "([^"]*)",$/, function ( email, pwd ) {
    var buttText = `Sign in`;
    browser.setValue( inpNameOrEmail, email );
    browser.setValue( inpPwd, pwd );
    browser.click( buttSign_Begin + buttText + elemSign_End );
  });

};
