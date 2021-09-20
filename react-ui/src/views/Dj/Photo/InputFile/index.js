import React, { useEffect, useState } from 'react';

import { FilePond } from 'react-filepond';
// import { format } from 'rut.js';

import styles from './index.module.scss';
import {withDj} from '../../../../contexts/djContext';

const InputFile = ({ text, doc, dj, index, name }) => {
  const selected = {};
  const [files, setFiles] = useState([]);
  useEffect(() => {
    // if (doc.url) {
    //   setFiles([{ source: doc.url }]);
    // }
  }, [doc, selected]);
  const uploadProcess = (
    fieldName,
    file,
    metadata,
    load,
    error,
    progress,
    abort,
  ) => {
    const formData = new FormData();
    const request = new XMLHttpRequest();
    // const folder = `${selected.path}/${format(selected.rut)}`;
    formData.append('imgCollection', file, file.name);
    // formData.append('folder', folder);
    formData.append('personal', selected._id);
    formData.append('type', doc.name);

    request.open('POST', '/api/documents');
    request.setRequestHeader('auth-token', localStorage.getItem('loggedUser'));

    request.upload.onprogress = (e) => {
      progress(e.lengthComputable, e.loaded, e.total);
    };

    request.onload = () => {
      if (request.status >= 200 && request.status < 300) {
        // load(request.responseText);
        // const requestResponse = JSON.parse(request.responseText);
        // personal.getPersonalsAdmitido(user.user.zones);
        // const locales = user.user.zones;
        // local.getLocalesThree(locales);
        // const payload = {
        //   ...local.selectedSection,
        //   data: {
        //     ...local.selectedSection.data,
        //     documents: local.selectedSection.data.documents.map((d) => ({
        //       ...d,
        //       url:
        //         d.name === requestResponse.data.type
        //           ? requestResponse.data.url
        //           : d.url,
        //     })),
        //   },
        // };
        // local.setSelectedSection(payload);
      } else {
        error('oh no');
      }
    };
    request.send(formData);

    return {
      abort: () => {
        request.abort();
        abort();
      },
    };
  };

  const onFileChange = (newFiles) => {
    const items = newFiles.file;
    const ewq = [items];
    setFiles(ewq);
    const newQuestions =JSON.parse(JSON.stringify(dj.questions));
    newQuestions[index][name] = ewq;
    dj.setQuestions(newQuestions)
  };

  const onRemoveFiles = (err, file) => {
    const newQuestions =JSON.parse(JSON.stringify(dj.questions));
    newQuestions[index][name] = false;
    dj.setQuestions(newQuestions)
    if(file.source.split) {
      // const sourceArray = file.source.split('/');
      // const path = `${sourceArray[4]}/${sourceArray[5]}/${sourceArray[6]}/${sourceArray[7]}/${sourceArray[8]}`;
      // fetch('/api/removeFile', {
      //   method: 'POST',
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json',
      //     'auth-token': localStorage.getItem('loggedUser'),
      //   },
      //   body: JSON.stringify({
      //     filePath: path,
      //     _id: doc._id,
      //   }),
      // })
      //   .then((resp) => {
      //     console.log('Archivo eliminado', resp);
      //   })
      //   .catch((err) => {
      //     console.log('failed', err);
      //   });
    }
  };

  return (
    <div style={{width: "100%"}}>
    <FilePond
      labelIdle={text}
      acceptedFileTypes={['application/pdf']}
      allowFileTypeValidation={true}
      labelFileTypeNotAllowed={'Archivo no permitido'}
      files={files}
      onremovefile={onRemoveFiles}
      server={{
        process: (
          fieldName,
          file,
          metadata,
          load,
          error,
          progress,
          abort,
          transfer,
          options,
        ) =>
          uploadProcess(
            fieldName,
            file,
            metadata,
            load,
            error,
            progress,
            abort,
            transfer,
            options,
            doc,
          ),
      }}
      allowMultiple={false}
      instantUpload={false}
      onaddfile={(err, fileItems) => onFileChange(fileItems)}
    />
    </div>
  );
};

export default withDj(InputFile);
