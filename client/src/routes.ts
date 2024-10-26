import { Constructor, Import, Root } from './pages';
import { SourceDataEdit } from './pages/source-data-edit';
import { CONSTRUCTOR, ROOT_PATH, SOURCE_EDIT, UPLOAD_DATA } from './pathes';

const routes = [
  {
    path: ROOT_PATH,
    Component: Root,
  },
  {
    path: UPLOAD_DATA,
    Component: Import,
  },
  {
    path: SOURCE_EDIT,
    Component: SourceDataEdit,
  },
  {
    path: CONSTRUCTOR,
    Component: Constructor,
  },
];

export { routes };
