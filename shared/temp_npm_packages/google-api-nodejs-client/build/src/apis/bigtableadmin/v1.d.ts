import { GoogleConfigurable, GlobalOptions, APIRequestContext } from 'googleapis-common';
export declare namespace bigtableadmin_v1 {
    interface Options extends GlobalOptions {
        version: 'v1';
    }
    /**
     * Cloud Bigtable Admin API
     *
     * Administer your Cloud Bigtable tables and instances.
     *
     * @example
     * const {google} = require('googleapis');
     * const bigtableadmin = google.bigtableadmin('v1');
     *
     * @namespace bigtableadmin
     * @type {Function}
     * @version v1
     * @variation v1
     * @param {object=} options Options for Bigtableadmin
     */
    class Bigtableadmin {
        context: APIRequestContext;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
    }
    /**
     * A resizable group of nodes in a particular cloud location, capable of serving all Tables in the parent Instance.
     */
    interface Schema$Cluster {
        /**
         * (`CreationOnly`) The type of storage used by this cluster to serve its parent instance&#39;s tables, unless explicitly overridden.
         */
        defaultStorageType?: string | null;
        /**
         * (`CreationOnly`) The location where this cluster&#39;s nodes and storage reside. For best performance, clients should be located as close as possible to this cluster. Currently only zones are supported, so values should be of the form `projects/{project}/locations/{zone}`.
         */
        location?: string | null;
        /**
         * Required. (`OutputOnly`) The unique name of the cluster. Values are of the form `projects/{project}/instances/{instance}/clusters/a-z*`.
         */
        name?: string | null;
        /**
         * Required. The number of nodes allocated to this cluster. More nodes enable higher throughput and more consistent performance.
         */
        serveNodes?: number | null;
        /**
         * (`OutputOnly`) The current state of the cluster.
         */
        state?: string | null;
    }
    /**
     * The metadata for the Operation returned by CreateCluster.
     */
    interface Schema$CreateClusterMetadata {
        /**
         * The time at which the operation failed or was completed successfully.
         */
        finishTime?: string | null;
        /**
         * The request that prompted the initiation of this CreateCluster operation.
         */
        originalRequest?: Schema$CreateClusterRequest;
        /**
         * The time at which the original request was received.
         */
        requestTime?: string | null;
        /**
         * Keys: the full `name` of each table that existed in the instance when CreateCluster was first called, i.e. `projects/&lt;project&gt;/instances/&lt;instance&gt;/tables/&lt;table&gt;`. Any table added to the instance by a later API call will be created in the new cluster by that API call, not this one.  Values: information on how much of a table&#39;s data has been copied to the newly-created cluster so far.
         */
        tables?: {
            [key: string]: Schema$TableProgress;
        } | null;
    }
    /**
     * Request message for BigtableInstanceAdmin.CreateCluster.
     */
    interface Schema$CreateClusterRequest {
        /**
         * Required. The cluster to be created. Fields marked `OutputOnly` must be left blank.
         */
        cluster?: Schema$Cluster;
        /**
         * Required. The ID to be used when referring to the new cluster within its instance, e.g., just `mycluster` rather than `projects/myproject/instances/myinstance/clusters/mycluster`.
         */
        clusterId?: string | null;
        /**
         * Required. The unique name of the instance in which to create the new cluster. Values are of the form `projects/{project}/instances/{instance}`.
         */
        parent?: string | null;
    }
    /**
     * The metadata for the Operation returned by CreateInstance.
     */
    interface Schema$CreateInstanceMetadata {
        /**
         * The time at which the operation failed or was completed successfully.
         */
        finishTime?: string | null;
        /**
         * The request that prompted the initiation of this CreateInstance operation.
         */
        originalRequest?: Schema$CreateInstanceRequest;
        /**
         * The time at which the original request was received.
         */
        requestTime?: string | null;
    }
    /**
     * Request message for BigtableInstanceAdmin.CreateInstance.
     */
    interface Schema$CreateInstanceRequest {
        /**
         * Required. The clusters to be created within the instance, mapped by desired cluster ID, e.g., just `mycluster` rather than `projects/myproject/instances/myinstance/clusters/mycluster`. Fields marked `OutputOnly` must be left blank. Currently, at most four clusters can be specified.
         */
        clusters?: {
            [key: string]: Schema$Cluster;
        } | null;
        /**
         * Required. The instance to create. Fields marked `OutputOnly` must be left blank.
         */
        instance?: Schema$Instance;
        /**
         * Required. The ID to be used when referring to the new instance within its project, e.g., just `myinstance` rather than `projects/myproject/instances/myinstance`.
         */
        instanceId?: string | null;
        /**
         * Required. The unique name of the project in which to create the new instance. Values are of the form `projects/{project}`.
         */
        parent?: string | null;
    }
    /**
     * A collection of Bigtable Tables and the resources that serve them. All tables in an instance are served from all Clusters in the instance.
     */
    interface Schema$Instance {
        /**
         * Required. The descriptive name for this instance as it appears in UIs. Can be changed at any time, but should be kept globally unique to avoid confusion.
         */
        displayName?: string | null;
        /**
         * Required. Labels are a flexible and lightweight mechanism for organizing cloud resources into groups that reflect a customer&#39;s organizational needs and deployment strategies. They can be used to filter resources and aggregate metrics.  * Label keys must be between 1 and 63 characters long and must conform to   the regular expression: `\p{Ll}\p{Lo}{0,62}`. * Label values must be between 0 and 63 characters long and must conform to   the regular expression: `[\p{Ll}\p{Lo}\p{N}_-]{0,63}`. * No more than 64 labels can be associated with a given resource. * Keys and values must both be under 128 bytes.
         */
        labels?: {
            [key: string]: string;
        } | null;
        /**
         * Required. (`OutputOnly`) The unique name of the instance. Values are of the form `projects/{project}/instances/a-z+[a-z0-9]`.
         */
        name?: string | null;
        /**
         * (`OutputOnly`) The current state of the instance.
         */
        state?: string | null;
        /**
         * Required. The type of the instance. Defaults to `PRODUCTION`.
         */
        type?: string | null;
    }
    /**
     * Request message for BigtableInstanceAdmin.PartialUpdateInstance.
     */
    interface Schema$PartialUpdateInstanceRequest {
        /**
         * Required. The Instance which will (partially) replace the current value.
         */
        instance?: Schema$Instance;
        /**
         * Required. The subset of Instance fields which should be replaced. Must be explicitly set.
         */
        updateMask?: string | null;
    }
    /**
     * Progress info for copying a table&#39;s data to the new cluster.
     */
    interface Schema$TableProgress {
        /**
         * Estimate of the number of bytes copied so far for this table. This will eventually reach &#39;estimated_size_bytes&#39; unless the table copy is CANCELLED.
         */
        estimatedCopiedBytes?: string | null;
        /**
         * Estimate of the size of the table to be copied.
         */
        estimatedSizeBytes?: string | null;
        state?: string | null;
    }
    /**
     * The metadata for the Operation returned by UpdateAppProfile.
     */
    interface Schema$UpdateAppProfileMetadata {
    }
    /**
     * The metadata for the Operation returned by UpdateCluster.
     */
    interface Schema$UpdateClusterMetadata {
        /**
         * The time at which the operation failed or was completed successfully.
         */
        finishTime?: string | null;
        /**
         * The request that prompted the initiation of this UpdateCluster operation.
         */
        originalRequest?: Schema$Cluster;
        /**
         * The time at which the original request was received.
         */
        requestTime?: string | null;
    }
    /**
     * The metadata for the Operation returned by UpdateInstance.
     */
    interface Schema$UpdateInstanceMetadata {
        /**
         * The time at which the operation failed or was completed successfully.
         */
        finishTime?: string | null;
        /**
         * The request that prompted the initiation of this UpdateInstance operation.
         */
        originalRequest?: Schema$PartialUpdateInstanceRequest;
        /**
         * The time at which the original request was received.
         */
        requestTime?: string | null;
    }
}
