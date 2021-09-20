import React, {useEffect} from 'react';
import styles from './index.module.scss';
import Card from '../../Card';
import {Button} from 'antd';
import {withDj} from '../../../contexts/djContext';

const Send=({data, dj}) => {
  return (
    <Card>
      <h3 className={styles.title}>
        ¿Todos tus datos son correctos?
      </h3>
      <Button type="secondary" onClick={dj.sendForm}>Enviar resulados</Button>
    </Card>
  );
};

export default withDj(Send);
