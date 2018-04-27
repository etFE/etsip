import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import EditableTable from 'components/EditableTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

@connect(({ maSlog, loading }) => ({
    maSlog,
    loading: loading.models.maSlog,
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
            type: 'maSlog/fetch',
        });
    }

    render() {
        const { columns } = this.state
        const { maSlog, loading } = this.props;

        return (
            <PageHeaderLayout>
                <Card bordered={false}>
                    <div>
                        {/* <div className={}>
                        </div> */}
                        <EditableTable
                            loading={loading}
                            dataSource={maSlog.data.list}
                            columns={columns}
                            queryData={this.queryData}
                        />
                    </div>
                </Card>
            </PageHeaderLayout>
        );
    }
}

