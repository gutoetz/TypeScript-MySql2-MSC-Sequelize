import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');
import { matchesCreate, matchesBody, matches, userDb, user, returnCreate } from '../utils/mocks'
import { Model } from 'sequelize';
import { app } from '../app';
import Match from '../database/models/Match';
import User from '../database/models/Users';
import * as createToken from '../utils/jwtVerify'
import { Response } from 'superagent';
import {IMatchesTst } from '../interfaces/Interfaces'

chai.use(chaiHttp);

const { expect } = chai;

const matchList = [
  new Match({
    id: 1,
    homeTeamId: 1,
    homeTeamGoals: 3,
    awayTeamId: 2,
    awayTeamGoals: 2,
    inProgress: true,
  }),
  new Match({
    id: 2,
    homeTeamId: 3,
    homeTeamGoals: 7,
    awayTeamId: 4,
    awayTeamGoals: 1,
    inProgress: true,
  }),
];

describe('Testing route Matches', () => {
  let chaiHttpResponse: Response;
  const sandbox = sinon.createSandbox()

  it('Testing case 1: should return status 200', async () => {
    sinon.stub(Match, 'findAll').resolves(matchList)
    chaiHttpResponse = await chai
       .request(app).get('/matches').send();
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(matches);

    const newResponse = await chai.
    request(app).get('/matches?inProgress=true').send();
    expect(newResponse.status).to.be.equal(200);
    expect(newResponse.body).to.deep.equal(matches);
  });
  
  it('Testing case 2: should return 200 and finish', async () => {
    sinon.stub(User, 'findOne').resolves(userDb as User)
    sinon.stub(bcrypt, 'compare').resolves(true)
    sinon.stub(Match, 'update').resolves([0])
    const chaiHttpResponse = await chai
       .request(app).post('/login').send(user);
    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body).to.have.key('token')
    const newRequest = await chai
       .request(app).patch('/matches/2/finish').send().set('Authorization', chaiHttpResponse.body.token);
    expect(newRequest.status).to.be.equal(200);
    expect(newRequest.body).to.deep.equal({ message: 'Finished'})
  });

  it('Testing case 3: should return 200 and changed', async () => {
    const chaiHttpResponse = await chai
       .request(app).post('/login').send(user);
    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body).to.have.key('token')
    const newRequest = await chai
       .request(app).patch('/matches/2').send(matchesBody).set('Authorization', chaiHttpResponse.body.token);
    expect(newRequest.status).to.be.equal(200);
    expect(newRequest.body).to.deep.equal({ message: 'Changed'})
  });

  it('Testing case 4: should return 200 and changed', async () => {
    sinon.stub(Model, 'findByPk').onFirstCall().resolves(matchesBody as Match).onSecondCall()
    .resolves(matchesBody as Match).onThirdCall().resolves(null)
    sinon.stub(Match, 'create').resolves(returnCreate as Match)
    const chaiHttpResponse = await chai
       .request(app).post('/login').send(user);
    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body).to.have.key('token')
    const newRequest = await chai
       .request(app).post('/matches').send(matchesCreate).set('Authorization', chaiHttpResponse.body.token);
    expect(newRequest.status).to.be.equal(201);
    expect(newRequest.body).to.deep.equal({
      ...matchesCreate,
      id: 2,
      inProgress: true
    })
    const requestNoTeam = await chai
    .request(app).post('/matches').send(matchesCreate).set('Authorization', chaiHttpResponse.body.token);
 expect(requestNoTeam.status).to.be.equal(404);
 expect(requestNoTeam.body).to.deep.equal({message: 'There is no team with such id!'})

 const lastRequest = await chai.request(app).post('/matches').send({
    homeTeamId: 8,
    awayTeamId: 8,
    homeTeamGoals: 2,
    awayTeamGoals: 2,
 }).set('Authorization', chaiHttpResponse.body.token);
 expect(lastRequest.status).to.be.equal(422);
 expect(lastRequest.body).to.deep.equal({message: 'It is not possible to create a match with two equal teams'})
  });
});

// .set("authorization", 'token')
// .send(body)