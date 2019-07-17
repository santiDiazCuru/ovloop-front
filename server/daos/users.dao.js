const User = require('../models/users')

class usersDao {
    static fetchUser(user, pswd){
       return User.find({
            username: user,
            password: pswd
        }).then((user)=> {
            console.log('entra al daoo', user)
            return user
        })
    }
}

module.exports = usersDao;