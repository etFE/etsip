import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import QueryTable from 'components/Table/QueryTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

@connect(({ table, loading }) => ({
    table,
    loading: loading.models.table,
}))
export default class ManagementSlog extends PureComponent {
    constructor (props) {
        super(props)

        this.state = {
            columns: [
                {
                    title: '用户',
                    dataIndex: 'username',
                    width: 100,
                },
                {
                    title: 'nickname',
                    dataIndex: 'nickname',
                    width: 100,
                },
                {
                    title: 'id',
                    dataIndex: 'id',
                    width: 100,
                },
                {
                    title: 'password',
                    dataIndex: 'password',
                    width: 100,
                },
                {
                    title: 'salt',
                    dataIndex: 'salt',
                    width: 100,
                },
                {
                    title: 'loginIp',
                    dataIndex: 'loginIp',
                    width: 100,
                },
                {
                    title: 'disabled',
                    dataIndex: 'disabled',
                    width: 160,
                    render: (text) => (text ? '是' : '否'),
                },
                {
                    title: '创建时间',
                    dataIndex: 'createTime',
                    width: 160,
                },
                {
                    title: 'lastSignTime',
                    dataIndex: 'lastSignTime',
                    width: 160,
                },
                {
                    title: 'updateTime',
                    dataIndex: 'updateTime',
                    width: 160,
                },
            ],
        }
    }

    componentDidMount() {
        this.queryData()
    }

    queryData = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'table/fetch',
            payload: {
                fetchMethod: 'maMod.query',
            },
        });
    }

    render() {
        const { columns } = this.state
        const { table: { dataSource }, loading } = this.props;

        return (
            <PageHeaderLayout>
                <Card bordered={false}>
                    <QueryTable
                        loading={loading}
                        dataSource={dataSource}
                        columns={columns}
                        queryData={this.queryData}
                    />
                </Card>
            </PageHeaderLayout>
        );
    }
}

