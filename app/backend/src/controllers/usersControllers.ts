import { Request, Response } from 'express';
import UsersService from '../services/usersService';

class UsersControllers {
  constructor(private userService = new UsersService()) {}

  public async usersLogin(req: Request, res: Response) {
    const { body } = req;
    const teams = await this.userService.usersLogin(body);
    res.status(200).json(teams);
  }

  public async usersGetRole(req: Request, res: Response) {
    const token = req.headers.authorization;
    const getRole = await this.userService.usersGetRole(token);
    res.status(200).json(getRole);
  }
}

export default UsersControllers;
