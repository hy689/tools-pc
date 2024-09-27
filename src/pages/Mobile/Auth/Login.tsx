import { useEffect, useRef, useState } from 'react'
import { Button, Checkbox, Form, Input, Toast } from 'antd-mobile'
import { apiLogin } from '../../../api'
import store from '../../../utils/store'
import { loginValueKey } from '../../../constants'

interface LoginProps {
    setStep: (step: number) => void
}

export default function Login(props: LoginProps) {
    const loginFormRef = useRef<any>(null)

    useEffect(() => {
        if (store.getItem(loginValueKey)) {
            const loginValues = JSON.parse(store.getItem(loginValueKey) as string)
            setRememberPassword(true)
            loginFormRef.current.setFieldsValue(loginValues)
        }
    }, [])

    const [rememberPassword, setRememberPassword] = useState(false)

    const onFinish = async (values: any) => {
        // loading
        Toast.show({
            icon: 'loading',
            content: '登录中...',
            duration: 0,
        })
        const r = await apiLogin({
            password: values.password,
            account: values.name,
            device: "WECHAT_APPLET",
            loginWay: "CELLPHONE_PWD",
            merchantId: "",
            otpToken: ""
        })

        if (!r.success) {
            Toast.show({
                icon: 'fail',
                content: r.message
            })
            return
        }
        Toast.clear()

        // 登录成功
        store.setItem('__token__', r.data)

        if (rememberPassword) {
            store.setItem(loginValueKey, JSON.stringify(values))
        }
        props.setStep(2)
    }

    return (
        <>
            <Form
                ref={loginFormRef}
                onFinish={onFinish}
                layout="vertical"
                footer={
                    <Button block type='submit' color='primary' size='large'>
                        提交
                    </Button>
                }
            >
                <Form.Item
                    name='name'
                    label='用户名'
                    rules={[{ required: true, message: '用户名不能为空' }]}
                >
                    <Input placeholder='请输入用户名' />
                </Form.Item>

                <Form.Item
                    name='password'
                    label='密码'
                    rules={[{ required: true, message: '密码不能为空' }]}
                >
                    <Input placeholder='请输入密码' />
                </Form.Item>

            </Form>
            <Checkbox checked={rememberPassword} onChange={(e) => { console.log(e); setRememberPassword(e) }} >是否记住密码</Checkbox>

        </>
    )
}