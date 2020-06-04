/// <reference types="node" />
import { OAuth2Client, JWT, Compute, UserRefreshClient, GaxiosPromise, GoogleConfigurable, MethodOptions, StreamMethodOptions, GlobalOptions, GoogleAuth, BodyResponseCallback, APIRequestContext } from 'googleapis-common';
import { Readable } from 'stream';
export declare namespace gmail_v1 {
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
     * Gmail API
     *
     * Access Gmail mailboxes including sending user email.
     *
     * @example
     * const {google} = require('googleapis');
     * const gmail = google.gmail('v1');
     *
     * @namespace gmail
     * @type {Function}
     * @version v1
     * @variation v1
     * @param {object=} options Options for Gmail
     */
    export class Gmail {
        context: APIRequestContext;
        users: Resource$Users;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
    }
    /**
     * Auto-forwarding settings for an account.
     */
    export interface Schema$AutoForwarding {
        /**
         * The state that a message should be left in after it has been forwarded.
         */
        disposition?: string | null;
        /**
         * Email address to which all incoming messages are forwarded. This email address must be a verified member of the forwarding addresses.
         */
        emailAddress?: string | null;
        /**
         * Whether all incoming mail is automatically forwarded to another address.
         */
        enabled?: boolean | null;
    }
    export interface Schema$BatchDeleteMessagesRequest {
        /**
         * The IDs of the messages to delete.
         */
        ids?: string[] | null;
    }
    export interface Schema$BatchModifyMessagesRequest {
        /**
         * A list of label IDs to add to messages.
         */
        addLabelIds?: string[] | null;
        /**
         * The IDs of the messages to modify. There is a limit of 1000 ids per request.
         */
        ids?: string[] | null;
        /**
         * A list of label IDs to remove from messages.
         */
        removeLabelIds?: string[] | null;
    }
    /**
     * Settings for a delegate. Delegates can read, send, and delete messages, as well as view and add contacts, for the delegator&#39;s account. See &quot;Set up mail delegation&quot; for more information about delegates.
     */
    export interface Schema$Delegate {
        /**
         * The email address of the delegate.
         */
        delegateEmail?: string | null;
        /**
         * Indicates whether this address has been verified and can act as a delegate for the account. Read-only.
         */
        verificationStatus?: string | null;
    }
    /**
     * A draft email in the user&#39;s mailbox.
     */
    export interface Schema$Draft {
        /**
         * The immutable ID of the draft.
         */
        id?: string | null;
        /**
         * The message content of the draft.
         */
        message?: Schema$Message;
    }
    /**
     * Resource definition for Gmail filters. Filters apply to specific messages instead of an entire email thread.
     */
    export interface Schema$Filter {
        /**
         * Action that the filter performs.
         */
        action?: Schema$FilterAction;
        /**
         * Matching criteria for the filter.
         */
        criteria?: Schema$FilterCriteria;
        /**
         * The server assigned ID of the filter.
         */
        id?: string | null;
    }
    /**
     * A set of actions to perform on a message.
     */
    export interface Schema$FilterAction {
        /**
         * List of labels to add to the message.
         */
        addLabelIds?: string[] | null;
        /**
         * Email address that the message should be forwarded to.
         */
        forward?: string | null;
        /**
         * List of labels to remove from the message.
         */
        removeLabelIds?: string[] | null;
    }
    /**
     * Message matching criteria.
     */
    export interface Schema$FilterCriteria {
        /**
         * Whether the response should exclude chats.
         */
        excludeChats?: boolean | null;
        /**
         * The sender&#39;s display name or email address.
         */
        from?: string | null;
        /**
         * Whether the message has any attachment.
         */
        hasAttachment?: boolean | null;
        /**
         * Only return messages not matching the specified query. Supports the same query format as the Gmail search box. For example, &quot;from:someuser@example.com rfc822msgid: is:unread&quot;.
         */
        negatedQuery?: string | null;
        /**
         * Only return messages matching the specified query. Supports the same query format as the Gmail search box. For example, &quot;from:someuser@example.com rfc822msgid: is:unread&quot;.
         */
        query?: string | null;
        /**
         * The size of the entire RFC822 message in bytes, including all headers and attachments.
         */
        size?: number | null;
        /**
         * How the message size in bytes should be in relation to the size field.
         */
        sizeComparison?: string | null;
        /**
         * Case-insensitive phrase found in the message&#39;s subject. Trailing and leading whitespace are be trimmed and adjacent spaces are collapsed.
         */
        subject?: string | null;
        /**
         * The recipient&#39;s display name or email address. Includes recipients in the &quot;to&quot;, &quot;cc&quot;, and &quot;bcc&quot; header fields. You can use simply the local part of the email address. For example, &quot;example&quot; and &quot;example@&quot; both match &quot;example@gmail.com&quot;. This field is case-insensitive.
         */
        to?: string | null;
    }
    /**
     * Settings for a forwarding address.
     */
    export interface Schema$ForwardingAddress {
        /**
         * An email address to which messages can be forwarded.
         */
        forwardingEmail?: string | null;
        /**
         * Indicates whether this address has been verified and is usable for forwarding. Read-only.
         */
        verificationStatus?: string | null;
    }
    /**
     * A record of a change to the user&#39;s mailbox. Each history change may affect multiple messages in multiple ways.
     */
    export interface Schema$History {
        /**
         * The mailbox sequence ID.
         */
        id?: string | null;
        /**
         * Labels added to messages in this history record.
         */
        labelsAdded?: Schema$HistoryLabelAdded[];
        /**
         * Labels removed from messages in this history record.
         */
        labelsRemoved?: Schema$HistoryLabelRemoved[];
        /**
         * List of messages changed in this history record. The fields for specific change types, such as messagesAdded may duplicate messages in this field. We recommend using the specific change-type fields instead of this.
         */
        messages?: Schema$Message[];
        /**
         * Messages added to the mailbox in this history record.
         */
        messagesAdded?: Schema$HistoryMessageAdded[];
        /**
         * Messages deleted (not Trashed) from the mailbox in this history record.
         */
        messagesDeleted?: Schema$HistoryMessageDeleted[];
    }
    export interface Schema$HistoryLabelAdded {
        /**
         * Label IDs added to the message.
         */
        labelIds?: string[] | null;
        message?: Schema$Message;
    }
    export interface Schema$HistoryLabelRemoved {
        /**
         * Label IDs removed from the message.
         */
        labelIds?: string[] | null;
        message?: Schema$Message;
    }
    export interface Schema$HistoryMessageAdded {
        message?: Schema$Message;
    }
    export interface Schema$HistoryMessageDeleted {
        message?: Schema$Message;
    }
    /**
     * IMAP settings for an account.
     */
    export interface Schema$ImapSettings {
        /**
         * If this value is true, Gmail will immediately expunge a message when it is marked as deleted in IMAP. Otherwise, Gmail will wait for an update from the client before expunging messages marked as deleted.
         */
        autoExpunge?: boolean | null;
        /**
         * Whether IMAP is enabled for the account.
         */
        enabled?: boolean | null;
        /**
         * The action that will be executed on a message when it is marked as deleted and expunged from the last visible IMAP folder.
         */
        expungeBehavior?: string | null;
        /**
         * An optional limit on the number of messages that an IMAP folder may contain. Legal values are 0, 1000, 2000, 5000 or 10000. A value of zero is interpreted to mean that there is no limit.
         */
        maxFolderSize?: number | null;
    }
    /**
     * Labels are used to categorize messages and threads within the user&#39;s mailbox.
     */
    export interface Schema$Label {
        /**
         * The color to assign to the label. Color is only available for labels that have their type set to user.
         */
        color?: Schema$LabelColor;
        /**
         * The immutable ID of the label.
         */
        id?: string | null;
        /**
         * The visibility of the label in the label list in the Gmail web interface.
         */
        labelListVisibility?: string | null;
        /**
         * The visibility of the label in the message list in the Gmail web interface.
         */
        messageListVisibility?: string | null;
        /**
         * The total number of messages with the label.
         */
        messagesTotal?: number | null;
        /**
         * The number of unread messages with the label.
         */
        messagesUnread?: number | null;
        /**
         * The display name of the label.
         */
        name?: string | null;
        /**
         * The total number of threads with the label.
         */
        threadsTotal?: number | null;
        /**
         * The number of unread threads with the label.
         */
        threadsUnread?: number | null;
        /**
         * The owner type for the label. User labels are created by the user and can be modified and deleted by the user and can be applied to any message or thread. System labels are internally created and cannot be added, modified, or deleted. System labels may be able to be applied to or removed from messages and threads under some circumstances but this is not guaranteed. For example, users can apply and remove the INBOX and UNREAD labels from messages and threads, but cannot apply or remove the DRAFTS or SENT labels from messages or threads.
         */
        type?: string | null;
    }
    export interface Schema$LabelColor {
        /**
         * The background color represented as hex string #RRGGBB (ex #000000). This field is required in order to set the color of a label. Only the following predefined set of color values are allowed: #000000, #434343, #666666, #999999, #cccccc, #efefef, #f3f3f3, #ffffff, #fb4c2f, #ffad47, #fad165, #16a766, #43d692, #4a86e8, #a479e2, #f691b3, #f6c5be, #ffe6c7, #fef1d1, #b9e4d0, #c6f3de, #c9daf8, #e4d7f5, #fcdee8, #efa093, #ffd6a2, #fce8b3, #89d3b2, #a0eac9, #a4c2f4, #d0bcf1, #fbc8d9, #e66550, #ffbc6b, #fcda83, #44b984, #68dfa9, #6d9eeb, #b694e8, #f7a7c0, #cc3a21, #eaa041, #f2c960, #149e60, #3dc789, #3c78d8, #8e63ce, #e07798, #ac2b16, #cf8933, #d5ae49, #0b804b, #2a9c68, #285bac, #653e9b, #b65775, #822111, #a46a21, #aa8831, #076239, #1a764d, #1c4587, #41236d, #83334c #464646, #e7e7e7, #0d3472, #b6cff5, #0d3b44, #98d7e4, #3d188e, #e3d7ff, #711a36, #fbd3e0, #8a1c0a, #f2b2a8, #7a2e0b, #ffc8af, #7a4706, #ffdeb5, #594c05, #fbe983, #684e07, #fdedc1, #0b4f30, #b3efd3, #04502e, #a2dcc1, #c2c2c2, #4986e7, #2da2bb, #b99aff, #994a64, #f691b2, #ff7537, #ffad46, #662e37, #ebdbde, #cca6ac, #094228, #42d692, #16a765
         */
        backgroundColor?: string | null;
        /**
         * The text color of the label, represented as hex string. This field is required in order to set the color of a label. Only the following predefined set of color values are allowed: #000000, #434343, #666666, #999999, #cccccc, #efefef, #f3f3f3, #ffffff, #fb4c2f, #ffad47, #fad165, #16a766, #43d692, #4a86e8, #a479e2, #f691b3, #f6c5be, #ffe6c7, #fef1d1, #b9e4d0, #c6f3de, #c9daf8, #e4d7f5, #fcdee8, #efa093, #ffd6a2, #fce8b3, #89d3b2, #a0eac9, #a4c2f4, #d0bcf1, #fbc8d9, #e66550, #ffbc6b, #fcda83, #44b984, #68dfa9, #6d9eeb, #b694e8, #f7a7c0, #cc3a21, #eaa041, #f2c960, #149e60, #3dc789, #3c78d8, #8e63ce, #e07798, #ac2b16, #cf8933, #d5ae49, #0b804b, #2a9c68, #285bac, #653e9b, #b65775, #822111, #a46a21, #aa8831, #076239, #1a764d, #1c4587, #41236d, #83334c #464646, #e7e7e7, #0d3472, #b6cff5, #0d3b44, #98d7e4, #3d188e, #e3d7ff, #711a36, #fbd3e0, #8a1c0a, #f2b2a8, #7a2e0b, #ffc8af, #7a4706, #ffdeb5, #594c05, #fbe983, #684e07, #fdedc1, #0b4f30, #b3efd3, #04502e, #a2dcc1, #c2c2c2, #4986e7, #2da2bb, #b99aff, #994a64, #f691b2, #ff7537, #ffad46, #662e37, #ebdbde, #cca6ac, #094228, #42d692, #16a765
         */
        textColor?: string | null;
    }
    /**
     * Language settings for an account. These settings correspond to the &quot;Language settings&quot; feature in the web interface.
     */
    export interface Schema$LanguageSettings {
        /**
         * The language to display Gmail in, formatted as an RFC 3066 Language Tag (for example en-GB, fr or ja for British English, French, or Japanese respectively).  The set of languages supported by Gmail evolves over time, so please refer to the &quot;Language&quot; dropdown in the Gmail settings  for all available options, as described in the language settings help article. A table of sample values is also provided in the Managing Language Settings guide   Not all Gmail clients can display the same set of languages. In the case that a user&#39;s display language is not available for use on a particular client, said client automatically chooses to display in the closest supported variant (or a reasonable default).
         */
        displayLanguage?: string | null;
    }
    /**
     * Response for the ListDelegates method.
     */
    export interface Schema$ListDelegatesResponse {
        /**
         * List of the user&#39;s delegates (with any verification status).
         */
        delegates?: Schema$Delegate[];
    }
    export interface Schema$ListDraftsResponse {
        /**
         * List of drafts. Note that the Message property in each Draft resource only contains an id and a threadId. The messages.get method can fetch additional message details.
         */
        drafts?: Schema$Draft[];
        /**
         * Token to retrieve the next page of results in the list.
         */
        nextPageToken?: string | null;
        /**
         * Estimated total number of results.
         */
        resultSizeEstimate?: number | null;
    }
    /**
     * Response for the ListFilters method.
     */
    export interface Schema$ListFiltersResponse {
        /**
         * List of a user&#39;s filters.
         */
        filter?: Schema$Filter[];
    }
    /**
     * Response for the ListForwardingAddresses method.
     */
    export interface Schema$ListForwardingAddressesResponse {
        /**
         * List of addresses that may be used for forwarding.
         */
        forwardingAddresses?: Schema$ForwardingAddress[];
    }
    export interface Schema$ListHistoryResponse {
        /**
         * List of history records. Any messages contained in the response will typically only have id and threadId fields populated.
         */
        history?: Schema$History[];
        /**
         * The ID of the mailbox&#39;s current history record.
         */
        historyId?: string | null;
        /**
         * Page token to retrieve the next page of results in the list.
         */
        nextPageToken?: string | null;
    }
    export interface Schema$ListLabelsResponse {
        /**
         * List of labels. Note that each label resource only contains an id, name, messageListVisibility, labelListVisibility, and type. The labels.get method can fetch additional label details.
         */
        labels?: Schema$Label[];
    }
    export interface Schema$ListMessagesResponse {
        /**
         * List of messages. Note that each message resource contains only an id and a threadId. Additional message details can be fetched using the messages.get method.
         */
        messages?: Schema$Message[];
        /**
         * Token to retrieve the next page of results in the list.
         */
        nextPageToken?: string | null;
        /**
         * Estimated total number of results.
         */
        resultSizeEstimate?: number | null;
    }
    /**
     * Response for the ListSendAs method.
     */
    export interface Schema$ListSendAsResponse {
        /**
         * List of send-as aliases.
         */
        sendAs?: Schema$SendAs[];
    }
    export interface Schema$ListSmimeInfoResponse {
        /**
         * List of SmimeInfo.
         */
        smimeInfo?: Schema$SmimeInfo[];
    }
    export interface Schema$ListThreadsResponse {
        /**
         * Page token to retrieve the next page of results in the list.
         */
        nextPageToken?: string | null;
        /**
         * Estimated total number of results.
         */
        resultSizeEstimate?: number | null;
        /**
         * List of threads. Note that each thread resource does not contain a list of messages. The list of messages for a given thread can be fetched using the threads.get method.
         */
        threads?: Schema$Thread[];
    }
    /**
     * An email message.
     */
    export interface Schema$Message {
        /**
         * The ID of the last history record that modified this message.
         */
        historyId?: string | null;
        /**
         * The immutable ID of the message.
         */
        id?: string | null;
        /**
         * The internal message creation timestamp (epoch ms), which determines ordering in the inbox. For normal SMTP-received email, this represents the time the message was originally accepted by Google, which is more reliable than the Date header. However, for API-migrated mail, it can be configured by client to be based on the Date header.
         */
        internalDate?: string | null;
        /**
         * List of IDs of labels applied to this message.
         */
        labelIds?: string[] | null;
        /**
         * The parsed email structure in the message parts.
         */
        payload?: Schema$MessagePart;
        /**
         * The entire email message in an RFC 2822 formatted and base64url encoded string. Returned in messages.get and drafts.get responses when the format=RAW parameter is supplied.
         */
        raw?: string | null;
        /**
         * Estimated size in bytes of the message.
         */
        sizeEstimate?: number | null;
        /**
         * A short part of the message text.
         */
        snippet?: string | null;
        /**
         * The ID of the thread the message belongs to. To add a message or draft to a thread, the following criteria must be met:  - The requested threadId must be specified on the Message or Draft.Message you supply with your request.  - The References and In-Reply-To headers must be set in compliance with the RFC 2822 standard.  - The Subject headers must match.
         */
        threadId?: string | null;
    }
    /**
     * A single MIME message part.
     */
    export interface Schema$MessagePart {
        /**
         * The message part body for this part, which may be empty for container MIME message parts.
         */
        body?: Schema$MessagePartBody;
        /**
         * The filename of the attachment. Only present if this message part represents an attachment.
         */
        filename?: string | null;
        /**
         * List of headers on this message part. For the top-level message part, representing the entire message payload, it will contain the standard RFC 2822 email headers such as To, From, and Subject.
         */
        headers?: Schema$MessagePartHeader[];
        /**
         * The MIME type of the message part.
         */
        mimeType?: string | null;
        /**
         * The immutable ID of the message part.
         */
        partId?: string | null;
        /**
         * The child MIME message parts of this part. This only applies to container MIME message parts, for example multipart/*. For non- container MIME message part types, such as text/plain, this field is empty. For more information, see RFC 1521.
         */
        parts?: Schema$MessagePart[];
    }
    /**
     * The body of a single MIME message part.
     */
    export interface Schema$MessagePartBody {
        /**
         * When present, contains the ID of an external attachment that can be retrieved in a separate messages.attachments.get request. When not present, the entire content of the message part body is contained in the data field.
         */
        attachmentId?: string | null;
        /**
         * The body data of a MIME message part as a base64url encoded string. May be empty for MIME container types that have no message body or when the body data is sent as a separate attachment. An attachment ID is present if the body data is contained in a separate attachment.
         */
        data?: string | null;
        /**
         * Number of bytes for the message part data (encoding notwithstanding).
         */
        size?: number | null;
    }
    export interface Schema$MessagePartHeader {
        /**
         * The name of the header before the : separator. For example, To.
         */
        name?: string | null;
        /**
         * The value of the header after the : separator. For example, someuser@example.com.
         */
        value?: string | null;
    }
    export interface Schema$ModifyMessageRequest {
        /**
         * A list of IDs of labels to add to this message.
         */
        addLabelIds?: string[] | null;
        /**
         * A list IDs of labels to remove from this message.
         */
        removeLabelIds?: string[] | null;
    }
    export interface Schema$ModifyThreadRequest {
        /**
         * A list of IDs of labels to add to this thread.
         */
        addLabelIds?: string[] | null;
        /**
         * A list of IDs of labels to remove from this thread.
         */
        removeLabelIds?: string[] | null;
    }
    /**
     * POP settings for an account.
     */
    export interface Schema$PopSettings {
        /**
         * The range of messages which are accessible via POP.
         */
        accessWindow?: string | null;
        /**
         * The action that will be executed on a message after it has been fetched via POP.
         */
        disposition?: string | null;
    }
    /**
     * Profile for a Gmail user.
     */
    export interface Schema$Profile {
        /**
         * The user&#39;s email address.
         */
        emailAddress?: string | null;
        /**
         * The ID of the mailbox&#39;s current history record.
         */
        historyId?: string | null;
        /**
         * The total number of messages in the mailbox.
         */
        messagesTotal?: number | null;
        /**
         * The total number of threads in the mailbox.
         */
        threadsTotal?: number | null;
    }
    /**
     * Settings associated with a send-as alias, which can be either the primary login address associated with the account or a custom &quot;from&quot; address. Send-as aliases correspond to the &quot;Send Mail As&quot; feature in the web interface.
     */
    export interface Schema$SendAs {
        /**
         * A name that appears in the &quot;From:&quot; header for mail sent using this alias. For custom &quot;from&quot; addresses, when this is empty, Gmail will populate the &quot;From:&quot; header with the name that is used for the primary address associated with the account. If the admin has disabled the ability for users to update their name format, requests to update this field for the primary login will silently fail.
         */
        displayName?: string | null;
        /**
         * Whether this address is selected as the default &quot;From:&quot; address in situations such as composing a new message or sending a vacation auto-reply. Every Gmail account has exactly one default send-as address, so the only legal value that clients may write to this field is true. Changing this from false to true for an address will result in this field becoming false for the other previous default address.
         */
        isDefault?: boolean | null;
        /**
         * Whether this address is the primary address used to login to the account. Every Gmail account has exactly one primary address, and it cannot be deleted from the collection of send-as aliases. This field is read-only.
         */
        isPrimary?: boolean | null;
        /**
         * An optional email address that is included in a &quot;Reply-To:&quot; header for mail sent using this alias. If this is empty, Gmail will not generate a &quot;Reply-To:&quot; header.
         */
        replyToAddress?: string | null;
        /**
         * The email address that appears in the &quot;From:&quot; header for mail sent using this alias. This is read-only for all operations except create.
         */
        sendAsEmail?: string | null;
        /**
         * An optional HTML signature that is included in messages composed with this alias in the Gmail web UI.
         */
        signature?: string | null;
        /**
         * An optional SMTP service that will be used as an outbound relay for mail sent using this alias. If this is empty, outbound mail will be sent directly from Gmail&#39;s servers to the destination SMTP service. This setting only applies to custom &quot;from&quot; aliases.
         */
        smtpMsa?: Schema$SmtpMsa;
        /**
         * Whether Gmail should  treat this address as an alias for the user&#39;s primary email address. This setting only applies to custom &quot;from&quot; aliases.
         */
        treatAsAlias?: boolean | null;
        /**
         * Indicates whether this address has been verified for use as a send-as alias. Read-only. This setting only applies to custom &quot;from&quot; aliases.
         */
        verificationStatus?: string | null;
    }
    /**
     * An S/MIME email config.
     */
    export interface Schema$SmimeInfo {
        /**
         * Encrypted key password, when key is encrypted.
         */
        encryptedKeyPassword?: string | null;
        /**
         * When the certificate expires (in milliseconds since epoch).
         */
        expiration?: string | null;
        /**
         * The immutable ID for the SmimeInfo.
         */
        id?: string | null;
        /**
         * Whether this SmimeInfo is the default one for this user&#39;s send-as address.
         */
        isDefault?: boolean | null;
        /**
         * The S/MIME certificate issuer&#39;s common name.
         */
        issuerCn?: string | null;
        /**
         * PEM formatted X509 concatenated certificate string (standard base64 encoding). Format used for returning key, which includes public key as well as certificate chain (not private key).
         */
        pem?: string | null;
        /**
         * PKCS#12 format containing a single private/public key pair and certificate chain. This format is only accepted from client for creating a new SmimeInfo and is never returned, because the private key is not intended to be exported. PKCS#12 may be encrypted, in which case encryptedKeyPassword should be set appropriately.
         */
        pkcs12?: string | null;
    }
    /**
     * Configuration for communication with an SMTP service.
     */
    export interface Schema$SmtpMsa {
        /**
         * The hostname of the SMTP service. Required.
         */
        host?: string | null;
        /**
         * The password that will be used for authentication with the SMTP service. This is a write-only field that can be specified in requests to create or update SendAs settings; it is never populated in responses.
         */
        password?: string | null;
        /**
         * The port of the SMTP service. Required.
         */
        port?: number | null;
        /**
         * The protocol that will be used to secure communication with the SMTP service. Required.
         */
        securityMode?: string | null;
        /**
         * The username that will be used for authentication with the SMTP service. This is a write-only field that can be specified in requests to create or update SendAs settings; it is never populated in responses.
         */
        username?: string | null;
    }
    /**
     * A collection of messages representing a conversation.
     */
    export interface Schema$Thread {
        /**
         * The ID of the last history record that modified this thread.
         */
        historyId?: string | null;
        /**
         * The unique ID of the thread.
         */
        id?: string | null;
        /**
         * The list of messages in the thread.
         */
        messages?: Schema$Message[];
        /**
         * A short part of the message text.
         */
        snippet?: string | null;
    }
    /**
     * Vacation auto-reply settings for an account. These settings correspond to the &quot;Vacation responder&quot; feature in the web interface.
     */
    export interface Schema$VacationSettings {
        /**
         * Flag that controls whether Gmail automatically replies to messages.
         */
        enableAutoReply?: boolean | null;
        /**
         * An optional end time for sending auto-replies (epoch ms). When this is specified, Gmail will automatically reply only to messages that it receives before the end time. If both startTime and endTime are specified, startTime must precede endTime.
         */
        endTime?: string | null;
        /**
         * Response body in HTML format. Gmail will sanitize the HTML before storing it.
         */
        responseBodyHtml?: string | null;
        /**
         * Response body in plain text format.
         */
        responseBodyPlainText?: string | null;
        /**
         * Optional text to prepend to the subject line in vacation responses. In order to enable auto-replies, either the response subject or the response body must be nonempty.
         */
        responseSubject?: string | null;
        /**
         * Flag that determines whether responses are sent to recipients who are not in the user&#39;s list of contacts.
         */
        restrictToContacts?: boolean | null;
        /**
         * Flag that determines whether responses are sent to recipients who are outside of the user&#39;s domain. This feature is only available for G Suite users.
         */
        restrictToDomain?: boolean | null;
        /**
         * An optional start time for sending auto-replies (epoch ms). When this is specified, Gmail will automatically reply only to messages that it receives after the start time. If both startTime and endTime are specified, startTime must precede endTime.
         */
        startTime?: string | null;
    }
    /**
     * Set up or update a new push notification watch on this user&#39;s mailbox.
     */
    export interface Schema$WatchRequest {
        /**
         * Filtering behavior of labelIds list specified.
         */
        labelFilterAction?: string | null;
        /**
         * List of label_ids to restrict notifications about. By default, if unspecified, all changes are pushed out. If specified then dictates which labels are required for a push notification to be generated.
         */
        labelIds?: string[] | null;
        /**
         * A fully qualified Google Cloud Pub/Sub API topic name to publish the events to. This topic name **must** already exist in Cloud Pub/Sub and you **must** have already granted gmail &quot;publish&quot; permission on it. For example, &quot;projects/my-project-identifier/topics/my-topic-name&quot; (using the Cloud Pub/Sub &quot;v1&quot; topic naming format).  Note that the &quot;my-project-identifier&quot; portion must exactly match your Google developer project id (the one executing this watch request).
         */
        topicName?: string | null;
    }
    /**
     * Push notification watch response.
     */
    export interface Schema$WatchResponse {
        /**
         * When Gmail will stop sending notifications for mailbox updates (epoch millis). Call watch again before this time to renew the watch.
         */
        expiration?: string | null;
        /**
         * The ID of the mailbox&#39;s current history record.
         */
        historyId?: string | null;
    }
    export class Resource$Users {
        context: APIRequestContext;
        drafts: Resource$Users$Drafts;
        history: Resource$Users$History;
        labels: Resource$Users$Labels;
        messages: Resource$Users$Messages;
        settings: Resource$Users$Settings;
        threads: Resource$Users$Threads;
        constructor(context: APIRequestContext);
        /**
         * gmail.users.getProfile
         * @desc Gets the current user's Gmail profile.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://mail.google.com/',
         *       'https://www.googleapis.com/auth/gmail.compose',
         *       'https://www.googleapis.com/auth/gmail.metadata',
         *       'https://www.googleapis.com/auth/gmail.modify',
         *       'https://www.googleapis.com/auth/gmail.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.getProfile({
         *     // The user's email address. The special value me can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "emailAddress": "my_emailAddress",
         *   //   "historyId": "my_historyId",
         *   //   "messagesTotal": 0,
         *   //   "threadsTotal": 0
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.getProfile
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.userId The user's email address. The special value me can be used to indicate the authenticated user.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        getProfile(params: Params$Resource$Users$Getprofile, options: StreamMethodOptions): GaxiosPromise<Readable>;
        getProfile(params?: Params$Resource$Users$Getprofile, options?: MethodOptions): GaxiosPromise<Schema$Profile>;
        getProfile(params: Params$Resource$Users$Getprofile, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        getProfile(params: Params$Resource$Users$Getprofile, options: MethodOptions | BodyResponseCallback<Schema$Profile>, callback: BodyResponseCallback<Schema$Profile>): void;
        getProfile(params: Params$Resource$Users$Getprofile, callback: BodyResponseCallback<Schema$Profile>): void;
        getProfile(callback: BodyResponseCallback<Schema$Profile>): void;
        /**
         * gmail.users.stop
         * @desc Stop receiving push notifications for the given user mailbox.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://mail.google.com/',
         *       'https://www.googleapis.com/auth/gmail.metadata',
         *       'https://www.googleapis.com/auth/gmail.modify',
         *       'https://www.googleapis.com/auth/gmail.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.stop({
         *     // The user's email address. The special value me can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.stop
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.userId The user's email address. The special value me can be used to indicate the authenticated user.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        stop(params: Params$Resource$Users$Stop, options: StreamMethodOptions): GaxiosPromise<Readable>;
        stop(params?: Params$Resource$Users$Stop, options?: MethodOptions): GaxiosPromise<void>;
        stop(params: Params$Resource$Users$Stop, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        stop(params: Params$Resource$Users$Stop, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        stop(params: Params$Resource$Users$Stop, callback: BodyResponseCallback<void>): void;
        stop(callback: BodyResponseCallback<void>): void;
        /**
         * gmail.users.watch
         * @desc Set up or update a push notification watch on the given user mailbox.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://mail.google.com/',
         *       'https://www.googleapis.com/auth/gmail.metadata',
         *       'https://www.googleapis.com/auth/gmail.modify',
         *       'https://www.googleapis.com/auth/gmail.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.watch({
         *     // The user's email address. The special value me can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "labelFilterAction": "my_labelFilterAction",
         *       //   "labelIds": [],
         *       //   "topicName": "my_topicName"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "expiration": "my_expiration",
         *   //   "historyId": "my_historyId"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.watch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.userId The user's email address. The special value me can be used to indicate the authenticated user.
         * @param {().WatchRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        watch(params: Params$Resource$Users$Watch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        watch(params?: Params$Resource$Users$Watch, options?: MethodOptions): GaxiosPromise<Schema$WatchResponse>;
        watch(params: Params$Resource$Users$Watch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        watch(params: Params$Resource$Users$Watch, options: MethodOptions | BodyResponseCallback<Schema$WatchResponse>, callback: BodyResponseCallback<Schema$WatchResponse>): void;
        watch(params: Params$Resource$Users$Watch, callback: BodyResponseCallback<Schema$WatchResponse>): void;
        watch(callback: BodyResponseCallback<Schema$WatchResponse>): void;
    }
    export interface Params$Resource$Users$Getprofile extends StandardParameters {
        /**
         * The user's email address. The special value me can be used to indicate the authenticated user.
         */
        userId?: string;
    }
    export interface Params$Resource$Users$Stop extends StandardParameters {
        /**
         * The user's email address. The special value me can be used to indicate the authenticated user.
         */
        userId?: string;
    }
    export interface Params$Resource$Users$Watch extends StandardParameters {
        /**
         * The user's email address. The special value me can be used to indicate the authenticated user.
         */
        userId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$WatchRequest;
    }
    export class Resource$Users$Drafts {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * gmail.users.drafts.create
         * @desc Creates a new draft with the DRAFT label.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://mail.google.com/',
         *       'https://www.googleapis.com/auth/gmail.addons.current.action.compose',
         *       'https://www.googleapis.com/auth/gmail.compose',
         *       'https://www.googleapis.com/auth/gmail.modify',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.drafts.create({
         *     // The user's email address. The special value me can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "id": "my_id",
         *       //   "message": {}
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
         *   //   "id": "my_id",
         *   //   "message": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.drafts.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.userId The user's email address. The special value me can be used to indicate the authenticated user.
         * @param  {object} params.requestBody Media resource metadata
         * @param {object} params.media Media object
         * @param {string} params.media.mimeType Media mime-type
         * @param {string|object} params.media.body Media body contents
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Users$Drafts$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Users$Drafts$Create, options?: MethodOptions): GaxiosPromise<Schema$Draft>;
        create(params: Params$Resource$Users$Drafts$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Users$Drafts$Create, options: MethodOptions | BodyResponseCallback<Schema$Draft>, callback: BodyResponseCallback<Schema$Draft>): void;
        create(params: Params$Resource$Users$Drafts$Create, callback: BodyResponseCallback<Schema$Draft>): void;
        create(callback: BodyResponseCallback<Schema$Draft>): void;
        /**
         * gmail.users.drafts.delete
         * @desc Immediately and permanently deletes the specified draft. Does not simply trash it.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://mail.google.com/',
         *       'https://www.googleapis.com/auth/gmail.compose',
         *       'https://www.googleapis.com/auth/gmail.modify',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.drafts.delete({
         *     // The ID of the draft to delete.
         *     id: 'placeholder-value',
         *     // The user's email address. The special value me can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.drafts.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.id The ID of the draft to delete.
         * @param {string} params.userId The user's email address. The special value me can be used to indicate the authenticated user.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Users$Drafts$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Users$Drafts$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Users$Drafts$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Users$Drafts$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Users$Drafts$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * gmail.users.drafts.get
         * @desc Gets the specified draft.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://mail.google.com/',
         *       'https://www.googleapis.com/auth/gmail.compose',
         *       'https://www.googleapis.com/auth/gmail.modify',
         *       'https://www.googleapis.com/auth/gmail.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.drafts.get({
         *     // The format to return the draft in.
         *     format: 'placeholder-value',
         *     // The ID of the draft to retrieve.
         *     id: 'placeholder-value',
         *     // The user's email address. The special value me can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "id": "my_id",
         *   //   "message": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.drafts.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.format The format to return the draft in.
         * @param {string} params.id The ID of the draft to retrieve.
         * @param {string} params.userId The user's email address. The special value me can be used to indicate the authenticated user.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Users$Drafts$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Users$Drafts$Get, options?: MethodOptions): GaxiosPromise<Schema$Draft>;
        get(params: Params$Resource$Users$Drafts$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Users$Drafts$Get, options: MethodOptions | BodyResponseCallback<Schema$Draft>, callback: BodyResponseCallback<Schema$Draft>): void;
        get(params: Params$Resource$Users$Drafts$Get, callback: BodyResponseCallback<Schema$Draft>): void;
        get(callback: BodyResponseCallback<Schema$Draft>): void;
        /**
         * gmail.users.drafts.list
         * @desc Lists the drafts in the user's mailbox.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://mail.google.com/',
         *       'https://www.googleapis.com/auth/gmail.compose',
         *       'https://www.googleapis.com/auth/gmail.modify',
         *       'https://www.googleapis.com/auth/gmail.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.drafts.list({
         *     // Include drafts from SPAM and TRASH in the results.
         *     includeSpamTrash: 'placeholder-value',
         *     // Maximum number of drafts to return.
         *     maxResults: 'placeholder-value',
         *     // Page token to retrieve a specific page of results in the list.
         *     pageToken: 'placeholder-value',
         *     // Only return draft messages matching the specified query. Supports the same query format as the Gmail search box. For example, "from:someuser@example.com rfc822msgid: is:unread".
         *     q: 'placeholder-value',
         *     // The user's email address. The special value me can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "drafts": [],
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "resultSizeEstimate": 0
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.drafts.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {boolean=} params.includeSpamTrash Include drafts from SPAM and TRASH in the results.
         * @param {integer=} params.maxResults Maximum number of drafts to return.
         * @param {string=} params.pageToken Page token to retrieve a specific page of results in the list.
         * @param {string=} params.q Only return draft messages matching the specified query. Supports the same query format as the Gmail search box. For example, "from:someuser@example.com rfc822msgid: is:unread".
         * @param {string} params.userId The user's email address. The special value me can be used to indicate the authenticated user.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Users$Drafts$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Users$Drafts$List, options?: MethodOptions): GaxiosPromise<Schema$ListDraftsResponse>;
        list(params: Params$Resource$Users$Drafts$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Users$Drafts$List, options: MethodOptions | BodyResponseCallback<Schema$ListDraftsResponse>, callback: BodyResponseCallback<Schema$ListDraftsResponse>): void;
        list(params: Params$Resource$Users$Drafts$List, callback: BodyResponseCallback<Schema$ListDraftsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListDraftsResponse>): void;
        /**
         * gmail.users.drafts.send
         * @desc Sends the specified, existing draft to the recipients in the To, Cc, and Bcc headers.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://mail.google.com/',
         *       'https://www.googleapis.com/auth/gmail.compose',
         *       'https://www.googleapis.com/auth/gmail.modify',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.drafts.send({
         *     // The user's email address. The special value me can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "id": "my_id",
         *       //   "message": {}
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
         *   //   "historyId": "my_historyId",
         *   //   "id": "my_id",
         *   //   "internalDate": "my_internalDate",
         *   //   "labelIds": [],
         *   //   "payload": {},
         *   //   "raw": "my_raw",
         *   //   "sizeEstimate": 0,
         *   //   "snippet": "my_snippet",
         *   //   "threadId": "my_threadId"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.drafts.send
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.userId The user's email address. The special value me can be used to indicate the authenticated user.
         * @param  {object} params.requestBody Media resource metadata
         * @param {object} params.media Media object
         * @param {string} params.media.mimeType Media mime-type
         * @param {string|object} params.media.body Media body contents
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        send(params: Params$Resource$Users$Drafts$Send, options: StreamMethodOptions): GaxiosPromise<Readable>;
        send(params?: Params$Resource$Users$Drafts$Send, options?: MethodOptions): GaxiosPromise<Schema$Message>;
        send(params: Params$Resource$Users$Drafts$Send, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        send(params: Params$Resource$Users$Drafts$Send, options: MethodOptions | BodyResponseCallback<Schema$Message>, callback: BodyResponseCallback<Schema$Message>): void;
        send(params: Params$Resource$Users$Drafts$Send, callback: BodyResponseCallback<Schema$Message>): void;
        send(callback: BodyResponseCallback<Schema$Message>): void;
        /**
         * gmail.users.drafts.update
         * @desc Replaces a draft's content.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://mail.google.com/',
         *       'https://www.googleapis.com/auth/gmail.compose',
         *       'https://www.googleapis.com/auth/gmail.modify',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.drafts.update({
         *     // The ID of the draft to update.
         *     id: 'placeholder-value',
         *     // The user's email address. The special value me can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "id": "my_id",
         *       //   "message": {}
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
         *   //   "id": "my_id",
         *   //   "message": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.drafts.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.id The ID of the draft to update.
         * @param {string} params.userId The user's email address. The special value me can be used to indicate the authenticated user.
         * @param  {object} params.requestBody Media resource metadata
         * @param {object} params.media Media object
         * @param {string} params.media.mimeType Media mime-type
         * @param {string|object} params.media.body Media body contents
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Users$Drafts$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Users$Drafts$Update, options?: MethodOptions): GaxiosPromise<Schema$Draft>;
        update(params: Params$Resource$Users$Drafts$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Users$Drafts$Update, options: MethodOptions | BodyResponseCallback<Schema$Draft>, callback: BodyResponseCallback<Schema$Draft>): void;
        update(params: Params$Resource$Users$Drafts$Update, callback: BodyResponseCallback<Schema$Draft>): void;
        update(callback: BodyResponseCallback<Schema$Draft>): void;
    }
    export interface Params$Resource$Users$Drafts$Create extends StandardParameters {
        /**
         * The user's email address. The special value me can be used to indicate the authenticated user.
         */
        userId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Draft;
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
    export interface Params$Resource$Users$Drafts$Delete extends StandardParameters {
        /**
         * The ID of the draft to delete.
         */
        id?: string;
        /**
         * The user's email address. The special value me can be used to indicate the authenticated user.
         */
        userId?: string;
    }
    export interface Params$Resource$Users$Drafts$Get extends StandardParameters {
        /**
         * The format to return the draft in.
         */
        format?: string;
        /**
         * The ID of the draft to retrieve.
         */
        id?: string;
        /**
         * The user's email address. The special value me can be used to indicate the authenticated user.
         */
        userId?: string;
    }
    export interface Params$Resource$Users$Drafts$List extends StandardParameters {
        /**
         * Include drafts from SPAM and TRASH in the results.
         */
        includeSpamTrash?: boolean;
        /**
         * Maximum number of drafts to return.
         */
        maxResults?: number;
        /**
         * Page token to retrieve a specific page of results in the list.
         */
        pageToken?: string;
        /**
         * Only return draft messages matching the specified query. Supports the same query format as the Gmail search box. For example, "from:someuser@example.com rfc822msgid: is:unread".
         */
        q?: string;
        /**
         * The user's email address. The special value me can be used to indicate the authenticated user.
         */
        userId?: string;
    }
    export interface Params$Resource$Users$Drafts$Send extends StandardParameters {
        /**
         * The user's email address. The special value me can be used to indicate the authenticated user.
         */
        userId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Draft;
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
    export interface Params$Resource$Users$Drafts$Update extends StandardParameters {
        /**
         * The ID of the draft to update.
         */
        id?: string;
        /**
         * The user's email address. The special value me can be used to indicate the authenticated user.
         */
        userId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Draft;
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
    export class Resource$Users$History {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * gmail.users.history.list
         * @desc Lists the history of all changes to the given mailbox. History results are returned in chronological order (increasing historyId).
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://mail.google.com/',
         *       'https://www.googleapis.com/auth/gmail.metadata',
         *       'https://www.googleapis.com/auth/gmail.modify',
         *       'https://www.googleapis.com/auth/gmail.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.history.list({
         *     // History types to be returned by the function
         *     historyTypes: 'placeholder-value',
         *     // Only return messages with a label matching the ID.
         *     labelId: 'placeholder-value',
         *     // The maximum number of history records to return.
         *     maxResults: 'placeholder-value',
         *     // Page token to retrieve a specific page of results in the list.
         *     pageToken: 'placeholder-value',
         *     // Required. Returns history records after the specified startHistoryId. The supplied startHistoryId should be obtained from the historyId of a message, thread, or previous list response. History IDs increase chronologically but are not contiguous with random gaps in between valid IDs. Supplying an invalid or out of date startHistoryId typically returns an HTTP 404 error code. A historyId is typically valid for at least a week, but in some rare circumstances may be valid for only a few hours. If you receive an HTTP 404 error response, your application should perform a full sync. If you receive no nextPageToken in the response, there are no updates to retrieve and you can store the returned historyId for a future request.
         *     startHistoryId: 'placeholder-value',
         *     // The user's email address. The special value me can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "history": [],
         *   //   "historyId": "my_historyId",
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.history.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.historyTypes History types to be returned by the function
         * @param {string=} params.labelId Only return messages with a label matching the ID.
         * @param {integer=} params.maxResults The maximum number of history records to return.
         * @param {string=} params.pageToken Page token to retrieve a specific page of results in the list.
         * @param {string=} params.startHistoryId Required. Returns history records after the specified startHistoryId. The supplied startHistoryId should be obtained from the historyId of a message, thread, or previous list response. History IDs increase chronologically but are not contiguous with random gaps in between valid IDs. Supplying an invalid or out of date startHistoryId typically returns an HTTP 404 error code. A historyId is typically valid for at least a week, but in some rare circumstances may be valid for only a few hours. If you receive an HTTP 404 error response, your application should perform a full sync. If you receive no nextPageToken in the response, there are no updates to retrieve and you can store the returned historyId for a future request.
         * @param {string} params.userId The user's email address. The special value me can be used to indicate the authenticated user.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Users$History$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Users$History$List, options?: MethodOptions): GaxiosPromise<Schema$ListHistoryResponse>;
        list(params: Params$Resource$Users$History$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Users$History$List, options: MethodOptions | BodyResponseCallback<Schema$ListHistoryResponse>, callback: BodyResponseCallback<Schema$ListHistoryResponse>): void;
        list(params: Params$Resource$Users$History$List, callback: BodyResponseCallback<Schema$ListHistoryResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListHistoryResponse>): void;
    }
    export interface Params$Resource$Users$History$List extends StandardParameters {
        /**
         * History types to be returned by the function
         */
        historyTypes?: string[];
        /**
         * Only return messages with a label matching the ID.
         */
        labelId?: string;
        /**
         * The maximum number of history records to return.
         */
        maxResults?: number;
        /**
         * Page token to retrieve a specific page of results in the list.
         */
        pageToken?: string;
        /**
         * Required. Returns history records after the specified startHistoryId. The supplied startHistoryId should be obtained from the historyId of a message, thread, or previous list response. History IDs increase chronologically but are not contiguous with random gaps in between valid IDs. Supplying an invalid or out of date startHistoryId typically returns an HTTP 404 error code. A historyId is typically valid for at least a week, but in some rare circumstances may be valid for only a few hours. If you receive an HTTP 404 error response, your application should perform a full sync. If you receive no nextPageToken in the response, there are no updates to retrieve and you can store the returned historyId for a future request.
         */
        startHistoryId?: string;
        /**
         * The user's email address. The special value me can be used to indicate the authenticated user.
         */
        userId?: string;
    }
    export class Resource$Users$Labels {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * gmail.users.labels.create
         * @desc Creates a new label.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://mail.google.com/',
         *       'https://www.googleapis.com/auth/gmail.labels',
         *       'https://www.googleapis.com/auth/gmail.modify',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.labels.create({
         *     // The user's email address. The special value me can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "color": {},
         *       //   "id": "my_id",
         *       //   "labelListVisibility": "my_labelListVisibility",
         *       //   "messageListVisibility": "my_messageListVisibility",
         *       //   "messagesTotal": 0,
         *       //   "messagesUnread": 0,
         *       //   "name": "my_name",
         *       //   "threadsTotal": 0,
         *       //   "threadsUnread": 0,
         *       //   "type": "my_type"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "color": {},
         *   //   "id": "my_id",
         *   //   "labelListVisibility": "my_labelListVisibility",
         *   //   "messageListVisibility": "my_messageListVisibility",
         *   //   "messagesTotal": 0,
         *   //   "messagesUnread": 0,
         *   //   "name": "my_name",
         *   //   "threadsTotal": 0,
         *   //   "threadsUnread": 0,
         *   //   "type": "my_type"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.labels.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.userId The user's email address. The special value me can be used to indicate the authenticated user.
         * @param {().Label} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Users$Labels$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Users$Labels$Create, options?: MethodOptions): GaxiosPromise<Schema$Label>;
        create(params: Params$Resource$Users$Labels$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Users$Labels$Create, options: MethodOptions | BodyResponseCallback<Schema$Label>, callback: BodyResponseCallback<Schema$Label>): void;
        create(params: Params$Resource$Users$Labels$Create, callback: BodyResponseCallback<Schema$Label>): void;
        create(callback: BodyResponseCallback<Schema$Label>): void;
        /**
         * gmail.users.labels.delete
         * @desc Immediately and permanently deletes the specified label and removes it from any messages and threads that it is applied to.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://mail.google.com/',
         *       'https://www.googleapis.com/auth/gmail.labels',
         *       'https://www.googleapis.com/auth/gmail.modify',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.labels.delete({
         *     // The ID of the label to delete.
         *     id: 'placeholder-value',
         *     // The user's email address. The special value me can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.labels.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.id The ID of the label to delete.
         * @param {string} params.userId The user's email address. The special value me can be used to indicate the authenticated user.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Users$Labels$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Users$Labels$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Users$Labels$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Users$Labels$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Users$Labels$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * gmail.users.labels.get
         * @desc Gets the specified label.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://mail.google.com/',
         *       'https://www.googleapis.com/auth/gmail.labels',
         *       'https://www.googleapis.com/auth/gmail.metadata',
         *       'https://www.googleapis.com/auth/gmail.modify',
         *       'https://www.googleapis.com/auth/gmail.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.labels.get({
         *     // The ID of the label to retrieve.
         *     id: 'placeholder-value',
         *     // The user's email address. The special value me can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "color": {},
         *   //   "id": "my_id",
         *   //   "labelListVisibility": "my_labelListVisibility",
         *   //   "messageListVisibility": "my_messageListVisibility",
         *   //   "messagesTotal": 0,
         *   //   "messagesUnread": 0,
         *   //   "name": "my_name",
         *   //   "threadsTotal": 0,
         *   //   "threadsUnread": 0,
         *   //   "type": "my_type"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.labels.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.id The ID of the label to retrieve.
         * @param {string} params.userId The user's email address. The special value me can be used to indicate the authenticated user.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Users$Labels$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Users$Labels$Get, options?: MethodOptions): GaxiosPromise<Schema$Label>;
        get(params: Params$Resource$Users$Labels$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Users$Labels$Get, options: MethodOptions | BodyResponseCallback<Schema$Label>, callback: BodyResponseCallback<Schema$Label>): void;
        get(params: Params$Resource$Users$Labels$Get, callback: BodyResponseCallback<Schema$Label>): void;
        get(callback: BodyResponseCallback<Schema$Label>): void;
        /**
         * gmail.users.labels.list
         * @desc Lists all labels in the user's mailbox.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://mail.google.com/',
         *       'https://www.googleapis.com/auth/gmail.labels',
         *       'https://www.googleapis.com/auth/gmail.metadata',
         *       'https://www.googleapis.com/auth/gmail.modify',
         *       'https://www.googleapis.com/auth/gmail.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.labels.list({
         *     // The user's email address. The special value me can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "labels": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.labels.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.userId The user's email address. The special value me can be used to indicate the authenticated user.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Users$Labels$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Users$Labels$List, options?: MethodOptions): GaxiosPromise<Schema$ListLabelsResponse>;
        list(params: Params$Resource$Users$Labels$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Users$Labels$List, options: MethodOptions | BodyResponseCallback<Schema$ListLabelsResponse>, callback: BodyResponseCallback<Schema$ListLabelsResponse>): void;
        list(params: Params$Resource$Users$Labels$List, callback: BodyResponseCallback<Schema$ListLabelsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListLabelsResponse>): void;
        /**
         * gmail.users.labels.patch
         * @desc Updates the specified label. This method supports patch semantics.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://mail.google.com/',
         *       'https://www.googleapis.com/auth/gmail.labels',
         *       'https://www.googleapis.com/auth/gmail.modify',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.labels.patch({
         *     // The ID of the label to update.
         *     id: 'placeholder-value',
         *     // The user's email address. The special value me can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "color": {},
         *       //   "id": "my_id",
         *       //   "labelListVisibility": "my_labelListVisibility",
         *       //   "messageListVisibility": "my_messageListVisibility",
         *       //   "messagesTotal": 0,
         *       //   "messagesUnread": 0,
         *       //   "name": "my_name",
         *       //   "threadsTotal": 0,
         *       //   "threadsUnread": 0,
         *       //   "type": "my_type"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "color": {},
         *   //   "id": "my_id",
         *   //   "labelListVisibility": "my_labelListVisibility",
         *   //   "messageListVisibility": "my_messageListVisibility",
         *   //   "messagesTotal": 0,
         *   //   "messagesUnread": 0,
         *   //   "name": "my_name",
         *   //   "threadsTotal": 0,
         *   //   "threadsUnread": 0,
         *   //   "type": "my_type"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.labels.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.id The ID of the label to update.
         * @param {string} params.userId The user's email address. The special value me can be used to indicate the authenticated user.
         * @param {().Label} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Users$Labels$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Users$Labels$Patch, options?: MethodOptions): GaxiosPromise<Schema$Label>;
        patch(params: Params$Resource$Users$Labels$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Users$Labels$Patch, options: MethodOptions | BodyResponseCallback<Schema$Label>, callback: BodyResponseCallback<Schema$Label>): void;
        patch(params: Params$Resource$Users$Labels$Patch, callback: BodyResponseCallback<Schema$Label>): void;
        patch(callback: BodyResponseCallback<Schema$Label>): void;
        /**
         * gmail.users.labels.update
         * @desc Updates the specified label.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://mail.google.com/',
         *       'https://www.googleapis.com/auth/gmail.labels',
         *       'https://www.googleapis.com/auth/gmail.modify',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.labels.update({
         *     // The ID of the label to update.
         *     id: 'placeholder-value',
         *     // The user's email address. The special value me can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "color": {},
         *       //   "id": "my_id",
         *       //   "labelListVisibility": "my_labelListVisibility",
         *       //   "messageListVisibility": "my_messageListVisibility",
         *       //   "messagesTotal": 0,
         *       //   "messagesUnread": 0,
         *       //   "name": "my_name",
         *       //   "threadsTotal": 0,
         *       //   "threadsUnread": 0,
         *       //   "type": "my_type"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "color": {},
         *   //   "id": "my_id",
         *   //   "labelListVisibility": "my_labelListVisibility",
         *   //   "messageListVisibility": "my_messageListVisibility",
         *   //   "messagesTotal": 0,
         *   //   "messagesUnread": 0,
         *   //   "name": "my_name",
         *   //   "threadsTotal": 0,
         *   //   "threadsUnread": 0,
         *   //   "type": "my_type"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.labels.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.id The ID of the label to update.
         * @param {string} params.userId The user's email address. The special value me can be used to indicate the authenticated user.
         * @param {().Label} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Users$Labels$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Users$Labels$Update, options?: MethodOptions): GaxiosPromise<Schema$Label>;
        update(params: Params$Resource$Users$Labels$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Users$Labels$Update, options: MethodOptions | BodyResponseCallback<Schema$Label>, callback: BodyResponseCallback<Schema$Label>): void;
        update(params: Params$Resource$Users$Labels$Update, callback: BodyResponseCallback<Schema$Label>): void;
        update(callback: BodyResponseCallback<Schema$Label>): void;
    }
    export interface Params$Resource$Users$Labels$Create extends StandardParameters {
        /**
         * The user's email address. The special value me can be used to indicate the authenticated user.
         */
        userId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Label;
    }
    export interface Params$Resource$Users$Labels$Delete extends StandardParameters {
        /**
         * The ID of the label to delete.
         */
        id?: string;
        /**
         * The user's email address. The special value me can be used to indicate the authenticated user.
         */
        userId?: string;
    }
    export interface Params$Resource$Users$Labels$Get extends StandardParameters {
        /**
         * The ID of the label to retrieve.
         */
        id?: string;
        /**
         * The user's email address. The special value me can be used to indicate the authenticated user.
         */
        userId?: string;
    }
    export interface Params$Resource$Users$Labels$List extends StandardParameters {
        /**
         * The user's email address. The special value me can be used to indicate the authenticated user.
         */
        userId?: string;
    }
    export interface Params$Resource$Users$Labels$Patch extends StandardParameters {
        /**
         * The ID of the label to update.
         */
        id?: string;
        /**
         * The user's email address. The special value me can be used to indicate the authenticated user.
         */
        userId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Label;
    }
    export interface Params$Resource$Users$Labels$Update extends StandardParameters {
        /**
         * The ID of the label to update.
         */
        id?: string;
        /**
         * The user's email address. The special value me can be used to indicate the authenticated user.
         */
        userId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Label;
    }
    export class Resource$Users$Messages {
        context: APIRequestContext;
        attachments: Resource$Users$Messages$Attachments;
        constructor(context: APIRequestContext);
        /**
         * gmail.users.messages.batchDelete
         * @desc Deletes many messages by message ID. Provides no guarantees that messages were not already deleted or even existed at all.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://mail.google.com/'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.messages.batchDelete({
         *     // The user's email address. The special value me can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "ids": []
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
         * @alias gmail.users.messages.batchDelete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.userId The user's email address. The special value me can be used to indicate the authenticated user.
         * @param {().BatchDeleteMessagesRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        batchDelete(params: Params$Resource$Users$Messages$Batchdelete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        batchDelete(params?: Params$Resource$Users$Messages$Batchdelete, options?: MethodOptions): GaxiosPromise<void>;
        batchDelete(params: Params$Resource$Users$Messages$Batchdelete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        batchDelete(params: Params$Resource$Users$Messages$Batchdelete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        batchDelete(params: Params$Resource$Users$Messages$Batchdelete, callback: BodyResponseCallback<void>): void;
        batchDelete(callback: BodyResponseCallback<void>): void;
        /**
         * gmail.users.messages.batchModify
         * @desc Modifies the labels on the specified messages.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://mail.google.com/',
         *       'https://www.googleapis.com/auth/gmail.modify',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.messages.batchModify({
         *     // The user's email address. The special value me can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "addLabelIds": [],
         *       //   "ids": [],
         *       //   "removeLabelIds": []
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
         * @alias gmail.users.messages.batchModify
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.userId The user's email address. The special value me can be used to indicate the authenticated user.
         * @param {().BatchModifyMessagesRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        batchModify(params: Params$Resource$Users$Messages$Batchmodify, options: StreamMethodOptions): GaxiosPromise<Readable>;
        batchModify(params?: Params$Resource$Users$Messages$Batchmodify, options?: MethodOptions): GaxiosPromise<void>;
        batchModify(params: Params$Resource$Users$Messages$Batchmodify, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        batchModify(params: Params$Resource$Users$Messages$Batchmodify, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        batchModify(params: Params$Resource$Users$Messages$Batchmodify, callback: BodyResponseCallback<void>): void;
        batchModify(callback: BodyResponseCallback<void>): void;
        /**
         * gmail.users.messages.delete
         * @desc Immediately and permanently deletes the specified message. This operation cannot be undone. Prefer messages.trash instead.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://mail.google.com/'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.messages.delete({
         *     // The ID of the message to delete.
         *     id: 'placeholder-value',
         *     // The user's email address. The special value me can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.messages.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.id The ID of the message to delete.
         * @param {string} params.userId The user's email address. The special value me can be used to indicate the authenticated user.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Users$Messages$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Users$Messages$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Users$Messages$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Users$Messages$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Users$Messages$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * gmail.users.messages.get
         * @desc Gets the specified message.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://mail.google.com/',
         *       'https://www.googleapis.com/auth/gmail.addons.current.message.action',
         *       'https://www.googleapis.com/auth/gmail.addons.current.message.metadata',
         *       'https://www.googleapis.com/auth/gmail.addons.current.message.readonly',
         *       'https://www.googleapis.com/auth/gmail.metadata',
         *       'https://www.googleapis.com/auth/gmail.modify',
         *       'https://www.googleapis.com/auth/gmail.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.messages.get({
         *     // The format to return the message in.
         *     format: 'placeholder-value',
         *     // The ID of the message to retrieve.
         *     id: 'placeholder-value',
         *     // When given and format is METADATA, only include headers specified.
         *     metadataHeaders: 'placeholder-value',
         *     // The user's email address. The special value me can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "historyId": "my_historyId",
         *   //   "id": "my_id",
         *   //   "internalDate": "my_internalDate",
         *   //   "labelIds": [],
         *   //   "payload": {},
         *   //   "raw": "my_raw",
         *   //   "sizeEstimate": 0,
         *   //   "snippet": "my_snippet",
         *   //   "threadId": "my_threadId"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.messages.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.format The format to return the message in.
         * @param {string} params.id The ID of the message to retrieve.
         * @param {string=} params.metadataHeaders When given and format is METADATA, only include headers specified.
         * @param {string} params.userId The user's email address. The special value me can be used to indicate the authenticated user.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Users$Messages$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Users$Messages$Get, options?: MethodOptions): GaxiosPromise<Schema$Message>;
        get(params: Params$Resource$Users$Messages$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Users$Messages$Get, options: MethodOptions | BodyResponseCallback<Schema$Message>, callback: BodyResponseCallback<Schema$Message>): void;
        get(params: Params$Resource$Users$Messages$Get, callback: BodyResponseCallback<Schema$Message>): void;
        get(callback: BodyResponseCallback<Schema$Message>): void;
        /**
         * gmail.users.messages.import
         * @desc Imports a message into only this user's mailbox, with standard email delivery scanning and classification similar to receiving via SMTP. Does not send a message.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://mail.google.com/',
         *       'https://www.googleapis.com/auth/gmail.insert',
         *       'https://www.googleapis.com/auth/gmail.modify',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.messages.import({
         *     // Mark the email as permanently deleted (not TRASH) and only visible in Google Vault to a Vault administrator. Only used for G Suite accounts.
         *     deleted: 'placeholder-value',
         *     // Source for Gmail's internal date of the message.
         *     internalDateSource: 'placeholder-value',
         *     // Ignore the Gmail spam classifier decision and never mark this email as SPAM in the mailbox.
         *     neverMarkSpam: 'placeholder-value',
         *     // Process calendar invites in the email and add any extracted meetings to the Google Calendar for this user.
         *     processForCalendar: 'placeholder-value',
         *     // The user's email address. The special value me can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "historyId": "my_historyId",
         *       //   "id": "my_id",
         *       //   "internalDate": "my_internalDate",
         *       //   "labelIds": [],
         *       //   "payload": {},
         *       //   "raw": "my_raw",
         *       //   "sizeEstimate": 0,
         *       //   "snippet": "my_snippet",
         *       //   "threadId": "my_threadId"
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
         *   //   "historyId": "my_historyId",
         *   //   "id": "my_id",
         *   //   "internalDate": "my_internalDate",
         *   //   "labelIds": [],
         *   //   "payload": {},
         *   //   "raw": "my_raw",
         *   //   "sizeEstimate": 0,
         *   //   "snippet": "my_snippet",
         *   //   "threadId": "my_threadId"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.messages.import
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {boolean=} params.deleted Mark the email as permanently deleted (not TRASH) and only visible in Google Vault to a Vault administrator. Only used for G Suite accounts.
         * @param {string=} params.internalDateSource Source for Gmail's internal date of the message.
         * @param {boolean=} params.neverMarkSpam Ignore the Gmail spam classifier decision and never mark this email as SPAM in the mailbox.
         * @param {boolean=} params.processForCalendar Process calendar invites in the email and add any extracted meetings to the Google Calendar for this user.
         * @param {string} params.userId The user's email address. The special value me can be used to indicate the authenticated user.
         * @param  {object} params.requestBody Media resource metadata
         * @param {object} params.media Media object
         * @param {string} params.media.mimeType Media mime-type
         * @param {string|object} params.media.body Media body contents
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        import(params: Params$Resource$Users$Messages$Import, options: StreamMethodOptions): GaxiosPromise<Readable>;
        import(params?: Params$Resource$Users$Messages$Import, options?: MethodOptions): GaxiosPromise<Schema$Message>;
        import(params: Params$Resource$Users$Messages$Import, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        import(params: Params$Resource$Users$Messages$Import, options: MethodOptions | BodyResponseCallback<Schema$Message>, callback: BodyResponseCallback<Schema$Message>): void;
        import(params: Params$Resource$Users$Messages$Import, callback: BodyResponseCallback<Schema$Message>): void;
        import(callback: BodyResponseCallback<Schema$Message>): void;
        /**
         * gmail.users.messages.insert
         * @desc Directly inserts a message into only this user's mailbox similar to IMAP APPEND, bypassing most scanning and classification. Does not send a message.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://mail.google.com/',
         *       'https://www.googleapis.com/auth/gmail.insert',
         *       'https://www.googleapis.com/auth/gmail.modify',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.messages.insert({
         *     // Mark the email as permanently deleted (not TRASH) and only visible in Google Vault to a Vault administrator. Only used for G Suite accounts.
         *     deleted: 'placeholder-value',
         *     // Source for Gmail's internal date of the message.
         *     internalDateSource: 'placeholder-value',
         *     // The user's email address. The special value me can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "historyId": "my_historyId",
         *       //   "id": "my_id",
         *       //   "internalDate": "my_internalDate",
         *       //   "labelIds": [],
         *       //   "payload": {},
         *       //   "raw": "my_raw",
         *       //   "sizeEstimate": 0,
         *       //   "snippet": "my_snippet",
         *       //   "threadId": "my_threadId"
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
         *   //   "historyId": "my_historyId",
         *   //   "id": "my_id",
         *   //   "internalDate": "my_internalDate",
         *   //   "labelIds": [],
         *   //   "payload": {},
         *   //   "raw": "my_raw",
         *   //   "sizeEstimate": 0,
         *   //   "snippet": "my_snippet",
         *   //   "threadId": "my_threadId"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.messages.insert
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {boolean=} params.deleted Mark the email as permanently deleted (not TRASH) and only visible in Google Vault to a Vault administrator. Only used for G Suite accounts.
         * @param {string=} params.internalDateSource Source for Gmail's internal date of the message.
         * @param {string} params.userId The user's email address. The special value me can be used to indicate the authenticated user.
         * @param  {object} params.requestBody Media resource metadata
         * @param {object} params.media Media object
         * @param {string} params.media.mimeType Media mime-type
         * @param {string|object} params.media.body Media body contents
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        insert(params: Params$Resource$Users$Messages$Insert, options: StreamMethodOptions): GaxiosPromise<Readable>;
        insert(params?: Params$Resource$Users$Messages$Insert, options?: MethodOptions): GaxiosPromise<Schema$Message>;
        insert(params: Params$Resource$Users$Messages$Insert, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        insert(params: Params$Resource$Users$Messages$Insert, options: MethodOptions | BodyResponseCallback<Schema$Message>, callback: BodyResponseCallback<Schema$Message>): void;
        insert(params: Params$Resource$Users$Messages$Insert, callback: BodyResponseCallback<Schema$Message>): void;
        insert(callback: BodyResponseCallback<Schema$Message>): void;
        /**
         * gmail.users.messages.list
         * @desc Lists the messages in the user's mailbox.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://mail.google.com/',
         *       'https://www.googleapis.com/auth/gmail.metadata',
         *       'https://www.googleapis.com/auth/gmail.modify',
         *       'https://www.googleapis.com/auth/gmail.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.messages.list({
         *     // Include messages from SPAM and TRASH in the results.
         *     includeSpamTrash: 'placeholder-value',
         *     // Only return messages with labels that match all of the specified label IDs.
         *     labelIds: 'placeholder-value',
         *     // Maximum number of messages to return.
         *     maxResults: 'placeholder-value',
         *     // Page token to retrieve a specific page of results in the list.
         *     pageToken: 'placeholder-value',
         *     // Only return messages matching the specified query. Supports the same query format as the Gmail search box. For example, "from:someuser@example.com rfc822msgid:<somemsgid@example.com> is:unread". Parameter cannot be used when accessing the api using the gmail.metadata scope.
         *     q: 'placeholder-value',
         *     // The user's email address. The special value me can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "messages": [],
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "resultSizeEstimate": 0
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.messages.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {boolean=} params.includeSpamTrash Include messages from SPAM and TRASH in the results.
         * @param {string=} params.labelIds Only return messages with labels that match all of the specified label IDs.
         * @param {integer=} params.maxResults Maximum number of messages to return.
         * @param {string=} params.pageToken Page token to retrieve a specific page of results in the list.
         * @param {string=} params.q Only return messages matching the specified query. Supports the same query format as the Gmail search box. For example, "from:someuser@example.com rfc822msgid:<somemsgid@example.com> is:unread". Parameter cannot be used when accessing the api using the gmail.metadata scope.
         * @param {string} params.userId The user's email address. The special value me can be used to indicate the authenticated user.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Users$Messages$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Users$Messages$List, options?: MethodOptions): GaxiosPromise<Schema$ListMessagesResponse>;
        list(params: Params$Resource$Users$Messages$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Users$Messages$List, options: MethodOptions | BodyResponseCallback<Schema$ListMessagesResponse>, callback: BodyResponseCallback<Schema$ListMessagesResponse>): void;
        list(params: Params$Resource$Users$Messages$List, callback: BodyResponseCallback<Schema$ListMessagesResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListMessagesResponse>): void;
        /**
         * gmail.users.messages.modify
         * @desc Modifies the labels on the specified message.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://mail.google.com/',
         *       'https://www.googleapis.com/auth/gmail.modify',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.messages.modify({
         *     // The ID of the message to modify.
         *     id: 'placeholder-value',
         *     // The user's email address. The special value me can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "addLabelIds": [],
         *       //   "removeLabelIds": []
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "historyId": "my_historyId",
         *   //   "id": "my_id",
         *   //   "internalDate": "my_internalDate",
         *   //   "labelIds": [],
         *   //   "payload": {},
         *   //   "raw": "my_raw",
         *   //   "sizeEstimate": 0,
         *   //   "snippet": "my_snippet",
         *   //   "threadId": "my_threadId"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.messages.modify
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.id The ID of the message to modify.
         * @param {string} params.userId The user's email address. The special value me can be used to indicate the authenticated user.
         * @param {().ModifyMessageRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        modify(params: Params$Resource$Users$Messages$Modify, options: StreamMethodOptions): GaxiosPromise<Readable>;
        modify(params?: Params$Resource$Users$Messages$Modify, options?: MethodOptions): GaxiosPromise<Schema$Message>;
        modify(params: Params$Resource$Users$Messages$Modify, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        modify(params: Params$Resource$Users$Messages$Modify, options: MethodOptions | BodyResponseCallback<Schema$Message>, callback: BodyResponseCallback<Schema$Message>): void;
        modify(params: Params$Resource$Users$Messages$Modify, callback: BodyResponseCallback<Schema$Message>): void;
        modify(callback: BodyResponseCallback<Schema$Message>): void;
        /**
         * gmail.users.messages.send
         * @desc Sends the specified message to the recipients in the To, Cc, and Bcc headers.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://mail.google.com/',
         *       'https://www.googleapis.com/auth/gmail.addons.current.action.compose',
         *       'https://www.googleapis.com/auth/gmail.compose',
         *       'https://www.googleapis.com/auth/gmail.modify',
         *       'https://www.googleapis.com/auth/gmail.send',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.messages.send({
         *     // The user's email address. The special value me can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "historyId": "my_historyId",
         *       //   "id": "my_id",
         *       //   "internalDate": "my_internalDate",
         *       //   "labelIds": [],
         *       //   "payload": {},
         *       //   "raw": "my_raw",
         *       //   "sizeEstimate": 0,
         *       //   "snippet": "my_snippet",
         *       //   "threadId": "my_threadId"
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
         *   //   "historyId": "my_historyId",
         *   //   "id": "my_id",
         *   //   "internalDate": "my_internalDate",
         *   //   "labelIds": [],
         *   //   "payload": {},
         *   //   "raw": "my_raw",
         *   //   "sizeEstimate": 0,
         *   //   "snippet": "my_snippet",
         *   //   "threadId": "my_threadId"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.messages.send
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.userId The user's email address. The special value me can be used to indicate the authenticated user.
         * @param  {object} params.requestBody Media resource metadata
         * @param {object} params.media Media object
         * @param {string} params.media.mimeType Media mime-type
         * @param {string|object} params.media.body Media body contents
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        send(params: Params$Resource$Users$Messages$Send, options: StreamMethodOptions): GaxiosPromise<Readable>;
        send(params?: Params$Resource$Users$Messages$Send, options?: MethodOptions): GaxiosPromise<Schema$Message>;
        send(params: Params$Resource$Users$Messages$Send, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        send(params: Params$Resource$Users$Messages$Send, options: MethodOptions | BodyResponseCallback<Schema$Message>, callback: BodyResponseCallback<Schema$Message>): void;
        send(params: Params$Resource$Users$Messages$Send, callback: BodyResponseCallback<Schema$Message>): void;
        send(callback: BodyResponseCallback<Schema$Message>): void;
        /**
         * gmail.users.messages.trash
         * @desc Moves the specified message to the trash.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://mail.google.com/',
         *       'https://www.googleapis.com/auth/gmail.modify',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.messages.trash({
         *     // The ID of the message to Trash.
         *     id: 'placeholder-value',
         *     // The user's email address. The special value me can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "historyId": "my_historyId",
         *   //   "id": "my_id",
         *   //   "internalDate": "my_internalDate",
         *   //   "labelIds": [],
         *   //   "payload": {},
         *   //   "raw": "my_raw",
         *   //   "sizeEstimate": 0,
         *   //   "snippet": "my_snippet",
         *   //   "threadId": "my_threadId"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.messages.trash
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.id The ID of the message to Trash.
         * @param {string} params.userId The user's email address. The special value me can be used to indicate the authenticated user.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        trash(params: Params$Resource$Users$Messages$Trash, options: StreamMethodOptions): GaxiosPromise<Readable>;
        trash(params?: Params$Resource$Users$Messages$Trash, options?: MethodOptions): GaxiosPromise<Schema$Message>;
        trash(params: Params$Resource$Users$Messages$Trash, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        trash(params: Params$Resource$Users$Messages$Trash, options: MethodOptions | BodyResponseCallback<Schema$Message>, callback: BodyResponseCallback<Schema$Message>): void;
        trash(params: Params$Resource$Users$Messages$Trash, callback: BodyResponseCallback<Schema$Message>): void;
        trash(callback: BodyResponseCallback<Schema$Message>): void;
        /**
         * gmail.users.messages.untrash
         * @desc Removes the specified message from the trash.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://mail.google.com/',
         *       'https://www.googleapis.com/auth/gmail.modify',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.messages.untrash({
         *     // The ID of the message to remove from Trash.
         *     id: 'placeholder-value',
         *     // The user's email address. The special value me can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "historyId": "my_historyId",
         *   //   "id": "my_id",
         *   //   "internalDate": "my_internalDate",
         *   //   "labelIds": [],
         *   //   "payload": {},
         *   //   "raw": "my_raw",
         *   //   "sizeEstimate": 0,
         *   //   "snippet": "my_snippet",
         *   //   "threadId": "my_threadId"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.messages.untrash
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.id The ID of the message to remove from Trash.
         * @param {string} params.userId The user's email address. The special value me can be used to indicate the authenticated user.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        untrash(params: Params$Resource$Users$Messages$Untrash, options: StreamMethodOptions): GaxiosPromise<Readable>;
        untrash(params?: Params$Resource$Users$Messages$Untrash, options?: MethodOptions): GaxiosPromise<Schema$Message>;
        untrash(params: Params$Resource$Users$Messages$Untrash, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        untrash(params: Params$Resource$Users$Messages$Untrash, options: MethodOptions | BodyResponseCallback<Schema$Message>, callback: BodyResponseCallback<Schema$Message>): void;
        untrash(params: Params$Resource$Users$Messages$Untrash, callback: BodyResponseCallback<Schema$Message>): void;
        untrash(callback: BodyResponseCallback<Schema$Message>): void;
    }
    export interface Params$Resource$Users$Messages$Batchdelete extends StandardParameters {
        /**
         * The user's email address. The special value me can be used to indicate the authenticated user.
         */
        userId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$BatchDeleteMessagesRequest;
    }
    export interface Params$Resource$Users$Messages$Batchmodify extends StandardParameters {
        /**
         * The user's email address. The special value me can be used to indicate the authenticated user.
         */
        userId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$BatchModifyMessagesRequest;
    }
    export interface Params$Resource$Users$Messages$Delete extends StandardParameters {
        /**
         * The ID of the message to delete.
         */
        id?: string;
        /**
         * The user's email address. The special value me can be used to indicate the authenticated user.
         */
        userId?: string;
    }
    export interface Params$Resource$Users$Messages$Get extends StandardParameters {
        /**
         * The format to return the message in.
         */
        format?: string;
        /**
         * The ID of the message to retrieve.
         */
        id?: string;
        /**
         * When given and format is METADATA, only include headers specified.
         */
        metadataHeaders?: string[];
        /**
         * The user's email address. The special value me can be used to indicate the authenticated user.
         */
        userId?: string;
    }
    export interface Params$Resource$Users$Messages$Import extends StandardParameters {
        /**
         * Mark the email as permanently deleted (not TRASH) and only visible in Google Vault to a Vault administrator. Only used for G Suite accounts.
         */
        deleted?: boolean;
        /**
         * Source for Gmail's internal date of the message.
         */
        internalDateSource?: string;
        /**
         * Ignore the Gmail spam classifier decision and never mark this email as SPAM in the mailbox.
         */
        neverMarkSpam?: boolean;
        /**
         * Process calendar invites in the email and add any extracted meetings to the Google Calendar for this user.
         */
        processForCalendar?: boolean;
        /**
         * The user's email address. The special value me can be used to indicate the authenticated user.
         */
        userId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Message;
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
    export interface Params$Resource$Users$Messages$Insert extends StandardParameters {
        /**
         * Mark the email as permanently deleted (not TRASH) and only visible in Google Vault to a Vault administrator. Only used for G Suite accounts.
         */
        deleted?: boolean;
        /**
         * Source for Gmail's internal date of the message.
         */
        internalDateSource?: string;
        /**
         * The user's email address. The special value me can be used to indicate the authenticated user.
         */
        userId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Message;
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
    export interface Params$Resource$Users$Messages$List extends StandardParameters {
        /**
         * Include messages from SPAM and TRASH in the results.
         */
        includeSpamTrash?: boolean;
        /**
         * Only return messages with labels that match all of the specified label IDs.
         */
        labelIds?: string[];
        /**
         * Maximum number of messages to return.
         */
        maxResults?: number;
        /**
         * Page token to retrieve a specific page of results in the list.
         */
        pageToken?: string;
        /**
         * Only return messages matching the specified query. Supports the same query format as the Gmail search box. For example, "from:someuser@example.com rfc822msgid:<somemsgid@example.com> is:unread". Parameter cannot be used when accessing the api using the gmail.metadata scope.
         */
        q?: string;
        /**
         * The user's email address. The special value me can be used to indicate the authenticated user.
         */
        userId?: string;
    }
    export interface Params$Resource$Users$Messages$Modify extends StandardParameters {
        /**
         * The ID of the message to modify.
         */
        id?: string;
        /**
         * The user's email address. The special value me can be used to indicate the authenticated user.
         */
        userId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$ModifyMessageRequest;
    }
    export interface Params$Resource$Users$Messages$Send extends StandardParameters {
        /**
         * The user's email address. The special value me can be used to indicate the authenticated user.
         */
        userId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Message;
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
    export interface Params$Resource$Users$Messages$Trash extends StandardParameters {
        /**
         * The ID of the message to Trash.
         */
        id?: string;
        /**
         * The user's email address. The special value me can be used to indicate the authenticated user.
         */
        userId?: string;
    }
    export interface Params$Resource$Users$Messages$Untrash extends StandardParameters {
        /**
         * The ID of the message to remove from Trash.
         */
        id?: string;
        /**
         * The user's email address. The special value me can be used to indicate the authenticated user.
         */
        userId?: string;
    }
    export class Resource$Users$Messages$Attachments {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * gmail.users.messages.attachments.get
         * @desc Gets the specified message attachment.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://mail.google.com/',
         *       'https://www.googleapis.com/auth/gmail.addons.current.message.action',
         *       'https://www.googleapis.com/auth/gmail.addons.current.message.readonly',
         *       'https://www.googleapis.com/auth/gmail.modify',
         *       'https://www.googleapis.com/auth/gmail.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.messages.attachments.get({
         *     // The ID of the attachment.
         *     id: 'placeholder-value',
         *     // The ID of the message containing the attachment.
         *     messageId: 'placeholder-value',
         *     // The user's email address. The special value me can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "attachmentId": "my_attachmentId",
         *   //   "data": "my_data",
         *   //   "size": 0
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.messages.attachments.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.id The ID of the attachment.
         * @param {string} params.messageId The ID of the message containing the attachment.
         * @param {string} params.userId The user's email address. The special value me can be used to indicate the authenticated user.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Users$Messages$Attachments$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Users$Messages$Attachments$Get, options?: MethodOptions): GaxiosPromise<Schema$MessagePartBody>;
        get(params: Params$Resource$Users$Messages$Attachments$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Users$Messages$Attachments$Get, options: MethodOptions | BodyResponseCallback<Schema$MessagePartBody>, callback: BodyResponseCallback<Schema$MessagePartBody>): void;
        get(params: Params$Resource$Users$Messages$Attachments$Get, callback: BodyResponseCallback<Schema$MessagePartBody>): void;
        get(callback: BodyResponseCallback<Schema$MessagePartBody>): void;
    }
    export interface Params$Resource$Users$Messages$Attachments$Get extends StandardParameters {
        /**
         * The ID of the attachment.
         */
        id?: string;
        /**
         * The ID of the message containing the attachment.
         */
        messageId?: string;
        /**
         * The user's email address. The special value me can be used to indicate the authenticated user.
         */
        userId?: string;
    }
    export class Resource$Users$Settings {
        context: APIRequestContext;
        delegates: Resource$Users$Settings$Delegates;
        filters: Resource$Users$Settings$Filters;
        forwardingAddresses: Resource$Users$Settings$Forwardingaddresses;
        sendAs: Resource$Users$Settings$Sendas;
        constructor(context: APIRequestContext);
        /**
         * gmail.users.settings.getAutoForwarding
         * @desc Gets the auto-forwarding setting for the specified account.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://mail.google.com/',
         *       'https://www.googleapis.com/auth/gmail.modify',
         *       'https://www.googleapis.com/auth/gmail.readonly',
         *       'https://www.googleapis.com/auth/gmail.settings.basic',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.settings.getAutoForwarding({
         *     // User's email address. The special value "me" can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "disposition": "my_disposition",
         *   //   "emailAddress": "my_emailAddress",
         *   //   "enabled": false
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.settings.getAutoForwarding
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.userId User's email address. The special value "me" can be used to indicate the authenticated user.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        getAutoForwarding(params: Params$Resource$Users$Settings$Getautoforwarding, options: StreamMethodOptions): GaxiosPromise<Readable>;
        getAutoForwarding(params?: Params$Resource$Users$Settings$Getautoforwarding, options?: MethodOptions): GaxiosPromise<Schema$AutoForwarding>;
        getAutoForwarding(params: Params$Resource$Users$Settings$Getautoforwarding, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        getAutoForwarding(params: Params$Resource$Users$Settings$Getautoforwarding, options: MethodOptions | BodyResponseCallback<Schema$AutoForwarding>, callback: BodyResponseCallback<Schema$AutoForwarding>): void;
        getAutoForwarding(params: Params$Resource$Users$Settings$Getautoforwarding, callback: BodyResponseCallback<Schema$AutoForwarding>): void;
        getAutoForwarding(callback: BodyResponseCallback<Schema$AutoForwarding>): void;
        /**
         * gmail.users.settings.getImap
         * @desc Gets IMAP settings.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://mail.google.com/',
         *       'https://www.googleapis.com/auth/gmail.modify',
         *       'https://www.googleapis.com/auth/gmail.readonly',
         *       'https://www.googleapis.com/auth/gmail.settings.basic',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.settings.getImap({
         *     // User's email address. The special value "me" can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "autoExpunge": false,
         *   //   "enabled": false,
         *   //   "expungeBehavior": "my_expungeBehavior",
         *   //   "maxFolderSize": 0
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.settings.getImap
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.userId User's email address. The special value "me" can be used to indicate the authenticated user.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        getImap(params: Params$Resource$Users$Settings$Getimap, options: StreamMethodOptions): GaxiosPromise<Readable>;
        getImap(params?: Params$Resource$Users$Settings$Getimap, options?: MethodOptions): GaxiosPromise<Schema$ImapSettings>;
        getImap(params: Params$Resource$Users$Settings$Getimap, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        getImap(params: Params$Resource$Users$Settings$Getimap, options: MethodOptions | BodyResponseCallback<Schema$ImapSettings>, callback: BodyResponseCallback<Schema$ImapSettings>): void;
        getImap(params: Params$Resource$Users$Settings$Getimap, callback: BodyResponseCallback<Schema$ImapSettings>): void;
        getImap(callback: BodyResponseCallback<Schema$ImapSettings>): void;
        /**
         * gmail.users.settings.getLanguage
         * @desc Gets language settings.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://mail.google.com/',
         *       'https://www.googleapis.com/auth/gmail.modify',
         *       'https://www.googleapis.com/auth/gmail.readonly',
         *       'https://www.googleapis.com/auth/gmail.settings.basic',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.settings.getLanguage({
         *     // User's email address. The special value "me" can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "displayLanguage": "my_displayLanguage"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.settings.getLanguage
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.userId User's email address. The special value "me" can be used to indicate the authenticated user.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        getLanguage(params: Params$Resource$Users$Settings$Getlanguage, options: StreamMethodOptions): GaxiosPromise<Readable>;
        getLanguage(params?: Params$Resource$Users$Settings$Getlanguage, options?: MethodOptions): GaxiosPromise<Schema$LanguageSettings>;
        getLanguage(params: Params$Resource$Users$Settings$Getlanguage, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        getLanguage(params: Params$Resource$Users$Settings$Getlanguage, options: MethodOptions | BodyResponseCallback<Schema$LanguageSettings>, callback: BodyResponseCallback<Schema$LanguageSettings>): void;
        getLanguage(params: Params$Resource$Users$Settings$Getlanguage, callback: BodyResponseCallback<Schema$LanguageSettings>): void;
        getLanguage(callback: BodyResponseCallback<Schema$LanguageSettings>): void;
        /**
         * gmail.users.settings.getPop
         * @desc Gets POP settings.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://mail.google.com/',
         *       'https://www.googleapis.com/auth/gmail.modify',
         *       'https://www.googleapis.com/auth/gmail.readonly',
         *       'https://www.googleapis.com/auth/gmail.settings.basic',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.settings.getPop({
         *     // User's email address. The special value "me" can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "accessWindow": "my_accessWindow",
         *   //   "disposition": "my_disposition"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.settings.getPop
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.userId User's email address. The special value "me" can be used to indicate the authenticated user.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        getPop(params: Params$Resource$Users$Settings$Getpop, options: StreamMethodOptions): GaxiosPromise<Readable>;
        getPop(params?: Params$Resource$Users$Settings$Getpop, options?: MethodOptions): GaxiosPromise<Schema$PopSettings>;
        getPop(params: Params$Resource$Users$Settings$Getpop, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        getPop(params: Params$Resource$Users$Settings$Getpop, options: MethodOptions | BodyResponseCallback<Schema$PopSettings>, callback: BodyResponseCallback<Schema$PopSettings>): void;
        getPop(params: Params$Resource$Users$Settings$Getpop, callback: BodyResponseCallback<Schema$PopSettings>): void;
        getPop(callback: BodyResponseCallback<Schema$PopSettings>): void;
        /**
         * gmail.users.settings.getVacation
         * @desc Gets vacation responder settings.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://mail.google.com/',
         *       'https://www.googleapis.com/auth/gmail.modify',
         *       'https://www.googleapis.com/auth/gmail.readonly',
         *       'https://www.googleapis.com/auth/gmail.settings.basic',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.settings.getVacation({
         *     // User's email address. The special value "me" can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "enableAutoReply": false,
         *   //   "endTime": "my_endTime",
         *   //   "responseBodyHtml": "my_responseBodyHtml",
         *   //   "responseBodyPlainText": "my_responseBodyPlainText",
         *   //   "responseSubject": "my_responseSubject",
         *   //   "restrictToContacts": false,
         *   //   "restrictToDomain": false,
         *   //   "startTime": "my_startTime"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.settings.getVacation
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.userId User's email address. The special value "me" can be used to indicate the authenticated user.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        getVacation(params: Params$Resource$Users$Settings$Getvacation, options: StreamMethodOptions): GaxiosPromise<Readable>;
        getVacation(params?: Params$Resource$Users$Settings$Getvacation, options?: MethodOptions): GaxiosPromise<Schema$VacationSettings>;
        getVacation(params: Params$Resource$Users$Settings$Getvacation, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        getVacation(params: Params$Resource$Users$Settings$Getvacation, options: MethodOptions | BodyResponseCallback<Schema$VacationSettings>, callback: BodyResponseCallback<Schema$VacationSettings>): void;
        getVacation(params: Params$Resource$Users$Settings$Getvacation, callback: BodyResponseCallback<Schema$VacationSettings>): void;
        getVacation(callback: BodyResponseCallback<Schema$VacationSettings>): void;
        /**
         * gmail.users.settings.updateAutoForwarding
         * @desc Updates the auto-forwarding setting for the specified account. A verified forwarding address must be specified when auto-forwarding is enabled.  This method is only available to service account clients that have been delegated domain-wide authority.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/gmail.settings.sharing'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.settings.updateAutoForwarding({
         *     // User's email address. The special value "me" can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "disposition": "my_disposition",
         *       //   "emailAddress": "my_emailAddress",
         *       //   "enabled": false
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "disposition": "my_disposition",
         *   //   "emailAddress": "my_emailAddress",
         *   //   "enabled": false
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.settings.updateAutoForwarding
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.userId User's email address. The special value "me" can be used to indicate the authenticated user.
         * @param {().AutoForwarding} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        updateAutoForwarding(params: Params$Resource$Users$Settings$Updateautoforwarding, options: StreamMethodOptions): GaxiosPromise<Readable>;
        updateAutoForwarding(params?: Params$Resource$Users$Settings$Updateautoforwarding, options?: MethodOptions): GaxiosPromise<Schema$AutoForwarding>;
        updateAutoForwarding(params: Params$Resource$Users$Settings$Updateautoforwarding, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        updateAutoForwarding(params: Params$Resource$Users$Settings$Updateautoforwarding, options: MethodOptions | BodyResponseCallback<Schema$AutoForwarding>, callback: BodyResponseCallback<Schema$AutoForwarding>): void;
        updateAutoForwarding(params: Params$Resource$Users$Settings$Updateautoforwarding, callback: BodyResponseCallback<Schema$AutoForwarding>): void;
        updateAutoForwarding(callback: BodyResponseCallback<Schema$AutoForwarding>): void;
        /**
         * gmail.users.settings.updateImap
         * @desc Updates IMAP settings.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/gmail.settings.basic'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.settings.updateImap({
         *     // User's email address. The special value "me" can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "autoExpunge": false,
         *       //   "enabled": false,
         *       //   "expungeBehavior": "my_expungeBehavior",
         *       //   "maxFolderSize": 0
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "autoExpunge": false,
         *   //   "enabled": false,
         *   //   "expungeBehavior": "my_expungeBehavior",
         *   //   "maxFolderSize": 0
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.settings.updateImap
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.userId User's email address. The special value "me" can be used to indicate the authenticated user.
         * @param {().ImapSettings} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        updateImap(params: Params$Resource$Users$Settings$Updateimap, options: StreamMethodOptions): GaxiosPromise<Readable>;
        updateImap(params?: Params$Resource$Users$Settings$Updateimap, options?: MethodOptions): GaxiosPromise<Schema$ImapSettings>;
        updateImap(params: Params$Resource$Users$Settings$Updateimap, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        updateImap(params: Params$Resource$Users$Settings$Updateimap, options: MethodOptions | BodyResponseCallback<Schema$ImapSettings>, callback: BodyResponseCallback<Schema$ImapSettings>): void;
        updateImap(params: Params$Resource$Users$Settings$Updateimap, callback: BodyResponseCallback<Schema$ImapSettings>): void;
        updateImap(callback: BodyResponseCallback<Schema$ImapSettings>): void;
        /**
         * gmail.users.settings.updateLanguage
         * @desc Updates language settings.  If successful, the return object contains the displayLanguage that was saved for the user, which may differ from the value passed into the request. This is because the requested displayLanguage may not be directly supported by Gmail but have a close variant that is, and so the variant may be chosen and saved instead.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/gmail.settings.basic'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.settings.updateLanguage({
         *     // User's email address. The special value "me" can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "displayLanguage": "my_displayLanguage"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "displayLanguage": "my_displayLanguage"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.settings.updateLanguage
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.userId User's email address. The special value "me" can be used to indicate the authenticated user.
         * @param {().LanguageSettings} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        updateLanguage(params: Params$Resource$Users$Settings$Updatelanguage, options: StreamMethodOptions): GaxiosPromise<Readable>;
        updateLanguage(params?: Params$Resource$Users$Settings$Updatelanguage, options?: MethodOptions): GaxiosPromise<Schema$LanguageSettings>;
        updateLanguage(params: Params$Resource$Users$Settings$Updatelanguage, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        updateLanguage(params: Params$Resource$Users$Settings$Updatelanguage, options: MethodOptions | BodyResponseCallback<Schema$LanguageSettings>, callback: BodyResponseCallback<Schema$LanguageSettings>): void;
        updateLanguage(params: Params$Resource$Users$Settings$Updatelanguage, callback: BodyResponseCallback<Schema$LanguageSettings>): void;
        updateLanguage(callback: BodyResponseCallback<Schema$LanguageSettings>): void;
        /**
         * gmail.users.settings.updatePop
         * @desc Updates POP settings.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/gmail.settings.basic'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.settings.updatePop({
         *     // User's email address. The special value "me" can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "accessWindow": "my_accessWindow",
         *       //   "disposition": "my_disposition"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "accessWindow": "my_accessWindow",
         *   //   "disposition": "my_disposition"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.settings.updatePop
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.userId User's email address. The special value "me" can be used to indicate the authenticated user.
         * @param {().PopSettings} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        updatePop(params: Params$Resource$Users$Settings$Updatepop, options: StreamMethodOptions): GaxiosPromise<Readable>;
        updatePop(params?: Params$Resource$Users$Settings$Updatepop, options?: MethodOptions): GaxiosPromise<Schema$PopSettings>;
        updatePop(params: Params$Resource$Users$Settings$Updatepop, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        updatePop(params: Params$Resource$Users$Settings$Updatepop, options: MethodOptions | BodyResponseCallback<Schema$PopSettings>, callback: BodyResponseCallback<Schema$PopSettings>): void;
        updatePop(params: Params$Resource$Users$Settings$Updatepop, callback: BodyResponseCallback<Schema$PopSettings>): void;
        updatePop(callback: BodyResponseCallback<Schema$PopSettings>): void;
        /**
         * gmail.users.settings.updateVacation
         * @desc Updates vacation responder settings.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/gmail.settings.basic'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.settings.updateVacation({
         *     // User's email address. The special value "me" can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "enableAutoReply": false,
         *       //   "endTime": "my_endTime",
         *       //   "responseBodyHtml": "my_responseBodyHtml",
         *       //   "responseBodyPlainText": "my_responseBodyPlainText",
         *       //   "responseSubject": "my_responseSubject",
         *       //   "restrictToContacts": false,
         *       //   "restrictToDomain": false,
         *       //   "startTime": "my_startTime"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "enableAutoReply": false,
         *   //   "endTime": "my_endTime",
         *   //   "responseBodyHtml": "my_responseBodyHtml",
         *   //   "responseBodyPlainText": "my_responseBodyPlainText",
         *   //   "responseSubject": "my_responseSubject",
         *   //   "restrictToContacts": false,
         *   //   "restrictToDomain": false,
         *   //   "startTime": "my_startTime"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.settings.updateVacation
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.userId User's email address. The special value "me" can be used to indicate the authenticated user.
         * @param {().VacationSettings} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        updateVacation(params: Params$Resource$Users$Settings$Updatevacation, options: StreamMethodOptions): GaxiosPromise<Readable>;
        updateVacation(params?: Params$Resource$Users$Settings$Updatevacation, options?: MethodOptions): GaxiosPromise<Schema$VacationSettings>;
        updateVacation(params: Params$Resource$Users$Settings$Updatevacation, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        updateVacation(params: Params$Resource$Users$Settings$Updatevacation, options: MethodOptions | BodyResponseCallback<Schema$VacationSettings>, callback: BodyResponseCallback<Schema$VacationSettings>): void;
        updateVacation(params: Params$Resource$Users$Settings$Updatevacation, callback: BodyResponseCallback<Schema$VacationSettings>): void;
        updateVacation(callback: BodyResponseCallback<Schema$VacationSettings>): void;
    }
    export interface Params$Resource$Users$Settings$Getautoforwarding extends StandardParameters {
        /**
         * User's email address. The special value "me" can be used to indicate the authenticated user.
         */
        userId?: string;
    }
    export interface Params$Resource$Users$Settings$Getimap extends StandardParameters {
        /**
         * User's email address. The special value "me" can be used to indicate the authenticated user.
         */
        userId?: string;
    }
    export interface Params$Resource$Users$Settings$Getlanguage extends StandardParameters {
        /**
         * User's email address. The special value "me" can be used to indicate the authenticated user.
         */
        userId?: string;
    }
    export interface Params$Resource$Users$Settings$Getpop extends StandardParameters {
        /**
         * User's email address. The special value "me" can be used to indicate the authenticated user.
         */
        userId?: string;
    }
    export interface Params$Resource$Users$Settings$Getvacation extends StandardParameters {
        /**
         * User's email address. The special value "me" can be used to indicate the authenticated user.
         */
        userId?: string;
    }
    export interface Params$Resource$Users$Settings$Updateautoforwarding extends StandardParameters {
        /**
         * User's email address. The special value "me" can be used to indicate the authenticated user.
         */
        userId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$AutoForwarding;
    }
    export interface Params$Resource$Users$Settings$Updateimap extends StandardParameters {
        /**
         * User's email address. The special value "me" can be used to indicate the authenticated user.
         */
        userId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$ImapSettings;
    }
    export interface Params$Resource$Users$Settings$Updatelanguage extends StandardParameters {
        /**
         * User's email address. The special value "me" can be used to indicate the authenticated user.
         */
        userId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$LanguageSettings;
    }
    export interface Params$Resource$Users$Settings$Updatepop extends StandardParameters {
        /**
         * User's email address. The special value "me" can be used to indicate the authenticated user.
         */
        userId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$PopSettings;
    }
    export interface Params$Resource$Users$Settings$Updatevacation extends StandardParameters {
        /**
         * User's email address. The special value "me" can be used to indicate the authenticated user.
         */
        userId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$VacationSettings;
    }
    export class Resource$Users$Settings$Delegates {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * gmail.users.settings.delegates.create
         * @desc Adds a delegate with its verification status set directly to accepted, without sending any verification email. The delegate user must be a member of the same G Suite organization as the delegator user.  Gmail imposes limitations on the number of delegates and delegators each user in a G Suite organization can have. These limits depend on your organization, but in general each user can have up to 25 delegates and up to 10 delegators.  Note that a delegate user must be referred to by their primary email address, and not an email alias.  Also note that when a new delegate is created, there may be up to a one minute delay before the new delegate is available for use.  This method is only available to service account clients that have been delegated domain-wide authority.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/gmail.settings.sharing'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.settings.delegates.create({
         *     // User's email address. The special value "me" can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "delegateEmail": "my_delegateEmail",
         *       //   "verificationStatus": "my_verificationStatus"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "delegateEmail": "my_delegateEmail",
         *   //   "verificationStatus": "my_verificationStatus"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.settings.delegates.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.userId User's email address. The special value "me" can be used to indicate the authenticated user.
         * @param {().Delegate} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Users$Settings$Delegates$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Users$Settings$Delegates$Create, options?: MethodOptions): GaxiosPromise<Schema$Delegate>;
        create(params: Params$Resource$Users$Settings$Delegates$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Users$Settings$Delegates$Create, options: MethodOptions | BodyResponseCallback<Schema$Delegate>, callback: BodyResponseCallback<Schema$Delegate>): void;
        create(params: Params$Resource$Users$Settings$Delegates$Create, callback: BodyResponseCallback<Schema$Delegate>): void;
        create(callback: BodyResponseCallback<Schema$Delegate>): void;
        /**
         * gmail.users.settings.delegates.delete
         * @desc Removes the specified delegate (which can be of any verification status), and revokes any verification that may have been required for using it.  Note that a delegate user must be referred to by their primary email address, and not an email alias.  This method is only available to service account clients that have been delegated domain-wide authority.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/gmail.settings.sharing'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.settings.delegates.delete({
         *     // The email address of the user to be removed as a delegate.
         *     delegateEmail: 'placeholder-value',
         *     // User's email address. The special value "me" can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.settings.delegates.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.delegateEmail The email address of the user to be removed as a delegate.
         * @param {string} params.userId User's email address. The special value "me" can be used to indicate the authenticated user.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Users$Settings$Delegates$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Users$Settings$Delegates$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Users$Settings$Delegates$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Users$Settings$Delegates$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Users$Settings$Delegates$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * gmail.users.settings.delegates.get
         * @desc Gets the specified delegate.  Note that a delegate user must be referred to by their primary email address, and not an email alias.  This method is only available to service account clients that have been delegated domain-wide authority.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://mail.google.com/',
         *       'https://www.googleapis.com/auth/gmail.modify',
         *       'https://www.googleapis.com/auth/gmail.readonly',
         *       'https://www.googleapis.com/auth/gmail.settings.basic',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.settings.delegates.get({
         *     // The email address of the user whose delegate relationship is to be retrieved.
         *     delegateEmail: 'placeholder-value',
         *     // User's email address. The special value "me" can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "delegateEmail": "my_delegateEmail",
         *   //   "verificationStatus": "my_verificationStatus"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.settings.delegates.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.delegateEmail The email address of the user whose delegate relationship is to be retrieved.
         * @param {string} params.userId User's email address. The special value "me" can be used to indicate the authenticated user.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Users$Settings$Delegates$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Users$Settings$Delegates$Get, options?: MethodOptions): GaxiosPromise<Schema$Delegate>;
        get(params: Params$Resource$Users$Settings$Delegates$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Users$Settings$Delegates$Get, options: MethodOptions | BodyResponseCallback<Schema$Delegate>, callback: BodyResponseCallback<Schema$Delegate>): void;
        get(params: Params$Resource$Users$Settings$Delegates$Get, callback: BodyResponseCallback<Schema$Delegate>): void;
        get(callback: BodyResponseCallback<Schema$Delegate>): void;
        /**
         * gmail.users.settings.delegates.list
         * @desc Lists the delegates for the specified account.  This method is only available to service account clients that have been delegated domain-wide authority.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://mail.google.com/',
         *       'https://www.googleapis.com/auth/gmail.modify',
         *       'https://www.googleapis.com/auth/gmail.readonly',
         *       'https://www.googleapis.com/auth/gmail.settings.basic',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.settings.delegates.list({
         *     // User's email address. The special value "me" can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "delegates": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.settings.delegates.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.userId User's email address. The special value "me" can be used to indicate the authenticated user.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Users$Settings$Delegates$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Users$Settings$Delegates$List, options?: MethodOptions): GaxiosPromise<Schema$ListDelegatesResponse>;
        list(params: Params$Resource$Users$Settings$Delegates$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Users$Settings$Delegates$List, options: MethodOptions | BodyResponseCallback<Schema$ListDelegatesResponse>, callback: BodyResponseCallback<Schema$ListDelegatesResponse>): void;
        list(params: Params$Resource$Users$Settings$Delegates$List, callback: BodyResponseCallback<Schema$ListDelegatesResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListDelegatesResponse>): void;
    }
    export interface Params$Resource$Users$Settings$Delegates$Create extends StandardParameters {
        /**
         * User's email address. The special value "me" can be used to indicate the authenticated user.
         */
        userId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Delegate;
    }
    export interface Params$Resource$Users$Settings$Delegates$Delete extends StandardParameters {
        /**
         * The email address of the user to be removed as a delegate.
         */
        delegateEmail?: string;
        /**
         * User's email address. The special value "me" can be used to indicate the authenticated user.
         */
        userId?: string;
    }
    export interface Params$Resource$Users$Settings$Delegates$Get extends StandardParameters {
        /**
         * The email address of the user whose delegate relationship is to be retrieved.
         */
        delegateEmail?: string;
        /**
         * User's email address. The special value "me" can be used to indicate the authenticated user.
         */
        userId?: string;
    }
    export interface Params$Resource$Users$Settings$Delegates$List extends StandardParameters {
        /**
         * User's email address. The special value "me" can be used to indicate the authenticated user.
         */
        userId?: string;
    }
    export class Resource$Users$Settings$Filters {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * gmail.users.settings.filters.create
         * @desc Creates a filter.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/gmail.settings.basic'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.settings.filters.create({
         *     // User's email address. The special value "me" can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "action": {},
         *       //   "criteria": {},
         *       //   "id": "my_id"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "action": {},
         *   //   "criteria": {},
         *   //   "id": "my_id"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.settings.filters.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.userId User's email address. The special value "me" can be used to indicate the authenticated user.
         * @param {().Filter} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Users$Settings$Filters$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Users$Settings$Filters$Create, options?: MethodOptions): GaxiosPromise<Schema$Filter>;
        create(params: Params$Resource$Users$Settings$Filters$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Users$Settings$Filters$Create, options: MethodOptions | BodyResponseCallback<Schema$Filter>, callback: BodyResponseCallback<Schema$Filter>): void;
        create(params: Params$Resource$Users$Settings$Filters$Create, callback: BodyResponseCallback<Schema$Filter>): void;
        create(callback: BodyResponseCallback<Schema$Filter>): void;
        /**
         * gmail.users.settings.filters.delete
         * @desc Deletes a filter.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/gmail.settings.basic'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.settings.filters.delete({
         *     // The ID of the filter to be deleted.
         *     id: 'placeholder-value',
         *     // User's email address. The special value "me" can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.settings.filters.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.id The ID of the filter to be deleted.
         * @param {string} params.userId User's email address. The special value "me" can be used to indicate the authenticated user.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Users$Settings$Filters$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Users$Settings$Filters$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Users$Settings$Filters$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Users$Settings$Filters$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Users$Settings$Filters$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * gmail.users.settings.filters.get
         * @desc Gets a filter.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://mail.google.com/',
         *       'https://www.googleapis.com/auth/gmail.modify',
         *       'https://www.googleapis.com/auth/gmail.readonly',
         *       'https://www.googleapis.com/auth/gmail.settings.basic',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.settings.filters.get({
         *     // The ID of the filter to be fetched.
         *     id: 'placeholder-value',
         *     // User's email address. The special value "me" can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "action": {},
         *   //   "criteria": {},
         *   //   "id": "my_id"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.settings.filters.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.id The ID of the filter to be fetched.
         * @param {string} params.userId User's email address. The special value "me" can be used to indicate the authenticated user.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Users$Settings$Filters$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Users$Settings$Filters$Get, options?: MethodOptions): GaxiosPromise<Schema$Filter>;
        get(params: Params$Resource$Users$Settings$Filters$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Users$Settings$Filters$Get, options: MethodOptions | BodyResponseCallback<Schema$Filter>, callback: BodyResponseCallback<Schema$Filter>): void;
        get(params: Params$Resource$Users$Settings$Filters$Get, callback: BodyResponseCallback<Schema$Filter>): void;
        get(callback: BodyResponseCallback<Schema$Filter>): void;
        /**
         * gmail.users.settings.filters.list
         * @desc Lists the message filters of a Gmail user.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://mail.google.com/',
         *       'https://www.googleapis.com/auth/gmail.modify',
         *       'https://www.googleapis.com/auth/gmail.readonly',
         *       'https://www.googleapis.com/auth/gmail.settings.basic',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.settings.filters.list({
         *     // User's email address. The special value "me" can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "filter": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.settings.filters.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.userId User's email address. The special value "me" can be used to indicate the authenticated user.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Users$Settings$Filters$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Users$Settings$Filters$List, options?: MethodOptions): GaxiosPromise<Schema$ListFiltersResponse>;
        list(params: Params$Resource$Users$Settings$Filters$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Users$Settings$Filters$List, options: MethodOptions | BodyResponseCallback<Schema$ListFiltersResponse>, callback: BodyResponseCallback<Schema$ListFiltersResponse>): void;
        list(params: Params$Resource$Users$Settings$Filters$List, callback: BodyResponseCallback<Schema$ListFiltersResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListFiltersResponse>): void;
    }
    export interface Params$Resource$Users$Settings$Filters$Create extends StandardParameters {
        /**
         * User's email address. The special value "me" can be used to indicate the authenticated user.
         */
        userId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Filter;
    }
    export interface Params$Resource$Users$Settings$Filters$Delete extends StandardParameters {
        /**
         * The ID of the filter to be deleted.
         */
        id?: string;
        /**
         * User's email address. The special value "me" can be used to indicate the authenticated user.
         */
        userId?: string;
    }
    export interface Params$Resource$Users$Settings$Filters$Get extends StandardParameters {
        /**
         * The ID of the filter to be fetched.
         */
        id?: string;
        /**
         * User's email address. The special value "me" can be used to indicate the authenticated user.
         */
        userId?: string;
    }
    export interface Params$Resource$Users$Settings$Filters$List extends StandardParameters {
        /**
         * User's email address. The special value "me" can be used to indicate the authenticated user.
         */
        userId?: string;
    }
    export class Resource$Users$Settings$Forwardingaddresses {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * gmail.users.settings.forwardingAddresses.create
         * @desc Creates a forwarding address. If ownership verification is required, a message will be sent to the recipient and the resource's verification status will be set to pending; otherwise, the resource will be created with verification status set to accepted.  This method is only available to service account clients that have been delegated domain-wide authority.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/gmail.settings.sharing'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.settings.forwardingAddresses.create({
         *     // User's email address. The special value "me" can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "forwardingEmail": "my_forwardingEmail",
         *       //   "verificationStatus": "my_verificationStatus"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "forwardingEmail": "my_forwardingEmail",
         *   //   "verificationStatus": "my_verificationStatus"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.settings.forwardingAddresses.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.userId User's email address. The special value "me" can be used to indicate the authenticated user.
         * @param {().ForwardingAddress} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Users$Settings$Forwardingaddresses$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Users$Settings$Forwardingaddresses$Create, options?: MethodOptions): GaxiosPromise<Schema$ForwardingAddress>;
        create(params: Params$Resource$Users$Settings$Forwardingaddresses$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Users$Settings$Forwardingaddresses$Create, options: MethodOptions | BodyResponseCallback<Schema$ForwardingAddress>, callback: BodyResponseCallback<Schema$ForwardingAddress>): void;
        create(params: Params$Resource$Users$Settings$Forwardingaddresses$Create, callback: BodyResponseCallback<Schema$ForwardingAddress>): void;
        create(callback: BodyResponseCallback<Schema$ForwardingAddress>): void;
        /**
         * gmail.users.settings.forwardingAddresses.delete
         * @desc Deletes the specified forwarding address and revokes any verification that may have been required.  This method is only available to service account clients that have been delegated domain-wide authority.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/gmail.settings.sharing'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.settings.forwardingAddresses.delete({
         *     // The forwarding address to be deleted.
         *     forwardingEmail: 'placeholder-value',
         *     // User's email address. The special value "me" can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.settings.forwardingAddresses.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.forwardingEmail The forwarding address to be deleted.
         * @param {string} params.userId User's email address. The special value "me" can be used to indicate the authenticated user.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Users$Settings$Forwardingaddresses$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Users$Settings$Forwardingaddresses$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Users$Settings$Forwardingaddresses$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Users$Settings$Forwardingaddresses$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Users$Settings$Forwardingaddresses$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * gmail.users.settings.forwardingAddresses.get
         * @desc Gets the specified forwarding address.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://mail.google.com/',
         *       'https://www.googleapis.com/auth/gmail.modify',
         *       'https://www.googleapis.com/auth/gmail.readonly',
         *       'https://www.googleapis.com/auth/gmail.settings.basic',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.settings.forwardingAddresses.get({
         *     // The forwarding address to be retrieved.
         *     forwardingEmail: 'placeholder-value',
         *     // User's email address. The special value "me" can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "forwardingEmail": "my_forwardingEmail",
         *   //   "verificationStatus": "my_verificationStatus"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.settings.forwardingAddresses.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.forwardingEmail The forwarding address to be retrieved.
         * @param {string} params.userId User's email address. The special value "me" can be used to indicate the authenticated user.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Users$Settings$Forwardingaddresses$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Users$Settings$Forwardingaddresses$Get, options?: MethodOptions): GaxiosPromise<Schema$ForwardingAddress>;
        get(params: Params$Resource$Users$Settings$Forwardingaddresses$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Users$Settings$Forwardingaddresses$Get, options: MethodOptions | BodyResponseCallback<Schema$ForwardingAddress>, callback: BodyResponseCallback<Schema$ForwardingAddress>): void;
        get(params: Params$Resource$Users$Settings$Forwardingaddresses$Get, callback: BodyResponseCallback<Schema$ForwardingAddress>): void;
        get(callback: BodyResponseCallback<Schema$ForwardingAddress>): void;
        /**
         * gmail.users.settings.forwardingAddresses.list
         * @desc Lists the forwarding addresses for the specified account.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://mail.google.com/',
         *       'https://www.googleapis.com/auth/gmail.modify',
         *       'https://www.googleapis.com/auth/gmail.readonly',
         *       'https://www.googleapis.com/auth/gmail.settings.basic',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.settings.forwardingAddresses.list({
         *     // User's email address. The special value "me" can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "forwardingAddresses": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.settings.forwardingAddresses.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.userId User's email address. The special value "me" can be used to indicate the authenticated user.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Users$Settings$Forwardingaddresses$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Users$Settings$Forwardingaddresses$List, options?: MethodOptions): GaxiosPromise<Schema$ListForwardingAddressesResponse>;
        list(params: Params$Resource$Users$Settings$Forwardingaddresses$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Users$Settings$Forwardingaddresses$List, options: MethodOptions | BodyResponseCallback<Schema$ListForwardingAddressesResponse>, callback: BodyResponseCallback<Schema$ListForwardingAddressesResponse>): void;
        list(params: Params$Resource$Users$Settings$Forwardingaddresses$List, callback: BodyResponseCallback<Schema$ListForwardingAddressesResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListForwardingAddressesResponse>): void;
    }
    export interface Params$Resource$Users$Settings$Forwardingaddresses$Create extends StandardParameters {
        /**
         * User's email address. The special value "me" can be used to indicate the authenticated user.
         */
        userId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$ForwardingAddress;
    }
    export interface Params$Resource$Users$Settings$Forwardingaddresses$Delete extends StandardParameters {
        /**
         * The forwarding address to be deleted.
         */
        forwardingEmail?: string;
        /**
         * User's email address. The special value "me" can be used to indicate the authenticated user.
         */
        userId?: string;
    }
    export interface Params$Resource$Users$Settings$Forwardingaddresses$Get extends StandardParameters {
        /**
         * The forwarding address to be retrieved.
         */
        forwardingEmail?: string;
        /**
         * User's email address. The special value "me" can be used to indicate the authenticated user.
         */
        userId?: string;
    }
    export interface Params$Resource$Users$Settings$Forwardingaddresses$List extends StandardParameters {
        /**
         * User's email address. The special value "me" can be used to indicate the authenticated user.
         */
        userId?: string;
    }
    export class Resource$Users$Settings$Sendas {
        context: APIRequestContext;
        smimeInfo: Resource$Users$Settings$Sendas$Smimeinfo;
        constructor(context: APIRequestContext);
        /**
         * gmail.users.settings.sendAs.create
         * @desc Creates a custom "from" send-as alias. If an SMTP MSA is specified, Gmail will attempt to connect to the SMTP service to validate the configuration before creating the alias. If ownership verification is required for the alias, a message will be sent to the email address and the resource's verification status will be set to pending; otherwise, the resource will be created with verification status set to accepted. If a signature is provided, Gmail will sanitize the HTML before saving it with the alias.  This method is only available to service account clients that have been delegated domain-wide authority.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/gmail.settings.sharing'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.settings.sendAs.create({
         *     // User's email address. The special value "me" can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "displayName": "my_displayName",
         *       //   "isDefault": false,
         *       //   "isPrimary": false,
         *       //   "replyToAddress": "my_replyToAddress",
         *       //   "sendAsEmail": "my_sendAsEmail",
         *       //   "signature": "my_signature",
         *       //   "smtpMsa": {},
         *       //   "treatAsAlias": false,
         *       //   "verificationStatus": "my_verificationStatus"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "displayName": "my_displayName",
         *   //   "isDefault": false,
         *   //   "isPrimary": false,
         *   //   "replyToAddress": "my_replyToAddress",
         *   //   "sendAsEmail": "my_sendAsEmail",
         *   //   "signature": "my_signature",
         *   //   "smtpMsa": {},
         *   //   "treatAsAlias": false,
         *   //   "verificationStatus": "my_verificationStatus"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.settings.sendAs.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.userId User's email address. The special value "me" can be used to indicate the authenticated user.
         * @param {().SendAs} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Users$Settings$Sendas$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Users$Settings$Sendas$Create, options?: MethodOptions): GaxiosPromise<Schema$SendAs>;
        create(params: Params$Resource$Users$Settings$Sendas$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Users$Settings$Sendas$Create, options: MethodOptions | BodyResponseCallback<Schema$SendAs>, callback: BodyResponseCallback<Schema$SendAs>): void;
        create(params: Params$Resource$Users$Settings$Sendas$Create, callback: BodyResponseCallback<Schema$SendAs>): void;
        create(callback: BodyResponseCallback<Schema$SendAs>): void;
        /**
         * gmail.users.settings.sendAs.delete
         * @desc Deletes the specified send-as alias. Revokes any verification that may have been required for using it.  This method is only available to service account clients that have been delegated domain-wide authority.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/gmail.settings.sharing'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.settings.sendAs.delete({
         *     // The send-as alias to be deleted.
         *     sendAsEmail: 'placeholder-value',
         *     // User's email address. The special value "me" can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.settings.sendAs.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.sendAsEmail The send-as alias to be deleted.
         * @param {string} params.userId User's email address. The special value "me" can be used to indicate the authenticated user.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Users$Settings$Sendas$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Users$Settings$Sendas$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Users$Settings$Sendas$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Users$Settings$Sendas$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Users$Settings$Sendas$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * gmail.users.settings.sendAs.get
         * @desc Gets the specified send-as alias. Fails with an HTTP 404 error if the specified address is not a member of the collection.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://mail.google.com/',
         *       'https://www.googleapis.com/auth/gmail.modify',
         *       'https://www.googleapis.com/auth/gmail.readonly',
         *       'https://www.googleapis.com/auth/gmail.settings.basic',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.settings.sendAs.get({
         *     // The send-as alias to be retrieved.
         *     sendAsEmail: 'placeholder-value',
         *     // User's email address. The special value "me" can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "displayName": "my_displayName",
         *   //   "isDefault": false,
         *   //   "isPrimary": false,
         *   //   "replyToAddress": "my_replyToAddress",
         *   //   "sendAsEmail": "my_sendAsEmail",
         *   //   "signature": "my_signature",
         *   //   "smtpMsa": {},
         *   //   "treatAsAlias": false,
         *   //   "verificationStatus": "my_verificationStatus"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.settings.sendAs.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.sendAsEmail The send-as alias to be retrieved.
         * @param {string} params.userId User's email address. The special value "me" can be used to indicate the authenticated user.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Users$Settings$Sendas$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Users$Settings$Sendas$Get, options?: MethodOptions): GaxiosPromise<Schema$SendAs>;
        get(params: Params$Resource$Users$Settings$Sendas$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Users$Settings$Sendas$Get, options: MethodOptions | BodyResponseCallback<Schema$SendAs>, callback: BodyResponseCallback<Schema$SendAs>): void;
        get(params: Params$Resource$Users$Settings$Sendas$Get, callback: BodyResponseCallback<Schema$SendAs>): void;
        get(callback: BodyResponseCallback<Schema$SendAs>): void;
        /**
         * gmail.users.settings.sendAs.list
         * @desc Lists the send-as aliases for the specified account. The result includes the primary send-as address associated with the account as well as any custom "from" aliases.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://mail.google.com/',
         *       'https://www.googleapis.com/auth/gmail.modify',
         *       'https://www.googleapis.com/auth/gmail.readonly',
         *       'https://www.googleapis.com/auth/gmail.settings.basic',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.settings.sendAs.list({
         *     // User's email address. The special value "me" can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "sendAs": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.settings.sendAs.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.userId User's email address. The special value "me" can be used to indicate the authenticated user.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Users$Settings$Sendas$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Users$Settings$Sendas$List, options?: MethodOptions): GaxiosPromise<Schema$ListSendAsResponse>;
        list(params: Params$Resource$Users$Settings$Sendas$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Users$Settings$Sendas$List, options: MethodOptions | BodyResponseCallback<Schema$ListSendAsResponse>, callback: BodyResponseCallback<Schema$ListSendAsResponse>): void;
        list(params: Params$Resource$Users$Settings$Sendas$List, callback: BodyResponseCallback<Schema$ListSendAsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListSendAsResponse>): void;
        /**
         * gmail.users.settings.sendAs.patch
         * @desc Updates a send-as alias. If a signature is provided, Gmail will sanitize the HTML before saving it with the alias.  Addresses other than the primary address for the account can only be updated by service account clients that have been delegated domain-wide authority. This method supports patch semantics.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/gmail.settings.basic',
         *       'https://www.googleapis.com/auth/gmail.settings.sharing',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.settings.sendAs.patch({
         *     // The send-as alias to be updated.
         *     sendAsEmail: 'placeholder-value',
         *     // User's email address. The special value "me" can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "displayName": "my_displayName",
         *       //   "isDefault": false,
         *       //   "isPrimary": false,
         *       //   "replyToAddress": "my_replyToAddress",
         *       //   "sendAsEmail": "my_sendAsEmail",
         *       //   "signature": "my_signature",
         *       //   "smtpMsa": {},
         *       //   "treatAsAlias": false,
         *       //   "verificationStatus": "my_verificationStatus"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "displayName": "my_displayName",
         *   //   "isDefault": false,
         *   //   "isPrimary": false,
         *   //   "replyToAddress": "my_replyToAddress",
         *   //   "sendAsEmail": "my_sendAsEmail",
         *   //   "signature": "my_signature",
         *   //   "smtpMsa": {},
         *   //   "treatAsAlias": false,
         *   //   "verificationStatus": "my_verificationStatus"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.settings.sendAs.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.sendAsEmail The send-as alias to be updated.
         * @param {string} params.userId User's email address. The special value "me" can be used to indicate the authenticated user.
         * @param {().SendAs} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Users$Settings$Sendas$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Users$Settings$Sendas$Patch, options?: MethodOptions): GaxiosPromise<Schema$SendAs>;
        patch(params: Params$Resource$Users$Settings$Sendas$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Users$Settings$Sendas$Patch, options: MethodOptions | BodyResponseCallback<Schema$SendAs>, callback: BodyResponseCallback<Schema$SendAs>): void;
        patch(params: Params$Resource$Users$Settings$Sendas$Patch, callback: BodyResponseCallback<Schema$SendAs>): void;
        patch(callback: BodyResponseCallback<Schema$SendAs>): void;
        /**
         * gmail.users.settings.sendAs.update
         * @desc Updates a send-as alias. If a signature is provided, Gmail will sanitize the HTML before saving it with the alias.  Addresses other than the primary address for the account can only be updated by service account clients that have been delegated domain-wide authority.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/gmail.settings.basic',
         *       'https://www.googleapis.com/auth/gmail.settings.sharing',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.settings.sendAs.update({
         *     // The send-as alias to be updated.
         *     sendAsEmail: 'placeholder-value',
         *     // User's email address. The special value "me" can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "displayName": "my_displayName",
         *       //   "isDefault": false,
         *       //   "isPrimary": false,
         *       //   "replyToAddress": "my_replyToAddress",
         *       //   "sendAsEmail": "my_sendAsEmail",
         *       //   "signature": "my_signature",
         *       //   "smtpMsa": {},
         *       //   "treatAsAlias": false,
         *       //   "verificationStatus": "my_verificationStatus"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "displayName": "my_displayName",
         *   //   "isDefault": false,
         *   //   "isPrimary": false,
         *   //   "replyToAddress": "my_replyToAddress",
         *   //   "sendAsEmail": "my_sendAsEmail",
         *   //   "signature": "my_signature",
         *   //   "smtpMsa": {},
         *   //   "treatAsAlias": false,
         *   //   "verificationStatus": "my_verificationStatus"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.settings.sendAs.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.sendAsEmail The send-as alias to be updated.
         * @param {string} params.userId User's email address. The special value "me" can be used to indicate the authenticated user.
         * @param {().SendAs} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Users$Settings$Sendas$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Users$Settings$Sendas$Update, options?: MethodOptions): GaxiosPromise<Schema$SendAs>;
        update(params: Params$Resource$Users$Settings$Sendas$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Users$Settings$Sendas$Update, options: MethodOptions | BodyResponseCallback<Schema$SendAs>, callback: BodyResponseCallback<Schema$SendAs>): void;
        update(params: Params$Resource$Users$Settings$Sendas$Update, callback: BodyResponseCallback<Schema$SendAs>): void;
        update(callback: BodyResponseCallback<Schema$SendAs>): void;
        /**
         * gmail.users.settings.sendAs.verify
         * @desc Sends a verification email to the specified send-as alias address. The verification status must be pending.  This method is only available to service account clients that have been delegated domain-wide authority.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/gmail.settings.sharing'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.settings.sendAs.verify({
         *     // The send-as alias to be verified.
         *     sendAsEmail: 'placeholder-value',
         *     // User's email address. The special value "me" can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.settings.sendAs.verify
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.sendAsEmail The send-as alias to be verified.
         * @param {string} params.userId User's email address. The special value "me" can be used to indicate the authenticated user.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        verify(params: Params$Resource$Users$Settings$Sendas$Verify, options: StreamMethodOptions): GaxiosPromise<Readable>;
        verify(params?: Params$Resource$Users$Settings$Sendas$Verify, options?: MethodOptions): GaxiosPromise<void>;
        verify(params: Params$Resource$Users$Settings$Sendas$Verify, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        verify(params: Params$Resource$Users$Settings$Sendas$Verify, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        verify(params: Params$Resource$Users$Settings$Sendas$Verify, callback: BodyResponseCallback<void>): void;
        verify(callback: BodyResponseCallback<void>): void;
    }
    export interface Params$Resource$Users$Settings$Sendas$Create extends StandardParameters {
        /**
         * User's email address. The special value "me" can be used to indicate the authenticated user.
         */
        userId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$SendAs;
    }
    export interface Params$Resource$Users$Settings$Sendas$Delete extends StandardParameters {
        /**
         * The send-as alias to be deleted.
         */
        sendAsEmail?: string;
        /**
         * User's email address. The special value "me" can be used to indicate the authenticated user.
         */
        userId?: string;
    }
    export interface Params$Resource$Users$Settings$Sendas$Get extends StandardParameters {
        /**
         * The send-as alias to be retrieved.
         */
        sendAsEmail?: string;
        /**
         * User's email address. The special value "me" can be used to indicate the authenticated user.
         */
        userId?: string;
    }
    export interface Params$Resource$Users$Settings$Sendas$List extends StandardParameters {
        /**
         * User's email address. The special value "me" can be used to indicate the authenticated user.
         */
        userId?: string;
    }
    export interface Params$Resource$Users$Settings$Sendas$Patch extends StandardParameters {
        /**
         * The send-as alias to be updated.
         */
        sendAsEmail?: string;
        /**
         * User's email address. The special value "me" can be used to indicate the authenticated user.
         */
        userId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$SendAs;
    }
    export interface Params$Resource$Users$Settings$Sendas$Update extends StandardParameters {
        /**
         * The send-as alias to be updated.
         */
        sendAsEmail?: string;
        /**
         * User's email address. The special value "me" can be used to indicate the authenticated user.
         */
        userId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$SendAs;
    }
    export interface Params$Resource$Users$Settings$Sendas$Verify extends StandardParameters {
        /**
         * The send-as alias to be verified.
         */
        sendAsEmail?: string;
        /**
         * User's email address. The special value "me" can be used to indicate the authenticated user.
         */
        userId?: string;
    }
    export class Resource$Users$Settings$Sendas$Smimeinfo {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * gmail.users.settings.sendAs.smimeInfo.delete
         * @desc Deletes the specified S/MIME config for the specified send-as alias.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/gmail.settings.basic',
         *       'https://www.googleapis.com/auth/gmail.settings.sharing',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.settings.sendAs.smimeInfo.delete({
         *     // The immutable ID for the SmimeInfo.
         *     id: 'placeholder-value',
         *     // The email address that appears in the "From:" header for mail sent using this alias.
         *     sendAsEmail: 'placeholder-value',
         *     // The user's email address. The special value me can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.settings.sendAs.smimeInfo.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.id The immutable ID for the SmimeInfo.
         * @param {string} params.sendAsEmail The email address that appears in the "From:" header for mail sent using this alias.
         * @param {string} params.userId The user's email address. The special value me can be used to indicate the authenticated user.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Users$Settings$Sendas$Smimeinfo$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Users$Settings$Sendas$Smimeinfo$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Users$Settings$Sendas$Smimeinfo$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Users$Settings$Sendas$Smimeinfo$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Users$Settings$Sendas$Smimeinfo$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * gmail.users.settings.sendAs.smimeInfo.get
         * @desc Gets the specified S/MIME config for the specified send-as alias.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://mail.google.com/',
         *       'https://www.googleapis.com/auth/gmail.modify',
         *       'https://www.googleapis.com/auth/gmail.readonly',
         *       'https://www.googleapis.com/auth/gmail.settings.basic',
         *       'https://www.googleapis.com/auth/gmail.settings.sharing',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.settings.sendAs.smimeInfo.get({
         *     // The immutable ID for the SmimeInfo.
         *     id: 'placeholder-value',
         *     // The email address that appears in the "From:" header for mail sent using this alias.
         *     sendAsEmail: 'placeholder-value',
         *     // The user's email address. The special value me can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "encryptedKeyPassword": "my_encryptedKeyPassword",
         *   //   "expiration": "my_expiration",
         *   //   "id": "my_id",
         *   //   "isDefault": false,
         *   //   "issuerCn": "my_issuerCn",
         *   //   "pem": "my_pem",
         *   //   "pkcs12": "my_pkcs12"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.settings.sendAs.smimeInfo.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.id The immutable ID for the SmimeInfo.
         * @param {string} params.sendAsEmail The email address that appears in the "From:" header for mail sent using this alias.
         * @param {string} params.userId The user's email address. The special value me can be used to indicate the authenticated user.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Users$Settings$Sendas$Smimeinfo$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Users$Settings$Sendas$Smimeinfo$Get, options?: MethodOptions): GaxiosPromise<Schema$SmimeInfo>;
        get(params: Params$Resource$Users$Settings$Sendas$Smimeinfo$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Users$Settings$Sendas$Smimeinfo$Get, options: MethodOptions | BodyResponseCallback<Schema$SmimeInfo>, callback: BodyResponseCallback<Schema$SmimeInfo>): void;
        get(params: Params$Resource$Users$Settings$Sendas$Smimeinfo$Get, callback: BodyResponseCallback<Schema$SmimeInfo>): void;
        get(callback: BodyResponseCallback<Schema$SmimeInfo>): void;
        /**
         * gmail.users.settings.sendAs.smimeInfo.insert
         * @desc Insert (upload) the given S/MIME config for the specified send-as alias. Note that pkcs12 format is required for the key.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/gmail.settings.basic',
         *       'https://www.googleapis.com/auth/gmail.settings.sharing',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.settings.sendAs.smimeInfo.insert({
         *     // The email address that appears in the "From:" header for mail sent using this alias.
         *     sendAsEmail: 'placeholder-value',
         *     // The user's email address. The special value me can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "encryptedKeyPassword": "my_encryptedKeyPassword",
         *       //   "expiration": "my_expiration",
         *       //   "id": "my_id",
         *       //   "isDefault": false,
         *       //   "issuerCn": "my_issuerCn",
         *       //   "pem": "my_pem",
         *       //   "pkcs12": "my_pkcs12"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "encryptedKeyPassword": "my_encryptedKeyPassword",
         *   //   "expiration": "my_expiration",
         *   //   "id": "my_id",
         *   //   "isDefault": false,
         *   //   "issuerCn": "my_issuerCn",
         *   //   "pem": "my_pem",
         *   //   "pkcs12": "my_pkcs12"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.settings.sendAs.smimeInfo.insert
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.sendAsEmail The email address that appears in the "From:" header for mail sent using this alias.
         * @param {string} params.userId The user's email address. The special value me can be used to indicate the authenticated user.
         * @param {().SmimeInfo} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        insert(params: Params$Resource$Users$Settings$Sendas$Smimeinfo$Insert, options: StreamMethodOptions): GaxiosPromise<Readable>;
        insert(params?: Params$Resource$Users$Settings$Sendas$Smimeinfo$Insert, options?: MethodOptions): GaxiosPromise<Schema$SmimeInfo>;
        insert(params: Params$Resource$Users$Settings$Sendas$Smimeinfo$Insert, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        insert(params: Params$Resource$Users$Settings$Sendas$Smimeinfo$Insert, options: MethodOptions | BodyResponseCallback<Schema$SmimeInfo>, callback: BodyResponseCallback<Schema$SmimeInfo>): void;
        insert(params: Params$Resource$Users$Settings$Sendas$Smimeinfo$Insert, callback: BodyResponseCallback<Schema$SmimeInfo>): void;
        insert(callback: BodyResponseCallback<Schema$SmimeInfo>): void;
        /**
         * gmail.users.settings.sendAs.smimeInfo.list
         * @desc Lists S/MIME configs for the specified send-as alias.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://mail.google.com/',
         *       'https://www.googleapis.com/auth/gmail.modify',
         *       'https://www.googleapis.com/auth/gmail.readonly',
         *       'https://www.googleapis.com/auth/gmail.settings.basic',
         *       'https://www.googleapis.com/auth/gmail.settings.sharing',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.settings.sendAs.smimeInfo.list({
         *     // The email address that appears in the "From:" header for mail sent using this alias.
         *     sendAsEmail: 'placeholder-value',
         *     // The user's email address. The special value me can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "smimeInfo": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.settings.sendAs.smimeInfo.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.sendAsEmail The email address that appears in the "From:" header for mail sent using this alias.
         * @param {string} params.userId The user's email address. The special value me can be used to indicate the authenticated user.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Users$Settings$Sendas$Smimeinfo$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Users$Settings$Sendas$Smimeinfo$List, options?: MethodOptions): GaxiosPromise<Schema$ListSmimeInfoResponse>;
        list(params: Params$Resource$Users$Settings$Sendas$Smimeinfo$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Users$Settings$Sendas$Smimeinfo$List, options: MethodOptions | BodyResponseCallback<Schema$ListSmimeInfoResponse>, callback: BodyResponseCallback<Schema$ListSmimeInfoResponse>): void;
        list(params: Params$Resource$Users$Settings$Sendas$Smimeinfo$List, callback: BodyResponseCallback<Schema$ListSmimeInfoResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListSmimeInfoResponse>): void;
        /**
         * gmail.users.settings.sendAs.smimeInfo.setDefault
         * @desc Sets the default S/MIME config for the specified send-as alias.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/gmail.settings.basic',
         *       'https://www.googleapis.com/auth/gmail.settings.sharing',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.settings.sendAs.smimeInfo.setDefault({
         *     // The immutable ID for the SmimeInfo.
         *     id: 'placeholder-value',
         *     // The email address that appears in the "From:" header for mail sent using this alias.
         *     sendAsEmail: 'placeholder-value',
         *     // The user's email address. The special value me can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.settings.sendAs.smimeInfo.setDefault
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.id The immutable ID for the SmimeInfo.
         * @param {string} params.sendAsEmail The email address that appears in the "From:" header for mail sent using this alias.
         * @param {string} params.userId The user's email address. The special value me can be used to indicate the authenticated user.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        setDefault(params: Params$Resource$Users$Settings$Sendas$Smimeinfo$Setdefault, options: StreamMethodOptions): GaxiosPromise<Readable>;
        setDefault(params?: Params$Resource$Users$Settings$Sendas$Smimeinfo$Setdefault, options?: MethodOptions): GaxiosPromise<void>;
        setDefault(params: Params$Resource$Users$Settings$Sendas$Smimeinfo$Setdefault, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        setDefault(params: Params$Resource$Users$Settings$Sendas$Smimeinfo$Setdefault, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        setDefault(params: Params$Resource$Users$Settings$Sendas$Smimeinfo$Setdefault, callback: BodyResponseCallback<void>): void;
        setDefault(callback: BodyResponseCallback<void>): void;
    }
    export interface Params$Resource$Users$Settings$Sendas$Smimeinfo$Delete extends StandardParameters {
        /**
         * The immutable ID for the SmimeInfo.
         */
        id?: string;
        /**
         * The email address that appears in the "From:" header for mail sent using this alias.
         */
        sendAsEmail?: string;
        /**
         * The user's email address. The special value me can be used to indicate the authenticated user.
         */
        userId?: string;
    }
    export interface Params$Resource$Users$Settings$Sendas$Smimeinfo$Get extends StandardParameters {
        /**
         * The immutable ID for the SmimeInfo.
         */
        id?: string;
        /**
         * The email address that appears in the "From:" header for mail sent using this alias.
         */
        sendAsEmail?: string;
        /**
         * The user's email address. The special value me can be used to indicate the authenticated user.
         */
        userId?: string;
    }
    export interface Params$Resource$Users$Settings$Sendas$Smimeinfo$Insert extends StandardParameters {
        /**
         * The email address that appears in the "From:" header for mail sent using this alias.
         */
        sendAsEmail?: string;
        /**
         * The user's email address. The special value me can be used to indicate the authenticated user.
         */
        userId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$SmimeInfo;
    }
    export interface Params$Resource$Users$Settings$Sendas$Smimeinfo$List extends StandardParameters {
        /**
         * The email address that appears in the "From:" header for mail sent using this alias.
         */
        sendAsEmail?: string;
        /**
         * The user's email address. The special value me can be used to indicate the authenticated user.
         */
        userId?: string;
    }
    export interface Params$Resource$Users$Settings$Sendas$Smimeinfo$Setdefault extends StandardParameters {
        /**
         * The immutable ID for the SmimeInfo.
         */
        id?: string;
        /**
         * The email address that appears in the "From:" header for mail sent using this alias.
         */
        sendAsEmail?: string;
        /**
         * The user's email address. The special value me can be used to indicate the authenticated user.
         */
        userId?: string;
    }
    export class Resource$Users$Threads {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * gmail.users.threads.delete
         * @desc Immediately and permanently deletes the specified thread. This operation cannot be undone. Prefer threads.trash instead.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://mail.google.com/'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.threads.delete({
         *     // ID of the Thread to delete.
         *     id: 'placeholder-value',
         *     // The user's email address. The special value me can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.threads.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.id ID of the Thread to delete.
         * @param {string} params.userId The user's email address. The special value me can be used to indicate the authenticated user.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Users$Threads$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Users$Threads$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Users$Threads$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Users$Threads$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Users$Threads$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * gmail.users.threads.get
         * @desc Gets the specified thread.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://mail.google.com/',
         *       'https://www.googleapis.com/auth/gmail.addons.current.message.action',
         *       'https://www.googleapis.com/auth/gmail.addons.current.message.metadata',
         *       'https://www.googleapis.com/auth/gmail.addons.current.message.readonly',
         *       'https://www.googleapis.com/auth/gmail.metadata',
         *       'https://www.googleapis.com/auth/gmail.modify',
         *       'https://www.googleapis.com/auth/gmail.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.threads.get({
         *     // The format to return the messages in.
         *     format: 'placeholder-value',
         *     // The ID of the thread to retrieve.
         *     id: 'placeholder-value',
         *     // When given and format is METADATA, only include headers specified.
         *     metadataHeaders: 'placeholder-value',
         *     // The user's email address. The special value me can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "historyId": "my_historyId",
         *   //   "id": "my_id",
         *   //   "messages": [],
         *   //   "snippet": "my_snippet"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.threads.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.format The format to return the messages in.
         * @param {string} params.id The ID of the thread to retrieve.
         * @param {string=} params.metadataHeaders When given and format is METADATA, only include headers specified.
         * @param {string} params.userId The user's email address. The special value me can be used to indicate the authenticated user.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Users$Threads$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Users$Threads$Get, options?: MethodOptions): GaxiosPromise<Schema$Thread>;
        get(params: Params$Resource$Users$Threads$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Users$Threads$Get, options: MethodOptions | BodyResponseCallback<Schema$Thread>, callback: BodyResponseCallback<Schema$Thread>): void;
        get(params: Params$Resource$Users$Threads$Get, callback: BodyResponseCallback<Schema$Thread>): void;
        get(callback: BodyResponseCallback<Schema$Thread>): void;
        /**
         * gmail.users.threads.list
         * @desc Lists the threads in the user's mailbox.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://mail.google.com/',
         *       'https://www.googleapis.com/auth/gmail.metadata',
         *       'https://www.googleapis.com/auth/gmail.modify',
         *       'https://www.googleapis.com/auth/gmail.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.threads.list({
         *     // Include threads from SPAM and TRASH in the results.
         *     includeSpamTrash: 'placeholder-value',
         *     // Only return threads with labels that match all of the specified label IDs.
         *     labelIds: 'placeholder-value',
         *     // Maximum number of threads to return.
         *     maxResults: 'placeholder-value',
         *     // Page token to retrieve a specific page of results in the list.
         *     pageToken: 'placeholder-value',
         *     // Only return threads matching the specified query. Supports the same query format as the Gmail search box. For example, "from:someuser@example.com rfc822msgid: is:unread". Parameter cannot be used when accessing the api using the gmail.metadata scope.
         *     q: 'placeholder-value',
         *     // The user's email address. The special value me can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "resultSizeEstimate": 0,
         *   //   "threads": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.threads.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {boolean=} params.includeSpamTrash Include threads from SPAM and TRASH in the results.
         * @param {string=} params.labelIds Only return threads with labels that match all of the specified label IDs.
         * @param {integer=} params.maxResults Maximum number of threads to return.
         * @param {string=} params.pageToken Page token to retrieve a specific page of results in the list.
         * @param {string=} params.q Only return threads matching the specified query. Supports the same query format as the Gmail search box. For example, "from:someuser@example.com rfc822msgid: is:unread". Parameter cannot be used when accessing the api using the gmail.metadata scope.
         * @param {string} params.userId The user's email address. The special value me can be used to indicate the authenticated user.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Users$Threads$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Users$Threads$List, options?: MethodOptions): GaxiosPromise<Schema$ListThreadsResponse>;
        list(params: Params$Resource$Users$Threads$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Users$Threads$List, options: MethodOptions | BodyResponseCallback<Schema$ListThreadsResponse>, callback: BodyResponseCallback<Schema$ListThreadsResponse>): void;
        list(params: Params$Resource$Users$Threads$List, callback: BodyResponseCallback<Schema$ListThreadsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListThreadsResponse>): void;
        /**
         * gmail.users.threads.modify
         * @desc Modifies the labels applied to the thread. This applies to all messages in the thread.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://mail.google.com/',
         *       'https://www.googleapis.com/auth/gmail.modify',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.threads.modify({
         *     // The ID of the thread to modify.
         *     id: 'placeholder-value',
         *     // The user's email address. The special value me can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "addLabelIds": [],
         *       //   "removeLabelIds": []
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "historyId": "my_historyId",
         *   //   "id": "my_id",
         *   //   "messages": [],
         *   //   "snippet": "my_snippet"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.threads.modify
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.id The ID of the thread to modify.
         * @param {string} params.userId The user's email address. The special value me can be used to indicate the authenticated user.
         * @param {().ModifyThreadRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        modify(params: Params$Resource$Users$Threads$Modify, options: StreamMethodOptions): GaxiosPromise<Readable>;
        modify(params?: Params$Resource$Users$Threads$Modify, options?: MethodOptions): GaxiosPromise<Schema$Thread>;
        modify(params: Params$Resource$Users$Threads$Modify, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        modify(params: Params$Resource$Users$Threads$Modify, options: MethodOptions | BodyResponseCallback<Schema$Thread>, callback: BodyResponseCallback<Schema$Thread>): void;
        modify(params: Params$Resource$Users$Threads$Modify, callback: BodyResponseCallback<Schema$Thread>): void;
        modify(callback: BodyResponseCallback<Schema$Thread>): void;
        /**
         * gmail.users.threads.trash
         * @desc Moves the specified thread to the trash.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://mail.google.com/',
         *       'https://www.googleapis.com/auth/gmail.modify',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.threads.trash({
         *     // The ID of the thread to Trash.
         *     id: 'placeholder-value',
         *     // The user's email address. The special value me can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "historyId": "my_historyId",
         *   //   "id": "my_id",
         *   //   "messages": [],
         *   //   "snippet": "my_snippet"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.threads.trash
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.id The ID of the thread to Trash.
         * @param {string} params.userId The user's email address. The special value me can be used to indicate the authenticated user.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        trash(params: Params$Resource$Users$Threads$Trash, options: StreamMethodOptions): GaxiosPromise<Readable>;
        trash(params?: Params$Resource$Users$Threads$Trash, options?: MethodOptions): GaxiosPromise<Schema$Thread>;
        trash(params: Params$Resource$Users$Threads$Trash, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        trash(params: Params$Resource$Users$Threads$Trash, options: MethodOptions | BodyResponseCallback<Schema$Thread>, callback: BodyResponseCallback<Schema$Thread>): void;
        trash(params: Params$Resource$Users$Threads$Trash, callback: BodyResponseCallback<Schema$Thread>): void;
        trash(callback: BodyResponseCallback<Schema$Thread>): void;
        /**
         * gmail.users.threads.untrash
         * @desc Removes the specified thread from the trash.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/gmail.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const gmail = google.gmail('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://mail.google.com/',
         *       'https://www.googleapis.com/auth/gmail.modify',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await gmail.users.threads.untrash({
         *     // The ID of the thread to remove from Trash.
         *     id: 'placeholder-value',
         *     // The user's email address. The special value me can be used to indicate the authenticated user.
         *     userId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "historyId": "my_historyId",
         *   //   "id": "my_id",
         *   //   "messages": [],
         *   //   "snippet": "my_snippet"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias gmail.users.threads.untrash
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.id The ID of the thread to remove from Trash.
         * @param {string} params.userId The user's email address. The special value me can be used to indicate the authenticated user.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        untrash(params: Params$Resource$Users$Threads$Untrash, options: StreamMethodOptions): GaxiosPromise<Readable>;
        untrash(params?: Params$Resource$Users$Threads$Untrash, options?: MethodOptions): GaxiosPromise<Schema$Thread>;
        untrash(params: Params$Resource$Users$Threads$Untrash, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        untrash(params: Params$Resource$Users$Threads$Untrash, options: MethodOptions | BodyResponseCallback<Schema$Thread>, callback: BodyResponseCallback<Schema$Thread>): void;
        untrash(params: Params$Resource$Users$Threads$Untrash, callback: BodyResponseCallback<Schema$Thread>): void;
        untrash(callback: BodyResponseCallback<Schema$Thread>): void;
    }
    export interface Params$Resource$Users$Threads$Delete extends StandardParameters {
        /**
         * ID of the Thread to delete.
         */
        id?: string;
        /**
         * The user's email address. The special value me can be used to indicate the authenticated user.
         */
        userId?: string;
    }
    export interface Params$Resource$Users$Threads$Get extends StandardParameters {
        /**
         * The format to return the messages in.
         */
        format?: string;
        /**
         * The ID of the thread to retrieve.
         */
        id?: string;
        /**
         * When given and format is METADATA, only include headers specified.
         */
        metadataHeaders?: string[];
        /**
         * The user's email address. The special value me can be used to indicate the authenticated user.
         */
        userId?: string;
    }
    export interface Params$Resource$Users$Threads$List extends StandardParameters {
        /**
         * Include threads from SPAM and TRASH in the results.
         */
        includeSpamTrash?: boolean;
        /**
         * Only return threads with labels that match all of the specified label IDs.
         */
        labelIds?: string[];
        /**
         * Maximum number of threads to return.
         */
        maxResults?: number;
        /**
         * Page token to retrieve a specific page of results in the list.
         */
        pageToken?: string;
        /**
         * Only return threads matching the specified query. Supports the same query format as the Gmail search box. For example, "from:someuser@example.com rfc822msgid: is:unread". Parameter cannot be used when accessing the api using the gmail.metadata scope.
         */
        q?: string;
        /**
         * The user's email address. The special value me can be used to indicate the authenticated user.
         */
        userId?: string;
    }
    export interface Params$Resource$Users$Threads$Modify extends StandardParameters {
        /**
         * The ID of the thread to modify.
         */
        id?: string;
        /**
         * The user's email address. The special value me can be used to indicate the authenticated user.
         */
        userId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$ModifyThreadRequest;
    }
    export interface Params$Resource$Users$Threads$Trash extends StandardParameters {
        /**
         * The ID of the thread to Trash.
         */
        id?: string;
        /**
         * The user's email address. The special value me can be used to indicate the authenticated user.
         */
        userId?: string;
    }
    export interface Params$Resource$Users$Threads$Untrash extends StandardParameters {
        /**
         * The ID of the thread to remove from Trash.
         */
        id?: string;
        /**
         * The user's email address. The special value me can be used to indicate the authenticated user.
         */
        userId?: string;
    }
    export {};
}
