import { TaskStatus } from 'src/tasks/tasks.model';

export class GetTaskFilterDto {
  status?: TaskStatus;
  search?: string;
}
