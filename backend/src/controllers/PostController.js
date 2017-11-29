import { Post as _Post } from 'db'

class PostController{
  constructor(){
    this.Post = _Post
  }

  async createPost(req,res){
    const { title, desc } = req.body
    if(!title || !desc){
      const resp = {
        message: 'Error incomplete params!',
        status: 401
      }
      res.status(resp.status).send(resp)
    }

    try{
      const post = await this.Post.create({
        title,
        desc
      })
      res.status(200).send(post)
    }catch(err){
      console.log(err.message)
      res.status(400).err.message
    }
  }

}
