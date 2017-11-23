import chalk from 'chalk'
import express from 'express'
import asyncify from 'express-asyncify'
import bodyParser from 'body-parser'
import database from 'db'
const PORT = process.env.PORT || 3000

function main(){
  const app = asyncify(express())

  app.use(bodyParser.urlencoded({ extended:false }))
  app.use(bodyParser.json())


  app.get('/', async (req, res ) => {
    const { User } = await database({ reset:false })
    const users = await User.findAll()
    res.send(users)
  })

  app.listen(PORT, () => {
    console.log(chalk.green(`Server running and listening on http://localhost:${PORT}`))
  })
}

main()
