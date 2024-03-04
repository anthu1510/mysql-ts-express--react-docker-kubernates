
import { InfoCircleOutlined } from '@ant-design/icons';
import { Col, Row, Flex, Button, Form, Input} from 'antd';

function App() {

  const [form] = Form.useForm();

  return (
    <Row justify='center' align="middle">
      <Col span={6}>
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item label="Email" required tooltip="This is a required field">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item
            label="Password"
            tooltip={{ title: 'Tooltip with customize icon', icon: <InfoCircleOutlined /> }}
          >
            <Input type='password' placeholder="input placeholder" />
          </Form.Item>
          <Form.Item>
            <Button type="primary">Submit</Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

export default App
