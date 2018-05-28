import React, { PureComponent } from 'react'
import { connect } from 'dva';
import { Card } from 'antd';
import EditableTable from 'components/Table/EditableTable.js'
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

@connect(({ dictionary, loading }) => ({
    dictionary,
    loading: loading.models.dictionary,
}))
export default class ReportLayout extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {
                    title: '字典编码',
                    dataIndex: 'dictCode',
                    width: 120,
                    editor: {
                        type: 'text',
                        onlyNew: true,
                    },
                },
                {
                    title: '字典名称',
                    dataIndex: 'dictName',
                    width: 140,
                    editor: {
                        type: 'text',
                    },
                },
                {
                    title: '字典SQL',
                    dataIndex: 'dictBody',
                    editor: {
                        type: 'textarea',
                    },
                },
            ],
        }
    }


    componentDidMount () {
        this.queryData()
    }

    queryData = () => {
        const { dispatch } = this.props
        dispatch({
            type: 'dictionary/fetch',
        })
    }
    addNewRecord = () => {
        const { dispatch } = this.props
        dispatch({
            type: 'dictionary/addNewRecord',
        })
    }
    addData = (record) => {
        const { dispatch } = this.props
        dispatch({
            type: 'dictionary/add',
            payload: record,
        })
    }
    updateData = (record) => {
        const { dispatch } = this.props
        dispatch({
            type: 'dictionary/update',
            payload: record,
        })
    }
    deleteData = (record) => {
        const { dispatch } = this.props
        dispatch({
            type: 'dictionary/delete',
            payload: record,
        })
    }
    changeCell = (msg) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'dictionary/changeCell',
            payload: msg,
        });
    }

    render () {
        const { dictionary: { dataSource }, loading } = this.props
        return (
            <PageHeaderLayout>
                <Card bordered={false}>
                    <EditableTable
                        dataSource={dataSource}
                        columns={this.state.columns}
                        loading={loading}
                        queryData={this.queryData}
                        addNewRecord={this.addNewRecord}
                        addData={this.addData}
                        updateData={this.updateData}
                        deleteData={this.deleteData}
                        changeCell={this.changeCell}
                    />
                </Card>
            </PageHeaderLayout>
        )
    }
}
