import React from 'react';
import { Table, Button } from 'antd';

export default function FriendRequests(props) {
    const tableColumns = [
        {
            title: 'Username',
            dataIndex: 'requester',
            key: 'requester'
        },
        {
            key: 'accept',
            render: (_, row) => (
                <Button
                    type="default"
                    onClick={() => props.handleConfirmFriendRequest(
                        {
                            requester: row.requester,
                            requested: props.username
                        }
                    )}
                >
                Accept
                </Button>
            ),
        },
        {
            key: 'deny',
            render: (_, row) => (
                <Button
                    type="default"
                    onClick={() => props.handleDenyFriendRequest(
                        {
                            requester: row.requester,
                            requested: props.username
                        }
                    )}
                >
                Deny
                </Button>
            ),
        },
    ]

    return (
        <Table
            title={() => "Pending Friend Requests"}
            dataSource={props.friendRequests}
            columns={tableColumns}
            bordered
            pagination={false}
            size='small'
        />
    )
}
