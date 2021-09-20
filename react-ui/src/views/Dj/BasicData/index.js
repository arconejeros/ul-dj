import React, {useState} from 'react';
import styles from './index.module.scss';
import {Input, Select} from 'antd';
import {regiones} from '../../../utils/regiones';
import Card from '../../Card';

const {Option}=Select;

const BasicData=({data}) => {
  return (
    <Card>
      <h3 className={styles.title} style={{marginBottom: "16px"}}>
        Ingrese sus datos personales
      </h3>
      <h3 className={styles.label}>Primer nombre</h3>
      <Input style={{width: "100%"}} />
      <h3 className={styles.label}>Segundo nombre</h3>
      <Input style={{width: "100%"}} />
      <h3 className={styles.label}>Primer apellido</h3>
      <Input style={{width: "100%"}} />
      <h3 className={styles.label}>Segundo apellido</h3>
      <Input style={{width: "100%"}} />
    </Card>
  );
};

export default BasicData;
