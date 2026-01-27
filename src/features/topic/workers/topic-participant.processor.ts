import { Processor, WorkerHost } from '@nestjs/bullmq';

import { HistoryService } from '@features/history/services';
import { Job } from 'bullmq';
import { DataSource } from 'typeorm';

import { OptionService, TopicService } from '../services';

@Processor('topic.participant')
export class TopicParticipantProcessor extends WorkerHost {
  constructor(
    private readonly dataSource: DataSource,
    private readonly historyService: HistoryService,
    private readonly topicService: TopicService,
    private readonly optionService: OptionService,
  ) {
    super();
  }

  async process(job: Job<{ historyId: string }>): Promise<void> {
    await this.dataSource.transaction(async (em) => {
      const history = await this.historyService.setIsCounted(job.data.historyId, em);

      if (history) {
        await this.optionService.increment(history.optionId, em);
        await this.topicService.increment(history.topicId, em);
      }
    });
  }
}
