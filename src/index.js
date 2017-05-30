import path from 'path';
import fs from 'fs';
let ConcatSource = null;

try {
  require.resolve('webpack-core/lib/ConcatSource'); // webpack 1
  ConcatSource = require('webpack-core/lib/ConcatSource')
} catch (e) {}

try {
  require.resolve('webpack-sources/lib/ConcatSource'); // webpack 2
  ConcatSource = require('webpack-sources/lib/ConcatSource')
} catch (e) {}

class AppversionPlugin {
  constructor({ entries, version, theme = 'light', wrapperStyle = {}, isOpen = false}) {
    this.entries = entries;
    this.version = version;
    this.theme = theme;
    this.wrapperStyle = wrapperStyle;
    this.isOpen = isOpen;
  }

  apply(compiler) {
    compiler.plugin('emit', (compilation, callback) => {
      const entryChunks = compilation.getStats().toJson().chunks;

      this.entries.forEach((entry) => {
        entryChunks.forEach((chunk) => {
          if (chunk.names.find(name => name === entry)) {
            const jsFiles = chunk.files.filter((file) => {
              return /.js($|\?)/.test(file);
            });

            jsFiles.forEach((jsFile) => {
              this.appendScript(compilation, jsFile);
            });
          }
        })
      });

      callback();
    });
  }

  leftPadDate(value) {
    if (value < 10) {
      return `0${value}`;
    }
    return `${value}`;
  }


  getCurrentDate() {
    const currentDate = new Date();
    const hours = this.leftPadDate(currentDate.getHours());
    const minutes = this.leftPadDate(currentDate.getMinutes());
    const seconds = this.leftPadDate(currentDate.getSeconds());
    const day = this.leftPadDate(currentDate.getDate());
    const month = this.leftPadDate(currentDate.getMonth() + 1);
    const year = currentDate.getFullYear();

    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
  }

  appendScript(compilation, fileName) {
    const scriptTemplate = fs.readFileSync(path.join(__dirname, 'appversion.js'), { encoding: 'utf8' });
    const scriptOptionsTemplate = `
      window.addEventListener('load', function(){
        var appversion = new Appversion({
          version: '${this.version}',
          date: '${this.getCurrentDate()}',
          theme: '${this.theme}',
          wrapperStyle: ${JSON.stringify(this.wrapperStyle)},
          isOpen: ${this.isOpen}
        });
        appversion.initialize();
      });
    `;

    const template = `
      (function(){
        ${scriptTemplate}
        ${scriptOptionsTemplate}
      })();
    `;

    compilation.assets[fileName] = new ConcatSource(template, '\n', compilation.assets[fileName]);
  }
}

module.exports = AppversionPlugin;