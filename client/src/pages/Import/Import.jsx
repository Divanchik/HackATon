import { Button, MenuItem, Stack } from '@mui/material';
import axios from 'axios';
import { FC, useState } from 'react';

const Import = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const add = (event) => {
    console.log(event.target.files);
    setSelectedFiles((files) => [...files, event.target.files[0]]);
  };

  const submit = (event) => {
    event.preventDefault();

    const formData = new FormData();

    selectedFiles.forEach((file) => {
      formData.append(file.name, file);
    });

    axios.get('http://81.177.165.152:7233/api/test');

    // axios.post('https://81.177.165.152:7233/api/test', formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // });
  };

  const deleteFile = (i) => {
    const files = [...selectedFiles];
    console.log(files);
    files.splice(i, 1);
    console.log(files);
    setSelectedFiles(files);
  };

  return (
    <main>
      <div>
        <form onSubmit={submit}>
          <div
            style={{
              height: 300,
              width: 300,
              position: 'relative',
            }}
          >
            <input
              style={{
                width: '100%',
                height: '100%',
                cursor: 'pointer',
              }}
              accept=".csv"
              onChange={add}
              type="file"
            />
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'grey',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: 20,
                textAlign: 'center',
                pointerEvents: 'none',
              }}
            >
              Нажмите сюда или перенесите файлы
            </div>
          </div>
          <h1>Выбранные файлы</h1>
          <hr />
          <div>
            <Stack
              sx={{
                width: 500,
              }}
            >
              {selectedFiles.map((file, i) => (
                <MenuItem
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                  key={Math.random()}
                >
                  <span
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {file.name}
                  </span>
                  <Button
                    style={{
                      marginLeft: 20,
                    }}
                    onClick={() => {
                      deleteFile(i);
                    }}
                    type="button"
                    variant="outlined"
                    color="error"
                  >
                    Удалить
                  </Button>
                </MenuItem>
              ))}
            </Stack>
          </div>
          <hr />
          <Button variant="contained">Отправить</Button>
        </form>
      </div>
    </main>
  );
};

export { Import };
