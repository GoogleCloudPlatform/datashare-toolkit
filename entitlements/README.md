[Back to BQDS](../README.md)

# Entitlement engine
The entitlement toolkit contains an engine to synthesize views and data entitlements. This allows publishers to develop access control policies enforcing that only entitled GCP users have access to the licensed subset of their data. Publishers configure entitlements within a JSON or YAML configuration file, and specify the user principal ID's (of GCP accounts) to be granted access to specific BigQuery authorized views residing in a parallel dataset.

## Features
- Validates the configuration file and outputs issues to the console.
- Checks for the existence of necessary access control objects (if configured).
  - Creates access control objects if required.
- Create or modify views based on the specified configuration.
- Provides ability to set a view expiration, after which the view will either be deleted or return zero rows.
- Entitle new and existing views based on the specified configuration.
- Each object created in BigQuery by the entitlement script will have a label added to it with key `bqds_configuration_name` with the corresponding configured `name` property as its value.
  - Objects with this key are considered to be 'managed' by the ```BQDS``` entitlement script.
- Deletes any managed objects that no longer exist in the configuration based on the `bqds_configuration_name` label.

## Running entitlement-engine in Google Cloud Shell
```
# Install node 12.6 or higher
nvm install 12.6

# Clone the BQDS GitHub repository using the gcloud SDK
gcloud source repos clone bqds --project=<project>

# Change to the newly cloned bqds entitlements directory
cd bqds

# Install entitlement-engine as a global package
npm install -g ./entitlements

# Change to the examples directory
cd examples

# Run entitlement-engine using the example configuration
entitlement-engine -c config.json
```

If you prefer to run entitlement-engine outside of Google Cloud Shell, documentation is also provided for [local and docker setup](./SETUP.md).

## CLI arguments
|command flag|description|
|------------|-----------|
|-c|The JSON or YAML configuration file path to use
|--dry-run|When specified only configuration validation is performed. No objects are created or modified|
|-p|Setup prerequisite objects only (access control if configured)|
|-v|Enable verbose logging|

## Entitling resources and data
There are four main methodologies available for entitling resources and data through ```BQDS```:

