import React, {useEffect, useState} from 'react';
import {withCampaign} from '../../../contexts/campaignContext';
import {withCourse} from '../../../contexts/courseContext';
import {Form, Modal, Select, Transfer} from "antd";
import _ from 'lodash';
import {withUser} from '../../../contexts/userContext';

const {Option}=Select;

const EditCampaignModal=({campaign, course, user}) => {

  const [targetKeys, setTargetKeys]=useState([]);
  const [selectedKeys, setSelectedKeys]=useState([]);

  const onChange=(nextTargetKeys, direction, moveKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange=(sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const closeModal=() => {
    campaign.setEditCampaignModal(false);
  }

  const studentFormatter=(values) => {
    return values.map((s, i) => ({
      key: s._id,
      title: `${s.name} ${s.lastName}`,
      id: s._id
    }))
  }

  useEffect(() => {
    if (campaign.editCampaignModal.opened) {
      setTargetKeys(campaign.editCampaignModal.data.users.map(s => s._id));
      form.setFieldsValue({
        users: campaign.editCampaignModal.data.users,
        course: campaign.editCampaignModal.data.course._id
      })
    }
  }, [campaign])

  useEffect(() => {
    course.getCourses();
    user.getUsers();
  }, [])


  const [form]=Form.useForm();

  const onFinish=() => {
    const fieldsValue=form.getFieldsValue();
    const payload={...fieldsValue, _id: campaign.editCampaignModal.data._id}

    campaign.editCampaign(payload).then(() => {
      form.resetFields();
      setTargetKeys([])
      setSelectedKeys([])
    });
  };


  return (
    <Modal
      width={1000}
      title="Nueva Campaña" visible={campaign.editCampaignModal.opened} onOk={onFinish} onCancel={closeModal}>
      <Form form={form} name="control-hooks" onFinish={onFinish} layout="vertical">
        <Form.Item name="course" label="Curso" rules={[{required: true}]}>
          <Select defaultValue="">
            <Option value={null}>Seleccione un Curso</Option>
            {course.courses.map((c) => <Option value={c._id}>{c.courseName}</Option>)}
          </Select>
        </Form.Item>
        <Form.Item name="users" label="Participantes" rules={[{required: true}]}>
          <Transfer
            dataSource={studentFormatter(user.users)}
            titles={['Disponibles', 'Seleccionados']}
            targetKeys={targetKeys}
            selectedKeys={selectedKeys}
            onChange={onChange}
            onSelectChange={onSelectChange}
            render={item => item.title}
            listStyle={{
              width: 500,
              height: 300,
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default withUser(withCourse(withCampaign(EditCampaignModal)));
