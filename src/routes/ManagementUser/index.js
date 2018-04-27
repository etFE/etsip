import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import EditableTable from 'components/EditableTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

@connect(({ maUser, loading }) => ({
    maUser,
    loading: loading.models.maUser,
}))
export default class ManagementUser extends PureComponent {
    constructor (props) {
        super(props)

        this.state = {
            columns: [
                {
                    title: '用户',
                    dataIndex: 'username',
                    width: 100,
                    editor: { type: 'text' },
                },
                {
                    title: 'id',
                    dataIndex: 'id',
                    width: 100,
                },
                {
                    title: 'nickname',
                    dataIndex: 'nickname',
                    width: 100,
                    editor: { type: 'text' },
                },
                {
                    title: 'roles',
                    dataIndex: 'roles',
                    width: 100,
                },
                {
                    title: 'loginCount',
                    dataIndex: 'loginCount',
                    width: 100,
                },
                {
                    title: 'loginIp',
                    dataIndex: 'loginIp',
                    width: 100,
                },
                {
                    title: 'firstMenus',
                    dataIndex: 'firstMenus',
                    width: 100,
                },
                {
                    title: 'menus',
                    dataIndex: 'menus',
                    width: 100,
                },
                {
                    title: 'secondMenus',
                    dataIndex: 'secondMenus',
                    width: 100,
                },
                {
                    title: 'mods',
                    dataIndex: 'mods',
                    width: 100,
                },
                {
                    title: 'locked',
                    dataIndex: 'locked',
                    width: 100,
                    editor: { type: 'text' },
                },
                {
                    title: 'disabled',
                    dataIndex: 'disabled',
                    width: 100,
                },
                {
                    title: 'signState',
                    dataIndex: 'signState',
                    width: 160,
                },
                {
                    title: 'updateTime',
                    dataIndex: 'updateTime',
                    width: 160,
                },
                {
                    title: 'lastSignTime',
                    dataIndex: 'lastSignTime',
                    width: 160,
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
            type: 'maUser/fetch',
        });
    }
    addData = (record) => {
        const { dispatch } = this.props;
        console.log('addData', record)
        return dispatch({
            type: 'maUser/add',
            payload: { record },
        });
    }
    updateData = (record) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'maUser/update',
            payload: { record },
        });
    }

    render() {
        const { columns } = this.state
        const { maUser, loading } = this.props;

        return (
            <PageHeaderLayout>
                <Card bordered={false}>
                    <div>
                        {/* <div}>
                        </div> */}
                        <EditableTable
                            editable
                            loading={loading}
                            dataSource={maUser.data ? maUser.data.list : []}
                            columns={columns}
                            queryData={this.queryData}
                            addData={this.addData}
                            updateData={this.updateData}
                        />
                    </div>
                </Card>
            </PageHeaderLayout>
        );
    }
}
