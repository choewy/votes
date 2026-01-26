import { Processor, WorkerHost } from '@nestjs/bullmq';

import { Job } from 'bullmq';
import { DataSource } from 'typeorm';

@Processor('topic')
export class ParticipantTopicProcessor extends WorkerHost {
  constructor(private readonly dataSource: DataSource) {
    super();
  }

  async process(job: Job<{ historyId: string }>): Promise<void> {
    if (job.name !== 'participant') {
      return;
    }

    await this.dataSource.transaction(async () => {
      // TODO
    });
  }
}
