import { Router } from 'express';
import MatchesControllers from '../controllers/matchesControllers';

const routers = Router();

const matchesControllers = new MatchesControllers();

routers.get('/', matchesControllers.getMatches.bind(matchesControllers));
routers.patch('/:id/finish', matchesControllers.getMatchesById.bind(matchesControllers));
routers.patch('/:id', matchesControllers.changeMatchesById.bind(matchesControllers));
routers.post('', matchesControllers.createMatch.bind(matchesControllers));

export default routers;
