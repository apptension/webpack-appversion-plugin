Webpack Appversion Plugin
===================

This is a [webpack](http://webpack.github.io/) plugin that automatically displays version number in web application

Installation
------------
Install the plugin with npm:
```shell
$ npm install webpack-appversion-plugin --save
```

or Yarn:
```shell
$ yarn add webpack-appversion-plugin
```

Basic Usage
-----------
The plugin will add version box to your application by prepending code to given entry points

```javascript
var WebpackAppversionPlugin = require('webpack-appversion-plugin');
var webpackConfig = {
  entry: {
    main: './src/main.js'
  },
  output: {
    path: 'dist',
    filename: 'index_bundle.js'
  },
  plugins: [
    new WebpackAppversionPlugin({
      entries: ['main'],
      version: '1.0.0',
    })
  ]
};
```

Configuration
-------------
You can pass configuration options to `WebpackAppversionPlugin`.
Allowed values are as follows:

- `entries`: an array of webpack's entry points which should contain plugin's code
- `version`: a string that will be displayed as version
- `theme`: `'light' | 'dark'` **(default: `'light'`)** color shceme of version box
- `wrapperStyle`: `{}` allows to overwrite version box styles
- `isOpen`: `true | false` **(default: `false`)** determines whether box should be displayed open or closed as default


Here's an example webpack config illustrating how to use these options:
```javascript
{
  entries: ['main'],
  version: '1.0.0',
  theme: 'dark',
  wrapperStyle: { fontSize: '20px', top: 'auto', bottom: '0' },
  isOpen: true
}
```