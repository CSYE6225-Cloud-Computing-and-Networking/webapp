// // import { assert, expect  } from "chai";

// // // import app from '../index.js'

// // describe("Tests", () => {
// //     it("Test", () => {
// //     const result = 5;
// //     assert.equal(result, 5);
// //  });
// // });

// let chai = require('chai');
// let chaiHttp = require('chai-http');
// import app from '../index.js';
// let should = chai.should();

// chai.use(chaiHttp);

// describe('Health', () => {

//   describe('/GET check', () => {
//       it('it should return 200', (done) => {
//         chai.request(server)
//             .get('/healthz')
//             .end((err, res) => {
//                   res.should.have.status(200);
//               done();
//             });
//       });
//   });

// });

import request from "supertest";
import app from '../index.js'

beforeAll(done => {
    done()
})

describe("GET /user/test", () => {
    it("should return 200", async () => {
      const res = await request(app).get("/healthz");
      expect(res.statusCode).toBe(200);
    });
});

afterAll(done => {
    done()
})
  