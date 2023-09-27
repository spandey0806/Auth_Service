const jwt = require('jsonwebtoken');
const UserRepository = require('../repository/user-repository');
const bcrypt = require('bcrypt');

const { JWT_KEY } = require('../config/serverConfig');
const AppErrors = require('../utils/error-handler');


class UserService {
    constructor(){
        this.userRepository = new UserRepository ();
    }

    async create (data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            if(error.name == 'SequelizeValidationError') {
                throw error;
            }
          console.log("Something went wrong in the service layer");
          throw error;  
        }
    }

    async signIn(email,plainPassword){
        try {
           
            // Step  1-> fetch the user using the mail
            const user = await this.userRepository.getByEmail(email);
            // Step 2 -> Compare incoming password with stored encrypted password
            const passwordMatch = this.checkPassword(plainPassword ,user.password);
            if(!passwordMatch){
                console.log("Password doesn't match");
                throw { error: "Incorrect Password"}
            } 
            // Step 3 -> if password match then create a token and send it to the user
            const newJWT = this.createToken({ email : this.userRepository.email , id: user.id});
            return newJWT;
        } catch (error) {
            console.log("Something went wrong in login");
            throw error;
        }

    }

    async isAuthenticated (token){
        try {
            const response = this.verifyToken(token);
            if(!response){
                throw { error : "Invalid token"}
            }

            const user = await this.userRepository.getById(response.id);
            if(!user){
                throw { error : "No user with corresponding token exists"}
            }
            return user.id;
        } catch (error) {
            console.log("Something went wrong in th auth process");
            throw error;    
        }
    }

    createToken(user){
        try {
            const result = jwt.sign(user, JWT_KEY , { expiresIn : '1h'});
            return result;
        } catch (error) {
            console.log("Something went wrong in token creation");
            throw error;
        }

    }

    verifyToken(token){
        try {
            const response = jwt.verify(token , JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in token validatin");
            throw error;
        }
    }

    checkPassword(userInputPassword , encyptedPassword){
        try {
            return bcrypt.compareSync(userInputPassword,encyptedPassword)
        } catch (error) {
            console.log("Something went wrong in password comparison");
            throw error;
        }
    }

    isAdmin (userId){
        try {
             
            console.log(userId);
            return this.userRepository.isAdmin(userId);
            
        } catch (error) {
            console.log("Something went wrong in  service layer");
            throw error;
        }
    }

}

module.exports = UserService ;