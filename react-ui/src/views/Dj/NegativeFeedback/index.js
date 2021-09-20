import React from 'react';
import Card from '../../Card';
import styles from './index.module.scss';
import alert from '../../../assets/alert.png';

const NegativeFeedback=({children}) => {
  return (
    <Card className={styles.negativeFeedback}>
      <img className={styles.alertIcon} src={alert} alt=""/>
      <div dangerouslySetInnerHTML={{__html: children}}/>
    </Card>
  );
};

export default NegativeFeedback;
