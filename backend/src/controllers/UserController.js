import db from '../db'
const { User } = db()

class UserController{
  constructor(){

  }

  async createOrUpdate(req,res){

    if(!req.body){
      return res.status(400).send({
        message: 'Error, incomplete params!',
        status: 400
      })
    }

    const params = req.body

    try{
      const exists = await User.findOne({
        where:{
          user: params.user
        }
      })
      console.log(exists)
      if(!exists){
        const user = await User.create(params)
        return res.status(200).send({
          message: 'User created successfully',
          status: 200,
          data: user
        })
      }


      const user = await User.update({
        name: params.name,
        admin: params.admin
      },{
        where:{
          user: params.user
        }
      })
      
      return res.status(200).send({
        message: 'User created successfully',
        status: 200,
        data: user
      })

    }catch(e){
      return res.status(400).send({
        message: 'Error creating user',
        status: 400,
        data: e.message
      })
    }

  }
}

export default new UserController()
