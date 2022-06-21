

/**
 * Task Model Respresentation
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import {'sequelize'}.DataTypes} DataTypes
 * @returns Sequelize Task model
 */


module.exports = (sequelize, DataTypes) => {

    const Task = sequelize.define('Task',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        description:{
            type:DataTypes.TEXT 
        },
        done:{
            type:DataTypes.BOOLEAN,
            defaultValue: false
        }
    },{
        tableName:'tasks',
        timestamps:true,
    }
    );

    Task.associate=(db)=>{
        Task.belongsTo(db.User);
        
    }
     

   return Task;
}