import React, { useEffect } from 'react';
import { Button, Form, Input } from 'antd';

import { postTrip } from '../fetcher.js';

export default function TripAdder(props) {
    const onFinish = (values) => {
        values.username = props.username;
        console.log(values);
        console.log(JSON.stringify(values));
        postTrip(values);
        props.displayMarkers();
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
                label="Latitude"
                name="lat"
            >
            <Input />
            </Form.Item>
            <Form.Item
                label="Longitude"
                name="long"
            >
            <Input />
            </Form.Item>
            <Form.Item
                label="Date Visited"
                name="start_date"
            >
            <Input />
            </Form.Item>
            <Form.Item
                label="Date Left"
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
