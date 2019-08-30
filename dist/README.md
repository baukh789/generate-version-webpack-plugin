# generate-version-webpack-plugin
> 在webpack中配置，在构建项目时会在`output`指定目录下生成`version`文件夹。通过访问`version/index.html`，即可进行版本信息展示。

## 效果展示
> 共支持两种展现形式，可在使用中自由切换。
### 效果一
![img](https://segmentfault.com/img/bVbw23o?w=787&h=473)

### 效果二
![img](https://segmentfault.com/img/bVbw23s?w=781&h=470)

## 使用方式
### 安装
```
npm install generate-version-webpack-plugin --save-dev
```
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
    // 指定显示title [当前展示的为默认值]
    title: '更新日志',

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
