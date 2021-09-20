import React from 'react';
import styles from './index.module.scss';
import {Input} from 'antd';
import Card from '../../Card';

const Rut=({data}) => {
  return (
    <Card>
      <h3 className={styles.label}>Ingrese su rut</h3>
      <Input style={{width: "100%"}}/>
    </Card>
  );
};

export default Rut;
