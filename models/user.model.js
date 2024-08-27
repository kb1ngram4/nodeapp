
module.exports = (sequelize,Sequelize)=>{
    const User =  sequelize.define('users',{
        username:{
            type:Sequelize.STRING
        },

        age:{
            type:Sequelize.INTEGER
        }
    })

    return User
}