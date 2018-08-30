# PostCSS 和 Source Maps

PostCSS 对 [source maps] 支持很好。它能够读取和解析从之前转换步骤生成的映射，自动检测你期望的格式，并且输出外联和内联映射。

为了保证你生成准确的 source map （源码映射），你必须写明输入与输出的 CSS 文件路径 —— 分别使用 `from` 和 `to` 参数。

如果用默认配置生成新的源码映射，只要设置 `map: true` 即可。这会生成一个内联的源码映射，包含源码的内容。如果你不想将映射内联，你可以设置 `map.inline: false`。

```js
processor
    .process(css, {
        from: 'app.sass.css',
        to:   'app.css',
        map: { inline: false },
    })
    .then(function (result) {
        result.map //=> '{ "version":3,
                   //      "file":"app.css",
                   //      "sources":["app.sass"],
                   //       "mappings":"AAAA,KAAI" }'
    });
```
如果 PostCSS 从之前的转变中发现源码映射，它会自动用同样的配置更新源码映射。

## 配置

如果你想要对源码映射的生成有更多的控制，可以定义一个 `map` 对象作为配置，并配置以下的参数：

* `inline` boolean: 表明源码映射会以 Base64 编码注释的方式被内置到输出的 CSS中。该参数默认为 `true`。
  但如果先前的所有映射都是外联而不是内联的，那么 PostCSS 则不会内置映射即使你不设置这个参数。

  如果你有一个内联的资源映射，那么 `result.map` 属性则会为空，因为源码映射被包含在 `result.css` 的文本中。

* `prev` string, object, boolean 或 function: 源码映射来自先前的处理步骤（例如，Sass编译）。
  PostCSS将尝试自动读取之前的源码映射（基于源CSS中的注释），但您可以使用此配置来手动识别它。如果需要，您可以省略以前的源码映射，使用 `prev：false` 参数。

* `sourcesContent` boolean: 表示 PostCSS 应设置源码映射的源内容（例如，Sass源）。默认值为 `true`。
  但如果以前的所有源码映射都不包含源内容，即使您没有设置此配置，PostCSS也会将其忽略。

* `annotation` boolean or string: 表示 PostCSS 应添加注释评论到 CSS 中。。默认情况下，PostCSS 将始终添加带路径的注释
  到源码映射。 PostCSS 不会为没包含任何评论的 CSS 文件添加注释。

  默认情况下，PostCSS 假定您要将源码映射另存为到 `opts.to +'。map'` 并将在注释注释中使用此路径。
  可以通过为 `annotation` 提供字符串值来设置不同的路径。

  如果你设置 `inline: true`, 那么注释则无法禁用。

* `from` string: 默认情况下，PostCSS 将设置映射的 `sources` 属性为 `from` 选项的值。如果要覆写此行为，则你可以使用
  `map.from` 来显式设置源码映射的 `sources` 属性。路径应该是生成文件的绝对或相对路径（`process（）` 方法中的 `to` 选项）。

[source maps]: http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/
