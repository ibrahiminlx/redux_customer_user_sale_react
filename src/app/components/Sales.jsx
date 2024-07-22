import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Space, Table, Input, Form, Select, message } from "antd";
import {
  allSales,
  updateSale,
  updateSales,
  resetUpdated,
} from "../../redux/slice/sale/saleSlice";
import moment from "moment";
import { allCustomers } from "../../redux/slice/customer/customerSlice";
import { resetError,deleteSales } from "../../redux/slice/sale/saleSlice";
import {ErrorModal} from '../components/ErrorModel'
import { AddSale } from "./addSale/AddSale";
export const Sales = () => {
  const dispatch = useDispatch();
  const { sales, isUpdated,isError,editSale } = useSelector((state) => state.saleState);
  const { customers } = useSelector((state) => state.customerState);
  const [updatedDataRedux, setUpdatedDataRedux] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const updateSaleData =(data) => {
    dispatch(updateSale(data));
    setUpdatedDataRedux(data)
    dispatch(
      updateSales({
        id: updatedDataRedux.id,
        amount: updatedDataRedux.amount,
        customerId: updatedDataRedux.customerId,
      })
    );
  };
  const deleteSaleData=(data)=>{
    dispatch(deleteSales(data.id))
  }
  const handleFieldChange = (value, key, record) => {
    const updatedData = { ...record, [key]: value };
    setUpdatedDataRedux(updatedData);
  };
  const handleReduxCancel = () => {
    dispatch(resetError())
  };
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Customer Id",
      dataIndex: "customerId",
      key: "customerId",
      render: (_, record) => (
        <Form.Item
          name="customerId"
          style={{ margin: 0 }}
          rules={[{ required: true, message: "Customer ID is required." }]}
        >
          <Select
            defaultValue={record.customerId}
            onChange={(value) => handleFieldChange(value, "customerId", record)}
            options={customers.map((data) => ({
              value: data.id,
              label: data.name,
            }))}
            style={{ width: "100%" }}
          />
        </Form.Item>
      ),
    },
    {
      title: "User Id",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (_, record) => (
        <Form.Item
          name="amount"
          style={{ margin: 0 }}
          rules={[{ required: true, message: "Amount is required." }]}
        >
          <Input
            type="number"
            defaultValue={record.amount}
            onChange={(e) =>
              handleFieldChange(e.target.value, "amount", record)
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
          <a onClick={() => updateSaleData(record)}>Update</a>
          <a onClick={() => deleteSaleData(record)}>Delete</a>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    if (isUpdated) {
      dispatch(resetUpdated());
      messageApi.open({
        type: "success",
        content: "Sale updated successfully.",
      });
    }
  }, [isUpdated]);
  useEffect(() => {
    dispatch(allSales());
    dispatch(allCustomers());
  }, []);
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
      {contextHolder}
      <AddSale/>
      <Table
        columns={columns}
        pagination={{
          position: ["bottomRight"],
        }}
        dataSource={sales}
      />
    </div>
  );
};
