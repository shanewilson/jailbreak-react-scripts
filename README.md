# Jailbreak React Scripts

- [Getting Started](#getting-started)
- [Advanced Configuration](#advanced-configuration)
- [Adding Relay to CRA](#adding-relay-to-cra)
- [Adding Prettier to CRA](#adding-prettier-to-cra)
- [Disable Auto Jailbreak](#disable-auto-jailbreak)
- [Using with Custom React Scripts](#using-with-custom-react-scripts)

### Getting Started

1. Install `jailbreak-react-scripts`

	```
	npm install --save-dev jailbreak-react-scripts
	```

2. Add `.babelrc` and `.eslintrc` to your project root

	```js
	// .babelrc
	{
	  preset: ['react-app']
	}
	```

	```js
	// .eslintrc
	{
	  "extends": ["react-app"]
	}
	```

3. Update your `package.json` to use `jailbreak-react-scripts` in your npm scripts in place of `react-scripts`

	```diff
	// package.json
	scripts: {
	-  start: react-scripts start,
	-  build: react-scripts build,
	+  start: jailbreak-react-scripts start,
	+  build: jailbreak-react-scripts build,
	}
	```

4. When you run `start` or `build` you should see a notice that your `rc` files are being used:

	```
	❯ yarn build
	yarn build v0.17.4
	$ jailbreak-react-scripts build
	success Jailbreaking Babel!
	success Jailbreaking ESLint!
	Creating an optimized production build...
	```

### Advanced Configuration

Besides using `rc` files to customize your CRA you can change the webpack configuration as well by adding `webpack.jailbreak.js` to your project root.

```js
// webpack.jailbreak.js
const merge = require('webpack-merge');

module.exports = function jailbreakWebpackConfig(config) {
	return merge(config, {
	  module: {
	    loaders: [
	      {
	        test: /\.css$/,
	        loaders: ['style', 'css'],
	      }
	    ]
	  }
	})
};

```

Running `start` or `build` should now show that you are using a modified webpack config:

```
❯ yarn build
yarn build v0.17.4
$ jailbreak-react-scripts build
success Jailbreaking Babel!
success Jailbreaking ESLint!
info Found webpack.jailbreak.js!
success Using modified webpack config!
Creating an optimized production build...
```

### Adding Relay to CRA

The easiest way to intergrate `relay` into the CRA workflow is to add it to your `.babelrc`

```js
{
	"preset": ["react-app"]
	"plugins": ["relay"]
}
```

### Adding Prettier to CRA

The easiest way to integrate `prettier` into the CRA workflow is to add it to your `.eslintrc`

```js
// .eslintrc
{
	"extends": ["react-app", "prettier"],
	"plugins": ["prettier"],
	"rules": {
		"prettier/prettier": 1
	}
}
```

### Disable Auto Jailbreak

If you don't want CRA to use your `.babelrc` or `.eslintrc` settings you can disable that behavior setting ENV flags either on the command line or in an `.env` file. Any of `no`, `off`, `false` or `0` will disable the jailbreak.

Disable eslint and babel jailbreaking:

```
// .env
JAILBREAK_ESLINT=no
JAILBREAK_BABEL=no
```

### Using with Custom React Scripts

This can also be used with modified `react-scripts` are installed under a different package name (ex. [reason-scripts](https://github.com/rrdelaney/reason-scripts))

Note that this cannot be done using a `.env` file.

```diff
// package.json
scripts: {
-  start: jailbreak-react-scripts start,
-  build: jailbreak-react-scripts build,
+  start: JAILBREAK_SCRIPTS=reason-scripts jailbreak-react-scripts start,
+  build: JAILBREAK_SCRIPTS=reason-scripts jailbreak-react-scripts build,
}
```

Example: Have Bucklescript output ES Modules rather than CommonJS

```js
// webpack.jailbreak.js
const jailbreak = require('jailbreak-react-scripts')

module.exports = function jailbreakWebpackConfig(config) {
  const bsRule = jailbreak.findRuleByLoader(config.module.rules, 'bs-loader')
  const bsLoader = jailbreak.findRuleByLoader(bsRule.use, 'bs-loader')

  Object.assign(bsLoader, {
    options: {
      module: 'es6'
    }
  });
};
```
