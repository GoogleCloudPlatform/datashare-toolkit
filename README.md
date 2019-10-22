# ```BigQuery Datashare Toolkit```
## _DIY commercial datasets on Google Cloud Platform_

_This is not an officially supported Google product._

The ```BigQuery Datashare Toolkit (BQDS)``` is a solution for data publishers to easily manage datasets residing within [BigQuery](https://cloud.google.com/bigquery/). The toolkit includes functionality to ingest and entitle data, relieving consumers from much of the toil involved in onboarding datasets from a variety of providers. Publishers upload data files to a storage bucket and allocate permissioned datasets using BigQuery [authorized views](https://cloud.google.com/bigquery/docs/authorized-views). This results in less friction for both publishers and consumers.

While ```BQDS``` is used for data management and entitlement, it does *not* manage any commercial aspects of delivery. Hence, it is assumed that publishers already have licensing arrangements and that consumers have furnished you the GCP account ID's corresponding to their entitled users. These are required for the creation of the authorized views within BigQuery.

```BQDS``` is open-source. Some supporting infrastructure, such as [storage buckets](https://cloud.google.com/storage/), serverless functions, and BigQuery datasets, must be maintained within GCP by publishers in order to use BQDS. As a consumer, when your GCP account is added to the publisher entitlements, you can view published data as if it were your own, ready to integrate into your analytics workflow, machine learning model, or runtime application. Publishers are responsible for managing the limited BQDS support infrastructure for their datasets. While consumers are billed for BigQuery compute and networking, Publishers incur costs only on the storage of their data in BigQuery and Cloud Storage.

For publisher projects that do not have the Cloud Functions API enabled at the time of running [deploy.sh](ingestion/bin/deploy.sh), the API will be enabled on the project's behalf.

## Principles

```BQDS``` aims to embody certain key principles. Among these are:

- _Promote efficient storage of common datasets_

A common (anti-)pattern with permissioned datasets, especially those delivered in bulk, is that when a data publisher releases a dataset, consumers replicate the physical dataset to their infrastructure, maintaining their own copy of the data and incurring their own storage and processing costs, which are above and beyond the cost of licensing access to the data.

```BQDS``` uses BigQuery's underlying support for maintaining sufficient copies of the data as needed to still ensure high-availability. Most commercial data distribution models today scale storage linearly for each consumer. With ```BQDS```, consumers use the GCP tooling with which they are already familiar and access permissioned datasets seamlessly - reducing unnecessary dataset storage.

- _Reduce ingestion friction for publishers and consumers_

In many of today's typical scenarios, for each published dataset, a consumer must also ingest and normalize the data into their own specific environment. This adds additional toil to the data onboarding workflow and extends the duration that conumers must wait before the data can be usable. ```BQDS``` aims to limit this friction to as few steps as possible, relying on convention and automation to execute an end-to-end data pipeline.

- _Make it easy for data publishers to grant permissioned access for existing GCP consumers of their datasets_

Commercial data publishing models rely on entitlements to grant access permission to licensed consuners. For large data publishers, their electronic entitlements solution may be entirely bespoke. BQDS provides a simple solution for controlling access to data by using GCP's native access control mechanism combined with BigQuery authorized views and Publisher-defined groupings.

- _Favor instrumenting the solution's configuration via convention_

Derive configuration options from runtime context where possible, and aspire to keep configuration-specific assets to a minimum.

## Architecture

![BQDS Architecture](architecture.png "BQDS Architecture")

## Publishing data to GCP clients using these tools

The toolkit currently supports batch mode ingestion of data files into BigQuery tables and the creation of downstream authorized views as a subset of the uploaded data, to which individual or groups of GCP users can be entitled access.

Ingestion is performed by a [Google Cloud Function](https://cloud.google.com/functions/) that executes BigQuery jobs configured by a combination of convention (how source data files are named) and static configuration (schema definitions, transformation logic, and entitlement generation).

The function is triggered off mutations to a specified Cloud Storage Bucket.

[Entitlements](entitlements) are configured in a separate workflow, but generally reference tables created during the ingestion stage. Entitlements must be regenerated each time access control lists or authorized views change.

## Ingestion and transformation

The [ingestion](ingestion) page has details on `BQDS`'s embedded ingestion and transformation features.

## Entitlements and view management
The [entitlementEngine](entitlements) sections go into more detail on using `BQDS`'s  entitlement capabilities.

## Examples
The [examples](examples) directory has several configurations highlighting various `BQDS` usage models.

## Disclaimers

This is not an officially supported Google product.

`BQDS` is under active development. Interfaces and functionality may change at any time.

## License

This repository  is licensed under the Apache 2 license (see [LICENSE](LICENSE.txt)).

Contributions are welcome. See [CONTRIBUTING](CONTRIBUTING.md) for more information.
