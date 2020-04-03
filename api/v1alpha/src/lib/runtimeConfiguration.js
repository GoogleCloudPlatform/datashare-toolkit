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

class RuntimeConfiguration {
    constructor() {
        this.verboseMode = false;
        this.refreshDatasetPermissionTable = true;
    }

    get PRODUCT_NAME() {
        return 'CDS';
    }

    get PRODUCT_VERSION() {
        return '0.0.1';
    }

    get ACCESS_CONTROL_DATASET_ID() {
        return 'datashare';
    }

    get ACCESS_CONTROL_VIEW_ID() {
        return 'currentUserDataset';
    }

    get CDS_MANAGED_LABEL_KEY() {
        return 'cds_managed';
    }

    get VERBOSE_MODE() {
        return this.verboseMode;
    }
    set VERBOSE_MODE(flag) {
        this.verboseMode = flag;
    }
    
    get REFRESH_DATASET_PERMISSION_TABLE() {
        return this.refreshDatasetPermissionTable;
    }
    set REFRESH_DATASET_PERMISSION_TABLE(flag) {
        this.refreshDatasetPermissionTable = flag;
    }
}

module.exports = new RuntimeConfiguration();