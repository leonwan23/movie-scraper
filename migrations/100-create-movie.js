module.exports = {
  up: function(migration, Sequelize) {
    return migration.sequelize
      .query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        migration.createTable("movie", {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.literal("uuid_generate_v4()")
          },
          title: {
            type: Sequelize.STRING(256),
            allowNull: false
          },
          poster: {
            type: Sequelize.STRING(256),
            allowNull: false
          },
          cast: {
            type: Sequelize.STRING(256),
            allowNull: false
          },
          director: {
            type: Sequelize.STRING(256),
            allowNull: false
          },
          description: {
            type: Sequelize.STRING(512),
            allowNull: true
          },
          language: {
            type: Sequelize.STRING(512),
            allowNull: true
          },
          rating: {
            type: Sequelize.STRING(256),
            allowNull: false
          },
          runtime: {
            type: Sequelize.STRING(256),
            allowNull: false
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
          }
        });
      });
  },
  down: function(migration, Sequelize, done) {
    migration.dropTable("movie").done(done);
  }
};
