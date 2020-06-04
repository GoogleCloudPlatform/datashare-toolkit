/// <reference types="node" />
import { OAuth2Client, JWT, Compute, UserRefreshClient, GaxiosPromise, GoogleConfigurable, MethodOptions, StreamMethodOptions, GlobalOptions, GoogleAuth, BodyResponseCallback, APIRequestContext } from 'googleapis-common';
import { Readable } from 'stream';
export declare namespace driveactivity_v2 {
    export interface Options extends GlobalOptions {
        version: 'v2';
    }
    interface StandardParameters {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient | GoogleAuth;
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
     * Drive Activity API
     *
     * Provides a historical view of activity in Google Drive.
     *
     * @example
     * const {google} = require('googleapis');
     * const driveactivity = google.driveactivity('v2');
     *
     * @namespace driveactivity
     * @type {Function}
     * @version v2
     * @variation v2
     * @param {object=} options Options for Driveactivity
     */
    export class Driveactivity {
        context: APIRequestContext;
        activity: Resource$Activity;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
    }
    /**
     * Information about the action.
     */
    export interface Schema$Action {
        /**
         * The actor responsible for this action (or empty if all actors are responsible).
         */
        actor?: Schema$Actor;
        /**
         * The type and detailed information about the action.
         */
        detail?: Schema$ActionDetail;
        /**
         * The target this action affects (or empty if affecting all targets). This represents the state of the target immediately after this action occurred.
         */
        target?: Schema$Target;
        /**
         * The action occurred over this time range.
         */
        timeRange?: Schema$TimeRange;
        /**
         * The action occurred at this specific time.
         */
        timestamp?: string | null;
    }
    /**
     * Data describing the type and additional information of an action.
     */
    export interface Schema$ActionDetail {
        /**
         * A change about comments was made.
         */
        comment?: Schema$Comment;
        /**
         * An object was created.
         */
        create?: Schema$Create;
        /**
         * An object was deleted.
         */
        delete?: Schema$Delete;
        /**
         * A change happened in data leak prevention status.
         */
        dlpChange?: Schema$DataLeakPreventionChange;
        /**
         * An object was edited.
         */
        edit?: Schema$Edit;
        /**
         * An object was moved.
         */
        move?: Schema$Move;
        /**
         * The permission on an object was changed.
         */
        permissionChange?: Schema$PermissionChange;
        /**
         * An object was referenced in an application outside of Drive/Docs.
         */
        reference?: Schema$ApplicationReference;
        /**
         * An object was renamed.
         */
        rename?: Schema$Rename;
        /**
         * A deleted object was restored.
         */
        restore?: Schema$Restore;
        /**
         * Settings were changed.
         */
        settingsChange?: Schema$SettingsChange;
    }
    /**
     * The actor of a Drive activity.
     */
    export interface Schema$Actor {
        /**
         * An administrator.
         */
        administrator?: Schema$Administrator;
        /**
         * An anonymous user.
         */
        anonymous?: Schema$AnonymousUser;
        /**
         * An account acting on behalf of another.
         */
        impersonation?: Schema$Impersonation;
        /**
         * A non-user actor (i.e. system triggered).
         */
        system?: Schema$SystemEvent;
        /**
         * An end user.
         */
        user?: Schema$User;
    }
    /**
     * Empty message representing an administrator.
     */
    export interface Schema$Administrator {
    }
    /**
     * Empty message representing an anonymous user or indicating the authenticated user should be anonymized.
     */
    export interface Schema$AnonymousUser {
    }
    /**
     * Represents any user (including a logged out user).
     */
    export interface Schema$Anyone {
    }
    /**
     * Activity in applications other than Drive.
     */
    export interface Schema$ApplicationReference {
        /**
         * The reference type corresponding to this event.
         */
        type?: string | null;
    }
    /**
     * A comment with an assignment.
     */
    export interface Schema$Assignment {
        /**
         * The user to whom the comment was assigned.
         */
        assignedUser?: Schema$User;
        /**
         * The sub-type of this event.
         */
        subtype?: string | null;
    }
    /**
     * A change about comments on an object.
     */
    export interface Schema$Comment {
        /**
         * A change on an assignment.
         */
        assignment?: Schema$Assignment;
        /**
         * Users who are mentioned in this comment.
         */
        mentionedUsers?: Schema$User[];
        /**
         * A change on a regular posted comment.
         */
        post?: Schema$Post;
        /**
         * A change on a suggestion.
         */
        suggestion?: Schema$Suggestion;
    }
    /**
     * How the individual activities are consolidated. A set of activities may be consolidated into one combined activity if they are related in some way, such as one actor performing the same action on multiple targets, or multiple actors performing the same action on a single target. The strategy defines the rules for which activities are related.
     */
    export interface Schema$ConsolidationStrategy {
        /**
         * The individual activities are consolidated using the legacy strategy.
         */
        legacy?: Schema$Legacy;
        /**
         * The individual activities are not consolidated.
         */
        none?: Schema$NoConsolidation;
    }
    /**
     * An object was created by copying an existing object.
     */
    export interface Schema$Copy {
        /**
         * The the original object.
         */
        originalObject?: Schema$TargetReference;
    }
    /**
     * An object was created.
     */
    export interface Schema$Create {
        /**
         * If present, indicates the object was created by copying an existing Drive object.
         */
        copy?: Schema$Copy;
        /**
         * If present, indicates the object was newly created (e.g. as a blank document), not derived from a Drive object or external object.
         */
        new?: Schema$New;
        /**
         * If present, indicates the object originated externally and was uploaded to Drive.
         */
        upload?: Schema$Upload;
    }
    /**
     * A change in the object&#39;s data leak prevention status.
     */
    export interface Schema$DataLeakPreventionChange {
        /**
         * The type of Data Leak Prevention (DLP) change.
         */
        type?: string | null;
    }
    /**
     * An object was deleted.
     */
    export interface Schema$Delete {
        /**
         * The type of delete action taken.
         */
        type?: string | null;
    }
    /**
     * A user whose account has since been deleted.
     */
    export interface Schema$DeletedUser {
    }
    /**
     * Information about a domain.
     */
    export interface Schema$Domain {
        /**
         * An opaque string used to identify this domain.
         */
        legacyId?: string | null;
        /**
         * The name of the domain, e.g. &quot;google.com&quot;.
         */
        name?: string | null;
    }
    /**
     * Information about a shared drive.
     */
    export interface Schema$Drive {
        /**
         * The resource name of the shared drive. The format is &quot;COLLECTION_ID/DRIVE_ID&quot;. Clients should not assume a specific collection ID for this resource name.
         */
        name?: string | null;
        /**
         * The root of this shared drive.
         */
        root?: Schema$DriveItem;
        /**
         * The title of the shared drive.
         */
        title?: string | null;
    }
    /**
     * A single Drive activity comprising one or more Actions by one or more Actors on one or more Targets. Some Action groupings occur spontaneously, such as moving an item into a shared folder triggering a permission change. Other groupings of related Actions, such as multiple Actors editing one item or moving multiple files into a new folder, are controlled by the selection of a ConsolidationStrategy in the QueryDriveActivityRequest.
     */
    export interface Schema$DriveActivity {
        /**
         * Details on all actions in this activity.
         */
        actions?: Schema$Action[];
        /**
         * All actor(s) responsible for the activity.
         */
        actors?: Schema$Actor[];
        /**
         * Key information about the primary action for this activity. This is either representative, or the most important, of all actions in the activity, according to the ConsolidationStrategy in the request.
         */
        primaryActionDetail?: Schema$ActionDetail;
        /**
         * All Google Drive objects this activity is about (e.g. file, folder, drive). This represents the state of the target immediately after the actions occurred.
         */
        targets?: Schema$Target[];
        /**
         * The activity occurred over this time range.
         */
        timeRange?: Schema$TimeRange;
        /**
         * The activity occurred at this specific time.
         */
        timestamp?: string | null;
    }
    /**
     * A Drive item which is a file.
     */
    export interface Schema$DriveFile {
    }
    /**
     * A Drive item which is a folder.
     */
    export interface Schema$DriveFolder {
        /**
         * The type of Drive folder.
         */
        type?: string | null;
    }
    /**
     * A Drive item, such as a file or folder.
     */
    export interface Schema$DriveItem {
        /**
         * The Drive item is a file.
         */
        driveFile?: Schema$DriveFile;
        /**
         * The Drive item is a folder. Includes information about the type of folder.
         */
        driveFolder?: Schema$DriveFolder;
        /**
         * This field is deprecated; please use the `driveFile` field instead.
         */
        file?: Schema$File;
        /**
         * This field is deprecated; please use the `driveFolder` field instead.
         */
        folder?: Schema$Folder;
        /**
         * The MIME type of the Drive item.  See https://developers.google.com/drive/v3/web/mime-types.
         */
        mimeType?: string | null;
        /**
         * The target Drive item. The format is &quot;items/ITEM_ID&quot;.
         */
        name?: string | null;
        /**
         * Information about the owner of this Drive item.
         */
        owner?: Schema$Owner;
        /**
         * The title of the Drive item.
         */
        title?: string | null;
    }
    /**
     * A lightweight reference to a Drive item, such as a file or folder.
     */
    export interface Schema$DriveItemReference {
        /**
         * The Drive item is a file.
         */
        driveFile?: Schema$DriveFile;
        /**
         * The Drive item is a folder. Includes information about the type of folder.
         */
        driveFolder?: Schema$DriveFolder;
        /**
         * This field is deprecated; please use the `driveFile` field instead.
         */
        file?: Schema$File;
        /**
         * This field is deprecated; please use the `driveFolder` field instead.
         */
        folder?: Schema$Folder;
        /**
         * The target Drive item. The format is &quot;items/ITEM_ID&quot;.
         */
        name?: string | null;
        /**
         * The title of the Drive item.
         */
        title?: string | null;
    }
    /**
     * A lightweight reference to a shared drive.
     */
    export interface Schema$DriveReference {
        /**
         * The resource name of the shared drive. The format is &quot;COLLECTION_ID/DRIVE_ID&quot;. Clients should not assume a specific collection ID for this resource name.
         */
        name?: string | null;
        /**
         * The title of the shared drive.
         */
        title?: string | null;
    }
    /**
     * An empty message indicating an object was edited.
     */
    export interface Schema$Edit {
    }
    /**
     * This item is deprecated; please see `DriveFile` instead.
     */
    export interface Schema$File {
    }
    /**
     * A comment on a file.
     */
    export interface Schema$FileComment {
        /**
         * The comment in the discussion thread. This identifier is an opaque string compatible with the Drive API; see https://developers.google.com/drive/v3/reference/comments/get
         */
        legacyCommentId?: string | null;
        /**
         * The discussion thread to which the comment was added. This identifier is an opaque string compatible with the Drive API and references the first comment in a discussion; see https://developers.google.com/drive/v3/reference/comments/get
         */
        legacyDiscussionId?: string | null;
        /**
         * The link to the discussion thread containing this comment, for example, &quot;https://docs.google.com/DOCUMENT_ID/edit?disco=THREAD_ID&quot;.
         */
        linkToDiscussion?: string | null;
        /**
         * The Drive item containing this comment.
         */
        parent?: Schema$DriveItem;
    }
    /**
     * This item is deprecated; please see `DriveFolder` instead.
     */
    export interface Schema$Folder {
        /**
         * This field is deprecated; please see `DriveFolder.type` instead.
         */
        type?: string | null;
    }
    /**
     * Information about a group.
     */
    export interface Schema$Group {
        /**
         * The email address of the group.
         */
        email?: string | null;
        /**
         * The title of the group.
         */
        title?: string | null;
    }
    /**
     * Information about an impersonation, where an admin acts on behalf of an end user. Information about the acting admin is not currently available.
     */
    export interface Schema$Impersonation {
        /**
         * The impersonated user.
         */
        impersonatedUser?: Schema$User;
    }
    /**
     * A known user.
     */
    export interface Schema$KnownUser {
        /**
         * True if this is the user making the request.
         */
        isCurrentUser?: boolean | null;
        /**
         * The identifier for this user that can be used with the People API to get more information. The format is &quot;people/ACCOUNT_ID&quot;. See https://developers.google.com/people/.
         */
        personName?: string | null;
    }
    /**
     * A strategy which consolidates activities using the grouping rules from the legacy V1 Activity API. Similar actions occurring within a window of time can be grouped across multiple targets (such as moving a set of files at once) or multiple actors (such as several users editing the same item). Grouping rules for this strategy are specific to each type of action.
     */
    export interface Schema$Legacy {
    }
    /**
     * An object was moved.
     */
    export interface Schema$Move {
        /**
         * The added parent object(s).
         */
        addedParents?: Schema$TargetReference[];
        /**
         * The removed parent object(s).
         */
        removedParents?: Schema$TargetReference[];
    }
    /**
     * An object was created from scratch.
     */
    export interface Schema$New {
    }
    /**
     * A strategy which does no consolidation of individual activities.
     */
    export interface Schema$NoConsolidation {
    }
    /**
     * Information about the owner of a Drive item.
     */
    export interface Schema$Owner {
        /**
         * The domain of the Drive item owner.
         */
        domain?: Schema$Domain;
        /**
         * The drive that owns the item.
         */
        drive?: Schema$DriveReference;
        /**
         * This field is deprecated; please use the `drive` field instead.
         */
        teamDrive?: Schema$TeamDriveReference;
        /**
         * The user that owns the Drive item.
         */
        user?: Schema$User;
    }
    /**
     * The permission setting of an object.
     */
    export interface Schema$Permission {
        /**
         * If true, the item can be discovered (e.g. in the user&#39;s &quot;Shared with me&quot; collection) without needing a link to the item.
         */
        allowDiscovery?: boolean | null;
        /**
         * If set, this permission applies to anyone, even logged out users.
         */
        anyone?: Schema$Anyone;
        /**
         * The domain to whom this permission applies.
         */
        domain?: Schema$Domain;
        /**
         * The group to whom this permission applies.
         */
        group?: Schema$Group;
        /**
         * Indicates the &lt;a href=&quot;/drive/web/manage-sharing#roles&quot;&gt;Google Drive permissions role&lt;/a&gt;. The role determines a user&#39;s ability to read, write, and comment on items.
         */
        role?: string | null;
        /**
         * The user to whom this permission applies.
         */
        user?: Schema$User;
    }
    /**
     * A change of the permission setting on an item.
     */
    export interface Schema$PermissionChange {
        /**
         * The set of permissions added by this change.
         */
        addedPermissions?: Schema$Permission[];
        /**
         * The set of permissions removed by this change.
         */
        removedPermissions?: Schema$Permission[];
    }
    /**
     * A regular posted comment.
     */
    export interface Schema$Post {
        /**
         * The sub-type of this event.
         */
        subtype?: string | null;
    }
    /**
     * The request message for querying Drive activity.
     */
    export interface Schema$QueryDriveActivityRequest {
        /**
         * Return activities for this Drive folder and all children and descendants. The format is &quot;items/ITEM_ID&quot;.
         */
        ancestorName?: string | null;
        /**
         * Details on how to consolidate related actions that make up the activity. If not set, then related actions are not consolidated.
         */
        consolidationStrategy?: Schema$ConsolidationStrategy;
        /**
         * The filtering for items returned from this query request. The format of the filter string is a sequence of expressions, joined by an optional &quot;AND&quot;, where each expression is of the form &quot;field operator value&quot;.  Supported fields:    - &lt;tt&gt;time&lt;/tt&gt;: Uses numerical operators on date values either in     terms of milliseconds since Jan 1, 1970 or in RFC 3339 format.     Examples:       - &lt;tt&gt;time &gt; 1452409200000 AND time &lt;= 1492812924310&lt;/tt&gt;       - &lt;tt&gt;time &gt;= &quot;2016-01-10T01:02:03-05:00&quot;&lt;/tt&gt;    - &lt;tt&gt;detail.action_detail_case&lt;/tt&gt;: Uses the &quot;has&quot; operator (:) and     either a singular value or a list of allowed action types enclosed in     parentheses.     Examples:       - &lt;tt&gt;detail.action_detail_case: RENAME&lt;/tt&gt;       - &lt;tt&gt;detail.action_detail_case:(CREATE EDIT)&lt;/tt&gt;       - &lt;tt&gt;-detail.action_detail_case:MOVE&lt;/tt&gt;
         */
        filter?: string | null;
        /**
         * Return activities for this Drive item. The format is &quot;items/ITEM_ID&quot;.
         */
        itemName?: string | null;
        /**
         * The miminum number of activities desired in the response; the server will attempt to return at least this quanitity. The server may also return fewer activities if it has a partial response ready before the request times out. If not set, a default value is used.
         */
        pageSize?: number | null;
        /**
         * The token identifying which page of results to return. Set this to the next_page_token value returned from a previous query to obtain the following page of results. If not set, the first page of results will be returned.
         */
        pageToken?: string | null;
    }
    /**
     * Response message for querying Drive activity.
     */
    export interface Schema$QueryDriveActivityResponse {
        /**
         * List of activity requested.
         */
        activities?: Schema$DriveActivity[];
        /**
         * Token to retrieve the next page of results, or empty if there are no more results in the list.
         */
        nextPageToken?: string | null;
    }
    /**
     * An object was renamed.
     */
    export interface Schema$Rename {
        /**
         * The new title of the drive object.
         */
        newTitle?: string | null;
        /**
         * The previous title of the drive object.
         */
        oldTitle?: string | null;
    }
    /**
     * A deleted object was restored.
     */
    export interface Schema$Restore {
        /**
         * The type of restore action taken.
         */
        type?: string | null;
    }
    /**
     * Information about restriction policy changes to a feature.
     */
    export interface Schema$RestrictionChange {
        /**
         * The feature which had a change in restriction policy.
         */
        feature?: string | null;
        /**
         * The restriction in place after the change.
         */
        newRestriction?: string | null;
    }
    /**
     * Information about settings changes.
     */
    export interface Schema$SettingsChange {
        /**
         * The set of changes made to restrictions.
         */
        restrictionChanges?: Schema$RestrictionChange[];
    }
    /**
     * A suggestion.
     */
    export interface Schema$Suggestion {
        /**
         * The sub-type of this event.
         */
        subtype?: string | null;
    }
    /**
     * Event triggered by system operations instead of end users.
     */
    export interface Schema$SystemEvent {
        /**
         * The type of the system event that may triggered activity.
         */
        type?: string | null;
    }
    /**
     * Information about the target of activity.
     */
    export interface Schema$Target {
        /**
         * The target is a shared drive.
         */
        drive?: Schema$Drive;
        /**
         * The target is a Drive item.
         */
        driveItem?: Schema$DriveItem;
        /**
         * The target is a comment on a Drive file.
         */
        fileComment?: Schema$FileComment;
        /**
         * This field is deprecated; please use the `drive` field instead.
         */
        teamDrive?: Schema$TeamDrive;
    }
    /**
     * A lightweight reference to the target of activity.
     */
    export interface Schema$TargetReference {
        /**
         * The target is a shared drive.
         */
        drive?: Schema$DriveReference;
        /**
         * The target is a Drive item.
         */
        driveItem?: Schema$DriveItemReference;
        /**
         * This field is deprecated; please use the `drive` field instead.
         */
        teamDrive?: Schema$TeamDriveReference;
    }
    /**
     * This item is deprecated; please see `Drive` instead.
     */
    export interface Schema$TeamDrive {
        /**
         * This field is deprecated; please see `Drive.name` instead.
         */
        name?: string | null;
        /**
         * This field is deprecated; please see `Drive.root` instead.
         */
        root?: Schema$DriveItem;
        /**
         * This field is deprecated; please see `Drive.title` instead.
         */
        title?: string | null;
    }
    /**
     * This item is deprecated; please see `DriveReference` instead.
     */
    export interface Schema$TeamDriveReference {
        /**
         * This field is deprecated; please see `DriveReference.name` instead.
         */
        name?: string | null;
        /**
         * This field is deprecated; please see `DriveReference.title` instead.
         */
        title?: string | null;
    }
    /**
     * Information about time ranges.
     */
    export interface Schema$TimeRange {
        /**
         * The end of the time range.
         */
        endTime?: string | null;
        /**
         * The start of the time range.
         */
        startTime?: string | null;
    }
    /**
     * A user about whom nothing is currently known.
     */
    export interface Schema$UnknownUser {
    }
    /**
     * An object was uploaded into Drive.
     */
    export interface Schema$Upload {
    }
    /**
     * Information about an end user.
     */
    export interface Schema$User {
        /**
         * A user whose account has since been deleted.
         */
        deletedUser?: Schema$DeletedUser;
        /**
         * A known user.
         */
        knownUser?: Schema$KnownUser;
        /**
         * A user about whom nothing is currently known.
         */
        unknownUser?: Schema$UnknownUser;
    }
    export class Resource$Activity {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * driveactivity.activity.query
         * @desc Query past activity in Google Drive.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/driveactivity.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const driveactivity = google.driveactivity('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive.activity',
         *       'https://www.googleapis.com/auth/drive.activity.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await driveactivity.activity.query({
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "ancestorName": "my_ancestorName",
         *       //   "consolidationStrategy": {},
         *       //   "filter": "my_filter",
         *       //   "itemName": "my_itemName",
         *       //   "pageSize": 0,
         *       //   "pageToken": "my_pageToken"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "activities": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias driveactivity.activity.query
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {().QueryDriveActivityRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        query(params: Params$Resource$Activity$Query, options: StreamMethodOptions): GaxiosPromise<Readable>;
        query(params?: Params$Resource$Activity$Query, options?: MethodOptions): GaxiosPromise<Schema$QueryDriveActivityResponse>;
        query(params: Params$Resource$Activity$Query, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        query(params: Params$Resource$Activity$Query, options: MethodOptions | BodyResponseCallback<Schema$QueryDriveActivityResponse>, callback: BodyResponseCallback<Schema$QueryDriveActivityResponse>): void;
        query(params: Params$Resource$Activity$Query, callback: BodyResponseCallback<Schema$QueryDriveActivityResponse>): void;
        query(callback: BodyResponseCallback<Schema$QueryDriveActivityResponse>): void;
    }
    export interface Params$Resource$Activity$Query extends StandardParameters {
        /**
         * Request body metadata
         */
        requestBody?: Schema$QueryDriveActivityRequest;
    }
    export {};
}
