import express from 'express'
import Auth from '../controllers/AuthController'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.get('/', async (req, res) =>{
  console.log(req.body)
  res.send({message: 'Welcome to simple node-login example v1.0'})
})

router.post('/signin', async (req,res) =>{
  const r = await Auth.signIn( req )
  res.status(r.status).send( r )
})

router.post('/signup', async (req,res) =>{
  const r = await Auth.signUp(req)
  res.status(r.status).send(r)
})

module.exports = router
