＃ 如何编写自定义语法

PostCSS可以转换任何语法的样式，不仅仅局限于CSS。通过编写自定义语法，你可以转换任何期望格式的样式。

编写自定义语法要比编写PostCSS插件困难得多，但这是个值得体验的冒险。

有3种类型的PostCSS语法包：

* **解析器**将输入字符串解析成节点树。
* **字符串生成器**按节点树生成输出字符串。
* **语法**包含解析器和字符串生成器。

#＃ 语法

自定义语法的一个很好的例子是[SCSS]。一些用户可能想要使用PostCSS插件转换SCSS源文件，例如添加前缀或更改属性的顺序。因此这样的语法应该输入一个SCSS源文件并输出另一个SCSS文件。

自定义语法API是一个拥有`parse`和`stringify`属性方法的普通对象

```js
module.exports = {
    parse：    require（'./ parse'），
    stringify：require（'./ stringify'）
};
```

[SCSS]: https://github.com/postcss/postcss-scss

## 解析器

解析器的一个很好的例子是[Safe Parser]，它可以解析格式不正确的或不完整的CSS。因为产生残缺的输出没有任何意义，因此这个包只提供了一个解析器。

解析器API是一个函数，它接收一个字符串并返回一个[`Root`]节点。第二个参数是一个函数，它接收一个PostCSS选项对象做为参数。

```js
var postcss = require（'postcss'）;

module.exports = function（css，opts）{
    var root = postcss.root（）;
    //Add other nodes to root 将其它节点添加到根节点
    return root;
};
```

[Safe Parser]: https://github.com/postcss/postcss-safe-parser
[`Root`]:      http://api.postcss.org/Root.html

### 主要原理

市面上有很多关于解析器的书；但是不要担心，因为CSS语法非常简单，所以它的解析器比一般编程语言的解析器简单得多。

默认的PostCSS解析器包含两个步骤：

1.[Tokenizer]逐字符读入输入的字符串，建立一个令牌数组。例如，它将空格符号连接到`['space', '\n  ']`令牌，将检测到字符串添加到`['string', '"\"{"']`令牌。     
2.[Parser]读取令牌数组，创建节点实例并生成建树。

[Tokenizer]: https://github.com/postcss/postcss/blob/master/lib/tokenize.es6
[Parser]:    https://github.com/postcss/postcss/blob/master/lib/parser.es6

### 性能

解析输入的字符通常是CSS处理器中最耗时的任务。所以拥有一个快速的解析器是非常重要的。

优化的主要原则是没有基准就没有性能指标，你可以根据[PostCSS benchmarks]来建立你自己的基准。

在解析任务中，令牌化的步骤往往需要最多的时间，所以应该优先考虑它的性能。不幸的是，类，函数和高阶结构会减缓令牌化的过程，所以准备好写重复冗余的脏代码吧。这也是难以扩展默认的[PostCSS tokenizer]的原因;复制和粘贴将是一个不可避免的操作手段。

第二个优化点是使用字符编码来代替字符串。

