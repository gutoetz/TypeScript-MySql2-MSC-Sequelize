import { ModelStatic } from 'sequelize';
import ITeam from '../interfaces/ITeam';
import ITeamService from '../interfaces/ITeamService';
import Team from '../database/models/Teams';

class TeamService implements ITeamService {
  protected teamsModel: ModelStatic<Team> = Team;

  public async getAllTeams(): Promise<ITeam[]> {
    const teams: ITeam[] = await this.teamsModel.findAll();
    return teams;
  }
}

export default TeamService;
