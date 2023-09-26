const { User } = require ('../models/index');

class UserRepository {
    async create(data){
        try {
            const user = await User.create(data);
            return user;
            
        } catch (error) {
            console.log('Something wrong on repository layer');
            throw error;
        }
    }

    async destroy(userId){
        try {
            const user = await User.destroy( {
                where :{
                id: userId
            }
        });
            return true;
            
        } catch (error) {
            console.log('Something wrong on repository layer');
            throw error;
        }
    }

    async getById(userId){
        try {
            const user = await User.findByPk(userId, {
                attributes : [ 'email','id']                          // we try to fetch specific attributes
            });
            return user;
        } catch (error) {
            console.log('Something wrong on repository layer');
            throw error;
        }
    }
}

module.exports = UserRepository;