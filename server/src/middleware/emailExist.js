const db = require('../database/models');

const emailExist = async (email='')=>{
    const emailExist = await db.User.findOne({where:{email}});
    if(emailExist) {
        throw new Error(`El Email ${email} ya existe`);
    }
}

module.exports = {
    emailExist
}