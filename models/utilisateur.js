'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Utilisateur extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Question_securite}) {
      // define association here
      this.belongsTo(Question_securite,{foreignKey: 'id_question_securite'} )
    }
  }
  Utilisateur.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    id_question_securite: DataTypes.INTEGER,
    reponse_securite: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'utilisateurs',
    modelName: 'Utilisateur',
  });
  return Utilisateur;
};