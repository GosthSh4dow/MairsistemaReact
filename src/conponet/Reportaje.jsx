import React, { useState } from 'react';
import { Button, Input, DatePicker, Space, Select, Table, Badge, Card, notification } from 'antd';
import { DollarOutlined, PrinterOutlined, LineChartOutlined, BarChartOutlined, AreaChartOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Option } = Select;

const Reportaje = () => {
  const [license, setLicense] = useState('');
  const [nombre, setNombre] = useState('');
  const [ci, setCi] = useState('');
  const [placa, setPlaca] = useState('');
  const [parada, setParada] = useState('');
  const [fecha, setFecha] = useState(null);
  const [mes, setMes] = useState('');
  const [costo, setCosto] = useState('');
  const [tableData, setTableData] = useState([]);

  const handleRealizarPago = () => {
    // Aquí iría la lógica para realizar el pago
    const newData = {
      key: Math.random().toString(),
      nombre,
      ci,
      placa,
      license,
      status: 'Aprobado'
    };
    setTableData([...tableData, newData]);
    notification.success({
      message: 'Pago realizado con éxito',
      description: '¿Desea imprimir su ticket?',
      btn: (
        <Button type="primary" size="small" onClick={handlePrintTicket}>
          Sí
        </Button>
      ),
      duration: 0
    });
  };

  const handlePrintTicket = () => {
    // Aquí iría la lógica para imprimir el ticket
    notification.success({
      message: 'Ticket impreso con éxito',
    });
  };

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
    },
    {
      title: 'CI',
      dataIndex: 'ci',
      key: 'ci',
    },
    {
      title: 'Placa',
      dataIndex: 'placa',
      key: 'placa',
    },
    {
      title: 'Licencia',
      dataIndex: 'license',
      key: 'license',
    },
    {
      title: 'Status de Reportaje',
      dataIndex: 'status',
      key: 'status',
      render: (text) => (
        <Badge status={text === 'Aprobado' ? 'success' : 'error'} text={text} />
      )
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: () => (
        <Button icon={<PrinterOutlined />} onClick={handlePrintTicket}>
          Imprimir Ticket
        </Button>
      )
    }
  ];

  // Dato falso para agregar a la tabla
  const fakeData = {
    key: Math.random().toString(),
    nombre: 'John Doe',
    ci: '123456',
    placa: 'ABC123',
    license: 'Licencia 1',
    status: 'Aprobado'
    
    
  };

  return (
    <div>
      <Space style={{ marginBottom: '1rem'  }}>
        <Input placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <Input placeholder="CI" value={ci} onChange={(e) => setCi(e.target.value)} />
        <Input placeholder="Placa" value={placa} onChange={(e) => setPlaca(e.target.value)} />
        <Input placeholder="Parada" value={parada} onChange={(e) => setParada(e.target.value)} />
        <Select placeholder="Licencia" value={license} onChange={(value) => setLicense(value)} style={{ width: 200 }}>
          <Option value="Licencia 1">Licencia 1</Option>
          <Option value="Licencia 2">Licencia 2</Option>
          <Option value="Licencia 3">Licencia 3</Option>
        </Select>
      </Space>

      <Space style={{ marginBottom: '1rem' }}>
        <DatePicker placeholder="Fecha" value={fecha} onChange={(date) => setFecha(date)} />
        <Input placeholder="Mes" value={mes} onChange={(e) => setMes(e.target.value)} />
        <Input placeholder="Costo" value={costo} onChange={(e) => setCosto(e.target.value)} />
        <Button type="primary" icon={<DollarOutlined />} onClick={handleRealizarPago}>
          Realizar pago
        </Button>
      </Space>

      <Table dataSource={[...tableData, fakeData]} style={{ height: '300px' }} columns={columns} pagination={false} scroll={{ y: 400 }  }
       />

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
        <motion.div whileHover={{ scale: 1.1 }}>
          <Card hoverable style={{ width: 300, backgroundColor: '#f0f2f5', marginRight: 16 }}>
            <LineChartOutlined style={{ fontSize: '2rem', color: '#1890ff' }} />
            <span>Recaudado en el Día</span>
          </Card>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }}>
          <Card hoverable style={{ width: 300, backgroundColor: '#f0f2f5', marginRight: 16 }}>
            <BarChartOutlined style={{ fontSize: '2rem', color: '#52c41a' }} />
            <span>Recaudado en el Mes</span>
          </Card>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }}>
          <Card hoverable style={{ width: 300, backgroundColor: '#f0f2f5' }}>
            <AreaChartOutlined style={{ fontSize: '2rem', color: '#f5222d' }} />
            <span>Recaudado en el Año</span>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Reportaje;
