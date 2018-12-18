module.exports = {
    base:'/',
    title: 'Mind Manager',
    description: 'Always Say,Never Work',
    port:40010,
    themeConfig: {
        lastUpdated: 'Last Updated',
        displayAllHeaders:true,
        sidebarDepth: 2,
        serviceWorker: {
            updatePopup: true // Boolean | Object, 默认值是 undefined.
        },
        markdown:{
            lineNumbers:true
        },
        sidebar: {
            '/guide/': [
                '/cssType/2018-12-13-滚动视差Made-In-CSS',
                '/docker/Makisu'
            ],
            '/cssType/':[
                '/guide/guide',
                '2018-12-13-滚动视差Made-In-CSS'
            ],
            '/docker/':[
                '/guide/guide',
                'Makisu'
            ],
            '/blog-vuePress/':[
                '/guide/guide',
                'vueBlog'
            ],
            '/jenkins/':[
                '/guide/guide',
                'jenkins_one'
            ],
            '/': [
                '',
            ]
        },
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/guide/guide' },
            { text: 'GitHub', link: 'https://github.com/yqlwudi2012' },
        ]
    }
}