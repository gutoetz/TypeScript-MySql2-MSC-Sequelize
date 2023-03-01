import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';

class Match extends Model {
  declare readonly id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Match.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeamId: {
    allowNull: false,
    field: 'home_team_id',
    type: INTEGER,
    references: {
      model: 'teams',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  homeTeamGoals: {
    allowNull: false,
    field: 'home_team_goals',
    type: INTEGER,
  },
  awayTeamId: {
    allowNull: false,
    field: 'away_team_id',
    type: INTEGER,
    references: {
      model: 'teams',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  awayTeamGoals: {
    allowNull: false,
    field: 'away_team_goals',
    type: INTEGER,
  },
  inProgress: {
    allowNull: false,
    field: 'in_progress',
    type: BOOLEAN,
  },
}, {
  sequelize: db,
  underscored: true,
  timestamps: false,
  modelName: 'Match',
  tableName: 'matches',
});

export default Match;
