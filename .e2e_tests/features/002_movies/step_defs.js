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


};
