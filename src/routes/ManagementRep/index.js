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
                    title: 'uid',
                    dataIndex: 'uid',
                    width: 100,
                },
                {
                    title: 't',
                    dataIndex: 't',
                    width: 100,
                },
                {
                    title: 'source',
                    dataIndex: 'source',
                    width: 160,
                },
                {
                    title: 'ip',
                    dataIndex: 'ip',
                    width: 120,
                },
                {
                    title: '信息',
                    dataIndex: 'msg',
                    width: 120,
                },
                {
                    title: '标签',
                    dataIndex: 'tag',
                    width: 120,
                },
                {
                    title: '创建时间',
                    dataIndex: 'createTime',
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
                fetchMethod: 'maRep.query',
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

