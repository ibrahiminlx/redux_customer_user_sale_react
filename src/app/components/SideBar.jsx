import React, { useState } from "react";
import { Layout, Menu,Button } from "antd";
const { Sider } = Layout;

const items = [
  {
    key: "sidebar1",
    label: "sidebar1",
  },
  {
    key: "sidebar2",
    label: "sidebar2",
  },
  {
    key: "sidebar3",
    label: "sidebar3",
  },
];

export const SideBar = () => {

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{
          height: "100%",
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex:1,
        }}
      >
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["home"]}
          items={items}
        />
      </Sider>
    </Layout>
  );
};
