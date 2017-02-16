import path from 'path';
import fs from 'fs';
import ConcatSource from 'webpack-core/lib/ConcatSource';

function AppversionPlugin(options) {
  this.entries = options.entries;
}

AppversionPlugin.prototype.appendScript = (compilation, fileName) => {
  const scriptTemplate = fs.readFileSync(path.join(__dirname, 'script.js'), { encoding: 'utf8' });
  const scriptOptionsTemplate = `
    window.onload = function() {
      var appversion = new Appversion({
        version: '${'0.0.1'}'
      });
      appversion.initialize();
    };
  `;
  const template = `${scriptTemplate}\n${scriptOptionsTemplate}`;

  compilation.assets[fileName] = new ConcatSource(template, '\n', compilation.assets[fileName]);
};

AppversionPlugin.prototype.apply = function(compiler) {
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
};

export default AppversionPlugin;