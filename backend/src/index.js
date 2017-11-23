import chalk from 'chalk'
import express from 'express'
import asyncify from 'express-asyncify'
import bodyParser from 'body-parser'
import database from 'db'
import bcrypt from 'bcrypt'
const PORT = process.env.PORT || 3000

async function main(){
  const app = asyncify(express())
  app.use(bodyParser.urlencoded({ extended:false }))
  app.use(bodyParser.json())

  const { User } = await database({ reset:false })

  app.get('/', async (req, res ) => {
    const users = await User.findAll()
    res.send(users)
  })

  app.get('/user/create', async (req ,res) =>{
    const hash = await bcrypt.hash('porque',10)
    const user = await User.create({
      user: 'jescobar',
      name: 'Jose Escobar',
      password: hash
    })
    res.send(user)
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
