import React from 'react';
import { Table, Button } from 'antd';

export default function TripTable(props) {
    const tableColumns = [
        {
            title: 'Place',
            dataIndex: 'place_name',
            key: 'place_name'
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description'
        },
        {
            key: 'edit',
            render: (_, row) => (
                <Button
                    type="default"
                    onClick={() => {
                        props.setEditPlace(true);
                        props.setPlace(row.place_name);
                        props.setDescription(row.description);
                    }}
                >
                    Edit Description
                </Button>
            )
        },
        {
            key: 'delete',
            render: (_, row) => (
                <Button
                    type="default"
                    onClick={() => {
                        props.deletePlace({place: row.place_name});
                    }}
                >
                    Delete Place
                </Button>
            )
        }
    ];

    return (
        <>
            <Table
                columns={tableColumns}
                dataSource={props.places}
                pagination={{ simple:true, defaultPageSize: 10, showQuickJumper: true }}
                size="small"
            />
        </>
    )

}
