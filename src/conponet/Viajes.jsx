import React, { useState } from 'react';
import { Card, List, Button, Modal, message, Avatar, Divider, Tabs, Badge, Tooltip, Form, Input } from 'antd';

const { TabPane } = Tabs;
const { Meta } = Card;

const Viajes = () => {
  const [reservasPendientes, setReservasPendientes] = useState([
    { id: 1, cliente: 'Cliente 1', ubicacionRecogida: 'Ubicación 1', destino: 'Destino 1', fechaRecogida: '2024-05-10 08:00' },
    { id: 2, cliente: 'Cliente 2', ubicacionRecogida: 'Ubicación 2', destino: 'Destino 2', fechaRecogida: '2024-05-11 09:00' },
    // Agregar más reservas pendientes si es necesario
  ]);
  const [reservasRealizadas, setReservasRealizadas] = useState([]);
  const [reservasRechazadas, setReservasRechazadas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [precioViaje, setPrecioViaje] = useState(null);
  const [tiempoEstimado, setTiempoEstimado] = useState(null);

  const handleConfirmarReserva = (reservaId, form) => {
    mostrarModalPrecioTiempo(form);
  };

  const handleRechazarReserva = (reservaId, motivoRechazo) => {
    // Simulación de rechazo de reserva
    Modal.confirm({
      title: 'Rechazar Reserva',
      content: (
        <div>
          <p>¿Estás seguro de que quieres rechazar esta reserva?</p>
          <Form form={form}>
            <Form.Item
              name="motivo"
              label="Motivo del Rechazo"
              rules={[{ required: true, message: 'Por favor ingresa el motivo del rechazo' }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </div>
      ),
      onOk: () => {
        const reservaRechazada = reservasPendientes.find(reserva => reserva.id === reservaId);
        setReservasPendientes(reservasPendientes.filter(reserva => reserva.id !== reservaId));
        setReservasRechazadas([...reservasRechazadas, { ...reservaRechazada, motivoRechazo }]);
        message.warning('Reserva rechazada');
      }
    });
  };

  const mostrarModalPrecioTiempo = (form) => {
    setModalVisible(true);
    form.resetFields(); // Reiniciar los campos del formulario
  };

  const handleModalOk = (form) => {
    form.validateFields().then(values => {
      const reservaConfirmada = reservasPendientes.find(reserva => reserva.id === values.reservaId);
      setPrecioViaje(values.precio);
      setTiempoEstimado(values.tiempoEstimado);
      setReservasPendientes(reservasPendientes.filter(reserva => reserva.id !== values.reservaId));
      setReservasRealizadas([...reservasRealizadas, reservaConfirmada]);
      setModalVisible(false);
      message.success('Reserva confirmada exitosamente');
    }).catch(errorInfo => {
      console.log('Validation Failed:', errorInfo);
    });
  };

  return (
    <div style={{ backgroundColor: '#fff', padding: '20px' }}>
      <h1 style={{ marginTop: 0 }}>Reservas</h1>
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab={<span>Pendientes <Badge count={reservasPendientes.length} style={{ backgroundColor: '#f50' }} /></span>} key="1">
          <ListadoReservas
            reservas={reservasPendientes}
            handleConfirmarReserva={handleConfirmarReserva}
            handleRechazarReserva={handleRechazarReserva}
            loading={loading}
            form={form}
          />
        </TabPane>
        <TabPane tab={<span>Realizadas <Badge count={reservasRealizadas.length} style={{ backgroundColor: '#87d068' }} /></span>} key="2">
          <ListadoReservasPequeno reservas={reservasRealizadas} tipo="Realizadas" />
        </TabPane>
        <TabPane tab={<span>Rechazadas <Badge count={reservasRechazadas.length} style={{ backgroundColor: '#108ee9' }} /></span>} key="3">
          <ListadoReservasPequeno reservas={reservasRechazadas} tipo="Rechazadas" />
        </TabPane>
      </Tabs>
      <Modal
        title="Detalle del Viaje"
        visible={modalVisible}
        onOk={() => handleModalOk(form)}
        onCancel={() => setModalVisible(false)}
      >
        <Form form={form}>
          <Form.Item name="reservaId" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            name="precio"
            label="Precio del Viaje"
            rules={[{ required: true, message: 'Por favor ingresa el precio del viaje' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="tiempoEstimado"
            label="Tiempo Estimado de Llegada a Recoger"
            rules={[{ required: true, message: 'Por favor ingresa el tiempo estimado de llegada a recoger' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

const ListadoReservas = ({ reservas, handleConfirmarReserva, handleRechazarReserva, loading, form }) => (
  <List
    grid={{ gutter: 16, column: 2 }}
    dataSource={reservas}
    renderItem={reserva => (
      <List.Item>
        <Card
          title={`Cliente: ${reserva.cliente}`}
          extra={<Button type="primary" onClick={() => {
            handleConfirmarReserva(reserva.id, form);
            form.setFieldsValue({ reservaId: reserva.id });
          }}>Confirmar</Button>}
        >
          <Meta
            avatar={<Avatar icon="user" />}
            title={`Ubicación de Recogida: ${reserva.ubicacionRecogida}`}
            description={`Destino: ${reserva.destino}`}
          />
          <Divider />
          <p>Fecha y Hora de Recogida: {reserva.fechaRecogida}</p>
          <Button onClick={() => handleRechazarReserva(reserva.id)}>Rechazar</Button>
        </Card>
      </List.Item>
    )}
  />
);

const ListadoReservasPequeno = ({ reservas, tipo }) => (
  <List
    dataSource={reservas}
    renderItem={reserva => (
      <List.Item>
        <Tooltip title={`Motivo del Rechazo: ${reserva.motivoRechazo}`}>
          <Card
            title={`Cliente: ${reserva.cliente}`}
            style={{ width: 300 }}
          >
            <p>Ubicación de Recogida: {reserva.ubicacionRecogida}</p>
            <p>Destino: {reserva.destino}</p>
            <p>Fecha y Hora de Recogida: {reserva.fechaRecogida}</p>
          </Card>
        </Tooltip>
      </List.Item>
    )}
  />
);

export default Viajes;
