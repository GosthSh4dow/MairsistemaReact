import React from 'react';
import { Button, Input, Form, Row, Col, Carousel,Typography  } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { FaUser, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion'; 


const { Text, Link , Title} = Typography;

const Login = () => {
  const [form] = Form.useForm();

  const handleLogin = () => {
   
    window.location.href = './Dashboard';
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f5ed' }}>
      <Carousel autoplay effect="fade">
        <div style={{ height: '300px', opacity: '0.5', backgroundImage: 'url(./logo.svg)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(2px)' }}></div>
        <div style={{ height: '300px', opacity: '0.5', backgroundImage: 'url(/ruta/imagen2.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(2px)' }}></div>
        <div style={{ height: '300px', opacity: '0.5', backgroundImage: 'url(/ruta/imagen3.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(2px)' }}></div>
      </Carousel>
      <motion.div // Envuelve el formulario con motion.div para aplicar animaciones
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <div style={{ maxWidth: '400px', width: '100%', padding: '20px', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
          <Row justify="center">
            <Col>
              <img src="../ruta/al/logo.svg" alt="Logo" style={{ maxWidth: '100%', marginBottom: '20px' }} />
            </Col>
          </Row>
      <Title>  <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#264653' }}>Inicia Sesión</h1></Title>
          <Form
            form={form}
            onFinish={handleLogin}
          >
            <Form.Item name="username">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Input
                  placeholder="Usuario"
                  prefix={<FaUser />}
                  size="large"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
                />
              </motion.div>
            </Form.Item>
            <Form.Item name="password">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Input.Password
                  placeholder="Contraseña"
                  prefix={<FaLock />}
                  size="large"
                  iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
                />
              </motion.div>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                style={{ backgroundColor: '#264653', borderColor: '#264653' }}
                // Agrega animación a través de la prop animate
                animate={{ scale: [1, 1.05, 1], transition: { duration: 0.3 } }}
              >
                Ingresar
              </Button>
            </Form.Item>
          </Form>
         <Text><p style={{ textAlign: 'center', color: '#264653' }}>
            Sindicato Mixto de Taxis Banderitas verdes
          </p></Text> 
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
