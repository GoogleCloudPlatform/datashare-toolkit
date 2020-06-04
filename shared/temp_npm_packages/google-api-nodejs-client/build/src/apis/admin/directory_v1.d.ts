/// <reference types="node" />
import { OAuth2Client, JWT, Compute, UserRefreshClient, GaxiosPromise, GoogleConfigurable, MethodOptions, StreamMethodOptions, GlobalOptions, GoogleAuth, BodyResponseCallback, APIRequestContext } from 'googleapis-common';
import { Readable } from 'stream';
export declare namespace admin_directory_v1 {
    export interface Options extends GlobalOptions {
        version: 'directory_v1';
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
     * Admin Directory API
     *
     * Manages enterprise resources such as users and groups, administrative notifications, security features, and more.
     *
     * @example
     * const {google} = require('googleapis');
     * const admin = google.admin('directory_v1');
     *
     * @namespace admin
     * @type {Function}
     * @version directory_v1
     * @variation directory_v1
     * @param {object=} options Options for Admin
     */
    export class Admin {
        context: APIRequestContext;
        asps: Resource$Asps;
        channels: Resource$Channels;
        chromeosdevices: Resource$Chromeosdevices;
        customers: Resource$Customers;
        domainAliases: Resource$Domainaliases;
        domains: Resource$Domains;
        groups: Resource$Groups;
        members: Resource$Members;
        mobiledevices: Resource$Mobiledevices;
        notifications: Resource$Notifications;
        orgunits: Resource$Orgunits;
        privileges: Resource$Privileges;
        resources: Resource$Resources;
        roleAssignments: Resource$Roleassignments;
        roles: Resource$Roles;
        schemas: Resource$Schemas;
        tokens: Resource$Tokens;
        users: Resource$Users;
        verificationCodes: Resource$Verificationcodes;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
    }
    /**
     * JSON template for Alias object in Directory API.
     */
    export interface Schema$Alias {
        /**
         * A alias email
         */
        alias?: string | null;
        /**
         * ETag of the resource.
         */
        etag?: string | null;
        /**
         * Unique id of the group (Read-only) Unique id of the user (Read-only)
         */
        id?: string | null;
        /**
         * Kind of resource this is.
         */
        kind?: string | null;
        /**
         * Group&#39;s primary email (Read-only) User&#39;s primary email (Read-only)
         */
        primaryEmail?: string | null;
    }
    /**
     * JSON response template to list aliases in Directory API.
     */
    export interface Schema$Aliases {
        /**
         * List of alias objects.
         */
        aliases?: any[] | null;
        /**
         * ETag of the resource.
         */
        etag?: string | null;
        /**
         * Kind of resource this is.
         */
        kind?: string | null;
    }
    /**
     * The template that returns individual ASP (Access Code) data.
     */
    export interface Schema$Asp {
        /**
         * The unique ID of the ASP.
         */
        codeId?: number | null;
        /**
         * The time when the ASP was created. Expressed in Unix time format.
         */
        creationTime?: string | null;
        /**
         * ETag of the ASP.
         */
        etag?: string | null;
        /**
         * The type of the API resource. This is always admin#directory#asp.
         */
        kind?: string | null;
        /**
         * The time when the ASP was last used. Expressed in Unix time format.
         */
        lastTimeUsed?: string | null;
        /**
         * The name of the application that the user, represented by their userId, entered when the ASP was created.
         */
        name?: string | null;
        /**
         * The unique ID of the user who issued the ASP.
         */
        userKey?: string | null;
    }
    export interface Schema$Asps {
        /**
         * ETag of the resource.
         */
        etag?: string | null;
        /**
         * A list of ASP resources.
         */
        items?: Schema$Asp[];
        /**
         * The type of the API resource. This is always admin#directory#aspList.
         */
        kind?: string | null;
    }
    /**
     * JSON template for Building object in Directory API.
     */
    export interface Schema$Building {
        /**
         * The postal address of the building. See PostalAddress for details. Note that only a single address line and region code are required.
         */
        address?: Schema$BuildingAddress;
        /**
         * Unique identifier for the building. The maximum length is 100 characters.
         */
        buildingId?: string | null;
        /**
         * The building name as seen by users in Calendar. Must be unique for the customer. For example, &quot;NYC-CHEL&quot;. The maximum length is 100 characters.
         */
        buildingName?: string | null;
        /**
         * The geographic coordinates of the center of the building, expressed as latitude and longitude in decimal degrees.
         */
        coordinates?: Schema$BuildingCoordinates;
        /**
         * A brief description of the building. For example, &quot;Chelsea Market&quot;.
         */
        description?: string | null;
        /**
         * ETag of the resource.
         */
        etags?: string | null;
        /**
         * The display names for all floors in this building. The floors are expected to be sorted in ascending order, from lowest floor to highest floor. For example, [&quot;B2&quot;, &quot;B1&quot;, &quot;L&quot;, &quot;1&quot;, &quot;2&quot;, &quot;2M&quot;, &quot;3&quot;, &quot;PH&quot;] Must contain at least one entry.
         */
        floorNames?: string[] | null;
        /**
         * Kind of resource this is.
         */
        kind?: string | null;
    }
    /**
     * JSON template for the postal address of a building in Directory API.
     */
    export interface Schema$BuildingAddress {
        /**
         * Unstructured address lines describing the lower levels of an address.
         */
        addressLines?: string[] | null;
        /**
         * Optional. Highest administrative subdivision which is used for postal addresses of a country or region.
         */
        administrativeArea?: string | null;
        /**
         * Optional. BCP-47 language code of the contents of this address (if known).
         */
        languageCode?: string | null;
        /**
         * Optional. Generally refers to the city/town portion of the address. Examples: US city, IT comune, UK post town. In regions of the world where localities are not well defined or do not fit into this structure well, leave locality empty and use addressLines.
         */
        locality?: string | null;
        /**
         * Optional. Postal code of the address.
         */
        postalCode?: string | null;
        /**
         * Required. CLDR region code of the country/region of the address.
         */
        regionCode?: string | null;
        /**
         * Optional. Sublocality of the address.
         */
        sublocality?: string | null;
    }
    /**
     * JSON template for coordinates of a building in Directory API.
     */
    export interface Schema$BuildingCoordinates {
        /**
         * Latitude in decimal degrees.
         */
        latitude?: number | null;
        /**
         * Longitude in decimal degrees.
         */
        longitude?: number | null;
    }
    /**
     * JSON template for Building List Response object in Directory API.
     */
    export interface Schema$Buildings {
        /**
         * The Buildings in this page of results.
         */
        buildings?: Schema$Building[];
        /**
         * ETag of the resource.
         */
        etag?: string | null;
        /**
         * Kind of resource this is.
         */
        kind?: string | null;
        /**
         * The continuation token, used to page through large result sets. Provide this value in a subsequent request to return the next page of results.
         */
        nextPageToken?: string | null;
    }
    /**
     * JSON template for Calendar Resource object in Directory API.
     */
    export interface Schema$CalendarResource {
        /**
         * Unique ID for the building a resource is located in.
         */
        buildingId?: string | null;
        /**
         * Capacity of a resource, number of seats in a room.
         */
        capacity?: number | null;
        /**
         * ETag of the resource.
         */
        etags?: string | null;
        featureInstances?: any | null;
        /**
         * Name of the floor a resource is located on.
         */
        floorName?: string | null;
        /**
         * Name of the section within a floor a resource is located in.
         */
        floorSection?: string | null;
        /**
         * The read-only auto-generated name of the calendar resource which includes metadata about the resource such as building name, floor, capacity, etc. For example, &quot;NYC-2-Training Room 1A (16)&quot;.
         */
        generatedResourceName?: string | null;
        /**
         * The type of the resource. For calendar resources, the value is admin#directory#resources#calendars#CalendarResource.
         */
        kind?: string | null;
        /**
         * The category of the calendar resource. Either CONFERENCE_ROOM or OTHER. Legacy data is set to CATEGORY_UNKNOWN.
         */
        resourceCategory?: string | null;
        /**
         * Description of the resource, visible only to admins.
         */
        resourceDescription?: string | null;
        /**
         * The read-only email for the calendar resource. Generated as part of creating a new calendar resource.
         */
        resourceEmail?: string | null;
        /**
         * The unique ID for the calendar resource.
         */
        resourceId?: string | null;
        /**
         * The name of the calendar resource. For example, &quot;Training Room 1A&quot;.
         */
        resourceName?: string | null;
        /**
         * The type of the calendar resource, intended for non-room resources.
         */
        resourceType?: string | null;
        /**
         * Description of the resource, visible to users and admins.
         */
        userVisibleDescription?: string | null;
    }
    /**
     * JSON template for Calendar Resource List Response object in Directory API.
     */
    export interface Schema$CalendarResources {
        /**
         * ETag of the resource.
         */
        etag?: string | null;
        /**
         * The CalendarResources in this page of results.
         */
        items?: Schema$CalendarResource[];
        /**
         * Identifies this as a collection of CalendarResources. This is always admin#directory#resources#calendars#calendarResourcesList.
         */
        kind?: string | null;
        /**
         * The continuation token, used to page through large result sets. Provide this value in a subsequent request to return the next page of results.
         */
        nextPageToken?: string | null;
    }
    /**
     * An notification channel used to watch for resource changes.
     */
    export interface Schema$Channel {
        /**
         * The address where notifications are delivered for this channel.
         */
        address?: string | null;
        /**
         * Date and time of notification channel expiration, expressed as a Unix timestamp, in milliseconds. Optional.
         */
        expiration?: string | null;
        /**
         * A UUID or similar unique string that identifies this channel.
         */
        id?: string | null;
        /**
         * Identifies this as a notification channel used to watch for changes to a resource, which is &quot;api#channel&quot;.
         */
        kind?: string | null;
        /**
         * Additional parameters controlling delivery channel behavior. Optional.
         */
        params?: {
            [key: string]: string;
        } | null;
        /**
         * A Boolean value to indicate whether payload is wanted. Optional.
         */
        payload?: boolean | null;
        /**
         * An opaque ID that identifies the resource being watched on this channel. Stable across different API versions.
         */
        resourceId?: string | null;
        /**
         * A version-specific identifier for the watched resource.
         */
        resourceUri?: string | null;
        /**
         * An arbitrary string delivered to the target address with each notification delivered over this channel. Optional.
         */
        token?: string | null;
        /**
         * The type of delivery mechanism used for this channel.
         */
        type?: string | null;
    }
    /**
     * JSON template for Chrome Os Device resource in Directory API.
     */
    export interface Schema$ChromeOsDevice {
        /**
         * List of active time ranges (Read-only)
         */
        activeTimeRanges?: Array<{
            activeTime?: number;
            date?: string;
        }> | null;
        /**
         * AssetId specified during enrollment or through later annotation
         */
        annotatedAssetId?: string | null;
        /**
         * Address or location of the device as noted by the administrator
         */
        annotatedLocation?: string | null;
        /**
         * User of the device
         */
        annotatedUser?: string | null;
        /**
         * (Read-only) The timestamp after which the device will stop receiving Chrome updates or support
         */
        autoUpdateExpiration?: string | null;
        /**
         * Chromebook boot mode (Read-only)
         */
        bootMode?: string | null;
        /**
         * Reports of CPU utilization and temperature (Read-only)
         */
        cpuStatusReports?: Array<{
            cpuTemperatureInfo?: Array<{
                label?: string;
                temperature?: number;
            }>;
            cpuUtilizationPercentageInfo?: number[];
            reportTime?: string;
        }> | null;
        /**
         * List of device files to download (Read-only)
         */
        deviceFiles?: Array<{
            createTime?: string;
            downloadUrl?: string;
            name?: string;
            type?: string;
        }> | null;
        /**
         * Unique identifier of Chrome OS Device (Read-only)
         */
        deviceId?: string | null;
        /**
         * Reports of disk space and other info about mounted/connected volumes.
         */
        diskVolumeReports?: Array<{
            volumeInfo?: Array<{
                storageFree?: string;
                storageTotal?: string;
                volumeId?: string;
            }>;
        }> | null;
        /**
         * (Read-only) Built-in MAC address for the docking station that the device connected to. Factory sets Media access control address (MAC address) assigned for use by a dock. Currently this is only supported on the Dell Arcada / Sarien devices and the Dell WD19 / WD19TB Docking Station. It is reserved specifically for MAC pass through device policy. The format is twelve (12) hexadecimal digits without any delimiter (uppercase letters). This is only relevant for Dell devices.
         */
        dockMacAddress?: string | null;
        /**
         * ETag of the resource.
         */
        etag?: string | null;
        /**
         * Chromebook Mac Address on ethernet network interface (Read-only)
         */
        ethernetMacAddress?: string | null;
        /**
         * (Read-only) MAC address used by the Chromebook’s internal ethernet port, and for onboard network (ethernet) interface. The format is twelve (12) hexadecimal digits without any delimiter (uppercase letters). This is only relevant for some devices.
         */
        ethernetMacAddress0?: string | null;
        /**
         * Chromebook firmware version (Read-only)
         */
        firmwareVersion?: string | null;
        /**
         * Kind of resource this is.
         */
        kind?: string | null;
        /**
         * Date and time the device was last enrolled (Read-only)
         */
        lastEnrollmentTime?: string | null;
        /**
         * Date and time the device was last synchronized with the policy settings in the G Suite administrator control panel (Read-only)
         */
        lastSync?: string | null;
        /**
         * Chromebook Mac Address on wifi network interface (Read-only)
         */
        macAddress?: string | null;
        /**
         * (Read-only) The date the device was manufactured in yyyy-mm-dd format.
         */
        manufactureDate?: string | null;
        /**
         * Contains either the Mobile Equipment identifier (MEID) or the International Mobile Equipment Identity (IMEI) for the 3G mobile card in the Chromebook (Read-only)
         */
        meid?: string | null;
        /**
         * Chromebook Model (Read-only)
         */
        model?: string | null;
        /**
         * Notes added by the administrator
         */
        notes?: string | null;
        /**
         * Chromebook order number (Read-only)
         */
        orderNumber?: string | null;
        /**
         * OrgUnit of the device
         */
        orgUnitPath?: string | null;
        /**
         * Chromebook Os Version (Read-only)
         */
        osVersion?: string | null;
        /**
         * Chromebook platform version (Read-only)
         */
        platformVersion?: string | null;
        /**
         * List of recent device users, in descending order by last login time (Read-only)
         */
        recentUsers?: Array<{
            email?: string;
            type?: string;
        }> | null;
        /**
         * Chromebook serial number (Read-only)
         */
        serialNumber?: string | null;
        /**
         * status of the device (Read-only)
         */
        status?: string | null;
        /**
         * Final date the device will be supported (Read-only)
         */
        supportEndDate?: string | null;
        /**
         * Reports of amounts of available RAM memory (Read-only)
         */
        systemRamFreeReports?: Array<{
            reportTime?: string;
            systemRamFreeInfo?: string[];
        }> | null;
        /**
         * Total RAM on the device [in bytes] (Read-only)
         */
        systemRamTotal?: string | null;
        /**
         * Trusted Platform Module (TPM) (Read-only)
         */
        tpmVersionInfo?: {
            family?: string;
            firmwareVersion?: string;
            manufacturer?: string;
            specLevel?: string;
            tpmModel?: string;
            vendorSpecific?: string;
        } | null;
        /**
         * Will Chromebook auto renew after support end date (Read-only)
         */
        willAutoRenew?: boolean | null;
    }
    /**
     * JSON request template for firing actions on ChromeOs Device in Directory Devices API.
     */
    export interface Schema$ChromeOsDeviceAction {
        /**
         * Action to be taken on the ChromeOs Device
         */
        action?: string | null;
        deprovisionReason?: string | null;
    }
    /**
     * JSON response template for List Chrome OS Devices operation in Directory API.
     */
    export interface Schema$ChromeOsDevices {
        /**
         * List of Chrome OS Device objects.
         */
        chromeosdevices?: Schema$ChromeOsDevice[];
        /**
         * ETag of the resource.
         */
        etag?: string | null;
        /**
         * Kind of resource this is.
         */
        kind?: string | null;
        /**
         * Token used to access next page of this result.
         */
        nextPageToken?: string | null;
    }
    /**
     * JSON request template for moving ChromeOs Device to given OU in Directory Devices API.
     */
    export interface Schema$ChromeOsMoveDevicesToOu {
        /**
         * ChromeOs Devices to be moved to OU
         */
        deviceIds?: string[] | null;
    }
    /**
     * JSON template for Customer Resource object in Directory API.
     */
    export interface Schema$Customer {
        /**
         * The customer&#39;s secondary contact email address. This email address cannot be on the same domain as the customerDomain
         */
        alternateEmail?: string | null;
        /**
         * The customer&#39;s creation time (Readonly)
         */
        customerCreationTime?: string | null;
        /**
         * The customer&#39;s primary domain name string. Do not include the www prefix when creating a new customer.
         */
        customerDomain?: string | null;
        /**
         * ETag of the resource.
         */
        etag?: string | null;
        /**
         * The unique ID for the customer&#39;s G Suite account. (Readonly)
         */
        id?: string | null;
        /**
         * Identifies the resource as a customer. Value: admin#directory#customer
         */
        kind?: string | null;
        /**
         * The customer&#39;s ISO 639-2 language code. The default value is en-US
         */
        language?: string | null;
        /**
         * The customer&#39;s contact phone number in E.164 format.
         */
        phoneNumber?: string | null;
        /**
         * The customer&#39;s postal address information.
         */
        postalAddress?: Schema$CustomerPostalAddress;
    }
    /**
     * JSON template for postal address of a customer.
     */
    export interface Schema$CustomerPostalAddress {
        /**
         * A customer&#39;s physical address. The address can be composed of one to three lines.
         */
        addressLine1?: string | null;
        /**
         * Address line 2 of the address.
         */
        addressLine2?: string | null;
        /**
         * Address line 3 of the address.
         */
        addressLine3?: string | null;
        /**
         * The customer contact&#39;s name.
         */
        contactName?: string | null;
        /**
         * This is a required property. For countryCode information see the ISO 3166 country code elements.
         */
        countryCode?: string | null;
        /**
         * Name of the locality. An example of a locality value is the city of San Francisco.
         */
        locality?: string | null;
        /**
         * The company or company division name.
         */
        organizationName?: string | null;
        /**
         * The postal code. A postalCode example is a postal zip code such as 10009. This is in accordance with - http://portablecontacts.net/draft-spec.html#address_element.
         */
        postalCode?: string | null;
        /**
         * Name of the region. An example of a region value is NY for the state of New York.
         */
        region?: string | null;
    }
    /**
     * JSON template for Domain Alias object in Directory API.
     */
    export interface Schema$DomainAlias {
        /**
         * The creation time of the domain alias. (Read-only).
         */
        creationTime?: string | null;
        /**
         * The domain alias name.
         */
        domainAliasName?: string | null;
        /**
         * ETag of the resource.
         */
        etag?: string | null;
        /**
         * Kind of resource this is.
         */
        kind?: string | null;
        /**
         * The parent domain name that the domain alias is associated with. This can either be a primary or secondary domain name within a customer.
         */
        parentDomainName?: string | null;
        /**
         * Indicates the verification state of a domain alias. (Read-only)
         */
        verified?: boolean | null;
    }
    /**
     * JSON response template to list domain aliases in Directory API.
     */
    export interface Schema$DomainAliases {
        /**
         * List of domain alias objects.
         */
        domainAliases?: Schema$DomainAlias[];
        /**
         * ETag of the resource.
         */
        etag?: string | null;
        /**
         * Kind of resource this is.
         */
        kind?: string | null;
    }
    /**
     * JSON template for Domain object in Directory API.
     */
    export interface Schema$Domains {
        /**
         * Creation time of the domain. (Read-only).
         */
        creationTime?: string | null;
        /**
         * List of domain alias objects. (Read-only)
         */
        domainAliases?: Schema$DomainAlias[];
        /**
         * The domain name of the customer.
         */
        domainName?: string | null;
        /**
         * ETag of the resource.
         */
        etag?: string | null;
        /**
         * Indicates if the domain is a primary domain (Read-only).
         */
        isPrimary?: boolean | null;
        /**
         * Kind of resource this is.
         */
        kind?: string | null;
        /**
         * Indicates the verification state of a domain. (Read-only).
         */
        verified?: boolean | null;
    }
    /**
     * JSON response template to list Domains in Directory API.
     */
    export interface Schema$Domains2 {
        /**
         * List of domain objects.
         */
        domains?: Schema$Domains[];
        /**
         * ETag of the resource.
         */
        etag?: string | null;
        /**
         * Kind of resource this is.
         */
        kind?: string | null;
    }
    /**
     * JSON template for Feature object in Directory API.
     */
    export interface Schema$Feature {
        /**
         * ETag of the resource.
         */
        etags?: string | null;
        /**
         * Kind of resource this is.
         */
        kind?: string | null;
        /**
         * The name of the feature.
         */
        name?: string | null;
    }
    /**
     * JSON template for a &quot;feature instance&quot;.
     */
    export interface Schema$FeatureInstance {
        /**
         * The feature that this is an instance of. A calendar resource may have multiple instances of a feature.
         */
        feature?: Schema$Feature;
    }
    /**
     * JSON request template for renaming a feature.
     */
    export interface Schema$FeatureRename {
        /**
         * New name of the feature.
         */
        newName?: string | null;
    }
    /**
     * JSON template for Feature List Response object in Directory API.
     */
    export interface Schema$Features {
        /**
         * ETag of the resource.
         */
        etag?: string | null;
        /**
         * The Features in this page of results.
         */
        features?: Schema$Feature[];
        /**
         * Kind of resource this is.
         */
        kind?: string | null;
        /**
         * The continuation token, used to page through large result sets. Provide this value in a subsequent request to return the next page of results.
         */
        nextPageToken?: string | null;
    }
    /**
     * JSON template for Group resource in Directory API.
     */
    export interface Schema$Group {
        /**
         * Is the group created by admin (Read-only) *
         */
        adminCreated?: boolean | null;
        /**
         * List of aliases (Read-only)
         */
        aliases?: string[] | null;
        /**
         * Description of the group
         */
        description?: string | null;
        /**
         * Group direct members count
         */
        directMembersCount?: string | null;
        /**
         * Email of Group
         */
        email?: string | null;
        /**
         * ETag of the resource.
         */
        etag?: string | null;
        /**
         * Unique identifier of Group (Read-only)
         */
        id?: string | null;
        /**
         * Kind of resource this is.
         */
        kind?: string | null;
        /**
         * Group name
         */
        name?: string | null;
        /**
         * List of non editable aliases (Read-only)
         */
        nonEditableAliases?: string[] | null;
    }
    /**
     * JSON response template for List Groups operation in Directory API.
     */
    export interface Schema$Groups {
        /**
         * ETag of the resource.
         */
        etag?: string | null;
        /**
         * List of group objects.
         */
        groups?: Schema$Group[];
        /**
         * Kind of resource this is.
         */
        kind?: string | null;
        /**
         * Token used to access next page of this result.
         */
        nextPageToken?: string | null;
    }
    /**
     * JSON template for Member resource in Directory API.
     */
    export interface Schema$Member {
        /**
         * Delivery settings of member
         */
        delivery_settings?: string | null;
        /**
         * Email of member (Read-only)
         */
        email?: string | null;
        /**
         * ETag of the resource.
         */
        etag?: string | null;
        /**
         * The unique ID of the group member. A member id can be used as a member request URI&#39;s memberKey. Unique identifier of group (Read-only) Unique identifier of member (Read-only)
         */
        id?: string | null;
        /**
         * Kind of resource this is.
         */
        kind?: string | null;
        /**
         * Role of member
         */
        role?: string | null;
        /**
         * Status of member (Immutable)
         */
        status?: string | null;
        /**
         * Type of member (Immutable)
         */
        type?: string | null;
    }
    /**
     * JSON response template for List Members operation in Directory API.
     */
    export interface Schema$Members {
        /**
         * ETag of the resource.
         */
        etag?: string | null;
        /**
         * Kind of resource this is.
         */
        kind?: string | null;
        /**
         * List of member objects.
         */
        members?: Schema$Member[];
        /**
         * Token used to access next page of this result.
         */
        nextPageToken?: string | null;
    }
    /**
     * JSON template for Has Member response in Directory API.
     */
    export interface Schema$MembersHasMember {
        /**
         * Identifies whether the given user is a member of the group. Membership can be direct or nested.
         */
        isMember?: boolean | null;
    }
    /**
     * JSON template for Mobile Device resource in Directory API.
     */
    export interface Schema$MobileDevice {
        /**
         * Adb (USB debugging) enabled or disabled on device (Read-only)
         */
        adbStatus?: boolean | null;
        /**
         * List of applications installed on Mobile Device
         */
        applications?: Array<{
            displayName?: string;
            packageName?: string;
            permission?: string[];
            versionCode?: number;
            versionName?: string;
        }> | null;
        /**
         * Mobile Device Baseband version (Read-only)
         */
        basebandVersion?: string | null;
        /**
         * Mobile Device Bootloader version (Read-only)
         */
        bootloaderVersion?: string | null;
        /**
         * Mobile Device Brand (Read-only)
         */
        brand?: string | null;
        /**
         * Mobile Device Build number (Read-only)
         */
        buildNumber?: string | null;
        /**
         * The default locale used on the Mobile Device (Read-only)
         */
        defaultLanguage?: string | null;
        /**
         * Developer options enabled or disabled on device (Read-only)
         */
        developerOptionsStatus?: boolean | null;
        /**
         * Mobile Device compromised status (Read-only)
         */
        deviceCompromisedStatus?: string | null;
        /**
         * Mobile Device serial number (Read-only)
         */
        deviceId?: string | null;
        /**
         * DevicePasswordStatus (Read-only)
         */
        devicePasswordStatus?: string | null;
        /**
         * List of owner user&#39;s email addresses (Read-only)
         */
        email?: string[] | null;
        /**
         * Mobile Device Encryption Status (Read-only)
         */
        encryptionStatus?: string | null;
        /**
         * ETag of the resource.
         */
        etag?: string | null;
        /**
         * Date and time the device was first synchronized with the policy settings in the G Suite administrator control panel (Read-only)
         */
        firstSync?: string | null;
        /**
         * Mobile Device Hardware (Read-only)
         */
        hardware?: string | null;
        /**
         * Mobile Device Hardware Id (Read-only)
         */
        hardwareId?: string | null;
        /**
         * Mobile Device IMEI number (Read-only)
         */
        imei?: string | null;
        /**
         * Mobile Device Kernel version (Read-only)
         */
        kernelVersion?: string | null;
        /**
         * Kind of resource this is.
         */
        kind?: string | null;
        /**
         * Date and time the device was last synchronized with the policy settings in the G Suite administrator control panel (Read-only)
         */
        lastSync?: string | null;
        /**
         * Boolean indicating if this account is on owner/primary profile or not (Read-only)
         */
        managedAccountIsOnOwnerProfile?: boolean | null;
        /**
         * Mobile Device manufacturer (Read-only)
         */
        manufacturer?: string | null;
        /**
         * Mobile Device MEID number (Read-only)
         */
        meid?: string | null;
        /**
         * Name of the model of the device
         */
        model?: string | null;
        /**
         * List of owner user&#39;s names (Read-only)
         */
        name?: string[] | null;
        /**
         * Mobile Device mobile or network operator (if available) (Read-only)
         */
        networkOperator?: string | null;
        /**
         * Name of the mobile operating system
         */
        os?: string | null;
        /**
         * List of accounts added on device (Read-only)
         */
        otherAccountsInfo?: string[] | null;
        /**
         * DMAgentPermission (Read-only)
         */
        privilege?: string | null;
        /**
         * Mobile Device release version version (Read-only)
         */
        releaseVersion?: string | null;
        /**
         * Unique identifier of Mobile Device (Read-only)
         */
        resourceId?: string | null;
        /**
         * Mobile Device Security patch level (Read-only)
         */
        securityPatchLevel?: string | null;
        /**
         * Mobile Device SSN or Serial Number (Read-only)
         */
        serialNumber?: string | null;
        /**
         * Status of the device (Read-only)
         */
        status?: string | null;
        /**
         * Work profile supported on device (Read-only)
         */
        supportsWorkProfile?: boolean | null;
        /**
         * The type of device (Read-only)
         */
        type?: string | null;
        /**
         * Unknown sources enabled or disabled on device (Read-only)
         */
        unknownSourcesStatus?: boolean | null;
        /**
         * Mobile Device user agent
         */
        userAgent?: string | null;
        /**
         * Mobile Device WiFi MAC address (Read-only)
         */
        wifiMacAddress?: string | null;
    }
    /**
     * JSON request template for firing commands on Mobile Device in Directory Devices API.
     */
    export interface Schema$MobileDeviceAction {
        /**
         * Action to be taken on the Mobile Device
         */
        action?: string | null;
    }
    /**
     * JSON response template for List Mobile Devices operation in Directory API.
     */
    export interface Schema$MobileDevices {
        /**
         * ETag of the resource.
         */
        etag?: string | null;
        /**
         * Kind of resource this is.
         */
        kind?: string | null;
        /**
         * List of Mobile Device objects.
         */
        mobiledevices?: Schema$MobileDevice[];
        /**
         * Token used to access next page of this result.
         */
        nextPageToken?: string | null;
    }
    /**
     * Template for a notification resource.
     */
    export interface Schema$Notification {
        /**
         * Body of the notification (Read-only)
         */
        body?: string | null;
        /**
         * ETag of the resource.
         */
        etag?: string | null;
        /**
         * Address from which the notification is received (Read-only)
         */
        fromAddress?: string | null;
        /**
         * Boolean indicating whether the notification is unread or not.
         */
        isUnread?: boolean | null;
        /**
         * The type of the resource.
         */
        kind?: string | null;
        notificationId?: string | null;
        /**
         * Time at which notification was sent (Read-only)
         */
        sendTime?: string | null;
        /**
         * Subject of the notification (Read-only)
         */
        subject?: string | null;
    }
    /**
     * Template for notifications list response.
     */
    export interface Schema$Notifications {
        /**
         * ETag of the resource.
         */
        etag?: string | null;
        /**
         * List of notifications in this page.
         */
        items?: Schema$Notification[];
        /**
         * The type of the resource.
         */
        kind?: string | null;
        /**
         * Token for fetching the next page of notifications.
         */
        nextPageToken?: string | null;
        /**
         * Number of unread notification for the domain.
         */
        unreadNotificationsCount?: number | null;
    }
    /**
     * JSON template for Org Unit resource in Directory API.
     */
    export interface Schema$OrgUnit {
        /**
         * Should block inheritance
         */
        blockInheritance?: boolean | null;
        /**
         * Description of OrgUnit
         */
        description?: string | null;
        /**
         * ETag of the resource.
         */
        etag?: string | null;
        /**
         * Kind of resource this is.
         */
        kind?: string | null;
        /**
         * Name of OrgUnit
         */
        name?: string | null;
        /**
         * Id of OrgUnit
         */
        orgUnitId?: string | null;
        /**
         * Path of OrgUnit
         */
        orgUnitPath?: string | null;
        /**
         * Id of parent OrgUnit
         */
        parentOrgUnitId?: string | null;
        /**
         * Path of parent OrgUnit
         */
        parentOrgUnitPath?: string | null;
    }
    /**
     * JSON response template for List Organization Units operation in Directory API.
     */
    export interface Schema$OrgUnits {
        /**
         * ETag of the resource.
         */
        etag?: string | null;
        /**
         * Kind of resource this is.
         */
        kind?: string | null;
        /**
         * List of user objects.
         */
        organizationUnits?: Schema$OrgUnit[];
    }
    /**
     * JSON template for privilege resource in Directory API.
     */
    export interface Schema$Privilege {
        /**
         * A list of child privileges. Privileges for a service form a tree. Each privilege can have a list of child privileges; this list is empty for a leaf privilege.
         */
        childPrivileges?: Schema$Privilege[];
        /**
         * ETag of the resource.
         */
        etag?: string | null;
        /**
         * If the privilege can be restricted to an organization unit.
         */
        isOuScopable?: boolean | null;
        /**
         * The type of the API resource. This is always admin#directory#privilege.
         */
        kind?: string | null;
        /**
         * The name of the privilege.
         */
        privilegeName?: string | null;
        /**
         * The obfuscated ID of the service this privilege is for. This value is returned with Privileges.list().
         */
        serviceId?: string | null;
        /**
         * The name of the service this privilege is for.
         */
        serviceName?: string | null;
    }
    /**
     * JSON response template for List privileges operation in Directory API.
     */
    export interface Schema$Privileges {
        /**
         * ETag of the resource.
         */
        etag?: string | null;
        /**
         * A list of Privilege resources.
         */
        items?: Schema$Privilege[];
        /**
         * The type of the API resource. This is always admin#directory#privileges.
         */
        kind?: string | null;
    }
    /**
     * JSON template for role resource in Directory API.
     */
    export interface Schema$Role {
        /**
         * ETag of the resource.
         */
        etag?: string | null;
        /**
         * Returns true if the role is a super admin role.
         */
        isSuperAdminRole?: boolean | null;
        /**
         * Returns true if this is a pre-defined system role.
         */
        isSystemRole?: boolean | null;
        /**
         * The type of the API resource. This is always admin#directory#role.
         */
        kind?: string | null;
        /**
         * A short description of the role.
         */
        roleDescription?: string | null;
        /**
         * ID of the role.
         */
        roleId?: string | null;
        /**
         * Name of the role.
         */
        roleName?: string | null;
        /**
         * The set of privileges that are granted to this role.
         */
        rolePrivileges?: Array<{
            privilegeName?: string;
            serviceId?: string;
        }> | null;
    }
    /**
     * JSON template for roleAssignment resource in Directory API.
     */
    export interface Schema$RoleAssignment {
        /**
         * The unique ID of the user this role is assigned to.
         */
        assignedTo?: string | null;
        /**
         * ETag of the resource.
         */
        etag?: string | null;
        /**
         * The type of the API resource. This is always admin#directory#roleAssignment.
         */
        kind?: string | null;
        /**
         * If the role is restricted to an organization unit, this contains the ID for the organization unit the exercise of this role is restricted to.
         */
        orgUnitId?: string | null;
        /**
         * ID of this roleAssignment.
         */
        roleAssignmentId?: string | null;
        /**
         * The ID of the role that is assigned.
         */
        roleId?: string | null;
        /**
         * The scope in which this role is assigned. Possible values are:  - CUSTOMER - ORG_UNIT
         */
        scopeType?: string | null;
    }
    /**
     * JSON response template for List roleAssignments operation in Directory API.
     */
    export interface Schema$RoleAssignments {
        /**
         * ETag of the resource.
         */
        etag?: string | null;
        /**
         * A list of RoleAssignment resources.
         */
        items?: Schema$RoleAssignment[];
        /**
         * The type of the API resource. This is always admin#directory#roleAssignments.
         */
        kind?: string | null;
        nextPageToken?: string | null;
    }
    /**
     * JSON response template for List roles operation in Directory API.
     */
    export interface Schema$Roles {
        /**
         * ETag of the resource.
         */
        etag?: string | null;
        /**
         * A list of Role resources.
         */
        items?: Schema$Role[];
        /**
         * The type of the API resource. This is always admin#directory#roles.
         */
        kind?: string | null;
        nextPageToken?: string | null;
    }
    /**
     * JSON template for Schema resource in Directory API.
     */
    export interface Schema$Schema {
        /**
         * Display name for the schema.
         */
        displayName?: string | null;
        /**
         * ETag of the resource.
         */
        etag?: string | null;
        /**
         * Fields of Schema
         */
        fields?: Schema$SchemaFieldSpec[];
        /**
         * Kind of resource this is.
         */
        kind?: string | null;
        /**
         * Unique identifier of Schema (Read-only)
         */
        schemaId?: string | null;
        /**
         * Schema name
         */
        schemaName?: string | null;
    }
    /**
     * JSON template for FieldSpec resource for Schemas in Directory API.
     */
    export interface Schema$SchemaFieldSpec {
        /**
         * Display Name of the field.
         */
        displayName?: string | null;
        /**
         * ETag of the resource.
         */
        etag?: string | null;
        /**
         * Unique identifier of Field (Read-only)
         */
        fieldId?: string | null;
        /**
         * Name of the field.
         */
        fieldName?: string | null;
        /**
         * Type of the field.
         */
        fieldType?: string | null;
        /**
         * Boolean specifying whether the field is indexed or not.
         */
        indexed?: boolean | null;
        /**
         * Kind of resource this is.
         */
        kind?: string | null;
        /**
         * Boolean specifying whether this is a multi-valued field or not.
         */
        multiValued?: boolean | null;
        /**
         * Indexing spec for a numeric field. By default, only exact match queries will be supported for numeric fields. Setting the numericIndexingSpec allows range queries to be supported.
         */
        numericIndexingSpec?: {
            maxValue?: number;
            minValue?: number;
        } | null;
        /**
         * Read ACLs on the field specifying who can view values of this field. Valid values are &quot;ALL_DOMAIN_USERS&quot; and &quot;ADMINS_AND_SELF&quot;.
         */
        readAccessType?: string | null;
    }
    /**
     * JSON response template for List Schema operation in Directory API.
     */
    export interface Schema$Schemas {
        /**
         * ETag of the resource.
         */
        etag?: string | null;
        /**
         * Kind of resource this is.
         */
        kind?: string | null;
        /**
         * List of UserSchema objects.
         */
        schemas?: Schema$Schema[];
    }
    /**
     * JSON template for token resource in Directory API.
     */
    export interface Schema$Token {
        /**
         * Whether the application is registered with Google. The value is true if the application has an anonymous Client ID.
         */
        anonymous?: boolean | null;
        /**
         * The Client ID of the application the token is issued to.
         */
        clientId?: string | null;
        /**
         * The displayable name of the application the token is issued to.
         */
        displayText?: string | null;
        /**
         * ETag of the resource.
         */
        etag?: string | null;
        /**
         * The type of the API resource. This is always admin#directory#token.
         */
        kind?: string | null;
        /**
         * Whether the token is issued to an installed application. The value is true if the application is installed to a desktop or mobile device.
         */
        nativeApp?: boolean | null;
        /**
         * A list of authorization scopes the application is granted.
         */
        scopes?: string[] | null;
        /**
         * The unique ID of the user that issued the token.
         */
        userKey?: string | null;
    }
    /**
     * JSON response template for List tokens operation in Directory API.
     */
    export interface Schema$Tokens {
        /**
         * ETag of the resource.
         */
        etag?: string | null;
        /**
         * A list of Token resources.
         */
        items?: Schema$Token[];
        /**
         * The type of the API resource. This is always admin#directory#tokenList.
         */
        kind?: string | null;
    }
    /**
     * JSON template for User object in Directory API.
     */
    export interface Schema$User {
        addresses?: any | null;
        /**
         * Indicates if user has agreed to terms (Read-only)
         */
        agreedToTerms?: boolean | null;
        /**
         * List of aliases (Read-only)
         */
        aliases?: string[] | null;
        /**
         * Indicates if user is archived.
         */
        archived?: boolean | null;
        /**
         * Boolean indicating if the user should change password in next login
         */
        changePasswordAtNextLogin?: boolean | null;
        /**
         * User&#39;s G Suite account creation time. (Read-only)
         */
        creationTime?: string | null;
        /**
         * CustomerId of User (Read-only)
         */
        customerId?: string | null;
        /**
         * Custom fields of the user.
         */
        customSchemas?: {
            [key: string]: Schema$UserCustomProperties;
        } | null;
        deletionTime?: string | null;
        emails?: any | null;
        /**
         * ETag of the resource.
         */
        etag?: string | null;
        externalIds?: any | null;
        gender?: any | null;
        /**
         * Hash function name for password. Supported are MD5, SHA-1 and crypt
         */
        hashFunction?: string | null;
        /**
         * Unique identifier of User (Read-only)
         */
        id?: string | null;
        ims?: any | null;
        /**
         * Boolean indicating if user is included in Global Address List
         */
        includeInGlobalAddressList?: boolean | null;
        /**
         * Boolean indicating if ip is whitelisted
         */
        ipWhitelisted?: boolean | null;
        /**
         * Boolean indicating if the user is admin (Read-only)
         */
        isAdmin?: boolean | null;
        /**
         * Boolean indicating if the user is delegated admin (Read-only)
         */
        isDelegatedAdmin?: boolean | null;
        /**
         * Is 2-step verification enforced (Read-only)
         */
        isEnforcedIn2Sv?: boolean | null;
        /**
         * Is enrolled in 2-step verification (Read-only)
         */
        isEnrolledIn2Sv?: boolean | null;
        /**
         * Is mailbox setup (Read-only)
         */
        isMailboxSetup?: boolean | null;
        keywords?: any | null;
        /**
         * Kind of resource this is.
         */
        kind?: string | null;
        languages?: any | null;
        /**
         * User&#39;s last login time. (Read-only)
         */
        lastLoginTime?: string | null;
        locations?: any | null;
        /**
         * User&#39;s name
         */
        name?: Schema$UserName;
        /**
         * List of non editable aliases (Read-only)
         */
        nonEditableAliases?: string[] | null;
        notes?: any | null;
        organizations?: any | null;
        /**
         * OrgUnit of User
         */
        orgUnitPath?: string | null;
        /**
         * User&#39;s password
         */
        password?: string | null;
        phones?: any | null;
        posixAccounts?: any | null;
        /**
         * username of User
         */
        primaryEmail?: string | null;
        /**
         * Recovery email of the user.
         */
        recoveryEmail?: string | null;
        /**
         * Recovery phone of the user. The phone number must be in the E.164 format, starting with the plus sign (+). Example: +16506661212.
         */
        recoveryPhone?: string | null;
        relations?: any | null;
        sshPublicKeys?: any | null;
        /**
         * Indicates if user is suspended.
         */
        suspended?: boolean | null;
        /**
         * Suspension reason if user is suspended (Read-only)
         */
        suspensionReason?: string | null;
        /**
         * ETag of the user&#39;s photo (Read-only)
         */
        thumbnailPhotoEtag?: string | null;
        /**
         * Photo Url of the user (Read-only)
         */
        thumbnailPhotoUrl?: string | null;
        websites?: any | null;
    }
    /**
     * JSON template for About (notes) of a user in Directory API.
     */
    export interface Schema$UserAbout {
        /**
         * About entry can have a type which indicates the content type. It can either be plain or html. By default, notes contents are assumed to contain plain text.
         */
        contentType?: string | null;
        /**
         * Actual value of notes.
         */
        value?: string | null;
    }
    /**
     * JSON template for address.
     */
    export interface Schema$UserAddress {
        /**
         * Country.
         */
        country?: string | null;
        /**
         * Country code.
         */
        countryCode?: string | null;
        /**
         * Custom type.
         */
        customType?: string | null;
        /**
         * Extended Address.
         */
        extendedAddress?: string | null;
        /**
         * Formatted address.
         */
        formatted?: string | null;
        /**
         * Locality.
         */
        locality?: string | null;
        /**
         * Other parts of address.
         */
        poBox?: string | null;
        /**
         * Postal code.
         */
        postalCode?: string | null;
        /**
         * If this is user&#39;s primary address. Only one entry could be marked as primary.
         */
        primary?: boolean | null;
        /**
         * Region.
         */
        region?: string | null;
        /**
         * User supplied address was structured. Structured addresses are NOT supported at this time. You might be able to write structured addresses, but any values will eventually be clobbered.
         */
        sourceIsStructured?: boolean | null;
        /**
         * Street.
         */
        streetAddress?: string | null;
        /**
         * Each entry can have a type which indicates standard values of that entry. For example address could be of home, work etc. In addition to the standard type, an entry can have a custom type and can take any value. Such type should have the CUSTOM value as type and also have a customType value.
         */
        type?: string | null;
    }
    /**
     * JSON template for a set of custom properties (i.e. all fields in a particular schema)
     */
    export interface Schema$UserCustomProperties {
    }
    /**
     * JSON template for an email.
     */
    export interface Schema$UserEmail {
        /**
         * Email id of the user.
         */
        address?: string | null;
        /**
         * Custom Type.
         */
        customType?: string | null;
        /**
         * If this is user&#39;s primary email. Only one entry could be marked as primary.
         */
        primary?: boolean | null;
        /**
         * Each entry can have a type which indicates standard types of that entry. For example email could be of home, work etc. In addition to the standard type, an entry can have a custom type and can take any value Such types should have the CUSTOM value as type and also have a customType value.
         */
        type?: string | null;
    }
    /**
     * JSON template for an externalId entry.
     */
    export interface Schema$UserExternalId {
        /**
         * Custom type.
         */
        customType?: string | null;
        /**
         * The type of the Id.
         */
        type?: string | null;
        /**
         * The value of the id.
         */
        value?: string | null;
    }
    export interface Schema$UserGender {
        /**
         * AddressMeAs. A human-readable string containing the proper way to refer to the profile owner by humans, for example &quot;he/him/his&quot; or &quot;they/them/their&quot;.
         */
        addressMeAs?: string | null;
        /**
         * Custom gender.
         */
        customGender?: string | null;
        /**
         * Gender.
         */
        type?: string | null;
    }
    /**
     * JSON template for instant messenger of an user.
     */
    export interface Schema$UserIm {
        /**
         * Custom protocol.
         */
        customProtocol?: string | null;
        /**
         * Custom type.
         */
        customType?: string | null;
        /**
         * Instant messenger id.
         */
        im?: string | null;
        /**
         * If this is user&#39;s primary im. Only one entry could be marked as primary.
         */
        primary?: boolean | null;
        /**
         * Protocol used in the instant messenger. It should be one of the values from ImProtocolTypes map. Similar to type, it can take a CUSTOM value and specify the custom name in customProtocol field.
         */
        protocol?: string | null;
        /**
         * Each entry can have a type which indicates standard types of that entry. For example instant messengers could be of home, work etc. In addition to the standard type, an entry can have a custom type and can take any value. Such types should have the CUSTOM value as type and also have a customType value.
         */
        type?: string | null;
    }
    /**
     * JSON template for a keyword entry.
     */
    export interface Schema$UserKeyword {
        /**
         * Custom Type.
         */
        customType?: string | null;
        /**
         * Each entry can have a type which indicates standard type of that entry. For example, keyword could be of type occupation or outlook. In addition to the standard type, an entry can have a custom type and can give it any name. Such types should have the CUSTOM value as type and also have a customType value.
         */
        type?: string | null;
        /**
         * Keyword.
         */
        value?: string | null;
    }
    /**
     * JSON template for a language entry.
     */
    export interface Schema$UserLanguage {
        /**
         * Other language. User can provide own language name if there is no corresponding Google III language code. If this is set LanguageCode can&#39;t be set
         */
        customLanguage?: string | null;
        /**
         * Language Code. Should be used for storing Google III LanguageCode string representation for language. Illegal values cause SchemaException.
         */
        languageCode?: string | null;
    }
    /**
     * JSON template for a location entry.
     */
    export interface Schema$UserLocation {
        /**
         * Textual location. This is most useful for display purposes to concisely describe the location. For example, &quot;Mountain View, CA&quot;, &quot;Near Seattle&quot;, &quot;US-NYC-9TH 9A209A&quot;.
         */
        area?: string | null;
        /**
         * Building Identifier.
         */
        buildingId?: string | null;
        /**
         * Custom Type.
         */
        customType?: string | null;
        /**
         * Most specific textual code of individual desk location.
         */
        deskCode?: string | null;
        /**
         * Floor name/number.
         */
        floorName?: string | null;
        /**
         * Floor section. More specific location within the floor. For example, if a floor is divided into sections &quot;A&quot;, &quot;B&quot;, and &quot;C&quot;, this field would identify one of those values.
         */
        floorSection?: string | null;
        /**
         * Each entry can have a type which indicates standard types of that entry. For example location could be of types default and desk. In addition to standard type, an entry can have a custom type and can give it any name. Such types should have &quot;custom&quot; as type and also have a customType value.
         */
        type?: string | null;
    }
    /**
     * JSON request template for setting/revoking admin status of a user in Directory API.
     */
    export interface Schema$UserMakeAdmin {
        /**
         * Boolean indicating new admin status of the user
         */
        status?: boolean | null;
    }
    /**
     * JSON template for name of a user in Directory API.
     */
    export interface Schema$UserName {
        /**
         * Last Name
         */
        familyName?: string | null;
        /**
         * Full Name
         */
        fullName?: string | null;
        /**
         * First Name
         */
        givenName?: string | null;
    }
    /**
     * JSON template for an organization entry.
     */
    export interface Schema$UserOrganization {
        /**
         * The cost center of the users department.
         */
        costCenter?: string | null;
        /**
         * Custom type.
         */
        customType?: string | null;
        /**
         * Department within the organization.
         */
        department?: string | null;
        /**
         * Description of the organization.
         */
        description?: string | null;
        /**
         * The domain to which the organization belongs to.
         */
        domain?: string | null;
        /**
         * The full-time equivalent millipercent within the organization (100000 = 100%).
         */
        fullTimeEquivalent?: number | null;
        /**
         * Location of the organization. This need not be fully qualified address.
         */
        location?: string | null;
        /**
         * Name of the organization
         */
        name?: string | null;
        /**
         * If it user&#39;s primary organization.
         */
        primary?: boolean | null;
        /**
         * Symbol of the organization.
         */
        symbol?: string | null;
        /**
         * Title (designation) of the user in the organization.
         */
        title?: string | null;
        /**
         * Each entry can have a type which indicates standard types of that entry. For example organization could be of school, work etc. In addition to the standard type, an entry can have a custom type and can give it any name. Such types should have the CUSTOM value as type and also have a CustomType value.
         */
        type?: string | null;
    }
    /**
     * JSON template for a phone entry.
     */
    export interface Schema$UserPhone {
        /**
         * Custom Type.
         */
        customType?: string | null;
        /**
         * If this is user&#39;s primary phone or not.
         */
        primary?: boolean | null;
        /**
         * Each entry can have a type which indicates standard types of that entry. For example phone could be of home_fax, work, mobile etc. In addition to the standard type, an entry can have a custom type and can give it any name. Such types should have the CUSTOM value as type and also have a customType value.
         */
        type?: string | null;
        /**
         * Phone number.
         */
        value?: string | null;
    }
    /**
     * JSON template for Photo object in Directory API.
     */
    export interface Schema$UserPhoto {
        /**
         * ETag of the resource.
         */
        etag?: string | null;
        /**
         * Height in pixels of the photo
         */
        height?: number | null;
        /**
         * Unique identifier of User (Read-only)
         */
        id?: string | null;
        /**
         * Kind of resource this is.
         */
        kind?: string | null;
        /**
         * Mime Type of the photo
         */
        mimeType?: string | null;
        /**
         * Base64 encoded photo data
         */
        photoData?: string | null;
        /**
         * Primary email of User (Read-only)
         */
        primaryEmail?: string | null;
        /**
         * Width in pixels of the photo
         */
        width?: number | null;
    }
    /**
     * JSON template for a POSIX account entry. Description of the field family: go/fbs-posix.
     */
    export interface Schema$UserPosixAccount {
        /**
         * A POSIX account field identifier.
         */
        accountId?: string | null;
        /**
         * The GECOS (user information) for this account.
         */
        gecos?: string | null;
        /**
         * The default group ID.
         */
        gid?: string | null;
        /**
         * The path to the home directory for this account.
         */
        homeDirectory?: string | null;
        /**
         * The operating system type for this account.
         */
        operatingSystemType?: string | null;
        /**
         * If this is user&#39;s primary account within the SystemId.
         */
        primary?: boolean | null;
        /**
         * The path to the login shell for this account.
         */
        shell?: string | null;
        /**
         * System identifier for which account Username or Uid apply to.
         */
        systemId?: string | null;
        /**
         * The POSIX compliant user ID.
         */
        uid?: string | null;
        /**
         * The username of the account.
         */
        username?: string | null;
    }
    /**
     * JSON template for a relation entry.
     */
    export interface Schema$UserRelation {
        /**
         * Custom Type.
         */
        customType?: string | null;
        /**
         * The relation of the user. Some of the possible values are mother, father, sister, brother, manager, assistant, partner.
         */
        type?: string | null;
        /**
         * The name of the relation.
         */
        value?: string | null;
    }
    /**
     * JSON response template for List Users operation in Apps Directory API.
     */
    export interface Schema$Users {
        /**
         * ETag of the resource.
         */
        etag?: string | null;
        /**
         * Kind of resource this is.
         */
        kind?: string | null;
        /**
         * Token used to access next page of this result.
         */
        nextPageToken?: string | null;
        /**
         * Event that triggered this response (only used in case of Push Response)
         */
        trigger_event?: string | null;
        /**
         * List of user objects.
         */
        users?: Schema$User[];
    }
    /**
     * JSON template for a POSIX account entry.
     */
    export interface Schema$UserSshPublicKey {
        /**
         * An expiration time in microseconds since epoch.
         */
        expirationTimeUsec?: string | null;
        /**
         * A SHA-256 fingerprint of the SSH public key. (Read-only)
         */
        fingerprint?: string | null;
        /**
         * An SSH public key.
         */
        key?: string | null;
    }
    /**
     * JSON request template to undelete a user in Directory API.
     */
    export interface Schema$UserUndelete {
        /**
         * OrgUnit of User
         */
        orgUnitPath?: string | null;
    }
    /**
     * JSON template for a website entry.
     */
    export interface Schema$UserWebsite {
        /**
         * Custom Type.
         */
        customType?: string | null;
        /**
         * If this is user&#39;s primary website or not.
         */
        primary?: boolean | null;
        /**
         * Each entry can have a type which indicates standard types of that entry. For example website could be of home, work, blog etc. In addition to the standard type, an entry can have a custom type and can give it any name. Such types should have the CUSTOM value as type and also have a customType value.
         */
        type?: string | null;
        /**
         * Website.
         */
        value?: string | null;
    }
    /**
     * JSON template for verification codes in Directory API.
     */
    export interface Schema$VerificationCode {
        /**
         * ETag of the resource.
         */
        etag?: string | null;
        /**
         * The type of the resource. This is always admin#directory#verificationCode.
         */
        kind?: string | null;
        /**
         * The obfuscated unique ID of the user.
         */
        userId?: string | null;
        /**
         * A current verification code for the user. Invalidated or used verification codes are not returned as part of the result.
         */
        verificationCode?: string | null;
    }
    /**
     * JSON response template for List verification codes operation in Directory API.
     */
    export interface Schema$VerificationCodes {
        /**
         * ETag of the resource.
         */
        etag?: string | null;
        /**
         * A list of verification code resources.
         */
        items?: Schema$VerificationCode[];
        /**
         * The type of the resource. This is always admin#directory#verificationCodesList.
         */
        kind?: string | null;
    }
    export class Resource$Asps {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * directory.asps.delete
         * @desc Delete an ASP issued by a user.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.user.security'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.asps.delete({
         *     // The unique ID of the ASP to be deleted.
         *     codeId: 'placeholder-value',
         *     // Identifies the user in the API request. The value can be the user's primary email address, alias email address, or unique user ID.
         *     userKey: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.asps.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer} params.codeId The unique ID of the ASP to be deleted.
         * @param {string} params.userKey Identifies the user in the API request. The value can be the user's primary email address, alias email address, or unique user ID.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Asps$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Asps$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Asps$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Asps$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Asps$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * directory.asps.get
         * @desc Get information about an ASP issued by a user.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.user.security'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.asps.get({
         *     // The unique ID of the ASP.
         *     codeId: 'placeholder-value',
         *     // Identifies the user in the API request. The value can be the user's primary email address, alias email address, or unique user ID.
         *     userKey: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "codeId": 0,
         *   //   "creationTime": "my_creationTime",
         *   //   "etag": "my_etag",
         *   //   "kind": "my_kind",
         *   //   "lastTimeUsed": "my_lastTimeUsed",
         *   //   "name": "my_name",
         *   //   "userKey": "my_userKey"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.asps.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer} params.codeId The unique ID of the ASP.
         * @param {string} params.userKey Identifies the user in the API request. The value can be the user's primary email address, alias email address, or unique user ID.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Asps$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Asps$Get, options?: MethodOptions): GaxiosPromise<Schema$Asp>;
        get(params: Params$Resource$Asps$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Asps$Get, options: MethodOptions | BodyResponseCallback<Schema$Asp>, callback: BodyResponseCallback<Schema$Asp>): void;
        get(params: Params$Resource$Asps$Get, callback: BodyResponseCallback<Schema$Asp>): void;
        get(callback: BodyResponseCallback<Schema$Asp>): void;
        /**
         * directory.asps.list
         * @desc List the ASPs issued by a user.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.user.security'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.asps.list({
         *     // Identifies the user in the API request. The value can be the user's primary email address, alias email address, or unique user ID.
         *     userKey: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "etag": "my_etag",
         *   //   "items": [],
         *   //   "kind": "my_kind"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.asps.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.userKey Identifies the user in the API request. The value can be the user's primary email address, alias email address, or unique user ID.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Asps$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Asps$List, options?: MethodOptions): GaxiosPromise<Schema$Asps>;
        list(params: Params$Resource$Asps$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Asps$List, options: MethodOptions | BodyResponseCallback<Schema$Asps>, callback: BodyResponseCallback<Schema$Asps>): void;
        list(params: Params$Resource$Asps$List, callback: BodyResponseCallback<Schema$Asps>): void;
        list(callback: BodyResponseCallback<Schema$Asps>): void;
    }
    export interface Params$Resource$Asps$Delete extends StandardParameters {
        /**
         * The unique ID of the ASP to be deleted.
         */
        codeId?: number;
        /**
         * Identifies the user in the API request. The value can be the user's primary email address, alias email address, or unique user ID.
         */
        userKey?: string;
    }
    export interface Params$Resource$Asps$Get extends StandardParameters {
        /**
         * The unique ID of the ASP.
         */
        codeId?: number;
        /**
         * Identifies the user in the API request. The value can be the user's primary email address, alias email address, or unique user ID.
         */
        userKey?: string;
    }
    export interface Params$Resource$Asps$List extends StandardParameters {
        /**
         * Identifies the user in the API request. The value can be the user's primary email address, alias email address, or unique user ID.
         */
        userKey?: string;
    }
    export class Resource$Channels {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * admin.channels.stop
         * @desc Stop watching resources through this channel
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.user',
         *       'https://www.googleapis.com/auth/admin.directory.user.alias',
         *       'https://www.googleapis.com/auth/admin.directory.user.alias.readonly',
         *       'https://www.googleapis.com/auth/admin.directory.user.readonly',
         *       'https://www.googleapis.com/auth/cloud-platform',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await admin.channels.stop({
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "address": "my_address",
         *       //   "expiration": "my_expiration",
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "params": {},
         *       //   "payload": false,
         *       //   "resourceId": "my_resourceId",
         *       //   "resourceUri": "my_resourceUri",
         *       //   "token": "my_token",
         *       //   "type": "my_type"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias admin.channels.stop
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {().Channel} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        stop(params: Params$Resource$Channels$Stop, options: StreamMethodOptions): GaxiosPromise<Readable>;
        stop(params?: Params$Resource$Channels$Stop, options?: MethodOptions): GaxiosPromise<void>;
        stop(params: Params$Resource$Channels$Stop, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        stop(params: Params$Resource$Channels$Stop, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        stop(params: Params$Resource$Channels$Stop, callback: BodyResponseCallback<void>): void;
        stop(callback: BodyResponseCallback<void>): void;
    }
    export interface Params$Resource$Channels$Stop extends StandardParameters {
        /**
         * Request body metadata
         */
        requestBody?: Schema$Channel;
    }
    export class Resource$Chromeosdevices {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * directory.chromeosdevices.action
         * @desc Take action on Chrome OS Device
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.device.chromeos'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.chromeosdevices.action({
         *     // Immutable ID of the G Suite account
         *     customerId: 'placeholder-value',
         *     // Immutable ID of Chrome OS Device
         *     resourceId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "action": "my_action",
         *       //   "deprovisionReason": "my_deprovisionReason"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.chromeosdevices.action
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customerId Immutable ID of the G Suite account
         * @param {string} params.resourceId Immutable ID of Chrome OS Device
         * @param {().ChromeOsDeviceAction} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        action(params: Params$Resource$Chromeosdevices$Action, options: StreamMethodOptions): GaxiosPromise<Readable>;
        action(params?: Params$Resource$Chromeosdevices$Action, options?: MethodOptions): GaxiosPromise<void>;
        action(params: Params$Resource$Chromeosdevices$Action, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        action(params: Params$Resource$Chromeosdevices$Action, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        action(params: Params$Resource$Chromeosdevices$Action, callback: BodyResponseCallback<void>): void;
        action(callback: BodyResponseCallback<void>): void;
        /**
         * directory.chromeosdevices.get
         * @desc Retrieve Chrome OS Device
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.device.chromeos',
         *       'https://www.googleapis.com/auth/admin.directory.device.chromeos.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.chromeosdevices.get({
         *     // Immutable ID of the G Suite account
         *     customerId: 'placeholder-value',
         *     // Immutable ID of Chrome OS Device
         *     deviceId: 'placeholder-value',
         *     // Restrict information returned to a set of selected fields.
         *     projection: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "activeTimeRanges": [],
         *   //   "annotatedAssetId": "my_annotatedAssetId",
         *   //   "annotatedLocation": "my_annotatedLocation",
         *   //   "annotatedUser": "my_annotatedUser",
         *   //   "autoUpdateExpiration": "my_autoUpdateExpiration",
         *   //   "bootMode": "my_bootMode",
         *   //   "cpuStatusReports": [],
         *   //   "deviceFiles": [],
         *   //   "deviceId": "my_deviceId",
         *   //   "diskVolumeReports": [],
         *   //   "dockMacAddress": "my_dockMacAddress",
         *   //   "etag": "my_etag",
         *   //   "ethernetMacAddress": "my_ethernetMacAddress",
         *   //   "ethernetMacAddress0": "my_ethernetMacAddress0",
         *   //   "firmwareVersion": "my_firmwareVersion",
         *   //   "kind": "my_kind",
         *   //   "lastEnrollmentTime": "my_lastEnrollmentTime",
         *   //   "lastSync": "my_lastSync",
         *   //   "macAddress": "my_macAddress",
         *   //   "manufactureDate": "my_manufactureDate",
         *   //   "meid": "my_meid",
         *   //   "model": "my_model",
         *   //   "notes": "my_notes",
         *   //   "orderNumber": "my_orderNumber",
         *   //   "orgUnitPath": "my_orgUnitPath",
         *   //   "osVersion": "my_osVersion",
         *   //   "platformVersion": "my_platformVersion",
         *   //   "recentUsers": [],
         *   //   "serialNumber": "my_serialNumber",
         *   //   "status": "my_status",
         *   //   "supportEndDate": "my_supportEndDate",
         *   //   "systemRamFreeReports": [],
         *   //   "systemRamTotal": "my_systemRamTotal",
         *   //   "tpmVersionInfo": {},
         *   //   "willAutoRenew": false
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.chromeosdevices.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customerId Immutable ID of the G Suite account
         * @param {string} params.deviceId Immutable ID of Chrome OS Device
         * @param {string=} params.projection Restrict information returned to a set of selected fields.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Chromeosdevices$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Chromeosdevices$Get, options?: MethodOptions): GaxiosPromise<Schema$ChromeOsDevice>;
        get(params: Params$Resource$Chromeosdevices$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Chromeosdevices$Get, options: MethodOptions | BodyResponseCallback<Schema$ChromeOsDevice>, callback: BodyResponseCallback<Schema$ChromeOsDevice>): void;
        get(params: Params$Resource$Chromeosdevices$Get, callback: BodyResponseCallback<Schema$ChromeOsDevice>): void;
        get(callback: BodyResponseCallback<Schema$ChromeOsDevice>): void;
        /**
         * directory.chromeosdevices.list
         * @desc Retrieve all Chrome OS Devices of a customer (paginated)
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.device.chromeos',
         *       'https://www.googleapis.com/auth/admin.directory.device.chromeos.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.chromeosdevices.list({
         *     // Immutable ID of the G Suite account
         *     customerId: 'placeholder-value',
         *     // Maximum number of results to return. Max allowed value is 200.
         *     maxResults: 'placeholder-value',
         *     // Column to use for sorting results
         *     orderBy: 'placeholder-value',
         *     // Full path of the organizational unit or its ID
         *     orgUnitPath: 'placeholder-value',
         *     // Token to specify next page in the list
         *     pageToken: 'placeholder-value',
         *     // Restrict information returned to a set of selected fields.
         *     projection: 'placeholder-value',
         *     // Search string in the format given at http://support.google.com/chromeos/a/bin/answer.py?answer=1698333
         *     query: 'placeholder-value',
         *     // Whether to return results in ascending or descending order. Only of use when orderBy is also used
         *     sortOrder: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "chromeosdevices": [],
         *   //   "etag": "my_etag",
         *   //   "kind": "my_kind",
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.chromeosdevices.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customerId Immutable ID of the G Suite account
         * @param {integer=} params.maxResults Maximum number of results to return. Max allowed value is 200.
         * @param {string=} params.orderBy Column to use for sorting results
         * @param {string=} params.orgUnitPath Full path of the organizational unit or its ID
         * @param {string=} params.pageToken Token to specify next page in the list
         * @param {string=} params.projection Restrict information returned to a set of selected fields.
         * @param {string=} params.query Search string in the format given at http://support.google.com/chromeos/a/bin/answer.py?answer=1698333
         * @param {string=} params.sortOrder Whether to return results in ascending or descending order. Only of use when orderBy is also used
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Chromeosdevices$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Chromeosdevices$List, options?: MethodOptions): GaxiosPromise<Schema$ChromeOsDevices>;
        list(params: Params$Resource$Chromeosdevices$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Chromeosdevices$List, options: MethodOptions | BodyResponseCallback<Schema$ChromeOsDevices>, callback: BodyResponseCallback<Schema$ChromeOsDevices>): void;
        list(params: Params$Resource$Chromeosdevices$List, callback: BodyResponseCallback<Schema$ChromeOsDevices>): void;
        list(callback: BodyResponseCallback<Schema$ChromeOsDevices>): void;
        /**
         * directory.chromeosdevices.moveDevicesToOu
         * @desc Move or insert multiple Chrome OS Devices to organizational unit
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.device.chromeos'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.chromeosdevices.moveDevicesToOu({
         *     // Immutable ID of the G Suite account
         *     customerId: 'placeholder-value',
         *     // Full path of the target organizational unit or its ID
         *     orgUnitPath: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "deviceIds": []
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.chromeosdevices.moveDevicesToOu
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customerId Immutable ID of the G Suite account
         * @param {string} params.orgUnitPath Full path of the target organizational unit or its ID
         * @param {().ChromeOsMoveDevicesToOu} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        moveDevicesToOu(params: Params$Resource$Chromeosdevices$Movedevicestoou, options: StreamMethodOptions): GaxiosPromise<Readable>;
        moveDevicesToOu(params?: Params$Resource$Chromeosdevices$Movedevicestoou, options?: MethodOptions): GaxiosPromise<void>;
        moveDevicesToOu(params: Params$Resource$Chromeosdevices$Movedevicestoou, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        moveDevicesToOu(params: Params$Resource$Chromeosdevices$Movedevicestoou, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        moveDevicesToOu(params: Params$Resource$Chromeosdevices$Movedevicestoou, callback: BodyResponseCallback<void>): void;
        moveDevicesToOu(callback: BodyResponseCallback<void>): void;
        /**
         * directory.chromeosdevices.patch
         * @desc Update Chrome OS Device. This method supports patch semantics.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.device.chromeos'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.chromeosdevices.patch({
         *     // Immutable ID of the G Suite account
         *     customerId: 'placeholder-value',
         *     // Immutable ID of Chrome OS Device
         *     deviceId: 'placeholder-value',
         *     // Restrict information returned to a set of selected fields.
         *     projection: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "activeTimeRanges": [],
         *       //   "annotatedAssetId": "my_annotatedAssetId",
         *       //   "annotatedLocation": "my_annotatedLocation",
         *       //   "annotatedUser": "my_annotatedUser",
         *       //   "autoUpdateExpiration": "my_autoUpdateExpiration",
         *       //   "bootMode": "my_bootMode",
         *       //   "cpuStatusReports": [],
         *       //   "deviceFiles": [],
         *       //   "deviceId": "my_deviceId",
         *       //   "diskVolumeReports": [],
         *       //   "dockMacAddress": "my_dockMacAddress",
         *       //   "etag": "my_etag",
         *       //   "ethernetMacAddress": "my_ethernetMacAddress",
         *       //   "ethernetMacAddress0": "my_ethernetMacAddress0",
         *       //   "firmwareVersion": "my_firmwareVersion",
         *       //   "kind": "my_kind",
         *       //   "lastEnrollmentTime": "my_lastEnrollmentTime",
         *       //   "lastSync": "my_lastSync",
         *       //   "macAddress": "my_macAddress",
         *       //   "manufactureDate": "my_manufactureDate",
         *       //   "meid": "my_meid",
         *       //   "model": "my_model",
         *       //   "notes": "my_notes",
         *       //   "orderNumber": "my_orderNumber",
         *       //   "orgUnitPath": "my_orgUnitPath",
         *       //   "osVersion": "my_osVersion",
         *       //   "platformVersion": "my_platformVersion",
         *       //   "recentUsers": [],
         *       //   "serialNumber": "my_serialNumber",
         *       //   "status": "my_status",
         *       //   "supportEndDate": "my_supportEndDate",
         *       //   "systemRamFreeReports": [],
         *       //   "systemRamTotal": "my_systemRamTotal",
         *       //   "tpmVersionInfo": {},
         *       //   "willAutoRenew": false
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "activeTimeRanges": [],
         *   //   "annotatedAssetId": "my_annotatedAssetId",
         *   //   "annotatedLocation": "my_annotatedLocation",
         *   //   "annotatedUser": "my_annotatedUser",
         *   //   "autoUpdateExpiration": "my_autoUpdateExpiration",
         *   //   "bootMode": "my_bootMode",
         *   //   "cpuStatusReports": [],
         *   //   "deviceFiles": [],
         *   //   "deviceId": "my_deviceId",
         *   //   "diskVolumeReports": [],
         *   //   "dockMacAddress": "my_dockMacAddress",
         *   //   "etag": "my_etag",
         *   //   "ethernetMacAddress": "my_ethernetMacAddress",
         *   //   "ethernetMacAddress0": "my_ethernetMacAddress0",
         *   //   "firmwareVersion": "my_firmwareVersion",
         *   //   "kind": "my_kind",
         *   //   "lastEnrollmentTime": "my_lastEnrollmentTime",
         *   //   "lastSync": "my_lastSync",
         *   //   "macAddress": "my_macAddress",
         *   //   "manufactureDate": "my_manufactureDate",
         *   //   "meid": "my_meid",
         *   //   "model": "my_model",
         *   //   "notes": "my_notes",
         *   //   "orderNumber": "my_orderNumber",
         *   //   "orgUnitPath": "my_orgUnitPath",
         *   //   "osVersion": "my_osVersion",
         *   //   "platformVersion": "my_platformVersion",
         *   //   "recentUsers": [],
         *   //   "serialNumber": "my_serialNumber",
         *   //   "status": "my_status",
         *   //   "supportEndDate": "my_supportEndDate",
         *   //   "systemRamFreeReports": [],
         *   //   "systemRamTotal": "my_systemRamTotal",
         *   //   "tpmVersionInfo": {},
         *   //   "willAutoRenew": false
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.chromeosdevices.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customerId Immutable ID of the G Suite account
         * @param {string} params.deviceId Immutable ID of Chrome OS Device
         * @param {string=} params.projection Restrict information returned to a set of selected fields.
         * @param {().ChromeOsDevice} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Chromeosdevices$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Chromeosdevices$Patch, options?: MethodOptions): GaxiosPromise<Schema$ChromeOsDevice>;
        patch(params: Params$Resource$Chromeosdevices$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Chromeosdevices$Patch, options: MethodOptions | BodyResponseCallback<Schema$ChromeOsDevice>, callback: BodyResponseCallback<Schema$ChromeOsDevice>): void;
        patch(params: Params$Resource$Chromeosdevices$Patch, callback: BodyResponseCallback<Schema$ChromeOsDevice>): void;
        patch(callback: BodyResponseCallback<Schema$ChromeOsDevice>): void;
        /**
         * directory.chromeosdevices.update
         * @desc Update Chrome OS Device
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.device.chromeos'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.chromeosdevices.update({
         *     // Immutable ID of the G Suite account
         *     customerId: 'placeholder-value',
         *     // Immutable ID of Chrome OS Device
         *     deviceId: 'placeholder-value',
         *     // Restrict information returned to a set of selected fields.
         *     projection: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "activeTimeRanges": [],
         *       //   "annotatedAssetId": "my_annotatedAssetId",
         *       //   "annotatedLocation": "my_annotatedLocation",
         *       //   "annotatedUser": "my_annotatedUser",
         *       //   "autoUpdateExpiration": "my_autoUpdateExpiration",
         *       //   "bootMode": "my_bootMode",
         *       //   "cpuStatusReports": [],
         *       //   "deviceFiles": [],
         *       //   "deviceId": "my_deviceId",
         *       //   "diskVolumeReports": [],
         *       //   "dockMacAddress": "my_dockMacAddress",
         *       //   "etag": "my_etag",
         *       //   "ethernetMacAddress": "my_ethernetMacAddress",
         *       //   "ethernetMacAddress0": "my_ethernetMacAddress0",
         *       //   "firmwareVersion": "my_firmwareVersion",
         *       //   "kind": "my_kind",
         *       //   "lastEnrollmentTime": "my_lastEnrollmentTime",
         *       //   "lastSync": "my_lastSync",
         *       //   "macAddress": "my_macAddress",
         *       //   "manufactureDate": "my_manufactureDate",
         *       //   "meid": "my_meid",
         *       //   "model": "my_model",
         *       //   "notes": "my_notes",
         *       //   "orderNumber": "my_orderNumber",
         *       //   "orgUnitPath": "my_orgUnitPath",
         *       //   "osVersion": "my_osVersion",
         *       //   "platformVersion": "my_platformVersion",
         *       //   "recentUsers": [],
         *       //   "serialNumber": "my_serialNumber",
         *       //   "status": "my_status",
         *       //   "supportEndDate": "my_supportEndDate",
         *       //   "systemRamFreeReports": [],
         *       //   "systemRamTotal": "my_systemRamTotal",
         *       //   "tpmVersionInfo": {},
         *       //   "willAutoRenew": false
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "activeTimeRanges": [],
         *   //   "annotatedAssetId": "my_annotatedAssetId",
         *   //   "annotatedLocation": "my_annotatedLocation",
         *   //   "annotatedUser": "my_annotatedUser",
         *   //   "autoUpdateExpiration": "my_autoUpdateExpiration",
         *   //   "bootMode": "my_bootMode",
         *   //   "cpuStatusReports": [],
         *   //   "deviceFiles": [],
         *   //   "deviceId": "my_deviceId",
         *   //   "diskVolumeReports": [],
         *   //   "dockMacAddress": "my_dockMacAddress",
         *   //   "etag": "my_etag",
         *   //   "ethernetMacAddress": "my_ethernetMacAddress",
         *   //   "ethernetMacAddress0": "my_ethernetMacAddress0",
         *   //   "firmwareVersion": "my_firmwareVersion",
         *   //   "kind": "my_kind",
         *   //   "lastEnrollmentTime": "my_lastEnrollmentTime",
         *   //   "lastSync": "my_lastSync",
         *   //   "macAddress": "my_macAddress",
         *   //   "manufactureDate": "my_manufactureDate",
         *   //   "meid": "my_meid",
         *   //   "model": "my_model",
         *   //   "notes": "my_notes",
         *   //   "orderNumber": "my_orderNumber",
         *   //   "orgUnitPath": "my_orgUnitPath",
         *   //   "osVersion": "my_osVersion",
         *   //   "platformVersion": "my_platformVersion",
         *   //   "recentUsers": [],
         *   //   "serialNumber": "my_serialNumber",
         *   //   "status": "my_status",
         *   //   "supportEndDate": "my_supportEndDate",
         *   //   "systemRamFreeReports": [],
         *   //   "systemRamTotal": "my_systemRamTotal",
         *   //   "tpmVersionInfo": {},
         *   //   "willAutoRenew": false
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.chromeosdevices.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customerId Immutable ID of the G Suite account
         * @param {string} params.deviceId Immutable ID of Chrome OS Device
         * @param {string=} params.projection Restrict information returned to a set of selected fields.
         * @param {().ChromeOsDevice} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Chromeosdevices$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Chromeosdevices$Update, options?: MethodOptions): GaxiosPromise<Schema$ChromeOsDevice>;
        update(params: Params$Resource$Chromeosdevices$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Chromeosdevices$Update, options: MethodOptions | BodyResponseCallback<Schema$ChromeOsDevice>, callback: BodyResponseCallback<Schema$ChromeOsDevice>): void;
        update(params: Params$Resource$Chromeosdevices$Update, callback: BodyResponseCallback<Schema$ChromeOsDevice>): void;
        update(callback: BodyResponseCallback<Schema$ChromeOsDevice>): void;
    }
    export interface Params$Resource$Chromeosdevices$Action extends StandardParameters {
        /**
         * Immutable ID of the G Suite account
         */
        customerId?: string;
        /**
         * Immutable ID of Chrome OS Device
         */
        resourceId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$ChromeOsDeviceAction;
    }
    export interface Params$Resource$Chromeosdevices$Get extends StandardParameters {
        /**
         * Immutable ID of the G Suite account
         */
        customerId?: string;
        /**
         * Immutable ID of Chrome OS Device
         */
        deviceId?: string;
        /**
         * Restrict information returned to a set of selected fields.
         */
        projection?: string;
    }
    export interface Params$Resource$Chromeosdevices$List extends StandardParameters {
        /**
         * Immutable ID of the G Suite account
         */
        customerId?: string;
        /**
         * Maximum number of results to return. Max allowed value is 200.
         */
        maxResults?: number;
        /**
         * Column to use for sorting results
         */
        orderBy?: string;
        /**
         * Full path of the organizational unit or its ID
         */
        orgUnitPath?: string;
        /**
         * Token to specify next page in the list
         */
        pageToken?: string;
        /**
         * Restrict information returned to a set of selected fields.
         */
        projection?: string;
        /**
         * Search string in the format given at http://support.google.com/chromeos/a/bin/answer.py?answer=1698333
         */
        query?: string;
        /**
         * Whether to return results in ascending or descending order. Only of use when orderBy is also used
         */
        sortOrder?: string;
    }
    export interface Params$Resource$Chromeosdevices$Movedevicestoou extends StandardParameters {
        /**
         * Immutable ID of the G Suite account
         */
        customerId?: string;
        /**
         * Full path of the target organizational unit or its ID
         */
        orgUnitPath?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$ChromeOsMoveDevicesToOu;
    }
    export interface Params$Resource$Chromeosdevices$Patch extends StandardParameters {
        /**
         * Immutable ID of the G Suite account
         */
        customerId?: string;
        /**
         * Immutable ID of Chrome OS Device
         */
        deviceId?: string;
        /**
         * Restrict information returned to a set of selected fields.
         */
        projection?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$ChromeOsDevice;
    }
    export interface Params$Resource$Chromeosdevices$Update extends StandardParameters {
        /**
         * Immutable ID of the G Suite account
         */
        customerId?: string;
        /**
         * Immutable ID of Chrome OS Device
         */
        deviceId?: string;
        /**
         * Restrict information returned to a set of selected fields.
         */
        projection?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$ChromeOsDevice;
    }
    export class Resource$Customers {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * directory.customers.get
         * @desc Retrieves a customer.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.customer',
         *       'https://www.googleapis.com/auth/admin.directory.customer.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.customers.get({
         *     // Id of the customer to be retrieved
         *     customerKey: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "alternateEmail": "my_alternateEmail",
         *   //   "customerCreationTime": "my_customerCreationTime",
         *   //   "customerDomain": "my_customerDomain",
         *   //   "etag": "my_etag",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "language": "my_language",
         *   //   "phoneNumber": "my_phoneNumber",
         *   //   "postalAddress": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.customers.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customerKey Id of the customer to be retrieved
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
         * directory.customers.patch
         * @desc Updates a customer. This method supports patch semantics.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.customer'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.customers.patch({
         *     // Id of the customer to be updated
         *     customerKey: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "alternateEmail": "my_alternateEmail",
         *       //   "customerCreationTime": "my_customerCreationTime",
         *       //   "customerDomain": "my_customerDomain",
         *       //   "etag": "my_etag",
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "language": "my_language",
         *       //   "phoneNumber": "my_phoneNumber",
         *       //   "postalAddress": {}
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "alternateEmail": "my_alternateEmail",
         *   //   "customerCreationTime": "my_customerCreationTime",
         *   //   "customerDomain": "my_customerDomain",
         *   //   "etag": "my_etag",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "language": "my_language",
         *   //   "phoneNumber": "my_phoneNumber",
         *   //   "postalAddress": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.customers.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customerKey Id of the customer to be updated
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
         * directory.customers.update
         * @desc Updates a customer.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.customer'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.customers.update({
         *     // Id of the customer to be updated
         *     customerKey: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "alternateEmail": "my_alternateEmail",
         *       //   "customerCreationTime": "my_customerCreationTime",
         *       //   "customerDomain": "my_customerDomain",
         *       //   "etag": "my_etag",
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "language": "my_language",
         *       //   "phoneNumber": "my_phoneNumber",
         *       //   "postalAddress": {}
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "alternateEmail": "my_alternateEmail",
         *   //   "customerCreationTime": "my_customerCreationTime",
         *   //   "customerDomain": "my_customerDomain",
         *   //   "etag": "my_etag",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "language": "my_language",
         *   //   "phoneNumber": "my_phoneNumber",
         *   //   "postalAddress": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.customers.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customerKey Id of the customer to be updated
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
         * Id of the customer to be retrieved
         */
        customerKey?: string;
    }
    export interface Params$Resource$Customers$Patch extends StandardParameters {
        /**
         * Id of the customer to be updated
         */
        customerKey?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Customer;
    }
    export interface Params$Resource$Customers$Update extends StandardParameters {
        /**
         * Id of the customer to be updated
         */
        customerKey?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Customer;
    }
    export class Resource$Domainaliases {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * directory.domainAliases.delete
         * @desc Deletes a Domain Alias of the customer.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.domain'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.domainAliases.delete({
         *     // Immutable ID of the G Suite account.
         *     customer: 'placeholder-value',
         *     // Name of domain alias to be retrieved.
         *     domainAliasName: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.domainAliases.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customer Immutable ID of the G Suite account.
         * @param {string} params.domainAliasName Name of domain alias to be retrieved.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Domainaliases$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Domainaliases$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Domainaliases$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Domainaliases$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Domainaliases$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * directory.domainAliases.get
         * @desc Retrieves a domain alias of the customer.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.domain',
         *       'https://www.googleapis.com/auth/admin.directory.domain.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.domainAliases.get({
         *     // Immutable ID of the G Suite account.
         *     customer: 'placeholder-value',
         *     // Name of domain alias to be retrieved.
         *     domainAliasName: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "creationTime": "my_creationTime",
         *   //   "domainAliasName": "my_domainAliasName",
         *   //   "etag": "my_etag",
         *   //   "kind": "my_kind",
         *   //   "parentDomainName": "my_parentDomainName",
         *   //   "verified": false
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.domainAliases.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customer Immutable ID of the G Suite account.
         * @param {string} params.domainAliasName Name of domain alias to be retrieved.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Domainaliases$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Domainaliases$Get, options?: MethodOptions): GaxiosPromise<Schema$DomainAlias>;
        get(params: Params$Resource$Domainaliases$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Domainaliases$Get, options: MethodOptions | BodyResponseCallback<Schema$DomainAlias>, callback: BodyResponseCallback<Schema$DomainAlias>): void;
        get(params: Params$Resource$Domainaliases$Get, callback: BodyResponseCallback<Schema$DomainAlias>): void;
        get(callback: BodyResponseCallback<Schema$DomainAlias>): void;
        /**
         * directory.domainAliases.insert
         * @desc Inserts a Domain alias of the customer.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.domain'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.domainAliases.insert({
         *     // Immutable ID of the G Suite account.
         *     customer: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "creationTime": "my_creationTime",
         *       //   "domainAliasName": "my_domainAliasName",
         *       //   "etag": "my_etag",
         *       //   "kind": "my_kind",
         *       //   "parentDomainName": "my_parentDomainName",
         *       //   "verified": false
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "creationTime": "my_creationTime",
         *   //   "domainAliasName": "my_domainAliasName",
         *   //   "etag": "my_etag",
         *   //   "kind": "my_kind",
         *   //   "parentDomainName": "my_parentDomainName",
         *   //   "verified": false
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.domainAliases.insert
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customer Immutable ID of the G Suite account.
         * @param {().DomainAlias} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        insert(params: Params$Resource$Domainaliases$Insert, options: StreamMethodOptions): GaxiosPromise<Readable>;
        insert(params?: Params$Resource$Domainaliases$Insert, options?: MethodOptions): GaxiosPromise<Schema$DomainAlias>;
        insert(params: Params$Resource$Domainaliases$Insert, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        insert(params: Params$Resource$Domainaliases$Insert, options: MethodOptions | BodyResponseCallback<Schema$DomainAlias>, callback: BodyResponseCallback<Schema$DomainAlias>): void;
        insert(params: Params$Resource$Domainaliases$Insert, callback: BodyResponseCallback<Schema$DomainAlias>): void;
        insert(callback: BodyResponseCallback<Schema$DomainAlias>): void;
        /**
         * directory.domainAliases.list
         * @desc Lists the domain aliases of the customer.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.domain',
         *       'https://www.googleapis.com/auth/admin.directory.domain.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.domainAliases.list({
         *     // Immutable ID of the G Suite account.
         *     customer: 'placeholder-value',
         *     // Name of the parent domain for which domain aliases are to be fetched.
         *     parentDomainName: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "domainAliases": [],
         *   //   "etag": "my_etag",
         *   //   "kind": "my_kind"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.domainAliases.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customer Immutable ID of the G Suite account.
         * @param {string=} params.parentDomainName Name of the parent domain for which domain aliases are to be fetched.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Domainaliases$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Domainaliases$List, options?: MethodOptions): GaxiosPromise<Schema$DomainAliases>;
        list(params: Params$Resource$Domainaliases$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Domainaliases$List, options: MethodOptions | BodyResponseCallback<Schema$DomainAliases>, callback: BodyResponseCallback<Schema$DomainAliases>): void;
        list(params: Params$Resource$Domainaliases$List, callback: BodyResponseCallback<Schema$DomainAliases>): void;
        list(callback: BodyResponseCallback<Schema$DomainAliases>): void;
    }
    export interface Params$Resource$Domainaliases$Delete extends StandardParameters {
        /**
         * Immutable ID of the G Suite account.
         */
        customer?: string;
        /**
         * Name of domain alias to be retrieved.
         */
        domainAliasName?: string;
    }
    export interface Params$Resource$Domainaliases$Get extends StandardParameters {
        /**
         * Immutable ID of the G Suite account.
         */
        customer?: string;
        /**
         * Name of domain alias to be retrieved.
         */
        domainAliasName?: string;
    }
    export interface Params$Resource$Domainaliases$Insert extends StandardParameters {
        /**
         * Immutable ID of the G Suite account.
         */
        customer?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$DomainAlias;
    }
    export interface Params$Resource$Domainaliases$List extends StandardParameters {
        /**
         * Immutable ID of the G Suite account.
         */
        customer?: string;
        /**
         * Name of the parent domain for which domain aliases are to be fetched.
         */
        parentDomainName?: string;
    }
    export class Resource$Domains {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * directory.domains.delete
         * @desc Deletes a domain of the customer.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.domain'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.domains.delete({
         *     // Immutable ID of the G Suite account.
         *     customer: 'placeholder-value',
         *     // Name of domain to be deleted
         *     domainName: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.domains.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customer Immutable ID of the G Suite account.
         * @param {string} params.domainName Name of domain to be deleted
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Domains$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Domains$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Domains$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Domains$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Domains$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * directory.domains.get
         * @desc Retrieves a domain of the customer.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.domain',
         *       'https://www.googleapis.com/auth/admin.directory.domain.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.domains.get({
         *     // Immutable ID of the G Suite account.
         *     customer: 'placeholder-value',
         *     // Name of domain to be retrieved
         *     domainName: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "creationTime": "my_creationTime",
         *   //   "domainAliases": [],
         *   //   "domainName": "my_domainName",
         *   //   "etag": "my_etag",
         *   //   "isPrimary": false,
         *   //   "kind": "my_kind",
         *   //   "verified": false
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.domains.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customer Immutable ID of the G Suite account.
         * @param {string} params.domainName Name of domain to be retrieved
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Domains$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Domains$Get, options?: MethodOptions): GaxiosPromise<Schema$Domains>;
        get(params: Params$Resource$Domains$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Domains$Get, options: MethodOptions | BodyResponseCallback<Schema$Domains>, callback: BodyResponseCallback<Schema$Domains>): void;
        get(params: Params$Resource$Domains$Get, callback: BodyResponseCallback<Schema$Domains>): void;
        get(callback: BodyResponseCallback<Schema$Domains>): void;
        /**
         * directory.domains.insert
         * @desc Inserts a domain of the customer.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.domain'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.domains.insert({
         *     // Immutable ID of the G Suite account.
         *     customer: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "creationTime": "my_creationTime",
         *       //   "domainAliases": [],
         *       //   "domainName": "my_domainName",
         *       //   "etag": "my_etag",
         *       //   "isPrimary": false,
         *       //   "kind": "my_kind",
         *       //   "verified": false
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "creationTime": "my_creationTime",
         *   //   "domainAliases": [],
         *   //   "domainName": "my_domainName",
         *   //   "etag": "my_etag",
         *   //   "isPrimary": false,
         *   //   "kind": "my_kind",
         *   //   "verified": false
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.domains.insert
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customer Immutable ID of the G Suite account.
         * @param {().Domains} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        insert(params: Params$Resource$Domains$Insert, options: StreamMethodOptions): GaxiosPromise<Readable>;
        insert(params?: Params$Resource$Domains$Insert, options?: MethodOptions): GaxiosPromise<Schema$Domains>;
        insert(params: Params$Resource$Domains$Insert, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        insert(params: Params$Resource$Domains$Insert, options: MethodOptions | BodyResponseCallback<Schema$Domains>, callback: BodyResponseCallback<Schema$Domains>): void;
        insert(params: Params$Resource$Domains$Insert, callback: BodyResponseCallback<Schema$Domains>): void;
        insert(callback: BodyResponseCallback<Schema$Domains>): void;
        /**
         * directory.domains.list
         * @desc Lists the domains of the customer.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.domain',
         *       'https://www.googleapis.com/auth/admin.directory.domain.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.domains.list({
         *     // Immutable ID of the G Suite account.
         *     customer: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "domains": [],
         *   //   "etag": "my_etag",
         *   //   "kind": "my_kind"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.domains.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customer Immutable ID of the G Suite account.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Domains$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Domains$List, options?: MethodOptions): GaxiosPromise<Schema$Domains2>;
        list(params: Params$Resource$Domains$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Domains$List, options: MethodOptions | BodyResponseCallback<Schema$Domains2>, callback: BodyResponseCallback<Schema$Domains2>): void;
        list(params: Params$Resource$Domains$List, callback: BodyResponseCallback<Schema$Domains2>): void;
        list(callback: BodyResponseCallback<Schema$Domains2>): void;
    }
    export interface Params$Resource$Domains$Delete extends StandardParameters {
        /**
         * Immutable ID of the G Suite account.
         */
        customer?: string;
        /**
         * Name of domain to be deleted
         */
        domainName?: string;
    }
    export interface Params$Resource$Domains$Get extends StandardParameters {
        /**
         * Immutable ID of the G Suite account.
         */
        customer?: string;
        /**
         * Name of domain to be retrieved
         */
        domainName?: string;
    }
    export interface Params$Resource$Domains$Insert extends StandardParameters {
        /**
         * Immutable ID of the G Suite account.
         */
        customer?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Domains;
    }
    export interface Params$Resource$Domains$List extends StandardParameters {
        /**
         * Immutable ID of the G Suite account.
         */
        customer?: string;
    }
    export class Resource$Groups {
        context: APIRequestContext;
        aliases: Resource$Groups$Aliases;
        constructor(context: APIRequestContext);
        /**
         * directory.groups.delete
         * @desc Delete Group
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.group'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.groups.delete({
         *     // Email or immutable ID of the group
         *     groupKey: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.groups.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.groupKey Email or immutable ID of the group
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Groups$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Groups$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Groups$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Groups$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Groups$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * directory.groups.get
         * @desc Retrieve Group
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.group',
         *       'https://www.googleapis.com/auth/admin.directory.group.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.groups.get({
         *     // Email or immutable ID of the group
         *     groupKey: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "adminCreated": false,
         *   //   "aliases": [],
         *   //   "description": "my_description",
         *   //   "directMembersCount": "my_directMembersCount",
         *   //   "email": "my_email",
         *   //   "etag": "my_etag",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "name": "my_name",
         *   //   "nonEditableAliases": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.groups.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.groupKey Email or immutable ID of the group
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Groups$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Groups$Get, options?: MethodOptions): GaxiosPromise<Schema$Group>;
        get(params: Params$Resource$Groups$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Groups$Get, options: MethodOptions | BodyResponseCallback<Schema$Group>, callback: BodyResponseCallback<Schema$Group>): void;
        get(params: Params$Resource$Groups$Get, callback: BodyResponseCallback<Schema$Group>): void;
        get(callback: BodyResponseCallback<Schema$Group>): void;
        /**
         * directory.groups.insert
         * @desc Create Group
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.group'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.groups.insert({
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "adminCreated": false,
         *       //   "aliases": [],
         *       //   "description": "my_description",
         *       //   "directMembersCount": "my_directMembersCount",
         *       //   "email": "my_email",
         *       //   "etag": "my_etag",
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "name": "my_name",
         *       //   "nonEditableAliases": []
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "adminCreated": false,
         *   //   "aliases": [],
         *   //   "description": "my_description",
         *   //   "directMembersCount": "my_directMembersCount",
         *   //   "email": "my_email",
         *   //   "etag": "my_etag",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "name": "my_name",
         *   //   "nonEditableAliases": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.groups.insert
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {().Group} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        insert(params: Params$Resource$Groups$Insert, options: StreamMethodOptions): GaxiosPromise<Readable>;
        insert(params?: Params$Resource$Groups$Insert, options?: MethodOptions): GaxiosPromise<Schema$Group>;
        insert(params: Params$Resource$Groups$Insert, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        insert(params: Params$Resource$Groups$Insert, options: MethodOptions | BodyResponseCallback<Schema$Group>, callback: BodyResponseCallback<Schema$Group>): void;
        insert(params: Params$Resource$Groups$Insert, callback: BodyResponseCallback<Schema$Group>): void;
        insert(callback: BodyResponseCallback<Schema$Group>): void;
        /**
         * directory.groups.list
         * @desc Retrieve all groups of a domain or of a user given a userKey (paginated)
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.group',
         *       'https://www.googleapis.com/auth/admin.directory.group.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.groups.list({
         *     // Immutable ID of the G Suite account. In case of multi-domain, to fetch all groups for a customer, fill this field instead of domain.
         *     customer: 'placeholder-value',
         *     // Name of the domain. Fill this field to get groups from only this domain. To return all groups in a multi-domain fill customer field instead.
         *     domain: 'placeholder-value',
         *     // Maximum number of results to return. Max allowed value is 200.
         *     maxResults: 'placeholder-value',
         *     // Column to use for sorting results
         *     orderBy: 'placeholder-value',
         *     // Token to specify next page in the list
         *     pageToken: 'placeholder-value',
         *     // Query string search. Should be of the form "". Complete documentation is at https://developers.google.com/admin-sdk/directory/v1/guides/search-groups
         *     query: 'placeholder-value',
         *     // Whether to return results in ascending or descending order. Only of use when orderBy is also used
         *     sortOrder: 'placeholder-value',
         *     // Email or immutable ID of the user if only those groups are to be listed, the given user is a member of. If it's an ID, it should match with the ID of the user object.
         *     userKey: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "etag": "my_etag",
         *   //   "groups": [],
         *   //   "kind": "my_kind",
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.groups.list
         * @memberOf! ()
         *
         * @param {object=} params Parameters for request
         * @param {string=} params.customer Immutable ID of the G Suite account. In case of multi-domain, to fetch all groups for a customer, fill this field instead of domain.
         * @param {string=} params.domain Name of the domain. Fill this field to get groups from only this domain. To return all groups in a multi-domain fill customer field instead.
         * @param {integer=} params.maxResults Maximum number of results to return. Max allowed value is 200.
         * @param {string=} params.orderBy Column to use for sorting results
         * @param {string=} params.pageToken Token to specify next page in the list
         * @param {string=} params.query Query string search. Should be of the form "". Complete documentation is at https://developers.google.com/admin-sdk/directory/v1/guides/search-groups
         * @param {string=} params.sortOrder Whether to return results in ascending or descending order. Only of use when orderBy is also used
         * @param {string=} params.userKey Email or immutable ID of the user if only those groups are to be listed, the given user is a member of. If it's an ID, it should match with the ID of the user object.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Groups$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Groups$List, options?: MethodOptions): GaxiosPromise<Schema$Groups>;
        list(params: Params$Resource$Groups$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Groups$List, options: MethodOptions | BodyResponseCallback<Schema$Groups>, callback: BodyResponseCallback<Schema$Groups>): void;
        list(params: Params$Resource$Groups$List, callback: BodyResponseCallback<Schema$Groups>): void;
        list(callback: BodyResponseCallback<Schema$Groups>): void;
        /**
         * directory.groups.patch
         * @desc Update Group. This method supports patch semantics.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.group'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.groups.patch({
         *     // Email or immutable ID of the group. If ID, it should match with id of group object
         *     groupKey: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "adminCreated": false,
         *       //   "aliases": [],
         *       //   "description": "my_description",
         *       //   "directMembersCount": "my_directMembersCount",
         *       //   "email": "my_email",
         *       //   "etag": "my_etag",
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "name": "my_name",
         *       //   "nonEditableAliases": []
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "adminCreated": false,
         *   //   "aliases": [],
         *   //   "description": "my_description",
         *   //   "directMembersCount": "my_directMembersCount",
         *   //   "email": "my_email",
         *   //   "etag": "my_etag",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "name": "my_name",
         *   //   "nonEditableAliases": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.groups.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.groupKey Email or immutable ID of the group. If ID, it should match with id of group object
         * @param {().Group} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Groups$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Groups$Patch, options?: MethodOptions): GaxiosPromise<Schema$Group>;
        patch(params: Params$Resource$Groups$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Groups$Patch, options: MethodOptions | BodyResponseCallback<Schema$Group>, callback: BodyResponseCallback<Schema$Group>): void;
        patch(params: Params$Resource$Groups$Patch, callback: BodyResponseCallback<Schema$Group>): void;
        patch(callback: BodyResponseCallback<Schema$Group>): void;
        /**
         * directory.groups.update
         * @desc Update Group
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.group'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.groups.update({
         *     // Email or immutable ID of the group. If ID, it should match with id of group object
         *     groupKey: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "adminCreated": false,
         *       //   "aliases": [],
         *       //   "description": "my_description",
         *       //   "directMembersCount": "my_directMembersCount",
         *       //   "email": "my_email",
         *       //   "etag": "my_etag",
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "name": "my_name",
         *       //   "nonEditableAliases": []
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "adminCreated": false,
         *   //   "aliases": [],
         *   //   "description": "my_description",
         *   //   "directMembersCount": "my_directMembersCount",
         *   //   "email": "my_email",
         *   //   "etag": "my_etag",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "name": "my_name",
         *   //   "nonEditableAliases": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.groups.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.groupKey Email or immutable ID of the group. If ID, it should match with id of group object
         * @param {().Group} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Groups$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Groups$Update, options?: MethodOptions): GaxiosPromise<Schema$Group>;
        update(params: Params$Resource$Groups$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Groups$Update, options: MethodOptions | BodyResponseCallback<Schema$Group>, callback: BodyResponseCallback<Schema$Group>): void;
        update(params: Params$Resource$Groups$Update, callback: BodyResponseCallback<Schema$Group>): void;
        update(callback: BodyResponseCallback<Schema$Group>): void;
    }
    export interface Params$Resource$Groups$Delete extends StandardParameters {
        /**
         * Email or immutable ID of the group
         */
        groupKey?: string;
    }
    export interface Params$Resource$Groups$Get extends StandardParameters {
        /**
         * Email or immutable ID of the group
         */
        groupKey?: string;
    }
    export interface Params$Resource$Groups$Insert extends StandardParameters {
        /**
         * Request body metadata
         */
        requestBody?: Schema$Group;
    }
    export interface Params$Resource$Groups$List extends StandardParameters {
        /**
         * Immutable ID of the G Suite account. In case of multi-domain, to fetch all groups for a customer, fill this field instead of domain.
         */
        customer?: string;
        /**
         * Name of the domain. Fill this field to get groups from only this domain. To return all groups in a multi-domain fill customer field instead.
         */
        domain?: string;
        /**
         * Maximum number of results to return. Max allowed value is 200.
         */
        maxResults?: number;
        /**
         * Column to use for sorting results
         */
        orderBy?: string;
        /**
         * Token to specify next page in the list
         */
        pageToken?: string;
        /**
         * Query string search. Should be of the form "". Complete documentation is at https://developers.google.com/admin-sdk/directory/v1/guides/search-groups
         */
        query?: string;
        /**
         * Whether to return results in ascending or descending order. Only of use when orderBy is also used
         */
        sortOrder?: string;
        /**
         * Email or immutable ID of the user if only those groups are to be listed, the given user is a member of. If it's an ID, it should match with the ID of the user object.
         */
        userKey?: string;
    }
    export interface Params$Resource$Groups$Patch extends StandardParameters {
        /**
         * Email or immutable ID of the group. If ID, it should match with id of group object
         */
        groupKey?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Group;
    }
    export interface Params$Resource$Groups$Update extends StandardParameters {
        /**
         * Email or immutable ID of the group. If ID, it should match with id of group object
         */
        groupKey?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Group;
    }
    export class Resource$Groups$Aliases {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * directory.groups.aliases.delete
         * @desc Remove a alias for the group
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.group'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.groups.aliases.delete({
         *     // The alias to be removed
         *     alias: 'placeholder-value',
         *     // Email or immutable ID of the group
         *     groupKey: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.groups.aliases.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.alias The alias to be removed
         * @param {string} params.groupKey Email or immutable ID of the group
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Groups$Aliases$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Groups$Aliases$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Groups$Aliases$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Groups$Aliases$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Groups$Aliases$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * directory.groups.aliases.insert
         * @desc Add a alias for the group
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.group'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.groups.aliases.insert({
         *     // Email or immutable ID of the group
         *     groupKey: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "alias": "my_alias",
         *       //   "etag": "my_etag",
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "primaryEmail": "my_primaryEmail"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "alias": "my_alias",
         *   //   "etag": "my_etag",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "primaryEmail": "my_primaryEmail"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.groups.aliases.insert
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.groupKey Email or immutable ID of the group
         * @param {().Alias} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        insert(params: Params$Resource$Groups$Aliases$Insert, options: StreamMethodOptions): GaxiosPromise<Readable>;
        insert(params?: Params$Resource$Groups$Aliases$Insert, options?: MethodOptions): GaxiosPromise<Schema$Alias>;
        insert(params: Params$Resource$Groups$Aliases$Insert, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        insert(params: Params$Resource$Groups$Aliases$Insert, options: MethodOptions | BodyResponseCallback<Schema$Alias>, callback: BodyResponseCallback<Schema$Alias>): void;
        insert(params: Params$Resource$Groups$Aliases$Insert, callback: BodyResponseCallback<Schema$Alias>): void;
        insert(callback: BodyResponseCallback<Schema$Alias>): void;
        /**
         * directory.groups.aliases.list
         * @desc List all aliases for a group
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.group',
         *       'https://www.googleapis.com/auth/admin.directory.group.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.groups.aliases.list({
         *     // Email or immutable ID of the group
         *     groupKey: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "aliases": [],
         *   //   "etag": "my_etag",
         *   //   "kind": "my_kind"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.groups.aliases.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.groupKey Email or immutable ID of the group
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Groups$Aliases$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Groups$Aliases$List, options?: MethodOptions): GaxiosPromise<Schema$Aliases>;
        list(params: Params$Resource$Groups$Aliases$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Groups$Aliases$List, options: MethodOptions | BodyResponseCallback<Schema$Aliases>, callback: BodyResponseCallback<Schema$Aliases>): void;
        list(params: Params$Resource$Groups$Aliases$List, callback: BodyResponseCallback<Schema$Aliases>): void;
        list(callback: BodyResponseCallback<Schema$Aliases>): void;
    }
    export interface Params$Resource$Groups$Aliases$Delete extends StandardParameters {
        /**
         * The alias to be removed
         */
        alias?: string;
        /**
         * Email or immutable ID of the group
         */
        groupKey?: string;
    }
    export interface Params$Resource$Groups$Aliases$Insert extends StandardParameters {
        /**
         * Email or immutable ID of the group
         */
        groupKey?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Alias;
    }
    export interface Params$Resource$Groups$Aliases$List extends StandardParameters {
        /**
         * Email or immutable ID of the group
         */
        groupKey?: string;
    }
    export class Resource$Members {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * directory.members.delete
         * @desc Remove membership.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.group',
         *       'https://www.googleapis.com/auth/admin.directory.group.member',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.members.delete({
         *     // Email or immutable ID of the group
         *     groupKey: 'placeholder-value',
         *     // Email or immutable ID of the member
         *     memberKey: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.members.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.groupKey Email or immutable ID of the group
         * @param {string} params.memberKey Email or immutable ID of the member
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Members$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Members$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Members$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Members$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Members$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * directory.members.get
         * @desc Retrieve Group Member
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.group',
         *       'https://www.googleapis.com/auth/admin.directory.group.member',
         *       'https://www.googleapis.com/auth/admin.directory.group.member.readonly',
         *       'https://www.googleapis.com/auth/admin.directory.group.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.members.get({
         *     // Email or immutable ID of the group
         *     groupKey: 'placeholder-value',
         *     // Email or immutable ID of the member
         *     memberKey: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "delivery_settings": "my_delivery_settings",
         *   //   "email": "my_email",
         *   //   "etag": "my_etag",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "role": "my_role",
         *   //   "status": "my_status",
         *   //   "type": "my_type"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.members.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.groupKey Email or immutable ID of the group
         * @param {string} params.memberKey Email or immutable ID of the member
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Members$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Members$Get, options?: MethodOptions): GaxiosPromise<Schema$Member>;
        get(params: Params$Resource$Members$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Members$Get, options: MethodOptions | BodyResponseCallback<Schema$Member>, callback: BodyResponseCallback<Schema$Member>): void;
        get(params: Params$Resource$Members$Get, callback: BodyResponseCallback<Schema$Member>): void;
        get(callback: BodyResponseCallback<Schema$Member>): void;
        /**
         * directory.members.hasMember
         * @desc Checks whether the given user is a member of the group. Membership can be direct or nested.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.group',
         *       'https://www.googleapis.com/auth/admin.directory.group.member',
         *       'https://www.googleapis.com/auth/admin.directory.group.member.readonly',
         *       'https://www.googleapis.com/auth/admin.directory.group.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.members.hasMember({
         *     // Identifies the group in the API request. The value can be the group's email address, group alias, or the unique group ID.
         *     groupKey: 'placeholder-value',
         *     // Identifies the user member in the API request. The value can be the user's primary email address, alias, or unique ID.
         *     memberKey: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "isMember": false
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.members.hasMember
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.groupKey Identifies the group in the API request. The value can be the group's email address, group alias, or the unique group ID.
         * @param {string} params.memberKey Identifies the user member in the API request. The value can be the user's primary email address, alias, or unique ID.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        hasMember(params: Params$Resource$Members$Hasmember, options: StreamMethodOptions): GaxiosPromise<Readable>;
        hasMember(params?: Params$Resource$Members$Hasmember, options?: MethodOptions): GaxiosPromise<Schema$MembersHasMember>;
        hasMember(params: Params$Resource$Members$Hasmember, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        hasMember(params: Params$Resource$Members$Hasmember, options: MethodOptions | BodyResponseCallback<Schema$MembersHasMember>, callback: BodyResponseCallback<Schema$MembersHasMember>): void;
        hasMember(params: Params$Resource$Members$Hasmember, callback: BodyResponseCallback<Schema$MembersHasMember>): void;
        hasMember(callback: BodyResponseCallback<Schema$MembersHasMember>): void;
        /**
         * directory.members.insert
         * @desc Add user to the specified group.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.group',
         *       'https://www.googleapis.com/auth/admin.directory.group.member',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.members.insert({
         *     // Email or immutable ID of the group
         *     groupKey: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "delivery_settings": "my_delivery_settings",
         *       //   "email": "my_email",
         *       //   "etag": "my_etag",
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "role": "my_role",
         *       //   "status": "my_status",
         *       //   "type": "my_type"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "delivery_settings": "my_delivery_settings",
         *   //   "email": "my_email",
         *   //   "etag": "my_etag",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "role": "my_role",
         *   //   "status": "my_status",
         *   //   "type": "my_type"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.members.insert
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.groupKey Email or immutable ID of the group
         * @param {().Member} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        insert(params: Params$Resource$Members$Insert, options: StreamMethodOptions): GaxiosPromise<Readable>;
        insert(params?: Params$Resource$Members$Insert, options?: MethodOptions): GaxiosPromise<Schema$Member>;
        insert(params: Params$Resource$Members$Insert, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        insert(params: Params$Resource$Members$Insert, options: MethodOptions | BodyResponseCallback<Schema$Member>, callback: BodyResponseCallback<Schema$Member>): void;
        insert(params: Params$Resource$Members$Insert, callback: BodyResponseCallback<Schema$Member>): void;
        insert(callback: BodyResponseCallback<Schema$Member>): void;
        /**
         * directory.members.list
         * @desc Retrieve all members in a group (paginated)
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.group',
         *       'https://www.googleapis.com/auth/admin.directory.group.member',
         *       'https://www.googleapis.com/auth/admin.directory.group.member.readonly',
         *       'https://www.googleapis.com/auth/admin.directory.group.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.members.list({
         *     // Email or immutable ID of the group
         *     groupKey: 'placeholder-value',
         *     // Whether to list indirect memberships. Default: false.
         *     includeDerivedMembership: 'placeholder-value',
         *     // Maximum number of results to return. Max allowed value is 200.
         *     maxResults: 'placeholder-value',
         *     // Token to specify next page in the list
         *     pageToken: 'placeholder-value',
         *     // Comma separated role values to filter list results on.
         *     roles: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "etag": "my_etag",
         *   //   "kind": "my_kind",
         *   //   "members": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.members.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.groupKey Email or immutable ID of the group
         * @param {boolean=} params.includeDerivedMembership Whether to list indirect memberships. Default: false.
         * @param {integer=} params.maxResults Maximum number of results to return. Max allowed value is 200.
         * @param {string=} params.pageToken Token to specify next page in the list
         * @param {string=} params.roles Comma separated role values to filter list results on.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Members$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Members$List, options?: MethodOptions): GaxiosPromise<Schema$Members>;
        list(params: Params$Resource$Members$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Members$List, options: MethodOptions | BodyResponseCallback<Schema$Members>, callback: BodyResponseCallback<Schema$Members>): void;
        list(params: Params$Resource$Members$List, callback: BodyResponseCallback<Schema$Members>): void;
        list(callback: BodyResponseCallback<Schema$Members>): void;
        /**
         * directory.members.patch
         * @desc Update membership of a user in the specified group. This method supports patch semantics.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.group',
         *       'https://www.googleapis.com/auth/admin.directory.group.member',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.members.patch({
         *     // Email or immutable ID of the group. If ID, it should match with id of group object
         *     groupKey: 'placeholder-value',
         *     // Email or immutable ID of the user. If ID, it should match with id of member object
         *     memberKey: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "delivery_settings": "my_delivery_settings",
         *       //   "email": "my_email",
         *       //   "etag": "my_etag",
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "role": "my_role",
         *       //   "status": "my_status",
         *       //   "type": "my_type"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "delivery_settings": "my_delivery_settings",
         *   //   "email": "my_email",
         *   //   "etag": "my_etag",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "role": "my_role",
         *   //   "status": "my_status",
         *   //   "type": "my_type"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.members.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.groupKey Email or immutable ID of the group. If ID, it should match with id of group object
         * @param {string} params.memberKey Email or immutable ID of the user. If ID, it should match with id of member object
         * @param {().Member} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Members$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Members$Patch, options?: MethodOptions): GaxiosPromise<Schema$Member>;
        patch(params: Params$Resource$Members$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Members$Patch, options: MethodOptions | BodyResponseCallback<Schema$Member>, callback: BodyResponseCallback<Schema$Member>): void;
        patch(params: Params$Resource$Members$Patch, callback: BodyResponseCallback<Schema$Member>): void;
        patch(callback: BodyResponseCallback<Schema$Member>): void;
        /**
         * directory.members.update
         * @desc Update membership of a user in the specified group.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.group',
         *       'https://www.googleapis.com/auth/admin.directory.group.member',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.members.update({
         *     // Email or immutable ID of the group. If ID, it should match with id of group object
         *     groupKey: 'placeholder-value',
         *     // Email or immutable ID of the user. If ID, it should match with id of member object
         *     memberKey: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "delivery_settings": "my_delivery_settings",
         *       //   "email": "my_email",
         *       //   "etag": "my_etag",
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "role": "my_role",
         *       //   "status": "my_status",
         *       //   "type": "my_type"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "delivery_settings": "my_delivery_settings",
         *   //   "email": "my_email",
         *   //   "etag": "my_etag",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "role": "my_role",
         *   //   "status": "my_status",
         *   //   "type": "my_type"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.members.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.groupKey Email or immutable ID of the group. If ID, it should match with id of group object
         * @param {string} params.memberKey Email or immutable ID of the user. If ID, it should match with id of member object
         * @param {().Member} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Members$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Members$Update, options?: MethodOptions): GaxiosPromise<Schema$Member>;
        update(params: Params$Resource$Members$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Members$Update, options: MethodOptions | BodyResponseCallback<Schema$Member>, callback: BodyResponseCallback<Schema$Member>): void;
        update(params: Params$Resource$Members$Update, callback: BodyResponseCallback<Schema$Member>): void;
        update(callback: BodyResponseCallback<Schema$Member>): void;
    }
    export interface Params$Resource$Members$Delete extends StandardParameters {
        /**
         * Email or immutable ID of the group
         */
        groupKey?: string;
        /**
         * Email or immutable ID of the member
         */
        memberKey?: string;
    }
    export interface Params$Resource$Members$Get extends StandardParameters {
        /**
         * Email or immutable ID of the group
         */
        groupKey?: string;
        /**
         * Email or immutable ID of the member
         */
        memberKey?: string;
    }
    export interface Params$Resource$Members$Hasmember extends StandardParameters {
        /**
         * Identifies the group in the API request. The value can be the group's email address, group alias, or the unique group ID.
         */
        groupKey?: string;
        /**
         * Identifies the user member in the API request. The value can be the user's primary email address, alias, or unique ID.
         */
        memberKey?: string;
    }
    export interface Params$Resource$Members$Insert extends StandardParameters {
        /**
         * Email or immutable ID of the group
         */
        groupKey?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Member;
    }
    export interface Params$Resource$Members$List extends StandardParameters {
        /**
         * Email or immutable ID of the group
         */
        groupKey?: string;
        /**
         * Whether to list indirect memberships. Default: false.
         */
        includeDerivedMembership?: boolean;
        /**
         * Maximum number of results to return. Max allowed value is 200.
         */
        maxResults?: number;
        /**
         * Token to specify next page in the list
         */
        pageToken?: string;
        /**
         * Comma separated role values to filter list results on.
         */
        roles?: string;
    }
    export interface Params$Resource$Members$Patch extends StandardParameters {
        /**
         * Email or immutable ID of the group. If ID, it should match with id of group object
         */
        groupKey?: string;
        /**
         * Email or immutable ID of the user. If ID, it should match with id of member object
         */
        memberKey?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Member;
    }
    export interface Params$Resource$Members$Update extends StandardParameters {
        /**
         * Email or immutable ID of the group. If ID, it should match with id of group object
         */
        groupKey?: string;
        /**
         * Email or immutable ID of the user. If ID, it should match with id of member object
         */
        memberKey?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Member;
    }
    export class Resource$Mobiledevices {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * directory.mobiledevices.action
         * @desc Take action on Mobile Device
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.device.mobile',
         *       'https://www.googleapis.com/auth/admin.directory.device.mobile.action',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.mobiledevices.action({
         *     // Immutable ID of the G Suite account
         *     customerId: 'placeholder-value',
         *     // Immutable ID of Mobile Device
         *     resourceId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "action": "my_action"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.mobiledevices.action
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customerId Immutable ID of the G Suite account
         * @param {string} params.resourceId Immutable ID of Mobile Device
         * @param {().MobileDeviceAction} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        action(params: Params$Resource$Mobiledevices$Action, options: StreamMethodOptions): GaxiosPromise<Readable>;
        action(params?: Params$Resource$Mobiledevices$Action, options?: MethodOptions): GaxiosPromise<void>;
        action(params: Params$Resource$Mobiledevices$Action, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        action(params: Params$Resource$Mobiledevices$Action, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        action(params: Params$Resource$Mobiledevices$Action, callback: BodyResponseCallback<void>): void;
        action(callback: BodyResponseCallback<void>): void;
        /**
         * directory.mobiledevices.delete
         * @desc Delete Mobile Device
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.device.mobile'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.mobiledevices.delete({
         *     // Immutable ID of the G Suite account
         *     customerId: 'placeholder-value',
         *     // Immutable ID of Mobile Device
         *     resourceId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.mobiledevices.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customerId Immutable ID of the G Suite account
         * @param {string} params.resourceId Immutable ID of Mobile Device
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Mobiledevices$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Mobiledevices$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Mobiledevices$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Mobiledevices$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Mobiledevices$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * directory.mobiledevices.get
         * @desc Retrieve Mobile Device
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.device.mobile',
         *       'https://www.googleapis.com/auth/admin.directory.device.mobile.action',
         *       'https://www.googleapis.com/auth/admin.directory.device.mobile.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.mobiledevices.get({
         *     // Immutable ID of the G Suite account
         *     customerId: 'placeholder-value',
         *     // Restrict information returned to a set of selected fields.
         *     projection: 'placeholder-value',
         *     // Immutable ID of Mobile Device
         *     resourceId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "adbStatus": false,
         *   //   "applications": [],
         *   //   "basebandVersion": "my_basebandVersion",
         *   //   "bootloaderVersion": "my_bootloaderVersion",
         *   //   "brand": "my_brand",
         *   //   "buildNumber": "my_buildNumber",
         *   //   "defaultLanguage": "my_defaultLanguage",
         *   //   "developerOptionsStatus": false,
         *   //   "deviceCompromisedStatus": "my_deviceCompromisedStatus",
         *   //   "deviceId": "my_deviceId",
         *   //   "devicePasswordStatus": "my_devicePasswordStatus",
         *   //   "email": [],
         *   //   "encryptionStatus": "my_encryptionStatus",
         *   //   "etag": "my_etag",
         *   //   "firstSync": "my_firstSync",
         *   //   "hardware": "my_hardware",
         *   //   "hardwareId": "my_hardwareId",
         *   //   "imei": "my_imei",
         *   //   "kernelVersion": "my_kernelVersion",
         *   //   "kind": "my_kind",
         *   //   "lastSync": "my_lastSync",
         *   //   "managedAccountIsOnOwnerProfile": false,
         *   //   "manufacturer": "my_manufacturer",
         *   //   "meid": "my_meid",
         *   //   "model": "my_model",
         *   //   "name": [],
         *   //   "networkOperator": "my_networkOperator",
         *   //   "os": "my_os",
         *   //   "otherAccountsInfo": [],
         *   //   "privilege": "my_privilege",
         *   //   "releaseVersion": "my_releaseVersion",
         *   //   "resourceId": "my_resourceId",
         *   //   "securityPatchLevel": "my_securityPatchLevel",
         *   //   "serialNumber": "my_serialNumber",
         *   //   "status": "my_status",
         *   //   "supportsWorkProfile": false,
         *   //   "type": "my_type",
         *   //   "unknownSourcesStatus": false,
         *   //   "userAgent": "my_userAgent",
         *   //   "wifiMacAddress": "my_wifiMacAddress"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.mobiledevices.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customerId Immutable ID of the G Suite account
         * @param {string=} params.projection Restrict information returned to a set of selected fields.
         * @param {string} params.resourceId Immutable ID of Mobile Device
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Mobiledevices$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Mobiledevices$Get, options?: MethodOptions): GaxiosPromise<Schema$MobileDevice>;
        get(params: Params$Resource$Mobiledevices$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Mobiledevices$Get, options: MethodOptions | BodyResponseCallback<Schema$MobileDevice>, callback: BodyResponseCallback<Schema$MobileDevice>): void;
        get(params: Params$Resource$Mobiledevices$Get, callback: BodyResponseCallback<Schema$MobileDevice>): void;
        get(callback: BodyResponseCallback<Schema$MobileDevice>): void;
        /**
         * directory.mobiledevices.list
         * @desc Retrieve all Mobile Devices of a customer (paginated)
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.device.mobile',
         *       'https://www.googleapis.com/auth/admin.directory.device.mobile.action',
         *       'https://www.googleapis.com/auth/admin.directory.device.mobile.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.mobiledevices.list({
         *     // Immutable ID of the G Suite account
         *     customerId: 'placeholder-value',
         *     // Maximum number of results to return. Max allowed value is 100.
         *     maxResults: 'placeholder-value',
         *     // Column to use for sorting results
         *     orderBy: 'placeholder-value',
         *     // Token to specify next page in the list
         *     pageToken: 'placeholder-value',
         *     // Restrict information returned to a set of selected fields.
         *     projection: 'placeholder-value',
         *     // Search string in the format given at http://support.google.com/a/bin/answer.py?answer=1408863#search
         *     query: 'placeholder-value',
         *     // Whether to return results in ascending or descending order. Only of use when orderBy is also used
         *     sortOrder: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "etag": "my_etag",
         *   //   "kind": "my_kind",
         *   //   "mobiledevices": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.mobiledevices.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customerId Immutable ID of the G Suite account
         * @param {integer=} params.maxResults Maximum number of results to return. Max allowed value is 100.
         * @param {string=} params.orderBy Column to use for sorting results
         * @param {string=} params.pageToken Token to specify next page in the list
         * @param {string=} params.projection Restrict information returned to a set of selected fields.
         * @param {string=} params.query Search string in the format given at http://support.google.com/a/bin/answer.py?answer=1408863#search
         * @param {string=} params.sortOrder Whether to return results in ascending or descending order. Only of use when orderBy is also used
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Mobiledevices$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Mobiledevices$List, options?: MethodOptions): GaxiosPromise<Schema$MobileDevices>;
        list(params: Params$Resource$Mobiledevices$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Mobiledevices$List, options: MethodOptions | BodyResponseCallback<Schema$MobileDevices>, callback: BodyResponseCallback<Schema$MobileDevices>): void;
        list(params: Params$Resource$Mobiledevices$List, callback: BodyResponseCallback<Schema$MobileDevices>): void;
        list(callback: BodyResponseCallback<Schema$MobileDevices>): void;
    }
    export interface Params$Resource$Mobiledevices$Action extends StandardParameters {
        /**
         * Immutable ID of the G Suite account
         */
        customerId?: string;
        /**
         * Immutable ID of Mobile Device
         */
        resourceId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$MobileDeviceAction;
    }
    export interface Params$Resource$Mobiledevices$Delete extends StandardParameters {
        /**
         * Immutable ID of the G Suite account
         */
        customerId?: string;
        /**
         * Immutable ID of Mobile Device
         */
        resourceId?: string;
    }
    export interface Params$Resource$Mobiledevices$Get extends StandardParameters {
        /**
         * Immutable ID of the G Suite account
         */
        customerId?: string;
        /**
         * Restrict information returned to a set of selected fields.
         */
        projection?: string;
        /**
         * Immutable ID of Mobile Device
         */
        resourceId?: string;
    }
    export interface Params$Resource$Mobiledevices$List extends StandardParameters {
        /**
         * Immutable ID of the G Suite account
         */
        customerId?: string;
        /**
         * Maximum number of results to return. Max allowed value is 100.
         */
        maxResults?: number;
        /**
         * Column to use for sorting results
         */
        orderBy?: string;
        /**
         * Token to specify next page in the list
         */
        pageToken?: string;
        /**
         * Restrict information returned to a set of selected fields.
         */
        projection?: string;
        /**
         * Search string in the format given at http://support.google.com/a/bin/answer.py?answer=1408863#search
         */
        query?: string;
        /**
         * Whether to return results in ascending or descending order. Only of use when orderBy is also used
         */
        sortOrder?: string;
    }
    export class Resource$Notifications {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * directory.notifications.delete
         * @desc Deletes a notification
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.notifications'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.notifications.delete({
         *     // The unique ID for the customer's G Suite account. The customerId is also returned as part of the Users resource.
         *     customer: 'placeholder-value',
         *     // The unique ID of the notification.
         *     notificationId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.notifications.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customer The unique ID for the customer's G Suite account. The customerId is also returned as part of the Users resource.
         * @param {string} params.notificationId The unique ID of the notification.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Notifications$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Notifications$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Notifications$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Notifications$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Notifications$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * directory.notifications.get
         * @desc Retrieves a notification.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.notifications'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.notifications.get({
         *     // The unique ID for the customer's G Suite account. The customerId is also returned as part of the Users resource.
         *     customer: 'placeholder-value',
         *     // The unique ID of the notification.
         *     notificationId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "body": "my_body",
         *   //   "etag": "my_etag",
         *   //   "fromAddress": "my_fromAddress",
         *   //   "isUnread": false,
         *   //   "kind": "my_kind",
         *   //   "notificationId": "my_notificationId",
         *   //   "sendTime": "my_sendTime",
         *   //   "subject": "my_subject"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.notifications.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customer The unique ID for the customer's G Suite account. The customerId is also returned as part of the Users resource.
         * @param {string} params.notificationId The unique ID of the notification.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Notifications$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Notifications$Get, options?: MethodOptions): GaxiosPromise<Schema$Notification>;
        get(params: Params$Resource$Notifications$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Notifications$Get, options: MethodOptions | BodyResponseCallback<Schema$Notification>, callback: BodyResponseCallback<Schema$Notification>): void;
        get(params: Params$Resource$Notifications$Get, callback: BodyResponseCallback<Schema$Notification>): void;
        get(callback: BodyResponseCallback<Schema$Notification>): void;
        /**
         * directory.notifications.list
         * @desc Retrieves a list of notifications.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.notifications'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.notifications.list({
         *     // The unique ID for the customer's G Suite account.
         *     customer: 'placeholder-value',
         *     // The ISO 639-1 code of the language notifications are returned in. The default is English (en).
         *     language: 'placeholder-value',
         *     // Maximum number of notifications to return per page. The default is 100.
         *     maxResults: 'placeholder-value',
         *     // The token to specify the page of results to retrieve.
         *     pageToken: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "etag": "my_etag",
         *   //   "items": [],
         *   //   "kind": "my_kind",
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "unreadNotificationsCount": 0
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.notifications.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customer The unique ID for the customer's G Suite account.
         * @param {string=} params.language The ISO 639-1 code of the language notifications are returned in. The default is English (en).
         * @param {integer=} params.maxResults Maximum number of notifications to return per page. The default is 100.
         * @param {string=} params.pageToken The token to specify the page of results to retrieve.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Notifications$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Notifications$List, options?: MethodOptions): GaxiosPromise<Schema$Notifications>;
        list(params: Params$Resource$Notifications$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Notifications$List, options: MethodOptions | BodyResponseCallback<Schema$Notifications>, callback: BodyResponseCallback<Schema$Notifications>): void;
        list(params: Params$Resource$Notifications$List, callback: BodyResponseCallback<Schema$Notifications>): void;
        list(callback: BodyResponseCallback<Schema$Notifications>): void;
        /**
         * directory.notifications.patch
         * @desc Updates a notification. This method supports patch semantics.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.notifications'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.notifications.patch({
         *     // The unique ID for the customer's G Suite account.
         *     customer: 'placeholder-value',
         *     // The unique ID of the notification.
         *     notificationId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "body": "my_body",
         *       //   "etag": "my_etag",
         *       //   "fromAddress": "my_fromAddress",
         *       //   "isUnread": false,
         *       //   "kind": "my_kind",
         *       //   "notificationId": "my_notificationId",
         *       //   "sendTime": "my_sendTime",
         *       //   "subject": "my_subject"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "body": "my_body",
         *   //   "etag": "my_etag",
         *   //   "fromAddress": "my_fromAddress",
         *   //   "isUnread": false,
         *   //   "kind": "my_kind",
         *   //   "notificationId": "my_notificationId",
         *   //   "sendTime": "my_sendTime",
         *   //   "subject": "my_subject"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.notifications.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customer The unique ID for the customer's G Suite account.
         * @param {string} params.notificationId The unique ID of the notification.
         * @param {().Notification} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Notifications$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Notifications$Patch, options?: MethodOptions): GaxiosPromise<Schema$Notification>;
        patch(params: Params$Resource$Notifications$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Notifications$Patch, options: MethodOptions | BodyResponseCallback<Schema$Notification>, callback: BodyResponseCallback<Schema$Notification>): void;
        patch(params: Params$Resource$Notifications$Patch, callback: BodyResponseCallback<Schema$Notification>): void;
        patch(callback: BodyResponseCallback<Schema$Notification>): void;
        /**
         * directory.notifications.update
         * @desc Updates a notification.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.notifications'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.notifications.update({
         *     // The unique ID for the customer's G Suite account.
         *     customer: 'placeholder-value',
         *     // The unique ID of the notification.
         *     notificationId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "body": "my_body",
         *       //   "etag": "my_etag",
         *       //   "fromAddress": "my_fromAddress",
         *       //   "isUnread": false,
         *       //   "kind": "my_kind",
         *       //   "notificationId": "my_notificationId",
         *       //   "sendTime": "my_sendTime",
         *       //   "subject": "my_subject"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "body": "my_body",
         *   //   "etag": "my_etag",
         *   //   "fromAddress": "my_fromAddress",
         *   //   "isUnread": false,
         *   //   "kind": "my_kind",
         *   //   "notificationId": "my_notificationId",
         *   //   "sendTime": "my_sendTime",
         *   //   "subject": "my_subject"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.notifications.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customer The unique ID for the customer's G Suite account.
         * @param {string} params.notificationId The unique ID of the notification.
         * @param {().Notification} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Notifications$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Notifications$Update, options?: MethodOptions): GaxiosPromise<Schema$Notification>;
        update(params: Params$Resource$Notifications$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Notifications$Update, options: MethodOptions | BodyResponseCallback<Schema$Notification>, callback: BodyResponseCallback<Schema$Notification>): void;
        update(params: Params$Resource$Notifications$Update, callback: BodyResponseCallback<Schema$Notification>): void;
        update(callback: BodyResponseCallback<Schema$Notification>): void;
    }
    export interface Params$Resource$Notifications$Delete extends StandardParameters {
        /**
         * The unique ID for the customer's G Suite account. The customerId is also returned as part of the Users resource.
         */
        customer?: string;
        /**
         * The unique ID of the notification.
         */
        notificationId?: string;
    }
    export interface Params$Resource$Notifications$Get extends StandardParameters {
        /**
         * The unique ID for the customer's G Suite account. The customerId is also returned as part of the Users resource.
         */
        customer?: string;
        /**
         * The unique ID of the notification.
         */
        notificationId?: string;
    }
    export interface Params$Resource$Notifications$List extends StandardParameters {
        /**
         * The unique ID for the customer's G Suite account.
         */
        customer?: string;
        /**
         * The ISO 639-1 code of the language notifications are returned in. The default is English (en).
         */
        language?: string;
        /**
         * Maximum number of notifications to return per page. The default is 100.
         */
        maxResults?: number;
        /**
         * The token to specify the page of results to retrieve.
         */
        pageToken?: string;
    }
    export interface Params$Resource$Notifications$Patch extends StandardParameters {
        /**
         * The unique ID for the customer's G Suite account.
         */
        customer?: string;
        /**
         * The unique ID of the notification.
         */
        notificationId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Notification;
    }
    export interface Params$Resource$Notifications$Update extends StandardParameters {
        /**
         * The unique ID for the customer's G Suite account.
         */
        customer?: string;
        /**
         * The unique ID of the notification.
         */
        notificationId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Notification;
    }
    export class Resource$Orgunits {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * directory.orgunits.delete
         * @desc Remove organizational unit
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.orgunit'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.orgunits.delete({
         *     // Immutable ID of the G Suite account
         *     customerId: 'placeholder-value',
         *     // Full path of the organizational unit or its ID
         *     orgUnitPath: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.orgunits.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customerId Immutable ID of the G Suite account
         * @param {string} params.orgUnitPath Full path of the organizational unit or its ID
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Orgunits$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Orgunits$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Orgunits$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Orgunits$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Orgunits$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * directory.orgunits.get
         * @desc Retrieve organizational unit
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.orgunit',
         *       'https://www.googleapis.com/auth/admin.directory.orgunit.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.orgunits.get({
         *     // Immutable ID of the G Suite account
         *     customerId: 'placeholder-value',
         *     // Full path of the organizational unit or its ID
         *     orgUnitPath: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "blockInheritance": false,
         *   //   "description": "my_description",
         *   //   "etag": "my_etag",
         *   //   "kind": "my_kind",
         *   //   "name": "my_name",
         *   //   "orgUnitId": "my_orgUnitId",
         *   //   "orgUnitPath": "my_orgUnitPath",
         *   //   "parentOrgUnitId": "my_parentOrgUnitId",
         *   //   "parentOrgUnitPath": "my_parentOrgUnitPath"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.orgunits.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customerId Immutable ID of the G Suite account
         * @param {string} params.orgUnitPath Full path of the organizational unit or its ID
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Orgunits$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Orgunits$Get, options?: MethodOptions): GaxiosPromise<Schema$OrgUnit>;
        get(params: Params$Resource$Orgunits$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Orgunits$Get, options: MethodOptions | BodyResponseCallback<Schema$OrgUnit>, callback: BodyResponseCallback<Schema$OrgUnit>): void;
        get(params: Params$Resource$Orgunits$Get, callback: BodyResponseCallback<Schema$OrgUnit>): void;
        get(callback: BodyResponseCallback<Schema$OrgUnit>): void;
        /**
         * directory.orgunits.insert
         * @desc Add organizational unit
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.orgunit'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.orgunits.insert({
         *     // Immutable ID of the G Suite account
         *     customerId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "blockInheritance": false,
         *       //   "description": "my_description",
         *       //   "etag": "my_etag",
         *       //   "kind": "my_kind",
         *       //   "name": "my_name",
         *       //   "orgUnitId": "my_orgUnitId",
         *       //   "orgUnitPath": "my_orgUnitPath",
         *       //   "parentOrgUnitId": "my_parentOrgUnitId",
         *       //   "parentOrgUnitPath": "my_parentOrgUnitPath"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "blockInheritance": false,
         *   //   "description": "my_description",
         *   //   "etag": "my_etag",
         *   //   "kind": "my_kind",
         *   //   "name": "my_name",
         *   //   "orgUnitId": "my_orgUnitId",
         *   //   "orgUnitPath": "my_orgUnitPath",
         *   //   "parentOrgUnitId": "my_parentOrgUnitId",
         *   //   "parentOrgUnitPath": "my_parentOrgUnitPath"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.orgunits.insert
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customerId Immutable ID of the G Suite account
         * @param {().OrgUnit} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        insert(params: Params$Resource$Orgunits$Insert, options: StreamMethodOptions): GaxiosPromise<Readable>;
        insert(params?: Params$Resource$Orgunits$Insert, options?: MethodOptions): GaxiosPromise<Schema$OrgUnit>;
        insert(params: Params$Resource$Orgunits$Insert, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        insert(params: Params$Resource$Orgunits$Insert, options: MethodOptions | BodyResponseCallback<Schema$OrgUnit>, callback: BodyResponseCallback<Schema$OrgUnit>): void;
        insert(params: Params$Resource$Orgunits$Insert, callback: BodyResponseCallback<Schema$OrgUnit>): void;
        insert(callback: BodyResponseCallback<Schema$OrgUnit>): void;
        /**
         * directory.orgunits.list
         * @desc Retrieve all organizational units
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.orgunit',
         *       'https://www.googleapis.com/auth/admin.directory.orgunit.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.orgunits.list({
         *     // Immutable ID of the G Suite account
         *     customerId: 'placeholder-value',
         *     // the URL-encoded organizational unit's path or its ID
         *     orgUnitPath: 'placeholder-value',
         *     // Whether to return all sub-organizations or just immediate children
         *     type: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "etag": "my_etag",
         *   //   "kind": "my_kind",
         *   //   "organizationUnits": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.orgunits.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customerId Immutable ID of the G Suite account
         * @param {string=} params.orgUnitPath the URL-encoded organizational unit's path or its ID
         * @param {string=} params.type Whether to return all sub-organizations or just immediate children
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Orgunits$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Orgunits$List, options?: MethodOptions): GaxiosPromise<Schema$OrgUnits>;
        list(params: Params$Resource$Orgunits$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Orgunits$List, options: MethodOptions | BodyResponseCallback<Schema$OrgUnits>, callback: BodyResponseCallback<Schema$OrgUnits>): void;
        list(params: Params$Resource$Orgunits$List, callback: BodyResponseCallback<Schema$OrgUnits>): void;
        list(callback: BodyResponseCallback<Schema$OrgUnits>): void;
        /**
         * directory.orgunits.patch
         * @desc Update organizational unit. This method supports patch semantics.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.orgunit'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.orgunits.patch({
         *     // Immutable ID of the G Suite account
         *     customerId: 'placeholder-value',
         *     // Full path of the organizational unit or its ID
         *     orgUnitPath: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "blockInheritance": false,
         *       //   "description": "my_description",
         *       //   "etag": "my_etag",
         *       //   "kind": "my_kind",
         *       //   "name": "my_name",
         *       //   "orgUnitId": "my_orgUnitId",
         *       //   "orgUnitPath": "my_orgUnitPath",
         *       //   "parentOrgUnitId": "my_parentOrgUnitId",
         *       //   "parentOrgUnitPath": "my_parentOrgUnitPath"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "blockInheritance": false,
         *   //   "description": "my_description",
         *   //   "etag": "my_etag",
         *   //   "kind": "my_kind",
         *   //   "name": "my_name",
         *   //   "orgUnitId": "my_orgUnitId",
         *   //   "orgUnitPath": "my_orgUnitPath",
         *   //   "parentOrgUnitId": "my_parentOrgUnitId",
         *   //   "parentOrgUnitPath": "my_parentOrgUnitPath"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.orgunits.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customerId Immutable ID of the G Suite account
         * @param {string} params.orgUnitPath Full path of the organizational unit or its ID
         * @param {().OrgUnit} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Orgunits$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Orgunits$Patch, options?: MethodOptions): GaxiosPromise<Schema$OrgUnit>;
        patch(params: Params$Resource$Orgunits$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Orgunits$Patch, options: MethodOptions | BodyResponseCallback<Schema$OrgUnit>, callback: BodyResponseCallback<Schema$OrgUnit>): void;
        patch(params: Params$Resource$Orgunits$Patch, callback: BodyResponseCallback<Schema$OrgUnit>): void;
        patch(callback: BodyResponseCallback<Schema$OrgUnit>): void;
        /**
         * directory.orgunits.update
         * @desc Update organizational unit
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.orgunit'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.orgunits.update({
         *     // Immutable ID of the G Suite account
         *     customerId: 'placeholder-value',
         *     // Full path of the organizational unit or its ID
         *     orgUnitPath: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "blockInheritance": false,
         *       //   "description": "my_description",
         *       //   "etag": "my_etag",
         *       //   "kind": "my_kind",
         *       //   "name": "my_name",
         *       //   "orgUnitId": "my_orgUnitId",
         *       //   "orgUnitPath": "my_orgUnitPath",
         *       //   "parentOrgUnitId": "my_parentOrgUnitId",
         *       //   "parentOrgUnitPath": "my_parentOrgUnitPath"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "blockInheritance": false,
         *   //   "description": "my_description",
         *   //   "etag": "my_etag",
         *   //   "kind": "my_kind",
         *   //   "name": "my_name",
         *   //   "orgUnitId": "my_orgUnitId",
         *   //   "orgUnitPath": "my_orgUnitPath",
         *   //   "parentOrgUnitId": "my_parentOrgUnitId",
         *   //   "parentOrgUnitPath": "my_parentOrgUnitPath"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.orgunits.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customerId Immutable ID of the G Suite account
         * @param {string} params.orgUnitPath Full path of the organizational unit or its ID
         * @param {().OrgUnit} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Orgunits$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Orgunits$Update, options?: MethodOptions): GaxiosPromise<Schema$OrgUnit>;
        update(params: Params$Resource$Orgunits$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Orgunits$Update, options: MethodOptions | BodyResponseCallback<Schema$OrgUnit>, callback: BodyResponseCallback<Schema$OrgUnit>): void;
        update(params: Params$Resource$Orgunits$Update, callback: BodyResponseCallback<Schema$OrgUnit>): void;
        update(callback: BodyResponseCallback<Schema$OrgUnit>): void;
    }
    export interface Params$Resource$Orgunits$Delete extends StandardParameters {
        /**
         * Immutable ID of the G Suite account
         */
        customerId?: string;
        /**
         * Full path of the organizational unit or its ID
         */
        orgUnitPath?: string[];
    }
    export interface Params$Resource$Orgunits$Get extends StandardParameters {
        /**
         * Immutable ID of the G Suite account
         */
        customerId?: string;
        /**
         * Full path of the organizational unit or its ID
         */
        orgUnitPath?: string[];
    }
    export interface Params$Resource$Orgunits$Insert extends StandardParameters {
        /**
         * Immutable ID of the G Suite account
         */
        customerId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$OrgUnit;
    }
    export interface Params$Resource$Orgunits$List extends StandardParameters {
        /**
         * Immutable ID of the G Suite account
         */
        customerId?: string;
        /**
         * the URL-encoded organizational unit's path or its ID
         */
        orgUnitPath?: string;
        /**
         * Whether to return all sub-organizations or just immediate children
         */
        type?: string;
    }
    export interface Params$Resource$Orgunits$Patch extends StandardParameters {
        /**
         * Immutable ID of the G Suite account
         */
        customerId?: string;
        /**
         * Full path of the organizational unit or its ID
         */
        orgUnitPath?: string[];
        /**
         * Request body metadata
         */
        requestBody?: Schema$OrgUnit;
    }
    export interface Params$Resource$Orgunits$Update extends StandardParameters {
        /**
         * Immutable ID of the G Suite account
         */
        customerId?: string;
        /**
         * Full path of the organizational unit or its ID
         */
        orgUnitPath?: string[];
        /**
         * Request body metadata
         */
        requestBody?: Schema$OrgUnit;
    }
    export class Resource$Privileges {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * directory.privileges.list
         * @desc Retrieves a paginated list of all privileges for a customer.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.rolemanagement',
         *       'https://www.googleapis.com/auth/admin.directory.rolemanagement.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.privileges.list({
         *     // Immutable ID of the G Suite account.
         *     customer: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "etag": "my_etag",
         *   //   "items": [],
         *   //   "kind": "my_kind"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.privileges.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customer Immutable ID of the G Suite account.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Privileges$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Privileges$List, options?: MethodOptions): GaxiosPromise<Schema$Privileges>;
        list(params: Params$Resource$Privileges$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Privileges$List, options: MethodOptions | BodyResponseCallback<Schema$Privileges>, callback: BodyResponseCallback<Schema$Privileges>): void;
        list(params: Params$Resource$Privileges$List, callback: BodyResponseCallback<Schema$Privileges>): void;
        list(callback: BodyResponseCallback<Schema$Privileges>): void;
    }
    export interface Params$Resource$Privileges$List extends StandardParameters {
        /**
         * Immutable ID of the G Suite account.
         */
        customer?: string;
    }
    export class Resource$Resources {
        context: APIRequestContext;
        buildings: Resource$Resources$Buildings;
        calendars: Resource$Resources$Calendars;
        features: Resource$Resources$Features;
        constructor(context: APIRequestContext);
    }
    export class Resource$Resources$Buildings {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * directory.resources.buildings.delete
         * @desc Deletes a building.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.resource.calendar',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.resources.buildings.delete({
         *     // The ID of the building to delete.
         *     buildingId: 'placeholder-value',
         *     // The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         *     customer: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.resources.buildings.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.buildingId The ID of the building to delete.
         * @param {string} params.customer The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Resources$Buildings$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Resources$Buildings$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Resources$Buildings$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Resources$Buildings$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Resources$Buildings$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * directory.resources.buildings.get
         * @desc Retrieves a building.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.resource.calendar',
         *       'https://www.googleapis.com/auth/admin.directory.resource.calendar.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.resources.buildings.get({
         *     // The unique ID of the building to retrieve.
         *     buildingId: 'placeholder-value',
         *     // The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         *     customer: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "address": {},
         *   //   "buildingId": "my_buildingId",
         *   //   "buildingName": "my_buildingName",
         *   //   "coordinates": {},
         *   //   "description": "my_description",
         *   //   "etags": "my_etags",
         *   //   "floorNames": [],
         *   //   "kind": "my_kind"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.resources.buildings.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.buildingId The unique ID of the building to retrieve.
         * @param {string} params.customer The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Resources$Buildings$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Resources$Buildings$Get, options?: MethodOptions): GaxiosPromise<Schema$Building>;
        get(params: Params$Resource$Resources$Buildings$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Resources$Buildings$Get, options: MethodOptions | BodyResponseCallback<Schema$Building>, callback: BodyResponseCallback<Schema$Building>): void;
        get(params: Params$Resource$Resources$Buildings$Get, callback: BodyResponseCallback<Schema$Building>): void;
        get(callback: BodyResponseCallback<Schema$Building>): void;
        /**
         * directory.resources.buildings.insert
         * @desc Inserts a building.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.resource.calendar',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.resources.buildings.insert({
         *     // Source from which Building.coordinates are derived.
         *     coordinatesSource: 'placeholder-value',
         *     // The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         *     customer: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "address": {},
         *       //   "buildingId": "my_buildingId",
         *       //   "buildingName": "my_buildingName",
         *       //   "coordinates": {},
         *       //   "description": "my_description",
         *       //   "etags": "my_etags",
         *       //   "floorNames": [],
         *       //   "kind": "my_kind"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "address": {},
         *   //   "buildingId": "my_buildingId",
         *   //   "buildingName": "my_buildingName",
         *   //   "coordinates": {},
         *   //   "description": "my_description",
         *   //   "etags": "my_etags",
         *   //   "floorNames": [],
         *   //   "kind": "my_kind"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.resources.buildings.insert
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.coordinatesSource Source from which Building.coordinates are derived.
         * @param {string} params.customer The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         * @param {().Building} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        insert(params: Params$Resource$Resources$Buildings$Insert, options: StreamMethodOptions): GaxiosPromise<Readable>;
        insert(params?: Params$Resource$Resources$Buildings$Insert, options?: MethodOptions): GaxiosPromise<Schema$Building>;
        insert(params: Params$Resource$Resources$Buildings$Insert, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        insert(params: Params$Resource$Resources$Buildings$Insert, options: MethodOptions | BodyResponseCallback<Schema$Building>, callback: BodyResponseCallback<Schema$Building>): void;
        insert(params: Params$Resource$Resources$Buildings$Insert, callback: BodyResponseCallback<Schema$Building>): void;
        insert(callback: BodyResponseCallback<Schema$Building>): void;
        /**
         * directory.resources.buildings.list
         * @desc Retrieves a list of buildings for an account.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.resource.calendar',
         *       'https://www.googleapis.com/auth/admin.directory.resource.calendar.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.resources.buildings.list({
         *     // The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         *     customer: 'placeholder-value',
         *     // Maximum number of results to return.
         *     maxResults: 'placeholder-value',
         *     // Token to specify the next page in the list.
         *     pageToken: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "buildings": [],
         *   //   "etag": "my_etag",
         *   //   "kind": "my_kind",
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.resources.buildings.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customer The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         * @param {integer=} params.maxResults Maximum number of results to return.
         * @param {string=} params.pageToken Token to specify the next page in the list.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Resources$Buildings$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Resources$Buildings$List, options?: MethodOptions): GaxiosPromise<Schema$Buildings>;
        list(params: Params$Resource$Resources$Buildings$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Resources$Buildings$List, options: MethodOptions | BodyResponseCallback<Schema$Buildings>, callback: BodyResponseCallback<Schema$Buildings>): void;
        list(params: Params$Resource$Resources$Buildings$List, callback: BodyResponseCallback<Schema$Buildings>): void;
        list(callback: BodyResponseCallback<Schema$Buildings>): void;
        /**
         * directory.resources.buildings.patch
         * @desc Updates a building. This method supports patch semantics.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.resource.calendar',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.resources.buildings.patch({
         *     // The ID of the building to update.
         *     buildingId: 'placeholder-value',
         *     // Source from which Building.coordinates are derived.
         *     coordinatesSource: 'placeholder-value',
         *     // The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         *     customer: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "address": {},
         *       //   "buildingId": "my_buildingId",
         *       //   "buildingName": "my_buildingName",
         *       //   "coordinates": {},
         *       //   "description": "my_description",
         *       //   "etags": "my_etags",
         *       //   "floorNames": [],
         *       //   "kind": "my_kind"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "address": {},
         *   //   "buildingId": "my_buildingId",
         *   //   "buildingName": "my_buildingName",
         *   //   "coordinates": {},
         *   //   "description": "my_description",
         *   //   "etags": "my_etags",
         *   //   "floorNames": [],
         *   //   "kind": "my_kind"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.resources.buildings.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.buildingId The ID of the building to update.
         * @param {string=} params.coordinatesSource Source from which Building.coordinates are derived.
         * @param {string} params.customer The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         * @param {().Building} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Resources$Buildings$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Resources$Buildings$Patch, options?: MethodOptions): GaxiosPromise<Schema$Building>;
        patch(params: Params$Resource$Resources$Buildings$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Resources$Buildings$Patch, options: MethodOptions | BodyResponseCallback<Schema$Building>, callback: BodyResponseCallback<Schema$Building>): void;
        patch(params: Params$Resource$Resources$Buildings$Patch, callback: BodyResponseCallback<Schema$Building>): void;
        patch(callback: BodyResponseCallback<Schema$Building>): void;
        /**
         * directory.resources.buildings.update
         * @desc Updates a building.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.resource.calendar',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.resources.buildings.update({
         *     // The ID of the building to update.
         *     buildingId: 'placeholder-value',
         *     // Source from which Building.coordinates are derived.
         *     coordinatesSource: 'placeholder-value',
         *     // The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         *     customer: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "address": {},
         *       //   "buildingId": "my_buildingId",
         *       //   "buildingName": "my_buildingName",
         *       //   "coordinates": {},
         *       //   "description": "my_description",
         *       //   "etags": "my_etags",
         *       //   "floorNames": [],
         *       //   "kind": "my_kind"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "address": {},
         *   //   "buildingId": "my_buildingId",
         *   //   "buildingName": "my_buildingName",
         *   //   "coordinates": {},
         *   //   "description": "my_description",
         *   //   "etags": "my_etags",
         *   //   "floorNames": [],
         *   //   "kind": "my_kind"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.resources.buildings.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.buildingId The ID of the building to update.
         * @param {string=} params.coordinatesSource Source from which Building.coordinates are derived.
         * @param {string} params.customer The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         * @param {().Building} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Resources$Buildings$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Resources$Buildings$Update, options?: MethodOptions): GaxiosPromise<Schema$Building>;
        update(params: Params$Resource$Resources$Buildings$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Resources$Buildings$Update, options: MethodOptions | BodyResponseCallback<Schema$Building>, callback: BodyResponseCallback<Schema$Building>): void;
        update(params: Params$Resource$Resources$Buildings$Update, callback: BodyResponseCallback<Schema$Building>): void;
        update(callback: BodyResponseCallback<Schema$Building>): void;
    }
    export interface Params$Resource$Resources$Buildings$Delete extends StandardParameters {
        /**
         * The ID of the building to delete.
         */
        buildingId?: string;
        /**
         * The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         */
        customer?: string;
    }
    export interface Params$Resource$Resources$Buildings$Get extends StandardParameters {
        /**
         * The unique ID of the building to retrieve.
         */
        buildingId?: string;
        /**
         * The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         */
        customer?: string;
    }
    export interface Params$Resource$Resources$Buildings$Insert extends StandardParameters {
        /**
         * Source from which Building.coordinates are derived.
         */
        coordinatesSource?: string;
        /**
         * The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         */
        customer?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Building;
    }
    export interface Params$Resource$Resources$Buildings$List extends StandardParameters {
        /**
         * The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         */
        customer?: string;
        /**
         * Maximum number of results to return.
         */
        maxResults?: number;
        /**
         * Token to specify the next page in the list.
         */
        pageToken?: string;
    }
    export interface Params$Resource$Resources$Buildings$Patch extends StandardParameters {
        /**
         * The ID of the building to update.
         */
        buildingId?: string;
        /**
         * Source from which Building.coordinates are derived.
         */
        coordinatesSource?: string;
        /**
         * The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         */
        customer?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Building;
    }
    export interface Params$Resource$Resources$Buildings$Update extends StandardParameters {
        /**
         * The ID of the building to update.
         */
        buildingId?: string;
        /**
         * Source from which Building.coordinates are derived.
         */
        coordinatesSource?: string;
        /**
         * The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         */
        customer?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Building;
    }
    export class Resource$Resources$Calendars {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * directory.resources.calendars.delete
         * @desc Deletes a calendar resource.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.resource.calendar',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.resources.calendars.delete({
         *     // The unique ID of the calendar resource to delete.
         *     calendarResourceId: 'placeholder-value',
         *     // The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         *     customer: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.resources.calendars.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.calendarResourceId The unique ID of the calendar resource to delete.
         * @param {string} params.customer The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Resources$Calendars$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Resources$Calendars$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Resources$Calendars$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Resources$Calendars$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Resources$Calendars$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * directory.resources.calendars.get
         * @desc Retrieves a calendar resource.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.resource.calendar',
         *       'https://www.googleapis.com/auth/admin.directory.resource.calendar.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.resources.calendars.get({
         *     // The unique ID of the calendar resource to retrieve.
         *     calendarResourceId: 'placeholder-value',
         *     // The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         *     customer: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "buildingId": "my_buildingId",
         *   //   "capacity": 0,
         *   //   "etags": "my_etags",
         *   //   "featureInstances": {},
         *   //   "floorName": "my_floorName",
         *   //   "floorSection": "my_floorSection",
         *   //   "generatedResourceName": "my_generatedResourceName",
         *   //   "kind": "my_kind",
         *   //   "resourceCategory": "my_resourceCategory",
         *   //   "resourceDescription": "my_resourceDescription",
         *   //   "resourceEmail": "my_resourceEmail",
         *   //   "resourceId": "my_resourceId",
         *   //   "resourceName": "my_resourceName",
         *   //   "resourceType": "my_resourceType",
         *   //   "userVisibleDescription": "my_userVisibleDescription"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.resources.calendars.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.calendarResourceId The unique ID of the calendar resource to retrieve.
         * @param {string} params.customer The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Resources$Calendars$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Resources$Calendars$Get, options?: MethodOptions): GaxiosPromise<Schema$CalendarResource>;
        get(params: Params$Resource$Resources$Calendars$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Resources$Calendars$Get, options: MethodOptions | BodyResponseCallback<Schema$CalendarResource>, callback: BodyResponseCallback<Schema$CalendarResource>): void;
        get(params: Params$Resource$Resources$Calendars$Get, callback: BodyResponseCallback<Schema$CalendarResource>): void;
        get(callback: BodyResponseCallback<Schema$CalendarResource>): void;
        /**
         * directory.resources.calendars.insert
         * @desc Inserts a calendar resource.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.resource.calendar',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.resources.calendars.insert({
         *     // The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         *     customer: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "buildingId": "my_buildingId",
         *       //   "capacity": 0,
         *       //   "etags": "my_etags",
         *       //   "featureInstances": {},
         *       //   "floorName": "my_floorName",
         *       //   "floorSection": "my_floorSection",
         *       //   "generatedResourceName": "my_generatedResourceName",
         *       //   "kind": "my_kind",
         *       //   "resourceCategory": "my_resourceCategory",
         *       //   "resourceDescription": "my_resourceDescription",
         *       //   "resourceEmail": "my_resourceEmail",
         *       //   "resourceId": "my_resourceId",
         *       //   "resourceName": "my_resourceName",
         *       //   "resourceType": "my_resourceType",
         *       //   "userVisibleDescription": "my_userVisibleDescription"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "buildingId": "my_buildingId",
         *   //   "capacity": 0,
         *   //   "etags": "my_etags",
         *   //   "featureInstances": {},
         *   //   "floorName": "my_floorName",
         *   //   "floorSection": "my_floorSection",
         *   //   "generatedResourceName": "my_generatedResourceName",
         *   //   "kind": "my_kind",
         *   //   "resourceCategory": "my_resourceCategory",
         *   //   "resourceDescription": "my_resourceDescription",
         *   //   "resourceEmail": "my_resourceEmail",
         *   //   "resourceId": "my_resourceId",
         *   //   "resourceName": "my_resourceName",
         *   //   "resourceType": "my_resourceType",
         *   //   "userVisibleDescription": "my_userVisibleDescription"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.resources.calendars.insert
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customer The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         * @param {().CalendarResource} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        insert(params: Params$Resource$Resources$Calendars$Insert, options: StreamMethodOptions): GaxiosPromise<Readable>;
        insert(params?: Params$Resource$Resources$Calendars$Insert, options?: MethodOptions): GaxiosPromise<Schema$CalendarResource>;
        insert(params: Params$Resource$Resources$Calendars$Insert, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        insert(params: Params$Resource$Resources$Calendars$Insert, options: MethodOptions | BodyResponseCallback<Schema$CalendarResource>, callback: BodyResponseCallback<Schema$CalendarResource>): void;
        insert(params: Params$Resource$Resources$Calendars$Insert, callback: BodyResponseCallback<Schema$CalendarResource>): void;
        insert(callback: BodyResponseCallback<Schema$CalendarResource>): void;
        /**
         * directory.resources.calendars.list
         * @desc Retrieves a list of calendar resources for an account.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.resource.calendar',
         *       'https://www.googleapis.com/auth/admin.directory.resource.calendar.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.resources.calendars.list({
         *     // The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         *     customer: 'placeholder-value',
         *     // Maximum number of results to return.
         *     maxResults: 'placeholder-value',
         *     // Field(s) to sort results by in either ascending or descending order. Supported fields include resourceId, resourceName, capacity, buildingId, and floorName. If no order is specified, defaults to ascending. Should be of the form "field [asc|desc], field [asc|desc], ...". For example buildingId, capacity desc would return results sorted first by buildingId in ascending order then by capacity in descending order.
         *     orderBy: 'placeholder-value',
         *     // Token to specify the next page in the list.
         *     pageToken: 'placeholder-value',
         *     // String query used to filter results. Should be of the form "field operator value" where field can be any of supported fields and operators can be any of supported operations. Operators include '=' for exact match and ':' for prefix match or HAS match where applicable. For prefix match, the value should always be followed by a *. Supported fields include generatedResourceName, name, buildingId, featureInstances.feature.name. For example buildingId=US-NYC-9TH AND featureInstances.feature.name:Phone.
         *     query: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "etag": "my_etag",
         *   //   "items": [],
         *   //   "kind": "my_kind",
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.resources.calendars.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customer The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         * @param {integer=} params.maxResults Maximum number of results to return.
         * @param {string=} params.orderBy Field(s) to sort results by in either ascending or descending order. Supported fields include resourceId, resourceName, capacity, buildingId, and floorName. If no order is specified, defaults to ascending. Should be of the form "field [asc|desc], field [asc|desc], ...". For example buildingId, capacity desc would return results sorted first by buildingId in ascending order then by capacity in descending order.
         * @param {string=} params.pageToken Token to specify the next page in the list.
         * @param {string=} params.query String query used to filter results. Should be of the form "field operator value" where field can be any of supported fields and operators can be any of supported operations. Operators include '=' for exact match and ':' for prefix match or HAS match where applicable. For prefix match, the value should always be followed by a *. Supported fields include generatedResourceName, name, buildingId, featureInstances.feature.name. For example buildingId=US-NYC-9TH AND featureInstances.feature.name:Phone.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Resources$Calendars$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Resources$Calendars$List, options?: MethodOptions): GaxiosPromise<Schema$CalendarResources>;
        list(params: Params$Resource$Resources$Calendars$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Resources$Calendars$List, options: MethodOptions | BodyResponseCallback<Schema$CalendarResources>, callback: BodyResponseCallback<Schema$CalendarResources>): void;
        list(params: Params$Resource$Resources$Calendars$List, callback: BodyResponseCallback<Schema$CalendarResources>): void;
        list(callback: BodyResponseCallback<Schema$CalendarResources>): void;
        /**
         * directory.resources.calendars.patch
         * @desc Updates a calendar resource.  This method supports patch semantics, meaning you only need to include the fields you wish to update. Fields that are not present in the request will be preserved. This method supports patch semantics.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.resource.calendar',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.resources.calendars.patch({
         *     // The unique ID of the calendar resource to update.
         *     calendarResourceId: 'placeholder-value',
         *     // The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         *     customer: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "buildingId": "my_buildingId",
         *       //   "capacity": 0,
         *       //   "etags": "my_etags",
         *       //   "featureInstances": {},
         *       //   "floorName": "my_floorName",
         *       //   "floorSection": "my_floorSection",
         *       //   "generatedResourceName": "my_generatedResourceName",
         *       //   "kind": "my_kind",
         *       //   "resourceCategory": "my_resourceCategory",
         *       //   "resourceDescription": "my_resourceDescription",
         *       //   "resourceEmail": "my_resourceEmail",
         *       //   "resourceId": "my_resourceId",
         *       //   "resourceName": "my_resourceName",
         *       //   "resourceType": "my_resourceType",
         *       //   "userVisibleDescription": "my_userVisibleDescription"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "buildingId": "my_buildingId",
         *   //   "capacity": 0,
         *   //   "etags": "my_etags",
         *   //   "featureInstances": {},
         *   //   "floorName": "my_floorName",
         *   //   "floorSection": "my_floorSection",
         *   //   "generatedResourceName": "my_generatedResourceName",
         *   //   "kind": "my_kind",
         *   //   "resourceCategory": "my_resourceCategory",
         *   //   "resourceDescription": "my_resourceDescription",
         *   //   "resourceEmail": "my_resourceEmail",
         *   //   "resourceId": "my_resourceId",
         *   //   "resourceName": "my_resourceName",
         *   //   "resourceType": "my_resourceType",
         *   //   "userVisibleDescription": "my_userVisibleDescription"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.resources.calendars.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.calendarResourceId The unique ID of the calendar resource to update.
         * @param {string} params.customer The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         * @param {().CalendarResource} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Resources$Calendars$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Resources$Calendars$Patch, options?: MethodOptions): GaxiosPromise<Schema$CalendarResource>;
        patch(params: Params$Resource$Resources$Calendars$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Resources$Calendars$Patch, options: MethodOptions | BodyResponseCallback<Schema$CalendarResource>, callback: BodyResponseCallback<Schema$CalendarResource>): void;
        patch(params: Params$Resource$Resources$Calendars$Patch, callback: BodyResponseCallback<Schema$CalendarResource>): void;
        patch(callback: BodyResponseCallback<Schema$CalendarResource>): void;
        /**
         * directory.resources.calendars.update
         * @desc Updates a calendar resource.  This method supports patch semantics, meaning you only need to include the fields you wish to update. Fields that are not present in the request will be preserved.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.resource.calendar',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.resources.calendars.update({
         *     // The unique ID of the calendar resource to update.
         *     calendarResourceId: 'placeholder-value',
         *     // The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         *     customer: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "buildingId": "my_buildingId",
         *       //   "capacity": 0,
         *       //   "etags": "my_etags",
         *       //   "featureInstances": {},
         *       //   "floorName": "my_floorName",
         *       //   "floorSection": "my_floorSection",
         *       //   "generatedResourceName": "my_generatedResourceName",
         *       //   "kind": "my_kind",
         *       //   "resourceCategory": "my_resourceCategory",
         *       //   "resourceDescription": "my_resourceDescription",
         *       //   "resourceEmail": "my_resourceEmail",
         *       //   "resourceId": "my_resourceId",
         *       //   "resourceName": "my_resourceName",
         *       //   "resourceType": "my_resourceType",
         *       //   "userVisibleDescription": "my_userVisibleDescription"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "buildingId": "my_buildingId",
         *   //   "capacity": 0,
         *   //   "etags": "my_etags",
         *   //   "featureInstances": {},
         *   //   "floorName": "my_floorName",
         *   //   "floorSection": "my_floorSection",
         *   //   "generatedResourceName": "my_generatedResourceName",
         *   //   "kind": "my_kind",
         *   //   "resourceCategory": "my_resourceCategory",
         *   //   "resourceDescription": "my_resourceDescription",
         *   //   "resourceEmail": "my_resourceEmail",
         *   //   "resourceId": "my_resourceId",
         *   //   "resourceName": "my_resourceName",
         *   //   "resourceType": "my_resourceType",
         *   //   "userVisibleDescription": "my_userVisibleDescription"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.resources.calendars.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.calendarResourceId The unique ID of the calendar resource to update.
         * @param {string} params.customer The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         * @param {().CalendarResource} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Resources$Calendars$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Resources$Calendars$Update, options?: MethodOptions): GaxiosPromise<Schema$CalendarResource>;
        update(params: Params$Resource$Resources$Calendars$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Resources$Calendars$Update, options: MethodOptions | BodyResponseCallback<Schema$CalendarResource>, callback: BodyResponseCallback<Schema$CalendarResource>): void;
        update(params: Params$Resource$Resources$Calendars$Update, callback: BodyResponseCallback<Schema$CalendarResource>): void;
        update(callback: BodyResponseCallback<Schema$CalendarResource>): void;
    }
    export interface Params$Resource$Resources$Calendars$Delete extends StandardParameters {
        /**
         * The unique ID of the calendar resource to delete.
         */
        calendarResourceId?: string;
        /**
         * The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         */
        customer?: string;
    }
    export interface Params$Resource$Resources$Calendars$Get extends StandardParameters {
        /**
         * The unique ID of the calendar resource to retrieve.
         */
        calendarResourceId?: string;
        /**
         * The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         */
        customer?: string;
    }
    export interface Params$Resource$Resources$Calendars$Insert extends StandardParameters {
        /**
         * The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         */
        customer?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$CalendarResource;
    }
    export interface Params$Resource$Resources$Calendars$List extends StandardParameters {
        /**
         * The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         */
        customer?: string;
        /**
         * Maximum number of results to return.
         */
        maxResults?: number;
        /**
         * Field(s) to sort results by in either ascending or descending order. Supported fields include resourceId, resourceName, capacity, buildingId, and floorName. If no order is specified, defaults to ascending. Should be of the form "field [asc|desc], field [asc|desc], ...". For example buildingId, capacity desc would return results sorted first by buildingId in ascending order then by capacity in descending order.
         */
        orderBy?: string;
        /**
         * Token to specify the next page in the list.
         */
        pageToken?: string;
        /**
         * String query used to filter results. Should be of the form "field operator value" where field can be any of supported fields and operators can be any of supported operations. Operators include '=' for exact match and ':' for prefix match or HAS match where applicable. For prefix match, the value should always be followed by a *. Supported fields include generatedResourceName, name, buildingId, featureInstances.feature.name. For example buildingId=US-NYC-9TH AND featureInstances.feature.name:Phone.
         */
        query?: string;
    }
    export interface Params$Resource$Resources$Calendars$Patch extends StandardParameters {
        /**
         * The unique ID of the calendar resource to update.
         */
        calendarResourceId?: string;
        /**
         * The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         */
        customer?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$CalendarResource;
    }
    export interface Params$Resource$Resources$Calendars$Update extends StandardParameters {
        /**
         * The unique ID of the calendar resource to update.
         */
        calendarResourceId?: string;
        /**
         * The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         */
        customer?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$CalendarResource;
    }
    export class Resource$Resources$Features {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * directory.resources.features.delete
         * @desc Deletes a feature.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.resource.calendar',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.resources.features.delete({
         *     // The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         *     customer: 'placeholder-value',
         *     // The unique ID of the feature to delete.
         *     featureKey: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.resources.features.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customer The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         * @param {string} params.featureKey The unique ID of the feature to delete.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Resources$Features$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Resources$Features$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Resources$Features$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Resources$Features$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Resources$Features$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * directory.resources.features.get
         * @desc Retrieves a feature.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.resource.calendar',
         *       'https://www.googleapis.com/auth/admin.directory.resource.calendar.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.resources.features.get({
         *     // The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         *     customer: 'placeholder-value',
         *     // The unique ID of the feature to retrieve.
         *     featureKey: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "etags": "my_etags",
         *   //   "kind": "my_kind",
         *   //   "name": "my_name"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.resources.features.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customer The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         * @param {string} params.featureKey The unique ID of the feature to retrieve.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Resources$Features$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Resources$Features$Get, options?: MethodOptions): GaxiosPromise<Schema$Feature>;
        get(params: Params$Resource$Resources$Features$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Resources$Features$Get, options: MethodOptions | BodyResponseCallback<Schema$Feature>, callback: BodyResponseCallback<Schema$Feature>): void;
        get(params: Params$Resource$Resources$Features$Get, callback: BodyResponseCallback<Schema$Feature>): void;
        get(callback: BodyResponseCallback<Schema$Feature>): void;
        /**
         * directory.resources.features.insert
         * @desc Inserts a feature.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.resource.calendar',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.resources.features.insert({
         *     // The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         *     customer: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "etags": "my_etags",
         *       //   "kind": "my_kind",
         *       //   "name": "my_name"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "etags": "my_etags",
         *   //   "kind": "my_kind",
         *   //   "name": "my_name"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.resources.features.insert
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customer The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         * @param {().Feature} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        insert(params: Params$Resource$Resources$Features$Insert, options: StreamMethodOptions): GaxiosPromise<Readable>;
        insert(params?: Params$Resource$Resources$Features$Insert, options?: MethodOptions): GaxiosPromise<Schema$Feature>;
        insert(params: Params$Resource$Resources$Features$Insert, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        insert(params: Params$Resource$Resources$Features$Insert, options: MethodOptions | BodyResponseCallback<Schema$Feature>, callback: BodyResponseCallback<Schema$Feature>): void;
        insert(params: Params$Resource$Resources$Features$Insert, callback: BodyResponseCallback<Schema$Feature>): void;
        insert(callback: BodyResponseCallback<Schema$Feature>): void;
        /**
         * directory.resources.features.list
         * @desc Retrieves a list of features for an account.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.resource.calendar',
         *       'https://www.googleapis.com/auth/admin.directory.resource.calendar.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.resources.features.list({
         *     // The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         *     customer: 'placeholder-value',
         *     // Maximum number of results to return.
         *     maxResults: 'placeholder-value',
         *     // Token to specify the next page in the list.
         *     pageToken: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "etag": "my_etag",
         *   //   "features": [],
         *   //   "kind": "my_kind",
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.resources.features.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customer The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         * @param {integer=} params.maxResults Maximum number of results to return.
         * @param {string=} params.pageToken Token to specify the next page in the list.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Resources$Features$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Resources$Features$List, options?: MethodOptions): GaxiosPromise<Schema$Features>;
        list(params: Params$Resource$Resources$Features$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Resources$Features$List, options: MethodOptions | BodyResponseCallback<Schema$Features>, callback: BodyResponseCallback<Schema$Features>): void;
        list(params: Params$Resource$Resources$Features$List, callback: BodyResponseCallback<Schema$Features>): void;
        list(callback: BodyResponseCallback<Schema$Features>): void;
        /**
         * directory.resources.features.patch
         * @desc Updates a feature. This method supports patch semantics.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.resource.calendar',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.resources.features.patch({
         *     // The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         *     customer: 'placeholder-value',
         *     // The unique ID of the feature to update.
         *     featureKey: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "etags": "my_etags",
         *       //   "kind": "my_kind",
         *       //   "name": "my_name"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "etags": "my_etags",
         *   //   "kind": "my_kind",
         *   //   "name": "my_name"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.resources.features.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customer The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         * @param {string} params.featureKey The unique ID of the feature to update.
         * @param {().Feature} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Resources$Features$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Resources$Features$Patch, options?: MethodOptions): GaxiosPromise<Schema$Feature>;
        patch(params: Params$Resource$Resources$Features$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Resources$Features$Patch, options: MethodOptions | BodyResponseCallback<Schema$Feature>, callback: BodyResponseCallback<Schema$Feature>): void;
        patch(params: Params$Resource$Resources$Features$Patch, callback: BodyResponseCallback<Schema$Feature>): void;
        patch(callback: BodyResponseCallback<Schema$Feature>): void;
        /**
         * directory.resources.features.rename
         * @desc Renames a feature.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.resource.calendar',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.resources.features.rename({
         *     // The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         *     customer: 'placeholder-value',
         *     // The unique ID of the feature to rename.
         *     oldName: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "newName": "my_newName"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.resources.features.rename
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customer The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         * @param {string} params.oldName The unique ID of the feature to rename.
         * @param {().FeatureRename} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        rename(params: Params$Resource$Resources$Features$Rename, options: StreamMethodOptions): GaxiosPromise<Readable>;
        rename(params?: Params$Resource$Resources$Features$Rename, options?: MethodOptions): GaxiosPromise<void>;
        rename(params: Params$Resource$Resources$Features$Rename, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        rename(params: Params$Resource$Resources$Features$Rename, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        rename(params: Params$Resource$Resources$Features$Rename, callback: BodyResponseCallback<void>): void;
        rename(callback: BodyResponseCallback<void>): void;
        /**
         * directory.resources.features.update
         * @desc Updates a feature.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.resource.calendar',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.resources.features.update({
         *     // The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         *     customer: 'placeholder-value',
         *     // The unique ID of the feature to update.
         *     featureKey: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "etags": "my_etags",
         *       //   "kind": "my_kind",
         *       //   "name": "my_name"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "etags": "my_etags",
         *   //   "kind": "my_kind",
         *   //   "name": "my_name"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.resources.features.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customer The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         * @param {string} params.featureKey The unique ID of the feature to update.
         * @param {().Feature} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Resources$Features$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Resources$Features$Update, options?: MethodOptions): GaxiosPromise<Schema$Feature>;
        update(params: Params$Resource$Resources$Features$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Resources$Features$Update, options: MethodOptions | BodyResponseCallback<Schema$Feature>, callback: BodyResponseCallback<Schema$Feature>): void;
        update(params: Params$Resource$Resources$Features$Update, callback: BodyResponseCallback<Schema$Feature>): void;
        update(callback: BodyResponseCallback<Schema$Feature>): void;
    }
    export interface Params$Resource$Resources$Features$Delete extends StandardParameters {
        /**
         * The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         */
        customer?: string;
        /**
         * The unique ID of the feature to delete.
         */
        featureKey?: string;
    }
    export interface Params$Resource$Resources$Features$Get extends StandardParameters {
        /**
         * The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         */
        customer?: string;
        /**
         * The unique ID of the feature to retrieve.
         */
        featureKey?: string;
    }
    export interface Params$Resource$Resources$Features$Insert extends StandardParameters {
        /**
         * The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         */
        customer?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Feature;
    }
    export interface Params$Resource$Resources$Features$List extends StandardParameters {
        /**
         * The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         */
        customer?: string;
        /**
         * Maximum number of results to return.
         */
        maxResults?: number;
        /**
         * Token to specify the next page in the list.
         */
        pageToken?: string;
    }
    export interface Params$Resource$Resources$Features$Patch extends StandardParameters {
        /**
         * The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         */
        customer?: string;
        /**
         * The unique ID of the feature to update.
         */
        featureKey?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Feature;
    }
    export interface Params$Resource$Resources$Features$Rename extends StandardParameters {
        /**
         * The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         */
        customer?: string;
        /**
         * The unique ID of the feature to rename.
         */
        oldName?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$FeatureRename;
    }
    export interface Params$Resource$Resources$Features$Update extends StandardParameters {
        /**
         * The unique ID for the customer's G Suite account. As an account administrator, you can also use the my_customer alias to represent your account's customer ID.
         */
        customer?: string;
        /**
         * The unique ID of the feature to update.
         */
        featureKey?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Feature;
    }
    export class Resource$Roleassignments {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * directory.roleAssignments.delete
         * @desc Deletes a role assignment.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.rolemanagement'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.roleAssignments.delete({
         *     // Immutable ID of the G Suite account.
         *     customer: 'placeholder-value',
         *     // Immutable ID of the role assignment.
         *     roleAssignmentId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.roleAssignments.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customer Immutable ID of the G Suite account.
         * @param {string} params.roleAssignmentId Immutable ID of the role assignment.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Roleassignments$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Roleassignments$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Roleassignments$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Roleassignments$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Roleassignments$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * directory.roleAssignments.get
         * @desc Retrieve a role assignment.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.rolemanagement',
         *       'https://www.googleapis.com/auth/admin.directory.rolemanagement.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.roleAssignments.get({
         *     // Immutable ID of the G Suite account.
         *     customer: 'placeholder-value',
         *     // Immutable ID of the role assignment.
         *     roleAssignmentId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "assignedTo": "my_assignedTo",
         *   //   "etag": "my_etag",
         *   //   "kind": "my_kind",
         *   //   "orgUnitId": "my_orgUnitId",
         *   //   "roleAssignmentId": "my_roleAssignmentId",
         *   //   "roleId": "my_roleId",
         *   //   "scopeType": "my_scopeType"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.roleAssignments.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customer Immutable ID of the G Suite account.
         * @param {string} params.roleAssignmentId Immutable ID of the role assignment.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Roleassignments$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Roleassignments$Get, options?: MethodOptions): GaxiosPromise<Schema$RoleAssignment>;
        get(params: Params$Resource$Roleassignments$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Roleassignments$Get, options: MethodOptions | BodyResponseCallback<Schema$RoleAssignment>, callback: BodyResponseCallback<Schema$RoleAssignment>): void;
        get(params: Params$Resource$Roleassignments$Get, callback: BodyResponseCallback<Schema$RoleAssignment>): void;
        get(callback: BodyResponseCallback<Schema$RoleAssignment>): void;
        /**
         * directory.roleAssignments.insert
         * @desc Creates a role assignment.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.rolemanagement'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.roleAssignments.insert({
         *     // Immutable ID of the G Suite account.
         *     customer: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "assignedTo": "my_assignedTo",
         *       //   "etag": "my_etag",
         *       //   "kind": "my_kind",
         *       //   "orgUnitId": "my_orgUnitId",
         *       //   "roleAssignmentId": "my_roleAssignmentId",
         *       //   "roleId": "my_roleId",
         *       //   "scopeType": "my_scopeType"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "assignedTo": "my_assignedTo",
         *   //   "etag": "my_etag",
         *   //   "kind": "my_kind",
         *   //   "orgUnitId": "my_orgUnitId",
         *   //   "roleAssignmentId": "my_roleAssignmentId",
         *   //   "roleId": "my_roleId",
         *   //   "scopeType": "my_scopeType"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.roleAssignments.insert
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customer Immutable ID of the G Suite account.
         * @param {().RoleAssignment} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        insert(params: Params$Resource$Roleassignments$Insert, options: StreamMethodOptions): GaxiosPromise<Readable>;
        insert(params?: Params$Resource$Roleassignments$Insert, options?: MethodOptions): GaxiosPromise<Schema$RoleAssignment>;
        insert(params: Params$Resource$Roleassignments$Insert, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        insert(params: Params$Resource$Roleassignments$Insert, options: MethodOptions | BodyResponseCallback<Schema$RoleAssignment>, callback: BodyResponseCallback<Schema$RoleAssignment>): void;
        insert(params: Params$Resource$Roleassignments$Insert, callback: BodyResponseCallback<Schema$RoleAssignment>): void;
        insert(callback: BodyResponseCallback<Schema$RoleAssignment>): void;
        /**
         * directory.roleAssignments.list
         * @desc Retrieves a paginated list of all roleAssignments.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.rolemanagement',
         *       'https://www.googleapis.com/auth/admin.directory.rolemanagement.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.roleAssignments.list({
         *     // Immutable ID of the G Suite account.
         *     customer: 'placeholder-value',
         *     // Maximum number of results to return.
         *     maxResults: 'placeholder-value',
         *     // Token to specify the next page in the list.
         *     pageToken: 'placeholder-value',
         *     // Immutable ID of a role. If included in the request, returns only role assignments containing this role ID.
         *     roleId: 'placeholder-value',
         *     // The user's primary email address, alias email address, or unique user ID. If included in the request, returns role assignments only for this user.
         *     userKey: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "etag": "my_etag",
         *   //   "items": [],
         *   //   "kind": "my_kind",
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.roleAssignments.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customer Immutable ID of the G Suite account.
         * @param {integer=} params.maxResults Maximum number of results to return.
         * @param {string=} params.pageToken Token to specify the next page in the list.
         * @param {string=} params.roleId Immutable ID of a role. If included in the request, returns only role assignments containing this role ID.
         * @param {string=} params.userKey The user's primary email address, alias email address, or unique user ID. If included in the request, returns role assignments only for this user.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Roleassignments$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Roleassignments$List, options?: MethodOptions): GaxiosPromise<Schema$RoleAssignments>;
        list(params: Params$Resource$Roleassignments$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Roleassignments$List, options: MethodOptions | BodyResponseCallback<Schema$RoleAssignments>, callback: BodyResponseCallback<Schema$RoleAssignments>): void;
        list(params: Params$Resource$Roleassignments$List, callback: BodyResponseCallback<Schema$RoleAssignments>): void;
        list(callback: BodyResponseCallback<Schema$RoleAssignments>): void;
    }
    export interface Params$Resource$Roleassignments$Delete extends StandardParameters {
        /**
         * Immutable ID of the G Suite account.
         */
        customer?: string;
        /**
         * Immutable ID of the role assignment.
         */
        roleAssignmentId?: string;
    }
    export interface Params$Resource$Roleassignments$Get extends StandardParameters {
        /**
         * Immutable ID of the G Suite account.
         */
        customer?: string;
        /**
         * Immutable ID of the role assignment.
         */
        roleAssignmentId?: string;
    }
    export interface Params$Resource$Roleassignments$Insert extends StandardParameters {
        /**
         * Immutable ID of the G Suite account.
         */
        customer?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$RoleAssignment;
    }
    export interface Params$Resource$Roleassignments$List extends StandardParameters {
        /**
         * Immutable ID of the G Suite account.
         */
        customer?: string;
        /**
         * Maximum number of results to return.
         */
        maxResults?: number;
        /**
         * Token to specify the next page in the list.
         */
        pageToken?: string;
        /**
         * Immutable ID of a role. If included in the request, returns only role assignments containing this role ID.
         */
        roleId?: string;
        /**
         * The user's primary email address, alias email address, or unique user ID. If included in the request, returns role assignments only for this user.
         */
        userKey?: string;
    }
    export class Resource$Roles {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * directory.roles.delete
         * @desc Deletes a role.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.rolemanagement'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.roles.delete({
         *     // Immutable ID of the G Suite account.
         *     customer: 'placeholder-value',
         *     // Immutable ID of the role.
         *     roleId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.roles.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customer Immutable ID of the G Suite account.
         * @param {string} params.roleId Immutable ID of the role.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Roles$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Roles$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Roles$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Roles$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Roles$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * directory.roles.get
         * @desc Retrieves a role.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.rolemanagement',
         *       'https://www.googleapis.com/auth/admin.directory.rolemanagement.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.roles.get({
         *     // Immutable ID of the G Suite account.
         *     customer: 'placeholder-value',
         *     // Immutable ID of the role.
         *     roleId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "etag": "my_etag",
         *   //   "isSuperAdminRole": false,
         *   //   "isSystemRole": false,
         *   //   "kind": "my_kind",
         *   //   "roleDescription": "my_roleDescription",
         *   //   "roleId": "my_roleId",
         *   //   "roleName": "my_roleName",
         *   //   "rolePrivileges": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.roles.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customer Immutable ID of the G Suite account.
         * @param {string} params.roleId Immutable ID of the role.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Roles$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Roles$Get, options?: MethodOptions): GaxiosPromise<Schema$Role>;
        get(params: Params$Resource$Roles$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Roles$Get, options: MethodOptions | BodyResponseCallback<Schema$Role>, callback: BodyResponseCallback<Schema$Role>): void;
        get(params: Params$Resource$Roles$Get, callback: BodyResponseCallback<Schema$Role>): void;
        get(callback: BodyResponseCallback<Schema$Role>): void;
        /**
         * directory.roles.insert
         * @desc Creates a role.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.rolemanagement'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.roles.insert({
         *     // Immutable ID of the G Suite account.
         *     customer: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "etag": "my_etag",
         *       //   "isSuperAdminRole": false,
         *       //   "isSystemRole": false,
         *       //   "kind": "my_kind",
         *       //   "roleDescription": "my_roleDescription",
         *       //   "roleId": "my_roleId",
         *       //   "roleName": "my_roleName",
         *       //   "rolePrivileges": []
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "etag": "my_etag",
         *   //   "isSuperAdminRole": false,
         *   //   "isSystemRole": false,
         *   //   "kind": "my_kind",
         *   //   "roleDescription": "my_roleDescription",
         *   //   "roleId": "my_roleId",
         *   //   "roleName": "my_roleName",
         *   //   "rolePrivileges": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.roles.insert
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customer Immutable ID of the G Suite account.
         * @param {().Role} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        insert(params: Params$Resource$Roles$Insert, options: StreamMethodOptions): GaxiosPromise<Readable>;
        insert(params?: Params$Resource$Roles$Insert, options?: MethodOptions): GaxiosPromise<Schema$Role>;
        insert(params: Params$Resource$Roles$Insert, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        insert(params: Params$Resource$Roles$Insert, options: MethodOptions | BodyResponseCallback<Schema$Role>, callback: BodyResponseCallback<Schema$Role>): void;
        insert(params: Params$Resource$Roles$Insert, callback: BodyResponseCallback<Schema$Role>): void;
        insert(callback: BodyResponseCallback<Schema$Role>): void;
        /**
         * directory.roles.list
         * @desc Retrieves a paginated list of all the roles in a domain.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.rolemanagement',
         *       'https://www.googleapis.com/auth/admin.directory.rolemanagement.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.roles.list({
         *     // Immutable ID of the G Suite account.
         *     customer: 'placeholder-value',
         *     // Maximum number of results to return.
         *     maxResults: 'placeholder-value',
         *     // Token to specify the next page in the list.
         *     pageToken: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "etag": "my_etag",
         *   //   "items": [],
         *   //   "kind": "my_kind",
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.roles.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customer Immutable ID of the G Suite account.
         * @param {integer=} params.maxResults Maximum number of results to return.
         * @param {string=} params.pageToken Token to specify the next page in the list.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Roles$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Roles$List, options?: MethodOptions): GaxiosPromise<Schema$Roles>;
        list(params: Params$Resource$Roles$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Roles$List, options: MethodOptions | BodyResponseCallback<Schema$Roles>, callback: BodyResponseCallback<Schema$Roles>): void;
        list(params: Params$Resource$Roles$List, callback: BodyResponseCallback<Schema$Roles>): void;
        list(callback: BodyResponseCallback<Schema$Roles>): void;
        /**
         * directory.roles.patch
         * @desc Updates a role. This method supports patch semantics.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.rolemanagement'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.roles.patch({
         *     // Immutable ID of the G Suite account.
         *     customer: 'placeholder-value',
         *     // Immutable ID of the role.
         *     roleId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "etag": "my_etag",
         *       //   "isSuperAdminRole": false,
         *       //   "isSystemRole": false,
         *       //   "kind": "my_kind",
         *       //   "roleDescription": "my_roleDescription",
         *       //   "roleId": "my_roleId",
         *       //   "roleName": "my_roleName",
         *       //   "rolePrivileges": []
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "etag": "my_etag",
         *   //   "isSuperAdminRole": false,
         *   //   "isSystemRole": false,
         *   //   "kind": "my_kind",
         *   //   "roleDescription": "my_roleDescription",
         *   //   "roleId": "my_roleId",
         *   //   "roleName": "my_roleName",
         *   //   "rolePrivileges": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.roles.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customer Immutable ID of the G Suite account.
         * @param {string} params.roleId Immutable ID of the role.
         * @param {().Role} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Roles$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Roles$Patch, options?: MethodOptions): GaxiosPromise<Schema$Role>;
        patch(params: Params$Resource$Roles$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Roles$Patch, options: MethodOptions | BodyResponseCallback<Schema$Role>, callback: BodyResponseCallback<Schema$Role>): void;
        patch(params: Params$Resource$Roles$Patch, callback: BodyResponseCallback<Schema$Role>): void;
        patch(callback: BodyResponseCallback<Schema$Role>): void;
        /**
         * directory.roles.update
         * @desc Updates a role.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.rolemanagement'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.roles.update({
         *     // Immutable ID of the G Suite account.
         *     customer: 'placeholder-value',
         *     // Immutable ID of the role.
         *     roleId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "etag": "my_etag",
         *       //   "isSuperAdminRole": false,
         *       //   "isSystemRole": false,
         *       //   "kind": "my_kind",
         *       //   "roleDescription": "my_roleDescription",
         *       //   "roleId": "my_roleId",
         *       //   "roleName": "my_roleName",
         *       //   "rolePrivileges": []
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "etag": "my_etag",
         *   //   "isSuperAdminRole": false,
         *   //   "isSystemRole": false,
         *   //   "kind": "my_kind",
         *   //   "roleDescription": "my_roleDescription",
         *   //   "roleId": "my_roleId",
         *   //   "roleName": "my_roleName",
         *   //   "rolePrivileges": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.roles.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customer Immutable ID of the G Suite account.
         * @param {string} params.roleId Immutable ID of the role.
         * @param {().Role} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Roles$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Roles$Update, options?: MethodOptions): GaxiosPromise<Schema$Role>;
        update(params: Params$Resource$Roles$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Roles$Update, options: MethodOptions | BodyResponseCallback<Schema$Role>, callback: BodyResponseCallback<Schema$Role>): void;
        update(params: Params$Resource$Roles$Update, callback: BodyResponseCallback<Schema$Role>): void;
        update(callback: BodyResponseCallback<Schema$Role>): void;
    }
    export interface Params$Resource$Roles$Delete extends StandardParameters {
        /**
         * Immutable ID of the G Suite account.
         */
        customer?: string;
        /**
         * Immutable ID of the role.
         */
        roleId?: string;
    }
    export interface Params$Resource$Roles$Get extends StandardParameters {
        /**
         * Immutable ID of the G Suite account.
         */
        customer?: string;
        /**
         * Immutable ID of the role.
         */
        roleId?: string;
    }
    export interface Params$Resource$Roles$Insert extends StandardParameters {
        /**
         * Immutable ID of the G Suite account.
         */
        customer?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Role;
    }
    export interface Params$Resource$Roles$List extends StandardParameters {
        /**
         * Immutable ID of the G Suite account.
         */
        customer?: string;
        /**
         * Maximum number of results to return.
         */
        maxResults?: number;
        /**
         * Token to specify the next page in the list.
         */
        pageToken?: string;
    }
    export interface Params$Resource$Roles$Patch extends StandardParameters {
        /**
         * Immutable ID of the G Suite account.
         */
        customer?: string;
        /**
         * Immutable ID of the role.
         */
        roleId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Role;
    }
    export interface Params$Resource$Roles$Update extends StandardParameters {
        /**
         * Immutable ID of the G Suite account.
         */
        customer?: string;
        /**
         * Immutable ID of the role.
         */
        roleId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Role;
    }
    export class Resource$Schemas {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * directory.schemas.delete
         * @desc Delete schema
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.userschema'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.schemas.delete({
         *     // Immutable ID of the G Suite account
         *     customerId: 'placeholder-value',
         *     // Name or immutable ID of the schema
         *     schemaKey: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.schemas.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customerId Immutable ID of the G Suite account
         * @param {string} params.schemaKey Name or immutable ID of the schema
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Schemas$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Schemas$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Schemas$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Schemas$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Schemas$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * directory.schemas.get
         * @desc Retrieve schema
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.userschema',
         *       'https://www.googleapis.com/auth/admin.directory.userschema.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.schemas.get({
         *     // Immutable ID of the G Suite account
         *     customerId: 'placeholder-value',
         *     // Name or immutable ID of the schema
         *     schemaKey: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "displayName": "my_displayName",
         *   //   "etag": "my_etag",
         *   //   "fields": [],
         *   //   "kind": "my_kind",
         *   //   "schemaId": "my_schemaId",
         *   //   "schemaName": "my_schemaName"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.schemas.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customerId Immutable ID of the G Suite account
         * @param {string} params.schemaKey Name or immutable ID of the schema
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Schemas$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Schemas$Get, options?: MethodOptions): GaxiosPromise<Schema$Schema>;
        get(params: Params$Resource$Schemas$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Schemas$Get, options: MethodOptions | BodyResponseCallback<Schema$Schema>, callback: BodyResponseCallback<Schema$Schema>): void;
        get(params: Params$Resource$Schemas$Get, callback: BodyResponseCallback<Schema$Schema>): void;
        get(callback: BodyResponseCallback<Schema$Schema>): void;
        /**
         * directory.schemas.insert
         * @desc Create schema.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.userschema'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.schemas.insert({
         *     // Immutable ID of the G Suite account
         *     customerId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "displayName": "my_displayName",
         *       //   "etag": "my_etag",
         *       //   "fields": [],
         *       //   "kind": "my_kind",
         *       //   "schemaId": "my_schemaId",
         *       //   "schemaName": "my_schemaName"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "displayName": "my_displayName",
         *   //   "etag": "my_etag",
         *   //   "fields": [],
         *   //   "kind": "my_kind",
         *   //   "schemaId": "my_schemaId",
         *   //   "schemaName": "my_schemaName"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.schemas.insert
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customerId Immutable ID of the G Suite account
         * @param {().Schema} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        insert(params: Params$Resource$Schemas$Insert, options: StreamMethodOptions): GaxiosPromise<Readable>;
        insert(params?: Params$Resource$Schemas$Insert, options?: MethodOptions): GaxiosPromise<Schema$Schema>;
        insert(params: Params$Resource$Schemas$Insert, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        insert(params: Params$Resource$Schemas$Insert, options: MethodOptions | BodyResponseCallback<Schema$Schema>, callback: BodyResponseCallback<Schema$Schema>): void;
        insert(params: Params$Resource$Schemas$Insert, callback: BodyResponseCallback<Schema$Schema>): void;
        insert(callback: BodyResponseCallback<Schema$Schema>): void;
        /**
         * directory.schemas.list
         * @desc Retrieve all schemas for a customer
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.userschema',
         *       'https://www.googleapis.com/auth/admin.directory.userschema.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.schemas.list({
         *     // Immutable ID of the G Suite account
         *     customerId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "etag": "my_etag",
         *   //   "kind": "my_kind",
         *   //   "schemas": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.schemas.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customerId Immutable ID of the G Suite account
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Schemas$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Schemas$List, options?: MethodOptions): GaxiosPromise<Schema$Schemas>;
        list(params: Params$Resource$Schemas$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Schemas$List, options: MethodOptions | BodyResponseCallback<Schema$Schemas>, callback: BodyResponseCallback<Schema$Schemas>): void;
        list(params: Params$Resource$Schemas$List, callback: BodyResponseCallback<Schema$Schemas>): void;
        list(callback: BodyResponseCallback<Schema$Schemas>): void;
        /**
         * directory.schemas.patch
         * @desc Update schema. This method supports patch semantics.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.userschema'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.schemas.patch({
         *     // Immutable ID of the G Suite account
         *     customerId: 'placeholder-value',
         *     // Name or immutable ID of the schema.
         *     schemaKey: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "displayName": "my_displayName",
         *       //   "etag": "my_etag",
         *       //   "fields": [],
         *       //   "kind": "my_kind",
         *       //   "schemaId": "my_schemaId",
         *       //   "schemaName": "my_schemaName"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "displayName": "my_displayName",
         *   //   "etag": "my_etag",
         *   //   "fields": [],
         *   //   "kind": "my_kind",
         *   //   "schemaId": "my_schemaId",
         *   //   "schemaName": "my_schemaName"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.schemas.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customerId Immutable ID of the G Suite account
         * @param {string} params.schemaKey Name or immutable ID of the schema.
         * @param {().Schema} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Schemas$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Schemas$Patch, options?: MethodOptions): GaxiosPromise<Schema$Schema>;
        patch(params: Params$Resource$Schemas$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Schemas$Patch, options: MethodOptions | BodyResponseCallback<Schema$Schema>, callback: BodyResponseCallback<Schema$Schema>): void;
        patch(params: Params$Resource$Schemas$Patch, callback: BodyResponseCallback<Schema$Schema>): void;
        patch(callback: BodyResponseCallback<Schema$Schema>): void;
        /**
         * directory.schemas.update
         * @desc Update schema
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.userschema'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.schemas.update({
         *     // Immutable ID of the G Suite account
         *     customerId: 'placeholder-value',
         *     // Name or immutable ID of the schema.
         *     schemaKey: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "displayName": "my_displayName",
         *       //   "etag": "my_etag",
         *       //   "fields": [],
         *       //   "kind": "my_kind",
         *       //   "schemaId": "my_schemaId",
         *       //   "schemaName": "my_schemaName"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "displayName": "my_displayName",
         *   //   "etag": "my_etag",
         *   //   "fields": [],
         *   //   "kind": "my_kind",
         *   //   "schemaId": "my_schemaId",
         *   //   "schemaName": "my_schemaName"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.schemas.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.customerId Immutable ID of the G Suite account
         * @param {string} params.schemaKey Name or immutable ID of the schema.
         * @param {().Schema} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Schemas$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Schemas$Update, options?: MethodOptions): GaxiosPromise<Schema$Schema>;
        update(params: Params$Resource$Schemas$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Schemas$Update, options: MethodOptions | BodyResponseCallback<Schema$Schema>, callback: BodyResponseCallback<Schema$Schema>): void;
        update(params: Params$Resource$Schemas$Update, callback: BodyResponseCallback<Schema$Schema>): void;
        update(callback: BodyResponseCallback<Schema$Schema>): void;
    }
    export interface Params$Resource$Schemas$Delete extends StandardParameters {
        /**
         * Immutable ID of the G Suite account
         */
        customerId?: string;
        /**
         * Name or immutable ID of the schema
         */
        schemaKey?: string;
    }
    export interface Params$Resource$Schemas$Get extends StandardParameters {
        /**
         * Immutable ID of the G Suite account
         */
        customerId?: string;
        /**
         * Name or immutable ID of the schema
         */
        schemaKey?: string;
    }
    export interface Params$Resource$Schemas$Insert extends StandardParameters {
        /**
         * Immutable ID of the G Suite account
         */
        customerId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Schema;
    }
    export interface Params$Resource$Schemas$List extends StandardParameters {
        /**
         * Immutable ID of the G Suite account
         */
        customerId?: string;
    }
    export interface Params$Resource$Schemas$Patch extends StandardParameters {
        /**
         * Immutable ID of the G Suite account
         */
        customerId?: string;
        /**
         * Name or immutable ID of the schema.
         */
        schemaKey?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Schema;
    }
    export interface Params$Resource$Schemas$Update extends StandardParameters {
        /**
         * Immutable ID of the G Suite account
         */
        customerId?: string;
        /**
         * Name or immutable ID of the schema.
         */
        schemaKey?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Schema;
    }
    export class Resource$Tokens {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * directory.tokens.delete
         * @desc Delete all access tokens issued by a user for an application.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.user.security'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.tokens.delete({
         *     // The Client ID of the application the token is issued to.
         *     clientId: 'placeholder-value',
         *     // Identifies the user in the API request. The value can be the user's primary email address, alias email address, or unique user ID.
         *     userKey: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.tokens.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.clientId The Client ID of the application the token is issued to.
         * @param {string} params.userKey Identifies the user in the API request. The value can be the user's primary email address, alias email address, or unique user ID.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Tokens$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Tokens$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Tokens$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Tokens$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Tokens$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * directory.tokens.get
         * @desc Get information about an access token issued by a user.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.user.security'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.tokens.get({
         *     // The Client ID of the application the token is issued to.
         *     clientId: 'placeholder-value',
         *     // Identifies the user in the API request. The value can be the user's primary email address, alias email address, or unique user ID.
         *     userKey: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "anonymous": false,
         *   //   "clientId": "my_clientId",
         *   //   "displayText": "my_displayText",
         *   //   "etag": "my_etag",
         *   //   "kind": "my_kind",
         *   //   "nativeApp": false,
         *   //   "scopes": [],
         *   //   "userKey": "my_userKey"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.tokens.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.clientId The Client ID of the application the token is issued to.
         * @param {string} params.userKey Identifies the user in the API request. The value can be the user's primary email address, alias email address, or unique user ID.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Tokens$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Tokens$Get, options?: MethodOptions): GaxiosPromise<Schema$Token>;
        get(params: Params$Resource$Tokens$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Tokens$Get, options: MethodOptions | BodyResponseCallback<Schema$Token>, callback: BodyResponseCallback<Schema$Token>): void;
        get(params: Params$Resource$Tokens$Get, callback: BodyResponseCallback<Schema$Token>): void;
        get(callback: BodyResponseCallback<Schema$Token>): void;
        /**
         * directory.tokens.list
         * @desc Returns the set of tokens specified user has issued to 3rd party applications.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.user.security'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.tokens.list({
         *     // Identifies the user in the API request. The value can be the user's primary email address, alias email address, or unique user ID.
         *     userKey: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "etag": "my_etag",
         *   //   "items": [],
         *   //   "kind": "my_kind"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.tokens.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.userKey Identifies the user in the API request. The value can be the user's primary email address, alias email address, or unique user ID.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Tokens$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Tokens$List, options?: MethodOptions): GaxiosPromise<Schema$Tokens>;
        list(params: Params$Resource$Tokens$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Tokens$List, options: MethodOptions | BodyResponseCallback<Schema$Tokens>, callback: BodyResponseCallback<Schema$Tokens>): void;
        list(params: Params$Resource$Tokens$List, callback: BodyResponseCallback<Schema$Tokens>): void;
        list(callback: BodyResponseCallback<Schema$Tokens>): void;
    }
    export interface Params$Resource$Tokens$Delete extends StandardParameters {
        /**
         * The Client ID of the application the token is issued to.
         */
        clientId?: string;
        /**
         * Identifies the user in the API request. The value can be the user's primary email address, alias email address, or unique user ID.
         */
        userKey?: string;
    }
    export interface Params$Resource$Tokens$Get extends StandardParameters {
        /**
         * The Client ID of the application the token is issued to.
         */
        clientId?: string;
        /**
         * Identifies the user in the API request. The value can be the user's primary email address, alias email address, or unique user ID.
         */
        userKey?: string;
    }
    export interface Params$Resource$Tokens$List extends StandardParameters {
        /**
         * Identifies the user in the API request. The value can be the user's primary email address, alias email address, or unique user ID.
         */
        userKey?: string;
    }
    export class Resource$Users {
        context: APIRequestContext;
        aliases: Resource$Users$Aliases;
        photos: Resource$Users$Photos;
        constructor(context: APIRequestContext);
        /**
         * directory.users.delete
         * @desc Delete user
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.user'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.users.delete({
         *     // Email or immutable ID of the user
         *     userKey: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.users.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.userKey Email or immutable ID of the user
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Users$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Users$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Users$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Users$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Users$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * directory.users.get
         * @desc retrieve user
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.user',
         *       'https://www.googleapis.com/auth/admin.directory.user.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.users.get({
         *     // Comma-separated list of schema names. All fields from these schemas are fetched. This should only be set when projection=custom.
         *     customFieldMask: 'placeholder-value',
         *     // What subset of fields to fetch for this user.
         *     projection: 'placeholder-value',
         *     // Email or immutable ID of the user
         *     userKey: 'placeholder-value',
         *     // Whether to fetch the ADMIN_VIEW or DOMAIN_PUBLIC view of the user.
         *     viewType: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "addresses": {},
         *   //   "agreedToTerms": false,
         *   //   "aliases": [],
         *   //   "archived": false,
         *   //   "changePasswordAtNextLogin": false,
         *   //   "creationTime": "my_creationTime",
         *   //   "customSchemas": {},
         *   //   "customerId": "my_customerId",
         *   //   "deletionTime": "my_deletionTime",
         *   //   "emails": {},
         *   //   "etag": "my_etag",
         *   //   "externalIds": {},
         *   //   "gender": {},
         *   //   "hashFunction": "my_hashFunction",
         *   //   "id": "my_id",
         *   //   "ims": {},
         *   //   "includeInGlobalAddressList": false,
         *   //   "ipWhitelisted": false,
         *   //   "isAdmin": false,
         *   //   "isDelegatedAdmin": false,
         *   //   "isEnforcedIn2Sv": false,
         *   //   "isEnrolledIn2Sv": false,
         *   //   "isMailboxSetup": false,
         *   //   "keywords": {},
         *   //   "kind": "my_kind",
         *   //   "languages": {},
         *   //   "lastLoginTime": "my_lastLoginTime",
         *   //   "locations": {},
         *   //   "name": {},
         *   //   "nonEditableAliases": [],
         *   //   "notes": {},
         *   //   "orgUnitPath": "my_orgUnitPath",
         *   //   "organizations": {},
         *   //   "password": "my_password",
         *   //   "phones": {},
         *   //   "posixAccounts": {},
         *   //   "primaryEmail": "my_primaryEmail",
         *   //   "recoveryEmail": "my_recoveryEmail",
         *   //   "recoveryPhone": "my_recoveryPhone",
         *   //   "relations": {},
         *   //   "sshPublicKeys": {},
         *   //   "suspended": false,
         *   //   "suspensionReason": "my_suspensionReason",
         *   //   "thumbnailPhotoEtag": "my_thumbnailPhotoEtag",
         *   //   "thumbnailPhotoUrl": "my_thumbnailPhotoUrl",
         *   //   "websites": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.users.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.customFieldMask Comma-separated list of schema names. All fields from these schemas are fetched. This should only be set when projection=custom.
         * @param {string=} params.projection What subset of fields to fetch for this user.
         * @param {string} params.userKey Email or immutable ID of the user
         * @param {string=} params.viewType Whether to fetch the ADMIN_VIEW or DOMAIN_PUBLIC view of the user.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Users$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Users$Get, options?: MethodOptions): GaxiosPromise<Schema$User>;
        get(params: Params$Resource$Users$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Users$Get, options: MethodOptions | BodyResponseCallback<Schema$User>, callback: BodyResponseCallback<Schema$User>): void;
        get(params: Params$Resource$Users$Get, callback: BodyResponseCallback<Schema$User>): void;
        get(callback: BodyResponseCallback<Schema$User>): void;
        /**
         * directory.users.insert
         * @desc create user.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.user'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.users.insert({
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "addresses": {},
         *       //   "agreedToTerms": false,
         *       //   "aliases": [],
         *       //   "archived": false,
         *       //   "changePasswordAtNextLogin": false,
         *       //   "creationTime": "my_creationTime",
         *       //   "customSchemas": {},
         *       //   "customerId": "my_customerId",
         *       //   "deletionTime": "my_deletionTime",
         *       //   "emails": {},
         *       //   "etag": "my_etag",
         *       //   "externalIds": {},
         *       //   "gender": {},
         *       //   "hashFunction": "my_hashFunction",
         *       //   "id": "my_id",
         *       //   "ims": {},
         *       //   "includeInGlobalAddressList": false,
         *       //   "ipWhitelisted": false,
         *       //   "isAdmin": false,
         *       //   "isDelegatedAdmin": false,
         *       //   "isEnforcedIn2Sv": false,
         *       //   "isEnrolledIn2Sv": false,
         *       //   "isMailboxSetup": false,
         *       //   "keywords": {},
         *       //   "kind": "my_kind",
         *       //   "languages": {},
         *       //   "lastLoginTime": "my_lastLoginTime",
         *       //   "locations": {},
         *       //   "name": {},
         *       //   "nonEditableAliases": [],
         *       //   "notes": {},
         *       //   "orgUnitPath": "my_orgUnitPath",
         *       //   "organizations": {},
         *       //   "password": "my_password",
         *       //   "phones": {},
         *       //   "posixAccounts": {},
         *       //   "primaryEmail": "my_primaryEmail",
         *       //   "recoveryEmail": "my_recoveryEmail",
         *       //   "recoveryPhone": "my_recoveryPhone",
         *       //   "relations": {},
         *       //   "sshPublicKeys": {},
         *       //   "suspended": false,
         *       //   "suspensionReason": "my_suspensionReason",
         *       //   "thumbnailPhotoEtag": "my_thumbnailPhotoEtag",
         *       //   "thumbnailPhotoUrl": "my_thumbnailPhotoUrl",
         *       //   "websites": {}
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "addresses": {},
         *   //   "agreedToTerms": false,
         *   //   "aliases": [],
         *   //   "archived": false,
         *   //   "changePasswordAtNextLogin": false,
         *   //   "creationTime": "my_creationTime",
         *   //   "customSchemas": {},
         *   //   "customerId": "my_customerId",
         *   //   "deletionTime": "my_deletionTime",
         *   //   "emails": {},
         *   //   "etag": "my_etag",
         *   //   "externalIds": {},
         *   //   "gender": {},
         *   //   "hashFunction": "my_hashFunction",
         *   //   "id": "my_id",
         *   //   "ims": {},
         *   //   "includeInGlobalAddressList": false,
         *   //   "ipWhitelisted": false,
         *   //   "isAdmin": false,
         *   //   "isDelegatedAdmin": false,
         *   //   "isEnforcedIn2Sv": false,
         *   //   "isEnrolledIn2Sv": false,
         *   //   "isMailboxSetup": false,
         *   //   "keywords": {},
         *   //   "kind": "my_kind",
         *   //   "languages": {},
         *   //   "lastLoginTime": "my_lastLoginTime",
         *   //   "locations": {},
         *   //   "name": {},
         *   //   "nonEditableAliases": [],
         *   //   "notes": {},
         *   //   "orgUnitPath": "my_orgUnitPath",
         *   //   "organizations": {},
         *   //   "password": "my_password",
         *   //   "phones": {},
         *   //   "posixAccounts": {},
         *   //   "primaryEmail": "my_primaryEmail",
         *   //   "recoveryEmail": "my_recoveryEmail",
         *   //   "recoveryPhone": "my_recoveryPhone",
         *   //   "relations": {},
         *   //   "sshPublicKeys": {},
         *   //   "suspended": false,
         *   //   "suspensionReason": "my_suspensionReason",
         *   //   "thumbnailPhotoEtag": "my_thumbnailPhotoEtag",
         *   //   "thumbnailPhotoUrl": "my_thumbnailPhotoUrl",
         *   //   "websites": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.users.insert
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {().User} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        insert(params: Params$Resource$Users$Insert, options: StreamMethodOptions): GaxiosPromise<Readable>;
        insert(params?: Params$Resource$Users$Insert, options?: MethodOptions): GaxiosPromise<Schema$User>;
        insert(params: Params$Resource$Users$Insert, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        insert(params: Params$Resource$Users$Insert, options: MethodOptions | BodyResponseCallback<Schema$User>, callback: BodyResponseCallback<Schema$User>): void;
        insert(params: Params$Resource$Users$Insert, callback: BodyResponseCallback<Schema$User>): void;
        insert(callback: BodyResponseCallback<Schema$User>): void;
        /**
         * directory.users.list
         * @desc Retrieve either deleted users or all users in a domain (paginated)
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.user',
         *       'https://www.googleapis.com/auth/admin.directory.user.readonly',
         *       'https://www.googleapis.com/auth/cloud-platform',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.users.list({
         *     // Immutable ID of the G Suite account. In case of multi-domain, to fetch all users for a customer, fill this field instead of domain.
         *     customer: 'placeholder-value',
         *     // Comma-separated list of schema names. All fields from these schemas are fetched. This should only be set when projection=custom.
         *     customFieldMask: 'placeholder-value',
         *     // Name of the domain. Fill this field to get users from only this domain. To return all users in a multi-domain fill customer field instead.
         *     domain: 'placeholder-value',
         *     // Event on which subscription is intended (if subscribing)
         *     event: 'placeholder-value',
         *     // Maximum number of results to return.
         *     maxResults: 'placeholder-value',
         *     // Column to use for sorting results
         *     orderBy: 'placeholder-value',
         *     // Token to specify next page in the list
         *     pageToken: 'placeholder-value',
         *     // What subset of fields to fetch for this user.
         *     projection: 'placeholder-value',
         *     // Query string search. Should be of the form "". Complete documentation is at https://developers.google.com/admin-sdk/directory/v1/guides/search-users
         *     query: 'placeholder-value',
         *     // If set to true, retrieves the list of deleted users. (Default: false)
         *     showDeleted: 'placeholder-value',
         *     // Whether to return results in ascending or descending order.
         *     sortOrder: 'placeholder-value',
         *     // Whether to fetch the ADMIN_VIEW or DOMAIN_PUBLIC view of the user.
         *     viewType: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "etag": "my_etag",
         *   //   "kind": "my_kind",
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "trigger_event": "my_trigger_event",
         *   //   "users": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.users.list
         * @memberOf! ()
         *
         * @param {object=} params Parameters for request
         * @param {string=} params.customer Immutable ID of the G Suite account. In case of multi-domain, to fetch all users for a customer, fill this field instead of domain.
         * @param {string=} params.customFieldMask Comma-separated list of schema names. All fields from these schemas are fetched. This should only be set when projection=custom.
         * @param {string=} params.domain Name of the domain. Fill this field to get users from only this domain. To return all users in a multi-domain fill customer field instead.
         * @param {string=} params.event Event on which subscription is intended (if subscribing)
         * @param {integer=} params.maxResults Maximum number of results to return.
         * @param {string=} params.orderBy Column to use for sorting results
         * @param {string=} params.pageToken Token to specify next page in the list
         * @param {string=} params.projection What subset of fields to fetch for this user.
         * @param {string=} params.query Query string search. Should be of the form "". Complete documentation is at https://developers.google.com/admin-sdk/directory/v1/guides/search-users
         * @param {string=} params.showDeleted If set to true, retrieves the list of deleted users. (Default: false)
         * @param {string=} params.sortOrder Whether to return results in ascending or descending order.
         * @param {string=} params.viewType Whether to fetch the ADMIN_VIEW or DOMAIN_PUBLIC view of the user.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Users$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Users$List, options?: MethodOptions): GaxiosPromise<Schema$Users>;
        list(params: Params$Resource$Users$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Users$List, options: MethodOptions | BodyResponseCallback<Schema$Users>, callback: BodyResponseCallback<Schema$Users>): void;
        list(params: Params$Resource$Users$List, callback: BodyResponseCallback<Schema$Users>): void;
        list(callback: BodyResponseCallback<Schema$Users>): void;
        /**
         * directory.users.makeAdmin
         * @desc change admin status of a user
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.user'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.users.makeAdmin({
         *     // Email or immutable ID of the user as admin
         *     userKey: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "status": false
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.users.makeAdmin
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.userKey Email or immutable ID of the user as admin
         * @param {().UserMakeAdmin} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        makeAdmin(params: Params$Resource$Users$Makeadmin, options: StreamMethodOptions): GaxiosPromise<Readable>;
        makeAdmin(params?: Params$Resource$Users$Makeadmin, options?: MethodOptions): GaxiosPromise<void>;
        makeAdmin(params: Params$Resource$Users$Makeadmin, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        makeAdmin(params: Params$Resource$Users$Makeadmin, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        makeAdmin(params: Params$Resource$Users$Makeadmin, callback: BodyResponseCallback<void>): void;
        makeAdmin(callback: BodyResponseCallback<void>): void;
        /**
         * directory.users.patch
         * @desc update user. This method supports patch semantics.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.user'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.users.patch({
         *     // Email or immutable ID of the user. If ID, it should match with id of user object
         *     userKey: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "addresses": {},
         *       //   "agreedToTerms": false,
         *       //   "aliases": [],
         *       //   "archived": false,
         *       //   "changePasswordAtNextLogin": false,
         *       //   "creationTime": "my_creationTime",
         *       //   "customSchemas": {},
         *       //   "customerId": "my_customerId",
         *       //   "deletionTime": "my_deletionTime",
         *       //   "emails": {},
         *       //   "etag": "my_etag",
         *       //   "externalIds": {},
         *       //   "gender": {},
         *       //   "hashFunction": "my_hashFunction",
         *       //   "id": "my_id",
         *       //   "ims": {},
         *       //   "includeInGlobalAddressList": false,
         *       //   "ipWhitelisted": false,
         *       //   "isAdmin": false,
         *       //   "isDelegatedAdmin": false,
         *       //   "isEnforcedIn2Sv": false,
         *       //   "isEnrolledIn2Sv": false,
         *       //   "isMailboxSetup": false,
         *       //   "keywords": {},
         *       //   "kind": "my_kind",
         *       //   "languages": {},
         *       //   "lastLoginTime": "my_lastLoginTime",
         *       //   "locations": {},
         *       //   "name": {},
         *       //   "nonEditableAliases": [],
         *       //   "notes": {},
         *       //   "orgUnitPath": "my_orgUnitPath",
         *       //   "organizations": {},
         *       //   "password": "my_password",
         *       //   "phones": {},
         *       //   "posixAccounts": {},
         *       //   "primaryEmail": "my_primaryEmail",
         *       //   "recoveryEmail": "my_recoveryEmail",
         *       //   "recoveryPhone": "my_recoveryPhone",
         *       //   "relations": {},
         *       //   "sshPublicKeys": {},
         *       //   "suspended": false,
         *       //   "suspensionReason": "my_suspensionReason",
         *       //   "thumbnailPhotoEtag": "my_thumbnailPhotoEtag",
         *       //   "thumbnailPhotoUrl": "my_thumbnailPhotoUrl",
         *       //   "websites": {}
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "addresses": {},
         *   //   "agreedToTerms": false,
         *   //   "aliases": [],
         *   //   "archived": false,
         *   //   "changePasswordAtNextLogin": false,
         *   //   "creationTime": "my_creationTime",
         *   //   "customSchemas": {},
         *   //   "customerId": "my_customerId",
         *   //   "deletionTime": "my_deletionTime",
         *   //   "emails": {},
         *   //   "etag": "my_etag",
         *   //   "externalIds": {},
         *   //   "gender": {},
         *   //   "hashFunction": "my_hashFunction",
         *   //   "id": "my_id",
         *   //   "ims": {},
         *   //   "includeInGlobalAddressList": false,
         *   //   "ipWhitelisted": false,
         *   //   "isAdmin": false,
         *   //   "isDelegatedAdmin": false,
         *   //   "isEnforcedIn2Sv": false,
         *   //   "isEnrolledIn2Sv": false,
         *   //   "isMailboxSetup": false,
         *   //   "keywords": {},
         *   //   "kind": "my_kind",
         *   //   "languages": {},
         *   //   "lastLoginTime": "my_lastLoginTime",
         *   //   "locations": {},
         *   //   "name": {},
         *   //   "nonEditableAliases": [],
         *   //   "notes": {},
         *   //   "orgUnitPath": "my_orgUnitPath",
         *   //   "organizations": {},
         *   //   "password": "my_password",
         *   //   "phones": {},
         *   //   "posixAccounts": {},
         *   //   "primaryEmail": "my_primaryEmail",
         *   //   "recoveryEmail": "my_recoveryEmail",
         *   //   "recoveryPhone": "my_recoveryPhone",
         *   //   "relations": {},
         *   //   "sshPublicKeys": {},
         *   //   "suspended": false,
         *   //   "suspensionReason": "my_suspensionReason",
         *   //   "thumbnailPhotoEtag": "my_thumbnailPhotoEtag",
         *   //   "thumbnailPhotoUrl": "my_thumbnailPhotoUrl",
         *   //   "websites": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.users.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.userKey Email or immutable ID of the user. If ID, it should match with id of user object
         * @param {().User} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Users$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Users$Patch, options?: MethodOptions): GaxiosPromise<Schema$User>;
        patch(params: Params$Resource$Users$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Users$Patch, options: MethodOptions | BodyResponseCallback<Schema$User>, callback: BodyResponseCallback<Schema$User>): void;
        patch(params: Params$Resource$Users$Patch, callback: BodyResponseCallback<Schema$User>): void;
        patch(callback: BodyResponseCallback<Schema$User>): void;
        /**
         * directory.users.undelete
         * @desc Undelete a deleted user
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.user'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.users.undelete({
         *     // The immutable id of the user
         *     userKey: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "orgUnitPath": "my_orgUnitPath"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.users.undelete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.userKey The immutable id of the user
         * @param {().UserUndelete} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        undelete(params: Params$Resource$Users$Undelete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        undelete(params?: Params$Resource$Users$Undelete, options?: MethodOptions): GaxiosPromise<void>;
        undelete(params: Params$Resource$Users$Undelete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        undelete(params: Params$Resource$Users$Undelete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        undelete(params: Params$Resource$Users$Undelete, callback: BodyResponseCallback<void>): void;
        undelete(callback: BodyResponseCallback<void>): void;
        /**
         * directory.users.update
         * @desc update user
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.user'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.users.update({
         *     // Email or immutable ID of the user. If ID, it should match with id of user object
         *     userKey: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "addresses": {},
         *       //   "agreedToTerms": false,
         *       //   "aliases": [],
         *       //   "archived": false,
         *       //   "changePasswordAtNextLogin": false,
         *       //   "creationTime": "my_creationTime",
         *       //   "customSchemas": {},
         *       //   "customerId": "my_customerId",
         *       //   "deletionTime": "my_deletionTime",
         *       //   "emails": {},
         *       //   "etag": "my_etag",
         *       //   "externalIds": {},
         *       //   "gender": {},
         *       //   "hashFunction": "my_hashFunction",
         *       //   "id": "my_id",
         *       //   "ims": {},
         *       //   "includeInGlobalAddressList": false,
         *       //   "ipWhitelisted": false,
         *       //   "isAdmin": false,
         *       //   "isDelegatedAdmin": false,
         *       //   "isEnforcedIn2Sv": false,
         *       //   "isEnrolledIn2Sv": false,
         *       //   "isMailboxSetup": false,
         *       //   "keywords": {},
         *       //   "kind": "my_kind",
         *       //   "languages": {},
         *       //   "lastLoginTime": "my_lastLoginTime",
         *       //   "locations": {},
         *       //   "name": {},
         *       //   "nonEditableAliases": [],
         *       //   "notes": {},
         *       //   "orgUnitPath": "my_orgUnitPath",
         *       //   "organizations": {},
         *       //   "password": "my_password",
         *       //   "phones": {},
         *       //   "posixAccounts": {},
         *       //   "primaryEmail": "my_primaryEmail",
         *       //   "recoveryEmail": "my_recoveryEmail",
         *       //   "recoveryPhone": "my_recoveryPhone",
         *       //   "relations": {},
         *       //   "sshPublicKeys": {},
         *       //   "suspended": false,
         *       //   "suspensionReason": "my_suspensionReason",
         *       //   "thumbnailPhotoEtag": "my_thumbnailPhotoEtag",
         *       //   "thumbnailPhotoUrl": "my_thumbnailPhotoUrl",
         *       //   "websites": {}
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "addresses": {},
         *   //   "agreedToTerms": false,
         *   //   "aliases": [],
         *   //   "archived": false,
         *   //   "changePasswordAtNextLogin": false,
         *   //   "creationTime": "my_creationTime",
         *   //   "customSchemas": {},
         *   //   "customerId": "my_customerId",
         *   //   "deletionTime": "my_deletionTime",
         *   //   "emails": {},
         *   //   "etag": "my_etag",
         *   //   "externalIds": {},
         *   //   "gender": {},
         *   //   "hashFunction": "my_hashFunction",
         *   //   "id": "my_id",
         *   //   "ims": {},
         *   //   "includeInGlobalAddressList": false,
         *   //   "ipWhitelisted": false,
         *   //   "isAdmin": false,
         *   //   "isDelegatedAdmin": false,
         *   //   "isEnforcedIn2Sv": false,
         *   //   "isEnrolledIn2Sv": false,
         *   //   "isMailboxSetup": false,
         *   //   "keywords": {},
         *   //   "kind": "my_kind",
         *   //   "languages": {},
         *   //   "lastLoginTime": "my_lastLoginTime",
         *   //   "locations": {},
         *   //   "name": {},
         *   //   "nonEditableAliases": [],
         *   //   "notes": {},
         *   //   "orgUnitPath": "my_orgUnitPath",
         *   //   "organizations": {},
         *   //   "password": "my_password",
         *   //   "phones": {},
         *   //   "posixAccounts": {},
         *   //   "primaryEmail": "my_primaryEmail",
         *   //   "recoveryEmail": "my_recoveryEmail",
         *   //   "recoveryPhone": "my_recoveryPhone",
         *   //   "relations": {},
         *   //   "sshPublicKeys": {},
         *   //   "suspended": false,
         *   //   "suspensionReason": "my_suspensionReason",
         *   //   "thumbnailPhotoEtag": "my_thumbnailPhotoEtag",
         *   //   "thumbnailPhotoUrl": "my_thumbnailPhotoUrl",
         *   //   "websites": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.users.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.userKey Email or immutable ID of the user. If ID, it should match with id of user object
         * @param {().User} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Users$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Users$Update, options?: MethodOptions): GaxiosPromise<Schema$User>;
        update(params: Params$Resource$Users$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Users$Update, options: MethodOptions | BodyResponseCallback<Schema$User>, callback: BodyResponseCallback<Schema$User>): void;
        update(params: Params$Resource$Users$Update, callback: BodyResponseCallback<Schema$User>): void;
        update(callback: BodyResponseCallback<Schema$User>): void;
        /**
         * directory.users.watch
         * @desc Watch for changes in users list
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.user',
         *       'https://www.googleapis.com/auth/admin.directory.user.readonly',
         *       'https://www.googleapis.com/auth/cloud-platform',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.users.watch({
         *     // Immutable ID of the G Suite account. In case of multi-domain, to fetch all users for a customer, fill this field instead of domain.
         *     customer: 'placeholder-value',
         *     // Comma-separated list of schema names. All fields from these schemas are fetched. This should only be set when projection=custom.
         *     customFieldMask: 'placeholder-value',
         *     // Name of the domain. Fill this field to get users from only this domain. To return all users in a multi-domain fill customer field instead.
         *     domain: 'placeholder-value',
         *     // Event on which subscription is intended (if subscribing)
         *     event: 'placeholder-value',
         *     // Maximum number of results to return.
         *     maxResults: 'placeholder-value',
         *     // Column to use for sorting results
         *     orderBy: 'placeholder-value',
         *     // Token to specify next page in the list
         *     pageToken: 'placeholder-value',
         *     // What subset of fields to fetch for this user.
         *     projection: 'placeholder-value',
         *     // Query string search. Should be of the form "". Complete documentation is at https://developers.google.com/admin-sdk/directory/v1/guides/search-users
         *     query: 'placeholder-value',
         *     // If set to true, retrieves the list of deleted users. (Default: false)
         *     showDeleted: 'placeholder-value',
         *     // Whether to return results in ascending or descending order.
         *     sortOrder: 'placeholder-value',
         *     // Whether to fetch the ADMIN_VIEW or DOMAIN_PUBLIC view of the user.
         *     viewType: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "address": "my_address",
         *       //   "expiration": "my_expiration",
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "params": {},
         *       //   "payload": false,
         *       //   "resourceId": "my_resourceId",
         *       //   "resourceUri": "my_resourceUri",
         *       //   "token": "my_token",
         *       //   "type": "my_type"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "address": "my_address",
         *   //   "expiration": "my_expiration",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "params": {},
         *   //   "payload": false,
         *   //   "resourceId": "my_resourceId",
         *   //   "resourceUri": "my_resourceUri",
         *   //   "token": "my_token",
         *   //   "type": "my_type"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.users.watch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.customer Immutable ID of the G Suite account. In case of multi-domain, to fetch all users for a customer, fill this field instead of domain.
         * @param {string=} params.customFieldMask Comma-separated list of schema names. All fields from these schemas are fetched. This should only be set when projection=custom.
         * @param {string=} params.domain Name of the domain. Fill this field to get users from only this domain. To return all users in a multi-domain fill customer field instead.
         * @param {string=} params.event Event on which subscription is intended (if subscribing)
         * @param {integer=} params.maxResults Maximum number of results to return.
         * @param {string=} params.orderBy Column to use for sorting results
         * @param {string=} params.pageToken Token to specify next page in the list
         * @param {string=} params.projection What subset of fields to fetch for this user.
         * @param {string=} params.query Query string search. Should be of the form "". Complete documentation is at https://developers.google.com/admin-sdk/directory/v1/guides/search-users
         * @param {string=} params.showDeleted If set to true, retrieves the list of deleted users. (Default: false)
         * @param {string=} params.sortOrder Whether to return results in ascending or descending order.
         * @param {string=} params.viewType Whether to fetch the ADMIN_VIEW or DOMAIN_PUBLIC view of the user.
         * @param {().Channel} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        watch(params: Params$Resource$Users$Watch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        watch(params?: Params$Resource$Users$Watch, options?: MethodOptions): GaxiosPromise<Schema$Channel>;
        watch(params: Params$Resource$Users$Watch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        watch(params: Params$Resource$Users$Watch, options: MethodOptions | BodyResponseCallback<Schema$Channel>, callback: BodyResponseCallback<Schema$Channel>): void;
        watch(params: Params$Resource$Users$Watch, callback: BodyResponseCallback<Schema$Channel>): void;
        watch(callback: BodyResponseCallback<Schema$Channel>): void;
    }
    export interface Params$Resource$Users$Delete extends StandardParameters {
        /**
         * Email or immutable ID of the user
         */
        userKey?: string;
    }
    export interface Params$Resource$Users$Get extends StandardParameters {
        /**
         * Comma-separated list of schema names. All fields from these schemas are fetched. This should only be set when projection=custom.
         */
        customFieldMask?: string;
        /**
         * What subset of fields to fetch for this user.
         */
        projection?: string;
        /**
         * Email or immutable ID of the user
         */
        userKey?: string;
        /**
         * Whether to fetch the ADMIN_VIEW or DOMAIN_PUBLIC view of the user.
         */
        viewType?: string;
    }
    export interface Params$Resource$Users$Insert extends StandardParameters {
        /**
         * Request body metadata
         */
        requestBody?: Schema$User;
    }
    export interface Params$Resource$Users$List extends StandardParameters {
        /**
         * Immutable ID of the G Suite account. In case of multi-domain, to fetch all users for a customer, fill this field instead of domain.
         */
        customer?: string;
        /**
         * Comma-separated list of schema names. All fields from these schemas are fetched. This should only be set when projection=custom.
         */
        customFieldMask?: string;
        /**
         * Name of the domain. Fill this field to get users from only this domain. To return all users in a multi-domain fill customer field instead.
         */
        domain?: string;
        /**
         * Event on which subscription is intended (if subscribing)
         */
        event?: string;
        /**
         * Maximum number of results to return.
         */
        maxResults?: number;
        /**
         * Column to use for sorting results
         */
        orderBy?: string;
        /**
         * Token to specify next page in the list
         */
        pageToken?: string;
        /**
         * What subset of fields to fetch for this user.
         */
        projection?: string;
        /**
         * Query string search. Should be of the form "". Complete documentation is at https://developers.google.com/admin-sdk/directory/v1/guides/search-users
         */
        query?: string;
        /**
         * If set to true, retrieves the list of deleted users. (Default: false)
         */
        showDeleted?: string;
        /**
         * Whether to return results in ascending or descending order.
         */
        sortOrder?: string;
        /**
         * Whether to fetch the ADMIN_VIEW or DOMAIN_PUBLIC view of the user.
         */
        viewType?: string;
    }
    export interface Params$Resource$Users$Makeadmin extends StandardParameters {
        /**
         * Email or immutable ID of the user as admin
         */
        userKey?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$UserMakeAdmin;
    }
    export interface Params$Resource$Users$Patch extends StandardParameters {
        /**
         * Email or immutable ID of the user. If ID, it should match with id of user object
         */
        userKey?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$User;
    }
    export interface Params$Resource$Users$Undelete extends StandardParameters {
        /**
         * The immutable id of the user
         */
        userKey?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$UserUndelete;
    }
    export interface Params$Resource$Users$Update extends StandardParameters {
        /**
         * Email or immutable ID of the user. If ID, it should match with id of user object
         */
        userKey?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$User;
    }
    export interface Params$Resource$Users$Watch extends StandardParameters {
        /**
         * Immutable ID of the G Suite account. In case of multi-domain, to fetch all users for a customer, fill this field instead of domain.
         */
        customer?: string;
        /**
         * Comma-separated list of schema names. All fields from these schemas are fetched. This should only be set when projection=custom.
         */
        customFieldMask?: string;
        /**
         * Name of the domain. Fill this field to get users from only this domain. To return all users in a multi-domain fill customer field instead.
         */
        domain?: string;
        /**
         * Event on which subscription is intended (if subscribing)
         */
        event?: string;
        /**
         * Maximum number of results to return.
         */
        maxResults?: number;
        /**
         * Column to use for sorting results
         */
        orderBy?: string;
        /**
         * Token to specify next page in the list
         */
        pageToken?: string;
        /**
         * What subset of fields to fetch for this user.
         */
        projection?: string;
        /**
         * Query string search. Should be of the form "". Complete documentation is at https://developers.google.com/admin-sdk/directory/v1/guides/search-users
         */
        query?: string;
        /**
         * If set to true, retrieves the list of deleted users. (Default: false)
         */
        showDeleted?: string;
        /**
         * Whether to return results in ascending or descending order.
         */
        sortOrder?: string;
        /**
         * Whether to fetch the ADMIN_VIEW or DOMAIN_PUBLIC view of the user.
         */
        viewType?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Channel;
    }
    export class Resource$Users$Aliases {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * directory.users.aliases.delete
         * @desc Remove a alias for the user
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.user',
         *       'https://www.googleapis.com/auth/admin.directory.user.alias',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.users.aliases.delete({
         *     // The alias to be removed
         *     alias: 'placeholder-value',
         *     // Email or immutable ID of the user
         *     userKey: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.users.aliases.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.alias The alias to be removed
         * @param {string} params.userKey Email or immutable ID of the user
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Users$Aliases$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Users$Aliases$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Users$Aliases$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Users$Aliases$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Users$Aliases$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * directory.users.aliases.insert
         * @desc Add a alias for the user
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.user',
         *       'https://www.googleapis.com/auth/admin.directory.user.alias',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.users.aliases.insert({
         *     // Email or immutable ID of the user
         *     userKey: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "alias": "my_alias",
         *       //   "etag": "my_etag",
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "primaryEmail": "my_primaryEmail"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "alias": "my_alias",
         *   //   "etag": "my_etag",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "primaryEmail": "my_primaryEmail"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.users.aliases.insert
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.userKey Email or immutable ID of the user
         * @param {().Alias} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        insert(params: Params$Resource$Users$Aliases$Insert, options: StreamMethodOptions): GaxiosPromise<Readable>;
        insert(params?: Params$Resource$Users$Aliases$Insert, options?: MethodOptions): GaxiosPromise<Schema$Alias>;
        insert(params: Params$Resource$Users$Aliases$Insert, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        insert(params: Params$Resource$Users$Aliases$Insert, options: MethodOptions | BodyResponseCallback<Schema$Alias>, callback: BodyResponseCallback<Schema$Alias>): void;
        insert(params: Params$Resource$Users$Aliases$Insert, callback: BodyResponseCallback<Schema$Alias>): void;
        insert(callback: BodyResponseCallback<Schema$Alias>): void;
        /**
         * directory.users.aliases.list
         * @desc List all aliases for a user
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.user',
         *       'https://www.googleapis.com/auth/admin.directory.user.alias',
         *       'https://www.googleapis.com/auth/admin.directory.user.alias.readonly',
         *       'https://www.googleapis.com/auth/admin.directory.user.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.users.aliases.list({
         *     // Event on which subscription is intended (if subscribing)
         *     event: 'placeholder-value',
         *     // Email or immutable ID of the user
         *     userKey: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "aliases": [],
         *   //   "etag": "my_etag",
         *   //   "kind": "my_kind"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.users.aliases.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.event Event on which subscription is intended (if subscribing)
         * @param {string} params.userKey Email or immutable ID of the user
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Users$Aliases$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Users$Aliases$List, options?: MethodOptions): GaxiosPromise<Schema$Aliases>;
        list(params: Params$Resource$Users$Aliases$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Users$Aliases$List, options: MethodOptions | BodyResponseCallback<Schema$Aliases>, callback: BodyResponseCallback<Schema$Aliases>): void;
        list(params: Params$Resource$Users$Aliases$List, callback: BodyResponseCallback<Schema$Aliases>): void;
        list(callback: BodyResponseCallback<Schema$Aliases>): void;
        /**
         * directory.users.aliases.watch
         * @desc Watch for changes in user aliases list
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.user',
         *       'https://www.googleapis.com/auth/admin.directory.user.alias',
         *       'https://www.googleapis.com/auth/admin.directory.user.alias.readonly',
         *       'https://www.googleapis.com/auth/admin.directory.user.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.users.aliases.watch({
         *     // Event on which subscription is intended (if subscribing)
         *     event: 'placeholder-value',
         *     // Email or immutable ID of the user
         *     userKey: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "address": "my_address",
         *       //   "expiration": "my_expiration",
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "params": {},
         *       //   "payload": false,
         *       //   "resourceId": "my_resourceId",
         *       //   "resourceUri": "my_resourceUri",
         *       //   "token": "my_token",
         *       //   "type": "my_type"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "address": "my_address",
         *   //   "expiration": "my_expiration",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "params": {},
         *   //   "payload": false,
         *   //   "resourceId": "my_resourceId",
         *   //   "resourceUri": "my_resourceUri",
         *   //   "token": "my_token",
         *   //   "type": "my_type"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.users.aliases.watch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.event Event on which subscription is intended (if subscribing)
         * @param {string} params.userKey Email or immutable ID of the user
         * @param {().Channel} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        watch(params: Params$Resource$Users$Aliases$Watch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        watch(params?: Params$Resource$Users$Aliases$Watch, options?: MethodOptions): GaxiosPromise<Schema$Channel>;
        watch(params: Params$Resource$Users$Aliases$Watch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        watch(params: Params$Resource$Users$Aliases$Watch, options: MethodOptions | BodyResponseCallback<Schema$Channel>, callback: BodyResponseCallback<Schema$Channel>): void;
        watch(params: Params$Resource$Users$Aliases$Watch, callback: BodyResponseCallback<Schema$Channel>): void;
        watch(callback: BodyResponseCallback<Schema$Channel>): void;
    }
    export interface Params$Resource$Users$Aliases$Delete extends StandardParameters {
        /**
         * The alias to be removed
         */
        alias?: string;
        /**
         * Email or immutable ID of the user
         */
        userKey?: string;
    }
    export interface Params$Resource$Users$Aliases$Insert extends StandardParameters {
        /**
         * Email or immutable ID of the user
         */
        userKey?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Alias;
    }
    export interface Params$Resource$Users$Aliases$List extends StandardParameters {
        /**
         * Event on which subscription is intended (if subscribing)
         */
        event?: string;
        /**
         * Email or immutable ID of the user
         */
        userKey?: string;
    }
    export interface Params$Resource$Users$Aliases$Watch extends StandardParameters {
        /**
         * Event on which subscription is intended (if subscribing)
         */
        event?: string;
        /**
         * Email or immutable ID of the user
         */
        userKey?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Channel;
    }
    export class Resource$Users$Photos {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * directory.users.photos.delete
         * @desc Remove photos for the user
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.user'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.users.photos.delete({
         *     // Email or immutable ID of the user
         *     userKey: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.users.photos.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.userKey Email or immutable ID of the user
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Users$Photos$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Users$Photos$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Users$Photos$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Users$Photos$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Users$Photos$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * directory.users.photos.get
         * @desc Retrieve photo of a user
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/admin.directory.user',
         *       'https://www.googleapis.com/auth/admin.directory.user.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.users.photos.get({
         *     // Email or immutable ID of the user
         *     userKey: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "etag": "my_etag",
         *   //   "height": 0,
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "mimeType": "my_mimeType",
         *   //   "photoData": "my_photoData",
         *   //   "primaryEmail": "my_primaryEmail",
         *   //   "width": 0
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.users.photos.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.userKey Email or immutable ID of the user
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Users$Photos$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Users$Photos$Get, options?: MethodOptions): GaxiosPromise<Schema$UserPhoto>;
        get(params: Params$Resource$Users$Photos$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Users$Photos$Get, options: MethodOptions | BodyResponseCallback<Schema$UserPhoto>, callback: BodyResponseCallback<Schema$UserPhoto>): void;
        get(params: Params$Resource$Users$Photos$Get, callback: BodyResponseCallback<Schema$UserPhoto>): void;
        get(callback: BodyResponseCallback<Schema$UserPhoto>): void;
        /**
         * directory.users.photos.patch
         * @desc Add a photo for the user. This method supports patch semantics.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.user'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.users.photos.patch({
         *     // Email or immutable ID of the user
         *     userKey: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "etag": "my_etag",
         *       //   "height": 0,
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "mimeType": "my_mimeType",
         *       //   "photoData": "my_photoData",
         *       //   "primaryEmail": "my_primaryEmail",
         *       //   "width": 0
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "etag": "my_etag",
         *   //   "height": 0,
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "mimeType": "my_mimeType",
         *   //   "photoData": "my_photoData",
         *   //   "primaryEmail": "my_primaryEmail",
         *   //   "width": 0
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.users.photos.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.userKey Email or immutable ID of the user
         * @param {().UserPhoto} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Users$Photos$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Users$Photos$Patch, options?: MethodOptions): GaxiosPromise<Schema$UserPhoto>;
        patch(params: Params$Resource$Users$Photos$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Users$Photos$Patch, options: MethodOptions | BodyResponseCallback<Schema$UserPhoto>, callback: BodyResponseCallback<Schema$UserPhoto>): void;
        patch(params: Params$Resource$Users$Photos$Patch, callback: BodyResponseCallback<Schema$UserPhoto>): void;
        patch(callback: BodyResponseCallback<Schema$UserPhoto>): void;
        /**
         * directory.users.photos.update
         * @desc Add a photo for the user
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.user'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.users.photos.update({
         *     // Email or immutable ID of the user
         *     userKey: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "etag": "my_etag",
         *       //   "height": 0,
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "mimeType": "my_mimeType",
         *       //   "photoData": "my_photoData",
         *       //   "primaryEmail": "my_primaryEmail",
         *       //   "width": 0
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "etag": "my_etag",
         *   //   "height": 0,
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "mimeType": "my_mimeType",
         *   //   "photoData": "my_photoData",
         *   //   "primaryEmail": "my_primaryEmail",
         *   //   "width": 0
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.users.photos.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.userKey Email or immutable ID of the user
         * @param {().UserPhoto} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Users$Photos$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Users$Photos$Update, options?: MethodOptions): GaxiosPromise<Schema$UserPhoto>;
        update(params: Params$Resource$Users$Photos$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Users$Photos$Update, options: MethodOptions | BodyResponseCallback<Schema$UserPhoto>, callback: BodyResponseCallback<Schema$UserPhoto>): void;
        update(params: Params$Resource$Users$Photos$Update, callback: BodyResponseCallback<Schema$UserPhoto>): void;
        update(callback: BodyResponseCallback<Schema$UserPhoto>): void;
    }
    export interface Params$Resource$Users$Photos$Delete extends StandardParameters {
        /**
         * Email or immutable ID of the user
         */
        userKey?: string;
    }
    export interface Params$Resource$Users$Photos$Get extends StandardParameters {
        /**
         * Email or immutable ID of the user
         */
        userKey?: string;
    }
    export interface Params$Resource$Users$Photos$Patch extends StandardParameters {
        /**
         * Email or immutable ID of the user
         */
        userKey?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$UserPhoto;
    }
    export interface Params$Resource$Users$Photos$Update extends StandardParameters {
        /**
         * Email or immutable ID of the user
         */
        userKey?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$UserPhoto;
    }
    export class Resource$Verificationcodes {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * directory.verificationCodes.generate
         * @desc Generate new backup verification codes for the user.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.user.security'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.verificationCodes.generate({
         *     // Email or immutable ID of the user
         *     userKey: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.verificationCodes.generate
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.userKey Email or immutable ID of the user
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        generate(params: Params$Resource$Verificationcodes$Generate, options: StreamMethodOptions): GaxiosPromise<Readable>;
        generate(params?: Params$Resource$Verificationcodes$Generate, options?: MethodOptions): GaxiosPromise<void>;
        generate(params: Params$Resource$Verificationcodes$Generate, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        generate(params: Params$Resource$Verificationcodes$Generate, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        generate(params: Params$Resource$Verificationcodes$Generate, callback: BodyResponseCallback<void>): void;
        generate(callback: BodyResponseCallback<void>): void;
        /**
         * directory.verificationCodes.invalidate
         * @desc Invalidate the current backup verification codes for the user.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.user.security'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.verificationCodes.invalidate({
         *     // Email or immutable ID of the user
         *     userKey: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.verificationCodes.invalidate
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.userKey Email or immutable ID of the user
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        invalidate(params: Params$Resource$Verificationcodes$Invalidate, options: StreamMethodOptions): GaxiosPromise<Readable>;
        invalidate(params?: Params$Resource$Verificationcodes$Invalidate, options?: MethodOptions): GaxiosPromise<void>;
        invalidate(params: Params$Resource$Verificationcodes$Invalidate, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        invalidate(params: Params$Resource$Verificationcodes$Invalidate, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        invalidate(params: Params$Resource$Verificationcodes$Invalidate, callback: BodyResponseCallback<void>): void;
        invalidate(callback: BodyResponseCallback<void>): void;
        /**
         * directory.verificationCodes.list
         * @desc Returns the current set of valid backup verification codes for the specified user.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/admin.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const admin = google.admin('directory_v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/admin.directory.user.security'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await directory.verificationCodes.list({
         *     // Identifies the user in the API request. The value can be the user's primary email address, alias email address, or unique user ID.
         *     userKey: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "etag": "my_etag",
         *   //   "items": [],
         *   //   "kind": "my_kind"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias directory.verificationCodes.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.userKey Identifies the user in the API request. The value can be the user's primary email address, alias email address, or unique user ID.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Verificationcodes$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Verificationcodes$List, options?: MethodOptions): GaxiosPromise<Schema$VerificationCodes>;
        list(params: Params$Resource$Verificationcodes$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Verificationcodes$List, options: MethodOptions | BodyResponseCallback<Schema$VerificationCodes>, callback: BodyResponseCallback<Schema$VerificationCodes>): void;
        list(params: Params$Resource$Verificationcodes$List, callback: BodyResponseCallback<Schema$VerificationCodes>): void;
        list(callback: BodyResponseCallback<Schema$VerificationCodes>): void;
    }
    export interface Params$Resource$Verificationcodes$Generate extends StandardParameters {
        /**
         * Email or immutable ID of the user
         */
        userKey?: string;
    }
    export interface Params$Resource$Verificationcodes$Invalidate extends StandardParameters {
        /**
         * Email or immutable ID of the user
         */
        userKey?: string;
    }
    export interface Params$Resource$Verificationcodes$List extends StandardParameters {
        /**
         * Identifies the user in the API request. The value can be the user's primary email address, alias email address, or unique user ID.
         */
        userKey?: string;
    }
    export {};
}
