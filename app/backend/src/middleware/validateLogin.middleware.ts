import * as Joi from 'joi';
import { IUser } from '../interfaces/Interfaces';

const validateLogin = (body: IUser) => {
  const loginSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required().label('email'),
    password: Joi.string().min(6).required().label('password'),
  }).required().messages({
    'string.empty': 'All fields must be filled',
    'any.required': 'All fields must be filled',
    'string.min': 'Invalid email or password',
    'string.email': 'Invalid email or password',
  });
  const { error } = loginSchema.validate(body);
  return error;
};

export default validateLogin;
