import ITeam from './ITeam';
import IUser from './IUser';
import IToken from './IToken';

interface IResult {
  awayTeamGoals: number,
  homeTeamGoals: number,
}
interface IInsertMatch {
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
}
interface ILeaderboard {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number
}
interface ILeaderboardEff extends ILeaderboard{
  goalsBalance: number,
  efficiency: string,
}
interface IMatches {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

interface IBoard {
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
}
export { ITeam, IUser, IToken, IResult, IInsertMatch, ILeaderboard, IMatches, IBoard,
  ILeaderboardEff };
