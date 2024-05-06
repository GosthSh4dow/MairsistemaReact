import React, { useState } from 'react';
import { Card, Calendar, Alert, Row, Col, Button, Modal } from 'antd';
import { motion } from 'framer-motion';
import { CalendarOutlined, TeamOutlined, CarOutlined, CheckOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Meta } = Card;

const HojaRuta = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const locale = {
    monthNames: [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    today: 'Hoy',
  };

  const handleSelectDate = (date) => {
    setSelectedDate(date);
  };

  const handleButtonClick = () => {
    if (selectedDate) {
      Modal.success({
        title: 'Registrado',
        content: 'Su reportaje ha sido registrado con éxito.',
      });
    }
  };

  return (
    <Row gutter={16} justify="center" style={{ padding: '20px' }}>
      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <motion.div
            whileHover={{ scale: 1.1 }}
            style={{ width: 150 }}
          >
            <Card
              hoverable
              style={{ width: 150, backgroundColor: '#FFB6C1' }}
              cover={<CalendarOutlined style={{ fontSize: '36px', textAlign: 'center' }} />}
            >
              <Meta title="Mes" />
            </Card>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            style={{ width: 150 }}
          >
            <Card
              hoverable
              style={{ width: 150, backgroundColor: '#ADD8E6' }}
              cover={<TeamOutlined style={{ fontSize: '36px', textAlign: 'center' }} />}
            >
              <Meta title="Grupo" />
            </Card>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            style={{ width: 150 }}
          >
            <Card
              hoverable
              style={{ width: 150, backgroundColor: '#FFD700' }}
              cover={<CarOutlined style={{ fontSize: '36px', textAlign: 'center' }} />}
            >
              <Meta title="Ruta" />
            </Card>
          </motion.div>
          <Button
            type="primary"
            danger
            style={{ marginTop: '10px' }}
            onClick={handleButtonClick}
            disabled={!selectedDate}
            icon={<CheckOutlined />}
          >
            Marcar Reportaje
          </Button>
        </div>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
        <div style={{ maxWidth: '800px', maxHeight: 'calc(100vh - 100px)', overflow: 'auto', border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
          <Calendar locale={locale} onSelect={handleSelectDate} fullscreen={false} />
        </div>
        {selectedDate && (
          <Alert message={`Fecha seleccionada: ${selectedDate.format('YYYY-MM-DD')}`} type="info" style={{ marginTop: '20px' }} />
        )}
      </Col>
    </Row>
  );
};

export default HojaRuta;
