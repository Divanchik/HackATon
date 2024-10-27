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
          content: {
            choisenTable: '',
            nameCol: null,
            valueCol: null,
            hasOther: true,
          },
          id,
        });
        break;

      default:
        break;
    }
  }

  removeSection(index: number) {
    this.sections.splice(index, 1);
  }

  changeText(text: string, index: number) {
    const section = this.sections[index];

    if (section.type === SectionType.TEXT) {
      section.content = text;
    }
  }

  changeChoisenTable(tableIndex: number, sectionIndex: number) {
    const section = this.sections[sectionIndex];
    if (
      section.type === SectionType.TABLE ||
      section.type === SectionType.HISTOGRAM
    ) {
      section.content.choisenTable = tableIndex;
      section.content.choisenCols = [];
    }
  }

  changeNameCol(colIndex: unknown, sectionIndex: number) {
    const section = this.sections[sectionIndex];
    if (section.type === SectionType.HISTOGRAM) {
      section.content.nameCol = colIndex;
    }
  }

  changeValueCol(colIndex: unknown, sectionIndex: number) {
    const section = this.sections[sectionIndex];
    if (section.type === SectionType.HISTOGRAM) {
      section.content.valueCol = colIndex;
    }
  }

  addCol(colIndex: unknown, sectionIndex: number) {
    const section = this.sections[sectionIndex];
    if (section.type === SectionType.TABLE) {
      if (Array.isArray(colIndex)) {
        section.content.choisenCols = colIndex.sort((a, b) => a - b);
      } else {
        section.content.choisenCols = [colIndex];
      }
    }
  }

  changeOther(sectionIndex: number) {
    const section = this.sections[sectionIndex];
    if (section.type === SectionType.HISTOGRAM) {
      section.content.choisenCols = !section.content.choisenCols;
    }
  }
}

const optionStore = new OptionStore();

export { optionStore };
