import { ModelStatic } from 'sequelize';
import Team from '../database/models/Teams';
import Matches from '../database/models/Match';
import { orderedResult, createLeaderBoarder, sumLeaderBoarder } from '../utils/createLeadboarder';
import { IMatches, ILeaderboardEff } from '../interfaces/Interfaces';
// import { authenticatToken } from '../utils/jwtVerify';
// import HttpException from '../utils/http.exception';
// import ITeam from '../interfaces/ITeam';

class LeaderBoardService {
  protected matchesModel: ModelStatic<Matches> = Matches;
  protected teamModel: ModelStatic<Team> = Team;

  public async getBoardHome() {
    const teams = await this.teamModel.findAll();
    const matches = (await this.matchesModel
      .findAll({ where: { inProgress: false } })).map((e) => e.dataValues);
    const result: ILeaderboardEff[] = [];
    teams.forEach((e) => {
      const matcPlayed: IMatches[] = matches
        .filter((match) => match.homeTeamId === e.dataValues.id);
      const leaderboard = createLeaderBoarder(e.dataValues, matcPlayed, 'home');
      result.push(leaderboard);
    });
    console.log(result);
    return orderedResult(result);
  }

  public async getBoardAway() {
    const teams = await this.teamModel.findAll();
    const matches = (await this.matchesModel
      .findAll({ where: { inProgress: false } })).map((e) => e.dataValues);
    const result: ILeaderboardEff[] = [];
    teams.forEach((e) => {
      const matcPlayed: IMatches[] = matches
        .filter((match) => match.awayTeamId === e.dataValues.id);
      const leaderboard = createLeaderBoarder(e.dataValues, matcPlayed, 'away');
      result.push(leaderboard);
    });
    return orderedResult(result);
  }

  public async getBoard() {
    const teams = await this.teamModel.findAll();
    const matches = (await this.matchesModel
      .findAll({ where: { inProgress: false } })).map((e) => e.dataValues);
    const result: ILeaderboardEff[] = [];
    teams.forEach((e) => {
      const home: IMatches[] = matches
        .filter((match) => match.homeTeamId === e.dataValues.id);
      const away: IMatches[] = matches
        .filter((match) => match.awayTeamId === e.dataValues.id);
      const leaderBoardHome = createLeaderBoarder(e.dataValues, home, 'home');
      const leaderBoardAway = createLeaderBoarder(e.dataValues, away, 'away');
      const sumBoards: ILeaderboardEff = sumLeaderBoarder(leaderBoardAway, leaderBoardHome);
      result.push(sumBoards);
    });
    return orderedResult(result);
  }
}

export default LeaderBoardService;
