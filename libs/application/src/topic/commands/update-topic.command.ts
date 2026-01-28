export type UpdateTopicCommand = {
  userId: string;
  topicId: string;
  title: string;
  content: string;
  options: string[];
};
