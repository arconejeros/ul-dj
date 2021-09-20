import React from 'react';
import styles from './index.module.scss';
import InputFile from './InputFile';
import Card from '../../Card';

const Photo=({data}) => {
  console.log("data imagen", data)
  return (
    <Card>
      <h3 className={styles.title}>
        {data.text}
      </h3>
      <img src={data.img} alt=""/>
      <InputFile index={data.index}  name="front" text="Fotografía 1 - Cara Frontal"/>
      <InputFile index={data.index} name="rear" text="Fotografía 2 - Cara Posterior"/>
    </Card>
  );
};

export default Photo;
