import React, { useState } from 'react';
import { Modal, Card, Typography, Button, Space, Radio, Input, Select, notification,Row } from 'antd';
import { motion } from 'framer-motion';
import { FaMapMarkedAlt } from 'react-icons/fa';

const { Meta } = Card;
const { Title } = Typography;
const { Option } = Select;

const ParadaCard = ({ parada, onClick }) => {
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const getLuminance = (color) => {
    const hex = color.replace(/#/, '');
    const rgb = parseInt(hex, 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  let cardColor;
  let textColor;
  do {
    cardColor = getRandomColor();
    textColor = getLuminance(cardColor) > 180 ? '#000' : '#fff'; // Seleccionar texto blanco para colores claros
  } while (getLuminance(cardColor) < 180 || getLuminance(cardColor) > 220); // Ajustar el rango de luminancia según tus preferencias

  const cardStyle = {
    width: '14em', // Ajustar tamaño de las cards de manera responsiva
    margin: '0.8em',
    display: 'inline-block',
    verticalAlign: 'top',
    backgroundColor: cardColor,
    color: textColor,
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    position: 'relative',
  };

  const iconContainerStyle = {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: '50%',
    padding: 5,
  };

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => onClick(parada)}>
      <Card style={cardStyle} hoverable>
        <div style={iconContainerStyle}>
          <FaMapMarkedAlt color={cardColor} size={32} />
        </div>
        <Meta title={parada.nombre} description={`Grupo: ${parada.grupo}`} />
      </Card>
    </motion.div>
  );
};

const General = () => {
  const [modalAgregarVisible, setModalAgregarVisible] = useState(false);
  const [modalActualizarVisible, setModalActualizarVisible] = useState(false);
  const [modalParadaVisible, setModalParadaVisible] = useState(false);
  const [paradaSeleccionada, setParadaSeleccionada] = useState(null); // Usar null en lugar de una cadena vacía
  const [grupoSeleccionado, setGrupoSeleccionado] = useState(null);
  const [responsableSeleccionado, setResponsableSeleccionado] = useState(null);

  const handleParadaClick = (parada) => {
    setParadaSeleccionada(parada);
    setModalParadaVisible(true); // Mostrar el modal de la parada al hacer clic en una tarjeta
  };

  const handleGuardar = () => {
    // Lógica para guardar la parada con el nuevo grupo y responsable seleccionados
    setModalParadaVisible(false);
    openNotificationWithIcon('success');

  };
  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: 'Exito',
      description: 'Se Agrego Correctamente',
    });
  };

  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>  
    <Space wrap="wrap" gap="small" direction="vertical" style={{ padding: 20 }}>
      <Radio.Group defaultValue="a" buttonStyle="solid">
        <Radio.Button value="a" onClick={() => setModalAgregarVisible(true)}>Agregar Nueva Parada</Radio.Button>
        <Radio.Button value="act" onClick={() => setModalActualizarVisible(true)}>Actualizar Parada</Radio.Button>
      </Radio.Group>

      <Modal
        title="Agregar Nueva Parada"
        visible={modalAgregarVisible}
        onCancel={() => setModalAgregarVisible(false)}
        footer={[
          <Button key="cancelar" onClick={() => setModalAgregarVisible(false)}>
            Cancelar
          </Button>,
          <Button key="guardar" type="primary" onClick={handleGuardar}>
            Guardar
          </Button>,
        ]}
      >
        <div style={{ margin: '20px 0' }}>
          <Input placeholder="Dirección de la Parada" style={{ margin: '10px 0' }} />
          <Input placeholder="Responsable" style={{ margin: '10px 0' }} />
        </div>
      </Modal>

      <Modal
        title="Actualizar Parada"
        visible={modalActualizarVisible}
        onCancel={() => setModalActualizarVisible(false)}
        footer={[
          <Button key="cancelar" onClick={() => setModalActualizarVisible(false)}>
            Cancelar
          </Button>,
          <Button key="actualizar" color='green'>
            Actualizar
          </Button>,
        ]}
      >
        <div style={{ margin: '20px 0' }}>
          <Select style={{ width: 200 }}>
            <Option value="llalaguita">Llalaguita</Option>
            <Option value="kankun">Kankun</Option>
          </Select>
          <Input placeholder="Dirección de la Parada" style={{ margin: '10px 0' }} />
          <Input placeholder="Responsable" style={{ margin: '10px 0' }} />
        </div>
      </Modal>

      <Modal
        title="Detalles de la Parada"
        visible={modalParadaVisible}
        onCancel={() => setModalParadaVisible(false)}
        footer={[
          <Button key="cancelar" onClick={() => setModalParadaVisible(false)}>
            Cancelar
          </Button>,
          <Button key="guardar" type="primary" onClick={handleGuardar}>
            Guardar
          </Button>,
        ]}
      >
        <p>Nombre de la parada: {paradaSeleccionada?.nombre}</p>
        <p>Grupo asignado: {paradaSeleccionada?.grupo}</p>
        <Select
          placeholder="Asignar a grupo:"
          style={{ width: '100%', marginBottom: '1em' }}
          onChange={(value) => setGrupoSeleccionado(value)}
          value={grupoSeleccionado}
        >
          {/* Aquí va la lista de grupos */}
          <Option value="grupo1">Grupo 1</Option>
          <Option value="grupo2">Grupo 2</Option>
          {/* Agrega más opciones según sea necesario */}
        </Select>
        <Select
          placeholder="Seleccionar responsable"
          style={{ width: '100%' }}
          onChange={(value) => setResponsableSeleccionado(value)}
          value={responsableSeleccionado}
        >
          {/* Aquí va la lista de responsables */}
          <Option value="responsable1">Responsable 1</Option>
          <Option value="responsable2">Responsable 2</Option>
          {/* Agrega más opciones según sea necesario */}
        </Select>
      </Modal>

      <div style={{ maxWidth: '100%', overflowX: 'auto', whiteSpace: 'nowrap' }}>
        <h2>Paradas</h2>
        <div style={{ height: '300px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          <ParadaCard parada={{ id: 1, nombre: 'Parada 1', grupo: 'Grupo 1' }} onClick={handleParadaClick} />
          <ParadaCard parada={{ id: 2, nombre: 'Parada 2', grupo: 'Grupo 2' }} onClick={handleParadaClick} />
          <ParadaCard parada={{ id: 3, nombre: 'Parada 3', grupo: 'Grupo 3' }} onClick={handleParadaClick} />
          <ParadaCard parada={{ id: 4, nombre: 'Parada 4', grupo: 'Grupo 4' }} onClick={handleParadaClick} />
          <ParadaCard parada={{ id: 5, nombre: 'Parada 5', grupo: 'Grupo 5' }} onClick={handleParadaClick} />
          <ParadaCard parada={{ id: 6, nombre: 'Parada 6', grupo: 'Grupo 6' }} onClick={handleParadaClick} />
        </div>
      </div>
    </Space>
    </Row>
  );
};

export default General;
