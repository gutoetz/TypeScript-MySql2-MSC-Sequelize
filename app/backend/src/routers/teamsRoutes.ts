import { Router } from 'express';
import TeamControllers from '../controllers/teamsControllers';

const routers = Router();

const teamsControllers = new TeamControllers();

routers.get('/', teamsControllers.getAllTeams.bind(teamsControllers));

export default routers;
