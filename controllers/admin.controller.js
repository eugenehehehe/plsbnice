const admin = require('../models/index').admin
const jsonwebtoken = require('jsonwebtoken')
const SECRET_KEY = "eskopi"

exports.Login = async (request, response) => {
    try {
        const {email, password} = request.body
        const cariAdmin = await admin.findOne({ where: {email: email} }) 
        if (!cariAdmin) {
            return response.status(400).json({
                message: "Email tidak terdaftar"
            })
        }
        if (password !== cariAdmin.password) {
            return response.status(400).json({msg: "password salah"})
        } 
        let tokenPayLoad = { 
            adminID: cariAdmin.adminID,
            name: cariAdmin.name,
            email: cariAdmin.email,
        }
        tokenPayLoad = JSON.stringify(tokenPayLoad) 
        let token = await jsonwebtoken.sign(tokenPayLoad, SECRET_KEY)
        return response.status(200).json({
            status: true,
            message: "Login success",
            data: {
                adminID: cariAdmin.adminID,
                name: cariAdmin.name,
                email: cariAdmin.email,
                token: token
            }
        })
    }
    catch (error) {
        console.log(error);
        return response.status(400).json({
            message: error
        })
    }
}