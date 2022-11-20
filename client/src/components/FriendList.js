import React from 'react';
import { Table, Button } from 'antd';

export default function FriendList(props) {
    const tableColumns = [
        {
            title: 'Username',
            dataIndex: 'friend',
            key: 'friend',
            render: (text, record) => <a href={`/profilePage/${record.friend}`}>{text}</a>
        },
        {
            key: 'delete',
            render: (_, row) => (
                <Button
                    type="default"
                    onClick={() => props.handleRemoveFriend(
                        {
                            user: props.username,
                            friend: row.friend
                        }
                    )}
                >
                Remove Friend
                </Button>
            )
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
