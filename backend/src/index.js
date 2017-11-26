import chalk from 'chalk'
import express from 'express'
import asyncify from 'express-asyncify'
import bodyParser from 'body-parser'
import { database } from 'db'
import Auth from './controllers/AuthController'
import jwt from 'jsonwebtoken'
const PORT = process.env.PORT || 3000

async function main(){
  const app = asyncify(express())
  app.use(bodyParser.urlencoded({ extended:false }))
  app.use(bodyParser.json())

  try{
    await database({ reset:false })
  }catch(err){
    console.log(err.message)
    console.log(err.stack)
  }

  app.get('/', async (req, res) =>{
    console.log(req.body)
    res.send({message: 'Welcome to simple node-login example'})
  })

  app.post('/signin', async (req,res) =>{
    res.status(200).send( await Auth.signIn( req ) )
  })

  app.post('/signup', async (req,res) =>{
    res.send(await Auth.signUp(req))
  })

  app.post('/auth', (req, res) => {
    const user = {
      user:'facosta',
      name:'Felipe Acosta',
      role:'user'
    }
    const token = jwt.sign(user,'misecretapp')
    res.send({token})
  })

  app.listen(PORT, () => {
    console.log(chalk.green(`Server running and listening on http://localhost:${PORT}`))
  })
}


main()
