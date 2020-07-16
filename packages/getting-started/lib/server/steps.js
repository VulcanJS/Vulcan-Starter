import fs from "fs";
import util from "util";
import Movies from '../modules/collection.js';

const specialChecks = {
  seedCheck: async () => {
    return await Movies.find().count() > 0;
  }
}

const readFile = util.promisify(fs.readFile);

const stepCount = 21;

const getStepPath = (step = 0) => `../components/steps/Step${step}.jsx`;

const getFilePath = (filePath) => {
  // eslint-disable-next-line no-undef
  const absolutePath = __meteor_bootstrap__.serverDir
    .split("/")
    .slice(1, -5)
    .join("/");
  const prefix = `/${absolutePath}/packages/getting-started`;
  const fullPath = `${prefix}${filePath}`;
  return fullPath;
};

const passCheck = async (step, { file, string, specialCheck }) => {
  if (specialCheck) {
    return await specialChecks[specialCheck]();
  }
  // if no file is passed, default to checking in current step component file
  const filePath = file ? file : `/lib/components/steps/Step${step}.jsx`;
  // get file contents and remove all commented code
  const fileContents = await readFile(getFilePath(filePath), "utf8");
  const cleanFileContents = removeComments(fileContents);
  // check if file contents include check's search string
  return cleanFileContents.includes(string);
};

const removeComments = (s) =>
  s.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, "$1");

export const getSteps = async () => {
  // iterate over all steps
  const steps = [...Array(stepCount).keys()].map(async (step) => {
    let passAllChecks = true;
    // require step component file to get access to its metadata
    const file = require(getStepPath(step));
    const { title = '', checks = [] } = file;
    // note: if there are no checks step is automatically considered completed
    for (const check of checks) {
      const isOK = await passCheck(step, check);
      if (!isOK) {
        passAllChecks = false;
      }
    }
    // const passAllChecks = checks.every(async check => await passCheck(step, check));
    return {
      step,
      title,
      completed: passAllChecks,
    };
  });
  return steps;
};
