import React from 'react';
import styles from './index.module.scss';
import doc from '../../../assets/doc.png';

const CampaignItem=({campaign}) => {
  console.log(campaign)
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <img src={doc} alt=""/>
        <h2>{campaign.courseName}</h2>
      </div>
      <button className={styles.btn}>Firmar</button>
    </div>
  );
};

CampaignItem.propTypes={};

export default CampaignItem;
