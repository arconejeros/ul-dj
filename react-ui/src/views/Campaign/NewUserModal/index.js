import React, {useEffect, useState} from 'react';
import {withCampaign} from '../../../contexts/campaignContext';
import {withCourse} from '../../../contexts/courseContext';
import {Form, Input, Modal, Row, Select, Transfer} from "antd";
import {withStudents} from '../../../contexts/studentsContext';
import {withUser} from '../../../contexts/userContext';

import faker from 'faker';

const {Option}=Select;

const NewUserModal=({course, user}) => {


  const closeModal=() => {
    user.setNewUserModal(false);
  }


  const [form]=Form.useForm();

  const onFinish=() => {
    const fieldsValue=form.getFieldsValue();
    user.newUser({...fieldsValue, profile: "finalUser"}).then(() => {
      form.resetFields();
    });
  };
  form.setFieldsValue({name: faker.name.firstName(), lastName: faker.name.lastName(),
    rut: faker.datatype.number().toString(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber().toString(),
    region: "Metropolitana de Santiago",
    commune: "Huechuraba"
  })

  return (
    <Modal
      width={1000}
      title="Nuevo Usuario" visible={user.newUserModal} onOk={onFinish} onCancel={closeModal}>
      <Form form={form} name="control-hooks" onFinish={onFinish} layout="vertical">
        <Form.Item name="name" label="Nombre" rules={[{required: true}]}>
          <Input type="text" />
        </Form.Item>
        <Form.Item name="lastName" label="Apellido" rules={[{required: true}]}>
          <Input type="text"/>
        </Form.Item>
        <Form.Item name="rut" label="Rut" rules={[{required: true}]}>
          <Input type="text"/>
        </Form.Item>
        <Form.Item name="email" label="Correo" rules={[{required: true}]}>
          <Input type="text"/>
        </Form.Item>
        <Form.Item name="phone" label="Telefono" rules={[{required: true}]}>
          <Input type="text"/>
        </Form.Item>
        <Form.Item name="region" label="Region" rules={[{required: true}]}>
          <Input type="text"/>
        </Form.Item>
        <Form.Item name="commune" label="Comuna" rules={[{required: true}]}>
          <Input type="text"/>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default withUser(withCourse(withCampaign(NewUserModal)));
