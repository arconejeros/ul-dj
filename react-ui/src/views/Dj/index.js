import React, {useEffect} from 'react';
import styles from './index.module.scss';
import Question from './Question';
import {withDj} from '../../contexts/djContext';
import Photo from './Photo';
import Region from './Region';
import BasicData from './BasicData';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginPdfPreview from 'filepond-plugin-pdf-preview';
import {registerPlugin} from 'react-filepond';
import 'filepond-plugin-get-file/dist/filepond-plugin-get-file.min.css';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import Rut from './Rut';
import Declaracion from './Declaracion';
import Confirmation from './Confirmation';
import Sign from './Sign';
import NegativeFeedback from './NegativeFeedback';
import Send from './Send';
import {useParams, Link} from 'react-router-dom';

const Dj=({dj}) => {
  registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginPdfPreview,
  );

  const {id}=useParams();
  console.log("este es el id", id)

  const switchComponent=(data, index) => {
    if (index === 0) {
      return <Question data={{...data, index}}/>;
    }
    if (dj.questions[index - 1].answer || (dj.questions[index - 1].front && dj.questions[index - 1].rear)) {
      switch (data.type) {
        case "question":
          return <Question data={{...data, index}}/>;
        case "photo":
          return <Photo data={{...data, index}}/>;
        case "region":
          return <Region data={{...data, index}}/>;
        case "basic-data":
          return <BasicData data={{...data, index}}/>;
        case "rut":
          return <Rut data={{...data, index}}/>;
        case "dj":
          return <Declaracion data={{...data, index}}/>;
        case "confirmation":
          return <Confirmation data={{...data, index}}/>;
        case "sign":
          return <Sign data={{...data, index}}/>;
        case "send":
          return <Send data={{...data, index}}/>;
        default:
          return <div/>

      }
    } else if (dj.questions[index - 1].answer === false) {
      return <NegativeFeedback>{dj.questions[index - 1].negativeFeedback}</NegativeFeedback>
    }
  }
  return (
    <div className={`${styles.container}`}>
      <div className={styles.questionsContainer}>
        <h3 className={styles.title}>Up-level Capacitación</h3>
        {dj.questions.map((q, index) => switchComponent(q, index))}
      </div>
    </div>
  );
};

export default withDj(Dj);
