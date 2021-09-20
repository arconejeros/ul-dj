import React, {useEffect} from 'react';
import styles from './index.module.scss';
import Card from '../../Card';
import SignaturePad from 'signature_pad';
import {Button} from 'antd';

const Sign=({data}) => {
  let canvasRed;
  let signaturePad;

  useEffect(() => {
    if(canvasRed) {
      signaturePad = new SignaturePad(canvasRed, {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        penColor: 'rgb(0, 0, 0)'
      });
      console.log(signaturePad)
    }
  }, [canvasRed])

  const clearSign = () => {
    signaturePad.clear();
  }

  return (
    <Card>
      <h3 className={styles.title}>
        Firma
      </h3>
      <canvas id="signature-pad"
      className={styles.signArea}
              width="400" height="200" ref={el => {canvasRed = el}}/>
      <Button type="secondary" onClick={clearSign}>Limpiar</Button>
    </Card>
  );
};

export default Sign;
