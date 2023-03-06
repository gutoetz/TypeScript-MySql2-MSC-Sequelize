import { Router } from 'express';
import LeaderBoardControllers from '../controllers/leaderBoardControllers';

const routers = Router();

const leaderBoardControllers = new LeaderBoardControllers();

routers.get('/home', leaderBoardControllers.getBoard.bind(leaderBoardControllers));

export default routers;
