function navigateToMarketplace(projectId, solutionId) {
  const url = `https://console.cloud.google.com/marketplace/details/${projectId}/${solutionId}?project=${projectId}`;
  window.open(url, '_blank');
}

function navigateToDataset(projectId, datasetId) {
  const url = `https://console.cloud.google.com/bigquery?project=${projectId}&p=${projectId}&d=${datasetId}&page=dataset`;
  window.open(url, '_blank');
}

function navigateToTable(projectId, datasetId, tableId) {
  const url = `https://console.cloud.google.com/bigquery?project=${projectId}&p=${projectId}&d=${datasetId}&t=${tableId}&page=table`;
  window.open(url, '_blank');
}

function navigateToBucket(projectId, name) {
  const url = `https://console.cloud.google.com/storage/browser/${name}?project=${projectId}`;
  window.open(url, '_blank');
}

function navigateToTopic(projectId, topicId) {
  const url = `https://console.cloud.google.com/cloudpubsub/topic/detail/${topicId}?project=${projectId}`;
  window.open(url, '_blank');
}

export default {
  navigateToMarketplace,
  navigateToDataset,
  navigateToTable,
  navigateToBucket,
  navigateToTopic
};
