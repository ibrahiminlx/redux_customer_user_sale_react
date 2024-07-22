import React, { useState } from "react";
import { Input, Form, message, Button, Modal, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createSales } from "../../../redux/slice/sale/saleSlice";
export const AddSale = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [customerId, setCustomerId] = useState(0);
  const [amount, setAmount] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { customers } = useSelector((state) => state.customerState);
  const { token } = useSelector((state) => state.authState.user);

  const addNewCustomer = () => {
    form
      .validateFields()
      .then((values) => {
        dispatch(createSales({...values,token}));
        form.resetFields();
        setIsModalVisible(false);
        messageApi.open({
          type: "success",
          content: "Sale added successfully.",
        });
      })
      .catch((errorInfo) => {
        console.log("Validation Failed:", errorInfo);
      });
  };

  const handleCustomerChange = (e) => setCustomerId(e);
  const handleAmountChange = (e) => setAmount(e.target.value);

  return (
    <>
      {contextHolder}
      <Button
        type="primary"
        style={{ marginBottom: 20 }}
        onClick={() => setIsModalVisible(true)}
      >
        + Add Sale
      </Button>
      <Modal
        title="Add New Customer"
        visible={isModalVisible}
        onOk={addNewCustomer}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setCustomerId(null);
          setAmount(null);
        }}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="CustomerId"
            name="customerId"
            rules={[
              { required: true, message: "Please input the Customer Id!" },
            ]}
          >
            <Select
              name="customerId"
              value={customerId}
              onChange={(value) => handleCustomerChange(value)}
              options={customers.map((data) => ({
                value: data.id,
                label: data.name,
              }))}
            >
              
            </Select>
          </Form.Item>
          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: "Please input the Amount!" }]}
          >
            <Input type="number" name="amount" value={amount} onChange={handleAmountChange} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
