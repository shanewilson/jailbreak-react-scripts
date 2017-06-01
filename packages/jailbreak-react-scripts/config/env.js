require("react-scripts/config/env");

process.env.JAILBREAK_BABEL = typeof process.env.JAILBREAK_BABEL !== "undefined"
  ? process.env.JAILBREAK_BABEL
  : true;
process.env.JAILBREAK_ESLINT = typeof process.env.JAILBREAK_ESLINT !==
  "undefined"
  ? process.env.JAILBREAK_ESLINT
  : true;
