import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import validateLogin from '../middleware/validateLogin.middleware';
import Users from '../database/models/Users';
import HttpException from '../utils/http.exception';
import { IUser, IToken } from '../interfaces/Interfaces';
import { createToken, authenticatToken } from '../utils/jwtVerify';

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
      const token = await createToken(email, login?.dataValues.id);
      return { token };
    }
    throw new HttpException(401, 'Invalid email or password');
  }

  public async usersGetRole(token: string | undefined) {
    if (!token) throw new HttpException(401, 'Token not found');
    const verifyToken = await authenticatToken(token);
    const { email } = verifyToken;
    const getRole = await this.usersModel.findOne({ where: { email } });
    if (getRole) return { role: getRole.dataValues.role };
    throw new HttpException(401, 'User not found');
  }
}

export default UserService;
