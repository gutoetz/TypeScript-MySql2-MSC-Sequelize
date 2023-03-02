import { Request, Response } from 'express';
import UsersService from '../services/usersService';

class UsersControllers {
  constructor(private userService = new UsersService()) {}

  public async usersLogin(req: Request, res: Response) {
    const { body } = req;
    const teams = await this.userService.usersLogin(body);
    res.status(200).json(teams);
  }
}

export default UsersControllers;
