import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';

class MatchesControllers {
  constructor(private matchesService = new MatchesService()) {}

  public async getMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    const matches = await this.matchesService.getMatches(inProgress as string);
    res.status(200).json(matches);
  }
}

export default MatchesControllers;
