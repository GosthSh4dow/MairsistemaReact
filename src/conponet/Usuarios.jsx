import React, { useState } from 'react';
import { Button, Modal, Input, Select, Table, Tooltip, message } from 'antd';
import { PlusOutlined, UserOutlined, EditOutlined, PrinterOutlined } from '@ant-design/icons';

const { Option } = Select;

const Usuarios = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [selectedUserType, setSelectedUserType] = useState('Usuario');
  const [userData, setUserData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [adminModalVisible, setAdminModalVisible] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSelectUserType = (value) => {
    setSelectedUserType(value);
    if (value === 'Administrador') {
      setAdminModalVisible(true);
    } else {
      setAdminModalVisible(false);
    }
  };

  const handleAddUser = () => {
    if (!selectedUserData) {
      message.error('Por favor selecciona un usuario');
      return;
    }
    // Validar que todos los campos estén llenos
    if (
      selectedUserData.name &&
      selectedUserData.ci &&
      selectedUserData.license &&
      selectedUserData.plate &&
      username &&
      password
    ) {
      // Aquí iría la lógica para agregar el usuario a la tabla principal
      const newUser = {
        ...selectedUserData,
        userType: selectedUserType,
        username: username,
        password: password,
      };
      setUserData([...userData, newUser]);
      message.success('Usuario agregado correctamente');
      setModalVisible(false); // Cerrar el modal después de agregar el usuario
    } else {
      message.error('Por favor completa todos los campos');
    }
  };

  const handlePrintUserData = () => {
    // Aquí iría la lógica para imprimir los datos del usuario
    message.success('Datos de registro impresos correctamente');
  };

  const handleModifyUserData = () => {
    // Aquí iría la lógica para modificar los datos del usuario
    message.success('Datos de usuario modificados correctamente');
  };

  const handleSearch = (value) => {
    setSearchText(value);
    // Aquí iría la lógica para buscar usuarios
  };

  const columnsPrincipal = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'CI',
      dataIndex: 'ci',
      key: 'ci',
    },
    {
      title: 'Licencia',
      dataIndex: 'license',
      key: 'license',
    },
    {
      title: 'Placa',
      dataIndex: 'plate',
      key: 'plate',
    },
    {
      title: 'Tipo de Usuario',
      dataIndex: 'userType',
      key: 'userType',
    },
    {
      title: 'Usuario',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Contraseña',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (text, record) => (
        <div>
          <Tooltip title="Imprimir Datos">
            <Button icon={<PrinterOutlined />} onClick={handlePrintUserData} />
          </Tooltip>
          <Tooltip title="Editar Datos">
            <Button icon={<EditOutlined />} onClick={handleModifyUserData} />
          </Tooltip>
        </div>
      ),
    },
  ];

  const columnsModal = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'CI',
      dataIndex: 'ci',
      key: 'ci',
    },
    {
      title: 'Licencia',
      dataIndex: 'license',
      key: 'license',
    },
    {
      title: 'Placa',
      dataIndex: 'plate',
      key: 'plate',
    },
    {
      title: 'Acciones',
      key: 'action',
      render: (_, record) => (
        <Button onClick={() => handleSelectUser(record)}>Seleccionar</Button>
      ),
    },
  ];

  // Datos de usuarios ficticios
  const data = [
    {
      key: '1',
      name: 'John Doe',
      ci: '1234567',
      license: 'ABC123',
      plate: 'XYZ123',
    },
    // Más datos ficticios aquí...
  ];

  const handleSelectUser = (record) => {
    setSelectedUserData(record);
    setModalVisible(false);
  };

  return (
    <div>
      <Button icon={<UserOutlined />} onClick={() => setModalVisible(true)}>
        Seleccionar
      </Button>
      <Modal
        title="Seleccionar Usuario"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={800} // Ancho personalizado del modal
      >
        <Table
          dataSource={data}
          columns={columnsModal}
          pagination={false}
          scroll={{ x: 'max-content' }} // Agrega un scroll horizontal si la tabla supera el ancho del modal
        />
      </Modal>

      <div style={{ display: 'flex', marginBottom: '1rem' }}>
        <Input placeholder="Nombre" style={{ marginRight: '1rem' }} value={selectedUserData?.name || ''} disabled />
        <Input placeholder="CI" style={{ marginRight: '1rem' }} value={selectedUserData?.ci || ''} disabled />
        <Input placeholder="Licencia" style={{ marginRight: '1rem' }} value={selectedUserData?.license || ''} disabled />
        <Input placeholder="Placa" style={{ marginRight: '1rem' }} value={selectedUserData?.plate || ''} disabled />
        <Input placeholder="Usuario" style={{ marginRight: '1rem' }} value={username} onChange={(e) => setUsername(e.target.value)} />
        <Input.Password placeholder="Contraseña" style={{ marginRight: '1rem' }} value={password} onChange={(e) => setPassword(e.target.value)} />
        <Select value={selectedUserType} onChange={handleSelectUserType} style={{ marginRight: '1rem' }}>
          <Option value="Usuario">Usuario</Option>
          <Option value="Administrador">Administrador</Option>
        </Select>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddUser}>
          Agregar
        </Button>
      </div>

      <Modal
        title="Ingrese la clave para agregar un Administrador"
        visible={adminModalVisible}
        onCancel={() => {
          setAdminModalVisible(false);
        }}
        footer={null}
      >
        <Input.Password
          placeholder="Contraseña de Administrador"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
        />
      </Modal>

      <Input.Search
        style={{ marginBottom: '1rem' }}
        placeholder="Buscar"
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
      />

      <Table
        dataSource={userData} // Aquí iría el estado que contiene los datos filtrados
        columns={columnsPrincipal}
        pagination={false}
        scroll={{ x: 'max-content' }} // Agrega un scroll horizontal si la tabla supera el ancho del contenedor
      />
    </div>
  );
};

export default Usuarios;
