'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question_securite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Utilisateur}) {
      // define association here
      this.hasMany(Utilisateur, {foreignKey: 'id_question_securite'})
    }
  }
  Question_securite.init({
    question: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'question_securites',
    modelName: 'Question_securite',
  });
  return Question_securite;
};