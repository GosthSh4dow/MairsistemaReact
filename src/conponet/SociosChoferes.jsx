import React, { useState } from 'react';
import { Button, Input, Space, Dropdown, Menu, Drawer, Form, Row, Col, Select, Checkbox ,Tabs ,Avatar, List ,Tooltip} from 'antd';
import { PlusOutlined, SearchOutlined, UserOutlined, CarOutlined ,SyncOutlined,UserSwitchOutlined,DeleteOutlined} from '@ant-design/icons';

const { Item } = Menu;
const { Option } = Select;
const data = [
    {
      title: 'Socio1',
    },
    {
      title: 'Socio2',
    },
    {
      title: 'SOcio3',
    },
    {
      title: 'Socio 4',
    },
  ];

const SociosChoferes = () => {
  const [sociosDrawerVisible, setSociosDrawerVisible] = useState(false);
  const [choferesDrawerVisible, setChoferesDrawerVisible] = useState(false);
  const [groupDisabled, setGroupDisabled] = useState(true); // Estado para controlar si el campo Grupo está deshabilitado

  const showSociosDrawer = () => {
    setSociosDrawerVisible(true);
  };

  const showChoferesDrawer = () => {
    setChoferesDrawerVisible(true);
  };

  const onCloseSociosDrawer = () => {
    setSociosDrawerVisible(false);
  };

  const onCloseChoferesDrawer = () => {
    setChoferesDrawerVisible(false);
  };

  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  const handleUseExtensionChange = (e) => {
    setGroupDisabled(!e.target.checked);
  };

  return (
    <Space wrap="wrap" gap="large" direction="vertical"  style={{ width: '100%' }}>
      <div style={{ marginBottom: '20px' }}>
        <Dropdown
          overlay={<Menu><Item key="1" icon={<UserOutlined />} onClick={showSociosDrawer}>Agregar Socio</Item><Item key="2" icon={<CarOutlined />} onClick={showChoferesDrawer}>Agregar Chofer</Item></Menu>}
          placement="bottomRight"
        >
          <Button type="primary" icon={<PlusOutlined />} style={{ marginRight: '10px' }}>Agregar Nuevo</Button>
        </Dropdown>
        <Input placeholder="Buscar" prefix={<SearchOutlined />} style={{ width: '200px' }} />
      </div>
      <Drawer
  title="Agregar Socio"
  width={720}
  onClose={onCloseSociosDrawer}
  visible={sociosDrawerVisible}
  bodyStyle={{ paddingBottom: 80 }}
  footer={<Space><Button onClick={onCloseSociosDrawer}>Cancelar</Button><Button type="primary" onClick={onCloseSociosDrawer}>Guardar</Button></Space>}
>
  <Form layout="vertical" onFinish={onFinish}>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item name="name" label="Nombre" rules={[{ required: true, message: 'Por favor ingresa el nombre' }]}>
          <Input placeholder="Nombre" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="ci"   label={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '8px' }}>CI</span>
            <Checkbox onChange={handleUseExtensionChange}>Extensión</Checkbox>
          </div>
        } rules={[{ required: true, message: 'Por favor ingresa el CI' }]}>
          <Input.Group compact>
            <Input placeholder="Número" style={{ width: 'calc(100% - 100px)' }} />
            <Input placeholder="Expedido en" style={{ width: '100px' }} />
          </Input.Group>
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item name="cellphone" label="Celular" rules={[{ required: true, message: 'Por favor ingresa el celular' }]}>
          <Input placeholder="Celular" type="number" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="address" label="Dirección" rules={[{ required: true, message: 'Por favor ingresa la dirección' }]}>
          <Input placeholder="Dirección" />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item name="license" label="Licencia" rules={[{ required: true, message: 'Por favor ingresa la licencia' }]}>
          <Input placeholder="Licencia" type="number" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="plate" label="Placa" rules={[{ required: true, message: 'Por favor ingresa la placa' }]}>
          <Input placeholder="Placa" maxLength={9} />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item name="group" label="Grupo">
        <Select defaultValue="1" style={{ width: 120 }}>
  <Option value="1">Opción 1</Option>
  <Option value="2">Opción 2</Option>
  <Option value="3">Opción 3</Option>
</Select>

        </Form.Item>
      </Col>
    </Row>
  </Form>
</Drawer>
      <Drawer
        title="Agregar Chofer"
        width={720}
        onClose={onCloseChoferesDrawer}
        visible={choferesDrawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={<Space><Button onClick={onCloseChoferesDrawer}>Cancelar</Button><Button type="primary" onClick={onCloseChoferesDrawer}>Guardar</Button></Space>}
      >
         <Form layout="vertical" onFinish={onFinish}>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item name="socio" label="Socio" rules={[{ required: true, message: 'Por favor selecciona el socio' }]}>
          <Select placeholder="Selecciona el socio">
            <Option value="socio1">Socio 1</Option>
            <Option value="socio2">Socio 2</Option>
            <Option value="socio3">Socio 3</Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="name" label="Nombre" rules={[{ required: true, message: 'Por favor ingresa el nombre' }]}>
          <Input placeholder="Nombre" />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item name="lastName" label="Apellido" rules={[{ required: true, message: 'Por favor ingresa el apellido' }]}>
          <Input placeholder="Apellido" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="ci" label="CI" rules={[{ required: true, message: 'Por favor ingresa el CI' }]}>
          <Input placeholder="CI" />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item name="cellphone" label="Celular" rules={[{ required: true, message: 'Por favor ingresa el celular' }]}>
          <Input placeholder="Celular" type="number" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="license" label="Licencia" rules={[{ required: true, message: 'Por favor ingresa la licencia' }]}>
          <Input placeholder="Licencia" />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item name="plate" label="Placa" rules={[{ required: true, message: 'Por favor selecciona la placa' }]}>
          <Select placeholder="Selecciona la placa">
            <Option value="placa1">Placa 1</Option>
            <Option value="placa2">Placa 2</Option>
            <Option value="placa3">Placa 3</Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="group" label="Grupo">
          <Input placeholder="Grupo" disabled />
        </Form.Item>
      </Col>
    </Row>
  </Form>
</Drawer>
<Tabs defaultActiveKey="1" size='large' style={{ marginBottom: 32 }}>
  <Tabs.TabPane tab="Socios" key="1">
    <div style={{ maxHeight: 'calc(100vh - 300px)', overflowY: 'auto', width: '100%' }}> {/* Ajusta el ancho para que ocupe el 100% de la página */}
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
              title={<a href="https://ant.design">{item.title}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
            <div>
    <Tooltip title="Actualizar Datos">
   
      <Button type="primary" shape="circle" icon={<SyncOutlined />} style={{ marginRight: 8 ,backgroundColor: '#52c41a', color: '#fff', borderColor: '#52c41a' }}></Button>
    </Tooltip>
    <Tooltip title="Inactivar Usuario">
      <Button type="primary"  shape="circle" icon={<UserSwitchOutlined />} style={{ marginRight: 8,backgroundColor: '#faad14', color: '#fff', borderColor: '#faad14' }} />
    </Tooltip>
    <Tooltip title="Eliminar Usuario">
      <Button type="danger" shape="circle" icon={<DeleteOutlined />} style={{ backgroundColor: '#ff4d4f', color: '#fff', borderColor: '#ff4d4f' }} />
    </Tooltip>
  </div>
          </List.Item>
        )}
      />
    </div>
  </Tabs.TabPane>
  <Tabs.TabPane tab="Choferes" key="2">
    Contenido de la pestaña Choferes
  </Tabs.TabPane>
</Tabs>
    </Space>
  );
};

export default SociosChoferes;