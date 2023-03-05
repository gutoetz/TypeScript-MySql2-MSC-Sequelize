import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';

class MatchesControllers {
  constructor(private matchesService = new MatchesService()) {}

  public async getMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    const matches = await this.matchesService.getMatches(inProgress as string);
    res.status(200).json(matches);
  }

  public async getMatchesById(req: Request, res: Response) {
    const { id } = req.params;
    const token = req.headers.authorization;
    const changed = await this.matchesService.getMatchesById(id, token);
    if (changed) { res.status(200).json({ message: 'Finished' }); }
  }

  public async changeMatchesById(req: Request, res: Response) {
    const { id } = req.params;
    const token = req.headers.authorization;
    const result = req.body;
    const changed = await this.matchesService.changeMatchesById(id, token, result);
    if (changed) { res.status(200).json({ message: 'Changed' }); }
  }
}

export default MatchesControllers;
