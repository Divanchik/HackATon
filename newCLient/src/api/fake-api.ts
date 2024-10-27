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
      length: 11,
      columns: [
        {
          columnName: 'ID',
          columnValues: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        },
        {
          columnName: 'Имя',
          columnValues: [
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
          columnValues: [
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
          columnValues: [32, 4234, 12324, 43, 0, 99, 100],
        },
      ],
    },
    {
      fileName: 'Ещё один файл',
      length: 17,
      columns: [
        {
          columnName: 'ID',
          columnValues: [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
          ],
        },
        {
          columnName: 'Имя',
          columnValues: [
            'Самосвал',
            'Вагон',
            'Паровоз',
            'электричка',
            'Автомобиль',
            'Ракета',
            'Катер',
            'Лодка',
            'Пароход',
            'Метро',
            'Дирижабль',
          ],
        },
        {
          columnName: 'Максимальная скороть',
          columnValues: [32, 4234, 12324, 43, 0, 99, 100, 1321, 304, 110, 230],
        },
        {
          columnName: 'Количество колёс',
          columnValues: [
            32, 22, 45, 33, 867, 234, 125, 645, 234, 35, 236, 66, 44, 23, 645,
            1234,
          ],
        },
        {
          columnName: 'Материал',
          columnValues: [
            'Металл',
            'Адамантий',
            'Дерево',
            'Тарелки',
            'Мусор',
            'Костыли',
            'Бумага',
            'карбон',
            'Уран',
            'Сапфир',
          ],
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
