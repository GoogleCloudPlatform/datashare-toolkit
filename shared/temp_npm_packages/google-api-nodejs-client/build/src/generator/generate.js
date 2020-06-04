"use strict";
// Copyright 2014 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const minimist = require("yargs-parser");
const path = require("path");
const rimraf = require("rimraf");
const util = require("util");
const download_1 = require("./download");
const generator_1 = require("./generator");
const argv = minimist(process.argv.slice(2));
const discoveryUrl = argv['discovery-url'];
const useCache = argv['use-cache'];
console.log(`useCache: ${useCache}`);
const debug = true;
const gen = new generator_1.Generator({ debug, includePrivate: false });
async function main() {
    if (!discoveryUrl && argv._.length > 0) {
        argv._.forEach(async (url) => {
            await gen.generateAPI(url);
            console.log('Generated API for ' + url);
        });
    }
    else {
        console.log('Removing old APIs...');
        const apiPath = path.join(__dirname, '../../../src/apis');
        await util.promisify(rimraf)(apiPath);
        console.log('Generating APIs...');
        await gen.generateAllAPIs(discoveryUrl || download_1.DISCOVERY_URL, useCache);
        console.log('Finished generating APIs!');
    }
}
main().catch(console.error);
//# sourceMappingURL=generate.js.map