import express from 'express'
import Auth from '../controllers/AuthController'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.get('/', async (req, res) =>{
  console.log(req.body)
  res.send({message: 'Welcome to simple node-login example v1.0'})
})

router.post('/signin', async (req,res) =>{
  res.status(200).send( await Auth.signIn( req ) )
})

router.post('/signup', async (req,res) =>{
  res.send(await Auth.signUp(req))
})

router.post('/auth', (req, res) => {
  const user = req.body
  const token = jwt.sign(user,'misecretrouter')
  res.send({token})
})

module.exports = router
