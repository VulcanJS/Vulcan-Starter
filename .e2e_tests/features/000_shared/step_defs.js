/* eslint-disable no-undef   */

const LG = console.log; // eslint-disable-line no-console
const initialMarker = '//div[@id="react-app"]';
const cukeSubTitle = '//h4[@data-cuke="subTitle"]';

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
  });


// =======================================================================

};
