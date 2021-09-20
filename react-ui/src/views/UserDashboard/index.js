import React, {useEffect} from 'react';
import styles from './index.module.scss';
import {withUser} from '../../contexts/userContext';
import CampaignItem from './CampaignItem';

const UserDashboard=({user}) => {
  useEffect(() => {
    user.getUserDetails();
  }, [])
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Mis Declaraciones Juradas</h1>
      {user.userDetails.campaigns.map(element => <CampaignItem campaign={element} />)}
    </div>
  );
};

export default withUser(UserDashboard);
