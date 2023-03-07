import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');
import { token} from '../utils/mocks'
import { Model } from 'sequelize';
import { app } from '../app';
import Team from '../database/models/Teams';
import Match from '../database/models/Match';
import * as createToken from '../utils/jwtVerify'
import { Response } from 'superagent';
import UsersControllers from '../controllers/usersControllers';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing route Users', () => {
  let chaiHttpResponse: Response;
  const sandbox = sinon.createSandbox()
  afterEach(async () => {
    sandbox.restore(); 
});
// sinon.stub(User, 'findOne').resolves(userDb as User)
// sinon.stub(bcrypt, 'compare').resolves(true)
// sinon.stub(Match, 'update').resolves([0])
// const chaiHttpResponse = await chai
//    .request(app).post('/login').send(user);
// expect(chaiHttpResponse.status).to.be.equal(200)
// expect(chaiHttpResponse.body).to.have.key('token')
  it('Testing case 1: should return status 200', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/leaderboard').send();
    expect(chaiHttpResponse.status).to.be.equal(200);
  });
  it('Testing case 2: should return status 200 rota home', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/leaderboard/home').send();
    expect(chaiHttpResponse.status).to.be.equal(200);
  });
  it('Testing case 3: should return status 200 rota away', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/leaderboard/away').send();
    expect(chaiHttpResponse.status).to.be.equal(200);
  });
});
