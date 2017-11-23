import chalk from 'chalk'
import express from 'express'
import asyncify from 'express-asyncify'
import bodyParser from 'body-parser'
import { database } from 'db'
import bcrypt from 'bcrypt'
import _Auth from './controllers/AuthController'
const PORT = process.env.PORT || 3000

async function main(){
  const app = asyncify(express())
  app.use(bodyParser.urlencoded({ extended:false }))
  app.use(bodyParser.json())

  await database({ reset:false })
  const Auth = new _Auth

  app.get('/', async (req, res ) => {

    const userCreated = await Auth.addUser({
      user:'jrojas',
      name:'Manuel Rojas',
      password:'minuevohijo'
    })

    res.send(userCreated)

  })

  app.get('/user/compare', async (req, res) =>{
    const result = await bcrypt.compare('porque','$2a$10$nsMb/rNFCK6i.Z1kfycUiO3G9WP7TRu5jaYl2TaPMxO/BDd4nUhnq')
    res.send({result})
  })

  app.listen(PORT, () => {
    console.log(chalk.green(`Server running and listening on http://localhost:${PORT}`))
  })
}

main()
