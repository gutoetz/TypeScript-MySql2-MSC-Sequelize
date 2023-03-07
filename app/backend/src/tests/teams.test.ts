import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import {team, teams} from '../utils/mocks'
import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import { Model } from 'sequelize';
import Team from '../database/models/Teams';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing route Teams', () => {
  let chaiHttpResponse: Response;
  const sandbox = sinon.createSandbox()

  afterEach(async () => {
    sandbox.restore(); 
});
  beforeEach(async () => {
    sinon.restore()
  });

  it('Testing case 1: should return status 200', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/teams');
    expect(chaiHttpResponse.status).to.be.equal(200);
  });
  
  it('Testing case 2: should return all teams route /teams GET', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/teams');
    expect(chaiHttpResponse.body).to.deep.equal(teams);
  });

  it('Testing case 3: should return the team route /teams GET by ID', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/teams/2');
    expect(chaiHttpResponse.body).to.deep.equal(team);
  });

  it('Testing case 4: should return error', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/teams/2222222222');
    expect(chaiHttpResponse.status).to.be.equal(400);
  });
//   it('Seu sub-teste', () => {
//     expect(false).to.be.eq(true);
//   });
});

// .set("authorization", 'token')
// .send(body)