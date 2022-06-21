const express = require('express');
const userCtrl = require('../controllers/user.controller');
const router = express.Router();
const {check} = require('express-validator');
const {emailExist} = require('../middleware/emailExist')

const {getAllUsers,createUser,updateUser,deleteUser, login} = require('../controllers/user.controller');
const { validateFields } = require('../middleware/validateFields');








router
 .get('/', getAllUsers)
 .put('/',updateUser)
 .delete('/',deleteUser);

router.post('/signup',[
    check('name','El Campo nombre no puede estar vacio').not().isEmpty(),
    check('email','El email no es valido').isEmail(),
    check('password','El password no puede estar vacio').not().isEmpty(),
    check('password','El password debe ser mayor a 5 caracteres').isLength({min:5}),
    check('email').custom(emailExist),
    validateFields
],createUser) 


 router.post('/login',[
    check('email','El email no es valido').isEmail(),
    check('password','El password no puede estar vacio').not().isEmpty(),
    validateFields 
],login)




module.exports=router;