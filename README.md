# ```BigQuery Datashare Toolkit```
## _DIY commercial datasets on Google Cloud Platform_

_This is not an officially supported Google product._

The ```BigQuery Datashare Toolkit (BQDS)``` is a solution that data publishers can use for ingesting and granting licensee access to entitled, GCP-native datasets. Your licensees can be freed from the toil of transferring, normalizing, and loading their datasets into GCP from source data files. Publishers expose their permissioned datasets virtually — using BigQuery [authorized views](https://cloud.google.com/bigquery/docs/authorized-views). This results in less friction and toil for both publishers and consumers and can be viewed as a parallel distribution channel specific to data customers running infrastructure on GCP.

While ```BQDS``` is used for data management and entitlement, it does not manage any commercial aspects of delivery. Hence, it is assumed that publishers already have licensing arrangements and that your customers have furnished you the GCP account ID's corresponding to their entitlements. These are required for the creation of the authorized views within BigQuery.

```BQDS``` is open-source. Some supporting infrastructure, such as Cloud Storage Buckets, Cloud Functions, and BigQuery datasets, must be maintained within GCP projects by publishers in order to use BQDS. As a consumer, when your GCP account is added to the publisher entitlements, you can view published data as if it were your own, ready to integrate into your analytics or runtime application. Publishers are responsible for managing the limited BQDS support infrastructure for their datasets.

Publishers are billed for the storage of any underlying data they expose to entitled GCP users, whereas the consumers of the data are billed for the respective compute and network utilization of their queries against the data. At this time, `BQDS` does not otherwise have any visibility into the commercial arrangements between consumers and publishers, and applies access controls only as specified in the entitlements configuration. Hence, publishers should ascertain entitlements for corresponding consumers on GCP, and configure access controls for those consumers within the entitlements engine.

## Principles

```BQDS``` aims to embody certain key principles. Among these are:

- _Promote efficient storage of common datasets_

A common (anti-)pattern with permissioned datasets, especially those delivered in bulk, is that when a data publisher releases a dataset, consumers replicate the physical dataset to their infrastructure, maintaining their own copy of the data and incurring their own storage and processing costs, which are above and beyond the cost of licensing access to the data.

```BQDS``` defers to BigQuery for maintaining sufficient copies of the data as needed to still ensure high-availability. Scaling storage linearly for each consumer is suboptimal. Instead, using the GCP tooling with which they are already familiar, consumers access permissioned datasets seamlessly - reducing unnecessary dataset storage.

- _Reduce ingestion friction for publishers and consumers_

In many of today's typical scenarios, for each published dataset, a consumer must ingest and normalize the data into its own specific environment. This adds redundant steps to the data processing workflow and extends the duration that conumers must wait before the data can be usable. ```BQDS``` aims to limit this friction to as few steps as possible, relying on convention and automation to execute the end-to-end data pipeline.

- _Make it easy for data publishers to grant permissioned access for existing GCP consumers of their datasets_

Commercial data publishing models rely on entitlements to grant access permission to licensed consuners. For publishers with a long history, their electronic entitlements solution may be entirely bespoke. BQDS provides a simple solution for consumer entitlements by using GCP's native access control mechanism combined with BigQuery authorized views.

- _Favor instrumenting the solution's configuration via convention_

Derive configuration options from runtime context where possible, and aspire to keep configuration-specific assets to a minimum.

## Architecture

![BQDS Architecture](architecture.png "BQDS Architecture")

## Publishing data to GCP clients using these tools

The toolkit supports batch mode ingestion of data files into BigQuery tables and the creation of downstream authorized views as a subset of the uploaded data.

Ingestion is performed by a Cloud Function that executes BigQuery jobs configured by a combination of convention (how source data files are named) and static configuration (schema definitions, transformation logic, and entitlement generation).

The function is triggered off mutations to a specified Cloud Storage Bucket.

Entitlements are configured out-of-band, but ultimately reference tables created during the ingestion stage. Entitlements must be regenerated each time access control lists are changed within the entitlements configuration file.

## Ingestion and transformation

The [processUpload](ingestion/processUpload/README.md) page has details on ```BQDS```'s embedded ingestion and transformation features.

## Entitlements and view management
The [entitlementEngine](entitlements/README.md) sections go into more detail on using ```BQDS```'s  entitlement capabilities.

## Disclaimers

This is not an officially supported Google product.

BQDS is under active development. Interfaces and functionality may change at any time.

## License

This repository  is licensed under the Apache 2 license (see [LICENSE](LICENSE.txt)).

Contributions are welcome. See [CONTRIBUTING](CONTRIBUTING.md) for more information.
