import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import EditableTable from 'components/Table/EditableTable';
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
                    // width: 100,
                    editor: { type: 'text' },
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
                fetchMethod: 'maRole.query',
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
                fetchMethod: 'mockPromise',
                fetchData: record,
            },
        });
    }
    updateData = (record) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'editableTable/update',
            payload: {
                fetchMethod: 'mockPromise',
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

    render() {
        const { columns } = this.state
        const { editableTable: { dataSource }, loading } = this.props;

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
                        changeCell={this.changeCell}
                    />
                </Card>
            </PageHeaderLayout>
        );
    }
}
