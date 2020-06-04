/// <reference types="node" />
import { OAuth2Client, JWT, Compute, UserRefreshClient, GaxiosPromise, GoogleConfigurable, MethodOptions, StreamMethodOptions, GlobalOptions, GoogleAuth, BodyResponseCallback, APIRequestContext } from 'googleapis-common';
import { Readable } from 'stream';
export declare namespace storage_v1 {
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
     * Cloud Storage JSON API
     *
     * Stores and retrieves potentially large, immutable data objects.
     *
     * @example
     * const {google} = require('googleapis');
     * const storage = google.storage('v1');
     *
     * @namespace storage
     * @type {Function}
     * @version v1
     * @variation v1
     * @param {object=} options Options for Storage
     */
    export class Storage {
        context: APIRequestContext;
        bucketAccessControls: Resource$Bucketaccesscontrols;
        buckets: Resource$Buckets;
        channels: Resource$Channels;
        defaultObjectAccessControls: Resource$Defaultobjectaccesscontrols;
        notifications: Resource$Notifications;
        objectAccessControls: Resource$Objectaccesscontrols;
        objects: Resource$Objects;
        projects: Resource$Projects;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
    }
    /**
     * A bucket.
     */
    export interface Schema$Bucket {
        /**
         * Access controls on the bucket.
         */
        acl?: Schema$BucketAccessControl[];
        /**
         * The bucket&#39;s billing configuration.
         */
        billing?: {
            requesterPays?: boolean;
        } | null;
        /**
         * The bucket&#39;s Cross-Origin Resource Sharing (CORS) configuration.
         */
        cors?: Array<{
            maxAgeSeconds?: number;
            method?: string[];
            origin?: string[];
            responseHeader?: string[];
        }> | null;
        /**
         * The default value for event-based hold on newly created objects in this bucket. Event-based hold is a way to retain objects indefinitely until an event occurs, signified by the hold&#39;s release. After being released, such objects will be subject to bucket-level retention (if any). One sample use case of this flag is for banks to hold loan documents for at least 3 years after loan is paid in full. Here, bucket-level retention is 3 years and the event is loan being paid in full. In this example, these objects will be held intact for any number of years until the event has occurred (event-based hold on the object is released) and then 3 more years after that. That means retention duration of the objects begins from the moment event-based hold transitioned from true to false. Objects under event-based hold cannot be deleted, overwritten or archived until the hold is removed.
         */
        defaultEventBasedHold?: boolean | null;
        /**
         * Default access controls to apply to new objects when no ACL is provided.
         */
        defaultObjectAcl?: Schema$ObjectAccessControl[];
        /**
         * Encryption configuration for a bucket.
         */
        encryption?: {
            defaultKmsKeyName?: string;
        } | null;
        /**
         * HTTP 1.1 Entity tag for the bucket.
         */
        etag?: string | null;
        /**
         * The bucket&#39;s IAM configuration.
         */
        iamConfiguration?: {
            bucketPolicyOnly?: {
                enabled?: boolean;
                lockedTime?: string;
            };
            uniformBucketLevelAccess?: {
                enabled?: boolean;
                lockedTime?: string;
            };
        } | null;
        /**
         * The ID of the bucket. For buckets, the id and name properties are the same.
         */
        id?: string | null;
        /**
         * The kind of item this is. For buckets, this is always storage#bucket.
         */
        kind?: string | null;
        /**
         * User-provided labels, in key/value pairs.
         */
        labels?: {
            [key: string]: string;
        } | null;
        /**
         * The bucket&#39;s lifecycle configuration. See lifecycle management for more information.
         */
        lifecycle?: {
            rule?: Array<{
                action?: {
                    storageClass?: string;
                    type?: string;
                };
                condition?: {
                    age?: number;
                    createdBefore?: string;
                    customTimeBefore?: string;
                    daysSinceCustomTime?: number;
                    daysSinceNoncurrentTime?: number;
                    isLive?: boolean;
                    matchesPattern?: string;
                    matchesStorageClass?: string[];
                    noncurrentTimeBefore?: string;
                    numNewerVersions?: number;
                };
            }>;
        } | null;
        /**
         * The location of the bucket. Object data for objects in the bucket resides in physical storage within this region. Defaults to US. See the developer&#39;s guide for the authoritative list.
         */
        location?: string | null;
        /**
         * The type of the bucket location.
         */
        locationType?: string | null;
        /**
         * The bucket&#39;s logging configuration, which defines the destination bucket and optional name prefix for the current bucket&#39;s logs.
         */
        logging?: {
            logBucket?: string;
            logObjectPrefix?: string;
        } | null;
        /**
         * The metadata generation of this bucket.
         */
        metageneration?: string | null;
        /**
         * The name of the bucket.
         */
        name?: string | null;
        /**
         * The owner of the bucket. This is always the project team&#39;s owner group.
         */
        owner?: {
            entity?: string;
            entityId?: string;
        } | null;
        /**
         * The project number of the project the bucket belongs to.
         */
        projectNumber?: string | null;
        /**
         * The bucket&#39;s retention policy. The retention policy enforces a minimum retention time for all objects contained in the bucket, based on their creation time. Any attempt to overwrite or delete objects younger than the retention period will result in a PERMISSION_DENIED error. An unlocked retention policy can be modified or removed from the bucket via a storage.buckets.update operation. A locked retention policy cannot be removed or shortened in duration for the lifetime of the bucket. Attempting to remove or decrease period of a locked retention policy will result in a PERMISSION_DENIED error.
         */
        retentionPolicy?: {
            effectiveTime?: string;
            isLocked?: boolean;
            retentionPeriod?: string;
        } | null;
        /**
         * The URI of this bucket.
         */
        selfLink?: string | null;
        /**
         * The bucket&#39;s default storage class, used whenever no storageClass is specified for a newly-created object. This defines how objects in the bucket are stored and determines the SLA and the cost of storage. Values include MULTI_REGIONAL, REGIONAL, STANDARD, NEARLINE, COLDLINE, ARCHIVE, and DURABLE_REDUCED_AVAILABILITY. If this value is not specified when the bucket is created, it will default to STANDARD. For more information, see storage classes.
         */
        storageClass?: string | null;
        /**
         * The creation time of the bucket in RFC 3339 format.
         */
        timeCreated?: string | null;
        /**
         * The modification time of the bucket in RFC 3339 format.
         */
        updated?: string | null;
        /**
         * The bucket&#39;s versioning configuration.
         */
        versioning?: {
            enabled?: boolean;
        } | null;
        /**
         * The bucket&#39;s website configuration, controlling how the service behaves when accessing bucket contents as a web site. See the Static Website Examples for more information.
         */
        website?: {
            mainPageSuffix?: string;
            notFoundPage?: string;
        } | null;
        /**
         * The zone or zones from which the bucket is intended to use zonal quota. Requests for data from outside the specified affinities are still allowed but won&#39;t be able to use zonal quota. The zone or zones need to be within the bucket location otherwise the requests will fail with a 400 Bad Request response.
         */
        zoneAffinity?: string[] | null;
        /**
         * If set, objects placed in this bucket are required to be separated by disaster domain.
         */
        zoneSeparation?: boolean | null;
    }
    /**
     * An access-control entry.
     */
    export interface Schema$BucketAccessControl {
        /**
         * The name of the bucket.
         */
        bucket?: string | null;
        /**
         * The domain associated with the entity, if any.
         */
        domain?: string | null;
        /**
         * The email address associated with the entity, if any.
         */
        email?: string | null;
        /**
         * The entity holding the permission, in one of the following forms:  - user-userId  - user-email  - group-groupId  - group-email  - domain-domain  - project-team-projectId  - allUsers  - allAuthenticatedUsers Examples:  - The user liz@example.com would be user-liz@example.com.  - The group example@googlegroups.com would be group-example@googlegroups.com.  - To refer to all members of the Google Apps for Business domain example.com, the entity would be domain-example.com.
         */
        entity?: string | null;
        /**
         * The ID for the entity, if any.
         */
        entityId?: string | null;
        /**
         * HTTP 1.1 Entity tag for the access-control entry.
         */
        etag?: string | null;
        /**
         * The ID of the access-control entry.
         */
        id?: string | null;
        /**
         * The kind of item this is. For bucket access control entries, this is always storage#bucketAccessControl.
         */
        kind?: string | null;
        /**
         * The project team associated with the entity, if any.
         */
        projectTeam?: {
            projectNumber?: string;
            team?: string;
        } | null;
        /**
         * The access permission for the entity.
         */
        role?: string | null;
        /**
         * The link to this access-control entry.
         */
        selfLink?: string | null;
    }
    /**
     * An access-control list.
     */
    export interface Schema$BucketAccessControls {
        /**
         * The list of items.
         */
        items?: Schema$BucketAccessControl[];
        /**
         * The kind of item this is. For lists of bucket access control entries, this is always storage#bucketAccessControls.
         */
        kind?: string | null;
    }
    /**
     * A list of buckets.
     */
    export interface Schema$Buckets {
        /**
         * The list of items.
         */
        items?: Schema$Bucket[];
        /**
         * The kind of item this is. For lists of buckets, this is always storage#buckets.
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
     * A Compose request.
     */
    export interface Schema$ComposeRequest {
        /**
         * Properties of the resulting object.
         */
        destination?: Schema$Object;
        /**
         * The kind of item this is.
         */
        kind?: string | null;
        /**
         * The list of source objects that will be concatenated into a single object.
         */
        sourceObjects?: Array<{
            generation?: string;
            name?: string;
            objectPreconditions?: {
                ifGenerationMatch?: string;
            };
        }> | null;
    }
    /**
     * Represents an expression text. Example: title: &quot;User account presence&quot; description: &quot;Determines whether the request has a user account&quot; expression: &quot;size(request.user) &gt; 0&quot;
     */
    export interface Schema$Expr {
        /**
         * An optional description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI.
         */
        description?: string | null;
        /**
         * Textual representation of an expression in Common Expression Language syntax. The application context of the containing message determines which well-known feature set of CEL is supported.
         */
        expression?: string | null;
        /**
         * An optional string indicating the location of the expression for error reporting, e.g. a file name and a position in the file.
         */
        location?: string | null;
        /**
         * An optional title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression.
         */
        title?: string | null;
    }
    /**
     * JSON template to produce a JSON-style HMAC Key resource for Create responses.
     */
    export interface Schema$HmacKey {
        /**
         * The kind of item this is. For HMAC keys, this is always storage#hmacKey.
         */
        kind?: string | null;
        /**
         * Key metadata.
         */
        metadata?: Schema$HmacKeyMetadata;
        /**
         * HMAC secret key material.
         */
        secret?: string | null;
    }
    /**
     * JSON template to produce a JSON-style HMAC Key metadata resource.
     */
    export interface Schema$HmacKeyMetadata {
        /**
         * The ID of the HMAC Key.
         */
        accessId?: string | null;
        /**
         * HTTP 1.1 Entity tag for the HMAC key.
         */
        etag?: string | null;
        /**
         * The ID of the HMAC key, including the Project ID and the Access ID.
         */
        id?: string | null;
        /**
         * The kind of item this is. For HMAC Key metadata, this is always storage#hmacKeyMetadata.
         */
        kind?: string | null;
        /**
         * Project ID owning the service account to which the key authenticates.
         */
        projectId?: string | null;
        /**
         * The link to this resource.
         */
        selfLink?: string | null;
        /**
         * The email address of the key&#39;s associated service account.
         */
        serviceAccountEmail?: string | null;
        /**
         * The state of the key. Can be one of ACTIVE, INACTIVE, or DELETED.
         */
        state?: string | null;
        /**
         * The creation time of the HMAC key in RFC 3339 format.
         */
        timeCreated?: string | null;
        /**
         * The last modification time of the HMAC key metadata in RFC 3339 format.
         */
        updated?: string | null;
    }
    /**
     * A list of hmacKeys.
     */
    export interface Schema$HmacKeysMetadata {
        /**
         * The list of items.
         */
        items?: Schema$HmacKeyMetadata[];
        /**
         * The kind of item this is. For lists of hmacKeys, this is always storage#hmacKeysMetadata.
         */
        kind?: string | null;
        /**
         * The continuation token, used to page through large result sets. Provide this value in a subsequent request to return the next page of results.
         */
        nextPageToken?: string | null;
    }
    /**
     * A subscription to receive Google PubSub notifications.
     */
    export interface Schema$Notification {
        /**
         * An optional list of additional attributes to attach to each Cloud PubSub message published for this notification subscription.
         */
        custom_attributes?: {
            [key: string]: string;
        } | null;
        /**
         * HTTP 1.1 Entity tag for this subscription notification.
         */
        etag?: string | null;
        /**
         * If present, only send notifications about listed event types. If empty, sent notifications for all event types.
         */
        event_types?: string[] | null;
        /**
         * The ID of the notification.
         */
        id?: string | null;
        /**
         * The kind of item this is. For notifications, this is always storage#notification.
         */
        kind?: string | null;
        /**
         * If present, only apply this notification configuration to object names that begin with this prefix.
         */
        object_name_prefix?: string | null;
        /**
         * The desired content of the Payload.
         */
        payload_format?: string | null;
        /**
         * The canonical URL of this notification.
         */
        selfLink?: string | null;
        /**
         * The Cloud PubSub topic to which this subscription publishes. Formatted as: &#39;//pubsub.googleapis.com/projects/{project-identifier}/topics/{my-topic}&#39;
         */
        topic?: string | null;
    }
    /**
     * A list of notification subscriptions.
     */
    export interface Schema$Notifications {
        /**
         * The list of items.
         */
        items?: Schema$Notification[];
        /**
         * The kind of item this is. For lists of notifications, this is always storage#notifications.
         */
        kind?: string | null;
    }
    /**
     * An object.
     */
    export interface Schema$Object {
        /**
         * Access controls on the object.
         */
        acl?: Schema$ObjectAccessControl[];
        /**
         * The name of the bucket containing this object.
         */
        bucket?: string | null;
        /**
         * Cache-Control directive for the object data. If omitted, and the object is accessible to all anonymous users, the default will be public, max-age=3600.
         */
        cacheControl?: string | null;
        /**
         * Number of underlying components that make up this object. Components are accumulated by compose operations.
         */
        componentCount?: number | null;
        /**
         * Content-Disposition of the object data.
         */
        contentDisposition?: string | null;
        /**
         * Content-Encoding of the object data.
         */
        contentEncoding?: string | null;
        /**
         * Content-Language of the object data.
         */
        contentLanguage?: string | null;
        /**
         * Content-Type of the object data. If an object is stored without a Content-Type, it is served as application/octet-stream.
         */
        contentType?: string | null;
        /**
         * CRC32c checksum, as described in RFC 4960, Appendix B; encoded using base64 in big-endian byte order. For more information about using the CRC32c checksum, see Hashes and ETags: Best Practices.
         */
        crc32c?: string | null;
        /**
         * Metadata of customer-supplied encryption key, if the object is encrypted by such a key.
         */
        customerEncryption?: {
            encryptionAlgorithm?: string;
            keySha256?: string;
        } | null;
        /**
         * A timestamp in RFC 3339 format specified by the user for an object.
         */
        customTime?: string | null;
        /**
         * HTTP 1.1 Entity tag for the object.
         */
        etag?: string | null;
        /**
         * Whether an object is under event-based hold. Event-based hold is a way to retain objects until an event occurs, which is signified by the hold&#39;s release (i.e. this value is set to false). After being released (set to false), such objects will be subject to bucket-level retention (if any). One sample use case of this flag is for banks to hold loan documents for at least 3 years after loan is paid in full. Here, bucket-level retention is 3 years and the event is the loan being paid in full. In this example, these objects will be held intact for any number of years until the event has occurred (event-based hold on the object is released) and then 3 more years after that. That means retention duration of the objects begins from the moment event-based hold transitioned from true to false.
         */
        eventBasedHold?: boolean | null;
        /**
         * The content generation of this object. Used for object versioning.
         */
        generation?: string | null;
        /**
         * The ID of the object, including the bucket name, object name, and generation number.
         */
        id?: string | null;
        /**
         * The kind of item this is. For objects, this is always storage#object.
         */
        kind?: string | null;
        /**
         * Cloud KMS Key used to encrypt this object, if the object is encrypted by such a key.
         */
        kmsKeyName?: string | null;
        /**
         * MD5 hash of the data; encoded using base64. For more information about using the MD5 hash, see Hashes and ETags: Best Practices.
         */
        md5Hash?: string | null;
        /**
         * Media download link.
         */
        mediaLink?: string | null;
        /**
         * User-provided metadata, in key/value pairs.
         */
        metadata?: {
            [key: string]: string;
        } | null;
        /**
         * The version of the metadata for this object at this generation. Used for preconditions and for detecting changes in metadata. A metageneration number is only meaningful in the context of a particular generation of a particular object.
         */
        metageneration?: string | null;
        /**
         * The name of the object. Required if not specified by URL parameter.
         */
        name?: string | null;
        /**
         * The owner of the object. This will always be the uploader of the object.
         */
        owner?: {
            entity?: string;
            entityId?: string;
        } | null;
        /**
         * A server-determined value that specifies the earliest time that the object&#39;s retention period expires. This value is in RFC 3339 format. Note 1: This field is not provided for objects with an active event-based hold, since retention expiration is unknown until the hold is removed. Note 2: This value can be provided even when temporary hold is set (so that the user can reason about policy without having to first unset the temporary hold).
         */
        retentionExpirationTime?: string | null;
        /**
         * The link to this object.
         */
        selfLink?: string | null;
        /**
         * Content-Length of the data in bytes.
         */
        size?: string | null;
        /**
         * Storage class of the object.
         */
        storageClass?: string | null;
        /**
         * Whether an object is under temporary hold. While this flag is set to true, the object is protected against deletion and overwrites. A common use case of this flag is regulatory investigations where objects need to be retained while the investigation is ongoing. Note that unlike event-based hold, temporary hold does not impact retention expiration time of an object.
         */
        temporaryHold?: boolean | null;
        /**
         * The creation time of the object in RFC 3339 format.
         */
        timeCreated?: string | null;
        /**
         * The deletion time of the object in RFC 3339 format. Will be returned if and only if this version of the object has been deleted.
         */
        timeDeleted?: string | null;
        /**
         * The time at which the object&#39;s storage class was last changed. When the object is initially created, it will be set to timeCreated.
         */
        timeStorageClassUpdated?: string | null;
        /**
         * The modification time of the object metadata in RFC 3339 format.
         */
        updated?: string | null;
    }
    /**
     * An access-control entry.
     */
    export interface Schema$ObjectAccessControl {
        /**
         * The name of the bucket.
         */
        bucket?: string | null;
        /**
         * The domain associated with the entity, if any.
         */
        domain?: string | null;
        /**
         * The email address associated with the entity, if any.
         */
        email?: string | null;
        /**
         * The entity holding the permission, in one of the following forms:  - user-userId  - user-email  - group-groupId  - group-email  - domain-domain  - project-team-projectId  - allUsers  - allAuthenticatedUsers Examples:  - The user liz@example.com would be user-liz@example.com.  - The group example@googlegroups.com would be group-example@googlegroups.com.  - To refer to all members of the Google Apps for Business domain example.com, the entity would be domain-example.com.
         */
        entity?: string | null;
        /**
         * The ID for the entity, if any.
         */
        entityId?: string | null;
        /**
         * HTTP 1.1 Entity tag for the access-control entry.
         */
        etag?: string | null;
        /**
         * The content generation of the object, if applied to an object.
         */
        generation?: string | null;
        /**
         * The ID of the access-control entry.
         */
        id?: string | null;
        /**
         * The kind of item this is. For object access control entries, this is always storage#objectAccessControl.
         */
        kind?: string | null;
        /**
         * The name of the object, if applied to an object.
         */
        object?: string | null;
        /**
         * The project team associated with the entity, if any.
         */
        projectTeam?: {
            projectNumber?: string;
            team?: string;
        } | null;
        /**
         * The access permission for the entity.
         */
        role?: string | null;
        /**
         * The link to this access-control entry.
         */
        selfLink?: string | null;
    }
    /**
     * An access-control list.
     */
    export interface Schema$ObjectAccessControls {
        /**
         * The list of items.
         */
        items?: Schema$ObjectAccessControl[];
        /**
         * The kind of item this is. For lists of object access control entries, this is always storage#objectAccessControls.
         */
        kind?: string | null;
    }
    /**
     * A list of objects.
     */
    export interface Schema$Objects {
        /**
         * The list of items.
         */
        items?: Schema$Object[];
        /**
         * The kind of item this is. For lists of objects, this is always storage#objects.
         */
        kind?: string | null;
        /**
         * The continuation token, used to page through large result sets. Provide this value in a subsequent request to return the next page of results.
         */
        nextPageToken?: string | null;
        /**
         * The list of prefixes of objects matching-but-not-listed up to and including the requested delimiter.
         */
        prefixes?: string[] | null;
    }
    /**
     * A bucket/object IAM policy.
     */
    export interface Schema$Policy {
        /**
         * An association between a role, which comes with a set of permissions, and members who may assume that role.
         */
        bindings?: Array<{
            condition?: Schema$Expr;
            members?: string[];
            role?: string;
        }> | null;
        /**
         * HTTP 1.1  Entity tag for the policy.
         */
        etag?: string | null;
        /**
         * The kind of item this is. For policies, this is always storage#policy. This field is ignored on input.
         */
        kind?: string | null;
        /**
         * The ID of the resource to which this policy belongs. Will be of the form projects/_/buckets/bucket for buckets, and projects/_/buckets/bucket/objects/object for objects. A specific generation may be specified by appending #generationNumber to the end of the object name, e.g. projects/_/buckets/my-bucket/objects/data.txt#17. The current generation can be denoted with #0. This field is ignored on input.
         */
        resourceId?: string | null;
        /**
         * The IAM policy format version.
         */
        version?: number | null;
    }
    /**
     * A rewrite response.
     */
    export interface Schema$RewriteResponse {
        /**
         * true if the copy is finished; otherwise, false if the copy is in progress. This property is always present in the response.
         */
        done?: boolean | null;
        /**
         * The kind of item this is.
         */
        kind?: string | null;
        /**
         * The total size of the object being copied in bytes. This property is always present in the response.
         */
        objectSize?: string | null;
        /**
         * A resource containing the metadata for the copied-to object. This property is present in the response only when copying completes.
         */
        resource?: Schema$Object;
        /**
         * A token to use in subsequent requests to continue copying data. This token is present in the response only when there is more data to copy.
         */
        rewriteToken?: string | null;
        /**
         * The total bytes written so far, which can be used to provide a waiting user with a progress indicator. This property is always present in the response.
         */
        totalBytesRewritten?: string | null;
    }
    /**
     * A subscription to receive Google PubSub notifications.
     */
    export interface Schema$ServiceAccount {
        /**
         * The ID of the notification.
         */
        email_address?: string | null;
        /**
         * The kind of item this is. For notifications, this is always storage#notification.
         */
        kind?: string | null;
    }
    /**
     * A storage.(buckets|objects).testIamPermissions response.
     */
    export interface Schema$TestIamPermissionsResponse {
        /**
         * The kind of item this is.
         */
        kind?: string | null;
        /**
         * The permissions held by the caller. Permissions are always of the format storage.resource.capability, where resource is one of buckets or objects. The supported permissions are as follows:   - storage.buckets.delete — Delete bucket.   - storage.buckets.get — Read bucket metadata.   - storage.buckets.getIamPolicy — Read bucket IAM policy.   - storage.buckets.create — Create bucket.   - storage.buckets.list — List buckets.   - storage.buckets.setIamPolicy — Update bucket IAM policy.   - storage.buckets.update — Update bucket metadata.   - storage.objects.delete — Delete object.   - storage.objects.get — Read object data and metadata.   - storage.objects.getIamPolicy — Read object IAM policy.   - storage.objects.create — Create object.   - storage.objects.list — List objects.   - storage.objects.setIamPolicy — Update object IAM policy.   - storage.objects.update — Update object metadata.
         */
        permissions?: string[] | null;
    }
    export class Resource$Bucketaccesscontrols {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * storage.bucketAccessControls.delete
         * @desc Permanently deletes the ACL entry for the specified entity on the specified bucket.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.bucketAccessControls.delete({
         *     // Name of a bucket.
         *     bucket: 'placeholder-value',
         *     // The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         *     entity: 'placeholder-value',
         *     // The project to be billed for this request if the target bucket is requester-pays bucket.
         *     provisionalUserProject: 'placeholder-value',
         *     // The project to be billed for this request. Required for Requester Pays buckets.
         *     userProject: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias storage.bucketAccessControls.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {string} params.entity The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         * @param {string=} params.provisionalUserProject The project to be billed for this request if the target bucket is requester-pays bucket.
         * @param {string=} params.userProject The project to be billed for this request. Required for Requester Pays buckets.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Bucketaccesscontrols$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Bucketaccesscontrols$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Bucketaccesscontrols$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Bucketaccesscontrols$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Bucketaccesscontrols$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * storage.bucketAccessControls.get
         * @desc Returns the ACL entry for the specified entity on the specified bucket.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.bucketAccessControls.get({
         *     // Name of a bucket.
         *     bucket: 'placeholder-value',
         *     // The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         *     entity: 'placeholder-value',
         *     // The project to be billed for this request if the target bucket is requester-pays bucket.
         *     provisionalUserProject: 'placeholder-value',
         *     // The project to be billed for this request. Required for Requester Pays buckets.
         *     userProject: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "bucket": "my_bucket",
         *   //   "domain": "my_domain",
         *   //   "email": "my_email",
         *   //   "entity": "my_entity",
         *   //   "entityId": "my_entityId",
         *   //   "etag": "my_etag",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "projectTeam": {},
         *   //   "role": "my_role",
         *   //   "selfLink": "my_selfLink"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias storage.bucketAccessControls.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {string} params.entity The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         * @param {string=} params.provisionalUserProject The project to be billed for this request if the target bucket is requester-pays bucket.
         * @param {string=} params.userProject The project to be billed for this request. Required for Requester Pays buckets.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Bucketaccesscontrols$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Bucketaccesscontrols$Get, options?: MethodOptions): GaxiosPromise<Schema$BucketAccessControl>;
        get(params: Params$Resource$Bucketaccesscontrols$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Bucketaccesscontrols$Get, options: MethodOptions | BodyResponseCallback<Schema$BucketAccessControl>, callback: BodyResponseCallback<Schema$BucketAccessControl>): void;
        get(params: Params$Resource$Bucketaccesscontrols$Get, callback: BodyResponseCallback<Schema$BucketAccessControl>): void;
        get(callback: BodyResponseCallback<Schema$BucketAccessControl>): void;
        /**
         * storage.bucketAccessControls.insert
         * @desc Creates a new ACL entry on the specified bucket.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.bucketAccessControls.insert({
         *     // Name of a bucket.
         *     bucket: 'placeholder-value',
         *     // The project to be billed for this request if the target bucket is requester-pays bucket.
         *     provisionalUserProject: 'placeholder-value',
         *     // The project to be billed for this request. Required for Requester Pays buckets.
         *     userProject: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "bucket": "my_bucket",
         *       //   "domain": "my_domain",
         *       //   "email": "my_email",
         *       //   "entity": "my_entity",
         *       //   "entityId": "my_entityId",
         *       //   "etag": "my_etag",
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "projectTeam": {},
         *       //   "role": "my_role",
         *       //   "selfLink": "my_selfLink"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "bucket": "my_bucket",
         *   //   "domain": "my_domain",
         *   //   "email": "my_email",
         *   //   "entity": "my_entity",
         *   //   "entityId": "my_entityId",
         *   //   "etag": "my_etag",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "projectTeam": {},
         *   //   "role": "my_role",
         *   //   "selfLink": "my_selfLink"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias storage.bucketAccessControls.insert
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {string=} params.provisionalUserProject The project to be billed for this request if the target bucket is requester-pays bucket.
         * @param {string=} params.userProject The project to be billed for this request. Required for Requester Pays buckets.
         * @param {().BucketAccessControl} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        insert(params: Params$Resource$Bucketaccesscontrols$Insert, options: StreamMethodOptions): GaxiosPromise<Readable>;
        insert(params?: Params$Resource$Bucketaccesscontrols$Insert, options?: MethodOptions): GaxiosPromise<Schema$BucketAccessControl>;
        insert(params: Params$Resource$Bucketaccesscontrols$Insert, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        insert(params: Params$Resource$Bucketaccesscontrols$Insert, options: MethodOptions | BodyResponseCallback<Schema$BucketAccessControl>, callback: BodyResponseCallback<Schema$BucketAccessControl>): void;
        insert(params: Params$Resource$Bucketaccesscontrols$Insert, callback: BodyResponseCallback<Schema$BucketAccessControl>): void;
        insert(callback: BodyResponseCallback<Schema$BucketAccessControl>): void;
        /**
         * storage.bucketAccessControls.list
         * @desc Retrieves ACL entries on the specified bucket.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.bucketAccessControls.list({
         *     // Name of a bucket.
         *     bucket: 'placeholder-value',
         *     // The project to be billed for this request if the target bucket is requester-pays bucket.
         *     provisionalUserProject: 'placeholder-value',
         *     // The project to be billed for this request. Required for Requester Pays buckets.
         *     userProject: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
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
         * @alias storage.bucketAccessControls.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {string=} params.provisionalUserProject The project to be billed for this request if the target bucket is requester-pays bucket.
         * @param {string=} params.userProject The project to be billed for this request. Required for Requester Pays buckets.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Bucketaccesscontrols$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Bucketaccesscontrols$List, options?: MethodOptions): GaxiosPromise<Schema$BucketAccessControls>;
        list(params: Params$Resource$Bucketaccesscontrols$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Bucketaccesscontrols$List, options: MethodOptions | BodyResponseCallback<Schema$BucketAccessControls>, callback: BodyResponseCallback<Schema$BucketAccessControls>): void;
        list(params: Params$Resource$Bucketaccesscontrols$List, callback: BodyResponseCallback<Schema$BucketAccessControls>): void;
        list(callback: BodyResponseCallback<Schema$BucketAccessControls>): void;
        /**
         * storage.bucketAccessControls.patch
         * @desc Patches an ACL entry on the specified bucket.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.bucketAccessControls.patch({
         *     // Name of a bucket.
         *     bucket: 'placeholder-value',
         *     // The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         *     entity: 'placeholder-value',
         *     // The project to be billed for this request if the target bucket is requester-pays bucket.
         *     provisionalUserProject: 'placeholder-value',
         *     // The project to be billed for this request. Required for Requester Pays buckets.
         *     userProject: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "bucket": "my_bucket",
         *       //   "domain": "my_domain",
         *       //   "email": "my_email",
         *       //   "entity": "my_entity",
         *       //   "entityId": "my_entityId",
         *       //   "etag": "my_etag",
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "projectTeam": {},
         *       //   "role": "my_role",
         *       //   "selfLink": "my_selfLink"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "bucket": "my_bucket",
         *   //   "domain": "my_domain",
         *   //   "email": "my_email",
         *   //   "entity": "my_entity",
         *   //   "entityId": "my_entityId",
         *   //   "etag": "my_etag",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "projectTeam": {},
         *   //   "role": "my_role",
         *   //   "selfLink": "my_selfLink"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias storage.bucketAccessControls.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {string} params.entity The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         * @param {string=} params.provisionalUserProject The project to be billed for this request if the target bucket is requester-pays bucket.
         * @param {string=} params.userProject The project to be billed for this request. Required for Requester Pays buckets.
         * @param {().BucketAccessControl} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Bucketaccesscontrols$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Bucketaccesscontrols$Patch, options?: MethodOptions): GaxiosPromise<Schema$BucketAccessControl>;
        patch(params: Params$Resource$Bucketaccesscontrols$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Bucketaccesscontrols$Patch, options: MethodOptions | BodyResponseCallback<Schema$BucketAccessControl>, callback: BodyResponseCallback<Schema$BucketAccessControl>): void;
        patch(params: Params$Resource$Bucketaccesscontrols$Patch, callback: BodyResponseCallback<Schema$BucketAccessControl>): void;
        patch(callback: BodyResponseCallback<Schema$BucketAccessControl>): void;
        /**
         * storage.bucketAccessControls.update
         * @desc Updates an ACL entry on the specified bucket.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.bucketAccessControls.update({
         *     // Name of a bucket.
         *     bucket: 'placeholder-value',
         *     // The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         *     entity: 'placeholder-value',
         *     // The project to be billed for this request if the target bucket is requester-pays bucket.
         *     provisionalUserProject: 'placeholder-value',
         *     // The project to be billed for this request. Required for Requester Pays buckets.
         *     userProject: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "bucket": "my_bucket",
         *       //   "domain": "my_domain",
         *       //   "email": "my_email",
         *       //   "entity": "my_entity",
         *       //   "entityId": "my_entityId",
         *       //   "etag": "my_etag",
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "projectTeam": {},
         *       //   "role": "my_role",
         *       //   "selfLink": "my_selfLink"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "bucket": "my_bucket",
         *   //   "domain": "my_domain",
         *   //   "email": "my_email",
         *   //   "entity": "my_entity",
         *   //   "entityId": "my_entityId",
         *   //   "etag": "my_etag",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "projectTeam": {},
         *   //   "role": "my_role",
         *   //   "selfLink": "my_selfLink"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias storage.bucketAccessControls.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {string} params.entity The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         * @param {string=} params.provisionalUserProject The project to be billed for this request if the target bucket is requester-pays bucket.
         * @param {string=} params.userProject The project to be billed for this request. Required for Requester Pays buckets.
         * @param {().BucketAccessControl} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Bucketaccesscontrols$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Bucketaccesscontrols$Update, options?: MethodOptions): GaxiosPromise<Schema$BucketAccessControl>;
        update(params: Params$Resource$Bucketaccesscontrols$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Bucketaccesscontrols$Update, options: MethodOptions | BodyResponseCallback<Schema$BucketAccessControl>, callback: BodyResponseCallback<Schema$BucketAccessControl>): void;
        update(params: Params$Resource$Bucketaccesscontrols$Update, callback: BodyResponseCallback<Schema$BucketAccessControl>): void;
        update(callback: BodyResponseCallback<Schema$BucketAccessControl>): void;
    }
    export interface Params$Resource$Bucketaccesscontrols$Delete extends StandardParameters {
        /**
         * Name of a bucket.
         */
        bucket?: string;
        /**
         * The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         */
        entity?: string;
        /**
         * The project to be billed for this request if the target bucket is requester-pays bucket.
         */
        provisionalUserProject?: string;
        /**
         * The project to be billed for this request. Required for Requester Pays buckets.
         */
        userProject?: string;
    }
    export interface Params$Resource$Bucketaccesscontrols$Get extends StandardParameters {
        /**
         * Name of a bucket.
         */
        bucket?: string;
        /**
         * The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         */
        entity?: string;
        /**
         * The project to be billed for this request if the target bucket is requester-pays bucket.
         */
        provisionalUserProject?: string;
        /**
         * The project to be billed for this request. Required for Requester Pays buckets.
         */
        userProject?: string;
    }
    export interface Params$Resource$Bucketaccesscontrols$Insert extends StandardParameters {
        /**
         * Name of a bucket.
         */
        bucket?: string;
        /**
         * The project to be billed for this request if the target bucket is requester-pays bucket.
         */
        provisionalUserProject?: string;
        /**
         * The project to be billed for this request. Required for Requester Pays buckets.
         */
        userProject?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$BucketAccessControl;
    }
    export interface Params$Resource$Bucketaccesscontrols$List extends StandardParameters {
        /**
         * Name of a bucket.
         */
        bucket?: string;
        /**
         * The project to be billed for this request if the target bucket is requester-pays bucket.
         */
        provisionalUserProject?: string;
        /**
         * The project to be billed for this request. Required for Requester Pays buckets.
         */
        userProject?: string;
    }
    export interface Params$Resource$Bucketaccesscontrols$Patch extends StandardParameters {
        /**
         * Name of a bucket.
         */
        bucket?: string;
        /**
         * The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         */
        entity?: string;
        /**
         * The project to be billed for this request if the target bucket is requester-pays bucket.
         */
        provisionalUserProject?: string;
        /**
         * The project to be billed for this request. Required for Requester Pays buckets.
         */
        userProject?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$BucketAccessControl;
    }
    export interface Params$Resource$Bucketaccesscontrols$Update extends StandardParameters {
        /**
         * Name of a bucket.
         */
        bucket?: string;
        /**
         * The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         */
        entity?: string;
        /**
         * The project to be billed for this request if the target bucket is requester-pays bucket.
         */
        provisionalUserProject?: string;
        /**
         * The project to be billed for this request. Required for Requester Pays buckets.
         */
        userProject?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$BucketAccessControl;
    }
    export class Resource$Buckets {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * storage.buckets.delete
         * @desc Permanently deletes an empty bucket.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *       'https://www.googleapis.com/auth/devstorage.read_write',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.buckets.delete({
         *     // Name of a bucket.
         *     bucket: 'placeholder-value',
         *     // If set, only deletes the bucket if its metageneration matches this value.
         *     ifMetagenerationMatch: 'placeholder-value',
         *     // If set, only deletes the bucket if its metageneration does not match this value.
         *     ifMetagenerationNotMatch: 'placeholder-value',
         *     // The project to be billed for this request if the target bucket is requester-pays bucket.
         *     provisionalUserProject: 'placeholder-value',
         *     // The project to be billed for this request. Required for Requester Pays buckets.
         *     userProject: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias storage.buckets.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {string=} params.ifMetagenerationMatch If set, only deletes the bucket if its metageneration matches this value.
         * @param {string=} params.ifMetagenerationNotMatch If set, only deletes the bucket if its metageneration does not match this value.
         * @param {string=} params.provisionalUserProject The project to be billed for this request if the target bucket is requester-pays bucket.
         * @param {string=} params.userProject The project to be billed for this request. Required for Requester Pays buckets.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Buckets$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Buckets$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Buckets$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Buckets$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Buckets$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * storage.buckets.get
         * @desc Returns metadata for the specified bucket.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *       'https://www.googleapis.com/auth/devstorage.read_only',
         *       'https://www.googleapis.com/auth/devstorage.read_write',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.buckets.get({
         *     // Name of a bucket.
         *     bucket: 'placeholder-value',
         *     // Makes the return of the bucket metadata conditional on whether the bucket's current metageneration matches the given value.
         *     ifMetagenerationMatch: 'placeholder-value',
         *     // Makes the return of the bucket metadata conditional on whether the bucket's current metageneration does not match the given value.
         *     ifMetagenerationNotMatch: 'placeholder-value',
         *     // Set of properties to return. Defaults to noAcl.
         *     projection: 'placeholder-value',
         *     // The project to be billed for this request if the target bucket is requester-pays bucket.
         *     provisionalUserProject: 'placeholder-value',
         *     // The project to be billed for this request. Required for Requester Pays buckets.
         *     userProject: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "acl": [],
         *   //   "billing": {},
         *   //   "cors": [],
         *   //   "defaultEventBasedHold": false,
         *   //   "defaultObjectAcl": [],
         *   //   "encryption": {},
         *   //   "etag": "my_etag",
         *   //   "iamConfiguration": {},
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "labels": {},
         *   //   "lifecycle": {},
         *   //   "location": "my_location",
         *   //   "locationType": "my_locationType",
         *   //   "logging": {},
         *   //   "metageneration": "my_metageneration",
         *   //   "name": "my_name",
         *   //   "owner": {},
         *   //   "projectNumber": "my_projectNumber",
         *   //   "retentionPolicy": {},
         *   //   "selfLink": "my_selfLink",
         *   //   "storageClass": "my_storageClass",
         *   //   "timeCreated": "my_timeCreated",
         *   //   "updated": "my_updated",
         *   //   "versioning": {},
         *   //   "website": {},
         *   //   "zoneAffinity": [],
         *   //   "zoneSeparation": false
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias storage.buckets.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {string=} params.ifMetagenerationMatch Makes the return of the bucket metadata conditional on whether the bucket's current metageneration matches the given value.
         * @param {string=} params.ifMetagenerationNotMatch Makes the return of the bucket metadata conditional on whether the bucket's current metageneration does not match the given value.
         * @param {string=} params.projection Set of properties to return. Defaults to noAcl.
         * @param {string=} params.provisionalUserProject The project to be billed for this request if the target bucket is requester-pays bucket.
         * @param {string=} params.userProject The project to be billed for this request. Required for Requester Pays buckets.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Buckets$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Buckets$Get, options?: MethodOptions): GaxiosPromise<Schema$Bucket>;
        get(params: Params$Resource$Buckets$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Buckets$Get, options: MethodOptions | BodyResponseCallback<Schema$Bucket>, callback: BodyResponseCallback<Schema$Bucket>): void;
        get(params: Params$Resource$Buckets$Get, callback: BodyResponseCallback<Schema$Bucket>): void;
        get(callback: BodyResponseCallback<Schema$Bucket>): void;
        /**
         * storage.buckets.getIamPolicy
         * @desc Returns an IAM policy for the specified bucket.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.buckets.getIamPolicy({
         *     // Name of a bucket.
         *     bucket: 'placeholder-value',
         *     // The IAM policy format version to be returned. If the optionsRequestedPolicyVersion is for an older version that doesn't support part of the requested IAM policy, the request fails.
         *     optionsRequestedPolicyVersion: 'placeholder-value',
         *     // The project to be billed for this request if the target bucket is requester-pays bucket.
         *     provisionalUserProject: 'placeholder-value',
         *     // The project to be billed for this request. Required for Requester Pays buckets.
         *     userProject: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "bindings": [],
         *   //   "etag": "my_etag",
         *   //   "kind": "my_kind",
         *   //   "resourceId": "my_resourceId",
         *   //   "version": 0
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias storage.buckets.getIamPolicy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {integer=} params.optionsRequestedPolicyVersion The IAM policy format version to be returned. If the optionsRequestedPolicyVersion is for an older version that doesn't support part of the requested IAM policy, the request fails.
         * @param {string=} params.provisionalUserProject The project to be billed for this request if the target bucket is requester-pays bucket.
         * @param {string=} params.userProject The project to be billed for this request. Required for Requester Pays buckets.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        getIamPolicy(params: Params$Resource$Buckets$Getiampolicy, options: StreamMethodOptions): GaxiosPromise<Readable>;
        getIamPolicy(params?: Params$Resource$Buckets$Getiampolicy, options?: MethodOptions): GaxiosPromise<Schema$Policy>;
        getIamPolicy(params: Params$Resource$Buckets$Getiampolicy, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        getIamPolicy(params: Params$Resource$Buckets$Getiampolicy, options: MethodOptions | BodyResponseCallback<Schema$Policy>, callback: BodyResponseCallback<Schema$Policy>): void;
        getIamPolicy(params: Params$Resource$Buckets$Getiampolicy, callback: BodyResponseCallback<Schema$Policy>): void;
        getIamPolicy(callback: BodyResponseCallback<Schema$Policy>): void;
        /**
         * storage.buckets.insert
         * @desc Creates a new bucket.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *       'https://www.googleapis.com/auth/devstorage.read_write',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.buckets.insert({
         *     // Apply a predefined set of access controls to this bucket.
         *     predefinedAcl: 'placeholder-value',
         *     // Apply a predefined set of default object access controls to this bucket.
         *     predefinedDefaultObjectAcl: 'placeholder-value',
         *     // A valid API project identifier.
         *     project: 'placeholder-value',
         *     // Set of properties to return. Defaults to noAcl, unless the bucket resource specifies acl or defaultObjectAcl properties, when it defaults to full.
         *     projection: 'placeholder-value',
         *     // The project to be billed for this request if the target bucket is requester-pays bucket.
         *     provisionalUserProject: 'placeholder-value',
         *     // The project to be billed for this request.
         *     userProject: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "acl": [],
         *       //   "billing": {},
         *       //   "cors": [],
         *       //   "defaultEventBasedHold": false,
         *       //   "defaultObjectAcl": [],
         *       //   "encryption": {},
         *       //   "etag": "my_etag",
         *       //   "iamConfiguration": {},
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "labels": {},
         *       //   "lifecycle": {},
         *       //   "location": "my_location",
         *       //   "locationType": "my_locationType",
         *       //   "logging": {},
         *       //   "metageneration": "my_metageneration",
         *       //   "name": "my_name",
         *       //   "owner": {},
         *       //   "projectNumber": "my_projectNumber",
         *       //   "retentionPolicy": {},
         *       //   "selfLink": "my_selfLink",
         *       //   "storageClass": "my_storageClass",
         *       //   "timeCreated": "my_timeCreated",
         *       //   "updated": "my_updated",
         *       //   "versioning": {},
         *       //   "website": {},
         *       //   "zoneAffinity": [],
         *       //   "zoneSeparation": false
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "acl": [],
         *   //   "billing": {},
         *   //   "cors": [],
         *   //   "defaultEventBasedHold": false,
         *   //   "defaultObjectAcl": [],
         *   //   "encryption": {},
         *   //   "etag": "my_etag",
         *   //   "iamConfiguration": {},
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "labels": {},
         *   //   "lifecycle": {},
         *   //   "location": "my_location",
         *   //   "locationType": "my_locationType",
         *   //   "logging": {},
         *   //   "metageneration": "my_metageneration",
         *   //   "name": "my_name",
         *   //   "owner": {},
         *   //   "projectNumber": "my_projectNumber",
         *   //   "retentionPolicy": {},
         *   //   "selfLink": "my_selfLink",
         *   //   "storageClass": "my_storageClass",
         *   //   "timeCreated": "my_timeCreated",
         *   //   "updated": "my_updated",
         *   //   "versioning": {},
         *   //   "website": {},
         *   //   "zoneAffinity": [],
         *   //   "zoneSeparation": false
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias storage.buckets.insert
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.predefinedAcl Apply a predefined set of access controls to this bucket.
         * @param {string=} params.predefinedDefaultObjectAcl Apply a predefined set of default object access controls to this bucket.
         * @param {string} params.project A valid API project identifier.
         * @param {string=} params.projection Set of properties to return. Defaults to noAcl, unless the bucket resource specifies acl or defaultObjectAcl properties, when it defaults to full.
         * @param {string=} params.provisionalUserProject The project to be billed for this request if the target bucket is requester-pays bucket.
         * @param {string=} params.userProject The project to be billed for this request.
         * @param {().Bucket} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        insert(params: Params$Resource$Buckets$Insert, options: StreamMethodOptions): GaxiosPromise<Readable>;
        insert(params?: Params$Resource$Buckets$Insert, options?: MethodOptions): GaxiosPromise<Schema$Bucket>;
        insert(params: Params$Resource$Buckets$Insert, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        insert(params: Params$Resource$Buckets$Insert, options: MethodOptions | BodyResponseCallback<Schema$Bucket>, callback: BodyResponseCallback<Schema$Bucket>): void;
        insert(params: Params$Resource$Buckets$Insert, callback: BodyResponseCallback<Schema$Bucket>): void;
        insert(callback: BodyResponseCallback<Schema$Bucket>): void;
        /**
         * storage.buckets.list
         * @desc Retrieves a list of buckets for a given project.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *       'https://www.googleapis.com/auth/devstorage.read_only',
         *       'https://www.googleapis.com/auth/devstorage.read_write',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.buckets.list({
         *     // Maximum number of buckets to return in a single response. The service will use this parameter or 1,000 items, whichever is smaller.
         *     maxResults: 'placeholder-value',
         *     // A previously-returned page token representing part of the larger set of results to view.
         *     pageToken: 'placeholder-value',
         *     // Filter results to buckets whose names begin with this prefix.
         *     prefix: 'placeholder-value',
         *     // A valid API project identifier.
         *     project: 'placeholder-value',
         *     // Set of properties to return. Defaults to noAcl.
         *     projection: 'placeholder-value',
         *     // The project to be billed for this request if the target bucket is requester-pays bucket.
         *     provisionalUserProject: 'placeholder-value',
         *     // The project to be billed for this request.
         *     userProject: 'placeholder-value',
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
         * @alias storage.buckets.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.maxResults Maximum number of buckets to return in a single response. The service will use this parameter or 1,000 items, whichever is smaller.
         * @param {string=} params.pageToken A previously-returned page token representing part of the larger set of results to view.
         * @param {string=} params.prefix Filter results to buckets whose names begin with this prefix.
         * @param {string} params.project A valid API project identifier.
         * @param {string=} params.projection Set of properties to return. Defaults to noAcl.
         * @param {string=} params.provisionalUserProject The project to be billed for this request if the target bucket is requester-pays bucket.
         * @param {string=} params.userProject The project to be billed for this request.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Buckets$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Buckets$List, options?: MethodOptions): GaxiosPromise<Schema$Buckets>;
        list(params: Params$Resource$Buckets$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Buckets$List, options: MethodOptions | BodyResponseCallback<Schema$Buckets>, callback: BodyResponseCallback<Schema$Buckets>): void;
        list(params: Params$Resource$Buckets$List, callback: BodyResponseCallback<Schema$Buckets>): void;
        list(callback: BodyResponseCallback<Schema$Buckets>): void;
        /**
         * storage.buckets.lockRetentionPolicy
         * @desc Locks retention policy on a bucket.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *       'https://www.googleapis.com/auth/devstorage.read_write',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.buckets.lockRetentionPolicy({
         *     // Name of a bucket.
         *     bucket: 'placeholder-value',
         *     // Makes the operation conditional on whether bucket's current metageneration matches the given value.
         *     ifMetagenerationMatch: 'placeholder-value',
         *     // The project to be billed for this request if the target bucket is requester-pays bucket.
         *     provisionalUserProject: 'placeholder-value',
         *     // The project to be billed for this request. Required for Requester Pays buckets.
         *     userProject: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "acl": [],
         *   //   "billing": {},
         *   //   "cors": [],
         *   //   "defaultEventBasedHold": false,
         *   //   "defaultObjectAcl": [],
         *   //   "encryption": {},
         *   //   "etag": "my_etag",
         *   //   "iamConfiguration": {},
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "labels": {},
         *   //   "lifecycle": {},
         *   //   "location": "my_location",
         *   //   "locationType": "my_locationType",
         *   //   "logging": {},
         *   //   "metageneration": "my_metageneration",
         *   //   "name": "my_name",
         *   //   "owner": {},
         *   //   "projectNumber": "my_projectNumber",
         *   //   "retentionPolicy": {},
         *   //   "selfLink": "my_selfLink",
         *   //   "storageClass": "my_storageClass",
         *   //   "timeCreated": "my_timeCreated",
         *   //   "updated": "my_updated",
         *   //   "versioning": {},
         *   //   "website": {},
         *   //   "zoneAffinity": [],
         *   //   "zoneSeparation": false
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias storage.buckets.lockRetentionPolicy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {string} params.ifMetagenerationMatch Makes the operation conditional on whether bucket's current metageneration matches the given value.
         * @param {string=} params.provisionalUserProject The project to be billed for this request if the target bucket is requester-pays bucket.
         * @param {string=} params.userProject The project to be billed for this request. Required for Requester Pays buckets.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        lockRetentionPolicy(params: Params$Resource$Buckets$Lockretentionpolicy, options: StreamMethodOptions): GaxiosPromise<Readable>;
        lockRetentionPolicy(params?: Params$Resource$Buckets$Lockretentionpolicy, options?: MethodOptions): GaxiosPromise<Schema$Bucket>;
        lockRetentionPolicy(params: Params$Resource$Buckets$Lockretentionpolicy, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        lockRetentionPolicy(params: Params$Resource$Buckets$Lockretentionpolicy, options: MethodOptions | BodyResponseCallback<Schema$Bucket>, callback: BodyResponseCallback<Schema$Bucket>): void;
        lockRetentionPolicy(params: Params$Resource$Buckets$Lockretentionpolicy, callback: BodyResponseCallback<Schema$Bucket>): void;
        lockRetentionPolicy(callback: BodyResponseCallback<Schema$Bucket>): void;
        /**
         * storage.buckets.patch
         * @desc Patches a bucket. Changes to the bucket will be readable immediately after writing, but configuration changes may take time to propagate.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.buckets.patch({
         *     // Name of a bucket.
         *     bucket: 'placeholder-value',
         *     // Makes the return of the bucket metadata conditional on whether the bucket's current metageneration matches the given value.
         *     ifMetagenerationMatch: 'placeholder-value',
         *     // Makes the return of the bucket metadata conditional on whether the bucket's current metageneration does not match the given value.
         *     ifMetagenerationNotMatch: 'placeholder-value',
         *     // Apply a predefined set of access controls to this bucket.
         *     predefinedAcl: 'placeholder-value',
         *     // Apply a predefined set of default object access controls to this bucket.
         *     predefinedDefaultObjectAcl: 'placeholder-value',
         *     // Set of properties to return. Defaults to full.
         *     projection: 'placeholder-value',
         *     // The project to be billed for this request if the target bucket is requester-pays bucket.
         *     provisionalUserProject: 'placeholder-value',
         *     // The project to be billed for this request. Required for Requester Pays buckets.
         *     userProject: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "acl": [],
         *       //   "billing": {},
         *       //   "cors": [],
         *       //   "defaultEventBasedHold": false,
         *       //   "defaultObjectAcl": [],
         *       //   "encryption": {},
         *       //   "etag": "my_etag",
         *       //   "iamConfiguration": {},
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "labels": {},
         *       //   "lifecycle": {},
         *       //   "location": "my_location",
         *       //   "locationType": "my_locationType",
         *       //   "logging": {},
         *       //   "metageneration": "my_metageneration",
         *       //   "name": "my_name",
         *       //   "owner": {},
         *       //   "projectNumber": "my_projectNumber",
         *       //   "retentionPolicy": {},
         *       //   "selfLink": "my_selfLink",
         *       //   "storageClass": "my_storageClass",
         *       //   "timeCreated": "my_timeCreated",
         *       //   "updated": "my_updated",
         *       //   "versioning": {},
         *       //   "website": {},
         *       //   "zoneAffinity": [],
         *       //   "zoneSeparation": false
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "acl": [],
         *   //   "billing": {},
         *   //   "cors": [],
         *   //   "defaultEventBasedHold": false,
         *   //   "defaultObjectAcl": [],
         *   //   "encryption": {},
         *   //   "etag": "my_etag",
         *   //   "iamConfiguration": {},
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "labels": {},
         *   //   "lifecycle": {},
         *   //   "location": "my_location",
         *   //   "locationType": "my_locationType",
         *   //   "logging": {},
         *   //   "metageneration": "my_metageneration",
         *   //   "name": "my_name",
         *   //   "owner": {},
         *   //   "projectNumber": "my_projectNumber",
         *   //   "retentionPolicy": {},
         *   //   "selfLink": "my_selfLink",
         *   //   "storageClass": "my_storageClass",
         *   //   "timeCreated": "my_timeCreated",
         *   //   "updated": "my_updated",
         *   //   "versioning": {},
         *   //   "website": {},
         *   //   "zoneAffinity": [],
         *   //   "zoneSeparation": false
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias storage.buckets.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {string=} params.ifMetagenerationMatch Makes the return of the bucket metadata conditional on whether the bucket's current metageneration matches the given value.
         * @param {string=} params.ifMetagenerationNotMatch Makes the return of the bucket metadata conditional on whether the bucket's current metageneration does not match the given value.
         * @param {string=} params.predefinedAcl Apply a predefined set of access controls to this bucket.
         * @param {string=} params.predefinedDefaultObjectAcl Apply a predefined set of default object access controls to this bucket.
         * @param {string=} params.projection Set of properties to return. Defaults to full.
         * @param {string=} params.provisionalUserProject The project to be billed for this request if the target bucket is requester-pays bucket.
         * @param {string=} params.userProject The project to be billed for this request. Required for Requester Pays buckets.
         * @param {().Bucket} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Buckets$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Buckets$Patch, options?: MethodOptions): GaxiosPromise<Schema$Bucket>;
        patch(params: Params$Resource$Buckets$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Buckets$Patch, options: MethodOptions | BodyResponseCallback<Schema$Bucket>, callback: BodyResponseCallback<Schema$Bucket>): void;
        patch(params: Params$Resource$Buckets$Patch, callback: BodyResponseCallback<Schema$Bucket>): void;
        patch(callback: BodyResponseCallback<Schema$Bucket>): void;
        /**
         * storage.buckets.setIamPolicy
         * @desc Updates an IAM policy for the specified bucket.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.buckets.setIamPolicy({
         *     // Name of a bucket.
         *     bucket: 'placeholder-value',
         *     // The project to be billed for this request if the target bucket is requester-pays bucket.
         *     provisionalUserProject: 'placeholder-value',
         *     // The project to be billed for this request. Required for Requester Pays buckets.
         *     userProject: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "bindings": [],
         *       //   "etag": "my_etag",
         *       //   "kind": "my_kind",
         *       //   "resourceId": "my_resourceId",
         *       //   "version": 0
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "bindings": [],
         *   //   "etag": "my_etag",
         *   //   "kind": "my_kind",
         *   //   "resourceId": "my_resourceId",
         *   //   "version": 0
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias storage.buckets.setIamPolicy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {string=} params.provisionalUserProject The project to be billed for this request if the target bucket is requester-pays bucket.
         * @param {string=} params.userProject The project to be billed for this request. Required for Requester Pays buckets.
         * @param {().Policy} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        setIamPolicy(params: Params$Resource$Buckets$Setiampolicy, options: StreamMethodOptions): GaxiosPromise<Readable>;
        setIamPolicy(params?: Params$Resource$Buckets$Setiampolicy, options?: MethodOptions): GaxiosPromise<Schema$Policy>;
        setIamPolicy(params: Params$Resource$Buckets$Setiampolicy, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        setIamPolicy(params: Params$Resource$Buckets$Setiampolicy, options: MethodOptions | BodyResponseCallback<Schema$Policy>, callback: BodyResponseCallback<Schema$Policy>): void;
        setIamPolicy(params: Params$Resource$Buckets$Setiampolicy, callback: BodyResponseCallback<Schema$Policy>): void;
        setIamPolicy(callback: BodyResponseCallback<Schema$Policy>): void;
        /**
         * storage.buckets.testIamPermissions
         * @desc Tests a set of permissions on the given bucket to see which, if any, are held by the caller.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *       'https://www.googleapis.com/auth/devstorage.read_only',
         *       'https://www.googleapis.com/auth/devstorage.read_write',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.buckets.testIamPermissions({
         *     // Name of a bucket.
         *     bucket: 'placeholder-value',
         *     // Permissions to test.
         *     permissions: 'placeholder-value',
         *     // The project to be billed for this request if the target bucket is requester-pays bucket.
         *     provisionalUserProject: 'placeholder-value',
         *     // The project to be billed for this request. Required for Requester Pays buckets.
         *     userProject: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "kind": "my_kind",
         *   //   "permissions": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias storage.buckets.testIamPermissions
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {string} params.permissions Permissions to test.
         * @param {string=} params.provisionalUserProject The project to be billed for this request if the target bucket is requester-pays bucket.
         * @param {string=} params.userProject The project to be billed for this request. Required for Requester Pays buckets.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        testIamPermissions(params: Params$Resource$Buckets$Testiampermissions, options: StreamMethodOptions): GaxiosPromise<Readable>;
        testIamPermissions(params?: Params$Resource$Buckets$Testiampermissions, options?: MethodOptions): GaxiosPromise<Schema$TestIamPermissionsResponse>;
        testIamPermissions(params: Params$Resource$Buckets$Testiampermissions, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        testIamPermissions(params: Params$Resource$Buckets$Testiampermissions, options: MethodOptions | BodyResponseCallback<Schema$TestIamPermissionsResponse>, callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        testIamPermissions(params: Params$Resource$Buckets$Testiampermissions, callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        testIamPermissions(callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        /**
         * storage.buckets.update
         * @desc Updates a bucket. Changes to the bucket will be readable immediately after writing, but configuration changes may take time to propagate.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.buckets.update({
         *     // Name of a bucket.
         *     bucket: 'placeholder-value',
         *     // Makes the return of the bucket metadata conditional on whether the bucket's current metageneration matches the given value.
         *     ifMetagenerationMatch: 'placeholder-value',
         *     // Makes the return of the bucket metadata conditional on whether the bucket's current metageneration does not match the given value.
         *     ifMetagenerationNotMatch: 'placeholder-value',
         *     // Apply a predefined set of access controls to this bucket.
         *     predefinedAcl: 'placeholder-value',
         *     // Apply a predefined set of default object access controls to this bucket.
         *     predefinedDefaultObjectAcl: 'placeholder-value',
         *     // Set of properties to return. Defaults to full.
         *     projection: 'placeholder-value',
         *     // The project to be billed for this request if the target bucket is requester-pays bucket.
         *     provisionalUserProject: 'placeholder-value',
         *     // The project to be billed for this request. Required for Requester Pays buckets.
         *     userProject: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "acl": [],
         *       //   "billing": {},
         *       //   "cors": [],
         *       //   "defaultEventBasedHold": false,
         *       //   "defaultObjectAcl": [],
         *       //   "encryption": {},
         *       //   "etag": "my_etag",
         *       //   "iamConfiguration": {},
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "labels": {},
         *       //   "lifecycle": {},
         *       //   "location": "my_location",
         *       //   "locationType": "my_locationType",
         *       //   "logging": {},
         *       //   "metageneration": "my_metageneration",
         *       //   "name": "my_name",
         *       //   "owner": {},
         *       //   "projectNumber": "my_projectNumber",
         *       //   "retentionPolicy": {},
         *       //   "selfLink": "my_selfLink",
         *       //   "storageClass": "my_storageClass",
         *       //   "timeCreated": "my_timeCreated",
         *       //   "updated": "my_updated",
         *       //   "versioning": {},
         *       //   "website": {},
         *       //   "zoneAffinity": [],
         *       //   "zoneSeparation": false
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "acl": [],
         *   //   "billing": {},
         *   //   "cors": [],
         *   //   "defaultEventBasedHold": false,
         *   //   "defaultObjectAcl": [],
         *   //   "encryption": {},
         *   //   "etag": "my_etag",
         *   //   "iamConfiguration": {},
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "labels": {},
         *   //   "lifecycle": {},
         *   //   "location": "my_location",
         *   //   "locationType": "my_locationType",
         *   //   "logging": {},
         *   //   "metageneration": "my_metageneration",
         *   //   "name": "my_name",
         *   //   "owner": {},
         *   //   "projectNumber": "my_projectNumber",
         *   //   "retentionPolicy": {},
         *   //   "selfLink": "my_selfLink",
         *   //   "storageClass": "my_storageClass",
         *   //   "timeCreated": "my_timeCreated",
         *   //   "updated": "my_updated",
         *   //   "versioning": {},
         *   //   "website": {},
         *   //   "zoneAffinity": [],
         *   //   "zoneSeparation": false
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias storage.buckets.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {string=} params.ifMetagenerationMatch Makes the return of the bucket metadata conditional on whether the bucket's current metageneration matches the given value.
         * @param {string=} params.ifMetagenerationNotMatch Makes the return of the bucket metadata conditional on whether the bucket's current metageneration does not match the given value.
         * @param {string=} params.predefinedAcl Apply a predefined set of access controls to this bucket.
         * @param {string=} params.predefinedDefaultObjectAcl Apply a predefined set of default object access controls to this bucket.
         * @param {string=} params.projection Set of properties to return. Defaults to full.
         * @param {string=} params.provisionalUserProject The project to be billed for this request if the target bucket is requester-pays bucket.
         * @param {string=} params.userProject The project to be billed for this request. Required for Requester Pays buckets.
         * @param {().Bucket} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Buckets$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Buckets$Update, options?: MethodOptions): GaxiosPromise<Schema$Bucket>;
        update(params: Params$Resource$Buckets$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Buckets$Update, options: MethodOptions | BodyResponseCallback<Schema$Bucket>, callback: BodyResponseCallback<Schema$Bucket>): void;
        update(params: Params$Resource$Buckets$Update, callback: BodyResponseCallback<Schema$Bucket>): void;
        update(callback: BodyResponseCallback<Schema$Bucket>): void;
    }
    export interface Params$Resource$Buckets$Delete extends StandardParameters {
        /**
         * Name of a bucket.
         */
        bucket?: string;
        /**
         * If set, only deletes the bucket if its metageneration matches this value.
         */
        ifMetagenerationMatch?: string;
        /**
         * If set, only deletes the bucket if its metageneration does not match this value.
         */
        ifMetagenerationNotMatch?: string;
        /**
         * The project to be billed for this request if the target bucket is requester-pays bucket.
         */
        provisionalUserProject?: string;
        /**
         * The project to be billed for this request. Required for Requester Pays buckets.
         */
        userProject?: string;
    }
    export interface Params$Resource$Buckets$Get extends StandardParameters {
        /**
         * Name of a bucket.
         */
        bucket?: string;
        /**
         * Makes the return of the bucket metadata conditional on whether the bucket's current metageneration matches the given value.
         */
        ifMetagenerationMatch?: string;
        /**
         * Makes the return of the bucket metadata conditional on whether the bucket's current metageneration does not match the given value.
         */
        ifMetagenerationNotMatch?: string;
        /**
         * Set of properties to return. Defaults to noAcl.
         */
        projection?: string;
        /**
         * The project to be billed for this request if the target bucket is requester-pays bucket.
         */
        provisionalUserProject?: string;
        /**
         * The project to be billed for this request. Required for Requester Pays buckets.
         */
        userProject?: string;
    }
    export interface Params$Resource$Buckets$Getiampolicy extends StandardParameters {
        /**
         * Name of a bucket.
         */
        bucket?: string;
        /**
         * The IAM policy format version to be returned. If the optionsRequestedPolicyVersion is for an older version that doesn't support part of the requested IAM policy, the request fails.
         */
        optionsRequestedPolicyVersion?: number;
        /**
         * The project to be billed for this request if the target bucket is requester-pays bucket.
         */
        provisionalUserProject?: string;
        /**
         * The project to be billed for this request. Required for Requester Pays buckets.
         */
        userProject?: string;
    }
    export interface Params$Resource$Buckets$Insert extends StandardParameters {
        /**
         * Apply a predefined set of access controls to this bucket.
         */
        predefinedAcl?: string;
        /**
         * Apply a predefined set of default object access controls to this bucket.
         */
        predefinedDefaultObjectAcl?: string;
        /**
         * A valid API project identifier.
         */
        project?: string;
        /**
         * Set of properties to return. Defaults to noAcl, unless the bucket resource specifies acl or defaultObjectAcl properties, when it defaults to full.
         */
        projection?: string;
        /**
         * The project to be billed for this request if the target bucket is requester-pays bucket.
         */
        provisionalUserProject?: string;
        /**
         * The project to be billed for this request.
         */
        userProject?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Bucket;
    }
    export interface Params$Resource$Buckets$List extends StandardParameters {
        /**
         * Maximum number of buckets to return in a single response. The service will use this parameter or 1,000 items, whichever is smaller.
         */
        maxResults?: number;
        /**
         * A previously-returned page token representing part of the larger set of results to view.
         */
        pageToken?: string;
        /**
         * Filter results to buckets whose names begin with this prefix.
         */
        prefix?: string;
        /**
         * A valid API project identifier.
         */
        project?: string;
        /**
         * Set of properties to return. Defaults to noAcl.
         */
        projection?: string;
        /**
         * The project to be billed for this request if the target bucket is requester-pays bucket.
         */
        provisionalUserProject?: string;
        /**
         * The project to be billed for this request.
         */
        userProject?: string;
    }
    export interface Params$Resource$Buckets$Lockretentionpolicy extends StandardParameters {
        /**
         * Name of a bucket.
         */
        bucket?: string;
        /**
         * Makes the operation conditional on whether bucket's current metageneration matches the given value.
         */
        ifMetagenerationMatch?: string;
        /**
         * The project to be billed for this request if the target bucket is requester-pays bucket.
         */
        provisionalUserProject?: string;
        /**
         * The project to be billed for this request. Required for Requester Pays buckets.
         */
        userProject?: string;
    }
    export interface Params$Resource$Buckets$Patch extends StandardParameters {
        /**
         * Name of a bucket.
         */
        bucket?: string;
        /**
         * Makes the return of the bucket metadata conditional on whether the bucket's current metageneration matches the given value.
         */
        ifMetagenerationMatch?: string;
        /**
         * Makes the return of the bucket metadata conditional on whether the bucket's current metageneration does not match the given value.
         */
        ifMetagenerationNotMatch?: string;
        /**
         * Apply a predefined set of access controls to this bucket.
         */
        predefinedAcl?: string;
        /**
         * Apply a predefined set of default object access controls to this bucket.
         */
        predefinedDefaultObjectAcl?: string;
        /**
         * Set of properties to return. Defaults to full.
         */
        projection?: string;
        /**
         * The project to be billed for this request if the target bucket is requester-pays bucket.
         */
        provisionalUserProject?: string;
        /**
         * The project to be billed for this request. Required for Requester Pays buckets.
         */
        userProject?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Bucket;
    }
    export interface Params$Resource$Buckets$Setiampolicy extends StandardParameters {
        /**
         * Name of a bucket.
         */
        bucket?: string;
        /**
         * The project to be billed for this request if the target bucket is requester-pays bucket.
         */
        provisionalUserProject?: string;
        /**
         * The project to be billed for this request. Required for Requester Pays buckets.
         */
        userProject?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Policy;
    }
    export interface Params$Resource$Buckets$Testiampermissions extends StandardParameters {
        /**
         * Name of a bucket.
         */
        bucket?: string;
        /**
         * Permissions to test.
         */
        permissions?: string[];
        /**
         * The project to be billed for this request if the target bucket is requester-pays bucket.
         */
        provisionalUserProject?: string;
        /**
         * The project to be billed for this request. Required for Requester Pays buckets.
         */
        userProject?: string;
    }
    export interface Params$Resource$Buckets$Update extends StandardParameters {
        /**
         * Name of a bucket.
         */
        bucket?: string;
        /**
         * Makes the return of the bucket metadata conditional on whether the bucket's current metageneration matches the given value.
         */
        ifMetagenerationMatch?: string;
        /**
         * Makes the return of the bucket metadata conditional on whether the bucket's current metageneration does not match the given value.
         */
        ifMetagenerationNotMatch?: string;
        /**
         * Apply a predefined set of access controls to this bucket.
         */
        predefinedAcl?: string;
        /**
         * Apply a predefined set of default object access controls to this bucket.
         */
        predefinedDefaultObjectAcl?: string;
        /**
         * Set of properties to return. Defaults to full.
         */
        projection?: string;
        /**
         * The project to be billed for this request if the target bucket is requester-pays bucket.
         */
        provisionalUserProject?: string;
        /**
         * The project to be billed for this request. Required for Requester Pays buckets.
         */
        userProject?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Bucket;
    }
    export class Resource$Channels {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * storage.channels.stop
         * @desc Stop watching resources through this channel
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *       'https://www.googleapis.com/auth/devstorage.read_only',
         *       'https://www.googleapis.com/auth/devstorage.read_write',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.channels.stop({
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
         * @alias storage.channels.stop
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
    export class Resource$Defaultobjectaccesscontrols {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * storage.defaultObjectAccessControls.delete
         * @desc Permanently deletes the default object ACL entry for the specified entity on the specified bucket.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.defaultObjectAccessControls.delete({
         *     // Name of a bucket.
         *     bucket: 'placeholder-value',
         *     // The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         *     entity: 'placeholder-value',
         *     // The project to be billed for this request if the target bucket is requester-pays bucket.
         *     provisionalUserProject: 'placeholder-value',
         *     // The project to be billed for this request. Required for Requester Pays buckets.
         *     userProject: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias storage.defaultObjectAccessControls.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {string} params.entity The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         * @param {string=} params.provisionalUserProject The project to be billed for this request if the target bucket is requester-pays bucket.
         * @param {string=} params.userProject The project to be billed for this request. Required for Requester Pays buckets.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Defaultobjectaccesscontrols$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Defaultobjectaccesscontrols$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Defaultobjectaccesscontrols$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Defaultobjectaccesscontrols$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Defaultobjectaccesscontrols$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * storage.defaultObjectAccessControls.get
         * @desc Returns the default object ACL entry for the specified entity on the specified bucket.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.defaultObjectAccessControls.get({
         *     // Name of a bucket.
         *     bucket: 'placeholder-value',
         *     // The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         *     entity: 'placeholder-value',
         *     // The project to be billed for this request if the target bucket is requester-pays bucket.
         *     provisionalUserProject: 'placeholder-value',
         *     // The project to be billed for this request. Required for Requester Pays buckets.
         *     userProject: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "bucket": "my_bucket",
         *   //   "domain": "my_domain",
         *   //   "email": "my_email",
         *   //   "entity": "my_entity",
         *   //   "entityId": "my_entityId",
         *   //   "etag": "my_etag",
         *   //   "generation": "my_generation",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "object": "my_object",
         *   //   "projectTeam": {},
         *   //   "role": "my_role",
         *   //   "selfLink": "my_selfLink"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias storage.defaultObjectAccessControls.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {string} params.entity The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         * @param {string=} params.provisionalUserProject The project to be billed for this request if the target bucket is requester-pays bucket.
         * @param {string=} params.userProject The project to be billed for this request. Required for Requester Pays buckets.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Defaultobjectaccesscontrols$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Defaultobjectaccesscontrols$Get, options?: MethodOptions): GaxiosPromise<Schema$ObjectAccessControl>;
        get(params: Params$Resource$Defaultobjectaccesscontrols$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Defaultobjectaccesscontrols$Get, options: MethodOptions | BodyResponseCallback<Schema$ObjectAccessControl>, callback: BodyResponseCallback<Schema$ObjectAccessControl>): void;
        get(params: Params$Resource$Defaultobjectaccesscontrols$Get, callback: BodyResponseCallback<Schema$ObjectAccessControl>): void;
        get(callback: BodyResponseCallback<Schema$ObjectAccessControl>): void;
        /**
         * storage.defaultObjectAccessControls.insert
         * @desc Creates a new default object ACL entry on the specified bucket.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.defaultObjectAccessControls.insert({
         *     // Name of a bucket.
         *     bucket: 'placeholder-value',
         *     // The project to be billed for this request if the target bucket is requester-pays bucket.
         *     provisionalUserProject: 'placeholder-value',
         *     // The project to be billed for this request. Required for Requester Pays buckets.
         *     userProject: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "bucket": "my_bucket",
         *       //   "domain": "my_domain",
         *       //   "email": "my_email",
         *       //   "entity": "my_entity",
         *       //   "entityId": "my_entityId",
         *       //   "etag": "my_etag",
         *       //   "generation": "my_generation",
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "object": "my_object",
         *       //   "projectTeam": {},
         *       //   "role": "my_role",
         *       //   "selfLink": "my_selfLink"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "bucket": "my_bucket",
         *   //   "domain": "my_domain",
         *   //   "email": "my_email",
         *   //   "entity": "my_entity",
         *   //   "entityId": "my_entityId",
         *   //   "etag": "my_etag",
         *   //   "generation": "my_generation",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "object": "my_object",
         *   //   "projectTeam": {},
         *   //   "role": "my_role",
         *   //   "selfLink": "my_selfLink"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias storage.defaultObjectAccessControls.insert
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {string=} params.provisionalUserProject The project to be billed for this request if the target bucket is requester-pays bucket.
         * @param {string=} params.userProject The project to be billed for this request. Required for Requester Pays buckets.
         * @param {().ObjectAccessControl} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        insert(params: Params$Resource$Defaultobjectaccesscontrols$Insert, options: StreamMethodOptions): GaxiosPromise<Readable>;
        insert(params?: Params$Resource$Defaultobjectaccesscontrols$Insert, options?: MethodOptions): GaxiosPromise<Schema$ObjectAccessControl>;
        insert(params: Params$Resource$Defaultobjectaccesscontrols$Insert, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        insert(params: Params$Resource$Defaultobjectaccesscontrols$Insert, options: MethodOptions | BodyResponseCallback<Schema$ObjectAccessControl>, callback: BodyResponseCallback<Schema$ObjectAccessControl>): void;
        insert(params: Params$Resource$Defaultobjectaccesscontrols$Insert, callback: BodyResponseCallback<Schema$ObjectAccessControl>): void;
        insert(callback: BodyResponseCallback<Schema$ObjectAccessControl>): void;
        /**
         * storage.defaultObjectAccessControls.list
         * @desc Retrieves default object ACL entries on the specified bucket.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.defaultObjectAccessControls.list({
         *     // Name of a bucket.
         *     bucket: 'placeholder-value',
         *     // If present, only return default ACL listing if the bucket's current metageneration matches this value.
         *     ifMetagenerationMatch: 'placeholder-value',
         *     // If present, only return default ACL listing if the bucket's current metageneration does not match the given value.
         *     ifMetagenerationNotMatch: 'placeholder-value',
         *     // The project to be billed for this request if the target bucket is requester-pays bucket.
         *     provisionalUserProject: 'placeholder-value',
         *     // The project to be billed for this request. Required for Requester Pays buckets.
         *     userProject: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
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
         * @alias storage.defaultObjectAccessControls.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {string=} params.ifMetagenerationMatch If present, only return default ACL listing if the bucket's current metageneration matches this value.
         * @param {string=} params.ifMetagenerationNotMatch If present, only return default ACL listing if the bucket's current metageneration does not match the given value.
         * @param {string=} params.provisionalUserProject The project to be billed for this request if the target bucket is requester-pays bucket.
         * @param {string=} params.userProject The project to be billed for this request. Required for Requester Pays buckets.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Defaultobjectaccesscontrols$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Defaultobjectaccesscontrols$List, options?: MethodOptions): GaxiosPromise<Schema$ObjectAccessControls>;
        list(params: Params$Resource$Defaultobjectaccesscontrols$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Defaultobjectaccesscontrols$List, options: MethodOptions | BodyResponseCallback<Schema$ObjectAccessControls>, callback: BodyResponseCallback<Schema$ObjectAccessControls>): void;
        list(params: Params$Resource$Defaultobjectaccesscontrols$List, callback: BodyResponseCallback<Schema$ObjectAccessControls>): void;
        list(callback: BodyResponseCallback<Schema$ObjectAccessControls>): void;
        /**
         * storage.defaultObjectAccessControls.patch
         * @desc Patches a default object ACL entry on the specified bucket.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.defaultObjectAccessControls.patch({
         *     // Name of a bucket.
         *     bucket: 'placeholder-value',
         *     // The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         *     entity: 'placeholder-value',
         *     // The project to be billed for this request if the target bucket is requester-pays bucket.
         *     provisionalUserProject: 'placeholder-value',
         *     // The project to be billed for this request. Required for Requester Pays buckets.
         *     userProject: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "bucket": "my_bucket",
         *       //   "domain": "my_domain",
         *       //   "email": "my_email",
         *       //   "entity": "my_entity",
         *       //   "entityId": "my_entityId",
         *       //   "etag": "my_etag",
         *       //   "generation": "my_generation",
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "object": "my_object",
         *       //   "projectTeam": {},
         *       //   "role": "my_role",
         *       //   "selfLink": "my_selfLink"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "bucket": "my_bucket",
         *   //   "domain": "my_domain",
         *   //   "email": "my_email",
         *   //   "entity": "my_entity",
         *   //   "entityId": "my_entityId",
         *   //   "etag": "my_etag",
         *   //   "generation": "my_generation",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "object": "my_object",
         *   //   "projectTeam": {},
         *   //   "role": "my_role",
         *   //   "selfLink": "my_selfLink"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias storage.defaultObjectAccessControls.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {string} params.entity The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         * @param {string=} params.provisionalUserProject The project to be billed for this request if the target bucket is requester-pays bucket.
         * @param {string=} params.userProject The project to be billed for this request. Required for Requester Pays buckets.
         * @param {().ObjectAccessControl} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Defaultobjectaccesscontrols$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Defaultobjectaccesscontrols$Patch, options?: MethodOptions): GaxiosPromise<Schema$ObjectAccessControl>;
        patch(params: Params$Resource$Defaultobjectaccesscontrols$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Defaultobjectaccesscontrols$Patch, options: MethodOptions | BodyResponseCallback<Schema$ObjectAccessControl>, callback: BodyResponseCallback<Schema$ObjectAccessControl>): void;
        patch(params: Params$Resource$Defaultobjectaccesscontrols$Patch, callback: BodyResponseCallback<Schema$ObjectAccessControl>): void;
        patch(callback: BodyResponseCallback<Schema$ObjectAccessControl>): void;
        /**
         * storage.defaultObjectAccessControls.update
         * @desc Updates a default object ACL entry on the specified bucket.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.defaultObjectAccessControls.update({
         *     // Name of a bucket.
         *     bucket: 'placeholder-value',
         *     // The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         *     entity: 'placeholder-value',
         *     // The project to be billed for this request if the target bucket is requester-pays bucket.
         *     provisionalUserProject: 'placeholder-value',
         *     // The project to be billed for this request. Required for Requester Pays buckets.
         *     userProject: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "bucket": "my_bucket",
         *       //   "domain": "my_domain",
         *       //   "email": "my_email",
         *       //   "entity": "my_entity",
         *       //   "entityId": "my_entityId",
         *       //   "etag": "my_etag",
         *       //   "generation": "my_generation",
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "object": "my_object",
         *       //   "projectTeam": {},
         *       //   "role": "my_role",
         *       //   "selfLink": "my_selfLink"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "bucket": "my_bucket",
         *   //   "domain": "my_domain",
         *   //   "email": "my_email",
         *   //   "entity": "my_entity",
         *   //   "entityId": "my_entityId",
         *   //   "etag": "my_etag",
         *   //   "generation": "my_generation",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "object": "my_object",
         *   //   "projectTeam": {},
         *   //   "role": "my_role",
         *   //   "selfLink": "my_selfLink"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias storage.defaultObjectAccessControls.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {string} params.entity The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         * @param {string=} params.provisionalUserProject The project to be billed for this request if the target bucket is requester-pays bucket.
         * @param {string=} params.userProject The project to be billed for this request. Required for Requester Pays buckets.
         * @param {().ObjectAccessControl} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Defaultobjectaccesscontrols$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Defaultobjectaccesscontrols$Update, options?: MethodOptions): GaxiosPromise<Schema$ObjectAccessControl>;
        update(params: Params$Resource$Defaultobjectaccesscontrols$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Defaultobjectaccesscontrols$Update, options: MethodOptions | BodyResponseCallback<Schema$ObjectAccessControl>, callback: BodyResponseCallback<Schema$ObjectAccessControl>): void;
        update(params: Params$Resource$Defaultobjectaccesscontrols$Update, callback: BodyResponseCallback<Schema$ObjectAccessControl>): void;
        update(callback: BodyResponseCallback<Schema$ObjectAccessControl>): void;
    }
    export interface Params$Resource$Defaultobjectaccesscontrols$Delete extends StandardParameters {
        /**
         * Name of a bucket.
         */
        bucket?: string;
        /**
         * The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         */
        entity?: string;
        /**
         * The project to be billed for this request if the target bucket is requester-pays bucket.
         */
        provisionalUserProject?: string;
        /**
         * The project to be billed for this request. Required for Requester Pays buckets.
         */
        userProject?: string;
    }
    export interface Params$Resource$Defaultobjectaccesscontrols$Get extends StandardParameters {
        /**
         * Name of a bucket.
         */
        bucket?: string;
        /**
         * The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         */
        entity?: string;
        /**
         * The project to be billed for this request if the target bucket is requester-pays bucket.
         */
        provisionalUserProject?: string;
        /**
         * The project to be billed for this request. Required for Requester Pays buckets.
         */
        userProject?: string;
    }
    export interface Params$Resource$Defaultobjectaccesscontrols$Insert extends StandardParameters {
        /**
         * Name of a bucket.
         */
        bucket?: string;
        /**
         * The project to be billed for this request if the target bucket is requester-pays bucket.
         */
        provisionalUserProject?: string;
        /**
         * The project to be billed for this request. Required for Requester Pays buckets.
         */
        userProject?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$ObjectAccessControl;
    }
    export interface Params$Resource$Defaultobjectaccesscontrols$List extends StandardParameters {
        /**
         * Name of a bucket.
         */
        bucket?: string;
        /**
         * If present, only return default ACL listing if the bucket's current metageneration matches this value.
         */
        ifMetagenerationMatch?: string;
        /**
         * If present, only return default ACL listing if the bucket's current metageneration does not match the given value.
         */
        ifMetagenerationNotMatch?: string;
        /**
         * The project to be billed for this request if the target bucket is requester-pays bucket.
         */
        provisionalUserProject?: string;
        /**
         * The project to be billed for this request. Required for Requester Pays buckets.
         */
        userProject?: string;
    }
    export interface Params$Resource$Defaultobjectaccesscontrols$Patch extends StandardParameters {
        /**
         * Name of a bucket.
         */
        bucket?: string;
        /**
         * The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         */
        entity?: string;
        /**
         * The project to be billed for this request if the target bucket is requester-pays bucket.
         */
        provisionalUserProject?: string;
        /**
         * The project to be billed for this request. Required for Requester Pays buckets.
         */
        userProject?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$ObjectAccessControl;
    }
    export interface Params$Resource$Defaultobjectaccesscontrols$Update extends StandardParameters {
        /**
         * Name of a bucket.
         */
        bucket?: string;
        /**
         * The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         */
        entity?: string;
        /**
         * The project to be billed for this request if the target bucket is requester-pays bucket.
         */
        provisionalUserProject?: string;
        /**
         * The project to be billed for this request. Required for Requester Pays buckets.
         */
        userProject?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$ObjectAccessControl;
    }
    export class Resource$Notifications {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * storage.notifications.delete
         * @desc Permanently deletes a notification subscription.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *       'https://www.googleapis.com/auth/devstorage.read_write',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.notifications.delete({
         *     // The parent bucket of the notification.
         *     bucket: 'placeholder-value',
         *     // ID of the notification to delete.
         *     notification: 'placeholder-value',
         *     // The project to be billed for this request if the target bucket is requester-pays bucket.
         *     provisionalUserProject: 'placeholder-value',
         *     // The project to be billed for this request. Required for Requester Pays buckets.
         *     userProject: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias storage.notifications.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket The parent bucket of the notification.
         * @param {string} params.notification ID of the notification to delete.
         * @param {string=} params.provisionalUserProject The project to be billed for this request if the target bucket is requester-pays bucket.
         * @param {string=} params.userProject The project to be billed for this request. Required for Requester Pays buckets.
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
         * storage.notifications.get
         * @desc View a notification configuration.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *       'https://www.googleapis.com/auth/devstorage.read_only',
         *       'https://www.googleapis.com/auth/devstorage.read_write',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.notifications.get({
         *     // The parent bucket of the notification.
         *     bucket: 'placeholder-value',
         *     // Notification ID
         *     notification: 'placeholder-value',
         *     // The project to be billed for this request if the target bucket is requester-pays bucket.
         *     provisionalUserProject: 'placeholder-value',
         *     // The project to be billed for this request. Required for Requester Pays buckets.
         *     userProject: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "custom_attributes": {},
         *   //   "etag": "my_etag",
         *   //   "event_types": [],
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "object_name_prefix": "my_object_name_prefix",
         *   //   "payload_format": "my_payload_format",
         *   //   "selfLink": "my_selfLink",
         *   //   "topic": "my_topic"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias storage.notifications.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket The parent bucket of the notification.
         * @param {string} params.notification Notification ID
         * @param {string=} params.provisionalUserProject The project to be billed for this request if the target bucket is requester-pays bucket.
         * @param {string=} params.userProject The project to be billed for this request. Required for Requester Pays buckets.
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
         * storage.notifications.insert
         * @desc Creates a notification subscription for a given bucket.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *       'https://www.googleapis.com/auth/devstorage.read_write',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.notifications.insert({
         *     // The parent bucket of the notification.
         *     bucket: 'placeholder-value',
         *     // The project to be billed for this request if the target bucket is requester-pays bucket.
         *     provisionalUserProject: 'placeholder-value',
         *     // The project to be billed for this request. Required for Requester Pays buckets.
         *     userProject: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "custom_attributes": {},
         *       //   "etag": "my_etag",
         *       //   "event_types": [],
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "object_name_prefix": "my_object_name_prefix",
         *       //   "payload_format": "my_payload_format",
         *       //   "selfLink": "my_selfLink",
         *       //   "topic": "my_topic"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "custom_attributes": {},
         *   //   "etag": "my_etag",
         *   //   "event_types": [],
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "object_name_prefix": "my_object_name_prefix",
         *   //   "payload_format": "my_payload_format",
         *   //   "selfLink": "my_selfLink",
         *   //   "topic": "my_topic"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias storage.notifications.insert
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket The parent bucket of the notification.
         * @param {string=} params.provisionalUserProject The project to be billed for this request if the target bucket is requester-pays bucket.
         * @param {string=} params.userProject The project to be billed for this request. Required for Requester Pays buckets.
         * @param {().Notification} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        insert(params: Params$Resource$Notifications$Insert, options: StreamMethodOptions): GaxiosPromise<Readable>;
        insert(params?: Params$Resource$Notifications$Insert, options?: MethodOptions): GaxiosPromise<Schema$Notification>;
        insert(params: Params$Resource$Notifications$Insert, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        insert(params: Params$Resource$Notifications$Insert, options: MethodOptions | BodyResponseCallback<Schema$Notification>, callback: BodyResponseCallback<Schema$Notification>): void;
        insert(params: Params$Resource$Notifications$Insert, callback: BodyResponseCallback<Schema$Notification>): void;
        insert(callback: BodyResponseCallback<Schema$Notification>): void;
        /**
         * storage.notifications.list
         * @desc Retrieves a list of notification subscriptions for a given bucket.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *       'https://www.googleapis.com/auth/devstorage.read_only',
         *       'https://www.googleapis.com/auth/devstorage.read_write',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.notifications.list({
         *     // Name of a Google Cloud Storage bucket.
         *     bucket: 'placeholder-value',
         *     // The project to be billed for this request if the target bucket is requester-pays bucket.
         *     provisionalUserProject: 'placeholder-value',
         *     // The project to be billed for this request. Required for Requester Pays buckets.
         *     userProject: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
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
         * @alias storage.notifications.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a Google Cloud Storage bucket.
         * @param {string=} params.provisionalUserProject The project to be billed for this request if the target bucket is requester-pays bucket.
         * @param {string=} params.userProject The project to be billed for this request. Required for Requester Pays buckets.
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
    }
    export interface Params$Resource$Notifications$Delete extends StandardParameters {
        /**
         * The parent bucket of the notification.
         */
        bucket?: string;
        /**
         * ID of the notification to delete.
         */
        notification?: string;
        /**
         * The project to be billed for this request if the target bucket is requester-pays bucket.
         */
        provisionalUserProject?: string;
        /**
         * The project to be billed for this request. Required for Requester Pays buckets.
         */
        userProject?: string;
    }
    export interface Params$Resource$Notifications$Get extends StandardParameters {
        /**
         * The parent bucket of the notification.
         */
        bucket?: string;
        /**
         * Notification ID
         */
        notification?: string;
        /**
         * The project to be billed for this request if the target bucket is requester-pays bucket.
         */
        provisionalUserProject?: string;
        /**
         * The project to be billed for this request. Required for Requester Pays buckets.
         */
        userProject?: string;
    }
    export interface Params$Resource$Notifications$Insert extends StandardParameters {
        /**
         * The parent bucket of the notification.
         */
        bucket?: string;
        /**
         * The project to be billed for this request if the target bucket is requester-pays bucket.
         */
        provisionalUserProject?: string;
        /**
         * The project to be billed for this request. Required for Requester Pays buckets.
         */
        userProject?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Notification;
    }
    export interface Params$Resource$Notifications$List extends StandardParameters {
        /**
         * Name of a Google Cloud Storage bucket.
         */
        bucket?: string;
        /**
         * The project to be billed for this request if the target bucket is requester-pays bucket.
         */
        provisionalUserProject?: string;
        /**
         * The project to be billed for this request. Required for Requester Pays buckets.
         */
        userProject?: string;
    }
    export class Resource$Objectaccesscontrols {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * storage.objectAccessControls.delete
         * @desc Permanently deletes the ACL entry for the specified entity on the specified object.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.objectAccessControls.delete({
         *     // Name of a bucket.
         *     bucket: 'placeholder-value',
         *     // The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         *     entity: 'placeholder-value',
         *     // If present, selects a specific revision of this object (as opposed to the latest version, the default).
         *     generation: 'placeholder-value',
         *     // Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         *     object: 'placeholder-value',
         *     // The project to be billed for this request if the target bucket is requester-pays bucket.
         *     provisionalUserProject: 'placeholder-value',
         *     // The project to be billed for this request. Required for Requester Pays buckets.
         *     userProject: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias storage.objectAccessControls.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {string} params.entity The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         * @param {string=} params.generation If present, selects a specific revision of this object (as opposed to the latest version, the default).
         * @param {string} params.object Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         * @param {string=} params.provisionalUserProject The project to be billed for this request if the target bucket is requester-pays bucket.
         * @param {string=} params.userProject The project to be billed for this request. Required for Requester Pays buckets.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Objectaccesscontrols$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Objectaccesscontrols$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Objectaccesscontrols$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Objectaccesscontrols$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Objectaccesscontrols$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * storage.objectAccessControls.get
         * @desc Returns the ACL entry for the specified entity on the specified object.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.objectAccessControls.get({
         *     // Name of a bucket.
         *     bucket: 'placeholder-value',
         *     // The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         *     entity: 'placeholder-value',
         *     // If present, selects a specific revision of this object (as opposed to the latest version, the default).
         *     generation: 'placeholder-value',
         *     // Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         *     object: 'placeholder-value',
         *     // The project to be billed for this request if the target bucket is requester-pays bucket.
         *     provisionalUserProject: 'placeholder-value',
         *     // The project to be billed for this request. Required for Requester Pays buckets.
         *     userProject: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "bucket": "my_bucket",
         *   //   "domain": "my_domain",
         *   //   "email": "my_email",
         *   //   "entity": "my_entity",
         *   //   "entityId": "my_entityId",
         *   //   "etag": "my_etag",
         *   //   "generation": "my_generation",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "object": "my_object",
         *   //   "projectTeam": {},
         *   //   "role": "my_role",
         *   //   "selfLink": "my_selfLink"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias storage.objectAccessControls.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {string} params.entity The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         * @param {string=} params.generation If present, selects a specific revision of this object (as opposed to the latest version, the default).
         * @param {string} params.object Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         * @param {string=} params.provisionalUserProject The project to be billed for this request if the target bucket is requester-pays bucket.
         * @param {string=} params.userProject The project to be billed for this request. Required for Requester Pays buckets.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Objectaccesscontrols$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Objectaccesscontrols$Get, options?: MethodOptions): GaxiosPromise<Schema$ObjectAccessControl>;
        get(params: Params$Resource$Objectaccesscontrols$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Objectaccesscontrols$Get, options: MethodOptions | BodyResponseCallback<Schema$ObjectAccessControl>, callback: BodyResponseCallback<Schema$ObjectAccessControl>): void;
        get(params: Params$Resource$Objectaccesscontrols$Get, callback: BodyResponseCallback<Schema$ObjectAccessControl>): void;
        get(callback: BodyResponseCallback<Schema$ObjectAccessControl>): void;
        /**
         * storage.objectAccessControls.insert
         * @desc Creates a new ACL entry on the specified object.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.objectAccessControls.insert({
         *     // Name of a bucket.
         *     bucket: 'placeholder-value',
         *     // If present, selects a specific revision of this object (as opposed to the latest version, the default).
         *     generation: 'placeholder-value',
         *     // Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         *     object: 'placeholder-value',
         *     // The project to be billed for this request if the target bucket is requester-pays bucket.
         *     provisionalUserProject: 'placeholder-value',
         *     // The project to be billed for this request. Required for Requester Pays buckets.
         *     userProject: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "bucket": "my_bucket",
         *       //   "domain": "my_domain",
         *       //   "email": "my_email",
         *       //   "entity": "my_entity",
         *       //   "entityId": "my_entityId",
         *       //   "etag": "my_etag",
         *       //   "generation": "my_generation",
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "object": "my_object",
         *       //   "projectTeam": {},
         *       //   "role": "my_role",
         *       //   "selfLink": "my_selfLink"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "bucket": "my_bucket",
         *   //   "domain": "my_domain",
         *   //   "email": "my_email",
         *   //   "entity": "my_entity",
         *   //   "entityId": "my_entityId",
         *   //   "etag": "my_etag",
         *   //   "generation": "my_generation",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "object": "my_object",
         *   //   "projectTeam": {},
         *   //   "role": "my_role",
         *   //   "selfLink": "my_selfLink"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias storage.objectAccessControls.insert
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {string=} params.generation If present, selects a specific revision of this object (as opposed to the latest version, the default).
         * @param {string} params.object Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         * @param {string=} params.provisionalUserProject The project to be billed for this request if the target bucket is requester-pays bucket.
         * @param {string=} params.userProject The project to be billed for this request. Required for Requester Pays buckets.
         * @param {().ObjectAccessControl} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        insert(params: Params$Resource$Objectaccesscontrols$Insert, options: StreamMethodOptions): GaxiosPromise<Readable>;
        insert(params?: Params$Resource$Objectaccesscontrols$Insert, options?: MethodOptions): GaxiosPromise<Schema$ObjectAccessControl>;
        insert(params: Params$Resource$Objectaccesscontrols$Insert, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        insert(params: Params$Resource$Objectaccesscontrols$Insert, options: MethodOptions | BodyResponseCallback<Schema$ObjectAccessControl>, callback: BodyResponseCallback<Schema$ObjectAccessControl>): void;
        insert(params: Params$Resource$Objectaccesscontrols$Insert, callback: BodyResponseCallback<Schema$ObjectAccessControl>): void;
        insert(callback: BodyResponseCallback<Schema$ObjectAccessControl>): void;
        /**
         * storage.objectAccessControls.list
         * @desc Retrieves ACL entries on the specified object.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.objectAccessControls.list({
         *     // Name of a bucket.
         *     bucket: 'placeholder-value',
         *     // If present, selects a specific revision of this object (as opposed to the latest version, the default).
         *     generation: 'placeholder-value',
         *     // Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         *     object: 'placeholder-value',
         *     // The project to be billed for this request if the target bucket is requester-pays bucket.
         *     provisionalUserProject: 'placeholder-value',
         *     // The project to be billed for this request. Required for Requester Pays buckets.
         *     userProject: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
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
         * @alias storage.objectAccessControls.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {string=} params.generation If present, selects a specific revision of this object (as opposed to the latest version, the default).
         * @param {string} params.object Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         * @param {string=} params.provisionalUserProject The project to be billed for this request if the target bucket is requester-pays bucket.
         * @param {string=} params.userProject The project to be billed for this request. Required for Requester Pays buckets.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Objectaccesscontrols$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Objectaccesscontrols$List, options?: MethodOptions): GaxiosPromise<Schema$ObjectAccessControls>;
        list(params: Params$Resource$Objectaccesscontrols$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Objectaccesscontrols$List, options: MethodOptions | BodyResponseCallback<Schema$ObjectAccessControls>, callback: BodyResponseCallback<Schema$ObjectAccessControls>): void;
        list(params: Params$Resource$Objectaccesscontrols$List, callback: BodyResponseCallback<Schema$ObjectAccessControls>): void;
        list(callback: BodyResponseCallback<Schema$ObjectAccessControls>): void;
        /**
         * storage.objectAccessControls.patch
         * @desc Patches an ACL entry on the specified object.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.objectAccessControls.patch({
         *     // Name of a bucket.
         *     bucket: 'placeholder-value',
         *     // The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         *     entity: 'placeholder-value',
         *     // If present, selects a specific revision of this object (as opposed to the latest version, the default).
         *     generation: 'placeholder-value',
         *     // Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         *     object: 'placeholder-value',
         *     // The project to be billed for this request if the target bucket is requester-pays bucket.
         *     provisionalUserProject: 'placeholder-value',
         *     // The project to be billed for this request. Required for Requester Pays buckets.
         *     userProject: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "bucket": "my_bucket",
         *       //   "domain": "my_domain",
         *       //   "email": "my_email",
         *       //   "entity": "my_entity",
         *       //   "entityId": "my_entityId",
         *       //   "etag": "my_etag",
         *       //   "generation": "my_generation",
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "object": "my_object",
         *       //   "projectTeam": {},
         *       //   "role": "my_role",
         *       //   "selfLink": "my_selfLink"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "bucket": "my_bucket",
         *   //   "domain": "my_domain",
         *   //   "email": "my_email",
         *   //   "entity": "my_entity",
         *   //   "entityId": "my_entityId",
         *   //   "etag": "my_etag",
         *   //   "generation": "my_generation",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "object": "my_object",
         *   //   "projectTeam": {},
         *   //   "role": "my_role",
         *   //   "selfLink": "my_selfLink"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias storage.objectAccessControls.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {string} params.entity The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         * @param {string=} params.generation If present, selects a specific revision of this object (as opposed to the latest version, the default).
         * @param {string} params.object Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         * @param {string=} params.provisionalUserProject The project to be billed for this request if the target bucket is requester-pays bucket.
         * @param {string=} params.userProject The project to be billed for this request. Required for Requester Pays buckets.
         * @param {().ObjectAccessControl} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Objectaccesscontrols$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Objectaccesscontrols$Patch, options?: MethodOptions): GaxiosPromise<Schema$ObjectAccessControl>;
        patch(params: Params$Resource$Objectaccesscontrols$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Objectaccesscontrols$Patch, options: MethodOptions | BodyResponseCallback<Schema$ObjectAccessControl>, callback: BodyResponseCallback<Schema$ObjectAccessControl>): void;
        patch(params: Params$Resource$Objectaccesscontrols$Patch, callback: BodyResponseCallback<Schema$ObjectAccessControl>): void;
        patch(callback: BodyResponseCallback<Schema$ObjectAccessControl>): void;
        /**
         * storage.objectAccessControls.update
         * @desc Updates an ACL entry on the specified object.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.objectAccessControls.update({
         *     // Name of a bucket.
         *     bucket: 'placeholder-value',
         *     // The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         *     entity: 'placeholder-value',
         *     // If present, selects a specific revision of this object (as opposed to the latest version, the default).
         *     generation: 'placeholder-value',
         *     // Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         *     object: 'placeholder-value',
         *     // The project to be billed for this request if the target bucket is requester-pays bucket.
         *     provisionalUserProject: 'placeholder-value',
         *     // The project to be billed for this request. Required for Requester Pays buckets.
         *     userProject: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "bucket": "my_bucket",
         *       //   "domain": "my_domain",
         *       //   "email": "my_email",
         *       //   "entity": "my_entity",
         *       //   "entityId": "my_entityId",
         *       //   "etag": "my_etag",
         *       //   "generation": "my_generation",
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "object": "my_object",
         *       //   "projectTeam": {},
         *       //   "role": "my_role",
         *       //   "selfLink": "my_selfLink"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "bucket": "my_bucket",
         *   //   "domain": "my_domain",
         *   //   "email": "my_email",
         *   //   "entity": "my_entity",
         *   //   "entityId": "my_entityId",
         *   //   "etag": "my_etag",
         *   //   "generation": "my_generation",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "object": "my_object",
         *   //   "projectTeam": {},
         *   //   "role": "my_role",
         *   //   "selfLink": "my_selfLink"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias storage.objectAccessControls.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {string} params.entity The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         * @param {string=} params.generation If present, selects a specific revision of this object (as opposed to the latest version, the default).
         * @param {string} params.object Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         * @param {string=} params.provisionalUserProject The project to be billed for this request if the target bucket is requester-pays bucket.
         * @param {string=} params.userProject The project to be billed for this request. Required for Requester Pays buckets.
         * @param {().ObjectAccessControl} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Objectaccesscontrols$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Objectaccesscontrols$Update, options?: MethodOptions): GaxiosPromise<Schema$ObjectAccessControl>;
        update(params: Params$Resource$Objectaccesscontrols$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Objectaccesscontrols$Update, options: MethodOptions | BodyResponseCallback<Schema$ObjectAccessControl>, callback: BodyResponseCallback<Schema$ObjectAccessControl>): void;
        update(params: Params$Resource$Objectaccesscontrols$Update, callback: BodyResponseCallback<Schema$ObjectAccessControl>): void;
        update(callback: BodyResponseCallback<Schema$ObjectAccessControl>): void;
    }
    export interface Params$Resource$Objectaccesscontrols$Delete extends StandardParameters {
        /**
         * Name of a bucket.
         */
        bucket?: string;
        /**
         * The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         */
        entity?: string;
        /**
         * If present, selects a specific revision of this object (as opposed to the latest version, the default).
         */
        generation?: string;
        /**
         * Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         */
        object?: string;
        /**
         * The project to be billed for this request if the target bucket is requester-pays bucket.
         */
        provisionalUserProject?: string;
        /**
         * The project to be billed for this request. Required for Requester Pays buckets.
         */
        userProject?: string;
    }
    export interface Params$Resource$Objectaccesscontrols$Get extends StandardParameters {
        /**
         * Name of a bucket.
         */
        bucket?: string;
        /**
         * The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         */
        entity?: string;
        /**
         * If present, selects a specific revision of this object (as opposed to the latest version, the default).
         */
        generation?: string;
        /**
         * Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         */
        object?: string;
        /**
         * The project to be billed for this request if the target bucket is requester-pays bucket.
         */
        provisionalUserProject?: string;
        /**
         * The project to be billed for this request. Required for Requester Pays buckets.
         */
        userProject?: string;
    }
    export interface Params$Resource$Objectaccesscontrols$Insert extends StandardParameters {
        /**
         * Name of a bucket.
         */
        bucket?: string;
        /**
         * If present, selects a specific revision of this object (as opposed to the latest version, the default).
         */
        generation?: string;
        /**
         * Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         */
        object?: string;
        /**
         * The project to be billed for this request if the target bucket is requester-pays bucket.
         */
        provisionalUserProject?: string;
        /**
         * The project to be billed for this request. Required for Requester Pays buckets.
         */
        userProject?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$ObjectAccessControl;
    }
    export interface Params$Resource$Objectaccesscontrols$List extends StandardParameters {
        /**
         * Name of a bucket.
         */
        bucket?: string;
        /**
         * If present, selects a specific revision of this object (as opposed to the latest version, the default).
         */
        generation?: string;
        /**
         * Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         */
        object?: string;
        /**
         * The project to be billed for this request if the target bucket is requester-pays bucket.
         */
        provisionalUserProject?: string;
        /**
         * The project to be billed for this request. Required for Requester Pays buckets.
         */
        userProject?: string;
    }
    export interface Params$Resource$Objectaccesscontrols$Patch extends StandardParameters {
        /**
         * Name of a bucket.
         */
        bucket?: string;
        /**
         * The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         */
        entity?: string;
        /**
         * If present, selects a specific revision of this object (as opposed to the latest version, the default).
         */
        generation?: string;
        /**
         * Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         */
        object?: string;
        /**
         * The project to be billed for this request if the target bucket is requester-pays bucket.
         */
        provisionalUserProject?: string;
        /**
         * The project to be billed for this request. Required for Requester Pays buckets.
         */
        userProject?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$ObjectAccessControl;
    }
    export interface Params$Resource$Objectaccesscontrols$Update extends StandardParameters {
        /**
         * Name of a bucket.
         */
        bucket?: string;
        /**
         * The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         */
        entity?: string;
        /**
         * If present, selects a specific revision of this object (as opposed to the latest version, the default).
         */
        generation?: string;
        /**
         * Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         */
        object?: string;
        /**
         * The project to be billed for this request if the target bucket is requester-pays bucket.
         */
        provisionalUserProject?: string;
        /**
         * The project to be billed for this request. Required for Requester Pays buckets.
         */
        userProject?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$ObjectAccessControl;
    }
    export class Resource$Objects {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * storage.objects.compose
         * @desc Concatenates a list of existing objects into a new object in the same bucket.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *       'https://www.googleapis.com/auth/devstorage.read_write',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.objects.compose({
         *     // Name of the bucket containing the source objects. The destination object is stored in this bucket.
         *     destinationBucket: 'placeholder-value',
         *     // Name of the new object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         *     destinationObject: 'placeholder-value',
         *     // Apply a predefined set of access controls to the destination object.
         *     destinationPredefinedAcl: 'placeholder-value',
         *     // Makes the operation conditional on whether the object's current generation matches the given value. Setting to 0 makes the operation succeed only if there are no live versions of the object.
         *     ifGenerationMatch: 'placeholder-value',
         *     // Makes the operation conditional on whether the object's current metageneration matches the given value.
         *     ifMetagenerationMatch: 'placeholder-value',
         *     // Resource name of the Cloud KMS key, of the form projects/my-project/locations/global/keyRings/my-kr/cryptoKeys/my-key, that will be used to encrypt the object. Overrides the object metadata's kms_key_name value, if any.
         *     kmsKeyName: 'placeholder-value',
         *     // The project to be billed for this request if the target bucket is requester-pays bucket.
         *     provisionalUserProject: 'placeholder-value',
         *     // The project to be billed for this request. Required for Requester Pays buckets.
         *     userProject: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "destination": {},
         *       //   "kind": "my_kind",
         *       //   "sourceObjects": []
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "acl": [],
         *   //   "bucket": "my_bucket",
         *   //   "cacheControl": "my_cacheControl",
         *   //   "componentCount": 0,
         *   //   "contentDisposition": "my_contentDisposition",
         *   //   "contentEncoding": "my_contentEncoding",
         *   //   "contentLanguage": "my_contentLanguage",
         *   //   "contentType": "my_contentType",
         *   //   "crc32c": "my_crc32c",
         *   //   "customTime": "my_customTime",
         *   //   "customerEncryption": {},
         *   //   "etag": "my_etag",
         *   //   "eventBasedHold": false,
         *   //   "generation": "my_generation",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "kmsKeyName": "my_kmsKeyName",
         *   //   "md5Hash": "my_md5Hash",
         *   //   "mediaLink": "my_mediaLink",
         *   //   "metadata": {},
         *   //   "metageneration": "my_metageneration",
         *   //   "name": "my_name",
         *   //   "owner": {},
         *   //   "retentionExpirationTime": "my_retentionExpirationTime",
         *   //   "selfLink": "my_selfLink",
         *   //   "size": "my_size",
         *   //   "storageClass": "my_storageClass",
         *   //   "temporaryHold": false,
         *   //   "timeCreated": "my_timeCreated",
         *   //   "timeDeleted": "my_timeDeleted",
         *   //   "timeStorageClassUpdated": "my_timeStorageClassUpdated",
         *   //   "updated": "my_updated"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias storage.objects.compose
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.destinationBucket Name of the bucket containing the source objects. The destination object is stored in this bucket.
         * @param {string} params.destinationObject Name of the new object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         * @param {string=} params.destinationPredefinedAcl Apply a predefined set of access controls to the destination object.
         * @param {string=} params.ifGenerationMatch Makes the operation conditional on whether the object's current generation matches the given value. Setting to 0 makes the operation succeed only if there are no live versions of the object.
         * @param {string=} params.ifMetagenerationMatch Makes the operation conditional on whether the object's current metageneration matches the given value.
         * @param {string=} params.kmsKeyName Resource name of the Cloud KMS key, of the form projects/my-project/locations/global/keyRings/my-kr/cryptoKeys/my-key, that will be used to encrypt the object. Overrides the object metadata's kms_key_name value, if any.
         * @param {string=} params.provisionalUserProject The project to be billed for this request if the target bucket is requester-pays bucket.
         * @param {string=} params.userProject The project to be billed for this request. Required for Requester Pays buckets.
         * @param {().ComposeRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        compose(params: Params$Resource$Objects$Compose, options: StreamMethodOptions): GaxiosPromise<Readable>;
        compose(params?: Params$Resource$Objects$Compose, options?: MethodOptions): GaxiosPromise<Schema$Object>;
        compose(params: Params$Resource$Objects$Compose, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        compose(params: Params$Resource$Objects$Compose, options: MethodOptions | BodyResponseCallback<Schema$Object>, callback: BodyResponseCallback<Schema$Object>): void;
        compose(params: Params$Resource$Objects$Compose, callback: BodyResponseCallback<Schema$Object>): void;
        compose(callback: BodyResponseCallback<Schema$Object>): void;
        /**
         * storage.objects.copy
         * @desc Copies a source object to a destination object. Optionally overrides metadata.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *       'https://www.googleapis.com/auth/devstorage.read_write',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.objects.copy({
         *     // Name of the bucket in which to store the new object. Overrides the provided object metadata's bucket value, if any.For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         *     destinationBucket: 'placeholder-value',
         *     // Resource name of the Cloud KMS key, of the form projects/my-project/locations/global/keyRings/my-kr/cryptoKeys/my-key, that will be used to encrypt the object. Overrides the object metadata's kms_key_name value, if any.
         *     destinationKmsKeyName: 'placeholder-value',
         *     // Name of the new object. Required when the object metadata is not otherwise provided. Overrides the object metadata's name value, if any.
         *     destinationObject: 'placeholder-value',
         *     // Apply a predefined set of access controls to the destination object.
         *     destinationPredefinedAcl: 'placeholder-value',
         *     // Makes the operation conditional on whether the destination object's current generation matches the given value. Setting to 0 makes the operation succeed only if there are no live versions of the object.
         *     ifGenerationMatch: 'placeholder-value',
         *     // Makes the operation conditional on whether the destination object's current generation does not match the given value. If no live object exists, the precondition fails. Setting to 0 makes the operation succeed only if there is a live version of the object.
         *     ifGenerationNotMatch: 'placeholder-value',
         *     // Makes the operation conditional on whether the destination object's current metageneration matches the given value.
         *     ifMetagenerationMatch: 'placeholder-value',
         *     // Makes the operation conditional on whether the destination object's current metageneration does not match the given value.
         *     ifMetagenerationNotMatch: 'placeholder-value',
         *     // Makes the operation conditional on whether the source object's current generation matches the given value.
         *     ifSourceGenerationMatch: 'placeholder-value',
         *     // Makes the operation conditional on whether the source object's current generation does not match the given value.
         *     ifSourceGenerationNotMatch: 'placeholder-value',
         *     // Makes the operation conditional on whether the source object's current metageneration matches the given value.
         *     ifSourceMetagenerationMatch: 'placeholder-value',
         *     // Makes the operation conditional on whether the source object's current metageneration does not match the given value.
         *     ifSourceMetagenerationNotMatch: 'placeholder-value',
         *     // Set of properties to return. Defaults to noAcl, unless the object resource specifies the acl property, when it defaults to full.
         *     projection: 'placeholder-value',
         *     // The project to be billed for this request if the target bucket is requester-pays bucket.
         *     provisionalUserProject: 'placeholder-value',
         *     // Name of the bucket in which to find the source object.
         *     sourceBucket: 'placeholder-value',
         *     // If present, selects a specific revision of the source object (as opposed to the latest version, the default).
         *     sourceGeneration: 'placeholder-value',
         *     // Name of the source object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         *     sourceObject: 'placeholder-value',
         *     // The project to be billed for this request. Required for Requester Pays buckets.
         *     userProject: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "acl": [],
         *       //   "bucket": "my_bucket",
         *       //   "cacheControl": "my_cacheControl",
         *       //   "componentCount": 0,
         *       //   "contentDisposition": "my_contentDisposition",
         *       //   "contentEncoding": "my_contentEncoding",
         *       //   "contentLanguage": "my_contentLanguage",
         *       //   "contentType": "my_contentType",
         *       //   "crc32c": "my_crc32c",
         *       //   "customTime": "my_customTime",
         *       //   "customerEncryption": {},
         *       //   "etag": "my_etag",
         *       //   "eventBasedHold": false,
         *       //   "generation": "my_generation",
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "kmsKeyName": "my_kmsKeyName",
         *       //   "md5Hash": "my_md5Hash",
         *       //   "mediaLink": "my_mediaLink",
         *       //   "metadata": {},
         *       //   "metageneration": "my_metageneration",
         *       //   "name": "my_name",
         *       //   "owner": {},
         *       //   "retentionExpirationTime": "my_retentionExpirationTime",
         *       //   "selfLink": "my_selfLink",
         *       //   "size": "my_size",
         *       //   "storageClass": "my_storageClass",
         *       //   "temporaryHold": false,
         *       //   "timeCreated": "my_timeCreated",
         *       //   "timeDeleted": "my_timeDeleted",
         *       //   "timeStorageClassUpdated": "my_timeStorageClassUpdated",
         *       //   "updated": "my_updated"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "acl": [],
         *   //   "bucket": "my_bucket",
         *   //   "cacheControl": "my_cacheControl",
         *   //   "componentCount": 0,
         *   //   "contentDisposition": "my_contentDisposition",
         *   //   "contentEncoding": "my_contentEncoding",
         *   //   "contentLanguage": "my_contentLanguage",
         *   //   "contentType": "my_contentType",
         *   //   "crc32c": "my_crc32c",
         *   //   "customTime": "my_customTime",
         *   //   "customerEncryption": {},
         *   //   "etag": "my_etag",
         *   //   "eventBasedHold": false,
         *   //   "generation": "my_generation",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "kmsKeyName": "my_kmsKeyName",
         *   //   "md5Hash": "my_md5Hash",
         *   //   "mediaLink": "my_mediaLink",
         *   //   "metadata": {},
         *   //   "metageneration": "my_metageneration",
         *   //   "name": "my_name",
         *   //   "owner": {},
         *   //   "retentionExpirationTime": "my_retentionExpirationTime",
         *   //   "selfLink": "my_selfLink",
         *   //   "size": "my_size",
         *   //   "storageClass": "my_storageClass",
         *   //   "temporaryHold": false,
         *   //   "timeCreated": "my_timeCreated",
         *   //   "timeDeleted": "my_timeDeleted",
         *   //   "timeStorageClassUpdated": "my_timeStorageClassUpdated",
         *   //   "updated": "my_updated"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias storage.objects.copy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.destinationBucket Name of the bucket in which to store the new object. Overrides the provided object metadata's bucket value, if any.For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         * @param {string=} params.destinationKmsKeyName Resource name of the Cloud KMS key, of the form projects/my-project/locations/global/keyRings/my-kr/cryptoKeys/my-key, that will be used to encrypt the object. Overrides the object metadata's kms_key_name value, if any.
         * @param {string} params.destinationObject Name of the new object. Required when the object metadata is not otherwise provided. Overrides the object metadata's name value, if any.
         * @param {string=} params.destinationPredefinedAcl Apply a predefined set of access controls to the destination object.
         * @param {string=} params.ifGenerationMatch Makes the operation conditional on whether the destination object's current generation matches the given value. Setting to 0 makes the operation succeed only if there are no live versions of the object.
         * @param {string=} params.ifGenerationNotMatch Makes the operation conditional on whether the destination object's current generation does not match the given value. If no live object exists, the precondition fails. Setting to 0 makes the operation succeed only if there is a live version of the object.
         * @param {string=} params.ifMetagenerationMatch Makes the operation conditional on whether the destination object's current metageneration matches the given value.
         * @param {string=} params.ifMetagenerationNotMatch Makes the operation conditional on whether the destination object's current metageneration does not match the given value.
         * @param {string=} params.ifSourceGenerationMatch Makes the operation conditional on whether the source object's current generation matches the given value.
         * @param {string=} params.ifSourceGenerationNotMatch Makes the operation conditional on whether the source object's current generation does not match the given value.
         * @param {string=} params.ifSourceMetagenerationMatch Makes the operation conditional on whether the source object's current metageneration matches the given value.
         * @param {string=} params.ifSourceMetagenerationNotMatch Makes the operation conditional on whether the source object's current metageneration does not match the given value.
         * @param {string=} params.projection Set of properties to return. Defaults to noAcl, unless the object resource specifies the acl property, when it defaults to full.
         * @param {string=} params.provisionalUserProject The project to be billed for this request if the target bucket is requester-pays bucket.
         * @param {string} params.sourceBucket Name of the bucket in which to find the source object.
         * @param {string=} params.sourceGeneration If present, selects a specific revision of the source object (as opposed to the latest version, the default).
         * @param {string} params.sourceObject Name of the source object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         * @param {string=} params.userProject The project to be billed for this request. Required for Requester Pays buckets.
         * @param {().Object} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        copy(params: Params$Resource$Objects$Copy, options: StreamMethodOptions): GaxiosPromise<Readable>;
        copy(params?: Params$Resource$Objects$Copy, options?: MethodOptions): GaxiosPromise<Schema$Object>;
        copy(params: Params$Resource$Objects$Copy, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        copy(params: Params$Resource$Objects$Copy, options: MethodOptions | BodyResponseCallback<Schema$Object>, callback: BodyResponseCallback<Schema$Object>): void;
        copy(params: Params$Resource$Objects$Copy, callback: BodyResponseCallback<Schema$Object>): void;
        copy(callback: BodyResponseCallback<Schema$Object>): void;
        /**
         * storage.objects.delete
         * @desc Deletes an object and its metadata. Deletions are permanent if versioning is not enabled for the bucket, or if the generation parameter is used.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *       'https://www.googleapis.com/auth/devstorage.read_write',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.objects.delete({
         *     // Name of the bucket in which the object resides.
         *     bucket: 'placeholder-value',
         *     // If present, permanently deletes a specific revision of this object (as opposed to the latest version, the default).
         *     generation: 'placeholder-value',
         *     // Makes the operation conditional on whether the object's current generation matches the given value. Setting to 0 makes the operation succeed only if there are no live versions of the object.
         *     ifGenerationMatch: 'placeholder-value',
         *     // Makes the operation conditional on whether the object's current generation does not match the given value. If no live object exists, the precondition fails. Setting to 0 makes the operation succeed only if there is a live version of the object.
         *     ifGenerationNotMatch: 'placeholder-value',
         *     // Makes the operation conditional on whether the object's current metageneration matches the given value.
         *     ifMetagenerationMatch: 'placeholder-value',
         *     // Makes the operation conditional on whether the object's current metageneration does not match the given value.
         *     ifMetagenerationNotMatch: 'placeholder-value',
         *     // Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         *     object: 'placeholder-value',
         *     // The project to be billed for this request if the target bucket is requester-pays bucket.
         *     provisionalUserProject: 'placeholder-value',
         *     // The project to be billed for this request. Required for Requester Pays buckets.
         *     userProject: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias storage.objects.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of the bucket in which the object resides.
         * @param {string=} params.generation If present, permanently deletes a specific revision of this object (as opposed to the latest version, the default).
         * @param {string=} params.ifGenerationMatch Makes the operation conditional on whether the object's current generation matches the given value. Setting to 0 makes the operation succeed only if there are no live versions of the object.
         * @param {string=} params.ifGenerationNotMatch Makes the operation conditional on whether the object's current generation does not match the given value. If no live object exists, the precondition fails. Setting to 0 makes the operation succeed only if there is a live version of the object.
         * @param {string=} params.ifMetagenerationMatch Makes the operation conditional on whether the object's current metageneration matches the given value.
         * @param {string=} params.ifMetagenerationNotMatch Makes the operation conditional on whether the object's current metageneration does not match the given value.
         * @param {string} params.object Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         * @param {string=} params.provisionalUserProject The project to be billed for this request if the target bucket is requester-pays bucket.
         * @param {string=} params.userProject The project to be billed for this request. Required for Requester Pays buckets.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Objects$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Objects$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Objects$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Objects$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Objects$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * storage.objects.get
         * @desc Retrieves an object or its metadata.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *       'https://www.googleapis.com/auth/devstorage.read_only',
         *       'https://www.googleapis.com/auth/devstorage.read_write',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.objects.get({
         *     // Name of the bucket in which the object resides.
         *     bucket: 'placeholder-value',
         *     // If present, selects a specific revision of this object (as opposed to the latest version, the default).
         *     generation: 'placeholder-value',
         *     // Makes the operation conditional on whether the object's current generation matches the given value. Setting to 0 makes the operation succeed only if there are no live versions of the object.
         *     ifGenerationMatch: 'placeholder-value',
         *     // Makes the operation conditional on whether the object's current generation does not match the given value. If no live object exists, the precondition fails. Setting to 0 makes the operation succeed only if there is a live version of the object.
         *     ifGenerationNotMatch: 'placeholder-value',
         *     // Makes the operation conditional on whether the object's current metageneration matches the given value.
         *     ifMetagenerationMatch: 'placeholder-value',
         *     // Makes the operation conditional on whether the object's current metageneration does not match the given value.
         *     ifMetagenerationNotMatch: 'placeholder-value',
         *     // Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         *     object: 'placeholder-value',
         *     // Set of properties to return. Defaults to noAcl.
         *     projection: 'placeholder-value',
         *     // The project to be billed for this request if the target bucket is requester-pays bucket.
         *     provisionalUserProject: 'placeholder-value',
         *     // The project to be billed for this request. Required for Requester Pays buckets.
         *     userProject: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "acl": [],
         *   //   "bucket": "my_bucket",
         *   //   "cacheControl": "my_cacheControl",
         *   //   "componentCount": 0,
         *   //   "contentDisposition": "my_contentDisposition",
         *   //   "contentEncoding": "my_contentEncoding",
         *   //   "contentLanguage": "my_contentLanguage",
         *   //   "contentType": "my_contentType",
         *   //   "crc32c": "my_crc32c",
         *   //   "customTime": "my_customTime",
         *   //   "customerEncryption": {},
         *   //   "etag": "my_etag",
         *   //   "eventBasedHold": false,
         *   //   "generation": "my_generation",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "kmsKeyName": "my_kmsKeyName",
         *   //   "md5Hash": "my_md5Hash",
         *   //   "mediaLink": "my_mediaLink",
         *   //   "metadata": {},
         *   //   "metageneration": "my_metageneration",
         *   //   "name": "my_name",
         *   //   "owner": {},
         *   //   "retentionExpirationTime": "my_retentionExpirationTime",
         *   //   "selfLink": "my_selfLink",
         *   //   "size": "my_size",
         *   //   "storageClass": "my_storageClass",
         *   //   "temporaryHold": false,
         *   //   "timeCreated": "my_timeCreated",
         *   //   "timeDeleted": "my_timeDeleted",
         *   //   "timeStorageClassUpdated": "my_timeStorageClassUpdated",
         *   //   "updated": "my_updated"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias storage.objects.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of the bucket in which the object resides.
         * @param {string=} params.generation If present, selects a specific revision of this object (as opposed to the latest version, the default).
         * @param {string=} params.ifGenerationMatch Makes the operation conditional on whether the object's current generation matches the given value. Setting to 0 makes the operation succeed only if there are no live versions of the object.
         * @param {string=} params.ifGenerationNotMatch Makes the operation conditional on whether the object's current generation does not match the given value. If no live object exists, the precondition fails. Setting to 0 makes the operation succeed only if there is a live version of the object.
         * @param {string=} params.ifMetagenerationMatch Makes the operation conditional on whether the object's current metageneration matches the given value.
         * @param {string=} params.ifMetagenerationNotMatch Makes the operation conditional on whether the object's current metageneration does not match the given value.
         * @param {string} params.object Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         * @param {string=} params.projection Set of properties to return. Defaults to noAcl.
         * @param {string=} params.provisionalUserProject The project to be billed for this request if the target bucket is requester-pays bucket.
         * @param {string=} params.userProject The project to be billed for this request. Required for Requester Pays buckets.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Objects$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Objects$Get, options?: MethodOptions): GaxiosPromise<Schema$Object>;
        get(params: Params$Resource$Objects$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Objects$Get, options: MethodOptions | BodyResponseCallback<Schema$Object>, callback: BodyResponseCallback<Schema$Object>): void;
        get(params: Params$Resource$Objects$Get, callback: BodyResponseCallback<Schema$Object>): void;
        get(callback: BodyResponseCallback<Schema$Object>): void;
        /**
         * storage.objects.getIamPolicy
         * @desc Returns an IAM policy for the specified object.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *       'https://www.googleapis.com/auth/devstorage.read_only',
         *       'https://www.googleapis.com/auth/devstorage.read_write',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.objects.getIamPolicy({
         *     // Name of the bucket in which the object resides.
         *     bucket: 'placeholder-value',
         *     // If present, selects a specific revision of this object (as opposed to the latest version, the default).
         *     generation: 'placeholder-value',
         *     // Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         *     object: 'placeholder-value',
         *     // The project to be billed for this request if the target bucket is requester-pays bucket.
         *     provisionalUserProject: 'placeholder-value',
         *     // The project to be billed for this request. Required for Requester Pays buckets.
         *     userProject: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "bindings": [],
         *   //   "etag": "my_etag",
         *   //   "kind": "my_kind",
         *   //   "resourceId": "my_resourceId",
         *   //   "version": 0
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias storage.objects.getIamPolicy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of the bucket in which the object resides.
         * @param {string=} params.generation If present, selects a specific revision of this object (as opposed to the latest version, the default).
         * @param {string} params.object Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         * @param {string=} params.provisionalUserProject The project to be billed for this request if the target bucket is requester-pays bucket.
         * @param {string=} params.userProject The project to be billed for this request. Required for Requester Pays buckets.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        getIamPolicy(params: Params$Resource$Objects$Getiampolicy, options: StreamMethodOptions): GaxiosPromise<Readable>;
        getIamPolicy(params?: Params$Resource$Objects$Getiampolicy, options?: MethodOptions): GaxiosPromise<Schema$Policy>;
        getIamPolicy(params: Params$Resource$Objects$Getiampolicy, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        getIamPolicy(params: Params$Resource$Objects$Getiampolicy, options: MethodOptions | BodyResponseCallback<Schema$Policy>, callback: BodyResponseCallback<Schema$Policy>): void;
        getIamPolicy(params: Params$Resource$Objects$Getiampolicy, callback: BodyResponseCallback<Schema$Policy>): void;
        getIamPolicy(callback: BodyResponseCallback<Schema$Policy>): void;
        /**
         * storage.objects.insert
         * @desc Stores a new object and metadata.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *       'https://www.googleapis.com/auth/devstorage.read_write',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.objects.insert({
         *     // Name of the bucket in which to store the new object. Overrides the provided object metadata's bucket value, if any.
         *     bucket: 'placeholder-value',
         *     // If set, sets the contentEncoding property of the final object to this value. Setting this parameter is equivalent to setting the contentEncoding metadata property. This can be useful when uploading an object with uploadType=media to indicate the encoding of the content being uploaded.
         *     contentEncoding: 'placeholder-value',
         *     // Makes the operation conditional on whether the object's current generation matches the given value. Setting to 0 makes the operation succeed only if there are no live versions of the object.
         *     ifGenerationMatch: 'placeholder-value',
         *     // Makes the operation conditional on whether the object's current generation does not match the given value. If no live object exists, the precondition fails. Setting to 0 makes the operation succeed only if there is a live version of the object.
         *     ifGenerationNotMatch: 'placeholder-value',
         *     // Makes the operation conditional on whether the object's current metageneration matches the given value.
         *     ifMetagenerationMatch: 'placeholder-value',
         *     // Makes the operation conditional on whether the object's current metageneration does not match the given value.
         *     ifMetagenerationNotMatch: 'placeholder-value',
         *     // Resource name of the Cloud KMS key, of the form projects/my-project/locations/global/keyRings/my-kr/cryptoKeys/my-key, that will be used to encrypt the object. Overrides the object metadata's kms_key_name value, if any.
         *     kmsKeyName: 'placeholder-value',
         *     // Name of the object. Required when the object metadata is not otherwise provided. Overrides the object metadata's name value, if any. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         *     name: 'placeholder-value',
         *     // Apply a predefined set of access controls to this object.
         *     predefinedAcl: 'placeholder-value',
         *     // Set of properties to return. Defaults to noAcl, unless the object resource specifies the acl property, when it defaults to full.
         *     projection: 'placeholder-value',
         *     // The project to be billed for this request if the target bucket is requester-pays bucket.
         *     provisionalUserProject: 'placeholder-value',
         *     // The project to be billed for this request. Required for Requester Pays buckets.
         *     userProject: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "acl": [],
         *       //   "bucket": "my_bucket",
         *       //   "cacheControl": "my_cacheControl",
         *       //   "componentCount": 0,
         *       //   "contentDisposition": "my_contentDisposition",
         *       //   "contentEncoding": "my_contentEncoding",
         *       //   "contentLanguage": "my_contentLanguage",
         *       //   "contentType": "my_contentType",
         *       //   "crc32c": "my_crc32c",
         *       //   "customTime": "my_customTime",
         *       //   "customerEncryption": {},
         *       //   "etag": "my_etag",
         *       //   "eventBasedHold": false,
         *       //   "generation": "my_generation",
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "kmsKeyName": "my_kmsKeyName",
         *       //   "md5Hash": "my_md5Hash",
         *       //   "mediaLink": "my_mediaLink",
         *       //   "metadata": {},
         *       //   "metageneration": "my_metageneration",
         *       //   "name": "my_name",
         *       //   "owner": {},
         *       //   "retentionExpirationTime": "my_retentionExpirationTime",
         *       //   "selfLink": "my_selfLink",
         *       //   "size": "my_size",
         *       //   "storageClass": "my_storageClass",
         *       //   "temporaryHold": false,
         *       //   "timeCreated": "my_timeCreated",
         *       //   "timeDeleted": "my_timeDeleted",
         *       //   "timeStorageClassUpdated": "my_timeStorageClassUpdated",
         *       //   "updated": "my_updated"
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
         *   //   "acl": [],
         *   //   "bucket": "my_bucket",
         *   //   "cacheControl": "my_cacheControl",
         *   //   "componentCount": 0,
         *   //   "contentDisposition": "my_contentDisposition",
         *   //   "contentEncoding": "my_contentEncoding",
         *   //   "contentLanguage": "my_contentLanguage",
         *   //   "contentType": "my_contentType",
         *   //   "crc32c": "my_crc32c",
         *   //   "customTime": "my_customTime",
         *   //   "customerEncryption": {},
         *   //   "etag": "my_etag",
         *   //   "eventBasedHold": false,
         *   //   "generation": "my_generation",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "kmsKeyName": "my_kmsKeyName",
         *   //   "md5Hash": "my_md5Hash",
         *   //   "mediaLink": "my_mediaLink",
         *   //   "metadata": {},
         *   //   "metageneration": "my_metageneration",
         *   //   "name": "my_name",
         *   //   "owner": {},
         *   //   "retentionExpirationTime": "my_retentionExpirationTime",
         *   //   "selfLink": "my_selfLink",
         *   //   "size": "my_size",
         *   //   "storageClass": "my_storageClass",
         *   //   "temporaryHold": false,
         *   //   "timeCreated": "my_timeCreated",
         *   //   "timeDeleted": "my_timeDeleted",
         *   //   "timeStorageClassUpdated": "my_timeStorageClassUpdated",
         *   //   "updated": "my_updated"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias storage.objects.insert
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of the bucket in which to store the new object. Overrides the provided object metadata's bucket value, if any.
         * @param {string=} params.contentEncoding If set, sets the contentEncoding property of the final object to this value. Setting this parameter is equivalent to setting the contentEncoding metadata property. This can be useful when uploading an object with uploadType=media to indicate the encoding of the content being uploaded.
         * @param {string=} params.ifGenerationMatch Makes the operation conditional on whether the object's current generation matches the given value. Setting to 0 makes the operation succeed only if there are no live versions of the object.
         * @param {string=} params.ifGenerationNotMatch Makes the operation conditional on whether the object's current generation does not match the given value. If no live object exists, the precondition fails. Setting to 0 makes the operation succeed only if there is a live version of the object.
         * @param {string=} params.ifMetagenerationMatch Makes the operation conditional on whether the object's current metageneration matches the given value.
         * @param {string=} params.ifMetagenerationNotMatch Makes the operation conditional on whether the object's current metageneration does not match the given value.
         * @param {string=} params.kmsKeyName Resource name of the Cloud KMS key, of the form projects/my-project/locations/global/keyRings/my-kr/cryptoKeys/my-key, that will be used to encrypt the object. Overrides the object metadata's kms_key_name value, if any.
         * @param {string=} params.name Name of the object. Required when the object metadata is not otherwise provided. Overrides the object metadata's name value, if any. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         * @param {string=} params.predefinedAcl Apply a predefined set of access controls to this object.
         * @param {string=} params.projection Set of properties to return. Defaults to noAcl, unless the object resource specifies the acl property, when it defaults to full.
         * @param {string=} params.provisionalUserProject The project to be billed for this request if the target bucket is requester-pays bucket.
         * @param {string=} params.userProject The project to be billed for this request. Required for Requester Pays buckets.
         * @param  {object} params.requestBody Media resource metadata
         * @param {object} params.media Media object
         * @param {string} params.media.mimeType Media mime-type
         * @param {string|object} params.media.body Media body contents
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        insert(params: Params$Resource$Objects$Insert, options: StreamMethodOptions): GaxiosPromise<Readable>;
        insert(params?: Params$Resource$Objects$Insert, options?: MethodOptions): GaxiosPromise<Schema$Object>;
        insert(params: Params$Resource$Objects$Insert, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        insert(params: Params$Resource$Objects$Insert, options: MethodOptions | BodyResponseCallback<Schema$Object>, callback: BodyResponseCallback<Schema$Object>): void;
        insert(params: Params$Resource$Objects$Insert, callback: BodyResponseCallback<Schema$Object>): void;
        insert(callback: BodyResponseCallback<Schema$Object>): void;
        /**
         * storage.objects.list
         * @desc Retrieves a list of objects matching the criteria.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *       'https://www.googleapis.com/auth/devstorage.read_only',
         *       'https://www.googleapis.com/auth/devstorage.read_write',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.objects.list({
         *     // Name of the bucket in which to look for objects.
         *     bucket: 'placeholder-value',
         *     // Returns results in a directory-like mode. items will contain only objects whose names, aside from the prefix, do not contain delimiter. Objects whose names, aside from the prefix, contain delimiter will have their name, truncated after the delimiter, returned in prefixes. Duplicate prefixes are omitted.
         *     delimiter: 'placeholder-value',
         *     // Filter results to objects whose names are lexicographically before endOffset. If startOffset is also set, the objects listed will have names between startOffset (inclusive) and endOffset (exclusive).
         *     endOffset: 'placeholder-value',
         *     // If true, objects that end in exactly one instance of delimiter will have their metadata included in items in addition to prefixes.
         *     includeTrailingDelimiter: 'placeholder-value',
         *     // Maximum number of items plus prefixes to return in a single page of responses. As duplicate prefixes are omitted, fewer total results may be returned than requested. The service will use this parameter or 1,000 items, whichever is smaller.
         *     maxResults: 'placeholder-value',
         *     // A previously-returned page token representing part of the larger set of results to view.
         *     pageToken: 'placeholder-value',
         *     // Filter results to objects whose names begin with this prefix.
         *     prefix: 'placeholder-value',
         *     // Set of properties to return. Defaults to noAcl.
         *     projection: 'placeholder-value',
         *     // The project to be billed for this request if the target bucket is requester-pays bucket.
         *     provisionalUserProject: 'placeholder-value',
         *     // Filter results to objects whose names are lexicographically equal to or after startOffset. If endOffset is also set, the objects listed will have names between startOffset (inclusive) and endOffset (exclusive).
         *     startOffset: 'placeholder-value',
         *     // The project to be billed for this request. Required for Requester Pays buckets.
         *     userProject: 'placeholder-value',
         *     // If true, lists all versions of an object as distinct results. The default is false. For more information, see Object Versioning.
         *     versions: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "items": [],
         *   //   "kind": "my_kind",
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "prefixes": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias storage.objects.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of the bucket in which to look for objects.
         * @param {string=} params.delimiter Returns results in a directory-like mode. items will contain only objects whose names, aside from the prefix, do not contain delimiter. Objects whose names, aside from the prefix, contain delimiter will have their name, truncated after the delimiter, returned in prefixes. Duplicate prefixes are omitted.
         * @param {string=} params.endOffset Filter results to objects whose names are lexicographically before endOffset. If startOffset is also set, the objects listed will have names between startOffset (inclusive) and endOffset (exclusive).
         * @param {boolean=} params.includeTrailingDelimiter If true, objects that end in exactly one instance of delimiter will have their metadata included in items in addition to prefixes.
         * @param {integer=} params.maxResults Maximum number of items plus prefixes to return in a single page of responses. As duplicate prefixes are omitted, fewer total results may be returned than requested. The service will use this parameter or 1,000 items, whichever is smaller.
         * @param {string=} params.pageToken A previously-returned page token representing part of the larger set of results to view.
         * @param {string=} params.prefix Filter results to objects whose names begin with this prefix.
         * @param {string=} params.projection Set of properties to return. Defaults to noAcl.
         * @param {string=} params.provisionalUserProject The project to be billed for this request if the target bucket is requester-pays bucket.
         * @param {string=} params.startOffset Filter results to objects whose names are lexicographically equal to or after startOffset. If endOffset is also set, the objects listed will have names between startOffset (inclusive) and endOffset (exclusive).
         * @param {string=} params.userProject The project to be billed for this request. Required for Requester Pays buckets.
         * @param {boolean=} params.versions If true, lists all versions of an object as distinct results. The default is false. For more information, see Object Versioning.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Objects$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Objects$List, options?: MethodOptions): GaxiosPromise<Schema$Objects>;
        list(params: Params$Resource$Objects$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Objects$List, options: MethodOptions | BodyResponseCallback<Schema$Objects>, callback: BodyResponseCallback<Schema$Objects>): void;
        list(params: Params$Resource$Objects$List, callback: BodyResponseCallback<Schema$Objects>): void;
        list(callback: BodyResponseCallback<Schema$Objects>): void;
        /**
         * storage.objects.patch
         * @desc Patches an object's metadata.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.objects.patch({
         *     // Name of the bucket in which the object resides.
         *     bucket: 'placeholder-value',
         *     // If present, selects a specific revision of this object (as opposed to the latest version, the default).
         *     generation: 'placeholder-value',
         *     // Makes the operation conditional on whether the object's current generation matches the given value. Setting to 0 makes the operation succeed only if there are no live versions of the object.
         *     ifGenerationMatch: 'placeholder-value',
         *     // Makes the operation conditional on whether the object's current generation does not match the given value. If no live object exists, the precondition fails. Setting to 0 makes the operation succeed only if there is a live version of the object.
         *     ifGenerationNotMatch: 'placeholder-value',
         *     // Makes the operation conditional on whether the object's current metageneration matches the given value.
         *     ifMetagenerationMatch: 'placeholder-value',
         *     // Makes the operation conditional on whether the object's current metageneration does not match the given value.
         *     ifMetagenerationNotMatch: 'placeholder-value',
         *     // Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         *     object: 'placeholder-value',
         *     // Apply a predefined set of access controls to this object.
         *     predefinedAcl: 'placeholder-value',
         *     // Set of properties to return. Defaults to full.
         *     projection: 'placeholder-value',
         *     // The project to be billed for this request if the target bucket is requester-pays bucket.
         *     provisionalUserProject: 'placeholder-value',
         *     // The project to be billed for this request, for Requester Pays buckets.
         *     userProject: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "acl": [],
         *       //   "bucket": "my_bucket",
         *       //   "cacheControl": "my_cacheControl",
         *       //   "componentCount": 0,
         *       //   "contentDisposition": "my_contentDisposition",
         *       //   "contentEncoding": "my_contentEncoding",
         *       //   "contentLanguage": "my_contentLanguage",
         *       //   "contentType": "my_contentType",
         *       //   "crc32c": "my_crc32c",
         *       //   "customTime": "my_customTime",
         *       //   "customerEncryption": {},
         *       //   "etag": "my_etag",
         *       //   "eventBasedHold": false,
         *       //   "generation": "my_generation",
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "kmsKeyName": "my_kmsKeyName",
         *       //   "md5Hash": "my_md5Hash",
         *       //   "mediaLink": "my_mediaLink",
         *       //   "metadata": {},
         *       //   "metageneration": "my_metageneration",
         *       //   "name": "my_name",
         *       //   "owner": {},
         *       //   "retentionExpirationTime": "my_retentionExpirationTime",
         *       //   "selfLink": "my_selfLink",
         *       //   "size": "my_size",
         *       //   "storageClass": "my_storageClass",
         *       //   "temporaryHold": false,
         *       //   "timeCreated": "my_timeCreated",
         *       //   "timeDeleted": "my_timeDeleted",
         *       //   "timeStorageClassUpdated": "my_timeStorageClassUpdated",
         *       //   "updated": "my_updated"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "acl": [],
         *   //   "bucket": "my_bucket",
         *   //   "cacheControl": "my_cacheControl",
         *   //   "componentCount": 0,
         *   //   "contentDisposition": "my_contentDisposition",
         *   //   "contentEncoding": "my_contentEncoding",
         *   //   "contentLanguage": "my_contentLanguage",
         *   //   "contentType": "my_contentType",
         *   //   "crc32c": "my_crc32c",
         *   //   "customTime": "my_customTime",
         *   //   "customerEncryption": {},
         *   //   "etag": "my_etag",
         *   //   "eventBasedHold": false,
         *   //   "generation": "my_generation",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "kmsKeyName": "my_kmsKeyName",
         *   //   "md5Hash": "my_md5Hash",
         *   //   "mediaLink": "my_mediaLink",
         *   //   "metadata": {},
         *   //   "metageneration": "my_metageneration",
         *   //   "name": "my_name",
         *   //   "owner": {},
         *   //   "retentionExpirationTime": "my_retentionExpirationTime",
         *   //   "selfLink": "my_selfLink",
         *   //   "size": "my_size",
         *   //   "storageClass": "my_storageClass",
         *   //   "temporaryHold": false,
         *   //   "timeCreated": "my_timeCreated",
         *   //   "timeDeleted": "my_timeDeleted",
         *   //   "timeStorageClassUpdated": "my_timeStorageClassUpdated",
         *   //   "updated": "my_updated"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias storage.objects.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of the bucket in which the object resides.
         * @param {string=} params.generation If present, selects a specific revision of this object (as opposed to the latest version, the default).
         * @param {string=} params.ifGenerationMatch Makes the operation conditional on whether the object's current generation matches the given value. Setting to 0 makes the operation succeed only if there are no live versions of the object.
         * @param {string=} params.ifGenerationNotMatch Makes the operation conditional on whether the object's current generation does not match the given value. If no live object exists, the precondition fails. Setting to 0 makes the operation succeed only if there is a live version of the object.
         * @param {string=} params.ifMetagenerationMatch Makes the operation conditional on whether the object's current metageneration matches the given value.
         * @param {string=} params.ifMetagenerationNotMatch Makes the operation conditional on whether the object's current metageneration does not match the given value.
         * @param {string} params.object Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         * @param {string=} params.predefinedAcl Apply a predefined set of access controls to this object.
         * @param {string=} params.projection Set of properties to return. Defaults to full.
         * @param {string=} params.provisionalUserProject The project to be billed for this request if the target bucket is requester-pays bucket.
         * @param {string=} params.userProject The project to be billed for this request, for Requester Pays buckets.
         * @param {().Object} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Objects$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Objects$Patch, options?: MethodOptions): GaxiosPromise<Schema$Object>;
        patch(params: Params$Resource$Objects$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Objects$Patch, options: MethodOptions | BodyResponseCallback<Schema$Object>, callback: BodyResponseCallback<Schema$Object>): void;
        patch(params: Params$Resource$Objects$Patch, callback: BodyResponseCallback<Schema$Object>): void;
        patch(callback: BodyResponseCallback<Schema$Object>): void;
        /**
         * storage.objects.rewrite
         * @desc Rewrites a source object to a destination object. Optionally overrides metadata.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *       'https://www.googleapis.com/auth/devstorage.read_write',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.objects.rewrite({
         *     // Name of the bucket in which to store the new object. Overrides the provided object metadata's bucket value, if any.
         *     destinationBucket: 'placeholder-value',
         *     // Resource name of the Cloud KMS key, of the form projects/my-project/locations/global/keyRings/my-kr/cryptoKeys/my-key, that will be used to encrypt the object. Overrides the object metadata's kms_key_name value, if any.
         *     destinationKmsKeyName: 'placeholder-value',
         *     // Name of the new object. Required when the object metadata is not otherwise provided. Overrides the object metadata's name value, if any. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         *     destinationObject: 'placeholder-value',
         *     // Apply a predefined set of access controls to the destination object.
         *     destinationPredefinedAcl: 'placeholder-value',
         *     // Makes the operation conditional on whether the object's current generation matches the given value. Setting to 0 makes the operation succeed only if there are no live versions of the object.
         *     ifGenerationMatch: 'placeholder-value',
         *     // Makes the operation conditional on whether the object's current generation does not match the given value. If no live object exists, the precondition fails. Setting to 0 makes the operation succeed only if there is a live version of the object.
         *     ifGenerationNotMatch: 'placeholder-value',
         *     // Makes the operation conditional on whether the destination object's current metageneration matches the given value.
         *     ifMetagenerationMatch: 'placeholder-value',
         *     // Makes the operation conditional on whether the destination object's current metageneration does not match the given value.
         *     ifMetagenerationNotMatch: 'placeholder-value',
         *     // Makes the operation conditional on whether the source object's current generation matches the given value.
         *     ifSourceGenerationMatch: 'placeholder-value',
         *     // Makes the operation conditional on whether the source object's current generation does not match the given value.
         *     ifSourceGenerationNotMatch: 'placeholder-value',
         *     // Makes the operation conditional on whether the source object's current metageneration matches the given value.
         *     ifSourceMetagenerationMatch: 'placeholder-value',
         *     // Makes the operation conditional on whether the source object's current metageneration does not match the given value.
         *     ifSourceMetagenerationNotMatch: 'placeholder-value',
         *     // The maximum number of bytes that will be rewritten per rewrite request. Most callers shouldn't need to specify this parameter - it is primarily in place to support testing. If specified the value must be an integral multiple of 1 MiB (1048576). Also, this only applies to requests where the source and destination span locations and/or storage classes. Finally, this value must not change across rewrite calls else you'll get an error that the rewriteToken is invalid.
         *     maxBytesRewrittenPerCall: 'placeholder-value',
         *     // Set of properties to return. Defaults to noAcl, unless the object resource specifies the acl property, when it defaults to full.
         *     projection: 'placeholder-value',
         *     // The project to be billed for this request if the target bucket is requester-pays bucket.
         *     provisionalUserProject: 'placeholder-value',
         *     // Include this field (from the previous rewrite response) on each rewrite request after the first one, until the rewrite response 'done' flag is true. Calls that provide a rewriteToken can omit all other request fields, but if included those fields must match the values provided in the first rewrite request.
         *     rewriteToken: 'placeholder-value',
         *     // Name of the bucket in which to find the source object.
         *     sourceBucket: 'placeholder-value',
         *     // If present, selects a specific revision of the source object (as opposed to the latest version, the default).
         *     sourceGeneration: 'placeholder-value',
         *     // Name of the source object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         *     sourceObject: 'placeholder-value',
         *     // The project to be billed for this request. Required for Requester Pays buckets.
         *     userProject: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "acl": [],
         *       //   "bucket": "my_bucket",
         *       //   "cacheControl": "my_cacheControl",
         *       //   "componentCount": 0,
         *       //   "contentDisposition": "my_contentDisposition",
         *       //   "contentEncoding": "my_contentEncoding",
         *       //   "contentLanguage": "my_contentLanguage",
         *       //   "contentType": "my_contentType",
         *       //   "crc32c": "my_crc32c",
         *       //   "customTime": "my_customTime",
         *       //   "customerEncryption": {},
         *       //   "etag": "my_etag",
         *       //   "eventBasedHold": false,
         *       //   "generation": "my_generation",
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "kmsKeyName": "my_kmsKeyName",
         *       //   "md5Hash": "my_md5Hash",
         *       //   "mediaLink": "my_mediaLink",
         *       //   "metadata": {},
         *       //   "metageneration": "my_metageneration",
         *       //   "name": "my_name",
         *       //   "owner": {},
         *       //   "retentionExpirationTime": "my_retentionExpirationTime",
         *       //   "selfLink": "my_selfLink",
         *       //   "size": "my_size",
         *       //   "storageClass": "my_storageClass",
         *       //   "temporaryHold": false,
         *       //   "timeCreated": "my_timeCreated",
         *       //   "timeDeleted": "my_timeDeleted",
         *       //   "timeStorageClassUpdated": "my_timeStorageClassUpdated",
         *       //   "updated": "my_updated"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "done": false,
         *   //   "kind": "my_kind",
         *   //   "objectSize": "my_objectSize",
         *   //   "resource": {},
         *   //   "rewriteToken": "my_rewriteToken",
         *   //   "totalBytesRewritten": "my_totalBytesRewritten"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias storage.objects.rewrite
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.destinationBucket Name of the bucket in which to store the new object. Overrides the provided object metadata's bucket value, if any.
         * @param {string=} params.destinationKmsKeyName Resource name of the Cloud KMS key, of the form projects/my-project/locations/global/keyRings/my-kr/cryptoKeys/my-key, that will be used to encrypt the object. Overrides the object metadata's kms_key_name value, if any.
         * @param {string} params.destinationObject Name of the new object. Required when the object metadata is not otherwise provided. Overrides the object metadata's name value, if any. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         * @param {string=} params.destinationPredefinedAcl Apply a predefined set of access controls to the destination object.
         * @param {string=} params.ifGenerationMatch Makes the operation conditional on whether the object's current generation matches the given value. Setting to 0 makes the operation succeed only if there are no live versions of the object.
         * @param {string=} params.ifGenerationNotMatch Makes the operation conditional on whether the object's current generation does not match the given value. If no live object exists, the precondition fails. Setting to 0 makes the operation succeed only if there is a live version of the object.
         * @param {string=} params.ifMetagenerationMatch Makes the operation conditional on whether the destination object's current metageneration matches the given value.
         * @param {string=} params.ifMetagenerationNotMatch Makes the operation conditional on whether the destination object's current metageneration does not match the given value.
         * @param {string=} params.ifSourceGenerationMatch Makes the operation conditional on whether the source object's current generation matches the given value.
         * @param {string=} params.ifSourceGenerationNotMatch Makes the operation conditional on whether the source object's current generation does not match the given value.
         * @param {string=} params.ifSourceMetagenerationMatch Makes the operation conditional on whether the source object's current metageneration matches the given value.
         * @param {string=} params.ifSourceMetagenerationNotMatch Makes the operation conditional on whether the source object's current metageneration does not match the given value.
         * @param {string=} params.maxBytesRewrittenPerCall The maximum number of bytes that will be rewritten per rewrite request. Most callers shouldn't need to specify this parameter - it is primarily in place to support testing. If specified the value must be an integral multiple of 1 MiB (1048576). Also, this only applies to requests where the source and destination span locations and/or storage classes. Finally, this value must not change across rewrite calls else you'll get an error that the rewriteToken is invalid.
         * @param {string=} params.projection Set of properties to return. Defaults to noAcl, unless the object resource specifies the acl property, when it defaults to full.
         * @param {string=} params.provisionalUserProject The project to be billed for this request if the target bucket is requester-pays bucket.
         * @param {string=} params.rewriteToken Include this field (from the previous rewrite response) on each rewrite request after the first one, until the rewrite response 'done' flag is true. Calls that provide a rewriteToken can omit all other request fields, but if included those fields must match the values provided in the first rewrite request.
         * @param {string} params.sourceBucket Name of the bucket in which to find the source object.
         * @param {string=} params.sourceGeneration If present, selects a specific revision of the source object (as opposed to the latest version, the default).
         * @param {string} params.sourceObject Name of the source object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         * @param {string=} params.userProject The project to be billed for this request. Required for Requester Pays buckets.
         * @param {().Object} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        rewrite(params: Params$Resource$Objects$Rewrite, options: StreamMethodOptions): GaxiosPromise<Readable>;
        rewrite(params?: Params$Resource$Objects$Rewrite, options?: MethodOptions): GaxiosPromise<Schema$RewriteResponse>;
        rewrite(params: Params$Resource$Objects$Rewrite, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        rewrite(params: Params$Resource$Objects$Rewrite, options: MethodOptions | BodyResponseCallback<Schema$RewriteResponse>, callback: BodyResponseCallback<Schema$RewriteResponse>): void;
        rewrite(params: Params$Resource$Objects$Rewrite, callback: BodyResponseCallback<Schema$RewriteResponse>): void;
        rewrite(callback: BodyResponseCallback<Schema$RewriteResponse>): void;
        /**
         * storage.objects.setIamPolicy
         * @desc Updates an IAM policy for the specified object.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *       'https://www.googleapis.com/auth/devstorage.read_write',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.objects.setIamPolicy({
         *     // Name of the bucket in which the object resides.
         *     bucket: 'placeholder-value',
         *     // If present, selects a specific revision of this object (as opposed to the latest version, the default).
         *     generation: 'placeholder-value',
         *     // Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         *     object: 'placeholder-value',
         *     // The project to be billed for this request if the target bucket is requester-pays bucket.
         *     provisionalUserProject: 'placeholder-value',
         *     // The project to be billed for this request. Required for Requester Pays buckets.
         *     userProject: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "bindings": [],
         *       //   "etag": "my_etag",
         *       //   "kind": "my_kind",
         *       //   "resourceId": "my_resourceId",
         *       //   "version": 0
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "bindings": [],
         *   //   "etag": "my_etag",
         *   //   "kind": "my_kind",
         *   //   "resourceId": "my_resourceId",
         *   //   "version": 0
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias storage.objects.setIamPolicy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of the bucket in which the object resides.
         * @param {string=} params.generation If present, selects a specific revision of this object (as opposed to the latest version, the default).
         * @param {string} params.object Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         * @param {string=} params.provisionalUserProject The project to be billed for this request if the target bucket is requester-pays bucket.
         * @param {string=} params.userProject The project to be billed for this request. Required for Requester Pays buckets.
         * @param {().Policy} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        setIamPolicy(params: Params$Resource$Objects$Setiampolicy, options: StreamMethodOptions): GaxiosPromise<Readable>;
        setIamPolicy(params?: Params$Resource$Objects$Setiampolicy, options?: MethodOptions): GaxiosPromise<Schema$Policy>;
        setIamPolicy(params: Params$Resource$Objects$Setiampolicy, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        setIamPolicy(params: Params$Resource$Objects$Setiampolicy, options: MethodOptions | BodyResponseCallback<Schema$Policy>, callback: BodyResponseCallback<Schema$Policy>): void;
        setIamPolicy(params: Params$Resource$Objects$Setiampolicy, callback: BodyResponseCallback<Schema$Policy>): void;
        setIamPolicy(callback: BodyResponseCallback<Schema$Policy>): void;
        /**
         * storage.objects.testIamPermissions
         * @desc Tests a set of permissions on the given object to see which, if any, are held by the caller.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *       'https://www.googleapis.com/auth/devstorage.read_only',
         *       'https://www.googleapis.com/auth/devstorage.read_write',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.objects.testIamPermissions({
         *     // Name of the bucket in which the object resides.
         *     bucket: 'placeholder-value',
         *     // If present, selects a specific revision of this object (as opposed to the latest version, the default).
         *     generation: 'placeholder-value',
         *     // Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         *     object: 'placeholder-value',
         *     // Permissions to test.
         *     permissions: 'placeholder-value',
         *     // The project to be billed for this request if the target bucket is requester-pays bucket.
         *     provisionalUserProject: 'placeholder-value',
         *     // The project to be billed for this request. Required for Requester Pays buckets.
         *     userProject: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "kind": "my_kind",
         *   //   "permissions": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias storage.objects.testIamPermissions
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of the bucket in which the object resides.
         * @param {string=} params.generation If present, selects a specific revision of this object (as opposed to the latest version, the default).
         * @param {string} params.object Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         * @param {string} params.permissions Permissions to test.
         * @param {string=} params.provisionalUserProject The project to be billed for this request if the target bucket is requester-pays bucket.
         * @param {string=} params.userProject The project to be billed for this request. Required for Requester Pays buckets.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        testIamPermissions(params: Params$Resource$Objects$Testiampermissions, options: StreamMethodOptions): GaxiosPromise<Readable>;
        testIamPermissions(params?: Params$Resource$Objects$Testiampermissions, options?: MethodOptions): GaxiosPromise<Schema$TestIamPermissionsResponse>;
        testIamPermissions(params: Params$Resource$Objects$Testiampermissions, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        testIamPermissions(params: Params$Resource$Objects$Testiampermissions, options: MethodOptions | BodyResponseCallback<Schema$TestIamPermissionsResponse>, callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        testIamPermissions(params: Params$Resource$Objects$Testiampermissions, callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        testIamPermissions(callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        /**
         * storage.objects.update
         * @desc Updates an object's metadata.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.objects.update({
         *     // Name of the bucket in which the object resides.
         *     bucket: 'placeholder-value',
         *     // If present, selects a specific revision of this object (as opposed to the latest version, the default).
         *     generation: 'placeholder-value',
         *     // Makes the operation conditional on whether the object's current generation matches the given value. Setting to 0 makes the operation succeed only if there are no live versions of the object.
         *     ifGenerationMatch: 'placeholder-value',
         *     // Makes the operation conditional on whether the object's current generation does not match the given value. If no live object exists, the precondition fails. Setting to 0 makes the operation succeed only if there is a live version of the object.
         *     ifGenerationNotMatch: 'placeholder-value',
         *     // Makes the operation conditional on whether the object's current metageneration matches the given value.
         *     ifMetagenerationMatch: 'placeholder-value',
         *     // Makes the operation conditional on whether the object's current metageneration does not match the given value.
         *     ifMetagenerationNotMatch: 'placeholder-value',
         *     // Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         *     object: 'placeholder-value',
         *     // Apply a predefined set of access controls to this object.
         *     predefinedAcl: 'placeholder-value',
         *     // Set of properties to return. Defaults to full.
         *     projection: 'placeholder-value',
         *     // The project to be billed for this request if the target bucket is requester-pays bucket.
         *     provisionalUserProject: 'placeholder-value',
         *     // The project to be billed for this request. Required for Requester Pays buckets.
         *     userProject: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "acl": [],
         *       //   "bucket": "my_bucket",
         *       //   "cacheControl": "my_cacheControl",
         *       //   "componentCount": 0,
         *       //   "contentDisposition": "my_contentDisposition",
         *       //   "contentEncoding": "my_contentEncoding",
         *       //   "contentLanguage": "my_contentLanguage",
         *       //   "contentType": "my_contentType",
         *       //   "crc32c": "my_crc32c",
         *       //   "customTime": "my_customTime",
         *       //   "customerEncryption": {},
         *       //   "etag": "my_etag",
         *       //   "eventBasedHold": false,
         *       //   "generation": "my_generation",
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "kmsKeyName": "my_kmsKeyName",
         *       //   "md5Hash": "my_md5Hash",
         *       //   "mediaLink": "my_mediaLink",
         *       //   "metadata": {},
         *       //   "metageneration": "my_metageneration",
         *       //   "name": "my_name",
         *       //   "owner": {},
         *       //   "retentionExpirationTime": "my_retentionExpirationTime",
         *       //   "selfLink": "my_selfLink",
         *       //   "size": "my_size",
         *       //   "storageClass": "my_storageClass",
         *       //   "temporaryHold": false,
         *       //   "timeCreated": "my_timeCreated",
         *       //   "timeDeleted": "my_timeDeleted",
         *       //   "timeStorageClassUpdated": "my_timeStorageClassUpdated",
         *       //   "updated": "my_updated"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "acl": [],
         *   //   "bucket": "my_bucket",
         *   //   "cacheControl": "my_cacheControl",
         *   //   "componentCount": 0,
         *   //   "contentDisposition": "my_contentDisposition",
         *   //   "contentEncoding": "my_contentEncoding",
         *   //   "contentLanguage": "my_contentLanguage",
         *   //   "contentType": "my_contentType",
         *   //   "crc32c": "my_crc32c",
         *   //   "customTime": "my_customTime",
         *   //   "customerEncryption": {},
         *   //   "etag": "my_etag",
         *   //   "eventBasedHold": false,
         *   //   "generation": "my_generation",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "kmsKeyName": "my_kmsKeyName",
         *   //   "md5Hash": "my_md5Hash",
         *   //   "mediaLink": "my_mediaLink",
         *   //   "metadata": {},
         *   //   "metageneration": "my_metageneration",
         *   //   "name": "my_name",
         *   //   "owner": {},
         *   //   "retentionExpirationTime": "my_retentionExpirationTime",
         *   //   "selfLink": "my_selfLink",
         *   //   "size": "my_size",
         *   //   "storageClass": "my_storageClass",
         *   //   "temporaryHold": false,
         *   //   "timeCreated": "my_timeCreated",
         *   //   "timeDeleted": "my_timeDeleted",
         *   //   "timeStorageClassUpdated": "my_timeStorageClassUpdated",
         *   //   "updated": "my_updated"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias storage.objects.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of the bucket in which the object resides.
         * @param {string=} params.generation If present, selects a specific revision of this object (as opposed to the latest version, the default).
         * @param {string=} params.ifGenerationMatch Makes the operation conditional on whether the object's current generation matches the given value. Setting to 0 makes the operation succeed only if there are no live versions of the object.
         * @param {string=} params.ifGenerationNotMatch Makes the operation conditional on whether the object's current generation does not match the given value. If no live object exists, the precondition fails. Setting to 0 makes the operation succeed only if there is a live version of the object.
         * @param {string=} params.ifMetagenerationMatch Makes the operation conditional on whether the object's current metageneration matches the given value.
         * @param {string=} params.ifMetagenerationNotMatch Makes the operation conditional on whether the object's current metageneration does not match the given value.
         * @param {string} params.object Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         * @param {string=} params.predefinedAcl Apply a predefined set of access controls to this object.
         * @param {string=} params.projection Set of properties to return. Defaults to full.
         * @param {string=} params.provisionalUserProject The project to be billed for this request if the target bucket is requester-pays bucket.
         * @param {string=} params.userProject The project to be billed for this request. Required for Requester Pays buckets.
         * @param {().Object} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Objects$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Objects$Update, options?: MethodOptions): GaxiosPromise<Schema$Object>;
        update(params: Params$Resource$Objects$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Objects$Update, options: MethodOptions | BodyResponseCallback<Schema$Object>, callback: BodyResponseCallback<Schema$Object>): void;
        update(params: Params$Resource$Objects$Update, callback: BodyResponseCallback<Schema$Object>): void;
        update(callback: BodyResponseCallback<Schema$Object>): void;
        /**
         * storage.objects.watchAll
         * @desc Watch for changes on all objects in a bucket.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *       'https://www.googleapis.com/auth/devstorage.read_only',
         *       'https://www.googleapis.com/auth/devstorage.read_write',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.objects.watchAll({
         *     // Name of the bucket in which to look for objects.
         *     bucket: 'placeholder-value',
         *     // Returns results in a directory-like mode. items will contain only objects whose names, aside from the prefix, do not contain delimiter. Objects whose names, aside from the prefix, contain delimiter will have their name, truncated after the delimiter, returned in prefixes. Duplicate prefixes are omitted.
         *     delimiter: 'placeholder-value',
         *     // Filter results to objects whose names are lexicographically before endOffset. If startOffset is also set, the objects listed will have names between startOffset (inclusive) and endOffset (exclusive).
         *     endOffset: 'placeholder-value',
         *     // If true, objects that end in exactly one instance of delimiter will have their metadata included in items in addition to prefixes.
         *     includeTrailingDelimiter: 'placeholder-value',
         *     // Maximum number of items plus prefixes to return in a single page of responses. As duplicate prefixes are omitted, fewer total results may be returned than requested. The service will use this parameter or 1,000 items, whichever is smaller.
         *     maxResults: 'placeholder-value',
         *     // A previously-returned page token representing part of the larger set of results to view.
         *     pageToken: 'placeholder-value',
         *     // Filter results to objects whose names begin with this prefix.
         *     prefix: 'placeholder-value',
         *     // Set of properties to return. Defaults to noAcl.
         *     projection: 'placeholder-value',
         *     // The project to be billed for this request if the target bucket is requester-pays bucket.
         *     provisionalUserProject: 'placeholder-value',
         *     // Filter results to objects whose names are lexicographically equal to or after startOffset. If endOffset is also set, the objects listed will have names between startOffset (inclusive) and endOffset (exclusive).
         *     startOffset: 'placeholder-value',
         *     // The project to be billed for this request. Required for Requester Pays buckets.
         *     userProject: 'placeholder-value',
         *     // If true, lists all versions of an object as distinct results. The default is false. For more information, see Object Versioning.
         *     versions: 'placeholder-value',
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
         * @alias storage.objects.watchAll
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of the bucket in which to look for objects.
         * @param {string=} params.delimiter Returns results in a directory-like mode. items will contain only objects whose names, aside from the prefix, do not contain delimiter. Objects whose names, aside from the prefix, contain delimiter will have their name, truncated after the delimiter, returned in prefixes. Duplicate prefixes are omitted.
         * @param {string=} params.endOffset Filter results to objects whose names are lexicographically before endOffset. If startOffset is also set, the objects listed will have names between startOffset (inclusive) and endOffset (exclusive).
         * @param {boolean=} params.includeTrailingDelimiter If true, objects that end in exactly one instance of delimiter will have their metadata included in items in addition to prefixes.
         * @param {integer=} params.maxResults Maximum number of items plus prefixes to return in a single page of responses. As duplicate prefixes are omitted, fewer total results may be returned than requested. The service will use this parameter or 1,000 items, whichever is smaller.
         * @param {string=} params.pageToken A previously-returned page token representing part of the larger set of results to view.
         * @param {string=} params.prefix Filter results to objects whose names begin with this prefix.
         * @param {string=} params.projection Set of properties to return. Defaults to noAcl.
         * @param {string=} params.provisionalUserProject The project to be billed for this request if the target bucket is requester-pays bucket.
         * @param {string=} params.startOffset Filter results to objects whose names are lexicographically equal to or after startOffset. If endOffset is also set, the objects listed will have names between startOffset (inclusive) and endOffset (exclusive).
         * @param {string=} params.userProject The project to be billed for this request. Required for Requester Pays buckets.
         * @param {boolean=} params.versions If true, lists all versions of an object as distinct results. The default is false. For more information, see Object Versioning.
         * @param {().Channel} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        watchAll(params: Params$Resource$Objects$Watchall, options: StreamMethodOptions): GaxiosPromise<Readable>;
        watchAll(params?: Params$Resource$Objects$Watchall, options?: MethodOptions): GaxiosPromise<Schema$Channel>;
        watchAll(params: Params$Resource$Objects$Watchall, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        watchAll(params: Params$Resource$Objects$Watchall, options: MethodOptions | BodyResponseCallback<Schema$Channel>, callback: BodyResponseCallback<Schema$Channel>): void;
        watchAll(params: Params$Resource$Objects$Watchall, callback: BodyResponseCallback<Schema$Channel>): void;
        watchAll(callback: BodyResponseCallback<Schema$Channel>): void;
    }
    export interface Params$Resource$Objects$Compose extends StandardParameters {
        /**
         * Name of the bucket containing the source objects. The destination object is stored in this bucket.
         */
        destinationBucket?: string;
        /**
         * Name of the new object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         */
        destinationObject?: string;
        /**
         * Apply a predefined set of access controls to the destination object.
         */
        destinationPredefinedAcl?: string;
        /**
         * Makes the operation conditional on whether the object's current generation matches the given value. Setting to 0 makes the operation succeed only if there are no live versions of the object.
         */
        ifGenerationMatch?: string;
        /**
         * Makes the operation conditional on whether the object's current metageneration matches the given value.
         */
        ifMetagenerationMatch?: string;
        /**
         * Resource name of the Cloud KMS key, of the form projects/my-project/locations/global/keyRings/my-kr/cryptoKeys/my-key, that will be used to encrypt the object. Overrides the object metadata's kms_key_name value, if any.
         */
        kmsKeyName?: string;
        /**
         * The project to be billed for this request if the target bucket is requester-pays bucket.
         */
        provisionalUserProject?: string;
        /**
         * The project to be billed for this request. Required for Requester Pays buckets.
         */
        userProject?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$ComposeRequest;
    }
    export interface Params$Resource$Objects$Copy extends StandardParameters {
        /**
         * Name of the bucket in which to store the new object. Overrides the provided object metadata's bucket value, if any.For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         */
        destinationBucket?: string;
        /**
         * Resource name of the Cloud KMS key, of the form projects/my-project/locations/global/keyRings/my-kr/cryptoKeys/my-key, that will be used to encrypt the object. Overrides the object metadata's kms_key_name value, if any.
         */
        destinationKmsKeyName?: string;
        /**
         * Name of the new object. Required when the object metadata is not otherwise provided. Overrides the object metadata's name value, if any.
         */
        destinationObject?: string;
        /**
         * Apply a predefined set of access controls to the destination object.
         */
        destinationPredefinedAcl?: string;
        /**
         * Makes the operation conditional on whether the destination object's current generation matches the given value. Setting to 0 makes the operation succeed only if there are no live versions of the object.
         */
        ifGenerationMatch?: string;
        /**
         * Makes the operation conditional on whether the destination object's current generation does not match the given value. If no live object exists, the precondition fails. Setting to 0 makes the operation succeed only if there is a live version of the object.
         */
        ifGenerationNotMatch?: string;
        /**
         * Makes the operation conditional on whether the destination object's current metageneration matches the given value.
         */
        ifMetagenerationMatch?: string;
        /**
         * Makes the operation conditional on whether the destination object's current metageneration does not match the given value.
         */
        ifMetagenerationNotMatch?: string;
        /**
         * Makes the operation conditional on whether the source object's current generation matches the given value.
         */
        ifSourceGenerationMatch?: string;
        /**
         * Makes the operation conditional on whether the source object's current generation does not match the given value.
         */
        ifSourceGenerationNotMatch?: string;
        /**
         * Makes the operation conditional on whether the source object's current metageneration matches the given value.
         */
        ifSourceMetagenerationMatch?: string;
        /**
         * Makes the operation conditional on whether the source object's current metageneration does not match the given value.
         */
        ifSourceMetagenerationNotMatch?: string;
        /**
         * Set of properties to return. Defaults to noAcl, unless the object resource specifies the acl property, when it defaults to full.
         */
        projection?: string;
        /**
         * The project to be billed for this request if the target bucket is requester-pays bucket.
         */
        provisionalUserProject?: string;
        /**
         * Name of the bucket in which to find the source object.
         */
        sourceBucket?: string;
        /**
         * If present, selects a specific revision of the source object (as opposed to the latest version, the default).
         */
        sourceGeneration?: string;
        /**
         * Name of the source object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         */
        sourceObject?: string;
        /**
         * The project to be billed for this request. Required for Requester Pays buckets.
         */
        userProject?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Object;
    }
    export interface Params$Resource$Objects$Delete extends StandardParameters {
        /**
         * Name of the bucket in which the object resides.
         */
        bucket?: string;
        /**
         * If present, permanently deletes a specific revision of this object (as opposed to the latest version, the default).
         */
        generation?: string;
        /**
         * Makes the operation conditional on whether the object's current generation matches the given value. Setting to 0 makes the operation succeed only if there are no live versions of the object.
         */
        ifGenerationMatch?: string;
        /**
         * Makes the operation conditional on whether the object's current generation does not match the given value. If no live object exists, the precondition fails. Setting to 0 makes the operation succeed only if there is a live version of the object.
         */
        ifGenerationNotMatch?: string;
        /**
         * Makes the operation conditional on whether the object's current metageneration matches the given value.
         */
        ifMetagenerationMatch?: string;
        /**
         * Makes the operation conditional on whether the object's current metageneration does not match the given value.
         */
        ifMetagenerationNotMatch?: string;
        /**
         * Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         */
        object?: string;
        /**
         * The project to be billed for this request if the target bucket is requester-pays bucket.
         */
        provisionalUserProject?: string;
        /**
         * The project to be billed for this request. Required for Requester Pays buckets.
         */
        userProject?: string;
    }
    export interface Params$Resource$Objects$Get extends StandardParameters {
        /**
         * Name of the bucket in which the object resides.
         */
        bucket?: string;
        /**
         * If present, selects a specific revision of this object (as opposed to the latest version, the default).
         */
        generation?: string;
        /**
         * Makes the operation conditional on whether the object's current generation matches the given value. Setting to 0 makes the operation succeed only if there are no live versions of the object.
         */
        ifGenerationMatch?: string;
        /**
         * Makes the operation conditional on whether the object's current generation does not match the given value. If no live object exists, the precondition fails. Setting to 0 makes the operation succeed only if there is a live version of the object.
         */
        ifGenerationNotMatch?: string;
        /**
         * Makes the operation conditional on whether the object's current metageneration matches the given value.
         */
        ifMetagenerationMatch?: string;
        /**
         * Makes the operation conditional on whether the object's current metageneration does not match the given value.
         */
        ifMetagenerationNotMatch?: string;
        /**
         * Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         */
        object?: string;
        /**
         * Set of properties to return. Defaults to noAcl.
         */
        projection?: string;
        /**
         * The project to be billed for this request if the target bucket is requester-pays bucket.
         */
        provisionalUserProject?: string;
        /**
         * The project to be billed for this request. Required for Requester Pays buckets.
         */
        userProject?: string;
    }
    export interface Params$Resource$Objects$Getiampolicy extends StandardParameters {
        /**
         * Name of the bucket in which the object resides.
         */
        bucket?: string;
        /**
         * If present, selects a specific revision of this object (as opposed to the latest version, the default).
         */
        generation?: string;
        /**
         * Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         */
        object?: string;
        /**
         * The project to be billed for this request if the target bucket is requester-pays bucket.
         */
        provisionalUserProject?: string;
        /**
         * The project to be billed for this request. Required for Requester Pays buckets.
         */
        userProject?: string;
    }
    export interface Params$Resource$Objects$Insert extends StandardParameters {
        /**
         * Name of the bucket in which to store the new object. Overrides the provided object metadata's bucket value, if any.
         */
        bucket?: string;
        /**
         * If set, sets the contentEncoding property of the final object to this value. Setting this parameter is equivalent to setting the contentEncoding metadata property. This can be useful when uploading an object with uploadType=media to indicate the encoding of the content being uploaded.
         */
        contentEncoding?: string;
        /**
         * Makes the operation conditional on whether the object's current generation matches the given value. Setting to 0 makes the operation succeed only if there are no live versions of the object.
         */
        ifGenerationMatch?: string;
        /**
         * Makes the operation conditional on whether the object's current generation does not match the given value. If no live object exists, the precondition fails. Setting to 0 makes the operation succeed only if there is a live version of the object.
         */
        ifGenerationNotMatch?: string;
        /**
         * Makes the operation conditional on whether the object's current metageneration matches the given value.
         */
        ifMetagenerationMatch?: string;
        /**
         * Makes the operation conditional on whether the object's current metageneration does not match the given value.
         */
        ifMetagenerationNotMatch?: string;
        /**
         * Resource name of the Cloud KMS key, of the form projects/my-project/locations/global/keyRings/my-kr/cryptoKeys/my-key, that will be used to encrypt the object. Overrides the object metadata's kms_key_name value, if any.
         */
        kmsKeyName?: string;
        /**
         * Name of the object. Required when the object metadata is not otherwise provided. Overrides the object metadata's name value, if any. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         */
        name?: string;
        /**
         * Apply a predefined set of access controls to this object.
         */
        predefinedAcl?: string;
        /**
         * Set of properties to return. Defaults to noAcl, unless the object resource specifies the acl property, when it defaults to full.
         */
        projection?: string;
        /**
         * The project to be billed for this request if the target bucket is requester-pays bucket.
         */
        provisionalUserProject?: string;
        /**
         * The project to be billed for this request. Required for Requester Pays buckets.
         */
        userProject?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Object;
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
    export interface Params$Resource$Objects$List extends StandardParameters {
        /**
         * Name of the bucket in which to look for objects.
         */
        bucket?: string;
        /**
         * Returns results in a directory-like mode. items will contain only objects whose names, aside from the prefix, do not contain delimiter. Objects whose names, aside from the prefix, contain delimiter will have their name, truncated after the delimiter, returned in prefixes. Duplicate prefixes are omitted.
         */
        delimiter?: string;
        /**
         * Filter results to objects whose names are lexicographically before endOffset. If startOffset is also set, the objects listed will have names between startOffset (inclusive) and endOffset (exclusive).
         */
        endOffset?: string;
        /**
         * If true, objects that end in exactly one instance of delimiter will have their metadata included in items in addition to prefixes.
         */
        includeTrailingDelimiter?: boolean;
        /**
         * Maximum number of items plus prefixes to return in a single page of responses. As duplicate prefixes are omitted, fewer total results may be returned than requested. The service will use this parameter or 1,000 items, whichever is smaller.
         */
        maxResults?: number;
        /**
         * A previously-returned page token representing part of the larger set of results to view.
         */
        pageToken?: string;
        /**
         * Filter results to objects whose names begin with this prefix.
         */
        prefix?: string;
        /**
         * Set of properties to return. Defaults to noAcl.
         */
        projection?: string;
        /**
         * The project to be billed for this request if the target bucket is requester-pays bucket.
         */
        provisionalUserProject?: string;
        /**
         * Filter results to objects whose names are lexicographically equal to or after startOffset. If endOffset is also set, the objects listed will have names between startOffset (inclusive) and endOffset (exclusive).
         */
        startOffset?: string;
        /**
         * The project to be billed for this request. Required for Requester Pays buckets.
         */
        userProject?: string;
        /**
         * If true, lists all versions of an object as distinct results. The default is false. For more information, see Object Versioning.
         */
        versions?: boolean;
    }
    export interface Params$Resource$Objects$Patch extends StandardParameters {
        /**
         * Name of the bucket in which the object resides.
         */
        bucket?: string;
        /**
         * If present, selects a specific revision of this object (as opposed to the latest version, the default).
         */
        generation?: string;
        /**
         * Makes the operation conditional on whether the object's current generation matches the given value. Setting to 0 makes the operation succeed only if there are no live versions of the object.
         */
        ifGenerationMatch?: string;
        /**
         * Makes the operation conditional on whether the object's current generation does not match the given value. If no live object exists, the precondition fails. Setting to 0 makes the operation succeed only if there is a live version of the object.
         */
        ifGenerationNotMatch?: string;
        /**
         * Makes the operation conditional on whether the object's current metageneration matches the given value.
         */
        ifMetagenerationMatch?: string;
        /**
         * Makes the operation conditional on whether the object's current metageneration does not match the given value.
         */
        ifMetagenerationNotMatch?: string;
        /**
         * Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         */
        object?: string;
        /**
         * Apply a predefined set of access controls to this object.
         */
        predefinedAcl?: string;
        /**
         * Set of properties to return. Defaults to full.
         */
        projection?: string;
        /**
         * The project to be billed for this request if the target bucket is requester-pays bucket.
         */
        provisionalUserProject?: string;
        /**
         * The project to be billed for this request, for Requester Pays buckets.
         */
        userProject?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Object;
    }
    export interface Params$Resource$Objects$Rewrite extends StandardParameters {
        /**
         * Name of the bucket in which to store the new object. Overrides the provided object metadata's bucket value, if any.
         */
        destinationBucket?: string;
        /**
         * Resource name of the Cloud KMS key, of the form projects/my-project/locations/global/keyRings/my-kr/cryptoKeys/my-key, that will be used to encrypt the object. Overrides the object metadata's kms_key_name value, if any.
         */
        destinationKmsKeyName?: string;
        /**
         * Name of the new object. Required when the object metadata is not otherwise provided. Overrides the object metadata's name value, if any. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         */
        destinationObject?: string;
        /**
         * Apply a predefined set of access controls to the destination object.
         */
        destinationPredefinedAcl?: string;
        /**
         * Makes the operation conditional on whether the object's current generation matches the given value. Setting to 0 makes the operation succeed only if there are no live versions of the object.
         */
        ifGenerationMatch?: string;
        /**
         * Makes the operation conditional on whether the object's current generation does not match the given value. If no live object exists, the precondition fails. Setting to 0 makes the operation succeed only if there is a live version of the object.
         */
        ifGenerationNotMatch?: string;
        /**
         * Makes the operation conditional on whether the destination object's current metageneration matches the given value.
         */
        ifMetagenerationMatch?: string;
        /**
         * Makes the operation conditional on whether the destination object's current metageneration does not match the given value.
         */
        ifMetagenerationNotMatch?: string;
        /**
         * Makes the operation conditional on whether the source object's current generation matches the given value.
         */
        ifSourceGenerationMatch?: string;
        /**
         * Makes the operation conditional on whether the source object's current generation does not match the given value.
         */
        ifSourceGenerationNotMatch?: string;
        /**
         * Makes the operation conditional on whether the source object's current metageneration matches the given value.
         */
        ifSourceMetagenerationMatch?: string;
        /**
         * Makes the operation conditional on whether the source object's current metageneration does not match the given value.
         */
        ifSourceMetagenerationNotMatch?: string;
        /**
         * The maximum number of bytes that will be rewritten per rewrite request. Most callers shouldn't need to specify this parameter - it is primarily in place to support testing. If specified the value must be an integral multiple of 1 MiB (1048576). Also, this only applies to requests where the source and destination span locations and/or storage classes. Finally, this value must not change across rewrite calls else you'll get an error that the rewriteToken is invalid.
         */
        maxBytesRewrittenPerCall?: string;
        /**
         * Set of properties to return. Defaults to noAcl, unless the object resource specifies the acl property, when it defaults to full.
         */
        projection?: string;
        /**
         * The project to be billed for this request if the target bucket is requester-pays bucket.
         */
        provisionalUserProject?: string;
        /**
         * Include this field (from the previous rewrite response) on each rewrite request after the first one, until the rewrite response 'done' flag is true. Calls that provide a rewriteToken can omit all other request fields, but if included those fields must match the values provided in the first rewrite request.
         */
        rewriteToken?: string;
        /**
         * Name of the bucket in which to find the source object.
         */
        sourceBucket?: string;
        /**
         * If present, selects a specific revision of the source object (as opposed to the latest version, the default).
         */
        sourceGeneration?: string;
        /**
         * Name of the source object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         */
        sourceObject?: string;
        /**
         * The project to be billed for this request. Required for Requester Pays buckets.
         */
        userProject?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Object;
    }
    export interface Params$Resource$Objects$Setiampolicy extends StandardParameters {
        /**
         * Name of the bucket in which the object resides.
         */
        bucket?: string;
        /**
         * If present, selects a specific revision of this object (as opposed to the latest version, the default).
         */
        generation?: string;
        /**
         * Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         */
        object?: string;
        /**
         * The project to be billed for this request if the target bucket is requester-pays bucket.
         */
        provisionalUserProject?: string;
        /**
         * The project to be billed for this request. Required for Requester Pays buckets.
         */
        userProject?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Policy;
    }
    export interface Params$Resource$Objects$Testiampermissions extends StandardParameters {
        /**
         * Name of the bucket in which the object resides.
         */
        bucket?: string;
        /**
         * If present, selects a specific revision of this object (as opposed to the latest version, the default).
         */
        generation?: string;
        /**
         * Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         */
        object?: string;
        /**
         * Permissions to test.
         */
        permissions?: string[];
        /**
         * The project to be billed for this request if the target bucket is requester-pays bucket.
         */
        provisionalUserProject?: string;
        /**
         * The project to be billed for this request. Required for Requester Pays buckets.
         */
        userProject?: string;
    }
    export interface Params$Resource$Objects$Update extends StandardParameters {
        /**
         * Name of the bucket in which the object resides.
         */
        bucket?: string;
        /**
         * If present, selects a specific revision of this object (as opposed to the latest version, the default).
         */
        generation?: string;
        /**
         * Makes the operation conditional on whether the object's current generation matches the given value. Setting to 0 makes the operation succeed only if there are no live versions of the object.
         */
        ifGenerationMatch?: string;
        /**
         * Makes the operation conditional on whether the object's current generation does not match the given value. If no live object exists, the precondition fails. Setting to 0 makes the operation succeed only if there is a live version of the object.
         */
        ifGenerationNotMatch?: string;
        /**
         * Makes the operation conditional on whether the object's current metageneration matches the given value.
         */
        ifMetagenerationMatch?: string;
        /**
         * Makes the operation conditional on whether the object's current metageneration does not match the given value.
         */
        ifMetagenerationNotMatch?: string;
        /**
         * Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
         */
        object?: string;
        /**
         * Apply a predefined set of access controls to this object.
         */
        predefinedAcl?: string;
        /**
         * Set of properties to return. Defaults to full.
         */
        projection?: string;
        /**
         * The project to be billed for this request if the target bucket is requester-pays bucket.
         */
        provisionalUserProject?: string;
        /**
         * The project to be billed for this request. Required for Requester Pays buckets.
         */
        userProject?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Object;
    }
    export interface Params$Resource$Objects$Watchall extends StandardParameters {
        /**
         * Name of the bucket in which to look for objects.
         */
        bucket?: string;
        /**
         * Returns results in a directory-like mode. items will contain only objects whose names, aside from the prefix, do not contain delimiter. Objects whose names, aside from the prefix, contain delimiter will have their name, truncated after the delimiter, returned in prefixes. Duplicate prefixes are omitted.
         */
        delimiter?: string;
        /**
         * Filter results to objects whose names are lexicographically before endOffset. If startOffset is also set, the objects listed will have names between startOffset (inclusive) and endOffset (exclusive).
         */
        endOffset?: string;
        /**
         * If true, objects that end in exactly one instance of delimiter will have their metadata included in items in addition to prefixes.
         */
        includeTrailingDelimiter?: boolean;
        /**
         * Maximum number of items plus prefixes to return in a single page of responses. As duplicate prefixes are omitted, fewer total results may be returned than requested. The service will use this parameter or 1,000 items, whichever is smaller.
         */
        maxResults?: number;
        /**
         * A previously-returned page token representing part of the larger set of results to view.
         */
        pageToken?: string;
        /**
         * Filter results to objects whose names begin with this prefix.
         */
        prefix?: string;
        /**
         * Set of properties to return. Defaults to noAcl.
         */
        projection?: string;
        /**
         * The project to be billed for this request if the target bucket is requester-pays bucket.
         */
        provisionalUserProject?: string;
        /**
         * Filter results to objects whose names are lexicographically equal to or after startOffset. If endOffset is also set, the objects listed will have names between startOffset (inclusive) and endOffset (exclusive).
         */
        startOffset?: string;
        /**
         * The project to be billed for this request. Required for Requester Pays buckets.
         */
        userProject?: string;
        /**
         * If true, lists all versions of an object as distinct results. The default is false. For more information, see Object Versioning.
         */
        versions?: boolean;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Channel;
    }
    export class Resource$Projects {
        context: APIRequestContext;
        hmacKeys: Resource$Projects$Hmackeys;
        serviceAccount: Resource$Projects$Serviceaccount;
        constructor(context: APIRequestContext);
    }
    export class Resource$Projects$Hmackeys {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * storage.projects.hmacKeys.create
         * @desc Creates a new HMAC key for the specified service account.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.projects.hmacKeys.create({
         *     // Project ID owning the service account.
         *     projectId: 'placeholder-value',
         *     // Email address of the service account.
         *     serviceAccountEmail: 'placeholder-value',
         *     // The project to be billed for this request.
         *     userProject: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "kind": "my_kind",
         *   //   "metadata": {},
         *   //   "secret": "my_secret"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias storage.projects.hmacKeys.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.projectId Project ID owning the service account.
         * @param {string} params.serviceAccountEmail Email address of the service account.
         * @param {string=} params.userProject The project to be billed for this request.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Projects$Hmackeys$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Projects$Hmackeys$Create, options?: MethodOptions): GaxiosPromise<Schema$HmacKey>;
        create(params: Params$Resource$Projects$Hmackeys$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Projects$Hmackeys$Create, options: MethodOptions | BodyResponseCallback<Schema$HmacKey>, callback: BodyResponseCallback<Schema$HmacKey>): void;
        create(params: Params$Resource$Projects$Hmackeys$Create, callback: BodyResponseCallback<Schema$HmacKey>): void;
        create(callback: BodyResponseCallback<Schema$HmacKey>): void;
        /**
         * storage.projects.hmacKeys.delete
         * @desc Deletes an HMAC key.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *       'https://www.googleapis.com/auth/devstorage.read_write',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.projects.hmacKeys.delete({
         *     // Name of the HMAC key to be deleted.
         *     accessId: 'placeholder-value',
         *     // Project ID owning the requested key
         *     projectId: 'placeholder-value',
         *     // The project to be billed for this request.
         *     userProject: 'placeholder-value',
         *   });
         *   console.log(res.data);
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias storage.projects.hmacKeys.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.accessId Name of the HMAC key to be deleted.
         * @param {string} params.projectId Project ID owning the requested key
         * @param {string=} params.userProject The project to be billed for this request.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Projects$Hmackeys$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Projects$Hmackeys$Delete, options?: MethodOptions): GaxiosPromise<void>;
        delete(params: Params$Resource$Projects$Hmackeys$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Projects$Hmackeys$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Projects$Hmackeys$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * storage.projects.hmacKeys.get
         * @desc Retrieves an HMAC key's metadata
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *       'https://www.googleapis.com/auth/devstorage.read_only',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.projects.hmacKeys.get({
         *     // Name of the HMAC key.
         *     accessId: 'placeholder-value',
         *     // Project ID owning the service account of the requested key.
         *     projectId: 'placeholder-value',
         *     // The project to be billed for this request.
         *     userProject: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "accessId": "my_accessId",
         *   //   "etag": "my_etag",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "projectId": "my_projectId",
         *   //   "selfLink": "my_selfLink",
         *   //   "serviceAccountEmail": "my_serviceAccountEmail",
         *   //   "state": "my_state",
         *   //   "timeCreated": "my_timeCreated",
         *   //   "updated": "my_updated"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias storage.projects.hmacKeys.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.accessId Name of the HMAC key.
         * @param {string} params.projectId Project ID owning the service account of the requested key.
         * @param {string=} params.userProject The project to be billed for this request.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Projects$Hmackeys$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Projects$Hmackeys$Get, options?: MethodOptions): GaxiosPromise<Schema$HmacKeyMetadata>;
        get(params: Params$Resource$Projects$Hmackeys$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Projects$Hmackeys$Get, options: MethodOptions | BodyResponseCallback<Schema$HmacKeyMetadata>, callback: BodyResponseCallback<Schema$HmacKeyMetadata>): void;
        get(params: Params$Resource$Projects$Hmackeys$Get, callback: BodyResponseCallback<Schema$HmacKeyMetadata>): void;
        get(callback: BodyResponseCallback<Schema$HmacKeyMetadata>): void;
        /**
         * storage.projects.hmacKeys.list
         * @desc Retrieves a list of HMAC keys matching the criteria.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *       'https://www.googleapis.com/auth/devstorage.read_only',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.projects.hmacKeys.list({
         *     // Maximum number of items to return in a single page of responses. The service uses this parameter or 250 items, whichever is smaller. The max number of items per page will also be limited by the number of distinct service accounts in the response. If the number of service accounts in a single response is too high, the page will truncated and a next page token will be returned.
         *     maxResults: 'placeholder-value',
         *     // A previously-returned page token representing part of the larger set of results to view.
         *     pageToken: 'placeholder-value',
         *     // Name of the project in which to look for HMAC keys.
         *     projectId: 'placeholder-value',
         *     // If present, only keys for the given service account are returned.
         *     serviceAccountEmail: 'placeholder-value',
         *     // Whether or not to show keys in the DELETED state.
         *     showDeletedKeys: 'placeholder-value',
         *     // The project to be billed for this request.
         *     userProject: 'placeholder-value',
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
         * @alias storage.projects.hmacKeys.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.maxResults Maximum number of items to return in a single page of responses. The service uses this parameter or 250 items, whichever is smaller. The max number of items per page will also be limited by the number of distinct service accounts in the response. If the number of service accounts in a single response is too high, the page will truncated and a next page token will be returned.
         * @param {string=} params.pageToken A previously-returned page token representing part of the larger set of results to view.
         * @param {string} params.projectId Name of the project in which to look for HMAC keys.
         * @param {string=} params.serviceAccountEmail If present, only keys for the given service account are returned.
         * @param {boolean=} params.showDeletedKeys Whether or not to show keys in the DELETED state.
         * @param {string=} params.userProject The project to be billed for this request.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Projects$Hmackeys$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Projects$Hmackeys$List, options?: MethodOptions): GaxiosPromise<Schema$HmacKeysMetadata>;
        list(params: Params$Resource$Projects$Hmackeys$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Projects$Hmackeys$List, options: MethodOptions | BodyResponseCallback<Schema$HmacKeysMetadata>, callback: BodyResponseCallback<Schema$HmacKeysMetadata>): void;
        list(params: Params$Resource$Projects$Hmackeys$List, callback: BodyResponseCallback<Schema$HmacKeysMetadata>): void;
        list(callback: BodyResponseCallback<Schema$HmacKeysMetadata>): void;
        /**
         * storage.projects.hmacKeys.update
         * @desc Updates the state of an HMAC key. See the HMAC Key resource descriptor for valid states.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.projects.hmacKeys.update({
         *     // Name of the HMAC key being updated.
         *     accessId: 'placeholder-value',
         *     // Project ID owning the service account of the updated key.
         *     projectId: 'placeholder-value',
         *     // The project to be billed for this request.
         *     userProject: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "accessId": "my_accessId",
         *       //   "etag": "my_etag",
         *       //   "id": "my_id",
         *       //   "kind": "my_kind",
         *       //   "projectId": "my_projectId",
         *       //   "selfLink": "my_selfLink",
         *       //   "serviceAccountEmail": "my_serviceAccountEmail",
         *       //   "state": "my_state",
         *       //   "timeCreated": "my_timeCreated",
         *       //   "updated": "my_updated"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "accessId": "my_accessId",
         *   //   "etag": "my_etag",
         *   //   "id": "my_id",
         *   //   "kind": "my_kind",
         *   //   "projectId": "my_projectId",
         *   //   "selfLink": "my_selfLink",
         *   //   "serviceAccountEmail": "my_serviceAccountEmail",
         *   //   "state": "my_state",
         *   //   "timeCreated": "my_timeCreated",
         *   //   "updated": "my_updated"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias storage.projects.hmacKeys.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.accessId Name of the HMAC key being updated.
         * @param {string} params.projectId Project ID owning the service account of the updated key.
         * @param {string=} params.userProject The project to be billed for this request.
         * @param {().HmacKeyMetadata} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Projects$Hmackeys$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Projects$Hmackeys$Update, options?: MethodOptions): GaxiosPromise<Schema$HmacKeyMetadata>;
        update(params: Params$Resource$Projects$Hmackeys$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Projects$Hmackeys$Update, options: MethodOptions | BodyResponseCallback<Schema$HmacKeyMetadata>, callback: BodyResponseCallback<Schema$HmacKeyMetadata>): void;
        update(params: Params$Resource$Projects$Hmackeys$Update, callback: BodyResponseCallback<Schema$HmacKeyMetadata>): void;
        update(callback: BodyResponseCallback<Schema$HmacKeyMetadata>): void;
    }
    export interface Params$Resource$Projects$Hmackeys$Create extends StandardParameters {
        /**
         * Project ID owning the service account.
         */
        projectId?: string;
        /**
         * Email address of the service account.
         */
        serviceAccountEmail?: string;
        /**
         * The project to be billed for this request.
         */
        userProject?: string;
    }
    export interface Params$Resource$Projects$Hmackeys$Delete extends StandardParameters {
        /**
         * Name of the HMAC key to be deleted.
         */
        accessId?: string;
        /**
         * Project ID owning the requested key
         */
        projectId?: string;
        /**
         * The project to be billed for this request.
         */
        userProject?: string;
    }
    export interface Params$Resource$Projects$Hmackeys$Get extends StandardParameters {
        /**
         * Name of the HMAC key.
         */
        accessId?: string;
        /**
         * Project ID owning the service account of the requested key.
         */
        projectId?: string;
        /**
         * The project to be billed for this request.
         */
        userProject?: string;
    }
    export interface Params$Resource$Projects$Hmackeys$List extends StandardParameters {
        /**
         * Maximum number of items to return in a single page of responses. The service uses this parameter or 250 items, whichever is smaller. The max number of items per page will also be limited by the number of distinct service accounts in the response. If the number of service accounts in a single response is too high, the page will truncated and a next page token will be returned.
         */
        maxResults?: number;
        /**
         * A previously-returned page token representing part of the larger set of results to view.
         */
        pageToken?: string;
        /**
         * Name of the project in which to look for HMAC keys.
         */
        projectId?: string;
        /**
         * If present, only keys for the given service account are returned.
         */
        serviceAccountEmail?: string;
        /**
         * Whether or not to show keys in the DELETED state.
         */
        showDeletedKeys?: boolean;
        /**
         * The project to be billed for this request.
         */
        userProject?: string;
    }
    export interface Params$Resource$Projects$Hmackeys$Update extends StandardParameters {
        /**
         * Name of the HMAC key being updated.
         */
        accessId?: string;
        /**
         * Project ID owning the service account of the updated key.
         */
        projectId?: string;
        /**
         * The project to be billed for this request.
         */
        userProject?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$HmacKeyMetadata;
    }
    export class Resource$Projects$Serviceaccount {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * storage.projects.serviceAccount.get
         * @desc Get the email address of this project's Google Cloud Storage service account.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/storage.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const storage = google.storage('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloud-platform.read-only',
         *       'https://www.googleapis.com/auth/devstorage.full_control',
         *       'https://www.googleapis.com/auth/devstorage.read_only',
         *       'https://www.googleapis.com/auth/devstorage.read_write',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await storage.projects.serviceAccount.get({
         *     // Project ID
         *     projectId: 'placeholder-value',
         *     // The project to be billed for this request if the target bucket is requester-pays bucket.
         *     provisionalUserProject: 'placeholder-value',
         *     // The project to be billed for this request.
         *     userProject: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "email_address": "my_email_address",
         *   //   "kind": "my_kind"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias storage.projects.serviceAccount.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.projectId Project ID
         * @param {string=} params.provisionalUserProject The project to be billed for this request if the target bucket is requester-pays bucket.
         * @param {string=} params.userProject The project to be billed for this request.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Projects$Serviceaccount$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Projects$Serviceaccount$Get, options?: MethodOptions): GaxiosPromise<Schema$ServiceAccount>;
        get(params: Params$Resource$Projects$Serviceaccount$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Projects$Serviceaccount$Get, options: MethodOptions | BodyResponseCallback<Schema$ServiceAccount>, callback: BodyResponseCallback<Schema$ServiceAccount>): void;
        get(params: Params$Resource$Projects$Serviceaccount$Get, callback: BodyResponseCallback<Schema$ServiceAccount>): void;
        get(callback: BodyResponseCallback<Schema$ServiceAccount>): void;
    }
    export interface Params$Resource$Projects$Serviceaccount$Get extends StandardParameters {
        /**
         * Project ID
         */
        projectId?: string;
        /**
         * The project to be billed for this request if the target bucket is requester-pays bucket.
         */
        provisionalUserProject?: string;
        /**
         * The project to be billed for this request.
         */
        userProject?: string;
    }
    export {};
}
