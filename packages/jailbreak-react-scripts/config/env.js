const jailbreak = require("..");
require(jailbreak.getScriptName() + "/config/env");

const no = ["0", "false", "off", "no"];
process.env.JAILBREAK_BABEL = no.indexOf(process.env.JAILBREAK_BABEL) > -1
  ? "no"
  : "yes";
process.env.JAILBREAK_ESLINT = no.indexOf(process.env.JAILBREAK_ESLINT) > -1
  ? "no"
  : "yes";
