import { makeAutoObservable } from 'mobx';
import { Section, SectionType } from '../entities/options';

class OptionStore {
  sections: Array<Section> = [];

  constructor() {
    makeAutoObservable(this);
  }

  addSection(type: unknown, id: number) {
    const value = Number(type);
    switch (value) {
      case SectionType.TEXT:
        this.sections.push({
          type: SectionType.TEXT,
          content: '',
          id,
        });
        break;
      case SectionType.TABLE:
        this.sections.push({
          type: SectionType.TABLE,
          content: {
            choisenTable: '',
            choisenCols: [],
          },
          id,
        });
        break;
      case SectionType.HISTOGRAM:
        this.sections.push({
          type: SectionType.HISTOGRAM,
          content: {},
          id,
        });
        break;

      default:
        break;
    }
  }

  changeText(text: string, index: number) {
    const section = this.sections[index];

    if (section.type === SectionType.TEXT) {
      section.content = text;
    }
  }

  changeChoisenTable(tableIndex: number, sectionIndex: number) {
    const section = this.sections[sectionIndex];
    console.log(sectionIndex);
    if (section.type === SectionType.TABLE) {
      section.content.choisenTable = tableIndex;
      section.content.choisenCols = [];
    }
  }

  addCol(colIndex: unknown, sectionIndex: number) {
    const section = this.sections[sectionIndex];
    if (section.type === SectionType.TABLE) {
      if (Array.isArray(colIndex)) {
        section.content.choisenCols = colIndex;
      } else {
        section.content.choisenCols = [colIndex];
      }
      //   section.content.choisenCols.push(colIndex);
    }
  }
}

const optionStore = new OptionStore();

export { optionStore };
