import { Router } from 'express';
import UsersControllers from '../controllers/usersControllers';

const routers = Router();

const usersControllers = new UsersControllers();

routers.post('/', usersControllers.usersLogin.bind(usersControllers));

export default routers;
