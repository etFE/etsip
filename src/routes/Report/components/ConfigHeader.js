import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {
    Button,
    // Modal,
    // Input,
} from 'antd';
import EditableTable from 'components/Table/EditableTable';

import styles from './ConfigHeader.less';

// const { TextArea } = Input

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
                { value: 'left', text: '向左对齐' },
                { value: 'right', text: '向右对齐' },
                { value: 'center', text: '居中' },
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

@connect(({ table, loading }) => ({
    table,
    loading: loading.models.table,
}))
export default class ConfigHeader extends PureComponent {
    constructor (props) {
        super(props)

        this.state = {
            columns: cols,
            // jsonVisible: false,
        }
    }

    componentDidMount () {
        this.queryData()
    }

    queryData = () => {
        const { customData, dispatch } = this.props
        dispatch({ type: 'table/clear' })
        setTimeout(() => {
            dispatch({
                type: 'table/save',
                payload: {
                    list: customData,
                },
            })
        }, 300);
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
        dispatch({
            type: 'table/add',
            payload: {
                fetchMethod: 'mockPromise',
                fetchData: record,
            },
        });
    }
    updateData = (record) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'table/update',
            payload: {
                fetchMethod: 'mockPromise',
                fetchData: record,
            },
        });
    }
    deleteData = (record) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'table/delete',
            payload: {
                fetchMethod: 'mockPromise',
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

    // 自定义操作
    operations = (record) => ([
        {
            text: '添加子列',
            handleClick: () => {
                const { s_key } = record
                const { dispatch } = this.props

                dispatch({
                    type: 'table/loopDataAndTodo',
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

    // 查看数据格式
    // openJsonView = () => {
    //     this.setState({
    //         jsonVisible: true,
    //     })
    // }
    // closeJsonView = () => {
    //     this.setState({
    //         jsonVisible: false,
    //     })
    // }

    // jsonToHtml = (data) => {
    //     let dataHtml = JSON.stringify(data)
    //     dataHtml = dataHtml.replace(/,|"children":|\[{|{/g, '$&\n')
    //     dataHtml = dataHtml.replace(/\}]|}/g, '\n$&')

    //     return dataHtml
    // }

    render() {
        const { table: { dataSource }, loading } = this.props
        // const buttonGroup = (
        //     <Fragment>
        //         <Button
        //             icon="profile"
        //             size="small"
        //             onClick={this.openJsonView}
        //         >查看JSON
        //         </Button>
        //     </Fragment>
        // )

        // const dataJsonHtml = this.jsonToHtml(dataSource)
        return (
            <div className={styles.container}>
                <div className={styles.buttonGroup}>
                    <Button
                        size="small"
                        onClick={this.addNewRecord}
                    >添加行
                    </Button>
                </div>
                <EditableTable
                    loading={loading}
                    dataSource={dataSource}
                    columns={this.state.columns}
                    addData={this.addData}
                    updateData={this.updateData}
                    deleteData={this.deleteData}
                    changeCell={this.changeCell}
                    operations={this.operations}
                    buttonGroup={false}
                    pagination={false}
                />
                {/* <Modal
                    title="JSON 格式"
                    visible={this.state.jsonVisible}
                    onCancel={this.closeJsonView}
                    footer={null}
                >
                    <TextArea
                        autosize
                        value={dataJsonHtml}
                    />
                </Modal> */}
            </div>
        );
    }
}

