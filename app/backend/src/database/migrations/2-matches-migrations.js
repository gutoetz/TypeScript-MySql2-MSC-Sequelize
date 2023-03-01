'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id:{
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false, 
      },
      homeTeamId:{
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'home_team_id',
        references: {
          model: 'teams',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      homeTeamGoals:{
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'home_team_goals',
      },
      awayTeamId:{    
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'away_team_id',
          references: {
          model: 'teams',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      awayTeamGoals:{
        allowNull: false,
        type: Sequelize.INTEGER,
        field:'away_team_goals',
      },
      inProgress:{ 
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'in_progress',
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('matches');
  }
};
