import React, { useState } from 'react';
import { Layout, Menu, theme, Dropdown, Avatar } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  IdcardOutlined,
  SolutionOutlined,
  FileTextOutlined,
  CarOutlined,
  TeamOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { FaCottonBureau } from 'react-icons/fa';
import Cliente from './conponet/Cliente';
import General from './conponet/General';
import SociosChoferes from './conponet/SociosChoferes';
import Usuarios from './conponet/Usuarios';
import Reportaje from './conponet/Reportaje';
import Viajes from './conponet/Viajes';
import HojaRuta from './conponet/HojaRuta';

const { Header, Content, Sider } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('General');

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuSelect = (item) => {
    setSelectedMenuItem(item.key);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    { key: 'General', icon: <FaCottonBureau />, label: 'General', component: <General /> },
    { key: 'Socios', icon: <IdcardOutlined />, label: 'Socios y choferes', component: <SociosChoferes /> },
    { key: 'Usuarios', icon: <UserOutlined />, label: 'Usuarios', component: <Usuarios /> },
    { key: 'Reportajes', icon: <SolutionOutlined />, label: 'Reportajes', component: <Reportaje /> },
    { key: 'HojasDeRutas', icon: <FileTextOutlined />, label: 'Hojas de Rutas', component: <HojaRuta /> },
    { key: 'Viajes', icon: <CarOutlined />, label: 'Viajes', component: <Viajes /> },
    { key: 'Cliente', icon: <TeamOutlined />, label: 'Cliente', component: <Cliente /> },
  ];

  const handleLogout = () => {
    // Lógica para cerrar sesión
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="Settings" icon={<SettingOutlined />}>
        Configuración
      </Menu.Item>
      <Menu.Item key="Logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Cerrar sesión
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '97vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={toggleCollapsed}
        style={{ backgroundColor: '#fff', paddingTop: '16px' }} // Ajuste aquí
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}> {/* Ajuste aquí */}
          {/* Aquí va el menú del usuario */}
          <Dropdown overlay={userMenu} placement="bottomRight">
            <Avatar
              size={64}
              icon={<UserOutlined />}
              style={{
                cursor: 'pointer',
                backgroundColor: '#1890ff',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                border: '2px solid #fff',
              }}
            />
          </Dropdown>
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['General']}
          selectedKeys={[selectedMenuItem]}
          onSelect={handleMenuSelect}
          style={{ backgroundColor: '#fff', borderRight: '2px solid #e8e8e8', itemSelectedBg: "#e6f4ff" }}
          itemSelectedBg="#e6f4ff"
          itemHoverBg="#f6ffed"
        >
          {menuItems.map((item) => (
            <Menu.Item key={item.key} icon={item.icon} style={{ margin: 0, position: 'relative' }}>
              {item.label}
              {selectedMenuItem === item.key && <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 4, backgroundColor: '#1890ff' }} />}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ margin: '0 5px ', padding: 0, backgroundColor: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ color: '#000', fontWeight: 'bold', fontSize: 20 }}>{selectedMenuItem}</h1>
        </Header>
        <Content style={{ margin: '5px 5px 0' }}>
          <div
            style={{
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              maxHeight: 'calc(100vh - 80px)', // Ajuste aquí, 80px es la altura aproximada del encabezado
              overflow: 'auto',
            }}
          >
            {selectedMenuItem && (
              <div>
                {menuItems.find((item) => item.key === selectedMenuItem)?.component}
              </div>
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
