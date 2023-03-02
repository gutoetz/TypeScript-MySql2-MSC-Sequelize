import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import validateLogin from '../middleware/validateLogin.middleware';
import Users from '../database/models/Users';
import HttpException from '../utils/http.exception';
import { IUser, IToken } from '../interfaces/Interfaces';
import { createToken } from '../utils/jwtVerify';

class UserService {
  protected usersModel: ModelStatic<Users> = Users;

  public async usersLogin(body: IUser): Promise<IToken> {
    const { email, password } = body;
    const error = validateLogin(body);
    if (error) {
      const errorStatus = error.details[0].message.includes('filled') ? 400 : 401;
      throw new HttpException(errorStatus, error.details[0].message);
    }
    const login = await this.usersModel.findOne({ where: { email } });
    if (!login) throw new HttpException(401, 'Invalid email or password');
    const hash = login?.dataValues.password;
    const match = await bcrypt.compare(password, hash);
    if (match) {
      const token = createToken(email, login?.dataValues.id);
      return { token };
    }
    throw new HttpException(401, 'Invalid email or password');
  }
}

export default UserService;
