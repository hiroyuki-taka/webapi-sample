const express=require('express')
const path = require('path')
const open = require('open')

const app = express()

app.use('/', express.static(path.resolve(__dirname, "dist")))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "dist/index.html"))
})

app.listen(3000, () => {
    console.log("start on ", 3000)
    open('http://localhost:3000')
})