- [GCP IAM](https://cloud.google.com/bigquery/docs/dataset-access-controls) - Provides object level access to view objects within BigQuery.
- [Access Control](#Access-control) - Provides row-level filtering capability based on labels provided within the configuration file or an ```access_control``` BigQuery dataset within the project.
- [SQL Filter](https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#where-clause) - Provides ability to filter data based on criteria available within the source table using sql.
- [Custom SQL](https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax) - Provides ability to write your own custom sql query.

## Configuration file schema
| Attribute                | Type   | M/O | Definition                                                                                                                                                      | Example                                                                                                                                                                             |
|--------------------------|--------|-----|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| name                     | string | M   | The configuration name.                                                                                                                                         | example_1                                                                                                                                                                           |
| schemaVersion            | string | O   | The configuration version. To help provide backwards compatibility as enhancements and features are added.                                                      | 0.0.1                                                                                                                                                                               |
| projectId                | string | M   | GCP projectId for which to manage the entitlement and objects in.                                                                                               | example-cloud-sandbox                                                                                                                                                               |
| accessControl            | object | O   |                                                                                                                                                                 | {  "datasetId": "access_control",  "viewId": "groupEntities"}                                                                                                                       |
| -> datasetId             | string | M   | DatasetId for the BigQuery View containing the generic entitlement view.                                                                                        | access_control                                                                                                                                                                      |
| -> viewId               | string | O   | TableId for the BigQuery View containing the generic entitlement view. The view output should contain two columns - viewName (string) and entityLabel (string). | groupEntities                                                                                                                                                                       |
| groups                   | array  | O   | Array of access groups.                                                                                                                                | [{  "name": "external_users",  "access": [{ "userByEmail": "bqds.alphatrader.1@gmail.com" }]}]                                                                                                            |
| -> name                  | string | M   | The group name.                                                                                                                                                 | external_users                                                                                                                                                                      |
| -> [access](#Access) | array  | M | Array of access provisioning. Supported key names are: 'userByEmail', 'groupByEmail', 'domain', 'specialGroup', and 'iamMember'. For further reference see [datasets](https://cloud.google.com/bigquery/docs/reference/rest/v2/datasets). | [{ "userByEmail": "bqds.alphatrader.1@gmail.com" }]                                                                                                                                                          |
| datasets                 | array  | O   | Array of dataset names and users that should be permissioned to the given datasetId.                                                                            | [{  "name": "futures_views_test",  "users": [    "bqds.alphatrader.1@gmail.com",    "bqds.betatrader.1@gmail.com"  ]}]                                                                             |
| -> name                  | string | M   | The BigQuery datasetId.                                                                                                                                         | futures_views_test                                                                                                                                                                  |
| -> accessControlLabels   | array  | O   | The access control labels to grant permission to within the Dataset.                                                                                            | [  "ADM19",  "ADU19",  "ADK19",  "ADZ19"]                                                                                                                                           |
| -> [access](#Access) | array  | O | Array of access provisioning. Supported key names are: 'userByEmail', 'groupByEmail', 'domain', 'specialGroup', and 'iamMember'. For further reference see [datasets](https://cloud.google.com/bigquery/docs/reference/rest/v2/datasets). | [{ "userByEmail": "bqds.alphatrader.1@gmail.com" }] |
| -> groups                | array  | O   | Array of userGroups containing GCP usernames that should be entitled for “BigQuery Data Viewer” access to the given datasetId.                                  | [  "external_users"]                                                                                                                                                                |
| views                    | array  | M   | Array of managed views.                                                                                                                                         | [{    "viewName": "view_1",    "sourceDataset": "futures",    "sourceTable": "trades"  },  {    "viewName": "view_2",    "sourceDataset": "futures",    "sourceTable": "trades"  }] |
| -> datasetNames          | array  | M   | Array of datasetId’s where the view should be created and managed.                                                                                              | [  "futures_views_test"]                                                                                                                                                            |
| -> name                  | string | M   | Name of the view to create and manage.                                                                                                                          | trades_test |
| -> expiration|object|O||"expiration": { "delete": true, "time": 1566078495000 }|
| --> delete |bool|O|Flag indicating if the view should be deleted upon expiration.|true|
| --> time|integer|M|The time when this view expires, in milliseconds since the epoch. Expired tables will be deleted and their storage reclaimed.|1566078495000|
| -> source                | object |     |                                                                                                                                                                 |                                                                                                                                                                                     |
| --> datasetId             | string | M   | The datasetId of the source table.                                                                                                                              | futures                                                                                                                                                                             |
| --> tableId               | string | M   | The tableId of the source table.                                                                                                                                | trades                                                                                                                                                                              |
| --> queryFilter           | string | O   | The filter to use in the view creation. This should evaluate with a valid sql ‘where’ clause.                                                                   | market_flag = 'E'                                                                                                                                                                   |
| --> visibleColumns        | array  | O   | Array of column names that should be exposed through the generated view.                                                                                        | [  "symbol",  "price",  "size"]                                                                                                                                                     |
| --> hiddenColumns         | array  | O   | Array of column names that should be hidden in the generated view.                                                                                              | [  "entityLabel"]                                                                                                                                                                   |
| --> accessControl         |        |     |                                                                                                                                                                 |                                                                                                                                                                                     |
| ---> enabled              | bool   | O   | Flag indicating if the view should enforce row level entitlements using an entityLabel from the source table.                                                   | TRUE                                                                                                                                                                                |
| ---> datasetEnabled       | bool   | O   | Flag indicating if you want to use the BigQuery provisioning dataset and table specified in entitlementViewDataset and entitlementViewName respectively.        | TRUE                                                                                                                                                                                |
| ---> labelColumn          | string | O   | Name of the column within the source table containing a delimited list of entity labels.                                                                        | entityLabel                                                                                                                                                                         |
| ---> labelColumnDelimiter | string | O   | The delimiter used to delimit entity labels within the entityLabelColumn                                                                                        | |                                                                                                                                                                                   |
| ---> labels               | array  | O   | The entityLabels to grant permission to within the view.                                                                                                        | [  "ADN19",  "AGF20",  "AGG20"]                                                                                                                                                     |
| --> publicAccess          | object | O   | Object that defines rules for public access sharing.                                                                                                                                                                |                                                                                                                                 |
| ---> enabled              | bool   | O   | Flag indicating if the view should return sample data in the event that no data is returned from the main query using the querySqlFilter.                       | TRUE                                                                                                                                                                                |
| ---> queryFilter          | string | O   | The filter to use in the view creation. This should evaluate with a valid sql ‘where’ clause.                                                                   | market_flag = 'P'  |
| ---> limit | bool | O | Specifies a non-negative count of type INT64, and no more than count rows will be returned. | 10 |

## Access
Access is how you can entitle users to have read access to views. The configuration provides the flexibility to define access at a dataset or a group level. Maintaing access at a group level allows you to re-use the access across various datasets. Supported access types are: 'userByEmail', 'groupByEmail', 'domain', 'specialGroup', and 'iamMember'. For further reference see [datasets](https://cloud.google.com/bigquery/docs/reference/rest/v2/datasets).

## Access control (row-level data entitlements)
Access control provides a simple methodology for row-level access. Within your source data you will need a single field containing a single value or delimited list of values that you will use for a one-to-one match with an access control label.

There are 2 available data sources available for configuring accessControlLabels. You may use the configuration file or an access control dataset. Using a dataset provides the most flexibility, however using the configuration file allows you to consolidate the configuration to a single file.

- Using configuration file - This allows for accessControlLabel and GCP user association at a view or dataset level only.
- Using BigQuery tables and views - This allows for a more granular accessControlLabel and GCP user association. When using this option, you can grant different groupings of accessControlLabels to different groups of users.

You may also use both options for different views. For one view you may use the configuration file for accessControlLabels, and for a second view, you may use the entitlements dataset to do so.

### Configuring access control for views
The following properties should be defined in the view configuration:

```
"views.source.accessControl.enabled": true,
"views.source.accessControl.labelColumn": "[accessControlLabel]",
```

The `views.source.accessControl.labelColumn` value should be updated as necessary based on the column that you are using for the access control label.

Optionally, if the data in the column for which you're using as the accessControlLabel contains a delimited list of values for which you want an any match to return the particular record, you can supply the `labelColumnDelimiter` attribute indicating the delimiter to use to unnest the values in the column.

```
"views.source.accessControl.labelColumnDelimiter": "|"
```

#### Source table example for access control
The source data set should contain a column containing a delimited list of labels, such that if the user contains an entitlement to any single one of them, they will have visibility to the given row.

| symbol | time | price | accessControlLabel
|--------|------|-------|------------|
|GOOG|2019-06-14 15:29:25.074418 UTC|1085.89|EQUITY\|GOOG|

In this case, the column we use for the access control label is named "accessControlLabel", and the values within it are delimited by a pipe.

##### Using configuration for access control labels
To use the configuration file for access control labels, create a string array of labels at `views.source.accessControl.labels` or `datasets.accessControlLabels`. Maintaining access control labels at a dataset level allows you to re-use the same entitlements across many views. If this is functionality that you require, using `datasets.accessControlLabels` may make most sense. If you always require the granularity of maintaining entitlements per view, maintaning access control labels at `views.source.accessControl.labels` is most practical.

```
[
  "ANF",
  "APAM",
  "ANET"
]
```

##### Using BigQuery for access control labels
To use BigQuery for access control labels, you must configure the `accessControl` property in the configuration file. When the entitlement app is executed, it will check for the existence of the ```[datasetId].[viewId]``` and create the dataset, tables, and views necessary. Note that if running the entitlement-engine with the --dry-run argument, the access control objects will not be created.

```
{
  "accessControl": {
    "datasetId": "access_control",
    "viewId": "groupEntities"
  }
}
```

For each view that you want to use BigQuery for entitlements, set the attribute `views.source.accessControl.datasetEnabled` to true.

```
{
  "views": {
    "source": {
      "accessControl": {
        "datasetEnabled": true
      }
    }
  }
}
```

Lastly, you will need to populate the ```groups``` and ```groupEntitlements``` tables. The data populated in these tables is joined together in the ```groupEntities``` view and filtered for each executing user using the BigQuery [SESSION_USER()](https://cloud.google.com/bigquery/docs/reference/standard-sql/security_functions#session_user) function. For further information on the access control table and view objects, see the [Access Control Schema](./ACCESS-CONTROL-SCHEMA.md) documentation.

## Example configurations

A configuration can be created in either JSON or YAML format. You can find examples in the Git repository within the [examples](../examples) folder.

- [JSON example](../examples/config.json)
- [YAML example](../examples/config.yaml)

## Text Replacements
There are some properties that can use replacement tokens for populating values at runtime. The fields that currently support this are:

- view.custom.query
- view.custom.authorizeFromDatasetIds

The following replacement tokens may be used:

- ${projectId}
- ${accessControl.datasetId}
- ${accessControl.viewId}
