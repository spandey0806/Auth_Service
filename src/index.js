const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');   
const apiRoutes = require('./routes/index');
//  const UserService = require('./services/user-service');

const app = express();

const prepareAndStartServer = ()=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));

    app.use('/api',apiRoutes);
    app.listen(PORT, async () =>{
        console.log(`Server Started on PORT :${PORT}`);
         
        //  const service = new UserService();
        // //  const newtoken = service.createToken({email :"shubham@admin.com" , id :1});
        // //  console.log('new token is---',newtoken);
        // const token ="eyJhbGciOiJIUzI1NiIsvvInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNodWJoYW1AYWRtaW4uY29tIiwiaWQiOjEsImlhdCI6MTY5NTc0Mzc5OSwiZXhwIjoxNjk1NzQ3Mzk5fQ.qsQP-iH-Mi05dCUmZSiEOcnCZ-j1jOpR_5RqWSfSiJ8"
        //  const response= service.verifyToken(token);
        //  console.log(response);
    });
}

prepareAndStartServer();