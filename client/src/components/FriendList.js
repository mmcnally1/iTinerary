import React from 'react';
import { Table } from 'antd';

export default function FriendList(props) {
    const tableColumns = [
        {
            title: 'Username',
            dataIndex: 'friend',
            key: 'friend',
            render: (text, record) => <a href={`/profilePage/${record.friend}`}>{text}</a>
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