```js
// Slow 慢
string[i] === '{';

// Fast 快
const OPEN_CURLY = 123; //`{'
string.charCodeAt（i）=== OPEN_CURLY;
```

第三个优化点是“fast jumps(快速跳跃)”。如果你找到开引号，借助`indexOf`可以更快的找到下一个结束引号。

```js
// Simple jump 简单的跳转
next = string.indexOf('"', currentPosition + 1);

// Jump by RegExp 通过正则来跳转
regexp.lastIndex = currentPosion + 1;
regexp.text(string);
next = regexp.lastIndex;
```

解析器可以是一个写得很好的类。没有必要进行复制粘贴和硬性优化。你可以扩展默认的[PostCSS parser]。

[PostCSS benchmarks]: https://github.com/postcss/benchmark
[PostCSS tokenizer]:  https://github.com/postcss/postcss/blob/master/lib/tokenize.es6
[PostCSS parser]:     https://github.com/postcss/postcss/blob/master/lib/parser.es6

### 节点源

每个节点应该都有一个`source`属性来生成正确的源映射。该属性包含`start`和`end`属性，可以表示成`{line，column}`，还应该包含`input`属性，其值为[`Input`]实例。

你的分词器应该保存原始的位置，以便将值传递给解析器，同时确保源映射被正确更新。

[`Input`]: https://github.com/postcss/postcss/blob/master/lib/input.es6

### 原始值

一个好的PostCSS解析器应该提供所有的信息（包括空格符号）以生成字节到字节的幂等输出。这并不是很难，难的遵从用户输入并允许集成烟雾测试。

解析器应该将所有附加符号保存到`node.raws`对象中。对你来说，这个对象是一个开放的结构，你可以添加额外的键。例如，[SCSS parser]将注释类型（`/ * * /`或`//`）保存在`node.raws.inline`中。

默认的解析器从注释和空格中提取出纯净的CSS值。它将原始值与注释保存到`node.raws.value.raw`中，如果节点值没有发生改变就直接使用它.

[SCSS parser]: https://github.com/postcss/postcss-scss

### 测试

当然，PostCSS生态系统中的所有解析器都必须有测试。

如果您的解析器只是扩展了CSS语法（如[SCSS]或[Safe Parser]),你可以使用[PostCSS Parser Tests]。它包含单元和集成测试。

[PostCSS Parser Tests]: https://github.com/postcss/postcss-parser-tests

## 字符串生成器

样式生成器是一个很好的字符串生成器的例子。它生成包含CSS组件的HTML。对于这个用例，解析器是不必要的，所以此时语法包应该只包含一个字符串生成器。

字符串生成器API比解析器API要复杂一点。PostCSS生成一个源映射，所以一个字符串生成器不能只返回一个字符串。它必须链接每个子串与其源节点。

字符串生成器是一个函数，它接收[`Root`]节点和构建回调函数作为参数。然后它将节点字符串和节点实例作为参数调用构建回调函数。

```js
module.exports = function（root，builder）{
    // Some magic一些魔法
    var string = decl.prop + ':' + decl.value + ';';
    builder(string, decl);
    // Some science
};
```

### 主要原理

PostCSS [default stringifier]只是一个类，它有一个方法来处理每种节点类型，并且拥有很多方法来检测原始属性。

在大多数情况下，只要扩展这个类就足够了，就像在[SCSS stringifier]中一样。

[default stringifier]: https://github.com/postcss/postcss/blob/master/lib/stringifier.es6
[SCSS stringifier]:    https://github.com/postcss/postcss-scss/blob/master/lib/scss-stringifier.es6

### 构建函数

构建函数将作为第二个参数传递给`stringify`函数。例如，默认的PostCSS字符串生成器类将其保存到`this.builder`属性。

构建函数接收输出子字符串和源节点，并将此子字符串追加到最后的输出。

一些节点在中间包含其他节点。例如，一个规则以`{`开始，里面包含很多声明的时候，然后以`}`结束。

对于这些情况，您应该传递第三个参数给构建函数：`'start'` 或者 `'end'` 字符串:

```js
this.builder（rule.selector +'{'，rule，'start'）;
//Stringify declarations inside 将内部的声明字符串化
this.builder（'}'，rule，'end'）;
```

### 原始值

一个好的PostCSS自定义语法会保存所有的符号，如果没有变化的话，它会提供字节到字节的幂等输出。

这也就是为什么每个节点都有`node.raws`对象来存储空间符号等等。

不过要小心，因为有时这些原始属性不会出现;一些节点可能是由手动建立的，或者在移动时到另一个父节点时可能会失去缩进。

这也就是为什么默认的字符串生成器拥有一个`raw()`方法来自动检测其他节点的原始属性。例如，它会查看其他节点来检测缩进大小，并将其与当前节点深度相乘。

### 测试

一个字符串生成器也必须有测试。

你可以使用[PostCSS Parser Tests]中的单元和集成测试用例，只需要比较输入的CSS和经过解析器和字符串生成器处理后的CSS。


[PostCSS Parser Tests]: https://github.com/postcss/postcss-parser-tests