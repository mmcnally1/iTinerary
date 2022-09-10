import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

import { addUser } from '../fetcher.js';

export default function SignUpForm() {
    const navigate = useNavigate();

    const onSignUp = (values) => {
        if (!values.password) {
            alert('Please choose a password');
            return;
        }
        if (!values.username) {
            alert('Please choose a username');
            return;
        }
        if (values.password.length < 5) {
            alert('Password must be at least 5 characters');
            return;
        }
        if (values.username.length < 3) {
            alert('Username must be at least 3 characters');
            return;
        }
        addUser(values).then((res) => {
            res.text().then((data) => {
                if (res.ok) {
                    console.log(JSON.parse(data).message);
                    sessionStorage.setItem('active user', values.username);
                    navigate('/profile');
                } else {
                    alert(JSON.parse(data).message);
                }
            });
        });
    }

    return (
            <Form
                name="signup"
                layout="vertical"
                onFinish={onSignUp}
            >
                <Form.Item
                    label="Username"
                    name="username"
                >
                <Input />
                </Form.Item>
                <Form.Item
                    label="Bio"
                    name="bio"
                >
                <Input />
                </Form.Item>
                <Form.Item
                    label="Profile Pic"
                    name="photo"
                >
                <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                >
                <Input />
                </Form.Item>
                <Form.Item>
                    <Button
                    htmlType="submit"
                    >Sign Up
                    </Button>
                </Form.Item>
            </Form>
    );
}