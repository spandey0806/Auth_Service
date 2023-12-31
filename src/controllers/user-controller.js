const UserService = require ('../services/user-service');

const userService = new UserService();

const create = async (req,res) => {
    try {
        const response = await userService.create({
            
            email : req.body.email,
            password :req.body.password
        });
        return res.status(201).json({
            message :"Successfully created a new user",
            success:true,
            data : response,
            err : {}
         });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "Something went worng",
            data : [],
            success : false,
            err :error
        })
    }
}


const signIn = async (req,res) => {
    try {
      
        const response = await userService.signIn( req.body.email , req.body.password);
        console.log("response",response);
        return  res.status(200).json({
            message :"Successfully signed in",
            success:true,
            data : response,
            err : {}
         });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "Something went worng",
            data : [],
            success : false,
            err :error
        })
    }
}

const isAuthenticated = async (req,res) =>{
    try {
        const token = req.headers['x-access-token'];
        const response = await  userService.isAuthenticated(token);
        return res.status(200).json({
            success:true,
            err : {},
            data : response,
            message : "User is authenticated ad token is valid"
        });


    } catch (error) {
        return res.status(500).json({
            message : "Something went worng",
            data : [],
            success : false,
            err :error
        });
    }
}

const isAdmin = async(req, res) => {
    try {
        const response = await userService.isAdmin(req.body.id);
        return res.status(200).json({
            data: response,
            err: {},
            success: true,
            message: 'Successfully fetched whether user is admin or not'
        })
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            message: error.message,
            data: {},
            success: false,
            err: error.explanation
        });
    }
}

 

module.exports = {
    create,
    signIn,
    isAuthenticated,
    isAdmin
}