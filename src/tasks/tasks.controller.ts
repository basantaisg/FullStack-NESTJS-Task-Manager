import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { GetTaskFilterDto } from 'src/dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from 'src/dto/update-task-status.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
    // if any condition is given while hitting get req such as q=OPEN | Progress | DONE then it should run getTasksByFilter() method while if not then getAllTasks() method.

    if (Object.keys(filterDto).length) {
      // return this.. .
      return this.taskService.getTasksWithFilter(filterDto);
    } else {
      return this.taskService.getAllTasks();
    }
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): Task {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }

  @Patch(':id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Task {
    const { status } = updateTaskStatusDto;
    return this.taskService.updateTaskStatus(id, status);
  }

  @Delete(':id/status')
  deleteTask(@Param('id') id: string): void {
    return this.taskService.deleteTask(id);
  }
}
