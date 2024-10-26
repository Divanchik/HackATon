import { ParsedFiles } from '../entities';
import { TaskPriority, TaskResolution, Tasks, TaskStatus } from '../types';

class FakeApi {
  delay = 1000;

  tasks: Tasks = [
    {
      id: 1,
      name: 'Hello',
      deadline: '3213213',
      description: 'dsdasdsadsadasdsad',
    },
    {
      id: 2,
      name: 'of course',
      status: TaskStatus.COMPLETED,
      priority: TaskPriority.HIGH,
    },
    {
      id: 3,
      area: 'Самарра',
      sprintName: 'Спринт',
    },
    {
      id: 4,
      resolution: TaskResolution.DUBLICATE,
      responsible: 'Владислав',
    },
  ];

  parsedFiles: ParsedFiles = [
    {
      fileName: 'Мега файл',
      columns: [
        {
          columnName: 'ID',
          values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        },
        {
          columnName: 'Имя',
          values: [
            'Влад',
            'Максим',
            'Валера',
            'Илья',
            'Дмитрий',
            'Файл',
            'Ладно',
            'Зачем',
          ],
        },
        {
          columnName: 'Фамилия',
          values: [
            'Влад',
            'Максим',
            'Валера',
            'Илья',
            'Дмитрий',
            'Файл',
            'Ладно',
            'Зачем',
          ],
        },
        {
          columnName: 'Часы в доте',
          values: [32, 4234, 12324, 43, 0, 99, 100],
        },
      ],
    },
  ];

  getAllTasks(): Promise<Tasks> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.tasks);
      }, this.delay);
    });
  }

  getParsedFiles(): Promise<ParsedFiles> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.parsedFiles);
      }, this.delay);
    });
  }
}

const fakeApi = new FakeApi();

export { fakeApi };
