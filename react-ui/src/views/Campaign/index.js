import React, {useEffect} from 'react';
import {withCampaign} from '../../contexts/campaignContext';
import NewCampaignModal from './NewCampaignModal';
import NewUserModal from './NewUserModal';
import CampaignList from './CampaignList';
import EditCampaignModal from './EditCampaignModal';
import styles from './index.module.scss';
import {Breadcrumb, Layout, Menu} from 'antd';
import {withUser} from '../../contexts/userContext';

const {Header, Footer, Content}=Layout;

const Campaign=({campaign, user}) => {
  useEffect(() => {
    campaign.getCampaigns();
  }, [])
  const handleNewCampaignModalButton=() => {
    campaign.setNewCampaignModal(true);
  }
  const handleNewUserModalButton=() => {
    user.setNewUserModal(true);
  }
  return (
    <>
      <NewCampaignModal/>
      <EditCampaignModal/>
      <NewUserModal/>
      <Layout className="layout">
        <Header>
          <Menu mode="horizontal" defaultSelectedKeys={['0']}>
            <Menu.Item key="0" onClick={handleNewCampaignModalButton}>Crear Campaña</Menu.Item>
            <Menu.Item key="1" onClick={handleNewUserModalButton}>Crear Usuarios</Menu.Item>
          </Menu>
        </Header>
        <Content style={{padding: '0 50px'}}>
          <Breadcrumb style={{margin: '16px 0'}}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Campañas</Breadcrumb.Item>
          </Breadcrumb>
          <div className={styles.siteLayoutContent}>
            <CampaignList/>
          </div>
        </Content>
        <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </>
  );
};

export default withUser(withCampaign(Campaign));
