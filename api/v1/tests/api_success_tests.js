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

describe('API Successful Tests (/' + apiVersion + ')', function() {

    it('GET /: should return 200 and Welcome to the <APP NAME> API! message', function(done) {
        request(app)
            .get(`/${apiVersion}`)
            .end(function(err, res) {
                expect(res.body.message).to.be.an('string').that.does.include('Welcome to the');
                expect(res.body.success).to.be.true;
                expect(res.body.code).to.be.equal(200);
                expect(res.statusCode).to.be.equal(200);
                expect(res.headers).to.have.property('access-control-allow-origin');
                done();
            });
    });

    it('GET /fulfillmentOptions: should return 200 and specific options', function(done) {
        request(app)
            .get(`/${apiVersion}/fulfillmentOptions`)
            .end(function(err, res) {
                expect(res.body.data).to.an('array');
                let responseKeys = [...new Set(res.body.data.map(bucket => Object.keys(bucket)).flat())];
                var keys = ["name", "dataId", "params"];
                expect(responseKeys).to.have.members(keys);
                expect(res.body.success).to.be.true;
                expect(res.body.code).to.be.equal(200);
                expect(res.statusCode).to.be.equal(200);
                expect(res.headers).to.have.property('access-control-allow-origin');
                done();
          });
    });

    it('POST /fulfillmentRequests: should return 201 for request fulfillment', function(done) {
        let requestBody = {
            dataId: 'query-by-home-team',
            destination: {
                bucketId: 'chrispage-dev-cds-test'
            },
            parameters: {
                homeTeamName:
                "SEA"
            }
        };
        this.timeout(10000)
        request(app)
            .post(`/${apiVersion}/fulfillmentRequests`)
            .send(requestBody)
            .end(function(err, res) {
                expect(res.body.data).to.have.keys(['requestId']);
                expect(res.body.success).to.be.true;
                expect(res.body.code).to.be.equal(201);
                expect(res.statusCode).to.be.equal(201);
                expect(res.headers).to.have.property('access-control-allow-origin');
                done();
            });
    });
});
