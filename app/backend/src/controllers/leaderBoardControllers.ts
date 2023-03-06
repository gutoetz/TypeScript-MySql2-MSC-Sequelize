import { Request, Response } from 'express';
import LeaderBoardService from '../services/leaderBoardService';

class LeaderBoarderControllers {
  constructor(private leaderBoardService = new LeaderBoardService()) {}

  public async getBoard(req: Request, res: Response) {
    const matches = await this.leaderBoardService.getBoard();
    res.status(200).json(matches);
  }
}

export default LeaderBoarderControllers;
