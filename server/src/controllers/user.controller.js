const {User,Task} = require('../database/models');

const jwt = require('jsonwebtoken');



const userCtrl = {}

userCtrl.login = async (req,res)=>{
    const {email,password}= req.body;
    const user = await User.findOne({
        where:{
            email
        }
    });
    if(user && await user.validPassword(password) ){

        //creacion del token cuando se Loguea
        const token = jwt.sign({email: user.email, id:user.id },'IgFlfdiKYRjhqEBhPYmd');

        return res.json(token);

    } else {
        res.json('Usuario/password invalidos')
    }
}



userCtrl.getAllUsers = async (req,res) => {
    const users= await User.findAll({
        include:[{model:Task, attributes:['description','done']}]
    });
    res.json(users);
}

userCtrl.createUser = async (req,res)=>{
    const {name,lastName,email,password}=req.body;
    const user=await User.create({name,lastName,email,password});
    

    res.json(user);
}

userCtrl.updateUser = (req,res)=>{
    res.json('Put a user endpoint');
}


userCtrl.deleteUser = (req,res)=>{
    res.json('delete a user endpoint');
}


module.exports=userCtrl;