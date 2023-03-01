// import Team from '../database/models/Teams';
import ITeam from './ITeam';

export default interface ITeamService {
  // create(dta: ITeam): Promise<Team>
  getAllTeams(): Promise<ITeam[]>
}
