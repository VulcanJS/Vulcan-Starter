import { Selector } from "testcafe"; // first import testcafe selectors

fixture`Getting Started`.page`http://localhost:3000`; // declare the fixture // specify the start page

//then create a test and place your code there
test("Load the getting-started package", async t => {
  await t
    .expect(Selector("#react-app .step .step-text h2").innerText)
    .eql("Welcome to Vulcan!");
});

test("Enable only first step", async t => {
  const firstStep = Selector(".nav .nav-item:nth-child(2) a");
  const otherSteps = Array(19)
    .fill()
    .map((val, idx) => Selector(`.nav .nav-item:nth-child(${idx + 3}) a`));
  //const secondStep = Selector(".nav .nav-item:nth-child(3) a");
  await t.expect(firstStep.exists).ok();
  await Promise.all(otherSteps.map(s => t.expect(s.exists).notOk()));
});
