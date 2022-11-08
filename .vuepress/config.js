const pluginsConf = require('./config/pluginsConf')
const navConf = require('./config/navConf')
const blogConf = require('./config/blogConf')
const friendConf = require('./config/friendConf')

module.exports = {
  "base": "/blog/",
  "title": "HM-7 Blog",
  "description": "",
  "dest": "public",
  "locales": {
    "/": {
      "lang": "zh-CN",
    },
  },
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/favicon.ico"
      }
    ],
    [
      "link",
      {
        "rel": "stylesheet",
        "href": "/css/index.css"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ],
  ],
  "theme": "reco",
  "themeConfig": {
    "nav": navConf,
    "type": "blog",
    "blogConfig": blogConf,
    "friendLink": friendConf,
    "logo": "/img/logo.jpg",
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "Last Updated",
    "author": "HM-7",
    "authorAvatar": "/img/avatar.jpg",
    "record": "xxxx",
    "startYear": "2022"
  },
  "markdown": {
    "lineNumbers": true
  },
  "plugins": pluginsConf
}