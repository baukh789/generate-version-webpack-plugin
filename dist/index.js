const fs = require('fs');
const path = require('path');
const gridmanager = fs.readFileSync(path.join(__dirname, './js/gm.js'), {encoding: 'UTF-8'});
const css = fs.readFileSync(path.join(__dirname, './css/gm.css'), {encoding: 'UTF-8'});
const versionHtml = fs.readFileSync(path.join(__dirname, './version.html'), {encoding: 'UTF-8'});


const defaultType = {
    '1': {
        text: '新增',
        style: 'color: green'
    },
    '2': {
        text: '修复',
        style: 'color: red'
    },
    '3': {
        text: '优化',
        style: 'color: orange'
    }
};

let defaultDataPath = './version.json';

class VersionPlugin {
    /**
     * 构造
     * @param type: 版本信息类型，需要与 defaultType 格式匹配
     * @param dataPath: json文件路径，需要为绝对路径，默认为path.join(__dirname, './version.json')
     */
    constructor({type, dataPath} = {}) {
        const versionList = require(path.resolve(__dirname, dataPath || defaultDataPath));
        const ajaxData = {
            data: versionList,
            totals: versionList.length
        };
        this.indexSrc = `var ajaxData=${JSON.stringify(ajaxData)};var versionType=${JSON.stringify(type || defaultType)};`;
    }

    apply(compiler) {
        compiler.hooks.emit.tap('VersionPlugin', compilation => {
            console.log('VersionPlugin run ...');
            compilation.assets['version/index.html'] = {
                source: function() {
                    return versionHtml;
                },
                size: function() {
                    return versionHtml.length;
                }
            };

            compilation.assets['version/index.js'] = {
                source: () => {
                    return this.indexSrc;
                },
                size: () => {
                    return this.indexSrc.length;
                }
            };

            compilation.assets['version/style.css'] = {
                source: function() {
                    return css;
                },
                size: function() {
                    return css.length;
                }
            };

            compilation.assets['version/gridmanager.js'] = {
                source: function() {
                    return gridmanager;
                },
                size: function() {
                    return gridmanager.length;
                }
            };
        });
    }
}

module.exports = VersionPlugin;
