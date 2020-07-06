# DS API - Spot Service Configuration

* [Overview](#overview)

# Overview

This documentation provides the details for the DS API Spot Service Configuration. The DS API Spot configuration contains the attributes required to validate and generate spot fulfillment requests for specific clients and applications consuming the API service. The configuration is a list of entities that includes the following attributes. You can view an example in the MLB examples config [here](../../examples/mlb/config/api/config.json).

_Note_ The DS API OpenAPI [spec](#documentation) currently only provides context about the DS API Spot Service client requests

### Project ID:

* Attribute Name: *projectId*
* Description: Google Cloud Project ID that includes the BigQuery Dataset

### Dataset ID:

* Attribute Name: *datasetId*
* Description: Google Gloud BigQuery Dataset ID

### Table ID:

* Attribute Name: *tableId*
* Description: Google Cloud BigQuery Dataset table ID

### Parameters:

* Attribute Name: *parameters*
* Description: Dictionary of parameters that potentially may be used in the 'availableRequests'
The 'name' value would replace the paramterized query variables, IE: the value within visitorTeamName would replace @visitorTeamName
The 'column' value would be used to get a distinct list of values and return to the user through a data dictionary api
In cases where a 'column' isn't enough and it's required to synthesize a variable, you can write a 'custom' query that gets the list of distinct values

### Available Requests:

* Attribute Name: *availableRequests*
* Description: The data dictionary would reference available requests based on 'name'. The query is a parameterized query.
When a query is submitted, we would validate that only the required parameters are passed in the request
IE: if 'name' = 'Query by home team name', then only @homeTeamName should be supplied, if other parameters are provided we should throw a validation issue
If 'includeAllColumns' is true, then the response would always include all available columns in the query
If 'availableColumns' is set, then the user would have to provide a list of columns that they want returned in the result
If 'filter' is provided, then 'query' cannot be provided. Filter would be used to dynamically build the query

----
* [Docs](../)
* [Home](../../)
