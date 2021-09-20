import React from 'react';
import Card from '../../Card';
import styles from './index.module.scss';
import Confirmation from '../Confirmation';

const Declaracion=({data}) => {
  return (
    <Card>
      <div className={styles.text} dangerouslySetInnerHTML={{__html: data.text}}/>
      <Confirmation data={{text: '¿Aceptas esta declaración?'}}/>
    </Card>
  );
};

export default Declaracion;
