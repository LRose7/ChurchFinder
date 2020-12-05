/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('churches', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    Name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Description: {
      type: "BLOB",
      allowNull: true
    },
    Mailing_One: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Mailing_Two: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    City: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    State: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    PostalCode: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Denomination: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Web_URL: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Latitude: {
      type: DataTypes.DECIMAL(10,8),
      allowNull: true
    },
    Longitude: {
      type: DataTypes.DECIMAL(11,8),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'churches'
  });
};
