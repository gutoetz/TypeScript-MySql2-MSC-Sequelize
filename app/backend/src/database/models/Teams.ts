import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Team extends Model {
  declare readonly id: number;
  declare teamName: string;
}

Team.init({
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  teamName: {
    allowNull: false,
    field: 'team_name',
    type: STRING,
  },
}, {
  sequelize: db,
  underscored: true,
  timestamps: false,
  modelName: 'Team',
  tableName: 'teams',
});

export default Team;
