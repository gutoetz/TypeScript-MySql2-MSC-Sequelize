import { ModelStatic } from 'sequelize';
import { authenticatToken } from '../utils/jwtVerify';
import Team from '../database/models/Teams';
import HttpException from '../utils/http.exception';
// import ITeam from '../interfaces/ITeam';
import Matches from '../database/models/Match';
import { IInsertMatch, IResult } from '../interfaces/Interfaces';

class MatchesService {
  protected matchesModel: ModelStatic<Matches> = Matches;
  protected teamModel: ModelStatic<Team> = Team;

  public async getMatches(query: string | undefined) {
    const matches = await this.matchesModel.findAll({ include: [
      { model: Team, as: 'homeTeam', attributes: ['teamName'] },
      { model: Team, as: 'awayTeam', attributes: ['teamName'] },
    ] });
    if (query) {
      const isTrue = query === 'true';
      return matches.filter((match) => match.inProgress === isTrue);
    }
    return matches;
  }

  public async getMatchesById(id: string, token: string | undefined) {
    await authenticatToken(token);
    const changeMatch = await this.matchesModel.update({ inProgress: false }, { where: { id } });
    if (changeMatch) return 1;
  }

  public async changeMatchesById(id: string, token: string | undefined, result: IResult) {
    await authenticatToken(token);
    const changeMatch = await this.matchesModel.update({
      homeTeamGoals: result.homeTeamGoals,
      awayTeamGoals: result.awayTeamGoals,
    }, { where: { id } });
    if (changeMatch) return 1;
  }

  public async createMatch(token: string | undefined, result: IInsertMatch) {
    const { awayTeamGoals, awayTeamId, homeTeamGoals, homeTeamId } = result;
    await authenticatToken(token);
    if (awayTeamId === homeTeamId) {
      throw new HttpException(422, 'It is not possible to create a match with two equal teams');
    }
    const team1 = await this.teamModel.findByPk(awayTeamId);
    const team2 = await this.teamModel.findByPk(homeTeamId);
    if (!team1 || !team2) {
      throw new HttpException(404, 'There is no team with such id!');
    }
    const changeMatch = await this.matchesModel.create({
      awayTeamGoals, awayTeamId, homeTeamGoals, homeTeamId, inProgress: true });
    if (changeMatch) return changeMatch.dataValues.id;
  }
}

export default MatchesService;
