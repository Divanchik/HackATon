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

  addFiels(fiels: any) {
    console.log(fiels);

    fiels.forEach((fiel: any) => {
      fiel.length = fiel.columns[0].columnValues.length;
    });
    // console.log(fiels.columns);
    // console.log(fiels.columns[0].columnValues);
    // fiels.length = fiels.columns[0].columnValues.length;
    // console.log(fiels);
    this.parsedFiles = fiels;
    //this.parsedFiles.push(fiels);
  }

  addFile(file: any) {
    this.parsedFiles.push(file);
  }
}

const parsedFileStore = new ParsedFileStore();

export { parsedFileStore };
