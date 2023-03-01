import { Request, Response } from 'express';
import TeamService from '../services/teamsService';

class TeamControllers {
  constructor(private teamService = new TeamService()) {}

  public async getAllTeams(req: Request, res: Response) {
    const teams = await this.teamService.getAllTeams();
    res.status(200).json(teams);
  }
}

export default TeamControllers;
