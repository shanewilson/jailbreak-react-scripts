# Jailbreak React Scripts

- [Getting Started](#getting-started)
- [Advanced Configuration](#advanced-configuration)
- [Adding Relay to CRA](#adding-relay-to-cra)
- [Adding Prettier to CRA](#adding-prettier-to-cra)
- [Disable Auto Jailbreak](#disable-auto-jailbreak)

### Getting Started

1. Install `jailbreak-react-scripts`

	```
	npm install --save-dev jailbreak-react-scripts
	```

2. Add `.babelrc` and `.eslintrc` to your project root

	```
	// .babelrc
	{
	  preset: ['react-app']
	}
	```

	```
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

In addtion to using `rc` files to customize your CRA you can directly modify the webpack configuration as well by adding `webpack.jailbreak.js` to your project root.

```
// webpack.jailbreak.js`
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

Running `start` or `build` should now indicate that you are using a modified webpack config:

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

```
{
	"preset": ["react-app"]
	"plugins": ["relay"]
}
```

### Adding Prettier to CRA

The easiest way to intergrate `prettier` into the CRA workflow is to add it to your `.eslintrc`

```
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

If you don't want CRA to use your `.babelrc` or `.eslintrc` settings you can disable that behavior setting ENV flags either on the command line or in an `.env` file.

Disable eslint and babel jailbreaking:

```
// .env
JAILBREAK_ESLINT=
JAILBREAK_BABEL=
```
