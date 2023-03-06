import { Router } from 'express';
import LeaderBoardControllers from '../controllers/leaderBoardControllers';

const routers = Router();

const leaderBoardControllers = new LeaderBoardControllers();

routers.get('/home', leaderBoardControllers.getBoardHome.bind(leaderBoardControllers));
routers.get('/away', leaderBoardControllers.getBoardAway.bind(leaderBoardControllers));
routers.get('/', leaderBoardControllers.getBoard.bind(leaderBoardControllers));

export default routers;
