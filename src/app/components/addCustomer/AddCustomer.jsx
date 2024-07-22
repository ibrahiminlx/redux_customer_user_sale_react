import React, { useState } from "react";
import { Input, Form, message, Button, Modal } from "antd";
import { useDispatch } from "react-redux";
import {createCustomer} from '../../../redux/slice/customer/customerSlice'
export const AddCustomer = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm(); 
  const dispatch=useDispatch()

  const addNewCustomer = () => {
    form.validateFields()
      .then((values) => {
        dispatch(createCustomer(values)); 
        form.resetFields();
        setIsModalVisible(false);
        messageApi.open({
          type: "success",
          content: "Customer added successfully.",
        });
      })
      .catch((errorInfo) => {
        console.log("Validation Failed:", errorInfo);
      });
  };

  const handleNameChange = (e) => setName(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handleAddressChange = (e) => setAddress(e.target.value);

  return (
    <>
      {contextHolder}
      <Button
        type="primary"
        style={{ marginBottom: 20 }}
        onClick={() => setIsModalVisible(true)}
      >
        + Add Customer
      </Button>
      <Modal
        title="Add New Customer"
        visible={isModalVisible}
        onOk={addNewCustomer}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields(); 
          setName(""); 
          setPhone(""); 
          setAddress(""); 
        }}
      >
        <Form
          layout="vertical"
          form={form}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please input the customer name!" },
            ]}
          >
            <Input
              name="name"
              value={name}
              onChange={handleNameChange}
            />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please input the customer phone!" },
            ]}
          >
            <Input
              name="phone"
              value={phone} 
              onChange={handlePhoneChange}
            />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[
              { required: true, message: "Please input the customer address!" },
            ]}
          >
            <Input
              name="address"
              value={address} 
              onChange={handleAddressChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
