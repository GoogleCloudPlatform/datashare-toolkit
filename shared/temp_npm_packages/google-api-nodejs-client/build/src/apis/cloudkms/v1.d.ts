/// <reference types="node" />
import { OAuth2Client, JWT, Compute, UserRefreshClient, GaxiosPromise, GoogleConfigurable, MethodOptions, StreamMethodOptions, GlobalOptions, GoogleAuth, BodyResponseCallback, APIRequestContext } from 'googleapis-common';
import { Readable } from 'stream';
export declare namespace cloudkms_v1 {
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
     * Cloud Key Management Service (KMS) API
     *
     * Manages keys and performs cryptographic operations in a central cloud service, for direct use by other cloud resources and applications.
     *
     * @example
     * const {google} = require('googleapis');
     * const cloudkms = google.cloudkms('v1');
     *
     * @namespace cloudkms
     * @type {Function}
     * @version v1
     * @variation v1
     * @param {object=} options Options for Cloudkms
     */
    export class Cloudkms {
        context: APIRequestContext;
        projects: Resource$Projects;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
    }
    /**
     * Request message for KeyManagementService.AsymmetricDecrypt.
     */
    export interface Schema$AsymmetricDecryptRequest {
        /**
         * Required. The data encrypted with the named CryptoKeyVersion&#39;s public key using OAEP.
         */
        ciphertext?: string | null;
        /**
         * Optional. An optional CRC32C checksum of the AsymmetricDecryptRequest.ciphertext. If specified, KeyManagementService will verify the integrity of the received AsymmetricDecryptRequest.ciphertext using this checksum. KeyManagementService will report an error if the checksum verification fails. If you receive a checksum error, your client should verify that CRC32C(AsymmetricDecryptRequest.ciphertext) is equal to AsymmetricDecryptRequest.ciphertext_crc32c, and if so, perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type.  NOTE: This field is in Beta.
         */
        ciphertextCrc32c?: string | null;
    }
    /**
     * Response message for KeyManagementService.AsymmetricDecrypt.
     */
    export interface Schema$AsymmetricDecryptResponse {
        /**
         * The decrypted data originally encrypted with the matching public key.
         */
        plaintext?: string | null;
        /**
         * Integrity verification field. A CRC32C checksum of the returned AsymmetricDecryptResponse.plaintext. An integrity check of AsymmetricDecryptResponse.plaintext can be performed by computing the CRC32C checksum of AsymmetricDecryptResponse.plaintext and comparing your results to this field. Discard the response in case of non-matching checksum values, and perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type.  NOTE: This field is in Beta.
         */
        plaintextCrc32c?: string | null;
        /**
         * Integrity verification field. A flag indicating whether AsymmetricDecryptRequest.ciphertext_crc32c was received by KeyManagementService and used for the integrity verification of the ciphertext. A false value of this field indicates either that AsymmetricDecryptRequest.ciphertext_crc32c was left unset or that it was not delivered to KeyManagementService. If you&#39;ve set AsymmetricDecryptRequest.ciphertext_crc32c but this field is still false, discard the response and perform a limited number of retries.  NOTE: This field is in Beta.
         */
        verifiedCiphertextCrc32c?: boolean | null;
    }
    /**
     * Request message for KeyManagementService.AsymmetricSign.
     */
    export interface Schema$AsymmetricSignRequest {
        /**
         * Required. The digest of the data to sign. The digest must be produced with the same digest algorithm as specified by the key version&#39;s algorithm.
         */
        digest?: Schema$Digest;
        /**
         * Optional. An optional CRC32C checksum of the AsymmetricSignRequest.digest. If specified, KeyManagementService will verify the integrity of the received AsymmetricSignRequest.digest using this checksum. KeyManagementService will report an error if the checksum verification fails. If you receive a checksum error, your client should verify that CRC32C(AsymmetricSignRequest.digest) is equal to AsymmetricSignRequest.digest_crc32c, and if so, perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type.  NOTE: This field is in Beta.
         */
        digestCrc32c?: string | null;
    }
    /**
     * Response message for KeyManagementService.AsymmetricSign.
     */
    export interface Schema$AsymmetricSignResponse {
        /**
         * The resource name of the CryptoKeyVersion used for signing. Check this field to verify that the intended resource was used for signing.  NOTE: This field is in Beta.
         */
        name?: string | null;
        /**
         * The created signature.
         */
        signature?: string | null;
        /**
         * Integrity verification field. A CRC32C checksum of the returned AsymmetricSignResponse.signature. An integrity check of AsymmetricSignResponse.signature can be performed by computing the CRC32C checksum of AsymmetricSignResponse.signature and comparing your results to this field. Discard the response in case of non-matching checksum values, and perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type.  NOTE: This field is in Beta.
         */
        signatureCrc32c?: string | null;
        /**
         * Integrity verification field. A flag indicating whether AsymmetricSignRequest.digest_crc32c was received by KeyManagementService and used for the integrity verification of the digest. A false value of this field indicates either that AsymmetricSignRequest.digest_crc32c was left unset or that it was not delivered to KeyManagementService. If you&#39;ve set AsymmetricSignRequest.digest_crc32c but this field is still false, discard the response and perform a limited number of retries.  NOTE: This field is in Beta.
         */
        verifiedDigestCrc32c?: boolean | null;
    }
    /**
     * Specifies the audit configuration for a service. The configuration determines which permission types are logged, and what identities, if any, are exempted from logging. An AuditConfig must have one or more AuditLogConfigs.  If there are AuditConfigs for both `allServices` and a specific service, the union of the two AuditConfigs is used for that service: the log_types specified in each AuditConfig are enabled, and the exempted_members in each AuditLogConfig are exempted.  Example Policy with multiple AuditConfigs:      {       &quot;audit_configs&quot;: [         {           &quot;service&quot;: &quot;allServices&quot;           &quot;audit_log_configs&quot;: [             {               &quot;log_type&quot;: &quot;DATA_READ&quot;,               &quot;exempted_members&quot;: [                 &quot;user:jose@example.com&quot;               ]             },             {               &quot;log_type&quot;: &quot;DATA_WRITE&quot;,             },             {               &quot;log_type&quot;: &quot;ADMIN_READ&quot;,             }           ]         },         {           &quot;service&quot;: &quot;sampleservice.googleapis.com&quot;           &quot;audit_log_configs&quot;: [             {               &quot;log_type&quot;: &quot;DATA_READ&quot;,             },             {               &quot;log_type&quot;: &quot;DATA_WRITE&quot;,               &quot;exempted_members&quot;: [                 &quot;user:aliya@example.com&quot;               ]             }           ]         }       ]     }  For sampleservice, this policy enables DATA_READ, DATA_WRITE and ADMIN_READ logging. It also exempts jose@example.com from DATA_READ logging, and aliya@example.com from DATA_WRITE logging.
     */
    export interface Schema$AuditConfig {
        /**
         * The configuration for logging of each type of permission.
         */
        auditLogConfigs?: Schema$AuditLogConfig[];
        /**
         * Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services.
         */
        service?: string | null;
    }
    /**
     * Provides the configuration for logging a type of permissions. Example:      {       &quot;audit_log_configs&quot;: [         {           &quot;log_type&quot;: &quot;DATA_READ&quot;,           &quot;exempted_members&quot;: [             &quot;user:jose@example.com&quot;           ]         },         {           &quot;log_type&quot;: &quot;DATA_WRITE&quot;,         }       ]     }  This enables &#39;DATA_READ&#39; and &#39;DATA_WRITE&#39; logging, while exempting jose@example.com from DATA_READ logging.
     */
    export interface Schema$AuditLogConfig {
        /**
         * Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members.
         */
        exemptedMembers?: string[] | null;
        /**
         * The log type that this config enables.
         */
        logType?: string | null;
    }
    /**
     * Associates `members` with a `role`.
     */
    export interface Schema$Binding {
        /**
         * The condition that is associated with this binding.  If the condition evaluates to `true`, then this binding applies to the current request.  If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the members in this binding.  To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
         */
        condition?: Schema$Expr;
        /**
         * Specifies the identities requesting access for a Cloud Platform resource. `members` can have the following values:  * `allUsers`: A special identifier that represents anyone who is    on the internet; with or without a Google account.  * `allAuthenticatedUsers`: A special identifier that represents anyone    who is authenticated with a Google account or a service account.  * `user:{emailid}`: An email address that represents a specific Google    account. For example, `alice@example.com` .   * `serviceAccount:{emailid}`: An email address that represents a service    account. For example, `my-other-app@appspot.gserviceaccount.com`.  * `group:{emailid}`: An email address that represents a Google group.    For example, `admins@example.com`.  * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique    identifier) representing a user that has been recently deleted. For    example, `alice@example.com?uid=123456789012345678901`. If the user is    recovered, this value reverts to `user:{emailid}` and the recovered user    retains the role in the binding.  * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus    unique identifier) representing a service account that has been recently    deleted. For example,    `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`.    If the service account is undeleted, this value reverts to    `serviceAccount:{emailid}` and the undeleted service account retains the    role in the binding.  * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique    identifier) representing a Google group that has been recently    deleted. For example, `admins@example.com?uid=123456789012345678901`. If    the group is recovered, this value reverts to `group:{emailid}` and the    recovered group retains the role in the binding.   * `domain:{domain}`: The G Suite domain (primary) that represents all the    users of that domain. For example, `google.com` or `example.com`.
         */
        members?: string[] | null;
        /**
         * Role that is assigned to `members`. For example, `roles/viewer`, `roles/editor`, or `roles/owner`.
         */
        role?: string | null;
    }
    /**
     * A CryptoKey represents a logical key that can be used for cryptographic operations.  A CryptoKey is made up of zero or more versions, which represent the actual key material used in cryptographic operations.
     */
    export interface Schema$CryptoKey {
        /**
         * Output only. The time at which this CryptoKey was created.
         */
        createTime?: string | null;
        /**
         * Labels with user-defined metadata. For more information, see [Labeling Keys](/kms/docs/labeling-keys).
         */
        labels?: {
            [key: string]: string;
        } | null;
        /**
         * Output only. The resource name for this CryptoKey in the format `projects/x/locations/x/keyRings/x/cryptoKeys/x.
         */
        name?: string | null;
        /**
         * At next_rotation_time, the Key Management Service will automatically:  1. Create a new version of this CryptoKey. 2. Mark the new version as primary.  Key rotations performed manually via CreateCryptoKeyVersion and UpdateCryptoKeyPrimaryVersion do not affect next_rotation_time.  Keys with purpose ENCRYPT_DECRYPT support automatic rotation. For other keys, this field must be omitted.
         */
        nextRotationTime?: string | null;
        /**
         * Output only. A copy of the &quot;primary&quot; CryptoKeyVersion that will be used by Encrypt when this CryptoKey is given in EncryptRequest.name.  The CryptoKey&#39;s primary version can be updated via UpdateCryptoKeyPrimaryVersion.  Keys with purpose ENCRYPT_DECRYPT may have a primary. For other keys, this field will be omitted.
         */
        primary?: Schema$CryptoKeyVersion;
        /**
         * Immutable. The immutable purpose of this CryptoKey.
         */
        purpose?: string | null;
        /**
         * next_rotation_time will be advanced by this period when the service automatically rotates a key. Must be at least 24 hours and at most 876,000 hours.  If rotation_period is set, next_rotation_time must also be set.  Keys with purpose ENCRYPT_DECRYPT support automatic rotation. For other keys, this field must be omitted.
         */
        rotationPeriod?: string | null;
        /**
         * A template describing settings for new CryptoKeyVersion instances. The properties of new CryptoKeyVersion instances created by either CreateCryptoKeyVersion or auto-rotation are controlled by this template.
         */
        versionTemplate?: Schema$CryptoKeyVersionTemplate;
    }
    /**
     * A CryptoKeyVersion represents an individual cryptographic key, and the associated key material.  An ENABLED version can be used for cryptographic operations.  For security reasons, the raw cryptographic key material represented by a CryptoKeyVersion can never be viewed or exported. It can only be used to encrypt, decrypt, or sign data when an authorized user or application invokes Cloud KMS.
     */
    export interface Schema$CryptoKeyVersion {
        /**
         * Output only. The CryptoKeyVersionAlgorithm that this CryptoKeyVersion supports.
         */
        algorithm?: string | null;
        /**
         * Output only. Statement that was generated and signed by the HSM at key creation time. Use this statement to verify attributes of the key as stored on the HSM, independently of Google. Only provided for key versions with protection_level HSM.
         */
        attestation?: Schema$KeyOperationAttestation;
        /**
         * Output only. The time at which this CryptoKeyVersion was created.
         */
        createTime?: string | null;
        /**
         * Output only. The time this CryptoKeyVersion&#39;s key material was destroyed. Only present if state is DESTROYED.
         */
        destroyEventTime?: string | null;
        /**
         * Output only. The time this CryptoKeyVersion&#39;s key material is scheduled for destruction. Only present if state is DESTROY_SCHEDULED.
         */
        destroyTime?: string | null;
        /**
         * ExternalProtectionLevelOptions stores a group of additional fields for configuring a CryptoKeyVersion that are specific to the EXTERNAL protection level.
         */
        externalProtectionLevelOptions?: Schema$ExternalProtectionLevelOptions;
        /**
         * Output only. The time this CryptoKeyVersion&#39;s key material was generated.
         */
        generateTime?: string | null;
        /**
         * Output only. The root cause of an import failure. Only present if state is IMPORT_FAILED.
         */
        importFailureReason?: string | null;
        /**
         * Output only. The name of the ImportJob used to import this CryptoKeyVersion. Only present if the underlying key material was imported.
         */
        importJob?: string | null;
        /**
         * Output only. The time at which this CryptoKeyVersion&#39;s key material was imported.
         */
        importTime?: string | null;
        /**
         * Output only. The resource name for this CryptoKeyVersion in the format `projects/x/locations/x/keyRings/x/cryptoKeys/x/cryptoKeyVersions/x.
         */
        name?: string | null;
        /**
         * Output only. The ProtectionLevel describing how crypto operations are performed with this CryptoKeyVersion.
         */
        protectionLevel?: string | null;
        /**
         * The current state of the CryptoKeyVersion.
         */
        state?: string | null;
    }
    /**
     * A CryptoKeyVersionTemplate specifies the properties to use when creating a new CryptoKeyVersion, either manually with CreateCryptoKeyVersion or automatically as a result of auto-rotation.
     */
    export interface Schema$CryptoKeyVersionTemplate {
        /**
         * Required. Algorithm to use when creating a CryptoKeyVersion based on this template.  For backwards compatibility, GOOGLE_SYMMETRIC_ENCRYPTION is implied if both this field is omitted and CryptoKey.purpose is ENCRYPT_DECRYPT.
         */
        algorithm?: string | null;
        /**
         * ProtectionLevel to use when creating a CryptoKeyVersion based on this template. Immutable. Defaults to SOFTWARE.
         */
        protectionLevel?: string | null;
    }
    /**
     * Request message for KeyManagementService.Decrypt.
     */
    export interface Schema$DecryptRequest {
        /**
         * Optional. Optional data that must match the data originally supplied in EncryptRequest.additional_authenticated_data.
         */
        additionalAuthenticatedData?: string | null;
        /**
         * Optional. An optional CRC32C checksum of the DecryptRequest.additional_authenticated_data. If specified, KeyManagementService will verify the integrity of the received DecryptRequest.additional_authenticated_data using this checksum. KeyManagementService will report an error if the checksum verification fails. If you receive a checksum error, your client should verify that CRC32C(DecryptRequest.additional_authenticated_data) is equal to DecryptRequest.additional_authenticated_data_crc32c, and if so, perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type.  NOTE: This field is in Beta.
         */
        additionalAuthenticatedDataCrc32c?: string | null;
        /**
         * Required. The encrypted data originally returned in EncryptResponse.ciphertext.
         */
        ciphertext?: string | null;
        /**
         * Optional. An optional CRC32C checksum of the DecryptRequest.ciphertext. If specified, KeyManagementService will verify the integrity of the received DecryptRequest.ciphertext using this checksum. KeyManagementService will report an error if the checksum verification fails. If you receive a checksum error, your client should verify that CRC32C(DecryptRequest.ciphertext) is equal to DecryptRequest.ciphertext_crc32c, and if so, perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type.  NOTE: This field is in Beta.
         */
        ciphertextCrc32c?: string | null;
    }
    /**
     * Response message for KeyManagementService.Decrypt.
     */
    export interface Schema$DecryptResponse {
        /**
         * The decrypted data originally supplied in EncryptRequest.plaintext.
         */
        plaintext?: string | null;
        /**
         * Integrity verification field. A CRC32C checksum of the returned DecryptResponse.plaintext. An integrity check of DecryptResponse.plaintext can be performed by computing the CRC32C checksum of DecryptResponse.plaintext and comparing your results to this field. Discard the response in case of non-matching checksum values, and perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: receiving this response message indicates that KeyManagementService is able to successfully decrypt the ciphertext. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type.  NOTE: This field is in Beta.
         */
        plaintextCrc32c?: string | null;
    }
    /**
     * Request message for KeyManagementService.DestroyCryptoKeyVersion.
     */
    export interface Schema$DestroyCryptoKeyVersionRequest {
    }
    /**
     * A Digest holds a cryptographic message digest.
     */
    export interface Schema$Digest {
        /**
         * A message digest produced with the SHA-256 algorithm.
         */
        sha256?: string | null;
        /**
         * A message digest produced with the SHA-384 algorithm.
         */
        sha384?: string | null;
        /**
         * A message digest produced with the SHA-512 algorithm.
         */
        sha512?: string | null;
    }
    /**
     * Request message for KeyManagementService.Encrypt.
     */
    export interface Schema$EncryptRequest {
        /**
         * Optional. Optional data that, if specified, must also be provided during decryption through DecryptRequest.additional_authenticated_data.  The maximum size depends on the key version&#39;s protection_level. For SOFTWARE keys, the AAD must be no larger than 64KiB. For HSM keys, the combined length of the plaintext and additional_authenticated_data fields must be no larger than 8KiB.
         */
        additionalAuthenticatedData?: string | null;
        /**
         * Optional. An optional CRC32C checksum of the EncryptRequest.additional_authenticated_data. If specified, KeyManagementService will verify the integrity of the received EncryptRequest.additional_authenticated_data using this checksum. KeyManagementService will report an error if the checksum verification fails. If you receive a checksum error, your client should verify that CRC32C(EncryptRequest.additional_authenticated_data) is equal to EncryptRequest.additional_authenticated_data_crc32c, and if so, perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type.  NOTE: This field is in Beta.
         */
        additionalAuthenticatedDataCrc32c?: string | null;
        /**
         * Required. The data to encrypt. Must be no larger than 64KiB.  The maximum size depends on the key version&#39;s protection_level. For SOFTWARE keys, the plaintext must be no larger than 64KiB. For HSM keys, the combined length of the plaintext and additional_authenticated_data fields must be no larger than 8KiB.
         */
        plaintext?: string | null;
        /**
         * Optional. An optional CRC32C checksum of the EncryptRequest.plaintext. If specified, KeyManagementService will verify the integrity of the received EncryptRequest.plaintext using this checksum. KeyManagementService will report an error if the checksum verification fails. If you receive a checksum error, your client should verify that CRC32C(EncryptRequest.plaintext) is equal to EncryptRequest.plaintext_crc32c, and if so, perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type.  NOTE: This field is in Beta.
         */
        plaintextCrc32c?: string | null;
    }
    /**
     * Response message for KeyManagementService.Encrypt.
     */
    export interface Schema$EncryptResponse {
        /**
         * The encrypted data.
         */
        ciphertext?: string | null;
        /**
         * Integrity verification field. A CRC32C checksum of the returned EncryptResponse.ciphertext. An integrity check of EncryptResponse.ciphertext can be performed by computing the CRC32C checksum of EncryptResponse.ciphertext and comparing your results to this field. Discard the response in case of non-matching checksum values, and perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type.  NOTE: This field is in Beta.
         */
        ciphertextCrc32c?: string | null;
        /**
         * The resource name of the CryptoKeyVersion used in encryption. Check this field to verify that the intended resource was used for encryption.
         */
        name?: string | null;
        /**
         * Integrity verification field. A flag indicating whether EncryptRequest.additional_authenticated_data_crc32c was received by KeyManagementService and used for the integrity verification of the AAD. A false value of this field indicates either that EncryptRequest.additional_authenticated_data_crc32c was left unset or that it was not delivered to KeyManagementService. If you&#39;ve set EncryptRequest.additional_authenticated_data_crc32c but this field is still false, discard the response and perform a limited number of retries.  NOTE: This field is in Beta.
         */
        verifiedAdditionalAuthenticatedDataCrc32c?: boolean | null;
        /**
         * Integrity verification field. A flag indicating whether EncryptRequest.plaintext_crc32c was received by KeyManagementService and used for the integrity verification of the plaintext. A false value of this field indicates either that EncryptRequest.plaintext_crc32c was left unset or that it was not delivered to KeyManagementService. If you&#39;ve set EncryptRequest.plaintext_crc32c but this field is still false, discard the response and perform a limited number of retries.  NOTE: This field is in Beta.
         */
        verifiedPlaintextCrc32c?: boolean | null;
    }
    /**
     * Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec.  Example (Comparison):      title: &quot;Summary size limit&quot;     description: &quot;Determines if a summary is less than 100 chars&quot;     expression: &quot;document.summary.size() &lt; 100&quot;  Example (Equality):      title: &quot;Requestor is owner&quot;     description: &quot;Determines if requestor is the document owner&quot;     expression: &quot;document.owner == request.auth.claims.email&quot;  Example (Logic):      title: &quot;Public documents&quot;     description: &quot;Determine whether the document should be publicly visible&quot;     expression: &quot;document.type != &#39;private&#39; &amp;&amp; document.type != &#39;internal&#39;&quot;  Example (Data Manipulation):      title: &quot;Notification string&quot;     description: &quot;Create a notification string with a timestamp.&quot;     expression: &quot;&#39;New message received at &#39; + string(document.create_time)&quot;  The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
     */
    export interface Schema$Expr {
        /**
         * Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI.
         */
        description?: string | null;
        /**
         * Textual representation of an expression in Common Expression Language syntax.
         */
        expression?: string | null;
        /**
         * Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file.
         */
        location?: string | null;
        /**
         * Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression.
         */
        title?: string | null;
    }
    /**
     * ExternalProtectionLevelOptions stores a group of additional fields for configuring a CryptoKeyVersion that are specific to the EXTERNAL protection level.
     */
    export interface Schema$ExternalProtectionLevelOptions {
        /**
         * The URI for an external resource that this CryptoKeyVersion represents.
         */
        externalKeyUri?: string | null;
    }
    /**
     * Request message for KeyManagementService.ImportCryptoKeyVersion.
     */
    export interface Schema$ImportCryptoKeyVersionRequest {
        /**
         * Required. The algorithm of the key being imported. This does not need to match the version_template of the CryptoKey this version imports into.
         */
        algorithm?: string | null;
        /**
         * Required. The name of the ImportJob that was used to wrap this key material.
         */
        importJob?: string | null;
        /**
         * Wrapped key material produced with RSA_OAEP_3072_SHA1_AES_256 or RSA_OAEP_4096_SHA1_AES_256.  This field contains the concatenation of two wrapped keys: &lt;ol&gt;   &lt;li&gt;An ephemeral AES-256 wrapping key wrapped with the       public_key using RSAES-OAEP with SHA-1,       MGF1 with SHA-1, and an empty label.   &lt;/li&gt;   &lt;li&gt;The key to be imported, wrapped with the ephemeral AES-256 key       using AES-KWP (RFC 5649).   &lt;/li&gt; &lt;/ol&gt;  If importing symmetric key material, it is expected that the unwrapped key contains plain bytes. If importing asymmetric key material, it is expected that the unwrapped key is in PKCS#8-encoded DER format (the PrivateKeyInfo structure from RFC 5208).  This format is the same as the format produced by PKCS#11 mechanism CKM_RSA_AES_KEY_WRAP.
         */
        rsaAesWrappedKey?: string | null;
    }
    /**
     * An ImportJob can be used to create CryptoKeys and CryptoKeyVersions using pre-existing key material, generated outside of Cloud KMS.  When an ImportJob is created, Cloud KMS will generate a &quot;wrapping key&quot;, which is a public/private key pair. You use the wrapping key to encrypt (also known as wrap) the pre-existing key material to protect it during the import process. The nature of the wrapping key depends on the choice of import_method. When the wrapping key generation is complete, the state will be set to ACTIVE and the public_key can be fetched. The fetched public key can then be used to wrap your pre-existing key material.  Once the key material is wrapped, it can be imported into a new CryptoKeyVersion in an existing CryptoKey by calling ImportCryptoKeyVersion. Multiple CryptoKeyVersions can be imported with a single ImportJob. Cloud KMS uses the private key portion of the wrapping key to unwrap the key material. Only Cloud KMS has access to the private key.  An ImportJob expires 3 days after it is created. Once expired, Cloud KMS will no longer be able to import or unwrap any key material that was wrapped with the ImportJob&#39;s public key.  For more information, see [Importing a key](https://cloud.google.com/kms/docs/importing-a-key).
     */
    export interface Schema$ImportJob {
        /**
         * Output only. Statement that was generated and signed by the key creator (for example, an HSM) at key creation time. Use this statement to verify attributes of the key as stored on the HSM, independently of Google. Only present if the chosen ImportMethod is one with a protection level of HSM.
         */
        attestation?: Schema$KeyOperationAttestation;
        /**
         * Output only. The time at which this ImportJob was created.
         */
        createTime?: string | null;
        /**
         * Output only. The time this ImportJob expired. Only present if state is EXPIRED.
         */
        expireEventTime?: string | null;
        /**
         * Output only. The time at which this ImportJob is scheduled for expiration and can no longer be used to import key material.
         */
        expireTime?: string | null;
        /**
         * Output only. The time this ImportJob&#39;s key material was generated.
         */
        generateTime?: string | null;
        /**
         * Required. Immutable. The wrapping method to be used for incoming key material.
         */
        importMethod?: string | null;
        /**
         * Output only. The resource name for this ImportJob in the format `projects/x/locations/x/keyRings/x/importJobs/x.
         */
        name?: string | null;
        /**
         * Required. Immutable. The protection level of the ImportJob. This must match the protection_level of the version_template on the CryptoKey you attempt to import into.
         */
        protectionLevel?: string | null;
        /**
         * Output only. The public key with which to wrap key material prior to import. Only returned if state is ACTIVE.
         */
        publicKey?: Schema$WrappingPublicKey;
        /**
         * Output only. The current state of the ImportJob, indicating if it can be used.
         */
        state?: string | null;
    }
    /**
     * Contains an HSM-generated attestation about a key operation. For more information, see [Verifying attestations] (https://cloud.google.com/kms/docs/attest-key).
     */
    export interface Schema$KeyOperationAttestation {
        /**
         * Output only. The attestation data provided by the HSM when the key operation was performed.
         */
        content?: string | null;
        /**
         * Output only. The format of the attestation data.
         */
        format?: string | null;
    }
    /**
     * A KeyRing is a toplevel logical grouping of CryptoKeys.
     */
    export interface Schema$KeyRing {
        /**
         * Output only. The time at which this KeyRing was created.
         */
        createTime?: string | null;
        /**
         * Output only. The resource name for the KeyRing in the format `projects/x/locations/x/keyRings/x.
         */
        name?: string | null;
    }
    /**
     * Response message for KeyManagementService.ListCryptoKeys.
     */
    export interface Schema$ListCryptoKeysResponse {
        /**
         * The list of CryptoKeys.
         */
        cryptoKeys?: Schema$CryptoKey[];
        /**
         * A token to retrieve next page of results. Pass this value in ListCryptoKeysRequest.page_token to retrieve the next page of results.
         */
        nextPageToken?: string | null;
        /**
         * The total number of CryptoKeys that matched the query.
         */
        totalSize?: number | null;
    }
    /**
     * Response message for KeyManagementService.ListCryptoKeyVersions.
     */
    export interface Schema$ListCryptoKeyVersionsResponse {
        /**
         * The list of CryptoKeyVersions.
         */
        cryptoKeyVersions?: Schema$CryptoKeyVersion[];
        /**
         * A token to retrieve next page of results. Pass this value in ListCryptoKeyVersionsRequest.page_token to retrieve the next page of results.
         */
        nextPageToken?: string | null;
        /**
         * The total number of CryptoKeyVersions that matched the query.
         */
        totalSize?: number | null;
    }
    /**
     * Response message for KeyManagementService.ListImportJobs.
     */
    export interface Schema$ListImportJobsResponse {
        /**
         * The list of ImportJobs.
         */
        importJobs?: Schema$ImportJob[];
        /**
         * A token to retrieve next page of results. Pass this value in ListImportJobsRequest.page_token to retrieve the next page of results.
         */
        nextPageToken?: string | null;
        /**
         * The total number of ImportJobs that matched the query.
         */
        totalSize?: number | null;
    }
    /**
     * Response message for KeyManagementService.ListKeyRings.
     */
    export interface Schema$ListKeyRingsResponse {
        /**
         * The list of KeyRings.
         */
        keyRings?: Schema$KeyRing[];
        /**
         * A token to retrieve next page of results. Pass this value in ListKeyRingsRequest.page_token to retrieve the next page of results.
         */
        nextPageToken?: string | null;
        /**
         * The total number of KeyRings that matched the query.
         */
        totalSize?: number | null;
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
     * Cloud KMS metadata for the given google.cloud.location.Location.
     */
    export interface Schema$LocationMetadata {
        /**
         * Indicates whether CryptoKeys with protection_level EXTERNAL can be created in this location.
         */
        ekmAvailable?: boolean | null;
        /**
         * Indicates whether CryptoKeys with protection_level HSM can be created in this location.
         */
        hsmAvailable?: boolean | null;
    }
    /**
     * An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources.   A `Policy` is a collection of `bindings`. A `binding` binds one or more `members` to a single `role`. Members can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role.  For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies).  **JSON example:**      {       &quot;bindings&quot;: [         {           &quot;role&quot;: &quot;roles/resourcemanager.organizationAdmin&quot;,           &quot;members&quot;: [             &quot;user:mike@example.com&quot;,             &quot;group:admins@example.com&quot;,             &quot;domain:google.com&quot;,             &quot;serviceAccount:my-project-id@appspot.gserviceaccount.com&quot;           ]         },         {           &quot;role&quot;: &quot;roles/resourcemanager.organizationViewer&quot;,           &quot;members&quot;: [             &quot;user:eve@example.com&quot;           ],           &quot;condition&quot;: {             &quot;title&quot;: &quot;expirable access&quot;,             &quot;description&quot;: &quot;Does not grant access after Sep 2020&quot;,             &quot;expression&quot;: &quot;request.time &lt; timestamp(&#39;2020-10-01T00:00:00.000Z&#39;)&quot;,           }         }       ],       &quot;etag&quot;: &quot;BwWWja0YfJA=&quot;,       &quot;version&quot;: 3     }  **YAML example:**      bindings:     - members:       - user:mike@example.com       - group:admins@example.com       - domain:google.com       - serviceAccount:my-project-id@appspot.gserviceaccount.com       role: roles/resourcemanager.organizationAdmin     - members:       - user:eve@example.com       role: roles/resourcemanager.organizationViewer       condition:         title: expirable access         description: Does not grant access after Sep 2020         expression: request.time &lt; timestamp(&#39;2020-10-01T00:00:00.000Z&#39;)     - etag: BwWWja0YfJA=     - version: 3  For a description of IAM and its features, see the [IAM documentation](https://cloud.google.com/iam/docs/).
     */
    export interface Schema$Policy {
        /**
         * Specifies cloud audit logging configuration for this policy.
         */
        auditConfigs?: Schema$AuditConfig[];
        /**
         * Associates a list of `members` to a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one member.
         */
        bindings?: Schema$Binding[];
        /**
         * `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy.  **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost.
         */
        etag?: string | null;
        /**
         * Specifies the format of the policy.  Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected.  Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations:  * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy   that includes conditions  **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost.  If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset.  To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
         */
        version?: number | null;
    }
    /**
     * The public key for a given CryptoKeyVersion. Obtained via GetPublicKey.
     */
    export interface Schema$PublicKey {
        /**
         * The Algorithm associated with this key.
         */
        algorithm?: string | null;
        /**
         * The name of the CryptoKeyVersion public key. Provided here for verification.  NOTE: This field is in Beta.
         */
        name?: string | null;
        /**
         * The public key, encoded in PEM format. For more information, see the [RFC 7468](https://tools.ietf.org/html/rfc7468) sections for [General Considerations](https://tools.ietf.org/html/rfc7468#section-2) and [Textual Encoding of Subject Public Key Info] (https://tools.ietf.org/html/rfc7468#section-13).
         */
        pem?: string | null;
        /**
         * Integrity verification field. A CRC32C checksum of the returned PublicKey.pem. An integrity check of PublicKey.pem can be performed by computing the CRC32C checksum of PublicKey.pem and comparing your results to this field. Discard the response in case of non-matching checksum values, and perform a limited number of retries. A persistent mismatch may indicate an issue in your computation of the CRC32C checksum. Note: This field is defined as int64 for reasons of compatibility across different languages. However, it is a non-negative integer, which will never exceed 2^32-1, and can be safely downconverted to uint32 in languages that support this type.  NOTE: This field is in Beta.
         */
        pemCrc32c?: string | null;
    }
    /**
     * Request message for KeyManagementService.RestoreCryptoKeyVersion.
     */
    export interface Schema$RestoreCryptoKeyVersionRequest {
    }
    /**
     * Request message for `SetIamPolicy` method.
     */
    export interface Schema$SetIamPolicyRequest {
        /**
         * REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Cloud Platform services (such as Projects) might reject them.
         */
        policy?: Schema$Policy;
        /**
         * OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used:  `paths: &quot;bindings, etag&quot;`
         */
        updateMask?: string | null;
    }
    /**
     * Request message for `TestIamPermissions` method.
     */
    export interface Schema$TestIamPermissionsRequest {
        /**
         * The set of permissions to check for the `resource`. Permissions with wildcards (such as &#39;*&#39; or &#39;storage.*&#39;) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions).
         */
        permissions?: string[] | null;
    }
    /**
     * Response message for `TestIamPermissions` method.
     */
    export interface Schema$TestIamPermissionsResponse {
        /**
         * A subset of `TestPermissionsRequest.permissions` that the caller is allowed.
         */
        permissions?: string[] | null;
    }
    /**
     * Request message for KeyManagementService.UpdateCryptoKeyPrimaryVersion.
     */
    export interface Schema$UpdateCryptoKeyPrimaryVersionRequest {
        /**
         * Required. The id of the child CryptoKeyVersion to use as primary.
         */
        cryptoKeyVersionId?: string | null;
    }
    /**
     * The public key component of the wrapping key. For details of the type of key this public key corresponds to, see the ImportMethod.
     */
    export interface Schema$WrappingPublicKey {
        /**
         * The public key, encoded in PEM format. For more information, see the [RFC 7468](https://tools.ietf.org/html/rfc7468) sections for [General Considerations](https://tools.ietf.org/html/rfc7468#section-2) and [Textual Encoding of Subject Public Key Info] (https://tools.ietf.org/html/rfc7468#section-13).
         */
        pem?: string | null;
    }
    export class Resource$Projects {
        context: APIRequestContext;
        locations: Resource$Projects$Locations;
        constructor(context: APIRequestContext);
    }
    export class Resource$Projects$Locations {
        context: APIRequestContext;
        keyRings: Resource$Projects$Locations$Keyrings;
        constructor(context: APIRequestContext);
        /**
         * cloudkms.projects.locations.get
         * @desc Gets information about a location.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudkms.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudkms = google.cloudkms('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudkms',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await cloudkms.projects.locations.get({
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
         * @alias cloudkms.projects.locations.get
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
         * cloudkms.projects.locations.list
         * @desc Lists information about the supported locations for this service.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudkms.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudkms = google.cloudkms('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudkms',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await cloudkms.projects.locations.list({
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
         * @alias cloudkms.projects.locations.list
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
    export class Resource$Projects$Locations$Keyrings {
        context: APIRequestContext;
        cryptoKeys: Resource$Projects$Locations$Keyrings$Cryptokeys;
        importJobs: Resource$Projects$Locations$Keyrings$Importjobs;
        constructor(context: APIRequestContext);
        /**
         * cloudkms.projects.locations.keyRings.create
         * @desc Create a new KeyRing in a given Project and Location.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudkms.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudkms = google.cloudkms('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudkms',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await cloudkms.projects.locations.keyRings.create({
         *     // Required. It must be unique within a location and match the regular
         *     // expression `[a-zA-Z0-9_-]{1,63}`
         *     keyRingId: 'placeholder-value',
         *     // Required. The resource name of the location associated with the
         *     // KeyRings, in the format `projects/x/locations/x`.
         *     parent: 'projects/my-project/locations/my-location',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "createTime": "my_createTime",
         *       //   "name": "my_name"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "createTime": "my_createTime",
         *   //   "name": "my_name"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudkms.projects.locations.keyRings.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.keyRingId Required. It must be unique within a location and match the regular expression `[a-zA-Z0-9_-]{1,63}`
         * @param {string} params.parent Required. The resource name of the location associated with the KeyRings, in the format `projects/x/locations/x`.
         * @param {().KeyRing} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Projects$Locations$Keyrings$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Projects$Locations$Keyrings$Create, options?: MethodOptions): GaxiosPromise<Schema$KeyRing>;
        create(params: Params$Resource$Projects$Locations$Keyrings$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Projects$Locations$Keyrings$Create, options: MethodOptions | BodyResponseCallback<Schema$KeyRing>, callback: BodyResponseCallback<Schema$KeyRing>): void;
        create(params: Params$Resource$Projects$Locations$Keyrings$Create, callback: BodyResponseCallback<Schema$KeyRing>): void;
        create(callback: BodyResponseCallback<Schema$KeyRing>): void;
        /**
         * cloudkms.projects.locations.keyRings.get
         * @desc Returns metadata for a given KeyRing.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudkms.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudkms = google.cloudkms('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudkms',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await cloudkms.projects.locations.keyRings.get({
         *     // Required. The name of the KeyRing to get.
         *     name: 'projects/my-project/locations/my-location/keyRings/my-keyRing',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "createTime": "my_createTime",
         *   //   "name": "my_name"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudkms.projects.locations.keyRings.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The name of the KeyRing to get.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Projects$Locations$Keyrings$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Projects$Locations$Keyrings$Get, options?: MethodOptions): GaxiosPromise<Schema$KeyRing>;
        get(params: Params$Resource$Projects$Locations$Keyrings$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Projects$Locations$Keyrings$Get, options: MethodOptions | BodyResponseCallback<Schema$KeyRing>, callback: BodyResponseCallback<Schema$KeyRing>): void;
        get(params: Params$Resource$Projects$Locations$Keyrings$Get, callback: BodyResponseCallback<Schema$KeyRing>): void;
        get(callback: BodyResponseCallback<Schema$KeyRing>): void;
        /**
         * cloudkms.projects.locations.keyRings.getIamPolicy
         * @desc Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudkms.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudkms = google.cloudkms('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudkms',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await cloudkms.projects.locations.keyRings.getIamPolicy({
         *     // Optional. The policy format version to be returned.
         *     //
         *     // Valid values are 0, 1, and 3. Requests specifying an invalid value will be
         *     // rejected.
         *     //
         *     // Requests for policies with any conditional bindings must specify version 3.
         *     // Policies without any conditional bindings may specify any valid value or
         *     // leave the field unset.
         *     //
         *     // To learn which resources support conditions in their IAM policies, see the
         *     // [IAM
         *     // documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
         *     'options.requestedPolicyVersion': 'placeholder-value',
         *     // REQUIRED: The resource for which the policy is being requested.
         *     // See the operation documentation for the appropriate value for this field.
         *     resource: 'projects/my-project/locations/my-location/keyRings/my-keyRing',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "auditConfigs": [],
         *   //   "bindings": [],
         *   //   "etag": "my_etag",
         *   //   "version": 0
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudkms.projects.locations.keyRings.getIamPolicy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.options.requestedPolicyVersion Optional. The policy format version to be returned.  Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.  Requests for policies with any conditional bindings must specify version 3. Policies without any conditional bindings may specify any valid value or leave the field unset.  To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
         * @param {string} params.resource_ REQUIRED: The resource for which the policy is being requested. See the operation documentation for the appropriate value for this field.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        getIamPolicy(params: Params$Resource$Projects$Locations$Keyrings$Getiampolicy, options: StreamMethodOptions): GaxiosPromise<Readable>;
        getIamPolicy(params?: Params$Resource$Projects$Locations$Keyrings$Getiampolicy, options?: MethodOptions): GaxiosPromise<Schema$Policy>;
        getIamPolicy(params: Params$Resource$Projects$Locations$Keyrings$Getiampolicy, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        getIamPolicy(params: Params$Resource$Projects$Locations$Keyrings$Getiampolicy, options: MethodOptions | BodyResponseCallback<Schema$Policy>, callback: BodyResponseCallback<Schema$Policy>): void;
        getIamPolicy(params: Params$Resource$Projects$Locations$Keyrings$Getiampolicy, callback: BodyResponseCallback<Schema$Policy>): void;
        getIamPolicy(callback: BodyResponseCallback<Schema$Policy>): void;
        /**
         * cloudkms.projects.locations.keyRings.list
         * @desc Lists KeyRings.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudkms.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudkms = google.cloudkms('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudkms',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await cloudkms.projects.locations.keyRings.list({
         *     // Optional. Only include resources that match the filter in the response. For
         *     // more information, see
         *     // [Sorting and filtering list
         *     // results](https://cloud.google.com/kms/docs/sorting-and-filtering).
         *     filter: 'placeholder-value',
         *     // Optional. Specify how the results should be sorted. If not specified, the
         *     // results will be sorted in the default order.  For more information, see
         *     // [Sorting and filtering list
         *     // results](https://cloud.google.com/kms/docs/sorting-and-filtering).
         *     orderBy: 'placeholder-value',
         *     // Optional. Optional limit on the number of KeyRings to include in the
         *     // response.  Further KeyRings can subsequently be obtained by
         *     // including the ListKeyRingsResponse.next_page_token in a subsequent
         *     // request.  If unspecified, the server will pick an appropriate default.
         *     pageSize: 'placeholder-value',
         *     // Optional. Optional pagination token, returned earlier via
         *     // ListKeyRingsResponse.next_page_token.
         *     pageToken: 'placeholder-value',
         *     // Required. The resource name of the location associated with the
         *     // KeyRings, in the format `projects/x/locations/x`.
         *     parent: 'projects/my-project/locations/my-location',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "keyRings": [],
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "totalSize": 0
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudkms.projects.locations.keyRings.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.filter Optional. Only include resources that match the filter in the response. For more information, see [Sorting and filtering list results](https://cloud.google.com/kms/docs/sorting-and-filtering).
         * @param {string=} params.orderBy Optional. Specify how the results should be sorted. If not specified, the results will be sorted in the default order.  For more information, see [Sorting and filtering list results](https://cloud.google.com/kms/docs/sorting-and-filtering).
         * @param {integer=} params.pageSize Optional. Optional limit on the number of KeyRings to include in the response.  Further KeyRings can subsequently be obtained by including the ListKeyRingsResponse.next_page_token in a subsequent request.  If unspecified, the server will pick an appropriate default.
         * @param {string=} params.pageToken Optional. Optional pagination token, returned earlier via ListKeyRingsResponse.next_page_token.
         * @param {string} params.parent Required. The resource name of the location associated with the KeyRings, in the format `projects/x/locations/x`.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Projects$Locations$Keyrings$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Projects$Locations$Keyrings$List, options?: MethodOptions): GaxiosPromise<Schema$ListKeyRingsResponse>;
        list(params: Params$Resource$Projects$Locations$Keyrings$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Projects$Locations$Keyrings$List, options: MethodOptions | BodyResponseCallback<Schema$ListKeyRingsResponse>, callback: BodyResponseCallback<Schema$ListKeyRingsResponse>): void;
        list(params: Params$Resource$Projects$Locations$Keyrings$List, callback: BodyResponseCallback<Schema$ListKeyRingsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListKeyRingsResponse>): void;
        /**
         * cloudkms.projects.locations.keyRings.setIamPolicy
         * @desc Sets the access control policy on the specified resource. Replaces any existing policy.  Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudkms.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudkms = google.cloudkms('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudkms',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await cloudkms.projects.locations.keyRings.setIamPolicy({
         *     // REQUIRED: The resource for which the policy is being specified.
         *     // See the operation documentation for the appropriate value for this field.
         *     resource: 'projects/my-project/locations/my-location/keyRings/my-keyRing',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "policy": {},
         *       //   "updateMask": "my_updateMask"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "auditConfigs": [],
         *   //   "bindings": [],
         *   //   "etag": "my_etag",
         *   //   "version": 0
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudkms.projects.locations.keyRings.setIamPolicy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.resource_ REQUIRED: The resource for which the policy is being specified. See the operation documentation for the appropriate value for this field.
         * @param {().SetIamPolicyRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        setIamPolicy(params: Params$Resource$Projects$Locations$Keyrings$Setiampolicy, options: StreamMethodOptions): GaxiosPromise<Readable>;
        setIamPolicy(params?: Params$Resource$Projects$Locations$Keyrings$Setiampolicy, options?: MethodOptions): GaxiosPromise<Schema$Policy>;
        setIamPolicy(params: Params$Resource$Projects$Locations$Keyrings$Setiampolicy, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        setIamPolicy(params: Params$Resource$Projects$Locations$Keyrings$Setiampolicy, options: MethodOptions | BodyResponseCallback<Schema$Policy>, callback: BodyResponseCallback<Schema$Policy>): void;
        setIamPolicy(params: Params$Resource$Projects$Locations$Keyrings$Setiampolicy, callback: BodyResponseCallback<Schema$Policy>): void;
        setIamPolicy(callback: BodyResponseCallback<Schema$Policy>): void;
        /**
         * cloudkms.projects.locations.keyRings.testIamPermissions
         * @desc Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error.  Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudkms.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudkms = google.cloudkms('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudkms',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await cloudkms.projects.locations.keyRings.testIamPermissions({
         *     // REQUIRED: The resource for which the policy detail is being requested.
         *     // See the operation documentation for the appropriate value for this field.
         *     resource: 'projects/my-project/locations/my-location/keyRings/my-keyRing',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "permissions": []
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "permissions": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudkms.projects.locations.keyRings.testIamPermissions
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.resource_ REQUIRED: The resource for which the policy detail is being requested. See the operation documentation for the appropriate value for this field.
         * @param {().TestIamPermissionsRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        testIamPermissions(params: Params$Resource$Projects$Locations$Keyrings$Testiampermissions, options: StreamMethodOptions): GaxiosPromise<Readable>;
        testIamPermissions(params?: Params$Resource$Projects$Locations$Keyrings$Testiampermissions, options?: MethodOptions): GaxiosPromise<Schema$TestIamPermissionsResponse>;
        testIamPermissions(params: Params$Resource$Projects$Locations$Keyrings$Testiampermissions, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        testIamPermissions(params: Params$Resource$Projects$Locations$Keyrings$Testiampermissions, options: MethodOptions | BodyResponseCallback<Schema$TestIamPermissionsResponse>, callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        testIamPermissions(params: Params$Resource$Projects$Locations$Keyrings$Testiampermissions, callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        testIamPermissions(callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
    }
    export interface Params$Resource$Projects$Locations$Keyrings$Create extends StandardParameters {
        /**
         * Required. It must be unique within a location and match the regular expression `[a-zA-Z0-9_-]{1,63}`
         */
        keyRingId?: string;
        /**
         * Required. The resource name of the location associated with the KeyRings, in the format `projects/x/locations/x`.
         */
        parent?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$KeyRing;
    }
    export interface Params$Resource$Projects$Locations$Keyrings$Get extends StandardParameters {
        /**
         * Required. The name of the KeyRing to get.
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Locations$Keyrings$Getiampolicy extends StandardParameters {
        /**
         * Optional. The policy format version to be returned.  Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.  Requests for policies with any conditional bindings must specify version 3. Policies without any conditional bindings may specify any valid value or leave the field unset.  To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
         */
        'options.requestedPolicyVersion'?: number;
        /**
         * REQUIRED: The resource for which the policy is being requested. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
    }
    export interface Params$Resource$Projects$Locations$Keyrings$List extends StandardParameters {
        /**
         * Optional. Only include resources that match the filter in the response. For more information, see [Sorting and filtering list results](https://cloud.google.com/kms/docs/sorting-and-filtering).
         */
        filter?: string;
        /**
         * Optional. Specify how the results should be sorted. If not specified, the results will be sorted in the default order.  For more information, see [Sorting and filtering list results](https://cloud.google.com/kms/docs/sorting-and-filtering).
         */
        orderBy?: string;
        /**
         * Optional. Optional limit on the number of KeyRings to include in the response.  Further KeyRings can subsequently be obtained by including the ListKeyRingsResponse.next_page_token in a subsequent request.  If unspecified, the server will pick an appropriate default.
         */
        pageSize?: number;
        /**
         * Optional. Optional pagination token, returned earlier via ListKeyRingsResponse.next_page_token.
         */
        pageToken?: string;
        /**
         * Required. The resource name of the location associated with the KeyRings, in the format `projects/x/locations/x`.
         */
        parent?: string;
    }
    export interface Params$Resource$Projects$Locations$Keyrings$Setiampolicy extends StandardParameters {
        /**
         * REQUIRED: The resource for which the policy is being specified. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$SetIamPolicyRequest;
    }
    export interface Params$Resource$Projects$Locations$Keyrings$Testiampermissions extends StandardParameters {
        /**
         * REQUIRED: The resource for which the policy detail is being requested. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$TestIamPermissionsRequest;
    }
    export class Resource$Projects$Locations$Keyrings$Cryptokeys {
        context: APIRequestContext;
        cryptoKeyVersions: Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions;
        constructor(context: APIRequestContext);
        /**
         * cloudkms.projects.locations.keyRings.cryptoKeys.create
         * @desc Create a new CryptoKey within a KeyRing.  CryptoKey.purpose and CryptoKey.version_template.algorithm are required.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudkms.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudkms = google.cloudkms('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudkms',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await cloudkms.projects.locations.keyRings.cryptoKeys.create({
         *     // Required. It must be unique within a KeyRing and match the regular
         *     // expression `[a-zA-Z0-9_-]{1,63}`
         *     cryptoKeyId: 'placeholder-value',
         *     // Required. The name of the KeyRing associated with the
         *     // CryptoKeys.
         *     parent: 'projects/my-project/locations/my-location/keyRings/my-keyRing',
         *     // If set to true, the request will create a CryptoKey without any
         *     // CryptoKeyVersions. You must manually call
         *     // CreateCryptoKeyVersion or
         *     // ImportCryptoKeyVersion
         *     // before you can use this CryptoKey.
         *     skipInitialVersionCreation: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "createTime": "my_createTime",
         *       //   "labels": {},
         *       //   "name": "my_name",
         *       //   "nextRotationTime": "my_nextRotationTime",
         *       //   "primary": {},
         *       //   "purpose": "my_purpose",
         *       //   "rotationPeriod": "my_rotationPeriod",
         *       //   "versionTemplate": {}
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "createTime": "my_createTime",
         *   //   "labels": {},
         *   //   "name": "my_name",
         *   //   "nextRotationTime": "my_nextRotationTime",
         *   //   "primary": {},
         *   //   "purpose": "my_purpose",
         *   //   "rotationPeriod": "my_rotationPeriod",
         *   //   "versionTemplate": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudkms.projects.locations.keyRings.cryptoKeys.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.cryptoKeyId Required. It must be unique within a KeyRing and match the regular expression `[a-zA-Z0-9_-]{1,63}`
         * @param {string} params.parent Required. The name of the KeyRing associated with the CryptoKeys.
         * @param {boolean=} params.skipInitialVersionCreation If set to true, the request will create a CryptoKey without any CryptoKeyVersions. You must manually call CreateCryptoKeyVersion or ImportCryptoKeyVersion before you can use this CryptoKey.
         * @param {().CryptoKey} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Create, options?: MethodOptions): GaxiosPromise<Schema$CryptoKey>;
        create(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Create, options: MethodOptions | BodyResponseCallback<Schema$CryptoKey>, callback: BodyResponseCallback<Schema$CryptoKey>): void;
        create(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Create, callback: BodyResponseCallback<Schema$CryptoKey>): void;
        create(callback: BodyResponseCallback<Schema$CryptoKey>): void;
        /**
         * cloudkms.projects.locations.keyRings.cryptoKeys.decrypt
         * @desc Decrypts data that was protected by Encrypt. The CryptoKey.purpose must be ENCRYPT_DECRYPT.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudkms.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudkms = google.cloudkms('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudkms',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await cloudkms.projects.locations.keyRings.cryptoKeys.decrypt({
         *     // Required. The resource name of the CryptoKey to use for decryption.
         *     // The server will choose the appropriate version.
         *     name:
         *       'projects/my-project/locations/my-location/keyRings/my-keyRing/cryptoKeys/my-cryptoKey',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "additionalAuthenticatedData": "my_additionalAuthenticatedData",
         *       //   "additionalAuthenticatedDataCrc32c": "my_additionalAuthenticatedDataCrc32c",
         *       //   "ciphertext": "my_ciphertext",
         *       //   "ciphertextCrc32c": "my_ciphertextCrc32c"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "plaintext": "my_plaintext",
         *   //   "plaintextCrc32c": "my_plaintextCrc32c"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudkms.projects.locations.keyRings.cryptoKeys.decrypt
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of the CryptoKey to use for decryption. The server will choose the appropriate version.
         * @param {().DecryptRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        decrypt(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Decrypt, options: StreamMethodOptions): GaxiosPromise<Readable>;
        decrypt(params?: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Decrypt, options?: MethodOptions): GaxiosPromise<Schema$DecryptResponse>;
        decrypt(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Decrypt, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        decrypt(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Decrypt, options: MethodOptions | BodyResponseCallback<Schema$DecryptResponse>, callback: BodyResponseCallback<Schema$DecryptResponse>): void;
        decrypt(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Decrypt, callback: BodyResponseCallback<Schema$DecryptResponse>): void;
        decrypt(callback: BodyResponseCallback<Schema$DecryptResponse>): void;
        /**
         * cloudkms.projects.locations.keyRings.cryptoKeys.encrypt
         * @desc Encrypts data, so that it can only be recovered by a call to Decrypt. The CryptoKey.purpose must be ENCRYPT_DECRYPT.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudkms.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudkms = google.cloudkms('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudkms',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await cloudkms.projects.locations.keyRings.cryptoKeys.encrypt({
         *     // Required. The resource name of the CryptoKey or CryptoKeyVersion
         *     // to use for encryption.
         *     //
         *     // If a CryptoKey is specified, the server will use its
         *     // primary version.
         *     name:
         *       'projects/my-project/locations/my-location/keyRings/my-keyRing/cryptoKeys/.*',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "additionalAuthenticatedData": "my_additionalAuthenticatedData",
         *       //   "additionalAuthenticatedDataCrc32c": "my_additionalAuthenticatedDataCrc32c",
         *       //   "plaintext": "my_plaintext",
         *       //   "plaintextCrc32c": "my_plaintextCrc32c"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "ciphertext": "my_ciphertext",
         *   //   "ciphertextCrc32c": "my_ciphertextCrc32c",
         *   //   "name": "my_name",
         *   //   "verifiedAdditionalAuthenticatedDataCrc32c": false,
         *   //   "verifiedPlaintextCrc32c": false
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudkms.projects.locations.keyRings.cryptoKeys.encrypt
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of the CryptoKey or CryptoKeyVersion to use for encryption.  If a CryptoKey is specified, the server will use its primary version.
         * @param {().EncryptRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        encrypt(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Encrypt, options: StreamMethodOptions): GaxiosPromise<Readable>;
        encrypt(params?: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Encrypt, options?: MethodOptions): GaxiosPromise<Schema$EncryptResponse>;
        encrypt(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Encrypt, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        encrypt(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Encrypt, options: MethodOptions | BodyResponseCallback<Schema$EncryptResponse>, callback: BodyResponseCallback<Schema$EncryptResponse>): void;
        encrypt(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Encrypt, callback: BodyResponseCallback<Schema$EncryptResponse>): void;
        encrypt(callback: BodyResponseCallback<Schema$EncryptResponse>): void;
        /**
         * cloudkms.projects.locations.keyRings.cryptoKeys.get
         * @desc Returns metadata for a given CryptoKey, as well as its primary CryptoKeyVersion.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudkms.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudkms = google.cloudkms('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudkms',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await cloudkms.projects.locations.keyRings.cryptoKeys.get({
         *     // Required. The name of the CryptoKey to get.
         *     name:
         *       'projects/my-project/locations/my-location/keyRings/my-keyRing/cryptoKeys/my-cryptoKey',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "createTime": "my_createTime",
         *   //   "labels": {},
         *   //   "name": "my_name",
         *   //   "nextRotationTime": "my_nextRotationTime",
         *   //   "primary": {},
         *   //   "purpose": "my_purpose",
         *   //   "rotationPeriod": "my_rotationPeriod",
         *   //   "versionTemplate": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudkms.projects.locations.keyRings.cryptoKeys.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The name of the CryptoKey to get.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Get, options?: MethodOptions): GaxiosPromise<Schema$CryptoKey>;
        get(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Get, options: MethodOptions | BodyResponseCallback<Schema$CryptoKey>, callback: BodyResponseCallback<Schema$CryptoKey>): void;
        get(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Get, callback: BodyResponseCallback<Schema$CryptoKey>): void;
        get(callback: BodyResponseCallback<Schema$CryptoKey>): void;
        /**
         * cloudkms.projects.locations.keyRings.cryptoKeys.getIamPolicy
         * @desc Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudkms.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudkms = google.cloudkms('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudkms',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await cloudkms.projects.locations.keyRings.cryptoKeys.getIamPolicy(
         *     {
         *       // Optional. The policy format version to be returned.
         *       //
         *       // Valid values are 0, 1, and 3. Requests specifying an invalid value will be
         *       // rejected.
         *       //
         *       // Requests for policies with any conditional bindings must specify version 3.
         *       // Policies without any conditional bindings may specify any valid value or
         *       // leave the field unset.
         *       //
         *       // To learn which resources support conditions in their IAM policies, see the
         *       // [IAM
         *       // documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
         *       'options.requestedPolicyVersion': 'placeholder-value',
         *       // REQUIRED: The resource for which the policy is being requested.
         *       // See the operation documentation for the appropriate value for this field.
         *       resource:
         *         'projects/my-project/locations/my-location/keyRings/my-keyRing/cryptoKeys/my-cryptoKey',
         *     }
         *   );
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "auditConfigs": [],
         *   //   "bindings": [],
         *   //   "etag": "my_etag",
         *   //   "version": 0
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudkms.projects.locations.keyRings.cryptoKeys.getIamPolicy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.options.requestedPolicyVersion Optional. The policy format version to be returned.  Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.  Requests for policies with any conditional bindings must specify version 3. Policies without any conditional bindings may specify any valid value or leave the field unset.  To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
         * @param {string} params.resource_ REQUIRED: The resource for which the policy is being requested. See the operation documentation for the appropriate value for this field.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        getIamPolicy(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Getiampolicy, options: StreamMethodOptions): GaxiosPromise<Readable>;
        getIamPolicy(params?: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Getiampolicy, options?: MethodOptions): GaxiosPromise<Schema$Policy>;
        getIamPolicy(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Getiampolicy, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        getIamPolicy(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Getiampolicy, options: MethodOptions | BodyResponseCallback<Schema$Policy>, callback: BodyResponseCallback<Schema$Policy>): void;
        getIamPolicy(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Getiampolicy, callback: BodyResponseCallback<Schema$Policy>): void;
        getIamPolicy(callback: BodyResponseCallback<Schema$Policy>): void;
        /**
         * cloudkms.projects.locations.keyRings.cryptoKeys.list
         * @desc Lists CryptoKeys.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudkms.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudkms = google.cloudkms('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudkms',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await cloudkms.projects.locations.keyRings.cryptoKeys.list({
         *     // Optional. Only include resources that match the filter in the response. For
         *     // more information, see
         *     // [Sorting and filtering list
         *     // results](https://cloud.google.com/kms/docs/sorting-and-filtering).
         *     filter: 'placeholder-value',
         *     // Optional. Specify how the results should be sorted. If not specified, the
         *     // results will be sorted in the default order. For more information, see
         *     // [Sorting and filtering list
         *     // results](https://cloud.google.com/kms/docs/sorting-and-filtering).
         *     orderBy: 'placeholder-value',
         *     // Optional. Optional limit on the number of CryptoKeys to include in the
         *     // response.  Further CryptoKeys can subsequently be obtained by
         *     // including the ListCryptoKeysResponse.next_page_token in a subsequent
         *     // request.  If unspecified, the server will pick an appropriate default.
         *     pageSize: 'placeholder-value',
         *     // Optional. Optional pagination token, returned earlier via
         *     // ListCryptoKeysResponse.next_page_token.
         *     pageToken: 'placeholder-value',
         *     // Required. The resource name of the KeyRing to list, in the format
         *     // `projects/x/locations/x/keyRings/x`.
         *     parent: 'projects/my-project/locations/my-location/keyRings/my-keyRing',
         *     // The fields of the primary version to include in the response.
         *     versionView: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "cryptoKeys": [],
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "totalSize": 0
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudkms.projects.locations.keyRings.cryptoKeys.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.filter Optional. Only include resources that match the filter in the response. For more information, see [Sorting and filtering list results](https://cloud.google.com/kms/docs/sorting-and-filtering).
         * @param {string=} params.orderBy Optional. Specify how the results should be sorted. If not specified, the results will be sorted in the default order. For more information, see [Sorting and filtering list results](https://cloud.google.com/kms/docs/sorting-and-filtering).
         * @param {integer=} params.pageSize Optional. Optional limit on the number of CryptoKeys to include in the response.  Further CryptoKeys can subsequently be obtained by including the ListCryptoKeysResponse.next_page_token in a subsequent request.  If unspecified, the server will pick an appropriate default.
         * @param {string=} params.pageToken Optional. Optional pagination token, returned earlier via ListCryptoKeysResponse.next_page_token.
         * @param {string} params.parent Required. The resource name of the KeyRing to list, in the format `projects/x/locations/x/keyRings/x`.
         * @param {string=} params.versionView The fields of the primary version to include in the response.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$List, options?: MethodOptions): GaxiosPromise<Schema$ListCryptoKeysResponse>;
        list(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$List, options: MethodOptions | BodyResponseCallback<Schema$ListCryptoKeysResponse>, callback: BodyResponseCallback<Schema$ListCryptoKeysResponse>): void;
        list(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$List, callback: BodyResponseCallback<Schema$ListCryptoKeysResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListCryptoKeysResponse>): void;
        /**
         * cloudkms.projects.locations.keyRings.cryptoKeys.patch
         * @desc Update a CryptoKey.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudkms.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudkms = google.cloudkms('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudkms',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await cloudkms.projects.locations.keyRings.cryptoKeys.patch({
         *     // Output only. The resource name for this CryptoKey in the format
         *     // `projects/x/locations/x/keyRings/x/cryptoKeys/x`.
         *     name:
         *       'projects/my-project/locations/my-location/keyRings/my-keyRing/cryptoKeys/my-cryptoKey',
         *     // Required. List of fields to be updated in this request.
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "createTime": "my_createTime",
         *       //   "labels": {},
         *       //   "name": "my_name",
         *       //   "nextRotationTime": "my_nextRotationTime",
         *       //   "primary": {},
         *       //   "purpose": "my_purpose",
         *       //   "rotationPeriod": "my_rotationPeriod",
         *       //   "versionTemplate": {}
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "createTime": "my_createTime",
         *   //   "labels": {},
         *   //   "name": "my_name",
         *   //   "nextRotationTime": "my_nextRotationTime",
         *   //   "primary": {},
         *   //   "purpose": "my_purpose",
         *   //   "rotationPeriod": "my_rotationPeriod",
         *   //   "versionTemplate": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudkms.projects.locations.keyRings.cryptoKeys.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Output only. The resource name for this CryptoKey in the format `projects/x/locations/x/keyRings/x/cryptoKeys/x`.
         * @param {string=} params.updateMask Required. List of fields to be updated in this request.
         * @param {().CryptoKey} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Patch, options?: MethodOptions): GaxiosPromise<Schema$CryptoKey>;
        patch(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Patch, options: MethodOptions | BodyResponseCallback<Schema$CryptoKey>, callback: BodyResponseCallback<Schema$CryptoKey>): void;
        patch(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Patch, callback: BodyResponseCallback<Schema$CryptoKey>): void;
        patch(callback: BodyResponseCallback<Schema$CryptoKey>): void;
        /**
         * cloudkms.projects.locations.keyRings.cryptoKeys.setIamPolicy
         * @desc Sets the access control policy on the specified resource. Replaces any existing policy.  Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudkms.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudkms = google.cloudkms('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudkms',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await cloudkms.projects.locations.keyRings.cryptoKeys.setIamPolicy(
         *     {
         *       // REQUIRED: The resource for which the policy is being specified.
         *       // See the operation documentation for the appropriate value for this field.
         *       resource:
         *         'projects/my-project/locations/my-location/keyRings/my-keyRing/cryptoKeys/my-cryptoKey',
         *
         *       // Request body metadata
         *       requestBody: {
         *         // request body parameters
         *         // {
         *         //   "policy": {},
         *         //   "updateMask": "my_updateMask"
         *         // }
         *       },
         *     }
         *   );
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "auditConfigs": [],
         *   //   "bindings": [],
         *   //   "etag": "my_etag",
         *   //   "version": 0
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudkms.projects.locations.keyRings.cryptoKeys.setIamPolicy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.resource_ REQUIRED: The resource for which the policy is being specified. See the operation documentation for the appropriate value for this field.
         * @param {().SetIamPolicyRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        setIamPolicy(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Setiampolicy, options: StreamMethodOptions): GaxiosPromise<Readable>;
        setIamPolicy(params?: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Setiampolicy, options?: MethodOptions): GaxiosPromise<Schema$Policy>;
        setIamPolicy(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Setiampolicy, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        setIamPolicy(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Setiampolicy, options: MethodOptions | BodyResponseCallback<Schema$Policy>, callback: BodyResponseCallback<Schema$Policy>): void;
        setIamPolicy(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Setiampolicy, callback: BodyResponseCallback<Schema$Policy>): void;
        setIamPolicy(callback: BodyResponseCallback<Schema$Policy>): void;
        /**
         * cloudkms.projects.locations.keyRings.cryptoKeys.testIamPermissions
         * @desc Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error.  Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudkms.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudkms = google.cloudkms('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudkms',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await cloudkms.projects.locations.keyRings.cryptoKeys.testIamPermissions(
         *     {
         *       // REQUIRED: The resource for which the policy detail is being requested.
         *       // See the operation documentation for the appropriate value for this field.
         *       resource:
         *         'projects/my-project/locations/my-location/keyRings/my-keyRing/cryptoKeys/my-cryptoKey',
         *
         *       // Request body metadata
         *       requestBody: {
         *         // request body parameters
         *         // {
         *         //   "permissions": []
         *         // }
         *       },
         *     }
         *   );
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "permissions": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudkms.projects.locations.keyRings.cryptoKeys.testIamPermissions
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.resource_ REQUIRED: The resource for which the policy detail is being requested. See the operation documentation for the appropriate value for this field.
         * @param {().TestIamPermissionsRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        testIamPermissions(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Testiampermissions, options: StreamMethodOptions): GaxiosPromise<Readable>;
        testIamPermissions(params?: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Testiampermissions, options?: MethodOptions): GaxiosPromise<Schema$TestIamPermissionsResponse>;
        testIamPermissions(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Testiampermissions, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        testIamPermissions(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Testiampermissions, options: MethodOptions | BodyResponseCallback<Schema$TestIamPermissionsResponse>, callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        testIamPermissions(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Testiampermissions, callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        testIamPermissions(callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        /**
         * cloudkms.projects.locations.keyRings.cryptoKeys.updatePrimaryVersion
         * @desc Update the version of a CryptoKey that will be used in Encrypt.  Returns an error if called on an asymmetric key.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudkms.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudkms = google.cloudkms('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudkms',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await cloudkms.projects.locations.keyRings.cryptoKeys.updatePrimaryVersion(
         *     {
         *       // Required. The resource name of the CryptoKey to update.
         *       name:
         *         'projects/my-project/locations/my-location/keyRings/my-keyRing/cryptoKeys/my-cryptoKey',
         *
         *       // Request body metadata
         *       requestBody: {
         *         // request body parameters
         *         // {
         *         //   "cryptoKeyVersionId": "my_cryptoKeyVersionId"
         *         // }
         *       },
         *     }
         *   );
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "createTime": "my_createTime",
         *   //   "labels": {},
         *   //   "name": "my_name",
         *   //   "nextRotationTime": "my_nextRotationTime",
         *   //   "primary": {},
         *   //   "purpose": "my_purpose",
         *   //   "rotationPeriod": "my_rotationPeriod",
         *   //   "versionTemplate": {}
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudkms.projects.locations.keyRings.cryptoKeys.updatePrimaryVersion
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of the CryptoKey to update.
         * @param {().UpdateCryptoKeyPrimaryVersionRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        updatePrimaryVersion(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Updateprimaryversion, options: StreamMethodOptions): GaxiosPromise<Readable>;
        updatePrimaryVersion(params?: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Updateprimaryversion, options?: MethodOptions): GaxiosPromise<Schema$CryptoKey>;
        updatePrimaryVersion(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Updateprimaryversion, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        updatePrimaryVersion(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Updateprimaryversion, options: MethodOptions | BodyResponseCallback<Schema$CryptoKey>, callback: BodyResponseCallback<Schema$CryptoKey>): void;
        updatePrimaryVersion(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Updateprimaryversion, callback: BodyResponseCallback<Schema$CryptoKey>): void;
        updatePrimaryVersion(callback: BodyResponseCallback<Schema$CryptoKey>): void;
    }
    export interface Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Create extends StandardParameters {
        /**
         * Required. It must be unique within a KeyRing and match the regular expression `[a-zA-Z0-9_-]{1,63}`
         */
        cryptoKeyId?: string;
        /**
         * Required. The name of the KeyRing associated with the CryptoKeys.
         */
        parent?: string;
        /**
         * If set to true, the request will create a CryptoKey without any CryptoKeyVersions. You must manually call CreateCryptoKeyVersion or ImportCryptoKeyVersion before you can use this CryptoKey.
         */
        skipInitialVersionCreation?: boolean;
        /**
         * Request body metadata
         */
        requestBody?: Schema$CryptoKey;
    }
    export interface Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Decrypt extends StandardParameters {
        /**
         * Required. The resource name of the CryptoKey to use for decryption. The server will choose the appropriate version.
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$DecryptRequest;
    }
    export interface Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Encrypt extends StandardParameters {
        /**
         * Required. The resource name of the CryptoKey or CryptoKeyVersion to use for encryption.  If a CryptoKey is specified, the server will use its primary version.
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$EncryptRequest;
    }
    export interface Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Get extends StandardParameters {
        /**
         * Required. The name of the CryptoKey to get.
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Getiampolicy extends StandardParameters {
        /**
         * Optional. The policy format version to be returned.  Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.  Requests for policies with any conditional bindings must specify version 3. Policies without any conditional bindings may specify any valid value or leave the field unset.  To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
         */
        'options.requestedPolicyVersion'?: number;
        /**
         * REQUIRED: The resource for which the policy is being requested. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
    }
    export interface Params$Resource$Projects$Locations$Keyrings$Cryptokeys$List extends StandardParameters {
        /**
         * Optional. Only include resources that match the filter in the response. For more information, see [Sorting and filtering list results](https://cloud.google.com/kms/docs/sorting-and-filtering).
         */
        filter?: string;
        /**
         * Optional. Specify how the results should be sorted. If not specified, the results will be sorted in the default order. For more information, see [Sorting and filtering list results](https://cloud.google.com/kms/docs/sorting-and-filtering).
         */
        orderBy?: string;
        /**
         * Optional. Optional limit on the number of CryptoKeys to include in the response.  Further CryptoKeys can subsequently be obtained by including the ListCryptoKeysResponse.next_page_token in a subsequent request.  If unspecified, the server will pick an appropriate default.
         */
        pageSize?: number;
        /**
         * Optional. Optional pagination token, returned earlier via ListCryptoKeysResponse.next_page_token.
         */
        pageToken?: string;
        /**
         * Required. The resource name of the KeyRing to list, in the format `projects/x/locations/x/keyRings/x`.
         */
        parent?: string;
        /**
         * The fields of the primary version to include in the response.
         */
        versionView?: string;
    }
    export interface Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Patch extends StandardParameters {
        /**
         * Output only. The resource name for this CryptoKey in the format `projects/x/locations/x/keyRings/x/cryptoKeys/x`.
         */
        name?: string;
        /**
         * Required. List of fields to be updated in this request.
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$CryptoKey;
    }
    export interface Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Setiampolicy extends StandardParameters {
        /**
         * REQUIRED: The resource for which the policy is being specified. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$SetIamPolicyRequest;
    }
    export interface Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Testiampermissions extends StandardParameters {
        /**
         * REQUIRED: The resource for which the policy detail is being requested. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$TestIamPermissionsRequest;
    }
    export interface Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Updateprimaryversion extends StandardParameters {
        /**
         * Required. The resource name of the CryptoKey to update.
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$UpdateCryptoKeyPrimaryVersionRequest;
    }
    export class Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.asymmetricDecrypt
         * @desc Decrypts data that was encrypted with a public key retrieved from GetPublicKey corresponding to a CryptoKeyVersion with CryptoKey.purpose ASYMMETRIC_DECRYPT.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudkms.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudkms = google.cloudkms('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudkms',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.asymmetricDecrypt(
         *     {
         *       // Required. The resource name of the CryptoKeyVersion to use for
         *       // decryption.
         *       name:
         *         'projects/my-project/locations/my-location/keyRings/my-keyRing/cryptoKeys/my-cryptoKey/cryptoKeyVersions/my-cryptoKeyVersion',
         *
         *       // Request body metadata
         *       requestBody: {
         *         // request body parameters
         *         // {
         *         //   "ciphertext": "my_ciphertext",
         *         //   "ciphertextCrc32c": "my_ciphertextCrc32c"
         *         // }
         *       },
         *     }
         *   );
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "plaintext": "my_plaintext",
         *   //   "plaintextCrc32c": "my_plaintextCrc32c",
         *   //   "verifiedCiphertextCrc32c": false
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.asymmetricDecrypt
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of the CryptoKeyVersion to use for decryption.
         * @param {().AsymmetricDecryptRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        asymmetricDecrypt(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Asymmetricdecrypt, options: StreamMethodOptions): GaxiosPromise<Readable>;
        asymmetricDecrypt(params?: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Asymmetricdecrypt, options?: MethodOptions): GaxiosPromise<Schema$AsymmetricDecryptResponse>;
        asymmetricDecrypt(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Asymmetricdecrypt, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        asymmetricDecrypt(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Asymmetricdecrypt, options: MethodOptions | BodyResponseCallback<Schema$AsymmetricDecryptResponse>, callback: BodyResponseCallback<Schema$AsymmetricDecryptResponse>): void;
        asymmetricDecrypt(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Asymmetricdecrypt, callback: BodyResponseCallback<Schema$AsymmetricDecryptResponse>): void;
        asymmetricDecrypt(callback: BodyResponseCallback<Schema$AsymmetricDecryptResponse>): void;
        /**
         * cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.asymmetricSign
         * @desc Signs data using a CryptoKeyVersion with CryptoKey.purpose ASYMMETRIC_SIGN, producing a signature that can be verified with the public key retrieved from GetPublicKey.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudkms.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudkms = google.cloudkms('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudkms',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.asymmetricSign(
         *     {
         *       // Required. The resource name of the CryptoKeyVersion to use for signing.
         *       name:
         *         'projects/my-project/locations/my-location/keyRings/my-keyRing/cryptoKeys/my-cryptoKey/cryptoKeyVersions/my-cryptoKeyVersion',
         *
         *       // Request body metadata
         *       requestBody: {
         *         // request body parameters
         *         // {
         *         //   "digest": {},
         *         //   "digestCrc32c": "my_digestCrc32c"
         *         // }
         *       },
         *     }
         *   );
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "name": "my_name",
         *   //   "signature": "my_signature",
         *   //   "signatureCrc32c": "my_signatureCrc32c",
         *   //   "verifiedDigestCrc32c": false
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.asymmetricSign
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of the CryptoKeyVersion to use for signing.
         * @param {().AsymmetricSignRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        asymmetricSign(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Asymmetricsign, options: StreamMethodOptions): GaxiosPromise<Readable>;
        asymmetricSign(params?: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Asymmetricsign, options?: MethodOptions): GaxiosPromise<Schema$AsymmetricSignResponse>;
        asymmetricSign(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Asymmetricsign, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        asymmetricSign(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Asymmetricsign, options: MethodOptions | BodyResponseCallback<Schema$AsymmetricSignResponse>, callback: BodyResponseCallback<Schema$AsymmetricSignResponse>): void;
        asymmetricSign(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Asymmetricsign, callback: BodyResponseCallback<Schema$AsymmetricSignResponse>): void;
        asymmetricSign(callback: BodyResponseCallback<Schema$AsymmetricSignResponse>): void;
        /**
         * cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.create
         * @desc Create a new CryptoKeyVersion in a CryptoKey.  The server will assign the next sequential id. If unset, state will be set to ENABLED.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudkms.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudkms = google.cloudkms('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudkms',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.create(
         *     {
         *       // Required. The name of the CryptoKey associated with
         *       // the CryptoKeyVersions.
         *       parent:
         *         'projects/my-project/locations/my-location/keyRings/my-keyRing/cryptoKeys/my-cryptoKey',
         *
         *       // Request body metadata
         *       requestBody: {
         *         // request body parameters
         *         // {
         *         //   "algorithm": "my_algorithm",
         *         //   "attestation": {},
         *         //   "createTime": "my_createTime",
         *         //   "destroyEventTime": "my_destroyEventTime",
         *         //   "destroyTime": "my_destroyTime",
         *         //   "externalProtectionLevelOptions": {},
         *         //   "generateTime": "my_generateTime",
         *         //   "importFailureReason": "my_importFailureReason",
         *         //   "importJob": "my_importJob",
         *         //   "importTime": "my_importTime",
         *         //   "name": "my_name",
         *         //   "protectionLevel": "my_protectionLevel",
         *         //   "state": "my_state"
         *         // }
         *       },
         *     }
         *   );
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "algorithm": "my_algorithm",
         *   //   "attestation": {},
         *   //   "createTime": "my_createTime",
         *   //   "destroyEventTime": "my_destroyEventTime",
         *   //   "destroyTime": "my_destroyTime",
         *   //   "externalProtectionLevelOptions": {},
         *   //   "generateTime": "my_generateTime",
         *   //   "importFailureReason": "my_importFailureReason",
         *   //   "importJob": "my_importJob",
         *   //   "importTime": "my_importTime",
         *   //   "name": "my_name",
         *   //   "protectionLevel": "my_protectionLevel",
         *   //   "state": "my_state"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.parent Required. The name of the CryptoKey associated with the CryptoKeyVersions.
         * @param {().CryptoKeyVersion} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Create, options?: MethodOptions): GaxiosPromise<Schema$CryptoKeyVersion>;
        create(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Create, options: MethodOptions | BodyResponseCallback<Schema$CryptoKeyVersion>, callback: BodyResponseCallback<Schema$CryptoKeyVersion>): void;
        create(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Create, callback: BodyResponseCallback<Schema$CryptoKeyVersion>): void;
        create(callback: BodyResponseCallback<Schema$CryptoKeyVersion>): void;
        /**
         * cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.destroy
         * @desc Schedule a CryptoKeyVersion for destruction.  Upon calling this method, CryptoKeyVersion.state will be set to DESTROY_SCHEDULED and destroy_time will be set to a time 24 hours in the future, at which point the state will be changed to DESTROYED, and the key material will be irrevocably destroyed.  Before the destroy_time is reached, RestoreCryptoKeyVersion may be called to reverse the process.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudkms.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudkms = google.cloudkms('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudkms',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.destroy(
         *     {
         *       // Required. The resource name of the CryptoKeyVersion to destroy.
         *       name:
         *         'projects/my-project/locations/my-location/keyRings/my-keyRing/cryptoKeys/my-cryptoKey/cryptoKeyVersions/my-cryptoKeyVersion',
         *
         *       // Request body metadata
         *       requestBody: {
         *         // request body parameters
         *         // {}
         *       },
         *     }
         *   );
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "algorithm": "my_algorithm",
         *   //   "attestation": {},
         *   //   "createTime": "my_createTime",
         *   //   "destroyEventTime": "my_destroyEventTime",
         *   //   "destroyTime": "my_destroyTime",
         *   //   "externalProtectionLevelOptions": {},
         *   //   "generateTime": "my_generateTime",
         *   //   "importFailureReason": "my_importFailureReason",
         *   //   "importJob": "my_importJob",
         *   //   "importTime": "my_importTime",
         *   //   "name": "my_name",
         *   //   "protectionLevel": "my_protectionLevel",
         *   //   "state": "my_state"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.destroy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of the CryptoKeyVersion to destroy.
         * @param {().DestroyCryptoKeyVersionRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        destroy(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Destroy, options: StreamMethodOptions): GaxiosPromise<Readable>;
        destroy(params?: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Destroy, options?: MethodOptions): GaxiosPromise<Schema$CryptoKeyVersion>;
        destroy(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Destroy, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        destroy(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Destroy, options: MethodOptions | BodyResponseCallback<Schema$CryptoKeyVersion>, callback: BodyResponseCallback<Schema$CryptoKeyVersion>): void;
        destroy(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Destroy, callback: BodyResponseCallback<Schema$CryptoKeyVersion>): void;
        destroy(callback: BodyResponseCallback<Schema$CryptoKeyVersion>): void;
        /**
         * cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.get
         * @desc Returns metadata for a given CryptoKeyVersion.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudkms.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudkms = google.cloudkms('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudkms',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.get(
         *     {
         *       // Required. The name of the CryptoKeyVersion to get.
         *       name:
         *         'projects/my-project/locations/my-location/keyRings/my-keyRing/cryptoKeys/my-cryptoKey/cryptoKeyVersions/my-cryptoKeyVersion',
         *     }
         *   );
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "algorithm": "my_algorithm",
         *   //   "attestation": {},
         *   //   "createTime": "my_createTime",
         *   //   "destroyEventTime": "my_destroyEventTime",
         *   //   "destroyTime": "my_destroyTime",
         *   //   "externalProtectionLevelOptions": {},
         *   //   "generateTime": "my_generateTime",
         *   //   "importFailureReason": "my_importFailureReason",
         *   //   "importJob": "my_importJob",
         *   //   "importTime": "my_importTime",
         *   //   "name": "my_name",
         *   //   "protectionLevel": "my_protectionLevel",
         *   //   "state": "my_state"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The name of the CryptoKeyVersion to get.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Get, options?: MethodOptions): GaxiosPromise<Schema$CryptoKeyVersion>;
        get(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Get, options: MethodOptions | BodyResponseCallback<Schema$CryptoKeyVersion>, callback: BodyResponseCallback<Schema$CryptoKeyVersion>): void;
        get(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Get, callback: BodyResponseCallback<Schema$CryptoKeyVersion>): void;
        get(callback: BodyResponseCallback<Schema$CryptoKeyVersion>): void;
        /**
         * cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.getPublicKey
         * @desc Returns the public key for the given CryptoKeyVersion. The CryptoKey.purpose must be ASYMMETRIC_SIGN or ASYMMETRIC_DECRYPT.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudkms.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudkms = google.cloudkms('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudkms',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.getPublicKey(
         *     {
         *       // Required. The name of the CryptoKeyVersion public key to
         *       // get.
         *       name:
         *         'projects/my-project/locations/my-location/keyRings/my-keyRing/cryptoKeys/my-cryptoKey/cryptoKeyVersions/my-cryptoKeyVersion',
         *     }
         *   );
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "algorithm": "my_algorithm",
         *   //   "name": "my_name",
         *   //   "pem": "my_pem",
         *   //   "pemCrc32c": "my_pemCrc32c"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.getPublicKey
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The name of the CryptoKeyVersion public key to get.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        getPublicKey(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Getpublickey, options: StreamMethodOptions): GaxiosPromise<Readable>;
        getPublicKey(params?: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Getpublickey, options?: MethodOptions): GaxiosPromise<Schema$PublicKey>;
        getPublicKey(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Getpublickey, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        getPublicKey(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Getpublickey, options: MethodOptions | BodyResponseCallback<Schema$PublicKey>, callback: BodyResponseCallback<Schema$PublicKey>): void;
        getPublicKey(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Getpublickey, callback: BodyResponseCallback<Schema$PublicKey>): void;
        getPublicKey(callback: BodyResponseCallback<Schema$PublicKey>): void;
        /**
         * cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.import
         * @desc Imports a new CryptoKeyVersion into an existing CryptoKey using the wrapped key material provided in the request.  The version ID will be assigned the next sequential id within the CryptoKey.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudkms.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudkms = google.cloudkms('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudkms',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.import(
         *     {
         *       // Required. The name of the CryptoKey to
         *       // be imported into.
         *       parent:
         *         'projects/my-project/locations/my-location/keyRings/my-keyRing/cryptoKeys/my-cryptoKey',
         *
         *       // Request body metadata
         *       requestBody: {
         *         // request body parameters
         *         // {
         *         //   "algorithm": "my_algorithm",
         *         //   "importJob": "my_importJob",
         *         //   "rsaAesWrappedKey": "my_rsaAesWrappedKey"
         *         // }
         *       },
         *     }
         *   );
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "algorithm": "my_algorithm",
         *   //   "attestation": {},
         *   //   "createTime": "my_createTime",
         *   //   "destroyEventTime": "my_destroyEventTime",
         *   //   "destroyTime": "my_destroyTime",
         *   //   "externalProtectionLevelOptions": {},
         *   //   "generateTime": "my_generateTime",
         *   //   "importFailureReason": "my_importFailureReason",
         *   //   "importJob": "my_importJob",
         *   //   "importTime": "my_importTime",
         *   //   "name": "my_name",
         *   //   "protectionLevel": "my_protectionLevel",
         *   //   "state": "my_state"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.import
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.parent Required. The name of the CryptoKey to be imported into.
         * @param {().ImportCryptoKeyVersionRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        import(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Import, options: StreamMethodOptions): GaxiosPromise<Readable>;
        import(params?: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Import, options?: MethodOptions): GaxiosPromise<Schema$CryptoKeyVersion>;
        import(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Import, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        import(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Import, options: MethodOptions | BodyResponseCallback<Schema$CryptoKeyVersion>, callback: BodyResponseCallback<Schema$CryptoKeyVersion>): void;
        import(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Import, callback: BodyResponseCallback<Schema$CryptoKeyVersion>): void;
        import(callback: BodyResponseCallback<Schema$CryptoKeyVersion>): void;
        /**
         * cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.list
         * @desc Lists CryptoKeyVersions.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudkms.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudkms = google.cloudkms('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudkms',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.list(
         *     {
         *       // Optional. Only include resources that match the filter in the response. For
         *       // more information, see
         *       // [Sorting and filtering list
         *       // results](https://cloud.google.com/kms/docs/sorting-and-filtering).
         *       filter: 'placeholder-value',
         *       // Optional. Specify how the results should be sorted. If not specified, the
         *       // results will be sorted in the default order. For more information, see
         *       // [Sorting and filtering list
         *       // results](https://cloud.google.com/kms/docs/sorting-and-filtering).
         *       orderBy: 'placeholder-value',
         *       // Optional. Optional limit on the number of CryptoKeyVersions to
         *       // include in the response. Further CryptoKeyVersions can
         *       // subsequently be obtained by including the
         *       // ListCryptoKeyVersionsResponse.next_page_token in a subsequent request.
         *       // If unspecified, the server will pick an appropriate default.
         *       pageSize: 'placeholder-value',
         *       // Optional. Optional pagination token, returned earlier via
         *       // ListCryptoKeyVersionsResponse.next_page_token.
         *       pageToken: 'placeholder-value',
         *       // Required. The resource name of the CryptoKey to list, in the format
         *       // `projects/x/locations/x/keyRings/x/cryptoKeys/x`.
         *       parent:
         *         'projects/my-project/locations/my-location/keyRings/my-keyRing/cryptoKeys/my-cryptoKey',
         *       // The fields to include in the response.
         *       view: 'placeholder-value',
         *     }
         *   );
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "cryptoKeyVersions": [],
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "totalSize": 0
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.filter Optional. Only include resources that match the filter in the response. For more information, see [Sorting and filtering list results](https://cloud.google.com/kms/docs/sorting-and-filtering).
         * @param {string=} params.orderBy Optional. Specify how the results should be sorted. If not specified, the results will be sorted in the default order. For more information, see [Sorting and filtering list results](https://cloud.google.com/kms/docs/sorting-and-filtering).
         * @param {integer=} params.pageSize Optional. Optional limit on the number of CryptoKeyVersions to include in the response. Further CryptoKeyVersions can subsequently be obtained by including the ListCryptoKeyVersionsResponse.next_page_token in a subsequent request. If unspecified, the server will pick an appropriate default.
         * @param {string=} params.pageToken Optional. Optional pagination token, returned earlier via ListCryptoKeyVersionsResponse.next_page_token.
         * @param {string} params.parent Required. The resource name of the CryptoKey to list, in the format `projects/x/locations/x/keyRings/x/cryptoKeys/x`.
         * @param {string=} params.view The fields to include in the response.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$List, options?: MethodOptions): GaxiosPromise<Schema$ListCryptoKeyVersionsResponse>;
        list(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$List, options: MethodOptions | BodyResponseCallback<Schema$ListCryptoKeyVersionsResponse>, callback: BodyResponseCallback<Schema$ListCryptoKeyVersionsResponse>): void;
        list(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$List, callback: BodyResponseCallback<Schema$ListCryptoKeyVersionsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListCryptoKeyVersionsResponse>): void;
        /**
         * cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.patch
         * @desc Update a CryptoKeyVersion's metadata.  state may be changed between ENABLED and DISABLED using this method. See DestroyCryptoKeyVersion and RestoreCryptoKeyVersion to move between other states.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudkms.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudkms = google.cloudkms('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudkms',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.patch(
         *     {
         *       // Output only. The resource name for this CryptoKeyVersion in the format
         *       // `projects/x/locations/x/keyRings/x/cryptoKeys/x/cryptoKeyVersions/x`.
         *       name:
         *         'projects/my-project/locations/my-location/keyRings/my-keyRing/cryptoKeys/my-cryptoKey/cryptoKeyVersions/my-cryptoKeyVersion',
         *       // Required. List of fields to be updated in this request.
         *       updateMask: 'placeholder-value',
         *
         *       // Request body metadata
         *       requestBody: {
         *         // request body parameters
         *         // {
         *         //   "algorithm": "my_algorithm",
         *         //   "attestation": {},
         *         //   "createTime": "my_createTime",
         *         //   "destroyEventTime": "my_destroyEventTime",
         *         //   "destroyTime": "my_destroyTime",
         *         //   "externalProtectionLevelOptions": {},
         *         //   "generateTime": "my_generateTime",
         *         //   "importFailureReason": "my_importFailureReason",
         *         //   "importJob": "my_importJob",
         *         //   "importTime": "my_importTime",
         *         //   "name": "my_name",
         *         //   "protectionLevel": "my_protectionLevel",
         *         //   "state": "my_state"
         *         // }
         *       },
         *     }
         *   );
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "algorithm": "my_algorithm",
         *   //   "attestation": {},
         *   //   "createTime": "my_createTime",
         *   //   "destroyEventTime": "my_destroyEventTime",
         *   //   "destroyTime": "my_destroyTime",
         *   //   "externalProtectionLevelOptions": {},
         *   //   "generateTime": "my_generateTime",
         *   //   "importFailureReason": "my_importFailureReason",
         *   //   "importJob": "my_importJob",
         *   //   "importTime": "my_importTime",
         *   //   "name": "my_name",
         *   //   "protectionLevel": "my_protectionLevel",
         *   //   "state": "my_state"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Output only. The resource name for this CryptoKeyVersion in the format `projects/x/locations/x/keyRings/x/cryptoKeys/x/cryptoKeyVersions/x`.
         * @param {string=} params.updateMask Required. List of fields to be updated in this request.
         * @param {().CryptoKeyVersion} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Patch, options?: MethodOptions): GaxiosPromise<Schema$CryptoKeyVersion>;
        patch(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Patch, options: MethodOptions | BodyResponseCallback<Schema$CryptoKeyVersion>, callback: BodyResponseCallback<Schema$CryptoKeyVersion>): void;
        patch(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Patch, callback: BodyResponseCallback<Schema$CryptoKeyVersion>): void;
        patch(callback: BodyResponseCallback<Schema$CryptoKeyVersion>): void;
        /**
         * cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.restore
         * @desc Restore a CryptoKeyVersion in the DESTROY_SCHEDULED state.  Upon restoration of the CryptoKeyVersion, state will be set to DISABLED, and destroy_time will be cleared.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudkms.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudkms = google.cloudkms('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudkms',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.restore(
         *     {
         *       // Required. The resource name of the CryptoKeyVersion to restore.
         *       name:
         *         'projects/my-project/locations/my-location/keyRings/my-keyRing/cryptoKeys/my-cryptoKey/cryptoKeyVersions/my-cryptoKeyVersion',
         *
         *       // Request body metadata
         *       requestBody: {
         *         // request body parameters
         *         // {}
         *       },
         *     }
         *   );
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "algorithm": "my_algorithm",
         *   //   "attestation": {},
         *   //   "createTime": "my_createTime",
         *   //   "destroyEventTime": "my_destroyEventTime",
         *   //   "destroyTime": "my_destroyTime",
         *   //   "externalProtectionLevelOptions": {},
         *   //   "generateTime": "my_generateTime",
         *   //   "importFailureReason": "my_importFailureReason",
         *   //   "importJob": "my_importJob",
         *   //   "importTime": "my_importTime",
         *   //   "name": "my_name",
         *   //   "protectionLevel": "my_protectionLevel",
         *   //   "state": "my_state"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudkms.projects.locations.keyRings.cryptoKeys.cryptoKeyVersions.restore
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The resource name of the CryptoKeyVersion to restore.
         * @param {().RestoreCryptoKeyVersionRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        restore(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Restore, options: StreamMethodOptions): GaxiosPromise<Readable>;
        restore(params?: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Restore, options?: MethodOptions): GaxiosPromise<Schema$CryptoKeyVersion>;
        restore(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Restore, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        restore(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Restore, options: MethodOptions | BodyResponseCallback<Schema$CryptoKeyVersion>, callback: BodyResponseCallback<Schema$CryptoKeyVersion>): void;
        restore(params: Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Restore, callback: BodyResponseCallback<Schema$CryptoKeyVersion>): void;
        restore(callback: BodyResponseCallback<Schema$CryptoKeyVersion>): void;
    }
    export interface Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Asymmetricdecrypt extends StandardParameters {
        /**
         * Required. The resource name of the CryptoKeyVersion to use for decryption.
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$AsymmetricDecryptRequest;
    }
    export interface Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Asymmetricsign extends StandardParameters {
        /**
         * Required. The resource name of the CryptoKeyVersion to use for signing.
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$AsymmetricSignRequest;
    }
    export interface Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Create extends StandardParameters {
        /**
         * Required. The name of the CryptoKey associated with the CryptoKeyVersions.
         */
        parent?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$CryptoKeyVersion;
    }
    export interface Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Destroy extends StandardParameters {
        /**
         * Required. The resource name of the CryptoKeyVersion to destroy.
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$DestroyCryptoKeyVersionRequest;
    }
    export interface Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Get extends StandardParameters {
        /**
         * Required. The name of the CryptoKeyVersion to get.
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Getpublickey extends StandardParameters {
        /**
         * Required. The name of the CryptoKeyVersion public key to get.
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Import extends StandardParameters {
        /**
         * Required. The name of the CryptoKey to be imported into.
         */
        parent?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$ImportCryptoKeyVersionRequest;
    }
    export interface Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$List extends StandardParameters {
        /**
         * Optional. Only include resources that match the filter in the response. For more information, see [Sorting and filtering list results](https://cloud.google.com/kms/docs/sorting-and-filtering).
         */
        filter?: string;
        /**
         * Optional. Specify how the results should be sorted. If not specified, the results will be sorted in the default order. For more information, see [Sorting and filtering list results](https://cloud.google.com/kms/docs/sorting-and-filtering).
         */
        orderBy?: string;
        /**
         * Optional. Optional limit on the number of CryptoKeyVersions to include in the response. Further CryptoKeyVersions can subsequently be obtained by including the ListCryptoKeyVersionsResponse.next_page_token in a subsequent request. If unspecified, the server will pick an appropriate default.
         */
        pageSize?: number;
        /**
         * Optional. Optional pagination token, returned earlier via ListCryptoKeyVersionsResponse.next_page_token.
         */
        pageToken?: string;
        /**
         * Required. The resource name of the CryptoKey to list, in the format `projects/x/locations/x/keyRings/x/cryptoKeys/x`.
         */
        parent?: string;
        /**
         * The fields to include in the response.
         */
        view?: string;
    }
    export interface Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Patch extends StandardParameters {
        /**
         * Output only. The resource name for this CryptoKeyVersion in the format `projects/x/locations/x/keyRings/x/cryptoKeys/x/cryptoKeyVersions/x`.
         */
        name?: string;
        /**
         * Required. List of fields to be updated in this request.
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$CryptoKeyVersion;
    }
    export interface Params$Resource$Projects$Locations$Keyrings$Cryptokeys$Cryptokeyversions$Restore extends StandardParameters {
        /**
         * Required. The resource name of the CryptoKeyVersion to restore.
         */
        name?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$RestoreCryptoKeyVersionRequest;
    }
    export class Resource$Projects$Locations$Keyrings$Importjobs {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * cloudkms.projects.locations.keyRings.importJobs.create
         * @desc Create a new ImportJob within a KeyRing.  ImportJob.import_method is required.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudkms.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudkms = google.cloudkms('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudkms',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await cloudkms.projects.locations.keyRings.importJobs.create({
         *     // Required. It must be unique within a KeyRing and match the regular
         *     // expression `[a-zA-Z0-9_-]{1,63}`
         *     importJobId: 'placeholder-value',
         *     // Required. The name of the KeyRing associated with the
         *     // ImportJobs.
         *     parent: 'projects/my-project/locations/my-location/keyRings/my-keyRing',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "attestation": {},
         *       //   "createTime": "my_createTime",
         *       //   "expireEventTime": "my_expireEventTime",
         *       //   "expireTime": "my_expireTime",
         *       //   "generateTime": "my_generateTime",
         *       //   "importMethod": "my_importMethod",
         *       //   "name": "my_name",
         *       //   "protectionLevel": "my_protectionLevel",
         *       //   "publicKey": {},
         *       //   "state": "my_state"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "attestation": {},
         *   //   "createTime": "my_createTime",
         *   //   "expireEventTime": "my_expireEventTime",
         *   //   "expireTime": "my_expireTime",
         *   //   "generateTime": "my_generateTime",
         *   //   "importMethod": "my_importMethod",
         *   //   "name": "my_name",
         *   //   "protectionLevel": "my_protectionLevel",
         *   //   "publicKey": {},
         *   //   "state": "my_state"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudkms.projects.locations.keyRings.importJobs.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.importJobId Required. It must be unique within a KeyRing and match the regular expression `[a-zA-Z0-9_-]{1,63}`
         * @param {string} params.parent Required. The name of the KeyRing associated with the ImportJobs.
         * @param {().ImportJob} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Projects$Locations$Keyrings$Importjobs$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Projects$Locations$Keyrings$Importjobs$Create, options?: MethodOptions): GaxiosPromise<Schema$ImportJob>;
        create(params: Params$Resource$Projects$Locations$Keyrings$Importjobs$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Projects$Locations$Keyrings$Importjobs$Create, options: MethodOptions | BodyResponseCallback<Schema$ImportJob>, callback: BodyResponseCallback<Schema$ImportJob>): void;
        create(params: Params$Resource$Projects$Locations$Keyrings$Importjobs$Create, callback: BodyResponseCallback<Schema$ImportJob>): void;
        create(callback: BodyResponseCallback<Schema$ImportJob>): void;
        /**
         * cloudkms.projects.locations.keyRings.importJobs.get
         * @desc Returns metadata for a given ImportJob.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudkms.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudkms = google.cloudkms('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudkms',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await cloudkms.projects.locations.keyRings.importJobs.get({
         *     // Required. The name of the ImportJob to get.
         *     name:
         *       'projects/my-project/locations/my-location/keyRings/my-keyRing/importJobs/my-importJob',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "attestation": {},
         *   //   "createTime": "my_createTime",
         *   //   "expireEventTime": "my_expireEventTime",
         *   //   "expireTime": "my_expireTime",
         *   //   "generateTime": "my_generateTime",
         *   //   "importMethod": "my_importMethod",
         *   //   "name": "my_name",
         *   //   "protectionLevel": "my_protectionLevel",
         *   //   "publicKey": {},
         *   //   "state": "my_state"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudkms.projects.locations.keyRings.importJobs.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name Required. The name of the ImportJob to get.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Projects$Locations$Keyrings$Importjobs$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Projects$Locations$Keyrings$Importjobs$Get, options?: MethodOptions): GaxiosPromise<Schema$ImportJob>;
        get(params: Params$Resource$Projects$Locations$Keyrings$Importjobs$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Projects$Locations$Keyrings$Importjobs$Get, options: MethodOptions | BodyResponseCallback<Schema$ImportJob>, callback: BodyResponseCallback<Schema$ImportJob>): void;
        get(params: Params$Resource$Projects$Locations$Keyrings$Importjobs$Get, callback: BodyResponseCallback<Schema$ImportJob>): void;
        get(callback: BodyResponseCallback<Schema$ImportJob>): void;
        /**
         * cloudkms.projects.locations.keyRings.importJobs.getIamPolicy
         * @desc Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudkms.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudkms = google.cloudkms('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudkms',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await cloudkms.projects.locations.keyRings.importJobs.getIamPolicy(
         *     {
         *       // Optional. The policy format version to be returned.
         *       //
         *       // Valid values are 0, 1, and 3. Requests specifying an invalid value will be
         *       // rejected.
         *       //
         *       // Requests for policies with any conditional bindings must specify version 3.
         *       // Policies without any conditional bindings may specify any valid value or
         *       // leave the field unset.
         *       //
         *       // To learn which resources support conditions in their IAM policies, see the
         *       // [IAM
         *       // documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
         *       'options.requestedPolicyVersion': 'placeholder-value',
         *       // REQUIRED: The resource for which the policy is being requested.
         *       // See the operation documentation for the appropriate value for this field.
         *       resource:
         *         'projects/my-project/locations/my-location/keyRings/my-keyRing/importJobs/my-importJob',
         *     }
         *   );
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "auditConfigs": [],
         *   //   "bindings": [],
         *   //   "etag": "my_etag",
         *   //   "version": 0
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudkms.projects.locations.keyRings.importJobs.getIamPolicy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.options.requestedPolicyVersion Optional. The policy format version to be returned.  Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.  Requests for policies with any conditional bindings must specify version 3. Policies without any conditional bindings may specify any valid value or leave the field unset.  To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
         * @param {string} params.resource_ REQUIRED: The resource for which the policy is being requested. See the operation documentation for the appropriate value for this field.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        getIamPolicy(params: Params$Resource$Projects$Locations$Keyrings$Importjobs$Getiampolicy, options: StreamMethodOptions): GaxiosPromise<Readable>;
        getIamPolicy(params?: Params$Resource$Projects$Locations$Keyrings$Importjobs$Getiampolicy, options?: MethodOptions): GaxiosPromise<Schema$Policy>;
        getIamPolicy(params: Params$Resource$Projects$Locations$Keyrings$Importjobs$Getiampolicy, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        getIamPolicy(params: Params$Resource$Projects$Locations$Keyrings$Importjobs$Getiampolicy, options: MethodOptions | BodyResponseCallback<Schema$Policy>, callback: BodyResponseCallback<Schema$Policy>): void;
        getIamPolicy(params: Params$Resource$Projects$Locations$Keyrings$Importjobs$Getiampolicy, callback: BodyResponseCallback<Schema$Policy>): void;
        getIamPolicy(callback: BodyResponseCallback<Schema$Policy>): void;
        /**
         * cloudkms.projects.locations.keyRings.importJobs.list
         * @desc Lists ImportJobs.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudkms.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudkms = google.cloudkms('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudkms',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await cloudkms.projects.locations.keyRings.importJobs.list({
         *     // Optional. Only include resources that match the filter in the response. For
         *     // more information, see
         *     // [Sorting and filtering list
         *     // results](https://cloud.google.com/kms/docs/sorting-and-filtering).
         *     filter: 'placeholder-value',
         *     // Optional. Specify how the results should be sorted. If not specified, the
         *     // results will be sorted in the default order. For more information, see
         *     // [Sorting and filtering list
         *     // results](https://cloud.google.com/kms/docs/sorting-and-filtering).
         *     orderBy: 'placeholder-value',
         *     // Optional. Optional limit on the number of ImportJobs to include in the
         *     // response. Further ImportJobs can subsequently be obtained by
         *     // including the ListImportJobsResponse.next_page_token in a subsequent
         *     // request. If unspecified, the server will pick an appropriate default.
         *     pageSize: 'placeholder-value',
         *     // Optional. Optional pagination token, returned earlier via
         *     // ListImportJobsResponse.next_page_token.
         *     pageToken: 'placeholder-value',
         *     // Required. The resource name of the KeyRing to list, in the format
         *     // `projects/x/locations/x/keyRings/x`.
         *     parent: 'projects/my-project/locations/my-location/keyRings/my-keyRing',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "importJobs": [],
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "totalSize": 0
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudkms.projects.locations.keyRings.importJobs.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.filter Optional. Only include resources that match the filter in the response. For more information, see [Sorting and filtering list results](https://cloud.google.com/kms/docs/sorting-and-filtering).
         * @param {string=} params.orderBy Optional. Specify how the results should be sorted. If not specified, the results will be sorted in the default order. For more information, see [Sorting and filtering list results](https://cloud.google.com/kms/docs/sorting-and-filtering).
         * @param {integer=} params.pageSize Optional. Optional limit on the number of ImportJobs to include in the response. Further ImportJobs can subsequently be obtained by including the ListImportJobsResponse.next_page_token in a subsequent request. If unspecified, the server will pick an appropriate default.
         * @param {string=} params.pageToken Optional. Optional pagination token, returned earlier via ListImportJobsResponse.next_page_token.
         * @param {string} params.parent Required. The resource name of the KeyRing to list, in the format `projects/x/locations/x/keyRings/x`.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Projects$Locations$Keyrings$Importjobs$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Projects$Locations$Keyrings$Importjobs$List, options?: MethodOptions): GaxiosPromise<Schema$ListImportJobsResponse>;
        list(params: Params$Resource$Projects$Locations$Keyrings$Importjobs$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Projects$Locations$Keyrings$Importjobs$List, options: MethodOptions | BodyResponseCallback<Schema$ListImportJobsResponse>, callback: BodyResponseCallback<Schema$ListImportJobsResponse>): void;
        list(params: Params$Resource$Projects$Locations$Keyrings$Importjobs$List, callback: BodyResponseCallback<Schema$ListImportJobsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListImportJobsResponse>): void;
        /**
         * cloudkms.projects.locations.keyRings.importJobs.setIamPolicy
         * @desc Sets the access control policy on the specified resource. Replaces any existing policy.  Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudkms.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudkms = google.cloudkms('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudkms',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await cloudkms.projects.locations.keyRings.importJobs.setIamPolicy(
         *     {
         *       // REQUIRED: The resource for which the policy is being specified.
         *       // See the operation documentation for the appropriate value for this field.
         *       resource:
         *         'projects/my-project/locations/my-location/keyRings/my-keyRing/importJobs/my-importJob',
         *
         *       // Request body metadata
         *       requestBody: {
         *         // request body parameters
         *         // {
         *         //   "policy": {},
         *         //   "updateMask": "my_updateMask"
         *         // }
         *       },
         *     }
         *   );
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "auditConfigs": [],
         *   //   "bindings": [],
         *   //   "etag": "my_etag",
         *   //   "version": 0
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudkms.projects.locations.keyRings.importJobs.setIamPolicy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.resource_ REQUIRED: The resource for which the policy is being specified. See the operation documentation for the appropriate value for this field.
         * @param {().SetIamPolicyRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        setIamPolicy(params: Params$Resource$Projects$Locations$Keyrings$Importjobs$Setiampolicy, options: StreamMethodOptions): GaxiosPromise<Readable>;
        setIamPolicy(params?: Params$Resource$Projects$Locations$Keyrings$Importjobs$Setiampolicy, options?: MethodOptions): GaxiosPromise<Schema$Policy>;
        setIamPolicy(params: Params$Resource$Projects$Locations$Keyrings$Importjobs$Setiampolicy, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        setIamPolicy(params: Params$Resource$Projects$Locations$Keyrings$Importjobs$Setiampolicy, options: MethodOptions | BodyResponseCallback<Schema$Policy>, callback: BodyResponseCallback<Schema$Policy>): void;
        setIamPolicy(params: Params$Resource$Projects$Locations$Keyrings$Importjobs$Setiampolicy, callback: BodyResponseCallback<Schema$Policy>): void;
        setIamPolicy(callback: BodyResponseCallback<Schema$Policy>): void;
        /**
         * cloudkms.projects.locations.keyRings.importJobs.testIamPermissions
         * @desc Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error.  Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/cloudkms.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const cloudkms = google.cloudkms('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/cloud-platform',
         *       'https://www.googleapis.com/auth/cloudkms',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await cloudkms.projects.locations.keyRings.importJobs.testIamPermissions(
         *     {
         *       // REQUIRED: The resource for which the policy detail is being requested.
         *       // See the operation documentation for the appropriate value for this field.
         *       resource:
         *         'projects/my-project/locations/my-location/keyRings/my-keyRing/importJobs/my-importJob',
         *
         *       // Request body metadata
         *       requestBody: {
         *         // request body parameters
         *         // {
         *         //   "permissions": []
         *         // }
         *       },
         *     }
         *   );
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "permissions": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias cloudkms.projects.locations.keyRings.importJobs.testIamPermissions
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.resource_ REQUIRED: The resource for which the policy detail is being requested. See the operation documentation for the appropriate value for this field.
         * @param {().TestIamPermissionsRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        testIamPermissions(params: Params$Resource$Projects$Locations$Keyrings$Importjobs$Testiampermissions, options: StreamMethodOptions): GaxiosPromise<Readable>;
        testIamPermissions(params?: Params$Resource$Projects$Locations$Keyrings$Importjobs$Testiampermissions, options?: MethodOptions): GaxiosPromise<Schema$TestIamPermissionsResponse>;
        testIamPermissions(params: Params$Resource$Projects$Locations$Keyrings$Importjobs$Testiampermissions, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        testIamPermissions(params: Params$Resource$Projects$Locations$Keyrings$Importjobs$Testiampermissions, options: MethodOptions | BodyResponseCallback<Schema$TestIamPermissionsResponse>, callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        testIamPermissions(params: Params$Resource$Projects$Locations$Keyrings$Importjobs$Testiampermissions, callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
        testIamPermissions(callback: BodyResponseCallback<Schema$TestIamPermissionsResponse>): void;
    }
    export interface Params$Resource$Projects$Locations$Keyrings$Importjobs$Create extends StandardParameters {
        /**
         * Required. It must be unique within a KeyRing and match the regular expression `[a-zA-Z0-9_-]{1,63}`
         */
        importJobId?: string;
        /**
         * Required. The name of the KeyRing associated with the ImportJobs.
         */
        parent?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$ImportJob;
    }
    export interface Params$Resource$Projects$Locations$Keyrings$Importjobs$Get extends StandardParameters {
        /**
         * Required. The name of the ImportJob to get.
         */
        name?: string;
    }
    export interface Params$Resource$Projects$Locations$Keyrings$Importjobs$Getiampolicy extends StandardParameters {
        /**
         * Optional. The policy format version to be returned.  Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.  Requests for policies with any conditional bindings must specify version 3. Policies without any conditional bindings may specify any valid value or leave the field unset.  To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
         */
        'options.requestedPolicyVersion'?: number;
        /**
         * REQUIRED: The resource for which the policy is being requested. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
    }
    export interface Params$Resource$Projects$Locations$Keyrings$Importjobs$List extends StandardParameters {
        /**
         * Optional. Only include resources that match the filter in the response. For more information, see [Sorting and filtering list results](https://cloud.google.com/kms/docs/sorting-and-filtering).
         */
        filter?: string;
        /**
         * Optional. Specify how the results should be sorted. If not specified, the results will be sorted in the default order. For more information, see [Sorting and filtering list results](https://cloud.google.com/kms/docs/sorting-and-filtering).
         */
        orderBy?: string;
        /**
         * Optional. Optional limit on the number of ImportJobs to include in the response. Further ImportJobs can subsequently be obtained by including the ListImportJobsResponse.next_page_token in a subsequent request. If unspecified, the server will pick an appropriate default.
         */
        pageSize?: number;
        /**
         * Optional. Optional pagination token, returned earlier via ListImportJobsResponse.next_page_token.
         */
        pageToken?: string;
        /**
         * Required. The resource name of the KeyRing to list, in the format `projects/x/locations/x/keyRings/x`.
         */
        parent?: string;
    }
    export interface Params$Resource$Projects$Locations$Keyrings$Importjobs$Setiampolicy extends StandardParameters {
        /**
         * REQUIRED: The resource for which the policy is being specified. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$SetIamPolicyRequest;
    }
    export interface Params$Resource$Projects$Locations$Keyrings$Importjobs$Testiampermissions extends StandardParameters {
        /**
         * REQUIRED: The resource for which the policy detail is being requested. See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$TestIamPermissionsRequest;
    }
    export {};
}
