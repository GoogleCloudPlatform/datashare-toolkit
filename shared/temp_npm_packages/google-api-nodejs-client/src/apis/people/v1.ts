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

export namespace people_v1 {
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
   * People API
   *
   * Provides access to information about profiles and contacts.
   *
   * @example
   * const {google} = require('googleapis');
   * const people = google.people('v1');
   *
   * @namespace people
   * @type {Function}
   * @version v1
   * @variation v1
   * @param {object=} options Options for People
   */
  export class People {
    context: APIRequestContext;
    contactGroups: Resource$Contactgroups;
    people: Resource$People;

    constructor(options: GlobalOptions, google?: GoogleConfigurable) {
      this.context = {
        _options: options || {},
        google,
      };

      this.contactGroups = new Resource$Contactgroups(this.context);
      this.people = new Resource$People(this.context);
    }
  }

  /**
   * A person&#39;s physical address. May be a P.O. box or street address. All fields are optional.
   */
  export interface Schema$Address {
    /**
     * The city of the address.
     */
    city?: string | null;
    /**
     * The country of the address.
     */
    country?: string | null;
    /**
     * The [ISO 3166-1 alpha-2](http://www.iso.org/iso/country_codes.htm) country code of the address.
     */
    countryCode?: string | null;
    /**
     * The extended address of the address; for example, the apartment number.
     */
    extendedAddress?: string | null;
    /**
     * Output only. The type of the address translated and formatted in the viewer&#39;s account locale or the `Accept-Language` HTTP header locale.
     */
    formattedType?: string | null;
    /**
     * The unstructured value of the address. If this is not set by the user it will be automatically constructed from structured values.
     */
    formattedValue?: string | null;
    /**
     * Metadata about the address.
     */
    metadata?: Schema$FieldMetadata;
    /**
     * The P.O. box of the address.
     */
    poBox?: string | null;
    /**
     * The postal code of the address.
     */
    postalCode?: string | null;
    /**
     * The region of the address; for example, the state or province.
     */
    region?: string | null;
    /**
     * The street address.
     */
    streetAddress?: string | null;
    /**
     * The type of the address. The type can be custom or one of these predefined values:  * `home` * `work` * `other`
     */
    type?: string | null;
  }
  /**
   * A person&#39;s age range.
   */
  export interface Schema$AgeRangeType {
    /**
     * The age range.
     */
    ageRange?: string | null;
    /**
     * Metadata about the age range.
     */
    metadata?: Schema$FieldMetadata;
  }
  /**
   * The response to a batch get contact groups request.
   */
  export interface Schema$BatchGetContactGroupsResponse {
    /**
     * The list of responses for each requested contact group resource.
     */
    responses?: Schema$ContactGroupResponse[];
  }
  /**
   * A person&#39;s short biography.
   */
  export interface Schema$Biography {
    /**
     * The content type of the biography.
     */
    contentType?: string | null;
    /**
     * Metadata about the biography.
     */
    metadata?: Schema$FieldMetadata;
    /**
     * The short biography.
     */
    value?: string | null;
  }
  /**
   * A person&#39;s birthday. At least one of the `date` and `text` fields are specified. The `date` and `text` fields typically represent the same date, but are not guaranteed to.
   */
  export interface Schema$Birthday {
    /**
     * The date of the birthday.
     */
    date?: Schema$Date;
    /**
     * Metadata about the birthday.
     */
    metadata?: Schema$FieldMetadata;
    /**
     * A free-form string representing the user&#39;s birthday.
     */
    text?: string | null;
  }
  /**
   * **DEPRECATED**: No data will be returned A person&#39;s bragging rights.
   */
  export interface Schema$BraggingRights {
    /**
     * Metadata about the bragging rights.
     */
    metadata?: Schema$FieldMetadata;
    /**
     * The bragging rights; for example, `climbed mount everest`.
     */
    value?: string | null;
  }
  /**
   * A contact group.
   */
  export interface Schema$ContactGroup {
    /**
     * The [HTTP entity tag](https://en.wikipedia.org/wiki/HTTP_ETag) of the resource. Used for web cache validation.
     */
    etag?: string | null;
    /**
     * Output only. The name translated and formatted in the viewer&#39;s account locale or the `Accept-Language` HTTP header locale for system groups names. Group names set by the owner are the same as name.
     */
    formattedName?: string | null;
    /**
     * Output only. The contact group type.
     */
    groupType?: string | null;
    /**
     * Output only. The total number of contacts in the group irrespective of max members in specified in the request.
     */
    memberCount?: number | null;
    /**
     * Output only. The list of contact person resource names that are members of the contact group. The field is not populated for LIST requests and can only be updated through the [ModifyContactGroupMembers](/people/api/rest/v1/contactgroups/members/modify).
     */
    memberResourceNames?: string[] | null;
    /**
     * Output only. Metadata about the contact group.
     */
    metadata?: Schema$ContactGroupMetadata;
    /**
     * The contact group name set by the group owner or a system provided name for system groups.
     */
    name?: string | null;
    /**
     * The resource name for the contact group, assigned by the server. An ASCII string, in the form of `contactGroups/{contact_group_id}`.
     */
    resourceName?: string | null;
  }
  /**
   * A Google contact group membership.
   */
  export interface Schema$ContactGroupMembership {
    /**
     * Output only. The contact group ID for the contact group membership.
     */
    contactGroupId?: string | null;
    /**
     * The resource name for the contact group, assigned by the server. An ASCII string, in the form of `contactGroups/{contact_group_id}`. Only contact_group_resource_name can be used for modifying memberships. Any contact group membership can be removed, but only user group or &quot;myContacts&quot; or &quot;starred&quot; system groups memberships can be added. A contact must always have at least one contact group membership.
     */
    contactGroupResourceName?: string | null;
  }
  /**
   * The metadata about a contact group.
   */
  export interface Schema$ContactGroupMetadata {
    /**
     * Output only. True if the contact group resource has been deleted. Populated only for [`ListContactGroups`](/people/api/rest/v1/contactgroups/list) requests that include a sync token.
     */
    deleted?: boolean | null;
    /**
     * Output only. The time the group was last updated.
     */
    updateTime?: string | null;
  }
  /**
   * The response for a specific contact group.
   */
  export interface Schema$ContactGroupResponse {
    /**
     * The contact group.
     */
    contactGroup?: Schema$ContactGroup;
    /**
     * The original requested resource name.
     */
    requestedResourceName?: string | null;
    /**
     * The status of the response.
     */
    status?: Schema$Status;
  }
  /**
   * A person&#39;s cover photo. A large image shown on the person&#39;s profile page that represents who they are or what they care about.
   */
  export interface Schema$CoverPhoto {
    /**
     * True if the cover photo is the default cover photo; false if the cover photo is a user-provided cover photo.
     */
    default?: boolean | null;
    /**
     * Metadata about the cover photo.
     */
    metadata?: Schema$FieldMetadata;
    /**
     * The URL of the cover photo.
     */
    url?: string | null;
  }
  /**
   * A request to create a new contact group.
   */
  export interface Schema$CreateContactGroupRequest {
    /**
     * Required. The contact group to create.
     */
    contactGroup?: Schema$ContactGroup;
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
   * The response for deleteing a contact&#39;s photo.
   */
  export interface Schema$DeleteContactPhotoResponse {
    /**
     * The updated person, if person_fields is set in the DeleteContactPhotoRequest; otherwise this will be unset.
     */
    person?: Schema$Person;
  }
  /**
   * A G Suite Domain membership.
   */
  export interface Schema$DomainMembership {
    /**
     * True if the person is in the viewer&#39;s G Suite domain.
     */
    inViewerDomain?: boolean | null;
  }
  /**
   * A person&#39;s email address.
   */
  export interface Schema$EmailAddress {
    /**
     * The display name of the email.
     */
    displayName?: string | null;
    /**
     * Output only. The type of the email address translated and formatted in the viewer&#39;s account locale or the `Accept-Language` HTTP header locale.
     */
    formattedType?: string | null;
    /**
     * Metadata about the email address.
     */
    metadata?: Schema$FieldMetadata;
    /**
     * The type of the email address. The type can be custom or one of these predefined values:  * `home` * `work` * `other`
     */
    type?: string | null;
    /**
     * The email address.
     */
    value?: string | null;
  }
  /**
   * A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance:      service Foo {       rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty);     }  The JSON representation for `Empty` is empty JSON object `{}`.
   */
  export interface Schema$Empty {}
  /**
   * An event related to the person.
   */
  export interface Schema$Event {
    /**
     * The date of the event.
     */
    date?: Schema$Date;
    /**
     * Output only. The type of the event translated and formatted in the viewer&#39;s account locale or the `Accept-Language` HTTP header locale.
     */
    formattedType?: string | null;
    /**
     * Metadata about the event.
     */
    metadata?: Schema$FieldMetadata;
    /**
     * The type of the event. The type can be custom or one of these predefined values:  * `anniversary` * `other`
     */
    type?: string | null;
  }
  /**
   * Metadata about a field.
   */
  export interface Schema$FieldMetadata {
    /**
     * True if the field is the primary field; false if the field is a secondary field.
     */
    primary?: boolean | null;
    /**
     * The source of the field.
     */
    source?: Schema$Source;
    /**
     * Output only. True if the field is verified; false if the field is unverified. A verified field is typically a name, email address, phone number, or website that has been confirmed to be owned by the person.
     */
    verified?: boolean | null;
  }
  /**
   * A person&#39;s gender.
   */
  export interface Schema$Gender {
    /**
     * The type of pronouns that should be used to address the person. The value can be custom or one of these predefined values:  * `male` * `female` * `other`
     */
    addressMeAs?: string | null;
    /**
     * Output only. The value of the gender translated and formatted in the viewer&#39;s account locale or the `Accept-Language` HTTP header locale. Unspecified or custom value are not localized.
     */
    formattedValue?: string | null;
    /**
     * Metadata about the gender.
     */
    metadata?: Schema$FieldMetadata;
    /**
     * The gender for the person. The gender can be custom or one of these predefined values:  * `male` * `female` * `unspecified`
     */
    value?: string | null;
  }
  /**
   * The response to a get request for a list of people by resource name.
   */
  export interface Schema$GetPeopleResponse {
    /**
     * The response for each requested resource name.
     */
    responses?: Schema$PersonResponse[];
  }
  /**
   * A person&#39;s instant messaging client.
   */
  export interface Schema$ImClient {
    /**
     * Output only. The protocol of the IM client formatted in the viewer&#39;s account locale or the `Accept-Language` HTTP header locale.
     */
    formattedProtocol?: string | null;
    /**
     * Output only. The type of the IM client translated and formatted in the viewer&#39;s account locale or the `Accept-Language` HTTP header locale.
     */
    formattedType?: string | null;
    /**
     * Metadata about the IM client.
     */
    metadata?: Schema$FieldMetadata;
    /**
     * The protocol of the IM client. The protocol can be custom or one of these predefined values:  * `aim` * `msn` * `yahoo` * `skype` * `qq` * `googleTalk` * `icq` * `jabber` * `netMeeting`
     */
    protocol?: string | null;
    /**
     * The type of the IM client. The type can be custom or one of these predefined values:  * `home` * `work` * `other`
     */
    type?: string | null;
    /**
     * The user name used in the IM client.
     */
    username?: string | null;
  }
  /**
   * One of the person&#39;s interests.
   */
  export interface Schema$Interest {
    /**
     * Metadata about the interest.
     */
    metadata?: Schema$FieldMetadata;
    /**
     * The interest; for example, `stargazing`.
     */
    value?: string | null;
  }
  /**
   * The response to a request for the authenticated user&#39;s connections.
   */
  export interface Schema$ListConnectionsResponse {
    /**
     * The list of people that the requestor is connected to.
     */
    connections?: Schema$Person[];
    /**
     * A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages.
     */
    nextPageToken?: string | null;
    /**
     * A token, which can be sent as `sync_token` to retrieve changes since the last request. Request must set `request_sync_token` to return the sync token.
     */
    nextSyncToken?: string | null;
    /**
     * The total number of items in the list without pagination.
     */
    totalItems?: number | null;
    /**
     * **DEPRECATED** (Please use totalItems) The total number of people in the list without pagination.
     */
    totalPeople?: number | null;
  }
  /**
   * The response to a list contact groups request.
   */
  export interface Schema$ListContactGroupsResponse {
    /**
     * The list of contact groups. Members of the contact groups are not populated.
     */
    contactGroups?: Schema$ContactGroup[];
    /**
     * The token that can be used to retrieve the next page of results.
     */
    nextPageToken?: string | null;
    /**
     * The token that can be used to retrieve changes since the last request.
     */
    nextSyncToken?: string | null;
    /**
     * The total number of items in the list without pagination.
     */
    totalItems?: number | null;
  }
  /**
   * A person&#39;s locale preference.
   */
  export interface Schema$Locale {
    /**
     * Metadata about the locale.
     */
    metadata?: Schema$FieldMetadata;
    /**
     * The well-formed [IETF BCP 47](https://tools.ietf.org/html/bcp47) language tag representing the locale.
     */
    value?: string | null;
  }
  /**
   * A person&#39;s membership in a group. Only contact group memberships can be modified.
   */
  export interface Schema$Membership {
    /**
     * The contact group membership.
     */
    contactGroupMembership?: Schema$ContactGroupMembership;
    /**
     * Output only. The domain membership.
     */
    domainMembership?: Schema$DomainMembership;
    /**
     * Metadata about the membership.
     */
    metadata?: Schema$FieldMetadata;
  }
  /**
   * A request to modify an existing contact group&#39;s members. Contacts can be removed from any group but they can only be added to a user group or &quot;myContacts&quot; or &quot;starred&quot; system groups.
   */
  export interface Schema$ModifyContactGroupMembersRequest {
    /**
     * Optional. The resource names of the contact people to add in the form of `people/{person_id}`.
     */
    resourceNamesToAdd?: string[] | null;
    /**
     * Optional. The resource names of the contact people to remove in the form of `people/{person_id}`.
     */
    resourceNamesToRemove?: string[] | null;
  }
  /**
   * The response to a modify contact group members request.
   */
  export interface Schema$ModifyContactGroupMembersResponse {
    /**
     * The contact people resource names that cannot be removed from their last contact group.
     */
    canNotRemoveLastContactGroupResourceNames?: string[] | null;
    /**
     * The contact people resource names that were not found.
     */
    notFoundResourceNames?: string[] | null;
  }
  /**
   * A person&#39;s name. If the name is a mononym, the family name is empty.
   */
  export interface Schema$Name {
    /**
     * Output only. The display name formatted according to the locale specified by the viewer&#39;s account or the `Accept-Language` HTTP header.
     */
    displayName?: string | null;
    /**
     * Output only. The display name with the last name first formatted according to the locale specified by the viewer&#39;s account or the `Accept-Language` HTTP header.
     */
    displayNameLastFirst?: string | null;
    /**
     * The family name.
     */
    familyName?: string | null;
    /**
     * The given name.
     */
    givenName?: string | null;
    /**
     * The honorific prefixes, such as `Mrs.` or `Dr.`
     */
    honorificPrefix?: string | null;
    /**
     * The honorific suffixes, such as `Jr.`
     */
    honorificSuffix?: string | null;
    /**
     * Metadata about the name.
     */
    metadata?: Schema$FieldMetadata;
    /**
     * The middle name(s).
     */
    middleName?: string | null;
    /**
     * The family name spelled as it sounds.
     */
    phoneticFamilyName?: string | null;
    /**
     * The full name spelled as it sounds.
     */
    phoneticFullName?: string | null;
    /**
     * The given name spelled as it sounds.
     */
    phoneticGivenName?: string | null;
    /**
     * The honorific prefixes spelled as they sound.
     */
    phoneticHonorificPrefix?: string | null;
    /**
     * The honorific suffixes spelled as they sound.
     */
    phoneticHonorificSuffix?: string | null;
    /**
     * The middle name(s) spelled as they sound.
     */
    phoneticMiddleName?: string | null;
  }
  /**
   * A person&#39;s nickname.
   */
  export interface Schema$Nickname {
    /**
     * Metadata about the nickname.
     */
    metadata?: Schema$FieldMetadata;
    /**
     * The type of the nickname.
     */
    type?: string | null;
    /**
     * The nickname.
     */
    value?: string | null;
  }
  /**
   * A person&#39;s occupation.
   */
  export interface Schema$Occupation {
    /**
     * Metadata about the occupation.
     */
    metadata?: Schema$FieldMetadata;
    /**
     * The occupation; for example, `carpenter`.
     */
    value?: string | null;
  }
  /**
   * A person&#39;s past or current organization. Overlapping date ranges are permitted.
   */
  export interface Schema$Organization {
    /**
     * True if the organization is the person&#39;s current organization; false if the organization is a past organization.
     */
    current?: boolean | null;
    /**
     * The person&#39;s department at the organization.
     */
    department?: string | null;
    /**
     * The domain name associated with the organization; for example, `google.com`.
     */
    domain?: string | null;
    /**
     * The end date when the person left the organization.
     */
    endDate?: Schema$Date;
    /**
     * Output only. The type of the organization translated and formatted in the viewer&#39;s account locale or the `Accept-Language` HTTP header locale.
     */
    formattedType?: string | null;
    /**
     * The person&#39;s job description at the organization.
     */
    jobDescription?: string | null;
    /**
     * The location of the organization office the person works at.
     */
    location?: string | null;
    /**
     * Metadata about the organization.
     */
    metadata?: Schema$FieldMetadata;
    /**
     * The name of the organization.
     */
    name?: string | null;
    /**
     * The phonetic name of the organization.
     */
    phoneticName?: string | null;
    /**
     * The start date when the person joined the organization.
     */
    startDate?: Schema$Date;
    /**
     * The symbol associated with the organization; for example, a stock ticker symbol, abbreviation, or acronym.
     */
    symbol?: string | null;
    /**
     * The person&#39;s job title at the organization.
     */
    title?: string | null;
    /**
     * The type of the organization. The type can be custom or  one of these predefined values:  * `work` * `school`
     */
    type?: string | null;
  }
  /**
   * Information about a person merged from various data sources such as the authenticated user&#39;s contacts and profile data.  Most fields can have multiple items. The items in a field have no guaranteed order, but each non-empty field is guaranteed to have exactly one field with `metadata.primary` set to true.
   */
  export interface Schema$Person {
    /**
     * The person&#39;s street addresses.
     */
    addresses?: Schema$Address[];
    /**
     * Output only. **DEPRECATED** (Please use `person.ageRanges` instead)  The person&#39;s age range.
     */
    ageRange?: string | null;
    /**
     * Output only. The person&#39;s age ranges.
     */
    ageRanges?: Schema$AgeRangeType[];
    /**
     * The person&#39;s biographies.
     */
    biographies?: Schema$Biography[];
    /**
     * The person&#39;s birthdays.
     */
    birthdays?: Schema$Birthday[];
    /**
     * **DEPRECATED**: No data will be returned The person&#39;s bragging rights.
     */
    braggingRights?: Schema$BraggingRights[];
    /**
     * Output only. The person&#39;s cover photos.
     */
    coverPhotos?: Schema$CoverPhoto[];
    /**
     * The person&#39;s email addresses.
     */
    emailAddresses?: Schema$EmailAddress[];
    /**
     * The [HTTP entity tag](https://en.wikipedia.org/wiki/HTTP_ETag) of the resource. Used for web cache validation.
     */
    etag?: string | null;
    /**
     * The person&#39;s events.
     */
    events?: Schema$Event[];
    /**
     * The person&#39;s genders.
     */
    genders?: Schema$Gender[];
    /**
     * The person&#39;s instant messaging clients.
     */
    imClients?: Schema$ImClient[];
    /**
     * The person&#39;s interests.
     */
    interests?: Schema$Interest[];
    /**
     * The person&#39;s locale preferences.
     */
    locales?: Schema$Locale[];
    /**
     * The person&#39;s group memberships.
     */
    memberships?: Schema$Membership[];
    /**
     * Output only. Metadata about the person.
     */
    metadata?: Schema$PersonMetadata;
    /**
     * The person&#39;s names.
     */
    names?: Schema$Name[];
    /**
     * The person&#39;s nicknames.
     */
    nicknames?: Schema$Nickname[];
    /**
     * The person&#39;s occupations.
     */
    occupations?: Schema$Occupation[];
    /**
     * The person&#39;s past or current organizations.
     */
    organizations?: Schema$Organization[];
    /**
     * The person&#39;s phone numbers.
     */
    phoneNumbers?: Schema$PhoneNumber[];
    /**
     * Output only. The person&#39;s photos.
     */
    photos?: Schema$Photo[];
    /**
     * The person&#39;s relations.
     */
    relations?: Schema$Relation[];
    /**
     * Output only. **DEPRECATED**: No data will be returned The person&#39;s relationship interests.
     */
    relationshipInterests?: Schema$RelationshipInterest[];
    /**
     * Output only. **DEPRECATED**: No data will be returned The person&#39;s relationship statuses.
     */
    relationshipStatuses?: Schema$RelationshipStatus[];
    /**
     * The person&#39;s residences.
     */
    residences?: Schema$Residence[];
    /**
     * The resource name for the person, assigned by the server. An ASCII string with a max length of 27 characters, in the form of `people/{person_id}`.
     */
    resourceName?: string | null;
    /**
     * The person&#39;s SIP addresses.
     */
    sipAddresses?: Schema$SipAddress[];
    /**
     * The person&#39;s skills.
     */
    skills?: Schema$Skill[];
    /**
     * Output only. **DEPRECATED**: No data will be returned The person&#39;s taglines.
     */
    taglines?: Schema$Tagline[];
    /**
     * The person&#39;s associated URLs.
     */
    urls?: Schema$Url[];
    /**
     * The person&#39;s user defined data.
     */
    userDefined?: Schema$UserDefined[];
  }
  /**
   * The metadata about a person.
   */
  export interface Schema$PersonMetadata {
    /**
     * Output only. True if the person resource has been deleted. Populated only for [`connections.list`](/people/api/rest/v1/people.connections/list) requests that include a sync token.
     */
    deleted?: boolean | null;
    /**
     * Output only. Resource names of people linked to this resource.
     */
    linkedPeopleResourceNames?: string[] | null;
    /**
     * Output only. **DEPRECATED** (Please use `person.metadata.sources.profileMetadata.objectType` instead)  The type of the person object.
     */
    objectType?: string | null;
    /**
     * Output only. Any former resource names this person has had. Populated only for [`connections.list`](/people/api/rest/v1/people.connections/list) requests that include a sync token.  The resource name may change when adding or removing fields that link a contact and profile such as a verified email, verified phone number, or profile URL.
     */
    previousResourceNames?: string[] | null;
    /**
     * The sources of data for the person.
     */
    sources?: Schema$Source[];
  }
  /**
   * The response for a single person
   */
  export interface Schema$PersonResponse {
    /**
     * **DEPRECATED** (Please use status instead)  [HTTP 1.1 status code] (http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html).
     */
    httpStatusCode?: number | null;
    /**
     * The person.
     */
    person?: Schema$Person;
    /**
     * The original requested resource name. May be different than the resource name on the returned person.  The resource name can change when adding or removing fields that link a contact and profile such as a verified email, verified phone number, or a profile URL.
     */
    requestedResourceName?: string | null;
    /**
     * The status of the response.
     */
    status?: Schema$Status;
  }
  /**
   * A person&#39;s phone number.
   */
  export interface Schema$PhoneNumber {
    /**
     * Output only. The canonicalized [ITU-T E.164](https://law.resource.org/pub/us/cfr/ibr/004/itu-t.E.164.1.2008.pdf) form of the phone number.
     */
    canonicalForm?: string | null;
    /**
     * Output only. The type of the phone number translated and formatted in the viewer&#39;s account locale or the `Accept-Language` HTTP header locale.
     */
    formattedType?: string | null;
    /**
     * Metadata about the phone number.
     */
    metadata?: Schema$FieldMetadata;
    /**
     * The type of the phone number. The type can be custom or one of these predefined values:  * `home` * `work` * `mobile` * `homeFax` * `workFax` * `otherFax` * `pager` * `workMobile` * `workPager` * `main` * `googleVoice` * `other`
     */
    type?: string | null;
    /**
     * The phone number.
     */
    value?: string | null;
  }
  /**
   * A person&#39;s photo. A picture shown next to the person&#39;s name to help others recognize the person.
   */
  export interface Schema$Photo {
    /**
     * True if the photo is a default photo; false if the photo is a user-provided photo.
     */
    default?: boolean | null;
    /**
     * Metadata about the photo.
     */
    metadata?: Schema$FieldMetadata;
    /**
     * The URL of the photo. You can change the desired size by appending a query parameter `sz={size}` at the end of the url, where {size} is the size in pixels. Example: https://lh3.googleusercontent.com/-T_wVWLlmg7w/AAAAAAAAAAI/AAAAAAAABa8/00gzXvDBYqw/s100/photo.jpg?sz=50
     */
    url?: string | null;
  }
  /**
   * The metadata about a profile.
   */
  export interface Schema$ProfileMetadata {
    /**
     * Output only. The profile object type.
     */
    objectType?: string | null;
    /**
     * Output only. The user types.
     */
    userTypes?: string[] | null;
  }
  /**
   * A person&#39;s relation to another person.
   */
  export interface Schema$Relation {
    /**
     * Output only. The type of the relation translated and formatted in the viewer&#39;s account locale or the locale specified in the Accept-Language HTTP header.
     */
    formattedType?: string | null;
    /**
     * Metadata about the relation.
     */
    metadata?: Schema$FieldMetadata;
    /**
     * The name of the other person this relation refers to.
     */
    person?: string | null;
    /**
     * The person&#39;s relation to the other person. The type can be custom or one of these predefined values:  * `spouse` * `child` * `mother` * `father` * `parent` * `brother` * `sister` * `friend` * `relative` * `domesticPartner` * `manager` * `assistant` * `referredBy` * `partner`
     */
    type?: string | null;
  }
  /**
   * **DEPRECATED**: No data will be returned A person&#39;s relationship interest .
   */
  export interface Schema$RelationshipInterest {
    /**
     * Output only. The value of the relationship interest translated and formatted in the viewer&#39;s account locale or the locale specified in the Accept-Language HTTP header.
     */
    formattedValue?: string | null;
    /**
     * Metadata about the relationship interest.
     */
    metadata?: Schema$FieldMetadata;
    /**
     * The kind of relationship the person is looking for. The value can be custom or one of these predefined values:  * `friend` * `date` * `relationship` * `networking`
     */
    value?: string | null;
  }
  /**
   * **DEPRECATED**: No data will be returned A person&#39;s relationship status.
   */
  export interface Schema$RelationshipStatus {
    /**
     * Output only. The value of the relationship status translated and formatted in the viewer&#39;s account locale or the `Accept-Language` HTTP header locale.
     */
    formattedValue?: string | null;
    /**
     * Metadata about the relationship status.
     */
    metadata?: Schema$FieldMetadata;
    /**
     * The relationship status. The value can be custom or one of these predefined values:  * `single` * `inARelationship` * `engaged` * `married` * `itsComplicated` * `openRelationship` * `widowed` * `inDomesticPartnership` * `inCivilUnion`
     */
    value?: string | null;
  }
  /**
   * A person&#39;s past or current residence.
   */
  export interface Schema$Residence {
    /**
     * True if the residence is the person&#39;s current residence; false if the residence is a past residence.
     */
    current?: boolean | null;
    /**
     * Metadata about the residence.
     */
    metadata?: Schema$FieldMetadata;
    /**
     * The address of the residence.
     */
    value?: string | null;
  }
  /**
   * A person&#39;s SIP address. Session Initial Protocol addresses are used for VoIP communications to make voice or video calls over the internet.
   */
  export interface Schema$SipAddress {
    /**
     * Output only. The type of the SIP address translated and formatted in the viewer&#39;s account locale or the `Accept-Language` HTTP header locale.
     */
    formattedType?: string | null;
    /**
     * Metadata about the SIP address.
     */
    metadata?: Schema$FieldMetadata;
    /**
     * The type of the SIP address. The type can be custom or or one of these predefined values:  * `home` * `work` * `mobile` * `other`
     */
    type?: string | null;
    /**
     * The SIP address in the [RFC 3261 19.1](https://tools.ietf.org/html/rfc3261#section-19.1) SIP URI format.
     */
    value?: string | null;
  }
  /**
   * A skill that the person has.
   */
  export interface Schema$Skill {
    /**
     * Metadata about the skill.
     */
    metadata?: Schema$FieldMetadata;
    /**
     * The skill; for example, `underwater basket weaving`.
     */
    value?: string | null;
  }
  /**
   * The source of a field.
   */
  export interface Schema$Source {
    /**
     * **Only populated in `person.metadata.sources`.**  The [HTTP entity tag](https://en.wikipedia.org/wiki/HTTP_ETag) of the source. Used for web cache validation.
     */
    etag?: string | null;
    /**
     * The unique identifier within the source type generated by the server.
     */
    id?: string | null;
    /**
     * Output only. **Only populated in `person.metadata.sources`.**  Metadata about a source of type PROFILE.
     */
    profileMetadata?: Schema$ProfileMetadata;
    /**
     * The source type.
     */
    type?: string | null;
    /**
     * Output only. **Only populated in `person.metadata.sources`.**  Last update timestamp of this source.
     */
    updateTime?: string | null;
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
   * **DEPRECATED**: No data will be returned A brief one-line description of the person.
   */
  export interface Schema$Tagline {
    /**
     * Metadata about the tagline.
     */
    metadata?: Schema$FieldMetadata;
    /**
     * The tagline.
     */
    value?: string | null;
  }
  /**
   * A request to update an existing user contact group. All updated fields will be replaced.
   */
  export interface Schema$UpdateContactGroupRequest {
    /**
     * Required. The contact group to update.
     */
    contactGroup?: Schema$ContactGroup;
  }
  /**
   * A request to update an existing contact&#39;s photo. All requests must have a valid photo format: JPEG or PNG.
   */
  export interface Schema$UpdateContactPhotoRequest {
    /**
     * Optional. A field mask to restrict which fields on the person are returned. Multiple fields can be specified by separating them with commas. Defaults to empty if not set, which will skip the post mutate get. Valid values are:  * addresses * ageRanges * biographies * birthdays * coverPhotos * emailAddresses * events * genders * imClients * interests * locales * memberships * metadata * names * nicknames * occupations * organizations * phoneNumbers * photos * relations * residences * sipAddresses * skills * urls * userDefined
     */
    personFields?: string | null;
    /**
     * Required. Raw photo bytes
     */
    photoBytes?: string | null;
  }
  /**
   * The response for updating a contact&#39;s photo.
   */
  export interface Schema$UpdateContactPhotoResponse {
    /**
     * The updated person, if person_fields is set in the UpdateContactPhotoRequest; otherwise this will be unset.
     */
    person?: Schema$Person;
  }
  /**
   * A person&#39;s associated URLs.
   */
  export interface Schema$Url {
    /**
     * Output only. The type of the URL translated and formatted in the viewer&#39;s account locale or the `Accept-Language` HTTP header locale.
     */
    formattedType?: string | null;
    /**
     * Metadata about the URL.
     */
    metadata?: Schema$FieldMetadata;
    /**
     * The type of the URL. The type can be custom or one of these predefined values:  * `home` * `work` * `blog` * `profile` * `homePage` * `ftp` * `reservations` * `appInstallPage`: website for a Google+ application. * `other`
     */
    type?: string | null;
    /**
     * The URL.
     */
    value?: string | null;
  }
  /**
   * Arbitrary user data that is populated by the end users.
   */
  export interface Schema$UserDefined {
    /**
     * The end user specified key of the user defined data.
     */
    key?: string | null;
    /**
     * Metadata about the user defined data.
     */
    metadata?: Schema$FieldMetadata;
    /**
     * The end user specified value of the user defined data.
     */
    value?: string | null;
  }

