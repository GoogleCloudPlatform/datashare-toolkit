# Datashare User Guide

<p align="center">
  <img src="../card.png" alt="Datashare" height="175"/>
</p>

This documentation provides details for using the Datashare user interface. If you have no yet deployed or configured the frontend interface, please see [Datashare UI](../README.md) for information on how to do so. The documentation is structured based on the navigation of the interface. On this page, we'll provide a breakdown of the <a href="./user-guide/assets/nav_menu.png" target="_blank">navigation menu structure</a> to provide insight into what each page provides. Additionally, you'll see a 'Guide' link next to each section where we've created a usage guide.

* [Batch](#batch)
    * [Datasets](#datasets)
    * [Authorized Views](#authorized_views)
* [Entitlements](#entitlements)
    * [Accounts](#accounts)
    * [Policies](#policies)
* [Marketplace](#marketplace)
    * [Procurement Requests](#procurement_requests)
    * [My Products](#my_products)
* [Application](#application)
    * [Admin](#admin)

## <a name="batch">Batch</a>
The batch section contains page links for managing batch data. Currently the Datashare UI only supports configuration of batch ingestion and batch data-sharing.

### <a name="datasets">Datasets</a> [Guide](./user-guide/DATASETS.md)
Datasets displays a listing of all of the BigQuery datasets that are managed by Datashare. It provides functionality to create a new dataset, edit or delete an existing one. You can also view the accounts that have access to a given dataset and the list of managed authorized views within each dataset.

### <a name="authorized_views">Authorized Views</a> [Guide](./user-guide/AUTHORIZED_VIEWS.md)
Authorized views displays a listing of BigQuery authorized views that are managed by Datashare. Note that any authorized view created or managed by Datashare should only be modified through Datashare. You should not manually edit any managed object outside of Datashare.

Datashare provides functionality that allows a non-technical user to define an authorized view through a UI form. It also allows you to view sample data through the UI.

## <a name="entitlements">Entitlements</a>
The entitlements section is used to manage and grant access to data - which may be a BigQuery dataset, table, or view.

### <a name="accounts">Accounts</a> [Guide](./user-guide/ACCOUNTS.md)
Accounts displays a listing of all of the users or groups that are configured for Datashare. Accounts must be associated with policies in order to grant access to data. Note that a user can only be added where the email address and domain is associated with an active Google Account or Google Apps account. If you add any other type of account, it will cause the Datashare permissions to fail.

### <a name="policies">Policies</a> [Guide](./user-guide/POLICIES.md)
Policies are used to manage data access. A policy consists of a list of datasets or tables, row level access tags (if applicable), and Marketplace integration configuration.

## <a name="marketplace">Marketplace</a> [Guide](./user-guide/MARKETPLACE_INTEGRATION.md)
Datashare may be integrated with GCP Marketplace in order to sell access to data using [subscription-based pricing](https://cloud.google.com/marketplace/docs/partners/integrated-saas/select-pricing#subscription-pricing). Datashare provides a UI with all of the basic functionality to integrate with GCP Marketplace and the [Cloud Commerce Partner Procurement API](https://cloud.google.com/marketplace/docs/partners/commerce-procurement-api/reference/rest) to expedite your integration.

### <a name="procurement_requests">Procurement Requests</a> [Guide](./user-guide/PROCUREMENT_REQUESTS.md)
Procurement Requests provides a listing of pending entitlement approval requests through the procurement [list](https://cloud.google.com/marketplace/docs/partners/commerce-procurement-api/reference/rest/v1/providers.entitlements/list) api. A pending request can be approved, rejected, or modified with a status comment.

### <a name="my_products">My Products</a> [Guide](./user-guide/MY_PRODUCTS.md)
My Products provides a listing of Marketplace Solution and Marketplace Plans that the current user is entitled access to.

## <a name="application">Application</a>
Provides administrative and settings configuration screens.

### <a name="admin">Admin</a> [Guide](./user-guide/ADMIN.md)
The admin screen is used for initializing the Datashare data schema in BigQuery. Additionally, it provides functionlity to sync permissions and views in case they fall out of sync.