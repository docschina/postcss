module.exports = {
    title: 'PostCSS',
    description: 'PostCSS中文文档',
    head: [
        ['link', { rel: 'icon', href: '/image/favicon.ico' }]
    ],
    base: '/',
    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            { text: '文档', link: '/api' },
            { text: '印记中文', link: 'https://docschina.org' },
            { text: '翻译', link: 'https://github.com/docschina/postcss/tree/cn/docs' },
        ],
        sidebar: [
            {
                title: '指南',
                collapsable: false,
                children: [
                  '/guidelines/plugin',
                  '/guidelines/runner'
                ]
            },
            '/api',
            '/syntax',
            '/plugins',
            '/writing-a-plugin',
            '/source-maps',
        ]
    },
};