  export class Resource$Contactgroups {
    context: APIRequestContext;
    members: Resource$Contactgroups$Members;
    constructor(context: APIRequestContext) {
      this.context = context;
      this.members = new Resource$Contactgroups$Members(this.context);
    }

    /**
     * people.contactGroups.batchGet
     * @desc Get a list of contact groups owned by the authenticated user by specifying a list of contact group resource names.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/people.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const people = google.people('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: [
     *       'https://www.googleapis.com/auth/contacts',
     *       'https://www.googleapis.com/auth/contacts.readonly',
     *     ],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await people.contactGroups.batchGet({
     *     // Optional. Specifies the maximum number of members to return for each group. Defaults
     *     // to 0 if not set, which will return zero members.
     *     maxMembers: 'placeholder-value',
     *     // Required. The resource names of the contact groups to get.
     *     resourceNames: 'placeholder-value',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "responses": []
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias people.contactGroups.batchGet
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {integer=} params.maxMembers Optional. Specifies the maximum number of members to return for each group. Defaults to 0 if not set, which will return zero members.
     * @param {string=} params.resourceNames Required. The resource names of the contact groups to get.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    batchGet(
      params?: Params$Resource$Contactgroups$Batchget,
      options?: MethodOptions
    ): GaxiosPromise<Schema$BatchGetContactGroupsResponse>;
    batchGet(
      params: Params$Resource$Contactgroups$Batchget,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$BatchGetContactGroupsResponse>,
      callback: BodyResponseCallback<Schema$BatchGetContactGroupsResponse>
    ): void;
    batchGet(
      params: Params$Resource$Contactgroups$Batchget,
      callback: BodyResponseCallback<Schema$BatchGetContactGroupsResponse>
    ): void;
    batchGet(
      callback: BodyResponseCallback<Schema$BatchGetContactGroupsResponse>
    ): void;
    batchGet(
      paramsOrCallback?:
        | Params$Resource$Contactgroups$Batchget
        | BodyResponseCallback<Schema$BatchGetContactGroupsResponse>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$BatchGetContactGroupsResponse>,
      callback?: BodyResponseCallback<Schema$BatchGetContactGroupsResponse>
    ): void | GaxiosPromise<Schema$BatchGetContactGroupsResponse> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Contactgroups$Batchget;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Contactgroups$Batchget;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://people.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/contactGroups:batchGet').replace(
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
        createAPIRequest<Schema$BatchGetContactGroupsResponse>(
          parameters,
          callback
        );
      } else {
        return createAPIRequest<Schema$BatchGetContactGroupsResponse>(
          parameters
        );
      }
    }

    /**
     * people.contactGroups.create
     * @desc Create a new contact group owned by the authenticated user.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/people.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const people = google.people('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/contacts'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await people.contactGroups.create({
     *     // Request body metadata
     *     requestBody: {
     *       // request body parameters
     *       // {
     *       //   "contactGroup": {}
     *       // }
     *     },
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "etag": "my_etag",
     *   //   "formattedName": "my_formattedName",
     *   //   "groupType": "my_groupType",
     *   //   "memberCount": 0,
     *   //   "memberResourceNames": [],
     *   //   "metadata": {},
     *   //   "name": "my_name",
     *   //   "resourceName": "my_resourceName"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias people.contactGroups.create
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {().CreateContactGroupRequest} params.requestBody Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    create(
      params?: Params$Resource$Contactgroups$Create,
      options?: MethodOptions
    ): GaxiosPromise<Schema$ContactGroup>;
    create(
      params: Params$Resource$Contactgroups$Create,
      options: MethodOptions | BodyResponseCallback<Schema$ContactGroup>,
      callback: BodyResponseCallback<Schema$ContactGroup>
    ): void;
    create(
      params: Params$Resource$Contactgroups$Create,
      callback: BodyResponseCallback<Schema$ContactGroup>
    ): void;
    create(callback: BodyResponseCallback<Schema$ContactGroup>): void;
    create(
      paramsOrCallback?:
        | Params$Resource$Contactgroups$Create
        | BodyResponseCallback<Schema$ContactGroup>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$ContactGroup>,
      callback?: BodyResponseCallback<Schema$ContactGroup>
    ): void | GaxiosPromise<Schema$ContactGroup> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Contactgroups$Create;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Contactgroups$Create;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://people.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/contactGroups').replace(/([^:]\/)\/+/g, '$1'),
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
        createAPIRequest<Schema$ContactGroup>(parameters, callback);
      } else {
        return createAPIRequest<Schema$ContactGroup>(parameters);
      }
    }

    /**
     * people.contactGroups.delete
     * @desc Delete an existing contact group owned by the authenticated user by specifying a contact group resource name.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/people.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const people = google.people('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/contacts'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await people.contactGroups.delete({
     *     // Optional. Set to true to also delete the contacts in the specified group.
     *     deleteContacts: 'placeholder-value',
     *     // Required. The resource name of the contact group to delete.
     *     resourceName: 'contactGroups/my-contactGroup',
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
     * @alias people.contactGroups.delete
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {boolean=} params.deleteContacts Optional. Set to true to also delete the contacts in the specified group.
     * @param {string} params.resourceName Required. The resource name of the contact group to delete.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    delete(
      params?: Params$Resource$Contactgroups$Delete,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Empty>;
    delete(
      params: Params$Resource$Contactgroups$Delete,
      options: MethodOptions | BodyResponseCallback<Schema$Empty>,
      callback: BodyResponseCallback<Schema$Empty>
    ): void;
    delete(
      params: Params$Resource$Contactgroups$Delete,
      callback: BodyResponseCallback<Schema$Empty>
    ): void;
    delete(callback: BodyResponseCallback<Schema$Empty>): void;
    delete(
      paramsOrCallback?:
        | Params$Resource$Contactgroups$Delete
        | BodyResponseCallback<Schema$Empty>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$Empty>,
      callback?: BodyResponseCallback<Schema$Empty>
    ): void | GaxiosPromise<Schema$Empty> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Contactgroups$Delete;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Contactgroups$Delete;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://people.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+resourceName}').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'DELETE',
          },
          options
        ),
        params,
        requiredParams: ['resourceName'],
        pathParams: ['resourceName'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Empty>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Empty>(parameters);
      }
    }

    /**
     * people.contactGroups.get
     * @desc Get a specific contact group owned by the authenticated user by specifying a contact group resource name.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/people.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const people = google.people('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: [
     *       'https://www.googleapis.com/auth/contacts',
     *       'https://www.googleapis.com/auth/contacts.readonly',
     *     ],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await people.contactGroups.get({
     *     // Optional. Specifies the maximum number of members to return. Defaults to 0 if not
     *     // set, which will return zero members.
     *     maxMembers: 'placeholder-value',
     *     // Required. The resource name of the contact group to get.
     *     resourceName: 'contactGroups/my-contactGroup',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "etag": "my_etag",
     *   //   "formattedName": "my_formattedName",
     *   //   "groupType": "my_groupType",
     *   //   "memberCount": 0,
     *   //   "memberResourceNames": [],
     *   //   "metadata": {},
     *   //   "name": "my_name",
     *   //   "resourceName": "my_resourceName"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias people.contactGroups.get
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {integer=} params.maxMembers Optional. Specifies the maximum number of members to return. Defaults to 0 if not set, which will return zero members.
     * @param {string} params.resourceName Required. The resource name of the contact group to get.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    get(
      params?: Params$Resource$Contactgroups$Get,
      options?: MethodOptions
    ): GaxiosPromise<Schema$ContactGroup>;
    get(
      params: Params$Resource$Contactgroups$Get,
      options: MethodOptions | BodyResponseCallback<Schema$ContactGroup>,
      callback: BodyResponseCallback<Schema$ContactGroup>
    ): void;
    get(
      params: Params$Resource$Contactgroups$Get,
      callback: BodyResponseCallback<Schema$ContactGroup>
    ): void;
    get(callback: BodyResponseCallback<Schema$ContactGroup>): void;
    get(
      paramsOrCallback?:
        | Params$Resource$Contactgroups$Get
        | BodyResponseCallback<Schema$ContactGroup>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$ContactGroup>,
      callback?: BodyResponseCallback<Schema$ContactGroup>
    ): void | GaxiosPromise<Schema$ContactGroup> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Contactgroups$Get;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Contactgroups$Get;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://people.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+resourceName}').replace(
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
        createAPIRequest<Schema$ContactGroup>(parameters, callback);
      } else {
        return createAPIRequest<Schema$ContactGroup>(parameters);
      }
    }

    /**
     * people.contactGroups.list
     * @desc List all contact groups owned by the authenticated user. Members of the contact groups are not populated.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/people.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const people = google.people('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: [
     *       'https://www.googleapis.com/auth/contacts',
     *       'https://www.googleapis.com/auth/contacts.readonly',
     *     ],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await people.contactGroups.list({
     *     // Optional. The maximum number of resources to return. Valid values are between 1 and
     *     // 1000, inclusive. Defaults to 30 if not set or set to 0.
     *     pageSize: 'placeholder-value',
     *     // Optional. The next_page_token value returned from a previous call to
     *     // [ListContactGroups](/people/api/rest/v1/contactgroups/list).
     *     // Requests the next page of resources.
     *     pageToken: 'placeholder-value',
     *     // Optional. A sync token, returned by a previous call to `contactgroups.list`.
     *     // Only resources changed since the sync token was created will be returned.
     *     syncToken: 'placeholder-value',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "contactGroups": [],
     *   //   "nextPageToken": "my_nextPageToken",
     *   //   "nextSyncToken": "my_nextSyncToken",
     *   //   "totalItems": 0
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias people.contactGroups.list
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {integer=} params.pageSize Optional. The maximum number of resources to return. Valid values are between 1 and 1000, inclusive. Defaults to 30 if not set or set to 0.
     * @param {string=} params.pageToken Optional. The next_page_token value returned from a previous call to [ListContactGroups](/people/api/rest/v1/contactgroups/list). Requests the next page of resources.
     * @param {string=} params.syncToken Optional. A sync token, returned by a previous call to `contactgroups.list`. Only resources changed since the sync token was created will be returned.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    list(
      params?: Params$Resource$Contactgroups$List,
      options?: MethodOptions
    ): GaxiosPromise<Schema$ListContactGroupsResponse>;
    list(
      params: Params$Resource$Contactgroups$List,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$ListContactGroupsResponse>,
      callback: BodyResponseCallback<Schema$ListContactGroupsResponse>
    ): void;
    list(
      params: Params$Resource$Contactgroups$List,
      callback: BodyResponseCallback<Schema$ListContactGroupsResponse>
    ): void;
    list(
      callback: BodyResponseCallback<Schema$ListContactGroupsResponse>
    ): void;
    list(
      paramsOrCallback?:
        | Params$Resource$Contactgroups$List
        | BodyResponseCallback<Schema$ListContactGroupsResponse>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$ListContactGroupsResponse>,
      callback?: BodyResponseCallback<Schema$ListContactGroupsResponse>
    ): void | GaxiosPromise<Schema$ListContactGroupsResponse> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Contactgroups$List;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Contactgroups$List;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://people.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/contactGroups').replace(/([^:]\/)\/+/g, '$1'),
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
        createAPIRequest<Schema$ListContactGroupsResponse>(
          parameters,
          callback
        );
      } else {
        return createAPIRequest<Schema$ListContactGroupsResponse>(parameters);
      }
    }

    /**
     * people.contactGroups.update
     * @desc Update the name of an existing contact group owned by the authenticated user.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/people.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const people = google.people('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/contacts'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await people.contactGroups.update({
     *     // The resource name for the contact group, assigned by the server. An ASCII
     *     // string, in the form of `contactGroups/{contact_group_id}`.
     *     resourceName: 'contactGroups/my-contactGroup',
     *
     *     // Request body metadata
     *     requestBody: {
     *       // request body parameters
     *       // {
     *       //   "contactGroup": {}
     *       // }
     *     },
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "etag": "my_etag",
     *   //   "formattedName": "my_formattedName",
     *   //   "groupType": "my_groupType",
     *   //   "memberCount": 0,
     *   //   "memberResourceNames": [],
     *   //   "metadata": {},
     *   //   "name": "my_name",
     *   //   "resourceName": "my_resourceName"
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias people.contactGroups.update
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.resourceName The resource name for the contact group, assigned by the server. An ASCII string, in the form of `contactGroups/{contact_group_id}`.
     * @param {().UpdateContactGroupRequest} params.requestBody Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    update(
      params?: Params$Resource$Contactgroups$Update,
      options?: MethodOptions
    ): GaxiosPromise<Schema$ContactGroup>;
    update(
      params: Params$Resource$Contactgroups$Update,
      options: MethodOptions | BodyResponseCallback<Schema$ContactGroup>,
      callback: BodyResponseCallback<Schema$ContactGroup>
    ): void;
    update(
      params: Params$Resource$Contactgroups$Update,
      callback: BodyResponseCallback<Schema$ContactGroup>
    ): void;
    update(callback: BodyResponseCallback<Schema$ContactGroup>): void;
    update(
      paramsOrCallback?:
        | Params$Resource$Contactgroups$Update
        | BodyResponseCallback<Schema$ContactGroup>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$ContactGroup>,
      callback?: BodyResponseCallback<Schema$ContactGroup>
    ): void | GaxiosPromise<Schema$ContactGroup> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Contactgroups$Update;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Contactgroups$Update;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://people.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+resourceName}').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'PUT',
          },
          options
        ),
        params,
        requiredParams: ['resourceName'],
        pathParams: ['resourceName'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$ContactGroup>(parameters, callback);
      } else {
        return createAPIRequest<Schema$ContactGroup>(parameters);
      }
    }
  }

  export interface Params$Resource$Contactgroups$Batchget
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Optional. Specifies the maximum number of members to return for each group. Defaults to 0 if not set, which will return zero members.
     */
    maxMembers?: number;
    /**
     * Required. The resource names of the contact groups to get.
     */
    resourceNames?: string[];
  }
  export interface Params$Resource$Contactgroups$Create
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Request body metadata
     */
    requestBody?: Schema$CreateContactGroupRequest;
  }
  export interface Params$Resource$Contactgroups$Delete
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Optional. Set to true to also delete the contacts in the specified group.
     */
    deleteContacts?: boolean;
    /**
     * Required. The resource name of the contact group to delete.
     */
    resourceName?: string;
  }
  export interface Params$Resource$Contactgroups$Get
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Optional. Specifies the maximum number of members to return. Defaults to 0 if not set, which will return zero members.
     */
    maxMembers?: number;
    /**
     * Required. The resource name of the contact group to get.
     */
    resourceName?: string;
  }
  export interface Params$Resource$Contactgroups$List
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Optional. The maximum number of resources to return. Valid values are between 1 and 1000, inclusive. Defaults to 30 if not set or set to 0.
     */
    pageSize?: number;
    /**
     * Optional. The next_page_token value returned from a previous call to [ListContactGroups](/people/api/rest/v1/contactgroups/list). Requests the next page of resources.
     */
    pageToken?: string;
    /**
     * Optional. A sync token, returned by a previous call to `contactgroups.list`. Only resources changed since the sync token was created will be returned.
     */
    syncToken?: string;
  }
  export interface Params$Resource$Contactgroups$Update
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * The resource name for the contact group, assigned by the server. An ASCII string, in the form of `contactGroups/{contact_group_id}`.
     */
    resourceName?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$UpdateContactGroupRequest;
  }

  export class Resource$Contactgroups$Members {
    context: APIRequestContext;
    constructor(context: APIRequestContext) {
      this.context = context;
    }

    /**
     * people.contactGroups.members.modify
     * @desc Modify the members of a contact group owned by the authenticated user.  The only system contact groups that can have members added are `contactGroups/myContacts` and `contactGroups/starred`. Other system contact groups are deprecated and can only have contacts removed.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/people.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const people = google.people('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/contacts'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await people.contactGroups.members.modify({
     *     // Required. The resource name of the contact group to modify.
     *     resourceName: 'contactGroups/my-contactGroup',
     *
     *     // Request body metadata
     *     requestBody: {
     *       // request body parameters
     *       // {
     *       //   "resourceNamesToAdd": [],
     *       //   "resourceNamesToRemove": []
     *       // }
     *     },
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "canNotRemoveLastContactGroupResourceNames": [],
     *   //   "notFoundResourceNames": []
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias people.contactGroups.members.modify
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.resourceName Required. The resource name of the contact group to modify.
     * @param {().ModifyContactGroupMembersRequest} params.requestBody Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    modify(
      params?: Params$Resource$Contactgroups$Members$Modify,
      options?: MethodOptions
    ): GaxiosPromise<Schema$ModifyContactGroupMembersResponse>;
    modify(
      params: Params$Resource$Contactgroups$Members$Modify,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$ModifyContactGroupMembersResponse>,
      callback: BodyResponseCallback<Schema$ModifyContactGroupMembersResponse>
    ): void;
    modify(
      params: Params$Resource$Contactgroups$Members$Modify,
      callback: BodyResponseCallback<Schema$ModifyContactGroupMembersResponse>
    ): void;
    modify(
      callback: BodyResponseCallback<Schema$ModifyContactGroupMembersResponse>
    ): void;
    modify(
      paramsOrCallback?:
        | Params$Resource$Contactgroups$Members$Modify
        | BodyResponseCallback<Schema$ModifyContactGroupMembersResponse>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$ModifyContactGroupMembersResponse>,
      callback?: BodyResponseCallback<Schema$ModifyContactGroupMembersResponse>
    ): void | GaxiosPromise<Schema$ModifyContactGroupMembersResponse> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Contactgroups$Members$Modify;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Contactgroups$Members$Modify;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://people.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+resourceName}/members:modify').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'POST',
          },
          options
        ),
        params,
        requiredParams: ['resourceName'],
        pathParams: ['resourceName'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$ModifyContactGroupMembersResponse>(
          parameters,
          callback
        );
      } else {
        return createAPIRequest<Schema$ModifyContactGroupMembersResponse>(
          parameters
        );
      }
    }
  }

  export interface Params$Resource$Contactgroups$Members$Modify
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required. The resource name of the contact group to modify.
     */
    resourceName?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$ModifyContactGroupMembersRequest;
  }

  export class Resource$People {
    context: APIRequestContext;
    connections: Resource$People$Connections;
    constructor(context: APIRequestContext) {
      this.context = context;
      this.connections = new Resource$People$Connections(this.context);
    }

    /**
     * people.people.createContact
     * @desc Create a new contact and return the person resource for that contact.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/people.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const people = google.people('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/contacts'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await people.people.createContact({
     *     // Request body metadata
     *     requestBody: {
     *       // request body parameters
     *       // {
     *       //   "addresses": [],
     *       //   "ageRange": "my_ageRange",
     *       //   "ageRanges": [],
     *       //   "biographies": [],
     *       //   "birthdays": [],
     *       //   "braggingRights": [],
     *       //   "coverPhotos": [],
     *       //   "emailAddresses": [],
     *       //   "etag": "my_etag",
     *       //   "events": [],
     *       //   "genders": [],
     *       //   "imClients": [],
     *       //   "interests": [],
     *       //   "locales": [],
     *       //   "memberships": [],
     *       //   "metadata": {},
     *       //   "names": [],
     *       //   "nicknames": [],
     *       //   "occupations": [],
     *       //   "organizations": [],
     *       //   "phoneNumbers": [],
     *       //   "photos": [],
     *       //   "relations": [],
     *       //   "relationshipInterests": [],
     *       //   "relationshipStatuses": [],
     *       //   "residences": [],
     *       //   "resourceName": "my_resourceName",
     *       //   "sipAddresses": [],
     *       //   "skills": [],
     *       //   "taglines": [],
     *       //   "urls": [],
     *       //   "userDefined": []
     *       // }
     *     },
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "addresses": [],
     *   //   "ageRange": "my_ageRange",
     *   //   "ageRanges": [],
     *   //   "biographies": [],
     *   //   "birthdays": [],
     *   //   "braggingRights": [],
     *   //   "coverPhotos": [],
     *   //   "emailAddresses": [],
     *   //   "etag": "my_etag",
     *   //   "events": [],
     *   //   "genders": [],
     *   //   "imClients": [],
     *   //   "interests": [],
     *   //   "locales": [],
     *   //   "memberships": [],
     *   //   "metadata": {},
     *   //   "names": [],
     *   //   "nicknames": [],
     *   //   "occupations": [],
     *   //   "organizations": [],
     *   //   "phoneNumbers": [],
     *   //   "photos": [],
     *   //   "relations": [],
     *   //   "relationshipInterests": [],
     *   //   "relationshipStatuses": [],
     *   //   "residences": [],
     *   //   "resourceName": "my_resourceName",
     *   //   "sipAddresses": [],
     *   //   "skills": [],
     *   //   "taglines": [],
     *   //   "urls": [],
     *   //   "userDefined": []
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias people.people.createContact
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {().Person} params.requestBody Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    createContact(
      params?: Params$Resource$People$Createcontact,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Person>;
    createContact(
      params: Params$Resource$People$Createcontact,
      options: MethodOptions | BodyResponseCallback<Schema$Person>,
      callback: BodyResponseCallback<Schema$Person>
    ): void;
    createContact(
      params: Params$Resource$People$Createcontact,
      callback: BodyResponseCallback<Schema$Person>
    ): void;
    createContact(callback: BodyResponseCallback<Schema$Person>): void;
    createContact(
      paramsOrCallback?:
        | Params$Resource$People$Createcontact
        | BodyResponseCallback<Schema$Person>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$Person>,
      callback?: BodyResponseCallback<Schema$Person>
    ): void | GaxiosPromise<Schema$Person> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$People$Createcontact;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$People$Createcontact;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://people.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/people:createContact').replace(
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
        createAPIRequest<Schema$Person>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Person>(parameters);
      }
    }

    /**
     * people.people.deleteContact
     * @desc Delete a contact person. Any non-contact data will not be deleted.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/people.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const people = google.people('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/contacts'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await people.people.deleteContact({
     *     // Required. The resource name of the contact to delete.
     *     resourceName: 'people/[^/]+',
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
     * @alias people.people.deleteContact
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.resourceName Required. The resource name of the contact to delete.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    deleteContact(
      params?: Params$Resource$People$Deletecontact,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Empty>;
    deleteContact(
      params: Params$Resource$People$Deletecontact,
      options: MethodOptions | BodyResponseCallback<Schema$Empty>,
      callback: BodyResponseCallback<Schema$Empty>
    ): void;
    deleteContact(
      params: Params$Resource$People$Deletecontact,
      callback: BodyResponseCallback<Schema$Empty>
    ): void;
    deleteContact(callback: BodyResponseCallback<Schema$Empty>): void;
    deleteContact(
      paramsOrCallback?:
        | Params$Resource$People$Deletecontact
        | BodyResponseCallback<Schema$Empty>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$Empty>,
      callback?: BodyResponseCallback<Schema$Empty>
    ): void | GaxiosPromise<Schema$Empty> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$People$Deletecontact;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$People$Deletecontact;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://people.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+resourceName}:deleteContact').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'DELETE',
          },
          options
        ),
        params,
        requiredParams: ['resourceName'],
        pathParams: ['resourceName'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Empty>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Empty>(parameters);
      }
    }

    /**
     * people.people.deleteContactPhoto
     * @desc Delete a contact's photo.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/people.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const people = google.people('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/contacts'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await people.people.deleteContactPhoto({
     *     // Optional. A field mask to restrict which fields on the person are returned. Multiple
     *     // fields can be specified by separating them with commas. Defaults to empty
     *     // if not set, which will skip the post mutate get. Valid values are:
     *     //
     *     // * addresses
     *     // * ageRanges
     *     // * biographies
     *     // * birthdays
     *     // * coverPhotos
     *     // * emailAddresses
     *     // * events
     *     // * genders
     *     // * imClients
     *     // * interests
     *     // * locales
     *     // * memberships
     *     // * metadata
     *     // * names
     *     // * nicknames
     *     // * occupations
     *     // * organizations
     *     // * phoneNumbers
     *     // * photos
     *     // * relations
     *     // * residences
     *     // * sipAddresses
     *     // * skills
     *     // * urls
     *     // * userDefined
     *     personFields: 'placeholder-value',
     *     // Required. The resource name of the contact whose photo will be deleted.
     *     resourceName: 'people/[^/]+',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "person": {}
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias people.people.deleteContactPhoto
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string=} params.personFields Optional. A field mask to restrict which fields on the person are returned. Multiple fields can be specified by separating them with commas. Defaults to empty if not set, which will skip the post mutate get. Valid values are:  * addresses * ageRanges * biographies * birthdays * coverPhotos * emailAddresses * events * genders * imClients * interests * locales * memberships * metadata * names * nicknames * occupations * organizations * phoneNumbers * photos * relations * residences * sipAddresses * skills * urls * userDefined
     * @param {string} params.resourceName Required. The resource name of the contact whose photo will be deleted.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    deleteContactPhoto(
      params?: Params$Resource$People$Deletecontactphoto,
      options?: MethodOptions
    ): GaxiosPromise<Schema$DeleteContactPhotoResponse>;
    deleteContactPhoto(
      params: Params$Resource$People$Deletecontactphoto,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$DeleteContactPhotoResponse>,
      callback: BodyResponseCallback<Schema$DeleteContactPhotoResponse>
    ): void;
    deleteContactPhoto(
      params: Params$Resource$People$Deletecontactphoto,
      callback: BodyResponseCallback<Schema$DeleteContactPhotoResponse>
    ): void;
    deleteContactPhoto(
      callback: BodyResponseCallback<Schema$DeleteContactPhotoResponse>
    ): void;
    deleteContactPhoto(
      paramsOrCallback?:
        | Params$Resource$People$Deletecontactphoto
        | BodyResponseCallback<Schema$DeleteContactPhotoResponse>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$DeleteContactPhotoResponse>,
      callback?: BodyResponseCallback<Schema$DeleteContactPhotoResponse>
    ): void | GaxiosPromise<Schema$DeleteContactPhotoResponse> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$People$Deletecontactphoto;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$People$Deletecontactphoto;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://people.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+resourceName}:deleteContactPhoto').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'DELETE',
          },
          options
        ),
        params,
        requiredParams: ['resourceName'],
        pathParams: ['resourceName'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$DeleteContactPhotoResponse>(
          parameters,
          callback
        );
      } else {
        return createAPIRequest<Schema$DeleteContactPhotoResponse>(parameters);
      }
    }

    /**
     * people.people.get
     * @desc Provides information about a person by specifying a resource name. Use `people/me` to indicate the authenticated user.  The request throws a 400 error if 'personFields' is not specified.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/people.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const people = google.people('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: [
     *       'https://www.googleapis.com/auth/contacts',
     *       'https://www.googleapis.com/auth/contacts.readonly',
     *       'https://www.googleapis.com/auth/directory.readonly',
     *       'https://www.googleapis.com/auth/user.addresses.read',
     *       'https://www.googleapis.com/auth/user.birthday.read',
     *       'https://www.googleapis.com/auth/user.emails.read',
     *       'https://www.googleapis.com/auth/user.gender.read',
     *       'https://www.googleapis.com/auth/user.organization.read',
     *       'https://www.googleapis.com/auth/user.phonenumbers.read',
     *       'https://www.googleapis.com/auth/userinfo.email',
     *       'https://www.googleapis.com/auth/userinfo.profile',
     *     ],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await people.people.get({
     *     // Required. A field mask to restrict which fields on the person are returned. Multiple
     *     // fields can be specified by separating them with commas. Valid values are:
     *     //
     *     // * addresses
     *     // * ageRanges
     *     // * biographies
     *     // * birthdays
     *     // * coverPhotos
     *     // * emailAddresses
     *     // * events
     *     // * genders
     *     // * imClients
     *     // * interests
     *     // * locales
     *     // * memberships
     *     // * metadata
     *     // * names
     *     // * nicknames
     *     // * occupations
     *     // * organizations
     *     // * phoneNumbers
     *     // * photos
     *     // * relations
     *     // * residences
     *     // * sipAddresses
     *     // * skills
     *     // * urls
     *     // * userDefined
     *     personFields: 'placeholder-value',
     *     // Required. Comma-separated list of person fields to be included in the response. Each
     *     // path should start with `person.`: for example, `person.names` or
     *     // `person.photos`.
     *     'requestMask.includeField': 'placeholder-value',
     *     // Required. The resource name of the person to provide information about.
     *     //
     *     // - To get information about the authenticated user, specify `people/me`.
     *     // - To get information about a google account, specify
     *     //  `people/{account_id}`.
     *     // - To get information about a contact, specify the resource name that
     *     //   identifies the contact as returned by
     *     // [`people.connections.list`](/people/api/rest/v1/people.connections/list).
     *     resourceName: 'people/[^/]+',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "addresses": [],
     *   //   "ageRange": "my_ageRange",
     *   //   "ageRanges": [],
     *   //   "biographies": [],
     *   //   "birthdays": [],
     *   //   "braggingRights": [],
     *   //   "coverPhotos": [],
     *   //   "emailAddresses": [],
     *   //   "etag": "my_etag",
     *   //   "events": [],
     *   //   "genders": [],
     *   //   "imClients": [],
     *   //   "interests": [],
     *   //   "locales": [],
     *   //   "memberships": [],
     *   //   "metadata": {},
     *   //   "names": [],
     *   //   "nicknames": [],
     *   //   "occupations": [],
     *   //   "organizations": [],
     *   //   "phoneNumbers": [],
     *   //   "photos": [],
     *   //   "relations": [],
     *   //   "relationshipInterests": [],
     *   //   "relationshipStatuses": [],
     *   //   "residences": [],
     *   //   "resourceName": "my_resourceName",
     *   //   "sipAddresses": [],
     *   //   "skills": [],
     *   //   "taglines": [],
     *   //   "urls": [],
     *   //   "userDefined": []
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias people.people.get
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string=} params.personFields Required. A field mask to restrict which fields on the person are returned. Multiple fields can be specified by separating them with commas. Valid values are:  * addresses * ageRanges * biographies * birthdays * coverPhotos * emailAddresses * events * genders * imClients * interests * locales * memberships * metadata * names * nicknames * occupations * organizations * phoneNumbers * photos * relations * residences * sipAddresses * skills * urls * userDefined
     * @param {string=} params.requestMask.includeField Required. Comma-separated list of person fields to be included in the response. Each path should start with `person.`: for example, `person.names` or `person.photos`.
     * @param {string} params.resourceName Required. The resource name of the person to provide information about.  - To get information about the authenticated user, specify `people/me`. - To get information about a google account, specify  `people/{account_id}`. - To get information about a contact, specify the resource name that   identifies the contact as returned by [`people.connections.list`](/people/api/rest/v1/people.connections/list).
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    get(
      params?: Params$Resource$People$Get,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Person>;
    get(
      params: Params$Resource$People$Get,
      options: MethodOptions | BodyResponseCallback<Schema$Person>,
      callback: BodyResponseCallback<Schema$Person>
    ): void;
    get(
      params: Params$Resource$People$Get,
      callback: BodyResponseCallback<Schema$Person>
    ): void;
    get(callback: BodyResponseCallback<Schema$Person>): void;
    get(
      paramsOrCallback?:
        | Params$Resource$People$Get
        | BodyResponseCallback<Schema$Person>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$Person>,
      callback?: BodyResponseCallback<Schema$Person>
    ): void | GaxiosPromise<Schema$Person> {
      let params = (paramsOrCallback || {}) as Params$Resource$People$Get;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$People$Get;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://people.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+resourceName}').replace(
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
        createAPIRequest<Schema$Person>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Person>(parameters);
      }
    }

    /**
     * people.people.getBatchGet
     * @desc Provides information about a list of specific people by specifying a list of requested resource names. Use `people/me` to indicate the authenticated user.  The request throws a 400 error if 'personFields' is not specified.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/people.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const people = google.people('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: [
     *       'https://www.googleapis.com/auth/contacts',
     *       'https://www.googleapis.com/auth/contacts.readonly',
     *       'https://www.googleapis.com/auth/directory.readonly',
     *       'https://www.googleapis.com/auth/user.addresses.read',
     *       'https://www.googleapis.com/auth/user.birthday.read',
     *       'https://www.googleapis.com/auth/user.emails.read',
     *       'https://www.googleapis.com/auth/user.gender.read',
     *       'https://www.googleapis.com/auth/user.organization.read',
     *       'https://www.googleapis.com/auth/user.phonenumbers.read',
     *       'https://www.googleapis.com/auth/userinfo.email',
     *       'https://www.googleapis.com/auth/userinfo.profile',
     *     ],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await people.people.getBatchGet({
     *     // Required. A field mask to restrict which fields on each person are returned. Multiple
     *     // fields can be specified by separating them with commas. Valid values are:
     *     //
     *     // * addresses
     *     // * ageRanges
     *     // * biographies
     *     // * birthdays
     *     // * coverPhotos
     *     // * emailAddresses
     *     // * events
     *     // * genders
     *     // * imClients
     *     // * interests
     *     // * locales
     *     // * memberships
     *     // * metadata
     *     // * names
     *     // * nicknames
     *     // * occupations
     *     // * organizations
     *     // * phoneNumbers
     *     // * photos
     *     // * relations
     *     // * residences
     *     // * sipAddresses
     *     // * skills
     *     // * urls
     *     // * userDefined
     *     personFields: 'placeholder-value',
     *     // Required. Comma-separated list of person fields to be included in the response. Each
     *     // path should start with `person.`: for example, `person.names` or
     *     // `person.photos`.
     *     'requestMask.includeField': 'placeholder-value',
     *     // Required. The resource names of the people to provide information about.
     *     //
     *     // - To get information about the authenticated user, specify `people/me`.
     *     // - To get information about a google account, specify
     *     //   `people/{account_id}`.
     *     // - To get information about a contact, specify the resource name that
     *     //   identifies the contact as returned by
     *     // [`people.connections.list`](/people/api/rest/v1/people.connections/list).
     *     //
     *     // You can include up to 50 resource names in one request.
     *     resourceNames: 'placeholder-value',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "responses": []
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias people.people.getBatchGet
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string=} params.personFields Required. A field mask to restrict which fields on each person are returned. Multiple fields can be specified by separating them with commas. Valid values are:  * addresses * ageRanges * biographies * birthdays * coverPhotos * emailAddresses * events * genders * imClients * interests * locales * memberships * metadata * names * nicknames * occupations * organizations * phoneNumbers * photos * relations * residences * sipAddresses * skills * urls * userDefined
     * @param {string=} params.requestMask.includeField Required. Comma-separated list of person fields to be included in the response. Each path should start with `person.`: for example, `person.names` or `person.photos`.
     * @param {string=} params.resourceNames Required. The resource names of the people to provide information about.  - To get information about the authenticated user, specify `people/me`. - To get information about a google account, specify   `people/{account_id}`. - To get information about a contact, specify the resource name that   identifies the contact as returned by [`people.connections.list`](/people/api/rest/v1/people.connections/list).  You can include up to 50 resource names in one request.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    getBatchGet(
      params?: Params$Resource$People$Getbatchget,
      options?: MethodOptions
    ): GaxiosPromise<Schema$GetPeopleResponse>;
    getBatchGet(
      params: Params$Resource$People$Getbatchget,
      options: MethodOptions | BodyResponseCallback<Schema$GetPeopleResponse>,
      callback: BodyResponseCallback<Schema$GetPeopleResponse>
    ): void;
    getBatchGet(
      params: Params$Resource$People$Getbatchget,
      callback: BodyResponseCallback<Schema$GetPeopleResponse>
    ): void;
    getBatchGet(callback: BodyResponseCallback<Schema$GetPeopleResponse>): void;
    getBatchGet(
      paramsOrCallback?:
        | Params$Resource$People$Getbatchget
        | BodyResponseCallback<Schema$GetPeopleResponse>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$GetPeopleResponse>,
      callback?: BodyResponseCallback<Schema$GetPeopleResponse>
    ): void | GaxiosPromise<Schema$GetPeopleResponse> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$People$Getbatchget;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$People$Getbatchget;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://people.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/people:batchGet').replace(
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
        createAPIRequest<Schema$GetPeopleResponse>(parameters, callback);
      } else {
        return createAPIRequest<Schema$GetPeopleResponse>(parameters);
      }
    }

    /**
     * people.people.updateContact
     * @desc Update contact data for an existing contact person. Any non-contact data will not be modified.  The request throws a 400 error if `updatePersonFields` is not specified.  The request throws a 400 error if `person.metadata.sources` is not specified for the contact to be updated.  The request throws a 400 error with an error with reason `"failedPrecondition"` if `person.metadata.sources.etag` is different than the contact's etag, which indicates the contact has changed since its data was read. Clients should get the latest person and re-apply their updates to the latest person.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/people.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const people = google.people('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/contacts'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await people.people.updateContact({
     *     // The resource name for the person, assigned by the server. An ASCII string
     *     // with a max length of 27 characters, in the form of
     *     // `people/{person_id}`.
     *     resourceName: 'people/[^/]+',
     *     // Required. A field mask to restrict which fields on the person are updated. Multiple
     *     // fields can be specified by separating them with commas.
     *     // All updated fields will be replaced. Valid values are:
     *     //
     *     // * addresses
     *     // * biographies
     *     // * birthdays
     *     // * emailAddresses
     *     // * events
     *     // * genders
     *     // * imClients
     *     // * interests
     *     // * locales
     *     // * memberships
     *     // * names
     *     // * nicknames
     *     // * occupations
     *     // * organizations
     *     // * phoneNumbers
     *     // * relations
     *     // * residences
     *     // * sipAddresses
     *     // * urls
     *     // * userDefined
     *     updatePersonFields: 'placeholder-value',
     *
     *     // Request body metadata
     *     requestBody: {
     *       // request body parameters
     *       // {
     *       //   "addresses": [],
     *       //   "ageRange": "my_ageRange",
     *       //   "ageRanges": [],
     *       //   "biographies": [],
     *       //   "birthdays": [],
     *       //   "braggingRights": [],
     *       //   "coverPhotos": [],
     *       //   "emailAddresses": [],
     *       //   "etag": "my_etag",
     *       //   "events": [],
     *       //   "genders": [],
     *       //   "imClients": [],
     *       //   "interests": [],
     *       //   "locales": [],
     *       //   "memberships": [],
     *       //   "metadata": {},
     *       //   "names": [],
     *       //   "nicknames": [],
     *       //   "occupations": [],
     *       //   "organizations": [],
     *       //   "phoneNumbers": [],
     *       //   "photos": [],
     *       //   "relations": [],
     *       //   "relationshipInterests": [],
     *       //   "relationshipStatuses": [],
     *       //   "residences": [],
     *       //   "resourceName": "my_resourceName",
     *       //   "sipAddresses": [],
     *       //   "skills": [],
     *       //   "taglines": [],
     *       //   "urls": [],
     *       //   "userDefined": []
     *       // }
     *     },
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "addresses": [],
     *   //   "ageRange": "my_ageRange",
     *   //   "ageRanges": [],
     *   //   "biographies": [],
     *   //   "birthdays": [],
     *   //   "braggingRights": [],
     *   //   "coverPhotos": [],
     *   //   "emailAddresses": [],
     *   //   "etag": "my_etag",
     *   //   "events": [],
     *   //   "genders": [],
     *   //   "imClients": [],
     *   //   "interests": [],
     *   //   "locales": [],
     *   //   "memberships": [],
     *   //   "metadata": {},
     *   //   "names": [],
     *   //   "nicknames": [],
     *   //   "occupations": [],
     *   //   "organizations": [],
     *   //   "phoneNumbers": [],
     *   //   "photos": [],
     *   //   "relations": [],
     *   //   "relationshipInterests": [],
     *   //   "relationshipStatuses": [],
     *   //   "residences": [],
     *   //   "resourceName": "my_resourceName",
     *   //   "sipAddresses": [],
     *   //   "skills": [],
     *   //   "taglines": [],
     *   //   "urls": [],
     *   //   "userDefined": []
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias people.people.updateContact
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.resourceName The resource name for the person, assigned by the server. An ASCII string with a max length of 27 characters, in the form of `people/{person_id}`.
     * @param {string=} params.updatePersonFields Required. A field mask to restrict which fields on the person are updated. Multiple fields can be specified by separating them with commas. All updated fields will be replaced. Valid values are:  * addresses * biographies * birthdays * emailAddresses * events * genders * imClients * interests * locales * memberships * names * nicknames * occupations * organizations * phoneNumbers * relations * residences * sipAddresses * urls * userDefined
     * @param {().Person} params.requestBody Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    updateContact(
      params?: Params$Resource$People$Updatecontact,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Person>;
    updateContact(
      params: Params$Resource$People$Updatecontact,
      options: MethodOptions | BodyResponseCallback<Schema$Person>,
      callback: BodyResponseCallback<Schema$Person>
    ): void;
    updateContact(
      params: Params$Resource$People$Updatecontact,
      callback: BodyResponseCallback<Schema$Person>
    ): void;
    updateContact(callback: BodyResponseCallback<Schema$Person>): void;
    updateContact(
      paramsOrCallback?:
        | Params$Resource$People$Updatecontact
        | BodyResponseCallback<Schema$Person>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$Person>,
      callback?: BodyResponseCallback<Schema$Person>
    ): void | GaxiosPromise<Schema$Person> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$People$Updatecontact;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$People$Updatecontact;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://people.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+resourceName}:updateContact').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'PATCH',
          },
          options
        ),
        params,
        requiredParams: ['resourceName'],
        pathParams: ['resourceName'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Person>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Person>(parameters);
      }
    }

    /**
     * people.people.updateContactPhoto
     * @desc Update a contact's photo.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/people.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const people = google.people('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: ['https://www.googleapis.com/auth/contacts'],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await people.people.updateContactPhoto({
     *     // Required. Person resource name
     *     resourceName: 'people/[^/]+',
     *
     *     // Request body metadata
     *     requestBody: {
     *       // request body parameters
     *       // {
     *       //   "personFields": "my_personFields",
     *       //   "photoBytes": "my_photoBytes"
     *       // }
     *     },
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "person": {}
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias people.people.updateContactPhoto
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.resourceName Required. Person resource name
     * @param {().UpdateContactPhotoRequest} params.requestBody Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    updateContactPhoto(
      params?: Params$Resource$People$Updatecontactphoto,
      options?: MethodOptions
    ): GaxiosPromise<Schema$UpdateContactPhotoResponse>;
    updateContactPhoto(
      params: Params$Resource$People$Updatecontactphoto,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$UpdateContactPhotoResponse>,
      callback: BodyResponseCallback<Schema$UpdateContactPhotoResponse>
    ): void;
    updateContactPhoto(
      params: Params$Resource$People$Updatecontactphoto,
      callback: BodyResponseCallback<Schema$UpdateContactPhotoResponse>
    ): void;
    updateContactPhoto(
      callback: BodyResponseCallback<Schema$UpdateContactPhotoResponse>
    ): void;
    updateContactPhoto(
      paramsOrCallback?:
        | Params$Resource$People$Updatecontactphoto
        | BodyResponseCallback<Schema$UpdateContactPhotoResponse>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$UpdateContactPhotoResponse>,
      callback?: BodyResponseCallback<Schema$UpdateContactPhotoResponse>
    ): void | GaxiosPromise<Schema$UpdateContactPhotoResponse> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$People$Updatecontactphoto;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$People$Updatecontactphoto;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://people.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+resourceName}:updateContactPhoto').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'PATCH',
          },
          options
        ),
        params,
        requiredParams: ['resourceName'],
        pathParams: ['resourceName'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$UpdateContactPhotoResponse>(
          parameters,
          callback
        );
      } else {
        return createAPIRequest<Schema$UpdateContactPhotoResponse>(parameters);
      }
    }
  }

  export interface Params$Resource$People$Createcontact
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Request body metadata
     */
    requestBody?: Schema$Person;
  }
  export interface Params$Resource$People$Deletecontact
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required. The resource name of the contact to delete.
     */
    resourceName?: string;
  }
  export interface Params$Resource$People$Deletecontactphoto
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Optional. A field mask to restrict which fields on the person are returned. Multiple fields can be specified by separating them with commas. Defaults to empty if not set, which will skip the post mutate get. Valid values are:  * addresses * ageRanges * biographies * birthdays * coverPhotos * emailAddresses * events * genders * imClients * interests * locales * memberships * metadata * names * nicknames * occupations * organizations * phoneNumbers * photos * relations * residences * sipAddresses * skills * urls * userDefined
     */
    personFields?: string;
    /**
     * Required. The resource name of the contact whose photo will be deleted.
     */
    resourceName?: string;
  }
  export interface Params$Resource$People$Get extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required. A field mask to restrict which fields on the person are returned. Multiple fields can be specified by separating them with commas. Valid values are:  * addresses * ageRanges * biographies * birthdays * coverPhotos * emailAddresses * events * genders * imClients * interests * locales * memberships * metadata * names * nicknames * occupations * organizations * phoneNumbers * photos * relations * residences * sipAddresses * skills * urls * userDefined
     */
    personFields?: string;
    /**
     * Required. Comma-separated list of person fields to be included in the response. Each path should start with `person.`: for example, `person.names` or `person.photos`.
     */
    'requestMask.includeField'?: string;
    /**
     * Required. The resource name of the person to provide information about.  - To get information about the authenticated user, specify `people/me`. - To get information about a google account, specify  `people/{account_id}`. - To get information about a contact, specify the resource name that   identifies the contact as returned by [`people.connections.list`](/people/api/rest/v1/people.connections/list).
     */
    resourceName?: string;
  }
  export interface Params$Resource$People$Getbatchget
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required. A field mask to restrict which fields on each person are returned. Multiple fields can be specified by separating them with commas. Valid values are:  * addresses * ageRanges * biographies * birthdays * coverPhotos * emailAddresses * events * genders * imClients * interests * locales * memberships * metadata * names * nicknames * occupations * organizations * phoneNumbers * photos * relations * residences * sipAddresses * skills * urls * userDefined
     */
    personFields?: string;
    /**
     * Required. Comma-separated list of person fields to be included in the response. Each path should start with `person.`: for example, `person.names` or `person.photos`.
     */
    'requestMask.includeField'?: string;
    /**
     * Required. The resource names of the people to provide information about.  - To get information about the authenticated user, specify `people/me`. - To get information about a google account, specify   `people/{account_id}`. - To get information about a contact, specify the resource name that   identifies the contact as returned by [`people.connections.list`](/people/api/rest/v1/people.connections/list).  You can include up to 50 resource names in one request.
     */
    resourceNames?: string[];
  }
  export interface Params$Resource$People$Updatecontact
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * The resource name for the person, assigned by the server. An ASCII string with a max length of 27 characters, in the form of `people/{person_id}`.
     */
    resourceName?: string;
    /**
     * Required. A field mask to restrict which fields on the person are updated. Multiple fields can be specified by separating them with commas. All updated fields will be replaced. Valid values are:  * addresses * biographies * birthdays * emailAddresses * events * genders * imClients * interests * locales * memberships * names * nicknames * occupations * organizations * phoneNumbers * relations * residences * sipAddresses * urls * userDefined
     */
    updatePersonFields?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$Person;
  }
  export interface Params$Resource$People$Updatecontactphoto
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required. Person resource name
     */
    resourceName?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$UpdateContactPhotoRequest;
  }

  export class Resource$People$Connections {
    context: APIRequestContext;
    constructor(context: APIRequestContext) {
      this.context = context;
    }

    /**
     * people.people.connections.list
     * @desc Provides a list of the authenticated user's contacts merged with any connected profiles.  The request throws a 400 error if 'personFields' is not specified.
     * @example
     * // Before running the sample:
     * // - Enable the API at:
     * //   https://console.developers.google.com/apis/api/people.googleapis.com
     * // - Login into gcloud by running:
     * //   `$ gcloud auth application-default login`
     * // - Install the npm module by running:
     * //   `$ npm install googleapis`
     *
     * const {google} = require('googleapis');
     * const people = google.people('v1');
     *
     * async function main() {
     *   const auth = new google.auth.GoogleAuth({
     *     // Scopes can be specified either as an array or as a single, space-delimited string.
     *     scopes: [
     *       'https://www.googleapis.com/auth/contacts',
     *       'https://www.googleapis.com/auth/contacts.readonly',
     *     ],
     *   });
     *
     *   // Acquire an auth client, and bind it to all future calls
     *   const authClient = await auth.getClient();
     *   google.options('auth', authClient);
     *
     *   // Do the magic
     *   const res = await people.people.connections.list({
     *     // Optional. The number of connections to include in the response. Valid values are
     *     // between 1 and 1000, inclusive. Defaults to 100 if not set or set to 0.
     *     pageSize: 'placeholder-value',
     *     // Optional. A page token, received from a previous `ListConnections` call.
     *     // Provide this to retrieve the subsequent page.
     *     //
     *     // When paginating, all other parameters provided to `ListConnections`
     *     // must match the call that provided the page token.
     *     pageToken: 'placeholder-value',
     *     // Required. A field mask to restrict which fields on each person are returned. Multiple
     *     // fields can be specified by separating them with commas. Valid values are:
     *     //
     *     // * addresses
     *     // * ageRanges
     *     // * biographies
     *     // * birthdays
     *     // * coverPhotos
     *     // * emailAddresses
     *     // * events
     *     // * genders
     *     // * imClients
     *     // * interests
     *     // * locales
     *     // * memberships
     *     // * metadata
     *     // * names
     *     // * nicknames
     *     // * occupations
     *     // * organizations
     *     // * phoneNumbers
     *     // * photos
     *     // * relations
     *     // * residences
     *     // * sipAddresses
     *     // * skills
     *     // * urls
     *     // * userDefined
     *     personFields: 'placeholder-value',
     *     // Required. Comma-separated list of person fields to be included in the response. Each
     *     // path should start with `person.`: for example, `person.names` or
     *     // `person.photos`.
     *     'requestMask.includeField': 'placeholder-value',
     *     // Optional. Whether the response should include `next_sync_token`, which can be used to
     *     // get all changes since the last request. For subsequent sync requests use
     *     // the `sync_token` param instead. Initial sync requests that specify
     *     // `request_sync_token` have an additional rate limit.
     *     requestSyncToken: 'placeholder-value',
     *     // Required. The resource name to return connections for. Only `people/me` is valid.
     *     resourceName: 'people/[^/]+',
     *     // Optional. The order in which the connections should be sorted. Defaults to
     *     // `LAST_MODIFIED_ASCENDING`.
     *     sortOrder: 'placeholder-value',
     *     // Optional. A sync token, received from a previous `ListConnections` call.
     *     // Provide this to retrieve only the resources changed since the last request.
     *     // Sync requests that specify `sync_token` have an additional rate limit.
     *     //
     *     // When syncing, all other parameters provided to `ListConnections`
     *     // must match the call that provided the sync token.
     *     syncToken: 'placeholder-value',
     *   });
     *   console.log(res.data);
     *
     *   // Example response
     *   // {
     *   //   "connections": [],
     *   //   "nextPageToken": "my_nextPageToken",
     *   //   "nextSyncToken": "my_nextSyncToken",
     *   //   "totalItems": 0,
     *   //   "totalPeople": 0
     *   // }
     * }
     *
     * main().catch(e => {
     *   console.error(e);
     *   throw e;
     * });
     *
     * @alias people.people.connections.list
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {integer=} params.pageSize Optional. The number of connections to include in the response. Valid values are between 1 and 1000, inclusive. Defaults to 100 if not set or set to 0.
     * @param {string=} params.pageToken Optional. A page token, received from a previous `ListConnections` call. Provide this to retrieve the subsequent page.  When paginating, all other parameters provided to `ListConnections` must match the call that provided the page token.
     * @param {string=} params.personFields Required. A field mask to restrict which fields on each person are returned. Multiple fields can be specified by separating them with commas. Valid values are:  * addresses * ageRanges * biographies * birthdays * coverPhotos * emailAddresses * events * genders * imClients * interests * locales * memberships * metadata * names * nicknames * occupations * organizations * phoneNumbers * photos * relations * residences * sipAddresses * skills * urls * userDefined
     * @param {string=} params.requestMask.includeField Required. Comma-separated list of person fields to be included in the response. Each path should start with `person.`: for example, `person.names` or `person.photos`.
     * @param {boolean=} params.requestSyncToken Optional. Whether the response should include `next_sync_token`, which can be used to get all changes since the last request. For subsequent sync requests use the `sync_token` param instead. Initial sync requests that specify `request_sync_token` have an additional rate limit.
     * @param {string} params.resourceName Required. The resource name to return connections for. Only `people/me` is valid.
     * @param {string=} params.sortOrder Optional. The order in which the connections should be sorted. Defaults to `LAST_MODIFIED_ASCENDING`.
     * @param {string=} params.syncToken Optional. A sync token, received from a previous `ListConnections` call. Provide this to retrieve only the resources changed since the last request. Sync requests that specify `sync_token` have an additional rate limit.  When syncing, all other parameters provided to `ListConnections` must match the call that provided the sync token.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    list(
      params?: Params$Resource$People$Connections$List,
      options?: MethodOptions
    ): GaxiosPromise<Schema$ListConnectionsResponse>;
    list(
      params: Params$Resource$People$Connections$List,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$ListConnectionsResponse>,
      callback: BodyResponseCallback<Schema$ListConnectionsResponse>
    ): void;
    list(
      params: Params$Resource$People$Connections$List,
      callback: BodyResponseCallback<Schema$ListConnectionsResponse>
    ): void;
    list(callback: BodyResponseCallback<Schema$ListConnectionsResponse>): void;
    list(
      paramsOrCallback?:
        | Params$Resource$People$Connections$List
        | BodyResponseCallback<Schema$ListConnectionsResponse>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$ListConnectionsResponse>,
      callback?: BodyResponseCallback<Schema$ListConnectionsResponse>
    ): void | GaxiosPromise<Schema$ListConnectionsResponse> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$People$Connections$List;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$People$Connections$List;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://people.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+resourceName}/connections').replace(
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
        createAPIRequest<Schema$ListConnectionsResponse>(parameters, callback);
      } else {
        return createAPIRequest<Schema$ListConnectionsResponse>(parameters);
      }
    }
  }

  export interface Params$Resource$People$Connections$List
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Optional. The number of connections to include in the response. Valid values are between 1 and 1000, inclusive. Defaults to 100 if not set or set to 0.
     */
    pageSize?: number;
    /**
     * Optional. A page token, received from a previous `ListConnections` call. Provide this to retrieve the subsequent page.  When paginating, all other parameters provided to `ListConnections` must match the call that provided the page token.
     */
    pageToken?: string;
    /**
     * Required. A field mask to restrict which fields on each person are returned. Multiple fields can be specified by separating them with commas. Valid values are:  * addresses * ageRanges * biographies * birthdays * coverPhotos * emailAddresses * events * genders * imClients * interests * locales * memberships * metadata * names * nicknames * occupations * organizations * phoneNumbers * photos * relations * residences * sipAddresses * skills * urls * userDefined
     */
    personFields?: string;
    /**
     * Required. Comma-separated list of person fields to be included in the response. Each path should start with `person.`: for example, `person.names` or `person.photos`.
     */
    'requestMask.includeField'?: string;
    /**
     * Optional. Whether the response should include `next_sync_token`, which can be used to get all changes since the last request. For subsequent sync requests use the `sync_token` param instead. Initial sync requests that specify `request_sync_token` have an additional rate limit.
     */
    requestSyncToken?: boolean;
    /**
     * Required. The resource name to return connections for. Only `people/me` is valid.
     */
    resourceName?: string;
    /**
     * Optional. The order in which the connections should be sorted. Defaults to `LAST_MODIFIED_ASCENDING`.
     */
    sortOrder?: string;
    /**
     * Optional. A sync token, received from a previous `ListConnections` call. Provide this to retrieve only the resources changed since the last request. Sync requests that specify `sync_token` have an additional rate limit.  When syncing, all other parameters provided to `ListConnections` must match the call that provided the sync token.
     */
    syncToken?: string;
  }
}
