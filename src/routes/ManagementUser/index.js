import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import EditableTable from 'components/EditableTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

@connect(({ editableTable, loading }) => ({
    editableTable,
    loading: loading.models.editableTable,
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
            type: 'editableTable/fetch',
            payload: {
                fetchMethod: 'maUser.query',
            },
        });
    }
    addNewRecord = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'editableTable/addNewRecord',
            payload: {},
        })
    }
    addData = (record) => {
        const { dispatch } = this.props;
        return dispatch({
            type: 'editableTable/add',
            payload: {
                fetchMethod: 'maUser.add',
                fetchData: record,
            },
        });
    }
    updateData = (record) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'editableTable/update',
            payload: {
                fetchMethod: 'maUser.update',
                fetchData: record,
            },
        });
    }

    deleteData = (record) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'editableTable/delete',
            payload: {
                fetchMethod: 'mockPromise',
                fetchData: record,
            },
        });
    }

    changeCell = (msg) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'editableTable/changeCell',
            payload: msg,
        });
    }

    operations = (record) => ([
        {
            // text: () => {
            // 写成动态的根据 record 执行不同的方法
            // },
            text: '禁用',
            handleClick: () => {
                // const { s_key } = record
                // const { dispatch } = this.props
                console.log('禁用')
            },
        },
    ])

    render() {
        const { columns } = this.state
        const { editableTable: { dataSource }, loading } = this.props;

        return (
            <PageHeaderLayout>
                <Card bordered={false}>
                    <div>
                        {/* <div}>
                        </div> */}
                        <EditableTable
                            editable
                            loading={loading}
                            dataSource={dataSource}
                            columns={columns}
                            queryData={this.queryData}
                            addData={this.addData}
                            updateData={this.updateData}
                            deleteData={this.deleteData}
                            addNewRecord={this.addNewRecord}
                            operations={this.operations}
                            changeCell={this.changeCell}
                        />
                    </div>
                </Card>
            </PageHeaderLayout>
        );
    }
}
