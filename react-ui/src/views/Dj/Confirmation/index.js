import React from 'react';
import Card from '../../Card';
import {Button} from 'antd';
import styles from './index.module.scss';

const Confirmation=({data}) => {
  return (
    <Card>
      <p className={styles.p}>{data.text}</p>
      <div className={styles.buttonContainer}>
        <Button type="secondary">Si</Button>
        <Button type="secondary">No</Button>
      </div>
    </Card>
  );
};

export default Confirmation;
