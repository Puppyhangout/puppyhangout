const Sequelize = require("sequelize");
const { sequelize } = require("../services/initService");
const VerificationToken = sequelize.define(
  "verification_tokens",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      onUpdate: "cascade",
      onDelete: "cascade",
      references: { model: "users", key: "email" },
    },
    token: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  },
  { timestamps: false }
);

module.exports = VerificationToken;
