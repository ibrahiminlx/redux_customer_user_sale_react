import React, { useEffect } from "react";
import "antd/dist/reset.css";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authState);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, [user, navigate]);
  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;
