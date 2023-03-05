import ITeam from './ITeam';
import IUser from './IUser';
import IToken from './IToken';

interface IResult {
  awayTeamGoals: number,
  homeTeamGoals: number,
}
interface IInsertMatch {
  'homeTeamId': number, // O valor deve ser o id do time
  'awayTeamId': number, // O valor deve ser o id do time
  'homeTeamGoals': number,
  'awayTeamGoals': number,
}
export { ITeam, IUser, IToken, IResult, IInsertMatch };
