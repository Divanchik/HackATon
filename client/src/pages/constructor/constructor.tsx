import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  ListItem,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';
import { optionStore, parsedFileStore } from '../../store';
import { SectionType } from '../../entities/options';

import { usePDF } from 'react-to-pdf';

const Constructor: FC = observer(() => {
  const [dialog, setDialog] = useState(false);
  const [sectionType, setSectionType] = useState('0');
  const [draw, setDraw] = useState(false);

  const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });

  useEffect(() => {
    parsedFileStore.fetchParsedFiles();
  }, []);

  const toggleDialog = () => setDialog((dialog) => !dialog);

  const accept = () => {
    toggleDialog();
    optionStore.addSection(sectionType, Math.random());
  };

  const getDraw = () => {
    setDraw(true);
  };

  return (
    <Box component="section" sx={{ p: 2 }}>
      <h2>Разделы</h2>
      <Box component="section" sx={{ p: 2 }}>
        <Stack spacing={2}>
          {optionStore.sections.map((section, i) => (
            <Box key={section.id} component="article" sx={{ p: 2 }}>
              {section.type === SectionType.TEXT ? (
                <div>
                  <TextField
                    onChange={(e) => optionStore.changeText(e.target.value, i)}
                    value={section.content}
                    label="Текст"
                    variant="standard"
                  />
                </div>
              ) : section.type === SectionType.TABLE ? (
                <div>
                  <FormControl>
                    <InputLabel>Выбор таблицы</InputLabel>
                    <Select
                      value={section.content.choisenTable}
                      label="Выбор таблицы"
                      style={{
                        width: 300,
                      }}
                      onChange={(e) =>
                        optionStore.changeChoisenTable(e.target.value, i)
                      }
                    >
                      {parsedFileStore.parsedFiles.map((file, i) => (
                        <MenuItem key={i} value={i}>
                          {file.fileName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {typeof section?.content?.choisenTable === 'number' && (
                    <FormControl>
                      <InputLabel>Выбор колонок</InputLabel>
                      <Select
                        multiple
                        input={<OutlinedInput label="Выбор колонок" />}
                        style={{
                          width: 300,
                        }}
                        onChange={(e) => optionStore.addCol(e.target.value, i)}
                        value={optionStore.sections[i].content.choisenCols}
                        renderValue={(selected: any) => (
                          <Box
                            sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                          >
                            {selected.map((value: any) => (
                              <Chip
                                key={value}
                                label={
                                  parsedFileStore.parsedFiles[
                                    optionStore.sections[i].content.choisenTable
                                  ].columns[value].columnName
                                }
                              />
                            ))}
                          </Box>
                        )}
                      >
                        {parsedFileStore.parsedFiles[
                          Number(section.content.choisenTable)
                        ].columns.map((column, i) => (
                          <MenuItem key={i} value={i}>
                            {column.columnName}
                          </MenuItem>
                        ))}
                        {/* {parsedFileStore.parsedFiles.map((file, i) => (
                          <MenuItem value={i}>{file.fileName}</MenuItem>
                        ))} */}
                      </Select>
                    </FormControl>
                  )}
                </div>
              ) : section.type === SectionType.HISTOGRAM ? (
                <div>Гистограмма</div>
              ) : (
                ''
              )}
            </Box>
          ))}
        </Stack>
      </Box>
      <Button onClick={toggleDialog} variant="contained">
        Добавить
      </Button>
      <Button onClick={getDraw} variant="outlined">
        Отрисовать
      </Button>
      <Dialog open={dialog}>
        <DialogTitle>Добавить раздел</DialogTitle>
        <DialogContent>
          <FormControl>
            <FormLabel>Выберите тип раздела</FormLabel>
            <RadioGroup
              onChange={(e) => setSectionType(e.target.value)}
              value={sectionType}
            >
              <FormControlLabel
                value={SectionType.TEXT}
                control={<Radio />}
                label="Текст"
              />
              <FormControlLabel
                value={SectionType.TABLE}
                control={<Radio />}
                label="Таблица"
              />
              <FormControlLabel
                value={SectionType.HISTOGRAM}
                control={<Radio />}
                label="Гистрограма"
              />
            </RadioGroup>
          </FormControl>
          <DialogActions>
            <Button onClick={toggleDialog} variant="outlined">
              Отменить
            </Button>
            <Button onClick={accept} variant="contained">
              Добавить
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      {draw && (
        <Box ref={targetRef} component="section" sx={{ p: 2 }}>
          Документ говна
          {optionStore.sections.map((section) => (
            <Box component="section" sx={{ p: 2 }}>
              {section.type === SectionType.TEXT ? (
                <div>
                  <p>{section.content}</p>
                </div>
              ) : section.type === SectionType.TABLE ? (
                <div>
                  Таблица
                  {/* <p>{parsedFileStore.parsedFiles[section.content.choisenTable]}</p> */}
                </div>
              ) : section.type === SectionType.HISTOGRAM ? (
                <div>гистограма</div>
              ) : (
                ''
              )}
            </Box>
          ))}
        </Box>
      )}
      {draw && <button onClick={() => toPDF()}>Download PDF</button>}
    </Box>
  );
});

export { Constructor };
