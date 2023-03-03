import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');
import { token, user, userDb} from '../utils/mocks'
import { Model } from 'sequelize';
import { app } from '../app';
import User from '../database/models/Users';
import * as createToken from '../utils/jwtVerify'
import { Response } from 'superagent';
import UsersControllers from '../controllers/usersControllers';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing route Users', () => {
  let chaiHttpResponse: Response;
  const sandbox = sinon.createSandbox()
  afterEach(async () => {
    //clean and release the original methods afterEach test case at runtime
    sandbox.restore(); 
});
  beforeEach(async () => {
    sinon.restore()
  });

  // afterEach(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  it('Testing case 1: should return status 200 and a token', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send(user);
    expect(chaiHttpResponse.status).to.be.equal(200);
  });
  
  it('Testing case 2: body without password', async () => {
    const body = {email: "admin@admin.com", password: ''}
    chaiHttpResponse = await chai
       .request(app).post('/login').send(body);
    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'All fields must be filled'})
  });

  it('Testing case 3: body without email', async () => {
    const body = {email: "", password: '123456'}
    chaiHttpResponse = await chai
       .request(app).post('/login').send(body);
    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'All fields must be filled'})
  });

  it('Testing case 4: invalid password', async () => {
    sinon.stub(User, 'findOne').resolves(userDb as User)
    sinon.stub(bcrypt, 'compare').resolves(false)
    const body = {email: "augustoetz@hotmail.com", password: '123456'}
    chaiHttpResponse = await chai
       .request(app).post('/login').send(body);
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Invalid email or password'})
  });

  it('Testing case 5: valid Login and return role', async () => {
    sinon.stub(User, 'findOne').resolves(userDb as User)
    sinon.stub(bcrypt, 'compare').resolves(true)
    chaiHttpResponse = await chai
       .request(app).post('/login').send(user);
    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body).to.have.key('token')

    const newHttpResponse = await chai.request(app).get('/login/role').set("Authorization", chaiHttpResponse.body.token)
    expect(newHttpResponse.status).to.be.equal(200)
    expect(newHttpResponse.body).to.deep.equal({role: 'admin'})
  });

  it('Testing case 6: invalid login Role', async () => {
    sinon.stub(User, 'findOne').onFirstCall().resolves(userDb as User).onSecondCall().resolves(undefined)
    sinon.stub(bcrypt, 'compare').resolves(true)
    chaiHttpResponse = await chai
       .request(app).post('/login').send(user);
    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body).to.have.key('token')

    const newHttpResponse = await chai.request(app).get('/login/role').set("Authorization", chaiHttpResponse.body.token)
    expect(newHttpResponse.status).to.be.equal(401)
  });
//   it('Seu sub-teste', () => {
//     expect(false).to.be.eq(true);
//   });
});

// .set("authorization", 'token')
// .send(body)