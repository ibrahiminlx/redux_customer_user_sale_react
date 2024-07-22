import React, { useEffect, useState } from "react";
import {
  allCustomers,
  updateCustomer,
  updateCustomerState,
  resetUpdated,
  deleteCustomer,
  resetError
} from "../../redux/slice/customer/customerSlice";
import { useDispatch, useSelector } from "react-redux";
import { Space, Table, Input, Form, message } from "antd";
import moment from "moment";
import { AddCustomer } from "./addCustomer/AddCustomer";
import { ErrorModal } from "./ErrorModel";
export const Customers = () => {
  const dispatch = useDispatch();
  const { customers, isUpdated,isError } = useSelector((state) => state.customerState);
  const [updatedDataRedux, setUpdatedDataRedux] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const handleFieldChange = (value, key, record) => {
    const updatedData = { ...record, [key]: value };
    setUpdatedDataRedux(updatedData);
  };
  
  const updateCustomerData = (data) => {
    dispatch(updateCustomerState(data));
    dispatch(
      updateCustomer({
        id: updatedDataRedux.id,
        name: updatedDataRedux.name,
        phone: updatedDataRedux.phone,
        address: updatedDataRedux.address,
      })
    );
  };
  const deleteCustomerData=(data)=>{
    dispatch(deleteCustomer(data.id))
  }
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Success Updated Customers.",
    });
  };
  useEffect(() => {
    dispatch(allCustomers());
  }, []);
  useEffect(() => {
    if (isUpdated) {
      success();
      dispatch(resetUpdated());
    }
  }, [isUpdated]);
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <Form.Item
          name="name"
          style={{ margin: 0 }}
          rules={[{ required: true, message: "Name is required." }]}
        >
          <Input
            type="string"
            defaultValue={record.name}
            onChange={(e) => handleFieldChange(e.target.value, "name", record)}
          />
        </Form.Item>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (_, record) => (
        <Form.Item
          name="phone"
          style={{ margin: 0 }}
          rules={[{ required: true, message: "Phone is required." }]}
        >
          <Input
            type="string"
            defaultValue={record.phone}
            onChange={(e) => handleFieldChange(e.target.value, "phone", record)}
          />
        </Form.Item>
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (_, record) => (
        <Form.Item
          name="address"
          style={{ margin: 0 }}
          rules={[{ required: true, message: "Address is required." }]}
        >
          <Input
            type="string"
            defaultValue={record.address}
            onChange={(e) =>
              handleFieldChange(e.target.value, "address", record)
            }
          />
        </Form.Item>
      ),
    },

    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => moment(text).format("MMMM Do YYYY, h:mm:ss a"),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text) => moment(text).format("MMMM Do YYYY, h:mm:ss a"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => updateCustomerData(record)}>Update</a>
          <a onClick={() => deleteCustomerData(record)}>Delete</a>
        </Space>
      ),
    },
  ];
  const handleReduxCancel = () => {
    dispatch(resetError())
  };
  return (
    <div style={{ margin: 20 }}>
       {isError && (
        <ErrorModal
          open={isError}
          onCancel={handleReduxCancel}
          header={'State Error'}
          body={'Server Error'}
          onOk={handleReduxCancel}
          okText={'Tamam'}
          cancelText={'Vazgec'}
        />
      )}
      <AddCustomer/>
      {contextHolder}
      <Table
        columns={columns}
        pagination={{
          position: ["bottomRight"],
        }}
        dataSource={customers}
      />
    </div>
  );
};
