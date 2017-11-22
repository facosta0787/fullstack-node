'use strict'
const chalk = require('chalk')
const express = require('express')
const asyncify = require('express-asyncify')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000
const app = asyncify(express())
const routes = require('./routes/routes')

app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())

routes(app)

app.listen(PORT, ()=>{
  console.log(chalk.green(`Server is running on port ${PORT}`))
})
