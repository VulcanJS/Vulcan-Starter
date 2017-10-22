/* eslint-disable no-undef   */

const LG = console.log; // eslint-disable-line no-console
const inpMovieName = `//div[@class="form-group row"]//input[@name="name"]`;
const inpMovieYear = `//div[@class="form-group row"]//input[@name="year"]`;
const txtMovieReview = `//div[@class="form-group row"]//textarea[@name="review"]`;
const buttSign_Begin = `//div[@class="form-submit"]//span[text()[contains(.,'`;
const elemSign_End = `')]]`;

const cardFirstMovie=`(//div[@class="datacard datacard-movies"])[1]`;
const cardAttr_Open=`//tr[td[@class='datacard-label']/strong[text()[contains(.,'`;
const cardAttr_Cloz=`')]]]`;
const cardAttr_Value=`/td[@class='datacard-value']//span`;

module.exports = function () {

  let movieName = null;
  let movieYear = null;
  let movieReview = null;
  this.Given(/^I enter a movie "([^"]*)" from "([^"]*)"$/, function ( _movieName, _movieYear ) {
    movieName = _movieName;
    movieYear = _movieYear;
    browser.setValue(inpMovieName, movieName );
    browser.setValue(inpMovieYear, movieYear );
  });

  this.Given(/^I enter a movie review "([^"]*)"$/, function ( _movieReview ) {
    movieReview = _movieReview;
    browser.setValue(txtMovieReview, movieReview );
  });

  this.When(/^I click the "([^"]*)" button\.$/, function (buttName) {
    let submit = buttSign_Begin + buttName + elemSign_End;
    browser.click( submit );
    browser.waitForVisible( cardFirstMovie );
  });

  let fld = null;
  let val = null;
  this.Then(/^I see the movie details at the top of the list below\.$/, function () {
    fld = cardFirstMovie + cardAttr_Open + `Name` + cardAttr_Cloz + cardAttr_Value;
    val = browser.getHTML( fld, false );
    expect( val ).toEqual( movieName );

    fld = cardFirstMovie + cardAttr_Open + `Year` + cardAttr_Cloz + cardAttr_Value;
    val = browser.getHTML( fld, false );
    expect( val ).toEqual( movieYear );

    fld = cardFirstMovie + cardAttr_Open + `Review` + cardAttr_Cloz + cardAttr_Value;
    val = browser.getHTML( fld, false );
    expect( val ).toEqual( movieReview );

  });

//   this.Given(/^I have clicked on the "([^"]*)" link$/, function (_nameLink) {
//     let linkDef = linkSign_Begin + _nameLink + elemSign_End;
//     LG(linkDef);
//     browser.click(linkDef);
//     LG( `clicked` );
//   });

//   this.Given(/^I have clicked on the "([^"]*)" button\.$/, function (_nameButt) {
//     let buttDef = buttSign_Begin + _nameButt + elemSign_End;
//     LG(buttDef);
//     browser.click(buttDef);
//     LG( `clicked` );
//   });

//   this.When(/^I enter my name "([^"]*)", email "([^"]*)" and password : "([^"]*)",$/, function (name, email, pwd) {

//     browser.setValue(inpUserName, name );
//     browser.setValue( inpEmail, email );
//     browser.setValue( inpPwd, pwd );
// //    browser.click( buttSignUp );
//   });

//   this.Then(/^I see I am allowed to "([^"]*)"\.$/, function ( addMovie ) {
//     browser.waitForVisible( titleMovies );
//     let foundTitle = browser.getHTML(titleMovies, false);
//     expect( foundTitle ).toEqual( addMovie );
//   });

//   this.Given(/^I am at the main page, "([^"]*)"$/, function ( homePage ) {
//     expect( browser.getUrl() ).toEqual( homePage );
//   });

//   this.When(/^I logout,$/, function () {
//     var buttText = `Sign out`;
//     LG( buttSign_Begin + buttText + elemSign_End );
//     browser.click( buttSign_Begin + buttText + elemSign_End );
//   });

//   this.Then(/^I see the login form again.$/, function () {
//     var buttText = `Sign in`;
//     expect( browser.getText( buttSign_Begin + buttText + elemSign_End ) ).toEqual( buttText );
//   });

//   this.When(/^I enter my email "([^"]*)" and password : "([^"]*)",$/, function ( email, pwd ) {
//     var buttText = `Sign in`;
//     browser.setValue( inpNameOrEmail, email );
//     browser.setValue( inpPwd, pwd );
//     browser.click( buttSign_Begin + buttText + elemSign_End );
//   });

};
