import React from 'react'
import { Layout} from 'antd';
const {  Footer } = Layout;
export const FooterComponents = () => {
  return (
    <Footer
          style={{
            textAlign: 'center',
            left:0,
            bottom:0,
            width:'100%',
            padding:'20px 0',
            color:'white',
            backgroundColor:'#001529'
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
  )
}
