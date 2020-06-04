/// <reference types="node" />
import { OAuth2Client, JWT, Compute, UserRefreshClient, GaxiosPromise, GoogleConfigurable, MethodOptions, StreamMethodOptions, GlobalOptions, GoogleAuth, BodyResponseCallback, APIRequestContext } from 'googleapis-common';
import { Readable } from 'stream';
export declare namespace groupssettings_v1 {
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
     * Groups Settings API
     *
     * Manages permission levels and related settings of a group.
     *
     * @example
     * const {google} = require('googleapis');
     * const groupssettings = google.groupssettings('v1');
     *
     * @namespace groupssettings
     * @type {Function}
     * @version v1
     * @variation v1
     * @param {object=} options Options for Groupssettings
     */
    export class Groupssettings {
        context: APIRequestContext;
        groups: Resource$Groups;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
    }
    /**
     * JSON template for Group resource
     */
    export interface Schema$Groups {
        /**
         * Identifies whether members external to your organization can join the group. Possible values are:   - true: G Suite users external to your organization can become members of this group.  - false: Users not belonging to the organization are not allowed to become members of this group.
         */
        allowExternalMembers?: string | null;
        /**
         * Deprecated. Allows Google to contact administrator of the group.   - true: Allow Google to contact managers of this group. Occasionally Google may send updates on the latest features, ask for input on new features, or ask for permission to highlight your group.  - false: Google can not contact managers of this group.
         */
        allowGoogleCommunication?: string | null;
        /**
         * Allows posting from web. Possible values are:   - true: Allows any member to post to the group forum.  - false: Members only use Gmail to communicate with the group.
         */
        allowWebPosting?: string | null;
        /**
         * Allows the group to be archived only. Possible values are:   - true: Group is archived and the group is inactive. New messages to this group are rejected. The older archived messages are browseable and searchable.   - If true, the whoCanPostMessage property is set to NONE_CAN_POST.   - If reverted from true to false, whoCanPostMessages is set to ALL_MANAGERS_CAN_POST.   - false: The group is active and can receive messages.   - When false, updating whoCanPostMessage to NONE_CAN_POST, results in an error.
         */
        archiveOnly?: string | null;
        /**
         * Set the content of custom footer text. The maximum number of characters is 1,000.
         */
        customFooterText?: string | null;
        /**
         * An email address used when replying to a message if the replyTo property is set to REPLY_TO_CUSTOM. This address is defined by an account administrator.   - When the group&#39;s ReplyTo property is set to REPLY_TO_CUSTOM, the customReplyTo property holds a custom email address used when replying to a message.  - If the group&#39;s ReplyTo property is set to REPLY_TO_CUSTOM, the customReplyTo property must have a text value or an error is returned.
         */
        customReplyTo?: string | null;
        /**
         * Specifies whether the group has a custom role that&#39;s included in one of the settings being merged. This field is read-only and update/patch requests to it are ignored. Possible values are:   - true  - false
         */
        customRolesEnabledForSettingsToBeMerged?: string | null;
        /**
         * When a message is rejected, this is text for the rejection notification sent to the message&#39;s author. By default, this property is empty and has no value in the API&#39;s response body. The maximum notification text size is 10,000 characters. Note: Requires sendMessageDenyNotification property to be true.
         */
        defaultMessageDenyNotificationText?: string | null;
        /**
         * Description of the group. This property value may be an empty string if no group description has been entered. If entered, the maximum group description is no more than 300 characters.
         */
        description?: string | null;
        /**
         * The group&#39;s email address. This property can be updated using the Directory API. Note: Only a group owner can change a group&#39;s email address. A group manager can&#39;t do this. When you change your group&#39;s address using the Directory API or the control panel, you are changing the address your subscribers use to send email and the web address people use to access your group. People can&#39;t reach your group by visiting the old address.
         */
        email?: string | null;
        /**
         * Specifies whether a collaborative inbox will remain turned on for the group. Possible values are:   - true  - false
         */
        enableCollaborativeInbox?: string | null;
        /**
         * Indicates if favorite replies should be displayed above other replies.   - true: Favorite replies will be displayed above other replies.  - false: Favorite replies will not be displayed above other replies.
         */
        favoriteRepliesOnTop?: string | null;
        /**
         * Whether to include custom footer. Possible values are:   - true  - false
         */
        includeCustomFooter?: string | null;
        /**
         * Enables the group to be included in the Global Address List. For more information, see the help center. Possible values are:   - true: Group is included in the Global Address List.  - false: Group is not included in the Global Address List.
         */
        includeInGlobalAddressList?: string | null;
        /**
         * Allows the Group contents to be archived. Possible values are:   - true: Archive messages sent to the group.  - false: Do not keep an archive of messages sent to this group. If false, previously archived messages remain in the archive.
         */
        isArchived?: string | null;
        /**
         * The type of the resource. It is always groupsSettings#groups.
         */
        kind?: string | null;
        /**
         * Deprecated. The maximum size of a message is 25Mb.
         */
        maxMessageBytes?: number | null;
        /**
         * Enables members to post messages as the group. Possible values are:   - true: Group member can post messages using the group&#39;s email address instead of their own email address. Message appear to originate from the group itself. Note: When true, any message moderation settings on individual users or new members do not apply to posts made on behalf of the group.  - false: Members can not post in behalf of the group&#39;s email address.
         */
        membersCanPostAsTheGroup?: string | null;
        /**
         * Deprecated. The default message display font always has a value of &quot;DEFAULT_FONT&quot;.
         */
        messageDisplayFont?: string | null;
        /**
         * Moderation level of incoming messages. Possible values are:   - MODERATE_ALL_MESSAGES: All messages are sent to the group owner&#39;s email address for approval. If approved, the message is sent to the group.  - MODERATE_NON_MEMBERS: All messages from non group members are sent to the group owner&#39;s email address for approval. If approved, the message is sent to the group.  - MODERATE_NEW_MEMBERS: All messages from new members are sent to the group owner&#39;s email address for approval. If approved, the message is sent to the group.  - MODERATE_NONE: No moderator approval is required. Messages are delivered directly to the group. Note: When the whoCanPostMessage is set to ANYONE_CAN_POST, we recommend the messageModerationLevel be set to MODERATE_NON_MEMBERS to protect the group from possible spam. When memberCanPostAsTheGroup is true, any message moderation settings on individual users or new members will not apply to posts made on behalf of the group.
         */
        messageModerationLevel?: string | null;
        /**
         * Name of the group, which has a maximum size of 75 characters.
         */
        name?: string | null;
        /**
         * The primary language for group. For a group&#39;s primary language use the language tags from the G Suite languages found at G Suite Email Settings API Email Language Tags.
         */
        primaryLanguage?: string | null;
        /**
         * Specifies who should the default reply go to. Possible values are:   - REPLY_TO_CUSTOM: For replies to messages, use the group&#39;s custom email address. When the group&#39;s ReplyTo property is set to REPLY_TO_CUSTOM, the customReplyTo property holds the custom email address used when replying to a message. If the group&#39;s ReplyTo property is set to REPLY_TO_CUSTOM, the customReplyTo property must have a value. Otherwise an error is returned.   - REPLY_TO_SENDER: The reply sent to author of message.  - REPLY_TO_LIST: This reply message is sent to the group.  - REPLY_TO_OWNER: The reply is sent to the owner(s) of the group. This does not include the group&#39;s managers.  - REPLY_TO_IGNORE: Group users individually decide where the message reply is sent.  - REPLY_TO_MANAGERS: This reply message is sent to the group&#39;s managers, which includes all managers and the group owner.
         */
        replyTo?: string | null;
        /**
         * Allows a member to be notified if the member&#39;s message to the group is denied by the group owner. Possible values are:   - true: When a message is rejected, send the deny message notification to the message author. The defaultMessageDenyNotificationText property is dependent on the sendMessageDenyNotification property being true.   - false: When a message is rejected, no notification is sent.
         */
        sendMessageDenyNotification?: string | null;
        /**
         * Deprecated. This is merged into the new whoCanDiscoverGroup setting. Allows the group to be visible in the Groups Directory. Possible values are:   - true: All groups in the account are listed in the Groups directory.  - false: All groups in the account are not listed in the directory.
         */
        showInGroupDirectory?: string | null;
        /**
         * Specifies moderation levels for messages detected as spam. Possible values are:   - ALLOW: Post the message to the group.  - MODERATE: Send the message to the moderation queue. This is the default.  - SILENTLY_MODERATE: Send the message to the moderation queue, but do not send notification to moderators.  - REJECT: Immediately reject the message.
         */
        spamModerationLevel?: string | null;
        /**
         * Deprecated. This is merged into the new whoCanModerateMembers setting. Permissions to add members. Possible values are:   - ALL_MEMBERS_CAN_ADD: Managers and members can directly add new members.  - ALL_MANAGERS_CAN_ADD: Only managers can directly add new members. this includes the group&#39;s owner.  - ALL_OWNERS_CAN_ADD: Only owners can directly add new members.  - NONE_CAN_ADD: No one can directly add new members.
         */
        whoCanAdd?: string | null;
        /**
         * Deprecated. This functionality is no longer supported in the Google Groups UI. The value is always &quot;NONE&quot;.
         */
        whoCanAddReferences?: string | null;
        /**
         * Specifies who can approve members who ask to join groups. This permission will be deprecated once it is merged into the new whoCanModerateMembers setting. Possible values are:   - ALL_MEMBERS_CAN_APPROVE  - ALL_MANAGERS_CAN_APPROVE  - ALL_OWNERS_CAN_APPROVE  - NONE_CAN_APPROVE
         */
        whoCanApproveMembers?: string | null;
        /**
         * Deprecated. This is merged into the new whoCanModerateContent setting. Specifies who can approve pending messages in the moderation queue. Possible values are:   - ALL_MEMBERS  - OWNERS_AND_MANAGERS  - OWNERS_ONLY  - NONE
         */
        whoCanApproveMessages?: string | null;
        /**
         * Deprecated. This is merged into the new whoCanAssistContent setting. Permission to assign topics in a forum to another user. Possible values are:   - ALL_MEMBERS  - OWNERS_AND_MANAGERS  - MANAGERS_ONLY  - OWNERS_ONLY  - NONE
         */
        whoCanAssignTopics?: string | null;
        /**
         * Specifies who can moderate metadata. Possible values are:   - ALL_MEMBERS  - OWNERS_AND_MANAGERS  - MANAGERS_ONLY  - OWNERS_ONLY  - NONE
         */
        whoCanAssistContent?: string | null;
        /**
         * Specifies who can deny membership to users. This permission will be deprecated once it is merged into the new whoCanModerateMembers setting. Possible values are:   - ALL_MEMBERS  - OWNERS_AND_MANAGERS  - OWNERS_ONLY  - NONE
         */
        whoCanBanUsers?: string | null;
        /**
         * Permission to contact owner of the group via web UI. Possible values are:   - ALL_IN_DOMAIN_CAN_CONTACT  - ALL_MANAGERS_CAN_CONTACT  - ALL_MEMBERS_CAN_CONTACT  - ANYONE_CAN_CONTACT
         */
        whoCanContactOwner?: string | null;
        /**
         * Deprecated. This is merged into the new whoCanModerateContent setting. Specifies who can delete replies to topics. (Authors can always delete their own posts). Possible values are:   - ALL_MEMBERS  - OWNERS_AND_MANAGERS  - OWNERS_ONLY  - NONE
         */
        whoCanDeleteAnyPost?: string | null;
        /**
         * Deprecated. This is merged into the new whoCanModerateContent setting. Specifies who can delete topics. Possible values are:   - ALL_MEMBERS  - OWNERS_AND_MANAGERS  - OWNERS_ONLY  - NONE
         */
        whoCanDeleteTopics?: string | null;
        /**
         * Specifies the set of users for whom this group is discoverable. Possible values are:   - ANYONE_CAN_DISCOVER  - ALL_IN_DOMAIN_CAN_DISCOVER  - ALL_MEMBERS_CAN_DISCOVER
         */
        whoCanDiscoverGroup?: string | null;
        /**
         * Deprecated. This is merged into the new whoCanAssistContent setting. Permission to enter free form tags for topics in a forum. Possible values are:   - ALL_MEMBERS  - OWNERS_AND_MANAGERS  - MANAGERS_ONLY  - OWNERS_ONLY  - NONE
         */
        whoCanEnterFreeFormTags?: string | null;
        /**
         * Deprecated. This is merged into the new whoCanModerateContent setting. Specifies who can hide posts by reporting them as abuse. Possible values are:   - ALL_MEMBERS  - OWNERS_AND_MANAGERS  - OWNERS_ONLY  - NONE
         */
        whoCanHideAbuse?: string | null;
        /**
         * Deprecated. This is merged into the new whoCanModerateMembers setting. Permissions to invite new members. Possible values are:   - ALL_MEMBERS_CAN_INVITE: Managers and members can invite a new member candidate.  - ALL_MANAGERS_CAN_INVITE: Only managers can invite a new member. This includes the group&#39;s owner.  - ALL_OWNERS_CAN_INVITE: Only owners can invite a new member.  - NONE_CAN_INVITE: No one can invite a new member candidate.
         */
        whoCanInvite?: string | null;
        /**
         * Permission to join group. Possible values are:   - ANYONE_CAN_JOIN: Anyone in the account domain can join. This includes accounts with multiple domains.  - ALL_IN_DOMAIN_CAN_JOIN: Any Internet user who is outside your domain can access your Google Groups service and view the list of groups in your Groups directory. Warning: Group owners can add external addresses, outside of the domain to their groups. They can also allow people outside your domain to join their groups. If you later disable this option, any external addresses already added to users&#39; groups remain in those groups.  - INVITED_CAN_JOIN: Candidates for membership can be invited to join.   - CAN_REQUEST_TO_JOIN: Non members can request an invitation to join.
         */
        whoCanJoin?: string | null;
        /**
         * Permission to leave the group. Possible values are:   - ALL_MANAGERS_CAN_LEAVE  - ALL_MEMBERS_CAN_LEAVE  - NONE_CAN_LEAVE
         */
        whoCanLeaveGroup?: string | null;
        /**
         * Deprecated. This is merged into the new whoCanModerateContent setting. Specifies who can prevent users from posting replies to topics. Possible values are:   - ALL_MEMBERS  - OWNERS_AND_MANAGERS  - OWNERS_ONLY  - NONE
         */
        whoCanLockTopics?: string | null;
        /**
         * Deprecated. This is merged into the new whoCanModerateContent setting. Specifies who can make topics appear at the top of the topic list. Possible values are:   - ALL_MEMBERS  - OWNERS_AND_MANAGERS  - OWNERS_ONLY  - NONE
         */
        whoCanMakeTopicsSticky?: string | null;
        /**
         * Deprecated. This is merged into the new whoCanAssistContent setting. Permission to mark a topic as a duplicate of another topic. Possible values are:   - ALL_MEMBERS  - OWNERS_AND_MANAGERS  - MANAGERS_ONLY  - OWNERS_ONLY  - NONE
         */
        whoCanMarkDuplicate?: string | null;
        /**
         * Deprecated. This is merged into the new whoCanAssistContent setting. Permission to mark any other user&#39;s post as a favorite reply. Possible values are:   - ALL_MEMBERS  - OWNERS_AND_MANAGERS  - MANAGERS_ONLY  - OWNERS_ONLY  - NONE
         */
        whoCanMarkFavoriteReplyOnAnyTopic?: string | null;
        /**
         * Deprecated. This is merged into the new whoCanAssistContent setting. Permission to mark a post for a topic they started as a favorite reply. Possible values are:   - ALL_MEMBERS  - OWNERS_AND_MANAGERS  - MANAGERS_ONLY  - OWNERS_ONLY  - NONE
         */
        whoCanMarkFavoriteReplyOnOwnTopic?: string | null;
        /**
         * Deprecated. This is merged into the new whoCanAssistContent setting. Permission to mark a topic as not needing a response. Possible values are:   - ALL_MEMBERS  - OWNERS_AND_MANAGERS  - MANAGERS_ONLY  - OWNERS_ONLY  - NONE
         */
        whoCanMarkNoResponseNeeded?: string | null;
        /**
         * Specifies who can moderate content. Possible values are:   - ALL_MEMBERS  - OWNERS_AND_MANAGERS  - OWNERS_ONLY  - NONE
         */
        whoCanModerateContent?: string | null;
        /**
         * Specifies who can manage members. Possible values are:   - ALL_MEMBERS  - OWNERS_AND_MANAGERS  - OWNERS_ONLY  - NONE
         */
        whoCanModerateMembers?: string | null;
        /**
         * Deprecated. This is merged into the new whoCanModerateMembers setting. Specifies who can change group members&#39; roles. Possible values are:   - ALL_MEMBERS  - OWNERS_AND_MANAGERS  - OWNERS_ONLY  - NONE
         */
        whoCanModifyMembers?: string | null;
        /**
         * Deprecated. This is merged into the new whoCanAssistContent setting. Permission to change tags and categories. Possible values are:   - ALL_MEMBERS  - OWNERS_AND_MANAGERS  - MANAGERS_ONLY  - OWNERS_ONLY  - NONE
         */
        whoCanModifyTagsAndCategories?: string | null;
        /**
         * Deprecated. This is merged into the new whoCanModerateContent setting. Specifies who can move topics into the group or forum. Possible values are:   - ALL_MEMBERS  - OWNERS_AND_MANAGERS  - OWNERS_ONLY  - NONE
         */
        whoCanMoveTopicsIn?: string | null;
        /**
         * Deprecated. This is merged into the new whoCanModerateContent setting. Specifies who can move topics out of the group or forum. Possible values are:   - ALL_MEMBERS  - OWNERS_AND_MANAGERS  - OWNERS_ONLY  - NONE
         */
        whoCanMoveTopicsOut?: string | null;
        /**
         * Deprecated. This is merged into the new whoCanModerateContent setting. Specifies who can post announcements, a special topic type. Possible values are:   - ALL_MEMBERS  - OWNERS_AND_MANAGERS  - OWNERS_ONLY  - NONE
         */
        whoCanPostAnnouncements?: string | null;
        /**
         * Permissions to post messages. Possible values are:   - NONE_CAN_POST: The group is disabled and archived. No one can post a message to this group.   - When archiveOnly is false, updating whoCanPostMessage to NONE_CAN_POST, results in an error.  - If archiveOnly is reverted from true to false, whoCanPostMessages is set to ALL_MANAGERS_CAN_POST.   - ALL_MANAGERS_CAN_POST: Managers, including group owners, can post messages.  - ALL_MEMBERS_CAN_POST: Any group member can post a message.  - ALL_OWNERS_CAN_POST: Only group owners can post a message.  - ALL_IN_DOMAIN_CAN_POST: Anyone in the account can post a message.   - ANYONE_CAN_POST: Any Internet user who outside your account can access your Google Groups service and post a message. Note: When whoCanPostMessage is set to ANYONE_CAN_POST, we recommend the messageModerationLevel be set to MODERATE_NON_MEMBERS to protect the group from possible spam.
         */
        whoCanPostMessage?: string | null;
        /**
         * Deprecated. This is merged into the new whoCanAssistContent setting. Permission to take topics in a forum. Possible values are:   - ALL_MEMBERS  - OWNERS_AND_MANAGERS  - MANAGERS_ONLY  - OWNERS_ONLY  - NONE
         */
        whoCanTakeTopics?: string | null;
        /**
         * Deprecated. This is merged into the new whoCanAssistContent setting. Permission to unassign any topic in a forum. Possible values are:   - ALL_MEMBERS  - OWNERS_AND_MANAGERS  - MANAGERS_ONLY  - OWNERS_ONLY  - NONE
         */
        whoCanUnassignTopic?: string | null;
        /**
         * Deprecated. This is merged into the new whoCanAssistContent setting. Permission to unmark any post from a favorite reply. Possible values are:   - ALL_MEMBERS  - OWNERS_AND_MANAGERS  - MANAGERS_ONLY  - OWNERS_ONLY  - NONE
         */
        whoCanUnmarkFavoriteReplyOnAnyTopic?: string | null;
        /**
         * Permissions to view group messages. Possible values are:   - ANYONE_CAN_VIEW: Any Internet user can view the group&#39;s messages.   - ALL_IN_DOMAIN_CAN_VIEW: Anyone in your account can view this group&#39;s messages.  - ALL_MEMBERS_CAN_VIEW: All group members can view the group&#39;s messages.  - ALL_MANAGERS_CAN_VIEW: Any group manager can view this group&#39;s messages.
         */
        whoCanViewGroup?: string | null;
        /**
         * Permissions to view membership. Possible values are:   - ALL_IN_DOMAIN_CAN_VIEW: Anyone in the account can view the group members list. If a group already has external members, those members can still send email to this group.   - ALL_MEMBERS_CAN_VIEW: The group members can view the group members list.  - ALL_MANAGERS_CAN_VIEW: The group managers can view group members list.
         */
        whoCanViewMembership?: string | null;
    }
    export class Resource$Groups {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * groupsSettings.groups.get
         * @desc Gets one resource by id.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/groupssettings.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const groupssettings = google.groupssettings('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/apps.groups.settings'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await groupsSettings.groups.get({
         *     // The group's email address.
         *     groupUniqueId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "allowExternalMembers": "my_allowExternalMembers",
         *   //   "allowGoogleCommunication": "my_allowGoogleCommunication",
         *   //   "allowWebPosting": "my_allowWebPosting",
         *   //   "archiveOnly": "my_archiveOnly",
         *   //   "customFooterText": "my_customFooterText",
         *   //   "customReplyTo": "my_customReplyTo",
         *   //   "customRolesEnabledForSettingsToBeMerged": "my_customRolesEnabledForSettingsToBeMerged",
         *   //   "defaultMessageDenyNotificationText": "my_defaultMessageDenyNotificationText",
         *   //   "description": "my_description",
         *   //   "email": "my_email",
         *   //   "enableCollaborativeInbox": "my_enableCollaborativeInbox",
         *   //   "favoriteRepliesOnTop": "my_favoriteRepliesOnTop",
         *   //   "includeCustomFooter": "my_includeCustomFooter",
         *   //   "includeInGlobalAddressList": "my_includeInGlobalAddressList",
         *   //   "isArchived": "my_isArchived",
         *   //   "kind": "my_kind",
         *   //   "maxMessageBytes": 0,
         *   //   "membersCanPostAsTheGroup": "my_membersCanPostAsTheGroup",
         *   //   "messageDisplayFont": "my_messageDisplayFont",
         *   //   "messageModerationLevel": "my_messageModerationLevel",
         *   //   "name": "my_name",
         *   //   "primaryLanguage": "my_primaryLanguage",
         *   //   "replyTo": "my_replyTo",
         *   //   "sendMessageDenyNotification": "my_sendMessageDenyNotification",
         *   //   "showInGroupDirectory": "my_showInGroupDirectory",
         *   //   "spamModerationLevel": "my_spamModerationLevel",
         *   //   "whoCanAdd": "my_whoCanAdd",
         *   //   "whoCanAddReferences": "my_whoCanAddReferences",
         *   //   "whoCanApproveMembers": "my_whoCanApproveMembers",
         *   //   "whoCanApproveMessages": "my_whoCanApproveMessages",
         *   //   "whoCanAssignTopics": "my_whoCanAssignTopics",
         *   //   "whoCanAssistContent": "my_whoCanAssistContent",
         *   //   "whoCanBanUsers": "my_whoCanBanUsers",
         *   //   "whoCanContactOwner": "my_whoCanContactOwner",
         *   //   "whoCanDeleteAnyPost": "my_whoCanDeleteAnyPost",
         *   //   "whoCanDeleteTopics": "my_whoCanDeleteTopics",
         *   //   "whoCanDiscoverGroup": "my_whoCanDiscoverGroup",
         *   //   "whoCanEnterFreeFormTags": "my_whoCanEnterFreeFormTags",
         *   //   "whoCanHideAbuse": "my_whoCanHideAbuse",
         *   //   "whoCanInvite": "my_whoCanInvite",
         *   //   "whoCanJoin": "my_whoCanJoin",
         *   //   "whoCanLeaveGroup": "my_whoCanLeaveGroup",
         *   //   "whoCanLockTopics": "my_whoCanLockTopics",
         *   //   "whoCanMakeTopicsSticky": "my_whoCanMakeTopicsSticky",
         *   //   "whoCanMarkDuplicate": "my_whoCanMarkDuplicate",
         *   //   "whoCanMarkFavoriteReplyOnAnyTopic": "my_whoCanMarkFavoriteReplyOnAnyTopic",
         *   //   "whoCanMarkFavoriteReplyOnOwnTopic": "my_whoCanMarkFavoriteReplyOnOwnTopic",
         *   //   "whoCanMarkNoResponseNeeded": "my_whoCanMarkNoResponseNeeded",
         *   //   "whoCanModerateContent": "my_whoCanModerateContent",
         *   //   "whoCanModerateMembers": "my_whoCanModerateMembers",
         *   //   "whoCanModifyMembers": "my_whoCanModifyMembers",
         *   //   "whoCanModifyTagsAndCategories": "my_whoCanModifyTagsAndCategories",
         *   //   "whoCanMoveTopicsIn": "my_whoCanMoveTopicsIn",
         *   //   "whoCanMoveTopicsOut": "my_whoCanMoveTopicsOut",
         *   //   "whoCanPostAnnouncements": "my_whoCanPostAnnouncements",
         *   //   "whoCanPostMessage": "my_whoCanPostMessage",
         *   //   "whoCanTakeTopics": "my_whoCanTakeTopics",
         *   //   "whoCanUnassignTopic": "my_whoCanUnassignTopic",
         *   //   "whoCanUnmarkFavoriteReplyOnAnyTopic": "my_whoCanUnmarkFavoriteReplyOnAnyTopic",
         *   //   "whoCanViewGroup": "my_whoCanViewGroup",
         *   //   "whoCanViewMembership": "my_whoCanViewMembership"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias groupsSettings.groups.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.groupUniqueId The group's email address.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Groups$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Groups$Get, options?: MethodOptions): GaxiosPromise<Schema$Groups>;
        get(params: Params$Resource$Groups$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Groups$Get, options: MethodOptions | BodyResponseCallback<Schema$Groups>, callback: BodyResponseCallback<Schema$Groups>): void;
        get(params: Params$Resource$Groups$Get, callback: BodyResponseCallback<Schema$Groups>): void;
        get(callback: BodyResponseCallback<Schema$Groups>): void;
        /**
         * groupsSettings.groups.patch
         * @desc Updates an existing resource. This method supports patch semantics.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/groupssettings.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const groupssettings = google.groupssettings('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/apps.groups.settings'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await groupsSettings.groups.patch({
         *     // The group's email address.
         *     groupUniqueId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "allowExternalMembers": "my_allowExternalMembers",
         *       //   "allowGoogleCommunication": "my_allowGoogleCommunication",
         *       //   "allowWebPosting": "my_allowWebPosting",
         *       //   "archiveOnly": "my_archiveOnly",
         *       //   "customFooterText": "my_customFooterText",
         *       //   "customReplyTo": "my_customReplyTo",
         *       //   "customRolesEnabledForSettingsToBeMerged": "my_customRolesEnabledForSettingsToBeMerged",
         *       //   "defaultMessageDenyNotificationText": "my_defaultMessageDenyNotificationText",
         *       //   "description": "my_description",
         *       //   "email": "my_email",
         *       //   "enableCollaborativeInbox": "my_enableCollaborativeInbox",
         *       //   "favoriteRepliesOnTop": "my_favoriteRepliesOnTop",
         *       //   "includeCustomFooter": "my_includeCustomFooter",
         *       //   "includeInGlobalAddressList": "my_includeInGlobalAddressList",
         *       //   "isArchived": "my_isArchived",
         *       //   "kind": "my_kind",
         *       //   "maxMessageBytes": 0,
         *       //   "membersCanPostAsTheGroup": "my_membersCanPostAsTheGroup",
         *       //   "messageDisplayFont": "my_messageDisplayFont",
         *       //   "messageModerationLevel": "my_messageModerationLevel",
         *       //   "name": "my_name",
         *       //   "primaryLanguage": "my_primaryLanguage",
         *       //   "replyTo": "my_replyTo",
         *       //   "sendMessageDenyNotification": "my_sendMessageDenyNotification",
         *       //   "showInGroupDirectory": "my_showInGroupDirectory",
         *       //   "spamModerationLevel": "my_spamModerationLevel",
         *       //   "whoCanAdd": "my_whoCanAdd",
         *       //   "whoCanAddReferences": "my_whoCanAddReferences",
         *       //   "whoCanApproveMembers": "my_whoCanApproveMembers",
         *       //   "whoCanApproveMessages": "my_whoCanApproveMessages",
         *       //   "whoCanAssignTopics": "my_whoCanAssignTopics",
         *       //   "whoCanAssistContent": "my_whoCanAssistContent",
         *       //   "whoCanBanUsers": "my_whoCanBanUsers",
         *       //   "whoCanContactOwner": "my_whoCanContactOwner",
         *       //   "whoCanDeleteAnyPost": "my_whoCanDeleteAnyPost",
         *       //   "whoCanDeleteTopics": "my_whoCanDeleteTopics",
         *       //   "whoCanDiscoverGroup": "my_whoCanDiscoverGroup",
         *       //   "whoCanEnterFreeFormTags": "my_whoCanEnterFreeFormTags",
         *       //   "whoCanHideAbuse": "my_whoCanHideAbuse",
         *       //   "whoCanInvite": "my_whoCanInvite",
         *       //   "whoCanJoin": "my_whoCanJoin",
         *       //   "whoCanLeaveGroup": "my_whoCanLeaveGroup",
         *       //   "whoCanLockTopics": "my_whoCanLockTopics",
         *       //   "whoCanMakeTopicsSticky": "my_whoCanMakeTopicsSticky",
         *       //   "whoCanMarkDuplicate": "my_whoCanMarkDuplicate",
         *       //   "whoCanMarkFavoriteReplyOnAnyTopic": "my_whoCanMarkFavoriteReplyOnAnyTopic",
         *       //   "whoCanMarkFavoriteReplyOnOwnTopic": "my_whoCanMarkFavoriteReplyOnOwnTopic",
         *       //   "whoCanMarkNoResponseNeeded": "my_whoCanMarkNoResponseNeeded",
         *       //   "whoCanModerateContent": "my_whoCanModerateContent",
         *       //   "whoCanModerateMembers": "my_whoCanModerateMembers",
         *       //   "whoCanModifyMembers": "my_whoCanModifyMembers",
         *       //   "whoCanModifyTagsAndCategories": "my_whoCanModifyTagsAndCategories",
         *       //   "whoCanMoveTopicsIn": "my_whoCanMoveTopicsIn",
         *       //   "whoCanMoveTopicsOut": "my_whoCanMoveTopicsOut",
         *       //   "whoCanPostAnnouncements": "my_whoCanPostAnnouncements",
         *       //   "whoCanPostMessage": "my_whoCanPostMessage",
         *       //   "whoCanTakeTopics": "my_whoCanTakeTopics",
         *       //   "whoCanUnassignTopic": "my_whoCanUnassignTopic",
         *       //   "whoCanUnmarkFavoriteReplyOnAnyTopic": "my_whoCanUnmarkFavoriteReplyOnAnyTopic",
         *       //   "whoCanViewGroup": "my_whoCanViewGroup",
         *       //   "whoCanViewMembership": "my_whoCanViewMembership"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "allowExternalMembers": "my_allowExternalMembers",
         *   //   "allowGoogleCommunication": "my_allowGoogleCommunication",
         *   //   "allowWebPosting": "my_allowWebPosting",
         *   //   "archiveOnly": "my_archiveOnly",
         *   //   "customFooterText": "my_customFooterText",
         *   //   "customReplyTo": "my_customReplyTo",
         *   //   "customRolesEnabledForSettingsToBeMerged": "my_customRolesEnabledForSettingsToBeMerged",
         *   //   "defaultMessageDenyNotificationText": "my_defaultMessageDenyNotificationText",
         *   //   "description": "my_description",
         *   //   "email": "my_email",
         *   //   "enableCollaborativeInbox": "my_enableCollaborativeInbox",
         *   //   "favoriteRepliesOnTop": "my_favoriteRepliesOnTop",
         *   //   "includeCustomFooter": "my_includeCustomFooter",
         *   //   "includeInGlobalAddressList": "my_includeInGlobalAddressList",
         *   //   "isArchived": "my_isArchived",
         *   //   "kind": "my_kind",
         *   //   "maxMessageBytes": 0,
         *   //   "membersCanPostAsTheGroup": "my_membersCanPostAsTheGroup",
         *   //   "messageDisplayFont": "my_messageDisplayFont",
         *   //   "messageModerationLevel": "my_messageModerationLevel",
         *   //   "name": "my_name",
         *   //   "primaryLanguage": "my_primaryLanguage",
         *   //   "replyTo": "my_replyTo",
         *   //   "sendMessageDenyNotification": "my_sendMessageDenyNotification",
         *   //   "showInGroupDirectory": "my_showInGroupDirectory",
         *   //   "spamModerationLevel": "my_spamModerationLevel",
         *   //   "whoCanAdd": "my_whoCanAdd",
         *   //   "whoCanAddReferences": "my_whoCanAddReferences",
         *   //   "whoCanApproveMembers": "my_whoCanApproveMembers",
         *   //   "whoCanApproveMessages": "my_whoCanApproveMessages",
         *   //   "whoCanAssignTopics": "my_whoCanAssignTopics",
         *   //   "whoCanAssistContent": "my_whoCanAssistContent",
         *   //   "whoCanBanUsers": "my_whoCanBanUsers",
         *   //   "whoCanContactOwner": "my_whoCanContactOwner",
         *   //   "whoCanDeleteAnyPost": "my_whoCanDeleteAnyPost",
         *   //   "whoCanDeleteTopics": "my_whoCanDeleteTopics",
         *   //   "whoCanDiscoverGroup": "my_whoCanDiscoverGroup",
         *   //   "whoCanEnterFreeFormTags": "my_whoCanEnterFreeFormTags",
         *   //   "whoCanHideAbuse": "my_whoCanHideAbuse",
         *   //   "whoCanInvite": "my_whoCanInvite",
         *   //   "whoCanJoin": "my_whoCanJoin",
         *   //   "whoCanLeaveGroup": "my_whoCanLeaveGroup",
         *   //   "whoCanLockTopics": "my_whoCanLockTopics",
         *   //   "whoCanMakeTopicsSticky": "my_whoCanMakeTopicsSticky",
         *   //   "whoCanMarkDuplicate": "my_whoCanMarkDuplicate",
         *   //   "whoCanMarkFavoriteReplyOnAnyTopic": "my_whoCanMarkFavoriteReplyOnAnyTopic",
         *   //   "whoCanMarkFavoriteReplyOnOwnTopic": "my_whoCanMarkFavoriteReplyOnOwnTopic",
         *   //   "whoCanMarkNoResponseNeeded": "my_whoCanMarkNoResponseNeeded",
         *   //   "whoCanModerateContent": "my_whoCanModerateContent",
         *   //   "whoCanModerateMembers": "my_whoCanModerateMembers",
         *   //   "whoCanModifyMembers": "my_whoCanModifyMembers",
         *   //   "whoCanModifyTagsAndCategories": "my_whoCanModifyTagsAndCategories",
         *   //   "whoCanMoveTopicsIn": "my_whoCanMoveTopicsIn",
         *   //   "whoCanMoveTopicsOut": "my_whoCanMoveTopicsOut",
         *   //   "whoCanPostAnnouncements": "my_whoCanPostAnnouncements",
         *   //   "whoCanPostMessage": "my_whoCanPostMessage",
         *   //   "whoCanTakeTopics": "my_whoCanTakeTopics",
         *   //   "whoCanUnassignTopic": "my_whoCanUnassignTopic",
         *   //   "whoCanUnmarkFavoriteReplyOnAnyTopic": "my_whoCanUnmarkFavoriteReplyOnAnyTopic",
         *   //   "whoCanViewGroup": "my_whoCanViewGroup",
         *   //   "whoCanViewMembership": "my_whoCanViewMembership"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias groupsSettings.groups.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.groupUniqueId The group's email address.
         * @param {().Groups} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Groups$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Groups$Patch, options?: MethodOptions): GaxiosPromise<Schema$Groups>;
        patch(params: Params$Resource$Groups$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Groups$Patch, options: MethodOptions | BodyResponseCallback<Schema$Groups>, callback: BodyResponseCallback<Schema$Groups>): void;
        patch(params: Params$Resource$Groups$Patch, callback: BodyResponseCallback<Schema$Groups>): void;
        patch(callback: BodyResponseCallback<Schema$Groups>): void;
        /**
         * groupsSettings.groups.update
         * @desc Updates an existing resource.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/groupssettings.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const groupssettings = google.groupssettings('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/apps.groups.settings'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await groupsSettings.groups.update({
         *     // The group's email address.
         *     groupUniqueId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "allowExternalMembers": "my_allowExternalMembers",
         *       //   "allowGoogleCommunication": "my_allowGoogleCommunication",
         *       //   "allowWebPosting": "my_allowWebPosting",
         *       //   "archiveOnly": "my_archiveOnly",
         *       //   "customFooterText": "my_customFooterText",
         *       //   "customReplyTo": "my_customReplyTo",
         *       //   "customRolesEnabledForSettingsToBeMerged": "my_customRolesEnabledForSettingsToBeMerged",
         *       //   "defaultMessageDenyNotificationText": "my_defaultMessageDenyNotificationText",
         *       //   "description": "my_description",
         *       //   "email": "my_email",
         *       //   "enableCollaborativeInbox": "my_enableCollaborativeInbox",
         *       //   "favoriteRepliesOnTop": "my_favoriteRepliesOnTop",
         *       //   "includeCustomFooter": "my_includeCustomFooter",
         *       //   "includeInGlobalAddressList": "my_includeInGlobalAddressList",
         *       //   "isArchived": "my_isArchived",
         *       //   "kind": "my_kind",
         *       //   "maxMessageBytes": 0,
         *       //   "membersCanPostAsTheGroup": "my_membersCanPostAsTheGroup",
         *       //   "messageDisplayFont": "my_messageDisplayFont",
         *       //   "messageModerationLevel": "my_messageModerationLevel",
         *       //   "name": "my_name",
         *       //   "primaryLanguage": "my_primaryLanguage",
         *       //   "replyTo": "my_replyTo",
         *       //   "sendMessageDenyNotification": "my_sendMessageDenyNotification",
         *       //   "showInGroupDirectory": "my_showInGroupDirectory",
         *       //   "spamModerationLevel": "my_spamModerationLevel",
         *       //   "whoCanAdd": "my_whoCanAdd",
         *       //   "whoCanAddReferences": "my_whoCanAddReferences",
         *       //   "whoCanApproveMembers": "my_whoCanApproveMembers",
         *       //   "whoCanApproveMessages": "my_whoCanApproveMessages",
         *       //   "whoCanAssignTopics": "my_whoCanAssignTopics",
         *       //   "whoCanAssistContent": "my_whoCanAssistContent",
         *       //   "whoCanBanUsers": "my_whoCanBanUsers",
         *       //   "whoCanContactOwner": "my_whoCanContactOwner",
         *       //   "whoCanDeleteAnyPost": "my_whoCanDeleteAnyPost",
         *       //   "whoCanDeleteTopics": "my_whoCanDeleteTopics",
         *       //   "whoCanDiscoverGroup": "my_whoCanDiscoverGroup",
         *       //   "whoCanEnterFreeFormTags": "my_whoCanEnterFreeFormTags",
         *       //   "whoCanHideAbuse": "my_whoCanHideAbuse",
         *       //   "whoCanInvite": "my_whoCanInvite",
         *       //   "whoCanJoin": "my_whoCanJoin",
         *       //   "whoCanLeaveGroup": "my_whoCanLeaveGroup",
         *       //   "whoCanLockTopics": "my_whoCanLockTopics",
         *       //   "whoCanMakeTopicsSticky": "my_whoCanMakeTopicsSticky",
         *       //   "whoCanMarkDuplicate": "my_whoCanMarkDuplicate",
         *       //   "whoCanMarkFavoriteReplyOnAnyTopic": "my_whoCanMarkFavoriteReplyOnAnyTopic",
         *       //   "whoCanMarkFavoriteReplyOnOwnTopic": "my_whoCanMarkFavoriteReplyOnOwnTopic",
         *       //   "whoCanMarkNoResponseNeeded": "my_whoCanMarkNoResponseNeeded",
         *       //   "whoCanModerateContent": "my_whoCanModerateContent",
         *       //   "whoCanModerateMembers": "my_whoCanModerateMembers",
         *       //   "whoCanModifyMembers": "my_whoCanModifyMembers",
         *       //   "whoCanModifyTagsAndCategories": "my_whoCanModifyTagsAndCategories",
         *       //   "whoCanMoveTopicsIn": "my_whoCanMoveTopicsIn",
         *       //   "whoCanMoveTopicsOut": "my_whoCanMoveTopicsOut",
         *       //   "whoCanPostAnnouncements": "my_whoCanPostAnnouncements",
         *       //   "whoCanPostMessage": "my_whoCanPostMessage",
         *       //   "whoCanTakeTopics": "my_whoCanTakeTopics",
         *       //   "whoCanUnassignTopic": "my_whoCanUnassignTopic",
         *       //   "whoCanUnmarkFavoriteReplyOnAnyTopic": "my_whoCanUnmarkFavoriteReplyOnAnyTopic",
         *       //   "whoCanViewGroup": "my_whoCanViewGroup",
         *       //   "whoCanViewMembership": "my_whoCanViewMembership"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "allowExternalMembers": "my_allowExternalMembers",
         *   //   "allowGoogleCommunication": "my_allowGoogleCommunication",
         *   //   "allowWebPosting": "my_allowWebPosting",
         *   //   "archiveOnly": "my_archiveOnly",
         *   //   "customFooterText": "my_customFooterText",
         *   //   "customReplyTo": "my_customReplyTo",
         *   //   "customRolesEnabledForSettingsToBeMerged": "my_customRolesEnabledForSettingsToBeMerged",
         *   //   "defaultMessageDenyNotificationText": "my_defaultMessageDenyNotificationText",
         *   //   "description": "my_description",
         *   //   "email": "my_email",
         *   //   "enableCollaborativeInbox": "my_enableCollaborativeInbox",
         *   //   "favoriteRepliesOnTop": "my_favoriteRepliesOnTop",
         *   //   "includeCustomFooter": "my_includeCustomFooter",
         *   //   "includeInGlobalAddressList": "my_includeInGlobalAddressList",
         *   //   "isArchived": "my_isArchived",
         *   //   "kind": "my_kind",
         *   //   "maxMessageBytes": 0,
         *   //   "membersCanPostAsTheGroup": "my_membersCanPostAsTheGroup",
         *   //   "messageDisplayFont": "my_messageDisplayFont",
         *   //   "messageModerationLevel": "my_messageModerationLevel",
         *   //   "name": "my_name",
         *   //   "primaryLanguage": "my_primaryLanguage",
         *   //   "replyTo": "my_replyTo",
         *   //   "sendMessageDenyNotification": "my_sendMessageDenyNotification",
         *   //   "showInGroupDirectory": "my_showInGroupDirectory",
         *   //   "spamModerationLevel": "my_spamModerationLevel",
         *   //   "whoCanAdd": "my_whoCanAdd",
         *   //   "whoCanAddReferences": "my_whoCanAddReferences",
         *   //   "whoCanApproveMembers": "my_whoCanApproveMembers",
         *   //   "whoCanApproveMessages": "my_whoCanApproveMessages",
         *   //   "whoCanAssignTopics": "my_whoCanAssignTopics",
         *   //   "whoCanAssistContent": "my_whoCanAssistContent",
         *   //   "whoCanBanUsers": "my_whoCanBanUsers",
         *   //   "whoCanContactOwner": "my_whoCanContactOwner",
         *   //   "whoCanDeleteAnyPost": "my_whoCanDeleteAnyPost",
         *   //   "whoCanDeleteTopics": "my_whoCanDeleteTopics",
         *   //   "whoCanDiscoverGroup": "my_whoCanDiscoverGroup",
         *   //   "whoCanEnterFreeFormTags": "my_whoCanEnterFreeFormTags",
         *   //   "whoCanHideAbuse": "my_whoCanHideAbuse",
         *   //   "whoCanInvite": "my_whoCanInvite",
         *   //   "whoCanJoin": "my_whoCanJoin",
         *   //   "whoCanLeaveGroup": "my_whoCanLeaveGroup",
         *   //   "whoCanLockTopics": "my_whoCanLockTopics",
         *   //   "whoCanMakeTopicsSticky": "my_whoCanMakeTopicsSticky",
         *   //   "whoCanMarkDuplicate": "my_whoCanMarkDuplicate",
         *   //   "whoCanMarkFavoriteReplyOnAnyTopic": "my_whoCanMarkFavoriteReplyOnAnyTopic",
         *   //   "whoCanMarkFavoriteReplyOnOwnTopic": "my_whoCanMarkFavoriteReplyOnOwnTopic",
         *   //   "whoCanMarkNoResponseNeeded": "my_whoCanMarkNoResponseNeeded",
         *   //   "whoCanModerateContent": "my_whoCanModerateContent",
         *   //   "whoCanModerateMembers": "my_whoCanModerateMembers",
         *   //   "whoCanModifyMembers": "my_whoCanModifyMembers",
         *   //   "whoCanModifyTagsAndCategories": "my_whoCanModifyTagsAndCategories",
         *   //   "whoCanMoveTopicsIn": "my_whoCanMoveTopicsIn",
         *   //   "whoCanMoveTopicsOut": "my_whoCanMoveTopicsOut",
         *   //   "whoCanPostAnnouncements": "my_whoCanPostAnnouncements",
         *   //   "whoCanPostMessage": "my_whoCanPostMessage",
         *   //   "whoCanTakeTopics": "my_whoCanTakeTopics",
         *   //   "whoCanUnassignTopic": "my_whoCanUnassignTopic",
         *   //   "whoCanUnmarkFavoriteReplyOnAnyTopic": "my_whoCanUnmarkFavoriteReplyOnAnyTopic",
         *   //   "whoCanViewGroup": "my_whoCanViewGroup",
         *   //   "whoCanViewMembership": "my_whoCanViewMembership"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias groupsSettings.groups.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.groupUniqueId The group's email address.
         * @param {().Groups} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Groups$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Groups$Update, options?: MethodOptions): GaxiosPromise<Schema$Groups>;
        update(params: Params$Resource$Groups$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Groups$Update, options: MethodOptions | BodyResponseCallback<Schema$Groups>, callback: BodyResponseCallback<Schema$Groups>): void;
        update(params: Params$Resource$Groups$Update, callback: BodyResponseCallback<Schema$Groups>): void;
        update(callback: BodyResponseCallback<Schema$Groups>): void;
    }
    export interface Params$Resource$Groups$Get extends StandardParameters {
        /**
         * The group's email address.
         */
        groupUniqueId?: string;
    }
    export interface Params$Resource$Groups$Patch extends StandardParameters {
        /**
         * The group's email address.
         */
        groupUniqueId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Groups;
    }
    export interface Params$Resource$Groups$Update extends StandardParameters {
        /**
         * The group's email address.
         */
        groupUniqueId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Groups;
    }
    export {};
}
