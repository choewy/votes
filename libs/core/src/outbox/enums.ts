export enum OutboxEventType {
  TOPIC_PARTICIPATED = 'TOPIC_PARTICIPATED',
}

export enum OutboxStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  PUBLISHED = 'PUBLISHED',
  FAILED = 'FAILED',
}
