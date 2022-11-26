import React from 'react';
import { Table, Button } from 'antd';

export default function TripTable(props) {
    const tableColumns = [
        {
            title: 'City',
            dataIndex: 'city_name',
            key: 'city_name'
        },
        {
            title: 'Start Date',
            dataIndex: 'start_date',
            key: 'start_date'
        },
        {
            title: 'End Date',
            dataIndex: 'end_date',
            key: 'end_date'
        },
        {
            key: 'edit_dates',
            render: (_, row) => (
                <Button
                    type="default"
                    onClick={() => {
                        props.setCity(row.city_name);
                        props.setEditTrip(true);
                    }}
                >
                    Edit Dates
                </Button>
            )
        },
        {
            key: 'edit_trip',
            render: (_, row) => (
                <Button
                    type="default"
                    onClick={() => {
                        props.setCity(row.city_name);
                        props.getUserPlaces(row.city_name);
                        props.setShowTrips(false);
                    }}
                >
                    Edit Trip
                </Button>
            )
        },
        {
            key: 'delete_trip',
            render: (_, row) => (
                <Button
                    type="default"
                    onClick={() => {
                        props.deleteTrip({city_name: row.city_name});
                    }}
                >
                    Delete Trip
                </Button>
            )
        }
    ];

    return (
        <>
            <Table
                columns={tableColumns}
                dataSource={props.trips}
                pagination={{ simple:true, defaultPageSize: 10, showQuickJumper: true }}
                size="small"
            />
        </>
    )

}
