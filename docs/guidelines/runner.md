# PostCSS Runner 指南

PostCSS runner是一个通过一连串用户定义插件处理CSS的工具;例如，[`postcss-cli`]或[`gulp-postcss`]。
这些规则对于任何此类 runner 都是强制性的。

对于单插件工具，如[`gulp-autoprefixer`]，这些规则不是强制性的，但非常建议使用。

另参考 [ClojureWerkz 的建议] 了解开源项目。

[ClojureWerkz 的建议]:  http://blog.clojurewerkz.org/blog/2013/04/20/how-to-make-your-open-source-project-really-awesome/
[`gulp-autoprefixer`]: https://github.com/sindresorhus/gulp-autoprefixer
[`gulp‑postcss`]:      https://github.com/w0rm/gulp-postcss
[`postcss-cli`]:       https://github.com/postcss/postcss-cli

## 1. API

### 1.1. 在插件参数中接受函数

如果你的 runner 使用配置文件，它必须用 JavaScript 编写，这样它可以支持接受函数的插件，例如[`postcss-assets`]：

```js
module.exports = [
    require('postcss-assets')({
        cachebuster: function (file) {
            return fs.statSync(file).mtime.getTime().toString(16);
        }
    })
];
```

[`postcss-assets`]: https://github.com/borodean/postcss-assets

## 2. 处理

### 2.1. 设置 `from` 和 `to` 处理选项

为了保证 PostCSS 生成源映射并更好地显示的语法错误，runner 必须指定 `from` 和 `to` 选项。如果你的 runner 不用处理写入磁盘（例如，gulp转换）任务，您将两个选项设置成指向同一个文件：

```js
processor.process({ from: file.path, to: file.path });
```

### 2.2. 请只使用异步 API

PostCSS runner 必须只使用异步API。同步API仅用于调试，速度更慢，并且无法与异步插件一同工作。

```js
processor.process(opts).then(function (result) {
    // 处理已被完成
});
```

### 2.3. 请只使用公开的 PostCSS API

PostCSS插件不能依赖于未记录的属性或方法，在任何次要版本中可能会有所变化。公共API
在[API docs]中描述。

[API docs]: http://api.postcss.org/

## 3. 输出

### 3.1. 不要为 `CssSyntaxError` 显示堆栈


PostCSS runner 不应为 CSS 语法错误显示堆栈，因为 runner 会被不熟悉 JavaScript 的开发人员使用。
相反，要优雅地处理这样的错误：

```js
processor.process(opts).catch(function (error) {
    if ( error.name === 'CssSyntaxError' ) {
        process.stderr.write(error.message + error.showSourceCode());
    } else {
        throw error;
    }
});
```

### 3.2. 显示 `result.warnings()`

PostCSS runner 必须通过 `result.warnings()` 输出警告:

```js
result.warnings().forEach(function (warn) {
    process.stderr.write(warn.toString());
});
```

另参阅 [postcss-log-warnings] 和 [postcss-messages] 插件.

[postcss-log-warnings]: https://github.com/davidtheclark/postcss-log-warnings
[postcss-messages]:     https://github.com/postcss/postcss-messages

### 3.3. 允许用户将源码映射写入不同的文件

PostCSS 默认情况下会在生成的文件中内联源码映射;然而，PostCSS runner 必须提供将源码映射保存到其它文件的选项
文件：

```js
if ( result.map ) {
    fs.writeFile(opts.to + '.map', result.map.toString());
}
```

## 4. 文档

### 4.1. 用英文给你的 runner 写文档

PostCSS runner 必须用英文写好 "README.md"。不要害怕你的英语技能，因为开源社区将会修复你的错误。

当然，也欢迎你用其它语言写文档，但请恰当地对文件全名（比如：`README.ja.md`）

### 4.2. 维护一个变更日志

PPostCSS runner 必须在一个单独的文件里，例如`CHANGELOG.md`, `History.md`, 或 [GitHub Releases] 描述它们所有的变更。访问 [Keep A Changelog] 获取更多有关如何写变更日志的信息。

当然，你应该使用 [SemVer] 描述版本号.

[Keep A Changelog]: http://keepachangelog.com/
[GitHub Releases]:  https://help.github.com/articles/creating-releases/
[SemVer]:           http://semver.org/

### 4.3. 在 `package.json` 包含 `postcss-runner` 关键词

将 PostCSS runner 写成 npm 类库必须在 `package.json` 中包含 `postcss-runner` 关键词。这个特别的关键词将对 PostCSS 生态的反馈非常有用。

那些没被发布到 npm 平台的 runner，这个不是强制的，但建议采纳如果 runner 格式能包括该关键词。
