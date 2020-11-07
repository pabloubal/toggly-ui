export default class OperationStatusEntity {
  constructor(targetUrl, featureName, operationType, status, description) {
    this.targetUrl = targetUrl;
    this.featureName = featureName;
    this.operationType = operationType;
    this.status = status;
    this.description = description
  }

  static Of(opStatus) {
    return opStatus
      ? new OperationStatusEntity(opStatus['targetUrl'], opStatus['featureName'], opStatus['operationType'], opStatus['status'], opStatus['description'])
      : undefined;
  }

  isSuccessful() {
    return this.status;
  }
}