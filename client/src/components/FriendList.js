import React from 'react';
import { Table } from 'antd';

export default function FriendList(props) {
    const tableColumns = [
        {
            title: 'Username',
            dataIndex: 'friend',
            key: 'friend'
        }
    ]

    return (
        <Table
            dataSource={props.friends}
            columns={tableColumns}
            bordered
            pagination={false}
            size='small'
        />
    )
}
