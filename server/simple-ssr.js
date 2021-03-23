const express = require('express')

const app = express()

// 服务器渲染模块
const {createRenderer} = require('vue-server-renderer')
// 获取渲染器
const renderer = createRenderer()

const Vue = require('vue')

app.get('/', (req, res) => {
    res.send('hello')
})

app.listen(3000, '服务器在3000端口启动了')