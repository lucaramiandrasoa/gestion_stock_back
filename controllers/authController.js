const {sequelize, Utilisateur, Question_securite} = require('../models')
const { QueryTypes } = require('sequelize');
const jwt = require('jsonwebtoken') //Token
const bcrypt = require('bcrypt') //Cryptage

module.exports.signin = async(req,res) => {
    try {
        var {email,password} = req.body
        const utilisateur = await sequelize.query(`SELECT * FROM utilisateurs WHERE email = '${email}'`, { type: QueryTypes.SELECT })
        if(utilisateur.length > 0){
            const compare = await bcrypt.compare(password, utilisateur[0].password)
            if(compare){
                const max = 1000 * 60 * 60 * 24
                const token = jwt.sign({id: utilisateur.id}, 'secret' , {expiresIn: max })
                res.cookie('jwt', token, {maxAge: max, HttpOnly: false})
                res.json(true)
            }else{
                res.json("Verifier votre email ou votre mot de passe.")
            }
        }else{
            res.json("Ce compte n'existe pas.")
        }
    } catch (error) {
        console.log(error)
        res.json(false)
    }
}
module.exports.signup = async(req,res) => {
    try{
        var {email, password, id_question_securite, reponse_securite} = req.body
        const salt = await bcrypt.genSalt()
        password = await bcrypt.hash(password, salt)
        const utilisateur = await Utilisateur.create({email, password, id_question_securite, reponse_securite})
        res.json(utilisateur)
    }
    catch(err){
        console.log(err)
        res.json(false)
    }
}
module.exports.logout = async(req,res) => {
    try {
        res.cookie('jwt', '', {maxAge: 1})
        res.json('logout...')
    } catch (error) {
        console.log(error)
        res.json(false)
    }
}
