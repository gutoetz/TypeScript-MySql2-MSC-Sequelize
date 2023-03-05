import { Router } from 'express';
import MatchesControllers from '../controllers/matchesControllers';

const routers = Router();

const matchesControllers = new MatchesControllers();

routers.get('/', matchesControllers.getMatches.bind(matchesControllers));
routers.patch('/:id/finish', matchesControllers.getMatchesById.bind(matchesControllers));

export default routers;
