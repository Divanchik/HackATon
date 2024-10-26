import { makeAutoObservable } from 'mobx';
import { ParsedFiles } from '../entities';
import { fakeApi } from '../api';

class ParsedFileStore {
  parsedFiles: ParsedFiles = [];
  isLoading = false;
  isError = false;

  constructor() {
    makeAutoObservable(this);
  }

  fetchParsedFiles = async () => {
    try {
      this.isLoading = true;
      const data = await fakeApi.getParsedFiles();
      this.parsedFiles = data;
      console.log(data);
    } catch (error) {
      this.isError = true;
    } finally {
      this.isLoading = false;
    }
  };
}

const parsedFileStore = new ParsedFileStore();

export { parsedFileStore };
