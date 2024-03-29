const fs = require('fs');
const path = require('path');
const gmJs = fs.readFileSync(path.join(__dirname, './js/gm.js'), {encoding: 'UTF-8'});
const gmCss = fs.readFileSync(path.join(__dirname, './css/gm.css'), {encoding: 'UTF-8'});
const style = fs.readFileSync(path.join(__dirname, './css/style.css'), {encoding: 'UTF-8'});
const initJs = fs.readFileSync(path.join(__dirname, './js/init.js'), {encoding: 'UTF-8'});
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
let defaultTitle = '更新日志';

class VersionPlugin {
    /**
     * 构造
     * @param type: 版本信息类型，需要与 defaultType 格式匹配
     * @param dataPath: json文件路径，需要为绝对路径，默认为path.join(__dirname, './version.json')
     */
    constructor({type, dataPath, title} = {}) {
        const versionList = require(path.resolve(__dirname, dataPath || defaultDataPath));

        this.versionData = `window.versionTitle=${JSON.stringify(title || defaultTitle)};window.versionList=${JSON.stringify(versionList)};window.versionType=${JSON.stringify(type || defaultType)};`;
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

	        compilation.assets['version/versionData.js'] = {
		        source: () => {
			        return this.versionData;
		        },
		        size: () => {
			        return this.versionData.length;
		        }
	        };


	        compilation.assets['version/init.js'] = {
		        source: () => {
			        return initJs;
		        },
		        size: () => {
			        return initJs.length;
		        }
	        };

	        compilation.assets['version/style.css'] = {
		        source: function() {
			        return style;
		        },
		        size: function() {
			        return style.length;
		        }
	        };

            compilation.assets['version/gridmanager.css'] = {
                source: function() {
                    return gmCss;
                },
                size: function() {
                    return gmCss.length;
                }
            };

            compilation.assets['version/gridmanager.js'] = {
                source: function() {
                    return gmJs;
                },
                size: function() {
                    return gmJs.length;
                }
            };
        });
    }
}

module.exports = VersionPlugin;
