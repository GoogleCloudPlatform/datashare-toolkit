/// <reference types="node" />
import { OAuth2Client, JWT, Compute, UserRefreshClient, GaxiosPromise, GoogleConfigurable, MethodOptions, StreamMethodOptions, GlobalOptions, GoogleAuth, BodyResponseCallback, APIRequestContext } from 'googleapis-common';
import { Readable } from 'stream';
export declare namespace firestore_v1 {
    export interface Options extends GlobalOptions {
        version: 'v1';
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
     * Cloud Firestore API
     *
     * Accesses the NoSQL document database built for automatic scaling, high performance, and ease of application development.
     *
     * @example
     * const {google} = require('googleapis');
     * const firestore = google.firestore('v1');
     *
     * @namespace firestore
     * @type {Function}
     * @version v1
     * @variation v1
     * @param {object=} options Options for Firestore
     */
    export class Firestore {
        context: APIRequestContext;
        projects: Resource$Projects;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
    }
    /**
     * An array value.
     */
    export interface Schema$ArrayValue {
        /**
         * Values in the array.
         */
        values?: Schema$Value[];
    }
    /**
     * The request for Firestore.BatchGetDocuments.
     */
    export interface Schema$BatchGetDocumentsRequest {
        /**
         * The names of the documents to retrieve. In the format: `projects/{project_id}/databases/{database_id}/documents/{document_path}`. The request will fail if any of the document is not a child resource of the given `database`. Duplicate names will be elided.
         */
        documents?: string[] | null;
        /**
         * The fields to return. If not set, returns all fields.  If a document has a field that is not present in this mask, that field will not be returned in the response.
         */
        mask?: Schema$DocumentMask;
        /**
         * Starts a new transaction and reads the documents. Defaults to a read-only transaction. The new transaction ID will be returned as the first response in the stream.
         */
        newTransaction?: Schema$TransactionOptions;
        /**
         * Reads documents as they were at the given time. This may not be older than 270 seconds.
         */
        readTime?: string | null;
        /**
         * Reads documents in a transaction.
         */
        transaction?: string | null;
    }
    /**
     * The streamed response for Firestore.BatchGetDocuments.
     */
    export interface Schema$BatchGetDocumentsResponse {
        /**
         * A document that was requested.
         */
        found?: Schema$Document;
        /**
         * A document name that was requested but does not exist. In the format: `projects/{project_id}/databases/{database_id}/documents/{document_path}`.
         */
        missing?: string | null;
        /**
         * The time at which the document was read. This may be monotically increasing, in this case the previous documents in the result stream are guaranteed not to have changed between their read_time and this one.
         */
        readTime?: string | null;
        /**
         * The transaction that was started as part of this request. Will only be set in the first response, and only if BatchGetDocumentsRequest.new_transaction was set in the request.
         */
        transaction?: string | null;
    }
    /**
     * The request for Firestore.BeginTransaction.
     */
    export interface Schema$BeginTransactionRequest {
        /**
         * The options for the transaction. Defaults to a read-write transaction.
         */
        options?: Schema$TransactionOptions;
    }
    /**
     * The response for Firestore.BeginTransaction.
     */
    export interface Schema$BeginTransactionResponse {
        /**
         * The transaction that was started.
         */
        transaction?: string | null;
    }
    /**
     * A selection of a collection, such as `messages as m1`.
     */
    export interface Schema$CollectionSelector {
        /**
         * When false, selects only collections that are immediate children of the `parent` specified in the containing `RunQueryRequest`. When true, selects all descendant collections.
         */
        allDescendants?: boolean | null;
        /**
         * The collection ID. When set, selects only collections with this ID.
         */
        collectionId?: string | null;
    }
    /**
     * The request for Firestore.Commit.
     */
    export interface Schema$CommitRequest {
        /**
         * If set, applies all writes in this transaction, and commits it.
         */
        transaction?: string | null;
        /**
         * The writes to apply.  Always executed atomically and in order.
         */
        writes?: Schema$Write[];
    }
    /**
     * The response for Firestore.Commit.
     */
    export interface Schema$CommitResponse {
        /**
         * The time at which the commit occurred. Any read with an equal or greater `read_time` is guaranteed to see the effects of the commit.
         */
        commitTime?: string | null;
        /**
         * The result of applying the writes.  This i-th write result corresponds to the i-th write in the request.
         */
        writeResults?: Schema$WriteResult[];
    }
    /**
     * A filter that merges multiple other filters using the given operator.
     */
    export interface Schema$CompositeFilter {
        /**
         * The list of filters to combine. Must contain at least one filter.
         */
        filters?: Schema$Filter[];
        /**
         * The operator for combining multiple filters.
         */
        op?: string | null;
    }
    /**
     * A position in a query result set.
     */
    export interface Schema$Cursor {
        /**
         * If the position is just before or just after the given values, relative to the sort order defined by the query.
         */
        before?: boolean | null;
        /**
         * The values that represent a position, in the order they appear in the order by clause of a query.  Can contain fewer values than specified in the order by clause.
         */
        values?: Schema$Value[];
    }
    /**
     * A Firestore document.  Must not exceed 1 MiB - 4 bytes.
     */
    export interface Schema$Document {
        /**
         * Output only. The time at which the document was created.  This value increases monotonically when a document is deleted then recreated. It can also be compared to values from other documents and the `read_time` of a query.
         */
        createTime?: string | null;
        /**
         * The document&#39;s fields.  The map keys represent field names.  A simple field name contains only characters `a` to `z`, `A` to `Z`, `0` to `9`, or `_`, and must not start with `0` to `9`. For example, `foo_bar_17`.  Field names matching the regular expression `__.*__` are reserved. Reserved field names are forbidden except in certain documented contexts. The map keys, represented as UTF-8, must not exceed 1,500 bytes and cannot be empty.  Field paths may be used in other contexts to refer to structured fields defined here. For `map_value`, the field path is represented by the simple or quoted field names of the containing fields, delimited by `.`. For example, the structured field `&quot;foo&quot; : { map_value: { &quot;x&amp;y&quot; : { string_value: &quot;hello&quot; }}}` would be represented by the field path `foo.x&amp;y`.  Within a field path, a quoted field name starts and ends with `` ` `` and may contain any character. Some characters, including `` ` ``, must be escaped using a `\`. For example, `` `x&amp;y` `` represents `x&amp;y` and `` `bak\`tik` `` represents `` bak`tik ``.
         */
        fields?: {
            [key: string]: Schema$Value;
        } | null;
        /**
         * The resource name of the document, for example `projects/{project_id}/databases/{database_id}/documents/{document_path}`.
         */
        name?: string | null;
        /**
         * Output only. The time at which the document was last changed.  This value is initially set to the `create_time` then increases monotonically with each change to the document. It can also be compared to values from other documents and the `read_time` of a query.
         */
        updateTime?: string | null;
    }
    /**
     * A Document has changed.  May be the result of multiple writes, including deletes, that ultimately resulted in a new value for the Document.  Multiple DocumentChange messages may be returned for the same logical change, if multiple targets are affected.
     */
    export interface Schema$DocumentChange {
        /**
         * The new state of the Document.  If `mask` is set, contains only fields that were updated or added.
         */
        document?: Schema$Document;
        /**
         * A set of target IDs for targets that no longer match this document.
         */
        removedTargetIds?: number[] | null;
        /**
         * A set of target IDs of targets that match this document.
         */
        targetIds?: number[] | null;
    }
    /**
     * A Document has been deleted.  May be the result of multiple writes, including updates, the last of which deleted the Document.  Multiple DocumentDelete messages may be returned for the same logical delete, if multiple targets are affected.
     */
    export interface Schema$DocumentDelete {
        /**
         * The resource name of the Document that was deleted.
         */
        document?: string | null;
        /**
         * The read timestamp at which the delete was observed.  Greater or equal to the `commit_time` of the delete.
         */
        readTime?: string | null;
        /**
         * A set of target IDs for targets that previously matched this entity.
         */
        removedTargetIds?: number[] | null;
    }
    /**
     * A set of field paths on a document. Used to restrict a get or update operation on a document to a subset of its fields. This is different from standard field masks, as this is always scoped to a Document, and takes in account the dynamic nature of Value.
     */
    export interface Schema$DocumentMask {
        /**
         * The list of field paths in the mask. See Document.fields for a field path syntax reference.
         */
        fieldPaths?: string[] | null;
    }
    /**
     * A Document has been removed from the view of the targets.  Sent if the document is no longer relevant to a target and is out of view. Can be sent instead of a DocumentDelete or a DocumentChange if the server can not send the new value of the document.  Multiple DocumentRemove messages may be returned for the same logical write or delete, if multiple targets are affected.
     */
    export interface Schema$DocumentRemove {
        /**
         * The resource name of the Document that has gone out of view.
         */
        document?: string | null;
        /**
         * The read timestamp at which the remove was observed.  Greater or equal to the `commit_time` of the change/delete/remove.
         */
        readTime?: string | null;
        /**
         * A set of target IDs for targets that previously matched this document.
         */
        removedTargetIds?: number[] | null;
    }
    /**
     * A target specified by a set of documents names.
     */
    export interface Schema$DocumentsTarget {
        /**
         * The names of the documents to retrieve. In the format: `projects/{project_id}/databases/{database_id}/documents/{document_path}`. The request will fail if any of the document is not a child resource of the given `database`. Duplicate names will be elided.
         */
        documents?: string[] | null;
    }
    /**
     * A transformation of a document.
     */
    export interface Schema$DocumentTransform {
        /**
         * The name of the document to transform.
         */
        document?: string | null;
        /**
         * The list of transformations to apply to the fields of the document, in order. This must not be empty.
         */
        fieldTransforms?: Schema$FieldTransform[];
    }
    /**
     * A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance:      service Foo {       rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty);     }  The JSON representation for `Empty` is empty JSON object `{}`.
     */
    export interface Schema$Empty {
    }
    /**
     * A digest of all the documents that match a given target.
     */
    export interface Schema$ExistenceFilter {
        /**
         * The total count of documents that match target_id.  If different from the count of documents in the client that match, the client must manually determine which documents no longer match the target.
         */
        count?: number | null;
        /**
         * The target ID to which this filter applies.
         */
        targetId?: number | null;
    }
    /**
     * A filter on a specific field.
     */
    export interface Schema$FieldFilter {
        /**
         * The field to filter by.
         */
        field?: Schema$FieldReference;
        /**
         * The operator to filter by.
         */
        op?: string | null;
        /**
         * The value to compare to.
         */
        value?: Schema$Value;
    }
    /**
     * A reference to a field, such as `max(messages.time) as max_time`.
     */
    export interface Schema$FieldReference {
        fieldPath?: string | null;
    }
    /**
     * A transformation of a field of the document.
     */
    export interface Schema$FieldTransform {
        /**
         * Append the given elements in order if they are not already present in the current field value. If the field is not an array, or if the field does not yet exist, it is first set to the empty array.  Equivalent numbers of different types (e.g. 3L and 3.0) are considered equal when checking if a value is missing. NaN is equal to NaN, and Null is equal to Null. If the input contains multiple equivalent values, only the first will be considered.  The corresponding transform_result will be the null value.
         */
        appendMissingElements?: Schema$ArrayValue;
        /**
         * The path of the field. See Document.fields for the field path syntax reference.
         */
        fieldPath?: string | null;
        /**
         * Adds the given value to the field&#39;s current value.  This must be an integer or a double value. If the field is not an integer or double, or if the field does not yet exist, the transformation will set the field to the given value. If either of the given value or the current field value are doubles, both values will be interpreted as doubles. Double arithmetic and representation of double values follow IEEE 754 semantics. If there is positive/negative integer overflow, the field is resolved to the largest magnitude positive/negative integer.
         */
        increment?: Schema$Value;
        /**
         * Sets the field to the maximum of its current value and the given value.  This must be an integer or a double value. If the field is not an integer or double, or if the field does not yet exist, the transformation will set the field to the given value. If a maximum operation is applied where the field and the input value are of mixed types (that is - one is an integer and one is a double) the field takes on the type of the larger operand. If the operands are equivalent (e.g. 3 and 3.0), the field does not change. 0, 0.0, and -0.0 are all zero. The maximum of a zero stored value and zero input value is always the stored value. The maximum of any numeric value x and NaN is NaN.
         */
        maximum?: Schema$Value;
        /**
         * Sets the field to the minimum of its current value and the given value.  This must be an integer or a double value. If the field is not an integer or double, or if the field does not yet exist, the transformation will set the field to the input value. If a minimum operation is applied where the field and the input value are of mixed types (that is - one is an integer and one is a double) the field takes on the type of the smaller operand. If the operands are equivalent (e.g. 3 and 3.0), the field does not change. 0, 0.0, and -0.0 are all zero. The minimum of a zero stored value and zero input value is always the stored value. The minimum of any numeric value x and NaN is NaN.
         */
        minimum?: Schema$Value;
        /**
         * Remove all of the given elements from the array in the field. If the field is not an array, or if the field does not yet exist, it is set to the empty array.  Equivalent numbers of the different types (e.g. 3L and 3.0) are considered equal when deciding whether an element should be removed. NaN is equal to NaN, and Null is equal to Null. This will remove all equivalent values if there are duplicates.  The corresponding transform_result will be the null value.
         */
        removeAllFromArray?: Schema$ArrayValue;
        /**
         * Sets the field to the given server value.
         */
        setToServerValue?: string | null;
    }
    /**
     * A filter.
     */
    export interface Schema$Filter {
        /**
         * A composite filter.
         */
        compositeFilter?: Schema$CompositeFilter;
        /**
         * A filter on a document field.
         */
        fieldFilter?: Schema$FieldFilter;
        /**
         * A filter that takes exactly one argument.
         */
        unaryFilter?: Schema$UnaryFilter;
    }
    /**
     * Metadata for google.longrunning.Operation results from FirestoreAdmin.ExportDocuments.
     */
    export interface Schema$GoogleFirestoreAdminV1ExportDocumentsMetadata {
        /**
         * Which collection ids are being exported.
         */
        collectionIds?: string[] | null;
        /**
         * The time this operation completed. Will be unset if operation still in progress.
         */
        endTime?: string | null;
        /**
         * The state of the export operation.
         */
        operationState?: string | null;
        /**
         * Where the entities are being exported to.
         */
        outputUriPrefix?: string | null;
        /**
         * The progress, in bytes, of this operation.
         */
        progressBytes?: Schema$GoogleFirestoreAdminV1Progress;
        /**
         * The progress, in documents, of this operation.
         */
        progressDocuments?: Schema$GoogleFirestoreAdminV1Progress;
        /**
         * The time this operation started.
         */
        startTime?: string | null;
    }
    /**
     * The request for FirestoreAdmin.ExportDocuments.
     */
    export interface Schema$GoogleFirestoreAdminV1ExportDocumentsRequest {
        /**
         * Which collection ids to export. Unspecified means all collections.
         */
        collectionIds?: string[] | null;
        /**
         * The output URI. Currently only supports Google Cloud Storage URIs of the form: `gs://BUCKET_NAME[/NAMESPACE_PATH]`, where `BUCKET_NAME` is the name of the Google Cloud Storage bucket and `NAMESPACE_PATH` is an optional Google Cloud Storage namespace path. When choosing a name, be sure to consider Google Cloud Storage naming guidelines: https://cloud.google.com/storage/docs/naming. If the URI is a bucket (without a namespace path), a prefix will be generated based on the start time.
         */
        outputUriPrefix?: string | null;
    }
    /**
     * Returned in the google.longrunning.Operation response field.
     */
    export interface Schema$GoogleFirestoreAdminV1ExportDocumentsResponse {
        /**
         * Location of the output files. This can be used to begin an import into Cloud Firestore (this project or another project) after the operation completes successfully.
         */
        outputUriPrefix?: string | null;
    }
    /**
     * Represents a single field in the database.  Fields are grouped by their &quot;Collection Group&quot;, which represent all collections in the database with the same id.
     */
    export interface Schema$GoogleFirestoreAdminV1Field {
        /**
         * The index configuration for this field. If unset, field indexing will revert to the configuration defined by the `ancestor_field`. To explicitly remove all indexes for this field, specify an index config with an empty list of indexes.
         */
        indexConfig?: Schema$GoogleFirestoreAdminV1IndexConfig;
        /**
         * A field name of the form `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/fields/{field_path}`  A field path may be a simple field name, e.g. `address` or a path to fields within map_value , e.g. `address.city`, or a special field path. The only valid special field is `*`, which represents any field.  Field paths may be quoted using ` (backtick). The only character that needs to be escaped within a quoted field path is the backtick character itself, escaped using a backslash. Special characters in field paths that must be quoted include: `*`, `.`, ``` (backtick), `[`, `]`, as well as any ascii symbolic characters.  Examples: (Note: Comments here are written in markdown syntax, so there is an  additional layer of backticks to represent a code block) `\`address.city\`` represents a field named `address.city`, not the map key `city` in the field `address`. `\`*\`` represents a field named `*`, not any field.  A special `Field` contains the default indexing settings for all fields. This field&#39;s resource name is: `projects/{project_id}/databases/{database_id}/collectionGroups/__default__/fields/x Indexes defined on this `Field` will be applied to all fields which do not have their own `Field` index configuration.
         */
        name?: string | null;
    }
    /**
     * Metadata for google.longrunning.Operation results from FirestoreAdmin.UpdateField.
     */
    export interface Schema$GoogleFirestoreAdminV1FieldOperationMetadata {
        /**
         * The time this operation completed. Will be unset if operation still in progress.
         */
        endTime?: string | null;
        /**
         * The field resource that this operation is acting on. For example: `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/fields/{field_path}`
         */
        field?: string | null;
        /**
         * A list of IndexConfigDelta, which describe the intent of this operation.
         */
        indexConfigDeltas?: Schema$GoogleFirestoreAdminV1IndexConfigDelta[];
        /**
         * The progress, in bytes, of this operation.
         */
        progressBytes?: Schema$GoogleFirestoreAdminV1Progress;
        /**
         * The progress, in documents, of this operation.
         */
        progressDocuments?: Schema$GoogleFirestoreAdminV1Progress;
        /**
         * The time this operation started.
         */
        startTime?: string | null;
        /**
         * The state of the operation.
         */
        state?: string | null;
    }
    /**
     * Metadata for google.longrunning.Operation results from FirestoreAdmin.ImportDocuments.
     */
    export interface Schema$GoogleFirestoreAdminV1ImportDocumentsMetadata {
        /**
         * Which collection ids are being imported.
         */
        collectionIds?: string[] | null;
        /**
         * The time this operation completed. Will be unset if operation still in progress.
         */
        endTime?: string | null;
        /**
         * The location of the documents being imported.
         */
        inputUriPrefix?: string | null;
        /**
         * The state of the import operation.
         */
        operationState?: string | null;
        /**
         * The progress, in bytes, of this operation.
         */
        progressBytes?: Schema$GoogleFirestoreAdminV1Progress;
        /**
         * The progress, in documents, of this operation.
         */
        progressDocuments?: Schema$GoogleFirestoreAdminV1Progress;
        /**
         * The time this operation started.
         */
        startTime?: string | null;
    }
    /**
     * The request for FirestoreAdmin.ImportDocuments.
     */
    export interface Schema$GoogleFirestoreAdminV1ImportDocumentsRequest {
        /**
         * Which collection ids to import. Unspecified means all collections included in the import.
         */
        collectionIds?: string[] | null;
        /**
         * Location of the exported files. This must match the output_uri_prefix of an ExportDocumentsResponse from an export that has completed successfully. See: google.firestore.admin.v1.ExportDocumentsResponse.output_uri_prefix.
         */
        inputUriPrefix?: string | null;
    }
    /**
     * Cloud Firestore indexes enable simple and complex queries against documents in a database.
     */
    export interface Schema$GoogleFirestoreAdminV1Index {
        /**
         * The fields supported by this index.  For composite indexes, this is always 2 or more fields. The last field entry is always for the field path `__name__`. If, on creation, `__name__` was not specified as the last field, it will be added automatically with the same direction as that of the last field defined. If the final field in a composite index is not directional, the `__name__` will be ordered ASCENDING (unless explicitly specified).  For single field indexes, this will always be exactly one entry with a field path equal to the field path of the associated field.
         */
        fields?: Schema$GoogleFirestoreAdminV1IndexField[];
        /**
         * Output only. A server defined name for this index. The form of this name for composite indexes will be: `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/indexes/{composite_index_id}` For single field indexes, this field will be empty.
         */
        name?: string | null;
        /**
         * Indexes with a collection query scope specified allow queries against a collection that is the child of a specific document, specified at query time, and that has the same collection id.  Indexes with a collection group query scope specified allow queries against all collections descended from a specific document, specified at query time, and that have the same collection id as this index.
         */
        queryScope?: string | null;
        /**
         * Output only. The serving state of the index.
         */
        state?: string | null;
    }
    /**
     * The index configuration for this field.
     */
    export interface Schema$GoogleFirestoreAdminV1IndexConfig {
        /**
         * Output only. Specifies the resource name of the `Field` from which this field&#39;s index configuration is set (when `uses_ancestor_config` is true), or from which it *would* be set if this field had no index configuration (when `uses_ancestor_config` is false).
         */
        ancestorField?: string | null;
        /**
         * The indexes supported for this field.
         */
        indexes?: Schema$GoogleFirestoreAdminV1Index[];
        /**
         * Output only When true, the `Field`&#39;s index configuration is in the process of being reverted. Once complete, the index config will transition to the same state as the field specified by `ancestor_field`, at which point `uses_ancestor_config` will be `true` and `reverting` will be `false`.
         */
        reverting?: boolean | null;
        /**
         * Output only. When true, the `Field`&#39;s index configuration is set from the configuration specified by the `ancestor_field`. When false, the `Field`&#39;s index configuration is defined explicitly.
         */
        usesAncestorConfig?: boolean | null;
    }
    /**
     * Information about an index configuration change.
     */
    export interface Schema$GoogleFirestoreAdminV1IndexConfigDelta {
        /**
         * Specifies how the index is changing.
         */
        changeType?: string | null;
        /**
         * The index being changed.
         */
        index?: Schema$GoogleFirestoreAdminV1Index;
    }
    /**
     * A field in an index. The field_path describes which field is indexed, the value_mode describes how the field value is indexed.
     */
    export interface Schema$GoogleFirestoreAdminV1IndexField {
        /**
         * Indicates that this field supports operations on `array_value`s.
         */
        arrayConfig?: string | null;
        /**
         * Can be __name__. For single field indexes, this must match the name of the field or may be omitted.
         */
        fieldPath?: string | null;
        /**
         * Indicates that this field supports ordering by the specified order or comparing using =, &lt;, &lt;=, &gt;, &gt;=.
         */
        order?: string | null;
    }
    /**
     * Metadata for google.longrunning.Operation results from FirestoreAdmin.CreateIndex.
     */
    export interface Schema$GoogleFirestoreAdminV1IndexOperationMetadata {
        /**
         * The time this operation completed. Will be unset if operation still in progress.
         */
        endTime?: string | null;
        /**
         * The index resource that this operation is acting on. For example: `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/indexes/{index_id}`
         */
        index?: string | null;
        /**
         * The progress, in bytes, of this operation.
         */
        progressBytes?: Schema$GoogleFirestoreAdminV1Progress;
        /**
         * The progress, in documents, of this operation.
         */
        progressDocuments?: Schema$GoogleFirestoreAdminV1Progress;
        /**
         * The time this operation started.
         */
        startTime?: string | null;
        /**
         * The state of the operation.
         */
        state?: string | null;
    }
    /**
     * The response for FirestoreAdmin.ListFields.
     */
    export interface Schema$GoogleFirestoreAdminV1ListFieldsResponse {
        /**
         * The requested fields.
         */
        fields?: Schema$GoogleFirestoreAdminV1Field[];
        /**
         * A page token that may be used to request another page of results. If blank, this is the last page.
         */
        nextPageToken?: string | null;
    }
    /**
     * The response for FirestoreAdmin.ListIndexes.
     */
    export interface Schema$GoogleFirestoreAdminV1ListIndexesResponse {
        /**
         * The requested indexes.
         */
        indexes?: Schema$GoogleFirestoreAdminV1Index[];
        /**
         * A page token that may be used to request another page of results. If blank, this is the last page.
         */
        nextPageToken?: string | null;
    }
    /**
     * The metadata message for google.cloud.location.Location.metadata.
     */
    export interface Schema$GoogleFirestoreAdminV1LocationMetadata {
    }
    /**
     * Describes the progress of the operation. Unit of work is generic and must be interpreted based on where Progress is used.
     */
    export interface Schema$GoogleFirestoreAdminV1Progress {
        /**
         * The amount of work completed.
         */
        completedWork?: string | null;
        /**
         * The amount of work estimated.
         */
        estimatedWork?: string | null;
    }
    /**
     * The request message for Operations.CancelOperation.
     */
    export interface Schema$GoogleLongrunningCancelOperationRequest {
    }
    /**
     * The response message for Operations.ListOperations.
     */
    export interface Schema$GoogleLongrunningListOperationsResponse {
        /**
         * The standard List next-page token.
         */
        nextPageToken?: string | null;
        /**
         * A list of operations that matches the specified filter in the request.
         */
        operations?: Schema$GoogleLongrunningOperation[];
    }
    /**
     * This resource represents a long-running operation that is the result of a network API call.
     */
    export interface Schema$GoogleLongrunningOperation {
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
        metadata?: {
            [key: string]: any;
        } | null;
        /**
         * The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`.
         */
        name?: string | null;
        /**
         * The normal response of the operation in case of success.  If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`.  If the original method is standard `Get`/`Create`/`Update`, the response should be the resource.  For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name.  For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`.
         */
        response?: {
            [key: string]: any;
        } | null;
    }
    /**
     * An object representing a latitude/longitude pair. This is expressed as a pair of doubles representing degrees latitude and degrees longitude. Unless specified otherwise, this must conform to the &lt;a href=&quot;http://www.unoosa.org/pdf/icg/2012/template/WGS_84.pdf&quot;&gt;WGS84 standard&lt;/a&gt;. Values must be within normalized ranges.
     */
    export interface Schema$LatLng {
        /**
         * The latitude in degrees. It must be in the range [-90.0, +90.0].
         */
        latitude?: number | null;
        /**
         * The longitude in degrees. It must be in the range [-180.0, +180.0].
         */
        longitude?: number | null;
    }
    /**
     * The request for Firestore.ListCollectionIds.
     */
    export interface Schema$ListCollectionIdsRequest {
        /**
         * The maximum number of results to return.
         */
        pageSize?: number | null;
        /**
         * A page token. Must be a value from ListCollectionIdsResponse.
         */
        pageToken?: string | null;
    }
    /**
     * The response from Firestore.ListCollectionIds.
     */
    export interface Schema$ListCollectionIdsResponse {
        /**
         * The collection ids.
         */
        collectionIds?: string[] | null;
        /**
         * A page token that may be used to continue the list.
         */
        nextPageToken?: string | null;
    }
    /**
     * The response for Firestore.ListDocuments.
     */
    export interface Schema$ListDocumentsResponse {
        /**
         * The Documents found.
         */
        documents?: Schema$Document[];
        /**
         * The next page token.
         */
        nextPageToken?: string | null;
    }
    /**
     * A request for Firestore.Listen
     */
    export interface Schema$ListenRequest {
        /**
         * A target to add to this stream.
         */
        addTarget?: Schema$Target;
        /**
         * Labels associated with this target change.
         */
        labels?: {
            [key: string]: string;
        } | null;
        /**
         * The ID of a target to remove from this stream.
         */
        removeTarget?: number | null;
    }
    /**
     * The response for Firestore.Listen.
     */
    export interface Schema$ListenResponse {
        /**
         * A Document has changed.
         */
        documentChange?: Schema$DocumentChange;
        /**
         * A Document has been deleted.
         */
        documentDelete?: Schema$DocumentDelete;
        /**
         * A Document has been removed from a target (because it is no longer relevant to that target).
         */
        documentRemove?: Schema$DocumentRemove;
        /**
         * A filter to apply to the set of documents previously returned for the given target.  Returned when documents may have been removed from the given target, but the exact documents are unknown.
         */
        filter?: Schema$ExistenceFilter;
        /**
         * Targets have changed.
         */
        targetChange?: Schema$TargetChange;
    }
    /**
     * The response message for Locations.ListLocations.
     */
    export interface Schema$ListLocationsResponse {
        /**
         * A list of locations that matches the specified filter in the request.
         */
        locations?: Schema$Location[];
        /**
         * The standard List next-page token.
         */
        nextPageToken?: string | null;
    }
    /**
     * A resource that represents Google Cloud Platform location.
     */
    export interface Schema$Location {
        /**
         * The friendly name for this location, typically a nearby city name. For example, &quot;Tokyo&quot;.
         */
        displayName?: string | null;
        /**
         * Cross-service attributes for the location. For example      {&quot;cloud.googleapis.com/region&quot;: &quot;us-east1&quot;}
         */
        labels?: {
            [key: string]: string;
        } | null;
        /**
         * The canonical id for this location. For example: `&quot;us-east1&quot;`.
         */
        locationId?: string | null;
        /**
         * Service-specific metadata. For example the available capacity at the given location.
         */
        metadata?: {
            [key: string]: any;
        } | null;
        /**
         * Resource name for the location, which may vary between implementations. For example: `&quot;projects/example-project/locations/us-east1&quot;`
         */
        name?: string | null;
    }
    /**
     * A map value.
     */
    export interface Schema$MapValue {
        /**
         * The map&#39;s fields.  The map keys represent field names. Field names matching the regular expression `__.*__` are reserved. Reserved field names are forbidden except in certain documented contexts. The map keys, represented as UTF-8, must not exceed 1,500 bytes and cannot be empty.
         */
        fields?: {
            [key: string]: Schema$Value;
        } | null;
    }
    /**
     * An order on a field.
     */
    export interface Schema$Order {
        /**
         * The direction to order by. Defaults to `ASCENDING`.
         */
        direction?: string | null;
        /**
         * The field to order by.
         */
        field?: Schema$FieldReference;
    }
    /**
     * A precondition on a document, used for conditional operations.
     */
    export interface Schema$Precondition {
        /**
         * When set to `true`, the target document must exist. When set to `false`, the target document must not exist.
         */
        exists?: boolean | null;
        /**
         * When set, the target document must exist and have been last updated at that time.
         */
        updateTime?: string | null;
    }
    /**
     * The projection of document&#39;s fields to return.
     */
    export interface Schema$Projection {
        /**
         * The fields to return.  If empty, all fields are returned. To only return the name of the document, use `[&#39;__name__&#39;]`.
         */
        fields?: Schema$FieldReference[];
    }
    /**
     * A target specified by a query.
     */
    export interface Schema$QueryTarget {
        /**
         * The parent resource name. In the format: `projects/{project_id}/databases/{database_id}/documents` or `projects/{project_id}/databases/{database_id}/documents/{document_path}`. For example: `projects/my-project/databases/my-database/documents` or `projects/my-project/databases/my-database/documents/chatrooms/my-chatroom`
         */
        parent?: string | null;
        /**
         * A structured query.
         */
        structuredQuery?: Schema$StructuredQuery;
    }
    /**
     * Options for a transaction that can only be used to read documents.
     */
    export interface Schema$ReadOnly {
        /**
         * Reads documents at the given time. This may not be older than 60 seconds.
         */
        readTime?: string | null;
    }
    /**
     * Options for a transaction that can be used to read and write documents.
     */
    export interface Schema$ReadWrite {
        /**
         * An optional transaction to retry.
         */
        retryTransaction?: string | null;
    }
    /**
     * The request for Firestore.Rollback.
     */
    export interface Schema$RollbackRequest {
        /**
         * Required. The transaction to roll back.
         */
        transaction?: string | null;
    }
    /**
     * The request for Firestore.RunQuery.
     */
    export interface Schema$RunQueryRequest {
        /**
         * Starts a new transaction and reads the documents. Defaults to a read-only transaction. The new transaction ID will be returned as the first response in the stream.
         */
        newTransaction?: Schema$TransactionOptions;
        /**
         * Reads documents as they were at the given time. This may not be older than 270 seconds.
         */
        readTime?: string | null;
        /**
         * A structured query.
         */
        structuredQuery?: Schema$StructuredQuery;
        /**
         * Reads documents in a transaction.
         */
        transaction?: string | null;
    }
    /**
     * The response for Firestore.RunQuery.
     */
    export interface Schema$RunQueryResponse {
        /**
         * A query result. Not set when reporting partial progress.
         */
        document?: Schema$Document;
        /**
         * The time at which the document was read. This may be monotonically increasing; in this case, the previous documents in the result stream are guaranteed not to have changed between their `read_time` and this one.  If the query returns no results, a response with `read_time` and no `document` will be sent, and this represents the time at which the query was run.
         */
        readTime?: string | null;
        /**
         * The number of results that have been skipped due to an offset between the last response and the current response.
         */
        skippedResults?: number | null;
        /**
         * The transaction that was started as part of this request. Can only be set in the first response, and only if RunQueryRequest.new_transaction was set in the request. If set, no other fields will be set in this response.
         */
        transaction?: string | null;
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
        details?: Array<{
            [key: string]: any;
        }> | null;
        /**
         * A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.
         */
        message?: string | null;
    }
    /**
     * A Firestore query.
     */
    export interface Schema$StructuredQuery {
        /**
         * A end point for the query results.
         */
        endAt?: Schema$Cursor;
        /**
         * The collections to query.
         */
        from?: Schema$CollectionSelector[];
        /**
         * The maximum number of results to return.  Applies after all other constraints. Must be &gt;= 0 if specified.
         */
        limit?: number | null;
        /**
         * The number of results to skip.  Applies before limit, but after all other constraints. Must be &gt;= 0 if specified.
         */
        offset?: number | null;
        /**
         * The order to apply to the query results.  Firestore guarantees a stable ordering through the following rules:   * Any field required to appear in `order_by`, that is not already    specified in `order_by`, is appended to the order in field name order    by default.  * If an order on `__name__` is not specified, it is appended by default.  Fields are appended with the same sort direction as the last order specified, or &#39;ASCENDING&#39; if no order was specified. For example:   * `SELECT * FROM Foo ORDER BY A` becomes    `SELECT * FROM Foo ORDER BY A, __name__`  * `SELECT * FROM Foo ORDER BY A DESC` becomes    `SELECT * FROM Foo ORDER BY A DESC, __name__ DESC`  * `SELECT * FROM Foo WHERE A &gt; 1` becomes    `SELECT * FROM Foo WHERE A &gt; 1 ORDER BY A, __name__`
         */
        orderBy?: Schema$Order[];
        /**
         * The projection to return.
         */
        select?: Schema$Projection;
        /**
         * A starting point for the query results.
         */
        startAt?: Schema$Cursor;
        /**
         * The filter to apply.
         */
        where?: Schema$Filter;
    }
    /**
     * A specification of a set of documents to listen to.
     */
    export interface Schema$Target {
        /**
         * A target specified by a set of document names.
         */
        documents?: Schema$DocumentsTarget;
        /**
         * If the target should be removed once it is current and consistent.
         */
        once?: boolean | null;
        /**
         * A target specified by a query.
         */
        query?: Schema$QueryTarget;
        /**
         * Start listening after a specific `read_time`.  The client must know the state of matching documents at this time.
         */
        readTime?: string | null;
        /**
         * A resume token from a prior TargetChange for an identical target.  Using a resume token with a different target is unsupported and may fail.
         */
        resumeToken?: string | null;
        /**
         * The target ID that identifies the target on the stream. Must be a positive number and non-zero.
         */
        targetId?: number | null;
    }
    /**
     * Targets being watched have changed.
     */
    export interface Schema$TargetChange {
        /**
         * The error that resulted in this change, if applicable.
         */
        cause?: Schema$Status;
        /**
         * The consistent `read_time` for the given `target_ids` (omitted when the target_ids are not at a consistent snapshot).  The stream is guaranteed to send a `read_time` with `target_ids` empty whenever the entire stream reaches a new consistent snapshot. ADD, CURRENT, and RESET messages are guaranteed to (eventually) result in a new consistent snapshot (while NO_CHANGE and REMOVE messages are not).  For a given stream, `read_time` is guaranteed to be monotonically increasing.
         */
        readTime?: string | null;
        /**
         * A token that can be used to resume the stream for the given `target_ids`, or all targets if `target_ids` is empty.  Not set on every target change.
         */
        resumeToken?: string | null;
        /**
         * The type of change that occurred.
         */
        targetChangeType?: string | null;
        /**
         * The target IDs of targets that have changed.  If empty, the change applies to all targets.  The order of the target IDs is not defined.
         */
        targetIds?: number[] | null;
    }
    /**
     * Options for creating a new transaction.
     */
    export interface Schema$TransactionOptions {
        /**
         * The transaction can only be used for read operations.
         */
        readOnly?: Schema$ReadOnly;
        /**
         * The transaction can be used for both read and write operations.
         */
        readWrite?: Schema$ReadWrite;
    }
    /**
     * A filter with a single operand.
     */
    export interface Schema$UnaryFilter {
        /**
         * The field to which to apply the operator.
         */
        field?: Schema$FieldReference;
        /**
         * The unary operator to apply.
         */
        op?: string | null;
    }
    /**
     * A message that can hold any of the supported value types.
     */
    export interface Schema$Value {
        /**
         * An array value.  Cannot directly contain another array value, though can contain an map which contains another array.
         */
        arrayValue?: Schema$ArrayValue;
        /**
         * A boolean value.
         */
        booleanValue?: boolean | null;
        /**
         * A bytes value.  Must not exceed 1 MiB - 89 bytes. Only the first 1,500 bytes are considered by queries.
         */
        bytesValue?: string | null;
        /**
         * A double value.
         */
        doubleValue?: number | null;
        /**
         * A geo point value representing a point on the surface of Earth.
         */
        geoPointValue?: Schema$LatLng;
        /**
         * An integer value.
         */
        integerValue?: string | null;
        /**
         * A map value.
         */
        mapValue?: Schema$MapValue;
        /**
         * A null value.
         */
        nullValue?: string | null;
        /**
         * A reference to a document. For example: `projects/{project_id}/databases/{database_id}/documents/{document_path}`.
         */
        referenceValue?: string | null;
        /**
         * A string value.  The string, represented as UTF-8, must not exceed 1 MiB - 89 bytes. Only the first 1,500 bytes of the UTF-8 representation are considered by queries.
         */
        stringValue?: string | null;
        /**
         * A timestamp value.  Precise only to microseconds. When stored, any additional precision is rounded down.
         */
        timestampValue?: string | null;
    }
    /**
     * A write on a document.
     */
    export interface Schema$Write {
        /**
         * An optional precondition on the document.  The write will fail if this is set and not met by the target document.
         */
        currentDocument?: Schema$Precondition;
        /**
         * A document name to delete. In the format: `projects/{project_id}/databases/{database_id}/documents/{document_path}`.
         */
        delete?: string | null;
        /**
         * Applies a transformation to a document.
         */
        transform?: Schema$DocumentTransform;
        /**
         * A document to write.
         */
        update?: Schema$Document;
        /**
         * The fields to update in this write.  This field can be set only when the operation is `update`. If the mask is not set for an `update` and the document exists, any existing data will be overwritten. If the mask is set and the document on the server has fields not covered by the mask, they are left unchanged. Fields referenced in the mask, but not present in the input document, are deleted from the document on the server. The field paths in this mask must not contain a reserved field name.
         */
        updateMask?: Schema$DocumentMask;
        /**
         * The transforms to perform after update.  This field can be set only when the operation is `update`. If present, this write is equivalent to performing `update` and `transform` to the same document atomically and in order.
         */
        updateTransforms?: Schema$FieldTransform[];
    }
    /**
     * The request for Firestore.Write.  The first request creates a stream, or resumes an existing one from a token.  When creating a new stream, the server replies with a response containing only an ID and a token, to use in the next request.  When resuming a stream, the server first streams any responses later than the given token, then a response containing only an up-to-date token, to use in the next request.
     */
    export interface Schema$WriteRequest {
        /**
         * Labels associated with this write request.
         */
        labels?: {
            [key: string]: string;
        } | null;
        /**
         * The ID of the write stream to resume. This may only be set in the first message. When left empty, a new write stream will be created.
         */
        streamId?: string | null;
        /**
         * A stream token that was previously sent by the server.  The client should set this field to the token from the most recent WriteResponse it has received. This acknowledges that the client has received responses up to this token. After sending this token, earlier tokens may not be used anymore.  The server may close the stream if there are too many unacknowledged responses.  Leave this field unset when creating a new stream. To resume a stream at a specific point, set this field and the `stream_id` field.  Leave this field unset when creating a new stream.
         */
        streamToken?: string | null;
        /**
         * The writes to apply.  Always executed atomically and in order. This must be empty on the first request. This may be empty on the last request. This must not be empty on all other requests.
         */
        writes?: Schema$Write[];
    }
    /**
     * The response for Firestore.Write.
     */
    export interface Schema$WriteResponse {
        /**
         * The time at which the commit occurred. Any read with an equal or greater `read_time` is guaranteed to see the effects of the write.
         */
        commitTime?: string | null;
        /**
         * The ID of the stream. Only set on the first message, when a new stream was created.
         */
        streamId?: string | null;
        /**
         * A token that represents the position of this response in the stream. This can be used by a client to resume the stream at this point.  This field is always set.
         */
        streamToken?: string | null;
        /**
         * The result of applying the writes.  This i-th write result corresponds to the i-th write in the request.
         */
        writeResults?: Schema$WriteResult[];
    }
    /**
     * The result of applying a write.
     */
    export interface Schema$WriteResult {
        /**
         * The results of applying each DocumentTransform.FieldTransform, in the same order.
         */
        transformResults?: Schema$Value[];
        /**
         * The last update time of the document after applying the write. Not set after a `delete`.  If the write did not actually change the document, this will be the previous update_time.
         */
        updateTime?: string | null;
    }
    export class Resource$Projects {
        context: APIRequestContext;
        databases: Resource$Projects$Databases;
        locations: Resource$Projects$Locations;
        constructor(context: APIRequestContext);
    }
    export class Resource$Projects$Databases {
        context: APIRequestContext;
        collectionGroups: Resource$Projects$Databases$Collectiongroups;
        documents: Resource$Projects$Databases$Documents;
        operations: Resource$Projects$Databases$Operations;
        constructor(context: APIRequestContext);
        /**
         * firestore.projects.databases.exportDocuments
         * @desc Exports a copy of all or a subset of documents from Google Cloud Firestore to another storage system, such as Google Cloud Storage. Recent updates to documents may not be reflected in the export. The export occurs in the background and its progress can be monitored and managed via the Operation resource that is created. The output of an export may only be used once the associated operation is done. If an export operation is cancelled before completion it may leave partial data behind in Google Cloud Storage.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/firestore.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const firestore = google.firestore('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/datastore',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await firestore.projects.databases.exportDocuments({
         *     // Required. Database to export. Should be of the form:
         *     // `projects/{project_id}/databases/{database_id}`.
         *     name: 'projects/my-project/databases/my-database',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "collectionIds": [],
         *       //   "outputUriPrefix": "my_outputUriPrefix"
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
         * @alias firestore.projects.databases.exportDocuments
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. Database to export. Should be of the form: `projects/{project_id}/databases/{database_id}`.
         * @param {().GoogleFirestoreAdminV1ExportDocumentsRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        exportDocuments(params: Params$Resource$Projects$Databases$Exportdocuments, options: StreamMethodOptions): GaxiosPromise<Readable>;
        exportDocuments(params?: Params$Resource$Projects$Databases$Exportdocuments, options?: MethodOptions): GaxiosPromise<Schema$GoogleLongrunningOperation>;
        exportDocuments(params: Params$Resource$Projects$Databases$Exportdocuments, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        exportDocuments(params: Params$Resource$Projects$Databases$Exportdocuments, options: MethodOptions | BodyResponseCallback<Schema$GoogleLongrunningOperation>, callback: BodyResponseCallback<Schema$GoogleLongrunningOperation>): void;
        exportDocuments(params: Params$Resource$Projects$Databases$Exportdocuments, callback: BodyResponseCallback<Schema$GoogleLongrunningOperation>): void;
        exportDocuments(callback: BodyResponseCallback<Schema$GoogleLongrunningOperation>): void;
        /**
         * firestore.projects.databases.importDocuments
         * @desc Imports documents into Google Cloud Firestore. Existing documents with the same name are overwritten. The import occurs in the background and its progress can be monitored and managed via the Operation resource that is created. If an ImportDocuments operation is cancelled, it is possible that a subset of the data has already been imported to Cloud Firestore.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/firestore.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const firestore = google.firestore('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/datastore',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await firestore.projects.databases.importDocuments({
         *     // Required. Database to import into. Should be of the form:
         *     // `projects/{project_id}/databases/{database_id}`.
         *     name: 'projects/my-project/databases/my-database',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "collectionIds": [],
         *       //   "inputUriPrefix": "my_inputUriPrefix"
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
         * @alias firestore.projects.databases.importDocuments
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. Database to import into. Should be of the form: `projects/{project_id}/databases/{database_id}`.
         * @param {().GoogleFirestoreAdminV1ImportDocumentsRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        importDocuments(params: Params$Resource$Projects$Databases$Importdocuments, options: StreamMethodOptions): GaxiosPromise<Readable>;
        importDocuments(params?: Params$Resource$Projects$Databases$Importdocuments, options?: MethodOptions): GaxiosPromise<Schema$GoogleLongrunningOperation>;
        importDocuments(params: Params$Resource$Projects$Databases$Importdocuments, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        importDocuments(params: Params$Resource$Projects$Databases$Importdocuments, options: MethodOptions | BodyResponseCallback<Schema$GoogleLongrunningOperation>, callback: BodyResponseCallback<Schema$GoogleLongrunningOperation>): void;
        importDocuments(params: Params$Resource$Projects$Databases$Importdocuments, callback: BodyResponseCallback<Schema$GoogleLongrunningOperation>): void;
        importDocuments(callback: BodyResponseCallback<Schema$GoogleLongrunningOperation>): void;
    }
    export interface Params$Resource$Projects$Databases$Exportdocuments extends StandardParameters {
        /**
         * Required. Database to export. Should be of the form: `projects/{project_id}/databases/{database_id}`.
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$GoogleFirestoreAdminV1ExportDocumentsRequest;
    }
    export interface Params$Resource$Projects$Databases$Importdocuments extends StandardParameters {
        /**
         * Required. Database to import into. Should be of the form: `projects/{project_id}/databases/{database_id}`.
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$GoogleFirestoreAdminV1ImportDocumentsRequest;
    }
    export class Resource$Projects$Databases$Collectiongroups {
        context: APIRequestContext;
        fields: Resource$Projects$Databases$Collectiongroups$Fields;
        indexes: Resource$Projects$Databases$Collectiongroups$Indexes;
        constructor(context: APIRequestContext);
    }
    export class Resource$Projects$Databases$Collectiongroups$Fields {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * firestore.projects.databases.collectionGroups.fields.get
         * @desc Gets the metadata and configuration for a Field.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/firestore.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const firestore = google.firestore('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/datastore',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await firestore.projects.databases.collectionGroups.fields.get({
         *     // Required. A name of the form
         *     // `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/fields/{field_id}`
         *     name:
         *       'projects/my-project/databases/my-database/collectionGroups/my-collectionGroup/fields/my-field',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "indexConfig": {},
         *   //   "name": "my_name"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias firestore.projects.databases.collectionGroups.fields.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. A name of the form `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/fields/{field_id}`
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Projects$Databases$Collectiongroups$Fields$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Projects$Databases$Collectiongroups$Fields$Get, options?: MethodOptions): GaxiosPromise<Schema$GoogleFirestoreAdminV1Field>;
        get(params: Params$Resource$Projects$Databases$Collectiongroups$Fields$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Projects$Databases$Collectiongroups$Fields$Get, options: MethodOptions | BodyResponseCallback<Schema$GoogleFirestoreAdminV1Field>, callback: BodyResponseCallback<Schema$GoogleFirestoreAdminV1Field>): void;
        get(params: Params$Resource$Projects$Databases$Collectiongroups$Fields$Get, callback: BodyResponseCallback<Schema$GoogleFirestoreAdminV1Field>): void;
        get(callback: BodyResponseCallback<Schema$GoogleFirestoreAdminV1Field>): void;
        /**
         * firestore.projects.databases.collectionGroups.fields.list
         * @desc Lists the field configuration and metadata for this database.  Currently, FirestoreAdmin.ListFields only supports listing fields that have been explicitly overridden. To issue this query, call FirestoreAdmin.ListFields with the filter set to `indexConfig.usesAncestorConfig:false`.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/firestore.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const firestore = google.firestore('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/datastore',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await firestore.projects.databases.collectionGroups.fields.list({
         *     // The filter to apply to list results. Currently,
         *     // FirestoreAdmin.ListFields only supports listing fields
         *     // that have been explicitly overridden. To issue this query, call
         *     // FirestoreAdmin.ListFields with the filter set to
         *     // `indexConfig.usesAncestorConfig:false`.
         *     filter: 'placeholder-value',
         *     // The number of results to return.
         *     pageSize: 'placeholder-value',
         *     // A page token, returned from a previous call to
         *     // FirestoreAdmin.ListFields, that may be used to get the next
         *     // page of results.
         *     pageToken: 'placeholder-value',
         *     // Required. A parent name of the form
         *     // `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}`
         *     parent:
         *       'projects/my-project/databases/my-database/collectionGroups/my-collectionGroup',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "fields": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias firestore.projects.databases.collectionGroups.fields.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.filter The filter to apply to list results. Currently, FirestoreAdmin.ListFields only supports listing fields that have been explicitly overridden. To issue this query, call FirestoreAdmin.ListFields with the filter set to `indexConfig.usesAncestorConfig:false`.
         * @param {integer=} params.pageSize The number of results to return.
         * @param {string=} params.pageToken A page token, returned from a previous call to FirestoreAdmin.ListFields, that may be used to get the next page of results.
         * @param {string} params.parent Required. A parent name of the form `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}`
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Projects$Databases$Collectiongroups$Fields$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Projects$Databases$Collectiongroups$Fields$List, options?: MethodOptions): GaxiosPromise<Schema$GoogleFirestoreAdminV1ListFieldsResponse>;
        list(params: Params$Resource$Projects$Databases$Collectiongroups$Fields$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Projects$Databases$Collectiongroups$Fields$List, options: MethodOptions | BodyResponseCallback<Schema$GoogleFirestoreAdminV1ListFieldsResponse>, callback: BodyResponseCallback<Schema$GoogleFirestoreAdminV1ListFieldsResponse>): void;
        list(params: Params$Resource$Projects$Databases$Collectiongroups$Fields$List, callback: BodyResponseCallback<Schema$GoogleFirestoreAdminV1ListFieldsResponse>): void;
        list(callback: BodyResponseCallback<Schema$GoogleFirestoreAdminV1ListFieldsResponse>): void;
        /**
         * firestore.projects.databases.collectionGroups.fields.patch
         * @desc Updates a field configuration. Currently, field updates apply only to single field index configuration. However, calls to FirestoreAdmin.UpdateField should provide a field mask to avoid changing any configuration that the caller isn't aware of. The field mask should be specified as: `{ paths: "index_config" }`.  This call returns a google.longrunning.Operation which may be used to track the status of the field update. The metadata for the operation will be the type FieldOperationMetadata.  To configure the default field settings for the database, use the special `Field` with resource name: `projects/{project_id}/databases/{database_id}/collectionGroups/__default__/fields/x`.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/firestore.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const firestore = google.firestore('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/datastore',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await firestore.projects.databases.collectionGroups.fields.patch({
         *     // A field name of the form
         *     // `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/fields/{field_path}`
         *     //
         *     // A field path may be a simple field name, e.g. `address` or a path to fields
         *     // within map_value , e.g. `address.city`,
         *     // or a special field path. The only valid special field is `*`, which
         *     // represents any field.
         *     //
         *     // Field paths may be quoted using ` (backtick). The only character that needs
         *     // to be escaped within a quoted field path is the backtick character itself,
         *     // escaped using a backslash. Special characters in field paths that
         *     // must be quoted include: `*`, `.`,
         *     // ``` (backtick), `[`, `]`, as well as any ascii symbolic characters.
         *     //
         *     // Examples:
         *     // (Note: Comments here are written in markdown syntax, so there is an
         *     //  additional layer of backticks to represent a code block)
         *     // `\`address.city\`` represents a field named `address.city`, not the map key
         *     // `city` in the field `address`.
         *     // `\`*\`` represents a field named `*`, not any field.
         *     //
         *     // A special `Field` contains the default indexing settings for all fields.
         *     // This field's resource name is:
         *     // `projects/{project_id}/databases/{database_id}/collectionGroups/__default__/fields/x`
         *     // Indexes defined on this `Field` will be applied to all fields which do not
         *     // have their own `Field` index configuration.
         *     name:
         *       'projects/my-project/databases/my-database/collectionGroups/my-collectionGroup/fields/my-field',
         *     // A mask, relative to the field. If specified, only configuration specified
         *     // by this field_mask will be updated in the field.
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "indexConfig": {},
         *       //   "name": "my_name"
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
         * @alias firestore.projects.databases.collectionGroups.fields.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name A field name of the form `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/fields/{field_path}`  A field path may be a simple field name, e.g. `address` or a path to fields within map_value , e.g. `address.city`, or a special field path. The only valid special field is `*`, which represents any field.  Field paths may be quoted using ` (backtick). The only character that needs to be escaped within a quoted field path is the backtick character itself, escaped using a backslash. Special characters in field paths that must be quoted include: `*`, `.`, ``` (backtick), `[`, `]`, as well as any ascii symbolic characters.  Examples: (Note: Comments here are written in markdown syntax, so there is an  additional layer of backticks to represent a code block) `\`address.city\`` represents a field named `address.city`, not the map key `city` in the field `address`. `\`*\`` represents a field named `*`, not any field.  A special `Field` contains the default indexing settings for all fields. This field's resource name is: `projects/{project_id}/databases/{database_id}/collectionGroups/__default__/fields/x` Indexes defined on this `Field` will be applied to all fields which do not have their own `Field` index configuration.
         * @param {string=} params.updateMask A mask, relative to the field. If specified, only configuration specified by this field_mask will be updated in the field.
         * @param {().GoogleFirestoreAdminV1Field} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Projects$Databases$Collectiongroups$Fields$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Projects$Databases$Collectiongroups$Fields$Patch, options?: MethodOptions): GaxiosPromise<Schema$GoogleLongrunningOperation>;
        patch(params: Params$Resource$Projects$Databases$Collectiongroups$Fields$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Projects$Databases$Collectiongroups$Fields$Patch, options: MethodOptions | BodyResponseCallback<Schema$GoogleLongrunningOperation>, callback: BodyResponseCallback<Schema$GoogleLongrunningOperation>): void;
        patch(params: Params$Resource$Projects$Databases$Collectiongroups$Fields$Patch, callback: BodyResponseCallback<Schema$GoogleLongrunningOperation>): void;
        patch(callback: BodyResponseCallback<Schema$GoogleLongrunningOperation>): void;
    }
    export interface Params$Resource$Projects$Databases$Collectiongroups$Fields$Get extends StandardParameters {
        /**
         * Required. A name of the form `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/fields/{field_id}`
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Databases$Collectiongroups$Fields$List extends StandardParameters {
        /**
         * The filter to apply to list results. Currently, FirestoreAdmin.ListFields only supports listing fields that have been explicitly overridden. To issue this query, call FirestoreAdmin.ListFields with the filter set to `indexConfig.usesAncestorConfig:false`.
         */
        filter?: string;
        /**
         * The number of results to return.
         */
        pageSize?: number;
        /**
         * A page token, returned from a previous call to FirestoreAdmin.ListFields, that may be used to get the next page of results.
         */
        pageToken?: string;
        /**
         * Required. A parent name of the form `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}`
         */
        parent?: string;
    }
    export interface Params$Resource$Projects$Databases$Collectiongroups$Fields$Patch extends StandardParameters {
        /**
         * A field name of the form `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/fields/{field_path}`  A field path may be a simple field name, e.g. `address` or a path to fields within map_value , e.g. `address.city`, or a special field path. The only valid special field is `*`, which represents any field.  Field paths may be quoted using ` (backtick). The only character that needs to be escaped within a quoted field path is the backtick character itself, escaped using a backslash. Special characters in field paths that must be quoted include: `*`, `.`, ``` (backtick), `[`, `]`, as well as any ascii symbolic characters.  Examples: (Note: Comments here are written in markdown syntax, so there is an  additional layer of backticks to represent a code block) `\`address.city\`` represents a field named `address.city`, not the map key `city` in the field `address`. `\`*\`` represents a field named `*`, not any field.  A special `Field` contains the default indexing settings for all fields. This field's resource name is: `projects/{project_id}/databases/{database_id}/collectionGroups/__default__/fields/x` Indexes defined on this `Field` will be applied to all fields which do not have their own `Field` index configuration.
         */
        name?: string;
        /**
         * A mask, relative to the field. If specified, only configuration specified by this field_mask will be updated in the field.
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$GoogleFirestoreAdminV1Field;
    }
    export class Resource$Projects$Databases$Collectiongroups$Indexes {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * firestore.projects.databases.collectionGroups.indexes.create
         * @desc Creates a composite index. This returns a google.longrunning.Operation which may be used to track the status of the creation. The metadata for the operation will be the type IndexOperationMetadata.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/firestore.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const firestore = google.firestore('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/datastore',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await firestore.projects.databases.collectionGroups.indexes.create(
         *     {
         *       // Required. A parent name of the form
         *       // `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}`
         *       parent:
         *         'projects/my-project/databases/my-database/collectionGroups/my-collectionGroup',
         *
         *       // Request body metadata
         *       requestBody: {
         *         // request body parameters
         *         // {
         *         //   "fields": [],
         *         //   "name": "my_name",
         *         //   "queryScope": "my_queryScope",
         *         //   "state": "my_state"
         *         // }
         *       },
         *     }
         *   );
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
         * @alias firestore.projects.databases.collectionGroups.indexes.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.parent Required. A parent name of the form `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}`
         * @param {().GoogleFirestoreAdminV1Index} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Projects$Databases$Collectiongroups$Indexes$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Projects$Databases$Collectiongroups$Indexes$Create, options?: MethodOptions): GaxiosPromise<Schema$GoogleLongrunningOperation>;
        create(params: Params$Resource$Projects$Databases$Collectiongroups$Indexes$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Projects$Databases$Collectiongroups$Indexes$Create, options: MethodOptions | BodyResponseCallback<Schema$GoogleLongrunningOperation>, callback: BodyResponseCallback<Schema$GoogleLongrunningOperation>): void;
        create(params: Params$Resource$Projects$Databases$Collectiongroups$Indexes$Create, callback: BodyResponseCallback<Schema$GoogleLongrunningOperation>): void;
        create(callback: BodyResponseCallback<Schema$GoogleLongrunningOperation>): void;
        /**
         * firestore.projects.databases.collectionGroups.indexes.delete
         * @desc Deletes a composite index.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/firestore.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const firestore = google.firestore('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/datastore',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await firestore.projects.databases.collectionGroups.indexes.delete(
         *     {
         *       // Required. A name of the form
         *       // `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/indexes/{index_id}`
         *       name:
         *         'projects/my-project/databases/my-database/collectionGroups/my-collectionGroup/indexes/my-indexe',
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
         * @alias firestore.projects.databases.collectionGroups.indexes.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. A name of the form `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/indexes/{index_id}`
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Projects$Databases$Collectiongroups$Indexes$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Projects$Databases$Collectiongroups$Indexes$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Projects$Databases$Collectiongroups$Indexes$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Projects$Databases$Collectiongroups$Indexes$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Projects$Databases$Collectiongroups$Indexes$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * firestore.projects.databases.collectionGroups.indexes.get
         * @desc Gets a composite index.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/firestore.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const firestore = google.firestore('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/datastore',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await firestore.projects.databases.collectionGroups.indexes.get({
         *     // Required. A name of the form
         *     // `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/indexes/{index_id}`
         *     name:
         *       'projects/my-project/databases/my-database/collectionGroups/my-collectionGroup/indexes/my-indexe',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "fields": [],
         *   //   "name": "my_name",
         *   //   "queryScope": "my_queryScope",
         *   //   "state": "my_state"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias firestore.projects.databases.collectionGroups.indexes.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. A name of the form `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/indexes/{index_id}`
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Projects$Databases$Collectiongroups$Indexes$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Projects$Databases$Collectiongroups$Indexes$Get, options?: MethodOptions): GaxiosPromise<Schema$GoogleFirestoreAdminV1Index>;
        get(params: Params$Resource$Projects$Databases$Collectiongroups$Indexes$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Projects$Databases$Collectiongroups$Indexes$Get, options: MethodOptions | BodyResponseCallback<Schema$GoogleFirestoreAdminV1Index>, callback: BodyResponseCallback<Schema$GoogleFirestoreAdminV1Index>): void;
        get(params: Params$Resource$Projects$Databases$Collectiongroups$Indexes$Get, callback: BodyResponseCallback<Schema$GoogleFirestoreAdminV1Index>): void;
        get(callback: BodyResponseCallback<Schema$GoogleFirestoreAdminV1Index>): void;
        /**
         * firestore.projects.databases.collectionGroups.indexes.list
         * @desc Lists composite indexes.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/firestore.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const firestore = google.firestore('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/datastore',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await firestore.projects.databases.collectionGroups.indexes.list({
         *     // The filter to apply to list results.
         *     filter: 'placeholder-value',
         *     // The number of results to return.
         *     pageSize: 'placeholder-value',
         *     // A page token, returned from a previous call to
         *     // FirestoreAdmin.ListIndexes, that may be used to get the next
         *     // page of results.
         *     pageToken: 'placeholder-value',
         *     // Required. A parent name of the form
         *     // `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}`
         *     parent:
         *       'projects/my-project/databases/my-database/collectionGroups/my-collectionGroup',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "indexes": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias firestore.projects.databases.collectionGroups.indexes.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.filter The filter to apply to list results.
         * @param {integer=} params.pageSize The number of results to return.
         * @param {string=} params.pageToken A page token, returned from a previous call to FirestoreAdmin.ListIndexes, that may be used to get the next page of results.
         * @param {string} params.parent Required. A parent name of the form `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}`
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Projects$Databases$Collectiongroups$Indexes$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Projects$Databases$Collectiongroups$Indexes$List, options?: MethodOptions): GaxiosPromise<Schema$GoogleFirestoreAdminV1ListIndexesResponse>;
        list(params: Params$Resource$Projects$Databases$Collectiongroups$Indexes$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Projects$Databases$Collectiongroups$Indexes$List, options: MethodOptions | BodyResponseCallback<Schema$GoogleFirestoreAdminV1ListIndexesResponse>, callback: BodyResponseCallback<Schema$GoogleFirestoreAdminV1ListIndexesResponse>): void;
        list(params: Params$Resource$Projects$Databases$Collectiongroups$Indexes$List, callback: BodyResponseCallback<Schema$GoogleFirestoreAdminV1ListIndexesResponse>): void;
        list(callback: BodyResponseCallback<Schema$GoogleFirestoreAdminV1ListIndexesResponse>): void;
    }
    export interface Params$Resource$Projects$Databases$Collectiongroups$Indexes$Create extends StandardParameters {
        /**
         * Required. A parent name of the form `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}`
         */
        parent?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$GoogleFirestoreAdminV1Index;
    }
    export interface Params$Resource$Projects$Databases$Collectiongroups$Indexes$Delete extends StandardParameters {
        /**
         * Required. A name of the form `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/indexes/{index_id}`
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Databases$Collectiongroups$Indexes$Get extends StandardParameters {
        /**
         * Required. A name of the form `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/indexes/{index_id}`
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Databases$Collectiongroups$Indexes$List extends StandardParameters {
        /**
         * The filter to apply to list results.
         */
        filter?: string;
        /**
         * The number of results to return.
         */
        pageSize?: number;
        /**
         * A page token, returned from a previous call to FirestoreAdmin.ListIndexes, that may be used to get the next page of results.
         */
        pageToken?: string;
        /**
         * Required. A parent name of the form `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}`
         */
        parent?: string;
    }
    export class Resource$Projects$Databases$Documents {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * firestore.projects.databases.documents.batchGet
         * @desc Gets multiple documents.  Documents returned by this method are not guaranteed to be returned in the same order that they were requested.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/firestore.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const firestore = google.firestore('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/datastore',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await firestore.projects.databases.documents.batchGet({
         *     // Required. The database name. In the format:
         *     // `projects/{project_id}/databases/{database_id}`.
         *     database: 'projects/my-project/databases/my-database',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "documents": [],
         *       //   "mask": {},
         *       //   "newTransaction": {},
         *       //   "readTime": "my_readTime",
         *       //   "transaction": "my_transaction"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "found": {},
         *   //   "missing": "my_missing",
         *   //   "readTime": "my_readTime",
         *   //   "transaction": "my_transaction"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias firestore.projects.databases.documents.batchGet
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.database Required. The database name. In the format: `projects/{project_id}/databases/{database_id}`.
         * @param {().BatchGetDocumentsRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        batchGet(params: Params$Resource$Projects$Databases$Documents$Batchget, options: StreamMethodOptions): GaxiosPromise<Readable>;
        batchGet(params?: Params$Resource$Projects$Databases$Documents$Batchget, options?: MethodOptions): GaxiosPromise<Schema$BatchGetDocumentsResponse>;
        batchGet(params: Params$Resource$Projects$Databases$Documents$Batchget, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        batchGet(params: Params$Resource$Projects$Databases$Documents$Batchget, options: MethodOptions | BodyResponseCallback<Schema$BatchGetDocumentsResponse>, callback: BodyResponseCallback<Schema$BatchGetDocumentsResponse>): void;
        batchGet(params: Params$Resource$Projects$Databases$Documents$Batchget, callback: BodyResponseCallback<Schema$BatchGetDocumentsResponse>): void;
        batchGet(callback: BodyResponseCallback<Schema$BatchGetDocumentsResponse>): void;
        /**
         * firestore.projects.databases.documents.beginTransaction
         * @desc Starts a new transaction.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/firestore.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const firestore = google.firestore('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/datastore',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await firestore.projects.databases.documents.beginTransaction({
         *     // Required. The database name. In the format:
         *     // `projects/{project_id}/databases/{database_id}`.
         *     database: 'projects/my-project/databases/my-database',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "options": {}
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "transaction": "my_transaction"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias firestore.projects.databases.documents.beginTransaction
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.database Required. The database name. In the format: `projects/{project_id}/databases/{database_id}`.
         * @param {().BeginTransactionRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        beginTransaction(params: Params$Resource$Projects$Databases$Documents$Begintransaction, options: StreamMethodOptions): GaxiosPromise<Readable>;
        beginTransaction(params?: Params$Resource$Projects$Databases$Documents$Begintransaction, options?: MethodOptions): GaxiosPromise<Schema$BeginTransactionResponse>;
        beginTransaction(params: Params$Resource$Projects$Databases$Documents$Begintransaction, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        beginTransaction(params: Params$Resource$Projects$Databases$Documents$Begintransaction, options: MethodOptions | BodyResponseCallback<Schema$BeginTransactionResponse>, callback: BodyResponseCallback<Schema$BeginTransactionResponse>): void;
        beginTransaction(params: Params$Resource$Projects$Databases$Documents$Begintransaction, callback: BodyResponseCallback<Schema$BeginTransactionResponse>): void;
        beginTransaction(callback: BodyResponseCallback<Schema$BeginTransactionResponse>): void;
        /**
         * firestore.projects.databases.documents.commit
         * @desc Commits a transaction, while optionally updating documents.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/firestore.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const firestore = google.firestore('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/datastore',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await firestore.projects.databases.documents.commit({
         *     // Required. The database name. In the format:
         *     // `projects/{project_id}/databases/{database_id}`.
         *     database: 'projects/my-project/databases/my-database',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "transaction": "my_transaction",
         *       //   "writes": []
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "commitTime": "my_commitTime",
         *   //   "writeResults": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias firestore.projects.databases.documents.commit
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.database Required. The database name. In the format: `projects/{project_id}/databases/{database_id}`.
         * @param {().CommitRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        commit(params: Params$Resource$Projects$Databases$Documents$Commit, options: StreamMethodOptions): GaxiosPromise<Readable>;
        commit(params?: Params$Resource$Projects$Databases$Documents$Commit, options?: MethodOptions): GaxiosPromise<Schema$CommitResponse>;
        commit(params: Params$Resource$Projects$Databases$Documents$Commit, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        commit(params: Params$Resource$Projects$Databases$Documents$Commit, options: MethodOptions | BodyResponseCallback<Schema$CommitResponse>, callback: BodyResponseCallback<Schema$CommitResponse>): void;
        commit(params: Params$Resource$Projects$Databases$Documents$Commit, callback: BodyResponseCallback<Schema$CommitResponse>): void;
        commit(callback: BodyResponseCallback<Schema$CommitResponse>): void;
        /**
         * firestore.projects.databases.documents.createDocument
         * @desc Creates a new document.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/firestore.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const firestore = google.firestore('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/datastore',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await firestore.projects.databases.documents.createDocument({
         *     // Required. The collection ID, relative to `parent`, to list. For example: `chatrooms`.
         *     collectionId: 'placeholder-value',
         *     // The client-assigned document ID to use for this document.
         *     //
         *     // Optional. If not specified, an ID will be assigned by the service.
         *     documentId: 'placeholder-value',
         *     // The list of field paths in the mask. See Document.fields for a field
         *     // path syntax reference.
         *     'mask.fieldPaths': 'placeholder-value',
         *     // Required. The parent resource. For example:
         *     // `projects/{project_id}/databases/{database_id}/documents` or
         *     // `projects/{project_id}/databases/{database_id}/documents/chatrooms/{chatroom_id}`
         *     parent: 'projects/my-project/databases/my-database/documents/.*',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "createTime": "my_createTime",
         *       //   "fields": {},
         *       //   "name": "my_name",
         *       //   "updateTime": "my_updateTime"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "createTime": "my_createTime",
         *   //   "fields": {},
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
         * @alias firestore.projects.databases.documents.createDocument
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.collectionId Required. The collection ID, relative to `parent`, to list. For example: `chatrooms`.
         * @param {string=} params.documentId The client-assigned document ID to use for this document.  Optional. If not specified, an ID will be assigned by the service.
         * @param {string=} params.mask.fieldPaths The list of field paths in the mask. See Document.fields for a field path syntax reference.
         * @param {string} params.parent Required. The parent resource. For example: `projects/{project_id}/databases/{database_id}/documents` or `projects/{project_id}/databases/{database_id}/documents/chatrooms/{chatroom_id}`
         * @param {().Document} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        createDocument(params: Params$Resource$Projects$Databases$Documents$Createdocument, options: StreamMethodOptions): GaxiosPromise<Readable>;
        createDocument(params?: Params$Resource$Projects$Databases$Documents$Createdocument, options?: MethodOptions): GaxiosPromise<Schema$Document>;
        createDocument(params: Params$Resource$Projects$Databases$Documents$Createdocument, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        createDocument(params: Params$Resource$Projects$Databases$Documents$Createdocument, options: MethodOptions | BodyResponseCallback<Schema$Document>, callback: BodyResponseCallback<Schema$Document>): void;
        createDocument(params: Params$Resource$Projects$Databases$Documents$Createdocument, callback: BodyResponseCallback<Schema$Document>): void;
        createDocument(callback: BodyResponseCallback<Schema$Document>): void;
        /**
         * firestore.projects.databases.documents.delete
         * @desc Deletes a document.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/firestore.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const firestore = google.firestore('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/datastore',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await firestore.projects.databases.documents.delete({
         *     // When set to `true`, the target document must exist.
         *     // When set to `false`, the target document must not exist.
         *     'currentDocument.exists': 'placeholder-value',
         *     // When set, the target document must exist and have been last updated at
         *     // that time.
         *     'currentDocument.updateTime': 'placeholder-value',
         *     // Required. The resource name of the Document to delete. In the format:
         *     // `projects/{project_id}/databases/{database_id}/documents/{document_path}`.
         *     name: 'projects/my-project/databases/my-database/documents/my-document/.*',
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
         * @alias firestore.projects.databases.documents.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {boolean=} params.currentDocument.exists When set to `true`, the target document must exist. When set to `false`, the target document must not exist.
         * @param {string=} params.currentDocument.updateTime When set, the target document must exist and have been last updated at that time.
         * @param {string} params.name Required. The resource name of the Document to delete. In the format: `projects/{project_id}/databases/{database_id}/documents/{document_path}`.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Projects$Databases$Documents$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Projects$Databases$Documents$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Projects$Databases$Documents$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Projects$Databases$Documents$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Projects$Databases$Documents$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * firestore.projects.databases.documents.get
         * @desc Gets a single document.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/firestore.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const firestore = google.firestore('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/datastore',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await firestore.projects.databases.documents.get({
         *     // The list of field paths in the mask. See Document.fields for a field
         *     // path syntax reference.
         *     'mask.fieldPaths': 'placeholder-value',
         *     // Required. The resource name of the Document to get. In the format:
         *     // `projects/{project_id}/databases/{database_id}/documents/{document_path}`.
         *     name: 'projects/my-project/databases/my-database/documents/my-document/.*',
         *     // Reads the version of the document at the given time.
         *     // This may not be older than 270 seconds.
         *     readTime: 'placeholder-value',
         *     // Reads the document in a transaction.
         *     transaction: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "createTime": "my_createTime",
         *   //   "fields": {},
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
         * @alias firestore.projects.databases.documents.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.mask.fieldPaths The list of field paths in the mask. See Document.fields for a field path syntax reference.
         * @param {string} params.name Required. The resource name of the Document to get. In the format: `projects/{project_id}/databases/{database_id}/documents/{document_path}`.
         * @param {string=} params.readTime Reads the version of the document at the given time. This may not be older than 270 seconds.
         * @param {string=} params.transaction Reads the document in a transaction.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Projects$Databases$Documents$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Projects$Databases$Documents$Get, options?: MethodOptions): GaxiosPromise<Schema$Document>;
        get(params: Params$Resource$Projects$Databases$Documents$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Projects$Databases$Documents$Get, options: MethodOptions | BodyResponseCallback<Schema$Document>, callback: BodyResponseCallback<Schema$Document>): void;
        get(params: Params$Resource$Projects$Databases$Documents$Get, callback: BodyResponseCallback<Schema$Document>): void;
        get(callback: BodyResponseCallback<Schema$Document>): void;
        /**
         * firestore.projects.databases.documents.list
         * @desc Lists documents.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/firestore.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const firestore = google.firestore('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/datastore',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await firestore.projects.databases.documents.list({
         *     // Required. The collection ID, relative to `parent`, to list. For example: `chatrooms`
         *     // or `messages`.
         *     collectionId: 'placeholder-value',
         *     // The list of field paths in the mask. See Document.fields for a field
         *     // path syntax reference.
         *     'mask.fieldPaths': 'placeholder-value',
         *     // The order to sort results by. For example: `priority desc, name`.
         *     orderBy: 'placeholder-value',
         *     // The maximum number of documents to return.
         *     pageSize: 'placeholder-value',
         *     // The `next_page_token` value returned from a previous List request, if any.
         *     pageToken: 'placeholder-value',
         *     // Required. The parent resource name. In the format:
         *     // `projects/{project_id}/databases/{database_id}/documents` or
         *     // `projects/{project_id}/databases/{database_id}/documents/{document_path}`.
         *     // For example:
         *     // `projects/my-project/databases/my-database/documents` or
         *     // `projects/my-project/databases/my-database/documents/chatrooms/my-chatroom`
         *     parent:
         *       'projects/my-project/databases/my-database/documents/my-document/.*',
         *     // Reads documents as they were at the given time.
         *     // This may not be older than 270 seconds.
         *     readTime: 'placeholder-value',
         *     // If the list should show missing documents. A missing document is a
         *     // document that does not exist but has sub-documents. These documents will
         *     // be returned with a key but will not have fields, Document.create_time,
         *     // or Document.update_time set.
         *     //
         *     // Requests with `show_missing` may not specify `where` or
         *     // `order_by`.
         *     showMissing: 'placeholder-value',
         *     // Reads documents in a transaction.
         *     transaction: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "documents": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias firestore.projects.databases.documents.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.collectionId Required. The collection ID, relative to `parent`, to list. For example: `chatrooms` or `messages`.
         * @param {string=} params.mask.fieldPaths The list of field paths in the mask. See Document.fields for a field path syntax reference.
         * @param {string=} params.orderBy The order to sort results by. For example: `priority desc, name`.
         * @param {integer=} params.pageSize The maximum number of documents to return.
         * @param {string=} params.pageToken The `next_page_token` value returned from a previous List request, if any.
         * @param {string} params.parent Required. The parent resource name. In the format: `projects/{project_id}/databases/{database_id}/documents` or `projects/{project_id}/databases/{database_id}/documents/{document_path}`. For example: `projects/my-project/databases/my-database/documents` or `projects/my-project/databases/my-database/documents/chatrooms/my-chatroom`
         * @param {string=} params.readTime Reads documents as they were at the given time. This may not be older than 270 seconds.
         * @param {boolean=} params.showMissing If the list should show missing documents. A missing document is a document that does not exist but has sub-documents. These documents will be returned with a key but will not have fields, Document.create_time, or Document.update_time set.  Requests with `show_missing` may not specify `where` or `order_by`.
         * @param {string=} params.transaction Reads documents in a transaction.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Projects$Databases$Documents$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Projects$Databases$Documents$List, options?: MethodOptions): GaxiosPromise<Schema$ListDocumentsResponse>;
        list(params: Params$Resource$Projects$Databases$Documents$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Projects$Databases$Documents$List, options: MethodOptions | BodyResponseCallback<Schema$ListDocumentsResponse>, callback: BodyResponseCallback<Schema$ListDocumentsResponse>): void;
        list(params: Params$Resource$Projects$Databases$Documents$List, callback: BodyResponseCallback<Schema$ListDocumentsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListDocumentsResponse>): void;
        /**
         * firestore.projects.databases.documents.listCollectionIds
         * @desc Lists all the collection IDs underneath a document.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/firestore.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const firestore = google.firestore('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/datastore',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await firestore.projects.databases.documents.listCollectionIds({
         *     // Required. The parent document. In the format:
         *     // `projects/{project_id}/databases/{database_id}/documents/{document_path}`.
         *     // For example:
         *     // `projects/my-project/databases/my-database/documents/chatrooms/my-chatroom`
         *     parent:
         *       'projects/my-project/databases/my-database/documents/my-document/.*',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "pageSize": 0,
         *       //   "pageToken": "my_pageToken"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "collectionIds": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias firestore.projects.databases.documents.listCollectionIds
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.parent Required. The parent document. In the format: `projects/{project_id}/databases/{database_id}/documents/{document_path}`. For example: `projects/my-project/databases/my-database/documents/chatrooms/my-chatroom`
         * @param {().ListCollectionIdsRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        listCollectionIds(params: Params$Resource$Projects$Databases$Documents$Listcollectionids, options: StreamMethodOptions): GaxiosPromise<Readable>;
        listCollectionIds(params?: Params$Resource$Projects$Databases$Documents$Listcollectionids, options?: MethodOptions): GaxiosPromise<Schema$ListCollectionIdsResponse>;
        listCollectionIds(params: Params$Resource$Projects$Databases$Documents$Listcollectionids, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        listCollectionIds(params: Params$Resource$Projects$Databases$Documents$Listcollectionids, options: MethodOptions | BodyResponseCallback<Schema$ListCollectionIdsResponse>, callback: BodyResponseCallback<Schema$ListCollectionIdsResponse>): void;
        listCollectionIds(params: Params$Resource$Projects$Databases$Documents$Listcollectionids, callback: BodyResponseCallback<Schema$ListCollectionIdsResponse>): void;
        listCollectionIds(callback: BodyResponseCallback<Schema$ListCollectionIdsResponse>): void;
        /**
         * firestore.projects.databases.documents.listen
         * @desc Listens to changes.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/firestore.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const firestore = google.firestore('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/datastore',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await firestore.projects.databases.documents.listen({
         *     // Required. The database name. In the format:
         *     // `projects/{project_id}/databases/{database_id}`.
         *     database: 'projects/my-project/databases/my-database',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "addTarget": {},
         *       //   "labels": {},
         *       //   "removeTarget": 0
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "documentChange": {},
         *   //   "documentDelete": {},
         *   //   "documentRemove": {},
         *   //   "filter": {},
         *   //   "targetChange": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias firestore.projects.databases.documents.listen
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.database Required. The database name. In the format: `projects/{project_id}/databases/{database_id}`.
         * @param {().ListenRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        listen(params: Params$Resource$Projects$Databases$Documents$Listen, options: StreamMethodOptions): GaxiosPromise<Readable>;
        listen(params?: Params$Resource$Projects$Databases$Documents$Listen, options?: MethodOptions): GaxiosPromise<Schema$ListenResponse>;
        listen(params: Params$Resource$Projects$Databases$Documents$Listen, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        listen(params: Params$Resource$Projects$Databases$Documents$Listen, options: MethodOptions | BodyResponseCallback<Schema$ListenResponse>, callback: BodyResponseCallback<Schema$ListenResponse>): void;
        listen(params: Params$Resource$Projects$Databases$Documents$Listen, callback: BodyResponseCallback<Schema$ListenResponse>): void;
        listen(callback: BodyResponseCallback<Schema$ListenResponse>): void;
        /**
         * firestore.projects.databases.documents.patch
         * @desc Updates or inserts a document.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/firestore.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const firestore = google.firestore('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/datastore',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await firestore.projects.databases.documents.patch({
         *     // When set to `true`, the target document must exist.
         *     // When set to `false`, the target document must not exist.
         *     'currentDocument.exists': 'placeholder-value',
         *     // When set, the target document must exist and have been last updated at
         *     // that time.
         *     'currentDocument.updateTime': 'placeholder-value',
         *     // The list of field paths in the mask. See Document.fields for a field
         *     // path syntax reference.
         *     'mask.fieldPaths': 'placeholder-value',
         *     // The resource name of the document, for example
         *     // `projects/{project_id}/databases/{database_id}/documents/{document_path}`.
         *     name: 'projects/my-project/databases/my-database/documents/my-document/.*',
         *     // The list of field paths in the mask. See Document.fields for a field
         *     // path syntax reference.
         *     'updateMask.fieldPaths': 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "createTime": "my_createTime",
         *       //   "fields": {},
         *       //   "name": "my_name",
         *       //   "updateTime": "my_updateTime"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "createTime": "my_createTime",
         *   //   "fields": {},
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
         * @alias firestore.projects.databases.documents.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {boolean=} params.currentDocument.exists When set to `true`, the target document must exist. When set to `false`, the target document must not exist.
         * @param {string=} params.currentDocument.updateTime When set, the target document must exist and have been last updated at that time.
         * @param {string=} params.mask.fieldPaths The list of field paths in the mask. See Document.fields for a field path syntax reference.
         * @param {string} params.name The resource name of the document, for example `projects/{project_id}/databases/{database_id}/documents/{document_path}`.
         * @param {string=} params.updateMask.fieldPaths The list of field paths in the mask. See Document.fields for a field path syntax reference.
         * @param {().Document} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Projects$Databases$Documents$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Projects$Databases$Documents$Patch, options?: MethodOptions): GaxiosPromise<Schema$Document>;
        patch(params: Params$Resource$Projects$Databases$Documents$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Projects$Databases$Documents$Patch, options: MethodOptions | BodyResponseCallback<Schema$Document>, callback: BodyResponseCallback<Schema$Document>): void;
        patch(params: Params$Resource$Projects$Databases$Documents$Patch, callback: BodyResponseCallback<Schema$Document>): void;
        patch(callback: BodyResponseCallback<Schema$Document>): void;
        /**
         * firestore.projects.databases.documents.rollback
         * @desc Rolls back a transaction.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/firestore.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const firestore = google.firestore('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/datastore',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await firestore.projects.databases.documents.rollback({
         *     // Required. The database name. In the format:
         *     // `projects/{project_id}/databases/{database_id}`.
         *     database: 'projects/my-project/databases/my-database',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "transaction": "my_transaction"
         *       // }
         *     },
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
         * @alias firestore.projects.databases.documents.rollback
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.database Required. The database name. In the format: `projects/{project_id}/databases/{database_id}`.
         * @param {().RollbackRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        rollback(params: Params$Resource$Projects$Databases$Documents$Rollback, options: StreamMethodOptions): GaxiosPromise<Readable>;
        rollback(params?: Params$Resource$Projects$Databases$Documents$Rollback, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        rollback(params: Params$Resource$Projects$Databases$Documents$Rollback, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        rollback(params: Params$Resource$Projects$Databases$Documents$Rollback, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        rollback(params: Params$Resource$Projects$Databases$Documents$Rollback, callback: BodyResponseCallback<Schema$Empty>): void;
        rollback(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * firestore.projects.databases.documents.runQuery
         * @desc Runs a query.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/firestore.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const firestore = google.firestore('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/datastore',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await firestore.projects.databases.documents.runQuery({
         *     // Required. The parent resource name. In the format:
         *     // `projects/{project_id}/databases/{database_id}/documents` or
         *     // `projects/{project_id}/databases/{database_id}/documents/{document_path}`.
         *     // For example:
         *     // `projects/my-project/databases/my-database/documents` or
         *     // `projects/my-project/databases/my-database/documents/chatrooms/my-chatroom`
         *     parent:
         *       'projects/my-project/databases/my-database/documents/my-document/.*',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "newTransaction": {},
         *       //   "readTime": "my_readTime",
         *       //   "structuredQuery": {},
         *       //   "transaction": "my_transaction"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "document": {},
         *   //   "readTime": "my_readTime",
         *   //   "skippedResults": 0,
         *   //   "transaction": "my_transaction"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias firestore.projects.databases.documents.runQuery
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.parent Required. The parent resource name. In the format: `projects/{project_id}/databases/{database_id}/documents` or `projects/{project_id}/databases/{database_id}/documents/{document_path}`. For example: `projects/my-project/databases/my-database/documents` or `projects/my-project/databases/my-database/documents/chatrooms/my-chatroom`
         * @param {().RunQueryRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        runQuery(params: Params$Resource$Projects$Databases$Documents$Runquery, options: StreamMethodOptions): GaxiosPromise<Readable>;
        runQuery(params?: Params$Resource$Projects$Databases$Documents$Runquery, options?: MethodOptions): GaxiosPromise<Schema$RunQueryResponse>;
        runQuery(params: Params$Resource$Projects$Databases$Documents$Runquery, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        runQuery(params: Params$Resource$Projects$Databases$Documents$Runquery, options: MethodOptions | BodyResponseCallback<Schema$RunQueryResponse>, callback: BodyResponseCallback<Schema$RunQueryResponse>): void;
        runQuery(params: Params$Resource$Projects$Databases$Documents$Runquery, callback: BodyResponseCallback<Schema$RunQueryResponse>): void;
        runQuery(callback: BodyResponseCallback<Schema$RunQueryResponse>): void;
        /**
         * firestore.projects.databases.documents.write
         * @desc Streams batches of document updates and deletes, in order.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/firestore.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const firestore = google.firestore('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/datastore',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await firestore.projects.databases.documents.write({
         *     // Required. The database name. In the format:
         *     // `projects/{project_id}/databases/{database_id}`.
         *     // This is only required in the first message.
         *     database: 'projects/my-project/databases/my-database',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "labels": {},
         *       //   "streamId": "my_streamId",
         *       //   "streamToken": "my_streamToken",
         *       //   "writes": []
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "commitTime": "my_commitTime",
         *   //   "streamId": "my_streamId",
         *   //   "streamToken": "my_streamToken",
         *   //   "writeResults": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias firestore.projects.databases.documents.write
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.database Required. The database name. In the format: `projects/{project_id}/databases/{database_id}`. This is only required in the first message.
         * @param {().WriteRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        write(params: Params$Resource$Projects$Databases$Documents$Write, options: StreamMethodOptions): GaxiosPromise<Readable>;
        write(params?: Params$Resource$Projects$Databases$Documents$Write, options?: MethodOptions): GaxiosPromise<Schema$WriteResponse>;
        write(params: Params$Resource$Projects$Databases$Documents$Write, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        write(params: Params$Resource$Projects$Databases$Documents$Write, options: MethodOptions | BodyResponseCallback<Schema$WriteResponse>, callback: BodyResponseCallback<Schema$WriteResponse>): void;
        write(params: Params$Resource$Projects$Databases$Documents$Write, callback: BodyResponseCallback<Schema$WriteResponse>): void;
        write(callback: BodyResponseCallback<Schema$WriteResponse>): void;
    }
    export interface Params$Resource$Projects$Databases$Documents$Batchget extends StandardParameters {
        /**
         * Required. The database name. In the format: `projects/{project_id}/databases/{database_id}`.
         */
        database?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$BatchGetDocumentsRequest;
    }
    export interface Params$Resource$Projects$Databases$Documents$Begintransaction extends StandardParameters {
        /**
         * Required. The database name. In the format: `projects/{project_id}/databases/{database_id}`.
         */
        database?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$BeginTransactionRequest;
    }
    export interface Params$Resource$Projects$Databases$Documents$Commit extends StandardParameters {
        /**
         * Required. The database name. In the format: `projects/{project_id}/databases/{database_id}`.
         */
        database?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$CommitRequest;
    }
    export interface Params$Resource$Projects$Databases$Documents$Createdocument extends StandardParameters {
        /**
         * Required. The collection ID, relative to `parent`, to list. For example: `chatrooms`.
         */
        collectionId?: string;
        /**
         * The client-assigned document ID to use for this document.  Optional. If not specified, an ID will be assigned by the service.
         */
        documentId?: string;
        /**
         * The list of field paths in the mask. See Document.fields for a field path syntax reference.
         */
        'mask.fieldPaths'?: string[];
        /**
         * Required. The parent resource. For example: `projects/{project_id}/databases/{database_id}/documents` or `projects/{project_id}/databases/{database_id}/documents/chatrooms/{chatroom_id}`
         */
        parent?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Document;
    }
    export interface Params$Resource$Projects$Databases$Documents$Delete extends StandardParameters {
        /**
         * When set to `true`, the target document must exist. When set to `false`, the target document must not exist.
         */
        'currentDocument.exists'?: boolean;
        /**
         * When set, the target document must exist and have been last updated at that time.
         */
        'currentDocument.updateTime'?: string;
        /**
         * Required. The resource name of the Document to delete. In the format: `projects/{project_id}/databases/{database_id}/documents/{document_path}`.
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Databases$Documents$Get extends StandardParameters {
        /**
         * The list of field paths in the mask. See Document.fields for a field path syntax reference.
         */
        'mask.fieldPaths'?: string[];
        /**
         * Required. The resource name of the Document to get. In the format: `projects/{project_id}/databases/{database_id}/documents/{document_path}`.
         */
        name?: string;
        /**
         * Reads the version of the document at the given time. This may not be older than 270 seconds.
         */
        readTime?: string;
        /**
         * Reads the document in a transaction.
         */
        transaction?: string;
    }
    export interface Params$Resource$Projects$Databases$Documents$List extends StandardParameters {
        /**
         * Required. The collection ID, relative to `parent`, to list. For example: `chatrooms` or `messages`.
         */
        collectionId?: string;
        /**
         * The list of field paths in the mask. See Document.fields for a field path syntax reference.
         */
        'mask.fieldPaths'?: string[];
        /**
         * The order to sort results by. For example: `priority desc, name`.
         */
        orderBy?: string;
        /**
         * The maximum number of documents to return.
         */
        pageSize?: number;
        /**
         * The `next_page_token` value returned from a previous List request, if any.
         */
        pageToken?: string;
        /**
         * Required. The parent resource name. In the format: `projects/{project_id}/databases/{database_id}/documents` or `projects/{project_id}/databases/{database_id}/documents/{document_path}`. For example: `projects/my-project/databases/my-database/documents` or `projects/my-project/databases/my-database/documents/chatrooms/my-chatroom`
         */
        parent?: string;
        /**
         * Reads documents as they were at the given time. This may not be older than 270 seconds.
         */
        readTime?: string;
        /**
         * If the list should show missing documents. A missing document is a document that does not exist but has sub-documents. These documents will be returned with a key but will not have fields, Document.create_time, or Document.update_time set.  Requests with `show_missing` may not specify `where` or `order_by`.
         */
        showMissing?: boolean;
        /**
         * Reads documents in a transaction.
         */
        transaction?: string;
    }
    export interface Params$Resource$Projects$Databases$Documents$Listcollectionids extends StandardParameters {
        /**
         * Required. The parent document. In the format: `projects/{project_id}/databases/{database_id}/documents/{document_path}`. For example: `projects/my-project/databases/my-database/documents/chatrooms/my-chatroom`
         */
        parent?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$ListCollectionIdsRequest;
    }
    export interface Params$Resource$Projects$Databases$Documents$Listen extends StandardParameters {
        /**
         * Required. The database name. In the format: `projects/{project_id}/databases/{database_id}`.
         */
        database?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$ListenRequest;
    }
    export interface Params$Resource$Projects$Databases$Documents$Patch extends StandardParameters {
        /**
         * When set to `true`, the target document must exist. When set to `false`, the target document must not exist.
         */
        'currentDocument.exists'?: boolean;
        /**
         * When set, the target document must exist and have been last updated at that time.
         */
        'currentDocument.updateTime'?: string;
        /**
         * The list of field paths in the mask. See Document.fields for a field path syntax reference.
         */
        'mask.fieldPaths'?: string[];
        /**
         * The resource name of the document, for example `projects/{project_id}/databases/{database_id}/documents/{document_path}`.
         */
        name?: string;
        /**
         * The list of field paths in the mask. See Document.fields for a field path syntax reference.
         */
        'updateMask.fieldPaths'?: string[];
        /**
         * Request body metadata
         */
        requestBody?: Schema$Document;
    }
    export interface Params$Resource$Projects$Databases$Documents$Rollback extends StandardParameters {
        /**
         * Required. The database name. In the format: `projects/{project_id}/databases/{database_id}`.
         */
        database?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$RollbackRequest;
    }
    export interface Params$Resource$Projects$Databases$Documents$Runquery extends StandardParameters {
        /**
         * Required. The parent resource name. In the format: `projects/{project_id}/databases/{database_id}/documents` or `projects/{project_id}/databases/{database_id}/documents/{document_path}`. For example: `projects/my-project/databases/my-database/documents` or `projects/my-project/databases/my-database/documents/chatrooms/my-chatroom`
         */
        parent?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$RunQueryRequest;
    }
    export interface Params$Resource$Projects$Databases$Documents$Write extends StandardParameters {
        /**
         * Required. The database name. In the format: `projects/{project_id}/databases/{database_id}`. This is only required in the first message.
         */
        database?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$WriteRequest;
    }
    export class Resource$Projects$Databases$Operations {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * firestore.projects.databases.operations.cancel
         * @desc Starts asynchronous cancellation on a long-running operation.  The server makes a best effort to cancel the operation, but success is not guaranteed.  If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.  Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/firestore.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const firestore = google.firestore('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/datastore',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await firestore.projects.databases.operations.cancel({
         *     // The name of the operation resource to be cancelled.
         *     name: 'projects/my-project/databases/my-database/operations/my-operation',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {}
         *     },
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
         * @alias firestore.projects.databases.operations.cancel
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name The name of the operation resource to be cancelled.
         * @param {().GoogleLongrunningCancelOperationRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        cancel(params: Params$Resource$Projects$Databases$Operations$Cancel, options: StreamMethodOptions): GaxiosPromise<Readable>;
        cancel(params?: Params$Resource$Projects$Databases$Operations$Cancel, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        cancel(params: Params$Resource$Projects$Databases$Operations$Cancel, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        cancel(params: Params$Resource$Projects$Databases$Operations$Cancel, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        cancel(params: Params$Resource$Projects$Databases$Operations$Cancel, callback: BodyResponseCallback<Schema$Empty>): void;
        cancel(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * firestore.projects.databases.operations.delete
         * @desc Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/firestore.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const firestore = google.firestore('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/datastore',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await firestore.projects.databases.operations.delete({
         *     // The name of the operation resource to be deleted.
         *     name: 'projects/my-project/databases/my-database/operations/my-operation',
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
         * @alias firestore.projects.databases.operations.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name The name of the operation resource to be deleted.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Projects$Databases$Operations$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Projects$Databases$Operations$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Projects$Databases$Operations$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Projects$Databases$Operations$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Projects$Databases$Operations$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * firestore.projects.databases.operations.get
         * @desc Gets the latest state of a long-running operation.  Clients can use this method to poll the operation result at intervals as recommended by the API service.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/firestore.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const firestore = google.firestore('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/datastore',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await firestore.projects.databases.operations.get({
         *     // The name of the operation resource.
         *     name: 'projects/my-project/databases/my-database/operations/my-operation',
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
         * @alias firestore.projects.databases.operations.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name The name of the operation resource.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Projects$Databases$Operations$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Projects$Databases$Operations$Get, options?: MethodOptions): GaxiosPromise<Schema$GoogleLongrunningOperation>;
        get(params: Params$Resource$Projects$Databases$Operations$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Projects$Databases$Operations$Get, options: MethodOptions | BodyResponseCallback<Schema$GoogleLongrunningOperation>, callback: BodyResponseCallback<Schema$GoogleLongrunningOperation>): void;
        get(params: Params$Resource$Projects$Databases$Operations$Get, callback: BodyResponseCallback<Schema$GoogleLongrunningOperation>): void;
        get(callback: BodyResponseCallback<Schema$GoogleLongrunningOperation>): void;
        /**
         * firestore.projects.databases.operations.list
         * @desc Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.  NOTE: the `name` binding allows API services to override the binding to use different resource name schemes, such as `users/x/operations`. To override the binding, API services can add a binding such as `"/v1/{name=users/x}/operations"` to their service configuration. For backwards compatibility, the default name includes the operations collection id, however overriding users must ensure the name binding is the parent resource, without the operations collection id.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/firestore.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const firestore = google.firestore('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/datastore',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await firestore.projects.databases.operations.list({
         *     // The standard list filter.
         *     filter: 'placeholder-value',
         *     // The name of the operation's parent resource.
         *     name: 'projects/my-project/databases/my-database',
         *     // The standard list page size.
         *     pageSize: 'placeholder-value',
         *     // The standard list page token.
         *     pageToken: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "operations": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias firestore.projects.databases.operations.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.filter The standard list filter.
         * @param {string} params.name The name of the operation's parent resource.
         * @param {integer=} params.pageSize The standard list page size.
         * @param {string=} params.pageToken The standard list page token.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Projects$Databases$Operations$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Projects$Databases$Operations$List, options?: MethodOptions): GaxiosPromise<Schema$GoogleLongrunningListOperationsResponse>;
        list(params: Params$Resource$Projects$Databases$Operations$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Projects$Databases$Operations$List, options: MethodOptions | BodyResponseCallback<Schema$GoogleLongrunningListOperationsResponse>, callback: BodyResponseCallback<Schema$GoogleLongrunningListOperationsResponse>): void;
        list(params: Params$Resource$Projects$Databases$Operations$List, callback: BodyResponseCallback<Schema$GoogleLongrunningListOperationsResponse>): void;
        list(callback: BodyResponseCallback<Schema$GoogleLongrunningListOperationsResponse>): void;
    }
    export interface Params$Resource$Projects$Databases$Operations$Cancel extends StandardParameters {
        /**
         * The name of the operation resource to be cancelled.
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$GoogleLongrunningCancelOperationRequest;
    }
    export interface Params$Resource$Projects$Databases$Operations$Delete extends StandardParameters {
        /**
         * The name of the operation resource to be deleted.
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Databases$Operations$Get extends StandardParameters {
        /**
         * The name of the operation resource.
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Databases$Operations$List extends StandardParameters {
        /**
         * The standard list filter.
         */
        filter?: string;
        /**
         * The name of the operation's parent resource.
         */
        name?: string;
        /**
         * The standard list page size.
         */
        pageSize?: number;
        /**
         * The standard list page token.
         */
        pageToken?: string;
    }
    export class Resource$Projects$Locations {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * firestore.projects.locations.get
         * @desc Gets information about a location.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/firestore.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const firestore = google.firestore('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/datastore',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await firestore.projects.locations.get({
         *     // Resource name for the location.
         *     name: 'projects/my-project/locations/my-location',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "displayName": "my_displayName",
         *   //   "labels": {},
         *   //   "locationId": "my_locationId",
         *   //   "metadata": {},
         *   //   "name": "my_name"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias firestore.projects.locations.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Resource name for the location.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Projects$Locations$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Projects$Locations$Get, options?: MethodOptions): GaxiosPromise<Schema$Location>;
        get(params: Params$Resource$Projects$Locations$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Projects$Locations$Get, options: MethodOptions | BodyResponseCallback<Schema$Location>, callback: BodyResponseCallback<Schema$Location>): void;
        get(params: Params$Resource$Projects$Locations$Get, callback: BodyResponseCallback<Schema$Location>): void;
        get(callback: BodyResponseCallback<Schema$Location>): void;
        /**
         * firestore.projects.locations.list
         * @desc Lists information about the supported locations for this service.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/firestore.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const firestore = google.firestore('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/datastore',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await firestore.projects.locations.list({
         *     // The standard list filter.
         *     filter: 'placeholder-value',
         *     // The resource that owns the locations collection, if applicable.
         *     name: 'projects/my-project',
         *     // The standard list page size.
         *     pageSize: 'placeholder-value',
         *     // The standard list page token.
         *     pageToken: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "locations": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias firestore.projects.locations.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.filter The standard list filter.
         * @param {string} params.name The resource that owns the locations collection, if applicable.
         * @param {integer=} params.pageSize The standard list page size.
         * @param {string=} params.pageToken The standard list page token.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Projects$Locations$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Projects$Locations$List, options?: MethodOptions): GaxiosPromise<Schema$ListLocationsResponse>;
        list(params: Params$Resource$Projects$Locations$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Projects$Locations$List, options: MethodOptions | BodyResponseCallback<Schema$ListLocationsResponse>, callback: BodyResponseCallback<Schema$ListLocationsResponse>): void;
        list(params: Params$Resource$Projects$Locations$List, callback: BodyResponseCallback<Schema$ListLocationsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListLocationsResponse>): void;
    }
    export interface Params$Resource$Projects$Locations$Get extends StandardParameters {
        /**
         * Resource name for the location.
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Locations$List extends StandardParameters {
        /**
         * The standard list filter.
         */
        filter?: string;
        /**
         * The resource that owns the locations collection, if applicable.
         */
        name?: string;
        /**
         * The standard list page size.
         */
        pageSize?: number;
        /**
         * The standard list page token.
         */
        pageToken?: string;
    }
    export {};
}
