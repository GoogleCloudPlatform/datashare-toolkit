[Back to Datashare](./README.md)

# Overview
Data Producers are accounts with administrative access to the Datashare UI. To modify the list of Data Producers for an existing setup, you must edit the data_producers environmental variable of the ds-api cloud run service.

```
REGION=us-central1
gcloud run services update ds-api \
  --region=$REGION \
  --platform managed \
  --update-env-vars=^---^DATA_PRODUCERS="${DATA_PRODUCERS}"
```