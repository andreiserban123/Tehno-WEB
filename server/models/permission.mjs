/**
 * Defines the 'permission' entity in the database.
 *
 * @param {object} sequelize - The Sequelize instance used to define the model.
 * @param {object} DataTypes - A collection of data types supported by Sequelize.
 * @returns {object} A Sequelize model representing the 'permission' entity.
 *
 * @property {number} forResource - The ID of the resource the permission applies to. This field is required.
 * @property {number} forUser - The ID of the user the permission applies to. This field is required.
 * @property {number} type - The type of entity the permission applies to. This field is required.
 * @property {Array} rights - The rights granted by the permission. This field is required.
 */
export default (sequelize, DataTypes) => {
  return sequelize.define('permission', {
    forResource: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    forUser: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: 'project',
    rights: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: []
    }
  })
}