import {
  Box,
  Button,
  ButtonGroup,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';
import { optionStore, parsedFileStore } from '../../store';
import { Section, SectionType } from '../../entities/options';

import { usePDF } from 'react-to-pdf';
import { bottom } from '@popperjs/core';
import { Visual } from './visual';

// import * as Docx from 'docx';
// import * as ok from 'react-docx';

// const HTMLtoDOCX = require('../dist/html-to-docx.umd');

// const HTMLtoDOCX = require('../../../node_modules/html-to-docx/dist/html-to-docx.umd');

const Constructor = observer(() => {
  const [dialog, setDialog] = useState(false);
  const [sectionType, setSectionType] = useState('0');
  const [draw, setDraw] = useState(true);

  const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });

  useEffect(() => {
    parsedFileStore.fetchParsedFiles();
  }, []);

  const toggleDialog = () => setDialog((dialog) => !dialog);

  const accept = () => {
    toggleDialog();
    optionStore.addSection(sectionType, Math.random());
  };

  const toDOCX = async () => {
    // render(<Doc />, `${__dirname}/example.docx`);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      component="section"
      //   sx={{ p: 2 }}
    >
      <h2>Разделы</h2>
      <Box component="section" sx={{ p: 2 }}>
        <Stack spacing={2}>
          {optionStore.sections.map((section, i) => (
            <Box
              key={section.id}
              component="article"
              sx={{ p: 2, width: 1000 }}
            >
              <hr
                style={{ height: 1, backgroundColor: 'gray', marginBottom: 16 }}
              />
              {section.type === SectionType.TEXT ? (
                <div>
                  <h3 style={{ marginBottom: 10 }}>Текст</h3>
                  <TextField
                    onChange={(e) => optionStore.changeText(e.target.value, i)}
                    value={section.content}
                    label="Текст"
                    variant="filled"
                    multiline
                    sx={{
                      width: '100%',
                    }}
                  />
                </div>
              ) : section.type === SectionType.TABLE ? (
                <div>
                  <h3 style={{ marginBottom: 16 }}>Таблица</h3>
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
                        renderValue={(selected) => (
                          <Box
                            sx={{
                              display: 'flex',
                              flexWrap: 'wrap',
                              gap: 0.5,
                            }}
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
                <div>
                  <h3 style={{ marginBottom: 16 }}>Гистограма</h3>
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
                    <>
                      <FormControl>
                        <InputLabel>Выбор колонки названий</InputLabel>
                        <Select
                          style={{
                            width: 300,
                          }}
                          label="Выбор колонки названий"
                          onChange={(e) =>
                            optionStore.changeNameCol(e.target.value, i)
                          }
                          value={section.content.nameCol}
                        >
                          {parsedFileStore.parsedFiles[
                            section.content.choisenTable
                          ].columns.map((column, i) => (
                            <MenuItem key={i} value={i}>
                              {column.columnName}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl>
                        <InputLabel>Выбор колонки Значений</InputLabel>
                        <Select
                          style={{
                            width: 300,
                          }}
                          label="Выбор колонки Значений"
                          onChange={(e) =>
                            optionStore.changeValueCol(e.target.value, i)
                          }
                          value={section.content.valueCol}
                        >
                          {parsedFileStore.parsedFiles[
                            section.content.choisenTable
                          ].columns.map((column, i) => (
                            <MenuItem key={i} value={i}>
                              {column.columnName}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </>
                  )}
                </div>
              ) : (
                ''
              )}
              <Button
                onClick={() => optionStore.removeSection(i)}
                variant="contained"
                color="error"
                style={{
                  marginTop: 20,
                }}
              >
                Удалить
              </Button>
              <hr
                style={{
                  marginTop: 10,
                }}
              />
            </Box>
          ))}
        </Stack>
      </Box>
      <Button
        style={{
          marginTop: 20,
        }}
        onClick={toggleDialog}
        variant="contained"
      >
        Добавить
      </Button>
      {draw && (
        <>
          <ButtonGroup
            style={{
              marginTop: 20,
            }}
            variant="contained"
          >
            <Button onClick={() => toPDF()} variant="contained">
              Download PDF
            </Button>
            <Button onClick={() => toDOCX()} variant="contained">
              Download DOCX
            </Button>
          </ButtonGroup>
        </>
      )}
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
              <FormControlLabel
                value={SectionType.FREQUENCY_HISTOGRAM}
                control={<Radio />}
                label="Гистрограма частоты"
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
      <div ref={targetRef}>
        <Visual />
      </div>
    </Box>
  );
});

export { Constructor };
