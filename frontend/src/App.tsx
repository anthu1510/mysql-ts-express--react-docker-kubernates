
import axios from "./api/axios"
import { InfoCircleOutlined } from '@ant-design/icons';
import { Col, Row, Card, Button, Form, Input} from 'antd';

function App() {

  const [form] = Form.useForm();

  const handleLoginSubmit = async () => {
    try {
      const data = {
        email: form.getFieldValue('email'),
        password: form.getFieldValue('password')
      }
      const isLoggedIn = await axios.post('/users/login', data);
      console.log('success', isLoggedIn.data)
    } catch (error) {
      console.log('error', error)
    }
};

  return (
    <Row justify='center' align="middle">
      <Col span={6}>
        <Card title="Card title">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleLoginSubmit}
          >
            <Form.Item label="Email" required tooltip="This is a required field">
              <Input name="email" onChange={(e) => form.setFieldsValue({email: e.target.value})} placeholder="input placeholder" />
            </Form.Item>
            <Form.Item
              label="Password"
              tooltip={{ title: 'Tooltip with customize icon', icon: <InfoCircleOutlined /> }}
            >
              <Input type='password' onChange={(e) => form.setFieldsValue({password: e.target.value})} name="password" placeholder="input placeholder" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}

export default App
