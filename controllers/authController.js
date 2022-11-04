const {sequelize, Utilisateur, Question_securite} = require('../models')
const { QueryTypes } = require('sequelize');
const jwt = require('jsonwebtoken') //Token
const bcrypt = require('bcrypt') //Cryptage

module.exports.account_recovery = async(req,res) => {
    try {
        const {id_utilisateur, id_question_securite, reponse_securite} = req.body
        const user = await Utilisateur.findOne({id: id_utilisateur})
        user.id_question_securite === id_question_securite && user.reponse_securite === reponse_securite ? res.json(true) : res.json(false)
    } catch (error) {
        console.log(error)
        res.json("error")
    }
}

module.exports.change_password = async(req,res) => {
    try {
        const {id_utilisateur, new_password} = req.body
        const user = await Utilisateur.findOne({id: id_utilisateur})
        const salt = await bcrypt.genSalt()
        user.password = await bcrypt.hash(new_password, salt) 
        user.save()
        res.json(true)
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
module.exports.logout = async(req,res) => {
    try {
        res.cookie('jwt', '', {maxAge: 1})
        res.json('logout...')
    } catch (error) {
        console.log(error)
        res.json(false)
    }
}
