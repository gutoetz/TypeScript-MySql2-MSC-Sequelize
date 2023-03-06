import { Request, Response } from 'express';
import LeaderBoardService from '../services/leaderBoardService';

class LeaderBoarderControllers {
  constructor(private leaderBoardService = new LeaderBoardService()) {}

  public async getBoardHome(req: Request, res: Response) {
    const matches = await this.leaderBoardService.getBoardHome();
    res.status(200).json(matches);
  }

  public async getBoardAway(req: Request, res: Response) {
    const matches = await this.leaderBoardService.getBoardAway();
    res.status(200).json(matches);
  }
}

export default LeaderBoarderControllers;
