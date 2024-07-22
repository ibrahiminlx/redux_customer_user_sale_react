import React from "react";
import { Navbar } from "../components/Navbar";
import { FooterComponents } from "../components/Footer";
import { Col, Layout, Row } from "antd";
import { SideBar } from "../components/SideBar";
import { Content } from "../components/Content";
import { Outlet } from "react-router-dom";

const { Content: AntContent } = Layout;

export const Landing = () => {
  return (
    <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Layout style={{ flex: 1 }}>
        <Row style={{ flex: 1 }}>
          <Col xs={1} sm={1} md={1} lg={5} xl={4}>
            <SideBar />
          </Col>
          <Col xs={23} sm={23} md={23} lg={19} xl={20}>
            <AntContent>
                <Outlet/>
            </AntContent>
          </Col>
        </Row>
      </Layout>
      <FooterComponents />
    </Layout>
  );
};
