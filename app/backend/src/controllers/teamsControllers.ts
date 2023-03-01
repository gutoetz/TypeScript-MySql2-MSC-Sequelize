import { Request, Response } from 'express';
import TeamService from '../services/teamsService';

class TeamControllers {
  constructor(private teamService = new TeamService()) {}

  public async getAllTeams(req: Request, res: Response) {
    const teams = await this.teamService.getAllTeams();
    res.status(200).json(teams);
  }

  public async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await this.teamService.getTeamById(id);
    res.status(200).json(team);
  }
}

export default TeamControllers;
