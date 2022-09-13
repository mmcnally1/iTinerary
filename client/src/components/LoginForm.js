import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

import { authenticateUser } from '../fetcher.js';

export default function LoginForm(props) {
    const navigate = useNavigate();

    const onLogin = (values) => {
        authenticateUser(values.username, values.password).then((res) => {
            console.log(res);
            if (res.results.length == 1) {
                sessionStorage.setItem('active user', res.results[0].username);
                navigate(`/profile/${res.results[0].username}`);
            } else {
                alert('Invalid username or password')
            }
        });
    }

    return (
        <>
            <h1>Login</h1>
            <Form
                name="login"
                layout="vertical"
                onFinish={onLogin}
            >
                <Form.Item
                    label="Username"
                    name="username"
                >
                <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                >
                <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button
                    htmlType="submit"
                    >Login
                    </Button>
                </Form.Item>
            </Form>
            <button
                type="submit"
                onClick={() => props.setSigningUp(true)}
            > I need to sign up
            </button>
        </>
    );
}
