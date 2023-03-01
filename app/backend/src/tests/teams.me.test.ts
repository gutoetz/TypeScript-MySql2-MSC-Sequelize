import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing route Teams', () => {
  let chaiHttpResponse: Response;

//   beforeEach(async () => {
//     sinon
//       .stub(Team, "findOneTeam")
//       .resolves({
//         ...<Seu mock>
//       } as Example);
//   });

  // afterEach(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  it('Testing case 1: should return status 200', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/teams');
    expect(chaiHttpResponse.status).to.be.equal(200);
  });

//   it('Seu sub-teste', () => {
//     expect(false).to.be.eq(true);
//   });
});
