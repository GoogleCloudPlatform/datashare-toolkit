[Back to Entitlement engine](../README.md)

# Access Control schema reference

## groups table
The groups table contains the list of groupName and viewName combinations for which the GCP user should have access to. Note that a user may belong to multiple groups.

### Schema
| Field name | Type   | Mode     | Description|
|------------|--------|----------|------------|
| groupName  | STRING | REQUIRED | The group name.|
| viewName   | STRING | REQUIRED | The viewName for which to bind the entitlement group.|
| user       | STRING | REQUIRED | The GCP username.|

### Example data
| groupName | viewName | user |
|------|-----------|----------|
Client X - By Symbol|client_x.trades|bqds.alphatrader.1@gmail.com|
Client Y - By Asset Class|client_y.trades|bqds.betatrader.1@gmail.com|

## groupEntitlements table
The groupEntitlements table contains the list of accessControlLabel’s for which a groupName should have access to.

### Schema
| Field name  | Type   | Mode     | Description                                           |
|----------|------|-------|-------------------------------|
| groupName   | STRING | REQUIRED | The group name.                           |           |
| accessControlLabel | STRING | REQUIRED | Entity label for which the group should have access. |

### Example data
|groupName|entityName|
|---------|----------|
Client X - By Symbol|GOOG
Client Y - By Asset Class|EQUITY

## groupEntities view
The groupEntities view joins together the userGroups and groupEntitlements tables and filters them based on the BigQuery value of SESSION_USER().

### Schema
| Field name  | Type   | Mode     | Description                                                 |
|-------------|--------|----------|-------------------------------------------------------------|
| viewName    | STRING | NULLABLE | The viewName for which to bind the entitlement group.       |
| accessControlLabel | STRING | NULLABLE | Single entity label for which the group should have access. |

### Example data for users in 'Client X - By Symbol'
|viewName|accessControlLabel|
|--------|-----------|
client_x.trades|GOOG

### Example data for users in 'Client Y - By Asset Class'
|viewName|accessControlLabel|
|--------|-----------|
client_y.trades|EQUITY
