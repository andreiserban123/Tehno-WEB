/**
 * Defines the 'project' entity in the database.
 *
 * @param {object} sequelize - The Sequelize instance used to define the model.
 * @param {object} DataTypes - A collection of data types supported by Sequelize.
 * @returns {object} A Sequelize model representing the 'project' entity.
 *
 * @property {string} name - The name of the project. This field is required.
 * @property {string} [description] - A detailed description of the project. This field is optional.
 */
export default (sequelize, DataTypes) => {
  return sequelize.define('project', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    }
  })
}
