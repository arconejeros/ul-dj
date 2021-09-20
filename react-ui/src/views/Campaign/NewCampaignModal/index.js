import React, {useEffect, useState} from 'react';
import {withCampaign} from '../../../contexts/campaignContext';
import {withCourse} from '../../../contexts/courseContext';
import {Form, Modal, Select, Transfer} from "antd";
import {withStudents} from '../../../contexts/studentsContext';
import {withUser} from '../../../contexts/userContext';

const {Option}=Select;

const NewCampaignModal=({campaign, course, user}) => {

  const [targetKeys, setTargetKeys]=useState([]);
  const [selectedKeys, setSelectedKeys]=useState([]);

  const onChange=(nextTargetKeys, direction, moveKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange=(sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const closeModal=() => {
    campaign.setNewCampaignModal(false);
  }

  const studentFormatter=(values) => {
    return values.map((s, i) => ({
      key: s._id,
      title: `${s.name} ${s.lastName}`,
      id: s._id
    }))
  }

  useEffect(() => {
    // if (student.students) {
    //   const formattedData=studentFormatter(student.students)
    //   setTargetKeys(formattedData)
    // }
  }, [user])

  useEffect(() => {
    course.getCourses();
    user.getUsers();
  }, [])


  const [form]=Form.useForm();

  const onFinish=() => {
    const fieldsValue=form.getFieldsValue();
    campaign.newCampaign(fieldsValue).then(() => {
      form.resetFields();
      setTargetKeys([])
      setSelectedKeys([])
    });
  };


  return (
    <Modal
      width={1000}
      title="Nueva Campaña" visible={campaign.newCampaignModal} onOk={onFinish} onCancel={closeModal}>
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

export default withUser(withCourse(withCampaign(NewCampaignModal)));
