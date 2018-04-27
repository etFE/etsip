import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
    Card,
    Button,
} from 'antd';
import EditableTable from 'components/EditableTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './index.less';

// const defaultRow = {
//     dataIndex: '', // 字段名
//     title: '', // 显示名
//     isShow: true, // 是否展示
//     align: 'left', // 对齐方式 'left' 'center' 'right'
//     width: 'auto', // 宽度
//     sorter: false, // 是否可以排序
//     fixed: 'false', // 固定列方式 'false'不固定 'left'向左固定 'right'向右固定
//     children: [],
// }
const defaultRow = {
    dataIndex: '',
    title: '',
    isShow: true,
    align: 'left',
    width: 'auto',
    sorter: false,
    fixed: 'false',
}
const cols = [
    {
        title: '字段名',
        dataIndex: 'dataIndex',
        editor: { type: 'text' },
        width: 120,
    },
    {
        title: '显示名',
        dataIndex: 'title',
        editor: { type: 'text' },
        width: 120,
    },
    {
        title: '是否显示',
        dataIndex: 'isShow',
        editor: { type: 'checkbox' },
        width: 120,
    },
    {
        title: '对齐方式',
        dataIndex: 'align',
        editor: {
            type: 'select',
            options: [
                { value: 'left', text: 'left' },
                { value: 'right', text: 'right' },
                { value: 'center', text: 'center' },
            ],
        },
        width: 120,
    },
    {
        title: '列宽度',
        dataIndex: 'width',
        editor: { type: 'text' },
        width: 120,
    },
    {
        title: '排序功能',
        dataIndex: 'sorter',
        editor: { type: 'checkbox' },
        width: 120,
    },
    {
        title: '固定列',
        dataIndex: 'fixed',
        editor: {
            type: 'select',
            options: [
                { value: 'false', text: '不固定' },
                { value: 'left', text: '向左固定' },
                { value: 'right', text: '向右固定' },
            ],
        },
        width: 120,
    },
]

@connect(({ report, loading }) => ({
    report,
    loading: loading.models.report,
}))
export default class ConfigHeader extends PureComponent {
    constructor (props) {
        super(props)

        this.state = {
            columns: cols,
        }
    }

    componentDidMount () {
        this.queryData()
    }

    queryData = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'report/fetch',
        })
    }
    addNewRecord = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'report/addNewRecord',
            payload: { defaultRow },
        })
    }
    addData = (record) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'report/add',
            payload: { record },
        });
    }
    updateData = (record) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'report/update',
            payload: { record },
        });
    }
    deleteData = (record) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'report/delete',
            payload: { record },
        });
    }

    changeCell = (msg) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'report/changeCell',
            payload: msg,
        });
    }

    // 自定义操作
    operations = (record) => ([
        {
            text: '添加子列',
            handleClick: () => {
                const { s_key } = record
                const { dispatch } = this.props

                dispatch({
                    type: 'report/loopDataAndTodo',
                    callback: (curRecord) => {
                        if (curRecord.s_key === s_key) {
                            curRecord.children = curRecord.children || []
                            const lastRow = curRecord.children[curRecord.children.length - 1]
                            let endKey = '1'
                            if (lastRow && lastRow.s_key) {
                                const keyArr = lastRow.s_key.split('-')
                                endKey = keyArr[keyArr.length - 1] * 1 + 1
                            }

                            curRecord.children.push({
                                ...defaultRow,
                                s_key: `${curRecord.s_key}-${endKey}`,
                                s_editable: true,
                                s_newrow: true,
                            })
                        }
                    },
                });
            },
        },
    ])

    render() {
        const { report: { dataSource } } = this.props

        return (
            <PageHeaderLayout>
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListForm} />
                        <EditableTable
                            dataSource={dataSource}
                            columns={this.state.columns}
                            queryData={this.queryData}
                            addNewRecord={this.addNewRecord}
                            addData={this.addData}
                            updateData={this.updateData}
                            deleteData={this.deleteData}
                            changeCell={this.changeCell}
                            operations={this.operations}
                            editable
                        />
                    </div>
                </Card>
            </PageHeaderLayout>
        );
    }
}

