import express from 'express'
import Auth from '../controllers/AuthController'
import Post from '../controllers/PostController'
import jwt from 'jsonwebtoken'
import jwtmd from 'express-jwt'
import config from '../config'

const router = express.Router()
// Routers for Authentication
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


router.get('/post',jwtmd({ secret: config.tokensecret }) ,async (req, res) =>{
  await Post.createPost()
})

module.exports = router
