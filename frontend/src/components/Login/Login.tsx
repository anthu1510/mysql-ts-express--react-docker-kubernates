
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "../../api/axios"
import {useAppSelector, useAppDispatch} from "../../app/hooks"
import { IUser, login } from "../../redux/reducers/authSlice";
import { InfoCircleOutlined } from '@ant-design/icons';
import { Col, Row, Card, Button, Form, Input} from 'antd';
import Cookies from "js-cookie"

export default function Login() {
  let navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const handleLoginSubmit = async () => {
    try {
      const data = {
        email: form.getFieldValue('email'),
        password: form.getFieldValue('password')
      }
      const isLoggedIn = await axios.post('/users/login', data);
      if(isLoggedIn.data.status) {
        // Cookies.set('accessToken', isLoggedIn.data.accessToken, { expires: 1, secure: true });
        // Cookies.set('refreshToken', isLoggedIn.data.refreshToken, { expires: 7, secure: true });
        const decoded = jwtDecode<IUser>(isLoggedIn.data.accessToken)
        dispatch(login({userId: decoded.userId, name: decoded.name, roleId: decoded.roleId}))
        navigate("/dashboard");
      }
    } catch (error) {
      console.log('error', error)
    }
};

  return (
    <Row justify='center' align="middle" style={{height: '95vh'}}>
      <Col span={6}>
        <Card title="Login">
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
              required
            >
              <Input type='password' onChange={(e) => form.setFieldsValue({password: e.target.value})} name="password" placeholder="input placeholder" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">Login</Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}

