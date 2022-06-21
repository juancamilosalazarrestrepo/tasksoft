const express = require('express');
const router = express.Router();
const {check} = require('express-validator');

const {getAllTasks,createTask,editTask,deleteTask}= require('../controllers/task.controller');
const {validateFields} = require('../middleware/validateFields');

router
    .get('/',getAllTasks)
    .post('/',[
        check('description','La descripcion es obligatoria').not().isEmpty(),
        validateFields
    ],createTask);

router.put('/:id',editTask); 
router.delete('/:id',deleteTask);   


module.exports=router;