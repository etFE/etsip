import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Card } from 'antd'
import EditableTable from 'components/Table/EditableTable'
import EditCellText from 'components/Table/EditableTableCell/EditCellText'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'

const defaultRow = {
    id: 2,
    signState: 0,
    lastSignTime: '',
    createTime: '',
    updateTime: '',
    locked: false,
    disabled: false,
    loginIp: '',
    loginCount: 0,
    roles: null,
    mods: null,
    menus: null,
    firstMenus: null,
    secondMenus: null,
    slat: 5,
    password: '123456',
}

@connect(({ table, loading }) => ({
    table,
    loading: loading.models.table,
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
                    title: '昵称',
                    dataIndex: 'nickname',
                    width: 100,
                    editor: { type: 'text' },
                },
                {
                    title: '角色',
                    dataIndex: 'roles',
                    width: 100,
                },
                {
                    title: '密码',
                    dataIndex: 'password',
                    width: 100,
                    editor: { type: 'text' },
                },
                {
                    title: 'loginCount',
                    dataIndex: 'loginCount',
                    width: 100,
                },
                {
                    title: '登录IP',
                    dataIndex: 'loginIp',
                    width: 100,
                },
                {
                    title: 'menus',
                    dataIndex: 'menus',
                    width: 100,
                },
                {
                    title: 'firstMenus',
                    dataIndex: 'firstMenus',
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
                    editor: { type: 'checkbox' },
                },
                {
                    title: 'disabled',
                    dataIndex: 'disabled',
                    width: 100,
                    editor: { type: 'checkbox' },
                },
                {
                    title: 'signState',
                    dataIndex: 'signState',
                    width: 160,
                },
                {
                    title: '更新时间',
                    dataIndex: 'updateTime',
                    width: 160,
                },
                {
                    title: '最后登录时间',
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
            type: 'table/fetch',
            payload: {
                fetchMethod: 'maUser.query',
            },
        });
    }
    addNewRecord = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'table/addNewRecord',
            payload: { defaultRow },
        })
    }
    addData = (record) => {
        const { dispatch } = this.props;
        return dispatch({
            type: 'table/add',
            payload: {
                fetchMethod: 'maUser.add',
                fetchData: record,
            },
        });
    }
    updateData = (record) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'table/update',
            payload: {
                fetchMethod: 'maUser.update',
                fetchData: record,
            },
        });
    }

    deleteData = (record) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'table/delete',
            payload: {
                fetchMethod: 'maUser.delete',
                fetchData: record,
            },
        });
    }

    changeCell = (msg) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'table/changeCell',
            payload: msg,
        });
    }

    operations = (record) => ([
        {
            text: () => {
                return record.disabled ? '启用' : '禁用'
            },
            handleClick: () => {
                const { s_key, id } = record
                const { dispatch } = this.props

                dispatch({
                    type: 'table/fetchAndTodo',
                    payload: {
                        fetchMethod: 'maUser.disable',
                        fetchData: { id },
                    },
                    callback: (res) => {

                    },
                })
            },
        },
    ])

    render() {
        const { columns } = this.state
        const { table: { dataSource }, loading } = this.props;

        return (
            <PageHeaderLayout>
                <Card bordered={false}>
                    <EditableTable
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
                </Card>
            </PageHeaderLayout>
        );
    }
}
