const jailbreak = require("..");
// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";

// Ensure environment variables are read.
require("../config/env");

const config = require("react-scripts/config/webpack.config.dev");
if (process.env.JAILBREAK_BABEL) jailbreak.jailbreakBabel(config);
if (process.env.JAILBREAK_ESLINT) jailbreak.jailbreakEslint(config);
jailbreak.jailbreakWebpack(config);

require("react-scripts/scripts/start");
