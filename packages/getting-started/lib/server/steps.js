import fs from "fs";
import util from "util";
import Movies from "../modules/collection.js";

const specialChecks = {
  seedCheck: async () => {
    if (typeof Movies === 'undefined') {
      return false;
    }
    return (await Movies.find().count()) > 0;
  },
};

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
  const cleanFileContents = cleanContents(fileContents);
  // check if file contents include check's search string
  return cleanFileContents.includes(string);
};

export const cleanContents = (s) => {
  
  // remove JS comments
  s = s.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, "$1");

  // remove line starting with `export const checks` and `import`
  // see https://stackoverflow.com/a/7159870
  s = s.replace(/^export const checks.*$/gm, '');
  s = s.replace(/^import.*$/gm, '');

  // remove lines starting with # (GraphQL comments)
  s = s.replace(/^ *\#.*$/gm, '');

  return s;
};

export const getSteps = async () => {
  // iterate over all steps
  const steps = [...Array(stepCount).keys()].map(async (step) => {
    let passAllChecks = true;
    // require step component file to get access to its metadata
    const file = require(getStepPath(step));
    const { title = '', checks = [] } = file;
    const progress = [];
    // note: if there are no checks step is automatically considered completed
    for (const check of checks) {
      const isOK = await passCheck(step, check);
      progress.push(isOK);
      if (!isOK) {
        passAllChecks = false;
      }
    }
    // const passAllChecks = checks.every(async check => await passCheck(step, check));
    return {
      step,
      title,
      progress,
      completed: passAllChecks,
    };
  });
  return steps;
};
