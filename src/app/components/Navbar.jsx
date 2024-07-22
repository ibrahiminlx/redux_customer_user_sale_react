import React, { useState } from "react";
import { Image, Layout, Menu, theme } from "antd";
import { useDispatch } from "react-redux";
import { logout, reset } from "../../redux/slice/auth/authSlice";
import { useNavigate } from "react-router-dom";
const { Header } = Layout;

export const Navbar = () => {
  const [selected, setSelected] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = [
    {
      key: "icon",
      icon: (
        <div
          style={{
            display: "contents",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Image
            src="./icon.png"
            preview={false}
            alt="icon"
            style={{ width: "33px", height: "33px" }}
          />
        </div>
      ),
      onClick: () => {
        navigate("/");
        setSelected("home");
      },
    },
    {
      key: "home",
      label: "Home",
      onClick: () => {
        navigate("/");
        setSelected("home");
      },
    },
    {
      key: "sales",
      label: "Sales",
      onClick: () => {
        navigate("/sales");
        setSelected("sales");
      },
    },
    {
      key: "customers",
      label: "Customers",
      onClick: () => {
        navigate("/customers");
        setSelected("customers");
      },
    },
  ];

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={selected}
          // defaultSelectedKeys={["home"]}
          items={items}
          selectable={false}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
        <Menu
          theme="dark"
          mode="horizontal"
          items={[
            {
              key: "logout",
              label: "Logout",
              onClick: () => {
                dispatch(reset());
                dispatch(logout());
              },
            },
          ]}
        />
      </div>
    </Header>
  );
};
