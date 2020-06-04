/// <reference types="node" />
import { OAuth2Client, JWT, Compute, UserRefreshClient, GaxiosPromise, GoogleConfigurable, MethodOptions, StreamMethodOptions, GlobalOptions, GoogleAuth, BodyResponseCallback, APIRequestContext } from 'googleapis-common';
import { Readable } from 'stream';
export declare namespace reseller_v1 {
    export interface Options extends GlobalOptions {
        version: 'v1';
    }
    interface StandardParameters {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient | GoogleAuth;
        /**
         * Data format for the response.
         */
        alt?: string;
        /**
         * Selector specifying which fields to include in a partial response.
         */
        fields?: string;
        /**
         * API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token.
         */
        key?: string;
        /**
         * OAuth 2.0 token for the current user.
         */
        oauth_token?: string;
        /**
         * Returns response with indentations and line breaks.
         */
        prettyPrint?: boolean;
        /**
         * An opaque string that represents a user for quota purposes. Must not exceed 40 characters.
         */
        quotaUser?: string;
        /**
         * Deprecated. Please use quotaUser instead.
         */
        userIp?: string;
    }
    /**
     * Enterprise Apps Reseller API
     *
     * Creates and manages your customers and their subscriptions.
     *
     * @example
     * const {google} = require('googleapis');
     * const reseller = google.reseller('v1');
     *
     * @namespace reseller
     * @type {Function}
     * @version v1
     * @variation v1
     * @param {object=} options Options for Reseller
     */
    export class Reseller {
        context: APIRequestContext;
        customers: Resource$Customers;
        resellernotify: Resource$Resellernotify;
        subscriptions: Resource$Subscriptions;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
    }
    /**
     * JSON template for address of a customer.
     */
    export interface Schema$Address {
        /**
         * A customer&#39;s physical address. An address can be composed of one to three lines. The addressline2 and addressLine3 are optional.
         */
        addressLine1?: string | null;
        /**
         * Line 2 of the address.
         */
        addressLine2?: string | null;
        /**
         * Line 3 of the address.
         */
        addressLine3?: string | null;
        /**
         * The customer contact&#39;s name. This is required.
         */
        contactName?: string | null;
        /**
         * For countryCode information, see the ISO 3166 country code elements. Verify that country is approved for resale of Google products. This property is required when creating a new customer.
         */
        countryCode?: string | null;
        /**
         * Identifies the resource as a customer address. Value: customers#address
         */
        kind?: string | null;
        /**
         * An example of a locality value is the city of San Francisco.
         */
        locality?: string | null;
        /**
         * The company or company division name. This is required.
         */
        organizationName?: string | null;
        /**
         * A postalCode example is a postal zip code such as 94043. This property is required when creating a new customer.
         */
        postalCode?: string | null;
        /**
         * An example of a region value is CA for the state of California.
         */
        region?: string | null;
    }
    /**
     * JSON template for the ChangePlan rpc request.
     */
    export interface Schema$ChangePlanRequest {
        /**
         * Google-issued code (100 char max) for discounted pricing on subscription plans. Deal code must be included in changePlan request in order to receive discounted rate. This property is optional. If a deal code has already been added to a subscription, this property may be left empty and the existing discounted rate will still apply (if not empty, only provide the deal code that is already present on the subscription). If a deal code has never been added to a subscription and this property is left blank, regular pricing will apply.
         */
        dealCode?: string | null;
        /**
         * Identifies the resource as a subscription change plan request. Value: subscriptions#changePlanRequest
         */
        kind?: string | null;
        /**
         * The planName property is required. This is the name of the subscription&#39;s payment plan. For more information about the Google payment plans, see API concepts.  Possible values are:   - ANNUAL_MONTHLY_PAY - The annual commitment plan with monthly payments  Caution: ANNUAL_MONTHLY_PAY is returned as ANNUAL in all API responses.   - ANNUAL_YEARLY_PAY - The annual commitment plan with yearly payments   - FLEXIBLE - The flexible plan   - TRIAL - The 30-day free trial plan
         */
        planName?: string | null;
        /**
         * This is an optional property. This purchase order (PO) information is for resellers to use for their company tracking usage. If a purchaseOrderId value is given it appears in the API responses and shows up in the invoice. The property accepts up to 80 plain text characters.
         */
        purchaseOrderId?: string | null;
        /**
         * This is a required property. The seats property is the number of user seat licenses.
         */
        seats?: Schema$Seats;
    }
    /**
     * JSON template for a customer.
     */
    export interface Schema$Customer {
        /**
         * Like the &quot;Customer email&quot; in the reseller tools, this email is the secondary contact used if something happens to the customer&#39;s service such as service outage or a security issue. This property is required when creating a new customer and should not use the same domain as customerDomain.
         */
        alternateEmail?: string | null;
        /**
         * The customer&#39;s primary domain name string. customerDomain is required when creating a new customer. Do not include the www prefix in the domain when adding a customer.
         */
        customerDomain?: string | null;
        /**
         * Whether the customer&#39;s primary domain has been verified.
         */
        customerDomainVerified?: boolean | null;
        /**
         * This property will always be returned in a response as the unique identifier generated by Google. In a request, this property can be either the primary domain or the unique identifier generated by Google.
         */
        customerId?: string | null;
        /**
         * Identifies the resource as a customer. Value: reseller#customer
         */
        kind?: string | null;
        /**
         * Customer contact phone number. Must start with &quot;+&quot; followed by the country code. The rest of the number can be contiguous numbers or respect the phone local format conventions, but it must be a real phone number and not, for example, &quot;123&quot;. This field is silently ignored if invalid.
         */
        phoneNumber?: string | null;
        /**
         * A customer&#39;s address information. Each field has a limit of 255 charcters.
         */
        postalAddress?: Schema$Address;
        /**
         * URL to customer&#39;s Admin console dashboard. The read-only URL is generated by the API service. This is used if your client application requires the customer to complete a task in the Admin console.
         */
        resourceUiUrl?: string | null;
    }
    /**
     * JSON template for a subscription renewal settings.
     */
    export interface Schema$RenewalSettings {
        /**
         * Identifies the resource as a subscription renewal setting. Value: subscriptions#renewalSettings
         */
        kind?: string | null;
        /**
         * Renewal settings for the annual commitment plan. For more detailed information, see renewal options in the administrator help center. When renewing a subscription, the renewalType is a required property.
         */
        renewalType?: string | null;
    }
    /**
     * JSON template for resellernotify getwatchdetails response.
     */
    export interface Schema$ResellernotifyGetwatchdetailsResponse {
        /**
         * List of registered service accounts.
         */
        serviceAccountEmailAddresses?: string[] | null;
        /**
         * Topic name of the PubSub
         */
        topicName?: string | null;
    }
    /**
     * JSON template for resellernotify response.
     */
    export interface Schema$ResellernotifyResource {
        /**
         * Topic name of the PubSub
         */
        topicName?: string | null;
    }
    /**
     * JSON template for subscription seats.
     */
    export interface Schema$Seats {
        /**
         * Identifies the resource as a subscription seat setting. Value: subscriptions#seats
         */
        kind?: string | null;
        /**
         * Read-only field containing the current number of users that are assigned a license for the product defined in skuId. This field&#39;s value is equivalent to the numerical count of users returned by the Enterprise License Manager API method: listForProductAndSku
         */
        licensedNumberOfSeats?: number | null;
        /**
         * This is a required property and is exclusive to subscriptions with FLEXIBLE or TRIAL plans. This property sets the maximum number of licensed users allowed on a subscription. This quantity can be increased up to the maximum limit defined in the reseller&#39;s contract. The minimum quantity is the current number of users in the customer account. Note: G Suite subscriptions automatically assign a license to every user.
         */
        maximumNumberOfSeats?: number | null;
        /**
         * This is a required property and is exclusive to subscriptions with ANNUAL_MONTHLY_PAY and ANNUAL_YEARLY_PAY plans. This property sets the maximum number of licenses assignable to users on a subscription. The reseller can add more licenses, but once set, the numberOfSeats cannot be reduced until renewal. The reseller is invoiced based on the numberOfSeats value regardless of how many of these user licenses are assigned. Note: G Suite subscriptions automatically assign a license to every user.
         */
        numberOfSeats?: number | null;
    }
    /**
     * JSON template for a subscription.
     */
    export interface Schema$Subscription {
        /**
         * Read-only field that returns the current billing method for a subscription.
         */
        billingMethod?: string | null;
        /**
         * The creationTime property is the date when subscription was created. It is in milliseconds using the Epoch format. See an example Epoch converter.
         */
        creationTime?: string | null;
        /**
         * Primary domain name of the customer
         */
        customerDomain?: string | null;
        /**
         * This property will always be returned in a response as the unique identifier generated by Google. In a request, this property can be either the primary domain or the unique identifier generated by Google.
         */
        customerId?: string | null;
        /**
         * Google-issued code (100 char max) for discounted pricing on subscription plans. Deal code must be included in insert requests in order to receive discounted rate. This property is optional, regular pricing applies if left empty.
         */
        dealCode?: string | null;
        /**
         * Identifies the resource as a Subscription. Value: reseller#subscription
         */
        kind?: string | null;
        /**
         * The plan property is required. In this version of the API, the G Suite plans are the flexible plan, annual commitment plan, and the 30-day free trial plan. For more information about the API&quot;s payment plans, see the API concepts.
         */
        plan?: {
            commitmentInterval?: {
                endTime?: string;
                startTime?: string;
            };
            isCommitmentPlan?: boolean;
            planName?: string;
        } | null;
        /**
         * This is an optional property. This purchase order (PO) information is for resellers to use for their company tracking usage. If a purchaseOrderId value is given it appears in the API responses and shows up in the invoice. The property accepts up to 80 plain text characters.
         */
        purchaseOrderId?: string | null;
        /**
         * Renewal settings for the annual commitment plan. For more detailed information, see renewal options in the administrator help center.
         */
        renewalSettings?: Schema$RenewalSettings;
        /**
         * URL to customer&#39;s Subscriptions page in the Admin console. The read-only URL is generated by the API service. This is used if your client application requires the customer to complete a task using the Subscriptions page in the Admin console.
         */
        resourceUiUrl?: string | null;
        /**
         * This is a required property. The number and limit of user seat licenses in the plan.
         */
        seats?: Schema$Seats;
        /**
         * A required property. The skuId is a unique system identifier for a product&#39;s SKU assigned to a customer in the subscription. For products and SKUs available in this version of the API, see  Product and SKU IDs.
         */
        skuId?: string | null;
        /**
         * Read-only external display name for a product&#39;s SKU assigned to a customer in the subscription. SKU names are subject to change at Google&#39;s discretion. For products and SKUs available in this version of the API, see  Product and SKU IDs.
         */
        skuName?: string | null;
        /**
         * This is an optional property.
         */
        status?: string | null;
        /**
         * The subscriptionId is the subscription identifier and is unique for each customer. This is a required property. Since a subscriptionId changes when a subscription is updated, we recommend not using this ID as a key for persistent data. Use the subscriptionId as described in retrieve all reseller subscriptions.
         */
        subscriptionId?: string | null;
        /**
         * Read-only field containing an enumerable of all the current suspension reasons for a subscription. It is possible for a subscription to have many concurrent, overlapping suspension reasons. A subscription&#39;s STATUS is SUSPENDED until all pending suspensions are removed.  Possible options include:   - PENDING_TOS_ACCEPTANCE - The customer has not logged in and accepted the G Suite Resold Terms of Services.   - RENEWAL_WITH_TYPE_CANCEL - The customer&#39;s commitment ended and their service was cancelled at the end of their term.   - RESELLER_INITIATED - A manual suspension invoked by a Reseller.   - TRIAL_ENDED - The customer&#39;s trial expired without a plan selected.   - OTHER - The customer is suspended for an internal Google reason (e.g. abuse or otherwise).
         */
        suspensionReasons?: string[] | null;
        /**
         * Read-only transfer related information for the subscription. For more information, see retrieve transferable subscriptions for a customer.
         */
        transferInfo?: {
            minimumTransferableSeats?: number;
            transferabilityExpirationTime?: string;
        } | null;
        /**
         * The G Suite annual commitment and flexible payment plans can be in a 30-day free trial. For more information, see the API concepts.
         */
        trialSettings?: {
            isInTrial?: boolean;
            trialEndTime?: string;
        } | null;
    }
    /**
     * JSON template for a subscription list.
     */
    export interface Schema$Subscriptions {
        /**
         * Identifies the resource as a collection of subscriptions. Value: reseller#subscriptions
         */
        kind?: string | null;
        /**
         * The continuation token, used to page through large result sets. Provide this value in a subsequent request to return the next page of results.
         */
        nextPageToken?: string | null;
        /**
         * The subscriptions in this page of results.
         */
        subscriptions?: Schema$Subscription[];
    }
    export class Resource$Customers {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * reseller.customers.get
         * @desc Get a customer account.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/reseller.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const reseller = google.reseller('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/apps.order',
         *       'https://www.googleapis.com/auth/apps.order.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await reseller.customers.get({
         *     // Either the customer's primary domain name or the customer's unique identifier. If using the domain name, we do not recommend using a customerId as a key for persistent data. If the domain name for a customerId is changed, the Google system automatically updates.
         *     customerId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "alternateEmail": "my_alternateEmail",
         *   //   "customerDomain": "my_customerDomain",
         *   //   "customerDomainVerified": false,
         *   //   "customerId": "my_customerId",
         *   //   "kind": "my_kind",
         *   //   "phoneNumber": "my_phoneNumber",
         *   //   "postalAddress": {},
         *   //   "resourceUiUrl": "my_resourceUiUrl"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias reseller.customers.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customerId Either the customer's primary domain name or the customer's unique identifier. If using the domain name, we do not recommend using a customerId as a key for persistent data. If the domain name for a customerId is changed, the Google system automatically updates.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Customers$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Customers$Get, options?: MethodOptions): GaxiosPromise<Schema$Customer>;
        get(params: Params$Resource$Customers$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Customers$Get, options: MethodOptions | BodyResponseCallback<Schema$Customer>, callback: BodyResponseCallback<Schema$Customer>): void;
        get(params: Params$Resource$Customers$Get, callback: BodyResponseCallback<Schema$Customer>): void;
        get(callback: BodyResponseCallback<Schema$Customer>): void;
        /**
         * reseller.customers.insert
         * @desc Order a new customer's account.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/reseller.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const reseller = google.reseller('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/apps.order'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await reseller.customers.insert({
         *     // The customerAuthToken query string is required when creating a resold account that transfers a direct customer's subscription or transfers another reseller customer's subscription to your reseller management. This is a hexadecimal authentication token needed to complete the subscription transfer. For more information, see the administrator help center.
         *     customerAuthToken: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "alternateEmail": "my_alternateEmail",
         *       //   "customerDomain": "my_customerDomain",
         *       //   "customerDomainVerified": false,
         *       //   "customerId": "my_customerId",
         *       //   "kind": "my_kind",
         *       //   "phoneNumber": "my_phoneNumber",
         *       //   "postalAddress": {},
         *       //   "resourceUiUrl": "my_resourceUiUrl"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "alternateEmail": "my_alternateEmail",
         *   //   "customerDomain": "my_customerDomain",
         *   //   "customerDomainVerified": false,
         *   //   "customerId": "my_customerId",
         *   //   "kind": "my_kind",
         *   //   "phoneNumber": "my_phoneNumber",
         *   //   "postalAddress": {},
         *   //   "resourceUiUrl": "my_resourceUiUrl"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias reseller.customers.insert
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.customerAuthToken The customerAuthToken query string is required when creating a resold account that transfers a direct customer's subscription or transfers another reseller customer's subscription to your reseller management. This is a hexadecimal authentication token needed to complete the subscription transfer. For more information, see the administrator help center.
         * @param {().Customer} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        insert(params: Params$Resource$Customers$Insert, options: StreamMethodOptions): GaxiosPromise<Readable>;
        insert(params?: Params$Resource$Customers$Insert, options?: MethodOptions): GaxiosPromise<Schema$Customer>;
        insert(params: Params$Resource$Customers$Insert, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        insert(params: Params$Resource$Customers$Insert, options: MethodOptions | BodyResponseCallback<Schema$Customer>, callback: BodyResponseCallback<Schema$Customer>): void;
        insert(params: Params$Resource$Customers$Insert, callback: BodyResponseCallback<Schema$Customer>): void;
        insert(callback: BodyResponseCallback<Schema$Customer>): void;
        /**
         * reseller.customers.patch
         * @desc Update a customer account's settings. This method supports patch semantics.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/reseller.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const reseller = google.reseller('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/apps.order'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await reseller.customers.patch({
         *     // Either the customer's primary domain name or the customer's unique identifier. If using the domain name, we do not recommend using a customerId as a key for persistent data. If the domain name for a customerId is changed, the Google system automatically updates.
         *     customerId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "alternateEmail": "my_alternateEmail",
         *       //   "customerDomain": "my_customerDomain",
         *       //   "customerDomainVerified": false,
         *       //   "customerId": "my_customerId",
         *       //   "kind": "my_kind",
         *       //   "phoneNumber": "my_phoneNumber",
         *       //   "postalAddress": {},
         *       //   "resourceUiUrl": "my_resourceUiUrl"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "alternateEmail": "my_alternateEmail",
         *   //   "customerDomain": "my_customerDomain",
         *   //   "customerDomainVerified": false,
         *   //   "customerId": "my_customerId",
         *   //   "kind": "my_kind",
         *   //   "phoneNumber": "my_phoneNumber",
         *   //   "postalAddress": {},
         *   //   "resourceUiUrl": "my_resourceUiUrl"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias reseller.customers.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customerId Either the customer's primary domain name or the customer's unique identifier. If using the domain name, we do not recommend using a customerId as a key for persistent data. If the domain name for a customerId is changed, the Google system automatically updates.
         * @param {().Customer} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Customers$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Customers$Patch, options?: MethodOptions): GaxiosPromise<Schema$Customer>;
        patch(params: Params$Resource$Customers$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Customers$Patch, options: MethodOptions | BodyResponseCallback<Schema$Customer>, callback: BodyResponseCallback<Schema$Customer>): void;
        patch(params: Params$Resource$Customers$Patch, callback: BodyResponseCallback<Schema$Customer>): void;
        patch(callback: BodyResponseCallback<Schema$Customer>): void;
        /**
         * reseller.customers.update
         * @desc Update a customer account's settings.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/reseller.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const reseller = google.reseller('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/apps.order'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await reseller.customers.update({
         *     // Either the customer's primary domain name or the customer's unique identifier. If using the domain name, we do not recommend using a customerId as a key for persistent data. If the domain name for a customerId is changed, the Google system automatically updates.
         *     customerId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "alternateEmail": "my_alternateEmail",
         *       //   "customerDomain": "my_customerDomain",
         *       //   "customerDomainVerified": false,
         *       //   "customerId": "my_customerId",
         *       //   "kind": "my_kind",
         *       //   "phoneNumber": "my_phoneNumber",
         *       //   "postalAddress": {},
         *       //   "resourceUiUrl": "my_resourceUiUrl"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "alternateEmail": "my_alternateEmail",
         *   //   "customerDomain": "my_customerDomain",
         *   //   "customerDomainVerified": false,
         *   //   "customerId": "my_customerId",
         *   //   "kind": "my_kind",
         *   //   "phoneNumber": "my_phoneNumber",
         *   //   "postalAddress": {},
         *   //   "resourceUiUrl": "my_resourceUiUrl"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias reseller.customers.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customerId Either the customer's primary domain name or the customer's unique identifier. If using the domain name, we do not recommend using a customerId as a key for persistent data. If the domain name for a customerId is changed, the Google system automatically updates.
         * @param {().Customer} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Customers$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Customers$Update, options?: MethodOptions): GaxiosPromise<Schema$Customer>;
        update(params: Params$Resource$Customers$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Customers$Update, options: MethodOptions | BodyResponseCallback<Schema$Customer>, callback: BodyResponseCallback<Schema$Customer>): void;
        update(params: Params$Resource$Customers$Update, callback: BodyResponseCallback<Schema$Customer>): void;
        update(callback: BodyResponseCallback<Schema$Customer>): void;
    }
    export interface Params$Resource$Customers$Get extends StandardParameters {
        /**
         * Either the customer's primary domain name or the customer's unique identifier. If using the domain name, we do not recommend using a customerId as a key for persistent data. If the domain name for a customerId is changed, the Google system automatically updates.
         */
        customerId?: string;
    }
    export interface Params$Resource$Customers$Insert extends StandardParameters {
        /**
         * The customerAuthToken query string is required when creating a resold account that transfers a direct customer's subscription or transfers another reseller customer's subscription to your reseller management. This is a hexadecimal authentication token needed to complete the subscription transfer. For more information, see the administrator help center.
         */
        customerAuthToken?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Customer;
    }
    export interface Params$Resource$Customers$Patch extends StandardParameters {
        /**
         * Either the customer's primary domain name or the customer's unique identifier. If using the domain name, we do not recommend using a customerId as a key for persistent data. If the domain name for a customerId is changed, the Google system automatically updates.
         */
        customerId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Customer;
    }
    export interface Params$Resource$Customers$Update extends StandardParameters {
        /**
         * Either the customer's primary domain name or the customer's unique identifier. If using the domain name, we do not recommend using a customerId as a key for persistent data. If the domain name for a customerId is changed, the Google system automatically updates.
         */
        customerId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Customer;
    }
    export class Resource$Resellernotify {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * reseller.resellernotify.getwatchdetails
         * @desc Returns all the details of the watch corresponding to the reseller.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/reseller.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const reseller = google.reseller('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/apps.order',
         *       'https://www.googleapis.com/auth/apps.order.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await reseller.resellernotify.getwatchdetails({});
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "serviceAccountEmailAddresses": [],
         *   //   "topicName": "my_topicName"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias reseller.resellernotify.getwatchdetails
         * @memberOf! ()
         *
         * @param {object=} params Parameters for request
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        getwatchdetails(params: Params$Resource$Resellernotify$Getwatchdetails, options: StreamMethodOptions): GaxiosPromise<Readable>;
        getwatchdetails(params?: Params$Resource$Resellernotify$Getwatchdetails, options?: MethodOptions): GaxiosPromise<Schema$ResellernotifyGetwatchdetailsResponse>;
        getwatchdetails(params: Params$Resource$Resellernotify$Getwatchdetails, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        getwatchdetails(params: Params$Resource$Resellernotify$Getwatchdetails, options: MethodOptions | BodyResponseCallback<Schema$ResellernotifyGetwatchdetailsResponse>, callback: BodyResponseCallback<Schema$ResellernotifyGetwatchdetailsResponse>): void;
        getwatchdetails(params: Params$Resource$Resellernotify$Getwatchdetails, callback: BodyResponseCallback<Schema$ResellernotifyGetwatchdetailsResponse>): void;
        getwatchdetails(callback: BodyResponseCallback<Schema$ResellernotifyGetwatchdetailsResponse>): void;
        /**
         * reseller.resellernotify.register
         * @desc Registers a Reseller for receiving notifications.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/reseller.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const reseller = google.reseller('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/apps.order'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await reseller.resellernotify.register({
         *     // The service account which will own the created Cloud-PubSub topic.
         *     serviceAccountEmailAddress: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "topicName": "my_topicName"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias reseller.resellernotify.register
         * @memberOf! ()
         *
         * @param {object=} params Parameters for request
         * @param {string=} params.serviceAccountEmailAddress The service account which will own the created Cloud-PubSub topic.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        register(params: Params$Resource$Resellernotify$Register, options: StreamMethodOptions): GaxiosPromise<Readable>;
        register(params?: Params$Resource$Resellernotify$Register, options?: MethodOptions): GaxiosPromise<Schema$ResellernotifyResource>;
        register(params: Params$Resource$Resellernotify$Register, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        register(params: Params$Resource$Resellernotify$Register, options: MethodOptions | BodyResponseCallback<Schema$ResellernotifyResource>, callback: BodyResponseCallback<Schema$ResellernotifyResource>): void;
        register(params: Params$Resource$Resellernotify$Register, callback: BodyResponseCallback<Schema$ResellernotifyResource>): void;
        register(callback: BodyResponseCallback<Schema$ResellernotifyResource>): void;
        /**
         * reseller.resellernotify.unregister
         * @desc Unregisters a Reseller for receiving notifications.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/reseller.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const reseller = google.reseller('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/apps.order'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await reseller.resellernotify.unregister({
         *     // The service account which owns the Cloud-PubSub topic.
         *     serviceAccountEmailAddress: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "topicName": "my_topicName"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias reseller.resellernotify.unregister
         * @memberOf! ()
         *
         * @param {object=} params Parameters for request
         * @param {string=} params.serviceAccountEmailAddress The service account which owns the Cloud-PubSub topic.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        unregister(params: Params$Resource$Resellernotify$Unregister, options: StreamMethodOptions): GaxiosPromise<Readable>;
        unregister(params?: Params$Resource$Resellernotify$Unregister, options?: MethodOptions): GaxiosPromise<Schema$ResellernotifyResource>;
        unregister(params: Params$Resource$Resellernotify$Unregister, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        unregister(params: Params$Resource$Resellernotify$Unregister, options: MethodOptions | BodyResponseCallback<Schema$ResellernotifyResource>, callback: BodyResponseCallback<Schema$ResellernotifyResource>): void;
        unregister(params: Params$Resource$Resellernotify$Unregister, callback: BodyResponseCallback<Schema$ResellernotifyResource>): void;
        unregister(callback: BodyResponseCallback<Schema$ResellernotifyResource>): void;
    }
    export interface Params$Resource$Resellernotify$Getwatchdetails extends StandardParameters {
    }
    export interface Params$Resource$Resellernotify$Register extends StandardParameters {
        /**
         * The service account which will own the created Cloud-PubSub topic.
         */
        serviceAccountEmailAddress?: string;
    }
    export interface Params$Resource$Resellernotify$Unregister extends StandardParameters {
        /**
         * The service account which owns the Cloud-PubSub topic.
         */
        serviceAccountEmailAddress?: string;
    }
    export class Resource$Subscriptions {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * reseller.subscriptions.activate
         * @desc Activates a subscription previously suspended by the reseller
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/reseller.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const reseller = google.reseller('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/apps.order'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await reseller.subscriptions.activate({
         *     // Either the customer's primary domain name or the customer's unique identifier. If using the domain name, we do not recommend using a customerId as a key for persistent data. If the domain name for a customerId is changed, the Google system automatically updates.
         *     customerId: 'placeholder-value',
         *     // This is a required property. The subscriptionId is the subscription identifier and is unique for each customer. Since a subscriptionId changes when a subscription is updated, we recommend to not use this ID as a key for persistent data. And the subscriptionId can be found using the retrieve all reseller subscriptions method.
         *     subscriptionId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "billingMethod": "my_billingMethod",
         *   //   "creationTime": "my_creationTime",
         *   //   "customerDomain": "my_customerDomain",
         *   //   "customerId": "my_customerId",
         *   //   "dealCode": "my_dealCode",
         *   //   "kind": "my_kind",
         *   //   "plan": {},
         *   //   "purchaseOrderId": "my_purchaseOrderId",
         *   //   "renewalSettings": {},
         *   //   "resourceUiUrl": "my_resourceUiUrl",
         *   //   "seats": {},
         *   //   "skuId": "my_skuId",
         *   //   "skuName": "my_skuName",
         *   //   "status": "my_status",
         *   //   "subscriptionId": "my_subscriptionId",
         *   //   "suspensionReasons": [],
         *   //   "transferInfo": {},
         *   //   "trialSettings": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias reseller.subscriptions.activate
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customerId Either the customer's primary domain name or the customer's unique identifier. If using the domain name, we do not recommend using a customerId as a key for persistent data. If the domain name for a customerId is changed, the Google system automatically updates.
         * @param {string} params.subscriptionId This is a required property. The subscriptionId is the subscription identifier and is unique for each customer. Since a subscriptionId changes when a subscription is updated, we recommend to not use this ID as a key for persistent data. And the subscriptionId can be found using the retrieve all reseller subscriptions method.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        activate(params: Params$Resource$Subscriptions$Activate, options: StreamMethodOptions): GaxiosPromise<Readable>;
        activate(params?: Params$Resource$Subscriptions$Activate, options?: MethodOptions): GaxiosPromise<Schema$Subscription>;
        activate(params: Params$Resource$Subscriptions$Activate, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        activate(params: Params$Resource$Subscriptions$Activate, options: MethodOptions | BodyResponseCallback<Schema$Subscription>, callback: BodyResponseCallback<Schema$Subscription>): void;
        activate(params: Params$Resource$Subscriptions$Activate, callback: BodyResponseCallback<Schema$Subscription>): void;
        activate(callback: BodyResponseCallback<Schema$Subscription>): void;
        /**
         * reseller.subscriptions.changePlan
         * @desc Update a subscription plan. Use this method to update a plan for a 30-day trial or a flexible plan subscription to an annual commitment plan with monthly or yearly payments.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/reseller.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const reseller = google.reseller('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/apps.order'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await reseller.subscriptions.changePlan({
         *     // Either the customer's primary domain name or the customer's unique identifier. If using the domain name, we do not recommend using a customerId as a key for persistent data. If the domain name for a customerId is changed, the Google system automatically updates.
         *     customerId: 'placeholder-value',
         *     // This is a required property. The subscriptionId is the subscription identifier and is unique for each customer. Since a subscriptionId changes when a subscription is updated, we recommend to not use this ID as a key for persistent data. And the subscriptionId can be found using the retrieve all reseller subscriptions method.
         *     subscriptionId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "dealCode": "my_dealCode",
         *       //   "kind": "my_kind",
         *       //   "planName": "my_planName",
         *       //   "purchaseOrderId": "my_purchaseOrderId",
         *       //   "seats": {}
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "billingMethod": "my_billingMethod",
         *   //   "creationTime": "my_creationTime",
         *   //   "customerDomain": "my_customerDomain",
         *   //   "customerId": "my_customerId",
         *   //   "dealCode": "my_dealCode",
         *   //   "kind": "my_kind",
         *   //   "plan": {},
         *   //   "purchaseOrderId": "my_purchaseOrderId",
         *   //   "renewalSettings": {},
         *   //   "resourceUiUrl": "my_resourceUiUrl",
         *   //   "seats": {},
         *   //   "skuId": "my_skuId",
         *   //   "skuName": "my_skuName",
         *   //   "status": "my_status",
         *   //   "subscriptionId": "my_subscriptionId",
         *   //   "suspensionReasons": [],
         *   //   "transferInfo": {},
         *   //   "trialSettings": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias reseller.subscriptions.changePlan
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customerId Either the customer's primary domain name or the customer's unique identifier. If using the domain name, we do not recommend using a customerId as a key for persistent data. If the domain name for a customerId is changed, the Google system automatically updates.
         * @param {string} params.subscriptionId This is a required property. The subscriptionId is the subscription identifier and is unique for each customer. Since a subscriptionId changes when a subscription is updated, we recommend to not use this ID as a key for persistent data. And the subscriptionId can be found using the retrieve all reseller subscriptions method.
         * @param {().ChangePlanRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        changePlan(params: Params$Resource$Subscriptions$Changeplan, options: StreamMethodOptions): GaxiosPromise<Readable>;
        changePlan(params?: Params$Resource$Subscriptions$Changeplan, options?: MethodOptions): GaxiosPromise<Schema$Subscription>;
        changePlan(params: Params$Resource$Subscriptions$Changeplan, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        changePlan(params: Params$Resource$Subscriptions$Changeplan, options: MethodOptions | BodyResponseCallback<Schema$Subscription>, callback: BodyResponseCallback<Schema$Subscription>): void;
        changePlan(params: Params$Resource$Subscriptions$Changeplan, callback: BodyResponseCallback<Schema$Subscription>): void;
        changePlan(callback: BodyResponseCallback<Schema$Subscription>): void;
        /**
         * reseller.subscriptions.changeRenewalSettings
         * @desc Update a user license's renewal settings. This is applicable for accounts with annual commitment plans only.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/reseller.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const reseller = google.reseller('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/apps.order'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await reseller.subscriptions.changeRenewalSettings({
         *     // Either the customer's primary domain name or the customer's unique identifier. If using the domain name, we do not recommend using a customerId as a key for persistent data. If the domain name for a customerId is changed, the Google system automatically updates.
         *     customerId: 'placeholder-value',
         *     // This is a required property. The subscriptionId is the subscription identifier and is unique for each customer. Since a subscriptionId changes when a subscription is updated, we recommend to not use this ID as a key for persistent data. And the subscriptionId can be found using the retrieve all reseller subscriptions method.
         *     subscriptionId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "kind": "my_kind",
         *       //   "renewalType": "my_renewalType"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "billingMethod": "my_billingMethod",
         *   //   "creationTime": "my_creationTime",
         *   //   "customerDomain": "my_customerDomain",
         *   //   "customerId": "my_customerId",
         *   //   "dealCode": "my_dealCode",
         *   //   "kind": "my_kind",
         *   //   "plan": {},
         *   //   "purchaseOrderId": "my_purchaseOrderId",
         *   //   "renewalSettings": {},
         *   //   "resourceUiUrl": "my_resourceUiUrl",
         *   //   "seats": {},
         *   //   "skuId": "my_skuId",
         *   //   "skuName": "my_skuName",
         *   //   "status": "my_status",
         *   //   "subscriptionId": "my_subscriptionId",
         *   //   "suspensionReasons": [],
         *   //   "transferInfo": {},
         *   //   "trialSettings": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias reseller.subscriptions.changeRenewalSettings
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customerId Either the customer's primary domain name or the customer's unique identifier. If using the domain name, we do not recommend using a customerId as a key for persistent data. If the domain name for a customerId is changed, the Google system automatically updates.
         * @param {string} params.subscriptionId This is a required property. The subscriptionId is the subscription identifier and is unique for each customer. Since a subscriptionId changes when a subscription is updated, we recommend to not use this ID as a key for persistent data. And the subscriptionId can be found using the retrieve all reseller subscriptions method.
         * @param {().RenewalSettings} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        changeRenewalSettings(params: Params$Resource$Subscriptions$Changerenewalsettings, options: StreamMethodOptions): GaxiosPromise<Readable>;
        changeRenewalSettings(params?: Params$Resource$Subscriptions$Changerenewalsettings, options?: MethodOptions): GaxiosPromise<Schema$Subscription>;
        changeRenewalSettings(params: Params$Resource$Subscriptions$Changerenewalsettings, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        changeRenewalSettings(params: Params$Resource$Subscriptions$Changerenewalsettings, options: MethodOptions | BodyResponseCallback<Schema$Subscription>, callback: BodyResponseCallback<Schema$Subscription>): void;
        changeRenewalSettings(params: Params$Resource$Subscriptions$Changerenewalsettings, callback: BodyResponseCallback<Schema$Subscription>): void;
        changeRenewalSettings(callback: BodyResponseCallback<Schema$Subscription>): void;
        /**
         * reseller.subscriptions.changeSeats
         * @desc Update a subscription's user license settings.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/reseller.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const reseller = google.reseller('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/apps.order'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await reseller.subscriptions.changeSeats({
         *     // Either the customer's primary domain name or the customer's unique identifier. If using the domain name, we do not recommend using a customerId as a key for persistent data. If the domain name for a customerId is changed, the Google system automatically updates.
         *     customerId: 'placeholder-value',
         *     // This is a required property. The subscriptionId is the subscription identifier and is unique for each customer. Since a subscriptionId changes when a subscription is updated, we recommend to not use this ID as a key for persistent data. And the subscriptionId can be found using the retrieve all reseller subscriptions method.
         *     subscriptionId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "kind": "my_kind",
         *       //   "licensedNumberOfSeats": 0,
         *       //   "maximumNumberOfSeats": 0,
         *       //   "numberOfSeats": 0
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "billingMethod": "my_billingMethod",
         *   //   "creationTime": "my_creationTime",
         *   //   "customerDomain": "my_customerDomain",
         *   //   "customerId": "my_customerId",
         *   //   "dealCode": "my_dealCode",
         *   //   "kind": "my_kind",
         *   //   "plan": {},
         *   //   "purchaseOrderId": "my_purchaseOrderId",
         *   //   "renewalSettings": {},
         *   //   "resourceUiUrl": "my_resourceUiUrl",
         *   //   "seats": {},
         *   //   "skuId": "my_skuId",
         *   //   "skuName": "my_skuName",
         *   //   "status": "my_status",
         *   //   "subscriptionId": "my_subscriptionId",
         *   //   "suspensionReasons": [],
         *   //   "transferInfo": {},
         *   //   "trialSettings": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias reseller.subscriptions.changeSeats
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customerId Either the customer's primary domain name or the customer's unique identifier. If using the domain name, we do not recommend using a customerId as a key for persistent data. If the domain name for a customerId is changed, the Google system automatically updates.
         * @param {string} params.subscriptionId This is a required property. The subscriptionId is the subscription identifier and is unique for each customer. Since a subscriptionId changes when a subscription is updated, we recommend to not use this ID as a key for persistent data. And the subscriptionId can be found using the retrieve all reseller subscriptions method.
         * @param {().Seats} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        changeSeats(params: Params$Resource$Subscriptions$Changeseats, options: StreamMethodOptions): GaxiosPromise<Readable>;
        changeSeats(params?: Params$Resource$Subscriptions$Changeseats, options?: MethodOptions): GaxiosPromise<Schema$Subscription>;
        changeSeats(params: Params$Resource$Subscriptions$Changeseats, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        changeSeats(params: Params$Resource$Subscriptions$Changeseats, options: MethodOptions | BodyResponseCallback<Schema$Subscription>, callback: BodyResponseCallback<Schema$Subscription>): void;
        changeSeats(params: Params$Resource$Subscriptions$Changeseats, callback: BodyResponseCallback<Schema$Subscription>): void;
        changeSeats(callback: BodyResponseCallback<Schema$Subscription>): void;
        /**
         * reseller.subscriptions.delete
         * @desc Cancel, suspend, or transfer a subscription to direct.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/reseller.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const reseller = google.reseller('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/apps.order'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await reseller.subscriptions.delete({
         *     // Either the customer's primary domain name or the customer's unique identifier. If using the domain name, we do not recommend using a customerId as a key for persistent data. If the domain name for a customerId is changed, the Google system automatically updates.
         *     customerId: 'placeholder-value',
         *     // The deletionType query string enables the cancellation, downgrade, or suspension of a subscription.
         *     deletionType: 'placeholder-value',
         *     // This is a required property. The subscriptionId is the subscription identifier and is unique for each customer. Since a subscriptionId changes when a subscription is updated, we recommend to not use this ID as a key for persistent data. And the subscriptionId can be found using the retrieve all reseller subscriptions method.
         *     subscriptionId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias reseller.subscriptions.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customerId Either the customer's primary domain name or the customer's unique identifier. If using the domain name, we do not recommend using a customerId as a key for persistent data. If the domain name for a customerId is changed, the Google system automatically updates.
         * @param {string} params.deletionType The deletionType query string enables the cancellation, downgrade, or suspension of a subscription.
         * @param {string} params.subscriptionId This is a required property. The subscriptionId is the subscription identifier and is unique for each customer. Since a subscriptionId changes when a subscription is updated, we recommend to not use this ID as a key for persistent data. And the subscriptionId can be found using the retrieve all reseller subscriptions method.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Subscriptions$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Subscriptions$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Subscriptions$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Subscriptions$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Subscriptions$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * reseller.subscriptions.get
         * @desc Get a specific subscription.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/reseller.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const reseller = google.reseller('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/apps.order',
         *       'https://www.googleapis.com/auth/apps.order.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await reseller.subscriptions.get({
         *     // Either the customer's primary domain name or the customer's unique identifier. If using the domain name, we do not recommend using a customerId as a key for persistent data. If the domain name for a customerId is changed, the Google system automatically updates.
         *     customerId: 'placeholder-value',
         *     // This is a required property. The subscriptionId is the subscription identifier and is unique for each customer. Since a subscriptionId changes when a subscription is updated, we recommend to not use this ID as a key for persistent data. And the subscriptionId can be found using the retrieve all reseller subscriptions method.
         *     subscriptionId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "billingMethod": "my_billingMethod",
         *   //   "creationTime": "my_creationTime",
         *   //   "customerDomain": "my_customerDomain",
         *   //   "customerId": "my_customerId",
         *   //   "dealCode": "my_dealCode",
         *   //   "kind": "my_kind",
         *   //   "plan": {},
         *   //   "purchaseOrderId": "my_purchaseOrderId",
         *   //   "renewalSettings": {},
         *   //   "resourceUiUrl": "my_resourceUiUrl",
         *   //   "seats": {},
         *   //   "skuId": "my_skuId",
         *   //   "skuName": "my_skuName",
         *   //   "status": "my_status",
         *   //   "subscriptionId": "my_subscriptionId",
         *   //   "suspensionReasons": [],
         *   //   "transferInfo": {},
         *   //   "trialSettings": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias reseller.subscriptions.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customerId Either the customer's primary domain name or the customer's unique identifier. If using the domain name, we do not recommend using a customerId as a key for persistent data. If the domain name for a customerId is changed, the Google system automatically updates.
         * @param {string} params.subscriptionId This is a required property. The subscriptionId is the subscription identifier and is unique for each customer. Since a subscriptionId changes when a subscription is updated, we recommend to not use this ID as a key for persistent data. And the subscriptionId can be found using the retrieve all reseller subscriptions method.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Subscriptions$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Subscriptions$Get, options?: MethodOptions): GaxiosPromise<Schema$Subscription>;
        get(params: Params$Resource$Subscriptions$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Subscriptions$Get, options: MethodOptions | BodyResponseCallback<Schema$Subscription>, callback: BodyResponseCallback<Schema$Subscription>): void;
        get(params: Params$Resource$Subscriptions$Get, callback: BodyResponseCallback<Schema$Subscription>): void;
        get(callback: BodyResponseCallback<Schema$Subscription>): void;
        /**
         * reseller.subscriptions.insert
         * @desc Create or transfer a subscription.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/reseller.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const reseller = google.reseller('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/apps.order'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await reseller.subscriptions.insert({
         *     // The customerAuthToken query string is required when creating a resold account that transfers a direct customer's subscription or transfers another reseller customer's subscription to your reseller management. This is a hexadecimal authentication token needed to complete the subscription transfer. For more information, see the administrator help center.
         *     customerAuthToken: 'placeholder-value',
         *     // Either the customer's primary domain name or the customer's unique identifier. If using the domain name, we do not recommend using a customerId as a key for persistent data. If the domain name for a customerId is changed, the Google system automatically updates.
         *     customerId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "billingMethod": "my_billingMethod",
         *       //   "creationTime": "my_creationTime",
         *       //   "customerDomain": "my_customerDomain",
         *       //   "customerId": "my_customerId",
         *       //   "dealCode": "my_dealCode",
         *       //   "kind": "my_kind",
         *       //   "plan": {},
         *       //   "purchaseOrderId": "my_purchaseOrderId",
         *       //   "renewalSettings": {},
         *       //   "resourceUiUrl": "my_resourceUiUrl",
         *       //   "seats": {},
         *       //   "skuId": "my_skuId",
         *       //   "skuName": "my_skuName",
         *       //   "status": "my_status",
         *       //   "subscriptionId": "my_subscriptionId",
         *       //   "suspensionReasons": [],
         *       //   "transferInfo": {},
         *       //   "trialSettings": {}
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "billingMethod": "my_billingMethod",
         *   //   "creationTime": "my_creationTime",
         *   //   "customerDomain": "my_customerDomain",
         *   //   "customerId": "my_customerId",
         *   //   "dealCode": "my_dealCode",
         *   //   "kind": "my_kind",
         *   //   "plan": {},
         *   //   "purchaseOrderId": "my_purchaseOrderId",
         *   //   "renewalSettings": {},
         *   //   "resourceUiUrl": "my_resourceUiUrl",
         *   //   "seats": {},
         *   //   "skuId": "my_skuId",
         *   //   "skuName": "my_skuName",
         *   //   "status": "my_status",
         *   //   "subscriptionId": "my_subscriptionId",
         *   //   "suspensionReasons": [],
         *   //   "transferInfo": {},
         *   //   "trialSettings": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias reseller.subscriptions.insert
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.customerAuthToken The customerAuthToken query string is required when creating a resold account that transfers a direct customer's subscription or transfers another reseller customer's subscription to your reseller management. This is a hexadecimal authentication token needed to complete the subscription transfer. For more information, see the administrator help center.
         * @param {string} params.customerId Either the customer's primary domain name or the customer's unique identifier. If using the domain name, we do not recommend using a customerId as a key for persistent data. If the domain name for a customerId is changed, the Google system automatically updates.
         * @param {().Subscription} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        insert(params: Params$Resource$Subscriptions$Insert, options: StreamMethodOptions): GaxiosPromise<Readable>;
        insert(params?: Params$Resource$Subscriptions$Insert, options?: MethodOptions): GaxiosPromise<Schema$Subscription>;
        insert(params: Params$Resource$Subscriptions$Insert, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        insert(params: Params$Resource$Subscriptions$Insert, options: MethodOptions | BodyResponseCallback<Schema$Subscription>, callback: BodyResponseCallback<Schema$Subscription>): void;
        insert(params: Params$Resource$Subscriptions$Insert, callback: BodyResponseCallback<Schema$Subscription>): void;
        insert(callback: BodyResponseCallback<Schema$Subscription>): void;
        /**
         * reseller.subscriptions.list
         * @desc List of subscriptions managed by the reseller. The list can be all subscriptions, all of a customer's subscriptions, or all of a customer's transferable subscriptions.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/reseller.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const reseller = google.reseller('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/apps.order',
         *       'https://www.googleapis.com/auth/apps.order.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await reseller.subscriptions.list({
         *     // The customerAuthToken query string is required when creating a resold account that transfers a direct customer's subscription or transfers another reseller customer's subscription to your reseller management. This is a hexadecimal authentication token needed to complete the subscription transfer. For more information, see the administrator help center.
         *     customerAuthToken: 'placeholder-value',
         *     // Either the customer's primary domain name or the customer's unique identifier. If using the domain name, we do not recommend using a customerId as a key for persistent data. If the domain name for a customerId is changed, the Google system automatically updates.
         *     customerId: 'placeholder-value',
         *     // When retrieving all of your subscriptions and filtering for specific customers, you can enter a prefix for a customer name. Using an example customer group that includes exam.com, example20.com and example.com:
         *     // - exa -- Returns all customer names that start with 'exa' which could include exam.com, example20.com, and example.com. A name prefix is similar to using a regular expression's asterisk, exa*.
         *     // - example -- Returns example20.com and example.com.
         *     customerNamePrefix: 'placeholder-value',
         *     // When retrieving a large list, the maxResults is the maximum number of results per page. The nextPageToken value takes you to the next page. The default is 20.
         *     maxResults: 'placeholder-value',
         *     // Token to specify next page in the list
         *     pageToken: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "kind": "my_kind",
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "subscriptions": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias reseller.subscriptions.list
         * @memberOf! ()
         *
         * @param {object=} params Parameters for request
         * @param {string=} params.customerAuthToken The customerAuthToken query string is required when creating a resold account that transfers a direct customer's subscription or transfers another reseller customer's subscription to your reseller management. This is a hexadecimal authentication token needed to complete the subscription transfer. For more information, see the administrator help center.
         * @param {string=} params.customerId Either the customer's primary domain name or the customer's unique identifier. If using the domain name, we do not recommend using a customerId as a key for persistent data. If the domain name for a customerId is changed, the Google system automatically updates.
         * @param {string=} params.customerNamePrefix When retrieving all of your subscriptions and filtering for specific customers, you can enter a prefix for a customer name. Using an example customer group that includes exam.com, example20.com and example.com:   - exa -- Returns all customer names that start with 'exa' which could include exam.com, example20.com, and example.com. A name prefix is similar to using a regular expression's asterisk, exa*.  - example -- Returns example20.com and example.com.
         * @param {integer=} params.maxResults When retrieving a large list, the maxResults is the maximum number of results per page. The nextPageToken value takes you to the next page. The default is 20.
         * @param {string=} params.pageToken Token to specify next page in the list
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Subscriptions$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Subscriptions$List, options?: MethodOptions): GaxiosPromise<Schema$Subscriptions>;
        list(params: Params$Resource$Subscriptions$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Subscriptions$List, options: MethodOptions | BodyResponseCallback<Schema$Subscriptions>, callback: BodyResponseCallback<Schema$Subscriptions>): void;
        list(params: Params$Resource$Subscriptions$List, callback: BodyResponseCallback<Schema$Subscriptions>): void;
        list(callback: BodyResponseCallback<Schema$Subscriptions>): void;
        /**
         * reseller.subscriptions.startPaidService
         * @desc Immediately move a 30-day free trial subscription to a paid service subscription.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/reseller.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const reseller = google.reseller('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/apps.order'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await reseller.subscriptions.startPaidService({
         *     // Either the customer's primary domain name or the customer's unique identifier. If using the domain name, we do not recommend using a customerId as a key for persistent data. If the domain name for a customerId is changed, the Google system automatically updates.
         *     customerId: 'placeholder-value',
         *     // This is a required property. The subscriptionId is the subscription identifier and is unique for each customer. Since a subscriptionId changes when a subscription is updated, we recommend to not use this ID as a key for persistent data. And the subscriptionId can be found using the retrieve all reseller subscriptions method.
         *     subscriptionId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "billingMethod": "my_billingMethod",
         *   //   "creationTime": "my_creationTime",
         *   //   "customerDomain": "my_customerDomain",
         *   //   "customerId": "my_customerId",
         *   //   "dealCode": "my_dealCode",
         *   //   "kind": "my_kind",
         *   //   "plan": {},
         *   //   "purchaseOrderId": "my_purchaseOrderId",
         *   //   "renewalSettings": {},
         *   //   "resourceUiUrl": "my_resourceUiUrl",
         *   //   "seats": {},
         *   //   "skuId": "my_skuId",
         *   //   "skuName": "my_skuName",
         *   //   "status": "my_status",
         *   //   "subscriptionId": "my_subscriptionId",
         *   //   "suspensionReasons": [],
         *   //   "transferInfo": {},
         *   //   "trialSettings": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias reseller.subscriptions.startPaidService
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customerId Either the customer's primary domain name or the customer's unique identifier. If using the domain name, we do not recommend using a customerId as a key for persistent data. If the domain name for a customerId is changed, the Google system automatically updates.
         * @param {string} params.subscriptionId This is a required property. The subscriptionId is the subscription identifier and is unique for each customer. Since a subscriptionId changes when a subscription is updated, we recommend to not use this ID as a key for persistent data. And the subscriptionId can be found using the retrieve all reseller subscriptions method.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        startPaidService(params: Params$Resource$Subscriptions$Startpaidservice, options: StreamMethodOptions): GaxiosPromise<Readable>;
        startPaidService(params?: Params$Resource$Subscriptions$Startpaidservice, options?: MethodOptions): GaxiosPromise<Schema$Subscription>;
        startPaidService(params: Params$Resource$Subscriptions$Startpaidservice, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        startPaidService(params: Params$Resource$Subscriptions$Startpaidservice, options: MethodOptions | BodyResponseCallback<Schema$Subscription>, callback: BodyResponseCallback<Schema$Subscription>): void;
        startPaidService(params: Params$Resource$Subscriptions$Startpaidservice, callback: BodyResponseCallback<Schema$Subscription>): void;
        startPaidService(callback: BodyResponseCallback<Schema$Subscription>): void;
        /**
         * reseller.subscriptions.suspend
         * @desc Suspends an active subscription.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/reseller.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const reseller = google.reseller('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/apps.order'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await reseller.subscriptions.suspend({
         *     // Either the customer's primary domain name or the customer's unique identifier. If using the domain name, we do not recommend using a customerId as a key for persistent data. If the domain name for a customerId is changed, the Google system automatically updates.
         *     customerId: 'placeholder-value',
         *     // This is a required property. The subscriptionId is the subscription identifier and is unique for each customer. Since a subscriptionId changes when a subscription is updated, we recommend to not use this ID as a key for persistent data. And the subscriptionId can be found using the retrieve all reseller subscriptions method.
         *     subscriptionId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "billingMethod": "my_billingMethod",
         *   //   "creationTime": "my_creationTime",
         *   //   "customerDomain": "my_customerDomain",
         *   //   "customerId": "my_customerId",
         *   //   "dealCode": "my_dealCode",
         *   //   "kind": "my_kind",
         *   //   "plan": {},
         *   //   "purchaseOrderId": "my_purchaseOrderId",
         *   //   "renewalSettings": {},
         *   //   "resourceUiUrl": "my_resourceUiUrl",
         *   //   "seats": {},
         *   //   "skuId": "my_skuId",
         *   //   "skuName": "my_skuName",
         *   //   "status": "my_status",
         *   //   "subscriptionId": "my_subscriptionId",
         *   //   "suspensionReasons": [],
         *   //   "transferInfo": {},
         *   //   "trialSettings": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias reseller.subscriptions.suspend
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customerId Either the customer's primary domain name or the customer's unique identifier. If using the domain name, we do not recommend using a customerId as a key for persistent data. If the domain name for a customerId is changed, the Google system automatically updates.
         * @param {string} params.subscriptionId This is a required property. The subscriptionId is the subscription identifier and is unique for each customer. Since a subscriptionId changes when a subscription is updated, we recommend to not use this ID as a key for persistent data. And the subscriptionId can be found using the retrieve all reseller subscriptions method.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        suspend(params: Params$Resource$Subscriptions$Suspend, options: StreamMethodOptions): GaxiosPromise<Readable>;
        suspend(params?: Params$Resource$Subscriptions$Suspend, options?: MethodOptions): GaxiosPromise<Schema$Subscription>;
        suspend(params: Params$Resource$Subscriptions$Suspend, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        suspend(params: Params$Resource$Subscriptions$Suspend, options: MethodOptions | BodyResponseCallback<Schema$Subscription>, callback: BodyResponseCallback<Schema$Subscription>): void;
        suspend(params: Params$Resource$Subscriptions$Suspend, callback: BodyResponseCallback<Schema$Subscription>): void;
        suspend(callback: BodyResponseCallback<Schema$Subscription>): void;
    }
    export interface Params$Resource$Subscriptions$Activate extends StandardParameters {
        /**
         * Either the customer's primary domain name or the customer's unique identifier. If using the domain name, we do not recommend using a customerId as a key for persistent data. If the domain name for a customerId is changed, the Google system automatically updates.
         */
        customerId?: string;
        /**
         * This is a required property. The subscriptionId is the subscription identifier and is unique for each customer. Since a subscriptionId changes when a subscription is updated, we recommend to not use this ID as a key for persistent data. And the subscriptionId can be found using the retrieve all reseller subscriptions method.
         */
        subscriptionId?: string;
    }
    export interface Params$Resource$Subscriptions$Changeplan extends StandardParameters {
        /**
         * Either the customer's primary domain name or the customer's unique identifier. If using the domain name, we do not recommend using a customerId as a key for persistent data. If the domain name for a customerId is changed, the Google system automatically updates.
         */
        customerId?: string;
        /**
         * This is a required property. The subscriptionId is the subscription identifier and is unique for each customer. Since a subscriptionId changes when a subscription is updated, we recommend to not use this ID as a key for persistent data. And the subscriptionId can be found using the retrieve all reseller subscriptions method.
         */
        subscriptionId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$ChangePlanRequest;
    }
    export interface Params$Resource$Subscriptions$Changerenewalsettings extends StandardParameters {
        /**
         * Either the customer's primary domain name or the customer's unique identifier. If using the domain name, we do not recommend using a customerId as a key for persistent data. If the domain name for a customerId is changed, the Google system automatically updates.
         */
        customerId?: string;
        /**
         * This is a required property. The subscriptionId is the subscription identifier and is unique for each customer. Since a subscriptionId changes when a subscription is updated, we recommend to not use this ID as a key for persistent data. And the subscriptionId can be found using the retrieve all reseller subscriptions method.
         */
        subscriptionId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$RenewalSettings;
    }
    export interface Params$Resource$Subscriptions$Changeseats extends StandardParameters {
        /**
         * Either the customer's primary domain name or the customer's unique identifier. If using the domain name, we do not recommend using a customerId as a key for persistent data. If the domain name for a customerId is changed, the Google system automatically updates.
         */
        customerId?: string;
        /**
         * This is a required property. The subscriptionId is the subscription identifier and is unique for each customer. Since a subscriptionId changes when a subscription is updated, we recommend to not use this ID as a key for persistent data. And the subscriptionId can be found using the retrieve all reseller subscriptions method.
         */
        subscriptionId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Seats;
    }
    export interface Params$Resource$Subscriptions$Delete extends StandardParameters {
        /**
         * Either the customer's primary domain name or the customer's unique identifier. If using the domain name, we do not recommend using a customerId as a key for persistent data. If the domain name for a customerId is changed, the Google system automatically updates.
         */
        customerId?: string;
        /**
         * The deletionType query string enables the cancellation, downgrade, or suspension of a subscription.
         */
        deletionType?: string;
        /**
         * This is a required property. The subscriptionId is the subscription identifier and is unique for each customer. Since a subscriptionId changes when a subscription is updated, we recommend to not use this ID as a key for persistent data. And the subscriptionId can be found using the retrieve all reseller subscriptions method.
         */
        subscriptionId?: string;
    }
    export interface Params$Resource$Subscriptions$Get extends StandardParameters {
        /**
         * Either the customer's primary domain name or the customer's unique identifier. If using the domain name, we do not recommend using a customerId as a key for persistent data. If the domain name for a customerId is changed, the Google system automatically updates.
         */
        customerId?: string;
        /**
         * This is a required property. The subscriptionId is the subscription identifier and is unique for each customer. Since a subscriptionId changes when a subscription is updated, we recommend to not use this ID as a key for persistent data. And the subscriptionId can be found using the retrieve all reseller subscriptions method.
         */
        subscriptionId?: string;
    }
    export interface Params$Resource$Subscriptions$Insert extends StandardParameters {
        /**
         * The customerAuthToken query string is required when creating a resold account that transfers a direct customer's subscription or transfers another reseller customer's subscription to your reseller management. This is a hexadecimal authentication token needed to complete the subscription transfer. For more information, see the administrator help center.
         */
        customerAuthToken?: string;
        /**
         * Either the customer's primary domain name or the customer's unique identifier. If using the domain name, we do not recommend using a customerId as a key for persistent data. If the domain name for a customerId is changed, the Google system automatically updates.
         */
        customerId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Subscription;
    }
    export interface Params$Resource$Subscriptions$List extends StandardParameters {
        /**
         * The customerAuthToken query string is required when creating a resold account that transfers a direct customer's subscription or transfers another reseller customer's subscription to your reseller management. This is a hexadecimal authentication token needed to complete the subscription transfer. For more information, see the administrator help center.
         */
        customerAuthToken?: string;
        /**
         * Either the customer's primary domain name or the customer's unique identifier. If using the domain name, we do not recommend using a customerId as a key for persistent data. If the domain name for a customerId is changed, the Google system automatically updates.
         */
        customerId?: string;
        /**
         * When retrieving all of your subscriptions and filtering for specific customers, you can enter a prefix for a customer name. Using an example customer group that includes exam.com, example20.com and example.com:   - exa -- Returns all customer names that start with 'exa' which could include exam.com, example20.com, and example.com. A name prefix is similar to using a regular expression's asterisk, exa*.  - example -- Returns example20.com and example.com.
         */
        customerNamePrefix?: string;
        /**
         * When retrieving a large list, the maxResults is the maximum number of results per page. The nextPageToken value takes you to the next page. The default is 20.
         */
        maxResults?: number;
        /**
         * Token to specify next page in the list
         */
        pageToken?: string;
    }
    export interface Params$Resource$Subscriptions$Startpaidservice extends StandardParameters {
        /**
         * Either the customer's primary domain name or the customer's unique identifier. If using the domain name, we do not recommend using a customerId as a key for persistent data. If the domain name for a customerId is changed, the Google system automatically updates.
         */
        customerId?: string;
        /**
         * This is a required property. The subscriptionId is the subscription identifier and is unique for each customer. Since a subscriptionId changes when a subscription is updated, we recommend to not use this ID as a key for persistent data. And the subscriptionId can be found using the retrieve all reseller subscriptions method.
         */
        subscriptionId?: string;
    }
    export interface Params$Resource$Subscriptions$Suspend extends StandardParameters {
        /**
         * Either the customer's primary domain name or the customer's unique identifier. If using the domain name, we do not recommend using a customerId as a key for persistent data. If the domain name for a customerId is changed, the Google system automatically updates.
         */
        customerId?: string;
        /**
         * This is a required property. The subscriptionId is the subscription identifier and is unique for each customer. Since a subscriptionId changes when a subscription is updated, we recommend to not use this ID as a key for persistent data. And the subscriptionId can be found using the retrieve all reseller subscriptions method.
         */
        subscriptionId?: string;
    }
    export {};
}
