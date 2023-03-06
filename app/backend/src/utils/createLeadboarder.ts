import { IMatches, ITeam, IBoard, ILeaderboardEff } from '../interfaces/Interfaces';

const objetoInicial = {
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
};

function reduceMatches(matches: IMatches[]): IBoard {
  const reducedMatches = matches.reduce((previous, match) => {
    const actualObject: IBoard = { ...previous };
    const { awayTeamGoals, homeTeamGoals } = match;
    if (homeTeamGoals > awayTeamGoals) {
      actualObject.totalVictories += 1;
      actualObject.totalPoints += 3;
    } if (homeTeamGoals < awayTeamGoals) {
      actualObject.totalLosses += 1;
    } if (homeTeamGoals === awayTeamGoals) {
      actualObject.totalDraws += 1;
      actualObject.totalPoints += 1;
    }
    actualObject.goalsOwn += match.awayTeamGoals;
    actualObject.goalsFavor += match.homeTeamGoals;
    actualObject.totalGames += 1;
    return actualObject;
  }, objetoInicial);
  return reducedMatches;
}
function createLeaderBoarder(teamValues: ITeam, matches: IMatches[]): ILeaderboardEff {
  const { teamName } = teamValues;
  const finalResults = reduceMatches(matches);
  const result: ILeaderboardEff = {
    name: teamName,
    ...finalResults,
    goalsBalance: (finalResults.goalsFavor - finalResults.goalsOwn),
    efficiency: ((finalResults.totalPoints / (finalResults.totalGames * 3)) * 100)
      .toFixed(2),
  };
  return result;
}

function orderedResult(result: ILeaderboardEff[]) {
  const newResult = result.sort((t1, t2) => {
    if (t1.totalPoints > t2.totalPoints) return -1;
    if (t1.totalPoints < t2.totalPoints) return 1;
    if (t1.totalVictories > t2.totalVictories) return -1;
    if (t1.totalVictories < t2.totalVictories) return 1;
    if (t1.goalsBalance > t2.goalsBalance) return -1;
    if (t1.goalsBalance < t2.goalsBalance) return 1;
    if (t1.goalsFavor > t2.goalsFavor) return -1;
    if (t1.goalsFavor < t2.goalsFavor) return 1;
    if (t1.goalsOwn > t2.goalsOwn) return -1;
    if (t1.goalsOwn < t2.goalsOwn) return 1;
    return 0;
  });
  //   newResult.sort((a, b) => {
  //     if (a.efficiency > b.efficiency) return -1;
  //     return +1;
  //   });
  return newResult;
}

export { createLeaderBoarder, orderedResult };