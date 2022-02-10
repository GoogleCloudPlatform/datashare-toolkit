/**
 * Copyright 2019, Google, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var app = require('../src/api.js');
var chai = require('chai');
var request = require('supertest');

const apiVersion = 'v1';
const bucketId = 'chrispage-dev-cds-test';
var expect = chai.expect;

describe('API Failure Tests (/' + apiVersion + ')', function() {

    it('GET /unknown: should return 404', function(done) {
        request(app)
            .get(`/${apiVersion}/unknown`)
            .end(function(err, res) {
                expect(res.statusCode).to.be.equal(404);
                expect(res.headers).to.have.property('access-control-allow-origin');
                done();
            });
    });

    it('GET /buckets/:bucket: should return 400 for a bad payload', function(done) {
        request(app)
            .get(`/${apiVersion}/buckets/placeholder`)
            .end(function(err, res) {
                expect(res.body.success).to.be.false;
                expect(res.body.code).to.be.equal(400);
                expect(res.statusCode).to.be.equal(400);
                expect(res.headers).to.have.property('access-control-allow-origin');
                done();
            });
    });

    it('POST /buckets/:bucket/fulfillments: should return 400 for a bad payload', function(done) {
        let requestBody = { abc: 123};
        this.timeout(10000)
        request(app)
            .post(`/${apiVersion}/buckets/${bucketId}/fulfillments`)
            .send(requestBody)
            .end(function(err, res) {
                expect(res.body.success).to.be.false;
                expect(res.body.code).to.be.equal(400);
                expect(res.statusCode).to.be.equal(400);
                expect(res.headers).to.have.property('access-control-allow-origin');
                done();
            });
    });
});
