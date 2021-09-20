import React, {useEffect, useState} from 'react';
import styles from './index.module.scss';
import {Select} from 'antd';
import {regiones} from '../../../utils/regiones';
import Card from '../../Card';
import {withDj} from '../../../contexts/djContext';

const {Option}=Select;

const Region=({data, dj}) => {
  let [selectedRegion, setSelectedRegion] = useState(null);
  let [selectedComuna, setSelectedComuna] = useState(null);
  const regionHandler = regionName => {
    setSelectedRegion(regiones.find(region => region.name === regionName));
    const newQuestions =JSON.parse(JSON.stringify(dj.questions));
    newQuestions[data.index].region = true;
    dj.setQuestions(newQuestions)
  }

  const comunaHandler = comunaName => {
    setSelectedComuna(selectedRegion.communes.find(comuna => comuna.name === comunaName));
    const newQuestions =JSON.parse(JSON.stringify(dj.questions));
    newQuestions[data.index].region = true;
    dj.setQuestions(newQuestions)
  }


  useEffect(() => {
    if(selectedRegion && selectedComuna) {
      const newQuestions =JSON.parse(JSON.stringify(dj.questions));
      newQuestions[data.index].answer = true;
      dj.setQuestions(newQuestions)
    }
  }, [selectedRegion, selectedComuna])
  return (
    <Card>
      <h3 className={styles.title}>
        Seleccione su region de residencia
      </h3>
      <Select style={{width: "100%"}} onChange={regionHandler}>
        {regiones.map((region, index) => <Option value={region.name} key={index.toString()}>{region.name}</Option>)}
      </Select>
      <h3 className={styles.title}>
        Seleccione su comuna de residencia
      </h3>
      <Select style={{width: "100%"}} disabled={!selectedRegion} onChange={comunaHandler}>
        {selectedRegion && selectedRegion.communes.map((comune, index) => <Option value={comune.name} key={index.toString()}>{comune.name}</Option>)}
      </Select>
    </Card>
  );
};

export default withDj(Region);
