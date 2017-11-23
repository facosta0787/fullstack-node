import chalk from 'chalk'
import express from 'express'
import asyncify from 'express-asyncify'
import bodyParser from 'body-parser'
import { database } from 'db'
import Auth from './controllers/AuthController'
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
    const params = {
      user: req.body.user,
      password: req.body.password
    }
    const resp = await Auth.signIn(params)
    res.send({ resp })
  })

  app.post('/signup', async (req,res) =>{
    const {user, name, password} = req.body
    const params ={
      user,
      name,
      password
    }
    const resp = await Auth.signUp(params)
    res.send(resp)
  })

  app.listen(PORT, () => {
    console.log(chalk.green(`Server running and listening on http://localhost:${PORT}`))
  })
}


main()
