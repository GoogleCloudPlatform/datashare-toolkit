/// <reference types="node" />
import { OAuth2Client, JWT, Compute, UserRefreshClient, GaxiosPromise, GoogleConfigurable, MethodOptions, StreamMethodOptions, GlobalOptions, GoogleAuth, BodyResponseCallback, APIRequestContext } from 'googleapis-common';
import { Readable } from 'stream';
export declare namespace drive_v2 {
    export interface Options extends GlobalOptions {
        version: 'v2';
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
     * Drive API
     *
     * Manages files in Drive including uploading, downloading, searching, detecting changes, and updating sharing permissions.
     *
     * @example
     * const {google} = require('googleapis');
     * const drive = google.drive('v2');
     *
     * @namespace drive
     * @type {Function}
     * @version v2
     * @variation v2
     * @param {object=} options Options for Drive
     */
    export class Drive {
        context: APIRequestContext;
        about: Resource$About;
        apps: Resource$Apps;
        changes: Resource$Changes;
        channels: Resource$Channels;
        children: Resource$Children;
        comments: Resource$Comments;
        drives: Resource$Drives;
        files: Resource$Files;
        parents: Resource$Parents;
        permissions: Resource$Permissions;
        properties: Resource$Properties;
        replies: Resource$Replies;
        revisions: Resource$Revisions;
        teamdrives: Resource$Teamdrives;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
    }
    /**
     * An item with user information and settings.
     */
    export interface Schema$About {
        /**
         * Information about supported additional roles per file type. The most specific type takes precedence.
         */
        additionalRoleInfo?: Array<{
            roleSets?: Array<{
                additionalRoles?: string[];
                primaryRole?: string;
            }>;
            type?: string;
        }> | null;
        /**
         * Whether the user can create shared drives.
         */
        canCreateDrives?: boolean | null;
        /**
         * Deprecated - use canCreateDrives instead.
         */
        canCreateTeamDrives?: boolean | null;
        /**
         * The domain sharing policy for the current user. Possible values are:   - allowed  - allowedWithWarning  - incomingOnly  - disallowed
         */
        domainSharingPolicy?: string | null;
        /**
         * A list of themes that are supported for shared drives.
         */
        driveThemes?: Array<{
            backgroundImageLink?: string;
            colorRgb?: string;
            id?: string;
        }> | null;
        /**
         * The ETag of the item.
         */
        etag?: string | null;
        /**
         * The allowable export formats.
         */
        exportFormats?: Array<{
            source?: string;
            targets?: string[];
        }> | null;
        /**
         * List of additional features enabled on this account.
         */
        features?: Array<{
            featureName?: string;
            featureRate?: number;
        }> | null;
        /**
         * The palette of allowable folder colors as RGB hex strings.
         */
        folderColorPalette?: string[] | null;
        /**
         * The allowable import formats.
         */
        importFormats?: Array<{
            source?: string;
            targets?: string[];
        }> | null;
        /**
         * A boolean indicating whether the authenticated app is installed by the authenticated user.
         */
        isCurrentAppInstalled?: boolean | null;
        /**
         * This is always drive#about.
         */
        kind?: string | null;
        /**
         * The user&#39;s language or locale code, as defined by BCP 47, with some extensions from Unicode&#39;s LDML format (http://www.unicode.org/reports/tr35/).
         */
        languageCode?: string | null;
        /**
         * The largest change id.
         */
        largestChangeId?: string | null;
        /**
         * List of max upload sizes for each file type. The most specific type takes precedence.
         */
        maxUploadSizes?: Array<{
            size?: string;
            type?: string;
        }> | null;
        /**
         * The name of the current user.
         */
        name?: string | null;
        /**
         * The current user&#39;s ID as visible in the permissions collection.
         */
        permissionId?: string | null;
        /**
         * The amount of storage quota used by different Google services.
         */
        quotaBytesByService?: Array<{
            bytesUsed?: string;
            serviceName?: string;
        }> | null;
        /**
         * The total number of quota bytes. This is only relevant when quotaType is LIMITED.
         */
        quotaBytesTotal?: string | null;
        /**
         * The number of quota bytes used by Google Drive.
         */
        quotaBytesUsed?: string | null;
        /**
         * The number of quota bytes used by all Google apps (Drive, Picasa, etc.).
         */
        quotaBytesUsedAggregate?: string | null;
        /**
         * The number of quota bytes used by trashed items.
         */
        quotaBytesUsedInTrash?: string | null;
        /**
         * The type of the user&#39;s storage quota. Possible values are:   - LIMITED  - UNLIMITED
         */
        quotaType?: string | null;
        /**
         * The number of remaining change ids, limited to no more than 2500.
         */
        remainingChangeIds?: string | null;
        /**
         * The id of the root folder.
         */
        rootFolderId?: string | null;
        /**
         * A link back to this item.
         */
        selfLink?: string | null;
        /**
         * Deprecated - use driveThemes instead.
         */
        teamDriveThemes?: Array<{
            backgroundImageLink?: string;
            colorRgb?: string;
            id?: string;
        }> | null;
        /**
         * The authenticated user.
         */
        user?: Schema$User;
    }
    /**
     * The apps resource provides a list of the apps that a user has installed, with information about each app&#39;s supported MIME types, file extensions, and other details.
     */
    export interface Schema$App {
        /**
         * Whether the app is authorized to access data on the user&#39;s Drive.
         */
        authorized?: boolean | null;
        /**
         * The template url to create a new file with this app in a given folder. The template will contain {folderId} to be replaced by the folder to create the new file in.
         */
        createInFolderTemplate?: string | null;
        /**
         * The url to create a new file with this app.
         */
        createUrl?: string | null;
        /**
         * Whether the app has drive-wide scope. An app with drive-wide scope can access all files in the user&#39;s drive.
         */
        hasDriveWideScope?: boolean | null;
        /**
         * The various icons for the app.
         */
        icons?: Array<{
            category?: string;
            iconUrl?: string;
            size?: number;
        }> | null;
        /**
         * The ID of the app.
         */
        id?: string | null;
        /**
         * Whether the app is installed.
         */
        installed?: boolean | null;
        /**
         * This is always drive#app.
         */
        kind?: string | null;
        /**
         * A long description of the app.
         */
        longDescription?: string | null;
        /**
         * The name of the app.
         */
        name?: string | null;
        /**
         * The type of object this app creates (e.g. Chart). If empty, the app name should be used instead.
         */
        objectType?: string | null;
        /**
         * The template url for opening files with this app. The template will contain {ids} and/or {exportIds} to be replaced by the actual file ids. See  Open Files  for the full documentation.
         */
        openUrlTemplate?: string | null;
        /**
         * The list of primary file extensions.
         */
        primaryFileExtensions?: string[] | null;
        /**
         * The list of primary mime types.
         */
        primaryMimeTypes?: string[] | null;
        /**
         * The ID of the product listing for this app.
         */
        productId?: string | null;
        /**
         * A link to the product listing for this app.
         */
        productUrl?: string | null;
        /**
         * The list of secondary file extensions.
         */
        secondaryFileExtensions?: string[] | null;
        /**
         * The list of secondary mime types.
         */
        secondaryMimeTypes?: string[] | null;
        /**
         * A short description of the app.
         */
        shortDescription?: string | null;
        /**
         * Whether this app supports creating new objects.
         */
        supportsCreate?: boolean | null;
        /**
         * Whether this app supports importing Google Docs.
         */
        supportsImport?: boolean | null;
        /**
         * Whether this app supports opening more than one file.
         */
        supportsMultiOpen?: boolean | null;
        /**
         * Whether this app supports creating new files when offline.
         */
        supportsOfflineCreate?: boolean | null;
        /**
         * Whether the app is selected as the default handler for the types it supports.
         */
        useByDefault?: boolean | null;
    }
    /**
     * A list of third-party applications which the user has installed or given access to Google Drive.
     */
    export interface Schema$AppList {
        /**
         * List of app IDs that the user has specified to use by default. The list is in reverse-priority order (lowest to highest).
         */
        defaultAppIds?: string[] | null;
        /**
         * The ETag of the list.
         */
        etag?: string | null;
        /**
         * The list of apps.
         */
        items?: Schema$App[];
        /**
         * This is always drive#appList.
         */
        kind?: string | null;
        /**
         * A link back to this list.
         */
        selfLink?: string | null;
    }
    /**
     * Representation of a change to a file or shared drive.
     */
    export interface Schema$Change {
        /**
         * The type of the change. Possible values are file and drive.
         */
        changeType?: string | null;
        /**
         * Whether the file or shared drive has been removed from this list of changes, for example by deletion or loss of access.
         */
        deleted?: boolean | null;
        /**
         * The updated state of the shared drive. Present if the changeType is drive, the user is still a member of the shared drive, and the shared drive has not been deleted.
         */
        drive?: Schema$Drive;
        /**
         * The ID of the shared drive associated with this change.
         */
        driveId?: string | null;
        /**
         * The updated state of the file. Present if the type is file and the file has not been removed from this list of changes.
         */
        file?: Schema$File;
        /**
         * The ID of the file associated with this change.
         */
        fileId?: string | null;
        /**
         * The ID of the change.
         */
        id?: string | null;
        /**
         * This is always drive#change.
         */
        kind?: string | null;
        /**
         * The time of this modification.
         */
        modificationDate?: string | null;
        /**
         * A link back to this change.
         */
        selfLink?: string | null;
        /**
         * Deprecated - use drive instead.
         */
        teamDrive?: Schema$TeamDrive;
        /**
         * Deprecated - use driveId instead.
         */
        teamDriveId?: string | null;
        /**
         * Deprecated - use changeType instead.
         */
        type?: string | null;
    }
    /**
     * A list of changes for a user.
     */
    export interface Schema$ChangeList {
        /**
         * The ETag of the list.
         */
        etag?: string | null;
        /**
         * The list of changes. If nextPageToken is populated, then this list may be incomplete and an additional page of results should be fetched.
         */
        items?: Schema$Change[];
        /**
         * This is always drive#changeList.
         */
        kind?: string | null;
        /**
         * The current largest change ID.
         */
        largestChangeId?: string | null;
        /**
         * The starting page token for future changes. This will be present only if the end of the current changes list has been reached.
         */
        newStartPageToken?: string | null;
        /**
         * A link to the next page of changes.
         */
        nextLink?: string | null;
        /**
         * The page token for the next page of changes. This will be absent if the end of the changes list has been reached. If the token is rejected for any reason, it should be discarded, and pagination should be restarted from the first page of results.
         */
        nextPageToken?: string | null;
        /**
         * A link back to this list.
         */
        selfLink?: string | null;
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
     * A list of children of a file.
     */
    export interface Schema$ChildList {
        /**
         * The ETag of the list.
         */
        etag?: string | null;
        /**
         * The list of children. If nextPageToken is populated, then this list may be incomplete and an additional page of results should be fetched.
         */
        items?: Schema$ChildReference[];
        /**
         * This is always drive#childList.
         */
        kind?: string | null;
        /**
         * A link to the next page of children.
         */
        nextLink?: string | null;
        /**
         * The page token for the next page of children. This will be absent if the end of the children list has been reached. If the token is rejected for any reason, it should be discarded, and pagination should be restarted from the first page of results.
         */
        nextPageToken?: string | null;
        /**
         * A link back to this list.
         */
        selfLink?: string | null;
    }
    /**
     * A reference to a folder&#39;s child.
     */
    export interface Schema$ChildReference {
        /**
         * A link to the child.
         */
        childLink?: string | null;
        /**
         * The ID of the child.
         */
        id?: string | null;
        /**
         * This is always drive#childReference.
         */
        kind?: string | null;
        /**
         * A link back to this reference.
         */
        selfLink?: string | null;
    }
    /**
     * A comment on a file in Google Drive.
     */
    export interface Schema$Comment {
        /**
         * A region of the document represented as a JSON string. See anchor documentation for details on how to define and interpret anchor properties.
         */
        anchor?: string | null;
        /**
         * The author of the comment. The author&#39;s email address and permission ID will not be populated.
         */
        author?: Schema$User;
        /**
         * The ID of the comment.
         */
        commentId?: string | null;
        /**
         * The plain text content used to create this comment. This is not HTML safe and should only be used as a starting point to make edits to a comment&#39;s content.
         */
        content?: string | null;
        /**
         * The context of the file which is being commented on.
         */
        context?: {
            type?: string;
            value?: string;
        } | null;
        /**
         * The date when this comment was first created.
         */
        createdDate?: string | null;
        /**
         * Whether this comment has been deleted. If a comment has been deleted the content will be cleared and this will only represent a comment that once existed.
         */
        deleted?: boolean | null;
        /**
         * The file which this comment is addressing.
         */
        fileId?: string | null;
        /**
         * The title of the file which this comment is addressing.
         */
        fileTitle?: string | null;
        /**
         * HTML formatted content for this comment.
         */
        htmlContent?: string | null;
        /**
         * This is always drive#comment.
         */
        kind?: string | null;
        /**
         * The date when this comment or any of its replies were last modified.
         */
        modifiedDate?: string | null;
        /**
         * Replies to this post.
         */
        replies?: Schema$CommentReply[];
        /**
         * A link back to this comment.
         */
        selfLink?: string | null;
        /**
         * The status of this comment. Status can be changed by posting a reply to a comment with the desired status.   - &quot;open&quot; - The comment is still open.  - &quot;resolved&quot; - The comment has been resolved by one of its replies.
         */
        status?: string | null;
    }
    /**
     * A list of comments on a file in Google Drive.
     */
    export interface Schema$CommentList {
        /**
         * The list of comments. If nextPageToken is populated, then this list may be incomplete and an additional page of results should be fetched.
         */
        items?: Schema$Comment[];
        /**
         * This is always drive#commentList.
         */
        kind?: string | null;
        /**
         * A link to the next page of comments.
         */
        nextLink?: string | null;
        /**
         * The page token for the next page of comments. This will be absent if the end of the comments list has been reached. If the token is rejected for any reason, it should be discarded, and pagination should be restarted from the first page of results.
         */
        nextPageToken?: string | null;
        /**
         * A link back to this list.
         */
        selfLink?: string | null;
    }
    /**
     * A comment on a file in Google Drive.
     */
    export interface Schema$CommentReply {
        /**
         * The author of the reply. The author&#39;s email address and permission ID will not be populated.
         */
        author?: Schema$User;
        /**
         * The plain text content used to create this reply. This is not HTML safe and should only be used as a starting point to make edits to a reply&#39;s content. This field is required on inserts if no verb is specified (resolve/reopen).
         */
        content?: string | null;
        /**
         * The date when this reply was first created.
         */
        createdDate?: string | null;
        /**
         * Whether this reply has been deleted. If a reply has been deleted the content will be cleared and this will only represent a reply that once existed.
         */
        deleted?: boolean | null;
        /**
         * HTML formatted content for this reply.
         */
        htmlContent?: string | null;
        /**
         * This is always drive#commentReply.
         */
        kind?: string | null;
        /**
         * The date when this reply was last modified.
         */
        modifiedDate?: string | null;
        /**
         * The ID of the reply.
         */
        replyId?: string | null;
        /**
         * The action this reply performed to the parent comment. When creating a new reply this is the action to be perform to the parent comment. Possible values are:   - &quot;resolve&quot; - To resolve a comment.  - &quot;reopen&quot; - To reopen (un-resolve) a comment.
         */
        verb?: string | null;
    }
    /**
     * A list of replies to a comment on a file in Google Drive.
     */
    export interface Schema$CommentReplyList {
        /**
         * The list of replies. If nextPageToken is populated, then this list may be incomplete and an additional page of results should be fetched.
         */
        items?: Schema$CommentReply[];
        /**
         * This is always drive#commentReplyList.
         */
        kind?: string | null;
        /**
         * A link to the next page of replies.
         */
        nextLink?: string | null;
        /**
         * The page token for the next page of replies. This will be absent if the end of the replies list has been reached. If the token is rejected for any reason, it should be discarded, and pagination should be restarted from the first page of results.
         */
        nextPageToken?: string | null;
        /**
         * A link back to this list.
         */
        selfLink?: string | null;
    }
    /**
     * Representation of a shared drive.
     */
    export interface Schema$Drive {
        /**
         * An image file and cropping parameters from which a background image for this shared drive is set. This is a write only field; it can only be set on drive.drives.update requests that don&#39;t set themeId. When specified, all fields of the backgroundImageFile must be set.
         */
        backgroundImageFile?: {
            id?: string;
            width?: number;
            xCoordinate?: number;
            yCoordinate?: number;
        } | null;
        /**
         * A short-lived link to this shared drive&#39;s background image.
         */
        backgroundImageLink?: string | null;
        /**
         * Capabilities the current user has on this shared drive.
         */
        capabilities?: {
            canAddChildren?: boolean;
            canChangeCopyRequiresWriterPermissionRestriction?: boolean;
            canChangeDomainUsersOnlyRestriction?: boolean;
            canChangeDriveBackground?: boolean;
            canChangeDriveMembersOnlyRestriction?: boolean;
            canComment?: boolean;
            canCopy?: boolean;
            canDeleteChildren?: boolean;
            canDeleteDrive?: boolean;
            canDownload?: boolean;
            canEdit?: boolean;
            canListChildren?: boolean;
            canManageMembers?: boolean;
            canReadRevisions?: boolean;
            canRename?: boolean;
            canRenameDrive?: boolean;
            canShare?: boolean;
            canTrashChildren?: boolean;
        } | null;
        /**
         * The color of this shared drive as an RGB hex string. It can only be set on a drive.drives.update request that does not set themeId.
         */
        colorRgb?: string | null;
        /**
         * The time at which the shared drive was created (RFC 3339 date-time).
         */
        createdDate?: string | null;
        /**
         * Whether the shared drive is hidden from default view.
         */
        hidden?: boolean | null;
        /**
         * The ID of this shared drive which is also the ID of the top level folder of this shared drive.
         */
        id?: string | null;
        /**
         * This is always drive#drive
         */
        kind?: string | null;
        /**
         * The name of this shared drive.
         */
        name?: string | null;
        /**
         * A set of restrictions that apply to this shared drive or items inside this shared drive.
         */
        restrictions?: {
            adminManagedRestrictions?: boolean;
            copyRequiresWriterPermission?: boolean;
            domainUsersOnly?: boolean;
            driveMembersOnly?: boolean;
        } | null;
        /**
         * The ID of the theme from which the background image and color will be set. The set of possible driveThemes can be retrieved from a drive.about.get response. When not specified on a drive.drives.insert request, a random theme is chosen from which the background image and color are set. This is a write-only field; it can only be set on requests that don&#39;t set colorRgb or backgroundImageFile.
         */
        themeId?: string | null;
    }
    /**
     * A list of shared drives.
     */
    export interface Schema$DriveList {
        /**
         * The list of shared drives. If nextPageToken is populated, then this list may be incomplete and an additional page of results should be fetched.
         */
        items?: Schema$Drive[];
        /**
         * This is always drive#driveList
         */
        kind?: string | null;
        /**
         * The page token for the next page of shared drives. This will be absent if the end of the list has been reached. If the token is rejected for any reason, it should be discarded, and pagination should be restarted from the first page of results.
         */
        nextPageToken?: string | null;
    }
    /**
     * The metadata for a file.
     */
    export interface Schema$File {
        /**
         * A link for opening the file in a relevant Google editor or viewer.
         */
        alternateLink?: string | null;
        /**
         * Whether this file is in the Application Data folder.
         */
        appDataContents?: boolean | null;
        /**
         * Deprecated: use capabilities/canComment.
         */
        canComment?: boolean | null;
        /**
         * Deprecated: use capabilities/canReadRevisions.
         */
        canReadRevisions?: boolean | null;
        /**
         * Capabilities the current user has on this file. Each capability corresponds to a fine-grained action that a user may take.
         */
        capabilities?: {
            canAddChildren?: boolean;
            canAddMyDriveParent?: boolean;
            canChangeCopyRequiresWriterPermission?: boolean;
            canChangeRestrictedDownload?: boolean;
            canComment?: boolean;
            canCopy?: boolean;
            canDelete?: boolean;
            canDeleteChildren?: boolean;
            canDownload?: boolean;
            canEdit?: boolean;
            canListChildren?: boolean;
            canModifyContent?: boolean;
            canMoveChildrenOutOfDrive?: boolean;
            canMoveChildrenOutOfTeamDrive?: boolean;
            canMoveChildrenWithinDrive?: boolean;
            canMoveChildrenWithinTeamDrive?: boolean;
            canMoveItemIntoTeamDrive?: boolean;
            canMoveItemOutOfDrive?: boolean;
            canMoveItemOutOfTeamDrive?: boolean;
            canMoveItemWithinDrive?: boolean;
            canMoveItemWithinTeamDrive?: boolean;
            canMoveTeamDriveItem?: boolean;
            canReadDrive?: boolean;
            canReadRevisions?: boolean;
            canReadTeamDrive?: boolean;
            canRemoveChildren?: boolean;
            canRemoveMyDriveParent?: boolean;
            canRename?: boolean;
            canShare?: boolean;
            canTrash?: boolean;
            canTrashChildren?: boolean;
            canUntrash?: boolean;
        } | null;
        /**
         * Deprecated: use capabilities/canCopy.
         */
        copyable?: boolean | null;
        /**
         * Whether the options to copy, print, or download this file, should be disabled for readers and commenters.
         */
        copyRequiresWriterPermission?: boolean | null;
        /**
         * Create time for this file (formatted RFC 3339 timestamp).
         */
        createdDate?: string | null;
        /**
         * A link to open this file with the user&#39;s default app for this file. Only populated when the drive.apps.readonly scope is used.
         */
        defaultOpenWithLink?: string | null;
        /**
         * A short description of the file.
         */
        description?: string | null;
        /**
         * Short lived download URL for the file. This field is only populated for files with content stored in Google Drive; it is not populated for Google Docs or shortcut files.
         */
        downloadUrl?: string | null;
        /**
         * ID of the shared drive the file resides in. Only populated for items in shared drives.
         */
        driveId?: string | null;
        /**
         * Deprecated: use capabilities/canEdit.
         */
        editable?: boolean | null;
        /**
         * A link for embedding the file.
         */
        embedLink?: string | null;
        /**
         * ETag of the file.
         */
        etag?: string | null;
        /**
         * Whether this file has been explicitly trashed, as opposed to recursively trashed.
         */
        explicitlyTrashed?: boolean | null;
        /**
         * Links for exporting Google Docs to specific formats.
         */
        exportLinks?: {
            [key: string]: string;
        } | null;
        /**
         * The final component of fullFileExtension with trailing text that does not appear to be part of the extension removed. This field is only populated for files with content stored in Google Drive; it is not populated for Google Docs or shortcut files.
         */
        fileExtension?: string | null;
        /**
         * The size of the file in bytes. This field is only populated for files with content stored in Google Drive; it is not populated for Google Docs or shortcut files.
         */
        fileSize?: string | null;
        /**
         * Folder color as an RGB hex string if the file is a folder. The list of supported colors is available in the folderColorPalette field of the About resource. If an unsupported color is specified, it will be changed to the closest color in the palette. Not populated for items in shared drives.
         */
        folderColorRgb?: string | null;
        /**
         * The full file extension; extracted from the title. May contain multiple concatenated extensions, such as &quot;tar.gz&quot;. Removing an extension from the title does not clear this field; however, changing the extension on the title does update this field. This field is only populated for files with content stored in Google Drive; it is not populated for Google Docs or shortcut files.
         */
        fullFileExtension?: string | null;
        /**
         * Whether there are permissions directly on this file. This field is only populated for items in shared drives.
         */
        hasAugmentedPermissions?: boolean | null;
        /**
         * Whether this file has a thumbnail. This does not indicate whether the requesting app has access to the thumbnail. To check access, look for the presence of the thumbnailLink field.
         */
        hasThumbnail?: boolean | null;
        /**
         * The ID of the file&#39;s head revision. This field is only populated for files with content stored in Google Drive; it is not populated for Google Docs or shortcut files.
         */
        headRevisionId?: string | null;
        /**
         * A link to the file&#39;s icon.
         */
        iconLink?: string | null;
        /**
         * The ID of the file.
         */
        id?: string | null;
        /**
         * Metadata about image media. This will only be present for image types, and its contents will depend on what can be parsed from the image content.
         */
        imageMediaMetadata?: {
            aperture?: number;
            cameraMake?: string;
            cameraModel?: string;
            colorSpace?: string;
            date?: string;
            exposureBias?: number;
            exposureMode?: string;
            exposureTime?: number;
            flashUsed?: boolean;
            focalLength?: number;
            height?: number;
            isoSpeed?: number;
            lens?: string;
            location?: {
                altitude?: number;
                latitude?: number;
                longitude?: number;
            };
            maxApertureValue?: number;
            meteringMode?: string;
            rotation?: number;
            sensor?: string;
            subjectDistance?: number;
            whiteBalance?: string;
            width?: number;
        } | null;
        /**
         * Indexable text attributes for the file (can only be written)
         */
        indexableText?: {
            text?: string;
        } | null;
        /**
         * Whether the file was created or opened by the requesting app.
         */
        isAppAuthorized?: boolean | null;
        /**
         * The type of file. This is always drive#file.
         */
        kind?: string | null;
        /**
         * A group of labels for the file.
         */
        labels?: {
            hidden?: boolean;
            modified?: boolean;
            restricted?: boolean;
            starred?: boolean;
            trashed?: boolean;
            viewed?: boolean;
        } | null;
        /**
         * The last user to modify this file.
         */
        lastModifyingUser?: Schema$User;
        /**
         * Name of the last user to modify this file.
         */
        lastModifyingUserName?: string | null;
        /**
         * Last time this file was viewed by the user (formatted RFC 3339 timestamp).
         */
        lastViewedByMeDate?: string | null;
        /**
         * Deprecated.
         */
        markedViewedByMeDate?: string | null;
        /**
         * An MD5 checksum for the content of this file. This field is only populated for files with content stored in Google Drive; it is not populated for Google Docs or shortcut files.
         */
        md5Checksum?: string | null;
        /**
         * The MIME type of the file. This is only mutable on update when uploading new content. This field can be left blank, and the mimetype will be determined from the uploaded content&#39;s MIME type.
         */
        mimeType?: string | null;
        /**
         * Last time this file was modified by the user (formatted RFC 3339 timestamp). Note that setting modifiedDate will also update the modifiedByMe date for the user which set the date.
         */
        modifiedByMeDate?: string | null;
        /**
         * Last time this file was modified by anyone (formatted RFC 3339 timestamp). This is only mutable on update when the setModifiedDate parameter is set.
         */
        modifiedDate?: string | null;
        /**
         * A map of the id of each of the user&#39;s apps to a link to open this file with that app. Only populated when the drive.apps.readonly scope is used.
         */
        openWithLinks?: {
            [key: string]: string;
        } | null;
        /**
         * The original filename of the uploaded content if available, or else the original value of the title field. This is only available for files with binary content in Google Drive.
         */
        originalFilename?: string | null;
        /**
         * Whether the file is owned by the current user. Not populated for items in shared drives.
         */
        ownedByMe?: boolean | null;
        /**
         * Name(s) of the owner(s) of this file. Not populated for items in shared drives.
         */
        ownerNames?: string[] | null;
        /**
         * The owner(s) of this file. Not populated for items in shared drives.
         */
        owners?: Schema$User[];
        /**
         * Collection of parent folders which contain this file. If not specified as part of an insert request, the file will be placed directly in the user&#39;s My Drive folder. If not specified as part of a copy request, the file will inherit any discoverable parents of the source file. Update requests can also use the addParents and removeParents parameters to modify the parents list.
         */
        parents?: Schema$ParentReference[];
        /**
         * List of permission IDs for users with access to this file.
         */
        permissionIds?: string[] | null;
        /**
         * The list of permissions for users with access to this file. Not populated for items in shared drives.
         */
        permissions?: Schema$Permission[];
        /**
         * The list of properties.
         */
        properties?: Schema$Property[];
        /**
         * The number of quota bytes used by this file.
         */
        quotaBytesUsed?: string | null;
        /**
         * A link back to this file.
         */
        selfLink?: string | null;
        /**
         * Deprecated: use capabilities/canShare.
         */
        shareable?: boolean | null;
        /**
         * Whether the file has been shared. Not populated for items in shared drives.
         */
        shared?: boolean | null;
        /**
         * Time at which this file was shared with the user (formatted RFC 3339 timestamp).
         */
        sharedWithMeDate?: string | null;
        /**
         * User that shared the item with the current user, if available.
         */
        sharingUser?: Schema$User;
        /**
         * Shortcut file details. Only populated for shortcut files, which have the mimeType field set to application/vnd.google-apps.shortcut.
         */
        shortcutDetails?: {
            targetId?: string;
            targetMimeType?: string;
        } | null;
        /**
         * The list of spaces which contain the file. Supported values are &#39;drive&#39;, &#39;appDataFolder&#39; and &#39;photos&#39;.
         */
        spaces?: string[] | null;
        /**
         * Deprecated - use driveId instead.
         */
        teamDriveId?: string | null;
        /**
         * A thumbnail for the file. This will only be used if a standard thumbnail cannot be generated.
         */
        thumbnail?: {
            image?: string;
            mimeType?: string;
        } | null;
        /**
         * A short-lived link to the file&#39;s thumbnail. Typically lasts on the order of hours. Only populated when the requesting app can access the file&#39;s content.
         */
        thumbnailLink?: string | null;
        /**
         * The thumbnail version for use in thumbnail cache invalidation.
         */
        thumbnailVersion?: string | null;
        /**
         * The title of this file. Note that for immutable items such as the top level folders of shared drives, My Drive root folder, and Application Data folder the title is constant.
         */
        title?: string | null;
        /**
         * The time that the item was trashed (formatted RFC 3339 timestamp). Only populated for items in shared drives.
         */
        trashedDate?: string | null;
        /**
         * If the file has been explicitly trashed, the user who trashed it. Only populated for items in shared drives.
         */
        trashingUser?: Schema$User;
        /**
         * The permissions for the authenticated user on this file.
         */
        userPermission?: Schema$Permission;
        /**
         * A monotonically increasing version number for the file. This reflects every change made to the file on the server, even those not visible to the requesting user.
         */
        version?: string | null;
        /**
         * Metadata about video media. This will only be present for video types.
         */
        videoMediaMetadata?: {
            durationMillis?: string;
            height?: number;
            width?: number;
        } | null;
        /**
         * A link for downloading the content of the file in a browser using cookie based authentication. In cases where the content is shared publicly, the content can be downloaded without any credentials.
         */
        webContentLink?: string | null;
        /**
         * A link only available on public folders for viewing their static web assets (HTML, CSS, JS, etc) via Google Drive&#39;s Website Hosting.
         */
        webViewLink?: string | null;
        /**
         * Whether writers can share the document with other users. Not populated for items in shared drives.
         */
        writersCanShare?: boolean | null;
    }
    /**
     * A list of files.
     */
    export interface Schema$FileList {
        /**
         * The ETag of the list.
         */
        etag?: string | null;
        /**
         * Whether the search process was incomplete. If true, then some search results may be missing, since all documents were not searched. This may occur when searching multiple drives with the &quot;allDrives&quot; corpora, but all corpora could not be searched. When this happens, it is suggested that clients narrow their query by choosing a different corpus such as &quot;default&quot; or &quot;drive&quot;.
         */
        incompleteSearch?: boolean | null;
        /**
         * The list of files. If nextPageToken is populated, then this list may be incomplete and an additional page of results should be fetched.
         */
        items?: Schema$File[];
        /**
         * This is always drive#fileList.
         */
        kind?: string | null;
        /**
         * A link to the next page of files.
         */
        nextLink?: string | null;
        /**
         * The page token for the next page of files. This will be absent if the end of the files list has been reached. If the token is rejected for any reason, it should be discarded, and pagination should be restarted from the first page of results.
         */
        nextPageToken?: string | null;
        /**
         * A link back to this list.
         */
        selfLink?: string | null;
    }
    /**
     * A list of generated IDs which can be provided in insert requests
     */
    export interface Schema$GeneratedIds {
        /**
         * The IDs generated for the requesting user in the specified space.
         */
        ids?: string[] | null;
        /**
         * This is always drive#generatedIds
         */
        kind?: string | null;
        /**
         * The type of file that can be created with these IDs.
         */
        space?: string | null;
    }
    /**
     * A list of a file&#39;s parents.
     */
    export interface Schema$ParentList {
        /**
         * The ETag of the list.
         */
        etag?: string | null;
        /**
         * The list of parents.
         */
        items?: Schema$ParentReference[];
        /**
         * This is always drive#parentList.
         */
        kind?: string | null;
        /**
         * A link back to this list.
         */
        selfLink?: string | null;
    }
    /**
     * A reference to a file&#39;s parent.
     */
    export interface Schema$ParentReference {
        /**
         * The ID of the parent.
         */
        id?: string | null;
        /**
         * Whether or not the parent is the root folder.
         */
        isRoot?: boolean | null;
        /**
         * This is always drive#parentReference.
         */
        kind?: string | null;
        /**
         * A link to the parent.
         */
        parentLink?: string | null;
        /**
         * A link back to this reference.
         */
        selfLink?: string | null;
    }
    /**
     * A permission for a file.
     */
    export interface Schema$Permission {
        /**
         * Additional roles for this user. Only commenter is currently allowed, though more may be supported in the future.
         */
        additionalRoles?: string[] | null;
        /**
         * Deprecated.
         */
        authKey?: string | null;
        /**
         * Whether the account associated with this permission has been deleted. This field only pertains to user and group permissions.
         */
        deleted?: boolean | null;
        /**
         * The domain name of the entity this permission refers to. This is an output-only field which is present when the permission type is user, group or domain.
         */
        domain?: string | null;
        /**
         * The email address of the user or group this permission refers to. This is an output-only field which is present when the permission type is user or group.
         */
        emailAddress?: string | null;
        /**
         * The ETag of the permission.
         */
        etag?: string | null;
        /**
         * The time at which this permission will expire (RFC 3339 date-time). Expiration dates have the following restrictions:   - They cannot be set on shared drive items  - They can only be set on user and group permissions  - The date must be in the future  - The date cannot be more than a year in the future  - The date can only be set on drive.permissions.update or drive.permissions.patch requests
         */
        expirationDate?: string | null;
        /**
         * The ID of the user this permission refers to, and identical to the permissionId in the About and Files resources. When making a drive.permissions.insert request, exactly one of the id or value fields must be specified unless the permission type is anyone, in which case both id and value are ignored.
         */
        id?: string | null;
        /**
         * This is always drive#permission.
         */
        kind?: string | null;
        /**
         * The name for this permission.
         */
        name?: string | null;
        /**
         * Details of whether the permissions on this shared drive item are inherited or directly on this item. This is an output-only field which is present only for shared drive items.
         */
        permissionDetails?: Array<{
            additionalRoles?: string[];
            inherited?: boolean;
            inheritedFrom?: string;
            permissionType?: string;
            role?: string;
        }> | null;
        /**
         * A link to the profile photo, if available.
         */
        photoLink?: string | null;
        /**
         * The primary role for this user. While new values may be supported in the future, the following are currently allowed:   - owner  - organizer  - fileOrganizer  - writer  - reader
         */
        role?: string | null;
        /**
         * A link back to this permission.
         */
        selfLink?: string | null;
        /**
         * Deprecated - use permissionDetails instead.
         */
        teamDrivePermissionDetails?: Array<{
            additionalRoles?: string[];
            inherited?: boolean;
            inheritedFrom?: string;
            role?: string;
            teamDrivePermissionType?: string;
        }> | null;
        /**
         * The account type. Allowed values are:   - user  - group  - domain  - anyone
         */
        type?: string | null;
        /**
         * The email address or domain name for the entity. This is used during inserts and is not populated in responses. When making a drive.permissions.insert request, exactly one of the id or value fields must be specified unless the permission type is anyone, in which case both id and value are ignored.
         */
        value?: string | null;
        /**
         * Whether the link is required for this permission.
         */
        withLink?: boolean | null;
    }
    /**
     * An ID for a user or group as seen in Permission items.
     */
    export interface Schema$PermissionId {
        /**
         * The permission ID.
         */
        id?: string | null;
        /**
         * This is always drive#permissionId.
         */
        kind?: string | null;
    }
    /**
     * A list of permissions associated with a file.
     */
    export interface Schema$PermissionList {
        /**
         * The ETag of the list.
         */
        etag?: string | null;
        /**
         * The list of permissions.
         */
        items?: Schema$Permission[];
        /**
         * This is always drive#permissionList.
         */
        kind?: string | null;
        /**
         * The page token for the next page of permissions. This field will be absent if the end of the permissions list has been reached. If the token is rejected for any reason, it should be discarded, and pagination should be restarted from the first page of results.
         */
        nextPageToken?: string | null;
        /**
         * A link back to this list.
         */
        selfLink?: string | null;
    }
    /**
     * A key-value pair attached to a file that is either public or private to an application. The following limits apply to file properties:   - Maximum of 100 properties total per file - Maximum of 30 private properties per app - Maximum of 30 public properties - Maximum of 124 bytes size limit on (key + value) string in UTF-8 encoding for a single property.
     */
    export interface Schema$Property {
        /**
         * ETag of the property.
         */
        etag?: string | null;
        /**
         * The key of this property.
         */
        key?: string | null;
        /**
         * This is always drive#property.
         */
        kind?: string | null;
        /**
         * The link back to this property.
         */
        selfLink?: string | null;
        /**
         * The value of this property.
         */
        value?: string | null;
        /**
         * The visibility of this property. Allowed values are PRIVATE and PUBLIC. (Default: PRIVATE)
         */
        visibility?: string | null;
    }
    /**
     * A collection of properties, key-value pairs that are either public or private to an application.
     */
    export interface Schema$PropertyList {
        /**
         * The ETag of the list.
         */
        etag?: string | null;
        /**
         * The list of properties.
         */
        items?: Schema$Property[];
        /**
         * This is always drive#propertyList.
         */
        kind?: string | null;
        /**
         * The link back to this list.
         */
        selfLink?: string | null;
    }
    /**
     * A revision of a file.
     */
    export interface Schema$Revision {
        downloadUrl?: string | null;
        /**
         * The ETag of the revision.
         */
        etag?: string | null;
        /**
         * Links for exporting Google Docs to specific formats.
         */
        exportLinks?: {
            [key: string]: string;
        } | null;
        /**
         * The size of the revision in bytes. This will only be populated on files with content stored in Drive.
         */
        fileSize?: string | null;
        /**
         * The ID of the revision.
         */
        id?: string | null;
        /**
         * This is always drive#revision.
         */
        kind?: string | null;
        /**
         * The last user to modify this revision.
         */
        lastModifyingUser?: Schema$User;
        /**
         * Name of the last user to modify this revision.
         */
        lastModifyingUserName?: string | null;
        /**
         * An MD5 checksum for the content of this revision. This will only be populated on files with content stored in Drive.
         */
        md5Checksum?: string | null;
        /**
         * The MIME type of the revision.
         */
        mimeType?: string | null;
        /**
         * Last time this revision was modified (formatted RFC 3339 timestamp).
         */
        modifiedDate?: string | null;
        /**
         * The original filename when this revision was created. This will only be populated on files with content stored in Drive.
         */
        originalFilename?: string | null;
        /**
         * Whether this revision is pinned to prevent automatic purging. This will only be populated and can only be modified on files with content stored in Drive which are not Google Docs. Revisions can also be pinned when they are created through the drive.files.insert/update/copy by using the pinned query parameter. Pinned revisions are stored indefinitely using additional storage quota, up to a maximum of 200 revisions.
         */
        pinned?: boolean | null;
        /**
         * Whether subsequent revisions will be automatically republished. This is only populated and can only be modified for Google Docs.
         */
        publishAuto?: boolean | null;
        /**
         * Whether this revision is published. This is only populated and can only be modified for Google Docs.
         */
        published?: boolean | null;
        /**
         * A link to the published revision.
         */
        publishedLink?: string | null;
        /**
         * Whether this revision is published outside the domain. This is only populated and can only be modified for Google Docs.
         */
        publishedOutsideDomain?: boolean | null;
        /**
         * A link back to this revision.
         */
        selfLink?: string | null;
    }
    /**
     * A list of revisions of a file.
     */
    export interface Schema$RevisionList {
        /**
         * The ETag of the list.
         */
        etag?: string | null;
        /**
         * The list of revisions. If nextPageToken is populated, then this list may be incomplete and an additional page of results should be fetched.
         */
        items?: Schema$Revision[];
        /**
         * This is always drive#revisionList.
         */
        kind?: string | null;
        /**
         * The page token for the next page of revisions. This field will be absent if the end of the revisions list has been reached. If the token is rejected for any reason, it should be discarded and pagination should be restarted from the first page of results.
         */
        nextPageToken?: string | null;
        /**
         * A link back to this list.
         */
        selfLink?: string | null;
    }
    export interface Schema$StartPageToken {
        /**
         * Identifies what kind of resource this is. Value: the fixed string &quot;drive#startPageToken&quot;.
         */
        kind?: string | null;
        /**
         * The starting page token for listing changes.
         */
        startPageToken?: string | null;
    }
    /**
     * Deprecated: use the drive collection instead.
     */
    export interface Schema$TeamDrive {
        /**
         * An image file and cropping parameters from which a background image for this Team Drive is set. This is a write only field; it can only be set on drive.teamdrives.update requests that don&#39;t set themeId. When specified, all fields of the backgroundImageFile must be set.
         */
        backgroundImageFile?: {
            id?: string;
            width?: number;
            xCoordinate?: number;
            yCoordinate?: number;
        } | null;
        /**
         * A short-lived link to this Team Drive&#39;s background image.
         */
        backgroundImageLink?: string | null;
        /**
         * Capabilities the current user has on this Team Drive.
         */
        capabilities?: {
            canAddChildren?: boolean;
            canChangeCopyRequiresWriterPermissionRestriction?: boolean;
            canChangeDomainUsersOnlyRestriction?: boolean;
            canChangeTeamDriveBackground?: boolean;
            canChangeTeamMembersOnlyRestriction?: boolean;
            canComment?: boolean;
            canCopy?: boolean;
            canDeleteChildren?: boolean;
            canDeleteTeamDrive?: boolean;
            canDownload?: boolean;
            canEdit?: boolean;
            canListChildren?: boolean;
            canManageMembers?: boolean;
            canReadRevisions?: boolean;
            canRemoveChildren?: boolean;
            canRename?: boolean;
            canRenameTeamDrive?: boolean;
            canShare?: boolean;
            canTrashChildren?: boolean;
        } | null;
        /**
         * The color of this Team Drive as an RGB hex string. It can only be set on a drive.teamdrives.update request that does not set themeId.
         */
        colorRgb?: string | null;
        /**
         * The time at which the Team Drive was created (RFC 3339 date-time).
         */
        createdDate?: string | null;
        /**
         * The ID of this Team Drive which is also the ID of the top level folder of this Team Drive.
         */
        id?: string | null;
        /**
         * This is always drive#teamDrive
         */
        kind?: string | null;
        /**
         * The name of this Team Drive.
         */
        name?: string | null;
        /**
         * A set of restrictions that apply to this Team Drive or items inside this Team Drive.
         */
        restrictions?: {
            adminManagedRestrictions?: boolean;
            copyRequiresWriterPermission?: boolean;
            domainUsersOnly?: boolean;
            teamMembersOnly?: boolean;
        } | null;
        /**
         * The ID of the theme from which the background image and color will be set. The set of possible teamDriveThemes can be retrieved from a drive.about.get response. When not specified on a drive.teamdrives.insert request, a random theme is chosen from which the background image and color are set. This is a write-only field; it can only be set on requests that don&#39;t set colorRgb or backgroundImageFile.
         */
        themeId?: string | null;
    }
    /**
     * A list of Team Drives.
     */
    export interface Schema$TeamDriveList {
        /**
         * The list of Team Drives.
         */
        items?: Schema$TeamDrive[];
        /**
         * This is always drive#teamDriveList
         */
        kind?: string | null;
        /**
         * The page token for the next page of Team Drives.
         */
        nextPageToken?: string | null;
    }
    /**
     * Information about a Drive user.
     */
    export interface Schema$User {
        /**
         * A plain text displayable name for this user.
         */
        displayName?: string | null;
        /**
         * The email address of the user.
         */
        emailAddress?: string | null;
        /**
         * Whether this user is the same as the authenticated user for whom the request was made.
         */
        isAuthenticatedUser?: boolean | null;
        /**
         * This is always drive#user.
         */
        kind?: string | null;
        /**
         * The user&#39;s ID as visible in the permissions collection.
         */
        permissionId?: string | null;
        /**
         * The user&#39;s profile picture.
         */
        picture?: {
            url?: string;
        } | null;
    }
    export class Resource$About {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * drive.about.get
         * @desc Gets the information about the current user along with Drive API settings
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.appdata',
         *       'https://www.googleapis.com/auth/drive.file',
         *       'https://www.googleapis.com/auth/drive.metadata',
         *       'https://www.googleapis.com/auth/drive.metadata.readonly',
         *       'https://www.googleapis.com/auth/drive.photos.readonly',
         *       'https://www.googleapis.com/auth/drive.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.about.get({
         *     // Whether to count changes outside the My Drive hierarchy. When set to false, changes to files such as those in the Application Data folder or shared files which have not been added to My Drive will be omitted from the maxChangeIdCount.
         *     includeSubscribed: 'placeholder-value',
         *     // Maximum number of remaining change IDs to count
         *     maxChangeIdCount: 'placeholder-value',
         *     // Change ID to start counting from when calculating number of remaining change IDs
         *     startChangeId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "additionalRoleInfo": [],
         *   //   "canCreateDrives": false,
         *   //   "canCreateTeamDrives": false,
         *   //   "domainSharingPolicy": "my_domainSharingPolicy",
         *   //   "driveThemes": [],
         *   //   "etag": "my_etag",
         *   //   "exportFormats": [],
         *   //   "features": [],
         *   //   "folderColorPalette": [],
         *   //   "importFormats": [],
         *   //   "isCurrentAppInstalled": false,
         *   //   "kind": "my_kind",
         *   //   "languageCode": "my_languageCode",
         *   //   "largestChangeId": "my_largestChangeId",
         *   //   "maxUploadSizes": [],
         *   //   "name": "my_name",
         *   //   "permissionId": "my_permissionId",
         *   //   "quotaBytesByService": [],
         *   //   "quotaBytesTotal": "my_quotaBytesTotal",
         *   //   "quotaBytesUsed": "my_quotaBytesUsed",
         *   //   "quotaBytesUsedAggregate": "my_quotaBytesUsedAggregate",
         *   //   "quotaBytesUsedInTrash": "my_quotaBytesUsedInTrash",
         *   //   "quotaType": "my_quotaType",
         *   //   "remainingChangeIds": "my_remainingChangeIds",
         *   //   "rootFolderId": "my_rootFolderId",
         *   //   "selfLink": "my_selfLink",
         *   //   "teamDriveThemes": [],
         *   //   "user": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.about.get
         * @memberOf! ()
         *
         * @param {object=} params Parameters for request
         * @param {boolean=} params.includeSubscribed Whether to count changes outside the My Drive hierarchy. When set to false, changes to files such as those in the Application Data folder or shared files which have not been added to My Drive will be omitted from the maxChangeIdCount.
         * @param {string=} params.maxChangeIdCount Maximum number of remaining change IDs to count
         * @param {string=} params.startChangeId Change ID to start counting from when calculating number of remaining change IDs
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$About$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$About$Get, options?: MethodOptions): GaxiosPromise<Schema$About>;
        get(params: Params$Resource$About$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$About$Get, options: MethodOptions | BodyResponseCallback<Schema$About>, callback: BodyResponseCallback<Schema$About>): void;
        get(params: Params$Resource$About$Get, callback: BodyResponseCallback<Schema$About>): void;
        get(callback: BodyResponseCallback<Schema$About>): void;
    }
    export interface Params$Resource$About$Get extends StandardParameters {
        /**
         * Whether to count changes outside the My Drive hierarchy. When set to false, changes to files such as those in the Application Data folder or shared files which have not been added to My Drive will be omitted from the maxChangeIdCount.
         */
        includeSubscribed?: boolean;
        /**
         * Maximum number of remaining change IDs to count
         */
        maxChangeIdCount?: string;
        /**
         * Change ID to start counting from when calculating number of remaining change IDs
         */
        startChangeId?: string;
    }
    export class Resource$Apps {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * drive.apps.get
         * @desc Gets a specific app.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.appdata',
         *       'https://www.googleapis.com/auth/drive.apps.readonly',
         *       'https://www.googleapis.com/auth/drive.file',
         *       'https://www.googleapis.com/auth/drive.metadata',
         *       'https://www.googleapis.com/auth/drive.metadata.readonly',
         *       'https://www.googleapis.com/auth/drive.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.apps.get({
         *     // The ID of the app.
         *     appId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "authorized": false,
         *   //   "createInFolderTemplate": "my_createInFolderTemplate",
         *   //   "createUrl": "my_createUrl",
         *   //   "hasDriveWideScope": false,
         *   //   "icons": [],
         *   //   "id": "my_id",
         *   //   "installed": false,
         *   //   "kind": "my_kind",
         *   //   "longDescription": "my_longDescription",
         *   //   "name": "my_name",
         *   //   "objectType": "my_objectType",
         *   //   "openUrlTemplate": "my_openUrlTemplate",
         *   //   "primaryFileExtensions": [],
         *   //   "primaryMimeTypes": [],
         *   //   "productId": "my_productId",
         *   //   "productUrl": "my_productUrl",
         *   //   "secondaryFileExtensions": [],
         *   //   "secondaryMimeTypes": [],
         *   //   "shortDescription": "my_shortDescription",
         *   //   "supportsCreate": false,
         *   //   "supportsImport": false,
         *   //   "supportsMultiOpen": false,
         *   //   "supportsOfflineCreate": false,
         *   //   "useByDefault": false
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.apps.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.appId The ID of the app.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Apps$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Apps$Get, options?: MethodOptions): GaxiosPromise<Schema$App>;
        get(params: Params$Resource$Apps$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Apps$Get, options: MethodOptions | BodyResponseCallback<Schema$App>, callback: BodyResponseCallback<Schema$App>): void;
        get(params: Params$Resource$Apps$Get, callback: BodyResponseCallback<Schema$App>): void;
        get(callback: BodyResponseCallback<Schema$App>): void;
        /**
         * drive.apps.list
         * @desc Lists a user's installed apps.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/drive.apps.readonly'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.apps.list({
         *     // A comma-separated list of file extensions for open with filtering. All apps within the given app query scope which can open any of the given file extensions will be included in the response. If appFilterMimeTypes are provided as well, the result is a union of the two resulting app lists.
         *     appFilterExtensions: 'placeholder-value',
         *     // A comma-separated list of MIME types for open with filtering. All apps within the given app query scope which can open any of the given MIME types will be included in the response. If appFilterExtensions are provided as well, the result is a union of the two resulting app lists.
         *     appFilterMimeTypes: 'placeholder-value',
         *     // A language or locale code, as defined by BCP 47, with some extensions from Unicode's LDML format (http://www.unicode.org/reports/tr35/).
         *     languageCode: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "defaultAppIds": [],
         *   //   "etag": "my_etag",
         *   //   "items": [],
         *   //   "kind": "my_kind",
         *   //   "selfLink": "my_selfLink"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.apps.list
         * @memberOf! ()
         *
         * @param {object=} params Parameters for request
         * @param {string=} params.appFilterExtensions A comma-separated list of file extensions for open with filtering. All apps within the given app query scope which can open any of the given file extensions will be included in the response. If appFilterMimeTypes are provided as well, the result is a union of the two resulting app lists.
         * @param {string=} params.appFilterMimeTypes A comma-separated list of MIME types for open with filtering. All apps within the given app query scope which can open any of the given MIME types will be included in the response. If appFilterExtensions are provided as well, the result is a union of the two resulting app lists.
         * @param {string=} params.languageCode A language or locale code, as defined by BCP 47, with some extensions from Unicode's LDML format (http://www.unicode.org/reports/tr35/).
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Apps$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Apps$List, options?: MethodOptions): GaxiosPromise<Schema$AppList>;
        list(params: Params$Resource$Apps$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Apps$List, options: MethodOptions | BodyResponseCallback<Schema$AppList>, callback: BodyResponseCallback<Schema$AppList>): void;
        list(params: Params$Resource$Apps$List, callback: BodyResponseCallback<Schema$AppList>): void;
        list(callback: BodyResponseCallback<Schema$AppList>): void;
    }
    export interface Params$Resource$Apps$Get extends StandardParameters {
        /**
         * The ID of the app.
         */
        appId?: string;
    }
    export interface Params$Resource$Apps$List extends StandardParameters {
        /**
         * A comma-separated list of file extensions for open with filtering. All apps within the given app query scope which can open any of the given file extensions will be included in the response. If appFilterMimeTypes are provided as well, the result is a union of the two resulting app lists.
         */
        appFilterExtensions?: string;
        /**
         * A comma-separated list of MIME types for open with filtering. All apps within the given app query scope which can open any of the given MIME types will be included in the response. If appFilterExtensions are provided as well, the result is a union of the two resulting app lists.
         */
        appFilterMimeTypes?: string;
        /**
         * A language or locale code, as defined by BCP 47, with some extensions from Unicode's LDML format (http://www.unicode.org/reports/tr35/).
         */
        languageCode?: string;
    }
    export class Resource$Changes {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * drive.changes.get
         * @desc Deprecated - Use changes.getStartPageToken and changes.list to retrieve recent changes.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.appdata',
         *       'https://www.googleapis.com/auth/drive.apps.readonly',
         *       'https://www.googleapis.com/auth/drive.file',
         *       'https://www.googleapis.com/auth/drive.metadata',
         *       'https://www.googleapis.com/auth/drive.metadata.readonly',
         *       'https://www.googleapis.com/auth/drive.photos.readonly',
         *       'https://www.googleapis.com/auth/drive.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.changes.get({
         *     // The ID of the change.
         *     changeId: 'placeholder-value',
         *     // The shared drive from which the change is returned.
         *     driveId: 'placeholder-value',
         *     // Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         *     supportsAllDrives: 'placeholder-value',
         *     // Deprecated use supportsAllDrives instead.
         *     supportsTeamDrives: 'placeholder-value',
         *     // Deprecated use driveId instead.
         *     teamDriveId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "changeType": "my_changeType",
         *   //   "deleted": false,
         *   //   "drive": {},
         *   //   "driveId": "my_driveId",
         *   //   "file": {},
         *   //   "fileId": "my_fileId",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "modificationDate": "my_modificationDate",
         *   //   "selfLink": "my_selfLink",
         *   //   "teamDrive": {},
         *   //   "teamDriveId": "my_teamDriveId",
         *   //   "type": "my_type"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.changes.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.changeId The ID of the change.
         * @param {string=} params.driveId The shared drive from which the change is returned.
         * @param {boolean=} params.supportsAllDrives Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         * @param {boolean=} params.supportsTeamDrives Deprecated use supportsAllDrives instead.
         * @param {string=} params.teamDriveId Deprecated use driveId instead.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Changes$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Changes$Get, options?: MethodOptions): GaxiosPromise<Schema$Change>;
        get(params: Params$Resource$Changes$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Changes$Get, options: MethodOptions | BodyResponseCallback<Schema$Change>, callback: BodyResponseCallback<Schema$Change>): void;
        get(params: Params$Resource$Changes$Get, callback: BodyResponseCallback<Schema$Change>): void;
        get(callback: BodyResponseCallback<Schema$Change>): void;
        /**
         * drive.changes.getStartPageToken
         * @desc Gets the starting pageToken for listing future changes.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.appdata',
         *       'https://www.googleapis.com/auth/drive.apps.readonly',
         *       'https://www.googleapis.com/auth/drive.file',
         *       'https://www.googleapis.com/auth/drive.metadata',
         *       'https://www.googleapis.com/auth/drive.metadata.readonly',
         *       'https://www.googleapis.com/auth/drive.photos.readonly',
         *       'https://www.googleapis.com/auth/drive.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.changes.getStartPageToken({
         *     // The ID of the shared drive for which the starting pageToken for listing future changes from that shared drive is returned.
         *     driveId: 'placeholder-value',
         *     // Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         *     supportsAllDrives: 'placeholder-value',
         *     // Deprecated use supportsAllDrives instead.
         *     supportsTeamDrives: 'placeholder-value',
         *     // Deprecated use driveId instead.
         *     teamDriveId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "kind": "my_kind",
         *   //   "startPageToken": "my_startPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.changes.getStartPageToken
         * @memberOf! ()
         *
         * @param {object=} params Parameters for request
         * @param {string=} params.driveId The ID of the shared drive for which the starting pageToken for listing future changes from that shared drive is returned.
         * @param {boolean=} params.supportsAllDrives Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         * @param {boolean=} params.supportsTeamDrives Deprecated use supportsAllDrives instead.
         * @param {string=} params.teamDriveId Deprecated use driveId instead.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        getStartPageToken(params: Params$Resource$Changes$Getstartpagetoken, options: StreamMethodOptions): GaxiosPromise<Readable>;
        getStartPageToken(params?: Params$Resource$Changes$Getstartpagetoken, options?: MethodOptions): GaxiosPromise<Schema$StartPageToken>;
        getStartPageToken(params: Params$Resource$Changes$Getstartpagetoken, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        getStartPageToken(params: Params$Resource$Changes$Getstartpagetoken, options: MethodOptions | BodyResponseCallback<Schema$StartPageToken>, callback: BodyResponseCallback<Schema$StartPageToken>): void;
        getStartPageToken(params: Params$Resource$Changes$Getstartpagetoken, callback: BodyResponseCallback<Schema$StartPageToken>): void;
        getStartPageToken(callback: BodyResponseCallback<Schema$StartPageToken>): void;
        /**
         * drive.changes.list
         * @desc Lists the changes for a user or shared drive.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.appdata',
         *       'https://www.googleapis.com/auth/drive.apps.readonly',
         *       'https://www.googleapis.com/auth/drive.file',
         *       'https://www.googleapis.com/auth/drive.metadata',
         *       'https://www.googleapis.com/auth/drive.metadata.readonly',
         *       'https://www.googleapis.com/auth/drive.photos.readonly',
         *       'https://www.googleapis.com/auth/drive.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.changes.list({
         *     // The shared drive from which changes are returned. If specified the change IDs will be reflective of the shared drive; use the combined drive ID and change ID as an identifier.
         *     driveId: 'placeholder-value',
         *     // Whether changes should include the file resource if the file is still accessible by the user at the time of the request, even when a file was removed from the list of changes and there will be no further change entries for this file.
         *     includeCorpusRemovals: 'placeholder-value',
         *     // Whether to include changes indicating that items have been removed from the list of changes, for example by deletion or loss of access.
         *     includeDeleted: 'placeholder-value',
         *     // Deprecated - Whether both My Drive and shared drive items should be included in results. This parameter will only be effective until June 1, 2020. Afterwards shared drive items are included in the results.
         *     includeItemsFromAllDrives: 'placeholder-value',
         *     // Whether to include changes outside the My Drive hierarchy in the result. When set to false, changes to files such as those in the Application Data folder or shared files which have not been added to My Drive are omitted from the result.
         *     includeSubscribed: 'placeholder-value',
         *     // Deprecated use includeItemsFromAllDrives instead.
         *     includeTeamDriveItems: 'placeholder-value',
         *     // Maximum number of changes to return.
         *     maxResults: 'placeholder-value',
         *     // The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response or to the response from the getStartPageToken method.
         *     pageToken: 'placeholder-value',
         *     // A comma-separated list of spaces to query. Supported values are 'drive', 'appDataFolder' and 'photos'.
         *     spaces: 'placeholder-value',
         *     // Deprecated - use pageToken instead.
         *     startChangeId: 'placeholder-value',
         *     // Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         *     supportsAllDrives: 'placeholder-value',
         *     // Deprecated use supportsAllDrives instead.
         *     supportsTeamDrives: 'placeholder-value',
         *     // Deprecated use driveId instead.
         *     teamDriveId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "etag": "my_etag",
         *   //   "items": [],
         *   //   "kind": "my_kind",
         *   //   "largestChangeId": "my_largestChangeId",
         *   //   "newStartPageToken": "my_newStartPageToken",
         *   //   "nextLink": "my_nextLink",
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "selfLink": "my_selfLink"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.changes.list
         * @memberOf! ()
         *
         * @param {object=} params Parameters for request
         * @param {string=} params.driveId The shared drive from which changes are returned. If specified the change IDs will be reflective of the shared drive; use the combined drive ID and change ID as an identifier.
         * @param {boolean=} params.includeCorpusRemovals Whether changes should include the file resource if the file is still accessible by the user at the time of the request, even when a file was removed from the list of changes and there will be no further change entries for this file.
         * @param {boolean=} params.includeDeleted Whether to include changes indicating that items have been removed from the list of changes, for example by deletion or loss of access.
         * @param {boolean=} params.includeItemsFromAllDrives Deprecated - Whether both My Drive and shared drive items should be included in results. This parameter will only be effective until June 1, 2020. Afterwards shared drive items are included in the results.
         * @param {boolean=} params.includeSubscribed Whether to include changes outside the My Drive hierarchy in the result. When set to false, changes to files such as those in the Application Data folder or shared files which have not been added to My Drive are omitted from the result.
         * @param {boolean=} params.includeTeamDriveItems Deprecated use includeItemsFromAllDrives instead.
         * @param {integer=} params.maxResults Maximum number of changes to return.
         * @param {string=} params.pageToken The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response or to the response from the getStartPageToken method.
         * @param {string=} params.spaces A comma-separated list of spaces to query. Supported values are 'drive', 'appDataFolder' and 'photos'.
         * @param {string=} params.startChangeId Deprecated - use pageToken instead.
         * @param {boolean=} params.supportsAllDrives Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         * @param {boolean=} params.supportsTeamDrives Deprecated use supportsAllDrives instead.
         * @param {string=} params.teamDriveId Deprecated use driveId instead.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Changes$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Changes$List, options?: MethodOptions): GaxiosPromise<Schema$ChangeList>;
        list(params: Params$Resource$Changes$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Changes$List, options: MethodOptions | BodyResponseCallback<Schema$ChangeList>, callback: BodyResponseCallback<Schema$ChangeList>): void;
        list(params: Params$Resource$Changes$List, callback: BodyResponseCallback<Schema$ChangeList>): void;
        list(callback: BodyResponseCallback<Schema$ChangeList>): void;
        /**
         * drive.changes.watch
         * @desc Subscribe to changes for a user.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.appdata',
         *       'https://www.googleapis.com/auth/drive.apps.readonly',
         *       'https://www.googleapis.com/auth/drive.file',
         *       'https://www.googleapis.com/auth/drive.metadata',
         *       'https://www.googleapis.com/auth/drive.metadata.readonly',
         *       'https://www.googleapis.com/auth/drive.photos.readonly',
         *       'https://www.googleapis.com/auth/drive.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.changes.watch({
         *     // The shared drive from which changes are returned. If specified the change IDs will be reflective of the shared drive; use the combined drive ID and change ID as an identifier.
         *     driveId: 'placeholder-value',
         *     // Whether changes should include the file resource if the file is still accessible by the user at the time of the request, even when a file was removed from the list of changes and there will be no further change entries for this file.
         *     includeCorpusRemovals: 'placeholder-value',
         *     // Whether to include changes indicating that items have been removed from the list of changes, for example by deletion or loss of access.
         *     includeDeleted: 'placeholder-value',
         *     // Deprecated - Whether both My Drive and shared drive items should be included in results. This parameter will only be effective until June 1, 2020. Afterwards shared drive items are included in the results.
         *     includeItemsFromAllDrives: 'placeholder-value',
         *     // Whether to include changes outside the My Drive hierarchy in the result. When set to false, changes to files such as those in the Application Data folder or shared files which have not been added to My Drive are omitted from the result.
         *     includeSubscribed: 'placeholder-value',
         *     // Deprecated use includeItemsFromAllDrives instead.
         *     includeTeamDriveItems: 'placeholder-value',
         *     // Maximum number of changes to return.
         *     maxResults: 'placeholder-value',
         *     // The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response or to the response from the getStartPageToken method.
         *     pageToken: 'placeholder-value',
         *     // A comma-separated list of spaces to query. Supported values are 'drive', 'appDataFolder' and 'photos'.
         *     spaces: 'placeholder-value',
         *     // Deprecated - use pageToken instead.
         *     startChangeId: 'placeholder-value',
         *     // Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         *     supportsAllDrives: 'placeholder-value',
         *     // Deprecated use supportsAllDrives instead.
         *     supportsTeamDrives: 'placeholder-value',
         *     // Deprecated use driveId instead.
         *     teamDriveId: 'placeholder-value',
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
         * @alias drive.changes.watch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.driveId The shared drive from which changes are returned. If specified the change IDs will be reflective of the shared drive; use the combined drive ID and change ID as an identifier.
         * @param {boolean=} params.includeCorpusRemovals Whether changes should include the file resource if the file is still accessible by the user at the time of the request, even when a file was removed from the list of changes and there will be no further change entries for this file.
         * @param {boolean=} params.includeDeleted Whether to include changes indicating that items have been removed from the list of changes, for example by deletion or loss of access.
         * @param {boolean=} params.includeItemsFromAllDrives Deprecated - Whether both My Drive and shared drive items should be included in results. This parameter will only be effective until June 1, 2020. Afterwards shared drive items are included in the results.
         * @param {boolean=} params.includeSubscribed Whether to include changes outside the My Drive hierarchy in the result. When set to false, changes to files such as those in the Application Data folder or shared files which have not been added to My Drive are omitted from the result.
         * @param {boolean=} params.includeTeamDriveItems Deprecated use includeItemsFromAllDrives instead.
         * @param {integer=} params.maxResults Maximum number of changes to return.
         * @param {string=} params.pageToken The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response or to the response from the getStartPageToken method.
         * @param {string=} params.spaces A comma-separated list of spaces to query. Supported values are 'drive', 'appDataFolder' and 'photos'.
         * @param {string=} params.startChangeId Deprecated - use pageToken instead.
         * @param {boolean=} params.supportsAllDrives Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         * @param {boolean=} params.supportsTeamDrives Deprecated use supportsAllDrives instead.
         * @param {string=} params.teamDriveId Deprecated use driveId instead.
         * @param {().Channel} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        watch(params: Params$Resource$Changes$Watch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        watch(params?: Params$Resource$Changes$Watch, options?: MethodOptions): GaxiosPromise<Schema$Channel>;
        watch(params: Params$Resource$Changes$Watch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        watch(params: Params$Resource$Changes$Watch, options: MethodOptions | BodyResponseCallback<Schema$Channel>, callback: BodyResponseCallback<Schema$Channel>): void;
        watch(params: Params$Resource$Changes$Watch, callback: BodyResponseCallback<Schema$Channel>): void;
        watch(callback: BodyResponseCallback<Schema$Channel>): void;
    }
    export interface Params$Resource$Changes$Get extends StandardParameters {
        /**
         * The ID of the change.
         */
        changeId?: string;
        /**
         * The shared drive from which the change is returned.
         */
        driveId?: string;
        /**
         * Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         */
        supportsAllDrives?: boolean;
        /**
         * Deprecated use supportsAllDrives instead.
         */
        supportsTeamDrives?: boolean;
        /**
         * Deprecated use driveId instead.
         */
        teamDriveId?: string;
    }
    export interface Params$Resource$Changes$Getstartpagetoken extends StandardParameters {
        /**
         * The ID of the shared drive for which the starting pageToken for listing future changes from that shared drive is returned.
         */
        driveId?: string;
        /**
         * Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         */
        supportsAllDrives?: boolean;
        /**
         * Deprecated use supportsAllDrives instead.
         */
        supportsTeamDrives?: boolean;
        /**
         * Deprecated use driveId instead.
         */
        teamDriveId?: string;
    }
    export interface Params$Resource$Changes$List extends StandardParameters {
        /**
         * The shared drive from which changes are returned. If specified the change IDs will be reflective of the shared drive; use the combined drive ID and change ID as an identifier.
         */
        driveId?: string;
        /**
         * Whether changes should include the file resource if the file is still accessible by the user at the time of the request, even when a file was removed from the list of changes and there will be no further change entries for this file.
         */
        includeCorpusRemovals?: boolean;
        /**
         * Whether to include changes indicating that items have been removed from the list of changes, for example by deletion or loss of access.
         */
        includeDeleted?: boolean;
        /**
         * Deprecated - Whether both My Drive and shared drive items should be included in results. This parameter will only be effective until June 1, 2020. Afterwards shared drive items are included in the results.
         */
        includeItemsFromAllDrives?: boolean;
        /**
         * Whether to include changes outside the My Drive hierarchy in the result. When set to false, changes to files such as those in the Application Data folder or shared files which have not been added to My Drive are omitted from the result.
         */
        includeSubscribed?: boolean;
        /**
         * Deprecated use includeItemsFromAllDrives instead.
         */
        includeTeamDriveItems?: boolean;
        /**
         * Maximum number of changes to return.
         */
        maxResults?: number;
        /**
         * The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response or to the response from the getStartPageToken method.
         */
        pageToken?: string;
        /**
         * A comma-separated list of spaces to query. Supported values are 'drive', 'appDataFolder' and 'photos'.
         */
        spaces?: string;
        /**
         * Deprecated - use pageToken instead.
         */
        startChangeId?: string;
        /**
         * Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         */
        supportsAllDrives?: boolean;
        /**
         * Deprecated use supportsAllDrives instead.
         */
        supportsTeamDrives?: boolean;
        /**
         * Deprecated use driveId instead.
         */
        teamDriveId?: string;
    }
    export interface Params$Resource$Changes$Watch extends StandardParameters {
        /**
         * The shared drive from which changes are returned. If specified the change IDs will be reflective of the shared drive; use the combined drive ID and change ID as an identifier.
         */
        driveId?: string;
        /**
         * Whether changes should include the file resource if the file is still accessible by the user at the time of the request, even when a file was removed from the list of changes and there will be no further change entries for this file.
         */
        includeCorpusRemovals?: boolean;
        /**
         * Whether to include changes indicating that items have been removed from the list of changes, for example by deletion or loss of access.
         */
        includeDeleted?: boolean;
        /**
         * Deprecated - Whether both My Drive and shared drive items should be included in results. This parameter will only be effective until June 1, 2020. Afterwards shared drive items are included in the results.
         */
        includeItemsFromAllDrives?: boolean;
        /**
         * Whether to include changes outside the My Drive hierarchy in the result. When set to false, changes to files such as those in the Application Data folder or shared files which have not been added to My Drive are omitted from the result.
         */
        includeSubscribed?: boolean;
        /**
         * Deprecated use includeItemsFromAllDrives instead.
         */
        includeTeamDriveItems?: boolean;
        /**
         * Maximum number of changes to return.
         */
        maxResults?: number;
        /**
         * The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response or to the response from the getStartPageToken method.
         */
        pageToken?: string;
        /**
         * A comma-separated list of spaces to query. Supported values are 'drive', 'appDataFolder' and 'photos'.
         */
        spaces?: string;
        /**
         * Deprecated - use pageToken instead.
         */
        startChangeId?: string;
        /**
         * Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         */
        supportsAllDrives?: boolean;
        /**
         * Deprecated use supportsAllDrives instead.
         */
        supportsTeamDrives?: boolean;
        /**
         * Deprecated use driveId instead.
         */
        teamDriveId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Channel;
    }
    export class Resource$Channels {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * drive.channels.stop
         * @desc Stop watching resources through this channel
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.appdata',
         *       'https://www.googleapis.com/auth/drive.apps.readonly',
         *       'https://www.googleapis.com/auth/drive.file',
         *       'https://www.googleapis.com/auth/drive.metadata',
         *       'https://www.googleapis.com/auth/drive.metadata.readonly',
         *       'https://www.googleapis.com/auth/drive.photos.readonly',
         *       'https://www.googleapis.com/auth/drive.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.channels.stop({
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
         * @alias drive.channels.stop
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
    export class Resource$Children {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * drive.children.delete
         * @desc Removes a child from a folder.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.file',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.children.delete({
         *     // The ID of the child.
         *     childId: 'placeholder-value',
         *     // Set to true to opt in to API behavior that aims for all items to have exactly one parent. This parameter only takes effect if the item is not in a shared drive. If the item's last parent is removed, the item is placed under its owner's root.
         *     enforceSingleParent: 'placeholder-value',
         *     // The ID of the folder.
         *     folderId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.children.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.childId The ID of the child.
         * @param {boolean=} params.enforceSingleParent Set to true to opt in to API behavior that aims for all items to have exactly one parent. This parameter only takes effect if the item is not in a shared drive. If the item's last parent is removed, the item is placed under its owner's root.
         * @param {string} params.folderId The ID of the folder.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Children$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Children$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Children$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Children$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Children$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * drive.children.get
         * @desc Gets a specific child reference.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.appdata',
         *       'https://www.googleapis.com/auth/drive.file',
         *       'https://www.googleapis.com/auth/drive.metadata',
         *       'https://www.googleapis.com/auth/drive.metadata.readonly',
         *       'https://www.googleapis.com/auth/drive.photos.readonly',
         *       'https://www.googleapis.com/auth/drive.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.children.get({
         *     // The ID of the child.
         *     childId: 'placeholder-value',
         *     // The ID of the folder.
         *     folderId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "childLink": "my_childLink",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "selfLink": "my_selfLink"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.children.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.childId The ID of the child.
         * @param {string} params.folderId The ID of the folder.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Children$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Children$Get, options?: MethodOptions): GaxiosPromise<Schema$ChildReference>;
        get(params: Params$Resource$Children$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Children$Get, options: MethodOptions | BodyResponseCallback<Schema$ChildReference>, callback: BodyResponseCallback<Schema$ChildReference>): void;
        get(params: Params$Resource$Children$Get, callback: BodyResponseCallback<Schema$ChildReference>): void;
        get(callback: BodyResponseCallback<Schema$ChildReference>): void;
        /**
         * drive.children.insert
         * @desc Inserts a file into a folder.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.appdata',
         *       'https://www.googleapis.com/auth/drive.file',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.children.insert({
         *     // Set to true to opt in to API behavior that aims for all items to have exactly one parent. This parameter only takes effect if the item is not in a shared drive. If the child's owner makes the request, the child is removed from all current folders and placed in the requested folder. Any other requests that increase the number of the child's parents fail, except when the canAddMyDriveParent file capability is true and a single parent is being added.
         *     enforceSingleParent: 'placeholder-value',
         *     // The ID of the folder.
         *     folderId: 'placeholder-value',
         *     // Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         *     supportsAllDrives: 'placeholder-value',
         *     // Deprecated use supportsAllDrives instead.
         *     supportsTeamDrives: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "childLink": "my_childLink",
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "selfLink": "my_selfLink"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "childLink": "my_childLink",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "selfLink": "my_selfLink"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.children.insert
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {boolean=} params.enforceSingleParent Set to true to opt in to API behavior that aims for all items to have exactly one parent. This parameter only takes effect if the item is not in a shared drive. If the child's owner makes the request, the child is removed from all current folders and placed in the requested folder. Any other requests that increase the number of the child's parents fail, except when the canAddMyDriveParent file capability is true and a single parent is being added.
         * @param {string} params.folderId The ID of the folder.
         * @param {boolean=} params.supportsAllDrives Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         * @param {boolean=} params.supportsTeamDrives Deprecated use supportsAllDrives instead.
         * @param {().ChildReference} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        insert(params: Params$Resource$Children$Insert, options: StreamMethodOptions): GaxiosPromise<Readable>;
        insert(params?: Params$Resource$Children$Insert, options?: MethodOptions): GaxiosPromise<Schema$ChildReference>;
        insert(params: Params$Resource$Children$Insert, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        insert(params: Params$Resource$Children$Insert, options: MethodOptions | BodyResponseCallback<Schema$ChildReference>, callback: BodyResponseCallback<Schema$ChildReference>): void;
        insert(params: Params$Resource$Children$Insert, callback: BodyResponseCallback<Schema$ChildReference>): void;
        insert(callback: BodyResponseCallback<Schema$ChildReference>): void;
        /**
         * drive.children.list
         * @desc Lists a folder's children.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.appdata',
         *       'https://www.googleapis.com/auth/drive.file',
         *       'https://www.googleapis.com/auth/drive.metadata',
         *       'https://www.googleapis.com/auth/drive.metadata.readonly',
         *       'https://www.googleapis.com/auth/drive.photos.readonly',
         *       'https://www.googleapis.com/auth/drive.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.children.list({
         *     // The ID of the folder.
         *     folderId: 'placeholder-value',
         *     // Maximum number of children to return.
         *     maxResults: 'placeholder-value',
         *     // A comma-separated list of sort keys. Valid keys are 'createdDate', 'folder', 'lastViewedByMeDate', 'modifiedByMeDate', 'modifiedDate', 'quotaBytesUsed', 'recency', 'sharedWithMeDate', 'starred', and 'title'. Each key sorts ascending by default, but may be reversed with the 'desc' modifier. Example usage: ?orderBy=folder,modifiedDate desc,title. Please note that there is a current limitation for users with approximately one million files in which the requested sort order is ignored.
         *     orderBy: 'placeholder-value',
         *     // Page token for children.
         *     pageToken: 'placeholder-value',
         *     // Query string for searching children.
         *     q: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "etag": "my_etag",
         *   //   "items": [],
         *   //   "kind": "my_kind",
         *   //   "nextLink": "my_nextLink",
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "selfLink": "my_selfLink"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.children.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.folderId The ID of the folder.
         * @param {integer=} params.maxResults Maximum number of children to return.
         * @param {string=} params.orderBy A comma-separated list of sort keys. Valid keys are 'createdDate', 'folder', 'lastViewedByMeDate', 'modifiedByMeDate', 'modifiedDate', 'quotaBytesUsed', 'recency', 'sharedWithMeDate', 'starred', and 'title'. Each key sorts ascending by default, but may be reversed with the 'desc' modifier. Example usage: ?orderBy=folder,modifiedDate desc,title. Please note that there is a current limitation for users with approximately one million files in which the requested sort order is ignored.
         * @param {string=} params.pageToken Page token for children.
         * @param {string=} params.q Query string for searching children.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Children$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Children$List, options?: MethodOptions): GaxiosPromise<Schema$ChildList>;
        list(params: Params$Resource$Children$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Children$List, options: MethodOptions | BodyResponseCallback<Schema$ChildList>, callback: BodyResponseCallback<Schema$ChildList>): void;
        list(params: Params$Resource$Children$List, callback: BodyResponseCallback<Schema$ChildList>): void;
        list(callback: BodyResponseCallback<Schema$ChildList>): void;
    }
    export interface Params$Resource$Children$Delete extends StandardParameters {
        /**
         * The ID of the child.
         */
        childId?: string;
        /**
         * Set to true to opt in to API behavior that aims for all items to have exactly one parent. This parameter only takes effect if the item is not in a shared drive. If the item's last parent is removed, the item is placed under its owner's root.
         */
        enforceSingleParent?: boolean;
        /**
         * The ID of the folder.
         */
        folderId?: string;
    }
    export interface Params$Resource$Children$Get extends StandardParameters {
        /**
         * The ID of the child.
         */
        childId?: string;
        /**
         * The ID of the folder.
         */
        folderId?: string;
    }
    export interface Params$Resource$Children$Insert extends StandardParameters {
        /**
         * Set to true to opt in to API behavior that aims for all items to have exactly one parent. This parameter only takes effect if the item is not in a shared drive. If the child's owner makes the request, the child is removed from all current folders and placed in the requested folder. Any other requests that increase the number of the child's parents fail, except when the canAddMyDriveParent file capability is true and a single parent is being added.
         */
        enforceSingleParent?: boolean;
        /**
         * The ID of the folder.
         */
        folderId?: string;
        /**
         * Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         */
        supportsAllDrives?: boolean;
        /**
         * Deprecated use supportsAllDrives instead.
         */
        supportsTeamDrives?: boolean;
        /**
         * Request body metadata
         */
        requestBody?: Schema$ChildReference;
    }
    export interface Params$Resource$Children$List extends StandardParameters {
        /**
         * The ID of the folder.
         */
        folderId?: string;
        /**
         * Maximum number of children to return.
         */
        maxResults?: number;
        /**
         * A comma-separated list of sort keys. Valid keys are 'createdDate', 'folder', 'lastViewedByMeDate', 'modifiedByMeDate', 'modifiedDate', 'quotaBytesUsed', 'recency', 'sharedWithMeDate', 'starred', and 'title'. Each key sorts ascending by default, but may be reversed with the 'desc' modifier. Example usage: ?orderBy=folder,modifiedDate desc,title. Please note that there is a current limitation for users with approximately one million files in which the requested sort order is ignored.
         */
        orderBy?: string;
        /**
         * Page token for children.
         */
        pageToken?: string;
        /**
         * Query string for searching children.
         */
        q?: string;
    }
    export class Resource$Comments {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * drive.comments.delete
         * @desc Deletes a comment.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.file',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.comments.delete({
         *     // The ID of the comment.
         *     commentId: 'placeholder-value',
         *     // The ID of the file.
         *     fileId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.comments.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.commentId The ID of the comment.
         * @param {string} params.fileId The ID of the file.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Comments$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Comments$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Comments$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Comments$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Comments$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * drive.comments.get
         * @desc Gets a comment by ID.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.file',
         *       'https://www.googleapis.com/auth/drive.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.comments.get({
         *     // The ID of the comment.
         *     commentId: 'placeholder-value',
         *     // The ID of the file.
         *     fileId: 'placeholder-value',
         *     // If set, this will succeed when retrieving a deleted comment, and will include any deleted replies.
         *     includeDeleted: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "anchor": "my_anchor",
         *   //   "author": {},
         *   //   "commentId": "my_commentId",
         *   //   "content": "my_content",
         *   //   "context": {},
         *   //   "createdDate": "my_createdDate",
         *   //   "deleted": false,
         *   //   "fileId": "my_fileId",
         *   //   "fileTitle": "my_fileTitle",
         *   //   "htmlContent": "my_htmlContent",
         *   //   "kind": "my_kind",
         *   //   "modifiedDate": "my_modifiedDate",
         *   //   "replies": [],
         *   //   "selfLink": "my_selfLink",
         *   //   "status": "my_status"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.comments.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.commentId The ID of the comment.
         * @param {string} params.fileId The ID of the file.
         * @param {boolean=} params.includeDeleted If set, this will succeed when retrieving a deleted comment, and will include any deleted replies.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Comments$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Comments$Get, options?: MethodOptions): GaxiosPromise<Schema$Comment>;
        get(params: Params$Resource$Comments$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Comments$Get, options: MethodOptions | BodyResponseCallback<Schema$Comment>, callback: BodyResponseCallback<Schema$Comment>): void;
        get(params: Params$Resource$Comments$Get, callback: BodyResponseCallback<Schema$Comment>): void;
        get(callback: BodyResponseCallback<Schema$Comment>): void;
        /**
         * drive.comments.insert
         * @desc Creates a new comment on the given file.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.file',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.comments.insert({
         *     // The ID of the file.
         *     fileId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "anchor": "my_anchor",
         *       //   "author": {},
         *       //   "commentId": "my_commentId",
         *       //   "content": "my_content",
         *       //   "context": {},
         *       //   "createdDate": "my_createdDate",
         *       //   "deleted": false,
         *       //   "fileId": "my_fileId",
         *       //   "fileTitle": "my_fileTitle",
         *       //   "htmlContent": "my_htmlContent",
         *       //   "kind": "my_kind",
         *       //   "modifiedDate": "my_modifiedDate",
         *       //   "replies": [],
         *       //   "selfLink": "my_selfLink",
         *       //   "status": "my_status"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "anchor": "my_anchor",
         *   //   "author": {},
         *   //   "commentId": "my_commentId",
         *   //   "content": "my_content",
         *   //   "context": {},
         *   //   "createdDate": "my_createdDate",
         *   //   "deleted": false,
         *   //   "fileId": "my_fileId",
         *   //   "fileTitle": "my_fileTitle",
         *   //   "htmlContent": "my_htmlContent",
         *   //   "kind": "my_kind",
         *   //   "modifiedDate": "my_modifiedDate",
         *   //   "replies": [],
         *   //   "selfLink": "my_selfLink",
         *   //   "status": "my_status"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.comments.insert
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.fileId The ID of the file.
         * @param {().Comment} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        insert(params: Params$Resource$Comments$Insert, options: StreamMethodOptions): GaxiosPromise<Readable>;
        insert(params?: Params$Resource$Comments$Insert, options?: MethodOptions): GaxiosPromise<Schema$Comment>;
        insert(params: Params$Resource$Comments$Insert, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        insert(params: Params$Resource$Comments$Insert, options: MethodOptions | BodyResponseCallback<Schema$Comment>, callback: BodyResponseCallback<Schema$Comment>): void;
        insert(params: Params$Resource$Comments$Insert, callback: BodyResponseCallback<Schema$Comment>): void;
        insert(callback: BodyResponseCallback<Schema$Comment>): void;
        /**
         * drive.comments.list
         * @desc Lists a file's comments.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.file',
         *       'https://www.googleapis.com/auth/drive.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.comments.list({
         *     // The ID of the file.
         *     fileId: 'placeholder-value',
         *     // If set, all comments and replies, including deleted comments and replies (with content stripped) will be returned.
         *     includeDeleted: 'placeholder-value',
         *     // The maximum number of discussions to include in the response, used for paging.
         *     maxResults: 'placeholder-value',
         *     // The continuation token, used to page through large result sets. To get the next page of results, set this parameter to the value of "nextPageToken" from the previous response.
         *     pageToken: 'placeholder-value',
         *     // Only discussions that were updated after this timestamp will be returned. Formatted as an RFC 3339 timestamp.
         *     updatedMin: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "items": [],
         *   //   "kind": "my_kind",
         *   //   "nextLink": "my_nextLink",
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "selfLink": "my_selfLink"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.comments.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.fileId The ID of the file.
         * @param {boolean=} params.includeDeleted If set, all comments and replies, including deleted comments and replies (with content stripped) will be returned.
         * @param {integer=} params.maxResults The maximum number of discussions to include in the response, used for paging.
         * @param {string=} params.pageToken The continuation token, used to page through large result sets. To get the next page of results, set this parameter to the value of "nextPageToken" from the previous response.
         * @param {string=} params.updatedMin Only discussions that were updated after this timestamp will be returned. Formatted as an RFC 3339 timestamp.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Comments$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Comments$List, options?: MethodOptions): GaxiosPromise<Schema$CommentList>;
        list(params: Params$Resource$Comments$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Comments$List, options: MethodOptions | BodyResponseCallback<Schema$CommentList>, callback: BodyResponseCallback<Schema$CommentList>): void;
        list(params: Params$Resource$Comments$List, callback: BodyResponseCallback<Schema$CommentList>): void;
        list(callback: BodyResponseCallback<Schema$CommentList>): void;
        /**
         * drive.comments.patch
         * @desc Updates an existing comment.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.file',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.comments.patch({
         *     // The ID of the comment.
         *     commentId: 'placeholder-value',
         *     // The ID of the file.
         *     fileId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "anchor": "my_anchor",
         *       //   "author": {},
         *       //   "commentId": "my_commentId",
         *       //   "content": "my_content",
         *       //   "context": {},
         *       //   "createdDate": "my_createdDate",
         *       //   "deleted": false,
         *       //   "fileId": "my_fileId",
         *       //   "fileTitle": "my_fileTitle",
         *       //   "htmlContent": "my_htmlContent",
         *       //   "kind": "my_kind",
         *       //   "modifiedDate": "my_modifiedDate",
         *       //   "replies": [],
         *       //   "selfLink": "my_selfLink",
         *       //   "status": "my_status"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "anchor": "my_anchor",
         *   //   "author": {},
         *   //   "commentId": "my_commentId",
         *   //   "content": "my_content",
         *   //   "context": {},
         *   //   "createdDate": "my_createdDate",
         *   //   "deleted": false,
         *   //   "fileId": "my_fileId",
         *   //   "fileTitle": "my_fileTitle",
         *   //   "htmlContent": "my_htmlContent",
         *   //   "kind": "my_kind",
         *   //   "modifiedDate": "my_modifiedDate",
         *   //   "replies": [],
         *   //   "selfLink": "my_selfLink",
         *   //   "status": "my_status"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.comments.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.commentId The ID of the comment.
         * @param {string} params.fileId The ID of the file.
         * @param {().Comment} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Comments$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Comments$Patch, options?: MethodOptions): GaxiosPromise<Schema$Comment>;
        patch(params: Params$Resource$Comments$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Comments$Patch, options: MethodOptions | BodyResponseCallback<Schema$Comment>, callback: BodyResponseCallback<Schema$Comment>): void;
        patch(params: Params$Resource$Comments$Patch, callback: BodyResponseCallback<Schema$Comment>): void;
        patch(callback: BodyResponseCallback<Schema$Comment>): void;
        /**
         * drive.comments.update
         * @desc Updates an existing comment.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.file',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.comments.update({
         *     // The ID of the comment.
         *     commentId: 'placeholder-value',
         *     // The ID of the file.
         *     fileId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "anchor": "my_anchor",
         *       //   "author": {},
         *       //   "commentId": "my_commentId",
         *       //   "content": "my_content",
         *       //   "context": {},
         *       //   "createdDate": "my_createdDate",
         *       //   "deleted": false,
         *       //   "fileId": "my_fileId",
         *       //   "fileTitle": "my_fileTitle",
         *       //   "htmlContent": "my_htmlContent",
         *       //   "kind": "my_kind",
         *       //   "modifiedDate": "my_modifiedDate",
         *       //   "replies": [],
         *       //   "selfLink": "my_selfLink",
         *       //   "status": "my_status"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "anchor": "my_anchor",
         *   //   "author": {},
         *   //   "commentId": "my_commentId",
         *   //   "content": "my_content",
         *   //   "context": {},
         *   //   "createdDate": "my_createdDate",
         *   //   "deleted": false,
         *   //   "fileId": "my_fileId",
         *   //   "fileTitle": "my_fileTitle",
         *   //   "htmlContent": "my_htmlContent",
         *   //   "kind": "my_kind",
         *   //   "modifiedDate": "my_modifiedDate",
         *   //   "replies": [],
         *   //   "selfLink": "my_selfLink",
         *   //   "status": "my_status"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.comments.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.commentId The ID of the comment.
         * @param {string} params.fileId The ID of the file.
         * @param {().Comment} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Comments$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Comments$Update, options?: MethodOptions): GaxiosPromise<Schema$Comment>;
        update(params: Params$Resource$Comments$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Comments$Update, options: MethodOptions | BodyResponseCallback<Schema$Comment>, callback: BodyResponseCallback<Schema$Comment>): void;
        update(params: Params$Resource$Comments$Update, callback: BodyResponseCallback<Schema$Comment>): void;
        update(callback: BodyResponseCallback<Schema$Comment>): void;
    }
    export interface Params$Resource$Comments$Delete extends StandardParameters {
        /**
         * The ID of the comment.
         */
        commentId?: string;
        /**
         * The ID of the file.
         */
        fileId?: string;
    }
    export interface Params$Resource$Comments$Get extends StandardParameters {
        /**
         * The ID of the comment.
         */
        commentId?: string;
        /**
         * The ID of the file.
         */
        fileId?: string;
        /**
         * If set, this will succeed when retrieving a deleted comment, and will include any deleted replies.
         */
        includeDeleted?: boolean;
    }
    export interface Params$Resource$Comments$Insert extends StandardParameters {
        /**
         * The ID of the file.
         */
        fileId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Comment;
    }
    export interface Params$Resource$Comments$List extends StandardParameters {
        /**
         * The ID of the file.
         */
        fileId?: string;
        /**
         * If set, all comments and replies, including deleted comments and replies (with content stripped) will be returned.
         */
        includeDeleted?: boolean;
        /**
         * The maximum number of discussions to include in the response, used for paging.
         */
        maxResults?: number;
        /**
         * The continuation token, used to page through large result sets. To get the next page of results, set this parameter to the value of "nextPageToken" from the previous response.
         */
        pageToken?: string;
        /**
         * Only discussions that were updated after this timestamp will be returned. Formatted as an RFC 3339 timestamp.
         */
        updatedMin?: string;
    }
    export interface Params$Resource$Comments$Patch extends StandardParameters {
        /**
         * The ID of the comment.
         */
        commentId?: string;
        /**
         * The ID of the file.
         */
        fileId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Comment;
    }
    export interface Params$Resource$Comments$Update extends StandardParameters {
        /**
         * The ID of the comment.
         */
        commentId?: string;
        /**
         * The ID of the file.
         */
        fileId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Comment;
    }
    export class Resource$Drives {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * drive.drives.delete
         * @desc Permanently deletes a shared drive for which the user is an organizer. The shared drive cannot contain any untrashed items.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/drive'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.drives.delete({
         *     // The ID of the shared drive.
         *     driveId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.drives.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.driveId The ID of the shared drive.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Drives$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Drives$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Drives$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Drives$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Drives$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * drive.drives.get
         * @desc Gets a shared drive's metadata by ID.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.drives.get({
         *     // The ID of the shared drive.
         *     driveId: 'placeholder-value',
         *     // Issue the request as a domain administrator; if set to true, then the requester will be granted access if they are an administrator of the domain to which the shared drive belongs.
         *     useDomainAdminAccess: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "backgroundImageFile": {},
         *   //   "backgroundImageLink": "my_backgroundImageLink",
         *   //   "capabilities": {},
         *   //   "colorRgb": "my_colorRgb",
         *   //   "createdDate": "my_createdDate",
         *   //   "hidden": false,
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "name": "my_name",
         *   //   "restrictions": {},
         *   //   "themeId": "my_themeId"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.drives.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.driveId The ID of the shared drive.
         * @param {boolean=} params.useDomainAdminAccess Issue the request as a domain administrator; if set to true, then the requester will be granted access if they are an administrator of the domain to which the shared drive belongs.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Drives$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Drives$Get, options?: MethodOptions): GaxiosPromise<Schema$Drive>;
        get(params: Params$Resource$Drives$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Drives$Get, options: MethodOptions | BodyResponseCallback<Schema$Drive>, callback: BodyResponseCallback<Schema$Drive>): void;
        get(params: Params$Resource$Drives$Get, callback: BodyResponseCallback<Schema$Drive>): void;
        get(callback: BodyResponseCallback<Schema$Drive>): void;
        /**
         * drive.drives.hide
         * @desc Hides a shared drive from the default view.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/drive'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.drives.hide({
         *     // The ID of the shared drive.
         *     driveId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "backgroundImageFile": {},
         *   //   "backgroundImageLink": "my_backgroundImageLink",
         *   //   "capabilities": {},
         *   //   "colorRgb": "my_colorRgb",
         *   //   "createdDate": "my_createdDate",
         *   //   "hidden": false,
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "name": "my_name",
         *   //   "restrictions": {},
         *   //   "themeId": "my_themeId"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.drives.hide
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.driveId The ID of the shared drive.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        hide(params: Params$Resource$Drives$Hide, options: StreamMethodOptions): GaxiosPromise<Readable>;
        hide(params?: Params$Resource$Drives$Hide, options?: MethodOptions): GaxiosPromise<Schema$Drive>;
        hide(params: Params$Resource$Drives$Hide, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        hide(params: Params$Resource$Drives$Hide, options: MethodOptions | BodyResponseCallback<Schema$Drive>, callback: BodyResponseCallback<Schema$Drive>): void;
        hide(params: Params$Resource$Drives$Hide, callback: BodyResponseCallback<Schema$Drive>): void;
        hide(callback: BodyResponseCallback<Schema$Drive>): void;
        /**
         * drive.drives.insert
         * @desc Creates a new shared drive.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/drive'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.drives.insert({
         *     // An ID, such as a random UUID, which uniquely identifies this user's request for idempotent creation of a shared drive. A repeated request by the same user and with the same request ID will avoid creating duplicates by attempting to create the same shared drive. If the shared drive already exists a 409 error will be returned.
         *     requestId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "backgroundImageFile": {},
         *       //   "backgroundImageLink": "my_backgroundImageLink",
         *       //   "capabilities": {},
         *       //   "colorRgb": "my_colorRgb",
         *       //   "createdDate": "my_createdDate",
         *       //   "hidden": false,
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "name": "my_name",
         *       //   "restrictions": {},
         *       //   "themeId": "my_themeId"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "backgroundImageFile": {},
         *   //   "backgroundImageLink": "my_backgroundImageLink",
         *   //   "capabilities": {},
         *   //   "colorRgb": "my_colorRgb",
         *   //   "createdDate": "my_createdDate",
         *   //   "hidden": false,
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "name": "my_name",
         *   //   "restrictions": {},
         *   //   "themeId": "my_themeId"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.drives.insert
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.requestId An ID, such as a random UUID, which uniquely identifies this user's request for idempotent creation of a shared drive. A repeated request by the same user and with the same request ID will avoid creating duplicates by attempting to create the same shared drive. If the shared drive already exists a 409 error will be returned.
         * @param {().Drive} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        insert(params: Params$Resource$Drives$Insert, options: StreamMethodOptions): GaxiosPromise<Readable>;
        insert(params?: Params$Resource$Drives$Insert, options?: MethodOptions): GaxiosPromise<Schema$Drive>;
        insert(params: Params$Resource$Drives$Insert, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        insert(params: Params$Resource$Drives$Insert, options: MethodOptions | BodyResponseCallback<Schema$Drive>, callback: BodyResponseCallback<Schema$Drive>): void;
        insert(params: Params$Resource$Drives$Insert, callback: BodyResponseCallback<Schema$Drive>): void;
        insert(callback: BodyResponseCallback<Schema$Drive>): void;
        /**
         * drive.drives.list
         * @desc Lists the user's shared drives.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.drives.list({
         *     // Maximum number of shared drives to return.
         *     maxResults: 'placeholder-value',
         *     // Page token for shared drives.
         *     pageToken: 'placeholder-value',
         *     // Query string for searching shared drives.
         *     q: 'placeholder-value',
         *     // Issue the request as a domain administrator; if set to true, then all shared drives of the domain in which the requester is an administrator are returned.
         *     useDomainAdminAccess: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
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
         * @alias drive.drives.list
         * @memberOf! ()
         *
         * @param {object=} params Parameters for request
         * @param {integer=} params.maxResults Maximum number of shared drives to return.
         * @param {string=} params.pageToken Page token for shared drives.
         * @param {string=} params.q Query string for searching shared drives.
         * @param {boolean=} params.useDomainAdminAccess Issue the request as a domain administrator; if set to true, then all shared drives of the domain in which the requester is an administrator are returned.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Drives$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Drives$List, options?: MethodOptions): GaxiosPromise<Schema$DriveList>;
        list(params: Params$Resource$Drives$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Drives$List, options: MethodOptions | BodyResponseCallback<Schema$DriveList>, callback: BodyResponseCallback<Schema$DriveList>): void;
        list(params: Params$Resource$Drives$List, callback: BodyResponseCallback<Schema$DriveList>): void;
        list(callback: BodyResponseCallback<Schema$DriveList>): void;
        /**
         * drive.drives.unhide
         * @desc Restores a shared drive to the default view.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/drive'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.drives.unhide({
         *     // The ID of the shared drive.
         *     driveId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "backgroundImageFile": {},
         *   //   "backgroundImageLink": "my_backgroundImageLink",
         *   //   "capabilities": {},
         *   //   "colorRgb": "my_colorRgb",
         *   //   "createdDate": "my_createdDate",
         *   //   "hidden": false,
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "name": "my_name",
         *   //   "restrictions": {},
         *   //   "themeId": "my_themeId"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.drives.unhide
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.driveId The ID of the shared drive.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        unhide(params: Params$Resource$Drives$Unhide, options: StreamMethodOptions): GaxiosPromise<Readable>;
        unhide(params?: Params$Resource$Drives$Unhide, options?: MethodOptions): GaxiosPromise<Schema$Drive>;
        unhide(params: Params$Resource$Drives$Unhide, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        unhide(params: Params$Resource$Drives$Unhide, options: MethodOptions | BodyResponseCallback<Schema$Drive>, callback: BodyResponseCallback<Schema$Drive>): void;
        unhide(params: Params$Resource$Drives$Unhide, callback: BodyResponseCallback<Schema$Drive>): void;
        unhide(callback: BodyResponseCallback<Schema$Drive>): void;
        /**
         * drive.drives.update
         * @desc Updates the metadata for a shared drive.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/drive'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.drives.update({
         *     // The ID of the shared drive.
         *     driveId: 'placeholder-value',
         *     // Issue the request as a domain administrator; if set to true, then the requester will be granted access if they are an administrator of the domain to which the shared drive belongs.
         *     useDomainAdminAccess: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "backgroundImageFile": {},
         *       //   "backgroundImageLink": "my_backgroundImageLink",
         *       //   "capabilities": {},
         *       //   "colorRgb": "my_colorRgb",
         *       //   "createdDate": "my_createdDate",
         *       //   "hidden": false,
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "name": "my_name",
         *       //   "restrictions": {},
         *       //   "themeId": "my_themeId"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "backgroundImageFile": {},
         *   //   "backgroundImageLink": "my_backgroundImageLink",
         *   //   "capabilities": {},
         *   //   "colorRgb": "my_colorRgb",
         *   //   "createdDate": "my_createdDate",
         *   //   "hidden": false,
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "name": "my_name",
         *   //   "restrictions": {},
         *   //   "themeId": "my_themeId"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.drives.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.driveId The ID of the shared drive.
         * @param {boolean=} params.useDomainAdminAccess Issue the request as a domain administrator; if set to true, then the requester will be granted access if they are an administrator of the domain to which the shared drive belongs.
         * @param {().Drive} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Drives$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Drives$Update, options?: MethodOptions): GaxiosPromise<Schema$Drive>;
        update(params: Params$Resource$Drives$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Drives$Update, options: MethodOptions | BodyResponseCallback<Schema$Drive>, callback: BodyResponseCallback<Schema$Drive>): void;
        update(params: Params$Resource$Drives$Update, callback: BodyResponseCallback<Schema$Drive>): void;
        update(callback: BodyResponseCallback<Schema$Drive>): void;
    }
    export interface Params$Resource$Drives$Delete extends StandardParameters {
        /**
         * The ID of the shared drive.
         */
        driveId?: string;
    }
    export interface Params$Resource$Drives$Get extends StandardParameters {
        /**
         * The ID of the shared drive.
         */
        driveId?: string;
        /**
         * Issue the request as a domain administrator; if set to true, then the requester will be granted access if they are an administrator of the domain to which the shared drive belongs.
         */
        useDomainAdminAccess?: boolean;
    }
    export interface Params$Resource$Drives$Hide extends StandardParameters {
        /**
         * The ID of the shared drive.
         */
        driveId?: string;
    }
    export interface Params$Resource$Drives$Insert extends StandardParameters {
        /**
         * An ID, such as a random UUID, which uniquely identifies this user's request for idempotent creation of a shared drive. A repeated request by the same user and with the same request ID will avoid creating duplicates by attempting to create the same shared drive. If the shared drive already exists a 409 error will be returned.
         */
        requestId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Drive;
    }
    export interface Params$Resource$Drives$List extends StandardParameters {
        /**
         * Maximum number of shared drives to return.
         */
        maxResults?: number;
        /**
         * Page token for shared drives.
         */
        pageToken?: string;
        /**
         * Query string for searching shared drives.
         */
        q?: string;
        /**
         * Issue the request as a domain administrator; if set to true, then all shared drives of the domain in which the requester is an administrator are returned.
         */
        useDomainAdminAccess?: boolean;
    }
    export interface Params$Resource$Drives$Unhide extends StandardParameters {
        /**
         * The ID of the shared drive.
         */
        driveId?: string;
    }
    export interface Params$Resource$Drives$Update extends StandardParameters {
        /**
         * The ID of the shared drive.
         */
        driveId?: string;
        /**
         * Issue the request as a domain administrator; if set to true, then the requester will be granted access if they are an administrator of the domain to which the shared drive belongs.
         */
        useDomainAdminAccess?: boolean;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Drive;
    }
    export class Resource$Files {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * drive.files.copy
         * @desc Creates a copy of the specified file.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.appdata',
         *       'https://www.googleapis.com/auth/drive.apps.readonly',
         *       'https://www.googleapis.com/auth/drive.file',
         *       'https://www.googleapis.com/auth/drive.photos.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.files.copy({
         *     // Whether to convert this file to the corresponding Google Docs format.
         *     convert: 'placeholder-value',
         *     // Set to true to opt in to API behavior that aims for all items to have exactly one parent. This parameter only takes effect if the item is not in a shared drive. Requests that specify more than one parent fail.
         *     enforceSingleParent: 'placeholder-value',
         *     // The ID of the file to copy.
         *     fileId: 'placeholder-value',
         *     // Whether to attempt OCR on .jpg, .png, .gif, or .pdf uploads.
         *     ocr: 'placeholder-value',
         *     // If ocr is true, hints at the language to use. Valid values are BCP 47 codes.
         *     ocrLanguage: 'placeholder-value',
         *     // Whether to pin the head revision of the new copy. A file can have a maximum of 200 pinned revisions.
         *     pinned: 'placeholder-value',
         *     // Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         *     supportsAllDrives: 'placeholder-value',
         *     // Deprecated use supportsAllDrives instead.
         *     supportsTeamDrives: 'placeholder-value',
         *     // The language of the timed text.
         *     timedTextLanguage: 'placeholder-value',
         *     // The timed text track name.
         *     timedTextTrackName: 'placeholder-value',
         *     // The visibility of the new file. This parameter is only relevant when the source is not a native Google Doc and convert=false.
         *     visibility: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "alternateLink": "my_alternateLink",
         *       //   "appDataContents": false,
         *       //   "canComment": false,
         *       //   "canReadRevisions": false,
         *       //   "capabilities": {},
         *       //   "copyRequiresWriterPermission": false,
         *       //   "copyable": false,
         *       //   "createdDate": "my_createdDate",
         *       //   "defaultOpenWithLink": "my_defaultOpenWithLink",
         *       //   "description": "my_description",
         *       //   "downloadUrl": "my_downloadUrl",
         *       //   "driveId": "my_driveId",
         *       //   "editable": false,
         *       //   "embedLink": "my_embedLink",
         *       //   "etag": "my_etag",
         *       //   "explicitlyTrashed": false,
         *       //   "exportLinks": {},
         *       //   "fileExtension": "my_fileExtension",
         *       //   "fileSize": "my_fileSize",
         *       //   "folderColorRgb": "my_folderColorRgb",
         *       //   "fullFileExtension": "my_fullFileExtension",
         *       //   "hasAugmentedPermissions": false,
         *       //   "hasThumbnail": false,
         *       //   "headRevisionId": "my_headRevisionId",
         *       //   "iconLink": "my_iconLink",
         *       //   "id": "my_id",
         *       //   "imageMediaMetadata": {},
         *       //   "indexableText": {},
         *       //   "isAppAuthorized": false,
         *       //   "kind": "my_kind",
         *       //   "labels": {},
         *       //   "lastModifyingUser": {},
         *       //   "lastModifyingUserName": "my_lastModifyingUserName",
         *       //   "lastViewedByMeDate": "my_lastViewedByMeDate",
         *       //   "markedViewedByMeDate": "my_markedViewedByMeDate",
         *       //   "md5Checksum": "my_md5Checksum",
         *       //   "mimeType": "my_mimeType",
         *       //   "modifiedByMeDate": "my_modifiedByMeDate",
         *       //   "modifiedDate": "my_modifiedDate",
         *       //   "openWithLinks": {},
         *       //   "originalFilename": "my_originalFilename",
         *       //   "ownedByMe": false,
         *       //   "ownerNames": [],
         *       //   "owners": [],
         *       //   "parents": [],
         *       //   "permissionIds": [],
         *       //   "permissions": [],
         *       //   "properties": [],
         *       //   "quotaBytesUsed": "my_quotaBytesUsed",
         *       //   "selfLink": "my_selfLink",
         *       //   "shareable": false,
         *       //   "shared": false,
         *       //   "sharedWithMeDate": "my_sharedWithMeDate",
         *       //   "sharingUser": {},
         *       //   "shortcutDetails": {},
         *       //   "spaces": [],
         *       //   "teamDriveId": "my_teamDriveId",
         *       //   "thumbnail": {},
         *       //   "thumbnailLink": "my_thumbnailLink",
         *       //   "thumbnailVersion": "my_thumbnailVersion",
         *       //   "title": "my_title",
         *       //   "trashedDate": "my_trashedDate",
         *       //   "trashingUser": {},
         *       //   "userPermission": {},
         *       //   "version": "my_version",
         *       //   "videoMediaMetadata": {},
         *       //   "webContentLink": "my_webContentLink",
         *       //   "webViewLink": "my_webViewLink",
         *       //   "writersCanShare": false
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "alternateLink": "my_alternateLink",
         *   //   "appDataContents": false,
         *   //   "canComment": false,
         *   //   "canReadRevisions": false,
         *   //   "capabilities": {},
         *   //   "copyRequiresWriterPermission": false,
         *   //   "copyable": false,
         *   //   "createdDate": "my_createdDate",
         *   //   "defaultOpenWithLink": "my_defaultOpenWithLink",
         *   //   "description": "my_description",
         *   //   "downloadUrl": "my_downloadUrl",
         *   //   "driveId": "my_driveId",
         *   //   "editable": false,
         *   //   "embedLink": "my_embedLink",
         *   //   "etag": "my_etag",
         *   //   "explicitlyTrashed": false,
         *   //   "exportLinks": {},
         *   //   "fileExtension": "my_fileExtension",
         *   //   "fileSize": "my_fileSize",
         *   //   "folderColorRgb": "my_folderColorRgb",
         *   //   "fullFileExtension": "my_fullFileExtension",
         *   //   "hasAugmentedPermissions": false,
         *   //   "hasThumbnail": false,
         *   //   "headRevisionId": "my_headRevisionId",
         *   //   "iconLink": "my_iconLink",
         *   //   "id": "my_id",
         *   //   "imageMediaMetadata": {},
         *   //   "indexableText": {},
         *   //   "isAppAuthorized": false,
         *   //   "kind": "my_kind",
         *   //   "labels": {},
         *   //   "lastModifyingUser": {},
         *   //   "lastModifyingUserName": "my_lastModifyingUserName",
         *   //   "lastViewedByMeDate": "my_lastViewedByMeDate",
         *   //   "markedViewedByMeDate": "my_markedViewedByMeDate",
         *   //   "md5Checksum": "my_md5Checksum",
         *   //   "mimeType": "my_mimeType",
         *   //   "modifiedByMeDate": "my_modifiedByMeDate",
         *   //   "modifiedDate": "my_modifiedDate",
         *   //   "openWithLinks": {},
         *   //   "originalFilename": "my_originalFilename",
         *   //   "ownedByMe": false,
         *   //   "ownerNames": [],
         *   //   "owners": [],
         *   //   "parents": [],
         *   //   "permissionIds": [],
         *   //   "permissions": [],
         *   //   "properties": [],
         *   //   "quotaBytesUsed": "my_quotaBytesUsed",
         *   //   "selfLink": "my_selfLink",
         *   //   "shareable": false,
         *   //   "shared": false,
         *   //   "sharedWithMeDate": "my_sharedWithMeDate",
         *   //   "sharingUser": {},
         *   //   "shortcutDetails": {},
         *   //   "spaces": [],
         *   //   "teamDriveId": "my_teamDriveId",
         *   //   "thumbnail": {},
         *   //   "thumbnailLink": "my_thumbnailLink",
         *   //   "thumbnailVersion": "my_thumbnailVersion",
         *   //   "title": "my_title",
         *   //   "trashedDate": "my_trashedDate",
         *   //   "trashingUser": {},
         *   //   "userPermission": {},
         *   //   "version": "my_version",
         *   //   "videoMediaMetadata": {},
         *   //   "webContentLink": "my_webContentLink",
         *   //   "webViewLink": "my_webViewLink",
         *   //   "writersCanShare": false
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.files.copy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {boolean=} params.convert Whether to convert this file to the corresponding Google Docs format.
         * @param {boolean=} params.enforceSingleParent Set to true to opt in to API behavior that aims for all items to have exactly one parent. This parameter only takes effect if the item is not in a shared drive. Requests that specify more than one parent fail.
         * @param {string} params.fileId The ID of the file to copy.
         * @param {boolean=} params.ocr Whether to attempt OCR on .jpg, .png, .gif, or .pdf uploads.
         * @param {string=} params.ocrLanguage If ocr is true, hints at the language to use. Valid values are BCP 47 codes.
         * @param {boolean=} params.pinned Whether to pin the head revision of the new copy. A file can have a maximum of 200 pinned revisions.
         * @param {boolean=} params.supportsAllDrives Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         * @param {boolean=} params.supportsTeamDrives Deprecated use supportsAllDrives instead.
         * @param {string=} params.timedTextLanguage The language of the timed text.
         * @param {string=} params.timedTextTrackName The timed text track name.
         * @param {string=} params.visibility The visibility of the new file. This parameter is only relevant when the source is not a native Google Doc and convert=false.
         * @param {().File} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        copy(params: Params$Resource$Files$Copy, options: StreamMethodOptions): GaxiosPromise<Readable>;
        copy(params?: Params$Resource$Files$Copy, options?: MethodOptions): GaxiosPromise<Schema$File>;
        copy(params: Params$Resource$Files$Copy, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        copy(params: Params$Resource$Files$Copy, options: MethodOptions | BodyResponseCallback<Schema$File>, callback: BodyResponseCallback<Schema$File>): void;
        copy(params: Params$Resource$Files$Copy, callback: BodyResponseCallback<Schema$File>): void;
        copy(callback: BodyResponseCallback<Schema$File>): void;
        /**
         * drive.files.delete
         * @desc Permanently deletes a file by ID. Skips the trash. The currently authenticated user must own the file or be an organizer on the parent for shared drive files.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.appdata',
         *       'https://www.googleapis.com/auth/drive.file',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.files.delete({
         *     // The ID of the file to delete.
         *     fileId: 'placeholder-value',
         *     // Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         *     supportsAllDrives: 'placeholder-value',
         *     // Deprecated use supportsAllDrives instead.
         *     supportsTeamDrives: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.files.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.fileId The ID of the file to delete.
         * @param {boolean=} params.supportsAllDrives Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         * @param {boolean=} params.supportsTeamDrives Deprecated use supportsAllDrives instead.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Files$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Files$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Files$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Files$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Files$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * drive.files.emptyTrash
         * @desc Permanently deletes all of the user's trashed files.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/drive'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.files.emptyTrash({});
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.files.emptyTrash
         * @memberOf! ()
         *
         * @param {object=} params Parameters for request
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        emptyTrash(params: Params$Resource$Files$Emptytrash, options: StreamMethodOptions): GaxiosPromise<Readable>;
        emptyTrash(params?: Params$Resource$Files$Emptytrash, options?: MethodOptions): GaxiosPromise<void>;
        emptyTrash(params: Params$Resource$Files$Emptytrash, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        emptyTrash(params: Params$Resource$Files$Emptytrash, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        emptyTrash(params: Params$Resource$Files$Emptytrash, callback: BodyResponseCallback<void>): void;
        emptyTrash(callback: BodyResponseCallback<void>): void;
        /**
         * drive.files.export
         * @desc Exports a Google Doc to the requested MIME type and returns the exported content. Please note that the exported content is limited to 10MB.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.file',
         *       'https://www.googleapis.com/auth/drive.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.files.export({
         *     // The ID of the file.
         *     fileId: 'placeholder-value',
         *     // The MIME type of the format requested for this export.
         *     mimeType: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.files.export
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.fileId The ID of the file.
         * @param {string} params.mimeType The MIME type of the format requested for this export.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        export(params: Params$Resource$Files$Export, options: StreamMethodOptions): GaxiosPromise<Readable>;
        export(params?: Params$Resource$Files$Export, options?: MethodOptions): GaxiosPromise<void>;
        export(params: Params$Resource$Files$Export, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        export(params: Params$Resource$Files$Export, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        export(params: Params$Resource$Files$Export, callback: BodyResponseCallback<void>): void;
        export(callback: BodyResponseCallback<void>): void;
        /**
         * drive.files.generateIds
         * @desc Generates a set of file IDs which can be provided in insert or copy requests.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.appdata',
         *       'https://www.googleapis.com/auth/drive.file',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.files.generateIds({
         *     // Maximum number of IDs to return.
         *     maxResults: 'placeholder-value',
         *     // The space in which the IDs can be used to create new files. Supported values are 'drive' and 'appDataFolder'.
         *     space: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "ids": [],
         *   //   "kind": "my_kind",
         *   //   "space": "my_space"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.files.generateIds
         * @memberOf! ()
         *
         * @param {object=} params Parameters for request
         * @param {integer=} params.maxResults Maximum number of IDs to return.
         * @param {string=} params.space The space in which the IDs can be used to create new files. Supported values are 'drive' and 'appDataFolder'.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        generateIds(params: Params$Resource$Files$Generateids, options: StreamMethodOptions): GaxiosPromise<Readable>;
        generateIds(params?: Params$Resource$Files$Generateids, options?: MethodOptions): GaxiosPromise<Schema$GeneratedIds>;
        generateIds(params: Params$Resource$Files$Generateids, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        generateIds(params: Params$Resource$Files$Generateids, options: MethodOptions | BodyResponseCallback<Schema$GeneratedIds>, callback: BodyResponseCallback<Schema$GeneratedIds>): void;
        generateIds(params: Params$Resource$Files$Generateids, callback: BodyResponseCallback<Schema$GeneratedIds>): void;
        generateIds(callback: BodyResponseCallback<Schema$GeneratedIds>): void;
        /**
         * drive.files.get
         * @desc Gets a file's metadata by ID.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.appdata',
         *       'https://www.googleapis.com/auth/drive.file',
         *       'https://www.googleapis.com/auth/drive.metadata',
         *       'https://www.googleapis.com/auth/drive.metadata.readonly',
         *       'https://www.googleapis.com/auth/drive.photos.readonly',
         *       'https://www.googleapis.com/auth/drive.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.files.get({
         *     // Whether the user is acknowledging the risk of downloading known malware or other abusive files.
         *     acknowledgeAbuse: 'placeholder-value',
         *     // The ID for the file in question.
         *     fileId: 'placeholder-value',
         *     // This parameter is deprecated and has no function.
         *     projection: 'placeholder-value',
         *     // Specifies the Revision ID that should be downloaded. Ignored unless alt=media is specified.
         *     revisionId: 'placeholder-value',
         *     // Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         *     supportsAllDrives: 'placeholder-value',
         *     // Deprecated use supportsAllDrives instead.
         *     supportsTeamDrives: 'placeholder-value',
         *     // Deprecated: Use files.update with modifiedDateBehavior=noChange, updateViewedDate=true and an empty request body.
         *     updateViewedDate: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "alternateLink": "my_alternateLink",
         *   //   "appDataContents": false,
         *   //   "canComment": false,
         *   //   "canReadRevisions": false,
         *   //   "capabilities": {},
         *   //   "copyRequiresWriterPermission": false,
         *   //   "copyable": false,
         *   //   "createdDate": "my_createdDate",
         *   //   "defaultOpenWithLink": "my_defaultOpenWithLink",
         *   //   "description": "my_description",
         *   //   "downloadUrl": "my_downloadUrl",
         *   //   "driveId": "my_driveId",
         *   //   "editable": false,
         *   //   "embedLink": "my_embedLink",
         *   //   "etag": "my_etag",
         *   //   "explicitlyTrashed": false,
         *   //   "exportLinks": {},
         *   //   "fileExtension": "my_fileExtension",
         *   //   "fileSize": "my_fileSize",
         *   //   "folderColorRgb": "my_folderColorRgb",
         *   //   "fullFileExtension": "my_fullFileExtension",
         *   //   "hasAugmentedPermissions": false,
         *   //   "hasThumbnail": false,
         *   //   "headRevisionId": "my_headRevisionId",
         *   //   "iconLink": "my_iconLink",
         *   //   "id": "my_id",
         *   //   "imageMediaMetadata": {},
         *   //   "indexableText": {},
         *   //   "isAppAuthorized": false,
         *   //   "kind": "my_kind",
         *   //   "labels": {},
         *   //   "lastModifyingUser": {},
         *   //   "lastModifyingUserName": "my_lastModifyingUserName",
         *   //   "lastViewedByMeDate": "my_lastViewedByMeDate",
         *   //   "markedViewedByMeDate": "my_markedViewedByMeDate",
         *   //   "md5Checksum": "my_md5Checksum",
         *   //   "mimeType": "my_mimeType",
         *   //   "modifiedByMeDate": "my_modifiedByMeDate",
         *   //   "modifiedDate": "my_modifiedDate",
         *   //   "openWithLinks": {},
         *   //   "originalFilename": "my_originalFilename",
         *   //   "ownedByMe": false,
         *   //   "ownerNames": [],
         *   //   "owners": [],
         *   //   "parents": [],
         *   //   "permissionIds": [],
         *   //   "permissions": [],
         *   //   "properties": [],
         *   //   "quotaBytesUsed": "my_quotaBytesUsed",
         *   //   "selfLink": "my_selfLink",
         *   //   "shareable": false,
         *   //   "shared": false,
         *   //   "sharedWithMeDate": "my_sharedWithMeDate",
         *   //   "sharingUser": {},
         *   //   "shortcutDetails": {},
         *   //   "spaces": [],
         *   //   "teamDriveId": "my_teamDriveId",
         *   //   "thumbnail": {},
         *   //   "thumbnailLink": "my_thumbnailLink",
         *   //   "thumbnailVersion": "my_thumbnailVersion",
         *   //   "title": "my_title",
         *   //   "trashedDate": "my_trashedDate",
         *   //   "trashingUser": {},
         *   //   "userPermission": {},
         *   //   "version": "my_version",
         *   //   "videoMediaMetadata": {},
         *   //   "webContentLink": "my_webContentLink",
         *   //   "webViewLink": "my_webViewLink",
         *   //   "writersCanShare": false
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.files.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {boolean=} params.acknowledgeAbuse Whether the user is acknowledging the risk of downloading known malware or other abusive files.
         * @param {string} params.fileId The ID for the file in question.
         * @param {string=} params.projection This parameter is deprecated and has no function.
         * @param {string=} params.revisionId Specifies the Revision ID that should be downloaded. Ignored unless alt=media is specified.
         * @param {boolean=} params.supportsAllDrives Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         * @param {boolean=} params.supportsTeamDrives Deprecated use supportsAllDrives instead.
         * @param {boolean=} params.updateViewedDate Deprecated: Use files.update with modifiedDateBehavior=noChange, updateViewedDate=true and an empty request body.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Files$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Files$Get, options?: MethodOptions): GaxiosPromise<Schema$File>;
        get(params: Params$Resource$Files$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Files$Get, options: MethodOptions | BodyResponseCallback<Schema$File>, callback: BodyResponseCallback<Schema$File>): void;
        get(params: Params$Resource$Files$Get, callback: BodyResponseCallback<Schema$File>): void;
        get(callback: BodyResponseCallback<Schema$File>): void;
        /**
         * drive.files.insert
         * @desc Insert a new file.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.appdata',
         *       'https://www.googleapis.com/auth/drive.apps.readonly',
         *       'https://www.googleapis.com/auth/drive.file',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.files.insert({
         *     // Whether to convert this file to the corresponding Google Docs format.
         *     convert: 'placeholder-value',
         *     // Set to true to opt in to API behavior that aims for all items to have exactly one parent. This parameter only takes effect if the item is not in a shared drive. Requests that specify more than one parent fail.
         *     enforceSingleParent: 'placeholder-value',
         *     // Whether to attempt OCR on .jpg, .png, .gif, or .pdf uploads.
         *     ocr: 'placeholder-value',
         *     // If ocr is true, hints at the language to use. Valid values are BCP 47 codes.
         *     ocrLanguage: 'placeholder-value',
         *     // Whether to pin the head revision of the uploaded file. A file can have a maximum of 200 pinned revisions.
         *     pinned: 'placeholder-value',
         *     // Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         *     supportsAllDrives: 'placeholder-value',
         *     // Deprecated use supportsAllDrives instead.
         *     supportsTeamDrives: 'placeholder-value',
         *     // The language of the timed text.
         *     timedTextLanguage: 'placeholder-value',
         *     // The timed text track name.
         *     timedTextTrackName: 'placeholder-value',
         *     // Whether to use the content as indexable text.
         *     useContentAsIndexableText: 'placeholder-value',
         *     // The visibility of the new file. This parameter is only relevant when convert=false.
         *     visibility: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "alternateLink": "my_alternateLink",
         *       //   "appDataContents": false,
         *       //   "canComment": false,
         *       //   "canReadRevisions": false,
         *       //   "capabilities": {},
         *       //   "copyRequiresWriterPermission": false,
         *       //   "copyable": false,
         *       //   "createdDate": "my_createdDate",
         *       //   "defaultOpenWithLink": "my_defaultOpenWithLink",
         *       //   "description": "my_description",
         *       //   "downloadUrl": "my_downloadUrl",
         *       //   "driveId": "my_driveId",
         *       //   "editable": false,
         *       //   "embedLink": "my_embedLink",
         *       //   "etag": "my_etag",
         *       //   "explicitlyTrashed": false,
         *       //   "exportLinks": {},
         *       //   "fileExtension": "my_fileExtension",
         *       //   "fileSize": "my_fileSize",
         *       //   "folderColorRgb": "my_folderColorRgb",
         *       //   "fullFileExtension": "my_fullFileExtension",
         *       //   "hasAugmentedPermissions": false,
         *       //   "hasThumbnail": false,
         *       //   "headRevisionId": "my_headRevisionId",
         *       //   "iconLink": "my_iconLink",
         *       //   "id": "my_id",
         *       //   "imageMediaMetadata": {},
         *       //   "indexableText": {},
         *       //   "isAppAuthorized": false,
         *       //   "kind": "my_kind",
         *       //   "labels": {},
         *       //   "lastModifyingUser": {},
         *       //   "lastModifyingUserName": "my_lastModifyingUserName",
         *       //   "lastViewedByMeDate": "my_lastViewedByMeDate",
         *       //   "markedViewedByMeDate": "my_markedViewedByMeDate",
         *       //   "md5Checksum": "my_md5Checksum",
         *       //   "mimeType": "my_mimeType",
         *       //   "modifiedByMeDate": "my_modifiedByMeDate",
         *       //   "modifiedDate": "my_modifiedDate",
         *       //   "openWithLinks": {},
         *       //   "originalFilename": "my_originalFilename",
         *       //   "ownedByMe": false,
         *       //   "ownerNames": [],
         *       //   "owners": [],
         *       //   "parents": [],
         *       //   "permissionIds": [],
         *       //   "permissions": [],
         *       //   "properties": [],
         *       //   "quotaBytesUsed": "my_quotaBytesUsed",
         *       //   "selfLink": "my_selfLink",
         *       //   "shareable": false,
         *       //   "shared": false,
         *       //   "sharedWithMeDate": "my_sharedWithMeDate",
         *       //   "sharingUser": {},
         *       //   "shortcutDetails": {},
         *       //   "spaces": [],
         *       //   "teamDriveId": "my_teamDriveId",
         *       //   "thumbnail": {},
         *       //   "thumbnailLink": "my_thumbnailLink",
         *       //   "thumbnailVersion": "my_thumbnailVersion",
         *       //   "title": "my_title",
         *       //   "trashedDate": "my_trashedDate",
         *       //   "trashingUser": {},
         *       //   "userPermission": {},
         *       //   "version": "my_version",
         *       //   "videoMediaMetadata": {},
         *       //   "webContentLink": "my_webContentLink",
         *       //   "webViewLink": "my_webViewLink",
         *       //   "writersCanShare": false
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
         *   //   "alternateLink": "my_alternateLink",
         *   //   "appDataContents": false,
         *   //   "canComment": false,
         *   //   "canReadRevisions": false,
         *   //   "capabilities": {},
         *   //   "copyRequiresWriterPermission": false,
         *   //   "copyable": false,
         *   //   "createdDate": "my_createdDate",
         *   //   "defaultOpenWithLink": "my_defaultOpenWithLink",
         *   //   "description": "my_description",
         *   //   "downloadUrl": "my_downloadUrl",
         *   //   "driveId": "my_driveId",
         *   //   "editable": false,
         *   //   "embedLink": "my_embedLink",
         *   //   "etag": "my_etag",
         *   //   "explicitlyTrashed": false,
         *   //   "exportLinks": {},
         *   //   "fileExtension": "my_fileExtension",
         *   //   "fileSize": "my_fileSize",
         *   //   "folderColorRgb": "my_folderColorRgb",
         *   //   "fullFileExtension": "my_fullFileExtension",
         *   //   "hasAugmentedPermissions": false,
         *   //   "hasThumbnail": false,
         *   //   "headRevisionId": "my_headRevisionId",
         *   //   "iconLink": "my_iconLink",
         *   //   "id": "my_id",
         *   //   "imageMediaMetadata": {},
         *   //   "indexableText": {},
         *   //   "isAppAuthorized": false,
         *   //   "kind": "my_kind",
         *   //   "labels": {},
         *   //   "lastModifyingUser": {},
         *   //   "lastModifyingUserName": "my_lastModifyingUserName",
         *   //   "lastViewedByMeDate": "my_lastViewedByMeDate",
         *   //   "markedViewedByMeDate": "my_markedViewedByMeDate",
         *   //   "md5Checksum": "my_md5Checksum",
         *   //   "mimeType": "my_mimeType",
         *   //   "modifiedByMeDate": "my_modifiedByMeDate",
         *   //   "modifiedDate": "my_modifiedDate",
         *   //   "openWithLinks": {},
         *   //   "originalFilename": "my_originalFilename",
         *   //   "ownedByMe": false,
         *   //   "ownerNames": [],
         *   //   "owners": [],
         *   //   "parents": [],
         *   //   "permissionIds": [],
         *   //   "permissions": [],
         *   //   "properties": [],
         *   //   "quotaBytesUsed": "my_quotaBytesUsed",
         *   //   "selfLink": "my_selfLink",
         *   //   "shareable": false,
         *   //   "shared": false,
         *   //   "sharedWithMeDate": "my_sharedWithMeDate",
         *   //   "sharingUser": {},
         *   //   "shortcutDetails": {},
         *   //   "spaces": [],
         *   //   "teamDriveId": "my_teamDriveId",
         *   //   "thumbnail": {},
         *   //   "thumbnailLink": "my_thumbnailLink",
         *   //   "thumbnailVersion": "my_thumbnailVersion",
         *   //   "title": "my_title",
         *   //   "trashedDate": "my_trashedDate",
         *   //   "trashingUser": {},
         *   //   "userPermission": {},
         *   //   "version": "my_version",
         *   //   "videoMediaMetadata": {},
         *   //   "webContentLink": "my_webContentLink",
         *   //   "webViewLink": "my_webViewLink",
         *   //   "writersCanShare": false
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.files.insert
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {boolean=} params.convert Whether to convert this file to the corresponding Google Docs format.
         * @param {boolean=} params.enforceSingleParent Set to true to opt in to API behavior that aims for all items to have exactly one parent. This parameter only takes effect if the item is not in a shared drive. Requests that specify more than one parent fail.
         * @param {boolean=} params.ocr Whether to attempt OCR on .jpg, .png, .gif, or .pdf uploads.
         * @param {string=} params.ocrLanguage If ocr is true, hints at the language to use. Valid values are BCP 47 codes.
         * @param {boolean=} params.pinned Whether to pin the head revision of the uploaded file. A file can have a maximum of 200 pinned revisions.
         * @param {boolean=} params.supportsAllDrives Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         * @param {boolean=} params.supportsTeamDrives Deprecated use supportsAllDrives instead.
         * @param {string=} params.timedTextLanguage The language of the timed text.
         * @param {string=} params.timedTextTrackName The timed text track name.
         * @param {boolean=} params.useContentAsIndexableText Whether to use the content as indexable text.
         * @param {string=} params.visibility The visibility of the new file. This parameter is only relevant when convert=false.
         * @param  {object} params.requestBody Media resource metadata
         * @param {object} params.media Media object
         * @param {string} params.media.mimeType Media mime-type
         * @param {string|object} params.media.body Media body contents
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        insert(params: Params$Resource$Files$Insert, options: StreamMethodOptions): GaxiosPromise<Readable>;
        insert(params?: Params$Resource$Files$Insert, options?: MethodOptions): GaxiosPromise<Schema$File>;
        insert(params: Params$Resource$Files$Insert, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        insert(params: Params$Resource$Files$Insert, options: MethodOptions | BodyResponseCallback<Schema$File>, callback: BodyResponseCallback<Schema$File>): void;
        insert(params: Params$Resource$Files$Insert, callback: BodyResponseCallback<Schema$File>): void;
        insert(callback: BodyResponseCallback<Schema$File>): void;
        /**
         * drive.files.list
         * @desc Lists the user's files.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.appdata',
         *       'https://www.googleapis.com/auth/drive.apps.readonly',
         *       'https://www.googleapis.com/auth/drive.file',
         *       'https://www.googleapis.com/auth/drive.metadata',
         *       'https://www.googleapis.com/auth/drive.metadata.readonly',
         *       'https://www.googleapis.com/auth/drive.photos.readonly',
         *       'https://www.googleapis.com/auth/drive.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.files.list({
         *     // Bodies of items (files/documents) to which the query applies. Supported bodies are 'default', 'domain', 'drive' and 'allDrives'. Prefer 'default' or 'drive' to 'allDrives' for efficiency.
         *     corpora: 'placeholder-value',
         *     // The body of items (files/documents) to which the query applies. Deprecated: use 'corpora' instead.
         *     corpus: 'placeholder-value',
         *     // ID of the shared drive to search.
         *     driveId: 'placeholder-value',
         *     // Deprecated - Whether both My Drive and shared drive items should be included in results. This parameter will only be effective until June 1, 2020. Afterwards shared drive items will be included in the results.
         *     includeItemsFromAllDrives: 'placeholder-value',
         *     // Deprecated use includeItemsFromAllDrives instead.
         *     includeTeamDriveItems: 'placeholder-value',
         *     // The maximum number of files to return per page. Partial or empty result pages are possible even before the end of the files list has been reached.
         *     maxResults: 'placeholder-value',
         *     // A comma-separated list of sort keys. Valid keys are 'createdDate', 'folder', 'lastViewedByMeDate', 'modifiedByMeDate', 'modifiedDate', 'quotaBytesUsed', 'recency', 'sharedWithMeDate', 'starred', 'title', and 'title_natural'. Each key sorts ascending by default, but may be reversed with the 'desc' modifier. Example usage: ?orderBy=folder,modifiedDate desc,title. Please note that there is a current limitation for users with approximately one million files in which the requested sort order is ignored.
         *     orderBy: 'placeholder-value',
         *     // Page token for files.
         *     pageToken: 'placeholder-value',
         *     // This parameter is deprecated and has no function.
         *     projection: 'placeholder-value',
         *     // Query string for searching files.
         *     q: 'placeholder-value',
         *     // A comma-separated list of spaces to query. Supported values are 'drive', 'appDataFolder' and 'photos'.
         *     spaces: 'placeholder-value',
         *     // Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         *     supportsAllDrives: 'placeholder-value',
         *     // Deprecated use supportsAllDrives instead.
         *     supportsTeamDrives: 'placeholder-value',
         *     // Deprecated use driveId instead.
         *     teamDriveId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "etag": "my_etag",
         *   //   "incompleteSearch": false,
         *   //   "items": [],
         *   //   "kind": "my_kind",
         *   //   "nextLink": "my_nextLink",
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "selfLink": "my_selfLink"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.files.list
         * @memberOf! ()
         *
         * @param {object=} params Parameters for request
         * @param {string=} params.corpora Bodies of items (files/documents) to which the query applies. Supported bodies are 'default', 'domain', 'drive' and 'allDrives'. Prefer 'default' or 'drive' to 'allDrives' for efficiency.
         * @param {string=} params.corpus The body of items (files/documents) to which the query applies. Deprecated: use 'corpora' instead.
         * @param {string=} params.driveId ID of the shared drive to search.
         * @param {boolean=} params.includeItemsFromAllDrives Deprecated - Whether both My Drive and shared drive items should be included in results. This parameter will only be effective until June 1, 2020. Afterwards shared drive items will be included in the results.
         * @param {boolean=} params.includeTeamDriveItems Deprecated use includeItemsFromAllDrives instead.
         * @param {integer=} params.maxResults The maximum number of files to return per page. Partial or empty result pages are possible even before the end of the files list has been reached.
         * @param {string=} params.orderBy A comma-separated list of sort keys. Valid keys are 'createdDate', 'folder', 'lastViewedByMeDate', 'modifiedByMeDate', 'modifiedDate', 'quotaBytesUsed', 'recency', 'sharedWithMeDate', 'starred', 'title', and 'title_natural'. Each key sorts ascending by default, but may be reversed with the 'desc' modifier. Example usage: ?orderBy=folder,modifiedDate desc,title. Please note that there is a current limitation for users with approximately one million files in which the requested sort order is ignored.
         * @param {string=} params.pageToken Page token for files.
         * @param {string=} params.projection This parameter is deprecated and has no function.
         * @param {string=} params.q Query string for searching files.
         * @param {string=} params.spaces A comma-separated list of spaces to query. Supported values are 'drive', 'appDataFolder' and 'photos'.
         * @param {boolean=} params.supportsAllDrives Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         * @param {boolean=} params.supportsTeamDrives Deprecated use supportsAllDrives instead.
         * @param {string=} params.teamDriveId Deprecated use driveId instead.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Files$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Files$List, options?: MethodOptions): GaxiosPromise<Schema$FileList>;
        list(params: Params$Resource$Files$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Files$List, options: MethodOptions | BodyResponseCallback<Schema$FileList>, callback: BodyResponseCallback<Schema$FileList>): void;
        list(params: Params$Resource$Files$List, callback: BodyResponseCallback<Schema$FileList>): void;
        list(callback: BodyResponseCallback<Schema$FileList>): void;
        /**
         * drive.files.patch
         * @desc Updates file metadata and/or content. This method supports patch semantics.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.appdata',
         *       'https://www.googleapis.com/auth/drive.apps.readonly',
         *       'https://www.googleapis.com/auth/drive.file',
         *       'https://www.googleapis.com/auth/drive.metadata',
         *       'https://www.googleapis.com/auth/drive.scripts',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.files.patch({
         *     // Comma-separated list of parent IDs to add.
         *     addParents: 'placeholder-value',
         *     // This parameter is deprecated and has no function.
         *     convert: 'placeholder-value',
         *     // Set to true to opt in to API behavior that aims for all items to have exactly one parent. This parameter only takes effect if the item is not in a shared drive. If the item's owner makes a request to add a single parent, the item is removed from all current folders and placed in the requested folder. Other requests that increase the number of parents fail, except when the canAddMyDriveParent file capability is true and a single parent is being added.
         *     enforceSingleParent: 'placeholder-value',
         *     // The ID of the file to update.
         *     fileId: 'placeholder-value',
         *     // Determines the behavior in which modifiedDate is updated. This overrides setModifiedDate.
         *     modifiedDateBehavior: 'placeholder-value',
         *     // Whether a blob upload should create a new revision. If false, the blob data in the current head revision is replaced. If true or not set, a new blob is created as head revision, and previous unpinned revisions are preserved for a short period of time. Pinned revisions are stored indefinitely, using additional storage quota, up to a maximum of 200 revisions. For details on how revisions are retained, see the Drive Help Center.
         *     newRevision: 'placeholder-value',
         *     // Whether to attempt OCR on .jpg, .png, .gif, or .pdf uploads.
         *     ocr: 'placeholder-value',
         *     // If ocr is true, hints at the language to use. Valid values are BCP 47 codes.
         *     ocrLanguage: 'placeholder-value',
         *     // Whether to pin the new revision. A file can have a maximum of 200 pinned revisions.
         *     pinned: 'placeholder-value',
         *     // Comma-separated list of parent IDs to remove.
         *     removeParents: 'placeholder-value',
         *     // Whether to set the modified date using the value supplied in the request body. Setting this field to true is equivalent to modifiedDateBehavior=fromBodyOrNow, and false is equivalent to modifiedDateBehavior=now. To prevent any changes to the modified date set modifiedDateBehavior=noChange.
         *     setModifiedDate: 'placeholder-value',
         *     // Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         *     supportsAllDrives: 'placeholder-value',
         *     // Deprecated use supportsAllDrives instead.
         *     supportsTeamDrives: 'placeholder-value',
         *     // The language of the timed text.
         *     timedTextLanguage: 'placeholder-value',
         *     // The timed text track name.
         *     timedTextTrackName: 'placeholder-value',
         *     // Whether to update the view date after successfully updating the file.
         *     updateViewedDate: 'placeholder-value',
         *     // Whether to use the content as indexable text.
         *     useContentAsIndexableText: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "alternateLink": "my_alternateLink",
         *       //   "appDataContents": false,
         *       //   "canComment": false,
         *       //   "canReadRevisions": false,
         *       //   "capabilities": {},
         *       //   "copyRequiresWriterPermission": false,
         *       //   "copyable": false,
         *       //   "createdDate": "my_createdDate",
         *       //   "defaultOpenWithLink": "my_defaultOpenWithLink",
         *       //   "description": "my_description",
         *       //   "downloadUrl": "my_downloadUrl",
         *       //   "driveId": "my_driveId",
         *       //   "editable": false,
         *       //   "embedLink": "my_embedLink",
         *       //   "etag": "my_etag",
         *       //   "explicitlyTrashed": false,
         *       //   "exportLinks": {},
         *       //   "fileExtension": "my_fileExtension",
         *       //   "fileSize": "my_fileSize",
         *       //   "folderColorRgb": "my_folderColorRgb",
         *       //   "fullFileExtension": "my_fullFileExtension",
         *       //   "hasAugmentedPermissions": false,
         *       //   "hasThumbnail": false,
         *       //   "headRevisionId": "my_headRevisionId",
         *       //   "iconLink": "my_iconLink",
         *       //   "id": "my_id",
         *       //   "imageMediaMetadata": {},
         *       //   "indexableText": {},
         *       //   "isAppAuthorized": false,
         *       //   "kind": "my_kind",
         *       //   "labels": {},
         *       //   "lastModifyingUser": {},
         *       //   "lastModifyingUserName": "my_lastModifyingUserName",
         *       //   "lastViewedByMeDate": "my_lastViewedByMeDate",
         *       //   "markedViewedByMeDate": "my_markedViewedByMeDate",
         *       //   "md5Checksum": "my_md5Checksum",
         *       //   "mimeType": "my_mimeType",
         *       //   "modifiedByMeDate": "my_modifiedByMeDate",
         *       //   "modifiedDate": "my_modifiedDate",
         *       //   "openWithLinks": {},
         *       //   "originalFilename": "my_originalFilename",
         *       //   "ownedByMe": false,
         *       //   "ownerNames": [],
         *       //   "owners": [],
         *       //   "parents": [],
         *       //   "permissionIds": [],
         *       //   "permissions": [],
         *       //   "properties": [],
         *       //   "quotaBytesUsed": "my_quotaBytesUsed",
         *       //   "selfLink": "my_selfLink",
         *       //   "shareable": false,
         *       //   "shared": false,
         *       //   "sharedWithMeDate": "my_sharedWithMeDate",
         *       //   "sharingUser": {},
         *       //   "shortcutDetails": {},
         *       //   "spaces": [],
         *       //   "teamDriveId": "my_teamDriveId",
         *       //   "thumbnail": {},
         *       //   "thumbnailLink": "my_thumbnailLink",
         *       //   "thumbnailVersion": "my_thumbnailVersion",
         *       //   "title": "my_title",
         *       //   "trashedDate": "my_trashedDate",
         *       //   "trashingUser": {},
         *       //   "userPermission": {},
         *       //   "version": "my_version",
         *       //   "videoMediaMetadata": {},
         *       //   "webContentLink": "my_webContentLink",
         *       //   "webViewLink": "my_webViewLink",
         *       //   "writersCanShare": false
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "alternateLink": "my_alternateLink",
         *   //   "appDataContents": false,
         *   //   "canComment": false,
         *   //   "canReadRevisions": false,
         *   //   "capabilities": {},
         *   //   "copyRequiresWriterPermission": false,
         *   //   "copyable": false,
         *   //   "createdDate": "my_createdDate",
         *   //   "defaultOpenWithLink": "my_defaultOpenWithLink",
         *   //   "description": "my_description",
         *   //   "downloadUrl": "my_downloadUrl",
         *   //   "driveId": "my_driveId",
         *   //   "editable": false,
         *   //   "embedLink": "my_embedLink",
         *   //   "etag": "my_etag",
         *   //   "explicitlyTrashed": false,
         *   //   "exportLinks": {},
         *   //   "fileExtension": "my_fileExtension",
         *   //   "fileSize": "my_fileSize",
         *   //   "folderColorRgb": "my_folderColorRgb",
         *   //   "fullFileExtension": "my_fullFileExtension",
         *   //   "hasAugmentedPermissions": false,
         *   //   "hasThumbnail": false,
         *   //   "headRevisionId": "my_headRevisionId",
         *   //   "iconLink": "my_iconLink",
         *   //   "id": "my_id",
         *   //   "imageMediaMetadata": {},
         *   //   "indexableText": {},
         *   //   "isAppAuthorized": false,
         *   //   "kind": "my_kind",
         *   //   "labels": {},
         *   //   "lastModifyingUser": {},
         *   //   "lastModifyingUserName": "my_lastModifyingUserName",
         *   //   "lastViewedByMeDate": "my_lastViewedByMeDate",
         *   //   "markedViewedByMeDate": "my_markedViewedByMeDate",
         *   //   "md5Checksum": "my_md5Checksum",
         *   //   "mimeType": "my_mimeType",
         *   //   "modifiedByMeDate": "my_modifiedByMeDate",
         *   //   "modifiedDate": "my_modifiedDate",
         *   //   "openWithLinks": {},
         *   //   "originalFilename": "my_originalFilename",
         *   //   "ownedByMe": false,
         *   //   "ownerNames": [],
         *   //   "owners": [],
         *   //   "parents": [],
         *   //   "permissionIds": [],
         *   //   "permissions": [],
         *   //   "properties": [],
         *   //   "quotaBytesUsed": "my_quotaBytesUsed",
         *   //   "selfLink": "my_selfLink",
         *   //   "shareable": false,
         *   //   "shared": false,
         *   //   "sharedWithMeDate": "my_sharedWithMeDate",
         *   //   "sharingUser": {},
         *   //   "shortcutDetails": {},
         *   //   "spaces": [],
         *   //   "teamDriveId": "my_teamDriveId",
         *   //   "thumbnail": {},
         *   //   "thumbnailLink": "my_thumbnailLink",
         *   //   "thumbnailVersion": "my_thumbnailVersion",
         *   //   "title": "my_title",
         *   //   "trashedDate": "my_trashedDate",
         *   //   "trashingUser": {},
         *   //   "userPermission": {},
         *   //   "version": "my_version",
         *   //   "videoMediaMetadata": {},
         *   //   "webContentLink": "my_webContentLink",
         *   //   "webViewLink": "my_webViewLink",
         *   //   "writersCanShare": false
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.files.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.addParents Comma-separated list of parent IDs to add.
         * @param {boolean=} params.convert This parameter is deprecated and has no function.
         * @param {boolean=} params.enforceSingleParent Set to true to opt in to API behavior that aims for all items to have exactly one parent. This parameter only takes effect if the item is not in a shared drive. If the item's owner makes a request to add a single parent, the item is removed from all current folders and placed in the requested folder. Other requests that increase the number of parents fail, except when the canAddMyDriveParent file capability is true and a single parent is being added.
         * @param {string} params.fileId The ID of the file to update.
         * @param {string=} params.modifiedDateBehavior Determines the behavior in which modifiedDate is updated. This overrides setModifiedDate.
         * @param {boolean=} params.newRevision Whether a blob upload should create a new revision. If false, the blob data in the current head revision is replaced. If true or not set, a new blob is created as head revision, and previous unpinned revisions are preserved for a short period of time. Pinned revisions are stored indefinitely, using additional storage quota, up to a maximum of 200 revisions. For details on how revisions are retained, see the Drive Help Center.
         * @param {boolean=} params.ocr Whether to attempt OCR on .jpg, .png, .gif, or .pdf uploads.
         * @param {string=} params.ocrLanguage If ocr is true, hints at the language to use. Valid values are BCP 47 codes.
         * @param {boolean=} params.pinned Whether to pin the new revision. A file can have a maximum of 200 pinned revisions.
         * @param {string=} params.removeParents Comma-separated list of parent IDs to remove.
         * @param {boolean=} params.setModifiedDate Whether to set the modified date using the value supplied in the request body. Setting this field to true is equivalent to modifiedDateBehavior=fromBodyOrNow, and false is equivalent to modifiedDateBehavior=now. To prevent any changes to the modified date set modifiedDateBehavior=noChange.
         * @param {boolean=} params.supportsAllDrives Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         * @param {boolean=} params.supportsTeamDrives Deprecated use supportsAllDrives instead.
         * @param {string=} params.timedTextLanguage The language of the timed text.
         * @param {string=} params.timedTextTrackName The timed text track name.
         * @param {boolean=} params.updateViewedDate Whether to update the view date after successfully updating the file.
         * @param {boolean=} params.useContentAsIndexableText Whether to use the content as indexable text.
         * @param {().File} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Files$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Files$Patch, options?: MethodOptions): GaxiosPromise<Schema$File>;
        patch(params: Params$Resource$Files$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Files$Patch, options: MethodOptions | BodyResponseCallback<Schema$File>, callback: BodyResponseCallback<Schema$File>): void;
        patch(params: Params$Resource$Files$Patch, callback: BodyResponseCallback<Schema$File>): void;
        patch(callback: BodyResponseCallback<Schema$File>): void;
        /**
         * drive.files.touch
         * @desc Set the file's updated time to the current server time.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.appdata',
         *       'https://www.googleapis.com/auth/drive.apps.readonly',
         *       'https://www.googleapis.com/auth/drive.file',
         *       'https://www.googleapis.com/auth/drive.metadata',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.files.touch({
         *     // The ID of the file to update.
         *     fileId: 'placeholder-value',
         *     // Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         *     supportsAllDrives: 'placeholder-value',
         *     // Deprecated use supportsAllDrives instead.
         *     supportsTeamDrives: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "alternateLink": "my_alternateLink",
         *   //   "appDataContents": false,
         *   //   "canComment": false,
         *   //   "canReadRevisions": false,
         *   //   "capabilities": {},
         *   //   "copyRequiresWriterPermission": false,
         *   //   "copyable": false,
         *   //   "createdDate": "my_createdDate",
         *   //   "defaultOpenWithLink": "my_defaultOpenWithLink",
         *   //   "description": "my_description",
         *   //   "downloadUrl": "my_downloadUrl",
         *   //   "driveId": "my_driveId",
         *   //   "editable": false,
         *   //   "embedLink": "my_embedLink",
         *   //   "etag": "my_etag",
         *   //   "explicitlyTrashed": false,
         *   //   "exportLinks": {},
         *   //   "fileExtension": "my_fileExtension",
         *   //   "fileSize": "my_fileSize",
         *   //   "folderColorRgb": "my_folderColorRgb",
         *   //   "fullFileExtension": "my_fullFileExtension",
         *   //   "hasAugmentedPermissions": false,
         *   //   "hasThumbnail": false,
         *   //   "headRevisionId": "my_headRevisionId",
         *   //   "iconLink": "my_iconLink",
         *   //   "id": "my_id",
         *   //   "imageMediaMetadata": {},
         *   //   "indexableText": {},
         *   //   "isAppAuthorized": false,
         *   //   "kind": "my_kind",
         *   //   "labels": {},
         *   //   "lastModifyingUser": {},
         *   //   "lastModifyingUserName": "my_lastModifyingUserName",
         *   //   "lastViewedByMeDate": "my_lastViewedByMeDate",
         *   //   "markedViewedByMeDate": "my_markedViewedByMeDate",
         *   //   "md5Checksum": "my_md5Checksum",
         *   //   "mimeType": "my_mimeType",
         *   //   "modifiedByMeDate": "my_modifiedByMeDate",
         *   //   "modifiedDate": "my_modifiedDate",
         *   //   "openWithLinks": {},
         *   //   "originalFilename": "my_originalFilename",
         *   //   "ownedByMe": false,
         *   //   "ownerNames": [],
         *   //   "owners": [],
         *   //   "parents": [],
         *   //   "permissionIds": [],
         *   //   "permissions": [],
         *   //   "properties": [],
         *   //   "quotaBytesUsed": "my_quotaBytesUsed",
         *   //   "selfLink": "my_selfLink",
         *   //   "shareable": false,
         *   //   "shared": false,
         *   //   "sharedWithMeDate": "my_sharedWithMeDate",
         *   //   "sharingUser": {},
         *   //   "shortcutDetails": {},
         *   //   "spaces": [],
         *   //   "teamDriveId": "my_teamDriveId",
         *   //   "thumbnail": {},
         *   //   "thumbnailLink": "my_thumbnailLink",
         *   //   "thumbnailVersion": "my_thumbnailVersion",
         *   //   "title": "my_title",
         *   //   "trashedDate": "my_trashedDate",
         *   //   "trashingUser": {},
         *   //   "userPermission": {},
         *   //   "version": "my_version",
         *   //   "videoMediaMetadata": {},
         *   //   "webContentLink": "my_webContentLink",
         *   //   "webViewLink": "my_webViewLink",
         *   //   "writersCanShare": false
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.files.touch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.fileId The ID of the file to update.
         * @param {boolean=} params.supportsAllDrives Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         * @param {boolean=} params.supportsTeamDrives Deprecated use supportsAllDrives instead.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        touch(params: Params$Resource$Files$Touch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        touch(params?: Params$Resource$Files$Touch, options?: MethodOptions): GaxiosPromise<Schema$File>;
        touch(params: Params$Resource$Files$Touch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        touch(params: Params$Resource$Files$Touch, options: MethodOptions | BodyResponseCallback<Schema$File>, callback: BodyResponseCallback<Schema$File>): void;
        touch(params: Params$Resource$Files$Touch, callback: BodyResponseCallback<Schema$File>): void;
        touch(callback: BodyResponseCallback<Schema$File>): void;
        /**
         * drive.files.trash
         * @desc Moves a file to the trash. The currently authenticated user must own the file or be at least a fileOrganizer on the parent for shared drive files.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.appdata',
         *       'https://www.googleapis.com/auth/drive.apps.readonly',
         *       'https://www.googleapis.com/auth/drive.file',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.files.trash({
         *     // The ID of the file to trash.
         *     fileId: 'placeholder-value',
         *     // Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         *     supportsAllDrives: 'placeholder-value',
         *     // Deprecated use supportsAllDrives instead.
         *     supportsTeamDrives: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "alternateLink": "my_alternateLink",
         *   //   "appDataContents": false,
         *   //   "canComment": false,
         *   //   "canReadRevisions": false,
         *   //   "capabilities": {},
         *   //   "copyRequiresWriterPermission": false,
         *   //   "copyable": false,
         *   //   "createdDate": "my_createdDate",
         *   //   "defaultOpenWithLink": "my_defaultOpenWithLink",
         *   //   "description": "my_description",
         *   //   "downloadUrl": "my_downloadUrl",
         *   //   "driveId": "my_driveId",
         *   //   "editable": false,
         *   //   "embedLink": "my_embedLink",
         *   //   "etag": "my_etag",
         *   //   "explicitlyTrashed": false,
         *   //   "exportLinks": {},
         *   //   "fileExtension": "my_fileExtension",
         *   //   "fileSize": "my_fileSize",
         *   //   "folderColorRgb": "my_folderColorRgb",
         *   //   "fullFileExtension": "my_fullFileExtension",
         *   //   "hasAugmentedPermissions": false,
         *   //   "hasThumbnail": false,
         *   //   "headRevisionId": "my_headRevisionId",
         *   //   "iconLink": "my_iconLink",
         *   //   "id": "my_id",
         *   //   "imageMediaMetadata": {},
         *   //   "indexableText": {},
         *   //   "isAppAuthorized": false,
         *   //   "kind": "my_kind",
         *   //   "labels": {},
         *   //   "lastModifyingUser": {},
         *   //   "lastModifyingUserName": "my_lastModifyingUserName",
         *   //   "lastViewedByMeDate": "my_lastViewedByMeDate",
         *   //   "markedViewedByMeDate": "my_markedViewedByMeDate",
         *   //   "md5Checksum": "my_md5Checksum",
         *   //   "mimeType": "my_mimeType",
         *   //   "modifiedByMeDate": "my_modifiedByMeDate",
         *   //   "modifiedDate": "my_modifiedDate",
         *   //   "openWithLinks": {},
         *   //   "originalFilename": "my_originalFilename",
         *   //   "ownedByMe": false,
         *   //   "ownerNames": [],
         *   //   "owners": [],
         *   //   "parents": [],
         *   //   "permissionIds": [],
         *   //   "permissions": [],
         *   //   "properties": [],
         *   //   "quotaBytesUsed": "my_quotaBytesUsed",
         *   //   "selfLink": "my_selfLink",
         *   //   "shareable": false,
         *   //   "shared": false,
         *   //   "sharedWithMeDate": "my_sharedWithMeDate",
         *   //   "sharingUser": {},
         *   //   "shortcutDetails": {},
         *   //   "spaces": [],
         *   //   "teamDriveId": "my_teamDriveId",
         *   //   "thumbnail": {},
         *   //   "thumbnailLink": "my_thumbnailLink",
         *   //   "thumbnailVersion": "my_thumbnailVersion",
         *   //   "title": "my_title",
         *   //   "trashedDate": "my_trashedDate",
         *   //   "trashingUser": {},
         *   //   "userPermission": {},
         *   //   "version": "my_version",
         *   //   "videoMediaMetadata": {},
         *   //   "webContentLink": "my_webContentLink",
         *   //   "webViewLink": "my_webViewLink",
         *   //   "writersCanShare": false
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.files.trash
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.fileId The ID of the file to trash.
         * @param {boolean=} params.supportsAllDrives Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         * @param {boolean=} params.supportsTeamDrives Deprecated use supportsAllDrives instead.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        trash(params: Params$Resource$Files$Trash, options: StreamMethodOptions): GaxiosPromise<Readable>;
        trash(params?: Params$Resource$Files$Trash, options?: MethodOptions): GaxiosPromise<Schema$File>;
        trash(params: Params$Resource$Files$Trash, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        trash(params: Params$Resource$Files$Trash, options: MethodOptions | BodyResponseCallback<Schema$File>, callback: BodyResponseCallback<Schema$File>): void;
        trash(params: Params$Resource$Files$Trash, callback: BodyResponseCallback<Schema$File>): void;
        trash(callback: BodyResponseCallback<Schema$File>): void;
        /**
         * drive.files.untrash
         * @desc Restores a file from the trash.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.appdata',
         *       'https://www.googleapis.com/auth/drive.apps.readonly',
         *       'https://www.googleapis.com/auth/drive.file',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.files.untrash({
         *     // The ID of the file to untrash.
         *     fileId: 'placeholder-value',
         *     // Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         *     supportsAllDrives: 'placeholder-value',
         *     // Deprecated use supportsAllDrives instead.
         *     supportsTeamDrives: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "alternateLink": "my_alternateLink",
         *   //   "appDataContents": false,
         *   //   "canComment": false,
         *   //   "canReadRevisions": false,
         *   //   "capabilities": {},
         *   //   "copyRequiresWriterPermission": false,
         *   //   "copyable": false,
         *   //   "createdDate": "my_createdDate",
         *   //   "defaultOpenWithLink": "my_defaultOpenWithLink",
         *   //   "description": "my_description",
         *   //   "downloadUrl": "my_downloadUrl",
         *   //   "driveId": "my_driveId",
         *   //   "editable": false,
         *   //   "embedLink": "my_embedLink",
         *   //   "etag": "my_etag",
         *   //   "explicitlyTrashed": false,
         *   //   "exportLinks": {},
         *   //   "fileExtension": "my_fileExtension",
         *   //   "fileSize": "my_fileSize",
         *   //   "folderColorRgb": "my_folderColorRgb",
         *   //   "fullFileExtension": "my_fullFileExtension",
         *   //   "hasAugmentedPermissions": false,
         *   //   "hasThumbnail": false,
         *   //   "headRevisionId": "my_headRevisionId",
         *   //   "iconLink": "my_iconLink",
         *   //   "id": "my_id",
         *   //   "imageMediaMetadata": {},
         *   //   "indexableText": {},
         *   //   "isAppAuthorized": false,
         *   //   "kind": "my_kind",
         *   //   "labels": {},
         *   //   "lastModifyingUser": {},
         *   //   "lastModifyingUserName": "my_lastModifyingUserName",
         *   //   "lastViewedByMeDate": "my_lastViewedByMeDate",
         *   //   "markedViewedByMeDate": "my_markedViewedByMeDate",
         *   //   "md5Checksum": "my_md5Checksum",
         *   //   "mimeType": "my_mimeType",
         *   //   "modifiedByMeDate": "my_modifiedByMeDate",
         *   //   "modifiedDate": "my_modifiedDate",
         *   //   "openWithLinks": {},
         *   //   "originalFilename": "my_originalFilename",
         *   //   "ownedByMe": false,
         *   //   "ownerNames": [],
         *   //   "owners": [],
         *   //   "parents": [],
         *   //   "permissionIds": [],
         *   //   "permissions": [],
         *   //   "properties": [],
         *   //   "quotaBytesUsed": "my_quotaBytesUsed",
         *   //   "selfLink": "my_selfLink",
         *   //   "shareable": false,
         *   //   "shared": false,
         *   //   "sharedWithMeDate": "my_sharedWithMeDate",
         *   //   "sharingUser": {},
         *   //   "shortcutDetails": {},
         *   //   "spaces": [],
         *   //   "teamDriveId": "my_teamDriveId",
         *   //   "thumbnail": {},
         *   //   "thumbnailLink": "my_thumbnailLink",
         *   //   "thumbnailVersion": "my_thumbnailVersion",
         *   //   "title": "my_title",
         *   //   "trashedDate": "my_trashedDate",
         *   //   "trashingUser": {},
         *   //   "userPermission": {},
         *   //   "version": "my_version",
         *   //   "videoMediaMetadata": {},
         *   //   "webContentLink": "my_webContentLink",
         *   //   "webViewLink": "my_webViewLink",
         *   //   "writersCanShare": false
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.files.untrash
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.fileId The ID of the file to untrash.
         * @param {boolean=} params.supportsAllDrives Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         * @param {boolean=} params.supportsTeamDrives Deprecated use supportsAllDrives instead.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        untrash(params: Params$Resource$Files$Untrash, options: StreamMethodOptions): GaxiosPromise<Readable>;
        untrash(params?: Params$Resource$Files$Untrash, options?: MethodOptions): GaxiosPromise<Schema$File>;
        untrash(params: Params$Resource$Files$Untrash, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        untrash(params: Params$Resource$Files$Untrash, options: MethodOptions | BodyResponseCallback<Schema$File>, callback: BodyResponseCallback<Schema$File>): void;
        untrash(params: Params$Resource$Files$Untrash, callback: BodyResponseCallback<Schema$File>): void;
        untrash(callback: BodyResponseCallback<Schema$File>): void;
        /**
         * drive.files.update
         * @desc Updates file metadata and/or content.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.appdata',
         *       'https://www.googleapis.com/auth/drive.apps.readonly',
         *       'https://www.googleapis.com/auth/drive.file',
         *       'https://www.googleapis.com/auth/drive.metadata',
         *       'https://www.googleapis.com/auth/drive.scripts',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.files.update({
         *     // Comma-separated list of parent IDs to add.
         *     addParents: 'placeholder-value',
         *     // This parameter is deprecated and has no function.
         *     convert: 'placeholder-value',
         *     // Set to true to opt in to API behavior that aims for all items to have exactly one parent. This parameter only takes effect if the item is not in a shared drive. If the item's owner makes a request to add a single parent, the item is removed from all current folders and placed in the requested folder. Other requests that increase the number of parents fail, except when the canAddMyDriveParent file capability is true and a single parent is being added.
         *     enforceSingleParent: 'placeholder-value',
         *     // The ID of the file to update.
         *     fileId: 'placeholder-value',
         *     // Determines the behavior in which modifiedDate is updated. This overrides setModifiedDate.
         *     modifiedDateBehavior: 'placeholder-value',
         *     // Whether a blob upload should create a new revision. If false, the blob data in the current head revision is replaced. If true or not set, a new blob is created as head revision, and previous unpinned revisions are preserved for a short period of time. Pinned revisions are stored indefinitely, using additional storage quota, up to a maximum of 200 revisions. For details on how revisions are retained, see the Drive Help Center.
         *     newRevision: 'placeholder-value',
         *     // Whether to attempt OCR on .jpg, .png, .gif, or .pdf uploads.
         *     ocr: 'placeholder-value',
         *     // If ocr is true, hints at the language to use. Valid values are BCP 47 codes.
         *     ocrLanguage: 'placeholder-value',
         *     // Whether to pin the new revision. A file can have a maximum of 200 pinned revisions.
         *     pinned: 'placeholder-value',
         *     // Comma-separated list of parent IDs to remove.
         *     removeParents: 'placeholder-value',
         *     // Whether to set the modified date using the value supplied in the request body. Setting this field to true is equivalent to modifiedDateBehavior=fromBodyOrNow, and false is equivalent to modifiedDateBehavior=now. To prevent any changes to the modified date set modifiedDateBehavior=noChange.
         *     setModifiedDate: 'placeholder-value',
         *     // Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         *     supportsAllDrives: 'placeholder-value',
         *     // Deprecated use supportsAllDrives instead.
         *     supportsTeamDrives: 'placeholder-value',
         *     // The language of the timed text.
         *     timedTextLanguage: 'placeholder-value',
         *     // The timed text track name.
         *     timedTextTrackName: 'placeholder-value',
         *     // Whether to update the view date after successfully updating the file.
         *     updateViewedDate: 'placeholder-value',
         *     // Whether to use the content as indexable text.
         *     useContentAsIndexableText: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "alternateLink": "my_alternateLink",
         *       //   "appDataContents": false,
         *       //   "canComment": false,
         *       //   "canReadRevisions": false,
         *       //   "capabilities": {},
         *       //   "copyRequiresWriterPermission": false,
         *       //   "copyable": false,
         *       //   "createdDate": "my_createdDate",
         *       //   "defaultOpenWithLink": "my_defaultOpenWithLink",
         *       //   "description": "my_description",
         *       //   "downloadUrl": "my_downloadUrl",
         *       //   "driveId": "my_driveId",
         *       //   "editable": false,
         *       //   "embedLink": "my_embedLink",
         *       //   "etag": "my_etag",
         *       //   "explicitlyTrashed": false,
         *       //   "exportLinks": {},
         *       //   "fileExtension": "my_fileExtension",
         *       //   "fileSize": "my_fileSize",
         *       //   "folderColorRgb": "my_folderColorRgb",
         *       //   "fullFileExtension": "my_fullFileExtension",
         *       //   "hasAugmentedPermissions": false,
         *       //   "hasThumbnail": false,
         *       //   "headRevisionId": "my_headRevisionId",
         *       //   "iconLink": "my_iconLink",
         *       //   "id": "my_id",
         *       //   "imageMediaMetadata": {},
         *       //   "indexableText": {},
         *       //   "isAppAuthorized": false,
         *       //   "kind": "my_kind",
         *       //   "labels": {},
         *       //   "lastModifyingUser": {},
         *       //   "lastModifyingUserName": "my_lastModifyingUserName",
         *       //   "lastViewedByMeDate": "my_lastViewedByMeDate",
         *       //   "markedViewedByMeDate": "my_markedViewedByMeDate",
         *       //   "md5Checksum": "my_md5Checksum",
         *       //   "mimeType": "my_mimeType",
         *       //   "modifiedByMeDate": "my_modifiedByMeDate",
         *       //   "modifiedDate": "my_modifiedDate",
         *       //   "openWithLinks": {},
         *       //   "originalFilename": "my_originalFilename",
         *       //   "ownedByMe": false,
         *       //   "ownerNames": [],
         *       //   "owners": [],
         *       //   "parents": [],
         *       //   "permissionIds": [],
         *       //   "permissions": [],
         *       //   "properties": [],
         *       //   "quotaBytesUsed": "my_quotaBytesUsed",
         *       //   "selfLink": "my_selfLink",
         *       //   "shareable": false,
         *       //   "shared": false,
         *       //   "sharedWithMeDate": "my_sharedWithMeDate",
         *       //   "sharingUser": {},
         *       //   "shortcutDetails": {},
         *       //   "spaces": [],
         *       //   "teamDriveId": "my_teamDriveId",
         *       //   "thumbnail": {},
         *       //   "thumbnailLink": "my_thumbnailLink",
         *       //   "thumbnailVersion": "my_thumbnailVersion",
         *       //   "title": "my_title",
         *       //   "trashedDate": "my_trashedDate",
         *       //   "trashingUser": {},
         *       //   "userPermission": {},
         *       //   "version": "my_version",
         *       //   "videoMediaMetadata": {},
         *       //   "webContentLink": "my_webContentLink",
         *       //   "webViewLink": "my_webViewLink",
         *       //   "writersCanShare": false
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
         *   //   "alternateLink": "my_alternateLink",
         *   //   "appDataContents": false,
         *   //   "canComment": false,
         *   //   "canReadRevisions": false,
         *   //   "capabilities": {},
         *   //   "copyRequiresWriterPermission": false,
         *   //   "copyable": false,
         *   //   "createdDate": "my_createdDate",
         *   //   "defaultOpenWithLink": "my_defaultOpenWithLink",
         *   //   "description": "my_description",
         *   //   "downloadUrl": "my_downloadUrl",
         *   //   "driveId": "my_driveId",
         *   //   "editable": false,
         *   //   "embedLink": "my_embedLink",
         *   //   "etag": "my_etag",
         *   //   "explicitlyTrashed": false,
         *   //   "exportLinks": {},
         *   //   "fileExtension": "my_fileExtension",
         *   //   "fileSize": "my_fileSize",
         *   //   "folderColorRgb": "my_folderColorRgb",
         *   //   "fullFileExtension": "my_fullFileExtension",
         *   //   "hasAugmentedPermissions": false,
         *   //   "hasThumbnail": false,
         *   //   "headRevisionId": "my_headRevisionId",
         *   //   "iconLink": "my_iconLink",
         *   //   "id": "my_id",
         *   //   "imageMediaMetadata": {},
         *   //   "indexableText": {},
         *   //   "isAppAuthorized": false,
         *   //   "kind": "my_kind",
         *   //   "labels": {},
         *   //   "lastModifyingUser": {},
         *   //   "lastModifyingUserName": "my_lastModifyingUserName",
         *   //   "lastViewedByMeDate": "my_lastViewedByMeDate",
         *   //   "markedViewedByMeDate": "my_markedViewedByMeDate",
         *   //   "md5Checksum": "my_md5Checksum",
         *   //   "mimeType": "my_mimeType",
         *   //   "modifiedByMeDate": "my_modifiedByMeDate",
         *   //   "modifiedDate": "my_modifiedDate",
         *   //   "openWithLinks": {},
         *   //   "originalFilename": "my_originalFilename",
         *   //   "ownedByMe": false,
         *   //   "ownerNames": [],
         *   //   "owners": [],
         *   //   "parents": [],
         *   //   "permissionIds": [],
         *   //   "permissions": [],
         *   //   "properties": [],
         *   //   "quotaBytesUsed": "my_quotaBytesUsed",
         *   //   "selfLink": "my_selfLink",
         *   //   "shareable": false,
         *   //   "shared": false,
         *   //   "sharedWithMeDate": "my_sharedWithMeDate",
         *   //   "sharingUser": {},
         *   //   "shortcutDetails": {},
         *   //   "spaces": [],
         *   //   "teamDriveId": "my_teamDriveId",
         *   //   "thumbnail": {},
         *   //   "thumbnailLink": "my_thumbnailLink",
         *   //   "thumbnailVersion": "my_thumbnailVersion",
         *   //   "title": "my_title",
         *   //   "trashedDate": "my_trashedDate",
         *   //   "trashingUser": {},
         *   //   "userPermission": {},
         *   //   "version": "my_version",
         *   //   "videoMediaMetadata": {},
         *   //   "webContentLink": "my_webContentLink",
         *   //   "webViewLink": "my_webViewLink",
         *   //   "writersCanShare": false
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.files.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.addParents Comma-separated list of parent IDs to add.
         * @param {boolean=} params.convert This parameter is deprecated and has no function.
         * @param {boolean=} params.enforceSingleParent Set to true to opt in to API behavior that aims for all items to have exactly one parent. This parameter only takes effect if the item is not in a shared drive. If the item's owner makes a request to add a single parent, the item is removed from all current folders and placed in the requested folder. Other requests that increase the number of parents fail, except when the canAddMyDriveParent file capability is true and a single parent is being added.
         * @param {string} params.fileId The ID of the file to update.
         * @param {string=} params.modifiedDateBehavior Determines the behavior in which modifiedDate is updated. This overrides setModifiedDate.
         * @param {boolean=} params.newRevision Whether a blob upload should create a new revision. If false, the blob data in the current head revision is replaced. If true or not set, a new blob is created as head revision, and previous unpinned revisions are preserved for a short period of time. Pinned revisions are stored indefinitely, using additional storage quota, up to a maximum of 200 revisions. For details on how revisions are retained, see the Drive Help Center.
         * @param {boolean=} params.ocr Whether to attempt OCR on .jpg, .png, .gif, or .pdf uploads.
         * @param {string=} params.ocrLanguage If ocr is true, hints at the language to use. Valid values are BCP 47 codes.
         * @param {boolean=} params.pinned Whether to pin the new revision. A file can have a maximum of 200 pinned revisions.
         * @param {string=} params.removeParents Comma-separated list of parent IDs to remove.
         * @param {boolean=} params.setModifiedDate Whether to set the modified date using the value supplied in the request body. Setting this field to true is equivalent to modifiedDateBehavior=fromBodyOrNow, and false is equivalent to modifiedDateBehavior=now. To prevent any changes to the modified date set modifiedDateBehavior=noChange.
         * @param {boolean=} params.supportsAllDrives Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         * @param {boolean=} params.supportsTeamDrives Deprecated use supportsAllDrives instead.
         * @param {string=} params.timedTextLanguage The language of the timed text.
         * @param {string=} params.timedTextTrackName The timed text track name.
         * @param {boolean=} params.updateViewedDate Whether to update the view date after successfully updating the file.
         * @param {boolean=} params.useContentAsIndexableText Whether to use the content as indexable text.
         * @param  {object} params.requestBody Media resource metadata
         * @param {object} params.media Media object
         * @param {string} params.media.mimeType Media mime-type
         * @param {string|object} params.media.body Media body contents
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Files$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Files$Update, options?: MethodOptions): GaxiosPromise<Schema$File>;
        update(params: Params$Resource$Files$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Files$Update, options: MethodOptions | BodyResponseCallback<Schema$File>, callback: BodyResponseCallback<Schema$File>): void;
        update(params: Params$Resource$Files$Update, callback: BodyResponseCallback<Schema$File>): void;
        update(callback: BodyResponseCallback<Schema$File>): void;
        /**
         * drive.files.watch
         * @desc Subscribe to changes on a file
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.appdata',
         *       'https://www.googleapis.com/auth/drive.file',
         *       'https://www.googleapis.com/auth/drive.metadata',
         *       'https://www.googleapis.com/auth/drive.metadata.readonly',
         *       'https://www.googleapis.com/auth/drive.photos.readonly',
         *       'https://www.googleapis.com/auth/drive.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.files.watch({
         *     // Whether the user is acknowledging the risk of downloading known malware or other abusive files.
         *     acknowledgeAbuse: 'placeholder-value',
         *     // The ID for the file in question.
         *     fileId: 'placeholder-value',
         *     // This parameter is deprecated and has no function.
         *     projection: 'placeholder-value',
         *     // Specifies the Revision ID that should be downloaded. Ignored unless alt=media is specified.
         *     revisionId: 'placeholder-value',
         *     // Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         *     supportsAllDrives: 'placeholder-value',
         *     // Deprecated use supportsAllDrives instead.
         *     supportsTeamDrives: 'placeholder-value',
         *     // Deprecated: Use files.update with modifiedDateBehavior=noChange, updateViewedDate=true and an empty request body.
         *     updateViewedDate: 'placeholder-value',
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
         * @alias drive.files.watch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {boolean=} params.acknowledgeAbuse Whether the user is acknowledging the risk of downloading known malware or other abusive files.
         * @param {string} params.fileId The ID for the file in question.
         * @param {string=} params.projection This parameter is deprecated and has no function.
         * @param {string=} params.revisionId Specifies the Revision ID that should be downloaded. Ignored unless alt=media is specified.
         * @param {boolean=} params.supportsAllDrives Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         * @param {boolean=} params.supportsTeamDrives Deprecated use supportsAllDrives instead.
         * @param {boolean=} params.updateViewedDate Deprecated: Use files.update with modifiedDateBehavior=noChange, updateViewedDate=true and an empty request body.
         * @param {().Channel} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        watch(params: Params$Resource$Files$Watch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        watch(params?: Params$Resource$Files$Watch, options?: MethodOptions): GaxiosPromise<Schema$Channel>;
        watch(params: Params$Resource$Files$Watch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        watch(params: Params$Resource$Files$Watch, options: MethodOptions | BodyResponseCallback<Schema$Channel>, callback: BodyResponseCallback<Schema$Channel>): void;
        watch(params: Params$Resource$Files$Watch, callback: BodyResponseCallback<Schema$Channel>): void;
        watch(callback: BodyResponseCallback<Schema$Channel>): void;
    }
    export interface Params$Resource$Files$Copy extends StandardParameters {
        /**
         * Whether to convert this file to the corresponding Google Docs format.
         */
        convert?: boolean;
        /**
         * Set to true to opt in to API behavior that aims for all items to have exactly one parent. This parameter only takes effect if the item is not in a shared drive. Requests that specify more than one parent fail.
         */
        enforceSingleParent?: boolean;
        /**
         * The ID of the file to copy.
         */
        fileId?: string;
        /**
         * Whether to attempt OCR on .jpg, .png, .gif, or .pdf uploads.
         */
        ocr?: boolean;
        /**
         * If ocr is true, hints at the language to use. Valid values are BCP 47 codes.
         */
        ocrLanguage?: string;
        /**
         * Whether to pin the head revision of the new copy. A file can have a maximum of 200 pinned revisions.
         */
        pinned?: boolean;
        /**
         * Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         */
        supportsAllDrives?: boolean;
        /**
         * Deprecated use supportsAllDrives instead.
         */
        supportsTeamDrives?: boolean;
        /**
         * The language of the timed text.
         */
        timedTextLanguage?: string;
        /**
         * The timed text track name.
         */
        timedTextTrackName?: string;
        /**
         * The visibility of the new file. This parameter is only relevant when the source is not a native Google Doc and convert=false.
         */
        visibility?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$File;
    }
    export interface Params$Resource$Files$Delete extends StandardParameters {
        /**
         * The ID of the file to delete.
         */
        fileId?: string;
        /**
         * Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         */
        supportsAllDrives?: boolean;
        /**
         * Deprecated use supportsAllDrives instead.
         */
        supportsTeamDrives?: boolean;
    }
    export interface Params$Resource$Files$Emptytrash extends StandardParameters {
    }
    export interface Params$Resource$Files$Export extends StandardParameters {
        /**
         * The ID of the file.
         */
        fileId?: string;
        /**
         * The MIME type of the format requested for this export.
         */
        mimeType?: string;
    }
    export interface Params$Resource$Files$Generateids extends StandardParameters {
        /**
         * Maximum number of IDs to return.
         */
        maxResults?: number;
        /**
         * The space in which the IDs can be used to create new files. Supported values are 'drive' and 'appDataFolder'.
         */
        space?: string;
    }
    export interface Params$Resource$Files$Get extends StandardParameters {
        /**
         * Whether the user is acknowledging the risk of downloading known malware or other abusive files.
         */
        acknowledgeAbuse?: boolean;
        /**
         * The ID for the file in question.
         */
        fileId?: string;
        /**
         * This parameter is deprecated and has no function.
         */
        projection?: string;
        /**
         * Specifies the Revision ID that should be downloaded. Ignored unless alt=media is specified.
         */
        revisionId?: string;
        /**
         * Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         */
        supportsAllDrives?: boolean;
        /**
         * Deprecated use supportsAllDrives instead.
         */
        supportsTeamDrives?: boolean;
        /**
         * Deprecated: Use files.update with modifiedDateBehavior=noChange, updateViewedDate=true and an empty request body.
         */
        updateViewedDate?: boolean;
    }
    export interface Params$Resource$Files$Insert extends StandardParameters {
        /**
         * Whether to convert this file to the corresponding Google Docs format.
         */
        convert?: boolean;
        /**
         * Set to true to opt in to API behavior that aims for all items to have exactly one parent. This parameter only takes effect if the item is not in a shared drive. Requests that specify more than one parent fail.
         */
        enforceSingleParent?: boolean;
        /**
         * Whether to attempt OCR on .jpg, .png, .gif, or .pdf uploads.
         */
        ocr?: boolean;
        /**
         * If ocr is true, hints at the language to use. Valid values are BCP 47 codes.
         */
        ocrLanguage?: string;
        /**
         * Whether to pin the head revision of the uploaded file. A file can have a maximum of 200 pinned revisions.
         */
        pinned?: boolean;
        /**
         * Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         */
        supportsAllDrives?: boolean;
        /**
         * Deprecated use supportsAllDrives instead.
         */
        supportsTeamDrives?: boolean;
        /**
         * The language of the timed text.
         */
        timedTextLanguage?: string;
        /**
         * The timed text track name.
         */
        timedTextTrackName?: string;
        /**
         * Whether to use the content as indexable text.
         */
        useContentAsIndexableText?: boolean;
        /**
         * The visibility of the new file. This parameter is only relevant when convert=false.
         */
        visibility?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$File;
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
    export interface Params$Resource$Files$List extends StandardParameters {
        /**
         * Bodies of items (files/documents) to which the query applies. Supported bodies are 'default', 'domain', 'drive' and 'allDrives'. Prefer 'default' or 'drive' to 'allDrives' for efficiency.
         */
        corpora?: string;
        /**
         * The body of items (files/documents) to which the query applies. Deprecated: use 'corpora' instead.
         */
        corpus?: string;
        /**
         * ID of the shared drive to search.
         */
        driveId?: string;
        /**
         * Deprecated - Whether both My Drive and shared drive items should be included in results. This parameter will only be effective until June 1, 2020. Afterwards shared drive items will be included in the results.
         */
        includeItemsFromAllDrives?: boolean;
        /**
         * Deprecated use includeItemsFromAllDrives instead.
         */
        includeTeamDriveItems?: boolean;
        /**
         * The maximum number of files to return per page. Partial or empty result pages are possible even before the end of the files list has been reached.
         */
        maxResults?: number;
        /**
         * A comma-separated list of sort keys. Valid keys are 'createdDate', 'folder', 'lastViewedByMeDate', 'modifiedByMeDate', 'modifiedDate', 'quotaBytesUsed', 'recency', 'sharedWithMeDate', 'starred', 'title', and 'title_natural'. Each key sorts ascending by default, but may be reversed with the 'desc' modifier. Example usage: ?orderBy=folder,modifiedDate desc,title. Please note that there is a current limitation for users with approximately one million files in which the requested sort order is ignored.
         */
        orderBy?: string;
        /**
         * Page token for files.
         */
        pageToken?: string;
        /**
         * This parameter is deprecated and has no function.
         */
        projection?: string;
        /**
         * Query string for searching files.
         */
        q?: string;
        /**
         * A comma-separated list of spaces to query. Supported values are 'drive', 'appDataFolder' and 'photos'.
         */
        spaces?: string;
        /**
         * Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         */
        supportsAllDrives?: boolean;
        /**
         * Deprecated use supportsAllDrives instead.
         */
        supportsTeamDrives?: boolean;
        /**
         * Deprecated use driveId instead.
         */
        teamDriveId?: string;
    }
    export interface Params$Resource$Files$Patch extends StandardParameters {
        /**
         * Comma-separated list of parent IDs to add.
         */
        addParents?: string;
        /**
         * This parameter is deprecated and has no function.
         */
        convert?: boolean;
        /**
         * Set to true to opt in to API behavior that aims for all items to have exactly one parent. This parameter only takes effect if the item is not in a shared drive. If the item's owner makes a request to add a single parent, the item is removed from all current folders and placed in the requested folder. Other requests that increase the number of parents fail, except when the canAddMyDriveParent file capability is true and a single parent is being added.
         */
        enforceSingleParent?: boolean;
        /**
         * The ID of the file to update.
         */
        fileId?: string;
        /**
         * Determines the behavior in which modifiedDate is updated. This overrides setModifiedDate.
         */
        modifiedDateBehavior?: string;
        /**
         * Whether a blob upload should create a new revision. If false, the blob data in the current head revision is replaced. If true or not set, a new blob is created as head revision, and previous unpinned revisions are preserved for a short period of time. Pinned revisions are stored indefinitely, using additional storage quota, up to a maximum of 200 revisions. For details on how revisions are retained, see the Drive Help Center.
         */
        newRevision?: boolean;
        /**
         * Whether to attempt OCR on .jpg, .png, .gif, or .pdf uploads.
         */
        ocr?: boolean;
        /**
         * If ocr is true, hints at the language to use. Valid values are BCP 47 codes.
         */
        ocrLanguage?: string;
        /**
         * Whether to pin the new revision. A file can have a maximum of 200 pinned revisions.
         */
        pinned?: boolean;
        /**
         * Comma-separated list of parent IDs to remove.
         */
        removeParents?: string;
        /**
         * Whether to set the modified date using the value supplied in the request body. Setting this field to true is equivalent to modifiedDateBehavior=fromBodyOrNow, and false is equivalent to modifiedDateBehavior=now. To prevent any changes to the modified date set modifiedDateBehavior=noChange.
         */
        setModifiedDate?: boolean;
        /**
         * Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         */
        supportsAllDrives?: boolean;
        /**
         * Deprecated use supportsAllDrives instead.
         */
        supportsTeamDrives?: boolean;
        /**
         * The language of the timed text.
         */
        timedTextLanguage?: string;
        /**
         * The timed text track name.
         */
        timedTextTrackName?: string;
        /**
         * Whether to update the view date after successfully updating the file.
         */
        updateViewedDate?: boolean;
        /**
         * Whether to use the content as indexable text.
         */
        useContentAsIndexableText?: boolean;
        /**
         * Request body metadata
         */
        requestBody?: Schema$File;
    }
    export interface Params$Resource$Files$Touch extends StandardParameters {
        /**
         * The ID of the file to update.
         */
        fileId?: string;
        /**
         * Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         */
        supportsAllDrives?: boolean;
        /**
         * Deprecated use supportsAllDrives instead.
         */
        supportsTeamDrives?: boolean;
    }
    export interface Params$Resource$Files$Trash extends StandardParameters {
        /**
         * The ID of the file to trash.
         */
        fileId?: string;
        /**
         * Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         */
        supportsAllDrives?: boolean;
        /**
         * Deprecated use supportsAllDrives instead.
         */
        supportsTeamDrives?: boolean;
    }
    export interface Params$Resource$Files$Untrash extends StandardParameters {
        /**
         * The ID of the file to untrash.
         */
        fileId?: string;
        /**
         * Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         */
        supportsAllDrives?: boolean;
        /**
         * Deprecated use supportsAllDrives instead.
         */
        supportsTeamDrives?: boolean;
    }
    export interface Params$Resource$Files$Update extends StandardParameters {
        /**
         * Comma-separated list of parent IDs to add.
         */
        addParents?: string;
        /**
         * This parameter is deprecated and has no function.
         */
        convert?: boolean;
        /**
         * Set to true to opt in to API behavior that aims for all items to have exactly one parent. This parameter only takes effect if the item is not in a shared drive. If the item's owner makes a request to add a single parent, the item is removed from all current folders and placed in the requested folder. Other requests that increase the number of parents fail, except when the canAddMyDriveParent file capability is true and a single parent is being added.
         */
        enforceSingleParent?: boolean;
        /**
         * The ID of the file to update.
         */
        fileId?: string;
        /**
         * Determines the behavior in which modifiedDate is updated. This overrides setModifiedDate.
         */
        modifiedDateBehavior?: string;
        /**
         * Whether a blob upload should create a new revision. If false, the blob data in the current head revision is replaced. If true or not set, a new blob is created as head revision, and previous unpinned revisions are preserved for a short period of time. Pinned revisions are stored indefinitely, using additional storage quota, up to a maximum of 200 revisions. For details on how revisions are retained, see the Drive Help Center.
         */
        newRevision?: boolean;
        /**
         * Whether to attempt OCR on .jpg, .png, .gif, or .pdf uploads.
         */
        ocr?: boolean;
        /**
         * If ocr is true, hints at the language to use. Valid values are BCP 47 codes.
         */
        ocrLanguage?: string;
        /**
         * Whether to pin the new revision. A file can have a maximum of 200 pinned revisions.
         */
        pinned?: boolean;
        /**
         * Comma-separated list of parent IDs to remove.
         */
        removeParents?: string;
        /**
         * Whether to set the modified date using the value supplied in the request body. Setting this field to true is equivalent to modifiedDateBehavior=fromBodyOrNow, and false is equivalent to modifiedDateBehavior=now. To prevent any changes to the modified date set modifiedDateBehavior=noChange.
         */
        setModifiedDate?: boolean;
        /**
         * Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         */
        supportsAllDrives?: boolean;
        /**
         * Deprecated use supportsAllDrives instead.
         */
        supportsTeamDrives?: boolean;
        /**
         * The language of the timed text.
         */
        timedTextLanguage?: string;
        /**
         * The timed text track name.
         */
        timedTextTrackName?: string;
        /**
         * Whether to update the view date after successfully updating the file.
         */
        updateViewedDate?: boolean;
        /**
         * Whether to use the content as indexable text.
         */
        useContentAsIndexableText?: boolean;
        /**
         * Request body metadata
         */
        requestBody?: Schema$File;
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
    export interface Params$Resource$Files$Watch extends StandardParameters {
        /**
         * Whether the user is acknowledging the risk of downloading known malware or other abusive files.
         */
        acknowledgeAbuse?: boolean;
        /**
         * The ID for the file in question.
         */
        fileId?: string;
        /**
         * This parameter is deprecated and has no function.
         */
        projection?: string;
        /**
         * Specifies the Revision ID that should be downloaded. Ignored unless alt=media is specified.
         */
        revisionId?: string;
        /**
         * Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         */
        supportsAllDrives?: boolean;
        /**
         * Deprecated use supportsAllDrives instead.
         */
        supportsTeamDrives?: boolean;
        /**
         * Deprecated: Use files.update with modifiedDateBehavior=noChange, updateViewedDate=true and an empty request body.
         */
        updateViewedDate?: boolean;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Channel;
    }
    export class Resource$Parents {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * drive.parents.delete
         * @desc Removes a parent from a file.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.file',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.parents.delete({
         *     // Set to true to opt in to API behavior that aims for all items to have exactly one parent. This parameter only takes effect if the item is not in a shared drive. If the item's last parent is removed, the item is placed under its owner's root.
         *     enforceSingleParent: 'placeholder-value',
         *     // The ID of the file.
         *     fileId: 'placeholder-value',
         *     // The ID of the parent.
         *     parentId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.parents.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {boolean=} params.enforceSingleParent Set to true to opt in to API behavior that aims for all items to have exactly one parent. This parameter only takes effect if the item is not in a shared drive. If the item's last parent is removed, the item is placed under its owner's root.
         * @param {string} params.fileId The ID of the file.
         * @param {string} params.parentId The ID of the parent.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Parents$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Parents$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Parents$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Parents$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Parents$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * drive.parents.get
         * @desc Gets a specific parent reference.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.appdata',
         *       'https://www.googleapis.com/auth/drive.file',
         *       'https://www.googleapis.com/auth/drive.metadata',
         *       'https://www.googleapis.com/auth/drive.metadata.readonly',
         *       'https://www.googleapis.com/auth/drive.photos.readonly',
         *       'https://www.googleapis.com/auth/drive.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.parents.get({
         *     // The ID of the file.
         *     fileId: 'placeholder-value',
         *     // The ID of the parent.
         *     parentId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "id": "my_id",
         *   //   "isRoot": false,
         *   //   "kind": "my_kind",
         *   //   "parentLink": "my_parentLink",
         *   //   "selfLink": "my_selfLink"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.parents.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.fileId The ID of the file.
         * @param {string} params.parentId The ID of the parent.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Parents$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Parents$Get, options?: MethodOptions): GaxiosPromise<Schema$ParentReference>;
        get(params: Params$Resource$Parents$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Parents$Get, options: MethodOptions | BodyResponseCallback<Schema$ParentReference>, callback: BodyResponseCallback<Schema$ParentReference>): void;
        get(params: Params$Resource$Parents$Get, callback: BodyResponseCallback<Schema$ParentReference>): void;
        get(callback: BodyResponseCallback<Schema$ParentReference>): void;
        /**
         * drive.parents.insert
         * @desc Adds a parent folder for a file.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.appdata',
         *       'https://www.googleapis.com/auth/drive.file',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.parents.insert({
         *     // Set to true to opt in to API behavior that aims for all items to have exactly one parent. This parameter only takes effect if the item is not in a shared drive. If the child's owner makes the request, the child is removed from all current folders and placed in the requested folder. Any other requests that increase the number of the child's parents fail, except when the canAddMyDriveParent file capability is true and a single parent is being added.
         *     enforceSingleParent: 'placeholder-value',
         *     // The ID of the file.
         *     fileId: 'placeholder-value',
         *     // Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         *     supportsAllDrives: 'placeholder-value',
         *     // Deprecated use supportsAllDrives instead.
         *     supportsTeamDrives: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "id": "my_id",
         *       //   "isRoot": false,
         *       //   "kind": "my_kind",
         *       //   "parentLink": "my_parentLink",
         *       //   "selfLink": "my_selfLink"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "id": "my_id",
         *   //   "isRoot": false,
         *   //   "kind": "my_kind",
         *   //   "parentLink": "my_parentLink",
         *   //   "selfLink": "my_selfLink"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.parents.insert
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {boolean=} params.enforceSingleParent Set to true to opt in to API behavior that aims for all items to have exactly one parent. This parameter only takes effect if the item is not in a shared drive. If the child's owner makes the request, the child is removed from all current folders and placed in the requested folder. Any other requests that increase the number of the child's parents fail, except when the canAddMyDriveParent file capability is true and a single parent is being added.
         * @param {string} params.fileId The ID of the file.
         * @param {boolean=} params.supportsAllDrives Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         * @param {boolean=} params.supportsTeamDrives Deprecated use supportsAllDrives instead.
         * @param {().ParentReference} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        insert(params: Params$Resource$Parents$Insert, options: StreamMethodOptions): GaxiosPromise<Readable>;
        insert(params?: Params$Resource$Parents$Insert, options?: MethodOptions): GaxiosPromise<Schema$ParentReference>;
        insert(params: Params$Resource$Parents$Insert, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        insert(params: Params$Resource$Parents$Insert, options: MethodOptions | BodyResponseCallback<Schema$ParentReference>, callback: BodyResponseCallback<Schema$ParentReference>): void;
        insert(params: Params$Resource$Parents$Insert, callback: BodyResponseCallback<Schema$ParentReference>): void;
        insert(callback: BodyResponseCallback<Schema$ParentReference>): void;
        /**
         * drive.parents.list
         * @desc Lists a file's parents.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.appdata',
         *       'https://www.googleapis.com/auth/drive.file',
         *       'https://www.googleapis.com/auth/drive.metadata',
         *       'https://www.googleapis.com/auth/drive.metadata.readonly',
         *       'https://www.googleapis.com/auth/drive.photos.readonly',
         *       'https://www.googleapis.com/auth/drive.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.parents.list({
         *     // The ID of the file.
         *     fileId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "etag": "my_etag",
         *   //   "items": [],
         *   //   "kind": "my_kind",
         *   //   "selfLink": "my_selfLink"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.parents.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.fileId The ID of the file.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Parents$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Parents$List, options?: MethodOptions): GaxiosPromise<Schema$ParentList>;
        list(params: Params$Resource$Parents$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Parents$List, options: MethodOptions | BodyResponseCallback<Schema$ParentList>, callback: BodyResponseCallback<Schema$ParentList>): void;
        list(params: Params$Resource$Parents$List, callback: BodyResponseCallback<Schema$ParentList>): void;
        list(callback: BodyResponseCallback<Schema$ParentList>): void;
    }
    export interface Params$Resource$Parents$Delete extends StandardParameters {
        /**
         * Set to true to opt in to API behavior that aims for all items to have exactly one parent. This parameter only takes effect if the item is not in a shared drive. If the item's last parent is removed, the item is placed under its owner's root.
         */
        enforceSingleParent?: boolean;
        /**
         * The ID of the file.
         */
        fileId?: string;
        /**
         * The ID of the parent.
         */
        parentId?: string;
    }
    export interface Params$Resource$Parents$Get extends StandardParameters {
        /**
         * The ID of the file.
         */
        fileId?: string;
        /**
         * The ID of the parent.
         */
        parentId?: string;
    }
    export interface Params$Resource$Parents$Insert extends StandardParameters {
        /**
         * Set to true to opt in to API behavior that aims for all items to have exactly one parent. This parameter only takes effect if the item is not in a shared drive. If the child's owner makes the request, the child is removed from all current folders and placed in the requested folder. Any other requests that increase the number of the child's parents fail, except when the canAddMyDriveParent file capability is true and a single parent is being added.
         */
        enforceSingleParent?: boolean;
        /**
         * The ID of the file.
         */
        fileId?: string;
        /**
         * Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         */
        supportsAllDrives?: boolean;
        /**
         * Deprecated use supportsAllDrives instead.
         */
        supportsTeamDrives?: boolean;
        /**
         * Request body metadata
         */
        requestBody?: Schema$ParentReference;
    }
    export interface Params$Resource$Parents$List extends StandardParameters {
        /**
         * The ID of the file.
         */
        fileId?: string;
    }
    export class Resource$Permissions {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * drive.permissions.delete
         * @desc Deletes a permission from a file or shared drive.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.file',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.permissions.delete({
         *     // The ID for the file or shared drive.
         *     fileId: 'placeholder-value',
         *     // The ID for the permission.
         *     permissionId: 'placeholder-value',
         *     // Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         *     supportsAllDrives: 'placeholder-value',
         *     // Deprecated use supportsAllDrives instead.
         *     supportsTeamDrives: 'placeholder-value',
         *     // Issue the request as a domain administrator; if set to true, then the requester will be granted access if the file ID parameter refers to a shared drive and the requester is an administrator of the domain to which the shared drive belongs.
         *     useDomainAdminAccess: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.permissions.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.fileId The ID for the file or shared drive.
         * @param {string} params.permissionId The ID for the permission.
         * @param {boolean=} params.supportsAllDrives Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         * @param {boolean=} params.supportsTeamDrives Deprecated use supportsAllDrives instead.
         * @param {boolean=} params.useDomainAdminAccess Issue the request as a domain administrator; if set to true, then the requester will be granted access if the file ID parameter refers to a shared drive and the requester is an administrator of the domain to which the shared drive belongs.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Permissions$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Permissions$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Permissions$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Permissions$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Permissions$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * drive.permissions.get
         * @desc Gets a permission by ID.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.file',
         *       'https://www.googleapis.com/auth/drive.metadata',
         *       'https://www.googleapis.com/auth/drive.metadata.readonly',
         *       'https://www.googleapis.com/auth/drive.photos.readonly',
         *       'https://www.googleapis.com/auth/drive.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.permissions.get({
         *     // The ID for the file or shared drive.
         *     fileId: 'placeholder-value',
         *     // The ID for the permission.
         *     permissionId: 'placeholder-value',
         *     // Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         *     supportsAllDrives: 'placeholder-value',
         *     // Deprecated use supportsAllDrives instead.
         *     supportsTeamDrives: 'placeholder-value',
         *     // Issue the request as a domain administrator; if set to true, then the requester will be granted access if the file ID parameter refers to a shared drive and the requester is an administrator of the domain to which the shared drive belongs.
         *     useDomainAdminAccess: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "additionalRoles": [],
         *   //   "authKey": "my_authKey",
         *   //   "deleted": false,
         *   //   "domain": "my_domain",
         *   //   "emailAddress": "my_emailAddress",
         *   //   "etag": "my_etag",
         *   //   "expirationDate": "my_expirationDate",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "name": "my_name",
         *   //   "permissionDetails": [],
         *   //   "photoLink": "my_photoLink",
         *   //   "role": "my_role",
         *   //   "selfLink": "my_selfLink",
         *   //   "teamDrivePermissionDetails": [],
         *   //   "type": "my_type",
         *   //   "value": "my_value",
         *   //   "withLink": false
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.permissions.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.fileId The ID for the file or shared drive.
         * @param {string} params.permissionId The ID for the permission.
         * @param {boolean=} params.supportsAllDrives Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         * @param {boolean=} params.supportsTeamDrives Deprecated use supportsAllDrives instead.
         * @param {boolean=} params.useDomainAdminAccess Issue the request as a domain administrator; if set to true, then the requester will be granted access if the file ID parameter refers to a shared drive and the requester is an administrator of the domain to which the shared drive belongs.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Permissions$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Permissions$Get, options?: MethodOptions): GaxiosPromise<Schema$Permission>;
        get(params: Params$Resource$Permissions$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Permissions$Get, options: MethodOptions | BodyResponseCallback<Schema$Permission>, callback: BodyResponseCallback<Schema$Permission>): void;
        get(params: Params$Resource$Permissions$Get, callback: BodyResponseCallback<Schema$Permission>): void;
        get(callback: BodyResponseCallback<Schema$Permission>): void;
        /**
         * drive.permissions.getIdForEmail
         * @desc Returns the permission ID for an email address.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.appdata',
         *       'https://www.googleapis.com/auth/drive.apps.readonly',
         *       'https://www.googleapis.com/auth/drive.file',
         *       'https://www.googleapis.com/auth/drive.metadata',
         *       'https://www.googleapis.com/auth/drive.metadata.readonly',
         *       'https://www.googleapis.com/auth/drive.photos.readonly',
         *       'https://www.googleapis.com/auth/drive.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.permissions.getIdForEmail({
         *     // The email address for which to return a permission ID
         *     email: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "id": "my_id",
         *   //   "kind": "my_kind"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.permissions.getIdForEmail
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.email The email address for which to return a permission ID
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        getIdForEmail(params: Params$Resource$Permissions$Getidforemail, options: StreamMethodOptions): GaxiosPromise<Readable>;
        getIdForEmail(params?: Params$Resource$Permissions$Getidforemail, options?: MethodOptions): GaxiosPromise<Schema$PermissionId>;
        getIdForEmail(params: Params$Resource$Permissions$Getidforemail, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        getIdForEmail(params: Params$Resource$Permissions$Getidforemail, options: MethodOptions | BodyResponseCallback<Schema$PermissionId>, callback: BodyResponseCallback<Schema$PermissionId>): void;
        getIdForEmail(params: Params$Resource$Permissions$Getidforemail, callback: BodyResponseCallback<Schema$PermissionId>): void;
        getIdForEmail(callback: BodyResponseCallback<Schema$PermissionId>): void;
        /**
         * drive.permissions.insert
         * @desc Inserts a permission for a file or shared drive.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.file',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.permissions.insert({
         *     // A plain text custom message to include in notification emails.
         *     emailMessage: 'placeholder-value',
         *     // Set to true to opt in to API behavior that aims for all items to have exactly one parent. This parameter only takes effect if the item is not in a shared drive. See moveToNewOwnersRoot for details.
         *     enforceSingleParent: 'placeholder-value',
         *     // The ID for the file or shared drive.
         *     fileId: 'placeholder-value',
         *     // This parameter only takes effect if the item is not in a shared drive and the request is attempting to transfer the ownership of the item. When set to true, the item will be moved to the new owner's My Drive root folder and all prior parents removed. If set to false, when enforceSingleParent=true, parents are not changed. If set to false, when enforceSingleParent=false, existing parents are not changed; however, the file will be added to the new owner's My Drive root folder, unless it is already in the new owner's My Drive.
         *     moveToNewOwnersRoot: 'placeholder-value',
         *     // Whether to send notification emails when sharing to users or groups. This parameter is ignored and an email is sent if the role is owner.
         *     sendNotificationEmails: 'placeholder-value',
         *     // Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         *     supportsAllDrives: 'placeholder-value',
         *     // Deprecated use supportsAllDrives instead.
         *     supportsTeamDrives: 'placeholder-value',
         *     // Issue the request as a domain administrator; if set to true, then the requester will be granted access if the file ID parameter refers to a shared drive and the requester is an administrator of the domain to which the shared drive belongs.
         *     useDomainAdminAccess: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "additionalRoles": [],
         *       //   "authKey": "my_authKey",
         *       //   "deleted": false,
         *       //   "domain": "my_domain",
         *       //   "emailAddress": "my_emailAddress",
         *       //   "etag": "my_etag",
         *       //   "expirationDate": "my_expirationDate",
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "name": "my_name",
         *       //   "permissionDetails": [],
         *       //   "photoLink": "my_photoLink",
         *       //   "role": "my_role",
         *       //   "selfLink": "my_selfLink",
         *       //   "teamDrivePermissionDetails": [],
         *       //   "type": "my_type",
         *       //   "value": "my_value",
         *       //   "withLink": false
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "additionalRoles": [],
         *   //   "authKey": "my_authKey",
         *   //   "deleted": false,
         *   //   "domain": "my_domain",
         *   //   "emailAddress": "my_emailAddress",
         *   //   "etag": "my_etag",
         *   //   "expirationDate": "my_expirationDate",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "name": "my_name",
         *   //   "permissionDetails": [],
         *   //   "photoLink": "my_photoLink",
         *   //   "role": "my_role",
         *   //   "selfLink": "my_selfLink",
         *   //   "teamDrivePermissionDetails": [],
         *   //   "type": "my_type",
         *   //   "value": "my_value",
         *   //   "withLink": false
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.permissions.insert
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.emailMessage A plain text custom message to include in notification emails.
         * @param {boolean=} params.enforceSingleParent Set to true to opt in to API behavior that aims for all items to have exactly one parent. This parameter only takes effect if the item is not in a shared drive. See moveToNewOwnersRoot for details.
         * @param {string} params.fileId The ID for the file or shared drive.
         * @param {boolean=} params.moveToNewOwnersRoot This parameter only takes effect if the item is not in a shared drive and the request is attempting to transfer the ownership of the item. When set to true, the item will be moved to the new owner's My Drive root folder and all prior parents removed. If set to false, when enforceSingleParent=true, parents are not changed. If set to false, when enforceSingleParent=false, existing parents are not changed; however, the file will be added to the new owner's My Drive root folder, unless it is already in the new owner's My Drive.
         * @param {boolean=} params.sendNotificationEmails Whether to send notification emails when sharing to users or groups. This parameter is ignored and an email is sent if the role is owner.
         * @param {boolean=} params.supportsAllDrives Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         * @param {boolean=} params.supportsTeamDrives Deprecated use supportsAllDrives instead.
         * @param {boolean=} params.useDomainAdminAccess Issue the request as a domain administrator; if set to true, then the requester will be granted access if the file ID parameter refers to a shared drive and the requester is an administrator of the domain to which the shared drive belongs.
         * @param {().Permission} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        insert(params: Params$Resource$Permissions$Insert, options: StreamMethodOptions): GaxiosPromise<Readable>;
        insert(params?: Params$Resource$Permissions$Insert, options?: MethodOptions): GaxiosPromise<Schema$Permission>;
        insert(params: Params$Resource$Permissions$Insert, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        insert(params: Params$Resource$Permissions$Insert, options: MethodOptions | BodyResponseCallback<Schema$Permission>, callback: BodyResponseCallback<Schema$Permission>): void;
        insert(params: Params$Resource$Permissions$Insert, callback: BodyResponseCallback<Schema$Permission>): void;
        insert(callback: BodyResponseCallback<Schema$Permission>): void;
        /**
         * drive.permissions.list
         * @desc Lists a file's or shared drive's permissions.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.file',
         *       'https://www.googleapis.com/auth/drive.metadata',
         *       'https://www.googleapis.com/auth/drive.metadata.readonly',
         *       'https://www.googleapis.com/auth/drive.photos.readonly',
         *       'https://www.googleapis.com/auth/drive.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.permissions.list({
         *     // The ID for the file or shared drive.
         *     fileId: 'placeholder-value',
         *     // The maximum number of permissions to return per page. When not set for files in a shared drive, at most 100 results will be returned. When not set for files that are not in a shared drive, the entire list will be returned.
         *     maxResults: 'placeholder-value',
         *     // The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response.
         *     pageToken: 'placeholder-value',
         *     // Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         *     supportsAllDrives: 'placeholder-value',
         *     // Deprecated use supportsAllDrives instead.
         *     supportsTeamDrives: 'placeholder-value',
         *     // Issue the request as a domain administrator; if set to true, then the requester will be granted access if the file ID parameter refers to a shared drive and the requester is an administrator of the domain to which the shared drive belongs.
         *     useDomainAdminAccess: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "etag": "my_etag",
         *   //   "items": [],
         *   //   "kind": "my_kind",
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "selfLink": "my_selfLink"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.permissions.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.fileId The ID for the file or shared drive.
         * @param {integer=} params.maxResults The maximum number of permissions to return per page. When not set for files in a shared drive, at most 100 results will be returned. When not set for files that are not in a shared drive, the entire list will be returned.
         * @param {string=} params.pageToken The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response.
         * @param {boolean=} params.supportsAllDrives Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         * @param {boolean=} params.supportsTeamDrives Deprecated use supportsAllDrives instead.
         * @param {boolean=} params.useDomainAdminAccess Issue the request as a domain administrator; if set to true, then the requester will be granted access if the file ID parameter refers to a shared drive and the requester is an administrator of the domain to which the shared drive belongs.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Permissions$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Permissions$List, options?: MethodOptions): GaxiosPromise<Schema$PermissionList>;
        list(params: Params$Resource$Permissions$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Permissions$List, options: MethodOptions | BodyResponseCallback<Schema$PermissionList>, callback: BodyResponseCallback<Schema$PermissionList>): void;
        list(params: Params$Resource$Permissions$List, callback: BodyResponseCallback<Schema$PermissionList>): void;
        list(callback: BodyResponseCallback<Schema$PermissionList>): void;
        /**
         * drive.permissions.patch
         * @desc Updates a permission using patch semantics.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.file',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.permissions.patch({
         *     // The ID for the file or shared drive.
         *     fileId: 'placeholder-value',
         *     // The ID for the permission.
         *     permissionId: 'placeholder-value',
         *     // Whether to remove the expiration date.
         *     removeExpiration: 'placeholder-value',
         *     // Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         *     supportsAllDrives: 'placeholder-value',
         *     // Deprecated use supportsAllDrives instead.
         *     supportsTeamDrives: 'placeholder-value',
         *     // Whether changing a role to 'owner' downgrades the current owners to writers. Does nothing if the specified role is not 'owner'.
         *     transferOwnership: 'placeholder-value',
         *     // Issue the request as a domain administrator; if set to true, then the requester will be granted access if the file ID parameter refers to a shared drive and the requester is an administrator of the domain to which the shared drive belongs.
         *     useDomainAdminAccess: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "additionalRoles": [],
         *       //   "authKey": "my_authKey",
         *       //   "deleted": false,
         *       //   "domain": "my_domain",
         *       //   "emailAddress": "my_emailAddress",
         *       //   "etag": "my_etag",
         *       //   "expirationDate": "my_expirationDate",
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "name": "my_name",
         *       //   "permissionDetails": [],
         *       //   "photoLink": "my_photoLink",
         *       //   "role": "my_role",
         *       //   "selfLink": "my_selfLink",
         *       //   "teamDrivePermissionDetails": [],
         *       //   "type": "my_type",
         *       //   "value": "my_value",
         *       //   "withLink": false
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "additionalRoles": [],
         *   //   "authKey": "my_authKey",
         *   //   "deleted": false,
         *   //   "domain": "my_domain",
         *   //   "emailAddress": "my_emailAddress",
         *   //   "etag": "my_etag",
         *   //   "expirationDate": "my_expirationDate",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "name": "my_name",
         *   //   "permissionDetails": [],
         *   //   "photoLink": "my_photoLink",
         *   //   "role": "my_role",
         *   //   "selfLink": "my_selfLink",
         *   //   "teamDrivePermissionDetails": [],
         *   //   "type": "my_type",
         *   //   "value": "my_value",
         *   //   "withLink": false
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.permissions.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.fileId The ID for the file or shared drive.
         * @param {string} params.permissionId The ID for the permission.
         * @param {boolean=} params.removeExpiration Whether to remove the expiration date.
         * @param {boolean=} params.supportsAllDrives Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         * @param {boolean=} params.supportsTeamDrives Deprecated use supportsAllDrives instead.
         * @param {boolean=} params.transferOwnership Whether changing a role to 'owner' downgrades the current owners to writers. Does nothing if the specified role is not 'owner'.
         * @param {boolean=} params.useDomainAdminAccess Issue the request as a domain administrator; if set to true, then the requester will be granted access if the file ID parameter refers to a shared drive and the requester is an administrator of the domain to which the shared drive belongs.
         * @param {().Permission} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Permissions$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Permissions$Patch, options?: MethodOptions): GaxiosPromise<Schema$Permission>;
        patch(params: Params$Resource$Permissions$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Permissions$Patch, options: MethodOptions | BodyResponseCallback<Schema$Permission>, callback: BodyResponseCallback<Schema$Permission>): void;
        patch(params: Params$Resource$Permissions$Patch, callback: BodyResponseCallback<Schema$Permission>): void;
        patch(callback: BodyResponseCallback<Schema$Permission>): void;
        /**
         * drive.permissions.update
         * @desc Updates a permission.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.file',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.permissions.update({
         *     // The ID for the file or shared drive.
         *     fileId: 'placeholder-value',
         *     // The ID for the permission.
         *     permissionId: 'placeholder-value',
         *     // Whether to remove the expiration date.
         *     removeExpiration: 'placeholder-value',
         *     // Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         *     supportsAllDrives: 'placeholder-value',
         *     // Deprecated use supportsAllDrives instead.
         *     supportsTeamDrives: 'placeholder-value',
         *     // Whether changing a role to 'owner' downgrades the current owners to writers. Does nothing if the specified role is not 'owner'.
         *     transferOwnership: 'placeholder-value',
         *     // Issue the request as a domain administrator; if set to true, then the requester will be granted access if the file ID parameter refers to a shared drive and the requester is an administrator of the domain to which the shared drive belongs.
         *     useDomainAdminAccess: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "additionalRoles": [],
         *       //   "authKey": "my_authKey",
         *       //   "deleted": false,
         *       //   "domain": "my_domain",
         *       //   "emailAddress": "my_emailAddress",
         *       //   "etag": "my_etag",
         *       //   "expirationDate": "my_expirationDate",
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "name": "my_name",
         *       //   "permissionDetails": [],
         *       //   "photoLink": "my_photoLink",
         *       //   "role": "my_role",
         *       //   "selfLink": "my_selfLink",
         *       //   "teamDrivePermissionDetails": [],
         *       //   "type": "my_type",
         *       //   "value": "my_value",
         *       //   "withLink": false
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "additionalRoles": [],
         *   //   "authKey": "my_authKey",
         *   //   "deleted": false,
         *   //   "domain": "my_domain",
         *   //   "emailAddress": "my_emailAddress",
         *   //   "etag": "my_etag",
         *   //   "expirationDate": "my_expirationDate",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "name": "my_name",
         *   //   "permissionDetails": [],
         *   //   "photoLink": "my_photoLink",
         *   //   "role": "my_role",
         *   //   "selfLink": "my_selfLink",
         *   //   "teamDrivePermissionDetails": [],
         *   //   "type": "my_type",
         *   //   "value": "my_value",
         *   //   "withLink": false
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.permissions.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.fileId The ID for the file or shared drive.
         * @param {string} params.permissionId The ID for the permission.
         * @param {boolean=} params.removeExpiration Whether to remove the expiration date.
         * @param {boolean=} params.supportsAllDrives Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         * @param {boolean=} params.supportsTeamDrives Deprecated use supportsAllDrives instead.
         * @param {boolean=} params.transferOwnership Whether changing a role to 'owner' downgrades the current owners to writers. Does nothing if the specified role is not 'owner'.
         * @param {boolean=} params.useDomainAdminAccess Issue the request as a domain administrator; if set to true, then the requester will be granted access if the file ID parameter refers to a shared drive and the requester is an administrator of the domain to which the shared drive belongs.
         * @param {().Permission} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Permissions$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Permissions$Update, options?: MethodOptions): GaxiosPromise<Schema$Permission>;
        update(params: Params$Resource$Permissions$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Permissions$Update, options: MethodOptions | BodyResponseCallback<Schema$Permission>, callback: BodyResponseCallback<Schema$Permission>): void;
        update(params: Params$Resource$Permissions$Update, callback: BodyResponseCallback<Schema$Permission>): void;
        update(callback: BodyResponseCallback<Schema$Permission>): void;
    }
    export interface Params$Resource$Permissions$Delete extends StandardParameters {
        /**
         * The ID for the file or shared drive.
         */
        fileId?: string;
        /**
         * The ID for the permission.
         */
        permissionId?: string;
        /**
         * Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         */
        supportsAllDrives?: boolean;
        /**
         * Deprecated use supportsAllDrives instead.
         */
        supportsTeamDrives?: boolean;
        /**
         * Issue the request as a domain administrator; if set to true, then the requester will be granted access if the file ID parameter refers to a shared drive and the requester is an administrator of the domain to which the shared drive belongs.
         */
        useDomainAdminAccess?: boolean;
    }
    export interface Params$Resource$Permissions$Get extends StandardParameters {
        /**
         * The ID for the file or shared drive.
         */
        fileId?: string;
        /**
         * The ID for the permission.
         */
        permissionId?: string;
        /**
         * Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         */
        supportsAllDrives?: boolean;
        /**
         * Deprecated use supportsAllDrives instead.
         */
        supportsTeamDrives?: boolean;
        /**
         * Issue the request as a domain administrator; if set to true, then the requester will be granted access if the file ID parameter refers to a shared drive and the requester is an administrator of the domain to which the shared drive belongs.
         */
        useDomainAdminAccess?: boolean;
    }
    export interface Params$Resource$Permissions$Getidforemail extends StandardParameters {
        /**
         * The email address for which to return a permission ID
         */
        email?: string;
    }
    export interface Params$Resource$Permissions$Insert extends StandardParameters {
        /**
         * A plain text custom message to include in notification emails.
         */
        emailMessage?: string;
        /**
         * Set to true to opt in to API behavior that aims for all items to have exactly one parent. This parameter only takes effect if the item is not in a shared drive. See moveToNewOwnersRoot for details.
         */
        enforceSingleParent?: boolean;
        /**
         * The ID for the file or shared drive.
         */
        fileId?: string;
        /**
         * This parameter only takes effect if the item is not in a shared drive and the request is attempting to transfer the ownership of the item. When set to true, the item will be moved to the new owner's My Drive root folder and all prior parents removed. If set to false, when enforceSingleParent=true, parents are not changed. If set to false, when enforceSingleParent=false, existing parents are not changed; however, the file will be added to the new owner's My Drive root folder, unless it is already in the new owner's My Drive.
         */
        moveToNewOwnersRoot?: boolean;
        /**
         * Whether to send notification emails when sharing to users or groups. This parameter is ignored and an email is sent if the role is owner.
         */
        sendNotificationEmails?: boolean;
        /**
         * Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         */
        supportsAllDrives?: boolean;
        /**
         * Deprecated use supportsAllDrives instead.
         */
        supportsTeamDrives?: boolean;
        /**
         * Issue the request as a domain administrator; if set to true, then the requester will be granted access if the file ID parameter refers to a shared drive and the requester is an administrator of the domain to which the shared drive belongs.
         */
        useDomainAdminAccess?: boolean;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Permission;
    }
    export interface Params$Resource$Permissions$List extends StandardParameters {
        /**
         * The ID for the file or shared drive.
         */
        fileId?: string;
        /**
         * The maximum number of permissions to return per page. When not set for files in a shared drive, at most 100 results will be returned. When not set for files that are not in a shared drive, the entire list will be returned.
         */
        maxResults?: number;
        /**
         * The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response.
         */
        pageToken?: string;
        /**
         * Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         */
        supportsAllDrives?: boolean;
        /**
         * Deprecated use supportsAllDrives instead.
         */
        supportsTeamDrives?: boolean;
        /**
         * Issue the request as a domain administrator; if set to true, then the requester will be granted access if the file ID parameter refers to a shared drive and the requester is an administrator of the domain to which the shared drive belongs.
         */
        useDomainAdminAccess?: boolean;
    }
    export interface Params$Resource$Permissions$Patch extends StandardParameters {
        /**
         * The ID for the file or shared drive.
         */
        fileId?: string;
        /**
         * The ID for the permission.
         */
        permissionId?: string;
        /**
         * Whether to remove the expiration date.
         */
        removeExpiration?: boolean;
        /**
         * Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         */
        supportsAllDrives?: boolean;
        /**
         * Deprecated use supportsAllDrives instead.
         */
        supportsTeamDrives?: boolean;
        /**
         * Whether changing a role to 'owner' downgrades the current owners to writers. Does nothing if the specified role is not 'owner'.
         */
        transferOwnership?: boolean;
        /**
         * Issue the request as a domain administrator; if set to true, then the requester will be granted access if the file ID parameter refers to a shared drive and the requester is an administrator of the domain to which the shared drive belongs.
         */
        useDomainAdminAccess?: boolean;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Permission;
    }
    export interface Params$Resource$Permissions$Update extends StandardParameters {
        /**
         * The ID for the file or shared drive.
         */
        fileId?: string;
        /**
         * The ID for the permission.
         */
        permissionId?: string;
        /**
         * Whether to remove the expiration date.
         */
        removeExpiration?: boolean;
        /**
         * Deprecated - Whether the requesting application supports both My Drives and shared drives. This parameter will only be effective until June 1, 2020. Afterwards all applications are assumed to support shared drives.
         */
        supportsAllDrives?: boolean;
        /**
         * Deprecated use supportsAllDrives instead.
         */
        supportsTeamDrives?: boolean;
        /**
         * Whether changing a role to 'owner' downgrades the current owners to writers. Does nothing if the specified role is not 'owner'.
         */
        transferOwnership?: boolean;
        /**
         * Issue the request as a domain administrator; if set to true, then the requester will be granted access if the file ID parameter refers to a shared drive and the requester is an administrator of the domain to which the shared drive belongs.
         */
        useDomainAdminAccess?: boolean;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Permission;
    }
    export class Resource$Properties {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * drive.properties.delete
         * @desc Deletes a property.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.appdata',
         *       'https://www.googleapis.com/auth/drive.file',
         *       'https://www.googleapis.com/auth/drive.metadata',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.properties.delete({
         *     // The ID of the file.
         *     fileId: 'placeholder-value',
         *     // The key of the property.
         *     propertyKey: 'placeholder-value',
         *     // The visibility of the property.
         *     visibility: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.properties.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.fileId The ID of the file.
         * @param {string} params.propertyKey The key of the property.
         * @param {string=} params.visibility The visibility of the property.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Properties$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Properties$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Properties$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Properties$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Properties$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * drive.properties.get
         * @desc Gets a property by its key.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.appdata',
         *       'https://www.googleapis.com/auth/drive.file',
         *       'https://www.googleapis.com/auth/drive.metadata',
         *       'https://www.googleapis.com/auth/drive.metadata.readonly',
         *       'https://www.googleapis.com/auth/drive.photos.readonly',
         *       'https://www.googleapis.com/auth/drive.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.properties.get({
         *     // The ID of the file.
         *     fileId: 'placeholder-value',
         *     // The key of the property.
         *     propertyKey: 'placeholder-value',
         *     // The visibility of the property.
         *     visibility: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "etag": "my_etag",
         *   //   "key": "my_key",
         *   //   "kind": "my_kind",
         *   //   "selfLink": "my_selfLink",
         *   //   "value": "my_value",
         *   //   "visibility": "my_visibility"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.properties.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.fileId The ID of the file.
         * @param {string} params.propertyKey The key of the property.
         * @param {string=} params.visibility The visibility of the property.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Properties$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Properties$Get, options?: MethodOptions): GaxiosPromise<Schema$Property>;
        get(params: Params$Resource$Properties$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Properties$Get, options: MethodOptions | BodyResponseCallback<Schema$Property>, callback: BodyResponseCallback<Schema$Property>): void;
        get(params: Params$Resource$Properties$Get, callback: BodyResponseCallback<Schema$Property>): void;
        get(callback: BodyResponseCallback<Schema$Property>): void;
        /**
         * drive.properties.insert
         * @desc Adds a property to a file, or updates it if it already exists.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.appdata',
         *       'https://www.googleapis.com/auth/drive.file',
         *       'https://www.googleapis.com/auth/drive.metadata',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.properties.insert({
         *     // The ID of the file.
         *     fileId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "etag": "my_etag",
         *       //   "key": "my_key",
         *       //   "kind": "my_kind",
         *       //   "selfLink": "my_selfLink",
         *       //   "value": "my_value",
         *       //   "visibility": "my_visibility"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "etag": "my_etag",
         *   //   "key": "my_key",
         *   //   "kind": "my_kind",
         *   //   "selfLink": "my_selfLink",
         *   //   "value": "my_value",
         *   //   "visibility": "my_visibility"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.properties.insert
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.fileId The ID of the file.
         * @param {().Property} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        insert(params: Params$Resource$Properties$Insert, options: StreamMethodOptions): GaxiosPromise<Readable>;
        insert(params?: Params$Resource$Properties$Insert, options?: MethodOptions): GaxiosPromise<Schema$Property>;
        insert(params: Params$Resource$Properties$Insert, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        insert(params: Params$Resource$Properties$Insert, options: MethodOptions | BodyResponseCallback<Schema$Property>, callback: BodyResponseCallback<Schema$Property>): void;
        insert(params: Params$Resource$Properties$Insert, callback: BodyResponseCallback<Schema$Property>): void;
        insert(callback: BodyResponseCallback<Schema$Property>): void;
        /**
         * drive.properties.list
         * @desc Lists a file's properties.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.appdata',
         *       'https://www.googleapis.com/auth/drive.file',
         *       'https://www.googleapis.com/auth/drive.metadata',
         *       'https://www.googleapis.com/auth/drive.metadata.readonly',
         *       'https://www.googleapis.com/auth/drive.photos.readonly',
         *       'https://www.googleapis.com/auth/drive.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.properties.list({
         *     // The ID of the file.
         *     fileId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "etag": "my_etag",
         *   //   "items": [],
         *   //   "kind": "my_kind",
         *   //   "selfLink": "my_selfLink"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.properties.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.fileId The ID of the file.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Properties$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Properties$List, options?: MethodOptions): GaxiosPromise<Schema$PropertyList>;
        list(params: Params$Resource$Properties$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Properties$List, options: MethodOptions | BodyResponseCallback<Schema$PropertyList>, callback: BodyResponseCallback<Schema$PropertyList>): void;
        list(params: Params$Resource$Properties$List, callback: BodyResponseCallback<Schema$PropertyList>): void;
        list(callback: BodyResponseCallback<Schema$PropertyList>): void;
        /**
         * drive.properties.patch
         * @desc Updates a property.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.appdata',
         *       'https://www.googleapis.com/auth/drive.file',
         *       'https://www.googleapis.com/auth/drive.metadata',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.properties.patch({
         *     // The ID of the file.
         *     fileId: 'placeholder-value',
         *     // The key of the property.
         *     propertyKey: 'placeholder-value',
         *     // The visibility of the property. Allowed values are PRIVATE and PUBLIC. (Default: PRIVATE)
         *     visibility: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "etag": "my_etag",
         *       //   "key": "my_key",
         *       //   "kind": "my_kind",
         *       //   "selfLink": "my_selfLink",
         *       //   "value": "my_value",
         *       //   "visibility": "my_visibility"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "etag": "my_etag",
         *   //   "key": "my_key",
         *   //   "kind": "my_kind",
         *   //   "selfLink": "my_selfLink",
         *   //   "value": "my_value",
         *   //   "visibility": "my_visibility"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.properties.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.fileId The ID of the file.
         * @param {string} params.propertyKey The key of the property.
         * @param {string=} params.visibility The visibility of the property. Allowed values are PRIVATE and PUBLIC. (Default: PRIVATE)
         * @param {().Property} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Properties$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Properties$Patch, options?: MethodOptions): GaxiosPromise<Schema$Property>;
        patch(params: Params$Resource$Properties$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Properties$Patch, options: MethodOptions | BodyResponseCallback<Schema$Property>, callback: BodyResponseCallback<Schema$Property>): void;
        patch(params: Params$Resource$Properties$Patch, callback: BodyResponseCallback<Schema$Property>): void;
        patch(callback: BodyResponseCallback<Schema$Property>): void;
        /**
         * drive.properties.update
         * @desc Updates a property.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.appdata',
         *       'https://www.googleapis.com/auth/drive.file',
         *       'https://www.googleapis.com/auth/drive.metadata',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.properties.update({
         *     // The ID of the file.
         *     fileId: 'placeholder-value',
         *     // The key of the property.
         *     propertyKey: 'placeholder-value',
         *     // The visibility of the property. Allowed values are PRIVATE and PUBLIC. (Default: PRIVATE)
         *     visibility: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "etag": "my_etag",
         *       //   "key": "my_key",
         *       //   "kind": "my_kind",
         *       //   "selfLink": "my_selfLink",
         *       //   "value": "my_value",
         *       //   "visibility": "my_visibility"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "etag": "my_etag",
         *   //   "key": "my_key",
         *   //   "kind": "my_kind",
         *   //   "selfLink": "my_selfLink",
         *   //   "value": "my_value",
         *   //   "visibility": "my_visibility"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.properties.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.fileId The ID of the file.
         * @param {string} params.propertyKey The key of the property.
         * @param {string=} params.visibility The visibility of the property. Allowed values are PRIVATE and PUBLIC. (Default: PRIVATE)
         * @param {().Property} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Properties$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Properties$Update, options?: MethodOptions): GaxiosPromise<Schema$Property>;
        update(params: Params$Resource$Properties$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Properties$Update, options: MethodOptions | BodyResponseCallback<Schema$Property>, callback: BodyResponseCallback<Schema$Property>): void;
        update(params: Params$Resource$Properties$Update, callback: BodyResponseCallback<Schema$Property>): void;
        update(callback: BodyResponseCallback<Schema$Property>): void;
    }
    export interface Params$Resource$Properties$Delete extends StandardParameters {
        /**
         * The ID of the file.
         */
        fileId?: string;
        /**
         * The key of the property.
         */
        propertyKey?: string;
        /**
         * The visibility of the property.
         */
        visibility?: string;
    }
    export interface Params$Resource$Properties$Get extends StandardParameters {
        /**
         * The ID of the file.
         */
        fileId?: string;
        /**
         * The key of the property.
         */
        propertyKey?: string;
        /**
         * The visibility of the property.
         */
        visibility?: string;
    }
    export interface Params$Resource$Properties$Insert extends StandardParameters {
        /**
         * The ID of the file.
         */
        fileId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Property;
    }
    export interface Params$Resource$Properties$List extends StandardParameters {
        /**
         * The ID of the file.
         */
        fileId?: string;
    }
    export interface Params$Resource$Properties$Patch extends StandardParameters {
        /**
         * The ID of the file.
         */
        fileId?: string;
        /**
         * The key of the property.
         */
        propertyKey?: string;
        /**
         * The visibility of the property. Allowed values are PRIVATE and PUBLIC. (Default: PRIVATE)
         */
        visibility?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Property;
    }
    export interface Params$Resource$Properties$Update extends StandardParameters {
        /**
         * The ID of the file.
         */
        fileId?: string;
        /**
         * The key of the property.
         */
        propertyKey?: string;
        /**
         * The visibility of the property. Allowed values are PRIVATE and PUBLIC. (Default: PRIVATE)
         */
        visibility?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Property;
    }
    export class Resource$Replies {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * drive.replies.delete
         * @desc Deletes a reply.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.file',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.replies.delete({
         *     // The ID of the comment.
         *     commentId: 'placeholder-value',
         *     // The ID of the file.
         *     fileId: 'placeholder-value',
         *     // The ID of the reply.
         *     replyId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.replies.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.commentId The ID of the comment.
         * @param {string} params.fileId The ID of the file.
         * @param {string} params.replyId The ID of the reply.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Replies$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Replies$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Replies$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Replies$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Replies$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * drive.replies.get
         * @desc Gets a reply.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.file',
         *       'https://www.googleapis.com/auth/drive.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.replies.get({
         *     // The ID of the comment.
         *     commentId: 'placeholder-value',
         *     // The ID of the file.
         *     fileId: 'placeholder-value',
         *     // If set, this will succeed when retrieving a deleted reply.
         *     includeDeleted: 'placeholder-value',
         *     // The ID of the reply.
         *     replyId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "author": {},
         *   //   "content": "my_content",
         *   //   "createdDate": "my_createdDate",
         *   //   "deleted": false,
         *   //   "htmlContent": "my_htmlContent",
         *   //   "kind": "my_kind",
         *   //   "modifiedDate": "my_modifiedDate",
         *   //   "replyId": "my_replyId",
         *   //   "verb": "my_verb"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.replies.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.commentId The ID of the comment.
         * @param {string} params.fileId The ID of the file.
         * @param {boolean=} params.includeDeleted If set, this will succeed when retrieving a deleted reply.
         * @param {string} params.replyId The ID of the reply.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Replies$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Replies$Get, options?: MethodOptions): GaxiosPromise<Schema$CommentReply>;
        get(params: Params$Resource$Replies$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Replies$Get, options: MethodOptions | BodyResponseCallback<Schema$CommentReply>, callback: BodyResponseCallback<Schema$CommentReply>): void;
        get(params: Params$Resource$Replies$Get, callback: BodyResponseCallback<Schema$CommentReply>): void;
        get(callback: BodyResponseCallback<Schema$CommentReply>): void;
        /**
         * drive.replies.insert
         * @desc Creates a new reply to the given comment.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.file',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.replies.insert({
         *     // The ID of the comment.
         *     commentId: 'placeholder-value',
         *     // The ID of the file.
         *     fileId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "author": {},
         *       //   "content": "my_content",
         *       //   "createdDate": "my_createdDate",
         *       //   "deleted": false,
         *       //   "htmlContent": "my_htmlContent",
         *       //   "kind": "my_kind",
         *       //   "modifiedDate": "my_modifiedDate",
         *       //   "replyId": "my_replyId",
         *       //   "verb": "my_verb"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "author": {},
         *   //   "content": "my_content",
         *   //   "createdDate": "my_createdDate",
         *   //   "deleted": false,
         *   //   "htmlContent": "my_htmlContent",
         *   //   "kind": "my_kind",
         *   //   "modifiedDate": "my_modifiedDate",
         *   //   "replyId": "my_replyId",
         *   //   "verb": "my_verb"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.replies.insert
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.commentId The ID of the comment.
         * @param {string} params.fileId The ID of the file.
         * @param {().CommentReply} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        insert(params: Params$Resource$Replies$Insert, options: StreamMethodOptions): GaxiosPromise<Readable>;
        insert(params?: Params$Resource$Replies$Insert, options?: MethodOptions): GaxiosPromise<Schema$CommentReply>;
        insert(params: Params$Resource$Replies$Insert, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        insert(params: Params$Resource$Replies$Insert, options: MethodOptions | BodyResponseCallback<Schema$CommentReply>, callback: BodyResponseCallback<Schema$CommentReply>): void;
        insert(params: Params$Resource$Replies$Insert, callback: BodyResponseCallback<Schema$CommentReply>): void;
        insert(callback: BodyResponseCallback<Schema$CommentReply>): void;
        /**
         * drive.replies.list
         * @desc Lists all of the replies to a comment.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.file',
         *       'https://www.googleapis.com/auth/drive.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.replies.list({
         *     // The ID of the comment.
         *     commentId: 'placeholder-value',
         *     // The ID of the file.
         *     fileId: 'placeholder-value',
         *     // If set, all replies, including deleted replies (with content stripped) will be returned.
         *     includeDeleted: 'placeholder-value',
         *     // The maximum number of replies to include in the response, used for paging.
         *     maxResults: 'placeholder-value',
         *     // The continuation token, used to page through large result sets. To get the next page of results, set this parameter to the value of "nextPageToken" from the previous response.
         *     pageToken: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "items": [],
         *   //   "kind": "my_kind",
         *   //   "nextLink": "my_nextLink",
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "selfLink": "my_selfLink"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.replies.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.commentId The ID of the comment.
         * @param {string} params.fileId The ID of the file.
         * @param {boolean=} params.includeDeleted If set, all replies, including deleted replies (with content stripped) will be returned.
         * @param {integer=} params.maxResults The maximum number of replies to include in the response, used for paging.
         * @param {string=} params.pageToken The continuation token, used to page through large result sets. To get the next page of results, set this parameter to the value of "nextPageToken" from the previous response.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Replies$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Replies$List, options?: MethodOptions): GaxiosPromise<Schema$CommentReplyList>;
        list(params: Params$Resource$Replies$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Replies$List, options: MethodOptions | BodyResponseCallback<Schema$CommentReplyList>, callback: BodyResponseCallback<Schema$CommentReplyList>): void;
        list(params: Params$Resource$Replies$List, callback: BodyResponseCallback<Schema$CommentReplyList>): void;
        list(callback: BodyResponseCallback<Schema$CommentReplyList>): void;
        /**
         * drive.replies.patch
         * @desc Updates an existing reply.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.file',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.replies.patch({
         *     // The ID of the comment.
         *     commentId: 'placeholder-value',
         *     // The ID of the file.
         *     fileId: 'placeholder-value',
         *     // The ID of the reply.
         *     replyId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "author": {},
         *       //   "content": "my_content",
         *       //   "createdDate": "my_createdDate",
         *       //   "deleted": false,
         *       //   "htmlContent": "my_htmlContent",
         *       //   "kind": "my_kind",
         *       //   "modifiedDate": "my_modifiedDate",
         *       //   "replyId": "my_replyId",
         *       //   "verb": "my_verb"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "author": {},
         *   //   "content": "my_content",
         *   //   "createdDate": "my_createdDate",
         *   //   "deleted": false,
         *   //   "htmlContent": "my_htmlContent",
         *   //   "kind": "my_kind",
         *   //   "modifiedDate": "my_modifiedDate",
         *   //   "replyId": "my_replyId",
         *   //   "verb": "my_verb"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.replies.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.commentId The ID of the comment.
         * @param {string} params.fileId The ID of the file.
         * @param {string} params.replyId The ID of the reply.
         * @param {().CommentReply} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Replies$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Replies$Patch, options?: MethodOptions): GaxiosPromise<Schema$CommentReply>;
        patch(params: Params$Resource$Replies$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Replies$Patch, options: MethodOptions | BodyResponseCallback<Schema$CommentReply>, callback: BodyResponseCallback<Schema$CommentReply>): void;
        patch(params: Params$Resource$Replies$Patch, callback: BodyResponseCallback<Schema$CommentReply>): void;
        patch(callback: BodyResponseCallback<Schema$CommentReply>): void;
        /**
         * drive.replies.update
         * @desc Updates an existing reply.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.file',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.replies.update({
         *     // The ID of the comment.
         *     commentId: 'placeholder-value',
         *     // The ID of the file.
         *     fileId: 'placeholder-value',
         *     // The ID of the reply.
         *     replyId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "author": {},
         *       //   "content": "my_content",
         *       //   "createdDate": "my_createdDate",
         *       //   "deleted": false,
         *       //   "htmlContent": "my_htmlContent",
         *       //   "kind": "my_kind",
         *       //   "modifiedDate": "my_modifiedDate",
         *       //   "replyId": "my_replyId",
         *       //   "verb": "my_verb"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "author": {},
         *   //   "content": "my_content",
         *   //   "createdDate": "my_createdDate",
         *   //   "deleted": false,
         *   //   "htmlContent": "my_htmlContent",
         *   //   "kind": "my_kind",
         *   //   "modifiedDate": "my_modifiedDate",
         *   //   "replyId": "my_replyId",
         *   //   "verb": "my_verb"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.replies.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.commentId The ID of the comment.
         * @param {string} params.fileId The ID of the file.
         * @param {string} params.replyId The ID of the reply.
         * @param {().CommentReply} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Replies$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Replies$Update, options?: MethodOptions): GaxiosPromise<Schema$CommentReply>;
        update(params: Params$Resource$Replies$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Replies$Update, options: MethodOptions | BodyResponseCallback<Schema$CommentReply>, callback: BodyResponseCallback<Schema$CommentReply>): void;
        update(params: Params$Resource$Replies$Update, callback: BodyResponseCallback<Schema$CommentReply>): void;
        update(callback: BodyResponseCallback<Schema$CommentReply>): void;
    }
    export interface Params$Resource$Replies$Delete extends StandardParameters {
        /**
         * The ID of the comment.
         */
        commentId?: string;
        /**
         * The ID of the file.
         */
        fileId?: string;
        /**
         * The ID of the reply.
         */
        replyId?: string;
    }
    export interface Params$Resource$Replies$Get extends StandardParameters {
        /**
         * The ID of the comment.
         */
        commentId?: string;
        /**
         * The ID of the file.
         */
        fileId?: string;
        /**
         * If set, this will succeed when retrieving a deleted reply.
         */
        includeDeleted?: boolean;
        /**
         * The ID of the reply.
         */
        replyId?: string;
    }
    export interface Params$Resource$Replies$Insert extends StandardParameters {
        /**
         * The ID of the comment.
         */
        commentId?: string;
        /**
         * The ID of the file.
         */
        fileId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$CommentReply;
    }
    export interface Params$Resource$Replies$List extends StandardParameters {
        /**
         * The ID of the comment.
         */
        commentId?: string;
        /**
         * The ID of the file.
         */
        fileId?: string;
        /**
         * If set, all replies, including deleted replies (with content stripped) will be returned.
         */
        includeDeleted?: boolean;
        /**
         * The maximum number of replies to include in the response, used for paging.
         */
        maxResults?: number;
        /**
         * The continuation token, used to page through large result sets. To get the next page of results, set this parameter to the value of "nextPageToken" from the previous response.
         */
        pageToken?: string;
    }
    export interface Params$Resource$Replies$Patch extends StandardParameters {
        /**
         * The ID of the comment.
         */
        commentId?: string;
        /**
         * The ID of the file.
         */
        fileId?: string;
        /**
         * The ID of the reply.
         */
        replyId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$CommentReply;
    }
    export interface Params$Resource$Replies$Update extends StandardParameters {
        /**
         * The ID of the comment.
         */
        commentId?: string;
        /**
         * The ID of the file.
         */
        fileId?: string;
        /**
         * The ID of the reply.
         */
        replyId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$CommentReply;
    }
    export class Resource$Revisions {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * drive.revisions.delete
         * @desc Permanently deletes a file version. You can only delete revisions for files with binary content, like images or videos. Revisions for other files, like Google Docs or Sheets, and the last remaining file version can't be deleted.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.appdata',
         *       'https://www.googleapis.com/auth/drive.file',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.revisions.delete({
         *     // The ID of the file.
         *     fileId: 'placeholder-value',
         *     // The ID of the revision.
         *     revisionId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.revisions.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.fileId The ID of the file.
         * @param {string} params.revisionId The ID of the revision.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Revisions$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Revisions$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Revisions$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Revisions$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Revisions$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * drive.revisions.get
         * @desc Gets a specific revision.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.appdata',
         *       'https://www.googleapis.com/auth/drive.file',
         *       'https://www.googleapis.com/auth/drive.metadata',
         *       'https://www.googleapis.com/auth/drive.metadata.readonly',
         *       'https://www.googleapis.com/auth/drive.photos.readonly',
         *       'https://www.googleapis.com/auth/drive.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.revisions.get({
         *     // The ID of the file.
         *     fileId: 'placeholder-value',
         *     // The ID of the revision.
         *     revisionId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "downloadUrl": "my_downloadUrl",
         *   //   "etag": "my_etag",
         *   //   "exportLinks": {},
         *   //   "fileSize": "my_fileSize",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "lastModifyingUser": {},
         *   //   "lastModifyingUserName": "my_lastModifyingUserName",
         *   //   "md5Checksum": "my_md5Checksum",
         *   //   "mimeType": "my_mimeType",
         *   //   "modifiedDate": "my_modifiedDate",
         *   //   "originalFilename": "my_originalFilename",
         *   //   "pinned": false,
         *   //   "publishAuto": false,
         *   //   "published": false,
         *   //   "publishedLink": "my_publishedLink",
         *   //   "publishedOutsideDomain": false,
         *   //   "selfLink": "my_selfLink"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.revisions.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.fileId The ID of the file.
         * @param {string} params.revisionId The ID of the revision.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Revisions$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Revisions$Get, options?: MethodOptions): GaxiosPromise<Schema$Revision>;
        get(params: Params$Resource$Revisions$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Revisions$Get, options: MethodOptions | BodyResponseCallback<Schema$Revision>, callback: BodyResponseCallback<Schema$Revision>): void;
        get(params: Params$Resource$Revisions$Get, callback: BodyResponseCallback<Schema$Revision>): void;
        get(callback: BodyResponseCallback<Schema$Revision>): void;
        /**
         * drive.revisions.list
         * @desc Lists a file's revisions.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.appdata',
         *       'https://www.googleapis.com/auth/drive.file',
         *       'https://www.googleapis.com/auth/drive.metadata',
         *       'https://www.googleapis.com/auth/drive.metadata.readonly',
         *       'https://www.googleapis.com/auth/drive.photos.readonly',
         *       'https://www.googleapis.com/auth/drive.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.revisions.list({
         *     // The ID of the file.
         *     fileId: 'placeholder-value',
         *     // Maximum number of revisions to return.
         *     maxResults: 'placeholder-value',
         *     // Page token for revisions. To get the next page of results, set this parameter to the value of "nextPageToken" from the previous response.
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
         *   //   "selfLink": "my_selfLink"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.revisions.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.fileId The ID of the file.
         * @param {integer=} params.maxResults Maximum number of revisions to return.
         * @param {string=} params.pageToken Page token for revisions. To get the next page of results, set this parameter to the value of "nextPageToken" from the previous response.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Revisions$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Revisions$List, options?: MethodOptions): GaxiosPromise<Schema$RevisionList>;
        list(params: Params$Resource$Revisions$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Revisions$List, options: MethodOptions | BodyResponseCallback<Schema$RevisionList>, callback: BodyResponseCallback<Schema$RevisionList>): void;
        list(params: Params$Resource$Revisions$List, callback: BodyResponseCallback<Schema$RevisionList>): void;
        list(callback: BodyResponseCallback<Schema$RevisionList>): void;
        /**
         * drive.revisions.patch
         * @desc Updates a revision.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.appdata',
         *       'https://www.googleapis.com/auth/drive.file',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.revisions.patch({
         *     // The ID for the file.
         *     fileId: 'placeholder-value',
         *     // The ID for the revision.
         *     revisionId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "downloadUrl": "my_downloadUrl",
         *       //   "etag": "my_etag",
         *       //   "exportLinks": {},
         *       //   "fileSize": "my_fileSize",
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "lastModifyingUser": {},
         *       //   "lastModifyingUserName": "my_lastModifyingUserName",
         *       //   "md5Checksum": "my_md5Checksum",
         *       //   "mimeType": "my_mimeType",
         *       //   "modifiedDate": "my_modifiedDate",
         *       //   "originalFilename": "my_originalFilename",
         *       //   "pinned": false,
         *       //   "publishAuto": false,
         *       //   "published": false,
         *       //   "publishedLink": "my_publishedLink",
         *       //   "publishedOutsideDomain": false,
         *       //   "selfLink": "my_selfLink"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "downloadUrl": "my_downloadUrl",
         *   //   "etag": "my_etag",
         *   //   "exportLinks": {},
         *   //   "fileSize": "my_fileSize",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "lastModifyingUser": {},
         *   //   "lastModifyingUserName": "my_lastModifyingUserName",
         *   //   "md5Checksum": "my_md5Checksum",
         *   //   "mimeType": "my_mimeType",
         *   //   "modifiedDate": "my_modifiedDate",
         *   //   "originalFilename": "my_originalFilename",
         *   //   "pinned": false,
         *   //   "publishAuto": false,
         *   //   "published": false,
         *   //   "publishedLink": "my_publishedLink",
         *   //   "publishedOutsideDomain": false,
         *   //   "selfLink": "my_selfLink"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.revisions.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.fileId The ID for the file.
         * @param {string} params.revisionId The ID for the revision.
         * @param {().Revision} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Revisions$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Revisions$Patch, options?: MethodOptions): GaxiosPromise<Schema$Revision>;
        patch(params: Params$Resource$Revisions$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Revisions$Patch, options: MethodOptions | BodyResponseCallback<Schema$Revision>, callback: BodyResponseCallback<Schema$Revision>): void;
        patch(params: Params$Resource$Revisions$Patch, callback: BodyResponseCallback<Schema$Revision>): void;
        patch(callback: BodyResponseCallback<Schema$Revision>): void;
        /**
         * drive.revisions.update
         * @desc Updates a revision.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.appdata',
         *       'https://www.googleapis.com/auth/drive.file',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.revisions.update({
         *     // The ID for the file.
         *     fileId: 'placeholder-value',
         *     // The ID for the revision.
         *     revisionId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "downloadUrl": "my_downloadUrl",
         *       //   "etag": "my_etag",
         *       //   "exportLinks": {},
         *       //   "fileSize": "my_fileSize",
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "lastModifyingUser": {},
         *       //   "lastModifyingUserName": "my_lastModifyingUserName",
         *       //   "md5Checksum": "my_md5Checksum",
         *       //   "mimeType": "my_mimeType",
         *       //   "modifiedDate": "my_modifiedDate",
         *       //   "originalFilename": "my_originalFilename",
         *       //   "pinned": false,
         *       //   "publishAuto": false,
         *       //   "published": false,
         *       //   "publishedLink": "my_publishedLink",
         *       //   "publishedOutsideDomain": false,
         *       //   "selfLink": "my_selfLink"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "downloadUrl": "my_downloadUrl",
         *   //   "etag": "my_etag",
         *   //   "exportLinks": {},
         *   //   "fileSize": "my_fileSize",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "lastModifyingUser": {},
         *   //   "lastModifyingUserName": "my_lastModifyingUserName",
         *   //   "md5Checksum": "my_md5Checksum",
         *   //   "mimeType": "my_mimeType",
         *   //   "modifiedDate": "my_modifiedDate",
         *   //   "originalFilename": "my_originalFilename",
         *   //   "pinned": false,
         *   //   "publishAuto": false,
         *   //   "published": false,
         *   //   "publishedLink": "my_publishedLink",
         *   //   "publishedOutsideDomain": false,
         *   //   "selfLink": "my_selfLink"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.revisions.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.fileId The ID for the file.
         * @param {string} params.revisionId The ID for the revision.
         * @param {().Revision} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Revisions$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Revisions$Update, options?: MethodOptions): GaxiosPromise<Schema$Revision>;
        update(params: Params$Resource$Revisions$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Revisions$Update, options: MethodOptions | BodyResponseCallback<Schema$Revision>, callback: BodyResponseCallback<Schema$Revision>): void;
        update(params: Params$Resource$Revisions$Update, callback: BodyResponseCallback<Schema$Revision>): void;
        update(callback: BodyResponseCallback<Schema$Revision>): void;
    }
    export interface Params$Resource$Revisions$Delete extends StandardParameters {
        /**
         * The ID of the file.
         */
        fileId?: string;
        /**
         * The ID of the revision.
         */
        revisionId?: string;
    }
    export interface Params$Resource$Revisions$Get extends StandardParameters {
        /**
         * The ID of the file.
         */
        fileId?: string;
        /**
         * The ID of the revision.
         */
        revisionId?: string;
    }
    export interface Params$Resource$Revisions$List extends StandardParameters {
        /**
         * The ID of the file.
         */
        fileId?: string;
        /**
         * Maximum number of revisions to return.
         */
        maxResults?: number;
        /**
         * Page token for revisions. To get the next page of results, set this parameter to the value of "nextPageToken" from the previous response.
         */
        pageToken?: string;
    }
    export interface Params$Resource$Revisions$Patch extends StandardParameters {
        /**
         * The ID for the file.
         */
        fileId?: string;
        /**
         * The ID for the revision.
         */
        revisionId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Revision;
    }
    export interface Params$Resource$Revisions$Update extends StandardParameters {
        /**
         * The ID for the file.
         */
        fileId?: string;
        /**
         * The ID for the revision.
         */
        revisionId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Revision;
    }
    export class Resource$Teamdrives {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * drive.teamdrives.delete
         * @desc Deprecated use drives.delete instead.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/drive'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.teamdrives.delete({
         *     // The ID of the Team Drive
         *     teamDriveId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.teamdrives.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.teamDriveId The ID of the Team Drive
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Teamdrives$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Teamdrives$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Teamdrives$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Teamdrives$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Teamdrives$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * drive.teamdrives.get
         * @desc Deprecated use drives.get instead.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.teamdrives.get({
         *     // The ID of the Team Drive
         *     teamDriveId: 'placeholder-value',
         *     // Issue the request as a domain administrator; if set to true, then the requester will be granted access if they are an administrator of the domain to which the Team Drive belongs.
         *     useDomainAdminAccess: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "backgroundImageFile": {},
         *   //   "backgroundImageLink": "my_backgroundImageLink",
         *   //   "capabilities": {},
         *   //   "colorRgb": "my_colorRgb",
         *   //   "createdDate": "my_createdDate",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "name": "my_name",
         *   //   "restrictions": {},
         *   //   "themeId": "my_themeId"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.teamdrives.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.teamDriveId The ID of the Team Drive
         * @param {boolean=} params.useDomainAdminAccess Issue the request as a domain administrator; if set to true, then the requester will be granted access if they are an administrator of the domain to which the Team Drive belongs.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Teamdrives$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Teamdrives$Get, options?: MethodOptions): GaxiosPromise<Schema$TeamDrive>;
        get(params: Params$Resource$Teamdrives$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Teamdrives$Get, options: MethodOptions | BodyResponseCallback<Schema$TeamDrive>, callback: BodyResponseCallback<Schema$TeamDrive>): void;
        get(params: Params$Resource$Teamdrives$Get, callback: BodyResponseCallback<Schema$TeamDrive>): void;
        get(callback: BodyResponseCallback<Schema$TeamDrive>): void;
        /**
         * drive.teamdrives.insert
         * @desc Deprecated use drives.insert instead.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/drive'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.teamdrives.insert({
         *     // An ID, such as a random UUID, which uniquely identifies this user's request for idempotent creation of a Team Drive. A repeated request by the same user and with the same request ID will avoid creating duplicates by attempting to create the same Team Drive. If the Team Drive already exists a 409 error will be returned.
         *     requestId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "backgroundImageFile": {},
         *       //   "backgroundImageLink": "my_backgroundImageLink",
         *       //   "capabilities": {},
         *       //   "colorRgb": "my_colorRgb",
         *       //   "createdDate": "my_createdDate",
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "name": "my_name",
         *       //   "restrictions": {},
         *       //   "themeId": "my_themeId"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "backgroundImageFile": {},
         *   //   "backgroundImageLink": "my_backgroundImageLink",
         *   //   "capabilities": {},
         *   //   "colorRgb": "my_colorRgb",
         *   //   "createdDate": "my_createdDate",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "name": "my_name",
         *   //   "restrictions": {},
         *   //   "themeId": "my_themeId"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.teamdrives.insert
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.requestId An ID, such as a random UUID, which uniquely identifies this user's request for idempotent creation of a Team Drive. A repeated request by the same user and with the same request ID will avoid creating duplicates by attempting to create the same Team Drive. If the Team Drive already exists a 409 error will be returned.
         * @param {().TeamDrive} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        insert(params: Params$Resource$Teamdrives$Insert, options: StreamMethodOptions): GaxiosPromise<Readable>;
        insert(params?: Params$Resource$Teamdrives$Insert, options?: MethodOptions): GaxiosPromise<Schema$TeamDrive>;
        insert(params: Params$Resource$Teamdrives$Insert, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        insert(params: Params$Resource$Teamdrives$Insert, options: MethodOptions | BodyResponseCallback<Schema$TeamDrive>, callback: BodyResponseCallback<Schema$TeamDrive>): void;
        insert(params: Params$Resource$Teamdrives$Insert, callback: BodyResponseCallback<Schema$TeamDrive>): void;
        insert(callback: BodyResponseCallback<Schema$TeamDrive>): void;
        /**
         * drive.teamdrives.list
         * @desc Deprecated use drives.list instead.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/drive',
         *       'https://www.googleapis.com/auth/drive.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.teamdrives.list({
         *     // Maximum number of Team Drives to return.
         *     maxResults: 'placeholder-value',
         *     // Page token for Team Drives.
         *     pageToken: 'placeholder-value',
         *     // Query string for searching Team Drives.
         *     q: 'placeholder-value',
         *     // Issue the request as a domain administrator; if set to true, then all Team Drives of the domain in which the requester is an administrator are returned.
         *     useDomainAdminAccess: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
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
         * @alias drive.teamdrives.list
         * @memberOf! ()
         *
         * @param {object=} params Parameters for request
         * @param {integer=} params.maxResults Maximum number of Team Drives to return.
         * @param {string=} params.pageToken Page token for Team Drives.
         * @param {string=} params.q Query string for searching Team Drives.
         * @param {boolean=} params.useDomainAdminAccess Issue the request as a domain administrator; if set to true, then all Team Drives of the domain in which the requester is an administrator are returned.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Teamdrives$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Teamdrives$List, options?: MethodOptions): GaxiosPromise<Schema$TeamDriveList>;
        list(params: Params$Resource$Teamdrives$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Teamdrives$List, options: MethodOptions | BodyResponseCallback<Schema$TeamDriveList>, callback: BodyResponseCallback<Schema$TeamDriveList>): void;
        list(params: Params$Resource$Teamdrives$List, callback: BodyResponseCallback<Schema$TeamDriveList>): void;
        list(callback: BodyResponseCallback<Schema$TeamDriveList>): void;
        /**
         * drive.teamdrives.update
         * @desc Deprecated use drives.update instead.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/drive.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const drive = google.drive('v2');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/drive'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await drive.teamdrives.update({
         *     // The ID of the Team Drive
         *     teamDriveId: 'placeholder-value',
         *     // Issue the request as a domain administrator; if set to true, then the requester will be granted access if they are an administrator of the domain to which the Team Drive belongs.
         *     useDomainAdminAccess: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "backgroundImageFile": {},
         *       //   "backgroundImageLink": "my_backgroundImageLink",
         *       //   "capabilities": {},
         *       //   "colorRgb": "my_colorRgb",
         *       //   "createdDate": "my_createdDate",
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "name": "my_name",
         *       //   "restrictions": {},
         *       //   "themeId": "my_themeId"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "backgroundImageFile": {},
         *   //   "backgroundImageLink": "my_backgroundImageLink",
         *   //   "capabilities": {},
         *   //   "colorRgb": "my_colorRgb",
         *   //   "createdDate": "my_createdDate",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "name": "my_name",
         *   //   "restrictions": {},
         *   //   "themeId": "my_themeId"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias drive.teamdrives.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.teamDriveId The ID of the Team Drive
         * @param {boolean=} params.useDomainAdminAccess Issue the request as a domain administrator; if set to true, then the requester will be granted access if they are an administrator of the domain to which the Team Drive belongs.
         * @param {().TeamDrive} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Teamdrives$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Teamdrives$Update, options?: MethodOptions): GaxiosPromise<Schema$TeamDrive>;
        update(params: Params$Resource$Teamdrives$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Teamdrives$Update, options: MethodOptions | BodyResponseCallback<Schema$TeamDrive>, callback: BodyResponseCallback<Schema$TeamDrive>): void;
        update(params: Params$Resource$Teamdrives$Update, callback: BodyResponseCallback<Schema$TeamDrive>): void;
        update(callback: BodyResponseCallback<Schema$TeamDrive>): void;
    }
    export interface Params$Resource$Teamdrives$Delete extends StandardParameters {
        /**
         * The ID of the Team Drive
         */
        teamDriveId?: string;
    }
    export interface Params$Resource$Teamdrives$Get extends StandardParameters {
        /**
         * The ID of the Team Drive
         */
        teamDriveId?: string;
        /**
         * Issue the request as a domain administrator; if set to true, then the requester will be granted access if they are an administrator of the domain to which the Team Drive belongs.
         */
        useDomainAdminAccess?: boolean;
    }
    export interface Params$Resource$Teamdrives$Insert extends StandardParameters {
        /**
         * An ID, such as a random UUID, which uniquely identifies this user's request for idempotent creation of a Team Drive. A repeated request by the same user and with the same request ID will avoid creating duplicates by attempting to create the same Team Drive. If the Team Drive already exists a 409 error will be returned.
         */
        requestId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$TeamDrive;
    }
    export interface Params$Resource$Teamdrives$List extends StandardParameters {
        /**
         * Maximum number of Team Drives to return.
         */
        maxResults?: number;
        /**
         * Page token for Team Drives.
         */
        pageToken?: string;
        /**
         * Query string for searching Team Drives.
         */
        q?: string;
        /**
         * Issue the request as a domain administrator; if set to true, then all Team Drives of the domain in which the requester is an administrator are returned.
         */
        useDomainAdminAccess?: boolean;
    }
    export interface Params$Resource$Teamdrives$Update extends StandardParameters {
        /**
         * The ID of the Team Drive
         */
        teamDriveId?: string;
        /**
         * Issue the request as a domain administrator; if set to true, then the requester will be granted access if they are an administrator of the domain to which the Team Drive belongs.
         */
        useDomainAdminAccess?: boolean;
        /**
         * Request body metadata
         */
        requestBody?: Schema$TeamDrive;
    }
    export {};
}
