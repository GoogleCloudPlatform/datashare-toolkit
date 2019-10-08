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

class runtimeConfiguration {
    constructor() {
        this.verboseMode = false;
        this.labelValidation = true;
        this.dryRun = false;
        this.prerequisiteSetupOnly = false;
        this.refreshDatasetPermissionTable = true;

        const _package = require('./package');
        this.productName = _package.description;
        this.productVersion = _package.version;
    }

    get PRODUCT_NAME() {
        return this.productName;
    }

    get PRODUCT_VERSION() {
        return this.productVersion;
    }

    get BQDS_CONFIGURATION_NAME_LABEL_KEY() {
        return "bqds_configuration_name";
    }

    get VERBOSE_MODE() {
        return this.verboseMode;
    }
    set VERBOSE_MODE(flag) {
        this.verboseMode = flag;
    }

    get DRY_RUN() {
        return this.dryRun;
    }
    set DRY_RUN(flag) {
        this.dryRun = flag;
    }

    get PREREQUISITE_SETUP_ONLY() {
        return this.prerequisiteSetupOnly;
    }
    set PREREQUISITE_SETUP_ONLY(flag) {
        this.prerequisiteSetupOnly = flag;
    }

    get REFRESH_DATASET_PERMISSION_TABLE() {
        return this.refreshDatasetPermissionTable;
    }
    set REFRESH_DATASET_PERMISSION_TABLE(flag) {
        this.refreshDatasetPermissionTable = flag;
    }
}

module.exports = new runtimeConfiguration();