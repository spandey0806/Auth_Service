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
        console.log("Scontroller layer sign in")
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

module.exports = {
    create,
    signIn
}