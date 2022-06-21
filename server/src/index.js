const express = require('express')
const app = express();
const db = require('./database/models');
const cors = require('cors'); 
const { expressjwt: jwt } = require("express-jwt");


db.sequelize.sync(); // Solo para desarrollo , crea las bases de datos , asi que si ya tienen informacion se borra

// foce sycn por si no sirve

/* forceSync = async () => {
    await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await db.sequelize.sync({force:true});
    await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    await db.User.create({
      name:"Juan",
      lastName:"restrepo",
      email:"test@gmail.com",
      password:"1234567"
    });
    await db.Task.create({
      description:"Task 1",
      UserId:1
    })

    // aca abajo puedo crear un usuario por querys , el usuario de pruebas
}
    
forceSync();
 */

app.use(cors());
app.use(express.json());

app.use(
    jwt({
      secret: "IgFlfdiKYRjhqEBhPYmd",
      algorithms: ["HS256"],
    }).unless({ path: ['/api/user/login',"/api/user/signup"] })
  );


 //usamos las rutas de Usuarios
app.use('/api/user',require('./routes/user.routes'));


 //usamos las rutas de Tareas
app.use('/api/task',require('./routes/task.routes'));

app.listen(3001)