import chalk from 'chalk'
import config from './config'
import express from 'express'
import asyncify from 'express-asyncify'
import bodyParser from 'body-parser'
import database from 'db'
import router from './routes'
const PORT = process.env.PORT || config.port

function main(){

  const app = asyncify(express())
  app.use('/public', express.static(__dirname + '/static'))
  app.use(bodyParser.urlencoded({ extended:false }))
  app.use(bodyParser.json())

  database({ reset:config.setup })

  app.use('/api',router.auth)
  app.use('/api/post',router.post)

  app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({
      message:'The token is invalid or is absent...',
      status: 401
    });
  }
});

  app.listen(PORT, () => {
    console.log(chalk.green(`Server running and listening on http://localhost:${PORT}`))
  })

}

main()
