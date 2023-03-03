import { ModelStatic } from 'sequelize';
import Team from '../database/models/Teams';
// import HttpException from '../utils/http.exception';
// import ITeam from '../interfaces/ITeam';
import Matches from '../database/models/Match';

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
}

export default MatchesService;
