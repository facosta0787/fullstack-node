import { Post as _Post } from 'db'

class PostController{
  constructor(){
    this.Post = _Post()
  }

  async createPost(req,res){
    const userId = req.user.sub
    const { title, desc } = req.body

    if(!title || !desc){
      const resp = {
        message: 'Error incomplete params!',
        status: 401,
        data:{}
      }
      res.status(resp.status).send(resp)
    }

    try{
      const post = await this.Post.create({
        title,
        desc,
        userId
      })
      res.status(200).send({
        message:'post created successfully !',
        status:200,
        data: post
      })
    }catch(err){
      console.log(err)
      res.status(400).send(err)
    }
  }

  async getPost(req,res){
    const { id } = req.params
    if(!id){
      const posts = await this.Post.findAll({
        limit: 20,
        order: [
          ['createdAt','DESC']
        ]
      })

      if(!posts){
        res.send({message:'Error!'})
      }

      res.send(posts)
    }

    const post = await this.Post.findOne({
      where:{
        id
      }
    })

    if(!post){
      res.send({message: 'Error !'})
    }

    res.send(post)
  }

}

export default new PostController()
