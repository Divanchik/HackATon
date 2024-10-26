import { makeAutoObservable } from 'mobx';
import { fakeApi } from '../api';
import { Tasks } from '../types';

class TaskStore {
  tasks: Tasks = [];
  isLoading = false;
  isError = false;

  constructor() {
    makeAutoObservable(this);
  }

  fetchTasks = async (): Promise<void> => {
    try {
      this.isLoading = true;
      const data = await fakeApi.getAllTasks();
      this.tasks = data;
    } catch (error) {
      this.isError = true;
    } finally {
      this.isLoading = false;
    }
  };
}

const taskStore = new TaskStore();

export { taskStore };
