[Back to Datashare](./README.md)

# Principles

Datashare aims to embody certain key principles. Among these are:

- _Promote efficient storage of common datasets_

A common (anti-)pattern with permissioned datasets, especially those delivered in bulk, is that when a data publisher releases a dataset, consumers replicate the physical dataset to their infrastructure, maintaining their own copy of the data and incurring their own storage and processing costs, which are above and beyond the cost of licensing access to the data.

Datashare uses BigQuery's underlying infrastructure for maintaining sufficient copies of the data as needed to still ensure high-availability. Most commercial data distribution models today scale storage linearly for each consumer. With Datashare, consumers use the GCP tooling with which they are already familiar and access permissioned datasets seamlessly - reducing unnecessary dataset storage overall.

- _Reduce ingestion friction for publishers and consumers_

In many of today's typical scenarios, for each published dataset, a consumer must also ingest and normalize the data into their own specific environment. This adds additional toil to the data onboarding workflow and extends the duration that conumers must wait before the data can be usable. Datashare aims to limit this friction to as few steps as possible, relying on convention and automation to execute an end-to-end data pipeline.

- _Make it easy for data publishers to grant permissioned access for existing GCP consumers of their datasets_

Commercial data publishing models rely on entitlements to grant access permission to licensed consuners. For large data publishers, their electronic entitlements solution may be entirely bespoke. DS provides a simple solution for controlling access to data by using GCP's native access control mechanism combined with BigQuery authorized views and Publisher-defined groupings.

- _Favor instrumenting the solution's configuration via convention_

Derive configuration options from runtime context where possible, and aspire to keep configuration-specific assets to a minimum.