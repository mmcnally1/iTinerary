import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Input } from 'antd';

import { changeUsername, changePassword } from '../fetcher.js';
import NavBar from '../components/NavBar';

const bcrypt = require('bcryptjs');

export default function AccountPage() {
    const navigate = useNavigate();
    let userProfile = useParams().user;
    
    const [activeUser, setActiveUser] = useState(sessionStorage.getItem('active user'));
    const [displayTrips, setDisplayTrips] = useState(true);
    const [displayPlaces, setDisplayPlaces] = useState(false);

    const authenticateUser = () => {
        if (activeUser != userProfile) {
            alert("You aren't authorized to access this page");
            navigate('/');
        }
    }

    useEffect(() => {
        authenticateUser();
    }, []);

    const updateEmail = (values) => {
        console.log(values.new_email);
    }

    const updatePassword = (values) => {
        bcrypt.hash(values.new_password, 8, (err, hash) => {
            if (err) {
                console.log(err);
            }
            else {
                const updateProps = {
                    username: activeUser,
                    new_password: hash
                }
                changePassword(updateProps).then((res) => {
                    res.text().then((data) => {
                        if (res.ok) {
                            console.log(JSON.parse(data).message);
                        } else {
                            alert(JSON.parse(data).message);
                        }
                    });
                });
            }
        })
    }

    const navbarProps = {
        activeUser: activeUser
    }

    return (
        <>
            <NavBar {...navbarProps} />
            <h1>Account Management</h1>
            <Form
                name="email"
                layout="horizontal"
                onFinish={updateEmail}
            >
                <Form.Item
                    label="new email"
                    name="new_email"
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button
                        htmlType="submit"
                    >Change Email Address
                    </Button>
                </Form.Item>
            </Form>
            <Form
                name="password"
                layout="horizontal"
                onFinish={updatePassword}
            >
                <Form.Item
                    label="new password"
                    name="new_password"
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button
                        htmlType="submit"
                    >Change Password
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}
