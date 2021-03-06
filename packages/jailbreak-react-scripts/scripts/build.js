const jailbreak = require("..");
// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";

// Ensure environment variables are read.
require("../config/env");

const config = require(jailbreak.getScriptName() +
  "/config/webpack.config.prod");
if (process.env.JAILBREAK_BABEL === "yes") jailbreak.jailbreakBabel(config);
if (process.env.JAILBREAK_ESLINT === "yes") jailbreak.jailbreakEslint(config);
jailbreak.jailbreakWebpack(config);

require(jailbreak.getScriptName() + "/scripts/build");
