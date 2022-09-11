import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from 'antd';

import { postTrip } from '../fetcher.js';

export default function TripAdder(props) {
    const onFinish = (values) => {
        values.username = props.username;
        postTrip(values).then((res) => {
            res.text().then((data) => {
                if (res.ok) {
                    console.log(JSON.parse(data).message);
                    props.displayMarkers();
                } else {
                    alert(JSON.parse(data).message);
                }
            })
        });

    }

    return (
        <Form
            name="tripAdder"
            layout="vertical"
            onFinish={onFinish}
        >
            <h2>Add a Trip </h2>
            <Form.Item
                label="City"
                name="city"
            >
            <Input />
            </Form.Item>
            <Form.Item
                label="Photo"
                name="photo"
            >
            <Input />
            </Form.Item>
            <Form.Item
                label="Trip Start Date (yyyy-mm-dd)"
                name="start_date"
            >
            <Input />
            </Form.Item>
            <Form.Item
                label="Trip End Date (yyyy-mm-dd)"
                name="end_date"
            >
            <Input />
            </Form.Item>
            <Form.Item>
                <Button
                htmlType="submit"
                >
                Add Trip
                </Button>
            </Form.Item>
        </Form>
    );
}
