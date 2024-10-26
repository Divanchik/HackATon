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
              }}
              onChange={add}
              type="file"
            />
          </div>
          <h1>Выбранные файлы</h1>
          <hr />
          <div>
            {selectedFiles.map((file, i) => (
              <div key={Math.random()}>
                <span>{file.name}</span>
                <button
                  onClick={() => {
                    deleteFile(i);
                  }}
                  type="button"
                >
                  Удалить
                </button>
              </div>
            ))}
          </div>
          <hr />
          <button>Отправить</button>
        </form>
      </div>
    </main>
  );
};

export { Import };
