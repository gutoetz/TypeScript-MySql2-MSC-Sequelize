import { ModelStatic } from 'sequelize';
import { authenticatToken } from '../utils/jwtVerify';
import Team from '../database/models/Teams';
// import HttpException from '../utils/http.exception';
// import ITeam from '../interfaces/ITeam';
import Matches from '../database/models/Match';
import { IResult } from '../interfaces/Interfaces';

class MatchesService {
  protected matchesModel: ModelStatic<Matches> = Matches;

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
}

export default MatchesService;
