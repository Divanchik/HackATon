type ID = number;
type TaskNumber = string;
type TaskDate = string;
type TaskProperty = string;

enum TaskType {
  SUBTASK = 'Подзадача',
  TASK = 'Задача',
  HISTORY = 'История',
  DEFECT = 'Дефект',
}

enum TaskStatus {
  COMPLETED = 'Выполнено',
  CLOSED = 'Закрыто',
  IN_PROGRESS = 'В работе',
  CONFIRMATION = 'Подтверждение',
  CREATED = 'Создано',
}

enum TaskPriority {
  LOW = 'Низкий',
  MEDIUM = 'Средний',
  HIGH = 'Высокий',
  CRITICAL = 'Критический',
}

enum TaskGroup {
  NEW_FUNCTIONALITY = 'Новая функциональность',
  TECHNICAL_DEBT = 'Технический долг',
}

enum TaskResolution {
  REJECTED = 'Отклонено',
  CANCELED_BY_INITIATOR = 'Отменен инициатором',
  READY = 'Готово',
  DUBLICATE = 'Дубликат',
}

interface Task {
  id?: ID;
  area?: string;
  type?: TaskType;
  status?: TaskStatus;
  priority?: TaskPriority;
  number?: TaskNumber;
  name?: string;
  createDate?: TaskDate;
  createPerson?: string;
  updateDate?: TaskDate;
  updatePerson?: string;
  description?: string;
  parentID?: ID;
  responsible?: string;
  owner?: string;
  deadline?: TaskDate;
  timeEstimation?: number;
  sprintName?: string;
  estimation?: number;
  wastedTime?: number;
  group?: TaskGroup;
  resolution?: TaskResolution;
}

type Tasks = Array<Task>;

interface TaskHistory {
  entityId: ID;
  createDate: TaskDate;
  propertyName: TaskProperty;
  oldValue: unknown;
  newValue: unknown;
}

export type {
  ID,
  TaskNumber,
  TaskDate,
  TaskProperty,
  Task,
  Tasks,
  TaskHistory,
};

export { TaskType, TaskStatus, TaskPriority, TaskGroup, TaskResolution };
