import express from 'express'
import Post from '../controllers/PostController'
import jwt from 'express-jwt'
import config from '../config'

const route = express.Router()

route.use(jwt({ secret: config.tokensecret }))

route
.get('/', async (req,res) => await Post.getPost(req,res) )
.post('/', async (req, res) => await Post.createPost(req,res) )
.delete('/', async (req,res) => await Post.deletePost(req,res) )

route
.get('/:id',async (req,res) => await Post.getPost(req,res) )

module.exports = route
