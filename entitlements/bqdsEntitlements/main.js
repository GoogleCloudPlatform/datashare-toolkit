#!/usr/bin/env node

/**
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const runtimeConfiguration = require("./runtimeConfiguration");
const entitlementManager = require("./entitlementManager");

const args = require('minimist')(process.argv.slice(2), {
    alias: {
        c: 'configurationFilePath',
        v: 'verbose',
        p: 'prerequisiteSetup'
    }
});

if (args["version"]) {
    console.log(runtimeConfiguration.PRODUCT_VERSION);
    process.exit(0);
}

if (args["verbose"]) {
    console.log("Command line args");
    console.log(args);
    runtimeConfiguration.VERBOSE_MODE = true;
    process.env.VERBOSE_MODE = true;
    console.log("--verbose is enabled");
}

if (args["dry-run"]) {
    runtimeConfiguration.DRY_RUN = true;
    console.log("--dry-run is enabled");
}

if (args["prerequisiteSetup"]) {
    runtimeConfiguration.PREREQUISITE_SETUP_ONLY = true;
    console.log("--prerequisiteSetup is enabled");
}

if (args["configurationFilePath"] && args["configurationFilePath"].length > 0) {
    var configFilePath = args.c.trim();
    entitlementManager.processConfiguration(configFilePath);
}
else {
    console.log("Please provide the configuration file path using -c.");
    process.exit(1);
}
