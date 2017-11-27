import chalk from 'chalk'
import express from 'express'
import asyncify from 'express-asyncify'
import bodyParser from 'body-parser'
import { database } from 'db'
import router from './routes/routes'
const PORT = process.env.PORT || 3000

async function main(){
  const app = asyncify(express())
  app.use('/public', express.static(__dirname + '/static'))
  app.use(bodyParser.urlencoded({ extended:false }))
  app.use(bodyParser.json())

  try{
    await database({ reset:false })
  }catch(err){
    console.log(err.message)
    console.log(err.stack)
  }

  app.use('/api',router)

  app.listen(PORT, () => {
    console.log(chalk.green(`Server running and listening on http://localhost:${PORT}`))
  })
}

main()
