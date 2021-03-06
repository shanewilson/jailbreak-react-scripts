var chalk = require("chalk");

function getScriptName() {
  return process.env.JAILBREAK_SCRIPTS || "react-scripts";
}

function matchLoader(rule, loader) {
  if (rule.use) {
    return findRuleByLoader(rule.use, loader);
  }
  // support react-scripts@1.0.11 and webpack 3
  if (rule.oneOf) {
    return findRuleByLoader(rule.oneOf, loader);
  }

  if (rule.loader) {
    return rule.loader.indexOf(loader) !== -1;
  }
  // support use: [ require.resolve('style-loader'),
  return rule.indexOf(loader) !== -1;
}

function findRuleByLoader(rules, loader) {
  return rules.find(function(rule) {
    return matchLoader(rule, loader);
  });
}

function jailbreakBabel(config) {
  var rule = findRuleByLoader(config.module.rules, "babel-loader");
  // support react-scripts@1.0.11 and webpack 3
  if (rule.oneOf) {
    rule = findRuleByLoader(rule.oneOf, "babel-loader");
  }

  Object.assign(rule.options, {
    babelrc: true,
    presets: []
  });
  console.log(
    chalk.green("success") + " " + chalk.white("Jailbreaking Babel!")
  );
}

function jailbreakEslint(config) {
  var rule = findRuleByLoader(config.module.rules, "eslint-loader");
  var loader = findRuleByLoader(rule.use, "eslint-loader");
  Object.assign(loader.options, {
    useEslintrc: true,
    ignore: true
  });
  console.log(
    chalk.green("success") + " " + chalk.white("Jailbreaking ESLint!")
  );
}

function jailbreakWebpack(config) {
  var filename = "webpack.jailbreak.js";
  var path = require("path");

  var fs = require("fs");
  var appPath = require(getScriptName() + "/config/paths").appPath;
  var webpackConfigPath = path.resolve(appPath, filename);
  if (fs.existsSync(webpackConfigPath)) {
    console.log(
      chalk.blue("info") + " " + chalk.white("Found " + filename + "!")
    );
    require(webpackConfigPath)(config);
    console.log(
      chalk.green("success") +
        " " +
        chalk.white("Using modified webpack config!")
    );
  }
}

module.exports = {
  matchLoader: matchLoader,
  findRuleByLoader: findRuleByLoader,
  jailbreakBabel: jailbreakBabel,
  jailbreakEslint: jailbreakEslint,
  jailbreakWebpack: jailbreakWebpack,
  getScriptName: getScriptName
};
