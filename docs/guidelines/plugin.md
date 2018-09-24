# PostCSS 插件指南

一个 PostCSS 插件是一个用于接收或从 PostCSS 编译器中转换 CSS 抽象语法树的函数。

对所有的 PostCSS 插件，下列的规则都是 **强制的**。

另请参阅 [ClojureWerkz的建议] 来了解开源项目。

[ClojureWerkz 的建议]:  http://blog.clojurewerkz.org/blog/2013/04/20/how-to-make-your-open-source-project-really-awesome/

## 1. API

### 1.1 带有 `postcss-` 前缀的清晰的命名

插件的用图应该单凭其名字就能清晰知晓。如果你写一个编译器用于 CSS 4 自定义媒体属性，`postcss-custom-media`会是一个好名字。
如果你写一个插件用于支持 mixins，`postcss-mixins` 会是一个好名字。

前缀 `postcss-` 显示，该插件是 PostCSS 生态系统的一部份。

对于可作为独立工具运行的插件，此规则不是必需的，没有用户必须知道它是由 PostCSS支持的
- 例如，[cssnext]和[Autoprefixer]。

[Autoprefixer]: https://github.com/postcss/autoprefixer
[cssnext]:      http://cssnext.io/

### 1.2. 只做一件事，并将它做好

不要创建多工具插件。几个小的，单一用途的插件捆绑在一个插件包中通常是更好的解决方案。

例如，[cssnext] 包含许多小插件，每个 W3C 规范对应一个。 [cssnano] 针对每个优化包含一个单独的插件。

[cssnext]: http://cssnext.io/
[cssnano]: https://github.com/ben-eb/cssnano

### 1.3. 不要使用 mixins

预处理器如 Compass 会提供一个带有 mixins 的 API。

PostCSS 插件则不同。


一个插件不能只是 [postcss-mixins] 的一组mixins。要实现您的目标，请考虑转换有效的CSS或使用自定义的规则和自定义属性。

[postcss-mixins]: https://github.com/postcss/postcss-mixins

### 1.4. 通过 `postcss.plugin` 创建插件

通过将函数包装在此方法中，你正在接入一个常见的插件API：

```js
module.exports = postcss.plugin('plugin-name', function (opts) {
    return function (root, result) {
        // 插件代码
    };
});
```

## 2. 加工

### 2.1. 插件必须要被测试

一个像 [Travis] 的 持续集成服务被推荐用于在不同的环境中测试代码。你（至少）应该在 Node.js 的 [active LTS](https://github.com/nodejs/LTS)  和当前稳定版本中测试。

[Travis]: https://travis-ci.org/

### 2.2. 如有可能请使用异步方法

譬如，使用 `fs.writeFile` 而不是 `fs.writeFileSync`:

```js
postcss.plugin('plugin-sprite', function (opts) {
    return function (root, result) {

        return new Promise(function (resolve, reject) {
            var sprite = makeSprite();
            fs.writeFile(opts.file, function (err) {
                if ( err ) return reject(err);
                resolve();
            })
        });

    };
});
```

### 2.3. 为新的节点设置 `node.source`

每一个节点必须有一个相关的 `source`，那样 PostCSS 才能生成一个精确的 source map。

因此，如果你基本现存的声明新增声明，你应该拷贝现存的声明以保存原有的 `source`。

```js
if ( needPrefix(decl.prop) ) {
    decl.cloneBefore({ prop: '-webkit-' + decl.prop });
}
```

你也可以直接设置 `source`，从现存的节点中复制：

```js
if ( decl.prop === 'animation' ) {
    var keyframe = createAnimationByName(decl.value);
    keyframes.source = decl.source;
    decl.root().append(keyframes);
}
```

### 2.4. 请只使用公开的 PostCSS API

PostCSS插件不能依赖于未记录的属性或方法，在任何次要版本中可能会有所变化。公共API
在[API docs]中描述。

[API docs]: http://api.postcss.org/

## 3. 错误

### 3.1. 对 CSS 相关错误使用`node.error`

如果由于输入CSS而导致错误（如未知名称）在mixin插件中）你应该使用`node.error`来创建一个错误
包括来源位置：

```js
if ( typeof mixins[name] === 'undefined' ) {
    throw decl.error('Unknown mixin ' + name, { plugin: 'postcss-mixins' });
}
```

### 3.2. 对警告使用 `result.warn`

请不要用 `console.log` 或者 `console.warn` 输出警告, 因为有些 PostCSS runner 可能不允许 console 的输出。

```js
if ( outdated(decl.prop) ) {
    result.warn(decl.prop + ' is outdated', { node: decl });
}
```
如果 CSS 的输入是警告的来源，插件应该设置 `node` 选项。

## 4. 文档

### 4.1. 用英文给你的插件写文档


PostCSS 插件必须用英文写好 "README.md"。不要害怕你的英语技能，因为开源社区将会修复你的错误。

当然，也欢迎你用其它语言写文档，但请恰当地对文件全名（比如：`README.ja.md`）

### 4.2. 包括输入与输出例子

插件的 `README.md` 必须包括输入与输出的 CSS。一个清楚的例子是最好的描述你的插件运行的办法。

`README.md` 的第一部份是放置例子的好地方。看 [postcss-opacity](https://github.com/iamvdo/postcss-opacity) 为例。

当然，如果你的插件不是用于转换 CSS，则本指引将不适用于你的插件。

### 4.3. 维护一个变更日志

PostCSS 插件必须在一个单独的文件里，例如`CHANGELOG.md`, `History.md`, 或 [GitHub Releases] 描述它们所有的变更。访问 [Keep A Changelog] 获取更多有关如何写变更日志的信息。

当然，你应该使用 [SemVer] 描述版本号.

[Keep A Changelog]: http://keepachangelog.com/
[GitHub Releases]:  https://help.github.com/articles/creating-releases/
[SemVer]:           http://semver.org/

### 4.4. 在 `package.json` 包含 `postcss-plugin` 关键词

将 PostCSS 插件写成 npm 类库必须在 `package.json` 中包含 `postcss-plugin` 关键词。这个特别的关键词将对 PostCSS 生态的反馈非常有用。

那些没被发布到 npm 平台的插件，这个不是强制的，但建议采纳如果插件格式能包括该关键词。
