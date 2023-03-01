import { Router } from 'express';
import TeamControllers from '../controllers/teamsControllers';

const routers = Router();

const teamsControllers = new TeamControllers();

routers.get('/', teamsControllers.getAllTeams.bind(teamsControllers));
routers.get('/:id', teamsControllers.getTeamById.bind(teamsControllers));

export default routers;
