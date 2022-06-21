const bcrypt = require('bcryptjs');

/**
 * User Model Respresentation
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import {'sequelize'}.DataTypes} DataTypes
 * @returns Sequelize User model
 */


module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('User',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName:{
           type : DataTypes.STRING
        },
        email:{
            type: DataTypes.STRING,
            unique: true
        },
        password:{
            type:DataTypes.STRING,
            allowNull: false
        }
    
    },
    {
        tableName:'users',
        timestamps:true,
        hooks:{
            beforeCreate: async (user)=>{
             const salt= await bcrypt.genSalt(10);
             user.password = await bcrypt.hash(user.password,salt);

            }
        }
    }
    );

    User.prototype.validPassword = async function(password){
        return await bcrypt.compare(password,this.password)
    }


    User.prototype.toJSON = function () {
        var values = Object.assign({},this.get());
        delete values.password;
        return values;
    }

    User.associate=(db)=>{
        User.hasMany(db.Task);
        
    }

    return User;
}