# generate-version-webpack-plugin
> 在webpack中配置，在构建项目时会生成在`output`指定目录下生成`version`文件夹。通过访问`version/index.html`，即可进行版本信息展示。

## 使用方式
### 创建version.json文件，用于填写版本信息
> 文件名需要与指定的`dataPath`值匹配，`dataPath`默认为 `path.join(__dirname, './version.json')`
```
[
    {
        "number": "v0.0.1",
        "date": "2019-08-28",
        "list": [
            {
                "type": "1",
                "value": "init generate-version-webpack-plugin"
            },
            {
                "type": "1",
                "value": "support customize type and dataPath"
            }
        ]
    }
]
```

### 在webpack 中进行配置
```
plugins: [
    new VersionPlugin()
]
```

### 配置参数
```
new VersionPlugin({
    // 指定版本信息数据的绝对路径, 必设项。 [默认值使用数据为插件自身的版本信息]
    dataPath: path.join(__dirname, './version.json'),

    // 配置version.json 中 的list.type 值文本对应关系 [当前展示的为默认值]
    type: {
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
    }
})
```

