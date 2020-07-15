[Datashare User Guide](./README.md)

# Procurement Requests
* [Purchase Flow](#purchase_flow)
* [Viewing Procurement Requests](#viewing_procurement_requests)
* [Update Message to User](#update_message_to_user)
* [Approving a Request](#approving_request)
* [Rejecting a Request](#rejecting_request)

<p align="center">
  <img src="./assets/policies_list_ui.png" alt="Policies List UI" height="450"/>
</p>

## <a name="purchase_flow">Purchase Flow</a>
A user will subscribe to your solution from your solution details page.

<img src="./assets/purchase_flow_1.png" alt="Purchase Flow 1" width="600"/>

They can choose a plan to purchase (if multiple options are available), and agree to the purchase terms.

<img src="./assets/purchase_flow_2.png" alt="Purchase Flow 2" width="600"/>

Once they click 'SUBSCRIBE', they'll be routed to the subscription and activation page. Here they have to agree to the terms, and then proceed to activate and register with Datashare.

<img src="./assets/purchase_flow_3.png" alt="Purchase Flow 3" width="600"/>

 the subscribe modal dialog will close, and they'll see an updated status on top of the solution purchase page. While you are processing the request, you may also [update the status message](#update_message_to_user) displayed to the user.

<img src="./assets/purchase_flow_3.png" alt="Purchase Flow 3" width="600"/>

When the user clicks 'Register with [solutionId]', a pop-up window will open where they will associate their procurement account and GCP account with Datashare. Once the login is completed, they'll be redirected to the [My Products](./MY_PRODUCTS.md) page. Note that the [message to user](#update_message_to_user) is only visible through the GCP Marketplace solution page, it is not yet available in the 'My Products' page. An enhancement is being tracked to add this in  [#198](https://github.com/GoogleCloudPlatform/datashare-toolkit/issues/198).

## <a name="viewing_procurement_requests">Viewing Procurement Requests</a>


## <a name="update_message_to_user">Viewing Policies</a>
When a consumer purchases your solution through the GCP Marketplace, as it may take time for you to process the request you may provide a message to the user which will be viewable to them within the Marketplace. You may use this to communicate progress and ETA for provisioning. For further information see the [Entitlement](https://cloud.google.com/marketplace/docs/partners/commerce-procurement-api/reference/rest/v1/providers.entitlements#Entitlement) documentation for the [Cloud Commerce Procurement API](https://cloud.google.com/marketplace/docs/partners/commerce-procurement-api/reference).

## <a name="approving_request">Approving Requests</a>

## <a name="rejecting_request">Rejecting Requests</a>