import React, { useState } from "react";
import { Button, Col, Form, Image, Input, Row } from "antd";
import { ErrorModal } from "../components/ErrorModel";
import { useDispatch, useSelector } from "react-redux";
import { login,resetError } from "../../redux/slice/auth/authSlice";

export const Login = () => {
  const [validationError, setValidationError] = useState(false);
  const [validationErrorMessage, setValidationErrorMessage] = useState(null);
  const dispatch =useDispatch()
  const {isError,message}=useSelector(state=>state.authState)
  const onFinish = (values) => {
    console.log("Success:", values);
    dispatch(login(values))
  };
  const onFinishFailed = (errorInfo) => {
    setValidationErrorMessage(errorInfo.errorFields[0].errors[0])
    setValidationError(true);
  };

  const handleOk = () => {
    setValidationError(false);
  };

  const handleCancel = () => {
    setValidationError(false);
  };
  const handleReduxCancel = () => {
    dispatch(resetError())
  };
  return (
    <>
    {isError && (
        <ErrorModal
          open={isError}
          onCancel={handleReduxCancel}
          header={'State Error'}
          body={message}
          onOk={handleReduxCancel}
          okText={'Tamam'}
          cancelText={'Vazgec'}
        />
      )}
      {validationError && (
        <ErrorModal
          open={validationError}
          onOk={handleOk}
          onCancel={handleCancel}
          header={'Validation Error'}
          body={validationErrorMessage}
        />
      )}
      <Row>
        <Col xs={0} sm={0} md={2} lg={4} xl={4}></Col>
        <Col xs={24} sm={24} md={20} lg={16} xl={16}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              alignItems: "center",
              height: "80vh",
            }}
          >
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                maxWidth: 600,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Image width={200} preview={false} src="./login.jpg" style={{ margin: 20 }} />
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
        <Col xs={0} sm={0} md={2} lg={4} xl={4}></Col>
      </Row>
    </>
  );
};
