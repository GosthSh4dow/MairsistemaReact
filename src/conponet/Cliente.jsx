import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, Select, Card, message, Modal, Steps, Result } from 'antd';
import { UserOutlined, EnvironmentOutlined } from '@ant-design/icons';

const { Step } = Steps;
const { Option } = Select;

const Cliente = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showMapModal, setShowMapModal] = useState(false);
  const [price, setPrice] = useState(null);
  const [estimatedTime, setEstimatedTime] = useState(null);

  const onFinish = (values) => {
    setLoading(true);
    setTimeout(() => {
      console.log('Valores del formulario:', values);
      message.success('¡Reserva exitosa!');
      setCurrentStep(1); // Avanzar al siguiente paso
      setLoading(false);
    }, 1000);
  };

  const handleDriverSelect = (value) => {
    setSelectedDriver(value);
  };

  const drivers = [
    { id: 1, name: 'Juan Pérez', phone: '123456789', plate: 'ABC123', rating: 4.8 },
    { id: 2, name: 'María González', phone: '987654321', plate: 'XYZ987', rating: 4.6 },
    // Agrega más conductores aquí si es necesario
  ];

  const handleMapClick = (e) => {
    setSelectedLocation(e.latlng);
    setShowMapModal(false);
  };

  const handleConfirmBooking = () => {
    // Simular confirmación de reserva por el conductor
    Modal.confirm({
      title: 'Confirmar Reserva',
      content: '¿Deseas confirmar la reserva?',
      onOk: () => {
        // Simular costo y tiempo estimado
        setPrice('$20');
        setEstimatedTime('10 minutos');
        setCurrentStep(2); // Avanzar al siguiente paso
      },
      onCancel: () => message.warning('Reserva cancelada por el conductor.')
    });
  };

  const handleRejectBooking = () => {
    setCurrentStep(3); // Mostrar resultado de rechazo
  };

  const handleSelectAnotherDriver = () => {
    setCurrentStep(0); // Volver al paso 1 para seleccionar otro conductor
  };

  const handleResetSteps = () => {
    setCurrentStep(0); // Volver al inicio
    form.resetFields(); // Limpiar los campos del formulario
  };

  return (
    <div style={{ backgroundColor: '#fff', padding: '20px' }}>
      <Steps current={currentStep} style={{ marginBottom: '20px' }}>
        <Step title="Reservar Viaje" />
        <Step title="Esperar Confirmación" />
        <Step title="Resultado" />
      </Steps>
      {currentStep === 0 && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '50%' }}>
            <Card title="Reservar Viaje">
              <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item
                  name="pickupLocation"
                  label="Ubicación de Recogida"
                  rules={[{ required: true, message: 'Por favor ingresa la ubicación de recogida' }]}
                >
                  <Input
                    prefix={<EnvironmentOutlined />}
                    placeholder="Ubicación de Recogida"
                  />
                </Form.Item>
                <Form.Item
                  name="destination"
                  label="Destino"
                  rules={[{ required: true, message: 'Por favor ingresa el destino' }]}
                >
                  <Input prefix={<EnvironmentOutlined />} placeholder="Destino" />
                </Form.Item>
                <Form.Item
                  name="pickupTime"
                  label="Fecha y Hora de Recogida"
                  rules={[{ required: true, message: 'Por favor selecciona la fecha y hora de recogida' }]}
                >
                  <DatePicker showTime format="YYYY-MM-DD HH:mm" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                  name="driver"
                  label="Seleccionar Conductor"
                  rules={[{ required: true, message: 'Por favor selecciona un conductor' }]}
                >
                  <Select placeholder="Seleccionar Conductor" onChange={handleDriverSelect}>
                    {drivers.map((driver) => (
                      <Option key={driver.id} value={driver.id}>
                        {driver.name} - {driver.phone}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Reservar
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </div>
          {selectedDriver && (
            <div style={{ width: '50%', marginLeft: '20px' }}>
              <Card title="Detalles del Conductor Seleccionado">
                <p>Nombre: {drivers.find((driver) => driver.id === selectedDriver).name}</p>
                <p>Número de Teléfono: {drivers.find((driver) => driver.id === selectedDriver).phone}</p>
                <p>Placa del Vehículo: {drivers.find((driver) => driver.id === selectedDriver).plate}</p>
                <p>Calificación del Conductor: {drivers.find((driver) => driver.id === selectedDriver).rating}</p>
              </Card>
            </div>
          )}
        </div>
      )}
      {currentStep === 1 && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type="primary" onClick={handleConfirmBooking} loading={loading}>
            Confirmar Reserva
          </Button>
          <Button style={{ marginLeft: '10px' }} onClick={handleRejectBooking}>
            Rechazar Reserva
          </Button>
        </div>
      )}
      {currentStep === 2 && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Card title="Costo y Tiempo Estimado">
            <p>Costo del Viaje: {price}</p>
            <p>Tiempo Estimado de Llegada: {estimatedTime}</p>
            <Button type="primary" onClick={() => setCurrentStep(3)}>Aceptar</Button>
            <Button style={{ marginLeft: '10px' }} onClick={handleSelectAnotherDriver}>
              Seleccionar Otro Conductor
            </Button>
          </Card>
        </div>
      )}
      {currentStep === 3 && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Result
            status="error"
            title="El móvil no se encuentra disponible"
            subTitle="Por favor, selecciona otro conductor."
            extra={
              <Button type="primary" onClick={handleResetSteps}>
                Regresar
              </Button>
            }

     
          />
        </div>
      )}
      
    </div>
  );
};

export default Cliente;
