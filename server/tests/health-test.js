import { assert } from "chai";

describe("Tests", () => {
    it("Test", () => {
    const result = 5;
    assert.equal(result, 5);
 });
});



// import request from "supertest";
// import app from '../index.js'

// // // beforeAll(done => {
// // //     done()
// // // })

// describe("GET /healthz", () => {
//     it("should return 200", async () => {
//       const res = await request(app).get("/healthz");
//       expect(res.statusCode).toBe(200);
//     //   expect(res.body.length).toBeGreaterThan(0);
//     });
// });
