import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import * as opencage from 'opencage-api-client';

import { postTrip } from '../fetcher.js';

export default function TripAdder(props) {
    const onFinish = (values) => {
        values.username = props.username;

        opencage
            .geocode(
                {
                    key: 'c46c23c2c22b48bf8f0b6baf4742877f',
                    limit: 1,
                    q: values.city
                }
            )
            .then(response => {
                console.log(response);
                values.lat = response.results[0].geometry.lat;
                values.long = response.results[0].geometry.lng;
                postTrip(values);
                props.displayMarkers();
            })
            .catch(err => {
                console.log(err);
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
