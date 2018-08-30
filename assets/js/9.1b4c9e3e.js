(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{165:function(t,s,n){"use strict";n.r(s);var a=n(0),e=Object(a.a)({},function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{staticClass:"content"},[t._m(0),t._v(" "),n("p",[t._v("PostCSS 对 "),n("a",{attrs:{href:"http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/",target:"_blank",rel:"noopener noreferrer"}},[t._v("source maps"),n("OutboundLink")],1),t._v(" 支持很好。它能够读取和解析从之前转换步骤生成的映射，自动检测你期望的格式，并且输出外联和内联映射。")]),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),t._m(3),n("p",[t._v("如果 PostCSS 从之前的转变中发现源码映射，它会自动用同样的配置更新源码映射。")]),t._v(" "),t._m(4),t._v(" "),t._m(5),t._v(" "),t._m(6)])},[function(){var t=this.$createElement,s=this._self._c||t;return s("h1",{attrs:{id:"postcss-和-source-maps"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#postcss-和-source-maps","aria-hidden":"true"}},[this._v("#")]),this._v(" PostCSS 和 Source Maps")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("为了保证你生成准确的 source map （源码映射），你必须写明输入与输出的 CSS 文件路径 —— 分别使用 "),s("code",[this._v("from")]),this._v(" 和 "),s("code",[this._v("to")]),this._v(" 参数。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("如果用默认配置生成新的源码映射，只要设置 "),s("code",[this._v("map: true")]),this._v(" 即可。这会生成一个内联的源码映射，包含源码的内容。如果你不想将映射内联，你可以设置 "),s("code",[this._v("map.inline: false")]),this._v("。")])},function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[t._v("processor\n    "),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{attrs:{class:"token function"}},[t._v("process")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("css"),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),n("span",{attrs:{class:"token keyword"}},[t._v("from")]),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v("'app.sass.css'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        to"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v("   "),n("span",{attrs:{class:"token string"}},[t._v("'app.css'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        map"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" inline"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token boolean"}},[t._v("false")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{attrs:{class:"token function"}},[t._v("then")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("result"),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        result"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("map "),n("span",{attrs:{class:"token comment"}},[t._v('//=> \'{ "version":3,')]),t._v("\n                   "),n("span",{attrs:{class:"token comment"}},[t._v('//      "file":"app.css",')]),t._v("\n                   "),n("span",{attrs:{class:"token comment"}},[t._v('//      "sources":["app.sass"],')]),t._v("\n                   "),n("span",{attrs:{class:"token comment"}},[t._v('//       "mappings":"AAAA,KAAI" }\'')]),t._v("\n    "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"配置"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#配置","aria-hidden":"true"}},[this._v("#")]),this._v(" 配置")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("如果你想要对源码映射的生成有更多的控制，可以定义一个 "),s("code",[this._v("map")]),this._v(" 对象作为配置，并配置以下的参数：")])},function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("ul",[n("li",[n("p",[n("code",[t._v("inline")]),t._v(" boolean: 表明源码映射会以 Base64 编码注释的方式被内置到输出的 CSS中。该参数默认为 "),n("code",[t._v("true")]),t._v("。\n但如果先前的所有映射都是外联而不是内联的，那么 PostCSS 则不会内置映射即使你不设置这个参数。")]),t._v(" "),n("p",[t._v("如果你有一个内联的资源映射，那么 "),n("code",[t._v("result.map")]),t._v(" 属性则会为空，因为源码映射被包含在 "),n("code",[t._v("result.css")]),t._v(" 的文本中。")])]),t._v(" "),n("li",[n("p",[n("code",[t._v("prev")]),t._v(" string, object, boolean 或 function: 源码映射来自先前的处理步骤（例如，Sass编译）。\nPostCSS将尝试自动读取之前的源码映射（基于源CSS中的注释），但您可以使用此配置来手动识别它。如果需要，您可以省略以前的源码映射，使用 "),n("code",[t._v("prev：false")]),t._v(" 参数。")])]),t._v(" "),n("li",[n("p",[n("code",[t._v("sourcesContent")]),t._v(" boolean: 表示 PostCSS 应设置源码映射的源内容（例如，Sass源）。默认值为 "),n("code",[t._v("true")]),t._v("。\n但如果以前的所有源码映射都不包含源内容，即使您没有设置此配置，PostCSS也会将其忽略。")])]),t._v(" "),n("li",[n("p",[n("code",[t._v("annotation")]),t._v(" boolean or string: 表示 PostCSS 应添加注释评论到 CSS 中。。默认情况下，PostCSS 将始终添加带路径的注释\n到源码映射。 PostCSS 不会为没包含任何评论的 CSS 文件添加注释。")]),t._v(" "),n("p",[t._v("默认情况下，PostCSS 假定您要将源码映射另存为到 "),n("code",[t._v("opts.to +'。map'")]),t._v(" 并将在注释注释中使用此路径。\n可以通过为 "),n("code",[t._v("annotation")]),t._v(" 提供字符串值来设置不同的路径。")]),t._v(" "),n("p",[t._v("如果你设置 "),n("code",[t._v("inline: true")]),t._v(", 那么注释则无法禁用。")])]),t._v(" "),n("li",[n("p",[n("code",[t._v("from")]),t._v(" string: 默认情况下，PostCSS 将设置映射的 "),n("code",[t._v("sources")]),t._v(" 属性为 "),n("code",[t._v("from")]),t._v(" 选项的值。如果要覆写此行为，则你可以使用\n"),n("code",[t._v("map.from")]),t._v(" 来显式设置源码映射的 "),n("code",[t._v("sources")]),t._v(" 属性。路径应该是生成文件的绝对或相对路径（"),n("code",[t._v("process（）")]),t._v(" 方法中的 "),n("code",[t._v("to")]),t._v(" 选项）。")])])])}],!1,null,null,null);e.options.__file="source-maps.md";s.default=e.exports}}]);