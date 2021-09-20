import React from 'react';

import {withCampaign} from '../../../contexts/campaignContext';
import {Button, Modal, Table, Tooltip} from 'antd';

import {EditOutlined, DeleteFilled, ExclamationCircleOutlined} from '@ant-design/icons';


const CampaignList=({campaign}) => {
  const confirm=(id) => {
    Modal.confirm({
      title: `Eliminar campañar ${id}`,
      icon: <ExclamationCircleOutlined/>,
      content: `¿Estas seguro de eliminar esta campaña?`,
      okText: 'Eliminar',
      cancelText: 'Cancelar',
      onOk: () => {
        campaign.deleteCampaign(id)
      }
    });
  }

  const columns=[
    {
      title: 'Id',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Curso',
      dataIndex: 'course',
      key: 'course',
      render: (index, data) => {
        return data.course.courseName
      }
    },
    {
      title: 'Participantes',
      dataIndex: 'users',
      key: 'users',
      render: (index, data) => {
        return data.users.length
      }
    },
    {
      title: 'Acciones',
      dataIndex: 'users',
      render: (index, data) => {
        return (<>
          <Tooltip title="Editar">
            <Button onClick={() => campaign.setEditCampaignModal({
              opened: true,
              data,
            })} type="primary" shape="circle" icon={<EditOutlined/>}/>
          </Tooltip>
          <Tooltip title="Eliminar">
            <Button onClick={() => confirm(data._id)} type="secondary" shape="circle" icon={<DeleteFilled/>}/>
          </Tooltip>
        </>)
      }

    },
  ];

  const dataSource=campaign.campaigns.map(c => ({
    ...c, users: c.users, course: c.course
  }));

  return (
    <Table dataSource={dataSource} columns={columns}/>
  );
};

export default withCampaign(CampaignList);
