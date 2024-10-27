import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { v4 } from 'uuid';

// TODO Вырезать mock data

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  Button,
  Modal,
  Switch,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ParsedFiles } from '../../entities';
import axios from 'axios';
import { parsedFileStore } from '../../store';

export const SourceDataEdit = observer(() => {
  const [cosntructorModal, setConstructorModal] = useState(false);
  const [filters, setFielters] = useState([]);
  const [currentColumnName, setCurrentColumnName] = useState(null);
  const [currentFileName, setCurrentFileName] = useState(null);
  const [currentCondition, setCurrentCondition] = useState(null);
  const [currentConditionValue, setCurrentConditionValue] = useState();

  const [fiels, setFiles] = useState<ParsedFiles>([]);

  useEffect(() => {
    // axios.get("https://localhost:7233/api/import").then((data) => {
    //     setFiles(data.data);
    // });
    const tables = parsedFileStore.parsedFiles.map((file) => file.fileName);
    //setFiles(parsedFileStore.parsedFiles);

    axios
      .post('https://localhost:7233/api/Data/getTablesData', tables)
      .then((data) => {
        setFiles(data.data);
      });
  }, []);

  const searchOption = useMemo(() => {
    const result: Array<string> = [];

    fiels.forEach((file) => {
      file.columns.forEach((column) => {
        result.push(`${file.fileName} ${column.columnName}`);
      });
    });
    console.log(result);
    return result.map((name) => ({ id: v4(), label: name }));
  }, []);

  return (
    <div>
      <Button
        onClick={() => {
          console.log(filters);
          console.log(filters[0]);
          axios
            .post(
              'https://localhost:7233/api/Filter/getColumnByFilter',
              filters[0]
            )
            .then((res) => {
              console.log(res);

              const data = res.data;

              data.length = 10;
              data.fileName = data.fileName + ' (обработано)';

              parsedFileStore.addFile(data);
            });
        }}
      >
        Готово
      </Button>
      <Box component="section" sx={{ p: 2, bgcolor: 'gray' }}>
        {fiels.map((file) => (
          <Accordion slotProps={{ heading: { component: 'h4' } }}>
            <AccordionSummary
              expandIcon={<ExpandLessIcon />}
              aria-controls="panel1-content"
            >
              {file.fileName}
            </AccordionSummary>

            <AccordionDetails>
              <TableContainer>
                {file.columns.map((column) => (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      marginBottom: 10,
                      padding: 10,
                      borderBottom: '1px solid #ccc',
                    }}
                  >
                    <TableHead>
                      <TableRow />
                      <TableRow>{column.columnName}</TableRow>
                      <TableRow />
                    </TableHead>
                    <TableBody>
                      <TableRow />
                      <TableRow>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <Button
                            onClick={() => {
                              setConstructorModal(true);
                              // @ts-ignore
                              console.log(column.columnName);
                              setCurrentColumnName(column.columnName);
                              // @ts-ignore
                              setCurrentFileName(file.fileName);
                            }}
                            variant="contained"
                          >
                            {true
                              ? 'Редактировать/Удалить связь'
                              : 'Добавить связь'}
                          </Button>
                          <CheckCircleOutlineIcon color="primary" />
                          <CancelIcon color="warning" />
                        </div>
                      </TableRow>
                      <TableRow />
                    </TableBody>
                  </div>
                ))}
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
      <Modal
        open={cosntructorModal}
        onClose={() => {
          setConstructorModal(false);
        }}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box component="section" sx={{ p: 2, bgcolor: 'gray' }}>
          <div>
            {/*Тут информация о том, какие поля уже выбраны и какие операторы с ними используются. Также тут находится кнопка стереть все связи и поиск по типу связей, с якорями чтобы перейти к связе*/}
            При добавлении хотябы одного связанного поля, появляется информация
            о связе
            <Box>
              Фильтры
              {currentColumnName && (
                <>
                  <Autocomplete
                    onChange={(e) => {
                      // @ts-ignore
                      setCurrentCondition(e.target.value);
                    }}
                    disablePortal
                    options={[
                      { id: 0, label: 'EQUAL' },
                      { id: 1, label: 'NOT_EQUAL' },
                    ]}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Movie" />
                    )}
                  />
                  <TextField
                    onChange={(value) => {
                      // @ts-ignore
                      setCurrentConditionValue(value.target.value);
                    }}
                  />
                  <Button
                    onClick={() => {
                      // @ts-ignore
                      setFielters([
                        ...filters,
                        {
                          linkedFileName: currentFileName,
                          linkedColumnName: currentColumnName,
                          conditionCustomValue: currentConditionValue,
                          condition: currentCondition,
                        },
                      ]);
                    }}
                  >
                    Добавить фильтр
                  </Button>
                </>
              )}
            </Box>
          </div>
        </Box>
      </Modal>
    </div>
  );
});
