/*
200 - OK
400 - Bad Request
401 - Unauthorized
403 - Forbidden Sin provilegios
404 - Not found,
*/
import db from 'db'
const { User , Post } = db()

class PostController{
  constructor(){
    this.Post = Post
    this.User = User
  }

  async createPost(req,res){
    const userId = req.user.sub
    //const userId = req.body.userId
    const { title, desc } = req.body

    if(!title || !desc){
      return res.status(400).send({
        message: 'Error, incomplete params!',
        status: 400
      })
    }

    try{
      const post = await this.Post.create({
        title,
        desc,
        userId
      })
      return res.status(200).send({
        message:'Post created successfully !',
        status:200,
        data: post
      })
    }catch(err){
      console.log(err)
      return res.status(400).send({
        message: err.message,
        status: 400
      })
    }
  }

  async getPost(req,res){
    const { id } = req.params

    if(!id){
      const posts = await this.Post.findAll({
        limit: 20,
        include:[
          {
            model: this.User,
            required: true,
            attributes: ['id','user','name','admin','createdAt','updatedAt']
          }
        ],
        order: [
          ['createdAt','DESC']
        ]
      })

      if(!posts){
        return res.send({
          message:'No data',
          status:404
        })
      }

      return res.status(200).send({
        message: 'Ok!',
        status: 200,
        data: posts
      })
    }

    const post = await this.Post.findOne({
      where:{
        id
      }
    })

    if(!post){
      return res.status(404).send({
        message: 'Post was not found',
        status: 404
      })
    }

    return res.status(200).send({
      message:'Ok!',
      status:200,
      data: post
    })
  }

  async deletePost(req,res){
    const { id } = req.params

    if(!id){
      return res.status(400).send({
        message:'Incomplete params',
        status: 400
      })
    }


      const post = await this.Post.destroy({
        where:{
          id
        }
      })

      if(!post){
        return res.status(404).send({
          message:'Post was not found',
          status: 404
        })
      }

      return res.status(200).send({
        message: 'Post eliminated successfully',
        status: 200
      })
  }

}

export default new PostController()
