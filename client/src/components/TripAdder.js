import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from 'antd';

import { postTrip } from '../fetcher.js';

export default function TripAdder(props) {
    const onFinish = (values) => {
        values.username = props.username;
        postTrip(values).then(() => {
            props.displayMarkers();
        });

    }

    return (
        <Form
            name="tripAdder8-23-22"
            layout="vertical"
            onFinish={onFinish}
        >
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
