import React from 'react';
import styles from './index.module.scss';
import Card from '../../Card';
import {withDj} from '../../../contexts/djContext';

const Question=({dj, data}) => {
  const setResponse = response => {
    const newQuestions =JSON.parse(JSON.stringify(dj.questions));
    newQuestions[data.index].answer = response;
    dj.setQuestions(newQuestions)
  }
  return (
    <Card>
      <h3 className={styles.title}>
        {data.question}
      </h3>

      <div className={styles.row}>
        <button onClick={() => setResponse(true)} className={`${styles.button}`}>Si</button>
        <button onClick={() => setResponse(false)} className={`${styles.button}`}>No</button>
      </div>
    </Card>
  );
};

export default withDj(Question);
