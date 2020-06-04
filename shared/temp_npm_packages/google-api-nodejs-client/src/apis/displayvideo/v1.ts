// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-irregular-whitespace */

import {
  OAuth2Client,
  JWT,
  Compute,
  UserRefreshClient,
  GaxiosPromise,
  GoogleConfigurable,
  createAPIRequest,
  MethodOptions,
  GlobalOptions,
  BodyResponseCallback,
  APIRequestContext,
} from 'googleapis-common';

export namespace displayvideo_v1 {
  export interface Options extends GlobalOptions {
    version: 'v1';
  }

  interface StandardParameters {
    /**
     * V1 error format.
     */
    '$.xgafv'?: string;
    /**
     * OAuth access token.
     */
    access_token?: string;
    /**
     * Data format for response.
     */
    alt?: string;
    /**
     * JSONP
     */
    callback?: string;
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
     * Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters.
     */
    quotaUser?: string;
    /**
     * Legacy upload protocol for media (e.g. "media", "multipart").
     */
    uploadType?: string;
    /**
     * Upload protocol for media (e.g. "raw", "multipart").
     */
    upload_protocol?: string;
  }

  /**
   * Display &amp; Video 360 API
   *
   * Display &amp; Video 360 API allows users to manage and create campaigns and reports.
   *
   * @example
   * const {google} = require('googleapis');
   * const displayvideo = google.displayvideo('v1');
   *
   * @namespace displayvideo
   * @type {Function}
   * @version v1
   * @variation v1
   * @param {object=} options Options for Displayvideo
   */
  export class Displayvideo {
    context: APIRequestContext;
    advertisers: Resource$Advertisers;
    combinedAudiences: Resource$Combinedaudiences;
    customLists: Resource$Customlists;
    firstAndThirdPartyAudiences: Resource$Firstandthirdpartyaudiences;
    floodlightGroups: Resource$Floodlightgroups;
    googleAudiences: Resource$Googleaudiences;
    inventorySourceGroups: Resource$Inventorysourcegroups;
    inventorySources: Resource$Inventorysources;
    media: Resource$Media;
    partners: Resource$Partners;
    sdfdownloadtasks: Resource$Sdfdownloadtasks;
    targetingTypes: Resource$Targetingtypes;

    constructor(options: GlobalOptions, google?: GoogleConfigurable) {
      this.context = {
        _options: options || {},
        google,
      };

      this.advertisers = new Resource$Advertisers(this.context);
      this.combinedAudiences = new Resource$Combinedaudiences(this.context);
      this.customLists = new Resource$Customlists(this.context);
      this.firstAndThirdPartyAudiences = new Resource$Firstandthirdpartyaudiences(
        this.context
      );
      this.floodlightGroups = new Resource$Floodlightgroups(this.context);
      this.googleAudiences = new Resource$Googleaudiences(this.context);
      this.inventorySourceGroups = new Resource$Inventorysourcegroups(
        this.context
      );
      this.inventorySources = new Resource$Inventorysources(this.context);
      this.media = new Resource$Media(this.context);
      this.partners = new Resource$Partners(this.context);
      this.sdfdownloadtasks = new Resource$Sdfdownloadtasks(this.context);
      this.targetingTypes = new Resource$Targetingtypes(this.context);
    }
  }

  /**
   * Configuration for custom Active View video viewability metrics.
   */
  export interface Schema$ActiveViewVideoViewabilityMetricConfig {
    /**
     * Required. The display name of the custom metric.
     */
    displayName?: string | null;
    /**
     * The minimum visible video duration required (in seconds) in order for an impression to be recorded.  You must specify minimum_duration, minimum_quartile or both. If both are specified, an impression meets the metric criteria if either requirement is met (whichever happens first).
     */
    minimumDuration?: string | null;
    /**
     * The minimum visible video duration required, based on the video quartiles, in order for an impression to be recorded.  You must specify minimum_duration, minimum_quartile or both. If both are specified, an impression meets the metric criteria if either requirement is met (whichever happens first).
     */
    minimumQuartile?: string | null;
    /**
     * Required. The minimum percentage of the video ad&#39;s pixels visible on the screen in order for an impression to be recorded.
     */
    minimumViewability?: string | null;
    /**
     * Required. The minimum percentage of the video ad&#39;s volume required in order for an impression to be recorded.
     */
    minimumVolume?: string | null;
  }
  /**
   * Details of Adloox settings.
   */
  export interface Schema$Adloox {
    /**
     * Adloox&#39;s brand safety settings.
     */
    excludedAdlooxCategories?: string[] | null;
  }
  /**
   * A single advertiser in Display &amp; Video 360 (DV360).
   */
  export interface Schema$Advertiser {
    /**
     * Required. Immutable. Ad server related settings of the advertiser.
     */
    adServerConfig?: Schema$AdvertiserAdServerConfig;
    /**
     * Output only. The unique ID of the advertiser. Assigned by the system.
     */
    advertiserId?: string | null;
    /**
     * Required. Creative related settings of the advertiser.
     */
    creativeConfig?: Schema$AdvertiserCreativeConfig;
    /**
     * Settings that control how advertiser data may be accessed.
     */
    dataAccessConfig?: Schema$AdvertiserDataAccessConfig;
    /**
     * Required. The display name of the advertiser.  Must be UTF-8 encoded with a maximum size of 240 bytes.
     */
    displayName?: string | null;
    /**
     * Required. Controls whether or not insertion orders and line items of the advertiser can spend their budgets and bid on inventory.  * Accepted values are `ENTITY_STATUS_ACTIVE` and `ENTITY_STATUS_SCHEDULED_FOR_DELETION`. * If set to `ENTITY_STATUS_SCHEDULED_FOR_DELETION`, the advertiser will be deleted 30 days from when it was first scheduled for deletion.
     */
    entityStatus?: string | null;
    /**
     * Required. General settings of the advertiser.
     */
    generalConfig?: Schema$AdvertiserGeneralConfig;
    /**
     * Integration details of the advertiser. Only integrationCode is currently applicable to advertiser. Other fields of IntegrationDetails are not supported and will be ignored if provided.
     */
    integrationDetails?: Schema$IntegrationDetails;
    /**
     * Output only. The resource name of the advertiser.
     */
    name?: string | null;
    /**
     * Required. Immutable. The unique ID of the partner that the advertiser belongs to.
     */
    partnerId?: string | null;
    /**
     * Output only. The timestamp when the advertiser was last updated. Assigned by the system.
     */
    updateTime?: string | null;
  }
  /**
   * Ad server related settings of an advertiser.
   */
  export interface Schema$AdvertiserAdServerConfig {
    /**
     * The configuration for advertisers that use both Campaign Manager (CM) and third-party ad servers.
     */
    cmHybridConfig?: Schema$CmHybridConfig;
    /**
     * The configuration for advertisers that use third-party ad servers only.
     */
    thirdPartyOnlyConfig?: Schema$ThirdPartyOnlyConfig;
  }
  /**
   * Creatives related settings of an advertiser.
   */
  export interface Schema$AdvertiserCreativeConfig {
    /**
     * Whether or not the advertiser is enabled for dynamic creatives.
     */
    dynamicCreativeEnabled?: boolean | null;
    /**
     * An ID for configuring campaign monitoring provided by Integral Ad Service (IAS). The DV360 system will append an IAS &quot;Campaign Monitor&quot; tag containing this ID to the creative tag.
     */
    iasClientId?: string | null;
    /**
     * Whether or not to use DV360&#39;s Online Behavioral Advertising (OBA) compliance.  Warning: Changing OBA settings may cause the audit status of your creatives to be reset by some ad exchanges, making them ineligible to serve until they are re-approved.
     */
    obaComplianceDisabled?: boolean | null;
    /**
     * By setting this field to `true`, you, on behalf of your company, authorize Google to use video creatives associated with this Display &amp; Video 360 advertiser to provide reporting and features related to the advertiser&#39;s television campaigns.  Applicable only when the advertiser has a CM hybrid ad server configuration.
     */
    videoCreativeDataSharingAuthorized?: boolean | null;
  }
  /**
   * Settings that control how advertiser related data may be accessed.
   */
  export interface Schema$AdvertiserDataAccessConfig {
    /**
     * Structured Data Files (SDF) settings for the advertiser.  If not specified, the SDF settings of the parent partner are used.
     */
    sdfConfig?: Schema$AdvertiserSdfConfig;
  }
  /**
   * General settings of an advertiser.
   */
  export interface Schema$AdvertiserGeneralConfig {
    /**
     * Required. Immutable. Advertiser&#39;s currency in ISO 4217 format.  Accepted codes and the currencies they represent are:  Currency Code : Currency Name  * `ARS` : Argentine Peso * `AUD` : Australian Dollar * `BRL` : Brazilian Real * `CAD` : Canadian Dollar * `CHF` : Swiss Franc * `CLP` : Chilean Peso * `CNY` : Chinese Yuan * `COP` : Colombian Peso * `CZK` : Czech Koruna * `DKK` : Danish Krone * `EGP` : Egyption Pound * `EUR` : Euro * `GBP` : British Pound * `HKD` : Hong Kong Dollar * `HUF` : Hungarian Forint * `IDR` : Indonesian Rupiah * `ILS` : Israeli Shekel * `INR` : Indian Rupee * `JPY` : Japanese Yen * `KRW` : South Korean Won * `MXN` : Mexican Pesos * `MYR` : Malaysian Ringgit * `NGN` : Nigerian Naira * `NOK` : Norwegian Krone * `NZD` : New Zealand Dollar * `PEN` : Peruvian Nuevo Sol * `PLN` : Polish Zloty * `RON` : New Romanian Leu * `RUB` : Russian Ruble * `SEK` : Swedish Krona * `TRY` : Turkish Lira * `TWD` : New Taiwan Dollar * `USD` : US Dollar * `ZAR` : South African Rand
     */
    currencyCode?: string | null;
    /**
     * Required. The domain URL of the advertiser&#39;s primary website. The system will send this information to publishers that require website URL to associate a campaign with an advertiser.  Provide a URL with no path or query string, beginning with `http:` or `https:`. For example, http://www.example.com
     */
    domainUrl?: string | null;
    /**
     * Output only. The standard TZ database name of the advertiser&#39;s time zone. For example, `America/New_York`.  See more at: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones  For CM hybrid advertisers, the time zone is the same as that of the associated CM account; for third-party only advertisers, the time zone is the same as that of the parent partner.
     */
    timeZone?: string | null;
  }
  /**
   * Structured Data Files (SDF) settings of an advertiser.
   */
  export interface Schema$AdvertiserSdfConfig {
    /**
     * Whether or not this advertiser overrides the SDF configuration of its parent partner.  By default, an advertiser inherits the SDF configuration from the parent partner. To override the partner configuration, set this field to `true` and provide the new configuration in sdfConfig.
     */
    overridePartnerSdfConfig?: boolean | null;
    /**
     * The SDF configuration for the advertiser.  * Required when overridePartnerSdfConfig is `true`. * Output only when overridePartnerSdfConfig is `false`.
     */
    sdfConfig?: Schema$SdfConfig;
  }
  /**
   * Represents a targetable age range. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_AGE_RANGE`.
   */
  export interface Schema$AgeRangeAssignedTargetingOptionDetails {
    /**
     * Output only. The age range of an audience. We only support targeting a continuous age range of an audience. Thus, the age range represented in this field can be 1) targeted solely, or, 2) part of a larger continuous age range. The reach of a continuous age range targeting can be expanded by also targeting an audience of an unknown age.
     */
    ageRange?: string | null;
    /**
     * Required. The targeting_option_id of a TargetingOption of type `TARGETING_TYPE_AGE_RANGE`.
     */
    targetingOptionId?: string | null;
  }
  /**
   * Represents a targetable age range. This will be populated in the age_range_details field when targeting_type is `TARGETING_TYPE_AGE_RANGE`.
   */
  export interface Schema$AgeRangeTargetingOptionDetails {
    /**
     * Output only. The age range of an audience.
     */
    ageRange?: string | null;
  }
  /**
   * Details for assigned app targeting option. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_APP`.
   */
  export interface Schema$AppAssignedTargetingOptionDetails {
    /**
     * Required. The ID of the app.  Android&#39;s Play store app uses bundle ID, for example `com.google.android.gm`. Apple&#39;s App store app ID uses 9 digit string, for example `422689480`.
     */
    appId?: string | null;
    /**
     * Output only. The display name of the app.
     */
    displayName?: string | null;
    /**
     * Indicates if this option is being negatively targeted.
     */
    negative?: boolean | null;
  }
  /**
   * Details for assigned app category targeting option. This will be populated in the app_category_details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_APP_CATEGORY`.
   */
  export interface Schema$AppCategoryAssignedTargetingOptionDetails {
    /**
     * Output only. The display name of the app category.
     */
    displayName?: string | null;
    /**
     * Indicates if this option is being negatively targeted.
     */
    negative?: boolean | null;
    /**
     * Required. The targeting_option_id field when targeting_type is `TARGETING_TYPE_APP_CATEGORY`.
     */
    targetingOptionId?: string | null;
  }
  /**
   * Represents a targetable collection of apps. A collection lets you target dynamic groups of related apps that are maintained by the platform, for example `All Apps/Google Play/Games`. This will be populated in the app_category_details field when targeting_type is `TARGETING_TYPE_APP_CATEGORY`.
   */
  export interface Schema$AppCategoryTargetingOptionDetails {
    /**
     * Output only. The name of the app collection.
     */
    displayName?: string | null;
  }
  /**
   * A single asset.
   */
  export interface Schema$Asset {
    /**
     * The asset content. For uploaded assets, the content is the serving path.
     */
    content?: string | null;
    /**
     * Media ID of the uploaded asset. This is a unique identifier for the asset. This ID can be passed to other API calls, e.g. CreateCreative to associate the asset with a creative.
     */
    mediaId?: string | null;
  }
  /**
   * Asset association for the creative.
   */
  export interface Schema$AssetAssociation {
    /**
     * The associated asset.
     */
    asset?: Schema$Asset;
    /**
     * The role of this asset for the creative.
     */
    role?: string | null;
  }
  /**
   * A single assigned targeting option, which defines the state of a targeting option for an entity with targeting settings, such as a Line Item or Insertion Order.
   */
  export interface Schema$AssignedTargetingOption {
    /**
     * Age range details. This field will be populated when the TargetingType is `TARGETING_TYPE_AGE_RANGE`.
     */
    ageRangeDetails?: Schema$AgeRangeAssignedTargetingOptionDetails;
    /**
     * App category details. This field will be populated when the TargetingType is `TARGETING_TYPE_APP_CATEGORY`.
     */
    appCategoryDetails?: Schema$AppCategoryAssignedTargetingOptionDetails;
    /**
     * App details. This field will be populated when the TargetingType is `TARGETING_TYPE_APP`.
     */
    appDetails?: Schema$AppAssignedTargetingOptionDetails;
    /**
     * Output only. The unique ID of the assigned targeting option. The ID is only unique within a given line item and targeting type. It may be reused in other contexts.
     */
    assignedTargetingOptionId?: string | null;
    /**
     * Audience targeting details. This field will be populated when the TargetingType is `TARGETING_TYPE_AUDIENCE_GROUP`. You can only target one audience group option per line item.
     */
    audienceGroupDetails?: Schema$AudienceGroupAssignedTargetingOptionDetails;
    /**
     * Authorized seller status details. This field will be populated when the TargetingType is `TARGETING_TYPE_AUTHORIZED_SELLER_STATUS`.  You can only target one authorized seller status option per line item.  If a line item doesn&#39;t have an authorized seller status option, all authorized sellers indicated as DIRECT or RESELLER in the ads.txt file are targeted by default.
     */
    authorizedSellerStatusDetails?: Schema$AuthorizedSellerStatusAssignedTargetingOptionDetails;
    /**
     * Browser details. This field will be populated when the TargetingType is `TARGETING_TYPE_BROWSER`.
     */
    browserDetails?: Schema$BrowserAssignedTargetingOptionDetails;
    /**
     * Carrier and ISP details. This field will be populated when the TargetingType is `TARGETING_TYPE_CARRIER_AND_ISP`.
     */
    carrierAndIspDetails?: Schema$CarrierAndIspAssignedTargetingOptionDetails;
    /**
     * Category details. This field will be populated when the TargetingType is `TARGETING_TYPE_CATEGORY`.  Targeting a category will also target its subcategories. If a category is excluded from targeting and a subcategory is included, the exclusion will take precedence.
     */
    categoryDetails?: Schema$CategoryAssignedTargetingOptionDetails;
    /**
     * Channel details. This field will be populated when the TargetingType is `TARGETING_TYPE_CHANNEL`.
     */
    channelDetails?: Schema$ChannelAssignedTargetingOptionDetails;
    /**
     * Content instream position details. This field will be populated when the TargetingType is `TARGETING_TYPE_CONTENT_INSTREAM_POSITION`.
     */
    contentInstreamPositionDetails?: Schema$ContentInstreamPositionAssignedTargetingOptionDetails;
    /**
     * Content outstream position details. This field will be populated when the TargetingType is `TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION`.
     */
    contentOutstreamPositionDetails?: Schema$ContentOutstreamPositionAssignedTargetingOptionDetails;
    /**
     * Day and time details. This field will be populated when the TargetingType is `TARGETING_TYPE_DAY_AND_TIME`.
     */
    dayAndTimeDetails?: Schema$DayAndTimeAssignedTargetingOptionDetails;
    /**
     * Device make and model details. This field will be populated when the TargetingType is `TARGETING_TYPE_DEVICE_MAKE_MODEL`.
     */
    deviceMakeModelDetails?: Schema$DeviceMakeModelAssignedTargetingOptionDetails;
    /**
     * Device Type details. This field will be populated when the TargetingType is `TARGETING_TYPE_DEVICE_TYPE`.
     */
    deviceTypeDetails?: Schema$DeviceTypeAssignedTargetingOptionDetails;
    /**
     * Digital content label details. This field will be populated when the TargetingType is `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION`.  Digital content labels are targeting exclusions. Advertiser level digital content label exclusions, if set, are always applied in serving (even though they aren&#39;t visible in line item settings). Line item settings can exclude content labels in addition to advertiser exclusions, but can&#39;t override them. A line item won&#39;t serve if all the digital content labels are excluded.
     */
    digitalContentLabelExclusionDetails?: Schema$DigitalContentLabelAssignedTargetingOptionDetails;
    /**
     * Environment details. This field will be populated when the TargetingType is `TARGETING_TYPE_ENVIRONMENT`.
     */
    environmentDetails?: Schema$EnvironmentAssignedTargetingOptionDetails;
    /**
     * Exchange details. This field will be populated when the TargetingType is `TARGETING_TYPE_EXCHANGE`.
     */
    exchangeDetails?: Schema$ExchangeAssignedTargetingOptionDetails;
    /**
     * Gender details. This field will be populated when the TargetingType is `TARGETING_TYPE_GENDER`.
     */
    genderDetails?: Schema$GenderAssignedTargetingOptionDetails;
    /**
     * Geographic region details. This field will be populated when the TargetingType is `TARGETING_TYPE_GEO_REGION`.
     */
    geoRegionDetails?: Schema$GeoRegionAssignedTargetingOptionDetails;
    /**
     * Household income details. This field will be populated when the TargetingType is `TARGETING_TYPE_HOUSEHOLD_INCOME`.
     */
    householdIncomeDetails?: Schema$HouseholdIncomeAssignedTargetingOptionDetails;
    /**
     * Output only. The inheritance status of the assigned targeting option.
     */
    inheritance?: string | null;
    /**
     * Inventory source details. This field will be populated when the TargetingType is `TARGETING_TYPE_INVENTORY_SOURCE`.
     */
    inventorySourceDetails?: Schema$InventorySourceAssignedTargetingOptionDetails;
    /**
     * Inventory source group details. This field will be populated when the TargetingType is `TARGETING_TYPE_INVENTORY_SOURCE_GROUP`.
     */
    inventorySourceGroupDetails?: Schema$InventorySourceGroupAssignedTargetingOptionDetails;
    /**
     * Keyword details. This field will be populated when the TargetingType is `TARGETING_TYPE_KEYWORD`.  A maximum of 5000 direct negative keywords can be assigned to a line item. No limit on number of positive keywords that can be assigned.
     */
    keywordDetails?: Schema$KeywordAssignedTargetingOptionDetails;
    /**
     * Language details. This field will be populated when the TargetingType is `TARGETING_TYPE_LANGUAGE`.
     */
    languageDetails?: Schema$LanguageAssignedTargetingOptionDetails;
    /**
     * Output only. The resource name for this assigned targeting option.
     */
    name?: string | null;
    /**
     * Keyword details. This field will be populated when the TargetingType is `TARGETING_TYPE_NEGATIVE_KEYWORD_LIST`.  A maximum of 4 negative keyword lists can be assigned to a line item.
     */
    negativeKeywordListDetails?: Schema$NegativeKeywordListAssignedTargetingOptionDetails;
    /**
     * On screen position details. This field will be populated when the TargetingType is `TARGETING_TYPE_ON_SCREEN_POSITION`.
     */
    onScreenPositionDetails?: Schema$OnScreenPositionAssignedTargetingOptionDetails;
    /**
     * Operating system details. This field will be populated when the TargetingType is `TARGETING_TYPE_OPERATING_SYSTEM`.
     */
    operatingSystemDetails?: Schema$OperatingSystemAssignedTargetingOptionDetails;
    /**
     * Parental status details. This field will be populated when the TargetingType is `TARGETING_TYPE_PARENTAL_STATUS`.
     */
    parentalStatusDetails?: Schema$ParentalStatusAssignedTargetingOptionDetails;
    /**
     * Proximity location list details. This field will be populated when the TargetingType is `TARGETING_TYPE_PROXIMITY_LOCATION_LIST`.
     */
    proximityLocationListDetails?: Schema$ProximityLocationListAssignedTargetingOptionDetails;
    /**
     * Regional location list details. This field will be populated when the TargetingType is `TARGETING_TYPE_REGIONAL_LOCATION_LIST`.
     */
    regionalLocationListDetails?: Schema$RegionalLocationListAssignedTargetingOptionDetails;
    /**
     * Sensitive category details. This field will be populated when the TargetingType is `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION`.  Sensitive categories are targeting exclusions. Advertiser level sensitive category exclusions, if set, are always applied in serving (even though they aren&#39;t visible in line item settings). Line item settings can exclude sensitive categories in addition to advertiser exclusions, but can&#39;t override them.
     */
    sensitiveCategoryExclusionDetails?: Schema$SensitiveCategoryAssignedTargetingOptionDetails;
    /**
     * Sub-exchange details. This field will be populated when the TargetingType is `TARGETING_TYPE_SUB_EXCHANGE`.
     */
    subExchangeDetails?: Schema$SubExchangeAssignedTargetingOptionDetails;
    /**
     * Output only. Identifies the type of this assigned targeting option.
     */
    targetingType?: string | null;
    /**
     * Third party verification details. This field will be populated when the TargetingType is `TARGETING_TYPE_THIRD_PARTY_VERIFIER`.
     */
    thirdPartyVerifierDetails?: Schema$ThirdPartyVerifierAssignedTargetingOptionDetails;
    /**
     * URL details. This field will be populated when the TargetingType is `TARGETING_TYPE_URL`.
     */
    urlDetails?: Schema$UrlAssignedTargetingOptionDetails;
    /**
     * User rewarded content details. This field will be populated when the TargetingType is `TARGETING_TYPE_USER_REWARDED_CONTENT`.
     */
    userRewardedContentDetails?: Schema$UserRewardedContentAssignedTargetingOptionDetails;
    /**
     * Video player size details. This field will be populated when the TargetingType is `TARGETING_TYPE_VIDEO_PLAYER_SIZE`.
     */
    videoPlayerSizeDetails?: Schema$VideoPlayerSizeAssignedTargetingOptionDetails;
    /**
     * Viewability details. This field will be populated when the TargetingType is `TARGETING_TYPE_VIEWABILITY`.  You can only target one viewability option per line item.
     */
    viewabilityDetails?: Schema$ViewabilityAssignedTargetingOptionDetails;
  }
  /**
   * Assigned audience group targeting option details. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_AUDIENCE_GROUP`. The relation between each group is UNION, except for excluded_first_and_third_party_audience_group and excluded_google_audience_group, of which COMPLEMENT is UNION&#39;ed with other groups.
   */
  export interface Schema$AudienceGroupAssignedTargetingOptionDetails {
    /**
     * The first and third party audience ids and recencies of the excluded first and third party audience group. Used for negative targeting. Its COMPLEMENT is used to UNION other audience groups.
     */
    excludedFirstAndThirdPartyAudienceGroup?: Schema$FirstAndThirdPartyAudienceGroup;
    /**
     * The Google audience ids of the excluded Google audience group. Used for negative targeting. It&#39;s COMPLEMENT is used to UNION other audience groups. Only contains Affinity, In-market and Installed-apps type Google audiences. All items are logically ‘OR’ of each other.
     */
    excludedGoogleAudienceGroup?: Schema$GoogleAudienceGroup;
    /**
     * The combined audience ids of the included combined audience group. Contains combined audience ids only.
     */
    includedCombinedAudienceGroup?: Schema$CombinedAudienceGroup;
    /**
     * The custom list ids of the included custom list group. Contains custom list ids only.
     */
    includedCustomListGroup?: Schema$CustomListGroup;
    /**
     * The first and third party audience ids and recencies of included first and third party audience groups. Each first and third party audience group contains first and third party audience ids only. The relation between each first and third party audience group is INTERSECTION, and the result is UNION&#39;ed with other audience groups. Repeated groups with same settings will be ignored.
     */
    includedFirstAndThirdPartyAudienceGroups?: Schema$FirstAndThirdPartyAudienceGroup[];
    /**
     * The Google audience ids of the included Google audience group. Contains Google audience ids only.
     */
    includedGoogleAudienceGroup?: Schema$GoogleAudienceGroup;
  }
  /**
   * The length an audio or a video has been played.
   */
  export interface Schema$AudioVideoOffset {
    /**
     * The offset in percentage of the audio or video duration.
     */
    percentage?: string | null;
    /**
     * The offset in seconds from the start of the audio or video.
     */
    seconds?: string | null;
  }
  /**
   * Represents an assigned authorized seller status. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_AUTHORIZED_SELLER_STATUS`.
   */
  export interface Schema$AuthorizedSellerStatusAssignedTargetingOptionDetails {
    /**
     * Output only. The authorized seller status to target.
     */
    authorizedSellerStatus?: string | null;
    /**
     * Required. The targeting_option_id of a TargetingOption of type `TARGETING_TYPE_AUTHORIZED_SELLER_STATUS`.
     */
    targetingOptionId?: string | null;
  }
  /**
   * Represents a targetable authorized seller status. This will be populated in the authorized_seller_status_details field when targeting_type is `TARGETING_TYPE_AUTHORIZED_SELLER_STATUS`.
   */
  export interface Schema$AuthorizedSellerStatusTargetingOptionDetails {
    /**
     * Output only. The authorized seller status.
     */
    authorizedSellerStatus?: string | null;
  }
  /**
   * Settings that control the bid strategy. Bid strategy determines the bid price.
   */
  export interface Schema$BiddingStrategy {
    /**
     * A strategy that uses a fixed bid price.
     */
    fixedBid?: Schema$FixedBidStrategy;
    /**
     * A strategy that automatically adjusts the bid to optimize to your performance goal while spending the full budget.  At insertion order level, the markup_type of line items cannot be set to `PARTNER_REVENUE_MODEL_MARKUP_TYPE_CPM`. In addition, when performance_goal_type is one of:  * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPA` * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPC` * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_AV_VIEWED` ,  the line_item_type of the insertion order line items must be either:  * `LINE_ITEM_TYPE_DISPLAY_DEFAULT` * `LINE_ITEM_TYPE_VIDEO_DEFAULT` ,  and when performance_goal_type is either:  * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CIVA` * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_IVO_TEN`  the line_item_type of the insertion order line items must be `LINE_ITEM_TYPE_VIDEO_DEFAULT`.
     */
    maximizeSpendAutoBid?: Schema$MaximizeSpendBidStrategy;
    /**
     * A strategy that automatically adjusts the bid to meet or beat a specified performance goal. It is to be used only for a line item entity.
     */
    performanceGoalAutoBid?: Schema$PerformanceGoalBidStrategy;
  }
  /**
   * Details for assigned browser targeting option. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_BROWSER`.
   */
  export interface Schema$BrowserAssignedTargetingOptionDetails {
    /**
     * Output only. The display name of the browser.
     */
    displayName?: string | null;
    /**
     * Indicates if this option is being negatively targeted. All assigned browser targeting options on the same line item must have the same value for this field.
     */
    negative?: boolean | null;
    /**
     * Required. The targeting_option_id of a TargetingOption of type `TARGETING_TYPE_BROWSER`.
     */
    targetingOptionId?: string | null;
  }
  /**
   * Represents a targetable browser. This will be populated in the browser_details field when targeting_type is `TARGETING_TYPE_BROWSER`.
   */
  export interface Schema$BrowserTargetingOptionDetails {
    /**
     * Output only. The display name of the browser.
     */
    displayName?: string | null;
  }
  /**
   * Request message for BulkEditLineItemAssignedTargetingOptions.
   */
  export interface Schema$BulkEditLineItemAssignedTargetingOptionsRequest {
    /**
     * The assigned targeting options to create in batch, specified as a list of `CreateAssignedTargetingOptionsRequest`.
     */
    createRequests?: Schema$CreateAssignedTargetingOptionsRequest[];
    /**
     * The assigned targeting options to delete in batch, specified as a list of `DeleteAssignedTargetingOptionsRequest`.
     */
    deleteRequests?: Schema$DeleteAssignedTargetingOptionsRequest[];
  }
  export interface Schema$BulkEditLineItemAssignedTargetingOptionsResponse {
    /**
     * The list of assigned targeting options that have been successfully created.  This list will be absent if empty.
     */
    createdAssignedTargetingOptions?: Schema$AssignedTargetingOption[];
  }
  export interface Schema$BulkListLineItemAssignedTargetingOptionsResponse {
    /**
     * The list of assigned targeting options.  This list will be absent if empty.
     */
    assignedTargetingOptions?: Schema$AssignedTargetingOption[];
    /**
     * A token identifying the next page of results. This value should be specified as the pageToken in a subsequent BulkListLineItemAssignedTargetingOptionsRequest to fetch the next page of results. This token will be absent if there are no more assigned_targeting_options to return.
     */
    nextPageToken?: string | null;
  }
  /**
   * A single campaign.
   */
  export interface Schema$Campaign {
    /**
     * Output only. The unique ID of the advertiser the campaign belongs to.
     */
    advertiserId?: string | null;
    /**
     * Required. The planned spend and duration of the campaign.
     */
    campaignFlight?: Schema$CampaignFlight;
    /**
     * Required. The goal of the campaign.
     */
    campaignGoal?: Schema$CampaignGoal;
    /**
     * Output only. The unique ID of the campaign. Assigned by the system.
     */
    campaignId?: string | null;
    /**
     * Required. The display name of the campaign.  Must be UTF-8 encoded with a maximum size of 240 bytes.
     */
    displayName?: string | null;
    /**
     * Required. Controls whether or not the insertion orders under this campaign can spend their budgets and bid on inventory.  * Accepted values are `ENTITY_STATUS_ACTIVE`, `ENTITY_STATUS_ARCHIVED`, and `ENTITY_STATUS_PAUSED`. * For CreateCampaign method, `ENTITY_STATUS_ARCHIVED` is not allowed.
     */
    entityStatus?: string | null;
    /**
     * Required. The frequency cap setting of the campaign.
     */
    frequencyCap?: Schema$FrequencyCap;
    /**
     * Output only. The resource name of the campaign.
     */
    name?: string | null;
    /**
     * Output only. The timestamp when the campaign was last updated. Assigned by the system.
     */
    updateTime?: string | null;
  }
  /**
   * Settings that track the planned spend and duration of a campaign.
   */
  export interface Schema$CampaignFlight {
    /**
     * Required. The dates that the campaign is expected to run. They are resolved relative to the parent advertiser&#39;s time zone.  * The dates specified here will not affect serving. They are used to generate alerts and warnings. For example, if the flight date of any child insertion order is outside the range of these dates, the user interface will show a warning. * `start_date` is required and must be the current date or later. * `end_date` is optional. If specified, it must be the `start_date` or later. * Any specified date must be before the year 2037.
     */
    plannedDates?: Schema$DateRange;
    /**
     * The amount the campaign is expected to spend for its given planned_dates. This will not limit serving, but will be used for tracking spend in the DV360 UI.  The amount is in micros. Must be greater than or equal to 0. For example, 500000000 represents 500 standard units of the currency.
     */
    plannedSpendAmountMicros?: string | null;
  }
  /**
   * Settings that control the goal of a campaign.
   */
  export interface Schema$CampaignGoal {
    /**
     * Required. The type of the campaign goal.
     */
    campaignGoalType?: string | null;
    /**
     * Required. The performance goal of the campaign.  Acceptable values for performance_goal_type are:  * `PERFORMANCE_GOAL_TYPE_CPM` * `PERFORMANCE_GOAL_TYPE_CPC` * `PERFORMANCE_GOAL_TYPE_CPA` * `PERFORMANCE_GOAL_TYPE_CPIAVC` * `PERFORMANCE_GOAL_TYPE_CTR` * `PERFORMANCE_GOAL_TYPE_VIEWABILITY` * `PERFORMANCE_GOAL_TYPE_OTHER`
     */
    performanceGoal?: Schema$PerformanceGoal;
  }
  /**
   * Details for assigned carrier and ISP targeting option. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_CARRIER_AND_ISP`.
   */
  export interface Schema$CarrierAndIspAssignedTargetingOptionDetails {
    /**
     * Output only. The display name of the carrier or ISP.
     */
    displayName?: string | null;
    /**
     * Indicates if this option is being negatively targeted. All assigned carrier and ISP targeting options on the same line item must have the same value for this field.
     */
    negative?: boolean | null;
    /**
     * Required. The targeting_option_id of a TargetingOption of type `TARGETING_TYPE_CARRIER_AND_ISP`.
     */
    targetingOptionId?: string | null;
  }
  /**
   * Represents a targetable carrier or ISP. This will be populated in the carrier_and_isp_details field of a TargetingOption when targeting_type is `TARGETING_TYPE_CARRIER_AND_ISP`.
   */
  export interface Schema$CarrierAndIspTargetingOptionDetails {
    /**
     * Output only. The display name of the carrier or ISP.
     */
    displayName?: string | null;
    /**
     * Output only. The type indicating if it&#39;s carrier or ISP.
     */
    type?: string | null;
  }
  /**
   * Assigned category targeting option details. This will be populated in the category_details field when targeting_type is `TARGETING_TYPE_CATEGORY`.
   */
  export interface Schema$CategoryAssignedTargetingOptionDetails {
    /**
     * Output only. The display name of the category.
     */
    displayName?: string | null;
    /**
     * Indicates if this option is being negatively targeted.
     */
    negative?: boolean | null;
    /**
     * Required. The targeting_option_id field when targeting_type is `TARGETING_TYPE_CATEGORY`.
     */
    targetingOptionId?: string | null;
  }
  /**
   * Represents a targetable category. This will be populated in the category_details field of a TargetingOption when targeting_type is `TARGETING_TYPE_CATEGORY`.
   */
  export interface Schema$CategoryTargetingOptionDetails {
    /**
     * Output only. The display name of the category.
     */
    displayName?: string | null;
  }
  /**
   * A single channel. Channels are custom groups of related websites and apps.
   */
  export interface Schema$Channel {
    /**
     * The ID of the advertiser that owns the channel.
     */
    advertiserId?: string | null;
    /**
     * Output only. The unique ID of the channel. Assigned by the system.
     */
    channelId?: string | null;
    /**
     * Required. The display name of the channel. Must be UTF-8 encoded with a maximum length of 240 bytes.
     */
    displayName?: string | null;
    /**
     * Output only. The resource name of the channel.
     */
    name?: string | null;
    /**
     * The ID of the partner that owns the channel.
     */
    partnerId?: string | null;
  }
  /**
   * Details for assigned channel targeting option. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_CHANNEL`.
   */
  export interface Schema$ChannelAssignedTargetingOptionDetails {
    /**
     * Required. ID of the channel. Should refer to the channel ID field on a [Partner-owned channel](partners.channels#Channel.FIELDS.channel_id) or [advertiser-owned channel](advertisers.channels#Channel.FIELDS.channel_id) resource.
     */
    channelId?: string | null;
    /**
     * Indicates if this option is being negatively targeted. For advertiser level assigned targeting option, this field must be true.
     */
    negative?: boolean | null;
  }
  /**
   * Settings for advertisers that use both Campaign Manager (CM) and third-party ad servers.
   */
  export interface Schema$CmHybridConfig {
    /**
     * Required. Immutable. Account ID of the CM Floodlight configuration linked with the DV360 advertiser.
     */
    cmAccountId?: string | null;
    /**
     * Required. Immutable. ID of the CM Floodlight configuration linked with the DV360 advertiser.
     */
    cmFloodlightConfigId?: string | null;
    /**
     * Required. Immutable. By setting this field to `true`, you, on behalf of your company, authorize the sharing of information from the given Floodlight configuration to this Display &amp; Video 360 advertiser.
     */
    cmFloodlightLinkingAuthorized?: boolean | null;
    /**
     * A list of CM sites whose placements will be synced to DV360 as creatives.  If absent or empty in CreateAdvertiser method, the system will automatically create a CM site.  Removing sites from this list may cause DV360 creatives synced from CM to be deleted. At least one site must be specified.
     */
    cmSyncableSiteIds?: string[] | null;
    /**
     * Whether or not to report DV360 cost to CM.
     */
    dv360ToCmCostReportingEnabled?: boolean | null;
    /**
     * Whether or not to include DV360 data in CM data transfer reports.
     */
    dv360ToCmDataSharingEnabled?: boolean | null;
  }
  /**
   * A Campaign Manager tracking ad.
   */
  export interface Schema$CmTrackingAd {
    /**
     * The ad ID of the campaign manager tracking Ad.
     */
    cmAdId?: string | null;
    /**
     * The creative ID of the campaign manager tracking Ad.
     */
    cmCreativeId?: string | null;
    /**
     * The placement ID of the campaign manager tracking Ad.
     */
    cmPlacementId?: string | null;
  }
  /**
   * Describes a combined audience resource.
   */
  export interface Schema$CombinedAudience {
    /**
     * Output only. The unique ID of the combined audience. Assigned by the system.
     */
    combinedAudienceId?: string | null;
    /**
     * Output only. The display name of the combined audience. .
     */
    displayName?: string | null;
    /**
     * Output only. The resource name of the combined audience.
     */
    name?: string | null;
  }
  /**
   * Details of combined audience group. All combined audience targeting settings are logically ‘OR’ of each other.
   */
  export interface Schema$CombinedAudienceGroup {
    /**
     * Required. All combined audience targeting settings in combined audience group. Repeated settings with same id will be ignored. The number of combined audience settings should be no more than five, error will be thrown otherwise.
     */
    settings?: Schema$CombinedAudienceTargetingSetting[];
  }
  /**
   * Details of combined audience targeting setting.
   */
  export interface Schema$CombinedAudienceTargetingSetting {
    /**
     * Required. Combined audience id of combined audience targeting setting. This id is combined_audience_id.
     */
    combinedAudienceId?: string | null;
  }
  /**
   * Assigned content instream position targeting option details. This will be populated in the content_instream_position_details field when targeting_type is `TARGETING_TYPE_CONTENT_INSTREAM_POSITION`.
   */
  export interface Schema$ContentInstreamPositionAssignedTargetingOptionDetails {
    /**
     * Output only. The content instream position for video or audio ads.
     */
    contentInstreamPosition?: string | null;
    /**
     * Required. The targeting_option_id field when targeting_type is `TARGETING_TYPE_CONTENT_INSTREAM_POSITION`.
     */
    targetingOptionId?: string | null;
  }
  /**
   * Represents a targetable content instream position, which could be used by video and audio ads. This will be populated in the content_instream_position_details field when targeting_type is `TARGETING_TYPE_CONTENT_INSTREAM_POSITION`.
   */
  export interface Schema$ContentInstreamPositionTargetingOptionDetails {
    /**
     * Output only. The content instream position.
     */
    contentInstreamPosition?: string | null;
  }
  /**
   * Assigned content outstream position targeting option details. This will be populated in the content_outstream_position_details field when targeting_type is `TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION`.
   */
  export interface Schema$ContentOutstreamPositionAssignedTargetingOptionDetails {
    /**
     * Output only. The content outstream position.
     */
    contentOutstreamPosition?: string | null;
    /**
     * Required. The targeting_option_id field when targeting_type is `TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION`.
     */
    targetingOptionId?: string | null;
  }
  /**
   * Represents a targetable content outstream position, which could be used by display and video ads. This will be populated in the content_outstream_position_details field when targeting_type is `TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION`.
   */
  export interface Schema$ContentOutstreamPositionTargetingOptionDetails {
    /**
     * Output only. The content outstream position.
     */
    contentOutstreamPosition?: string | null;
  }
  /**
   * Settings that control how conversions are counted.  All post-click conversions will be counted. A percentage value can be set for post-view conversions counting.
   */
  export interface Schema$ConversionCountingConfig {
    /**
     * The Floodlight activity configs used to track conversions.  The number of conversions counted is the sum of all of the conversions counted by all of the Floodlight activity IDs specified in this field.
     */
    floodlightActivityConfigs?: Schema$TrackingFloodlightActivityConfig[];
    /**
     * The percentage of post-view conversions to count, in millis (1/1000 of a percent). Must be between 0 and 100000 inclusive.  For example, to track 50% of the post-click conversions, set a value of 50000.
     */
    postViewCountPercentageMillis?: string | null;
  }
  /**
   * Counter event of the creative.
   */
  export interface Schema$CounterEvent {
    /**
     * Required. The name of the counter event.
     */
    name?: string | null;
    /**
     * Required. The name used to identify this counter event in reports.
     */
    reportingName?: string | null;
  }
  /**
   * A request message for CreateAsset.
   */
  export interface Schema$CreateAssetRequest {
    /**
     * Required. The filename of the asset, including the file extension.  The filename must be UTF-8 encoded with a maximum size of 240 bytes.
     */
    filename?: string | null;
  }
  /**
   * A response message for CreateAsset.
   */
  export interface Schema$CreateAssetResponse {
    /**
     * The uploaded asset, if successful.
     */
    asset?: Schema$Asset;
  }
  /**
   * A request listing which assigned targeting options of a given targeting type should be created and added.
   */
  export interface Schema$CreateAssignedTargetingOptionsRequest {
    /**
     * Required. The assigned targeting options to create and add.
     */
    assignedTargetingOptions?: Schema$AssignedTargetingOption[];
    /**
     * Required. Identifies the type of this assigned targeting option.
     */
    targetingType?: string | null;
  }
  /**
   * Request message for [SdfDownloadTaskService.CreateSdfDownloadTask].
   */
  export interface Schema$CreateSdfDownloadTaskRequest {
    /**
     * The ID of the advertiser to download SDF for.
     */
    advertiserId?: string | null;
    /**
     * Filters on entities by their entity IDs.
     */
    idFilter?: Schema$IdFilter;
    /**
     * Filters on Inventory Sources by their IDs.
     */
    inventorySourceFilter?: Schema$InventorySourceFilter;
    /**
     * Filters on selected file types. The entities in each file are filtered  by a chosen set of filter entities. The filter entities must be the same  type as, or a parent type of, the selected file types.
     */
    parentEntityFilter?: Schema$ParentEntityFilter;
    /**
     * The ID of the partner to download SDF for.
     */
    partnerId?: string | null;
    /**
     * Required. The SDF version of the downloaded file. If set to `SDF_VERSION_UNSPECIFIED`, this will default to the version specified by the advertiser or partner identified by `root_id`. An advertiser inherits its SDF version from its partner unless configured otherwise.
     */
    version?: string | null;
  }
  /**
   * A single Creative.
   */
  export interface Schema$Creative {
    /**
     * Additional dimensions. Applicable when creative_type is one of:  * `CREATIVE_TYPE_STANDARD` * `CREATIVE_TYPE_EXPANDABLE` * `CREATIVE_TYPE_NATIVE` * `CREATIVE_TYPE_TEMPLATED_APP_INSTALL` * `CREATIVE_TYPE_NATIVE_SITE_SQUARE` * `CREATIVE_TYPE_LIGHTBOX` * `CREATIVE_TYPE_NATIVE_APP_INSTALL` * `CREATIVE_TYPE_NATIVE_APP_INSTALL_SQUARE` * `CREATIVE_TYPE_PUBLISHER_HOSTED`  If this field is specified, width_pixels and height_pixels are both required and must be greater than or equal to 0.
     */
    additionalDimensions?: Schema$Dimensions[];
    /**
     * Output only. The unique ID of the advertiser the creative belongs to.
     */
    advertiserId?: string | null;
    /**
     * Third-party HTML tracking tag to be appended to the creative tag.
     */
    appendedTag?: string | null;
    /**
     * Required. Assets associated to this creative. Assets can be associated to the creative in one of following roles:  * `ASSET_ROLE_UNSPECIFIED` * `ASSET_ROLE_MAIN` * `ASSET_ROLE_BACKUP` * `ASSET_ROLE_POLITE_LOAD`
     */
    assets?: Schema$AssetAssociation[];
    /**
     * Output only. The unique ID of the Campaign Manager placement associated with the creative. This field is only applicable for creatives that are synced from Campaign Manager.
     */
    cmPlacementId?: string | null;
    /**
     * The Campaign Manager tracking ad associated with the creative.  Optional for the following creative_type when created by an advertiser that uses both Campaign Manager and third-party ad serving:  * `CREATIVE_TYPE_NATIVE` * `CREATIVE_TYPE_NATIVE_SITE_SQUARE` * `CREATIVE_TYPE_NATIVE_APP_INSTALL` * `CREATIVE_TYPE_NATIVE_APP_INSTALL_SQUARE`  Output only for other cases.
     */
    cmTrackingAd?: Schema$CmTrackingAd;
    /**
     * The IDs of companion creatives for a video creative.  You can assign existing display creatives (with image or HTML5 assets) to serve surrounding the publisher&#39;s video player. Companions display around the video player while the video is playing and remain after the video has completed.  Creatives contain additional dimensions can not be companion creatives.  This field is only supported for following creative_type:  * `CREATIVE_TYPE_AUDIO` * `CREATIVE_TYPE_VIDEO`
     */
    companionCreativeIds?: string[] | null;
    /**
     * Counter events for a rich media creative. Counters track the number of times that a user interacts with any part of a rich media creative in a specified way (mouse-overs, mouse-outs, clicks, taps, data loading, keyboard entries, etc.). Any event that can be captured in the creative can be recorded as a counter. Leave it empty or unset for creatives containing image assets only.
     */
    counterEvents?: Schema$CounterEvent[];
    /**
     * Output only. The timestamp when the creative was created. Assigned by the system.
     */
    createTime?: string | null;
    /**
     * Output only. A list of attributes of the creative that is generated by the system.
     */
    creativeAttributes?: string[] | null;
    /**
     * Output only. The unique ID of the creative. Assigned by the system.
     */
    creativeId?: string | null;
    /**
     * Required. Immutable. The type of the creative.
     */
    creativeType?: string | null;
    /**
     * Required. Primary dimensions of the creative. Applicable to all creative types. The value of width_pixels and height_pixels defaults to `0` when creative_type is one of:  * `CREATIVE_TYPE_VIDEO` * `CREATIVE_TYPE_TEMPLATED_APP_INSTALL_INTERSTITIAL` * `CREATIVE_TYPE_AUDIO` * `CREATIVE_TYPE_NATIVE_VIDEO` * `CREATIVE_TYPE_TEMPLATED_APP_INSTALL_VIDEO`
     */
    dimensions?: Schema$Dimensions;
    /**
     * Required. The display name of the creative.  Must be UTF-8 encoded with a maximum size of 240 bytes.
     */
    displayName?: string | null;
    /**
     * Output only. Indicates whether the creative is dynamic.
     */
    dynamic?: boolean | null;
    /**
     * Required. Controls whether or not the creative can serve.  Accepted values are:  * `ENTITY_STATUS_ACTIVE` * `ENTITY_STATUS_ARCHIVED` * `ENTITY_STATUS_PAUSED`
     */
    entityStatus?: string | null;
    /**
     * Required. Exit events for this creative. An exit (also known as a click tag) is any area in your creative that someone can click or tap to open an advertiser&#39;s landing page. Every creative must include at least one exit. You can add an exit to your creative in any of the following ways:  * Use Google Web Designer&#39;s tap area. * Define a JavaScript variable called &quot;clickTag&quot;. * Use the Enabler (Enabler.exit()) to track exits in rich media formats.
     */
    exitEvents?: Schema$ExitEvent[];
    /**
     * Optional. Specifies the expanding direction of the creative.  Required and only valid for third-party expandable creatives.  Third-party expandable creatives are creatives with following hosting source:  * `HOSTING_SOURCE_THIRD_PARTY`  combined with following creative_type:  * `CREATIVE_TYPE_EXPANDABLE`
     */
    expandingDirection?: string | null;
    /**
     * Optional. Indicates the creative will automatically expand on hover.  Optional and only valid for third-party expandable creatives. Third-party expandable creatives are creatives with following hosting source:  * `HOSTING_SOURCE_THIRD_PARTY`  combined with following creative_type:  * `CREATIVE_TYPE_EXPANDABLE`
     */
    expandOnHover?: boolean | null;
    /**
     * Required. Indicates where the creative is hosted.
     */
    hostingSource?: string | null;
    /**
     * Output only. Indicates the third-party VAST tag creative requires HTML5 Video support.  Output only and only valid for third-party VAST tag creatives.  Third-party VAST tag creatives are creatives with following hosting_source:  * `HOSTING_SOURCE_THIRD_PARTY`  combined with following creative_type:  * `CREATIVE_TYPE_VIDEO`
     */
    html5Video?: boolean | null;
    /**
     * Indicates whether Integral Ad Science (IAS) campaign monitoring is enabled. To enable this for the creative, make sure the Advertiser.creative_config.ias_client_id has been set to your IAS client ID.
     */
    iasCampaignMonitoring?: boolean | null;
    /**
     * ID information used to link this creative to an external system. Must be UTF-8 encoded with a length of no more than 10,000 characters.
     */
    integrationCode?: string | null;
    /**
     * JavaScript measurement URL from supported third-party verification providers (ComScore, DoubleVerify, IAS, Moat). HTML script tags are not supported.  This field is only supported in following creative_type:  * `CREATIVE_TYPE_NATIVE` * `CREATIVE_TYPE_NATIVE_SITE_SQUARE` * `CREATIVE_TYPE_NATIVE_APP_INSTALL` * `CREATIVE_TYPE_NATIVE_APP_INSTALL_SQUARE` * `CREATIVE_TYPE_NATIVE_VIDEO`
     */
    jsTrackerUrl?: string | null;
    /**
     * Output only. Media duration of the creative. Applicable when creative_type is one of:  * `CREATIVE_TYPE_VIDEO` * `CREATIVE_TYPE_AUDIO` * `CREATIVE_TYPE_NATIVE_VIDEO` * `CREATIVE_TYPE_PUBLISHER_HOSTED`
     */
    mediaDuration?: string | null;
    /**
     * Output only. The resource name of the creative.
     */
    name?: string | null;
    /**
     * User notes for this creative. Must be UTF-8 encoded with a length of no more than 20,000 characters.
     */
    notes?: string | null;
    /**
     * Specifies the OBA icon for a video creative.  This field is only supported in following creative_type:  * `CREATIVE_TYPE_VIDEO`
     */
    obaIcon?: Schema$ObaIcon;
    /**
     * Amount of time to play the video before counting a view.  This field is required when skippable is true.  This field is only supported for the following creative_type:  * `CREATIVE_TYPE_VIDEO`
     */
    progressOffset?: Schema$AudioVideoOffset;
    /**
     * Optional. Indicates that the creative relies on HTML5 to render properly.  Optional and only valid for third-party tag creatives. Third-party tag creatives are creatives with following hosting_source:  * `HOSTING_SOURCE_THIRD_PARTY`  combined with following creative_type:  * `CREATIVE_TYPE_STANDARD` * `CREATIVE_TYPE_EXPANDABLE`
     */
    requireHtml5?: boolean | null;
    /**
     * Optional. Indicates that the creative requires MRAID (Mobile Rich Media Ad Interface Definitions system).  Set this if the creative relies on mobile gestures for interactivity, such as swiping or tapping.  Optional and only valid for third-party tag creatives.  Third-party tag creatives are creatives with following hosting_source:  * `HOSTING_SOURCE_THIRD_PARTY`  combined with following creative_type:  * `CREATIVE_TYPE_STANDARD` * `CREATIVE_TYPE_EXPANDABLE`
     */
    requireMraid?: boolean | null;
    /**
     * Optional. Indicates that the creative will wait for a return ping for attribution.  Only valid when using a Campaign Manager tracking ad with a third-party ad server parameter and the ${DC_DBM_TOKEN} macro.  Optional and only valid for third-party tag creatives or third-party VAST tag creatives.  Third-party tag creatives are creatives with following hosting_source:  * `HOSTING_SOURCE_THIRD_PARTY`  combined with following creative_type:  * `CREATIVE_TYPE_STANDARD` * `CREATIVE_TYPE_EXPANDABLE`  Third-party VAST tag creatives are creatives with following hosting_source:  * `HOSTING_SOURCE_THIRD_PARTY`  combined with following creative_type:  * `CREATIVE_TYPE_VIDEO`
     */
    requirePingForAttribution?: boolean | null;
    /**
     * Output only. The current status of the creative review process.
     */
    reviewStatus?: Schema$ReviewStatusInfo;
    /**
     * Amount of time to play the video before the skip button appears.  This field is required when skippable is true.  This field is only supported for the following creative_type:  * `CREATIVE_TYPE_VIDEO`
     */
    skipOffset?: Schema$AudioVideoOffset;
    /**
     * Whether the user can choose to skip a video creative.  This field is only supported for the following creative_type:  * `CREATIVE_TYPE_VIDEO`
     */
    skippable?: boolean | null;
    /**
     * Optional. The original third-party tag used for the creative.  Required and only valid for third-party tag creatives.  Third-party tag creatives are creatives with following hosting_source:  * `HOSTING_SOURCE_THIRD_PARTY`  combined with following creative_type:  * `CREATIVE_TYPE_STANDARD` * `CREATIVE_TYPE_EXPANDABLE`
     */
    thirdPartyTag?: string | null;
    /**
     * Tracking URLs from third parties to track interactions with a video creative.  This field is only supported for the following creative_type:  * `CREATIVE_TYPE_AUDIO` * `CREATIVE_TYPE_VIDEO` * `CREATIVE_TYPE_NATIVE_VIDEO`
     */
    thirdPartyUrls?: Schema$ThirdPartyUrl[];
    /**
     * Timer custom events for a rich media creative. Timers track the time during which a user views and interacts with a specified part of a rich media creative. A creative can have multiple timer events, each timed independently. Leave it empty or unset for creatives containing image assets only.
     */
    timerEvents?: Schema$TimerEvent[];
    /**
     * Tracking URLs for analytics providers or third-party ad technology vendors.  The URLs must start with https (except on inventory that doesn&#39;t require SSL compliance). If using macros in your URL, use only macros supported by Display &amp; Video 360.  Standard URLs only, no IMG or SCRIPT tags.  This field is only supported in following creative_type:  * `CREATIVE_TYPE_NATIVE` * `CREATIVE_TYPE_NATIVE_SITE_SQUARE` * `CREATIVE_TYPE_NATIVE_APP_INSTALL` * `CREATIVE_TYPE_NATIVE_APP_INSTALL_SQUARE` * `CREATIVE_TYPE_NATIVE_VIDEO`
     */
    trackerUrls?: string[] | null;
    /**
     * Output only. Audio/Video transcodes.  Display &amp; Video 360 transcodes the main asset into a number of alternative versions that use different file formats or have different properties (resolution, audio bit rate, and video bit rate), each designed for specific video players or bandwidths.  These transcodes give a publisher&#39;s system more options to choose from for each impression on your video and ensures that the appropriate file serves based on the viewer’s connection and screen size.  This field is only supported in following creative_type:  * `CREATIVE_TYPE_VIDEO` * `CREATIVE_TYPE_NATIVE_VIDEO` * `CREATIVE_TYPE_AUDIO`
     */
    transcodes?: Schema$Transcode[];
    /**
     * Optional. An optional creative identifier provided by a registry that is unique across all platforms.  Universal Ad ID is part of the VAST 4.0 standard. It can be modified after the creative is created.  This field is only supported for the following creative_type:  * `CREATIVE_TYPE_VIDEO`
     */
    universalAdId?: Schema$UniversalAdId;
    /**
     * Output only. The timestamp when the creative was last updated. Assigned by the system.
     */
    updateTime?: string | null;
    /**
     * Optional. The URL of the VAST tag for a third-party VAST tag creative.  Required and only valid for third-party VAST tag creatives.  Third-party VAST tag creatives are creatives with following hosting_source:  * `HOSTING_SOURCE_THIRD_PARTY`  combined with following creative_type:  * `CREATIVE_TYPE_VIDEO`
     */
    vastTagUrl?: string | null;
    /**
     * Output only. Indicates the third-party VAST tag creative requires VPAID (Digital Video Player-Ad Interface).  Output only and only valid for third-party VAST tag creatives.  Third-party VAST tag creatives are creatives with following hosting_source:  * `HOSTING_SOURCE_THIRD_PARTY`  combined with following creative_type:  * `CREATIVE_TYPE_VIDEO`
     */
    vpaid?: boolean | null;
  }
  /**
   * Creative requirements configuration for the inventory source.
   */
  export interface Schema$CreativeConfig {
    /**
     * The type of creative that can be assigned to the inventory source.
     */
    creativeType?: string | null;
    /**
     * The configuration for display creatives. Applicable when creative_type is `CREATIVE_TYPE_STANDARD`.
     */
    displayCreativeConfig?: Schema$InventorySourceDisplayCreativeConfig;
    /**
     * The configuration for video creatives. Applicable when creative_type is `CREATIVE_TYPE_VIDEO`.
     */
    videoCreativeConfig?: Schema$InventorySourceVideoCreativeConfig;
  }
  /**
   * Describes a custom list entity, such as a custom affinity or custom intent audience list.
   */
  export interface Schema$CustomList {
    /**
     * Output only. The unique ID of the custom list. Assigned by the system.
     */
    customListId?: string | null;
    /**
     * Output only. The display name of the custom list. .
     */
    displayName?: string | null;
    /**
     * Output only. The resource name of the custom list.
     */
    name?: string | null;
  }
  /**
   * Details of custom list group. All custom list targeting settings are logically ‘OR’ of each other.
   */
  export interface Schema$CustomListGroup {
    /**
     * Required. All custom list targeting settings in custom list group. Repeated settings with same id will be ignored.
     */
    settings?: Schema$CustomListTargetingSetting[];
  }
  /**
   * Details of custom list targeting setting.
   */
  export interface Schema$CustomListTargetingSetting {
    /**
     * Required. Custom id of custom list targeting setting. This id is custom_list_id.
     */
    customListId?: string | null;
  }
  /**
   * Represents a whole or partial calendar date, e.g. a birthday. The time of day and time zone are either specified elsewhere or are not significant. The date is relative to the Proleptic Gregorian Calendar. This can represent:  * A full date, with non-zero year, month and day values * A month and day value, with a zero year, e.g. an anniversary * A year on its own, with zero month and day values * A year and month value, with a zero day, e.g. a credit card expiration date  Related types are google.type.TimeOfDay and `google.protobuf.Timestamp`.
   */
  export interface Schema$Date {
    /**
     * Day of month. Must be from 1 to 31 and valid for the year and month, or 0 if specifying a year by itself or a year and month where the day is not significant.
     */
    day?: number | null;
    /**
     * Month of year. Must be from 1 to 12, or 0 if specifying a year without a month and day.
     */
    month?: number | null;
    /**
     * Year of date. Must be from 1 to 9999, or 0 if specifying a date without a year.
     */
    year?: number | null;
  }
  /**
   * A date range.
   */
  export interface Schema$DateRange {
    /**
     * The upper bound of the date range, inclusive. Must specify a positive value for `year`, `month`, and `day`.
     */
    endDate?: Schema$Date;
    /**
     * The lower bound of the date range, inclusive. Must specify a positive value for `year`, `month`, and `day`.
     */
    startDate?: Schema$Date;
  }
  /**
   * Representation of a segment of time defined on a specific day of the week and with a start and end time. The time represented by `start_hour` must be before the time represented by `end_hour`.
   */
  export interface Schema$DayAndTimeAssignedTargetingOptionDetails {
    /**
     * Required. The day of the week for this day and time targeting setting.
     */
    dayOfWeek?: string | null;
    /**
     * Required. The end hour for day and time targeting. Must be between 1 (1 hour after start of day) and 24 (end of day).
     */
    endHour?: number | null;
    /**
     * Required. The start hour for day and time targeting. Must be between 0 (start of day) and 23 (1 hour before end of day).
     */
    startHour?: number | null;
    /**
     * Required. The mechanism used to determine which timezone to use for this day and time targeting setting.
     */
    timeZoneResolution?: string | null;
  }
  /**
   * A request listing which assigned targeting options of a given targeting type should be deleted.
   */
  export interface Schema$DeleteAssignedTargetingOptionsRequest {
    /**
     * Required. The assigned targeting option IDs to delete.
     */
    assignedTargetingOptionIds?: string[] | null;
    /**
     * Required. Identifies the type of this assigned targeting option.
     */
    targetingType?: string | null;
  }
  /**
   * Assigned device make and model targeting option details. This will be populated in the device_make_model_details field when targeting_type is `TARGETING_TYPE_DEVICE_MAKE_MODEL`.
   */
  export interface Schema$DeviceMakeModelAssignedTargetingOptionDetails {
    /**
     * Output only. The display name of the device make and model.
     */
    displayName?: string | null;
    /**
     * Indicates if this option is being negatively targeted.
     */
    negative?: boolean | null;
    /**
     * Required. The targeting_option_id field when targeting_type is `TARGETING_TYPE_DEVICE_MAKE_MODEL`.
     */
    targetingOptionId?: string | null;
  }
  /**
   * Represents a targetable device make and model. This will be populated in the device_make_model_details field of a TargetingOption when targeting_type is `TARGETING_TYPE_DEVICE_MAKE_MODEL`.
   */
  export interface Schema$DeviceMakeModelTargetingOptionDetails {
    /**
     * Output only. The display name of the device make and model.
     */
    displayName?: string | null;
  }
  /**
   * Targeting details for device type. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_DEVICE_TYPE`.
   */
  export interface Schema$DeviceTypeAssignedTargetingOptionDetails {
    /**
     * Output only. The display name of the device type.
     */
    deviceType?: string | null;
    /**
     * Required. ID of the device type.
     */
    targetingOptionId?: string | null;
  }
  /**
   * Represents a targetable device type. This will be populated in the device_type_details field of a TargetingOption when targeting_type is `TARGETING_TYPE_DEVICE_TYPE`.
   */
  export interface Schema$DeviceTypeTargetingOptionDetails {
    /**
     * Output only. The device type that is used to be targeted.
     */
    deviceType?: string | null;
  }
  /**
   * Targeting details for digital content label. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION`.
   */
  export interface Schema$DigitalContentLabelAssignedTargetingOptionDetails {
    /**
     * Output only. The display name of the digital content label rating tier.
     */
    contentRatingTier?: string | null;
    /**
     * Required. ID of the digital content label to be EXCLUDED.
     */
    excludedTargetingOptionId?: string | null;
  }
  /**
   * Represents a targetable digital content label rating tier. This will be populated in the digital_content_label_details field of the TargetingOption when targeting_type is `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION`.
   */
  export interface Schema$DigitalContentLabelTargetingOptionDetails {
    /**
     * Output only. An enum for the content label brand safety tiers.
     */
    contentRatingTier?: string | null;
  }
  /**
   * Dimensions.
   */
  export interface Schema$Dimensions {
    /**
     * The height in pixels.
     */
    heightPixels?: number | null;
    /**
     * The width in pixels.
     */
    widthPixels?: number | null;
  }
  /**
   * Details of DoubleVerify settings.
   */
  export interface Schema$DoubleVerify {
    /**
     * Avoid bidding on apps with the star ratings.
     */
    appStarRating?: Schema$DoubleVerifyAppStarRating;
    /**
     * Avoid bidding on apps with the age rating.
     */
    avoidedAgeRatings?: string[] | null;
    /**
     * DV Brand Safety Controls.
     */
    brandSafetyCategories?: Schema$DoubleVerifyBrandSafetyCategories;
    /**
     * Display viewability settings (applicable to display line items only).
     */
    displayViewability?: Schema$DoubleVerifyDisplayViewability;
    /**
     * Avoid Sites and Apps with historical Fraud &amp; IVT Rates.
     */
    fraudInvalidTraffic?: Schema$DoubleVerifyFraudInvalidTraffic;
    /**
     * Video viewability settings (applicable to video line items only).
     */
    videoViewability?: Schema$DoubleVerifyVideoViewability;
  }
  /**
   * Details of DoubleVerify star ratings settings.
   */
  export interface Schema$DoubleVerifyAppStarRating {
    /**
     * Avoid bidding on apps with the star ratings.
     */
    avoidedStarRating?: string | null;
    /**
     * Avoid bidding on apps with insufficient star ratings.
     */
    avoidInsufficientStarRating?: boolean | null;
  }
  /**
   * Settings for brand safety controls.
   */
  export interface Schema$DoubleVerifyBrandSafetyCategories {
    /**
     * Brand safety high severity avoidance categories.
     */
    avoidedHighSeverityCategories?: string[] | null;
    /**
     * Brand safety medium severity avoidance categories.
     */
    avoidedMediumSeverityCategories?: string[] | null;
    /**
     * Unknown or unrateable.
     */
    avoidUnknownBrandSafetyCategory?: boolean | null;
  }
  /**
   * Details of DoubleVerify display viewability settings.
   */
  export interface Schema$DoubleVerifyDisplayViewability {
    /**
     * Target web and app inventory to maximize IAB viewable rate.
     */
    iab?: string | null;
    /**
     * Target web and app inventory to maximize 100% viewable duration.
     */
    viewableDuring?: string | null;
  }
  /**
   * DoubleVerify Fraud &amp; Invalid Traffic settings.
   */
  export interface Schema$DoubleVerifyFraudInvalidTraffic {
    /**
     * Avoid Sites and Apps with historical Fraud &amp; IVT.
     */
    avoidedFraudOption?: string | null;
    /**
     * Insufficient Historical Fraud &amp; IVT Stats.
     */
    avoidInsufficientOption?: boolean | null;
  }
  /**
   * Details of DoubleVerify video viewability settings.
   */
  export interface Schema$DoubleVerifyVideoViewability {
    /**
     * Target inventory to maximize impressions with 400x300 or greater player size.
     */
    playerImpressionRate?: string | null;
    /**
     * Target web inventory to maximize IAB viewable rate.
     */
    videoIab?: string | null;
    /**
     * Target web inventory to maximize fully viewable rate.
     */
    videoViewableRate?: string | null;
  }
  /**
   * A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance:      service Foo {       rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty);     }  The JSON representation for `Empty` is empty JSON object `{}`.
   */
  export interface Schema$Empty {}
  /**
   * Assigned environment targeting option details. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_ENVIRONMENT`.
   */
  export interface Schema$EnvironmentAssignedTargetingOptionDetails {
    /**
     * Output only. The serving environment.
     */
    environment?: string | null;
    /**
     * Required. The targeting_option_id of a TargetingOption of type `TARGETING_TYPE_ENVIRONMENT` (e.g., &quot;508010&quot; for targeting the `ENVIRONMENT_WEB_OPTIMIZED` option).
     */
    targetingOptionId?: string | null;
  }
  /**
   * Represents a targetable environment. This will be populated in the environment_details field of a TargetingOption when targeting_type is `TARGETING_TYPE_ENVIRONMENT`.
   */
  export interface Schema$EnvironmentTargetingOptionDetails {
    /**
     * Output only. The serving environment.
     */
    environment?: string | null;
  }
  /**
   * Details for assigned exchange targeting option. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_EXCHANGE`.
   */
  export interface Schema$ExchangeAssignedTargetingOptionDetails {
    /**
     * Required. The targeting_option_id of a TargetingOption of type `TARGETING_TYPE_EXCHANGE`.
     */
    targetingOptionId?: string | null;
  }
  /**
   * Exchange review status for the creative.
   */
  export interface Schema$ExchangeReviewStatus {
    /**
     * The exchange reviewing the creative.
     */
    exchange?: string | null;
    /**
     * Status of the exchange review.
     */
    status?: string | null;
  }
  /**
   * Represents a targetable exchange. This will be populated in the exchange_details field of a TargetingOption when targeting_type is `TARGETING_TYPE_EXCHANGE`.
   */
  export interface Schema$ExchangeTargetingOptionDetails {
    /**
     * Output only. The type of exchange.
     */
    exchange?: string | null;
  }
  /**
   * Exit event of the creative.
   */
  export interface Schema$ExitEvent {
    /**
     * The name of the click tag of the exit event.  The name must be unique within one creative.  Leave it empty or unset for creatives containing image assets only.
     */
    name?: string | null;
    /**
     * The name used to identify this event in reports. Leave it empty or unset for creatives containing image assets only.
     */
    reportingName?: string | null;
    /**
     * Required. The type of the exit event.
     */
    type?: string | null;
    /**
     * Required. The click through URL of the exit event. This is required when type is:  * `EXIT_EVENT_TYPE_DEFAULT` * `EXIT_EVENT_TYPE_BACKUP`
     */
    url?: string | null;
  }
  /**
   * Describes a first or third party audience list used for targeting. First party audiences are created via usage of client data. Third party audiences are provided by Third Party data providers and can only be licensed to customers.
   */
  export interface Schema$FirstAndThirdPartyAudience {
    /**
     * Output only. The display name of the first and third party audience. .
     */
    displayName?: string | null;
    /**
     * Output only. The unique ID of the first and third party audience. Assigned by the system.
     */
    firstAndThirdPartyAudienceId?: string | null;
    /**
     * Output only. Whether the audience is a first or third party audience. .
     */
    firstAndThirdPartyAudienceType?: string | null;
    /**
     * Output only. The resource name of the first and third party audience.
     */
    name?: string | null;
  }
  /**
   * Details of first and third party audience group. All first and third party audience targeting settings are logically ‘OR’ of each other.
   */
  export interface Schema$FirstAndThirdPartyAudienceGroup {
    /**
     * Required. All first and third party audience targeting settings in first and third party audience group. Repeated settings with same id are not allowed.
     */
    settings?: Schema$FirstAndThirdPartyAudienceTargetingSetting[];
  }
  /**
   * Details of first and third party audience targeting setting.
   */
  export interface Schema$FirstAndThirdPartyAudienceTargetingSetting {
    /**
     * Required. First and third party audience id of the first and third party audience targeting setting. This id is first_and_third_party_audience_id.
     */
    firstAndThirdPartyAudienceId?: string | null;
    /**
     * The recency of the first and third party audience targeting setting. Only applicable to first party audiences, otherwise will be ignored. For more info, refer to https://support.google.com/displayvideo/answer/2949947#recency When unspecified, no recency limit will be used.
     */
    recency?: string | null;
  }
  /**
   * A strategy that uses a fixed bidding price.
   */
  export interface Schema$FixedBidStrategy {
    /**
     * The fixed bid amount, in micros of the advertiser&#39;s currency. For insertion order entity, bid_amount_micros should be set as 0. For line item entity, bid_amount_micros must be greater than or equal to billable unit of the given currency and smaller than or equal to the upper limit 1000000000.  For example, 1500000 represents 1.5 standard units of the currency.
     */
    bidAmountMicros?: string | null;
  }
  /**
   * A single Floodlight group.
   */
  export interface Schema$FloodlightGroup {
    /**
     * The Active View video viewability metric configuration for the Floodlight group.
     */
    activeViewConfig?: Schema$ActiveViewVideoViewabilityMetricConfig;
    /**
     * User-defined custom variables owned by the Floodlight group. Use custom Floodlight variables to create reporting data that is tailored to your unique business needs. Custom Floodlight variables use the keys `U1=`, `U2=`, and so on, and can take any values that you choose to pass to them. You can use them to track virtually any type of data that you collect about your customers, such as the genre of movie that a customer purchases, the country to which the item is shipped, and so on.  Custom Floodlight variables may not be used to pass any data that could be used or recognized as personally identifiable information (PII).  Example: `custom_variables {   fields {     &quot;U1&quot;: value { number_value: 123.4 },     &quot;U2&quot;: value { string_value: &quot;MyVariable2&quot; },     &quot;U3&quot;: value { string_value: &quot;MyVariable3&quot; }   } }`  Acceptable values for keys are &quot;U1&quot; through &quot;U100&quot;, inclusive. String values must be less than 64 characters long, and cannot contain the following characters: `&quot;&lt;&gt;`.
     */
    customVariables?: {[key: string]: any} | null;
    /**
     * Required. The display name of the Floodlight group.
     */
    displayName?: string | null;
    /**
     * Output only. The unique ID of the Floodlight group. Assigned by the system.
     */
    floodlightGroupId?: string | null;
    /**
     * Required. The lookback window for the Floodlight group. Both click_days and impression_days are required. Acceptable values for both are `0` to `90`, inclusive.
     */
    lookbackWindow?: Schema$LookbackWindow;
    /**
     * Output only. The resource name of the Floodlight group.
     */
    name?: string | null;
    /**
     * Required. The web tag type enabled for the Floodlight group.
     */
    webTagType?: string | null;
  }
  /**
   * Settings that control the number of times a user may be shown with the same ad during a given time period.
   */
  export interface Schema$FrequencyCap {
    /**
     * The maximum number of times a user may be shown with the same ad during this period. Must be greater than 0.  Applicable when unlimited is `false`.
     */
    maxImpressions?: number | null;
    /**
     * The time unit in which the frequency cap will be applied.  Applicable when unlimited is `false`.
     */
    timeUnit?: string | null;
    /**
     * The number of time_unit the frequency cap will last.  Applicable when unlimited is `false`. The following restrictions apply based on the value of time_unit:  * `TIME_UNIT_LIFETIME` - this field is output only and will default to 1 * `TIME_UNIT_MONTHS` - must be between 1 and 2 * `TIME_UNIT_WEEKS` - must be between 1 and 4 * `TIME_UNIT_DAYS` - must be between 1 and 6 * `TIME_UNIT_HOURS` - must be between 1 and 23 * `TIME_UNIT_MINUTES` - must be between 1 and 59
     */
    timeUnitCount?: number | null;
    /**
     * Whether unlimited frequency capping is applied. When this field is set to `true`, the remaining frequency cap fields are not applicable.
     */
    unlimited?: boolean | null;
  }
  /**
   * Details for assigned gender targeting option. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARTGETING_TYPE_GENDER`.
   */
  export interface Schema$GenderAssignedTargetingOptionDetails {
    /**
     * Output only. The gender of the audience.
     */
    gender?: string | null;
    /**
     * Required. The targeting_option_id of a TargetingOption of type `TARGETING_TYPE_GENDER`.
     */
    targetingOptionId?: string | null;
  }
  /**
   * Represents a targetable gender. This will be populated in the gender_details field of a TargetingOption when targeting_type is `TARGETING_TYPE_GENDER`.
   */
  export interface Schema$GenderTargetingOptionDetails {
    /**
     * Output only. The gender of an audience.
     */
    gender?: string | null;
  }
  /**
   * Details for assigned geographic region targeting option. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_GEO_REGION`.
   */
  export interface Schema$GeoRegionAssignedTargetingOptionDetails {
    /**
     * Output only. The display name of the geographic region (e.g., &quot;Ontario, Canada&quot;).
     */
    displayName?: string | null;
    /**
     * Output only. The type of geographic region targeting.
     */
    geoRegionType?: string | null;
    /**
     * Indicates if this option is being negatively targeted.
     */
    negative?: boolean | null;
    /**
     * Required. The targeting_option_id of a TargetingOption of type `TARGETING_TYPE_GEO_REGION`.
     */
    targetingOptionId?: string | null;
  }
  /**
   * Represents a targetable geographic region. This will be populated in the geo_region_details field when targeting_type is `TARGETING_TYPE_GEO_REGION`.
   */
  export interface Schema$GeoRegionTargetingOptionDetails {
    /**
     * Output only. The display name of the geographic region (e.g., &quot;Ontario, Canada&quot;).
     */
    displayName?: string | null;
    /**
     * Output only. The type of geographic region targeting.
     */
    geoRegionType?: string | null;
  }
  /**
   * Describes a Google audience resource. Includes Google audience lists.
   */
  export interface Schema$GoogleAudience {
    /**
     * Output only. The display name of the Google audience. .
     */
    displayName?: string | null;
    /**
     * Output only. The unique ID of the Google audience. Assigned by the system.
     */
    googleAudienceId?: string | null;
    /**
     * Output only. The type of Google audience. .
     */
    googleAudienceType?: string | null;
    /**
     * Output only. The resource name of the google audience.
     */
    name?: string | null;
  }
  /**
   * Details of Google audience group. All Google audience targeting settings are logically ‘OR’ of each other.
   */
  export interface Schema$GoogleAudienceGroup {
    /**
     * Required. All Google audience targeting settings in Google audience group. Repeated settings with same id will be ignored.
     */
    settings?: Schema$GoogleAudienceTargetingSetting[];
  }
  /**
   * Details of Google audience targeting setting.
   */
  export interface Schema$GoogleAudienceTargetingSetting {
    /**
     * Required. Google audience id of the Google audience targeting setting. This id is google_audience_id.
     */
    googleAudienceId?: string | null;
  }
  /**
   * Media resource.
   */
  export interface Schema$GoogleBytestreamMedia {
    /**
     * Name of the media resource.
     */
    resourceName?: string | null;
  }
  /**
   * Details for assigned household income targeting option. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_HOUSEHOLD_INCOME`.
   */
  export interface Schema$HouseholdIncomeAssignedTargetingOptionDetails {
    /**
     * Output only. The household income of the audience.
     */
    householdIncome?: string | null;
    /**
     * Required. The targeting_option_id of a TargetingOption of type `TARGETING_TYPE_HOUSEHOLD_INCOME`.
     */
    targetingOptionId?: string | null;
  }
  /**
   * Represents a targetable household income. This will be populated in the household_income_details field of a TargetingOption when targeting_type is `TARGETING_TYPE_HOUSEHOLD_INCOME`.
   */
  export interface Schema$HouseholdIncomeTargetingOptionDetails {
    /**
     * Output only. The household income of an audience.
     */
    householdIncome?: string | null;
  }
  /**
   * A filtering option that filters entities by their entity IDs.
   */
  export interface Schema$IdFilter {
    /**
     * TrueView Ads to download by ID. All IDs must belong to the same Advertiser or Partner specified in CreateSdfDownloadTaskRequest.
     */
    adGroupAdIds?: string[] | null;
    /**
     * TrueView Ad Groups to download by ID. All IDs must belong to the same Advertiser or Partner specified in CreateSdfDownloadTaskRequest.
     */
    adGroupIds?: string[] | null;
    /**
     * Campaigns to download by ID. All IDs must belong to the same Advertiser or Partner specified in CreateSdfDownloadTaskRequest.
     */
    campaignIds?: string[] | null;
    /**
     * Insertion Orders to download by ID. All IDs must belong to the same Advertiser or Partner specified in CreateSdfDownloadTaskRequest.
     */
    insertionOrderIds?: string[] | null;
    /**
     * Line Items to download by ID. All IDs must belong to the same Advertiser or Partner specified in CreateSdfDownloadTaskRequest.
     */
    lineItemIds?: string[] | null;
    /**
     * Media Products to download by ID. All IDs must belong to the same Advertiser or Partner specified in CreateSdfDownloadTaskRequest.
     */
    mediaProductIds?: string[] | null;
  }
  /**
   * A single insertion order.
   */
  export interface Schema$InsertionOrder {
    /**
     * Output only. The unique ID of the advertiser the insertion order belongs to.
     */
    advertiserId?: string | null;
    /**
     * Optional. The bidding strategy of the insertion order. By default, fixed_bid is set.
     */
    bidStrategy?: Schema$BiddingStrategy;
    /**
     * Required. The budget allocation settings of the insertion order.
     */
    budget?: Schema$InsertionOrderBudget;
    /**
     * Required. Immutable. The unique ID of the campaign that the insertion order belongs to.
     */
    campaignId?: string | null;
    /**
     * Required. The display name of the insertion order.  Must be UTF-8 encoded with a maximum size of 240 bytes.
     */
    displayName?: string | null;
    /**
     * Required. Controls whether or not the insertion order can spend its budget and bid on inventory.  * For CreateInsertionOrder method, only `ENTITY_STATUS_DRAFT` is allowed. To activate an insertion order, use UpdateInsertionOrder method and update the status to `ENTITY_STATUS_ACTIVE` after creation. * An insertion order cannot be changed back to `ENTITY_STATUS_DRAFT` status from any other status. * An insertion order cannot be set to `ENTITY_STATUS_ACTIVE` if its parent campaign is not active.
     */
    entityStatus?: string | null;
    /**
     * Required. The frequency capping setting of the insertion order.
     */
    frequencyCap?: Schema$FrequencyCap;
    /**
     * Output only. The unique ID of the insertion order. Assigned by the system.
     */
    insertionOrderId?: string | null;
    /**
     * Additional integration details of the insertion order.
     */
    integrationDetails?: Schema$IntegrationDetails;
    /**
     * Output only. The resource name of the insertion order.
     */
    name?: string | null;
    /**
     * Required. The budget spending speed setting of the insertion order.
     */
    pacing?: Schema$Pacing;
    /**
     * The partner costs associated with the insertion order.  If absent or empty in CreateInsertionOrder method, the newly created insertion order will inherit partner costs from the partner settings.
     */
    partnerCosts?: Schema$PartnerCost[];
    /**
     * Required. Performance goal of the insertion order.
     */
    performanceGoal?: Schema$PerformanceGoal;
    /**
     * Output only. The timestamp when the insertion order was last updated. Assigned by the system.
     */
    updateTime?: string | null;
  }
  /**
   * Settings that control how insertion order budget is allocated.
   */
  export interface Schema$InsertionOrderBudget {
    /**
     * The type of automation used to manage bid and budget for the insertion order.  If this field is unspecified in creation, the value defaults to `INSERTION_ORDER_AUTOMATION_TYPE_NONE`.
     */
    automationType?: string | null;
    /**
     * Required. The list of budget segments. Use a budget segment to specify a specific budget for a given period of time an insertion order is running.
     */
    budgetSegments?: Schema$InsertionOrderBudgetSegment[];
    /**
     * Required. Immutable. The budget unit specifies whether the budget is currency based or impression based.
     */
    budgetUnit?: string | null;
  }
  /**
   * Settings that control the budget of a single budget segment.
   */
  export interface Schema$InsertionOrderBudgetSegment {
    /**
     * Required. The budget amount the insertion order will spend for the given date_range. The amount is in micros. Must be greater than 0. For example, 500000000 represents 500 standard units of the currency.
     */
    budgetAmountMicros?: string | null;
    /**
     * The ID of the campaign budget linked to this insertion order budget segment.
     */
    campaignBudgetId?: string | null;
    /**
     * Required. The start and end date settings of the budget segment. They are resolved relative to the parent advertiser&#39;s time zone.  * When creating a new budget segment, both `start_date` and `end_date` must be in the future. * An existing budget segment with a `start_date` in the past has a mutable `end_date` but an immutable `start_date`. * `end_date` must be the `start_date` or later, both before the year 2037.
     */
    dateRange?: Schema$DateRange;
    /**
     * The budget segment description. It can be used to enter Purchase Order information for each budget segment and have that information printed on the invoices.  Must be UTF-8 encoded with a length of no more than 80 characters.
     */
    description?: string | null;
  }
  /**
   * Details of Integral Ad Science settings.
   */
  export interface Schema$IntegralAdScience {
    /**
     * Display Viewability section (applicable to display line items only).
     */
    displayViewability?: string | null;
    /**
     * Ad Fraud settings.
     */
    excludedAdFraudRisk?: string | null;
    /**
     * Brand Safety - **Adult content**.
     */
    excludedAdultRisk?: string | null;
    /**
     * Brand Safety - **Alcohol**.
     */
    excludedAlcoholRisk?: string | null;
    /**
     * Brand Safety - **Drugs**.
     */
    excludedDrugsRisk?: string | null;
    /**
     * Brand Safety - **Gambling**.
     */
    excludedGamblingRisk?: string | null;
    /**
     * Brand Safety - **Hate speech**.
     */
    excludedHateSpeechRisk?: string | null;
    /**
     * Brand Safety - **Illegal downloads**.
     */
    excludedIllegalDownloadsRisk?: string | null;
    /**
     * Brand Safety - **Offensive language**.
     */
    excludedOffensiveLanguageRisk?: string | null;
    /**
     * Brand Safety - **Violence**.
     */
    excludedViolenceRisk?: string | null;
    /**
     * Brand Safety - **Unrateable**.
     */
    excludeUnrateable?: boolean | null;
    /**
     * True advertising quality (applicable to Display line items only).
     */
    traqScoreOption?: string | null;
    /**
     * Video Viewability Section (applicable to video line items only).
     */
    videoViewability?: string | null;
  }
  /**
   * Integration details of an entry.
   */
  export interface Schema$IntegrationDetails {
    /**
     * Additional details of the entry in string format.  Must be UTF-8 encoded with a length of no more than 1000 characters.
     */
    details?: string | null;
    /**
     * An external identifier to be associated with the entry. The integration code will show up together with the entry in many places in the system, for example, reporting.  Must be UTF-8 encoded with a length of no more than 500 characters.
     */
    integrationCode?: string | null;
  }
  /**
   * An inventory source.
   */
  export interface Schema$InventorySource {
    /**
     * Whether the inventory source has a guaranteed or non-guaranteed delivery.
     */
    commitment?: string | null;
    /**
     * The creative requirements of the inventory source.  Not applicable for auction packages.
     */
    creativeConfigs?: Schema$CreativeConfig[];
    /**
     * The ID in the exchange space that uniquely identifies the inventory source.  Must be unique across buyers within each exchange but not necessarily unique across exchanges.
     */
    dealId?: string | null;
    /**
     * The delivery method of the inventory source.  * For non-guaranteed inventory sources, the only acceptable value is `INVENTORY_SOURCE_DELIVERY_METHOD_PROGRAMMATIC`. * For guaranteed inventory sources, acceptable values are `INVENTORY_SOURCE_DELIVERY_METHOD_TAG` and `INVENTORY_SOURCE_DELIVERY_METHOD_PROGRAMMATIC`.
     */
    deliveryMethod?: string | null;
    /**
     * The display name of the inventory source.  Must be UTF-8 encoded with a maximum size of 240 bytes.
     */
    displayName?: string | null;
    /**
     * The exchange to which the inventory source belongs.
     */
    exchange?: string | null;
    /**
     * Output only. The unique ID of the inventory source. Assigned by the system.
     */
    inventorySourceId?: string | null;
    /**
     * Denotes the type of the inventory source.
     */
    inventorySourceType?: string | null;
    /**
     * Output only. The resource name of the inventory source.
     */
    name?: string | null;
    /**
     * The publisher/seller name of the inventory source.
     */
    publisherName?: string | null;
    /**
     * Required. The rate details of the inventory source.
     */
    rateDetails?: Schema$RateDetails;
    /**
     * The status settings of the inventory source.
     */
    status?: Schema$InventorySourceStatus;
    /**
     * The time range when this inventory source starts and stops serving.
     */
    timeRange?: Schema$TimeRange;
    /**
     * Output only. The timestamp when the inventory source was last updated. Assigned by the system.
     */
    updateTime?: string | null;
  }
  /**
   * Targeting details for inventory source. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_INVENTORY_SOURCE`.
   */
  export interface Schema$InventorySourceAssignedTargetingOptionDetails {
    /**
     * Required. ID of the inventory source. Should refer to the inventory_source_id field of an InventorySource resource.
     */
    inventorySourceId?: string | null;
  }
  /**
   * The configuration for display creatives.
   */
  export interface Schema$InventorySourceDisplayCreativeConfig {
    /**
     * The size requirements for display creatives that can be assigned to the inventory source.
     */
    creativeSize?: Schema$Dimensions;
  }
  /**
   * A filtering option for filtering on Inventory Source entities.
   */
  export interface Schema$InventorySourceFilter {
    /**
     * Inventory Sources to download by ID. All IDs must belong to the same Advertiser or Partner specified in CreateSdfDownloadTaskRequest. Leave empty to download all Inventory Sources for the selected Advertiser or Partner.
     */
    inventorySourceIds?: string[] | null;
  }
  /**
   * A collection of targetable inventory sources.
   */
  export interface Schema$InventorySourceGroup {
    /**
     * Required. The display name of the inventory source group.  Must be UTF-8 encoded with a maximum size of 240 bytes.
     */
    displayName?: string | null;
    /**
     * Output only. The unique ID of the inventory source group. Assigned by the system.
     */
    inventorySourceGroupId?: string | null;
    /**
     * Output only. The resource name of the inventory source group.
     */
    name?: string | null;
  }
  /**
   * Targeting details for inventory source group. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_INVENTORY_SOURCE_GROUP`.
   */
  export interface Schema$InventorySourceGroupAssignedTargetingOptionDetails {
    /**
     * Required. ID of the inventory source group. Should refer to the inventory_source_group_id field of an InventorySourceGroup resource.
     */
    inventorySourceGroupId?: string | null;
  }
  /**
   * The status related settings of the inventory source.
   */
  export interface Schema$InventorySourceStatus {
    /**
     * Output only. The configuration status of the inventory source.  Only applicable for guaranteed inventory sources. Acceptable values are `INVENTORY_SOURCE_CONFIG_STATUS_PENDING` and `INVENTORY_SOURCE_CONFIG_STATUS_COMPLETED`.  An inventory source must be configured (fill in the required fields, choose creatives, and select a default campaign) before it can serve.
     */
    configStatus?: string | null;
    /**
     * The user-provided reason for pausing this inventory source.  Must not exceed 100 characters.  Only applicable when entity_status is set to `ENTITY_STATUS_PAUSED`.
     */
    entityPauseReason?: string | null;
    /**
     * Whether or not the inventory source is servable.  Acceptable values are `ENTITY_STATUS_ACTIVE`, `ENTITY_STATUS_ARCHIVED`, and `ENTITY_STATUS_PAUSED`. Default value is `ENTITY_STATUS_ACTIVE`.
     */
    entityStatus?: string | null;
    /**
     * Output only. The seller-provided reason for pausing this inventory source.  Only applicable for inventory sources synced directly from the publishers and when seller_status is set to `ENTITY_STATUS_PAUSED`.
     */
    sellerPauseReason?: string | null;
    /**
     * Output only. The status set by the seller for the inventory source.  Only applicable for inventory sources synced directly from the publishers. Acceptable values are `ENTITY_STATUS_ACTIVE` and `ENTITY_STATUS_PAUSED`.
     */
    sellerStatus?: string | null;
  }
  /**
   * The configuration for video creatives.
   */
  export interface Schema$InventorySourceVideoCreativeConfig {
    /**
     * The duration requirements for the video creatives that can be assigned to the inventory source.
     */
    duration?: string | null;
  }
  /**
   * Details for assigned keyword targeting option. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_KEYWORD`.
   */
  export interface Schema$KeywordAssignedTargetingOptionDetails {
    /**
     * Required. The keyword, for example `car insurance`.  Positive keyword cannot be offensive word. Must be UTF-8 encoded with a maximum size of 255 bytes. Maximum number of characters is 80. Maximum number of words is 10.
     */
    keyword?: string | null;
    /**
     * Indicates if this option is being negatively targeted.
     */
    negative?: boolean | null;
  }
  /**
   * Details for assigned language targeting option. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_LANGUAGE`.
   */
  export interface Schema$LanguageAssignedTargetingOptionDetails {
    /**
     * Output only. The display name of the language (e.g., &quot;French&quot;).
     */
    displayName?: string | null;
    /**
     * Indicates if this option is being negatively targeted. All assigned language targeting options on the same line item must have the same value for this field.
     */
    negative?: boolean | null;
    /**
     * Required. The targeting_option_id of a TargetingOption of type `TARGETING_TYPE_LANGUAGE`.
     */
    targetingOptionId?: string | null;
  }
  /**
   * Represents a targetable language. This will be populated in the language_details field when targeting_type is `TARGETING_TYPE_LANGUAGE`.
   */
  export interface Schema$LanguageTargetingOptionDetails {
    /**
     * Output only. The display name of the language (e.g., &quot;French&quot;).
     */
    displayName?: string | null;
  }
  /**
   * A single line item.
   */
  export interface Schema$LineItem {
    /**
     * Output only. The unique ID of the advertiser the line item belongs to.
     */
    advertiserId?: string | null;
    /**
     * Required. The bidding strategy of the line item.
     */
    bidStrategy?: Schema$BiddingStrategy;
    /**
     * Required. The budget allocation setting of the line item.
     */
    budget?: Schema$LineItemBudget;
    /**
     * Output only. The unique ID of the campaign that the line item belongs to.
     */
    campaignId?: string | null;
    /**
     * The conversion tracking setting of the line item.
     */
    conversionCounting?: Schema$ConversionCountingConfig;
    /**
     * The IDs of the creatives associated with the line item.
     */
    creativeIds?: string[] | null;
    /**
     * Required. The display name of the line item.  Must be UTF-8 encoded with a maximum size of 240 bytes.
     */
    displayName?: string | null;
    /**
     * Required. Controls whether or not the line item can spend its budget and bid on inventory.  * For CreateLineItem method, only `ENTITY_STATUS_DRAFT` is allowed. To activate a line item, use UpdateLineItem method and update the status to `ENTITY_STATUS_ACTIVE` after creation. * A line item cannot be changed back to `ENTITY_STATUS_DRAFT` status from any other status. * If the line item&#39;s parent insertion order is not active, the line item can&#39;t spend its budget even if its own status is `ENTITY_STATUS_ACTIVE`.
     */
    entityStatus?: string | null;
    /**
     * Required. The start and end time of the line item&#39;s flight.
     */
    flight?: Schema$LineItemFlight;
    /**
     * Required. The frequency capping setting of the line item.
     */
    frequencyCap?: Schema$FrequencyCap;
    /**
     * Required. Immutable. The unique ID of the insertion order that the line item belongs to.
     */
    insertionOrderId?: string | null;
    /**
     * Integration details of the line item.
     */
    integrationDetails?: Schema$IntegrationDetails;
    /**
     * The IDs of the private inventory sources assigned to the line item.
     */
    inventorySourceIds?: string[] | null;
    /**
     * Output only. The unique ID of the line item. Assigned by the system.
     */
    lineItemId?: string | null;
    /**
     * Required. Immutable. The type of the line item.
     */
    lineItemType?: string | null;
    /**
     * Output only. The resource name of the line item.
     */
    name?: string | null;
    /**
     * Required. The budget spending speed setting of the line item.
     */
    pacing?: Schema$Pacing;
    /**
     * The partner costs associated with the line item.  If absent or empty in CreateLineItem method, the newly created line item will inherit partner costs from its parent insertion order.
     */
    partnerCosts?: Schema$PartnerCost[];
    /**
     * Required. The partner revenue model setting of the line item.
     */
    partnerRevenueModel?: Schema$PartnerRevenueModel;
    /**
     * Output only. The timestamp when the line item was last updated. Assigned by the system.
     */
    updateTime?: string | null;
  }
  /**
   * Settings that control how budget is allocated.
   */
  export interface Schema$LineItemBudget {
    /**
     * Required. The type of the budget allocation.  `LINE_ITEM_BUDGET_ALLOCATION_TYPE_AUTOMATIC` is only applicable when automatic budget allocation is enabled for the parent insertion order.
     */
    budgetAllocationType?: string | null;
    /**
     * Output only. The budget unit specifies whether the budget is currency based or impression based. This value is inherited from the parent insertion order.
     */
    budgetUnit?: string | null;
    /**
     * The maximum budget amount the line item will spend. Must be greater than 0.  When budget_allocation_type is:  * `LINE_ITEM_BUDGET_ALLOCATION_TYPE_AUTOMATIC`, this field is immutable and is set by the system. * `LINE_ITEM_BUDGET_ALLOCATION_TYPE_FIXED`, if budget_unit is:     - `BUDGET_UNIT_CURRENCY`, this field represents maximum budget amount     to spend, in micros of the advertiser&#39;s currency. For example, 1500000     represents 1.5 standard units of the currency.     - `BUDGET_UNIT_IMPRESSIONS`, this field represents the maximum number     of impressions to serve. * `LINE_ITEM_BUDGET_ALLOCATION_TYPE_UNLIMITED`, this field is not applicable and will be ignored by the system.
     */
    maxAmount?: string | null;
  }
  /**
   * Settings that control the active duration of a line item.
   */
  export interface Schema$LineItemFlight {
    /**
     * The flight start and end dates of the line item. They are resolved relative to the parent advertiser&#39;s time zone.  * Required when flight_date_type is `LINE_ITEM_FLIGHT_DATE_TYPE_CUSTOM`. Output only otherwise. * When creating a new flight, both `start_date` and `end_date` must be in the future. * An existing flight with a `start_date` in the past has a mutable `end_date` but an immutable `start_date`. * `end_date` must be the `start_date` or later, both before the year 2037.
     */
    dateRange?: Schema$DateRange;
    /**
     * Required. The type of the line item&#39;s flight dates.
     */
    flightDateType?: string | null;
  }
  export interface Schema$ListAdvertisersResponse {
    /**
     * The list of advertisers.  This list will be absent if empty.
     */
    advertisers?: Schema$Advertiser[];
    /**
     * A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListAdvertisers` method to retrieve the next page of results.
     */
    nextPageToken?: string | null;
  }
  export interface Schema$ListCampaignsResponse {
    /**
     * The list of campaigns.  This list will be absent if empty.
     */
    campaigns?: Schema$Campaign[];
    /**
     * A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListCampaigns` method to retrieve the next page of results.
     */
    nextPageToken?: string | null;
  }
  export interface Schema$ListChannelsResponse {
    /**
     * The list of channels.  This list will be absent if empty.
     */
    channels?: Schema$Channel[];
    /**
     * A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListChannels` method to retrieve the next page of results.
     */
    nextPageToken?: string | null;
  }
  export interface Schema$ListCombinedAudiencesResponse {
    /**
     * The list of combined audiences.  This list will be absent if empty.
     */
    combinedAudiences?: Schema$CombinedAudience[];
    /**
     * A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListCombinedAudiences` method to retrieve the next page of results.
     */
    nextPageToken?: string | null;
  }
  export interface Schema$ListCreativesResponse {
    /**
     * The list of creatives.  This list will be absent if empty.
     */
    creatives?: Schema$Creative[];
    /**
     * A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListCreativesRequest` method to retrieve the next page of results. If this field is null, it means this is the last page.
     */
    nextPageToken?: string | null;
  }
  export interface Schema$ListCustomListsResponse {
    /**
     * The list of custom lists.  This list will be absent if empty.
     */
    customLists?: Schema$CustomList[];
    /**
     * A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListCustomLists` method to retrieve the next page of results.
     */
    nextPageToken?: string | null;
  }
  export interface Schema$ListFirstAndThirdPartyAudiencesResponse {
    /**
     * The list of first and third party audiences. Audience size properties will not be included.  This list will be absent if empty.
     */
    firstAndThirdPartyAudiences?: Schema$FirstAndThirdPartyAudience[];
    /**
     * A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListFirstAndThirdPartyAudiences` method to retrieve the next page of results.
     */
    nextPageToken?: string | null;
  }
  export interface Schema$ListGoogleAudiencesResponse {
    /**
     * The list of Google audiences.  This list will be absent if empty.
     */
    googleAudiences?: Schema$GoogleAudience[];
    /**
     * A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListGoogleAudiences` method to retrieve the next page of results.
     */
    nextPageToken?: string | null;
  }
  export interface Schema$ListInsertionOrdersResponse {
    /**
     * The list of insertion orders.  This list will be absent if empty.
     */
    insertionOrders?: Schema$InsertionOrder[];
    /**
     * A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListInsertionOrders` method to retrieve the next page of results.
     */
    nextPageToken?: string | null;
  }
  /**
   * Response message for InventorySourceGroupService.ListInventorySourceGroups.
   */
  export interface Schema$ListInventorySourceGroupsResponse {
    /**
     * The list of inventory source groups.  This list will be absent if empty.
     */
    inventorySourceGroups?: Schema$InventorySourceGroup[];
    /**
     * A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListInventorySourceGroups` method to retrieve the next page of results.
     */
    nextPageToken?: string | null;
  }
  export interface Schema$ListInventorySourcesResponse {
    /**
     * The list of inventory sources.  This list will be absent if empty.
     */
    inventorySources?: Schema$InventorySource[];
    /**
     * A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListInventorySources` method to retrieve the next page of results.
     */
    nextPageToken?: string | null;
  }
  /**
   * Response message for ListLineItemAssignedTargetingOptions.
   */
  export interface Schema$ListLineItemAssignedTargetingOptionsResponse {
    /**
     * The list of assigned targeting options.  This list will be absent if empty.
     */
    assignedTargetingOptions?: Schema$AssignedTargetingOption[];
    /**
     * A token identifying the next page of results. This value should be specified as the pageToken in a subsequent ListLineItemAssignedTargetingOptionsRequest to fetch the next page of results. This token will be absent if there are no more assigned_targeting_options to return.
     */
    nextPageToken?: string | null;
  }
  export interface Schema$ListLineItemsResponse {
    /**
     * The list of line items.  This list will be absent if empty.
     */
    lineItems?: Schema$LineItem[];
    /**
     * A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListLineItems` method to retrieve the next page of results.
     */
    nextPageToken?: string | null;
  }
  export interface Schema$ListLocationListsResponse {
    /**
     * The list of location lists.  This list will be absent if empty.
     */
    locationLists?: Schema$LocationList[];
    /**
     * A token to retrieve the next page of results.  Pass this value in the page_token field in the subsequent call to `ListLocationLists` method to retrieve the next page of results.
     */
    nextPageToken?: string | null;
  }
  /**
   * Response message for NegativeKeywordListService.ListNegativeKeywordLists.
   */
  export interface Schema$ListNegativeKeywordListsResponse {
    /**
     * The list of negative keyword lists.  This list will be absent if empty.
     */
    negativeKeywordLists?: Schema$NegativeKeywordList[];
    /**
     * A token to retrieve the next page of results.  Pass this value in the page_token field in the subsequent call to `ListNegativeKeywordLists` method to retrieve the next page of results.
     */
    nextPageToken?: string | null;
  }
  /**
   * Response message for ListTargetingOptions.
   */
  export interface Schema$ListTargetingOptionsResponse {
    /**
     * A token to retrieve the next page of results. Pass this value in the page_token field in the subsequent call to `ListTargetingOptions` method to retrieve the next page of results.
     */
    nextPageToken?: string | null;
    /**
     * The list of targeting options.  This list will be absent if empty.
     */
    targetingOptions?: Schema$TargetingOption[];
  }
  /**
   * A list of locations used for targeting.
   */
  export interface Schema$LocationList {
    /**
     * Required. Immutable. The unique ID of the advertiser the location list belongs to.
     */
    advertiserId?: string | null;
    /**
     * Required. The display name of the location list. Must be UTF-8 encoded with a maximum size of 240 bytes.
     */
    displayName?: string | null;
    /**
     * Output only. The unique ID of the location list. Assigned by the system.
     */
    locationListId?: string | null;
    /**
     * Required. Immutable. The type of location. All locations in the list will share this type.
     */
    locationType?: string | null;
    /**
     * Output only. The resource name of the location list.
     */
    name?: string | null;
  }
  /**
   * Specifies how many days into the past to look when determining whether to record a conversion.
   */
  export interface Schema$LookbackWindow {
    /**
     * Lookback window, in days, from the last time a given user clicked on one of your ads.
     */
    clickDays?: number | null;
    /**
     * Lookback window, in days, from the last time a given user viewed one of your ads.
     */
    impressionDays?: number | null;
  }
  /**
   * A strategy that automatically adjusts the bid to optimize a specified performance goal while spending the full budget.
   */
  export interface Schema$MaximizeSpendBidStrategy {
    /**
     * The maximum average CPM that may be bid, in micros of the advertiser&#39;s currency. Must be greater than or equal to a billable unit of the given currency.  For example, 1500000 represents 1.5 standard units of the currency.
     */
    maxAverageCpmBidAmountMicros?: string | null;
    /**
     * Required. The type of the performance goal that the bidding strategy tries to minimize while spending the full budget. `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_VIEWABLE_CPM` is not supported for this strategy.
     */
    performanceGoalType?: string | null;
  }
  /**
   * Represents an amount of money with its currency type.
   */
  export interface Schema$Money {
    /**
     * The 3-letter currency code defined in ISO 4217.
     */
    currencyCode?: string | null;
    /**
     * Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.
     */
    nanos?: number | null;
    /**
     * The whole units of the amount. For example if `currencyCode` is `&quot;USD&quot;`, then 1 unit is one US dollar.
     */
    units?: string | null;
  }
  /**
   * A list of negative keywords used for targeting.
   */
  export interface Schema$NegativeKeywordList {
    /**
     * Output only. The unique ID of the advertiser the negative keyword list belongs to.
     */
    advertiserId?: string | null;
    /**
     * Required. The display name of the negative keyword list. Must be UTF-8 encoded with a maximum size of 255 bytes.
     */
    displayName?: string | null;
    /**
     * Output only. The resource name of the negative keyword list.
     */
    name?: string | null;
    /**
     * Output only. The unique ID of the negative keyword list. Assigned by the system.
     */
    negativeKeywordListId?: string | null;
  }
  /**
   * Targeting details for negative keyword list. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_NEGATIVE_KEYWORD_LIST`.
   */
  export interface Schema$NegativeKeywordListAssignedTargetingOptionDetails {
    /**
     * Required. ID of the negative keyword list. Should refer to the negative_keyword_list_id field of a NegativeKeywordList resource.
     */
    negativeKeywordListId?: string | null;
  }
  /**
   * OBA Icon for a Creative
   */
  export interface Schema$ObaIcon {
    /**
     * Required. The click tracking URL of the OBA icon.  Only URLs of the following domains are allowed:  * https://info.evidon.com * https://l.betrad.com
     */
    clickTrackingUrl?: string | null;
    /**
     * The dimensions of the OBA icon.
     */
    dimensions?: Schema$Dimensions;
    /**
     * Required. The landing page URL of the OBA icon.  Only URLs of the following domains are allowed:  * https://info.evidon.com * https://l.betrad.com
     */
    landingPageUrl?: string | null;
    /**
     * The position of the OBA icon on the creative.
     */
    position?: string | null;
    /**
     * The program of the OBA icon. For example: “AdChoices”.
     */
    program?: string | null;
    /**
     * The MIME type of the OBA icon resource.
     */
    resourceMimeType?: string | null;
    /**
     * The URL of the OBA icon resource.
     */
    resourceUrl?: string | null;
    /**
     * Required. The view tracking URL of the OBA icon.  Only URLs of the following domains are allowed:  * https://info.evidon.com * https://l.betrad.com
     */
    viewTrackingUrl?: string | null;
  }
  /**
   * On screen position targeting option details. This will be populated in the on_screen_position_details field when targeting_type is `TARGETING_TYPE_ON_SCREEN_POSITION`.
   */
  export interface Schema$OnScreenPositionAssignedTargetingOptionDetails {
    /**
     * Output only. The on screen position.
     */
    onScreenPosition?: string | null;
    /**
     * Required. The targeting_option_id field when targeting_type is `TARGETING_TYPE_ON_SCREEN_POSITION`.
     */
    targetingOptionId?: string | null;
  }
  /**
   * Represents a targetable on screen position, which could be used by display and video ads. This will be populated in the on_screen_position_details field when targeting_type is `TARGETING_TYPE_ON_SCREEN_POSITION`.
   */
  export interface Schema$OnScreenPositionTargetingOptionDetails {
    /**
     * Output only. The on screen position.
     */
    onScreenPosition?: string | null;
  }
  /**
   * Assigned operating system targeting option details. This will be populated in the operating_system_details field when targeting_type is `TARGETING_TYPE_OPERATING_SYSTEM`.
   */
  export interface Schema$OperatingSystemAssignedTargetingOptionDetails {
    /**
     * Output only. The display name of the operating system.
     */
    displayName?: string | null;
    /**
     * Indicates if this option is being negatively targeted.
     */
    negative?: boolean | null;
    /**
     * Required. The targeting option ID populated in targeting_option_id field when targeting_type is `TARGETING_TYPE_OPERATING_SYSTEM`.
     */
    targetingOptionId?: string | null;
  }
  /**
   * Represents a targetable operating system. This will be populated in the operating_system_details field of a TargetingOption when targeting_type is `TARGETING_TYPE_OPERATING_SYSTEM`.
   */
  export interface Schema$OperatingSystemTargetingOptionDetails {
    /**
     * Output only. The display name of the operating system.
     */
    displayName?: string | null;
  }
  /**
   * This resource represents a long-running operation that is the result of a network API call.
   */
  export interface Schema$Operation {
    /**
     * If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available.
     */
    done?: boolean | null;
    /**
     * The error result of the operation in case of failure or cancellation.
     */
    error?: Schema$Status;
    /**
     * Service-specific metadata associated with the operation.  It typically contains progress information and common metadata such as create time. Some services might not provide such metadata.  Any method that returns a long-running operation should document the metadata type, if any.
     */
    metadata?: {[key: string]: any} | null;
    /**
     * The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`.
     */
    name?: string | null;
    /**
     * The normal response of the operation in case of success.  If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`.  If the original method is standard `Get`/`Create`/`Update`, the response should be the resource.  For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name.  For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`.
     */
    response?: {[key: string]: any} | null;
  }
  /**
   * Settings that control the rate at which a budget is spent.
   */
  export interface Schema$Pacing {
    /**
     * Maximum number of impressions to serve every day.  Applicable when the budget is impression based. Must be greater than 0.
     */
    dailyMaxImpressions?: string | null;
    /**
     * Maximum currency amount to spend every day in micros of advertiser&#39;s currency.  Applicable when the budget is currency based. Must be greater than 0. For example, for 1.5 standard unit of the currency, set this field to 1500000.  The value assigned will be rounded to whole billable units for the relevant currency by the following rules: any positive value less than a single billable unit will be rounded up to one billable unit and any value larger than a single billable unit will be rounded down to the nearest billable value. For example, if the currency&#39;s billable unit is 0.01, and this field is set to 10257770, it will round down to 10250000, a value of 10.25. If set to 505, it will round up to 10000, a value of 0.01.
     */
    dailyMaxMicros?: string | null;
    /**
     * Required. The time period in which the pacing budget will be spent.  When automatic budget allocation is enabled at the insertion order via auto_budget_allocation, this field is output only and defaults to `PACING_PERIOD_FLIGHT`.
     */
    pacingPeriod?: string | null;
    /**
     * Required. The type of pacing that defines how the budget amount will be spent across the pacing_period.
     */
    pacingType?: string | null;
  }
  /**
   * Details for assigned parental status targeting option. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARTGETING_TYPE_PARENTAL_STATUS`.
   */
  export interface Schema$ParentalStatusAssignedTargetingOptionDetails {
    /**
     * Output only. The parental status of the audience.
     */
    parentalStatus?: string | null;
    /**
     * Required. The targeting_option_id of a TargetingOption of type `TARGETING_TYPE_PARENTAL_STATUS`.
     */
    targetingOptionId?: string | null;
  }
  /**
   * Represents a targetable parental status. This will be populated in the parental_status_details field of a TargetingOption when targeting_type is `TARGETING_TYPE_PARENTAL_STATUS`.
   */
  export interface Schema$ParentalStatusTargetingOptionDetails {
    /**
     * Output only. The parental status of an audience.
     */
    parentalStatus?: string | null;
  }
  /**
   * A filtering option that filters on selected file types belonging to a chosen set of filter entities.
   */
  export interface Schema$ParentEntityFilter {
    /**
     * Required. File types that will be returned.
     */
    fileType?: string[] | null;
    /**
     * The IDs of the specified filter type. This is used to filter entities to fetch. If filter type is not `FILTER_TYPE_NONE`, at least one ID must be specified.
     */
    filterIds?: string[] | null;
    /**
     * Required. Filter type used to filter fetched entities.
     */
    filterType?: string | null;
  }
  /**
   * Settings that control a partner cost.  A partner cost is any type of expense involved in running a campaign, other than the costs of purchasing impressions (which is called the media cost) and using third-party audience segment data (data fee). Some examples of partner costs include the fees for using DV360, a third-party ad server, or a third-party ad serving verification service.
   */
  export interface Schema$PartnerCost {
    /**
     * Required. The type of the partner cost.
     */
    costType?: string | null;
    /**
     * The CPM fee amount in micros of advertiser&#39;s currency.  Applicable when the fee_type is `PARTNER_FEE_TYPE_CPM_FEE`. Must be greater than or equal to 0.  For example, for 1.5 standard unit of the advertiser&#39;s currency, set this field to 1500000.
     */
    feeAmount?: string | null;
    /**
     * The media fee percentage in millis (1/1000 of a percent).  Applicable when the fee_type is `PARTNER_FEE_TYPE_MEDIA_FEE`. Must be greater than or equal to 0.  For example: 100 represents 0.1%.
     */
    feePercentageMillis?: string | null;
    /**
     * Required. The fee type for this partner cost.
     */
    feeType?: string | null;
    /**
     * The invoice type for this partner cost.  * Required when cost_type is one of:     - `PARTNER_COST_TYPE_ADLOOX`     - `PARTNER_COST_TYPE_DOUBLE_VERIFY`     - `PARTNER_COST_TYPE_INTEGRAL_AD_SCIENCE`. * Output only for other types.
     */
    invoiceType?: string | null;
  }
  /**
   * Settings that control how partner revenue is calculated.
   */
  export interface Schema$PartnerRevenueModel {
    /**
     * Required. The markup amount of the partner revenue model. Must be greater than or equal to 0.  * When the markup_type is set to be `PARTNER_REVENUE_MODEL_MARKUP_TYPE_CPM`, this field represents the CPM markup in micros of advertiser&#39;s currency. For example, 1500000 represents 1.5 standard units of the currency. * When the markup_type is set to be `PARTNER_REVENUE_MODEL_MARKUP_TYPE_MEDIA_COST_MARKUP`, this field represents the media cost percent markup in millis. For example, 100 represents 0.1% (decimal 0.001). * When the markup_type is set to be `PARTNER_REVENUE_MODEL_MARKUP_TYPE_TOTAL_MEDIA_COST_MARKUP`, this field represents the total media cost percent markup in millis. For example, 100 represents 0.1% (decimal 0.001).
     */
    markupAmount?: string | null;
    /**
     * Required. The markup type of the partner revenue model.
     */
    markupType?: string | null;
  }
  /**
   * Settings that control the performance goal of a campaign or insertion order.
   */
  export interface Schema$PerformanceGoal {
    /**
     * The goal amount, in micros of the advertiser&#39;s currency.  Applicable when performance_goal_type is one of:  * `PERFORMANCE_GOAL_TYPE_CPM` * `PERFORMANCE_GOAL_TYPE_CPC` * `PERFORMANCE_GOAL_TYPE_CPA` * `PERFORMANCE_GOAL_TYPE_CPIAVC`  For example 1500000 represents 1.5 standard units of the currency.
     */
    performanceGoalAmountMicros?: string | null;
    /**
     * The decimal representation of the goal percentage in micros.  Applicable when performance_goal_type is one of:  * `PERFORMANCE_GOAL_TYPE_CTR` * `PERFORMANCE_GOAL_TYPE_VIEWABILITY`  For example, 70000 represents 7% (decimal 0.07).
     */
    performanceGoalPercentageMicros?: string | null;
    /**
     * A key performance indicator (KPI) string, which can be empty. Must be UTF-8 encoded with a length of no more than 100 characters.  Applicable when performance_goal_type is set to `PERFORMANCE_GOAL_TYPE_OTHER`.
     */
    performanceGoalString?: string | null;
    /**
     * Required. The type of the performance goal.
     */
    performanceGoalType?: string | null;
  }
  /**
   * A strategy that automatically adjusts the bid to meet or beat a specified performance goal.
   */
  export interface Schema$PerformanceGoalBidStrategy {
    /**
     * The maximum average CPM that may be bid, in micros of the advertiser&#39;s currency. Must be greater than or equal to a billable unit of the given currency. Not applicable when performance_goal_type is set to `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_VIEWABLE_CPM`.  For example, 1500000 represents 1.5 standard units of the currency.
     */
    maxAverageCpmBidAmountMicros?: string | null;
    /**
     * Required. The performance goal the bidding strategy will attempt to meet or beat, in micros of the advertiser&#39;s currency. Must be greater than or equal to a billable unit of the given currency and smaller or equal to upper bounds. Each performance_goal_type has its upper bound:  * when performance_goal_type is `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPA`, upper bound is 10000.00 USD. * when performance_goal_type is `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPC`, upper bound is 1000.00 USD. * when performance_goal_type is `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_VIEWABLE_CPM`, upper bound is 1000.00 USD.  Example: If set to `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_VIEWABLE_CPM`, the bid price will be based on the probability that each available impression will be viewable. For example, if viewable CPM target is $2 and an impression is 40% likely to be viewable, the bid price will be $0.80 CPM (40% of $2).  For example, 1500000 represents 1.5 standard units of the currency.
     */
    performanceGoalAmountMicros?: string | null;
    /**
     * Required. The type of the performance goal that the bidding strategy will try to meet or beat.  For line item level usage, the value must be one of:  * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPA` * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPC` * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_VIEWABLE_CPM`.
     */
    performanceGoalType?: string | null;
  }
  /**
   * Targeting details for proximity location list. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_PROXIMITY_LOCATION_LIST`.
   */
  export interface Schema$ProximityLocationListAssignedTargetingOptionDetails {
    /**
     * Required. ID of the proximity location list. Should refer to the location_list_id field of a LocationList resource whose type is `TARGETING_LOCATION_TYPE_PROXIMITY`.
     */
    proximityLocationListId?: string | null;
    /**
     * Required. Radius range for proximity location list. This represents the size of the area around a chosen location that will be targeted.  `All` proximity location targeting under a single line item must have the same radius range value. Set this value to match any existing targeting. If updated, this field will change the radius range for all proximity targeting under the line item.
     */
    proximityRadiusRange?: string | null;
  }
  /**
   * Publisher review status for the creative.
   */
  export interface Schema$PublisherReviewStatus {
    /**
     * The publisher reviewing the creative.
     */
    publisherName?: string | null;
    /**
     * Status of the publisher review.
     */
    status?: string | null;
  }
  /**
   * The rate related settings of the inventory source.
   */
  export interface Schema$RateDetails {
    /**
     * The rate type.  Acceptable values are `INVENTORY_SOURCE_RATE_TYPE_CPM_FIXED`, `INVENTORY_SOURCE_RATE_TYPE_CPM_FLOOR`, and `INVENTORY_SOURCE_RATE_TYPE_CPD`.
     */
    inventorySourceRateType?: string | null;
    /**
     * Output only. The amount that the buyer has committed to spending on the inventory source up front.  Only applicable for guaranteed inventory sources.
     */
    minimumSpend?: Schema$Money;
    /**
     * The rate for the inventory source.
     */
    rate?: Schema$Money;
    /**
     * Required for guaranteed inventory sources. The number of impressions guaranteed by the seller.
     */
    unitsPurchased?: string | null;
  }
  /**
   * Targeting details for regional location list. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_REGIONAL_LOCATION_LIST`.
   */
  export interface Schema$RegionalLocationListAssignedTargetingOptionDetails {
    /**
     * Indicates if this option is being negatively targeted.
     */
    negative?: boolean | null;
    /**
     * Required. ID of the regional location list. Should refer to the location_list_id field of a LocationList resource whose type is `TARGETING_LOCATION_TYPE_REGIONAL`.
     */
    regionalLocationListId?: string | null;
  }
  /**
   * Review statuses for the creative.
   */
  export interface Schema$ReviewStatusInfo {
    /**
     * Represents the basic approval needed for a creative to begin serving. Summary of creative_and_landing_page_review_status and content_and_policy_review_status.
     */
    approvalStatus?: string | null;
    /**
     * Content and policy review status for the creative.
     */
    contentAndPolicyReviewStatus?: string | null;
    /**
     * Creative and landing page review status for the creative.
     */
    creativeAndLandingPageReviewStatus?: string | null;
    /**
     * Exchange review statuses for the creative.
     */
    exchangeReviewStatuses?: Schema$ExchangeReviewStatus[];
    /**
     * Publisher review statuses for the creative.
     */
    publisherReviewStatuses?: Schema$PublisherReviewStatus[];
  }
  /**
   * Structured Data File (SDF) related settings.
   */
  export interface Schema$SdfConfig {
    /**
     * An administrator email address to which the SDF processing status reports will be sent.
     */
    adminEmail?: string | null;
    /**
     * Required. The version of SDF being used.
     */
    version?: string | null;
  }
  /**
   * Type for the response returned by [SdfDownloadTaskService.CreateSdfDownloadTask].
   */
  export interface Schema$SdfDownloadTask {
    /**
     * A resource name to be used in media.download to Download the prepared files. Resource names have the format `download/sdfdownloadtasks/media/{media_id}`. `media_id` will be made available by the long running operation service once the task status is done.
     */
    resourceName?: string | null;
  }
  /**
   * Type for the metadata returned by [SdfDownloadTaskService.CreateSdfDownloadTask].
   */
  export interface Schema$SdfDownloadTaskMetadata {
    /**
     * The time when the operation was created.
     */
    createTime?: string | null;
    /**
     * The time when execution was completed.
     */
    endTime?: string | null;
    /**
     * The SDF version used to execute this download task.
     */
    version?: string | null;
  }
  /**
   * Targeting details for sensitive category. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION`.
   */
  export interface Schema$SensitiveCategoryAssignedTargetingOptionDetails {
    /**
     * Required. ID of the sensitive category to be EXCLUDED.
     */
    excludedTargetingOptionId?: string | null;
    /**
     * Output only. An enum for the DV360 Sensitive category content classifier.
     */
    sensitiveCategory?: string | null;
  }
  /**
   * Represents a targetable sensitive category. This will be populated in the sensitive_category_details field of the TargetingOption when targeting_type is `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION`.
   */
  export interface Schema$SensitiveCategoryTargetingOptionDetails {
    /**
     * Output only. An enum for the DV360 Sensitive category content classifier.
     */
    sensitiveCategory?: string | null;
  }
  /**
   * The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details.  You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).
   */
  export interface Schema$Status {
    /**
     * The status code, which should be an enum value of google.rpc.Code.
     */
    code?: number | null;
    /**
     * A list of messages that carry the error details.  There is a common set of message types for APIs to use.
     */
    details?: Array<{[key: string]: any}> | null;
    /**
     * A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.
     */
    message?: string | null;
  }
  /**
   * Details for assigned sub-exchange targeting option. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_SUB_EXCHANGE`.
   */
  export interface Schema$SubExchangeAssignedTargetingOptionDetails {
    /**
     * Required. The targeting_option_id of a TargetingOption of type `TARGETING_TYPE_SUB_EXCHANGE`.
     */
    targetingOptionId?: string | null;
  }
  /**
   * Represents a targetable sub-exchange. This will be populated in the sub_exchange_details field of a TargetingOption when targeting_type is `TARGETING_TYPE_SUB_EXCHANGE`.
   */
  export interface Schema$SubExchangeTargetingOptionDetails {
    /**
     * Output only. The display name of the sub-exchange.
     */
    displayName?: string | null;
  }
  /**
   * Represents a single targeting option, which is a targetable concept in DV360.
   */
  export interface Schema$TargetingOption {
    /**
     * Age range details.
     */
    ageRangeDetails?: Schema$AgeRangeTargetingOptionDetails;
    /**
     * App category details.
     */
    appCategoryDetails?: Schema$AppCategoryTargetingOptionDetails;
    /**
     * Authorized seller status resource details.
     */
    authorizedSellerStatusDetails?: Schema$AuthorizedSellerStatusTargetingOptionDetails;
    /**
     * Browser details.
     */
    browserDetails?: Schema$BrowserTargetingOptionDetails;
    /**
     * Carrier and ISP details.
     */
    carrierAndIspDetails?: Schema$CarrierAndIspTargetingOptionDetails;
    /**
     * Category resource details.
     */
    categoryDetails?: Schema$CategoryTargetingOptionDetails;
    /**
     * Content instream position details.
     */
    contentInstreamPositionDetails?: Schema$ContentInstreamPositionTargetingOptionDetails;
    /**
     * Content outstream position details.
     */
    contentOutstreamPositionDetails?: Schema$ContentOutstreamPositionTargetingOptionDetails;
    /**
     * Device make and model resource details.
     */
    deviceMakeModelDetails?: Schema$DeviceMakeModelTargetingOptionDetails;
    /**
     * Device type details.
     */
    deviceTypeDetails?: Schema$DeviceTypeTargetingOptionDetails;
    /**
     * Digital content label details.
     */
    digitalContentLabelDetails?: Schema$DigitalContentLabelTargetingOptionDetails;
    /**
     * Environment details.
     */
    environmentDetails?: Schema$EnvironmentTargetingOptionDetails;
    /**
     * Exchange details.
     */
    exchangeDetails?: Schema$ExchangeTargetingOptionDetails;
    /**
     * Gender details.
     */
    genderDetails?: Schema$GenderTargetingOptionDetails;
    /**
     * Geographic region resource details.
     */
    geoRegionDetails?: Schema$GeoRegionTargetingOptionDetails;
    /**
     * Household income details.
     */
    householdIncomeDetails?: Schema$HouseholdIncomeTargetingOptionDetails;
    /**
     * Language resource details.
     */
    languageDetails?: Schema$LanguageTargetingOptionDetails;
    /**
     * Output only. The resource name for this targeting option.
     */
    name?: string | null;
    /**
     * On screen position details.
     */
    onScreenPositionDetails?: Schema$OnScreenPositionTargetingOptionDetails;
    /**
     * Operating system resources details.
     */
    operatingSystemDetails?: Schema$OperatingSystemTargetingOptionDetails;
    /**
     * Parental status details.
     */
    parentalStatusDetails?: Schema$ParentalStatusTargetingOptionDetails;
    /**
     * Sensitive Category details.
     */
    sensitiveCategoryDetails?: Schema$SensitiveCategoryTargetingOptionDetails;
    /**
     * Sub-exchange details.
     */
    subExchangeDetails?: Schema$SubExchangeTargetingOptionDetails;
    /**
     * Output only. A unique identifier for this targeting option. The tuple {`targeting_type`, `targeting_option_id`} will be unique.
     */
    targetingOptionId?: string | null;
    /**
     * Output only. The type of this targeting option.
     */
    targetingType?: string | null;
    /**
     * User rewarded content details.
     */
    userRewardedContentDetails?: Schema$UserRewardedContentTargetingOptionDetails;
    /**
     * Video player size details.
     */
    videoPlayerSizeDetails?: Schema$VideoPlayerSizeTargetingOptionDetails;
    /**
     * Viewability resource details.
     */
    viewabilityDetails?: Schema$ViewabilityTargetingOptionDetails;
  }
  /**
   * Settings for advertisers that use third-party ad servers only.
   */
  export interface Schema$ThirdPartyOnlyConfig {
    /**
     * Whether or not order ID reporting for pixels is enabled. This value cannot be changed once set to `true`.
     */
    pixelOrderIdReportingEnabled?: boolean | null;
  }
  /**
   * Tracking URLs from third parties to track interactions with an audio or a video creative.
   */
  export interface Schema$ThirdPartyUrl {
    /**
     * The type of interaction needs to be tracked by the tracking URL
     */
    type?: string | null;
    /**
     * Tracking URL used to track the interaction.  Provide a URL with optional path or query string, beginning with `https:`. For example, https://www.example.com/path
     */
    url?: string | null;
  }
  /**
   * Assigned third party verifier targeting option details. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_THIRD_PARTY_VERIFIER`.
   */
  export interface Schema$ThirdPartyVerifierAssignedTargetingOptionDetails {
    /**
     * Third party brand verifier -- Adloox.
     */
    adloox?: Schema$Adloox;
    /**
     * Third party brand verifier -- DoubleVerify.
     */
    doubleVerify?: Schema$DoubleVerify;
    /**
     * Third party brand verifier -- Integral Ad Science.
     */
    integralAdScience?: Schema$IntegralAdScience;
  }
  /**
   * A time range.
   */
  export interface Schema$TimeRange {
    /**
     * Required. The upper bound of a time range, inclusive.
     */
    endTime?: string | null;
    /**
     * Required. The lower bound of a time range, inclusive.
     */
    startTime?: string | null;
  }
  /**
   * Timer event of the creative.
   */
  export interface Schema$TimerEvent {
    /**
     * Required. The name of the timer event.
     */
    name?: string | null;
    /**
     * Required. The name used to identify this timer event in reports.
     */
    reportingName?: string | null;
  }
  /**
   * Settings that control the behavior of a single Floodlight activity config.
   */
  export interface Schema$TrackingFloodlightActivityConfig {
    /**
     * Required. The ID of the Floodlight activity.
     */
    floodlightActivityId?: string | null;
    /**
     * Required. The number of days after an ad has been clicked in which a conversion may be counted. Must be between 0 and 90 inclusive.
     */
    postClickLookbackWindowDays?: number | null;
    /**
     * Required. The number of days after an ad has been viewed in which a conversion may be counted. Must be between 0 and 90 inclusive.
     */
    postViewLookbackWindowDays?: number | null;
  }
  /**
   * Represents information about the transcoded audio or video file.
   */
  export interface Schema$Transcode {
    /**
     * The bit rate for the audio stream of the transcoded video, or the bit rate for the transcoded audio, in kilobits per second.
     */
    audioBitRateKbps?: string | null;
    /**
     * The sample rate for the audio stream of the transcoded video, or the sample rate for the transcoded audio, in hertz.
     */
    audioSampleRateHz?: string | null;
    /**
     * The transcoding bit rate of the transcoded video, in kilobits per second.
     */
    bitRateKbps?: string | null;
    /**
     * The dimensions of the transcoded video.
     */
    dimensions?: Schema$Dimensions;
    /**
     * The size of the transcoded file, in bytes.
     */
    fileSizeBytes?: string | null;
    /**
     * The frame rate of the transcoded video, in frames per second.
     */
    frameRate?: number | null;
    /**
     * The MIME type of the transcoded file.
     */
    mimeType?: string | null;
    /**
     * The name of the transcoded file.
     */
    name?: string | null;
    /**
     * Indicates if the transcoding was successful.
     */
    transcoded?: boolean | null;
  }
  /**
   * A creative identifier provided by a registry that is unique across all platforms. This is part of the VAST 4.0 standard.
   */
  export interface Schema$UniversalAdId {
    /**
     * The unique creative identifier.
     */
    id?: string | null;
    /**
     * The registry provides unique creative identifiers.
     */
    registry?: string | null;
  }
  /**
   * Details for assigned URL targeting option. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_URL`.
   */
  export interface Schema$UrlAssignedTargetingOptionDetails {
    /**
     * Indicates if this option is being negatively targeted.
     */
    negative?: boolean | null;
    /**
     * Required. The URL, for example `example.com`.  DV360 supports two levels of subdirectory targeting, for example `www.example.com/one-subdirectory-level/second-level`, and five levels of subdomain targeting, for example `five.four.three.two.one.example.com`.
     */
    url?: string | null;
  }
  /**
   * User rewarded content targeting option details. This will be populated in the user_rewarded_content_details field when targeting_type is `TARGETING_TYPE_USER_REWARDED_CONTENT`.
   */
  export interface Schema$UserRewardedContentAssignedTargetingOptionDetails {
    /**
     * Required. The targeting_option_id field when targeting_type is `TARGETING_TYPE_USER_REWARDED_CONTENT`.
     */
    targetingOptionId?: string | null;
    /**
     * Output only. User rewarded content status for video ads.
     */
    userRewardedContent?: string | null;
  }
  /**
   * Represents a targetable user rewarded content status for video ads only. This will be populated in the user_rewarded_content_details field when targeting_type is `TARGETING_TYPE_USER_REWARDED_CONTENT`.
   */
  export interface Schema$UserRewardedContentTargetingOptionDetails {
    /**
     * Output only. User rewarded content status for video ads.
     */
    userRewardedContent?: string | null;
  }
  /**
   * Video player size targeting option details. This will be populated in the video_player_size_details field when targeting_type is `TARGETING_TYPE_VIDEO_PLAYER_SIZE`. Explicitly targeting all options is not supported. Remove all video player size targeting options to achieve this effect.
   */
  export interface Schema$VideoPlayerSizeAssignedTargetingOptionDetails {
    /**
     * Required. The targeting_option_id field when targeting_type is `TARGETING_TYPE_VIDEO_PLAYER_SIZE`.
     */
    targetingOptionId?: string | null;
    /**
     * Output only. The video player size.
     */
    videoPlayerSize?: string | null;
  }
  /**
   * Represents a targetable video player size. This will be populated in the video_player_size_details field when targeting_type is `TARGETING_TYPE_VIDEO_PLAYER_SIZE`.
   */
  export interface Schema$VideoPlayerSizeTargetingOptionDetails {
    /**
     * Output only. The video player size.
     */
    videoPlayerSize?: string | null;
  }
  /**
   * Assigned viewability targeting option details. This will be populated in the viewability_details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_VIEWABILITY`.
   */
  export interface Schema$ViewabilityAssignedTargetingOptionDetails {
    /**
     * Required. The targeting_option_id of a TargetingOption of type `TARGETING_TYPE_VIEWABILITY` (e.g., &quot;509010&quot; for targeting the `VIEWABILITY_10_PERCENT_OR_MORE` option).
     */
    targetingOptionId?: string | null;
    /**
     * Output only. The predicted viewability percentage.
     */
    viewability?: string | null;
  }
  /**
   * Represents a targetable viewability. This will be populated in the viewability_details field of a TargetingOption when targeting_type is `TARGETING_TYPE_VIEWABILITY`.
   */
  export interface Schema$ViewabilityTargetingOptionDetails {
    /**
     * Output only. The predicted viewability percentage.
     */
    viewability?: string | null;
  }

  export class Resource$Advertisers {
    context: APIRequestContext;
    assets: Resource$Advertisers$Assets;
    campaigns: Resource$Advertisers$Campaigns;
    channels: Resource$Advertisers$Channels;
    creatives: Resource$Advertisers$Creatives;
    insertionOrders: Resource$Advertisers$Insertionorders;
    lineItems: Resource$Advertisers$Lineitems;
    locationLists: Resource$Advertisers$Locationlists;
    negativeKeywordLists: Resource$Advertisers$Negativekeywordlists;
    constructor(context: APIRequestContext) {
      this.context = context;
      this.assets = new Resource$Advertisers$Assets(this.context);
      this.campaigns = new Resource$Advertisers$Campaigns(this.context);
      this.channels = new Resource$Advertisers$Channels(this.context);
      this.creatives = new Resource$Advertisers$Creatives(this.context);
      this.insertionOrders = new Resource$Advertisers$Insertionorders(
        this.context
      );
      this.lineItems = new Resource$Advertisers$Lineitems(this.context);
      this.locationLists = new Resource$Advertisers$Locationlists(this.context);
      this.negativeKeywordLists = new Resource$Advertisers$Negativekeywordlists(
        this.context
      );
    }

    /**
     * displayvideo.advertisers.create
     * @desc Creates a new advertiser. Returns the newly created advertiser if successful. This method can take up to 180 seconds to complete.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.advertisers.create({
     *     // Request body metadata
     *     requestBody: {
     *       // request body parameters
     *       // {
     *       //   "adServerConfig": {},
     *       //   "advertiserId": "my_advertiserId",
     *       //   "creativeConfig": {},
     *       //   "dataAccessConfig": {},
     *       //   "displayName": "my_displayName",
     *       //   "entityStatus": "my_entityStatus",
     *       //   "generalConfig": {},
     *       //   "integrationDetails": {},
     *       //   "name": "my_name",
     *       //   "partnerId": "my_partnerId",
     *       //   "updateTime": "my_updateTime"
     *       // }
     *     },
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "adServerConfig": {},
     *   //   "advertiserId": "my_advertiserId",
     *   //   "creativeConfig": {},
     *   //   "dataAccessConfig": {},
     *   //   "displayName": "my_displayName",
     *   //   "entityStatus": "my_entityStatus",
     *   //   "generalConfig": {},
     *   //   "integrationDetails": {},
     *   //   "name": "my_name",
     *   //   "partnerId": "my_partnerId",
     *   //   "updateTime": "my_updateTime"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.advertisers.create
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {().Advertiser} params.requestBody Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    create(
      params?: Params$Resource$Advertisers$Create,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Advertiser>;
    create(
      params: Params$Resource$Advertisers$Create,
      options: MethodOptions | BodyResponseCallback<Schema$Advertiser>,
      callback: BodyResponseCallback<Schema$Advertiser>
    ): void;
    create(
      params: Params$Resource$Advertisers$Create,
      callback: BodyResponseCallback<Schema$Advertiser>
    ): void;
    create(callback: BodyResponseCallback<Schema$Advertiser>): void;
    create(
      paramsOrCallback?:
        | Params$Resource$Advertisers$Create
        | BodyResponseCallback<Schema$Advertiser>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$Advertiser>,
      callback?: BodyResponseCallback<Schema$Advertiser>
    ): void | GaxiosPromise<Schema$Advertiser> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Advertisers$Create;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Advertisers$Create;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/advertisers').replace(/([^:]\/)\/+/g, '$1'),
            method: 'POST',
          },
          options
        ),
        params,
        requiredParams: [],
        pathParams: [],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Advertiser>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Advertiser>(parameters);
      }
    }

    /**
     * displayvideo.advertisers.delete
     * @desc Deletes an advertiser. Deleting an advertiser will delete all of its child resources, for example, campaigns, insertion orders and line items. A deleted advertiser cannot be recovered.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.advertisers.delete({
     *     // The ID of the advertiser we need to delete.
     *     advertiserId: '[^/]+',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {}
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.advertisers.delete
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.advertiserId The ID of the advertiser we need to delete.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    delete(
      params?: Params$Resource$Advertisers$Delete,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Empty>;
    delete(
      params: Params$Resource$Advertisers$Delete,
      options: MethodOptions | BodyResponseCallback<Schema$Empty>,
      callback: BodyResponseCallback<Schema$Empty>
    ): void;
    delete(
      params: Params$Resource$Advertisers$Delete,
      callback: BodyResponseCallback<Schema$Empty>
    ): void;
    delete(callback: BodyResponseCallback<Schema$Empty>): void;
    delete(
      paramsOrCallback?:
        | Params$Resource$Advertisers$Delete
        | BodyResponseCallback<Schema$Empty>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$Empty>,
      callback?: BodyResponseCallback<Schema$Empty>
    ): void | GaxiosPromise<Schema$Empty> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Advertisers$Delete;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Advertisers$Delete;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/advertisers/{+advertiserId}').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'DELETE',
          },
          options
        ),
        params,
        requiredParams: ['advertiserId'],
        pathParams: ['advertiserId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Empty>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Empty>(parameters);
      }
    }

    /**
     * displayvideo.advertisers.get
     * @desc Gets an advertiser.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.advertisers.get({
     *     // Required. The ID of the advertiser to fetch.
     *     advertiserId: '[^/]+',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "adServerConfig": {},
     *   //   "advertiserId": "my_advertiserId",
     *   //   "creativeConfig": {},
     *   //   "dataAccessConfig": {},
     *   //   "displayName": "my_displayName",
     *   //   "entityStatus": "my_entityStatus",
     *   //   "generalConfig": {},
     *   //   "integrationDetails": {},
     *   //   "name": "my_name",
     *   //   "partnerId": "my_partnerId",
     *   //   "updateTime": "my_updateTime"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.advertisers.get
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.advertiserId Required. The ID of the advertiser to fetch.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    get(
      params?: Params$Resource$Advertisers$Get,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Advertiser>;
    get(
      params: Params$Resource$Advertisers$Get,
      options: MethodOptions | BodyResponseCallback<Schema$Advertiser>,
      callback: BodyResponseCallback<Schema$Advertiser>
    ): void;
    get(
      params: Params$Resource$Advertisers$Get,
      callback: BodyResponseCallback<Schema$Advertiser>
    ): void;
    get(callback: BodyResponseCallback<Schema$Advertiser>): void;
    get(
      paramsOrCallback?:
        | Params$Resource$Advertisers$Get
        | BodyResponseCallback<Schema$Advertiser>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$Advertiser>,
      callback?: BodyResponseCallback<Schema$Advertiser>
    ): void | GaxiosPromise<Schema$Advertiser> {
      let params = (paramsOrCallback || {}) as Params$Resource$Advertisers$Get;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Advertisers$Get;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/advertisers/{+advertiserId}').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: ['advertiserId'],
        pathParams: ['advertiserId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Advertiser>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Advertiser>(parameters);
      }
    }

    /**
     * displayvideo.advertisers.list
     * @desc Lists advertisers that are accessible to the current user.  The order is defined by the order_by parameter.  A single partner_id is required. Cross-partner listing is not supported.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.advertisers.list({
     *     // Allows filtering by advertiser properties.
     *     //
     *     // Supported syntax:
     *     //
     *     // * Filter expressions are made up of one or more restrictions.
     *     // * Restrictions can be combined by `AND` or `OR` logical operators. A
     *     // sequence of restrictions implicitly uses `AND`.
     *     // * A restriction has the form of `{field} {operator} {value}`.
     *     // * The operator must be `EQUALS (=)`.
     *     // * Supported fields:
     *     //     - `entityStatus`
     *     //
     *     // Examples:
     *     //
     *     // * All active advertisers under a partner:
     *     // `entityStatus="ENTITY_STATUS_ACTIVE"`
     *     //
     *     // The length of this field should be no more than 500 characters.
     *     filter: 'placeholder-value',
     *     // Field by which to sort the list.
     *     // Acceptable values are:
     *     //
     *     // * `displayName` (default)
     *     // * `entityStatus`
     *     //
     *     // The default sorting order is ascending. To specify descending order for
     *     // a field, a suffix "desc" should be added to the field name. For example,
     *     // `displayName desc`.
     *     orderBy: 'placeholder-value',
     *     // Requested page size. Must be between `1` and `100`. If unspecified will
     *     // default to `100`.
     *     pageSize: 'placeholder-value',
     *     // A token identifying a page of results the server should return.
     *     // Typically, this is the value of
     *     // next_page_token
     *     // returned from the previous call to `ListAdvertisers` method.
     *     // If not specified, the first page of results will be returned.
     *     pageToken: 'placeholder-value',
     *     // Required. The ID of the partner that the fetched advertisers should all belong to.
     *     // The system only supports listing advertisers for one partner at a time.
     *     partnerId: 'placeholder-value',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "advertisers": [],
     *   //   "nextPageToken": "my_nextPageToken"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.advertisers.list
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string=} params.filter Allows filtering by advertiser properties.  Supported syntax:  * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` or `OR` logical operators. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * The operator must be `EQUALS (=)`. * Supported fields:     - `entityStatus`  Examples:  * All active advertisers under a partner: `entityStatus="ENTITY_STATUS_ACTIVE"`  The length of this field should be no more than 500 characters.
     * @param {string=} params.orderBy Field by which to sort the list. Acceptable values are:  * `displayName` (default) * `entityStatus`  The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. For example, `displayName desc`.
     * @param {integer=} params.pageSize Requested page size. Must be between `1` and `100`. If unspecified will default to `100`.
     * @param {string=} params.pageToken A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListAdvertisers` method. If not specified, the first page of results will be returned.
     * @param {string=} params.partnerId Required. The ID of the partner that the fetched advertisers should all belong to. The system only supports listing advertisers for one partner at a time.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    list(
      params?: Params$Resource$Advertisers$List,
      options?: MethodOptions
    ): GaxiosPromise<Schema$ListAdvertisersResponse>;
    list(
      params: Params$Resource$Advertisers$List,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$ListAdvertisersResponse>,
      callback: BodyResponseCallback<Schema$ListAdvertisersResponse>
    ): void;
    list(
      params: Params$Resource$Advertisers$List,
      callback: BodyResponseCallback<Schema$ListAdvertisersResponse>
    ): void;
    list(callback: BodyResponseCallback<Schema$ListAdvertisersResponse>): void;
    list(
      paramsOrCallback?:
        | Params$Resource$Advertisers$List
        | BodyResponseCallback<Schema$ListAdvertisersResponse>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$ListAdvertisersResponse>,
      callback?: BodyResponseCallback<Schema$ListAdvertisersResponse>
    ): void | GaxiosPromise<Schema$ListAdvertisersResponse> {
      let params = (paramsOrCallback || {}) as Params$Resource$Advertisers$List;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Advertisers$List;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/advertisers').replace(/([^:]\/)\/+/g, '$1'),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: [],
        pathParams: [],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$ListAdvertisersResponse>(parameters, callback);
      } else {
        return createAPIRequest<Schema$ListAdvertisersResponse>(parameters);
      }
    }

    /**
     * displayvideo.advertisers.patch
     * @desc Updates an existing advertiser. Returns the updated advertiser if successful.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.advertisers.patch({
     *     // Output only. The unique ID of the advertiser. Assigned by the system.
     *     advertiserId: '[^/]+',
     *     // Required. The mask to control which fields to update.
     *     updateMask: 'placeholder-value',
     *
     *     // Request body metadata
     *     requestBody: {
     *       // request body parameters
     *       // {
     *       //   "adServerConfig": {},
     *       //   "advertiserId": "my_advertiserId",
     *       //   "creativeConfig": {},
     *       //   "dataAccessConfig": {},
     *       //   "displayName": "my_displayName",
     *       //   "entityStatus": "my_entityStatus",
     *       //   "generalConfig": {},
     *       //   "integrationDetails": {},
     *       //   "name": "my_name",
     *       //   "partnerId": "my_partnerId",
     *       //   "updateTime": "my_updateTime"
     *       // }
     *     },
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "adServerConfig": {},
     *   //   "advertiserId": "my_advertiserId",
     *   //   "creativeConfig": {},
     *   //   "dataAccessConfig": {},
     *   //   "displayName": "my_displayName",
     *   //   "entityStatus": "my_entityStatus",
     *   //   "generalConfig": {},
     *   //   "integrationDetails": {},
     *   //   "name": "my_name",
     *   //   "partnerId": "my_partnerId",
     *   //   "updateTime": "my_updateTime"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.advertisers.patch
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.advertiserId Output only. The unique ID of the advertiser. Assigned by the system.
     * @param {string=} params.updateMask Required. The mask to control which fields to update.
     * @param {().Advertiser} params.requestBody Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    patch(
      params?: Params$Resource$Advertisers$Patch,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Advertiser>;
    patch(
      params: Params$Resource$Advertisers$Patch,
      options: MethodOptions | BodyResponseCallback<Schema$Advertiser>,
      callback: BodyResponseCallback<Schema$Advertiser>
    ): void;
    patch(
      params: Params$Resource$Advertisers$Patch,
      callback: BodyResponseCallback<Schema$Advertiser>
    ): void;
    patch(callback: BodyResponseCallback<Schema$Advertiser>): void;
    patch(
      paramsOrCallback?:
        | Params$Resource$Advertisers$Patch
        | BodyResponseCallback<Schema$Advertiser>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$Advertiser>,
      callback?: BodyResponseCallback<Schema$Advertiser>
    ): void | GaxiosPromise<Schema$Advertiser> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Advertisers$Patch;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Advertisers$Patch;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/advertisers/{+advertiserId}').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'PATCH',
          },
          options
        ),
        params,
        requiredParams: ['advertiserId'],
        pathParams: ['advertiserId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Advertiser>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Advertiser>(parameters);
      }
    }
  }

  export interface Params$Resource$Advertisers$Create
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Request body metadata
     */
    requestBody?: Schema$Advertiser;
  }
  export interface Params$Resource$Advertisers$Delete
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * The ID of the advertiser we need to delete.
     */
    advertiserId?: string;
  }
  export interface Params$Resource$Advertisers$Get extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required. The ID of the advertiser to fetch.
     */
    advertiserId?: string;
  }
  export interface Params$Resource$Advertisers$List extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Allows filtering by advertiser properties.  Supported syntax:  * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` or `OR` logical operators. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * The operator must be `EQUALS (=)`. * Supported fields:     - `entityStatus`  Examples:  * All active advertisers under a partner: `entityStatus="ENTITY_STATUS_ACTIVE"`  The length of this field should be no more than 500 characters.
     */
    filter?: string;
    /**
     * Field by which to sort the list. Acceptable values are:  * `displayName` (default) * `entityStatus`  The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. For example, `displayName desc`.
     */
    orderBy?: string;
    /**
     * Requested page size. Must be between `1` and `100`. If unspecified will default to `100`.
     */
    pageSize?: number;
    /**
     * A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListAdvertisers` method. If not specified, the first page of results will be returned.
     */
    pageToken?: string;
    /**
     * Required. The ID of the partner that the fetched advertisers should all belong to. The system only supports listing advertisers for one partner at a time.
     */
    partnerId?: string;
  }
  export interface Params$Resource$Advertisers$Patch
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Output only. The unique ID of the advertiser. Assigned by the system.
     */
    advertiserId?: string;
    /**
     * Required. The mask to control which fields to update.
     */
    updateMask?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$Advertiser;
  }

  export class Resource$Advertisers$Assets {
    context: APIRequestContext;
    constructor(context: APIRequestContext) {
      this.context = context;
    }

    /**
     * displayvideo.advertisers.assets.upload
     * @desc Uploads an asset. Returns the ID of the newly uploaded asset if successful. The asset file size should be no more than 10 MB for images, 200 MB for ZIP files, and 1 GB for videos.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.advertisers.assets.upload({
     *     // Required. The ID of the advertiser this asset belongs to.
     *     advertiserId: '[^/]+',
     *
     *     // Request body metadata
     *     requestBody: {
     *       // request body parameters
     *       // {
     *       //   "filename": "my_filename"
     *       // }
     *     },
     *     media: {
     *       mimeType: 'placeholder-value',
     *       body: 'placeholder-value',
     *     },
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "asset": {}
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.advertisers.assets.upload
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.advertiserId Required. The ID of the advertiser this asset belongs to.
     * @param  {object} params.requestBody Media resource metadata
     * @param {object} params.media Media object
     * @param {string} params.media.mimeType Media mime-type
     * @param {string|object} params.media.body Media body contents
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    upload(
      params?: Params$Resource$Advertisers$Assets$Upload,
      options?: MethodOptions
    ): GaxiosPromise<Schema$CreateAssetResponse>;
    upload(
      params: Params$Resource$Advertisers$Assets$Upload,
      options: MethodOptions | BodyResponseCallback<Schema$CreateAssetResponse>,
      callback: BodyResponseCallback<Schema$CreateAssetResponse>
    ): void;
    upload(
      params: Params$Resource$Advertisers$Assets$Upload,
      callback: BodyResponseCallback<Schema$CreateAssetResponse>
    ): void;
    upload(callback: BodyResponseCallback<Schema$CreateAssetResponse>): void;
    upload(
      paramsOrCallback?:
        | Params$Resource$Advertisers$Assets$Upload
        | BodyResponseCallback<Schema$CreateAssetResponse>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$CreateAssetResponse>,
      callback?: BodyResponseCallback<Schema$CreateAssetResponse>
    ): void | GaxiosPromise<Schema$CreateAssetResponse> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Advertisers$Assets$Upload;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Advertisers$Assets$Upload;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/advertisers/{+advertiserId}/assets').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'POST',
          },
          options
        ),
        params,
        mediaUrl: (
          rootUrl + '/upload/v1/advertisers/{+advertiserId}/assets'
        ).replace(/([^:]\/)\/+/g, '$1'),
        requiredParams: ['advertiserId'],
        pathParams: ['advertiserId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$CreateAssetResponse>(parameters, callback);
      } else {
        return createAPIRequest<Schema$CreateAssetResponse>(parameters);
      }
    }
  }

  export interface Params$Resource$Advertisers$Assets$Upload
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required. The ID of the advertiser this asset belongs to.
     */
    advertiserId?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$CreateAssetRequest;

    /**
     * Media metadata
     */
    media?: {
      /**
       * Media mime-type
       */
      mimeType?: string;

      /**
       * Media body contents
       */
      body?: any;
    };
  }

  export class Resource$Advertisers$Campaigns {
    context: APIRequestContext;
    constructor(context: APIRequestContext) {
      this.context = context;
    }

    /**
     * displayvideo.advertisers.campaigns.create
     * @desc Creates a new campaign. Returns the newly created campaign if successful.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.advertisers.campaigns.create({
     *     // Output only. The unique ID of the advertiser the campaign belongs to.
     *     advertiserId: '[^/]+',
     *
     *     // Request body metadata
     *     requestBody: {
     *       // request body parameters
     *       // {
     *       //   "advertiserId": "my_advertiserId",
     *       //   "campaignFlight": {},
     *       //   "campaignGoal": {},
     *       //   "campaignId": "my_campaignId",
     *       //   "displayName": "my_displayName",
     *       //   "entityStatus": "my_entityStatus",
     *       //   "frequencyCap": {},
     *       //   "name": "my_name",
     *       //   "updateTime": "my_updateTime"
     *       // }
     *     },
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "advertiserId": "my_advertiserId",
     *   //   "campaignFlight": {},
     *   //   "campaignGoal": {},
     *   //   "campaignId": "my_campaignId",
     *   //   "displayName": "my_displayName",
     *   //   "entityStatus": "my_entityStatus",
     *   //   "frequencyCap": {},
     *   //   "name": "my_name",
     *   //   "updateTime": "my_updateTime"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.advertisers.campaigns.create
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.advertiserId Output only. The unique ID of the advertiser the campaign belongs to.
     * @param {().Campaign} params.requestBody Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    create(
      params?: Params$Resource$Advertisers$Campaigns$Create,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Campaign>;
    create(
      params: Params$Resource$Advertisers$Campaigns$Create,
      options: MethodOptions | BodyResponseCallback<Schema$Campaign>,
      callback: BodyResponseCallback<Schema$Campaign>
    ): void;
    create(
      params: Params$Resource$Advertisers$Campaigns$Create,
      callback: BodyResponseCallback<Schema$Campaign>
    ): void;
    create(callback: BodyResponseCallback<Schema$Campaign>): void;
    create(
      paramsOrCallback?:
        | Params$Resource$Advertisers$Campaigns$Create
        | BodyResponseCallback<Schema$Campaign>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$Campaign>,
      callback?: BodyResponseCallback<Schema$Campaign>
    ): void | GaxiosPromise<Schema$Campaign> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Advertisers$Campaigns$Create;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Advertisers$Campaigns$Create;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (
              rootUrl + '/v1/advertisers/{+advertiserId}/campaigns'
            ).replace(/([^:]\/)\/+/g, '$1'),
            method: 'POST',
          },
          options
        ),
        params,
        requiredParams: ['advertiserId'],
        pathParams: ['advertiserId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Campaign>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Campaign>(parameters);
      }
    }

    /**
     * displayvideo.advertisers.campaigns.delete
     * @desc Permanently deletes a campaign. A deleted campaign cannot be recovered. The campaign should be archived first, i.e. set entity_status to `ENTITY_STATUS_ARCHIVED`, to be able to delete it.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.advertisers.campaigns.delete({
     *     // The ID of the advertiser this campaign belongs to.
     *     advertiserId: '[^/]+',
     *     // The ID of the campaign we need to delete.
     *     campaignId: '[^/]+',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {}
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.advertisers.campaigns.delete
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.advertiserId The ID of the advertiser this campaign belongs to.
     * @param {string} params.campaignId The ID of the campaign we need to delete.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    delete(
      params?: Params$Resource$Advertisers$Campaigns$Delete,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Empty>;
    delete(
      params: Params$Resource$Advertisers$Campaigns$Delete,
      options: MethodOptions | BodyResponseCallback<Schema$Empty>,
      callback: BodyResponseCallback<Schema$Empty>
    ): void;
    delete(
      params: Params$Resource$Advertisers$Campaigns$Delete,
      callback: BodyResponseCallback<Schema$Empty>
    ): void;
    delete(callback: BodyResponseCallback<Schema$Empty>): void;
    delete(
      paramsOrCallback?:
        | Params$Resource$Advertisers$Campaigns$Delete
        | BodyResponseCallback<Schema$Empty>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$Empty>,
      callback?: BodyResponseCallback<Schema$Empty>
    ): void | GaxiosPromise<Schema$Empty> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Advertisers$Campaigns$Delete;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Advertisers$Campaigns$Delete;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (
              rootUrl +
              '/v1/advertisers/{+advertiserId}/campaigns/{+campaignId}'
            ).replace(/([^:]\/)\/+/g, '$1'),
            method: 'DELETE',
          },
          options
        ),
        params,
        requiredParams: ['advertiserId', 'campaignId'],
        pathParams: ['advertiserId', 'campaignId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Empty>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Empty>(parameters);
      }
    }

    /**
     * displayvideo.advertisers.campaigns.get
     * @desc Gets a campaign.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.advertisers.campaigns.get({
     *     // Required. The ID of the advertiser this campaign belongs to.
     *     advertiserId: '[^/]+',
     *     // Required. The ID of the campaign to fetch.
     *     campaignId: '[^/]+',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "advertiserId": "my_advertiserId",
     *   //   "campaignFlight": {},
     *   //   "campaignGoal": {},
     *   //   "campaignId": "my_campaignId",
     *   //   "displayName": "my_displayName",
     *   //   "entityStatus": "my_entityStatus",
     *   //   "frequencyCap": {},
     *   //   "name": "my_name",
     *   //   "updateTime": "my_updateTime"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.advertisers.campaigns.get
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.advertiserId Required. The ID of the advertiser this campaign belongs to.
     * @param {string} params.campaignId Required. The ID of the campaign to fetch.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    get(
      params?: Params$Resource$Advertisers$Campaigns$Get,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Campaign>;
    get(
      params: Params$Resource$Advertisers$Campaigns$Get,
      options: MethodOptions | BodyResponseCallback<Schema$Campaign>,
      callback: BodyResponseCallback<Schema$Campaign>
    ): void;
    get(
      params: Params$Resource$Advertisers$Campaigns$Get,
      callback: BodyResponseCallback<Schema$Campaign>
    ): void;
    get(callback: BodyResponseCallback<Schema$Campaign>): void;
    get(
      paramsOrCallback?:
        | Params$Resource$Advertisers$Campaigns$Get
        | BodyResponseCallback<Schema$Campaign>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$Campaign>,
      callback?: BodyResponseCallback<Schema$Campaign>
    ): void | GaxiosPromise<Schema$Campaign> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Advertisers$Campaigns$Get;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Advertisers$Campaigns$Get;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (
              rootUrl +
              '/v1/advertisers/{+advertiserId}/campaigns/{+campaignId}'
            ).replace(/([^:]\/)\/+/g, '$1'),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: ['advertiserId', 'campaignId'],
        pathParams: ['advertiserId', 'campaignId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Campaign>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Campaign>(parameters);
      }
    }

    /**
     * displayvideo.advertisers.campaigns.list
     * @desc Lists campaigns in an advertiser.  The order is defined by the order_by parameter. If a filter by entity_status is not specified, campaigns with `ENTITY_STATUS_ARCHIVED` will not be included in the results.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.advertisers.campaigns.list({
     *     // The ID of the advertiser to list campaigns for.
     *     advertiserId: '[^/]+',
     *     // Allows filtering by campaign properties.
     *     //
     *     // Supported syntax:
     *     //
     *     // * Filter expressions are made up of one or more restrictions.
     *     // * Restrictions can be combined by `AND` or `OR` logical operators. A
     *     // sequence of restrictions implicitly uses `AND`.
     *     // * A restriction has the form of `{field} {operator} {value}`.
     *     // * The operator must be `EQUALS (=)`.
     *     // * Supported fields:
     *     //     - `entityStatus`
     *     //
     *     // Examples:
     *     //
     *     // * All `ENTITY_STATUS_ACTIVE` or `ENTITY_STATUS_PAUSED` campaigns under an
     *     // advertiser:
     *     // `(entityStatus="ENTITY_STATUS_ACTIVE" OR
     *     // entityStatus="ENTITY_STATUS_PAUSED")`
     *     //
     *     // The length of this field should be no more than 500 characters.
     *     filter: 'placeholder-value',
     *     // Field by which to sort the list.
     *     // Acceptable values are:
     *     //
     *     // * `displayName` (default)
     *     // * `entityStatus`
     *     //
     *     // The default sorting order is ascending. To specify descending order for
     *     // a field, a suffix "desc" should be added to the field name. Example:
     *     // `displayName desc`.
     *     orderBy: 'placeholder-value',
     *     // Requested page size. Must be between `1` and `100`. If unspecified will
     *     // default to `100`.
     *     pageSize: 'placeholder-value',
     *     // A token identifying a page of results the server should return.
     *     // Typically, this is the value of
     *     // next_page_token returned from the
     *     // previous call to `ListCampaigns` method. If not specified, the first page
     *     // of results will be returned.
     *     pageToken: 'placeholder-value',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "campaigns": [],
     *   //   "nextPageToken": "my_nextPageToken"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.advertisers.campaigns.list
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.advertiserId The ID of the advertiser to list campaigns for.
     * @param {string=} params.filter Allows filtering by campaign properties.  Supported syntax:  * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` or `OR` logical operators. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * The operator must be `EQUALS (=)`. * Supported fields:     - `entityStatus`  Examples:  * All `ENTITY_STATUS_ACTIVE` or `ENTITY_STATUS_PAUSED` campaigns under an advertiser: `(entityStatus="ENTITY_STATUS_ACTIVE" OR entityStatus="ENTITY_STATUS_PAUSED")`  The length of this field should be no more than 500 characters.
     * @param {string=} params.orderBy Field by which to sort the list. Acceptable values are:  * `displayName` (default) * `entityStatus`  The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `displayName desc`.
     * @param {integer=} params.pageSize Requested page size. Must be between `1` and `100`. If unspecified will default to `100`.
     * @param {string=} params.pageToken A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListCampaigns` method. If not specified, the first page of results will be returned.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    list(
      params?: Params$Resource$Advertisers$Campaigns$List,
      options?: MethodOptions
    ): GaxiosPromise<Schema$ListCampaignsResponse>;
    list(
      params: Params$Resource$Advertisers$Campaigns$List,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$ListCampaignsResponse>,
      callback: BodyResponseCallback<Schema$ListCampaignsResponse>
    ): void;
    list(
      params: Params$Resource$Advertisers$Campaigns$List,
      callback: BodyResponseCallback<Schema$ListCampaignsResponse>
    ): void;
    list(callback: BodyResponseCallback<Schema$ListCampaignsResponse>): void;
    list(
      paramsOrCallback?:
        | Params$Resource$Advertisers$Campaigns$List
        | BodyResponseCallback<Schema$ListCampaignsResponse>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$ListCampaignsResponse>,
      callback?: BodyResponseCallback<Schema$ListCampaignsResponse>
    ): void | GaxiosPromise<Schema$ListCampaignsResponse> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Advertisers$Campaigns$List;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Advertisers$Campaigns$List;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (
              rootUrl + '/v1/advertisers/{+advertiserId}/campaigns'
            ).replace(/([^:]\/)\/+/g, '$1'),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: ['advertiserId'],
        pathParams: ['advertiserId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$ListCampaignsResponse>(parameters, callback);
      } else {
        return createAPIRequest<Schema$ListCampaignsResponse>(parameters);
      }
    }

    /**
     * displayvideo.advertisers.campaigns.patch
     * @desc Updates an existing campaign. Returns the updated campaign if successful.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.advertisers.campaigns.patch({
     *     // Output only. The unique ID of the advertiser the campaign belongs to.
     *     advertiserId: '[^/]+',
     *     // Output only. The unique ID of the campaign. Assigned by the system.
     *     campaignId: '[^/]+',
     *     // Required. The mask to control which fields to update.
     *     updateMask: 'placeholder-value',
     *
     *     // Request body metadata
     *     requestBody: {
     *       // request body parameters
     *       // {
     *       //   "advertiserId": "my_advertiserId",
     *       //   "campaignFlight": {},
     *       //   "campaignGoal": {},
     *       //   "campaignId": "my_campaignId",
     *       //   "displayName": "my_displayName",
     *       //   "entityStatus": "my_entityStatus",
     *       //   "frequencyCap": {},
     *       //   "name": "my_name",
     *       //   "updateTime": "my_updateTime"
     *       // }
     *     },
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "advertiserId": "my_advertiserId",
     *   //   "campaignFlight": {},
     *   //   "campaignGoal": {},
     *   //   "campaignId": "my_campaignId",
     *   //   "displayName": "my_displayName",
     *   //   "entityStatus": "my_entityStatus",
     *   //   "frequencyCap": {},
     *   //   "name": "my_name",
     *   //   "updateTime": "my_updateTime"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.advertisers.campaigns.patch
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.advertiserId Output only. The unique ID of the advertiser the campaign belongs to.
     * @param {string} params.campaignId Output only. The unique ID of the campaign. Assigned by the system.
     * @param {string=} params.updateMask Required. The mask to control which fields to update.
     * @param {().Campaign} params.requestBody Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    patch(
      params?: Params$Resource$Advertisers$Campaigns$Patch,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Campaign>;
    patch(
      params: Params$Resource$Advertisers$Campaigns$Patch,
      options: MethodOptions | BodyResponseCallback<Schema$Campaign>,
      callback: BodyResponseCallback<Schema$Campaign>
    ): void;
    patch(
      params: Params$Resource$Advertisers$Campaigns$Patch,
      callback: BodyResponseCallback<Schema$Campaign>
    ): void;
    patch(callback: BodyResponseCallback<Schema$Campaign>): void;
    patch(
      paramsOrCallback?:
        | Params$Resource$Advertisers$Campaigns$Patch
        | BodyResponseCallback<Schema$Campaign>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$Campaign>,
      callback?: BodyResponseCallback<Schema$Campaign>
    ): void | GaxiosPromise<Schema$Campaign> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Advertisers$Campaigns$Patch;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Advertisers$Campaigns$Patch;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (
              rootUrl +
              '/v1/advertisers/{+advertiserId}/campaigns/{+campaignId}'
            ).replace(/([^:]\/)\/+/g, '$1'),
            method: 'PATCH',
          },
          options
        ),
        params,
        requiredParams: ['advertiserId', 'campaignId'],
        pathParams: ['advertiserId', 'campaignId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Campaign>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Campaign>(parameters);
      }
    }
  }

  export interface Params$Resource$Advertisers$Campaigns$Create
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Output only. The unique ID of the advertiser the campaign belongs to.
     */
    advertiserId?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$Campaign;
  }
  export interface Params$Resource$Advertisers$Campaigns$Delete
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * The ID of the advertiser this campaign belongs to.
     */
    advertiserId?: string;
    /**
     * The ID of the campaign we need to delete.
     */
    campaignId?: string;
  }
  export interface Params$Resource$Advertisers$Campaigns$Get
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required. The ID of the advertiser this campaign belongs to.
     */
    advertiserId?: string;
    /**
     * Required. The ID of the campaign to fetch.
     */
    campaignId?: string;
  }
  export interface Params$Resource$Advertisers$Campaigns$List
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * The ID of the advertiser to list campaigns for.
     */
    advertiserId?: string;
    /**
     * Allows filtering by campaign properties.  Supported syntax:  * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` or `OR` logical operators. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * The operator must be `EQUALS (=)`. * Supported fields:     - `entityStatus`  Examples:  * All `ENTITY_STATUS_ACTIVE` or `ENTITY_STATUS_PAUSED` campaigns under an advertiser: `(entityStatus="ENTITY_STATUS_ACTIVE" OR entityStatus="ENTITY_STATUS_PAUSED")`  The length of this field should be no more than 500 characters.
     */
    filter?: string;
    /**
     * Field by which to sort the list. Acceptable values are:  * `displayName` (default) * `entityStatus`  The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `displayName desc`.
     */
    orderBy?: string;
    /**
     * Requested page size. Must be between `1` and `100`. If unspecified will default to `100`.
     */
    pageSize?: number;
    /**
     * A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListCampaigns` method. If not specified, the first page of results will be returned.
     */
    pageToken?: string;
  }
  export interface Params$Resource$Advertisers$Campaigns$Patch
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Output only. The unique ID of the advertiser the campaign belongs to.
     */
    advertiserId?: string;
    /**
     * Output only. The unique ID of the campaign. Assigned by the system.
     */
    campaignId?: string;
    /**
     * Required. The mask to control which fields to update.
     */
    updateMask?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$Campaign;
  }

  export class Resource$Advertisers$Channels {
    context: APIRequestContext;
    constructor(context: APIRequestContext) {
      this.context = context;
    }

    /**
     * displayvideo.advertisers.channels.get
     * @desc Gets a channel for a partner or advertiser.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.advertisers.channels.get({
     *     // The ID of the advertiser that owns the fetched channel.
     *     advertiserId: '[^/]+',
     *     // Required. The ID of the channel to fetch.
     *     channelId: '[^/]+',
     *     // The ID of the partner that owns the fetched channel.
     *     partnerId: 'placeholder-value',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "advertiserId": "my_advertiserId",
     *   //   "channelId": "my_channelId",
     *   //   "displayName": "my_displayName",
     *   //   "name": "my_name",
     *   //   "partnerId": "my_partnerId"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.advertisers.channels.get
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.advertiserId The ID of the advertiser that owns the fetched channel.
     * @param {string} params.channelId Required. The ID of the channel to fetch.
     * @param {string=} params.partnerId The ID of the partner that owns the fetched channel.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    get(
      params?: Params$Resource$Advertisers$Channels$Get,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Channel>;
    get(
      params: Params$Resource$Advertisers$Channels$Get,
      options: MethodOptions | BodyResponseCallback<Schema$Channel>,
      callback: BodyResponseCallback<Schema$Channel>
    ): void;
    get(
      params: Params$Resource$Advertisers$Channels$Get,
      callback: BodyResponseCallback<Schema$Channel>
    ): void;
    get(callback: BodyResponseCallback<Schema$Channel>): void;
    get(
      paramsOrCallback?:
        | Params$Resource$Advertisers$Channels$Get
        | BodyResponseCallback<Schema$Channel>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$Channel>,
      callback?: BodyResponseCallback<Schema$Channel>
    ): void | GaxiosPromise<Schema$Channel> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Advertisers$Channels$Get;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Advertisers$Channels$Get;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (
              rootUrl + '/v1/advertisers/{+advertiserId}/channels/{+channelId}'
            ).replace(/([^:]\/)\/+/g, '$1'),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: ['advertiserId', 'channelId'],
        pathParams: ['advertiserId', 'channelId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Channel>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Channel>(parameters);
      }
    }

    /**
     * displayvideo.advertisers.channels.list
     * @desc Lists channels for a partner or advertiser.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.advertisers.channels.list({
     *     // The ID of the advertiser that owns the channels.
     *     advertiserId: '[^/]+',
     *     // Allows filtering by channel fields.
     *     //
     *     // Supported syntax:
     *     //
     *     // * Filter expressions for channel currently can only contain at most one
     *     // * restriction.
     *     // * A restriction has the form of `{field} {operator} {value}`.
     *     // * The operator must be `CONTAINS (:)`.
     *     // * Supported fields:
     *     //     - `displayName`
     *     //
     *     // Examples:
     *     //
     *     // * All channels for which the display name contains "google":
     *     // `displayName : "google"`.
     *     //
     *     // The length of this field should be no more than 500 characters.
     *     filter: 'placeholder-value',
     *     // Field by which to sort the list.
     *     // Acceptable values are:
     *     //
     *     // * `displayName` (default)
     *     // * `channelId`
     *     //
     *     // The default sorting order is ascending. To specify descending order for a
     *     // field, a suffix " desc" should be added to the field name. Example:
     *     // `displayName desc`.
     *     orderBy: 'placeholder-value',
     *     // Requested page size. Must be between `1` and `100`. If unspecified will
     *     // default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value
     *     // is specified.
     *     pageSize: 'placeholder-value',
     *     // A token identifying a page of results the server should return.
     *     // Typically, this is the value of
     *     // next_page_token returned from the
     *     // previous call to `ListChannels` method. If not specified, the first page
     *     // of results will be returned.
     *     pageToken: 'placeholder-value',
     *     // The ID of the partner that owns the channels.
     *     partnerId: 'placeholder-value',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "channels": [],
     *   //   "nextPageToken": "my_nextPageToken"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.advertisers.channels.list
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.advertiserId The ID of the advertiser that owns the channels.
     * @param {string=} params.filter Allows filtering by channel fields.  Supported syntax:  * Filter expressions for channel currently can only contain at most one * restriction. * A restriction has the form of `{field} {operator} {value}`. * The operator must be `CONTAINS (:)`. * Supported fields:     - `displayName`  Examples:  * All channels for which the display name contains "google": `displayName : "google"`.  The length of this field should be no more than 500 characters.
     * @param {string=} params.orderBy Field by which to sort the list. Acceptable values are:  * `displayName` (default) * `channelId`  The default sorting order is ascending. To specify descending order for a field, a suffix " desc" should be added to the field name. Example: `displayName desc`.
     * @param {integer=} params.pageSize Requested page size. Must be between `1` and `100`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified.
     * @param {string=} params.pageToken A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListChannels` method. If not specified, the first page of results will be returned.
     * @param {string=} params.partnerId The ID of the partner that owns the channels.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    list(
      params?: Params$Resource$Advertisers$Channels$List,
      options?: MethodOptions
    ): GaxiosPromise<Schema$ListChannelsResponse>;
    list(
      params: Params$Resource$Advertisers$Channels$List,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$ListChannelsResponse>,
      callback: BodyResponseCallback<Schema$ListChannelsResponse>
    ): void;
    list(
      params: Params$Resource$Advertisers$Channels$List,
      callback: BodyResponseCallback<Schema$ListChannelsResponse>
    ): void;
    list(callback: BodyResponseCallback<Schema$ListChannelsResponse>): void;
    list(
      paramsOrCallback?:
        | Params$Resource$Advertisers$Channels$List
        | BodyResponseCallback<Schema$ListChannelsResponse>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$ListChannelsResponse>,
      callback?: BodyResponseCallback<Schema$ListChannelsResponse>
    ): void | GaxiosPromise<Schema$ListChannelsResponse> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Advertisers$Channels$List;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Advertisers$Channels$List;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/advertisers/{+advertiserId}/channels').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: ['advertiserId'],
        pathParams: ['advertiserId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$ListChannelsResponse>(parameters, callback);
      } else {
        return createAPIRequest<Schema$ListChannelsResponse>(parameters);
      }
    }
  }

  export interface Params$Resource$Advertisers$Channels$Get
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * The ID of the advertiser that owns the fetched channel.
     */
    advertiserId?: string;
    /**
     * Required. The ID of the channel to fetch.
     */
    channelId?: string;
    /**
     * The ID of the partner that owns the fetched channel.
     */
    partnerId?: string;
  }
  export interface Params$Resource$Advertisers$Channels$List
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * The ID of the advertiser that owns the channels.
     */
    advertiserId?: string;
    /**
     * Allows filtering by channel fields.  Supported syntax:  * Filter expressions for channel currently can only contain at most one * restriction. * A restriction has the form of `{field} {operator} {value}`. * The operator must be `CONTAINS (:)`. * Supported fields:     - `displayName`  Examples:  * All channels for which the display name contains "google": `displayName : "google"`.  The length of this field should be no more than 500 characters.
     */
    filter?: string;
    /**
     * Field by which to sort the list. Acceptable values are:  * `displayName` (default) * `channelId`  The default sorting order is ascending. To specify descending order for a field, a suffix " desc" should be added to the field name. Example: `displayName desc`.
     */
    orderBy?: string;
    /**
     * Requested page size. Must be between `1` and `100`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified.
     */
    pageSize?: number;
    /**
     * A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListChannels` method. If not specified, the first page of results will be returned.
     */
    pageToken?: string;
    /**
     * The ID of the partner that owns the channels.
     */
    partnerId?: string;
  }

  export class Resource$Advertisers$Creatives {
    context: APIRequestContext;
    constructor(context: APIRequestContext) {
      this.context = context;
    }

    /**
     * displayvideo.advertisers.creatives.create
     * @desc Creates a new creative. Returns the newly created creative if successful.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.advertisers.creatives.create({
     *     // Output only. The unique ID of the advertiser the creative belongs to.
     *     advertiserId: '[^/]+',
     *
     *     // Request body metadata
     *     requestBody: {
     *       // request body parameters
     *       // {
     *       //   "additionalDimensions": [],
     *       //   "advertiserId": "my_advertiserId",
     *       //   "appendedTag": "my_appendedTag",
     *       //   "assets": [],
     *       //   "cmPlacementId": "my_cmPlacementId",
     *       //   "cmTrackingAd": {},
     *       //   "companionCreativeIds": [],
     *       //   "counterEvents": [],
     *       //   "createTime": "my_createTime",
     *       //   "creativeAttributes": [],
     *       //   "creativeId": "my_creativeId",
     *       //   "creativeType": "my_creativeType",
     *       //   "dimensions": {},
     *       //   "displayName": "my_displayName",
     *       //   "dynamic": false,
     *       //   "entityStatus": "my_entityStatus",
     *       //   "exitEvents": [],
     *       //   "expandOnHover": false,
     *       //   "expandingDirection": "my_expandingDirection",
     *       //   "hostingSource": "my_hostingSource",
     *       //   "html5Video": false,
     *       //   "iasCampaignMonitoring": false,
     *       //   "integrationCode": "my_integrationCode",
     *       //   "jsTrackerUrl": "my_jsTrackerUrl",
     *       //   "mediaDuration": "my_mediaDuration",
     *       //   "name": "my_name",
     *       //   "notes": "my_notes",
     *       //   "obaIcon": {},
     *       //   "progressOffset": {},
     *       //   "requireHtml5": false,
     *       //   "requireMraid": false,
     *       //   "requirePingForAttribution": false,
     *       //   "reviewStatus": {},
     *       //   "skipOffset": {},
     *       //   "skippable": false,
     *       //   "thirdPartyTag": "my_thirdPartyTag",
     *       //   "thirdPartyUrls": [],
     *       //   "timerEvents": [],
     *       //   "trackerUrls": [],
     *       //   "transcodes": [],
     *       //   "universalAdId": {},
     *       //   "updateTime": "my_updateTime",
     *       //   "vastTagUrl": "my_vastTagUrl",
     *       //   "vpaid": false
     *       // }
     *     },
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "additionalDimensions": [],
     *   //   "advertiserId": "my_advertiserId",
     *   //   "appendedTag": "my_appendedTag",
     *   //   "assets": [],
     *   //   "cmPlacementId": "my_cmPlacementId",
     *   //   "cmTrackingAd": {},
     *   //   "companionCreativeIds": [],
     *   //   "counterEvents": [],
     *   //   "createTime": "my_createTime",
     *   //   "creativeAttributes": [],
     *   //   "creativeId": "my_creativeId",
     *   //   "creativeType": "my_creativeType",
     *   //   "dimensions": {},
     *   //   "displayName": "my_displayName",
     *   //   "dynamic": false,
     *   //   "entityStatus": "my_entityStatus",
     *   //   "exitEvents": [],
     *   //   "expandOnHover": false,
     *   //   "expandingDirection": "my_expandingDirection",
     *   //   "hostingSource": "my_hostingSource",
     *   //   "html5Video": false,
     *   //   "iasCampaignMonitoring": false,
     *   //   "integrationCode": "my_integrationCode",
     *   //   "jsTrackerUrl": "my_jsTrackerUrl",
     *   //   "mediaDuration": "my_mediaDuration",
     *   //   "name": "my_name",
     *   //   "notes": "my_notes",
     *   //   "obaIcon": {},
     *   //   "progressOffset": {},
     *   //   "requireHtml5": false,
     *   //   "requireMraid": false,
     *   //   "requirePingForAttribution": false,
     *   //   "reviewStatus": {},
     *   //   "skipOffset": {},
     *   //   "skippable": false,
     *   //   "thirdPartyTag": "my_thirdPartyTag",
     *   //   "thirdPartyUrls": [],
     *   //   "timerEvents": [],
     *   //   "trackerUrls": [],
     *   //   "transcodes": [],
     *   //   "universalAdId": {},
     *   //   "updateTime": "my_updateTime",
     *   //   "vastTagUrl": "my_vastTagUrl",
     *   //   "vpaid": false
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.advertisers.creatives.create
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.advertiserId Output only. The unique ID of the advertiser the creative belongs to.
     * @param {().Creative} params.requestBody Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    create(
      params?: Params$Resource$Advertisers$Creatives$Create,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Creative>;
    create(
      params: Params$Resource$Advertisers$Creatives$Create,
      options: MethodOptions | BodyResponseCallback<Schema$Creative>,
      callback: BodyResponseCallback<Schema$Creative>
    ): void;
    create(
      params: Params$Resource$Advertisers$Creatives$Create,
      callback: BodyResponseCallback<Schema$Creative>
    ): void;
    create(callback: BodyResponseCallback<Schema$Creative>): void;
    create(
      paramsOrCallback?:
        | Params$Resource$Advertisers$Creatives$Create
        | BodyResponseCallback<Schema$Creative>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$Creative>,
      callback?: BodyResponseCallback<Schema$Creative>
    ): void | GaxiosPromise<Schema$Creative> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Advertisers$Creatives$Create;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Advertisers$Creatives$Create;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (
              rootUrl + '/v1/advertisers/{+advertiserId}/creatives'
            ).replace(/([^:]\/)\/+/g, '$1'),
            method: 'POST',
          },
          options
        ),
        params,
        requiredParams: ['advertiserId'],
        pathParams: ['advertiserId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Creative>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Creative>(parameters);
      }
    }

    /**
     * displayvideo.advertisers.creatives.delete
     * @desc Deletes a creative. Returns error code `NOT_FOUND` if the creative does not exist. The creative should be archived first, i.e. set entity_status to `ENTITY_STATUS_ARCHIVED`, before it can be deleted.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.advertisers.creatives.delete({
     *     // The ID of the advertiser this creative belongs to.
     *     advertiserId: '[^/]+',
     *     // The ID of the creative to be deleted.
     *     creativeId: '[^/]+',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {}
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.advertisers.creatives.delete
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.advertiserId The ID of the advertiser this creative belongs to.
     * @param {string} params.creativeId The ID of the creative to be deleted.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    delete(
      params?: Params$Resource$Advertisers$Creatives$Delete,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Empty>;
    delete(
      params: Params$Resource$Advertisers$Creatives$Delete,
      options: MethodOptions | BodyResponseCallback<Schema$Empty>,
      callback: BodyResponseCallback<Schema$Empty>
    ): void;
    delete(
      params: Params$Resource$Advertisers$Creatives$Delete,
      callback: BodyResponseCallback<Schema$Empty>
    ): void;
    delete(callback: BodyResponseCallback<Schema$Empty>): void;
    delete(
      paramsOrCallback?:
        | Params$Resource$Advertisers$Creatives$Delete
        | BodyResponseCallback<Schema$Empty>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$Empty>,
      callback?: BodyResponseCallback<Schema$Empty>
    ): void | GaxiosPromise<Schema$Empty> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Advertisers$Creatives$Delete;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Advertisers$Creatives$Delete;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (
              rootUrl +
              '/v1/advertisers/{+advertiserId}/creatives/{+creativeId}'
            ).replace(/([^:]\/)\/+/g, '$1'),
            method: 'DELETE',
          },
          options
        ),
        params,
        requiredParams: ['advertiserId', 'creativeId'],
        pathParams: ['advertiserId', 'creativeId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Empty>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Empty>(parameters);
      }
    }

    /**
     * displayvideo.advertisers.creatives.get
     * @desc Gets a creative.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.advertisers.creatives.get({
     *     // Required. The ID of the advertiser this creative belongs to.
     *     advertiserId: '[^/]+',
     *     // Required. The ID of the creative to fetch.
     *     creativeId: '[^/]+',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "additionalDimensions": [],
     *   //   "advertiserId": "my_advertiserId",
     *   //   "appendedTag": "my_appendedTag",
     *   //   "assets": [],
     *   //   "cmPlacementId": "my_cmPlacementId",
     *   //   "cmTrackingAd": {},
     *   //   "companionCreativeIds": [],
     *   //   "counterEvents": [],
     *   //   "createTime": "my_createTime",
     *   //   "creativeAttributes": [],
     *   //   "creativeId": "my_creativeId",
     *   //   "creativeType": "my_creativeType",
     *   //   "dimensions": {},
     *   //   "displayName": "my_displayName",
     *   //   "dynamic": false,
     *   //   "entityStatus": "my_entityStatus",
     *   //   "exitEvents": [],
     *   //   "expandOnHover": false,
     *   //   "expandingDirection": "my_expandingDirection",
     *   //   "hostingSource": "my_hostingSource",
     *   //   "html5Video": false,
     *   //   "iasCampaignMonitoring": false,
     *   //   "integrationCode": "my_integrationCode",
     *   //   "jsTrackerUrl": "my_jsTrackerUrl",
     *   //   "mediaDuration": "my_mediaDuration",
     *   //   "name": "my_name",
     *   //   "notes": "my_notes",
     *   //   "obaIcon": {},
     *   //   "progressOffset": {},
     *   //   "requireHtml5": false,
     *   //   "requireMraid": false,
     *   //   "requirePingForAttribution": false,
     *   //   "reviewStatus": {},
     *   //   "skipOffset": {},
     *   //   "skippable": false,
     *   //   "thirdPartyTag": "my_thirdPartyTag",
     *   //   "thirdPartyUrls": [],
     *   //   "timerEvents": [],
     *   //   "trackerUrls": [],
     *   //   "transcodes": [],
     *   //   "universalAdId": {},
     *   //   "updateTime": "my_updateTime",
     *   //   "vastTagUrl": "my_vastTagUrl",
     *   //   "vpaid": false
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.advertisers.creatives.get
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.advertiserId Required. The ID of the advertiser this creative belongs to.
     * @param {string} params.creativeId Required. The ID of the creative to fetch.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    get(
      params?: Params$Resource$Advertisers$Creatives$Get,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Creative>;
    get(
      params: Params$Resource$Advertisers$Creatives$Get,
      options: MethodOptions | BodyResponseCallback<Schema$Creative>,
      callback: BodyResponseCallback<Schema$Creative>
    ): void;
    get(
      params: Params$Resource$Advertisers$Creatives$Get,
      callback: BodyResponseCallback<Schema$Creative>
    ): void;
    get(callback: BodyResponseCallback<Schema$Creative>): void;
    get(
      paramsOrCallback?:
        | Params$Resource$Advertisers$Creatives$Get
        | BodyResponseCallback<Schema$Creative>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$Creative>,
      callback?: BodyResponseCallback<Schema$Creative>
    ): void | GaxiosPromise<Schema$Creative> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Advertisers$Creatives$Get;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Advertisers$Creatives$Get;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (
              rootUrl +
              '/v1/advertisers/{+advertiserId}/creatives/{+creativeId}'
            ).replace(/([^:]\/)\/+/g, '$1'),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: ['advertiserId', 'creativeId'],
        pathParams: ['advertiserId', 'creativeId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Creative>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Creative>(parameters);
      }
    }

    /**
     * displayvideo.advertisers.creatives.list
     * @desc Lists creatives in an advertiser.  The order is defined by the order_by parameter. If a filter by entity_status is not specified, creatives with `ENTITY_STATUS_ARCHIVED` will not be included in the results.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.advertisers.creatives.list({
     *     // Required. The ID of the advertiser to list creatives for.
     *     advertiserId: '[^/]+',
     *     // Allows filtering by creative properties.
     *     //
     *     // Supported syntax:
     *     //
     *     // * Filter expressions are made up of one or more restrictions.
     *     // * Restriction for the same field must be combined by `OR`.
     *     // * Restriction for different fields must be combined by `AND`.
     *     // * Between `(` and `)` there can only be restrictions combined by `OR`
     *     // for the same field.
     *     // * A restriction has the form of `{field} {operator} {value}`.
     *     // * The operator must be `EQUALS (=)`.
     *     // * Supported fields:
     *     //     - `entityStatus`
     *     //     - `creativeType`.
     *     //     - `dimensions`
     *     //     - `minDuration`
     *     //     - `maxDuration`
     *     //     - `approvalStatus`
     *     //     - `exchangeReviewStatus`
     *     //     - `dynamic`
     *     // * For `entityStatus`, `minDuration`, `maxDuration`, and `dynamic` there may
     *     // be at most one restriction.
     *     // * For `dimensions`, the value is in the form of `"{width}x{height}"`.
     *     // * For `exchangeReviewStatus`, the value is in the form of
     *     // `{exchange}-{reviewStatus}`.
     *     // * For `minDuration` and `maxDuration`, the value is in the form of
     *     // `"{duration}s"`. Only seconds are supported with millisecond granularity.
     *     //
     *     // Examples:
     *     //
     *     // * All native creatives: `creativeType="CREATIVE_TYPE_NATIVE"`
     *     // * All active creatives with 300x400 or 50x100 dimensions:
     *     // `entityStatus="ENTITY_STATUS_ACTIVE" AND (dimensions="300x400"
     *     // OR dimensions="50x100")`
     *     // * All dynamic creatives that are approved by AdX or
     *     // AppNexus, with a minimum duration of 5 seconds and 200ms.
     *     // `dynamic="true" AND minDuration="5.2s" AND
     *     // (exchangeReviewStatus="EXCHANGE_GOOGLE_AD_MANAGER-REVIEW_STATUS_APPROVED"
     *     // OR exchangeReviewStatus="EXCHANGE_APPNEXUS-REVIEW_STATUS_APPROVED")`
     *     //
     *     // The length of this field should be no more than 500 characters.
     *     filter: 'placeholder-value',
     *     // Field by which to sort the list.
     *     // Acceptable values are:
     *     //
     *     // * `creativeId` (default)
     *     // * `createTime`
     *     // * `mediaDuration`
     *     // * `dimensions` (sorts by width first, then by height)
     *     //
     *     // The default sorting order is ascending. To specify descending order for
     *     // a field, a suffix "desc" should be added to the field name.
     *     // Example: `createTime desc`.
     *     orderBy: 'placeholder-value',
     *     // Requested page size. Must be between `1` and `100`. If unspecified will
     *     // default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value
     *     // is specified.
     *     pageSize: 'placeholder-value',
     *     // A token identifying a page of results the server should return.
     *     // Typically, this is the value of
     *     // next_page_token
     *     // returned from the previous call to `ListCreatives` method.
     *     // If not specified, the first page of results will be returned.
     *     pageToken: 'placeholder-value',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "creatives": [],
     *   //   "nextPageToken": "my_nextPageToken"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.advertisers.creatives.list
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.advertiserId Required. The ID of the advertiser to list creatives for.
     * @param {string=} params.filter Allows filtering by creative properties.  Supported syntax:  * Filter expressions are made up of one or more restrictions. * Restriction for the same field must be combined by `OR`. * Restriction for different fields must be combined by `AND`. * Between `(` and `)` there can only be restrictions combined by `OR` for the same field. * A restriction has the form of `{field} {operator} {value}`. * The operator must be `EQUALS (=)`. * Supported fields:     - `entityStatus`     - `creativeType`.     - `dimensions`     - `minDuration`     - `maxDuration`     - `approvalStatus`     - `exchangeReviewStatus`     - `dynamic` * For `entityStatus`, `minDuration`, `maxDuration`, and `dynamic` there may be at most one restriction. * For `dimensions`, the value is in the form of `"{width}x{height}"`. * For `exchangeReviewStatus`, the value is in the form of `{exchange}-{reviewStatus}`. * For `minDuration` and `maxDuration`, the value is in the form of `"{duration}s"`. Only seconds are supported with millisecond granularity.  Examples:  * All native creatives: `creativeType="CREATIVE_TYPE_NATIVE"` * All active creatives with 300x400 or 50x100 dimensions: `entityStatus="ENTITY_STATUS_ACTIVE" AND (dimensions="300x400" OR dimensions="50x100")` * All dynamic creatives that are approved by AdX or AppNexus, with a minimum duration of 5 seconds and 200ms. `dynamic="true" AND minDuration="5.2s" AND (exchangeReviewStatus="EXCHANGE_GOOGLE_AD_MANAGER-REVIEW_STATUS_APPROVED" OR exchangeReviewStatus="EXCHANGE_APPNEXUS-REVIEW_STATUS_APPROVED")`  The length of this field should be no more than 500 characters.
     * @param {string=} params.orderBy Field by which to sort the list. Acceptable values are:  * `creativeId` (default) * `createTime` * `mediaDuration` * `dimensions` (sorts by width first, then by height)  The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `createTime desc`.
     * @param {integer=} params.pageSize Requested page size. Must be between `1` and `100`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified.
     * @param {string=} params.pageToken A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListCreatives` method. If not specified, the first page of results will be returned.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    list(
      params?: Params$Resource$Advertisers$Creatives$List,
      options?: MethodOptions
    ): GaxiosPromise<Schema$ListCreativesResponse>;
    list(
      params: Params$Resource$Advertisers$Creatives$List,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$ListCreativesResponse>,
      callback: BodyResponseCallback<Schema$ListCreativesResponse>
    ): void;
    list(
      params: Params$Resource$Advertisers$Creatives$List,
      callback: BodyResponseCallback<Schema$ListCreativesResponse>
    ): void;
    list(callback: BodyResponseCallback<Schema$ListCreativesResponse>): void;
    list(
      paramsOrCallback?:
        | Params$Resource$Advertisers$Creatives$List
        | BodyResponseCallback<Schema$ListCreativesResponse>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$ListCreativesResponse>,
      callback?: BodyResponseCallback<Schema$ListCreativesResponse>
    ): void | GaxiosPromise<Schema$ListCreativesResponse> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Advertisers$Creatives$List;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Advertisers$Creatives$List;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (
              rootUrl + '/v1/advertisers/{+advertiserId}/creatives'
            ).replace(/([^:]\/)\/+/g, '$1'),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: ['advertiserId'],
        pathParams: ['advertiserId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$ListCreativesResponse>(parameters, callback);
      } else {
        return createAPIRequest<Schema$ListCreativesResponse>(parameters);
      }
    }

    /**
     * displayvideo.advertisers.creatives.patch
     * @desc Updates an existing creative. Returns the updated creative if successful.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.advertisers.creatives.patch({
     *     // Output only. The unique ID of the advertiser the creative belongs to.
     *     advertiserId: '[^/]+',
     *     // Output only. The unique ID of the creative. Assigned by the system.
     *     creativeId: '[^/]+',
     *     // Required. The mask to control which fields to update.
     *     updateMask: 'placeholder-value',
     *
     *     // Request body metadata
     *     requestBody: {
     *       // request body parameters
     *       // {
     *       //   "additionalDimensions": [],
     *       //   "advertiserId": "my_advertiserId",
     *       //   "appendedTag": "my_appendedTag",
     *       //   "assets": [],
     *       //   "cmPlacementId": "my_cmPlacementId",
     *       //   "cmTrackingAd": {},
     *       //   "companionCreativeIds": [],
     *       //   "counterEvents": [],
     *       //   "createTime": "my_createTime",
     *       //   "creativeAttributes": [],
     *       //   "creativeId": "my_creativeId",
     *       //   "creativeType": "my_creativeType",
     *       //   "dimensions": {},
     *       //   "displayName": "my_displayName",
     *       //   "dynamic": false,
     *       //   "entityStatus": "my_entityStatus",
     *       //   "exitEvents": [],
     *       //   "expandOnHover": false,
     *       //   "expandingDirection": "my_expandingDirection",
     *       //   "hostingSource": "my_hostingSource",
     *       //   "html5Video": false,
     *       //   "iasCampaignMonitoring": false,
     *       //   "integrationCode": "my_integrationCode",
     *       //   "jsTrackerUrl": "my_jsTrackerUrl",
     *       //   "mediaDuration": "my_mediaDuration",
     *       //   "name": "my_name",
     *       //   "notes": "my_notes",
     *       //   "obaIcon": {},
     *       //   "progressOffset": {},
     *       //   "requireHtml5": false,
     *       //   "requireMraid": false,
     *       //   "requirePingForAttribution": false,
     *       //   "reviewStatus": {},
     *       //   "skipOffset": {},
     *       //   "skippable": false,
     *       //   "thirdPartyTag": "my_thirdPartyTag",
     *       //   "thirdPartyUrls": [],
     *       //   "timerEvents": [],
     *       //   "trackerUrls": [],
     *       //   "transcodes": [],
     *       //   "universalAdId": {},
     *       //   "updateTime": "my_updateTime",
     *       //   "vastTagUrl": "my_vastTagUrl",
     *       //   "vpaid": false
     *       // }
     *     },
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "additionalDimensions": [],
     *   //   "advertiserId": "my_advertiserId",
     *   //   "appendedTag": "my_appendedTag",
     *   //   "assets": [],
     *   //   "cmPlacementId": "my_cmPlacementId",
     *   //   "cmTrackingAd": {},
     *   //   "companionCreativeIds": [],
     *   //   "counterEvents": [],
     *   //   "createTime": "my_createTime",
     *   //   "creativeAttributes": [],
     *   //   "creativeId": "my_creativeId",
     *   //   "creativeType": "my_creativeType",
     *   //   "dimensions": {},
     *   //   "displayName": "my_displayName",
     *   //   "dynamic": false,
     *   //   "entityStatus": "my_entityStatus",
     *   //   "exitEvents": [],
     *   //   "expandOnHover": false,
     *   //   "expandingDirection": "my_expandingDirection",
     *   //   "hostingSource": "my_hostingSource",
     *   //   "html5Video": false,
     *   //   "iasCampaignMonitoring": false,
     *   //   "integrationCode": "my_integrationCode",
     *   //   "jsTrackerUrl": "my_jsTrackerUrl",
     *   //   "mediaDuration": "my_mediaDuration",
     *   //   "name": "my_name",
     *   //   "notes": "my_notes",
     *   //   "obaIcon": {},
     *   //   "progressOffset": {},
     *   //   "requireHtml5": false,
     *   //   "requireMraid": false,
     *   //   "requirePingForAttribution": false,
     *   //   "reviewStatus": {},
     *   //   "skipOffset": {},
     *   //   "skippable": false,
     *   //   "thirdPartyTag": "my_thirdPartyTag",
     *   //   "thirdPartyUrls": [],
     *   //   "timerEvents": [],
     *   //   "trackerUrls": [],
     *   //   "transcodes": [],
     *   //   "universalAdId": {},
     *   //   "updateTime": "my_updateTime",
     *   //   "vastTagUrl": "my_vastTagUrl",
     *   //   "vpaid": false
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.advertisers.creatives.patch
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.advertiserId Output only. The unique ID of the advertiser the creative belongs to.
     * @param {string} params.creativeId Output only. The unique ID of the creative. Assigned by the system.
     * @param {string=} params.updateMask Required. The mask to control which fields to update.
     * @param {().Creative} params.requestBody Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    patch(
      params?: Params$Resource$Advertisers$Creatives$Patch,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Creative>;
    patch(
      params: Params$Resource$Advertisers$Creatives$Patch,
      options: MethodOptions | BodyResponseCallback<Schema$Creative>,
      callback: BodyResponseCallback<Schema$Creative>
    ): void;
    patch(
      params: Params$Resource$Advertisers$Creatives$Patch,
      callback: BodyResponseCallback<Schema$Creative>
    ): void;
    patch(callback: BodyResponseCallback<Schema$Creative>): void;
    patch(
      paramsOrCallback?:
        | Params$Resource$Advertisers$Creatives$Patch
        | BodyResponseCallback<Schema$Creative>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$Creative>,
      callback?: BodyResponseCallback<Schema$Creative>
    ): void | GaxiosPromise<Schema$Creative> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Advertisers$Creatives$Patch;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Advertisers$Creatives$Patch;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (
              rootUrl +
              '/v1/advertisers/{+advertiserId}/creatives/{+creativeId}'
            ).replace(/([^:]\/)\/+/g, '$1'),
            method: 'PATCH',
          },
          options
        ),
        params,
        requiredParams: ['advertiserId', 'creativeId'],
        pathParams: ['advertiserId', 'creativeId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Creative>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Creative>(parameters);
      }
    }
  }

  export interface Params$Resource$Advertisers$Creatives$Create
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Output only. The unique ID of the advertiser the creative belongs to.
     */
    advertiserId?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$Creative;
  }
  export interface Params$Resource$Advertisers$Creatives$Delete
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * The ID of the advertiser this creative belongs to.
     */
    advertiserId?: string;
    /**
     * The ID of the creative to be deleted.
     */
    creativeId?: string;
  }
  export interface Params$Resource$Advertisers$Creatives$Get
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required. The ID of the advertiser this creative belongs to.
     */
    advertiserId?: string;
    /**
     * Required. The ID of the creative to fetch.
     */
    creativeId?: string;
  }
  export interface Params$Resource$Advertisers$Creatives$List
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required. The ID of the advertiser to list creatives for.
     */
    advertiserId?: string;
    /**
     * Allows filtering by creative properties.  Supported syntax:  * Filter expressions are made up of one or more restrictions. * Restriction for the same field must be combined by `OR`. * Restriction for different fields must be combined by `AND`. * Between `(` and `)` there can only be restrictions combined by `OR` for the same field. * A restriction has the form of `{field} {operator} {value}`. * The operator must be `EQUALS (=)`. * Supported fields:     - `entityStatus`     - `creativeType`.     - `dimensions`     - `minDuration`     - `maxDuration`     - `approvalStatus`     - `exchangeReviewStatus`     - `dynamic` * For `entityStatus`, `minDuration`, `maxDuration`, and `dynamic` there may be at most one restriction. * For `dimensions`, the value is in the form of `"{width}x{height}"`. * For `exchangeReviewStatus`, the value is in the form of `{exchange}-{reviewStatus}`. * For `minDuration` and `maxDuration`, the value is in the form of `"{duration}s"`. Only seconds are supported with millisecond granularity.  Examples:  * All native creatives: `creativeType="CREATIVE_TYPE_NATIVE"` * All active creatives with 300x400 or 50x100 dimensions: `entityStatus="ENTITY_STATUS_ACTIVE" AND (dimensions="300x400" OR dimensions="50x100")` * All dynamic creatives that are approved by AdX or AppNexus, with a minimum duration of 5 seconds and 200ms. `dynamic="true" AND minDuration="5.2s" AND (exchangeReviewStatus="EXCHANGE_GOOGLE_AD_MANAGER-REVIEW_STATUS_APPROVED" OR exchangeReviewStatus="EXCHANGE_APPNEXUS-REVIEW_STATUS_APPROVED")`  The length of this field should be no more than 500 characters.
     */
    filter?: string;
    /**
     * Field by which to sort the list. Acceptable values are:  * `creativeId` (default) * `createTime` * `mediaDuration` * `dimensions` (sorts by width first, then by height)  The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `createTime desc`.
     */
    orderBy?: string;
    /**
     * Requested page size. Must be between `1` and `100`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified.
     */
    pageSize?: number;
    /**
     * A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListCreatives` method. If not specified, the first page of results will be returned.
     */
    pageToken?: string;
  }
  export interface Params$Resource$Advertisers$Creatives$Patch
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Output only. The unique ID of the advertiser the creative belongs to.
     */
    advertiserId?: string;
    /**
     * Output only. The unique ID of the creative. Assigned by the system.
     */
    creativeId?: string;
    /**
     * Required. The mask to control which fields to update.
     */
    updateMask?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$Creative;
  }

  export class Resource$Advertisers$Insertionorders {
    context: APIRequestContext;
    constructor(context: APIRequestContext) {
      this.context = context;
    }

    /**
     * displayvideo.advertisers.insertionOrders.create
     * @desc Creates a new insertion order. Returns the newly created insertion order if successful.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.advertisers.insertionOrders.create({
     *     // Output only. The unique ID of the advertiser the insertion order belongs to.
     *     advertiserId: '[^/]+',
     *
     *     // Request body metadata
     *     requestBody: {
     *       // request body parameters
     *       // {
     *       //   "advertiserId": "my_advertiserId",
     *       //   "bidStrategy": {},
     *       //   "budget": {},
     *       //   "campaignId": "my_campaignId",
     *       //   "displayName": "my_displayName",
     *       //   "entityStatus": "my_entityStatus",
     *       //   "frequencyCap": {},
     *       //   "insertionOrderId": "my_insertionOrderId",
     *       //   "integrationDetails": {},
     *       //   "name": "my_name",
     *       //   "pacing": {},
     *       //   "partnerCosts": [],
     *       //   "performanceGoal": {},
     *       //   "updateTime": "my_updateTime"
     *       // }
     *     },
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "advertiserId": "my_advertiserId",
     *   //   "bidStrategy": {},
     *   //   "budget": {},
     *   //   "campaignId": "my_campaignId",
     *   //   "displayName": "my_displayName",
     *   //   "entityStatus": "my_entityStatus",
     *   //   "frequencyCap": {},
     *   //   "insertionOrderId": "my_insertionOrderId",
     *   //   "integrationDetails": {},
     *   //   "name": "my_name",
     *   //   "pacing": {},
     *   //   "partnerCosts": [],
     *   //   "performanceGoal": {},
     *   //   "updateTime": "my_updateTime"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.advertisers.insertionOrders.create
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.advertiserId Output only. The unique ID of the advertiser the insertion order belongs to.
     * @param {().InsertionOrder} params.requestBody Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    create(
      params?: Params$Resource$Advertisers$Insertionorders$Create,
      options?: MethodOptions
    ): GaxiosPromise<Schema$InsertionOrder>;
    create(
      params: Params$Resource$Advertisers$Insertionorders$Create,
      options: MethodOptions | BodyResponseCallback<Schema$InsertionOrder>,
      callback: BodyResponseCallback<Schema$InsertionOrder>
    ): void;
    create(
      params: Params$Resource$Advertisers$Insertionorders$Create,
      callback: BodyResponseCallback<Schema$InsertionOrder>
    ): void;
    create(callback: BodyResponseCallback<Schema$InsertionOrder>): void;
    create(
      paramsOrCallback?:
        | Params$Resource$Advertisers$Insertionorders$Create
        | BodyResponseCallback<Schema$InsertionOrder>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$InsertionOrder>,
      callback?: BodyResponseCallback<Schema$InsertionOrder>
    ): void | GaxiosPromise<Schema$InsertionOrder> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Advertisers$Insertionorders$Create;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Advertisers$Insertionorders$Create;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (
              rootUrl + '/v1/advertisers/{+advertiserId}/insertionOrders'
            ).replace(/([^:]\/)\/+/g, '$1'),
            method: 'POST',
          },
          options
        ),
        params,
        requiredParams: ['advertiserId'],
        pathParams: ['advertiserId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$InsertionOrder>(parameters, callback);
      } else {
        return createAPIRequest<Schema$InsertionOrder>(parameters);
      }
    }

    /**
     * displayvideo.advertisers.insertionOrders.delete
     * @desc Deletes an insertion order. Returns error code `NOT_FOUND` if the insertion order does not exist. The insertion order should be archived first, i.e. set entity_status to `ENTITY_STATUS_ARCHIVED`, to be able to delete it.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.advertisers.insertionOrders.delete({
     *     // The ID of the advertiser this insertion order belongs to.
     *     advertiserId: '[^/]+',
     *     // The ID of the insertion order we need to delete.
     *     insertionOrderId: '[^/]+',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {}
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.advertisers.insertionOrders.delete
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.advertiserId The ID of the advertiser this insertion order belongs to.
     * @param {string} params.insertionOrderId The ID of the insertion order we need to delete.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    delete(
      params?: Params$Resource$Advertisers$Insertionorders$Delete,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Empty>;
    delete(
      params: Params$Resource$Advertisers$Insertionorders$Delete,
      options: MethodOptions | BodyResponseCallback<Schema$Empty>,
      callback: BodyResponseCallback<Schema$Empty>
    ): void;
    delete(
      params: Params$Resource$Advertisers$Insertionorders$Delete,
      callback: BodyResponseCallback<Schema$Empty>
    ): void;
    delete(callback: BodyResponseCallback<Schema$Empty>): void;
    delete(
      paramsOrCallback?:
        | Params$Resource$Advertisers$Insertionorders$Delete
        | BodyResponseCallback<Schema$Empty>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$Empty>,
      callback?: BodyResponseCallback<Schema$Empty>
    ): void | GaxiosPromise<Schema$Empty> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Advertisers$Insertionorders$Delete;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Advertisers$Insertionorders$Delete;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (
              rootUrl +
              '/v1/advertisers/{+advertiserId}/insertionOrders/{+insertionOrderId}'
            ).replace(/([^:]\/)\/+/g, '$1'),
            method: 'DELETE',
          },
          options
        ),
        params,
        requiredParams: ['advertiserId', 'insertionOrderId'],
        pathParams: ['advertiserId', 'insertionOrderId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Empty>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Empty>(parameters);
      }
    }

    /**
     * displayvideo.advertisers.insertionOrders.get
     * @desc Gets an insertion order. Returns error code `NOT_FOUND` if the insertion order does not exist.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.advertisers.insertionOrders.get({
     *     // Required. The ID of the advertiser this insertion order belongs to.
     *     advertiserId: '[^/]+',
     *     // Required. The ID of the insertion order to fetch.
     *     insertionOrderId: '[^/]+',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "advertiserId": "my_advertiserId",
     *   //   "bidStrategy": {},
     *   //   "budget": {},
     *   //   "campaignId": "my_campaignId",
     *   //   "displayName": "my_displayName",
     *   //   "entityStatus": "my_entityStatus",
     *   //   "frequencyCap": {},
     *   //   "insertionOrderId": "my_insertionOrderId",
     *   //   "integrationDetails": {},
     *   //   "name": "my_name",
     *   //   "pacing": {},
     *   //   "partnerCosts": [],
     *   //   "performanceGoal": {},
     *   //   "updateTime": "my_updateTime"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.advertisers.insertionOrders.get
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.advertiserId Required. The ID of the advertiser this insertion order belongs to.
     * @param {string} params.insertionOrderId Required. The ID of the insertion order to fetch.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    get(
      params?: Params$Resource$Advertisers$Insertionorders$Get,
      options?: MethodOptions
    ): GaxiosPromise<Schema$InsertionOrder>;
    get(
      params: Params$Resource$Advertisers$Insertionorders$Get,
      options: MethodOptions | BodyResponseCallback<Schema$InsertionOrder>,
      callback: BodyResponseCallback<Schema$InsertionOrder>
    ): void;
    get(
      params: Params$Resource$Advertisers$Insertionorders$Get,
      callback: BodyResponseCallback<Schema$InsertionOrder>
    ): void;
    get(callback: BodyResponseCallback<Schema$InsertionOrder>): void;
    get(
      paramsOrCallback?:
        | Params$Resource$Advertisers$Insertionorders$Get
        | BodyResponseCallback<Schema$InsertionOrder>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$InsertionOrder>,
      callback?: BodyResponseCallback<Schema$InsertionOrder>
    ): void | GaxiosPromise<Schema$InsertionOrder> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Advertisers$Insertionorders$Get;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Advertisers$Insertionorders$Get;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (
              rootUrl +
              '/v1/advertisers/{+advertiserId}/insertionOrders/{+insertionOrderId}'
            ).replace(/([^:]\/)\/+/g, '$1'),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: ['advertiserId', 'insertionOrderId'],
        pathParams: ['advertiserId', 'insertionOrderId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$InsertionOrder>(parameters, callback);
      } else {
        return createAPIRequest<Schema$InsertionOrder>(parameters);
      }
    }

    /**
     * displayvideo.advertisers.insertionOrders.list
     * @desc Lists insertion orders in an advertiser.  The order is defined by the order_by parameter. If a filter by entity_status is not specified, insertion orders with `ENTITY_STATUS_ARCHIVED` will not be included in the results.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.advertisers.insertionOrders.list({
     *     // Required. The ID of the advertiser to list insertion orders for.
     *     advertiserId: '[^/]+',
     *     // Allows filtering by insertion order properties.
     *     //
     *     // Supported syntax:
     *     //
     *     // * Filter expressions are made up of one or more restrictions.
     *     // * Restrictions can be combined by `AND` or `OR` logical operators. A
     *     // sequence of restrictions implicitly uses `AND`.
     *     // * A restriction has the form of `{field} {operator} {value}`.
     *     // * The operator must be `EQUALS (=)`.
     *     // * Supported fields:
     *     //     - `campaignId`
     *     //     - `entityStatus`
     *     //
     *     // Examples:
     *     //
     *     // * All insertion orders under a campaign: `campaignId="1234"`
     *     // * All `ENTITY_STATUS_ACTIVE` or `ENTITY_STATUS_PAUSED` insertion orders
     *     // under an advertiser:
     *     // `(entityStatus="ENTITY_STATUS_ACTIVE" OR
     *     // entityStatus="ENTITY_STATUS_PAUSED")`
     *     //
     *     // The length of this field should be no more than 500 characters.
     *     filter: 'placeholder-value',
     *     // Field by which to sort the list.
     *     // Acceptable values are:
     *     //
     *     // * "displayName" (default)
     *     // * "entityStatus"
     *     //
     *     // The default sorting order is ascending. To specify descending order for
     *     // a field, a suffix "desc" should be added to the field name. Example:
     *     // `displayName desc`.
     *     orderBy: 'placeholder-value',
     *     // Requested page size. Must be between `1` and `100`. If unspecified will
     *     // default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value
     *     // is specified.
     *     pageSize: 'placeholder-value',
     *     // A token identifying a page of results the server should return.
     *     // Typically, this is the value of
     *     // next_page_token returned
     *     // from the previous call to `ListInsertionOrders` method. If not specified,
     *     // the first page of results will be returned.
     *     pageToken: 'placeholder-value',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "insertionOrders": [],
     *   //   "nextPageToken": "my_nextPageToken"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.advertisers.insertionOrders.list
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.advertiserId Required. The ID of the advertiser to list insertion orders for.
     * @param {string=} params.filter Allows filtering by insertion order properties.  Supported syntax:  * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` or `OR` logical operators. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * The operator must be `EQUALS (=)`. * Supported fields:     - `campaignId`     - `entityStatus`  Examples:  * All insertion orders under a campaign: `campaignId="1234"` * All `ENTITY_STATUS_ACTIVE` or `ENTITY_STATUS_PAUSED` insertion orders under an advertiser: `(entityStatus="ENTITY_STATUS_ACTIVE" OR entityStatus="ENTITY_STATUS_PAUSED")`  The length of this field should be no more than 500 characters.
     * @param {string=} params.orderBy Field by which to sort the list. Acceptable values are:  * "displayName" (default) * "entityStatus"  The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `displayName desc`.
     * @param {integer=} params.pageSize Requested page size. Must be between `1` and `100`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified.
     * @param {string=} params.pageToken A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListInsertionOrders` method. If not specified, the first page of results will be returned.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    list(
      params?: Params$Resource$Advertisers$Insertionorders$List,
      options?: MethodOptions
    ): GaxiosPromise<Schema$ListInsertionOrdersResponse>;
    list(
      params: Params$Resource$Advertisers$Insertionorders$List,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$ListInsertionOrdersResponse>,
      callback: BodyResponseCallback<Schema$ListInsertionOrdersResponse>
    ): void;
    list(
      params: Params$Resource$Advertisers$Insertionorders$List,
      callback: BodyResponseCallback<Schema$ListInsertionOrdersResponse>
    ): void;
    list(
      callback: BodyResponseCallback<Schema$ListInsertionOrdersResponse>
    ): void;
    list(
      paramsOrCallback?:
        | Params$Resource$Advertisers$Insertionorders$List
        | BodyResponseCallback<Schema$ListInsertionOrdersResponse>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$ListInsertionOrdersResponse>,
      callback?: BodyResponseCallback<Schema$ListInsertionOrdersResponse>
    ): void | GaxiosPromise<Schema$ListInsertionOrdersResponse> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Advertisers$Insertionorders$List;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Advertisers$Insertionorders$List;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (
              rootUrl + '/v1/advertisers/{+advertiserId}/insertionOrders'
            ).replace(/([^:]\/)\/+/g, '$1'),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: ['advertiserId'],
        pathParams: ['advertiserId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$ListInsertionOrdersResponse>(
          parameters,
          callback
        );
      } else {
        return createAPIRequest<Schema$ListInsertionOrdersResponse>(parameters);
      }
    }

    /**
     * displayvideo.advertisers.insertionOrders.patch
     * @desc Updates an existing insertion order. Returns the updated insertion order if successful.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.advertisers.insertionOrders.patch({
     *     // Output only. The unique ID of the advertiser the insertion order belongs to.
     *     advertiserId: '[^/]+',
     *     // Output only. The unique ID of the insertion order. Assigned by the system.
     *     insertionOrderId: '[^/]+',
     *     // Required. The mask to control which fields to update.
     *     updateMask: 'placeholder-value',
     *
     *     // Request body metadata
     *     requestBody: {
     *       // request body parameters
     *       // {
     *       //   "advertiserId": "my_advertiserId",
     *       //   "bidStrategy": {},
     *       //   "budget": {},
     *       //   "campaignId": "my_campaignId",
     *       //   "displayName": "my_displayName",
     *       //   "entityStatus": "my_entityStatus",
     *       //   "frequencyCap": {},
     *       //   "insertionOrderId": "my_insertionOrderId",
     *       //   "integrationDetails": {},
     *       //   "name": "my_name",
     *       //   "pacing": {},
     *       //   "partnerCosts": [],
     *       //   "performanceGoal": {},
     *       //   "updateTime": "my_updateTime"
     *       // }
     *     },
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "advertiserId": "my_advertiserId",
     *   //   "bidStrategy": {},
     *   //   "budget": {},
     *   //   "campaignId": "my_campaignId",
     *   //   "displayName": "my_displayName",
     *   //   "entityStatus": "my_entityStatus",
     *   //   "frequencyCap": {},
     *   //   "insertionOrderId": "my_insertionOrderId",
     *   //   "integrationDetails": {},
     *   //   "name": "my_name",
     *   //   "pacing": {},
     *   //   "partnerCosts": [],
     *   //   "performanceGoal": {},
     *   //   "updateTime": "my_updateTime"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.advertisers.insertionOrders.patch
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.advertiserId Output only. The unique ID of the advertiser the insertion order belongs to.
     * @param {string} params.insertionOrderId Output only. The unique ID of the insertion order. Assigned by the system.
     * @param {string=} params.updateMask Required. The mask to control which fields to update.
     * @param {().InsertionOrder} params.requestBody Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    patch(
      params?: Params$Resource$Advertisers$Insertionorders$Patch,
      options?: MethodOptions
    ): GaxiosPromise<Schema$InsertionOrder>;
    patch(
      params: Params$Resource$Advertisers$Insertionorders$Patch,
      options: MethodOptions | BodyResponseCallback<Schema$InsertionOrder>,
      callback: BodyResponseCallback<Schema$InsertionOrder>
    ): void;
    patch(
      params: Params$Resource$Advertisers$Insertionorders$Patch,
      callback: BodyResponseCallback<Schema$InsertionOrder>
    ): void;
    patch(callback: BodyResponseCallback<Schema$InsertionOrder>): void;
    patch(
      paramsOrCallback?:
        | Params$Resource$Advertisers$Insertionorders$Patch
        | BodyResponseCallback<Schema$InsertionOrder>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$InsertionOrder>,
      callback?: BodyResponseCallback<Schema$InsertionOrder>
    ): void | GaxiosPromise<Schema$InsertionOrder> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Advertisers$Insertionorders$Patch;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Advertisers$Insertionorders$Patch;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (
              rootUrl +
              '/v1/advertisers/{+advertiserId}/insertionOrders/{+insertionOrderId}'
            ).replace(/([^:]\/)\/+/g, '$1'),
            method: 'PATCH',
          },
          options
        ),
        params,
        requiredParams: ['advertiserId', 'insertionOrderId'],
        pathParams: ['advertiserId', 'insertionOrderId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$InsertionOrder>(parameters, callback);
      } else {
        return createAPIRequest<Schema$InsertionOrder>(parameters);
      }
    }
  }

  export interface Params$Resource$Advertisers$Insertionorders$Create
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Output only. The unique ID of the advertiser the insertion order belongs to.
     */
    advertiserId?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$InsertionOrder;
  }
  export interface Params$Resource$Advertisers$Insertionorders$Delete
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * The ID of the advertiser this insertion order belongs to.
     */
    advertiserId?: string;
    /**
     * The ID of the insertion order we need to delete.
     */
    insertionOrderId?: string;
  }
  export interface Params$Resource$Advertisers$Insertionorders$Get
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required. The ID of the advertiser this insertion order belongs to.
     */
    advertiserId?: string;
    /**
     * Required. The ID of the insertion order to fetch.
     */
    insertionOrderId?: string;
  }
  export interface Params$Resource$Advertisers$Insertionorders$List
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required. The ID of the advertiser to list insertion orders for.
     */
    advertiserId?: string;
    /**
     * Allows filtering by insertion order properties.  Supported syntax:  * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` or `OR` logical operators. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * The operator must be `EQUALS (=)`. * Supported fields:     - `campaignId`     - `entityStatus`  Examples:  * All insertion orders under a campaign: `campaignId="1234"` * All `ENTITY_STATUS_ACTIVE` or `ENTITY_STATUS_PAUSED` insertion orders under an advertiser: `(entityStatus="ENTITY_STATUS_ACTIVE" OR entityStatus="ENTITY_STATUS_PAUSED")`  The length of this field should be no more than 500 characters.
     */
    filter?: string;
    /**
     * Field by which to sort the list. Acceptable values are:  * "displayName" (default) * "entityStatus"  The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `displayName desc`.
     */
    orderBy?: string;
    /**
     * Requested page size. Must be between `1` and `100`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified.
     */
    pageSize?: number;
    /**
     * A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListInsertionOrders` method. If not specified, the first page of results will be returned.
     */
    pageToken?: string;
  }
  export interface Params$Resource$Advertisers$Insertionorders$Patch
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Output only. The unique ID of the advertiser the insertion order belongs to.
     */
    advertiserId?: string;
    /**
     * Output only. The unique ID of the insertion order. Assigned by the system.
     */
    insertionOrderId?: string;
    /**
     * Required. The mask to control which fields to update.
     */
    updateMask?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$InsertionOrder;
  }

  export class Resource$Advertisers$Lineitems {
    context: APIRequestContext;
    targetingTypes: Resource$Advertisers$Lineitems$Targetingtypes;
    constructor(context: APIRequestContext) {
      this.context = context;
      this.targetingTypes = new Resource$Advertisers$Lineitems$Targetingtypes(
        this.context
      );
    }

    /**
     * displayvideo.advertisers.lineItems.bulkEditLineItemAssignedTargetingOptions
     * @desc Bulk edits targeting options under a single line item. The operation will delete the assigned targeting options provided in BulkEditLineItemAssignedTargetingOptionsRequest.delete_requests and then create the assigned targeting options provided in BulkEditLineItemAssignedTargetingOptionsRequest.create_requests .
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.advertisers.lineItems.bulkEditLineItemAssignedTargetingOptions(
     *     {
     *       // Required. The ID of the advertiser the line item belongs to.
     *       advertiserId: '[^/]+',
     *       // Required. The ID of the line item the assigned targeting option will belong to.
     *       lineItemId: '[^/]+',
     *
     *       // Request body metadata
     *       requestBody: {
     *         // request body parameters
     *         // {
     *         //   "createRequests": [],
     *         //   "deleteRequests": []
     *         // }
     *       },
     *     }
     *   );
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "createdAssignedTargetingOptions": []
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.advertisers.lineItems.bulkEditLineItemAssignedTargetingOptions
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.advertiserId Required. The ID of the advertiser the line item belongs to.
     * @param {string} params.lineItemId Required. The ID of the line item the assigned targeting option will belong to.
     * @param {().BulkEditLineItemAssignedTargetingOptionsRequest} params.requestBody Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    bulkEditLineItemAssignedTargetingOptions(
      params?: Params$Resource$Advertisers$Lineitems$Bulkeditlineitemassignedtargetingoptions,
      options?: MethodOptions
    ): GaxiosPromise<Schema$BulkEditLineItemAssignedTargetingOptionsResponse>;
    bulkEditLineItemAssignedTargetingOptions(
      params: Params$Resource$Advertisers$Lineitems$Bulkeditlineitemassignedtargetingoptions,
      options:
        | MethodOptions
        | BodyResponseCallback<
            Schema$BulkEditLineItemAssignedTargetingOptionsResponse
          >,
      callback: BodyResponseCallback<
        Schema$BulkEditLineItemAssignedTargetingOptionsResponse
      >
    ): void;
    bulkEditLineItemAssignedTargetingOptions(
      params: Params$Resource$Advertisers$Lineitems$Bulkeditlineitemassignedtargetingoptions,
      callback: BodyResponseCallback<
        Schema$BulkEditLineItemAssignedTargetingOptionsResponse
      >
    ): void;
    bulkEditLineItemAssignedTargetingOptions(
      callback: BodyResponseCallback<
        Schema$BulkEditLineItemAssignedTargetingOptionsResponse
      >
    ): void;
    bulkEditLineItemAssignedTargetingOptions(
      paramsOrCallback?:
        | Params$Resource$Advertisers$Lineitems$Bulkeditlineitemassignedtargetingoptions
        | BodyResponseCallback<
            Schema$BulkEditLineItemAssignedTargetingOptionsResponse
          >,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<
            Schema$BulkEditLineItemAssignedTargetingOptionsResponse
          >,
      callback?: BodyResponseCallback<
        Schema$BulkEditLineItemAssignedTargetingOptionsResponse
      >
    ): void | GaxiosPromise<
      Schema$BulkEditLineItemAssignedTargetingOptionsResponse
    > {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Advertisers$Lineitems$Bulkeditlineitemassignedtargetingoptions;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Advertisers$Lineitems$Bulkeditlineitemassignedtargetingoptions;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (
              rootUrl +
              '/v1/advertisers/{+advertiserId}/lineItems/{+lineItemId}:bulkEditLineItemAssignedTargetingOptions'
            ).replace(/([^:]\/)\/+/g, '$1'),
            method: 'POST',
          },
          options
        ),
        params,
        requiredParams: ['advertiserId', 'lineItemId'],
        pathParams: ['advertiserId', 'lineItemId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<
          Schema$BulkEditLineItemAssignedTargetingOptionsResponse
        >(parameters, callback);
      } else {
        return createAPIRequest<
          Schema$BulkEditLineItemAssignedTargetingOptionsResponse
        >(parameters);
      }
    }

    /**
     * displayvideo.advertisers.lineItems.bulkListLineItemAssignedTargetingOptions
     * @desc Lists assigned targeting options of a line item across targeting types.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.advertisers.lineItems.bulkListLineItemAssignedTargetingOptions(
     *     {
     *       // Required. The ID of the advertiser the line item belongs to.
     *       advertiserId: '[^/]+',
     *       // Allows filtering by assigned targeting option properties.
     *       // Supported syntax:
     *       //
     *       // * Filter expressions are made up of one or more restrictions.
     *       // * Restrictions can be combined by the logical operator `OR` on the same
     *       // field.
     *       // * A restriction has the form of `{field} {operator} {value}`.
     *       // * The operator must be `EQUALS (=)`.
     *       // * Supported fields:
     *       //     - `targetingType`
     *       //     - `inheritance`
     *       //
     *       // Examples:
     *       //
     *       // * AssignedTargetingOptions of targeting type
     *       // TARGETING_TYPE_PROXIMITY_LOCATION_LIST or TARGETING_TYPE_CHANNEL
     *       // `targetingType="TARGETING_TYPE_PROXIMITY_LOCATION_LIST" OR
     *       // targetingType="TARGETING_TYPE_CHANNEL"`
     *       // * AssignedTargetingOptions with inheritance status of NOT_INHERITED or
     *       //   INHERITED_FROM_PARTNER
     *       // `inheritance="NOT_INHERITED" OR inheritance="INHERITED_FROM_PARTNER"`
     *       //
     *       // The length of this field should be no more than 500 characters.
     *       filter: 'placeholder-value',
     *       // Required. The ID of the line item to list assigned targeting options for.
     *       lineItemId: '[^/]+',
     *       // Field by which to sort the list.
     *       // Acceptable values are:
     *       //
     *       // * `targetingType` (default)
     *       //
     *       // The default sorting order is ascending. To specify descending order for
     *       // a field, a suffix "desc" should be added to the field name. Example:
     *       // `targetingType desc`.
     *       orderBy: 'placeholder-value',
     *       // Requested page size.
     *       // The size must be an integer between `1` and `5000`. If unspecified,
     *       // the default is '5000'. Returns error code `INVALID_ARGUMENT` if an invalid
     *       // value is specified.
     *       pageSize: 'placeholder-value',
     *       // A token that lets the client fetch the next page of results.
     *       // Typically, this is the value of
     *       // next_page_token
     *       // returned from the previous call to
     *       // `BulkListLineItemAssignedTargetingOptions` method.
     *       // If not specified, the first page of results will be returned.
     *       pageToken: 'placeholder-value',
     *     }
     *   );
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "assignedTargetingOptions": [],
     *   //   "nextPageToken": "my_nextPageToken"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.advertisers.lineItems.bulkListLineItemAssignedTargetingOptions
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.advertiserId Required. The ID of the advertiser the line item belongs to.
     * @param {string=} params.filter Allows filtering by assigned targeting option properties. Supported syntax:  * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by the logical operator `OR` on the same field. * A restriction has the form of `{field} {operator} {value}`. * The operator must be `EQUALS (=)`. * Supported fields:     - `targetingType`     - `inheritance`  Examples:  * AssignedTargetingOptions of targeting type TARGETING_TYPE_PROXIMITY_LOCATION_LIST or TARGETING_TYPE_CHANNEL `targetingType="TARGETING_TYPE_PROXIMITY_LOCATION_LIST" OR targetingType="TARGETING_TYPE_CHANNEL"` * AssignedTargetingOptions with inheritance status of NOT_INHERITED or   INHERITED_FROM_PARTNER `inheritance="NOT_INHERITED" OR inheritance="INHERITED_FROM_PARTNER"`  The length of this field should be no more than 500 characters.
     * @param {string} params.lineItemId Required. The ID of the line item to list assigned targeting options for.
     * @param {string=} params.orderBy Field by which to sort the list. Acceptable values are:  * `targetingType` (default)  The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `targetingType desc`.
     * @param {integer=} params.pageSize Requested page size. The size must be an integer between `1` and `5000`. If unspecified, the default is '5000'. Returns error code `INVALID_ARGUMENT` if an invalid value is specified.
     * @param {string=} params.pageToken A token that lets the client fetch the next page of results. Typically, this is the value of next_page_token returned from the previous call to `BulkListLineItemAssignedTargetingOptions` method. If not specified, the first page of results will be returned.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    bulkListLineItemAssignedTargetingOptions(
      params?: Params$Resource$Advertisers$Lineitems$Bulklistlineitemassignedtargetingoptions,
      options?: MethodOptions
    ): GaxiosPromise<Schema$BulkListLineItemAssignedTargetingOptionsResponse>;
    bulkListLineItemAssignedTargetingOptions(
      params: Params$Resource$Advertisers$Lineitems$Bulklistlineitemassignedtargetingoptions,
      options:
        | MethodOptions
        | BodyResponseCallback<
            Schema$BulkListLineItemAssignedTargetingOptionsResponse
          >,
      callback: BodyResponseCallback<
        Schema$BulkListLineItemAssignedTargetingOptionsResponse
      >
    ): void;
    bulkListLineItemAssignedTargetingOptions(
      params: Params$Resource$Advertisers$Lineitems$Bulklistlineitemassignedtargetingoptions,
      callback: BodyResponseCallback<
        Schema$BulkListLineItemAssignedTargetingOptionsResponse
      >
    ): void;
    bulkListLineItemAssignedTargetingOptions(
      callback: BodyResponseCallback<
        Schema$BulkListLineItemAssignedTargetingOptionsResponse
      >
    ): void;
    bulkListLineItemAssignedTargetingOptions(
      paramsOrCallback?:
        | Params$Resource$Advertisers$Lineitems$Bulklistlineitemassignedtargetingoptions
        | BodyResponseCallback<
            Schema$BulkListLineItemAssignedTargetingOptionsResponse
          >,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<
            Schema$BulkListLineItemAssignedTargetingOptionsResponse
          >,
      callback?: BodyResponseCallback<
        Schema$BulkListLineItemAssignedTargetingOptionsResponse
      >
    ): void | GaxiosPromise<
      Schema$BulkListLineItemAssignedTargetingOptionsResponse
    > {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Advertisers$Lineitems$Bulklistlineitemassignedtargetingoptions;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Advertisers$Lineitems$Bulklistlineitemassignedtargetingoptions;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (
              rootUrl +
              '/v1/advertisers/{+advertiserId}/lineItems/{+lineItemId}:bulkListLineItemAssignedTargetingOptions'
            ).replace(/([^:]\/)\/+/g, '$1'),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: ['advertiserId', 'lineItemId'],
        pathParams: ['advertiserId', 'lineItemId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<
          Schema$BulkListLineItemAssignedTargetingOptionsResponse
        >(parameters, callback);
      } else {
        return createAPIRequest<
          Schema$BulkListLineItemAssignedTargetingOptionsResponse
        >(parameters);
      }
    }

    /**
     * displayvideo.advertisers.lineItems.create
     * @desc Creates a new line item. Returns the newly created line item if successful.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.advertisers.lineItems.create({
     *     // Output only. The unique ID of the advertiser the line item belongs to.
     *     advertiserId: '[^/]+',
     *
     *     // Request body metadata
     *     requestBody: {
     *       // request body parameters
     *       // {
     *       //   "advertiserId": "my_advertiserId",
     *       //   "bidStrategy": {},
     *       //   "budget": {},
     *       //   "campaignId": "my_campaignId",
     *       //   "conversionCounting": {},
     *       //   "creativeIds": [],
     *       //   "displayName": "my_displayName",
     *       //   "entityStatus": "my_entityStatus",
     *       //   "flight": {},
     *       //   "frequencyCap": {},
     *       //   "insertionOrderId": "my_insertionOrderId",
     *       //   "integrationDetails": {},
     *       //   "inventorySourceIds": [],
     *       //   "lineItemId": "my_lineItemId",
     *       //   "lineItemType": "my_lineItemType",
     *       //   "name": "my_name",
     *       //   "pacing": {},
     *       //   "partnerCosts": [],
     *       //   "partnerRevenueModel": {},
     *       //   "updateTime": "my_updateTime"
     *       // }
     *     },
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "advertiserId": "my_advertiserId",
     *   //   "bidStrategy": {},
     *   //   "budget": {},
     *   //   "campaignId": "my_campaignId",
     *   //   "conversionCounting": {},
     *   //   "creativeIds": [],
     *   //   "displayName": "my_displayName",
     *   //   "entityStatus": "my_entityStatus",
     *   //   "flight": {},
     *   //   "frequencyCap": {},
     *   //   "insertionOrderId": "my_insertionOrderId",
     *   //   "integrationDetails": {},
     *   //   "inventorySourceIds": [],
     *   //   "lineItemId": "my_lineItemId",
     *   //   "lineItemType": "my_lineItemType",
     *   //   "name": "my_name",
     *   //   "pacing": {},
     *   //   "partnerCosts": [],
     *   //   "partnerRevenueModel": {},
     *   //   "updateTime": "my_updateTime"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.advertisers.lineItems.create
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.advertiserId Output only. The unique ID of the advertiser the line item belongs to.
     * @param {().LineItem} params.requestBody Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    create(
      params?: Params$Resource$Advertisers$Lineitems$Create,
      options?: MethodOptions
    ): GaxiosPromise<Schema$LineItem>;
    create(
      params: Params$Resource$Advertisers$Lineitems$Create,
      options: MethodOptions | BodyResponseCallback<Schema$LineItem>,
      callback: BodyResponseCallback<Schema$LineItem>
    ): void;
    create(
      params: Params$Resource$Advertisers$Lineitems$Create,
      callback: BodyResponseCallback<Schema$LineItem>
    ): void;
    create(callback: BodyResponseCallback<Schema$LineItem>): void;
    create(
      paramsOrCallback?:
        | Params$Resource$Advertisers$Lineitems$Create
        | BodyResponseCallback<Schema$LineItem>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$LineItem>,
      callback?: BodyResponseCallback<Schema$LineItem>
    ): void | GaxiosPromise<Schema$LineItem> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Advertisers$Lineitems$Create;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Advertisers$Lineitems$Create;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (
              rootUrl + '/v1/advertisers/{+advertiserId}/lineItems'
            ).replace(/([^:]\/)\/+/g, '$1'),
            method: 'POST',
          },
          options
        ),
        params,
        requiredParams: ['advertiserId'],
        pathParams: ['advertiserId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$LineItem>(parameters, callback);
      } else {
        return createAPIRequest<Schema$LineItem>(parameters);
      }
    }

    /**
     * displayvideo.advertisers.lineItems.delete
     * @desc Deletes a line item. Returns error code `NOT_FOUND` if the line item does not exist. The line item should be archived first, i.e. set entity_status to `ENTITY_STATUS_ARCHIVED`, to be able to delete it.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.advertisers.lineItems.delete({
     *     // The ID of the advertiser this line item belongs to.
     *     advertiserId: '[^/]+',
     *     // The ID of the line item we need to fetch.
     *     lineItemId: '[^/]+',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {}
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.advertisers.lineItems.delete
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.advertiserId The ID of the advertiser this line item belongs to.
     * @param {string} params.lineItemId The ID of the line item we need to fetch.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    delete(
      params?: Params$Resource$Advertisers$Lineitems$Delete,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Empty>;
    delete(
      params: Params$Resource$Advertisers$Lineitems$Delete,
      options: MethodOptions | BodyResponseCallback<Schema$Empty>,
      callback: BodyResponseCallback<Schema$Empty>
    ): void;
    delete(
      params: Params$Resource$Advertisers$Lineitems$Delete,
      callback: BodyResponseCallback<Schema$Empty>
    ): void;
    delete(callback: BodyResponseCallback<Schema$Empty>): void;
    delete(
      paramsOrCallback?:
        | Params$Resource$Advertisers$Lineitems$Delete
        | BodyResponseCallback<Schema$Empty>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$Empty>,
      callback?: BodyResponseCallback<Schema$Empty>
    ): void | GaxiosPromise<Schema$Empty> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Advertisers$Lineitems$Delete;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Advertisers$Lineitems$Delete;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (
              rootUrl +
              '/v1/advertisers/{+advertiserId}/lineItems/{+lineItemId}'
            ).replace(/([^:]\/)\/+/g, '$1'),
            method: 'DELETE',
          },
          options
        ),
        params,
        requiredParams: ['advertiserId', 'lineItemId'],
        pathParams: ['advertiserId', 'lineItemId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Empty>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Empty>(parameters);
      }
    }

    /**
     * displayvideo.advertisers.lineItems.get
     * @desc Gets a line item.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.advertisers.lineItems.get({
     *     // Required. The ID of the advertiser this line item belongs to.
     *     advertiserId: '[^/]+',
     *     // Required. The ID of the line item to fetch.
     *     lineItemId: '[^/]+',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "advertiserId": "my_advertiserId",
     *   //   "bidStrategy": {},
     *   //   "budget": {},
     *   //   "campaignId": "my_campaignId",
     *   //   "conversionCounting": {},
     *   //   "creativeIds": [],
     *   //   "displayName": "my_displayName",
     *   //   "entityStatus": "my_entityStatus",
     *   //   "flight": {},
     *   //   "frequencyCap": {},
     *   //   "insertionOrderId": "my_insertionOrderId",
     *   //   "integrationDetails": {},
     *   //   "inventorySourceIds": [],
     *   //   "lineItemId": "my_lineItemId",
     *   //   "lineItemType": "my_lineItemType",
     *   //   "name": "my_name",
     *   //   "pacing": {},
     *   //   "partnerCosts": [],
     *   //   "partnerRevenueModel": {},
     *   //   "updateTime": "my_updateTime"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.advertisers.lineItems.get
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.advertiserId Required. The ID of the advertiser this line item belongs to.
     * @param {string} params.lineItemId Required. The ID of the line item to fetch.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    get(
      params?: Params$Resource$Advertisers$Lineitems$Get,
      options?: MethodOptions
    ): GaxiosPromise<Schema$LineItem>;
    get(
      params: Params$Resource$Advertisers$Lineitems$Get,
      options: MethodOptions | BodyResponseCallback<Schema$LineItem>,
      callback: BodyResponseCallback<Schema$LineItem>
    ): void;
    get(
      params: Params$Resource$Advertisers$Lineitems$Get,
      callback: BodyResponseCallback<Schema$LineItem>
    ): void;
    get(callback: BodyResponseCallback<Schema$LineItem>): void;
    get(
      paramsOrCallback?:
        | Params$Resource$Advertisers$Lineitems$Get
        | BodyResponseCallback<Schema$LineItem>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$LineItem>,
      callback?: BodyResponseCallback<Schema$LineItem>
    ): void | GaxiosPromise<Schema$LineItem> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Advertisers$Lineitems$Get;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Advertisers$Lineitems$Get;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (
              rootUrl +
              '/v1/advertisers/{+advertiserId}/lineItems/{+lineItemId}'
            ).replace(/([^:]\/)\/+/g, '$1'),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: ['advertiserId', 'lineItemId'],
        pathParams: ['advertiserId', 'lineItemId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$LineItem>(parameters, callback);
      } else {
        return createAPIRequest<Schema$LineItem>(parameters);
      }
    }

    /**
     * displayvideo.advertisers.lineItems.list
     * @desc Lists line items in an advertiser.  The order is defined by the order_by parameter. If a filter by entity_status is not specified, line items with `ENTITY_STATUS_ARCHIVED` will not be included in the results.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.advertisers.lineItems.list({
     *     // Required. The ID of the advertiser to list line items for.
     *     advertiserId: '[^/]+',
     *     // Allows filtering by line item properties.
     *     //
     *     // Supported syntax:
     *     //
     *     // * Filter expressions are made up of one or more restrictions.
     *     // * Restrictions can be combined by `AND` or `OR` logical operators. A
     *     // sequence of restrictions implicitly uses `AND`.
     *     // * A restriction has the form of `{field} {operator} {value}`.
     *     // * The operator must be `EQUALS (=)`.
     *     // * Supported fields:
     *     //     - `campaignId`
     *     //     - `insertionOrderId`
     *     //     - `entityStatus`
     *     //     - `lineItemType`.
     *     //
     *     // Examples:
     *     //
     *     // * All line items under an insertion order: `insertionOrderId="1234"`
     *     // * All `ENTITY_STATUS_ACTIVE` or `ENTITY_STATUS_PAUSED`
     *     // and `LINE_ITEM_TYPE_DISPLAY_DEFAULT` line items under an advertiser:
     *     // `(entityStatus="ENTITY_STATUS_ACTIVE" OR
     *     // entityStatus="ENTITY_STATUS_PAUSED") AND
     *     // lineItemType="LINE_ITEM_TYPE_DISPLAY_DEFAULT"`
     *     //
     *     // The length of this field should be no more than 500 characters.
     *     filter: 'placeholder-value',
     *     // Field by which to sort the list.
     *     // Acceptable values are:
     *     //
     *     // * "displayName" (default)
     *     // * "entityStatus"
     *     //
     *     // The default sorting order is ascending. To specify descending order for
     *     // a field, a suffix "desc" should be added to the field name. Example:
     *     // `displayName desc`.
     *     orderBy: 'placeholder-value',
     *     // Requested page size. Must be between `1` and `100`. If unspecified will
     *     // default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value
     *     // is specified.
     *     pageSize: 'placeholder-value',
     *     // A token identifying a page of results the server should return.
     *     // Typically, this is the value of
     *     // next_page_token
     *     // returned from the previous call to `ListLineItems` method.
     *     // If not specified, the first page of results will be returned.
     *     pageToken: 'placeholder-value',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "lineItems": [],
     *   //   "nextPageToken": "my_nextPageToken"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.advertisers.lineItems.list
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.advertiserId Required. The ID of the advertiser to list line items for.
     * @param {string=} params.filter Allows filtering by line item properties.  Supported syntax:  * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` or `OR` logical operators. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * The operator must be `EQUALS (=)`. * Supported fields:     - `campaignId`     - `insertionOrderId`     - `entityStatus`     - `lineItemType`.  Examples:  * All line items under an insertion order: `insertionOrderId="1234"` * All `ENTITY_STATUS_ACTIVE` or `ENTITY_STATUS_PAUSED` and `LINE_ITEM_TYPE_DISPLAY_DEFAULT` line items under an advertiser: `(entityStatus="ENTITY_STATUS_ACTIVE" OR entityStatus="ENTITY_STATUS_PAUSED") AND lineItemType="LINE_ITEM_TYPE_DISPLAY_DEFAULT"`  The length of this field should be no more than 500 characters.
     * @param {string=} params.orderBy Field by which to sort the list. Acceptable values are:  * "displayName" (default) * "entityStatus"  The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `displayName desc`.
     * @param {integer=} params.pageSize Requested page size. Must be between `1` and `100`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified.
     * @param {string=} params.pageToken A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListLineItems` method. If not specified, the first page of results will be returned.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    list(
      params?: Params$Resource$Advertisers$Lineitems$List,
      options?: MethodOptions
    ): GaxiosPromise<Schema$ListLineItemsResponse>;
    list(
      params: Params$Resource$Advertisers$Lineitems$List,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$ListLineItemsResponse>,
      callback: BodyResponseCallback<Schema$ListLineItemsResponse>
    ): void;
    list(
      params: Params$Resource$Advertisers$Lineitems$List,
      callback: BodyResponseCallback<Schema$ListLineItemsResponse>
    ): void;
    list(callback: BodyResponseCallback<Schema$ListLineItemsResponse>): void;
    list(
      paramsOrCallback?:
        | Params$Resource$Advertisers$Lineitems$List
        | BodyResponseCallback<Schema$ListLineItemsResponse>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$ListLineItemsResponse>,
      callback?: BodyResponseCallback<Schema$ListLineItemsResponse>
    ): void | GaxiosPromise<Schema$ListLineItemsResponse> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Advertisers$Lineitems$List;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Advertisers$Lineitems$List;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (
              rootUrl + '/v1/advertisers/{+advertiserId}/lineItems'
            ).replace(/([^:]\/)\/+/g, '$1'),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: ['advertiserId'],
        pathParams: ['advertiserId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$ListLineItemsResponse>(parameters, callback);
      } else {
        return createAPIRequest<Schema$ListLineItemsResponse>(parameters);
      }
    }

    /**
     * displayvideo.advertisers.lineItems.patch
     * @desc Updates an existing line item. Returns the updated line item if successful.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.advertisers.lineItems.patch({
     *     // Output only. The unique ID of the advertiser the line item belongs to.
     *     advertiserId: '[^/]+',
     *     // Output only. The unique ID of the line item. Assigned by the system.
     *     lineItemId: '[^/]+',
     *     // Required. The mask to control which fields to update.
     *     updateMask: 'placeholder-value',
     *
     *     // Request body metadata
     *     requestBody: {
     *       // request body parameters
     *       // {
     *       //   "advertiserId": "my_advertiserId",
     *       //   "bidStrategy": {},
     *       //   "budget": {},
     *       //   "campaignId": "my_campaignId",
     *       //   "conversionCounting": {},
     *       //   "creativeIds": [],
     *       //   "displayName": "my_displayName",
     *       //   "entityStatus": "my_entityStatus",
     *       //   "flight": {},
     *       //   "frequencyCap": {},
     *       //   "insertionOrderId": "my_insertionOrderId",
     *       //   "integrationDetails": {},
     *       //   "inventorySourceIds": [],
     *       //   "lineItemId": "my_lineItemId",
     *       //   "lineItemType": "my_lineItemType",
     *       //   "name": "my_name",
     *       //   "pacing": {},
     *       //   "partnerCosts": [],
     *       //   "partnerRevenueModel": {},
     *       //   "updateTime": "my_updateTime"
     *       // }
     *     },
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "advertiserId": "my_advertiserId",
     *   //   "bidStrategy": {},
     *   //   "budget": {},
     *   //   "campaignId": "my_campaignId",
     *   //   "conversionCounting": {},
     *   //   "creativeIds": [],
     *   //   "displayName": "my_displayName",
     *   //   "entityStatus": "my_entityStatus",
     *   //   "flight": {},
     *   //   "frequencyCap": {},
     *   //   "insertionOrderId": "my_insertionOrderId",
     *   //   "integrationDetails": {},
     *   //   "inventorySourceIds": [],
     *   //   "lineItemId": "my_lineItemId",
     *   //   "lineItemType": "my_lineItemType",
     *   //   "name": "my_name",
     *   //   "pacing": {},
     *   //   "partnerCosts": [],
     *   //   "partnerRevenueModel": {},
     *   //   "updateTime": "my_updateTime"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.advertisers.lineItems.patch
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.advertiserId Output only. The unique ID of the advertiser the line item belongs to.
     * @param {string} params.lineItemId Output only. The unique ID of the line item. Assigned by the system.
     * @param {string=} params.updateMask Required. The mask to control which fields to update.
     * @param {().LineItem} params.requestBody Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    patch(
      params?: Params$Resource$Advertisers$Lineitems$Patch,
      options?: MethodOptions
    ): GaxiosPromise<Schema$LineItem>;
    patch(
      params: Params$Resource$Advertisers$Lineitems$Patch,
      options: MethodOptions | BodyResponseCallback<Schema$LineItem>,
      callback: BodyResponseCallback<Schema$LineItem>
    ): void;
    patch(
      params: Params$Resource$Advertisers$Lineitems$Patch,
      callback: BodyResponseCallback<Schema$LineItem>
    ): void;
    patch(callback: BodyResponseCallback<Schema$LineItem>): void;
    patch(
      paramsOrCallback?:
        | Params$Resource$Advertisers$Lineitems$Patch
        | BodyResponseCallback<Schema$LineItem>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$LineItem>,
      callback?: BodyResponseCallback<Schema$LineItem>
    ): void | GaxiosPromise<Schema$LineItem> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Advertisers$Lineitems$Patch;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Advertisers$Lineitems$Patch;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (
              rootUrl +
              '/v1/advertisers/{+advertiserId}/lineItems/{+lineItemId}'
            ).replace(/([^:]\/)\/+/g, '$1'),
            method: 'PATCH',
          },
          options
        ),
        params,
        requiredParams: ['advertiserId', 'lineItemId'],
        pathParams: ['advertiserId', 'lineItemId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$LineItem>(parameters, callback);
      } else {
        return createAPIRequest<Schema$LineItem>(parameters);
      }
    }
  }

  export interface Params$Resource$Advertisers$Lineitems$Bulkeditlineitemassignedtargetingoptions
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required. The ID of the advertiser the line item belongs to.
     */
    advertiserId?: string;
    /**
     * Required. The ID of the line item the assigned targeting option will belong to.
     */
    lineItemId?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$BulkEditLineItemAssignedTargetingOptionsRequest;
  }
  export interface Params$Resource$Advertisers$Lineitems$Bulklistlineitemassignedtargetingoptions
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required. The ID of the advertiser the line item belongs to.
     */
    advertiserId?: string;
    /**
     * Allows filtering by assigned targeting option properties. Supported syntax:  * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by the logical operator `OR` on the same field. * A restriction has the form of `{field} {operator} {value}`. * The operator must be `EQUALS (=)`. * Supported fields:     - `targetingType`     - `inheritance`  Examples:  * AssignedTargetingOptions of targeting type TARGETING_TYPE_PROXIMITY_LOCATION_LIST or TARGETING_TYPE_CHANNEL `targetingType="TARGETING_TYPE_PROXIMITY_LOCATION_LIST" OR targetingType="TARGETING_TYPE_CHANNEL"` * AssignedTargetingOptions with inheritance status of NOT_INHERITED or   INHERITED_FROM_PARTNER `inheritance="NOT_INHERITED" OR inheritance="INHERITED_FROM_PARTNER"`  The length of this field should be no more than 500 characters.
     */
    filter?: string;
    /**
     * Required. The ID of the line item to list assigned targeting options for.
     */
    lineItemId?: string;
    /**
     * Field by which to sort the list. Acceptable values are:  * `targetingType` (default)  The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `targetingType desc`.
     */
    orderBy?: string;
    /**
     * Requested page size. The size must be an integer between `1` and `5000`. If unspecified, the default is '5000'. Returns error code `INVALID_ARGUMENT` if an invalid value is specified.
     */
    pageSize?: number;
    /**
     * A token that lets the client fetch the next page of results. Typically, this is the value of next_page_token returned from the previous call to `BulkListLineItemAssignedTargetingOptions` method. If not specified, the first page of results will be returned.
     */
    pageToken?: string;
  }
  export interface Params$Resource$Advertisers$Lineitems$Create
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Output only. The unique ID of the advertiser the line item belongs to.
     */
    advertiserId?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$LineItem;
  }
  export interface Params$Resource$Advertisers$Lineitems$Delete
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * The ID of the advertiser this line item belongs to.
     */
    advertiserId?: string;
    /**
     * The ID of the line item we need to fetch.
     */
    lineItemId?: string;
  }
  export interface Params$Resource$Advertisers$Lineitems$Get
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required. The ID of the advertiser this line item belongs to.
     */
    advertiserId?: string;
    /**
     * Required. The ID of the line item to fetch.
     */
    lineItemId?: string;
  }
  export interface Params$Resource$Advertisers$Lineitems$List
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required. The ID of the advertiser to list line items for.
     */
    advertiserId?: string;
    /**
     * Allows filtering by line item properties.  Supported syntax:  * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` or `OR` logical operators. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * The operator must be `EQUALS (=)`. * Supported fields:     - `campaignId`     - `insertionOrderId`     - `entityStatus`     - `lineItemType`.  Examples:  * All line items under an insertion order: `insertionOrderId="1234"` * All `ENTITY_STATUS_ACTIVE` or `ENTITY_STATUS_PAUSED` and `LINE_ITEM_TYPE_DISPLAY_DEFAULT` line items under an advertiser: `(entityStatus="ENTITY_STATUS_ACTIVE" OR entityStatus="ENTITY_STATUS_PAUSED") AND lineItemType="LINE_ITEM_TYPE_DISPLAY_DEFAULT"`  The length of this field should be no more than 500 characters.
     */
    filter?: string;
    /**
     * Field by which to sort the list. Acceptable values are:  * "displayName" (default) * "entityStatus"  The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `displayName desc`.
     */
    orderBy?: string;
    /**
     * Requested page size. Must be between `1` and `100`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified.
     */
    pageSize?: number;
    /**
     * A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListLineItems` method. If not specified, the first page of results will be returned.
     */
    pageToken?: string;
  }
  export interface Params$Resource$Advertisers$Lineitems$Patch
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Output only. The unique ID of the advertiser the line item belongs to.
     */
    advertiserId?: string;
    /**
     * Output only. The unique ID of the line item. Assigned by the system.
     */
    lineItemId?: string;
    /**
     * Required. The mask to control which fields to update.
     */
    updateMask?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$LineItem;
  }

  export class Resource$Advertisers$Lineitems$Targetingtypes {
    context: APIRequestContext;
    assignedTargetingOptions: Resource$Advertisers$Lineitems$Targetingtypes$Assignedtargetingoptions;
    constructor(context: APIRequestContext) {
      this.context = context;
      this.assignedTargetingOptions = new Resource$Advertisers$Lineitems$Targetingtypes$Assignedtargetingoptions(
        this.context
      );
    }
  }

  export class Resource$Advertisers$Lineitems$Targetingtypes$Assignedtargetingoptions {
    context: APIRequestContext;
    constructor(context: APIRequestContext) {
      this.context = context;
    }

    /**
     * displayvideo.advertisers.lineItems.targetingTypes.assignedTargetingOptions.create
     * @desc Assigns a targeting option to a line item. Returns the assigned targeting option if successful.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.advertisers.lineItems.targetingTypes.assignedTargetingOptions.create(
     *     {
     *       // Required. The ID of the advertiser the line item belongs to.
     *       advertiserId: '[^/]+',
     *       // Required. The ID of the line item the assigned targeting option will belong to.
     *       lineItemId: '[^/]+',
     *       // Required. Identifies the type of this assigned targeting option.
     *       targetingType: '[^/]+',
     *
     *       // Request body metadata
     *       requestBody: {
     *         // request body parameters
     *         // {
     *         //   "ageRangeDetails": {},
     *         //   "appCategoryDetails": {},
     *         //   "appDetails": {},
     *         //   "assignedTargetingOptionId": "my_assignedTargetingOptionId",
     *         //   "audienceGroupDetails": {},
     *         //   "authorizedSellerStatusDetails": {},
     *         //   "browserDetails": {},
     *         //   "carrierAndIspDetails": {},
     *         //   "categoryDetails": {},
     *         //   "channelDetails": {},
     *         //   "contentInstreamPositionDetails": {},
     *         //   "contentOutstreamPositionDetails": {},
     *         //   "dayAndTimeDetails": {},
     *         //   "deviceMakeModelDetails": {},
     *         //   "deviceTypeDetails": {},
     *         //   "digitalContentLabelExclusionDetails": {},
     *         //   "environmentDetails": {},
     *         //   "exchangeDetails": {},
     *         //   "genderDetails": {},
     *         //   "geoRegionDetails": {},
     *         //   "householdIncomeDetails": {},
     *         //   "inheritance": "my_inheritance",
     *         //   "inventorySourceDetails": {},
     *         //   "inventorySourceGroupDetails": {},
     *         //   "keywordDetails": {},
     *         //   "languageDetails": {},
     *         //   "name": "my_name",
     *         //   "negativeKeywordListDetails": {},
     *         //   "onScreenPositionDetails": {},
     *         //   "operatingSystemDetails": {},
     *         //   "parentalStatusDetails": {},
     *         //   "proximityLocationListDetails": {},
     *         //   "regionalLocationListDetails": {},
     *         //   "sensitiveCategoryExclusionDetails": {},
     *         //   "subExchangeDetails": {},
     *         //   "targetingType": "my_targetingType",
     *         //   "thirdPartyVerifierDetails": {},
     *         //   "urlDetails": {},
     *         //   "userRewardedContentDetails": {},
     *         //   "videoPlayerSizeDetails": {},
     *         //   "viewabilityDetails": {}
     *         // }
     *       },
     *     }
     *   );
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "ageRangeDetails": {},
     *   //   "appCategoryDetails": {},
     *   //   "appDetails": {},
     *   //   "assignedTargetingOptionId": "my_assignedTargetingOptionId",
     *   //   "audienceGroupDetails": {},
     *   //   "authorizedSellerStatusDetails": {},
     *   //   "browserDetails": {},
     *   //   "carrierAndIspDetails": {},
     *   //   "categoryDetails": {},
     *   //   "channelDetails": {},
     *   //   "contentInstreamPositionDetails": {},
     *   //   "contentOutstreamPositionDetails": {},
     *   //   "dayAndTimeDetails": {},
     *   //   "deviceMakeModelDetails": {},
     *   //   "deviceTypeDetails": {},
     *   //   "digitalContentLabelExclusionDetails": {},
     *   //   "environmentDetails": {},
     *   //   "exchangeDetails": {},
     *   //   "genderDetails": {},
     *   //   "geoRegionDetails": {},
     *   //   "householdIncomeDetails": {},
     *   //   "inheritance": "my_inheritance",
     *   //   "inventorySourceDetails": {},
     *   //   "inventorySourceGroupDetails": {},
     *   //   "keywordDetails": {},
     *   //   "languageDetails": {},
     *   //   "name": "my_name",
     *   //   "negativeKeywordListDetails": {},
     *   //   "onScreenPositionDetails": {},
     *   //   "operatingSystemDetails": {},
     *   //   "parentalStatusDetails": {},
     *   //   "proximityLocationListDetails": {},
     *   //   "regionalLocationListDetails": {},
     *   //   "sensitiveCategoryExclusionDetails": {},
     *   //   "subExchangeDetails": {},
     *   //   "targetingType": "my_targetingType",
     *   //   "thirdPartyVerifierDetails": {},
     *   //   "urlDetails": {},
     *   //   "userRewardedContentDetails": {},
     *   //   "videoPlayerSizeDetails": {},
     *   //   "viewabilityDetails": {}
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.advertisers.lineItems.targetingTypes.assignedTargetingOptions.create
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.advertiserId Required. The ID of the advertiser the line item belongs to.
     * @param {string} params.lineItemId Required. The ID of the line item the assigned targeting option will belong to.
     * @param {string} params.targetingType Required. Identifies the type of this assigned targeting option.
     * @param {().AssignedTargetingOption} params.requestBody Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    create(
      params?: Params$Resource$Advertisers$Lineitems$Targetingtypes$Assignedtargetingoptions$Create,
      options?: MethodOptions
    ): GaxiosPromise<Schema$AssignedTargetingOption>;
    create(
      params: Params$Resource$Advertisers$Lineitems$Targetingtypes$Assignedtargetingoptions$Create,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$AssignedTargetingOption>,
      callback: BodyResponseCallback<Schema$AssignedTargetingOption>
    ): void;
    create(
      params: Params$Resource$Advertisers$Lineitems$Targetingtypes$Assignedtargetingoptions$Create,
      callback: BodyResponseCallback<Schema$AssignedTargetingOption>
    ): void;
    create(
      callback: BodyResponseCallback<Schema$AssignedTargetingOption>
    ): void;
    create(
      paramsOrCallback?:
        | Params$Resource$Advertisers$Lineitems$Targetingtypes$Assignedtargetingoptions$Create
        | BodyResponseCallback<Schema$AssignedTargetingOption>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$AssignedTargetingOption>,
      callback?: BodyResponseCallback<Schema$AssignedTargetingOption>
    ): void | GaxiosPromise<Schema$AssignedTargetingOption> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Advertisers$Lineitems$Targetingtypes$Assignedtargetingoptions$Create;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Advertisers$Lineitems$Targetingtypes$Assignedtargetingoptions$Create;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (
              rootUrl +
              '/v1/advertisers/{+advertiserId}/lineItems/{+lineItemId}/targetingTypes/{+targetingType}/assignedTargetingOptions'
            ).replace(/([^:]\/)\/+/g, '$1'),
            method: 'POST',
          },
          options
        ),
        params,
        requiredParams: ['advertiserId', 'lineItemId', 'targetingType'],
        pathParams: ['advertiserId', 'lineItemId', 'targetingType'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$AssignedTargetingOption>(parameters, callback);
      } else {
        return createAPIRequest<Schema$AssignedTargetingOption>(parameters);
      }
    }

    /**
     * displayvideo.advertisers.lineItems.targetingTypes.assignedTargetingOptions.delete
     * @desc Deletes an assigned targeting option from a line item.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.advertisers.lineItems.targetingTypes.assignedTargetingOptions.delete(
     *     {
     *       // Required. The ID of the advertiser the line item belongs to.
     *       advertiserId: '[^/]+',
     *       // Required. The ID of the assigned targeting option to delete.
     *       assignedTargetingOptionId: '[^/]+',
     *       // Required. The ID of the line item the assigned targeting option belongs to.
     *       lineItemId: '[^/]+',
     *       // Required. Identifies the type of this assigned targeting option.
     *       targetingType: '[^/]+',
     *     }
     *   );
     *   console.log(res.data);
     *
     *   // Example response
     *   // {}
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.advertisers.lineItems.targetingTypes.assignedTargetingOptions.delete
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.advertiserId Required. The ID of the advertiser the line item belongs to.
     * @param {string} params.assignedTargetingOptionId Required. The ID of the assigned targeting option to delete.
     * @param {string} params.lineItemId Required. The ID of the line item the assigned targeting option belongs to.
     * @param {string} params.targetingType Required. Identifies the type of this assigned targeting option.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    delete(
      params?: Params$Resource$Advertisers$Lineitems$Targetingtypes$Assignedtargetingoptions$Delete,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Empty>;
    delete(
      params: Params$Resource$Advertisers$Lineitems$Targetingtypes$Assignedtargetingoptions$Delete,
      options: MethodOptions | BodyResponseCallback<Schema$Empty>,
      callback: BodyResponseCallback<Schema$Empty>
    ): void;
    delete(
      params: Params$Resource$Advertisers$Lineitems$Targetingtypes$Assignedtargetingoptions$Delete,
      callback: BodyResponseCallback<Schema$Empty>
    ): void;
    delete(callback: BodyResponseCallback<Schema$Empty>): void;
    delete(
      paramsOrCallback?:
        | Params$Resource$Advertisers$Lineitems$Targetingtypes$Assignedtargetingoptions$Delete
        | BodyResponseCallback<Schema$Empty>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$Empty>,
      callback?: BodyResponseCallback<Schema$Empty>
    ): void | GaxiosPromise<Schema$Empty> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Advertisers$Lineitems$Targetingtypes$Assignedtargetingoptions$Delete;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Advertisers$Lineitems$Targetingtypes$Assignedtargetingoptions$Delete;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (
              rootUrl +
              '/v1/advertisers/{+advertiserId}/lineItems/{+lineItemId}/targetingTypes/{+targetingType}/assignedTargetingOptions/{+assignedTargetingOptionId}'
            ).replace(/([^:]\/)\/+/g, '$1'),
            method: 'DELETE',
          },
          options
        ),
        params,
        requiredParams: [
          'advertiserId',
          'lineItemId',
          'targetingType',
          'assignedTargetingOptionId',
        ],
        pathParams: [
          'advertiserId',
          'assignedTargetingOptionId',
          'lineItemId',
          'targetingType',
        ],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Empty>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Empty>(parameters);
      }
    }

    /**
     * displayvideo.advertisers.lineItems.targetingTypes.assignedTargetingOptions.get
     * @desc Gets a single targeting option assigned to a line item.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.advertisers.lineItems.targetingTypes.assignedTargetingOptions.get(
     *     {
     *       // Required. The ID of the advertiser the line item belongs to.
     *       advertiserId: '[^/]+',
     *       // Required. An identifier unique to the targeting type in this line item that
     *       // identifies the assigned targeting option being requested.
     *       assignedTargetingOptionId: '[^/]+',
     *       // Required. The ID of the line item the assigned targeting option belongs to.
     *       lineItemId: '[^/]+',
     *       // Required. Identifies the type of this assigned targeting option.
     *       targetingType: '[^/]+',
     *     }
     *   );
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "ageRangeDetails": {},
     *   //   "appCategoryDetails": {},
     *   //   "appDetails": {},
     *   //   "assignedTargetingOptionId": "my_assignedTargetingOptionId",
     *   //   "audienceGroupDetails": {},
     *   //   "authorizedSellerStatusDetails": {},
     *   //   "browserDetails": {},
     *   //   "carrierAndIspDetails": {},
     *   //   "categoryDetails": {},
     *   //   "channelDetails": {},
     *   //   "contentInstreamPositionDetails": {},
     *   //   "contentOutstreamPositionDetails": {},
     *   //   "dayAndTimeDetails": {},
     *   //   "deviceMakeModelDetails": {},
     *   //   "deviceTypeDetails": {},
     *   //   "digitalContentLabelExclusionDetails": {},
     *   //   "environmentDetails": {},
     *   //   "exchangeDetails": {},
     *   //   "genderDetails": {},
     *   //   "geoRegionDetails": {},
     *   //   "householdIncomeDetails": {},
     *   //   "inheritance": "my_inheritance",
     *   //   "inventorySourceDetails": {},
     *   //   "inventorySourceGroupDetails": {},
     *   //   "keywordDetails": {},
     *   //   "languageDetails": {},
     *   //   "name": "my_name",
     *   //   "negativeKeywordListDetails": {},
     *   //   "onScreenPositionDetails": {},
     *   //   "operatingSystemDetails": {},
     *   //   "parentalStatusDetails": {},
     *   //   "proximityLocationListDetails": {},
     *   //   "regionalLocationListDetails": {},
     *   //   "sensitiveCategoryExclusionDetails": {},
     *   //   "subExchangeDetails": {},
     *   //   "targetingType": "my_targetingType",
     *   //   "thirdPartyVerifierDetails": {},
     *   //   "urlDetails": {},
     *   //   "userRewardedContentDetails": {},
     *   //   "videoPlayerSizeDetails": {},
     *   //   "viewabilityDetails": {}
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.advertisers.lineItems.targetingTypes.assignedTargetingOptions.get
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.advertiserId Required. The ID of the advertiser the line item belongs to.
     * @param {string} params.assignedTargetingOptionId Required. An identifier unique to the targeting type in this line item that identifies the assigned targeting option being requested.
     * @param {string} params.lineItemId Required. The ID of the line item the assigned targeting option belongs to.
     * @param {string} params.targetingType Required. Identifies the type of this assigned targeting option.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    get(
      params?: Params$Resource$Advertisers$Lineitems$Targetingtypes$Assignedtargetingoptions$Get,
      options?: MethodOptions
    ): GaxiosPromise<Schema$AssignedTargetingOption>;
    get(
      params: Params$Resource$Advertisers$Lineitems$Targetingtypes$Assignedtargetingoptions$Get,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$AssignedTargetingOption>,
      callback: BodyResponseCallback<Schema$AssignedTargetingOption>
    ): void;
    get(
      params: Params$Resource$Advertisers$Lineitems$Targetingtypes$Assignedtargetingoptions$Get,
      callback: BodyResponseCallback<Schema$AssignedTargetingOption>
    ): void;
    get(callback: BodyResponseCallback<Schema$AssignedTargetingOption>): void;
    get(
      paramsOrCallback?:
        | Params$Resource$Advertisers$Lineitems$Targetingtypes$Assignedtargetingoptions$Get
        | BodyResponseCallback<Schema$AssignedTargetingOption>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$AssignedTargetingOption>,
      callback?: BodyResponseCallback<Schema$AssignedTargetingOption>
    ): void | GaxiosPromise<Schema$AssignedTargetingOption> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Advertisers$Lineitems$Targetingtypes$Assignedtargetingoptions$Get;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Advertisers$Lineitems$Targetingtypes$Assignedtargetingoptions$Get;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (
              rootUrl +
              '/v1/advertisers/{+advertiserId}/lineItems/{+lineItemId}/targetingTypes/{+targetingType}/assignedTargetingOptions/{+assignedTargetingOptionId}'
            ).replace(/([^:]\/)\/+/g, '$1'),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: [
          'advertiserId',
          'lineItemId',
          'targetingType',
          'assignedTargetingOptionId',
        ],
        pathParams: [
          'advertiserId',
          'assignedTargetingOptionId',
          'lineItemId',
          'targetingType',
        ],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$AssignedTargetingOption>(parameters, callback);
      } else {
        return createAPIRequest<Schema$AssignedTargetingOption>(parameters);
      }
    }

    /**
     * displayvideo.advertisers.lineItems.targetingTypes.assignedTargetingOptions.list
     * @desc Lists the targeting options assigned to a line item.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.advertisers.lineItems.targetingTypes.assignedTargetingOptions.list(
     *     {
     *       // Required. The ID of the advertiser the line item belongs to.
     *       advertiserId: '[^/]+',
     *       // Allows filtering by assigned targeting option properties.
     *       //
     *       // Supported syntax:
     *       //
     *       // * Filter expressions are made up of one or more restrictions.
     *       // * Restrictions can be combined by the logical operator `OR`.
     *       // * A restriction has the form of `{field} {operator} {value}`.
     *       // * The operator must be `EQUALS (=)`.
     *       // * Supported fields:
     *       //     - `assignedTargetingOptionId`
     *       //     - `inheritance`
     *       //
     *       // Examples:
     *       //
     *       // * AssignedTargetingOptions with ID 1 or 2
     *       // `assignedTargetingOptionId="1" OR assignedTargetingOptionId="2"`
     *       // * AssignedTargetingOptions with inheritance status of NOT_INHERITED or
     *       //   INHERITED_FROM_PARTNER
     *       // `inheritance="NOT_INHERITED" OR inheritance="INHERITED_FROM_PARTNER"`
     *       //
     *       // The length of this field should be no more than 500 characters.
     *       filter: 'placeholder-value',
     *       // Required. The ID of the line item to list assigned targeting options for.
     *       lineItemId: '[^/]+',
     *       // Field by which to sort the list.
     *       // Acceptable values are:
     *       //
     *       // * `assignedTargetingOptionId` (default)
     *       //
     *       // The default sorting order is ascending. To specify descending order for
     *       // a field, a suffix "desc" should be added to the field name. Example:
     *       // `assignedTargetingOptionId desc`.
     *       orderBy: 'placeholder-value',
     *       // Requested page size. Must be between `1` and `100`. If unspecified will
     *       // default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value
     *       // is specified.
     *       pageSize: 'placeholder-value',
     *       // A token identifying a page of results the server should return.
     *       // Typically, this is the value of
     *       // next_page_token
     *       // returned from the previous call to `ListLineItemAssignedTargetingOptions`
     *       // method. If not specified, the first page of results will be returned.
     *       pageToken: 'placeholder-value',
     *       // Required. Identifies the type of assigned targeting options to list.
     *       targetingType: '[^/]+',
     *     }
     *   );
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "assignedTargetingOptions": [],
     *   //   "nextPageToken": "my_nextPageToken"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.advertisers.lineItems.targetingTypes.assignedTargetingOptions.list
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.advertiserId Required. The ID of the advertiser the line item belongs to.
     * @param {string=} params.filter Allows filtering by assigned targeting option properties.  Supported syntax:  * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by the logical operator `OR`. * A restriction has the form of `{field} {operator} {value}`. * The operator must be `EQUALS (=)`. * Supported fields:     - `assignedTargetingOptionId`     - `inheritance`  Examples:  * AssignedTargetingOptions with ID 1 or 2 `assignedTargetingOptionId="1" OR assignedTargetingOptionId="2"` * AssignedTargetingOptions with inheritance status of NOT_INHERITED or   INHERITED_FROM_PARTNER `inheritance="NOT_INHERITED" OR inheritance="INHERITED_FROM_PARTNER"`  The length of this field should be no more than 500 characters.
     * @param {string} params.lineItemId Required. The ID of the line item to list assigned targeting options for.
     * @param {string=} params.orderBy Field by which to sort the list. Acceptable values are:  * `assignedTargetingOptionId` (default)  The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `assignedTargetingOptionId desc`.
     * @param {integer=} params.pageSize Requested page size. Must be between `1` and `100`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified.
     * @param {string=} params.pageToken A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListLineItemAssignedTargetingOptions` method. If not specified, the first page of results will be returned.
     * @param {string} params.targetingType Required. Identifies the type of assigned targeting options to list.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    list(
      params?: Params$Resource$Advertisers$Lineitems$Targetingtypes$Assignedtargetingoptions$List,
      options?: MethodOptions
    ): GaxiosPromise<Schema$ListLineItemAssignedTargetingOptionsResponse>;
    list(
      params: Params$Resource$Advertisers$Lineitems$Targetingtypes$Assignedtargetingoptions$List,
      options:
        | MethodOptions
        | BodyResponseCallback<
            Schema$ListLineItemAssignedTargetingOptionsResponse
          >,
      callback: BodyResponseCallback<
        Schema$ListLineItemAssignedTargetingOptionsResponse
      >
    ): void;
    list(
      params: Params$Resource$Advertisers$Lineitems$Targetingtypes$Assignedtargetingoptions$List,
      callback: BodyResponseCallback<
        Schema$ListLineItemAssignedTargetingOptionsResponse
      >
    ): void;
    list(
      callback: BodyResponseCallback<
        Schema$ListLineItemAssignedTargetingOptionsResponse
      >
    ): void;
    list(
      paramsOrCallback?:
        | Params$Resource$Advertisers$Lineitems$Targetingtypes$Assignedtargetingoptions$List
        | BodyResponseCallback<
            Schema$ListLineItemAssignedTargetingOptionsResponse
          >,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<
            Schema$ListLineItemAssignedTargetingOptionsResponse
          >,
      callback?: BodyResponseCallback<
        Schema$ListLineItemAssignedTargetingOptionsResponse
      >
    ): void | GaxiosPromise<
      Schema$ListLineItemAssignedTargetingOptionsResponse
    > {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Advertisers$Lineitems$Targetingtypes$Assignedtargetingoptions$List;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Advertisers$Lineitems$Targetingtypes$Assignedtargetingoptions$List;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (
              rootUrl +
              '/v1/advertisers/{+advertiserId}/lineItems/{+lineItemId}/targetingTypes/{+targetingType}/assignedTargetingOptions'
            ).replace(/([^:]\/)\/+/g, '$1'),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: ['advertiserId', 'lineItemId', 'targetingType'],
        pathParams: ['advertiserId', 'lineItemId', 'targetingType'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$ListLineItemAssignedTargetingOptionsResponse>(
          parameters,
          callback
        );
      } else {
        return createAPIRequest<
          Schema$ListLineItemAssignedTargetingOptionsResponse
        >(parameters);
      }
    }
  }

  export interface Params$Resource$Advertisers$Lineitems$Targetingtypes$Assignedtargetingoptions$Create
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required. The ID of the advertiser the line item belongs to.
     */
    advertiserId?: string;
    /**
     * Required. The ID of the line item the assigned targeting option will belong to.
     */
    lineItemId?: string;
    /**
     * Required. Identifies the type of this assigned targeting option.
     */
    targetingType?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$AssignedTargetingOption;
  }
  export interface Params$Resource$Advertisers$Lineitems$Targetingtypes$Assignedtargetingoptions$Delete
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required. The ID of the advertiser the line item belongs to.
     */
    advertiserId?: string;
    /**
     * Required. The ID of the assigned targeting option to delete.
     */
    assignedTargetingOptionId?: string;
    /**
     * Required. The ID of the line item the assigned targeting option belongs to.
     */
    lineItemId?: string;
    /**
     * Required. Identifies the type of this assigned targeting option.
     */
    targetingType?: string;
  }
  export interface Params$Resource$Advertisers$Lineitems$Targetingtypes$Assignedtargetingoptions$Get
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required. The ID of the advertiser the line item belongs to.
     */
    advertiserId?: string;
    /**
     * Required. An identifier unique to the targeting type in this line item that identifies the assigned targeting option being requested.
     */
    assignedTargetingOptionId?: string;
    /**
     * Required. The ID of the line item the assigned targeting option belongs to.
     */
    lineItemId?: string;
    /**
     * Required. Identifies the type of this assigned targeting option.
     */
    targetingType?: string;
  }
  export interface Params$Resource$Advertisers$Lineitems$Targetingtypes$Assignedtargetingoptions$List
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required. The ID of the advertiser the line item belongs to.
     */
    advertiserId?: string;
    /**
     * Allows filtering by assigned targeting option properties.  Supported syntax:  * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by the logical operator `OR`. * A restriction has the form of `{field} {operator} {value}`. * The operator must be `EQUALS (=)`. * Supported fields:     - `assignedTargetingOptionId`     - `inheritance`  Examples:  * AssignedTargetingOptions with ID 1 or 2 `assignedTargetingOptionId="1" OR assignedTargetingOptionId="2"` * AssignedTargetingOptions with inheritance status of NOT_INHERITED or   INHERITED_FROM_PARTNER `inheritance="NOT_INHERITED" OR inheritance="INHERITED_FROM_PARTNER"`  The length of this field should be no more than 500 characters.
     */
    filter?: string;
    /**
     * Required. The ID of the line item to list assigned targeting options for.
     */
    lineItemId?: string;
    /**
     * Field by which to sort the list. Acceptable values are:  * `assignedTargetingOptionId` (default)  The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `assignedTargetingOptionId desc`.
     */
    orderBy?: string;
    /**
     * Requested page size. Must be between `1` and `100`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified.
     */
    pageSize?: number;
    /**
     * A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListLineItemAssignedTargetingOptions` method. If not specified, the first page of results will be returned.
     */
    pageToken?: string;
    /**
     * Required. Identifies the type of assigned targeting options to list.
     */
    targetingType?: string;
  }

  export class Resource$Advertisers$Locationlists {
    context: APIRequestContext;
    constructor(context: APIRequestContext) {
      this.context = context;
    }

    /**
     * displayvideo.advertisers.locationLists.get
     * @desc Gets a location list.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.advertisers.locationLists.get({
     *     // Required. The ID of the DV360 advertiser to which the fetched location list belongs.
     *     advertiserId: '[^/]+',
     *     // Required. The ID of the location list to fetch.
     *     locationListId: '[^/]+',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "advertiserId": "my_advertiserId",
     *   //   "displayName": "my_displayName",
     *   //   "locationListId": "my_locationListId",
     *   //   "locationType": "my_locationType",
     *   //   "name": "my_name"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.advertisers.locationLists.get
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.advertiserId Required. The ID of the DV360 advertiser to which the fetched location list belongs.
     * @param {string} params.locationListId Required. The ID of the location list to fetch.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    get(
      params?: Params$Resource$Advertisers$Locationlists$Get,
      options?: MethodOptions
    ): GaxiosPromise<Schema$LocationList>;
    get(
      params: Params$Resource$Advertisers$Locationlists$Get,
      options: MethodOptions | BodyResponseCallback<Schema$LocationList>,
      callback: BodyResponseCallback<Schema$LocationList>
    ): void;
    get(
      params: Params$Resource$Advertisers$Locationlists$Get,
      callback: BodyResponseCallback<Schema$LocationList>
    ): void;
    get(callback: BodyResponseCallback<Schema$LocationList>): void;
    get(
      paramsOrCallback?:
        | Params$Resource$Advertisers$Locationlists$Get
        | BodyResponseCallback<Schema$LocationList>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$LocationList>,
      callback?: BodyResponseCallback<Schema$LocationList>
    ): void | GaxiosPromise<Schema$LocationList> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Advertisers$Locationlists$Get;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Advertisers$Locationlists$Get;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (
              rootUrl +
              '/v1/advertisers/{+advertiserId}/locationLists/{+locationListId}'
            ).replace(/([^:]\/)\/+/g, '$1'),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: ['advertiserId', 'locationListId'],
        pathParams: ['advertiserId', 'locationListId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$LocationList>(parameters, callback);
      } else {
        return createAPIRequest<Schema$LocationList>(parameters);
      }
    }

    /**
     * displayvideo.advertisers.locationLists.list
     * @desc Lists location lists based on a given advertiser id.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.advertisers.locationLists.list({
     *     // Required. The ID of the DV360 advertiser to which the fetched location lists belong.
     *     advertiserId: '[^/]+',
     *     // Allows filtering by location list fields.
     *     //
     *     // Supported syntax:
     *     //
     *     // * Filter expressions are made up of one or more restrictions.
     *     // * Restrictions can be combined by `AND` or `OR` logical operators. A
     *     // sequence of restrictions implicitly uses `AND`.
     *     // * A restriction has the form of `{field} {operator} {value}`.
     *     // * The operator must be `EQUALS (=)`.
     *     // * Supported fields:
     *     //     - `locationType`
     *     //
     *     // Examples:
     *     //
     *     // * All regional location list:
     *     // `locationType="TARGETING_LOCATION_TYPE_REGIONAL"`
     *     // * All proximity location list:
     *     // `locationType="TARGETING_LOCATION_TYPE_PROXIMITY"`
     *     filter: 'placeholder-value',
     *     // Field by which to sort the list.
     *     // Acceptable values are:
     *     //
     *     // * `locationListId` (default)
     *     // * `displayName`
     *     //
     *     // The default sorting order is ascending. To specify descending order for
     *     // a field, a suffix "desc" should be added to the field name. Example:
     *     // `displayName desc`.
     *     orderBy: 'placeholder-value',
     *     // Requested page size. Must be between `1` and `100`.
     *     // Defaults to `100` if not set. Returns error code `INVALID_ARGUMENT` if an
     *     // invalid value is specified.
     *     pageSize: 'placeholder-value',
     *     // A token identifying a page of results the server should return.
     *     //
     *     // Typically, this is the value of
     *     // next_page_token
     *     // returned from the previous call to `ListLocationLists` method.
     *     // If not specified, the first page of results will be returned.
     *     pageToken: 'placeholder-value',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "locationLists": [],
     *   //   "nextPageToken": "my_nextPageToken"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.advertisers.locationLists.list
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.advertiserId Required. The ID of the DV360 advertiser to which the fetched location lists belong.
     * @param {string=} params.filter Allows filtering by location list fields.  Supported syntax:  * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` or `OR` logical operators. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * The operator must be `EQUALS (=)`. * Supported fields:     - `locationType`  Examples:  * All regional location list: `locationType="TARGETING_LOCATION_TYPE_REGIONAL"` * All proximity location list: `locationType="TARGETING_LOCATION_TYPE_PROXIMITY"`
     * @param {string=} params.orderBy Field by which to sort the list. Acceptable values are:  * `locationListId` (default) * `displayName`  The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `displayName desc`.
     * @param {integer=} params.pageSize Requested page size. Must be between `1` and `100`. Defaults to `100` if not set. Returns error code `INVALID_ARGUMENT` if an invalid value is specified.
     * @param {string=} params.pageToken A token identifying a page of results the server should return.  Typically, this is the value of next_page_token returned from the previous call to `ListLocationLists` method. If not specified, the first page of results will be returned.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    list(
      params?: Params$Resource$Advertisers$Locationlists$List,
      options?: MethodOptions
    ): GaxiosPromise<Schema$ListLocationListsResponse>;
    list(
      params: Params$Resource$Advertisers$Locationlists$List,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$ListLocationListsResponse>,
      callback: BodyResponseCallback<Schema$ListLocationListsResponse>
    ): void;
    list(
      params: Params$Resource$Advertisers$Locationlists$List,
      callback: BodyResponseCallback<Schema$ListLocationListsResponse>
    ): void;
    list(
      callback: BodyResponseCallback<Schema$ListLocationListsResponse>
    ): void;
    list(
      paramsOrCallback?:
        | Params$Resource$Advertisers$Locationlists$List
        | BodyResponseCallback<Schema$ListLocationListsResponse>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$ListLocationListsResponse>,
      callback?: BodyResponseCallback<Schema$ListLocationListsResponse>
    ): void | GaxiosPromise<Schema$ListLocationListsResponse> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Advertisers$Locationlists$List;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Advertisers$Locationlists$List;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (
              rootUrl + '/v1/advertisers/{+advertiserId}/locationLists'
            ).replace(/([^:]\/)\/+/g, '$1'),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: ['advertiserId'],
        pathParams: ['advertiserId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$ListLocationListsResponse>(
          parameters,
          callback
        );
      } else {
        return createAPIRequest<Schema$ListLocationListsResponse>(parameters);
      }
    }
  }

  export interface Params$Resource$Advertisers$Locationlists$Get
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required. The ID of the DV360 advertiser to which the fetched location list belongs.
     */
    advertiserId?: string;
    /**
     * Required. The ID of the location list to fetch.
     */
    locationListId?: string;
  }
  export interface Params$Resource$Advertisers$Locationlists$List
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required. The ID of the DV360 advertiser to which the fetched location lists belong.
     */
    advertiserId?: string;
    /**
     * Allows filtering by location list fields.  Supported syntax:  * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` or `OR` logical operators. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * The operator must be `EQUALS (=)`. * Supported fields:     - `locationType`  Examples:  * All regional location list: `locationType="TARGETING_LOCATION_TYPE_REGIONAL"` * All proximity location list: `locationType="TARGETING_LOCATION_TYPE_PROXIMITY"`
     */
    filter?: string;
    /**
     * Field by which to sort the list. Acceptable values are:  * `locationListId` (default) * `displayName`  The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `displayName desc`.
     */
    orderBy?: string;
    /**
     * Requested page size. Must be between `1` and `100`. Defaults to `100` if not set. Returns error code `INVALID_ARGUMENT` if an invalid value is specified.
     */
    pageSize?: number;
    /**
     * A token identifying a page of results the server should return.  Typically, this is the value of next_page_token returned from the previous call to `ListLocationLists` method. If not specified, the first page of results will be returned.
     */
    pageToken?: string;
  }

  export class Resource$Advertisers$Negativekeywordlists {
    context: APIRequestContext;
    constructor(context: APIRequestContext) {
      this.context = context;
    }

    /**
     * displayvideo.advertisers.negativeKeywordLists.get
     * @desc Gets a negative keyword list given an advertiser ID and a negative keyword list ID.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.advertisers.negativeKeywordLists.get({
     *     // Required. The ID of the DV360 advertiser to which the fetched negative keyword list
     *     // belongs.
     *     advertiserId: '[^/]+',
     *     // Required. The ID of the negative keyword list to fetch.
     *     negativeKeywordListId: '[^/]+',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "advertiserId": "my_advertiserId",
     *   //   "displayName": "my_displayName",
     *   //   "name": "my_name",
     *   //   "negativeKeywordListId": "my_negativeKeywordListId"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.advertisers.negativeKeywordLists.get
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.advertiserId Required. The ID of the DV360 advertiser to which the fetched negative keyword list belongs.
     * @param {string} params.negativeKeywordListId Required. The ID of the negative keyword list to fetch.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    get(
      params?: Params$Resource$Advertisers$Negativekeywordlists$Get,
      options?: MethodOptions
    ): GaxiosPromise<Schema$NegativeKeywordList>;
    get(
      params: Params$Resource$Advertisers$Negativekeywordlists$Get,
      options: MethodOptions | BodyResponseCallback<Schema$NegativeKeywordList>,
      callback: BodyResponseCallback<Schema$NegativeKeywordList>
    ): void;
    get(
      params: Params$Resource$Advertisers$Negativekeywordlists$Get,
      callback: BodyResponseCallback<Schema$NegativeKeywordList>
    ): void;
    get(callback: BodyResponseCallback<Schema$NegativeKeywordList>): void;
    get(
      paramsOrCallback?:
        | Params$Resource$Advertisers$Negativekeywordlists$Get
        | BodyResponseCallback<Schema$NegativeKeywordList>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$NegativeKeywordList>,
      callback?: BodyResponseCallback<Schema$NegativeKeywordList>
    ): void | GaxiosPromise<Schema$NegativeKeywordList> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Advertisers$Negativekeywordlists$Get;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Advertisers$Negativekeywordlists$Get;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (
              rootUrl +
              '/v1/advertisers/{+advertiserId}/negativeKeywordLists/{+negativeKeywordListId}'
            ).replace(/([^:]\/)\/+/g, '$1'),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: ['advertiserId', 'negativeKeywordListId'],
        pathParams: ['advertiserId', 'negativeKeywordListId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$NegativeKeywordList>(parameters, callback);
      } else {
        return createAPIRequest<Schema$NegativeKeywordList>(parameters);
      }
    }

    /**
     * displayvideo.advertisers.negativeKeywordLists.list
     * @desc Lists negative keyword lists based on a given advertiser id.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.advertisers.negativeKeywordLists.list({
     *     // Required. The ID of the DV360 advertiser to which the fetched negative keyword lists
     *     // belong.
     *     advertiserId: '[^/]+',
     *     // Requested page size. Must be between `1` and `100`.
     *     // Defaults to `100` if not set. Returns error code `INVALID_ARGUMENT` if an
     *     // invalid value is specified.
     *     pageSize: 'placeholder-value',
     *     // A token identifying a page of results the server should return.
     *     //
     *     // Typically, this is the value of
     *     // next_page_token
     *     // returned from the previous call to `ListNegativeKeywordLists` method.
     *     // If not specified, the first page of results will be returned.
     *     pageToken: 'placeholder-value',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "negativeKeywordLists": [],
     *   //   "nextPageToken": "my_nextPageToken"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.advertisers.negativeKeywordLists.list
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.advertiserId Required. The ID of the DV360 advertiser to which the fetched negative keyword lists belong.
     * @param {integer=} params.pageSize Requested page size. Must be between `1` and `100`. Defaults to `100` if not set. Returns error code `INVALID_ARGUMENT` if an invalid value is specified.
     * @param {string=} params.pageToken A token identifying a page of results the server should return.  Typically, this is the value of next_page_token returned from the previous call to `ListNegativeKeywordLists` method. If not specified, the first page of results will be returned.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    list(
      params?: Params$Resource$Advertisers$Negativekeywordlists$List,
      options?: MethodOptions
    ): GaxiosPromise<Schema$ListNegativeKeywordListsResponse>;
    list(
      params: Params$Resource$Advertisers$Negativekeywordlists$List,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$ListNegativeKeywordListsResponse>,
      callback: BodyResponseCallback<Schema$ListNegativeKeywordListsResponse>
    ): void;
    list(
      params: Params$Resource$Advertisers$Negativekeywordlists$List,
      callback: BodyResponseCallback<Schema$ListNegativeKeywordListsResponse>
    ): void;
    list(
      callback: BodyResponseCallback<Schema$ListNegativeKeywordListsResponse>
    ): void;
    list(
      paramsOrCallback?:
        | Params$Resource$Advertisers$Negativekeywordlists$List
        | BodyResponseCallback<Schema$ListNegativeKeywordListsResponse>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$ListNegativeKeywordListsResponse>,
      callback?: BodyResponseCallback<Schema$ListNegativeKeywordListsResponse>
    ): void | GaxiosPromise<Schema$ListNegativeKeywordListsResponse> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Advertisers$Negativekeywordlists$List;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Advertisers$Negativekeywordlists$List;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (
              rootUrl + '/v1/advertisers/{+advertiserId}/negativeKeywordLists'
            ).replace(/([^:]\/)\/+/g, '$1'),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: ['advertiserId'],
        pathParams: ['advertiserId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$ListNegativeKeywordListsResponse>(
          parameters,
          callback
        );
      } else {
        return createAPIRequest<Schema$ListNegativeKeywordListsResponse>(
          parameters
        );
      }
    }
  }

  export interface Params$Resource$Advertisers$Negativekeywordlists$Get
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required. The ID of the DV360 advertiser to which the fetched negative keyword list belongs.
     */
    advertiserId?: string;
    /**
     * Required. The ID of the negative keyword list to fetch.
     */
    negativeKeywordListId?: string;
  }
  export interface Params$Resource$Advertisers$Negativekeywordlists$List
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required. The ID of the DV360 advertiser to which the fetched negative keyword lists belong.
     */
    advertiserId?: string;
    /**
     * Requested page size. Must be between `1` and `100`. Defaults to `100` if not set. Returns error code `INVALID_ARGUMENT` if an invalid value is specified.
     */
    pageSize?: number;
    /**
     * A token identifying a page of results the server should return.  Typically, this is the value of next_page_token returned from the previous call to `ListNegativeKeywordLists` method. If not specified, the first page of results will be returned.
     */
    pageToken?: string;
  }

  export class Resource$Combinedaudiences {
    context: APIRequestContext;
    constructor(context: APIRequestContext) {
      this.context = context;
    }

    /**
     * displayvideo.combinedAudiences.get
     * @desc Gets a combined audience.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.combinedAudiences.get({
     *     // The ID of the advertiser that has access to the fetched combined
     *     // audience.
     *     advertiserId: 'placeholder-value',
     *     // Required. The ID of the combined audience to fetch.
     *     combinedAudienceId: '[^/]+',
     *     // The ID of the partner that has access to the fetched combined audience.
     *     partnerId: 'placeholder-value',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "combinedAudienceId": "my_combinedAudienceId",
     *   //   "displayName": "my_displayName",
     *   //   "name": "my_name"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.combinedAudiences.get
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string=} params.advertiserId The ID of the advertiser that has access to the fetched combined audience.
     * @param {string} params.combinedAudienceId Required. The ID of the combined audience to fetch.
     * @param {string=} params.partnerId The ID of the partner that has access to the fetched combined audience.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    get(
      params?: Params$Resource$Combinedaudiences$Get,
      options?: MethodOptions
    ): GaxiosPromise<Schema$CombinedAudience>;
    get(
      params: Params$Resource$Combinedaudiences$Get,
      options: MethodOptions | BodyResponseCallback<Schema$CombinedAudience>,
      callback: BodyResponseCallback<Schema$CombinedAudience>
    ): void;
    get(
      params: Params$Resource$Combinedaudiences$Get,
      callback: BodyResponseCallback<Schema$CombinedAudience>
    ): void;
    get(callback: BodyResponseCallback<Schema$CombinedAudience>): void;
    get(
      paramsOrCallback?:
        | Params$Resource$Combinedaudiences$Get
        | BodyResponseCallback<Schema$CombinedAudience>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$CombinedAudience>,
      callback?: BodyResponseCallback<Schema$CombinedAudience>
    ): void | GaxiosPromise<Schema$CombinedAudience> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Combinedaudiences$Get;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Combinedaudiences$Get;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (
              rootUrl + '/v1/combinedAudiences/{+combinedAudienceId}'
            ).replace(/([^:]\/)\/+/g, '$1'),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: ['combinedAudienceId'],
        pathParams: ['combinedAudienceId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$CombinedAudience>(parameters, callback);
      } else {
        return createAPIRequest<Schema$CombinedAudience>(parameters);
      }
    }

    /**
     * displayvideo.combinedAudiences.list
     * @desc Lists combined audiences.  The order is defined by the order_by parameter.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.combinedAudiences.list({
     *     // The ID of the advertiser that has access to the fetched combined
     *     // audiences.
     *     advertiserId: 'placeholder-value',
     *     // Allows filtering by combined audience fields.
     *     //
     *     // Supported syntax:
     *     //
     *     // * Filter expressions for combined audiences currently can only contain at
     *     // most one restriction.
     *     // * A restriction has the form of `{field} {operator} {value}`.
     *     // * The operator must be `CONTAINS (:)`.
     *     // * Supported fields:
     *     //     - `displayName`
     *     //
     *     // Examples:
     *     //
     *     // * All combined audiences for which the display name contains "Google":
     *     // `displayName : "Google"`.
     *     //
     *     // The length of this field should be no more than 500 characters.
     *     filter: 'placeholder-value',
     *     // Field by which to sort the list.
     *     // Acceptable values are:
     *     //
     *     // * `combinedAudienceId` (default)
     *     // * `displayName`
     *     //
     *     // The default sorting order is ascending. To specify descending order for
     *     // a field, a suffix "desc" should be added to the field name. Example:
     *     // `displayName desc`.
     *     orderBy: 'placeholder-value',
     *     // Requested page size. Must be between `1` and `100`. If unspecified will
     *     // default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value
     *     // is specified.
     *     pageSize: 'placeholder-value',
     *     // A token identifying a page of results the server should return.
     *     // Typically, this is the value of
     *     // next_page_token
     *     // returned from the previous call to `ListCombinedAudiences` method.
     *     // If not specified, the first page of results will be returned.
     *     pageToken: 'placeholder-value',
     *     // The ID of the partner that has access to the fetched combined audiences.
     *     partnerId: 'placeholder-value',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "combinedAudiences": [],
     *   //   "nextPageToken": "my_nextPageToken"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.combinedAudiences.list
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string=} params.advertiserId The ID of the advertiser that has access to the fetched combined audiences.
     * @param {string=} params.filter Allows filtering by combined audience fields.  Supported syntax:  * Filter expressions for combined audiences currently can only contain at most one restriction. * A restriction has the form of `{field} {operator} {value}`. * The operator must be `CONTAINS (:)`. * Supported fields:     - `displayName`  Examples:  * All combined audiences for which the display name contains "Google": `displayName : "Google"`.  The length of this field should be no more than 500 characters.
     * @param {string=} params.orderBy Field by which to sort the list. Acceptable values are:  * `combinedAudienceId` (default) * `displayName`  The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `displayName desc`.
     * @param {integer=} params.pageSize Requested page size. Must be between `1` and `100`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified.
     * @param {string=} params.pageToken A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListCombinedAudiences` method. If not specified, the first page of results will be returned.
     * @param {string=} params.partnerId The ID of the partner that has access to the fetched combined audiences.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    list(
      params?: Params$Resource$Combinedaudiences$List,
      options?: MethodOptions
    ): GaxiosPromise<Schema$ListCombinedAudiencesResponse>;
    list(
      params: Params$Resource$Combinedaudiences$List,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$ListCombinedAudiencesResponse>,
      callback: BodyResponseCallback<Schema$ListCombinedAudiencesResponse>
    ): void;
    list(
      params: Params$Resource$Combinedaudiences$List,
      callback: BodyResponseCallback<Schema$ListCombinedAudiencesResponse>
    ): void;
    list(
      callback: BodyResponseCallback<Schema$ListCombinedAudiencesResponse>
    ): void;
    list(
      paramsOrCallback?:
        | Params$Resource$Combinedaudiences$List
        | BodyResponseCallback<Schema$ListCombinedAudiencesResponse>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$ListCombinedAudiencesResponse>,
      callback?: BodyResponseCallback<Schema$ListCombinedAudiencesResponse>
    ): void | GaxiosPromise<Schema$ListCombinedAudiencesResponse> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Combinedaudiences$List;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Combinedaudiences$List;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/combinedAudiences').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: [],
        pathParams: [],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$ListCombinedAudiencesResponse>(
          parameters,
          callback
        );
      } else {
        return createAPIRequest<Schema$ListCombinedAudiencesResponse>(
          parameters
        );
      }
    }
  }

  export interface Params$Resource$Combinedaudiences$Get
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * The ID of the advertiser that has access to the fetched combined audience.
     */
    advertiserId?: string;
    /**
     * Required. The ID of the combined audience to fetch.
     */
    combinedAudienceId?: string;
    /**
     * The ID of the partner that has access to the fetched combined audience.
     */
    partnerId?: string;
  }
  export interface Params$Resource$Combinedaudiences$List
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * The ID of the advertiser that has access to the fetched combined audiences.
     */
    advertiserId?: string;
    /**
     * Allows filtering by combined audience fields.  Supported syntax:  * Filter expressions for combined audiences currently can only contain at most one restriction. * A restriction has the form of `{field} {operator} {value}`. * The operator must be `CONTAINS (:)`. * Supported fields:     - `displayName`  Examples:  * All combined audiences for which the display name contains "Google": `displayName : "Google"`.  The length of this field should be no more than 500 characters.
     */
    filter?: string;
    /**
     * Field by which to sort the list. Acceptable values are:  * `combinedAudienceId` (default) * `displayName`  The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `displayName desc`.
     */
    orderBy?: string;
    /**
     * Requested page size. Must be between `1` and `100`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified.
     */
    pageSize?: number;
    /**
     * A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListCombinedAudiences` method. If not specified, the first page of results will be returned.
     */
    pageToken?: string;
    /**
     * The ID of the partner that has access to the fetched combined audiences.
     */
    partnerId?: string;
  }

  export class Resource$Customlists {
    context: APIRequestContext;
    constructor(context: APIRequestContext) {
      this.context = context;
    }

    /**
     * displayvideo.customLists.get
     * @desc Gets a custom list.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.customLists.get({
     *     // The ID of the DV360 advertiser that has access to the fetched custom
     *     // lists.
     *     advertiserId: 'placeholder-value',
     *     // Required. The ID of the custom list to fetch.
     *     customListId: '[^/]+',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "customListId": "my_customListId",
     *   //   "displayName": "my_displayName",
     *   //   "name": "my_name"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.customLists.get
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string=} params.advertiserId The ID of the DV360 advertiser that has access to the fetched custom lists.
     * @param {string} params.customListId Required. The ID of the custom list to fetch.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    get(
      params?: Params$Resource$Customlists$Get,
      options?: MethodOptions
    ): GaxiosPromise<Schema$CustomList>;
    get(
      params: Params$Resource$Customlists$Get,
      options: MethodOptions | BodyResponseCallback<Schema$CustomList>,
      callback: BodyResponseCallback<Schema$CustomList>
    ): void;
    get(
      params: Params$Resource$Customlists$Get,
      callback: BodyResponseCallback<Schema$CustomList>
    ): void;
    get(callback: BodyResponseCallback<Schema$CustomList>): void;
    get(
      paramsOrCallback?:
        | Params$Resource$Customlists$Get
        | BodyResponseCallback<Schema$CustomList>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$CustomList>,
      callback?: BodyResponseCallback<Schema$CustomList>
    ): void | GaxiosPromise<Schema$CustomList> {
      let params = (paramsOrCallback || {}) as Params$Resource$Customlists$Get;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Customlists$Get;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/customLists/{+customListId}').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: ['customListId'],
        pathParams: ['customListId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$CustomList>(parameters, callback);
      } else {
        return createAPIRequest<Schema$CustomList>(parameters);
      }
    }

    /**
     * displayvideo.customLists.list
     * @desc Lists custom lists.  The order is defined by the order_by parameter.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.customLists.list({
     *     // The ID of the DV360 advertiser that has access to the fetched custom
     *     // lists.
     *     advertiserId: 'placeholder-value',
     *     // Allows filtering by custom list fields.
     *     //
     *     // Supported syntax:
     *     //
     *     // * Filter expressions for custom lists currently can only contain at
     *     // most one restriction.
     *     // * A restriction has the form of `{field} {operator} {value}`.
     *     // * The operator must be `CONTAINS (:)`.
     *     // * Supported fields:
     *     //     - `displayName`
     *     //
     *     // Examples:
     *     //
     *     // * All custom lists for which the display name contains "Google":
     *     // `displayName : "Google"`.
     *     //
     *     // The length of this field should be no more than 500 characters.
     *     filter: 'placeholder-value',
     *     // Field by which to sort the list.
     *     // Acceptable values are:
     *     //
     *     // * `customListId` (default)
     *     // * `displayName`
     *     //
     *     // The default sorting order is ascending. To specify descending order for
     *     // a field, a suffix "desc" should be added to the field name. Example:
     *     // `displayName desc`.
     *     orderBy: 'placeholder-value',
     *     // Requested page size. Must be between `1` and `100`. If unspecified will
     *     // default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value
     *     // is specified.
     *     pageSize: 'placeholder-value',
     *     // A token identifying a page of results the server should return.
     *     // Typically, this is the value of
     *     // next_page_token
     *     // returned from the previous call to `ListCustomLists` method.
     *     // If not specified, the first page of results will be returned.
     *     pageToken: 'placeholder-value',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "customLists": [],
     *   //   "nextPageToken": "my_nextPageToken"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.customLists.list
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string=} params.advertiserId The ID of the DV360 advertiser that has access to the fetched custom lists.
     * @param {string=} params.filter Allows filtering by custom list fields.  Supported syntax:  * Filter expressions for custom lists currently can only contain at most one restriction. * A restriction has the form of `{field} {operator} {value}`. * The operator must be `CONTAINS (:)`. * Supported fields:     - `displayName`  Examples:  * All custom lists for which the display name contains "Google": `displayName : "Google"`.  The length of this field should be no more than 500 characters.
     * @param {string=} params.orderBy Field by which to sort the list. Acceptable values are:  * `customListId` (default) * `displayName`  The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `displayName desc`.
     * @param {integer=} params.pageSize Requested page size. Must be between `1` and `100`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified.
     * @param {string=} params.pageToken A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListCustomLists` method. If not specified, the first page of results will be returned.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    list(
      params?: Params$Resource$Customlists$List,
      options?: MethodOptions
    ): GaxiosPromise<Schema$ListCustomListsResponse>;
    list(
      params: Params$Resource$Customlists$List,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$ListCustomListsResponse>,
      callback: BodyResponseCallback<Schema$ListCustomListsResponse>
    ): void;
    list(
      params: Params$Resource$Customlists$List,
      callback: BodyResponseCallback<Schema$ListCustomListsResponse>
    ): void;
    list(callback: BodyResponseCallback<Schema$ListCustomListsResponse>): void;
    list(
      paramsOrCallback?:
        | Params$Resource$Customlists$List
        | BodyResponseCallback<Schema$ListCustomListsResponse>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$ListCustomListsResponse>,
      callback?: BodyResponseCallback<Schema$ListCustomListsResponse>
    ): void | GaxiosPromise<Schema$ListCustomListsResponse> {
      let params = (paramsOrCallback || {}) as Params$Resource$Customlists$List;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Customlists$List;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/customLists').replace(/([^:]\/)\/+/g, '$1'),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: [],
        pathParams: [],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$ListCustomListsResponse>(parameters, callback);
      } else {
        return createAPIRequest<Schema$ListCustomListsResponse>(parameters);
      }
    }
  }

  export interface Params$Resource$Customlists$Get extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * The ID of the DV360 advertiser that has access to the fetched custom lists.
     */
    advertiserId?: string;
    /**
     * Required. The ID of the custom list to fetch.
     */
    customListId?: string;
  }
  export interface Params$Resource$Customlists$List extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * The ID of the DV360 advertiser that has access to the fetched custom lists.
     */
    advertiserId?: string;
    /**
     * Allows filtering by custom list fields.  Supported syntax:  * Filter expressions for custom lists currently can only contain at most one restriction. * A restriction has the form of `{field} {operator} {value}`. * The operator must be `CONTAINS (:)`. * Supported fields:     - `displayName`  Examples:  * All custom lists for which the display name contains "Google": `displayName : "Google"`.  The length of this field should be no more than 500 characters.
     */
    filter?: string;
    /**
     * Field by which to sort the list. Acceptable values are:  * `customListId` (default) * `displayName`  The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `displayName desc`.
     */
    orderBy?: string;
    /**
     * Requested page size. Must be between `1` and `100`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified.
     */
    pageSize?: number;
    /**
     * A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListCustomLists` method. If not specified, the first page of results will be returned.
     */
    pageToken?: string;
  }

  export class Resource$Firstandthirdpartyaudiences {
    context: APIRequestContext;
    constructor(context: APIRequestContext) {
      this.context = context;
    }

    /**
     * displayvideo.firstAndThirdPartyAudiences.get
     * @desc Gets a first and third party audience.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.firstAndThirdPartyAudiences.get({
     *     // The ID of the advertiser that has access to the fetched first and
     *     // third party audience.
     *     advertiserId: 'placeholder-value',
     *     // Required. The ID of the first and third party audience to fetch.
     *     firstAndThirdPartyAudienceId: '[^/]+',
     *     // The ID of the partner that has access to the fetched first and
     *     // third party audience.
     *     partnerId: 'placeholder-value',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "displayName": "my_displayName",
     *   //   "firstAndThirdPartyAudienceId": "my_firstAndThirdPartyAudienceId",
     *   //   "firstAndThirdPartyAudienceType": "my_firstAndThirdPartyAudienceType",
     *   //   "name": "my_name"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.firstAndThirdPartyAudiences.get
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string=} params.advertiserId The ID of the advertiser that has access to the fetched first and third party audience.
     * @param {string} params.firstAndThirdPartyAudienceId Required. The ID of the first and third party audience to fetch.
     * @param {string=} params.partnerId The ID of the partner that has access to the fetched first and third party audience.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    get(
      params?: Params$Resource$Firstandthirdpartyaudiences$Get,
      options?: MethodOptions
    ): GaxiosPromise<Schema$FirstAndThirdPartyAudience>;
    get(
      params: Params$Resource$Firstandthirdpartyaudiences$Get,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$FirstAndThirdPartyAudience>,
      callback: BodyResponseCallback<Schema$FirstAndThirdPartyAudience>
    ): void;
    get(
      params: Params$Resource$Firstandthirdpartyaudiences$Get,
      callback: BodyResponseCallback<Schema$FirstAndThirdPartyAudience>
    ): void;
    get(
      callback: BodyResponseCallback<Schema$FirstAndThirdPartyAudience>
    ): void;
    get(
      paramsOrCallback?:
        | Params$Resource$Firstandthirdpartyaudiences$Get
        | BodyResponseCallback<Schema$FirstAndThirdPartyAudience>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$FirstAndThirdPartyAudience>,
      callback?: BodyResponseCallback<Schema$FirstAndThirdPartyAudience>
    ): void | GaxiosPromise<Schema$FirstAndThirdPartyAudience> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Firstandthirdpartyaudiences$Get;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Firstandthirdpartyaudiences$Get;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (
              rootUrl +
              '/v1/firstAndThirdPartyAudiences/{+firstAndThirdPartyAudienceId}'
            ).replace(/([^:]\/)\/+/g, '$1'),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: ['firstAndThirdPartyAudienceId'],
        pathParams: ['firstAndThirdPartyAudienceId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$FirstAndThirdPartyAudience>(
          parameters,
          callback
        );
      } else {
        return createAPIRequest<Schema$FirstAndThirdPartyAudience>(parameters);
      }
    }

    /**
     * displayvideo.firstAndThirdPartyAudiences.list
     * @desc Lists first and third party audiences.  The order is defined by the order_by parameter.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.firstAndThirdPartyAudiences.list({
     *     // The ID of the advertiser that has access to the fetched first and
     *     // third party audiences.
     *     advertiserId: 'placeholder-value',
     *     // Allows filtering by first and third party audience fields.
     *     //
     *     // Supported syntax:
     *     //
     *     // * Filter expressions for first and third party audiences currently can
     *     // only contain at most one restriction.
     *     // * A restriction has the form of `{field} {operator} {value}`.
     *     // * The operator must be `CONTAINS (:)`.
     *     // * Supported fields:
     *     //     - `displayName`
     *     //
     *     // Examples:
     *     //
     *     // * All first and third party audiences for which the display name contains
     *     // "Google": `displayName : "Google"`.
     *     //
     *     // The length of this field should be no more than 500 characters.
     *     filter: 'placeholder-value',
     *     // Field by which to sort the list.
     *     // Acceptable values are:
     *     //
     *     // * `firstAndThirdPartyAudienceId` (default)
     *     // * `displayName`
     *     //
     *     // The default sorting order is ascending. To specify descending order for
     *     // a field, a suffix "desc" should be added to the field name. Example:
     *     // `displayName desc`.
     *     orderBy: 'placeholder-value',
     *     // Requested page size. Must be between `1` and `100`. If unspecified will
     *     // default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value
     *     // is specified.
     *     pageSize: 'placeholder-value',
     *     // A token identifying a page of results the server should return.
     *     // Typically, this is the value of
     *     // next_page_token
     *     // returned from the previous call to `ListFirstAndThirdPartyAudiences`
     *     // method. If not specified, the first page of results will be returned.
     *     pageToken: 'placeholder-value',
     *     // The ID of the partner that has access to the fetched first and
     *     // third party audiences.
     *     partnerId: 'placeholder-value',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "firstAndThirdPartyAudiences": [],
     *   //   "nextPageToken": "my_nextPageToken"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.firstAndThirdPartyAudiences.list
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string=} params.advertiserId The ID of the advertiser that has access to the fetched first and third party audiences.
     * @param {string=} params.filter Allows filtering by first and third party audience fields.  Supported syntax:  * Filter expressions for first and third party audiences currently can only contain at most one restriction. * A restriction has the form of `{field} {operator} {value}`. * The operator must be `CONTAINS (:)`. * Supported fields:     - `displayName`  Examples:  * All first and third party audiences for which the display name contains "Google": `displayName : "Google"`.  The length of this field should be no more than 500 characters.
     * @param {string=} params.orderBy Field by which to sort the list. Acceptable values are:  * `firstAndThirdPartyAudienceId` (default) * `displayName`  The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `displayName desc`.
     * @param {integer=} params.pageSize Requested page size. Must be between `1` and `100`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified.
     * @param {string=} params.pageToken A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListFirstAndThirdPartyAudiences` method. If not specified, the first page of results will be returned.
     * @param {string=} params.partnerId The ID of the partner that has access to the fetched first and third party audiences.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    list(
      params?: Params$Resource$Firstandthirdpartyaudiences$List,
      options?: MethodOptions
    ): GaxiosPromise<Schema$ListFirstAndThirdPartyAudiencesResponse>;
    list(
      params: Params$Resource$Firstandthirdpartyaudiences$List,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$ListFirstAndThirdPartyAudiencesResponse>,
      callback: BodyResponseCallback<
        Schema$ListFirstAndThirdPartyAudiencesResponse
      >
    ): void;
    list(
      params: Params$Resource$Firstandthirdpartyaudiences$List,
      callback: BodyResponseCallback<
        Schema$ListFirstAndThirdPartyAudiencesResponse
      >
    ): void;
    list(
      callback: BodyResponseCallback<
        Schema$ListFirstAndThirdPartyAudiencesResponse
      >
    ): void;
    list(
      paramsOrCallback?:
        | Params$Resource$Firstandthirdpartyaudiences$List
        | BodyResponseCallback<Schema$ListFirstAndThirdPartyAudiencesResponse>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$ListFirstAndThirdPartyAudiencesResponse>,
      callback?: BodyResponseCallback<
        Schema$ListFirstAndThirdPartyAudiencesResponse
      >
    ): void | GaxiosPromise<Schema$ListFirstAndThirdPartyAudiencesResponse> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Firstandthirdpartyaudiences$List;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Firstandthirdpartyaudiences$List;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/firstAndThirdPartyAudiences').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: [],
        pathParams: [],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$ListFirstAndThirdPartyAudiencesResponse>(
          parameters,
          callback
        );
      } else {
        return createAPIRequest<Schema$ListFirstAndThirdPartyAudiencesResponse>(
          parameters
        );
      }
    }
  }

  export interface Params$Resource$Firstandthirdpartyaudiences$Get
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * The ID of the advertiser that has access to the fetched first and third party audience.
     */
    advertiserId?: string;
    /**
     * Required. The ID of the first and third party audience to fetch.
     */
    firstAndThirdPartyAudienceId?: string;
    /**
     * The ID of the partner that has access to the fetched first and third party audience.
     */
    partnerId?: string;
  }
  export interface Params$Resource$Firstandthirdpartyaudiences$List
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * The ID of the advertiser that has access to the fetched first and third party audiences.
     */
    advertiserId?: string;
    /**
     * Allows filtering by first and third party audience fields.  Supported syntax:  * Filter expressions for first and third party audiences currently can only contain at most one restriction. * A restriction has the form of `{field} {operator} {value}`. * The operator must be `CONTAINS (:)`. * Supported fields:     - `displayName`  Examples:  * All first and third party audiences for which the display name contains "Google": `displayName : "Google"`.  The length of this field should be no more than 500 characters.
     */
    filter?: string;
    /**
     * Field by which to sort the list. Acceptable values are:  * `firstAndThirdPartyAudienceId` (default) * `displayName`  The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `displayName desc`.
     */
    orderBy?: string;
    /**
     * Requested page size. Must be between `1` and `100`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified.
     */
    pageSize?: number;
    /**
     * A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListFirstAndThirdPartyAudiences` method. If not specified, the first page of results will be returned.
     */
    pageToken?: string;
    /**
     * The ID of the partner that has access to the fetched first and third party audiences.
     */
    partnerId?: string;
  }

  export class Resource$Floodlightgroups {
    context: APIRequestContext;
    constructor(context: APIRequestContext) {
      this.context = context;
    }

    /**
     * displayvideo.floodlightGroups.get
     * @desc Gets a Floodlight group.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.floodlightGroups.get({
     *     // Required. The ID of the Floodlight group to fetch.
     *     floodlightGroupId: '[^/]+',
     *     // Required. The partner context by which the Floodlight group is being accessed.
     *     partnerId: 'placeholder-value',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "activeViewConfig": {},
     *   //   "customVariables": {},
     *   //   "displayName": "my_displayName",
     *   //   "floodlightGroupId": "my_floodlightGroupId",
     *   //   "lookbackWindow": {},
     *   //   "name": "my_name",
     *   //   "webTagType": "my_webTagType"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.floodlightGroups.get
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.floodlightGroupId Required. The ID of the Floodlight group to fetch.
     * @param {string=} params.partnerId Required. The partner context by which the Floodlight group is being accessed.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    get(
      params?: Params$Resource$Floodlightgroups$Get,
      options?: MethodOptions
    ): GaxiosPromise<Schema$FloodlightGroup>;
    get(
      params: Params$Resource$Floodlightgroups$Get,
      options: MethodOptions | BodyResponseCallback<Schema$FloodlightGroup>,
      callback: BodyResponseCallback<Schema$FloodlightGroup>
    ): void;
    get(
      params: Params$Resource$Floodlightgroups$Get,
      callback: BodyResponseCallback<Schema$FloodlightGroup>
    ): void;
    get(callback: BodyResponseCallback<Schema$FloodlightGroup>): void;
    get(
      paramsOrCallback?:
        | Params$Resource$Floodlightgroups$Get
        | BodyResponseCallback<Schema$FloodlightGroup>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$FloodlightGroup>,
      callback?: BodyResponseCallback<Schema$FloodlightGroup>
    ): void | GaxiosPromise<Schema$FloodlightGroup> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Floodlightgroups$Get;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Floodlightgroups$Get;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (
              rootUrl + '/v1/floodlightGroups/{+floodlightGroupId}'
            ).replace(/([^:]\/)\/+/g, '$1'),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: ['floodlightGroupId'],
        pathParams: ['floodlightGroupId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$FloodlightGroup>(parameters, callback);
      } else {
        return createAPIRequest<Schema$FloodlightGroup>(parameters);
      }
    }

    /**
     * displayvideo.floodlightGroups.patch
     * @desc Updates an existing Floodlight group. Returns the updated Floodlight group if successful.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.floodlightGroups.patch({
     *     // Output only. The unique ID of the Floodlight group. Assigned by the system.
     *     floodlightGroupId: 'placeholder-value',
     *     // Required. The partner context by which the Floodlight group is being accessed.
     *     partnerId: 'placeholder-value',
     *     // Required. The mask to control which fields to update.
     *     updateMask: 'placeholder-value',
     *
     *     // Request body metadata
     *     requestBody: {
     *       // request body parameters
     *       // {
     *       //   "activeViewConfig": {},
     *       //   "customVariables": {},
     *       //   "displayName": "my_displayName",
     *       //   "floodlightGroupId": "my_floodlightGroupId",
     *       //   "lookbackWindow": {},
     *       //   "name": "my_name",
     *       //   "webTagType": "my_webTagType"
     *       // }
     *     },
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "activeViewConfig": {},
     *   //   "customVariables": {},
     *   //   "displayName": "my_displayName",
     *   //   "floodlightGroupId": "my_floodlightGroupId",
     *   //   "lookbackWindow": {},
     *   //   "name": "my_name",
     *   //   "webTagType": "my_webTagType"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.floodlightGroups.patch
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.floodlightGroupId Output only. The unique ID of the Floodlight group. Assigned by the system.
     * @param {string=} params.partnerId Required. The partner context by which the Floodlight group is being accessed.
     * @param {string=} params.updateMask Required. The mask to control which fields to update.
     * @param {().FloodlightGroup} params.requestBody Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    patch(
      params?: Params$Resource$Floodlightgroups$Patch,
      options?: MethodOptions
    ): GaxiosPromise<Schema$FloodlightGroup>;
    patch(
      params: Params$Resource$Floodlightgroups$Patch,
      options: MethodOptions | BodyResponseCallback<Schema$FloodlightGroup>,
      callback: BodyResponseCallback<Schema$FloodlightGroup>
    ): void;
    patch(
      params: Params$Resource$Floodlightgroups$Patch,
      callback: BodyResponseCallback<Schema$FloodlightGroup>
    ): void;
    patch(callback: BodyResponseCallback<Schema$FloodlightGroup>): void;
    patch(
      paramsOrCallback?:
        | Params$Resource$Floodlightgroups$Patch
        | BodyResponseCallback<Schema$FloodlightGroup>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$FloodlightGroup>,
      callback?: BodyResponseCallback<Schema$FloodlightGroup>
    ): void | GaxiosPromise<Schema$FloodlightGroup> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Floodlightgroups$Patch;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Floodlightgroups$Patch;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/floodlightGroups/{floodlightGroupId}').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'PATCH',
          },
          options
        ),
        params,
        requiredParams: ['floodlightGroupId'],
        pathParams: ['floodlightGroupId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$FloodlightGroup>(parameters, callback);
      } else {
        return createAPIRequest<Schema$FloodlightGroup>(parameters);
      }
    }
  }

  export interface Params$Resource$Floodlightgroups$Get
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required. The ID of the Floodlight group to fetch.
     */
    floodlightGroupId?: string;
    /**
     * Required. The partner context by which the Floodlight group is being accessed.
     */
    partnerId?: string;
  }
  export interface Params$Resource$Floodlightgroups$Patch
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Output only. The unique ID of the Floodlight group. Assigned by the system.
     */
    floodlightGroupId?: string;
    /**
     * Required. The partner context by which the Floodlight group is being accessed.
     */
    partnerId?: string;
    /**
     * Required. The mask to control which fields to update.
     */
    updateMask?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$FloodlightGroup;
  }

  export class Resource$Googleaudiences {
    context: APIRequestContext;
    constructor(context: APIRequestContext) {
      this.context = context;
    }

    /**
     * displayvideo.googleAudiences.get
     * @desc Gets a Google audience.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.googleAudiences.get({
     *     // The ID of the advertiser that has access to the fetched Google audience.
     *     advertiserId: 'placeholder-value',
     *     // Required. The ID of the Google audience to fetch.
     *     googleAudienceId: '[^/]+',
     *     // The ID of the partner that has access to the fetched Google audience.
     *     partnerId: 'placeholder-value',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "displayName": "my_displayName",
     *   //   "googleAudienceId": "my_googleAudienceId",
     *   //   "googleAudienceType": "my_googleAudienceType",
     *   //   "name": "my_name"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.googleAudiences.get
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string=} params.advertiserId The ID of the advertiser that has access to the fetched Google audience.
     * @param {string} params.googleAudienceId Required. The ID of the Google audience to fetch.
     * @param {string=} params.partnerId The ID of the partner that has access to the fetched Google audience.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    get(
      params?: Params$Resource$Googleaudiences$Get,
      options?: MethodOptions
    ): GaxiosPromise<Schema$GoogleAudience>;
    get(
      params: Params$Resource$Googleaudiences$Get,
      options: MethodOptions | BodyResponseCallback<Schema$GoogleAudience>,
      callback: BodyResponseCallback<Schema$GoogleAudience>
    ): void;
    get(
      params: Params$Resource$Googleaudiences$Get,
      callback: BodyResponseCallback<Schema$GoogleAudience>
    ): void;
    get(callback: BodyResponseCallback<Schema$GoogleAudience>): void;
    get(
      paramsOrCallback?:
        | Params$Resource$Googleaudiences$Get
        | BodyResponseCallback<Schema$GoogleAudience>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$GoogleAudience>,
      callback?: BodyResponseCallback<Schema$GoogleAudience>
    ): void | GaxiosPromise<Schema$GoogleAudience> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Googleaudiences$Get;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Googleaudiences$Get;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/googleAudiences/{+googleAudienceId}').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: ['googleAudienceId'],
        pathParams: ['googleAudienceId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$GoogleAudience>(parameters, callback);
      } else {
        return createAPIRequest<Schema$GoogleAudience>(parameters);
      }
    }

    /**
     * displayvideo.googleAudiences.list
     * @desc Lists Google audiences.  The order is defined by the order_by parameter.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.googleAudiences.list({
     *     // The ID of the advertiser that has access to the fetched Google audiences.
     *     advertiserId: 'placeholder-value',
     *     // Allows filtering by Google audience fields.
     *     //
     *     // Supported syntax:
     *     //
     *     // * Filter expressions for Google audiences currently can only contain at
     *     // most one restriction.
     *     // * A restriction has the form of `{field} {operator} {value}`.
     *     // * The operator must be `CONTAINS (:)`.
     *     // * Supported fields:
     *     //     - `displayName`
     *     //
     *     // Examples:
     *     //
     *     // * All Google audiences for which the display name contains "Google":
     *     // `displayName : "Google"`.
     *     //
     *     // The length of this field should be no more than 500 characters.
     *     filter: 'placeholder-value',
     *     // Field by which to sort the list.
     *     // Acceptable values are:
     *     //
     *     // * `googleAudienceId` (default)
     *     // * `displayName`
     *     //
     *     // The default sorting order is ascending. To specify descending order for
     *     // a field, a suffix "desc" should be added to the field name. Example:
     *     // `displayName desc`.
     *     orderBy: 'placeholder-value',
     *     // Requested page size. Must be between `1` and `100`. If unspecified will
     *     // default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value
     *     // is specified.
     *     pageSize: 'placeholder-value',
     *     // A token identifying a page of results the server should return.
     *     // Typically, this is the value of
     *     // next_page_token
     *     // returned from the previous call to `ListGoogleAudiences` method.
     *     // If not specified, the first page of results will be returned.
     *     pageToken: 'placeholder-value',
     *     // The ID of the partner that has access to the fetched Google audiences.
     *     partnerId: 'placeholder-value',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "googleAudiences": [],
     *   //   "nextPageToken": "my_nextPageToken"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.googleAudiences.list
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string=} params.advertiserId The ID of the advertiser that has access to the fetched Google audiences.
     * @param {string=} params.filter Allows filtering by Google audience fields.  Supported syntax:  * Filter expressions for Google audiences currently can only contain at most one restriction. * A restriction has the form of `{field} {operator} {value}`. * The operator must be `CONTAINS (:)`. * Supported fields:     - `displayName`  Examples:  * All Google audiences for which the display name contains "Google": `displayName : "Google"`.  The length of this field should be no more than 500 characters.
     * @param {string=} params.orderBy Field by which to sort the list. Acceptable values are:  * `googleAudienceId` (default) * `displayName`  The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `displayName desc`.
     * @param {integer=} params.pageSize Requested page size. Must be between `1` and `100`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified.
     * @param {string=} params.pageToken A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListGoogleAudiences` method. If not specified, the first page of results will be returned.
     * @param {string=} params.partnerId The ID of the partner that has access to the fetched Google audiences.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    list(
      params?: Params$Resource$Googleaudiences$List,
      options?: MethodOptions
    ): GaxiosPromise<Schema$ListGoogleAudiencesResponse>;
    list(
      params: Params$Resource$Googleaudiences$List,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$ListGoogleAudiencesResponse>,
      callback: BodyResponseCallback<Schema$ListGoogleAudiencesResponse>
    ): void;
    list(
      params: Params$Resource$Googleaudiences$List,
      callback: BodyResponseCallback<Schema$ListGoogleAudiencesResponse>
    ): void;
    list(
      callback: BodyResponseCallback<Schema$ListGoogleAudiencesResponse>
    ): void;
    list(
      paramsOrCallback?:
        | Params$Resource$Googleaudiences$List
        | BodyResponseCallback<Schema$ListGoogleAudiencesResponse>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$ListGoogleAudiencesResponse>,
      callback?: BodyResponseCallback<Schema$ListGoogleAudiencesResponse>
    ): void | GaxiosPromise<Schema$ListGoogleAudiencesResponse> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Googleaudiences$List;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Googleaudiences$List;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/googleAudiences').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: [],
        pathParams: [],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$ListGoogleAudiencesResponse>(
          parameters,
          callback
        );
      } else {
        return createAPIRequest<Schema$ListGoogleAudiencesResponse>(parameters);
      }
    }
  }

  export interface Params$Resource$Googleaudiences$Get
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * The ID of the advertiser that has access to the fetched Google audience.
     */
    advertiserId?: string;
    /**
     * Required. The ID of the Google audience to fetch.
     */
    googleAudienceId?: string;
    /**
     * The ID of the partner that has access to the fetched Google audience.
     */
    partnerId?: string;
  }
  export interface Params$Resource$Googleaudiences$List
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * The ID of the advertiser that has access to the fetched Google audiences.
     */
    advertiserId?: string;
    /**
     * Allows filtering by Google audience fields.  Supported syntax:  * Filter expressions for Google audiences currently can only contain at most one restriction. * A restriction has the form of `{field} {operator} {value}`. * The operator must be `CONTAINS (:)`. * Supported fields:     - `displayName`  Examples:  * All Google audiences for which the display name contains "Google": `displayName : "Google"`.  The length of this field should be no more than 500 characters.
     */
    filter?: string;
    /**
     * Field by which to sort the list. Acceptable values are:  * `googleAudienceId` (default) * `displayName`  The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `displayName desc`.
     */
    orderBy?: string;
    /**
     * Requested page size. Must be between `1` and `100`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified.
     */
    pageSize?: number;
    /**
     * A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListGoogleAudiences` method. If not specified, the first page of results will be returned.
     */
    pageToken?: string;
    /**
     * The ID of the partner that has access to the fetched Google audiences.
     */
    partnerId?: string;
  }

  export class Resource$Inventorysourcegroups {
    context: APIRequestContext;
    constructor(context: APIRequestContext) {
      this.context = context;
    }

    /**
     * displayvideo.inventorySourceGroups.get
     * @desc Gets an inventory source group.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.inventorySourceGroups.get({
     *     // The ID of the advertiser that has access to the inventory source group.
     *     //
     *     // If an inventory source group is partner-owned, only advertisers to which
     *     // the group is explicitly shared can access the group.
     *     advertiserId: 'placeholder-value',
     *     // Required. The ID of the inventory source group to fetch.
     *     inventorySourceGroupId: '[^/]+',
     *     // The ID of the partner that has access to the inventory source group.
     *     //
     *     // A partner cannot access an advertiser-owned inventory source group.
     *     partnerId: 'placeholder-value',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "displayName": "my_displayName",
     *   //   "inventorySourceGroupId": "my_inventorySourceGroupId",
     *   //   "name": "my_name"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.inventorySourceGroups.get
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string=} params.advertiserId The ID of the advertiser that has access to the inventory source group.  If an inventory source group is partner-owned, only advertisers to which the group is explicitly shared can access the group.
     * @param {string} params.inventorySourceGroupId Required. The ID of the inventory source group to fetch.
     * @param {string=} params.partnerId The ID of the partner that has access to the inventory source group.  A partner cannot access an advertiser-owned inventory source group.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    get(
      params?: Params$Resource$Inventorysourcegroups$Get,
      options?: MethodOptions
    ): GaxiosPromise<Schema$InventorySourceGroup>;
    get(
      params: Params$Resource$Inventorysourcegroups$Get,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$InventorySourceGroup>,
      callback: BodyResponseCallback<Schema$InventorySourceGroup>
    ): void;
    get(
      params: Params$Resource$Inventorysourcegroups$Get,
      callback: BodyResponseCallback<Schema$InventorySourceGroup>
    ): void;
    get(callback: BodyResponseCallback<Schema$InventorySourceGroup>): void;
    get(
      paramsOrCallback?:
        | Params$Resource$Inventorysourcegroups$Get
        | BodyResponseCallback<Schema$InventorySourceGroup>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$InventorySourceGroup>,
      callback?: BodyResponseCallback<Schema$InventorySourceGroup>
    ): void | GaxiosPromise<Schema$InventorySourceGroup> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Inventorysourcegroups$Get;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Inventorysourcegroups$Get;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (
              rootUrl + '/v1/inventorySourceGroups/{+inventorySourceGroupId}'
            ).replace(/([^:]\/)\/+/g, '$1'),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: ['inventorySourceGroupId'],
        pathParams: ['inventorySourceGroupId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$InventorySourceGroup>(parameters, callback);
      } else {
        return createAPIRequest<Schema$InventorySourceGroup>(parameters);
      }
    }

    /**
     * displayvideo.inventorySourceGroups.list
     * @desc Lists inventory source groups that are accessible to the current user.  The order is defined by the order_by parameter.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.inventorySourceGroups.list({
     *     // The ID of the advertiser that has access to the inventory source group.
     *     //
     *     // If an inventory source group is partner-owned, only advertisers to which
     *     // the group is explicitly shared can access the group.
     *     advertiserId: 'placeholder-value',
     *     // Allows filtering by inventory source group properties.
     *     //
     *     // Supported syntax:
     *     //
     *     // * Filter expressions are made up of one or more restrictions.
     *     // * Restrictions can be combined by the logical operator `OR`.
     *     // * A restriction has the form of `{field} {operator} {value}`.
     *     // * The operator must be `EQUALS (=)`.
     *     // * Supported fields:
     *     //     - `inventorySourceGroupId`
     *     //
     *     // The length of this field should be no more than 500 characters.
     *     filter: 'placeholder-value',
     *     // Field by which to sort the list.
     *     // Acceptable values are:
     *     //
     *     // * `displayName` (default)
     *     // * `inventorySourceGroupId`
     *     //
     *     // The default sorting order is ascending. To specify descending order for
     *     // a field, a suffix "desc" should be added to the field name. For example,
     *     // `displayName desc`.
     *     orderBy: 'placeholder-value',
     *     // Requested page size. Must be between `1` and `100`. If unspecified will
     *     // default to `100`.
     *     pageSize: 'placeholder-value',
     *     // A token identifying a page of results the server should return.
     *     // Typically, this is the value of
     *     // next_page_token
     *     // returned from the previous call to `ListInventorySources` method.
     *     // If not specified, the first page of results will be returned.
     *     pageToken: 'placeholder-value',
     *     // The ID of the partner that has access to the inventory source group.
     *     //
     *     // A partner cannot access advertiser-owned inventory source groups.
     *     partnerId: 'placeholder-value',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "inventorySourceGroups": [],
     *   //   "nextPageToken": "my_nextPageToken"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.inventorySourceGroups.list
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string=} params.advertiserId The ID of the advertiser that has access to the inventory source group.  If an inventory source group is partner-owned, only advertisers to which the group is explicitly shared can access the group.
     * @param {string=} params.filter Allows filtering by inventory source group properties.  Supported syntax:  * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by the logical operator `OR`. * A restriction has the form of `{field} {operator} {value}`. * The operator must be `EQUALS (=)`. * Supported fields:     - `inventorySourceGroupId`  The length of this field should be no more than 500 characters.
     * @param {string=} params.orderBy Field by which to sort the list. Acceptable values are:  * `displayName` (default) * `inventorySourceGroupId`  The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. For example, `displayName desc`.
     * @param {integer=} params.pageSize Requested page size. Must be between `1` and `100`. If unspecified will default to `100`.
     * @param {string=} params.pageToken A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListInventorySources` method. If not specified, the first page of results will be returned.
     * @param {string=} params.partnerId The ID of the partner that has access to the inventory source group.  A partner cannot access advertiser-owned inventory source groups.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    list(
      params?: Params$Resource$Inventorysourcegroups$List,
      options?: MethodOptions
    ): GaxiosPromise<Schema$ListInventorySourceGroupsResponse>;
    list(
      params: Params$Resource$Inventorysourcegroups$List,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$ListInventorySourceGroupsResponse>,
      callback: BodyResponseCallback<Schema$ListInventorySourceGroupsResponse>
    ): void;
    list(
      params: Params$Resource$Inventorysourcegroups$List,
      callback: BodyResponseCallback<Schema$ListInventorySourceGroupsResponse>
    ): void;
    list(
      callback: BodyResponseCallback<Schema$ListInventorySourceGroupsResponse>
    ): void;
    list(
      paramsOrCallback?:
        | Params$Resource$Inventorysourcegroups$List
        | BodyResponseCallback<Schema$ListInventorySourceGroupsResponse>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$ListInventorySourceGroupsResponse>,
      callback?: BodyResponseCallback<Schema$ListInventorySourceGroupsResponse>
    ): void | GaxiosPromise<Schema$ListInventorySourceGroupsResponse> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Inventorysourcegroups$List;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Inventorysourcegroups$List;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/inventorySourceGroups').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: [],
        pathParams: [],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$ListInventorySourceGroupsResponse>(
          parameters,
          callback
        );
      } else {
        return createAPIRequest<Schema$ListInventorySourceGroupsResponse>(
          parameters
        );
      }
    }
  }

  export interface Params$Resource$Inventorysourcegroups$Get
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * The ID of the advertiser that has access to the inventory source group.  If an inventory source group is partner-owned, only advertisers to which the group is explicitly shared can access the group.
     */
    advertiserId?: string;
    /**
     * Required. The ID of the inventory source group to fetch.
     */
    inventorySourceGroupId?: string;
    /**
     * The ID of the partner that has access to the inventory source group.  A partner cannot access an advertiser-owned inventory source group.
     */
    partnerId?: string;
  }
  export interface Params$Resource$Inventorysourcegroups$List
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * The ID of the advertiser that has access to the inventory source group.  If an inventory source group is partner-owned, only advertisers to which the group is explicitly shared can access the group.
     */
    advertiserId?: string;
    /**
     * Allows filtering by inventory source group properties.  Supported syntax:  * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by the logical operator `OR`. * A restriction has the form of `{field} {operator} {value}`. * The operator must be `EQUALS (=)`. * Supported fields:     - `inventorySourceGroupId`  The length of this field should be no more than 500 characters.
     */
    filter?: string;
    /**
     * Field by which to sort the list. Acceptable values are:  * `displayName` (default) * `inventorySourceGroupId`  The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. For example, `displayName desc`.
     */
    orderBy?: string;
    /**
     * Requested page size. Must be between `1` and `100`. If unspecified will default to `100`.
     */
    pageSize?: number;
    /**
     * A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListInventorySources` method. If not specified, the first page of results will be returned.
     */
    pageToken?: string;
    /**
     * The ID of the partner that has access to the inventory source group.  A partner cannot access advertiser-owned inventory source groups.
     */
    partnerId?: string;
  }

  export class Resource$Inventorysources {
    context: APIRequestContext;
    constructor(context: APIRequestContext) {
      this.context = context;
    }

    /**
     * displayvideo.inventorySources.get
     * @desc Gets an inventory source.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.inventorySources.get({
     *     // Required. The ID of the inventory source to fetch.
     *     inventorySourceId: '[^/]+',
     *     // Required. The ID of the DV360 partner to which the fetched inventory source
     *     // is permissioned.
     *     partnerId: 'placeholder-value',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "commitment": "my_commitment",
     *   //   "creativeConfigs": [],
     *   //   "dealId": "my_dealId",
     *   //   "deliveryMethod": "my_deliveryMethod",
     *   //   "displayName": "my_displayName",
     *   //   "exchange": "my_exchange",
     *   //   "inventorySourceId": "my_inventorySourceId",
     *   //   "inventorySourceType": "my_inventorySourceType",
     *   //   "name": "my_name",
     *   //   "publisherName": "my_publisherName",
     *   //   "rateDetails": {},
     *   //   "status": {},
     *   //   "timeRange": {},
     *   //   "updateTime": "my_updateTime"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.inventorySources.get
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.inventorySourceId Required. The ID of the inventory source to fetch.
     * @param {string=} params.partnerId Required. The ID of the DV360 partner to which the fetched inventory source is permissioned.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    get(
      params?: Params$Resource$Inventorysources$Get,
      options?: MethodOptions
    ): GaxiosPromise<Schema$InventorySource>;
    get(
      params: Params$Resource$Inventorysources$Get,
      options: MethodOptions | BodyResponseCallback<Schema$InventorySource>,
      callback: BodyResponseCallback<Schema$InventorySource>
    ): void;
    get(
      params: Params$Resource$Inventorysources$Get,
      callback: BodyResponseCallback<Schema$InventorySource>
    ): void;
    get(callback: BodyResponseCallback<Schema$InventorySource>): void;
    get(
      paramsOrCallback?:
        | Params$Resource$Inventorysources$Get
        | BodyResponseCallback<Schema$InventorySource>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$InventorySource>,
      callback?: BodyResponseCallback<Schema$InventorySource>
    ): void | GaxiosPromise<Schema$InventorySource> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Inventorysources$Get;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Inventorysources$Get;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (
              rootUrl + '/v1/inventorySources/{+inventorySourceId}'
            ).replace(/([^:]\/)\/+/g, '$1'),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: ['inventorySourceId'],
        pathParams: ['inventorySourceId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$InventorySource>(parameters, callback);
      } else {
        return createAPIRequest<Schema$InventorySource>(parameters);
      }
    }

    /**
     * displayvideo.inventorySources.list
     * @desc Lists inventory sources that are accessible to the current user.  The order is defined by the order_by parameter. If a filter by entity_status is not specified, inventory sources with entity status `ENTITY_STATUS_ARCHIVED` will not be included in the results.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.inventorySources.list({
     *     // The ID of the advertiser that has access to the inventory source.
     *     advertiserId: 'placeholder-value',
     *     // Allows filtering by inventory source properties.
     *     //
     *     // Supported syntax:
     *     //
     *     // * Filter expressions are made up of one or more restrictions.
     *     // * Restrictions can be combined by `AND` or `OR` logical operators. A
     *     // sequence of restrictions implicitly uses `AND`.
     *     // * A restriction has the form of `{field} {operator} {value}`.
     *     // * The operator must be `EQUALS (=)`.
     *     // * Supported fields:
     *     //     - `status.entityStatus`
     *     //     - `commitment`
     *     //     - `deliveryMethod`
     *     //     - `rateDetails.rateType`
     *     //     - `exchange`
     *     //
     *     // Examples:
     *     //
     *     // * All active inventory sources:
     *     // `status.entityStatus="ENTITY_STATUS_ACTIVE"`
     *     // * Inventory sources belonging to Google Ad Manager or Rubicon exchanges:
     *     // `exchange="EXCHANGE_GOOGLE_AD_MANAGER" OR exchange="EXCHANGE_RUBICON"`
     *     //
     *     // The length of this field should be no more than 500 characters.
     *     filter: 'placeholder-value',
     *     // Field by which to sort the list.
     *     // Acceptable values are:
     *     //
     *     // * `displayName` (default)
     *     //
     *     // The default sorting order is ascending. To specify descending order for
     *     // a field, a suffix "desc" should be added to the field name. For example,
     *     // `displayName desc`.
     *     orderBy: 'placeholder-value',
     *     // Requested page size. Must be between `1` and `100`. If unspecified will
     *     // default to `100`.
     *     pageSize: 'placeholder-value',
     *     // A token identifying a page of results the server should return.
     *     // Typically, this is the value of
     *     // next_page_token
     *     // returned from the previous call to `ListInventorySources` method.
     *     // If not specified, the first page of results will be returned.
     *     pageToken: 'placeholder-value',
     *     // The ID of the partner that has access to the inventory source.
     *     partnerId: 'placeholder-value',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "inventorySources": [],
     *   //   "nextPageToken": "my_nextPageToken"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.inventorySources.list
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string=} params.advertiserId The ID of the advertiser that has access to the inventory source.
     * @param {string=} params.filter Allows filtering by inventory source properties.  Supported syntax:  * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` or `OR` logical operators. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * The operator must be `EQUALS (=)`. * Supported fields:     - `status.entityStatus`     - `commitment`     - `deliveryMethod`     - `rateDetails.rateType`     - `exchange`  Examples:  * All active inventory sources: `status.entityStatus="ENTITY_STATUS_ACTIVE"` * Inventory sources belonging to Google Ad Manager or Rubicon exchanges: `exchange="EXCHANGE_GOOGLE_AD_MANAGER" OR exchange="EXCHANGE_RUBICON"`  The length of this field should be no more than 500 characters.
     * @param {string=} params.orderBy Field by which to sort the list. Acceptable values are:  * `displayName` (default)  The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. For example, `displayName desc`.
     * @param {integer=} params.pageSize Requested page size. Must be between `1` and `100`. If unspecified will default to `100`.
     * @param {string=} params.pageToken A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListInventorySources` method. If not specified, the first page of results will be returned.
     * @param {string=} params.partnerId The ID of the partner that has access to the inventory source.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    list(
      params?: Params$Resource$Inventorysources$List,
      options?: MethodOptions
    ): GaxiosPromise<Schema$ListInventorySourcesResponse>;
    list(
      params: Params$Resource$Inventorysources$List,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$ListInventorySourcesResponse>,
      callback: BodyResponseCallback<Schema$ListInventorySourcesResponse>
    ): void;
    list(
      params: Params$Resource$Inventorysources$List,
      callback: BodyResponseCallback<Schema$ListInventorySourcesResponse>
    ): void;
    list(
      callback: BodyResponseCallback<Schema$ListInventorySourcesResponse>
    ): void;
    list(
      paramsOrCallback?:
        | Params$Resource$Inventorysources$List
        | BodyResponseCallback<Schema$ListInventorySourcesResponse>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$ListInventorySourcesResponse>,
      callback?: BodyResponseCallback<Schema$ListInventorySourcesResponse>
    ): void | GaxiosPromise<Schema$ListInventorySourcesResponse> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Inventorysources$List;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Inventorysources$List;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/inventorySources').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: [],
        pathParams: [],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$ListInventorySourcesResponse>(
          parameters,
          callback
        );
      } else {
        return createAPIRequest<Schema$ListInventorySourcesResponse>(
          parameters
        );
      }
    }
  }

  export interface Params$Resource$Inventorysources$Get
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required. The ID of the inventory source to fetch.
     */
    inventorySourceId?: string;
    /**
     * Required. The ID of the DV360 partner to which the fetched inventory source is permissioned.
     */
    partnerId?: string;
  }
  export interface Params$Resource$Inventorysources$List
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * The ID of the advertiser that has access to the inventory source.
     */
    advertiserId?: string;
    /**
     * Allows filtering by inventory source properties.  Supported syntax:  * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` or `OR` logical operators. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * The operator must be `EQUALS (=)`. * Supported fields:     - `status.entityStatus`     - `commitment`     - `deliveryMethod`     - `rateDetails.rateType`     - `exchange`  Examples:  * All active inventory sources: `status.entityStatus="ENTITY_STATUS_ACTIVE"` * Inventory sources belonging to Google Ad Manager or Rubicon exchanges: `exchange="EXCHANGE_GOOGLE_AD_MANAGER" OR exchange="EXCHANGE_RUBICON"`  The length of this field should be no more than 500 characters.
     */
    filter?: string;
    /**
     * Field by which to sort the list. Acceptable values are:  * `displayName` (default)  The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. For example, `displayName desc`.
     */
    orderBy?: string;
    /**
     * Requested page size. Must be between `1` and `100`. If unspecified will default to `100`.
     */
    pageSize?: number;
    /**
     * A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListInventorySources` method. If not specified, the first page of results will be returned.
     */
    pageToken?: string;
    /**
     * The ID of the partner that has access to the inventory source.
     */
    partnerId?: string;
  }

  export class Resource$Media {
    context: APIRequestContext;
    constructor(context: APIRequestContext) {
      this.context = context;
    }

    /**
     * displayvideo.media.download
     * @desc Downloads media. Download is supported on the URI `/download/{resource_name=**}?alt=media.`  **Note**: Download requests will not be successful without including `alt=media` query string.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: [
     *       'https://www.googleapis.com/auth/display-video',
     *       'https://www.googleapis.com/auth/doubleclickbidmanager',
     *     ],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.media.download({
     *     // Name of the media that is being downloaded.  See
     *     // ReadRequest.resource_name.
     *     resourceName: '.*',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "resourceName": "my_resourceName"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.media.download
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.resourceName Name of the media that is being downloaded.  See ReadRequest.resource_name.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    download(
      params?: Params$Resource$Media$Download,
      options?: MethodOptions
    ): GaxiosPromise<Schema$GoogleBytestreamMedia>;
    download(
      params: Params$Resource$Media$Download,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$GoogleBytestreamMedia>,
      callback: BodyResponseCallback<Schema$GoogleBytestreamMedia>
    ): void;
    download(
      params: Params$Resource$Media$Download,
      callback: BodyResponseCallback<Schema$GoogleBytestreamMedia>
    ): void;
    download(
      callback: BodyResponseCallback<Schema$GoogleBytestreamMedia>
    ): void;
    download(
      paramsOrCallback?:
        | Params$Resource$Media$Download
        | BodyResponseCallback<Schema$GoogleBytestreamMedia>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$GoogleBytestreamMedia>,
      callback?: BodyResponseCallback<Schema$GoogleBytestreamMedia>
    ): void | GaxiosPromise<Schema$GoogleBytestreamMedia> {
      let params = (paramsOrCallback || {}) as Params$Resource$Media$Download;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Media$Download;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/download/{+resourceName}').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: ['resourceName'],
        pathParams: ['resourceName'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$GoogleBytestreamMedia>(parameters, callback);
      } else {
        return createAPIRequest<Schema$GoogleBytestreamMedia>(parameters);
      }
    }
  }

  export interface Params$Resource$Media$Download extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Name of the media that is being downloaded.  See ReadRequest.resource_name.
     */
    resourceName?: string;
  }

  export class Resource$Partners {
    context: APIRequestContext;
    channels: Resource$Partners$Channels;
    constructor(context: APIRequestContext) {
      this.context = context;
      this.channels = new Resource$Partners$Channels(this.context);
    }
  }

  export class Resource$Partners$Channels {
    context: APIRequestContext;
    constructor(context: APIRequestContext) {
      this.context = context;
    }

    /**
     * displayvideo.partners.channels.get
     * @desc Gets a channel for a partner or advertiser.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.partners.channels.get({
     *     // The ID of the advertiser that owns the fetched channel.
     *     advertiserId: 'placeholder-value',
     *     // Required. The ID of the channel to fetch.
     *     channelId: '[^/]+',
     *     // The ID of the partner that owns the fetched channel.
     *     partnerId: '[^/]+',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "advertiserId": "my_advertiserId",
     *   //   "channelId": "my_channelId",
     *   //   "displayName": "my_displayName",
     *   //   "name": "my_name",
     *   //   "partnerId": "my_partnerId"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.partners.channels.get
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string=} params.advertiserId The ID of the advertiser that owns the fetched channel.
     * @param {string} params.channelId Required. The ID of the channel to fetch.
     * @param {string} params.partnerId The ID of the partner that owns the fetched channel.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    get(
      params?: Params$Resource$Partners$Channels$Get,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Channel>;
    get(
      params: Params$Resource$Partners$Channels$Get,
      options: MethodOptions | BodyResponseCallback<Schema$Channel>,
      callback: BodyResponseCallback<Schema$Channel>
    ): void;
    get(
      params: Params$Resource$Partners$Channels$Get,
      callback: BodyResponseCallback<Schema$Channel>
    ): void;
    get(callback: BodyResponseCallback<Schema$Channel>): void;
    get(
      paramsOrCallback?:
        | Params$Resource$Partners$Channels$Get
        | BodyResponseCallback<Schema$Channel>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$Channel>,
      callback?: BodyResponseCallback<Schema$Channel>
    ): void | GaxiosPromise<Schema$Channel> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Partners$Channels$Get;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Partners$Channels$Get;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (
              rootUrl + '/v1/partners/{+partnerId}/channels/{+channelId}'
            ).replace(/([^:]\/)\/+/g, '$1'),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: ['partnerId', 'channelId'],
        pathParams: ['channelId', 'partnerId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Channel>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Channel>(parameters);
      }
    }

    /**
     * displayvideo.partners.channels.list
     * @desc Lists channels for a partner or advertiser.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.partners.channels.list({
     *     // The ID of the advertiser that owns the channels.
     *     advertiserId: 'placeholder-value',
     *     // Allows filtering by channel fields.
     *     //
     *     // Supported syntax:
     *     //
     *     // * Filter expressions for channel currently can only contain at most one
     *     // * restriction.
     *     // * A restriction has the form of `{field} {operator} {value}`.
     *     // * The operator must be `CONTAINS (:)`.
     *     // * Supported fields:
     *     //     - `displayName`
     *     //
     *     // Examples:
     *     //
     *     // * All channels for which the display name contains "google":
     *     // `displayName : "google"`.
     *     //
     *     // The length of this field should be no more than 500 characters.
     *     filter: 'placeholder-value',
     *     // Field by which to sort the list.
     *     // Acceptable values are:
     *     //
     *     // * `displayName` (default)
     *     // * `channelId`
     *     //
     *     // The default sorting order is ascending. To specify descending order for a
     *     // field, a suffix " desc" should be added to the field name. Example:
     *     // `displayName desc`.
     *     orderBy: 'placeholder-value',
     *     // Requested page size. Must be between `1` and `100`. If unspecified will
     *     // default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value
     *     // is specified.
     *     pageSize: 'placeholder-value',
     *     // A token identifying a page of results the server should return.
     *     // Typically, this is the value of
     *     // next_page_token returned from the
     *     // previous call to `ListChannels` method. If not specified, the first page
     *     // of results will be returned.
     *     pageToken: 'placeholder-value',
     *     // The ID of the partner that owns the channels.
     *     partnerId: '[^/]+',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "channels": [],
     *   //   "nextPageToken": "my_nextPageToken"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.partners.channels.list
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string=} params.advertiserId The ID of the advertiser that owns the channels.
     * @param {string=} params.filter Allows filtering by channel fields.  Supported syntax:  * Filter expressions for channel currently can only contain at most one * restriction. * A restriction has the form of `{field} {operator} {value}`. * The operator must be `CONTAINS (:)`. * Supported fields:     - `displayName`  Examples:  * All channels for which the display name contains "google": `displayName : "google"`.  The length of this field should be no more than 500 characters.
     * @param {string=} params.orderBy Field by which to sort the list. Acceptable values are:  * `displayName` (default) * `channelId`  The default sorting order is ascending. To specify descending order for a field, a suffix " desc" should be added to the field name. Example: `displayName desc`.
     * @param {integer=} params.pageSize Requested page size. Must be between `1` and `100`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified.
     * @param {string=} params.pageToken A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListChannels` method. If not specified, the first page of results will be returned.
     * @param {string} params.partnerId The ID of the partner that owns the channels.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    list(
      params?: Params$Resource$Partners$Channels$List,
      options?: MethodOptions
    ): GaxiosPromise<Schema$ListChannelsResponse>;
    list(
      params: Params$Resource$Partners$Channels$List,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$ListChannelsResponse>,
      callback: BodyResponseCallback<Schema$ListChannelsResponse>
    ): void;
    list(
      params: Params$Resource$Partners$Channels$List,
      callback: BodyResponseCallback<Schema$ListChannelsResponse>
    ): void;
    list(callback: BodyResponseCallback<Schema$ListChannelsResponse>): void;
    list(
      paramsOrCallback?:
        | Params$Resource$Partners$Channels$List
        | BodyResponseCallback<Schema$ListChannelsResponse>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$ListChannelsResponse>,
      callback?: BodyResponseCallback<Schema$ListChannelsResponse>
    ): void | GaxiosPromise<Schema$ListChannelsResponse> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Partners$Channels$List;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Partners$Channels$List;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/partners/{+partnerId}/channels').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: ['partnerId'],
        pathParams: ['partnerId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$ListChannelsResponse>(parameters, callback);
      } else {
        return createAPIRequest<Schema$ListChannelsResponse>(parameters);
      }
    }
  }

  export interface Params$Resource$Partners$Channels$Get
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * The ID of the advertiser that owns the fetched channel.
     */
    advertiserId?: string;
    /**
     * Required. The ID of the channel to fetch.
     */
    channelId?: string;
    /**
     * The ID of the partner that owns the fetched channel.
     */
    partnerId?: string;
  }
  export interface Params$Resource$Partners$Channels$List
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * The ID of the advertiser that owns the channels.
     */
    advertiserId?: string;
    /**
     * Allows filtering by channel fields.  Supported syntax:  * Filter expressions for channel currently can only contain at most one * restriction. * A restriction has the form of `{field} {operator} {value}`. * The operator must be `CONTAINS (:)`. * Supported fields:     - `displayName`  Examples:  * All channels for which the display name contains "google": `displayName : "google"`.  The length of this field should be no more than 500 characters.
     */
    filter?: string;
    /**
     * Field by which to sort the list. Acceptable values are:  * `displayName` (default) * `channelId`  The default sorting order is ascending. To specify descending order for a field, a suffix " desc" should be added to the field name. Example: `displayName desc`.
     */
    orderBy?: string;
    /**
     * Requested page size. Must be between `1` and `100`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified.
     */
    pageSize?: number;
    /**
     * A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListChannels` method. If not specified, the first page of results will be returned.
     */
    pageToken?: string;
    /**
     * The ID of the partner that owns the channels.
     */
    partnerId?: string;
  }

  export class Resource$Sdfdownloadtasks {
    context: APIRequestContext;
    operations: Resource$Sdfdownloadtasks$Operations;
    constructor(context: APIRequestContext) {
      this.context = context;
      this.operations = new Resource$Sdfdownloadtasks$Operations(this.context);
    }

    /**
     * displayvideo.sdfdownloadtasks.create
     * @desc Creates an SDF Download Task. Returns an Operation.  An SDF Download Task is a long-running, asynchronous operation. The metadata type of this operation is SdfDownloadTaskMetadata. If the request is successful, the response type of the operation is SdfDownloadTask. The response will not include the download files, which must be retrieved with media.download. The state of operation can be retrieved with sdfdownloadtask.operations.get.  Any errors can be found in the error.message. Note that error.details is expected to be empty.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.sdfdownloadtasks.create({
     *     // Request body metadata
     *     requestBody: {
     *       // request body parameters
     *       // {
     *       //   "advertiserId": "my_advertiserId",
     *       //   "idFilter": {},
     *       //   "inventorySourceFilter": {},
     *       //   "parentEntityFilter": {},
     *       //   "partnerId": "my_partnerId",
     *       //   "version": "my_version"
     *       // }
     *     },
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "done": false,
     *   //   "error": {},
     *   //   "metadata": {},
     *   //   "name": "my_name",
     *   //   "response": {}
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.sdfdownloadtasks.create
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {().CreateSdfDownloadTaskRequest} params.requestBody Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    create(
      params?: Params$Resource$Sdfdownloadtasks$Create,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Operation>;
    create(
      params: Params$Resource$Sdfdownloadtasks$Create,
      options: MethodOptions | BodyResponseCallback<Schema$Operation>,
      callback: BodyResponseCallback<Schema$Operation>
    ): void;
    create(
      params: Params$Resource$Sdfdownloadtasks$Create,
      callback: BodyResponseCallback<Schema$Operation>
    ): void;
    create(callback: BodyResponseCallback<Schema$Operation>): void;
    create(
      paramsOrCallback?:
        | Params$Resource$Sdfdownloadtasks$Create
        | BodyResponseCallback<Schema$Operation>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$Operation>,
      callback?: BodyResponseCallback<Schema$Operation>
    ): void | GaxiosPromise<Schema$Operation> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Sdfdownloadtasks$Create;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Sdfdownloadtasks$Create;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/sdfdownloadtasks').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'POST',
          },
          options
        ),
        params,
        requiredParams: [],
        pathParams: [],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Operation>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Operation>(parameters);
      }
    }
  }

  export interface Params$Resource$Sdfdownloadtasks$Create
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Request body metadata
     */
    requestBody?: Schema$CreateSdfDownloadTaskRequest;
  }

  export class Resource$Sdfdownloadtasks$Operations {
    context: APIRequestContext;
    constructor(context: APIRequestContext) {
      this.context = context;
    }

    /**
     * displayvideo.sdfdownloadtasks.operations.get
     * @desc Gets the latest state of an asynchronous SDF download task operation. Clients should poll this method at intervals of 30 seconds.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: [
     *       'https://www.googleapis.com/auth/display-video',
     *       'https://www.googleapis.com/auth/doubleclickbidmanager',
     *     ],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.sdfdownloadtasks.operations.get({
     *     // The name of the operation resource.
     *     name: 'sdfdownloadtasks/operations/my-operation',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "done": false,
     *   //   "error": {},
     *   //   "metadata": {},
     *   //   "name": "my_name",
     *   //   "response": {}
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.sdfdownloadtasks.operations.get
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.name The name of the operation resource.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    get(
      params?: Params$Resource$Sdfdownloadtasks$Operations$Get,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Operation>;
    get(
      params: Params$Resource$Sdfdownloadtasks$Operations$Get,
      options: MethodOptions | BodyResponseCallback<Schema$Operation>,
      callback: BodyResponseCallback<Schema$Operation>
    ): void;
    get(
      params: Params$Resource$Sdfdownloadtasks$Operations$Get,
      callback: BodyResponseCallback<Schema$Operation>
    ): void;
    get(callback: BodyResponseCallback<Schema$Operation>): void;
    get(
      paramsOrCallback?:
        | Params$Resource$Sdfdownloadtasks$Operations$Get
        | BodyResponseCallback<Schema$Operation>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$Operation>,
      callback?: BodyResponseCallback<Schema$Operation>
    ): void | GaxiosPromise<Schema$Operation> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Sdfdownloadtasks$Operations$Get;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Sdfdownloadtasks$Operations$Get;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+name}').replace(/([^:]\/)\/+/g, '$1'),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Operation>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Operation>(parameters);
      }
    }
  }

  export interface Params$Resource$Sdfdownloadtasks$Operations$Get
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * The name of the operation resource.
     */
    name?: string;
  }

  export class Resource$Targetingtypes {
    context: APIRequestContext;
    targetingOptions: Resource$Targetingtypes$Targetingoptions;
    constructor(context: APIRequestContext) {
      this.context = context;
      this.targetingOptions = new Resource$Targetingtypes$Targetingoptions(
        this.context
      );
    }
  }

  export class Resource$Targetingtypes$Targetingoptions {
    context: APIRequestContext;
    constructor(context: APIRequestContext) {
      this.context = context;
    }

    /**
     * displayvideo.targetingTypes.targetingOptions.get
     * @desc Gets a single targeting option.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.targetingTypes.targetingOptions.get({
     *     // Required. The Advertiser this request is being made in the context of.
     *     advertiserId: 'placeholder-value',
     *     // Required. The ID of the of targeting option to retrieve.
     *     targetingOptionId: '[^/]+',
     *     // Required. The type of targeting option to retrieve.
     *     targetingType: '[^/]+',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "ageRangeDetails": {},
     *   //   "appCategoryDetails": {},
     *   //   "authorizedSellerStatusDetails": {},
     *   //   "browserDetails": {},
     *   //   "carrierAndIspDetails": {},
     *   //   "categoryDetails": {},
     *   //   "contentInstreamPositionDetails": {},
     *   //   "contentOutstreamPositionDetails": {},
     *   //   "deviceMakeModelDetails": {},
     *   //   "deviceTypeDetails": {},
     *   //   "digitalContentLabelDetails": {},
     *   //   "environmentDetails": {},
     *   //   "exchangeDetails": {},
     *   //   "genderDetails": {},
     *   //   "geoRegionDetails": {},
     *   //   "householdIncomeDetails": {},
     *   //   "languageDetails": {},
     *   //   "name": "my_name",
     *   //   "onScreenPositionDetails": {},
     *   //   "operatingSystemDetails": {},
     *   //   "parentalStatusDetails": {},
     *   //   "sensitiveCategoryDetails": {},
     *   //   "subExchangeDetails": {},
     *   //   "targetingOptionId": "my_targetingOptionId",
     *   //   "targetingType": "my_targetingType",
     *   //   "userRewardedContentDetails": {},
     *   //   "videoPlayerSizeDetails": {},
     *   //   "viewabilityDetails": {}
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.targetingTypes.targetingOptions.get
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string=} params.advertiserId Required. The Advertiser this request is being made in the context of.
     * @param {string} params.targetingOptionId Required. The ID of the of targeting option to retrieve.
     * @param {string} params.targetingType Required. The type of targeting option to retrieve.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    get(
      params?: Params$Resource$Targetingtypes$Targetingoptions$Get,
      options?: MethodOptions
    ): GaxiosPromise<Schema$TargetingOption>;
    get(
      params: Params$Resource$Targetingtypes$Targetingoptions$Get,
      options: MethodOptions | BodyResponseCallback<Schema$TargetingOption>,
      callback: BodyResponseCallback<Schema$TargetingOption>
    ): void;
    get(
      params: Params$Resource$Targetingtypes$Targetingoptions$Get,
      callback: BodyResponseCallback<Schema$TargetingOption>
    ): void;
    get(callback: BodyResponseCallback<Schema$TargetingOption>): void;
    get(
      paramsOrCallback?:
        | Params$Resource$Targetingtypes$Targetingoptions$Get
        | BodyResponseCallback<Schema$TargetingOption>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$TargetingOption>,
      callback?: BodyResponseCallback<Schema$TargetingOption>
    ): void | GaxiosPromise<Schema$TargetingOption> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Targetingtypes$Targetingoptions$Get;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Targetingtypes$Targetingoptions$Get;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (
              rootUrl +
              '/v1/targetingTypes/{+targetingType}/targetingOptions/{+targetingOptionId}'
            ).replace(/([^:]\/)\/+/g, '$1'),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: ['targetingType', 'targetingOptionId'],
        pathParams: ['targetingOptionId', 'targetingType'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$TargetingOption>(parameters, callback);
      } else {
        return createAPIRequest<Schema$TargetingOption>(parameters);
      }
    }

    /**
     * displayvideo.targetingTypes.targetingOptions.list
     * @desc Lists targeting options of a given type.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/displayvideo.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const displayvideo = google.displayvideo('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/display-video'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await displayvideo.targetingTypes.targetingOptions.list({
     *     // Required. The Advertiser this request is being made in the context of.
     *     advertiserId: 'placeholder-value',
     *     // Allows filtering by targeting option properties.
     *     //
     *     // Supported syntax:
     *     //
     *     // * Filter expressions are made up of one or more restrictions.
     *     // * Restrictions can be combined by `OR` logical operators.
     *     // * A restriction has the form of `{field} {operator} {value}`.
     *     // * The operator must be "=" (equal sign).
     *     // * Supported fields:
     *     //     - `targetingOptionId`
     *     //
     *     // The length of this field should be no more than 500 characters.
     *     filter: 'placeholder-value',
     *     // Field by which to sort the list.
     *     // Acceptable values are:
     *     //
     *     // * `targetingOptionId` (default)
     *     //
     *     // The default sorting order is ascending. To specify descending order for
     *     // a field, a suffix "desc" should be added to the field name.
     *     // Example: `targetingOptionId desc`.
     *     orderBy: 'placeholder-value',
     *     // Requested page size. Must be between `1` and `100`. If unspecified will
     *     // default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value
     *     // is specified.
     *     pageSize: 'placeholder-value',
     *     // A token identifying a page of results the server should return.
     *     // Typically, this is the value of
     *     // next_page_token
     *     // returned from the previous call to `ListTargetingOptions` method.
     *     // If not specified, the first page of results will be returned.
     *     pageToken: 'placeholder-value',
     *     // Required. The type of targeting option to be listed.
     *     targetingType: '[^/]+',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "nextPageToken": "my_nextPageToken",
     *   //   "targetingOptions": []
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias displayvideo.targetingTypes.targetingOptions.list
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string=} params.advertiserId Required. The Advertiser this request is being made in the context of.
     * @param {string=} params.filter Allows filtering by targeting option properties.  Supported syntax:  * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `OR` logical operators. * A restriction has the form of `{field} {operator} {value}`. * The operator must be "=" (equal sign). * Supported fields:     - `targetingOptionId`  The length of this field should be no more than 500 characters.
     * @param {string=} params.orderBy Field by which to sort the list. Acceptable values are:  * `targetingOptionId` (default)  The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `targetingOptionId desc`.
     * @param {integer=} params.pageSize Requested page size. Must be between `1` and `100`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified.
     * @param {string=} params.pageToken A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListTargetingOptions` method. If not specified, the first page of results will be returned.
     * @param {string} params.targetingType Required. The type of targeting option to be listed.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    list(
      params?: Params$Resource$Targetingtypes$Targetingoptions$List,
      options?: MethodOptions
    ): GaxiosPromise<Schema$ListTargetingOptionsResponse>;
    list(
      params: Params$Resource$Targetingtypes$Targetingoptions$List,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$ListTargetingOptionsResponse>,
      callback: BodyResponseCallback<Schema$ListTargetingOptionsResponse>
    ): void;
    list(
      params: Params$Resource$Targetingtypes$Targetingoptions$List,
      callback: BodyResponseCallback<Schema$ListTargetingOptionsResponse>
    ): void;
    list(
      callback: BodyResponseCallback<Schema$ListTargetingOptionsResponse>
    ): void;
    list(
      paramsOrCallback?:
        | Params$Resource$Targetingtypes$Targetingoptions$List
        | BodyResponseCallback<Schema$ListTargetingOptionsResponse>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$ListTargetingOptionsResponse>,
      callback?: BodyResponseCallback<Schema$ListTargetingOptionsResponse>
    ): void | GaxiosPromise<Schema$ListTargetingOptionsResponse> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Targetingtypes$Targetingoptions$List;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Targetingtypes$Targetingoptions$List;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://displayvideo.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (
              rootUrl + '/v1/targetingTypes/{+targetingType}/targetingOptions'
            ).replace(/([^:]\/)\/+/g, '$1'),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: ['targetingType'],
        pathParams: ['targetingType'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$ListTargetingOptionsResponse>(
          parameters,
          callback
        );
      } else {
        return createAPIRequest<Schema$ListTargetingOptionsResponse>(
          parameters
        );
      }
    }
  }

  export interface Params$Resource$Targetingtypes$Targetingoptions$Get
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required. The Advertiser this request is being made in the context of.
     */
    advertiserId?: string;
    /**
     * Required. The ID of the of targeting option to retrieve.
     */
    targetingOptionId?: string;
    /**
     * Required. The type of targeting option to retrieve.
     */
    targetingType?: string;
  }
  export interface Params$Resource$Targetingtypes$Targetingoptions$List
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required. The Advertiser this request is being made in the context of.
     */
    advertiserId?: string;
    /**
     * Allows filtering by targeting option properties.  Supported syntax:  * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `OR` logical operators. * A restriction has the form of `{field} {operator} {value}`. * The operator must be "=" (equal sign). * Supported fields:     - `targetingOptionId`  The length of this field should be no more than 500 characters.
     */
    filter?: string;
    /**
     * Field by which to sort the list. Acceptable values are:  * `targetingOptionId` (default)  The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `targetingOptionId desc`.
     */
    orderBy?: string;
    /**
     * Requested page size. Must be between `1` and `100`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified.
     */
    pageSize?: number;
    /**
     * A token identifying a page of results the server should return. Typically, this is the value of next_page_token returned from the previous call to `ListTargetingOptions` method. If not specified, the first page of results will be returned.
     */
    pageToken?: string;
    /**
     * Required. The type of targeting option to be listed.
     */
    targetingType?: string;
  }
}
